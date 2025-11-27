// ==UserScript==
// @name                Banana Prompt Quicker
// @namespace           gemini.script
// @tag                 entertainment
// @version             1.3.5
// @description         Prompts quicker is ALL you 🍌 need - UserScript版
// @author              Glidea
// @author              Johnbi
// @license             MIT
// @match               https://aistudio.google.com/*
// @match               https://gemini.google.com/*
// @match               https://*/*
// @noframes
// @icon                data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgY2xhc3M9Imljb25pZnkgaWNvbmlmeS0tbm90byI+PHBhdGggZD0iTTExOS4yMiA5NS4xMmMtMS4xNCAyLjM2LTUuOTEgMi4yMS04LjU0IDEuMzgtNi43Mi0yLjEyLTEwLjktNy45LTEwLjktNy45TDY1LjE0IDczLjlsLTEwLjYxLTUuNTdzLTIuMDYtMy41IDIuMDYtNi4xNyA3LjAxLTIuODcgNy4wMS0yLjg3bDExLjk0IDcuNnM3LjcxLTYgMTUuNTQtNi45MWM3LjQ4LS44NiAxNi43OSA1LjIyIDE5LjI0IDE2LjcgMS45OSA5LjMxIDUuMTQgMTIuNTkgNi4wOSAxMy44Ljk1IDEuMjIgMy43OSAyLjYyIDIuODEgNC42NHoiIGZpbGw9IiNmZjhlMDAiLz48cGF0aCBkPSJNNzcuNzIgMzIuMTVDNzQuNjUgMjEuOTkgNzAuNzcgMTAuMSA2NC45MSA2LjAzYy01LjE5LTMuNi0xMC4yNC0yLjk1LTEyLjY0LTEuMzggMCAwLTQuMzMgMS43Ny01LjQ3IDYuMjQtMS44OCA3LjM0LjU5IDE2LjE1IDIuMiAyNS4yNSAxLjYxIDkuMSAyLjQ1IDE1LjM2IDMuMTggMjIuNjcuMDcuNjYgMTIuMTYgMjIuMTggMTIuMTYgMjIuMThsOS42NSA1LjE3czcuMzctMTUuOTQgNy4yNi0xOC4xOWMtLjEtMi4yNi0xLjI5LTI4LjQtMy41My0zNS44MnoiIGZpbGw9IiNmZmU0YjQiLz48cGF0aCBkPSJNNTIuNTUgNjYuOTRjLS4xMyAyLjQzIDUuNzMgMjEuOCA1LjczIDIxLjhMNzQgODYuMTRzMTEuMTUtNi42IDExLjQ2LTE4LjU3Yy40OC0xOC4wNS0yLjYxLTI2LjU1LTQuODUtMzMuOTctMy4wOC0xMC4xNC05Ljk0LTIzLjUtMTUuNzUtMjcuNjQtMy40MS0yLjQzLTcuMTktMi43OS04Ljc0LTIuNDkgMCAwIDEwLjMyIDguMDggMTUuNTQgMjEuOXM2LjQ1IDI5Ljc5IDYuNDUgMjkuNzktMy44NCAyLjgzLTEyLjkgNC4xM2MtNyAxLjAxLTEzLjA0LS43LTEzLjA0LS43cy41NSA1LjI3LjM4IDguMzV6IiBmaWxsPSIjZmZlMjY1Ii8+PHBhdGggZD0iTTg1LjMzIDgzLjc1bC02LjI5LTEzLjE0LjM0LTQuNjhzMS4zNC0zLjkzLTcuMDMgMi40MmMtMy44OCAyLjk0LTYuMjIgOC4zNi02LjIyIDguMzZzLTEuMTgtMi45Mi01LjMyLTYuNzhjLTMuNjgtMy40Mi04LjYzLTUuMDgtOC42My01LjA4cy0xMC4yOC0yLTExLjQtMS4xM2MtNy4yNSA1LjY2LTEyLjU1IDEyLjU1LTEyLjU1IDEyLjU1TDIyLjkgOTYuNDJsLTguODYgNS40M3MyLjQyIDMuNTQgNS45MiAyLjIyYzIuNzMtMS4wMyA2LjExLTQuMTIgNy45My04LjAxIDIuNS01LjM1IDcuNzUtMTUuNDcgMTAuNDItMTguNjcgNS4xNi02LjE2IDEwLjIyLTguNDEgMTMuOTktNi42MiA0LjI5IDIuMDMuODYgMjIuMjkuODYgMjIuMjlsLTI3LjU4IDIzLjIxLS40NyAzLjE2czQuMDEgMy44NSAxNS4wNiAzLjQ5IDI1LjgzLTQuNDUgMzUuMTgtMTcuMmM4LjI1LTExLjI0IDkuOTgtMjEuOTcgOS45OC0yMS45N3oiIGZpbGw9IiNmZmE3MjYiLz48cGF0aCBkPSJNNjMuNTggODQuOTZjLjI0IDUuNTUtMy4yMiAxMy45Ni0xMS4yMiAyMC45Ny03Ljk5IDcuMDEtMTYuNDMgOS4zMy0yMS42NyA5LjczLTMuOC4yOS00LjkzLTEuODgtNC45My0xLjg4czcuNjYtNy4wNSAxMy4zNS0xMi43YzUuNC01LjM3IDExLjI4LTE2LjY1IDEyLjU2LTIxLjg0IDEuMjgtNS4xOS4xMi04LjY4LjEyLTguNjhzMi40OC42OSA2LjEzIDQuMzVjMy41NCAzLjU1IDUuNTMgNi45NyA1LjY2IDEwLjA1eiIgZmlsbD0iI2ZmYjgwMyIvPjxwYXRoIGQ9Ik0yOS40NSAxMTguNzRjLS44MyAxLjkzLTMuNjggMi4wMS00LjkyLjk0LTEuMTctMS4wMS0yLjMxLTMuMDItMS4xMy01LjI3Ljc4LTEuNDggMy4zNC0xLjg5IDQuNzgtLjc0czIuMDIgMy4zMiAxLjI3IDUuMDd6IiBmaWxsPSIjODc1YjU0Ii8+PHBhdGggZD0iTTIzLjc2IDk3Ljg0Yy0zLjI4IDQuNTUtNi41NyA1LjI0LTcuOTMgNS4zOS0xLjE5LjE0LTIuNDktMS4zOC0yLjM0LTIuNzguMTUtMS40IDIuNDUtMy4zNyAyLjczLTcuNjcuMjgtNC4zLS4wNi0yMC4wNyA4LjY5LTI5LjEzIDYuMTctNi4zOCAxMy43My00LjE4IDE4LjYxLTIuNDkgNS41IDEuOSA4LjY3IDMuNyA4LjY3IDMuN3MtNC41LS4zMS0xMi4yNiA1LjgxYy00LjUxIDMuNTYtNy4xNiA4LjQ1LTkuNjYgMTQuMDYtMS44IDQuMDYtNC4yIDkuOTEtNi41MSAxMy4xMXoiIGZpbGw9IiNmZWU0YjQiLz48cGF0aCBkPSJNMTExIDEwOS41OGMtLjkyIDEuODQtMy4xNyAyLjk4LTUuMTYgMi44OS00LjIxLS4xOC04LjA1LTIuMzUtMTIuMy03LjgzLTYuMDEtNy43Ni0xMS4yNC0yNi4zOC0xNS4xNi0zMS4zNC0yLjY1LTMuMzUtNS45NS01LjAxLTUuOTUtNS4wMXMxLjgyLTEuNTQgMy42NC0yLjQ5YzEuODItLjk1IDYuMjItLjUgNi4yMi0uNWwxOC43OCAzMC4xOCA5LjkzIDE0LjF6IiBmaWxsPSIjZmViODA0Ii8+PHBhdGggZD0iTTEwMC4zOSA2OC40NmM0LjEyIDUuODkgNC42NiAxMS4wNiA1LjI4IDE2LjM0LjU2IDQuNzcgMS43MSAxNC44IDMuNDQgMTguMDcgMS43NCAzLjI3IDMuNDMgNS40IDEuNTYgNy4zOXMtNy4zNyAxLjI4LTExLjMyLTMuMDJjLTMuMTgtMy40Ny00Ljk0LTcuMjUtNy4zMy0xMi44LTIuMzktNS41NS01LjkxLTE4LjY1LTEwLjQ4LTI0LjU3LTIuOTItMy43OC01LjgzLTMuODktNS44My0zLjg5czMuODUtMy4xNCAxMS4yLTMuMjJjNi41OS0uMDcgMTAuMDUuOCAxMy40OCA1Ljd6IiBmaWxsPSIjZmZlNGI0Ii8+PC9zdmc+
// @grant               GM_getValue
// @grant               GM_setValue
// @grant               GM_xmlhttpRequest
// @grant               GM_addElement
// @grant               GM_log
// @grant               GM_openInTab
// @grant               GM_registerMenuCommand
// @grant               GM_addStyle
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
    * Credit by Jan Biniok
    * MIT License
    * source: https://github.com/Tampermonkey/tampermonkey/issues/1334#issuecomment-2442399033
    *
    * Fix https://copilot.microsoft.com/ by CY Fung
    * source: https://greasyfork.org/zh-CN/scripts/522884-default-trusted-types-policy-for-all-pages
    */
    (function () {
        if (typeof window != "undefined" &&
            ('trustedTypes' in window) &&
            ('createPolicy' in window.trustedTypes) &&
            (typeof window.trustedTypes.createPolicy == "function") &&
            window.trustedTypes.defaultPolicy == null
        ) {
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


    // --- ConfigManager (unified prompts + config) ---
    const ConfigManager = (() => {
        const configDetails = {
            url: 'https://raw.githubusercontent.com/glidea/banana-prompt-quicker/main/config.json',
            cacheKey: 'banana_config_cache',
            cacheTsKey: 'banana_config_cache_time',
            defaultValue: null
        }

        const promptsDetails = {
            url: 'https://raw.githubusercontent.com/glidea/banana-prompt-quicker/main/prompts.json',
            cacheKey: 'banana_prompts_cache',
            cacheTsKey: 'banana_prompts_cache_time',
            defaultValue: []
        }

        const CACHE_DURATION = 60 * 60 * 1000 // 60 min

        async function getJsonWithCache(url, key, tsKey, defaultValue) {
            const cache = await chrome.storage.local.get([key, tsKey])
            const cachedData = cache[key]
            const cacheTimestamp = cache[tsKey]
            const now = Date.now()

            if (cachedData && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
                return cachedData
            }

            try {
                const data = await gmFetchJson(url)
                await chrome.storage.local.set({ [key]: data, [tsKey]: now })
                return data
            } catch (e) {
                GM_log(`[Banana] Failed to fetch JSON from ${url}:`, e)
                return cachedData || defaultValue
            }
        }

        return {
            async get() {
                return getJsonWithCache(
                    configDetails.url,
                    configDetails.cacheKey,
                    configDetails.cacheTsKey,
                    configDetails.defaultValue
                )
            },
            async getSelectors(platform, type) {
                const cfg = await this.get()
                const selectors = cfg && (cfg.selectors || cfg.selector)
                return selectors?.[platform]?.[type]
            },
            async getPrompts() {
                return getJsonWithCache(
                    promptsDetails.url,
                    promptsDetails.cacheKey,
                    promptsDetails.cacheTsKey,
                    promptsDetails.defaultValue
                )
            }
        }
    })()

    // 默认主题颜色配置
    function getDefaultThemeColors(theme = 'light') {
        if (theme === 'dark') {
            return {
                background: '#141414',
                surface: '#1c1c1e',
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


    // 20251127: switch to ConfigManager (config.json) only — remove selectors.json legacy usage
    async function getRemoteSelector(platform, type) {
        return ConfigManager.getSelectors(platform, type)
    }

    const FLASH_MODE_PROMPT = {
        title: "灵光模式",
        preview: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/flash_mode.png",
        prompt: `你现在进入【灵光模式: 有灵感就够了】。请按照以下步骤辅助我完成创作：
1. 需求理解：分析我输入的粗略的想法描述（可能会包含图片）
2. 需求澄清：要求我做出细节澄清，提出 3 个你认为最重要的选择题（A/B/C/D），以明确我的生图或修图需求（例如风格、构图、光影、具体相关细节等）。请一次性列出这三个问题
3. 最终执行：等待我回答选择题后，根据我的原始描述和选择结果调用绘图工具生成图片（如果有附图，请务必作为参数传递给绘图工具，以保证一致性）

---

OK，我想要：`,
        link: "https://www.xiaohongshu.com/user/profile/5f7dc54d0000000001004afb",
        author: "Official@glidea",
        isFlash: true
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
            this.sortMode = 'recommend' // 'recommend' | 'random'
            this.loadPrompts()
            this.loadSortMode()
            this.currentPage = 1
            this.pageSize = this.isMobile() ? 8 : 12
            this.filteredPrompts = []
            this.favorites = []
            this.keyboardHandler = this.handleKeyboard.bind(this)
            this._isInitialized = false // 用于区分首次显示和重新显示
            this.randomMap = new Map()
        }

        async loadPrompts() {
            const staticPrompts = await ConfigManager.getPrompts()
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

            this.ensureRandomValues()

            this.updateCategoryDropdown()
            // 只在首次加载或有必要时重置页码
            this.applyFilters(!this._isInitialized)
        }

        ensureRandomValues() {
            this.prompts.forEach(p => {
                const key = `${p.title}-${p.author}`
                if (!this.randomMap.has(key)) {
                    this.randomMap.set(key, Math.random())
                }
                p._randomVal = this.randomMap.get(key)
            })
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

                    this.applyFilters(true)
                }

                optionsContainer.appendChild(option)
            })

            // Reset trigger text if needed
            const currentLabel = this.selectedCategory === 'all' ? '全部' : this.selectedCategory
            triggerText.textContent = currentLabel
        }

        async loadSortMode() {
            const result = await chrome.storage.local.get(['banana-sort-mode'])
            this.sortMode = result['banana-sort-mode'] || 'recommend'
        }

        async setSortMode(mode) {
            this.sortMode = mode
            await chrome.storage.local.set({ 'banana-sort-mode': mode })
        }

        async getCustomPrompts() {
            const result = await chrome.storage.local.get(['banana-custom-prompts'])
            return result['banana-custom-prompts'] || []
        }

        async compressImage(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = (event) => {
                    const img = new Image()
                    img.src = event.target.result
                    img.onload = () => {
                        const canvas = document.createElement('canvas')
                        const MAX_WIDTH = 300
                        const MAX_HEIGHT = 300
                        let width = img.width
                        let height = img.height

                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width
                                width = MAX_WIDTH
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height
                                height = MAX_HEIGHT
                            }
                        }

                        canvas.width = width
                        canvas.height = height
                        const ctx = canvas.getContext('2d')
                        ctx.drawImage(img, 0, 0, width, height)

                        // 压缩为 JPEG, 质量 0.7
                        const dataUrl = canvas.toDataURL('image/jpeg', 0.7)
                        resolve(dataUrl)
                    }
                    img.onerror = reject
                }
                reader.onerror = reject
            })
        }

        show() {
            if (!this.modal) {
                this.modal = this.createModal()
                document.body.appendChild(this.modal)
            }
            this.modal.style.display = 'flex'
            if (!this._isInitialized) {
                // 首次显示：完整初始化
                this.updateCategoryDropdown()
                this.applyFilters(true)
                this._isInitialized = true
            } else {
                // 重新显示：只刷新数据，保留状态
                this.loadPrompts().then(() => {
                    // 刷新当前页面显示（保持在当前页）
                    this.renderCurrentPage()
                })
            }
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
            searchSection.id = 'prompts-search-section'
            searchSection.style.cssText = `padding: ${mobile ? '16px' : '20px 24px'}; border-bottom: 1px solid ${colors.border}; display: flex; ${mobile ? 'flex-direction: column; gap: 12px;' : 'align-items: center; gap: 16px;'}; overflow: visible; z-index: 100; position: relative;`

            // 搜索框容器
            const searchContainer = document.createElement('div')
            searchContainer.style.cssText = `${mobile ? 'width: 100%;' : 'flex: 1;'} display: flex; align-items: center; gap: 8px; position: relative;`

            const searchInput = document.createElement('input')
            searchInput.type = 'text'
            searchInput.id = 'prompt-search'
            searchInput.placeholder = '搜索...'
            searchInput.style.cssText = `flex: 1; padding: ${mobile ? '14px 20px' : '12px 18px'}; border: 1px solid ${colors.inputBorder}; border-radius: 16px; outline: none; font-size: ${mobile ? '16px' : '14px'}; background: ${colors.inputBg}; color: ${colors.text}; box-sizing: border-box; transition: all 0.2s;`
            searchInput.addEventListener('input', () => this.applyFilters(true))

            searchInput.addEventListener('focus', () => {
                searchInput.style.borderColor = colors.primary
            })
            searchInput.addEventListener('blur', () => {
                const currentColors = this.adapter.getThemeColors()
                searchInput.style.borderColor = currentColors.inputBorder
            })


            // Sort Mode Button
            const sortBtnContainer = document.createElement('div')
            sortBtnContainer.style.cssText = 'position: relative; display: flex; align-items: center;'

            const sortBtn = document.createElement('button')
            sortBtn.id = 'sort-mode-btn'
            const currentModeText = this.sortMode === 'recommend' ? '随机焕新' : '推荐排序'
            sortBtn.innerHTML = this.sortMode === 'recommend'
                ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>'
                : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>'
            sortBtn.style.cssText = `padding: ${mobile ? '10px' : '8px'}; border: none; background: transparent; color: ${colors.textSecondary}; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; border-radius: 8px;`
            sortBtn.onclick = () => this.toggleSortMode()

            // Tooltip
            const tooltip = document.createElement('div')
            tooltip.id = 'sort-tooltip'
            tooltip.textContent = `切换${currentModeText}`
            tooltip.style.cssText = `position: absolute; bottom: -40px; left: 50%; transform: translateX(-50%); background: ${colors.surface}; color: ${colors.text}; padding: 6px 12px; border-radius: 8px; font-size: 12px; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.2s; box-shadow: 0 4px 12px ${colors.shadow}; border: 1px solid ${colors.border}; z-index: 1000;`

            if (!mobile) {
                sortBtn.onmouseenter = () => {
                    sortBtn.style.color = colors.primary
                    sortBtn.style.transform = 'scale(1.1)'
                    sortBtn.style.background = `${colors.primary}10`
                    tooltip.style.opacity = '1'
                }
                sortBtn.onmouseleave = () => {
                    sortBtn.style.color = colors.textSecondary
                    sortBtn.style.transform = 'scale(1)'
                    sortBtn.style.background = 'transparent'
                    tooltip.style.opacity = '0'
                }
            }

            sortBtnContainer.appendChild(sortBtn)
            sortBtnContainer.appendChild(tooltip)

            searchContainer.appendChild(searchInput)
            searchContainer.appendChild(sortBtnContainer)

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

            searchSection.appendChild(searchContainer)
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

            this.applyFilters(true)
        }

        async toggleSortMode() {
            const newMode = this.sortMode === 'recommend' ? 'random' : 'recommend'
            await this.setSortMode(newMode)
            if (newMode === 'random') {
                this.randomMap.clear()
                this.ensureRandomValues()
            }

            // 更新按钮图标和 tooltip
            const sortBtn = document.getElementById('sort-mode-btn')
            const tooltip = document.getElementById('sort-tooltip')
            if (sortBtn) {
                const currentModeText = newMode === 'recommend' ? '随机焕新' : '推荐排序'
                sortBtn.innerHTML = newMode === 'recommend'
                    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>'
                    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>'

                if (tooltip) {
                    tooltip.textContent = `切换${currentModeText}`
                }
            }

            // 重新应用过滤和排序
            this.applyFilters(true)
        }

        async applyFilters(resetPage = true) {
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

            // Sort: Favorites > Custom > Others (根据 sortMode)
            // 先分组
            const favoriteItems = []
            const customItems = []
            const normalItems = []

            filtered.forEach(item => {
                const itemId = `${item.title}-${item.author}`
                const isFavorite = this.favorites.includes(itemId)

                if (isFavorite) {
                    favoriteItems.push(item)
                } else if (item.isCustom) {
                    customItems.push(item)
                } else {
                    normalItems.push(item)
                }
            })

            // 普通项根据 sortMode 排序
            if (this.sortMode === 'random') {
                normalItems.sort((a, b) => a._randomVal - b._randomVal)
            }
            // recommend 模式下保持原顺序

            // 合并：Flash Mode > 收藏 > 自定义 > 普通
            filtered = [...favoriteItems, ...customItems, ...normalItems]

            // Always prepend Flash Mode
            filtered.unshift(FLASH_MODE_PROMPT)

            this.filteredPrompts = filtered

            // 智能处理页码：只在需要时重置，或者当前页超出范围时调整
            if (resetPage) {
                this.currentPage = 1
            } else {
                // 确保当前页在有效范围内
                const totalPages = Math.ceil(this.filteredPrompts.length / this.pageSize)
                if (this.currentPage > totalPages && totalPages > 0) {
                    this.currentPage = totalPages
                }
            }

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

            const pageInfo = document.createElement('div')
            const editablePageBtn = document.createElement('input')
            editablePageBtn.id = 'current-page-input'
            editablePageBtn.type = 'number'
            editablePageBtn.value = this.currentPage
            editablePageBtn.min = 1
            editablePageBtn.max = totalPages
            editablePageBtn.style.cssText = `width: fit-content; max-width: 100px; padding: ${mobile ? '8px' : '6px'}; border: 1px solid ${colors.border}; border-radius: 12px; background: ${colors.surface}; text-align: center; outline: none; box-sizing: border-box; margin: 0 8px;color: inherit; font-size: inherit; font-weight: inherit;`
            editablePageBtn.onchange = () => {
                let val = parseInt(editablePageBtn.value)
                if (isNaN(val) || val < 1) val = 1
                if (val > totalPages) val = totalPages
                this.currentPage = val
                this.renderCurrentPage()
            }
            const otherPageInfo = document.createElement('span')
            otherPageInfo.textContent = `/ ${totalPages}`
            pageInfo.style.cssText = `color: ${colors.text}; font-size: ${mobile ? '14px' : '13px'}; font-weight: 500;`
            pageInfo.appendChild(editablePageBtn)
            pageInfo.appendChild(otherPageInfo)

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

            const img = GM_addElement('img', {
                src: prompt.preview,
                alt: prompt.title,
                style: `width: 100%; height: ${mobile ? '180px' : '200px'}; object-fit: cover; flex-shrink: 0;`
            })
            img.onclick = () => this.adapter.insertPrompt(prompt.prompt)

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
                    GM_openInTab(prompt.link, { active: true })
                }
            } else {
                author.onclick = () => this.adapter.insertPrompt(prompt.prompt)
            }

            const modeTag = document.createElement('span')
            let tagText = '生图'
            let tagBg = ''
            let tagColor = ''

            if (prompt.isFlash) {
                tagText = '万能'
                // Special Flash Mode styling (e.g., purple/gradient)
                tagBg = theme === 'dark' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(147, 51, 234, 0.12)'
                tagColor = theme === 'dark' ? '#a855f7' : '#9333ea'
            } else {
                const isEdit = prompt.mode === 'edit'
                tagText = isEdit ? '编辑' : '生图'
                tagBg = theme === 'dark'
                    ? (isEdit ? 'rgba(10, 132, 255, 0.15)' : 'rgba(48, 209, 88, 0.15)')
                    : (isEdit ? 'rgba(0, 122, 255, 0.12)' : 'rgba(52, 199, 89, 0.12)')
                tagColor = theme === 'dark'
                    ? (isEdit ? '#0a84ff' : '#30d158')
                    : (isEdit ? '#007aff' : '#34c759')
            }

            modeTag.style.cssText = `background: ${tagBg}; color: ${tagColor}; padding: 4px 10px; border-radius: 12px; font-size: ${mobile ? '12px' : '11px'}; font-weight: 600; backdrop-filter: blur(10px); flex-shrink: 0;`
            modeTag.textContent = tagText

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

            card.appendChild(img)
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
            this.applyFilters(false)
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

            // Image Upload UI
            const imageContainer = document.createElement('div')
            imageContainer.style.cssText = `display: flex; align-items: center; gap: 12px; width: 100%;`

            const fileInput = document.createElement('input')
            fileInput.type = 'file'
            fileInput.accept = 'image/*'
            fileInput.style.display = 'none'

            const previewBtn = document.createElement('div')
            previewBtn.style.cssText = `width: 60px; height: 60px; border-radius: 12px; border: 1px dashed ${colors.border}; background: ${colors.inputBg}; cursor: pointer; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; flex-shrink: 0; transition: all 0.2s;`

            const placeholderIcon = document.createElement('span')
            placeholderIcon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${colors.textSecondary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`
            previewBtn.appendChild(placeholderIcon)

            const previewImg = document.createElement('img')
            previewImg.style.cssText = `width: 100%; height: 100%; object-fit: cover; display: none;`
            previewBtn.appendChild(previewImg)

            const uploadTip = document.createElement('span')
            uploadTip.textContent = '上传封面 (可选)'
            uploadTip.style.cssText = `font-size: 13px; color: ${colors.textSecondary};`

            const clearImgBtn = document.createElement('button')
            clearImgBtn.innerHTML = '×'
            clearImgBtn.style.cssText = `margin-left: auto; width: 24px; height: 24px; border-radius: 50%; background: ${colors.border}; color: ${colors.text}; border: none; cursor: pointer; display: none; align-items: center; justify-content: center; font-size: 16px; padding-bottom: 2px;`

            previewBtn.onclick = () => fileInput.click()

            let selectedFile = null

            fileInput.onchange = (e) => {
                if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0]
                    selectedFile = file

                    const reader = new FileReader()
                    reader.onload = (evt) => {
                        previewImg.src = evt.target.result
                        previewImg.style.display = 'block'
                        placeholderIcon.style.display = 'none'
                        previewBtn.style.borderStyle = 'solid'
                        clearImgBtn.style.display = 'flex'
                    }
                    reader.readAsDataURL(file)
                }
            }

            clearImgBtn.onclick = () => {
                fileInput.value = ''
                selectedFile = null
                previewImg.src = ''
                previewImg.style.display = 'none'
                placeholderIcon.style.display = 'block'
                previewBtn.style.borderStyle = 'dashed'
                clearImgBtn.style.display = 'none'
            }

            imageContainer.appendChild(fileInput)
            imageContainer.appendChild(previewBtn)
            imageContainer.appendChild(uploadTip)
            imageContainer.appendChild(clearImgBtn)

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

                let previewDataUrl = 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg'

                if (selectedFile) {
                    try {
                        saveBtn.textContent = '处理中...'
                        saveBtn.disabled = true
                        previewDataUrl = await this.compressImage(selectedFile)
                    } catch (err) {
                        console.error('图片压缩失败', err)
                        alert('图片处理失败，将使用默认图标')
                    } finally {
                        saveBtn.textContent = '保存'
                        saveBtn.disabled = false
                    }
                }

                await this.saveCustomPrompt({
                    title: titleVal,
                    prompt: promptVal,
                    mode: selectedMode,
                    category: selectedAddCategory,
                    preview: previewDataUrl
                })
                document.body.removeChild(overlay)
                cleanup()
            }

            btnContainer.appendChild(cancelBtn)
            btnContainer.appendChild(saveBtn)

            dialog.appendChild(title)
            dialog.appendChild(titleInput)
            dialog.appendChild(imageContainer)
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
                preview: data.preview || 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg'
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
            return getDefaultThemeColors(this.getCurrentTheme())


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

                textarea.focus()
                const length = promptText.length
                textarea.setSelectionRange(length, length)

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
            observer.observe(document.body, { childList: true, subtree: true })
        }
    }

    class GeminiAdapter {
        constructor() {
            this.modal = null
            this._initializingButton = false
        }

        async findPromptInput() {
            let el = document.querySelector('div.ql-editor[contenteditable="true"]')
            if (el) {
                return el
            }

            // Fallback.
            const selector = await getRemoteSelector('gemini', 'promptInput')
            return document.querySelector(selector)
        }

        async findClosestInsertButton() {
            let el = document.querySelector('button.toolbox-drawer-item-deselect-button:has(img.img-icon)')
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
            return getDefaultThemeColors(this.getCurrentTheme())
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

                // 聚焦并将光标定位到文字末尾
                textarea.focus()
                const range = document.createRange()
                const sel = window.getSelection()
                range.selectNodeContents(textarea)
                range.collapse(false) // false 表示折叠到末尾
                sel.removeAllRanges()
                sel.addRange(range)

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

    // 通用适配器，用于任意网站
    class UniversalAdapter {
        constructor() {
            this.modal = null
            this.lastFocusedElement = null
            this.trackFocusedElement()
        }

        // 跟踪最后聚焦的可编辑元素
        trackFocusedElement() {
            document.addEventListener('focusin', (e) => {
                if (this.isEditableElement(e.target)) {
                    this.lastFocusedElement = e.target
                }
            })
        }

        isEditableElement(el) {
            if (!el) return false
            return el.tagName === 'TEXTAREA' ||
                (el.tagName === 'INPUT' && ['text', 'search', 'email', 'url'].includes(el.type)) ||
                el.isContentEditable
        }

        async findPromptInput() {
            // 优先使用最后聚焦的元素
            if (this.lastFocusedElement && this.isEditableElement(this.lastFocusedElement)) {
                return this.lastFocusedElement
            }
            // fallback 到当前激活元素
            const active = document.activeElement
            if (this.isEditableElement(active)) {
                return active
            }
            return null
        }

        async insertPrompt(promptText) {
            const el = await this.findPromptInput()
            if (!el || !this.isEditableElement(el)) {
                alert('🍌 请先点击输入框，然后再选择脚本菜单的 Banana Prompts')
                return
            }

            if (el.isContentEditable) {
                // contenteditable 处理 - 在光标位置插入
                const selection = window.getSelection()
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0)
                    range.deleteContents()

                    const lines = promptText.split('\n')
                    const fragment = document.createDocumentFragment()

                    lines.forEach((line, index) => {
                        const textNode = document.createTextNode(line)
                        fragment.appendChild(textNode)
                        if (index < lines.length - 1) {
                            fragment.appendChild(document.createElement('br'))
                        }
                    })

                    range.insertNode(fragment)
                    range.collapse(false)
                    selection.removeAllRanges()
                    selection.addRange(range)
                } else {
                    // 如果没有选区，追加到末尾
                    const htmlContent = promptText.split('\n').map(line => {
                        const escaped = line
                            .replace(/&/g, '&amp;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;')
                        return `<p>${escaped || '<br>'}</p>`
                    }).join('')
                    el.innerHTML += htmlContent
                }
                el.dispatchEvent(new Event('input', { bubbles: true }))
            } else {
                // textarea/input 处理 - 在光标位置插入
                const start = el.selectionStart
                const end = el.selectionEnd
                const currentValue = el.value

                const newValue = currentValue.substring(0, start) + promptText + currentValue.substring(end)
                el.value = newValue

                // 设置光标位置到插入内容之后
                const newCursorPos = start + promptText.length
                el.setSelectionRange(newCursorPos, newCursorPos)

                el.dispatchEvent(new Event('input', { bubbles: true }))
                el.focus()
            }

            if (this.modal) {
                this.modal.hide()
            }
        }

        getCurrentTheme() {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        }

        getThemeColors() {
            return getDefaultThemeColors(this.getCurrentTheme())
        }

        // 通用适配器不需要按钮
        initButton() { return false }
        waitForElements() { }
        startObserver() { }
    }

    // --- Initialization ---
    const event = new Event("fire-modal");
    function init() {
        const hostname = window.location.hostname
        let adapter
        if (hostname.includes('aistudio')) {
            adapter = new AIStudioAdapter()
        } else if (hostname.includes('gemini')) {
            adapter = new GeminiAdapter()
        } else {
            // 其他网站使用通用适配器
            adapter = new UniversalAdapter()
        }
        const modal = new BananaModal(adapter)
        adapter.modal = modal

        // 只在特定平台初始化按钮和观察器
        if (hostname.includes('aistudio') || hostname.includes('gemini')) {
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

        document.body.addEventListener("fire-modal", () => {
            if (modal) {
                modal.show()
            }
        })
    }

    GM_addStyle('#prompts-modal, #prompts-modal *, #prompts-modal *::before, #prompts-modal *::after{ font-family: Roboto,"Helvetica Neue",sans-serif; };');
    GM_addStyle('#prompts-search-section, #prompts-search-section *{ box-sizing: content-box; line-height: normal; };');
    GM_registerMenuCommand("🍌 Insert Banana Prompts", () => document.body.dispatchEvent(event), {
        autoClose: true
    });

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init()
    } else {
        window.addEventListener('load', init)
    }
})();
