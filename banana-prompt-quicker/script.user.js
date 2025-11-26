// ==UserScript==
// @name                Banana Prompt Quicker
// @namespace           gemini.script
// @tag                 entertainment
// @version             0.0.5
// @description         Prompts quicker is ALL you 🍌 need - UserScript版
// @author              Glidea
// @author              Johnbi
// @license             MIT
// @match               https://aistudio.google.com/*
// @match               https://gemini.google.com/*
// @icon                https://www.gstatic.com/lamda/images/nano-banana_be0f093e11edd1639655e.svg
// @grant               GM_getValue
// @grant               GM_setValue
// @grant               GM_xmlhttpRequest
// @grant               GM_addElement
// @grant               GM_log
// @connect             raw.githubusercontent.com
// @source              https://github.com/bxb100/Scripts/tree/main/banana-prompt-quicker
// @homepage            https://github.com/bxb100/Scripts/tree/main/banana-prompt-quicker
// @homepageURL         https://github.com/bxb100/Scripts/tree/main/banana-prompt-quicker
// @supportURL          https://github.com/bxb100/Scripts/issues
// @downloadURL         https://github.com/bxb100/Scripts/raw/refs/heads/main/banana-prompt-quicker/script.user.js
// @updateURL           https://github.com/bxb100/Scripts/raw/refs/heads/main/banana-prompt-quicker/script.user.js
// ==/UserScript==
//

(function () {
    'use strict';

    /*!
    * by Jan Biniok
    * source: https://github.com/Tampermonkey/tampermonkey/issues/1334#issuecomment-2442399033
    */
    (function () {
        if (typeof window != "undefined" &&
            ('trustedTypes' in window) &&
            ('createPolicy' in window.trustedTypes) &&
            (typeof window.trustedTypes.createPolicy == "function")) {
            window.trustedTypes.createPolicy('default', { createScriptURL: s => s, createScript: s => s, createHTML: s => s })
        } else {
            setTimeout(window.testTrusted, 1000);
        }
    })()


    // --- Polyfills for Chrome Extension API ---
    // 模拟 chrome.storage 使用 GM_storage
    const mockStorage = {
        get: (keys) => new Promise((resolve) => {
            let result = {};
            const keyList = Array.isArray(keys) ? keys : [keys];
            keyList.forEach(key => {
                result[key] = GM_getValue(key);
            });
            resolve(result);
        }),
        set: (items) => new Promise((resolve) => {
            for (const [key, value] of Object.entries(items)) {
                GM_setValue(key, value);
            }
            resolve();
        })
    };

    const chrome = {
        storage: {
            local: mockStorage,
            sync: mockStorage // Tampermonkey 统一使用本地存储
        }
    };

    // 辅助函数：使用 GM_xmlhttpRequest 替代 fetch 以避免 CSP 问题
    function gmFetchJson(url) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                onload: function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        try {
                            resolve(JSON.parse(response.responseText));
                        } catch (e) {
                            reject(e);
                        }
                    } else {
                        reject(new Error(`HTTP error! status: ${response.status}`));
                    }
                },
                onerror: function (err) {
                    reject(err);
                }
            });
        });
    }

    // --- prompts.js Logic ---
    const PromptManager = (() => {
        const GITHUB_PROMPTS_URL = 'https://raw.githubusercontent.com/glidea/banana-prompt-quicker/refs/heads/main/prompts.json';
        const CACHE_KEY = 'banana_prompts_cache';
        const CACHE_TIMESTAMP_KEY = 'banana_prompts_cache_time';
        const CACHE_DURATION = 2 * 60 * 1000; // 2 min

        return {
            async get() {
                try {
                    // 1. Check cache
                    const cache = await chrome.storage.local.get([CACHE_KEY, CACHE_TIMESTAMP_KEY]);
                    const cachedPrompts = cache[CACHE_KEY];
                    const cacheTime = cache[CACHE_TIMESTAMP_KEY];
                    const now = Date.now();
                    if (cachedPrompts && cacheTime && (now - cacheTime < CACHE_DURATION)) {
                        GM_log('[Banana] Using cached prompts');
                        return cachedPrompts;
                    }

                    // 2. Fetch from GitHub using GM_xmlhttpRequest
                    GM_log('[Banana] Fetching prompts from GitHub...');
                    const data = await gmFetchJson(GITHUB_PROMPTS_URL);

                    // 3. Update cache
                    await chrome.storage.local.set({
                        [CACHE_KEY]: data,
                        [CACHE_TIMESTAMP_KEY]: now
                    });
                    GM_log('[Banana] Prompts updated from GitHub');
                    return data;

                } catch (error) {
                    GM_log('[Banana] Failed to fetch prompts:', error);

                    // 4. Fallback to cache if available (even if expired)
                    const cache = await chrome.storage.local.get([CACHE_KEY]);
                    return cache[CACHE_KEY] || [];
                }
            }
        }
    })()

    // 20251125 新增: 获取远程 selector 配置
    async function getRemoteSelector(platform, type) {
        const CACHE_KEY = 'selector_config'
        const CACHE_DURATION = 2 * 60 * 1000 // 2分钟
        const CONFIG_URL = 'https://raw.githubusercontent.com/glidea/banana-prompt-quicker/main/selectors.json'
        // 1. 尝试从缓存获取
        const cached = await chrome.storage.local.get(CACHE_KEY)
        if (cached[CACHE_KEY]) {
            const { data, timestamp } = cached[CACHE_KEY]
            if (Date.now() - timestamp < CACHE_DURATION) {
                return data[platform]?.[type]
            }
        }
        // 2. 请求远程配置
        try {
            const config = await gmFetchJson(CONFIG_URL)
            // 缓存配置
            await chrome.storage.local.set({
                [CACHE_KEY]: {
                    data: config,
                    timestamp: Date.now()
                }
            })
            return config[platform]?.[type]
        } catch (error) {
            console.warn('获取远程 selector 失败:', error)
            // 降级:使用过期缓存
            return cached[CACHE_KEY]?.data?.[platform]?.[type]
        }
    }

    // --- modal.js Logic ---
    class BananaModal {
        constructor(adapter) {
            this.adapter = adapter
            this.modal = null
            this.activeFilters = new Set()
            this.prompts = []
            this.customPrompts = []
            this.categories = new Set(['全部'])
            this.selectedCategory = 'all'
            this.currentPage = 1
            this.pageSize = this.isMobile() ? 8 : 12
            this.filteredPrompts = []
            this.favorites = []
            this.keyboardHandler = this.handleKeyboard.bind(this)
            this.loadPrompts()
        }

        async loadPrompts() {
            let staticPrompts = []
            if (PromptManager) {
                staticPrompts = await PromptManager.get()
            }
            this.customPrompts = await this.getCustomPrompts()
            this.prompts = [...this.customPrompts, ...staticPrompts]

            // Aggregate categories
            this.categories = new Set(['全部'])
            this.prompts.forEach(p => {
                if (p.category) {
                    this.categories.add(p.category)
                }
            })

            this.updateCategoryDropdown()
            this.applyFilters()
        }

        updateCategoryDropdown() {
            const optionsContainer = document.getElementById('category-options-container')
            const triggerText = document.getElementById('category-trigger-text')
            if (!optionsContainer || !triggerText) return

            this.populateCategoryDropdown(optionsContainer, triggerText)
        }

        populateCategoryDropdown(optionsContainer, triggerText) {
            // Clear existing options
            optionsContainer.innerHTML = ''

            // Populate categories
            const sortedCategories = Array.from(this.categories).sort((a, b) => {
                if (a === '全部') return -1
                if (b === '全部') return 1
                return a.localeCompare(b)
            })

            if (sortedCategories.length === 0) {
                const empty = document.createElement('div')
                empty.textContent = '无分类'
                empty.style.cssText = `padding: 10px 16px; font-size: 14px; color: ${this.adapter.getThemeColors().textSecondary};`
                optionsContainer.appendChild(empty)
            }

            sortedCategories.forEach(cat => {
                const option = document.createElement('div')
                option.textContent = cat
                const currentLabel = this.selectedCategory === 'all' ? '全部' : this.selectedCategory
                const isSelected = cat === currentLabel
                const colors = this.adapter.getThemeColors()

                const baseStyle = `padding: 10px 16px; cursor: pointer; transition: all 0.2s; font-size: 14px;`
                const selectedStyle = isSelected
                    ? `background: ${colors.primary}15; color: ${colors.primary}; font-weight: 600;`
                    : `background: transparent; color: ${colors.text};`
                option.style.cssText = baseStyle + selectedStyle

                option.onmouseenter = () => {
                    if (!isSelected) {
                        option.style.background = colors.surfaceHover
                    }
                    option.style.boxShadow = `0 2px 8px ${colors.shadow}`
                }
                option.onmouseleave = () => {
                    if (!isSelected) {
                        option.style.background = 'transparent'
                    } else {
                        option.style.background = `${colors.primary}15`
                    }
                    option.style.boxShadow = 'none'
                }

                option.onclick = (e) => {
                    e.stopPropagation()
                    this.selectedCategory = cat === '全部' ? 'all' : cat
                    triggerText.textContent = cat

                    // Hide dropdown
                    optionsContainer.style.display = 'none'
                    optionsContainer.setAttribute('data-visible', 'false')

                    this.populateCategoryDropdown(optionsContainer, triggerText)

                    this.applyFilters()
                }

                optionsContainer.appendChild(option)
            })

            // Reset trigger text if needed
            const currentLabel = this.selectedCategory === 'all' ? '全部' : this.selectedCategory
            triggerText.textContent = currentLabel
        }

        async getCustomPrompts() {
            const result = await chrome.storage.local.get(['banana-custom-prompts'])
            return result['banana-custom-prompts'] || []
        }

        show() {
            if (!this.modal) {
                this.modal = this.createModal()
                document.body.appendChild(this.modal)
            }
            this.modal.style.display = 'flex'
            this.loadPrompts() // Reload to ensure updates
            // 添加键盘事件监听器
            document.addEventListener('keydown', this.keyboardHandler)
        }

        hide() {
            if (this.modal) {
                this.modal.style.display = 'none'
            }
            // 移除键盘事件监听器
            document.removeEventListener('keydown', this.keyboardHandler)
        }

        isMobile() {
            return window.innerWidth <= 768
        }

        createModal() {
            const colors = this.adapter.getThemeColors()
            const mobile = this.isMobile()

            const modalElement = document.createElement('div')
            modalElement.id = 'prompts-modal'
            modalElement.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; z-index: 10000;'

            const container = document.createElement('div')
            container.style.cssText = `background: ${colors.background}; border-radius: ${mobile ? '24px 24px 0 0' : '20px'}; box-shadow: 0 20px 60px ${colors.shadow}; max-width: ${mobile ? '100%' : '900px'}; width: ${mobile ? '100%' : '90%'}; max-height: ${mobile ? '90vh' : '85vh'}; display: flex; flex-direction: column; ${mobile ? 'margin-top: auto;' : ''}; overflow: visible;`

            const searchSection = this.createSearchSection(colors, mobile)
            const content = this.createContent(colors, mobile)

            container.appendChild(searchSection)
            container.appendChild(content)
            modalElement.appendChild(container)

            modalElement.addEventListener('click', (e) => {
                if (e.target === modalElement) {
                    this.hide()
                }
            })

            if (mobile) {
                modalElement.addEventListener('touchstart', (e) => {
                    if (e.target === modalElement) {
                        this.hide()
                    }
                })
            }

            return modalElement
        }

        createSearchSection(colors, mobile) {
            const searchSection = document.createElement('div')
            searchSection.style.cssText = `padding: ${mobile ? '16px' : '20px 24px'}; border-bottom: 1px solid ${colors.border}; display: flex; ${mobile ? 'flex-direction: column; gap: 12px;' : 'align-items: center; gap: 16px;'}; overflow: visible; z-index: 100; position: relative;`

            const searchInput = document.createElement('input')
            searchInput.type = 'text'
            searchInput.id = 'prompt-search'
            searchInput.placeholder = '搜索...'
            searchInput.style.cssText = `${mobile ? 'width: 100%;' : 'flex: 1;'} padding: ${mobile ? '14px 20px' : '12px 18px'}; border: 1px solid ${colors.inputBorder}; border-radius: 16px; outline: none; font-size: ${mobile ? '16px' : '14px'}; background: ${colors.inputBg}; color: ${colors.text}; box-sizing: border-box; transition: all 0.2s;`
            searchInput.addEventListener('input', () => this.applyFilters())

            searchInput.addEventListener('focus', () => {
                searchInput.style.borderColor = colors.primary
            })
            searchInput.addEventListener('blur', () => {
                const currentColors = this.adapter.getThemeColors()
                searchInput.style.borderColor = currentColors.inputBorder
            })

            const filterContainer = document.createElement('div')
            filterContainer.style.cssText = `display: flex; gap: 8px; align-items: center; ${mobile ? 'justify-content: space-between; flex-wrap: wrap;' : ''}; position: relative; z-index: 101;`

            // Category Dropdown
            const dropdownContainer = document.createElement('div')
            dropdownContainer.style.cssText = `position: relative; z-index: 1000;`

            const dropdownTrigger = document.createElement('div')
            dropdownTrigger.id = 'category-dropdown-trigger'
            dropdownTrigger.style.cssText = `padding: ${mobile ? '10px 14px' : '8px 12px'}; border: 1px solid ${colors.border}; border-radius: 16px; background: ${colors.surface}; color: ${colors.text}; font-size: ${mobile ? '14px' : '13px'}; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: all 0.2s; width: 60px; justify-content: space-between; user-select: none;`

            const triggerText = document.createElement('span')
            triggerText.id = 'category-trigger-text'
            triggerText.textContent = this.selectedCategory === 'all' ? '全部' : this.selectedCategory
            triggerText.style.cssText = 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; text-align: center;'

            const arrowIcon = document.createElement('span')
            arrowIcon.innerHTML = `<svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1L5 5L9 1"/></svg>`
            arrowIcon.style.cssText = `display: flex; align-items: center; transition: transform 0.2s; opacity: 0.6;`

            dropdownTrigger.appendChild(triggerText)
            dropdownTrigger.appendChild(arrowIcon)

            const optionsContainer = document.createElement('div')
            optionsContainer.id = 'category-options-container'
            optionsContainer.style.cssText = `position: absolute; top: 100%; left: 0; margin-top: 8px; width: 100%; background: ${colors.surface}; border: 1px solid ${colors.border}; border-radius: 16px; box-shadow: 0 10px 40px ${colors.shadow}; display: none; flex-direction: column; overflow: hidden; backdrop-filter: blur(20px); max-height: 300px; overflow-y: auto; z-index: 9999;`
            optionsContainer.setAttribute('data-visible', 'false')

            // Toggle Logic
            dropdownTrigger.onclick = (e) => {
                e.stopPropagation()
                const isVisible = optionsContainer.getAttribute('data-visible') === 'true'
                if (isVisible) {
                    optionsContainer.style.display = 'none'
                    optionsContainer.setAttribute('data-visible', 'false')
                    arrowIcon.style.transform = 'rotate(0deg)'
                } else {
                    optionsContainer.style.display = 'flex'
                    optionsContainer.setAttribute('data-visible', 'true')
                    arrowIcon.style.transform = 'rotate(180deg)'
                }
            }

            // Click outside to close
            document.addEventListener('click', (e) => {
                if (optionsContainer.getAttribute('data-visible') === 'true' && !dropdownContainer.contains(e.target)) {
                    optionsContainer.style.display = 'none'
                    optionsContainer.setAttribute('data-visible', 'false')
                    arrowIcon.style.transform = 'rotate(0deg)'
                }
            })

            if (!mobile) {
                dropdownTrigger.onmouseenter = () => {
                    dropdownTrigger.style.borderColor = colors.primary
                    dropdownTrigger.style.boxShadow = `0 2px 8px ${colors.shadow}`
                }
                dropdownTrigger.onmouseleave = () => {
                    dropdownTrigger.style.borderColor = colors.border
                    dropdownTrigger.style.boxShadow = 'none'
                }
            }

            dropdownContainer.appendChild(dropdownTrigger)
            dropdownContainer.appendChild(optionsContainer)

            // Populate immediately
            this.populateCategoryDropdown(optionsContainer, triggerText)

            const buttonsContainer = document.createElement('div')
            buttonsContainer.style.cssText = `display: flex; gap: 8px; ${mobile ? 'flex: 1; justify-content: space-between;' : ''}`

            const filters = [
                { key: 'favorite', label: '收藏' },
                { key: 'custom', label: '自定义' },
                { key: 'generate', label: '生图' },
                { key: 'edit', label: '编辑' }
            ]

            filters.forEach(filter => {
                const btn = document.createElement('button')
                btn.id = `filter-${filter.key}`
                btn.textContent = filter.label
                btn.style.cssText = `padding: ${mobile ? '10px 18px' : '8px 18px'}; border: 1px solid ${colors.border}; border-radius: 20px; background: ${colors.surface}; color: ${colors.text}; font-size: ${mobile ? '14px' : '13px'}; cursor: pointer; transition: all 0.25s ease; white-space: nowrap; touch-action: manipulation;`
                btn.onclick = () => this.toggleFilter(filter.key)
                buttonsContainer.appendChild(btn)
            })

            const addBtn = document.createElement('button')
            addBtn.textContent = '+'
            addBtn.title = '添加自定义 Prompt'
            addBtn.style.cssText = `padding: ${mobile ? '10px 18px' : '8px 18px'}; border: 1px solid ${colors.primary}; border-radius: 20px; background: ${colors.primary}; color: white; font-size: ${mobile ? '18px' : '16px'}; font-weight: 600; cursor: pointer; transition: all 0.25s ease; display: flex; align-items: center; justify-content: center; line-height: 1; box-shadow: 0 2px 8px ${colors.shadow};`
            addBtn.onclick = () => this.showAddPromptModal()

            buttonsContainer.appendChild(addBtn)

            filterContainer.appendChild(dropdownContainer)
            filterContainer.appendChild(buttonsContainer)

            searchSection.appendChild(searchInput)
            searchSection.appendChild(filterContainer)

            return searchSection
        }

        createContent(colors, mobile) {
            const container = document.createElement('div')
            container.style.cssText = 'flex: 1; display: flex; flex-direction: column; overflow: hidden;'

            const scrollArea = document.createElement('div')
            scrollArea.id = 'prompts-scroll-area'
            scrollArea.style.cssText = `flex: 1; overflow-y: auto; padding: ${mobile ? '16px' : '20px 24px'}; -webkit-overflow-scrolling: touch;`

            const grid = document.createElement('div')
            grid.id = 'prompts-grid'
            grid.style.cssText = `display: grid; grid-template-columns: ${mobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'}; gap: ${mobile ? '12px' : '16px'};`

            scrollArea.appendChild(grid)

            const pagination = document.createElement('div')
            pagination.id = 'prompts-pagination'
            pagination.style.cssText = `padding: ${mobile ? '12px' : '16px'}; border-top: 1px solid ${colors.border}; display: flex; justify-content: center; align-items: center; gap: 16px; background: ${colors.surface}; border-radius: ${mobile ? '0' : '0 0 20px 20px'};`

            container.appendChild(scrollArea)
            container.appendChild(pagination)

            return container
        }

        toggleFilter(filterKey) {
            const btn = document.getElementById(`filter-${filterKey}`)
            if (!btn) return

            const colors = this.adapter.getThemeColors()
            const mobile = this.isMobile()

            const setInactiveStyle = (targetBtn) => {
                targetBtn.style.cssText = `padding: ${mobile ? '10px 18px' : '8px 18px'}; border: 1px solid ${colors.border}; border-radius: 20px; background: ${colors.surface}; color: ${colors.text}; font-size: ${mobile ? '14px' : '13px'}; cursor: pointer; transition: all 0.25s ease; white-space: nowrap; touch-action: manipulation;`

                if (!mobile) {
                    targetBtn.onmouseenter = () => {
                        targetBtn.style.transform = 'scale(1.05)'
                        targetBtn.style.boxShadow = `0 2px 8px ${colors.shadow}`
                    }
                    targetBtn.onmouseleave = () => {
                        targetBtn.style.transform = 'scale(1)'
                        targetBtn.style.boxShadow = 'none'
                    }
                }
            }

            if (this.activeFilters.has(filterKey)) {
                this.activeFilters.delete(filterKey)
                setInactiveStyle(btn)
            } else {
                // Mutually exclusive logic for generate/edit
                if (filterKey === 'generate' && this.activeFilters.has('edit')) {
                    this.activeFilters.delete('edit')
                    const editBtn = document.getElementById('filter-edit')
                    if (editBtn) setInactiveStyle(editBtn)
                }
                if (filterKey === 'edit' && this.activeFilters.has('generate')) {
                    this.activeFilters.delete('generate')
                    const generateBtn = document.getElementById('filter-generate')
                    if (generateBtn) setInactiveStyle(generateBtn)
                }

                this.activeFilters.add(filterKey)
                btn.style.cssText = `padding: ${mobile ? '10px 18px' : '8px 18px'}; border: 1px solid ${colors.primary}; border-radius: 20px; background: ${colors.primary}; color: white; font-size: ${mobile ? '14px' : '13px'}; cursor: pointer; transition: all 0.25s ease; white-space: nowrap; touch-action: manipulation; box-shadow: 0 2px 8px ${colors.shadow};`

                if (!mobile) {
                    btn.onmouseenter = () => {
                        btn.style.transform = 'scale(1.05)'
                        btn.style.boxShadow = `0 4px 12px ${colors.shadow}`
                    }
                    btn.onmouseleave = () => {
                        btn.style.transform = 'scale(1)'
                        btn.style.boxShadow = `0 2px 8px ${colors.shadow}`
                    }
                }
            }

            this.applyFilters()
        }

        async applyFilters() {
            const searchInput = document.getElementById('prompt-search')
            const keyword = searchInput ? searchInput.value.toLowerCase() : ''

            this.favorites = await this.getFavorites()

            let filtered = this.prompts.filter(prompt => {
                const matchesSearch = !keyword ||
                    prompt.title.toLowerCase().includes(keyword) ||
                    prompt.prompt.toLowerCase().includes(keyword) ||
                    prompt.author.toLowerCase().includes(keyword)

                if (!matchesSearch) return false

                // Category Filter
                if (this.selectedCategory !== 'all' && prompt.category !== this.selectedCategory) {
                    return false
                }

                if (this.activeFilters.size === 0) return true

                const promptId = `${prompt.title}-${prompt.author}`
                const isFavorite = this.favorites.includes(promptId)

                return Array.from(this.activeFilters).every(filter => {
                    if (filter === 'favorite') return isFavorite
                    if (filter === 'custom') return prompt.isCustom
                    if (filter === 'generate') return prompt.mode === 'generate'
                    if (filter === 'edit') return prompt.mode === 'edit'
                    return false
                })
            })

            // Sort: Favorites > Custom > Others
            filtered.sort((a, b) => {
                const aId = `${a.title}-${a.author}`
                const bId = `${b.title}-${b.author}`
                const aIsFavorite = this.favorites.includes(aId)
                const bIsFavorite = this.favorites.includes(bId)

                if (aIsFavorite && !bIsFavorite) return -1
                if (!aIsFavorite && bIsFavorite) return 1

                if (a.isCustom && !b.isCustom) return -1
                if (!a.isCustom && b.isCustom) return 1

                return 0
            })

            this.filteredPrompts = filtered
            this.currentPage = 1
            this.renderCurrentPage()
        }

        renderCurrentPage() {
            const grid = document.getElementById('prompts-grid')
            if (!grid) return

            const start = (this.currentPage - 1) * this.pageSize
            const end = start + this.pageSize
            const pageItems = this.filteredPrompts.slice(start, end)

            grid.innerHTML = ''

            if (pageItems.length === 0) {
                const placeholder = document.createElement('div')
                const colors = this.adapter.getThemeColors()
                const mobile = this.isMobile()
                const columns = mobile ? 2 : 4
                const rows = Math.ceil(this.pageSize / columns)
                const cardMinHeight = mobile ? 240 : 260
                const gap = mobile ? 12 : 16
                const minHeight = rows * cardMinHeight + (rows - 1) * gap

                placeholder.style.cssText = `
                    grid-column: 1 / -1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: ${minHeight}px;
                    color: ${colors.textSecondary};
                    font-size: ${mobile ? '14px' : '16px'};
                `
                placeholder.textContent = '没有找到相关提示词'
                grid.appendChild(placeholder)
            } else {
                pageItems.forEach(prompt => {
                    const card = this.createPromptCard(prompt, this.favorites)
                    grid.appendChild(card)
                })

                if (pageItems.length < this.pageSize) {
                    const remaining = this.pageSize - pageItems.length
                    const mobile = this.isMobile()
                    const cardMinHeight = mobile ? 240 : 260
                    for (let i = 0; i < remaining; i++) {
                        const placeholder = document.createElement('div')
                        placeholder.style.cssText = `min-height: ${cardMinHeight}px; opacity: 0; pointer-events: none;`
                        grid.appendChild(placeholder)
                    }
                }
            }

            const scrollArea = document.getElementById('prompts-scroll-area')
            if (scrollArea) scrollArea.scrollTop = 0

            this.renderPagination()
        }

        renderPagination() {
            const pagination = document.getElementById('prompts-pagination')
            if (!pagination) return

            const totalPages = Math.ceil(this.filteredPrompts.length / this.pageSize)
            const colors = this.adapter.getThemeColors()
            const mobile = this.isMobile()

            pagination.innerHTML = ''

            if (totalPages <= 1) {
                pagination.style.display = 'none'
                return
            }

            if (mobile) {
                pagination.style.cssText = `padding: 12px; border-top: 1px solid ${colors.border}; display: flex; flex-direction: column; align-items: center; gap: 12px; background: ${colors.surface}; border-radius: 0;`
            } else {
                pagination.style.cssText = `padding: 16px 24px; border-top: 1px solid ${colors.border}; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; background: ${colors.surface}; border-radius: 0 0 20px 20px;`
            }

            const createBtn = (text, disabled, onClick) => {
                const btn = document.createElement('button')
                btn.textContent = text
                btn.disabled = disabled
                btn.style.cssText = `padding: ${mobile ? '10px 20px' : '8px 18px'}; border: 1px solid ${colors.border}; border-radius: 12px; background: ${disabled ? colors.surface : colors.primary}; color: ${disabled ? colors.textSecondary : '#fff'}; cursor: ${disabled ? 'not-allowed' : 'pointer'}; font-size: ${mobile ? '14px' : '13px'}; transition: all 0.25s ease; opacity: ${disabled ? 0.5 : 1}; font-weight: 500;`
                if (!disabled) {
                    btn.onclick = onClick
                    if (!mobile) {
                        btn.onmouseenter = () => {
                            btn.style.transform = 'scale(1.05)'
                            btn.style.boxShadow = `0 4px 12px ${colors.shadow}`
                        }
                        btn.onmouseleave = () => {
                            btn.style.transform = 'scale(1)'
                            btn.style.boxShadow = 'none'
                        }
                    }
                }
                return btn
            }

            const prevBtn = createBtn('上一页', this.currentPage === 1, () => this.changePage(-1))
            const pageInfo = document.createElement('span')
            pageInfo.textContent = `${this.currentPage} / ${totalPages}`
            pageInfo.style.cssText = `color: ${colors.text}; font-size: ${mobile ? '14px' : '13px'}; font-weight: 500;`
            const nextBtn = createBtn('下一页', this.currentPage === totalPages, () => this.changePage(1))

            const controlsWrapper = document.createElement('div')
            controlsWrapper.style.cssText = 'display: flex; align-items: center; gap: 16px;'
            controlsWrapper.appendChild(prevBtn)
            controlsWrapper.appendChild(pageInfo)
            controlsWrapper.appendChild(nextBtn)

            const socialContainer = document.createElement('div')
            socialContainer.style.cssText = `display: flex; align-items: center; gap: ${mobile ? '12px' : '16px'}; justify-content: ${mobile ? 'center' : 'flex-end'};`

            const githubLink = document.createElement('a')
            githubLink.href = 'https://github.com/glidea/banana-prompt-quicker'
            githubLink.target = '_blank'
            githubLink.innerHTML = `<svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>`
            githubLink.style.cssText = `color: ${colors.textSecondary}; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; padding: 8px; border-radius: 50%; cursor: pointer;`

            const xhsLink = document.createElement('a')
            xhsLink.href = 'https://www.xiaohongshu.com/user/profile/5f7dc54d0000000001004afb'
            xhsLink.target = '_blank'
            xhsLink.innerHTML = `<svg viewBox="0 0 1024 1024" width="20" height="20" fill="currentColor"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32z m-40 728H184V184h656v656zM312 376h400v80H312z m0 176h400v80H312z" /></svg>`
            xhsLink.style.cssText = `color: ${colors.textSecondary}; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; padding: 8px; border-radius: 50%; cursor: pointer;`

            socialContainer.appendChild(githubLink)
            socialContainer.appendChild(xhsLink)

            if (mobile) {
                pagination.appendChild(controlsWrapper)
                const spacer = document.createElement('div')
                pagination.appendChild(spacer)
            } else {
                const spacer = document.createElement('div')
                pagination.appendChild(spacer)
                pagination.appendChild(controlsWrapper)
                pagination.appendChild(socialContainer)
            }
        }

        changePage(delta) {
            this.currentPage += delta
            this.renderCurrentPage()
        }

        handleKeyboard(event) {
            if (!this.modal || this.modal.style.display === 'none') return
            const activeElement = document.activeElement
            if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.isContentEditable)) return
            const totalPages = Math.ceil(this.filteredPrompts.length / this.pageSize)
            if (totalPages <= 1) return
            if (event.key === 'ArrowLeft') {
                event.preventDefault()
                if (this.currentPage > 1) this.changePage(-1)
            } else if (event.key === 'ArrowRight') {
                event.preventDefault()
                if (this.currentPage < totalPages) this.changePage(1)
            }
        }

        createPromptCard(prompt, favorites) {
            const promptId = `${prompt.title}-${prompt.author}`
            const isFavorite = favorites.includes(promptId)
            const colors = this.adapter.getThemeColors()
            const theme = this.adapter.getCurrentTheme()
            const mobile = this.isMobile()

            const card = document.createElement('div')
            card.className = 'prompt-card'
            card.style.cssText = `background: ${colors.surface}; border-radius: 16px; border: 1px solid ${colors.border}; cursor: pointer; overflow: hidden; transition: all 0.3s ease; min-height: ${mobile ? '240px' : '260px'}; position: relative; touch-action: manipulation; display: flex; flex-direction: column;`

            if (!mobile) {
                card.addEventListener('mouseenter', () => {
                    card.style.boxShadow = `0 8px 24px ${colors.shadow}`
                    card.style.transform = 'translateY(-4px)'
                })
                card.addEventListener('mouseleave', () => {
                    card.style.boxShadow = 'none'
                    card.style.transform = 'translateY(0)'
                })
            }

            const wrapper = document.createElement('div')
            wrapper.onclick = () => this.adapter.insertPrompt(prompt.prompt)

            GM_addElement(wrapper, 'img', {
                src: prompt.preview,
                alt: prompt.title,
                style: `width: 100%; height: ${mobile ? '180px' : '200px'}; object-fit: cover; flex-shrink: 0;`,
            })

            const favoriteBtn = document.createElement('button')
            const favBtnBg = isFavorite ? 'rgba(255,193,7,0.9)' : theme === 'dark' ? 'rgba(48,49,52,0.9)' : 'rgba(255,255,255,0.9)'
            const favBtnColor = isFavorite ? '#000' : theme === 'dark' ? '#e8eaed' : '#5f6368'

            favoriteBtn.style.cssText = `position: absolute; top: 12px; right: 12px; width: ${mobile ? '36px' : '32px'}; height: ${mobile ? '36px' : '32px'}; border-radius: 50%; border: none; background: ${favBtnBg}; color: ${favBtnColor}; font-size: ${mobile ? '16px' : '14px'}; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.25s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.15); backdrop-filter: blur(10px); touch-action: manipulation;`
            favoriteBtn.textContent = isFavorite ? '⭐' : '☆'
            favoriteBtn.onclick = (e) => {
                e.stopPropagation()
                this.toggleFavorite(promptId)
            }

            const content = document.createElement('div')
            content.style.cssText = 'padding: 12px; flex: 1; display: flex; flex-direction: column; gap: 8px; justify-content: flex-start; min-height: 0; overflow: hidden;'

            const title = document.createElement('h3')
            title.style.cssText = `font-size: ${mobile ? '15px' : '14px'}; font-weight: 500; color: ${colors.text}; margin: 0; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`
            title.textContent = prompt.title
            title.onclick = () => this.adapter.insertPrompt(prompt.prompt)

            const bottomRow = document.createElement('div')
            bottomRow.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-top: 4px;'

            const author = document.createElement('span')
            author.style.cssText = `font-size: ${mobile ? '13px' : '12px'}; color: ${colors.textSecondary}; font-weight: 400; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; margin-right: 8px;`
            author.textContent = prompt.author

            if (prompt.link) {
                author.style.textDecoration = 'underline'
                author.onclick = (e) => {
                    e.stopPropagation()
                    window.open(prompt.link, '_blank')
                }
            } else {
                author.onclick = () => this.adapter.insertPrompt(prompt.prompt)
            }

            const modeTag = document.createElement('span')
            const isEdit = prompt.mode === 'edit'
            const tagBg = theme === 'dark' ? (isEdit ? 'rgba(10, 132, 255, 0.15)' : 'rgba(48, 209, 88, 0.15)') : (isEdit ? 'rgba(0, 122, 255, 0.12)' : 'rgba(52, 199, 89, 0.12)')
            const tagColor = theme === 'dark' ? (isEdit ? '#0a84ff' : '#30d158') : (isEdit ? '#007aff' : '#34c759')
            modeTag.style.cssText = `background: ${tagBg}; color: ${tagColor}; padding: 4px 10px; border-radius: 12px; font-size: ${mobile ? '12px' : '11px'}; font-weight: 600; backdrop-filter: blur(10px); flex-shrink: 0;`
            modeTag.textContent = isEdit ? '编辑' : '生图'

            bottomRow.appendChild(author)
            bottomRow.appendChild(modeTag)
            content.appendChild(title)
            content.appendChild(bottomRow)

            if (prompt.isCustom) {
                const deleteBtn = document.createElement('button')
                deleteBtn.textContent = '×'
                deleteBtn.style.cssText = `position: absolute; top: 12px; left: 12px; width: ${mobile ? '36px' : '32px'}; height: ${mobile ? '36px' : '32px'}; border-radius: 50%; border: none; background: rgba(0,0,0,0.7); color: white; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.25s ease; z-index: 2; line-height: 1; padding-bottom: 2px; backdrop-filter: blur(10px); box-shadow: 0 4px 12px rgba(0,0,0,0.15);`
                deleteBtn.onclick = (e) => {
                    e.stopPropagation()
                    if (confirm('确定要删除这个 Prompt 吗？')) {
                        this.deleteCustomPrompt(prompt.id)
                    }
                }
                card.appendChild(deleteBtn)
            }

            card.appendChild(wrapper)
            card.appendChild(favoriteBtn)
            card.appendChild(content)

            return card
        }

        async getFavorites() {
            const result = await chrome.storage.sync.get(['banana-favorites'])
            return result['banana-favorites'] || []
        }

        async toggleFavorite(promptId) {
            const favorites = await this.getFavorites()
            const index = favorites.indexOf(promptId)
            if (index > -1) {
                favorites.splice(index, 1)
            } else {
                favorites.push(promptId)
            }
            await chrome.storage.sync.set({ 'banana-favorites': favorites })
            this.applyFilters()
        }

        showAddPromptModal() {
            const colors = this.adapter.getThemeColors()
            const mobile = this.isMobile()

            const overlay = document.createElement('div')
            overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 11000;'
            overlay.onclick = (e) => {
                if (e.target === overlay) document.body.removeChild(overlay)
            }

            const dialog = document.createElement('div')
            dialog.style.cssText = `background: ${colors.surface}; padding: ${mobile ? '28px' : '32px'}; border-radius: 20px; width: ${mobile ? '90%' : '500px'}; max-width: 90%; box-shadow: 0 20px 60px ${colors.shadow}; display: flex; flex-direction: column; gap: 20px; color: ${colors.text};`
            dialog.onclick = (e) => e.stopPropagation()

            const title = document.createElement('h3')
            title.textContent = '添加自定义 Prompt'
            title.style.cssText = 'margin: 0 0 8px 0; font-size: 20px; font-weight: 600;'

            const createInput = (placeholder, isTextarea = false) => {
                const input = document.createElement(isTextarea ? 'textarea' : 'input')
                input.placeholder = placeholder
                input.style.cssText = `width: 100%; padding: ${mobile ? '14px 16px' : '12px 16px'}; border: 1px solid ${colors.inputBorder}; border-radius: 12px; background: ${colors.inputBg}; color: ${colors.text}; font-size: 14px; outline: none; box-sizing: border-box; transition: all 0.2s; ${isTextarea ? 'min-height: 120px; resize: vertical; font-family: inherit;' : ''}`
                input.onfocus = () => {
                    input.style.borderColor = colors.primary
                    input.style.boxShadow = `0 0 0 3px ${colors.primary}15`
                }
                input.onblur = () => {
                    input.style.borderColor = colors.inputBorder
                    input.style.boxShadow = 'none'
                }
                return input
            }

            const titleInput = createInput('标题')
            const promptInput = createInput('Prompt 内容', true)

            // Category Dropdown for Add Prompt
            const categoryContainer = document.createElement('div')
            categoryContainer.style.cssText = 'position: relative; width: 100%; z-index: 10;'

            const categoryTrigger = document.createElement('div')
            categoryTrigger.style.cssText = `width: 100%; padding: ${mobile ? '14px 16px' : '12px 16px'}; border: 1px solid ${colors.inputBorder}; border-radius: 12px; background: ${colors.inputBg}; color: ${colors.text}; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; box-sizing: border-box;`

            const addCategories = Array.from(this.categories).filter(c => c !== '全部').sort((a, b) => a.localeCompare(b))
            let selectedAddCategory = addCategories[0] || '默认'
            const categoryTriggerText = document.createElement('span')
            categoryTriggerText.textContent = selectedAddCategory

            const categoryArrow = document.createElement('span')
            categoryArrow.innerHTML = `<svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1L5 5L9 1"/></svg>`
            categoryArrow.style.cssText = `display: flex; align-items: center; transition: transform 0.2s; opacity: 0.6;`

            categoryTrigger.appendChild(categoryTriggerText)
            categoryTrigger.appendChild(categoryArrow)

            const categoryOptions = document.createElement('div')
            categoryOptions.style.cssText = `position: absolute; top: 100%; left: 0; margin-top: 8px; width: 100%; background: ${colors.surface}; border: 1px solid ${colors.border}; border-radius: 12px; box-shadow: 0 10px 40px ${colors.shadow}; display: none; flex-direction: column; overflow: hidden; backdrop-filter: blur(20px); max-height: 200px; overflow-y: auto; z-index: 100;`

            addCategories.forEach(cat => {
                const option = document.createElement('div')
                option.textContent = cat
                const baseStyle = `padding: 10px 16px; cursor: pointer; transition: all 0.2s; font-size: 14px; background: transparent; color: ${colors.text};`
                option.style.cssText = baseStyle

                option.onmouseenter = () => { option.style.background = colors.surfaceHover }
                option.onmouseleave = () => { option.style.background = 'transparent' }
                option.onclick = (e) => {
                    e.stopPropagation()
                    selectedAddCategory = cat
                    categoryTriggerText.textContent = cat
                    categoryOptions.style.display = 'none'
                    categoryArrow.style.transform = 'rotate(0deg)'
                }
                categoryOptions.appendChild(option)
            })

            categoryTrigger.onclick = (e) => {
                e.stopPropagation()
                const isVisible = categoryOptions.style.display === 'flex'
                categoryOptions.style.display = isVisible ? 'none' : 'flex'
                categoryArrow.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)'
            }

            const closeDropdown = (e) => {
                if (!categoryContainer.contains(e.target)) {
                    categoryOptions.style.display = 'none'
                    categoryArrow.style.transform = 'rotate(0deg)'
                }
            }
            document.addEventListener('click', closeDropdown)
            const cleanup = () => document.removeEventListener('click', closeDropdown)

            categoryContainer.appendChild(categoryTrigger)
            categoryContainer.appendChild(categoryOptions)

            const modeContainer = document.createElement('div')
            modeContainer.style.display = 'flex'
            modeContainer.style.gap = '16px'

            let selectedMode = 'generate'
            const createRadio = (value, label) => {
                const labelEl = document.createElement('label')
                labelEl.style.cssText = 'display: flex; align-items: center; gap: 6px; cursor: pointer;'
                const radio = document.createElement('input')
                radio.type = 'radio'
                radio.name = 'prompt-mode'
                radio.value = value
                radio.checked = value === selectedMode
                radio.onchange = () => { selectedMode = value }
                labelEl.appendChild(radio)
                labelEl.appendChild(document.createTextNode(label))
                return labelEl
            }

            modeContainer.appendChild(createRadio('generate', '生图'))
            modeContainer.appendChild(createRadio('edit', '编辑'))

            const btnContainer = document.createElement('div')
            btnContainer.style.cssText = 'display: flex; justify-content: flex-end; gap: 12px; margin-top: 8px;'

            const cancelBtn = document.createElement('button')
            cancelBtn.textContent = '取消'
            cancelBtn.style.cssText = `padding: ${mobile ? '12px 24px' : '10px 20px'}; border: 1px solid ${colors.border}; border-radius: 12px; background: transparent; color: ${colors.text}; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.25s ease;`
            cancelBtn.onclick = () => {
                cleanup()
                document.body.removeChild(overlay)
            }

            const saveBtn = document.createElement('button')
            saveBtn.textContent = '保存'
            saveBtn.style.cssText = `padding: ${mobile ? '12px 24px' : '10px 20px'}; border: none; border-radius: 12px; background: ${colors.primary}; color: white; cursor: pointer; font-size: 14px; font-weight: 600; transition: all 0.25s ease; box-shadow: 0 2px 8px ${colors.shadow};`
            saveBtn.onclick = async () => {
                const titleVal = titleInput.value.trim()
                const promptVal = promptInput.value.trim()
                if (!titleVal || !promptVal) {
                    alert('请填写标题和内容')
                    return
                }
                await this.saveCustomPrompt({
                    title: titleVal,
                    prompt: promptVal,
                    mode: selectedMode,
                    category: selectedAddCategory
                })
                document.body.removeChild(overlay)
                cleanup()
            }

            btnContainer.appendChild(cancelBtn)
            btnContainer.appendChild(saveBtn)

            dialog.appendChild(title)
            dialog.appendChild(titleInput)
            dialog.appendChild(categoryContainer)
            dialog.appendChild(promptInput)
            dialog.appendChild(modeContainer)
            dialog.appendChild(btnContainer)

            overlay.appendChild(dialog)
            document.body.appendChild(overlay)
        }

        async deleteCustomPrompt(promptId) {
            const customPrompts = await this.getCustomPrompts()
            const newPrompts = customPrompts.filter(p => p.id !== promptId)
            await chrome.storage.local.set({ 'banana-custom-prompts': newPrompts })
            await this.loadPrompts()
        }

        async saveCustomPrompt(data) {
            const newPrompt = {
                ...data,
                author: 'Me',
                isCustom: true,
                id: Date.now(),
                preview: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg'
            }
            const customPrompts = await this.getCustomPrompts()
            customPrompts.unshift(newPrompt)
            await chrome.storage.local.set({ 'banana-custom-prompts': customPrompts })
            await this.loadPrompts()
        }
    }

    // --- content.js Logic ---
    class AIStudioAdapter {
        constructor() {
            this.modal = null
            this._initializingButton = false
        }

        async findPromptInput() {
            let el = document.querySelector('ms-prompt-input-wrapper textarea')
            if (el) {
                return el
            }

            // Fallback.
            const s = await getRemoteSelector('aistudio', 'promptInput')
            return document.querySelector(s)
        }


        async findClosestInsertButton() {
            let el = document.querySelector('ms-run-button button')
            if (el) {
                return el
            }

            // Fallback.
            const s = await getRemoteSelector('aistudio', 'insertButton')
            return document.querySelector(s)
        }

        getCurrentTheme() {
            return document.body.classList.contains('dark-theme') ? 'dark' : 'light'
        }

        getThemeColors() {
            const theme = this.getCurrentTheme()
            if (theme === 'dark') {
                return {
                    background: '#141414',
                    surface: '#1c1c1e',
                    surfaceHover: '#2c2c2e',
                    border: '#38383a',
                    text: '#f5f5f7',
                    textSecondary: '#98989d',
                    primary: '#0a84ff',
                    hover: '#2c2c2e',
                    inputBg: '#1c1c1e',
                    inputBorder: '#38383a',
                    shadow: 'rgba(0,0,0,0.5)'
                }
            }
            return {
                background: '#ffffff',
                surface: '#f5f5f7',
                surfaceHover: '#e8e8ed',
                border: '#d2d2d7',
                text: '#1d1d1f',
                textSecondary: '#6e6e73',
                primary: '#007aff',
                hover: '#e8e8ed',
                inputBg: '#ffffff',
                inputBorder: '#d2d2d7',
                shadow: 'rgba(0,0,0,0.1)'
            }
        }

        createButton() {
            const wrapper = document.createElement('div')
            wrapper.className = 'button-wrapper'
            const btn = document.createElement('button')
            btn.id = 'banana-btn'
            btn.className = 'mat-mdc-tooltip-trigger ms-button-borderless ms-button-icon'
            const updateButtonTheme = () => {
                const colors = this.getThemeColors()
                btn.style.cssText = `width: 40px; height: 40px; border-radius: 50%; border: none; background: ${colors.hover}; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; margin-right: 8px; transition: background-color 0.2s;`
            }
            updateButtonTheme()
            btn.title = '快捷提示'
            btn.textContent = '🍌'
            btn.addEventListener('mouseenter', () => {
                const colors = this.getThemeColors()
                btn.style.background = colors.border
            })
            btn.addEventListener('mouseleave', () => {
                const colors = this.getThemeColors()
                btn.style.background = colors.hover
            })
            btn.addEventListener('click', () => {
                if (this.modal) this.modal.show()
            })
            wrapper.appendChild(btn)
            return wrapper
        }

        async initButton() {
            if (document.getElementById('banana-btn')) return true
            if (this._initializingButton) {
                return false
            }
            this._initializingButton = true

            try {
                const runButton = await this.findClosestInsertButton()
                if (!runButton) {
                    return false
                }

                const bananaBtn = this.createButton()
                const buttonWrapper = runButton.parentElement

                try {
                    buttonWrapper.parentElement.insertBefore(bananaBtn, buttonWrapper)
                } catch (error) {
                    console.error('插入香蕉按钮失败:', error)
                    buttonWrapper.insertAdjacentElement('beforebegin', bananaBtn)
                }

                return true
            } finally {
                this._initializingButton = false
            }
        }

        async insertPrompt(promptText) {
            const textarea = await this.findPromptInput()
            if (textarea) {
                textarea.value = promptText
                textarea.dispatchEvent(new Event('input', { bubbles: true }))
                if (this.modal) this.modal.hide()
            }
        }

        waitForElements() {
            const checkInterval = setInterval(async () => {
                const input = await this.findPromptInput()
                if (input) {
                    const success = await this.initButton()
                    if (success) clearInterval(checkInterval)
                }
            }, 1000)
        }

        startObserver() {
            const observer = new MutationObserver(() => {
                const existingBtn = document.getElementById('banana-btn')
                if (!existingBtn) this.initButton()
            })
            observer.observe(document.getElementById('app-root'), { childList: true, subtree: true })
        }
    }

    class GeminiAdapter {
        constructor() {
            this.modal = null
            this._initializingButton = false
        }

        async findPromptInput() {
            let el = document.querySelector('div[aria-label="Enter a prompt here"]')
            if (el) {
                return el
            }

            // Fallback.
            const selector = await getRemoteSelector('gemini', 'promptInput')
            return document.querySelector(selector)
        }

        async findClosestInsertButton() {
            let el = document.querySelector('button[aria-label="Deselect Image"]')
            if (el) {
                return el

            }

            // Fallback.
            const s = await getRemoteSelector('gemini', 'insertButton')
            return document.querySelector(s)
        }

        getCurrentTheme() {
            return document.body.classList.contains('dark-theme') ||
                document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
        }

        getThemeColors() {
            const theme = this.getCurrentTheme()
            if (theme === 'dark') {
                return {
                    background: '#141414',
                    surface: '#1c1c1e',
                    surfaceHover: '#2c2c2e',
                    border: '#38383a',
                    text: '#f5f5f7',
                    textSecondary: '#98989d',
                    primary: '#0a84ff',
                    hover: '#2c2c2e',
                    inputBg: '#1c1c1e',
                    inputBorder: '#38383a',
                    shadow: 'rgba(0,0,0,0.5)'
                }
            }
            return {
                background: '#ffffff',
                surface: '#f5f5f7',
                surfaceHover: '#e8e8ed',
                border: '#d2d2d7',
                text: '#1d1d1f',
                textSecondary: '#6e6e73',
                primary: '#007aff',
                hover: '#e8e8ed',
                inputBg: '#ffffff',
                inputBorder: '#d2d2d7',
                shadow: 'rgba(0,0,0,0.1)'
            }
        }

        createButton() {
            const isMobile = window.innerWidth <= 768
            const btn = document.createElement('button')
            btn.id = 'banana-btn'
            btn.className = 'mat-mdc-button mat-mdc-button-base mat-unthemed'
            const updateButtonTheme = () => {
                const colors = this.getThemeColors()
                const mobile = window.innerWidth <= 768
                btn.style.cssText = `
                    height: 40px;
                    ${mobile ? 'width: 40px;' : ''}
                    border-radius: ${mobile ? '50%' : '20px'};
                    border: none;
                    background: transparent;
                    color: ${colors.text};
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    font-family: 'Google Sans', Roboto, Arial, sans-serif;
                    margin-left: 4px;
                    transition: background-color 0.2s;
                    padding: ${mobile ? '0' : '0 16px'};
                    gap: ${mobile ? '0' : '8px'};
                `
            }
            updateButtonTheme()
            btn.title = '快捷提示'
            btn.innerHTML = isMobile ? '<span style="font-size: 18px;">🍌</span>' : '<span style="font-size: 16px;">🍌</span><span>Prompts</span>'
            btn.addEventListener('mouseenter', () => {
                const colors = this.getThemeColors()
                btn.style.background = colors.hover
            })
            btn.addEventListener('mouseleave', () => {
                btn.style.background = 'transparent'
            })
            btn.addEventListener('click', (e) => {
                e.preventDefault()
                e.stopPropagation()
                if (this.modal) this.modal.show()
            })
            return btn
        }

        async initButton() {
            if (document.getElementById('banana-btn')) return true
            if (this._initializingButton) {
                return false
            }
            this._initializingButton = true

            try {
                const imageBtn = await this.findClosestInsertButton()
                if (!imageBtn) {
                    return false
                }

                const bananaBtn = this.createButton()
                try {
                    imageBtn.insertAdjacentElement('afterend', bananaBtn)
                } catch (error) {
                    console.error('插入香蕉按钮失败:', error)
                    return false
                }

                return true
            } finally {
                this._initializingButton = false
            }
        }

        async insertPrompt(promptText) {
            const textarea = await this.findPromptInput()
            if (textarea) {
                textarea.focus()
                const lines = promptText.split('\n')
                const htmlContent = lines.map(line => {
                    const escaped = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                    return `<p>${escaped || '<br>'}</p>`
                }).join('')
                textarea.innerHTML = htmlContent
                textarea.dispatchEvent(new Event('input', { bubbles: true }))
                if (this.modal) this.modal.hide()
            }
        }

        waitForElements() { }

        startObserver() {
            const observer = new MutationObserver(async () => {
                const existingBtn = document.getElementById('banana-btn')
                const imageBtn = await this.findClosestInsertButton()
                if (imageBtn) {
                    if (!existingBtn) await this.initButton()
                } else {
                    if (existingBtn) existingBtn.remove()
                }
            })
            observer.observe(document.body, { childList: true, subtree: true })
        }
    }

    // --- Initialization ---
    function init() {
        const hostname = window.location.hostname
        let adapter
        if (hostname.includes('aistudio')) {
            adapter = new AIStudioAdapter()
        } else if (hostname.includes('gemini')) {
            adapter = new GeminiAdapter()
        } else {
            GM_log('Banana Prompt: 未知平台', hostname)
            return
        }
        const modal = new BananaModal(adapter)
        adapter.modal = modal
        adapter.waitForElements()
        adapter.startObserver()
        const handleNavigationChange = () => {
            setTimeout(() => {
                adapter.initButton()
            }, 1000)
        }
        window.addEventListener('popstate', handleNavigationChange)
        window.addEventListener('pushstate', handleNavigationChange)
        window.addEventListener('replacestate', handleNavigationChange)
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init()
    } else {
        window.addEventListener('load', init)
    }

})();
