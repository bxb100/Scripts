
const ORIGIN_URL = "http://127.0.0.1:9090";
const DENY_BODY = "Share access only";

const MEDIA_METHODS = new Set(["GET", "HEAD"]);

const GALLERY_HTML = String.raw`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Immich shared album gallery">
  <meta name="color-scheme" content="dark">
  <title>Photo Gallery</title>
  <style>
    :root {
      color-scheme: dark;
    }
    html {
      min-height: 100%;
      background-color: rgb(1 5 19);
      background-image: url(data:image/png;base64,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);
    }
    body {
      min-height: 100%;
      overflow-x: hidden;
      margin: 0;
    }
    .box {
      position: absolute;
      overflow: hidden;
      background-color: rgb(34 36 53);
      background-repeat: no-repeat;
      background-size: 100%;
      border-radius: 16px;
      box-shadow:
        0 0 2px 0 rgb(255 255 255 / 0.2),
        0 4px 28px 0 rgb(0 0 0 / 0.4);
    }
    .box img {
      display: block;
      width: 100%;
      height: auto;
      user-select: none;
    }
    .box.skeleton {
      background-image: none;
      cursor: default;
      pointer-events: none;
    }
    .box.skeleton::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 2;
      background: linear-gradient(
        105deg,
        transparent 30%,
        rgb(255 255 255 / 0.08) 45%,
        rgb(255 255 255 / 0.13) 50%,
        transparent 65%
      );
      transform: translateX(-100%);
      animation: skeleton-shimmer 1.6s ease-in-out infinite;
    }
    .box.skeleton .prompt {
      display: block;
      top: auto;
      bottom: 0;
      height: 52px;
      padding: 0;
    }
    .box.skeleton .prompt::before,
    .box.skeleton .prompt::after {
      content: "";
      position: absolute;
      left: 12px;
      height: 10px;
      border-radius: 999px;
      background: rgb(89 95 111 / 0.62);
    }
    .box.skeleton .prompt::before {
      top: 13px;
      width: 68%;
    }
    .box.skeleton .prompt::after {
      top: 31px;
      width: 42%;
    }
    .prompt {
      position: absolute;
      width: 100%;
      box-sizing: border-box;
      display: -webkit-box;
      padding: 8px 12px 0;
      overflow-wrap: anywhere;
      color: rgb(192 198 205);
      font-family: "DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      font-size: 14px;
      cursor: text;
      white-space: pre-wrap;
      -webkit-box-orient: vertical;
      scrollbar-color: rgb(89 95 111) transparent;
      scrollbar-width: thin;
      transition: opacity 180ms ease;
    }
    .prompt::before {
      content: "❝";
      padding-right: 2px;
      color: rgb(122 126 130);
    }
    .prompt.expandable {
      cursor: pointer;
    }
    .prompt.expandable:focus-visible {
      outline: 2px solid rgb(174 195 255 / 0.8);
      outline-offset: -2px;
    }
    .description-card {
      position: absolute;
      right: 12px;
      bottom: 12px;
      left: 12px;
      z-index: 3;
      box-sizing: border-box;
      max-height: calc(100% - 36px);
      padding: 18px 18px 20px;
      overflow: auto;
      border-radius: 16px;
      background: rgb(34 36 53 / 0.96);
      box-shadow:
        0 0 2px 0 rgb(255 255 255 / 0.2),
        0 4px 28px 0 rgb(0 0 0 / 0.4);
      color: rgb(192 198 205);
      font-family: "DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      font-size: 14px;
      line-height: 20px;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      overscroll-behavior: contain;
      user-select: text;
      -webkit-user-select: text;
      cursor: text;
      scrollbar-color: rgb(106 114 135) transparent;
      scrollbar-width: thin;
      opacity: 0;
      clip-path: inset(calc(100% - 60px) 0 0 round 16px);
      transform: translateY(22px) scale(0.92);
      transform-origin: center bottom;
      pointer-events: none;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      transition:
        opacity 180ms ease,
        clip-path 420ms cubic-bezier(0.2, 0.9, 0.25, 1),
        transform 420ms cubic-bezier(0.2, 0.9, 0.25, 1.15);
    }
    .description-card::before {
      content: "❝";
      padding-right: 2px;
      color: rgb(122 126 130);
    }
    .box.description-expanded .prompt {
      opacity: 0;
      pointer-events: none;
    }
    .box.description-expanded .description-card {
      opacity: 1;
      clip-path: inset(0 0 0 round 16px);
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }
    .description-card:focus-visible {
      outline: 2px solid rgb(174 195 255 / 0.85);
      outline-offset: -3px;
    }
    #status {
      position: fixed;
      inset: 0;
      z-index: 100000;
      display: grid;
      place-items: center;
      padding: 24px;
      background: rgb(1 5 19 / 0.78);
      color: rgb(192 198 205);
      font-family: "DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      text-align: center;
      backdrop-filter: blur(12px);
    }
    #status[hidden] {
      display: none;
    }
    .status-card {
      max-width: 34rem;
      padding: 20px 24px;
      border-radius: 16px;
      background: rgb(34 36 53 / 0.96);
      box-shadow:
        0 0 2px 0 rgb(255 255 255 / 0.2),
        0 4px 28px 0 rgb(0 0 0 / 0.4);
    }
    .spinner {
      width: 24px;
      height: 24px;
      margin: 0 auto 14px;
      border: 2px solid rgb(255 255 255 / 0.18);
      border-top-color: rgb(226 231 240);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    .status-title {
      margin: 0;
      font-size: 16px;
      font-weight: 650;
    }
    .status-detail {
      margin: 8px 0 0;
      color: rgb(122 126 130);
      font-size: 13px;
      line-height: 1.5;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes skeleton-shimmer {
      to { transform: translateX(100%); }
    }
    @media (prefers-reduced-motion: reduce) {
      .spinner { animation: none; }
      .box.skeleton::before { animation: none; }
      .description-card { transition: none; }
    }
  </style>
</head>
<body>
  <div id="status" role="status" aria-live="polite">
    <div class="status-card">
      <div class="spinner" aria-hidden="true"></div>
      <p class="status-title">Loading shared album</p>
      <p class="status-detail">Fetching album metadata and photos from Immich.</p>
    </div>
  </div>

  <script>
    const statusNode = document.getElementById('status');

    function shareKeyFromPath(pathname) {
      const match = pathname.match(/^\/share\/([^/]+)\/?$/);
      if (!match) return '';
      try {
        return decodeURIComponent(match[1]);
      } catch {
        return '';
      }
    }

    const sharedLinkKey = shareKeyFromPath(window.location.pathname);

    function apiUrl(path) {
      const url = new URL(path, window.location.origin);
      url.searchParams.set('key', sharedLinkKey);
      return url.pathname + url.search;
    }

    function setStatus(title, detail, loading) {
      statusNode.hidden = false;
      statusNode.querySelector('.status-title').textContent = title;
      statusNode.querySelector('.status-detail').textContent = detail;
      statusNode.querySelector('.spinner').hidden = !loading;
    }

    async function fetchJson(path) {
      const response = await fetch(apiUrl(path), {
        headers: { accept: 'application/json' },
        credentials: 'omit',
      });
      if (!response.ok) {
        throw new Error('Request failed (' + response.status + ').');
      }
      return response.json();
    }

    async function mapWithConcurrency(items, concurrency, mapper) {
      const results = new Array(items.length);
      let cursor = 0;

      async function consume() {
        while (cursor < items.length) {
          const index = cursor;
          cursor += 1;
          results[index] = await mapper(items[index], index);
        }
      }

      const workers = [];
      const workerCount = Math.min(concurrency, items.length);
      for (let index = 0; index < workerCount; index += 1) workers.push(consume());
      await Promise.all(workers);
      return results;
    }

    function bucketDate(value) {
      return value.includes('T') ? value : value + 'T00:00:00.000Z';
    }

    function normalizeBucket(bucket) {
      const ids = Array.isArray(bucket.id) ? bucket.id : [];
      return ids.map(function toAsset(id, index) {
        return {
          id: id,
          ratio: Number(Array.isArray(bucket.ratio) ? bucket.ratio[index] : 0),
          thumbhash: String(Array.isArray(bucket.thumbhash) ? bucket.thumbhash[index] || '' : ''),
          isImage: !Array.isArray(bucket.isImage) || bucket.isImage[index] === true,
          isTrashed: Array.isArray(bucket.isTrashed) && bucket.isTrashed[index] === true,
          status: String(Array.isArray(bucket.status) ? bucket.status[index] || '' : ''),
        };
      });
    }

    function fileNameWithoutExtension(value) {
      const name = typeof value === 'string' ? value.trim() : '';
      return name.replace(/\.[^.]+$/, '');
    }

    function assetImageUrl(asset, size) {
      const params = new URLSearchParams({ size: size, edited: 'true' });
      if (asset.thumbhash) params.set('c', asset.thumbhash);
      return apiUrl('/api/assets/' + encodeURIComponent(asset.id) + '/thumbnail?' + params.toString());
    }

    function fallbackAssetDimensions(asset) {
      const ratio = Number.isFinite(asset.ratio) && asset.ratio > 0 ? asset.ratio : 1;
      return {
        width: Math.max(1, Math.round(ratio * 1000)),
        height: 1000,
      };
    }

    function createSkeletonItem(asset) {
      const dimensions = fallbackAssetDimensions(asset);
      return {
        id: asset.id,
        w: dimensions.width,
        h: dimensions.height,
        prompt: '',
        thumbnailUrl: '',
        previewUrl: '',
        skeleton: true,
      };
    }

    async function loadGalleryItem(asset, index, showMetadata) {
      let detail = null;
      if (showMetadata) {
        try {
          detail = await fetchJson('/api/assets/' + encodeURIComponent(asset.id));
        } catch (error) {
          console.warn('Unable to load asset metadata', asset.id, error);
        }
      }

      const fallbackDimensions = fallbackAssetDimensions(asset);
      const detailWidth = Number(detail && detail.width);
      const detailHeight = Number(detail && detail.height);
      const width = Number.isFinite(detailWidth) && detailWidth > 0 ? detailWidth : fallbackDimensions.width;
      const height = Number.isFinite(detailHeight) && detailHeight > 0 ? detailHeight : fallbackDimensions.height;
      const description = detail && detail.exifInfo && typeof detail.exifInfo.description === 'string'
        ? detail.exifInfo.description.trim()
        : '';
      const fallbackName = fileNameWithoutExtension(detail && detail.originalFileName);
      const prompt = description || fallbackName || 'Photo ' + (index + 1);

      return {
        id: asset.id,
        w: width,
        h: height,
        prompt: prompt,
        thumbnailUrl: assetImageUrl(asset, 'thumbnail'),
        previewUrl: assetImageUrl(asset, 'preview'),
        skeleton: false,
      };
    }

    async function loadPhotoGalleryData() {
      if (!sharedLinkKey) throw new Error('Open this gallery with /share/{key}.');
      const sharedLink = await fetchJson('/api/shared-links/me');
      if (!sharedLink.album || !sharedLink.album.id) throw new Error('The shared link does not contain an album.');

      const album = sharedLink.album;
      const order = album.order === 'asc' ? 'asc' : 'desc';
      const showMetadata = sharedLink.showMetadata === true;
      document.title = album.albumName ? album.albumName + ' — Photo Gallery' : 'Photo Gallery';

      const bucketQuery = new URLSearchParams({ albumId: album.id, order: order });
      const buckets = await fetchJson('/api/timeline/buckets?' + bucketQuery.toString());
      if (!Array.isArray(buckets)) throw new Error('Immich returned an invalid timeline bucket list.');

      const bucketPayloads = await mapWithConcurrency(buckets, 4, function loadBucket(bucket) {
        const query = new URLSearchParams({
          albumId: album.id,
          order: order,
          timeBucket: bucketDate(String(bucket.timeBucket)),
        });
        return fetchJson('/api/timeline/bucket?' + query.toString());
      });

      const timelineAssets = bucketPayloads
        .flatMap(normalizeBucket)
        .filter(function keepImage(asset) {
          return asset.isImage && !asset.isTrashed && (!asset.status || asset.status === 'active');
        });

      const initialItemLimit = 50;
      const initialAssets = timelineAssets.slice(0, initialItemLimit);
      const remainingAssets = timelineAssets.slice(initialItemLimit);
      const initialItems = await mapWithConcurrency(initialAssets, 6, function loadInitialAsset(asset, index) {
        return loadGalleryItem(asset, index, showMetadata);
      });

      return {
        items: initialItems.concat(remainingAssets.map(createSkeletonItem)),
        remainingAssets: remainingAssets,
        remainingOffset: initialAssets.length,
        showMetadata: showMetadata,
      };
    }

    function startGallery(photoGalleryData) {
      let scheduledRender = false;
      function scheduleRender() {
        if (scheduledRender) return;
        scheduledRender = true;
        requestAnimationFrame(function renderAndMaybeScheduleAnotherRender(now) {
          scheduledRender = false;
          if (render(now)) scheduleRender();
        });
      }

      const msPerAnimationStep = 4;

      function spring(pos, v, k, b) {
        return {
          pos: pos,
          dest: pos,
          v: v === undefined ? 0 : v,
          k: k === undefined ? 290 : k,
          b: b === undefined ? 30 : b,
        };
      }

      function springStep(config) {
        const t = msPerAnimationStep / 1000;
        const springForce = -config.k * (config.pos - config.dest);
        const damperForce = -config.b * config.v;
        const acceleration = springForce + damperForce;
        const newVelocity = config.v + acceleration * t;
        config.pos += newVelocity * t;
        config.v = newVelocity;
      }

      function springGoToEnd(config) {
        config.pos = config.dest;
        config.v = 0;
      }

      function clamp(min, value, max) {
        return value > max ? max : value < min ? min : value;
      }

      const promptPaddingBottom = 8;
      const promptSizeY = 52;
      const prompt1DSizeY = 72;
      const boxesGapX = 24;
      const boxesGapY = 24;
      const boxes1DGapX = 52;
      const boxes1DGapY = 28;
      const windowPaddingTop = 40;
      const gapTopPeek = 40;
      const hitArea1DSizeX = 100;

      function colsBoxMaxSizeXF(containerSizeX) {
        const boxMinSizeX = 220;
        const cols = clamp(1, Math.floor((containerSizeX - boxesGapX) / (boxMinSizeX + boxesGapX)), 7);
        return {
          cols: cols,
          boxMaxSizeX: Math.max(1, (containerSizeX - boxesGapX - cols * boxesGapX) / cols),
        };
      }

      const isSafari = navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');
      if (isSafari) {
        document.body.style.contain = 'layout';
        document.body.style.width = '100vw';
        document.body.style.height = '100vh';
      }

      const debug = false;
      let debugTimestamp = 0;
      let animatedUntilTime = null;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      const coarsePointer = window.matchMedia('(hover: none) and (pointer: coarse)');
      let anchor = 0;
      let expandedPromptId = null;
      let windowSizeX = document.documentElement.clientWidth;
      let scrollY = isSafari ? document.body.scrollTop : window.scrollY;
      const pointer = { x: -Infinity, y: -Infinity };
      const events = { keydown: null, click: null, mousemove: null };

      const data = (function createBoxData() {
        const windowSizeY = document.documentElement.clientHeight;
        const dimensions = colsBoxMaxSizeXF(windowSizeX);
        const imgMaxSizeY = dimensions.boxMaxSizeX + 100;

        return photoGalleryData.map(function createBox(item, index) {
          const ar = item.w / item.h;
          const sizeX = Math.min(item.w, dimensions.boxMaxSizeX, imgMaxSizeY * ar);
          const sizeY = sizeX / ar + promptSizeY;
          const node = document.createElement('div');
          const img = document.createElement('img');
          const promptNode = document.createElement('figcaption');
          const descriptionCardNode = document.createElement('div');

          node.className = item.skeleton ? 'box skeleton' : 'box';
          if (!item.skeleton) {
            node.style.backgroundImage = 'url("' + item.thumbnailUrl.replace(/"/g, '%22') + '")';
          }
          if (item.skeleton) node.setAttribute('aria-hidden', 'true');
          img.alt = item.prompt;
          img.draggable = false;
          promptNode.className = 'prompt';
          promptNode.textContent = item.prompt;
          descriptionCardNode.className = 'description-card';
          descriptionCardNode.textContent = item.prompt;
          descriptionCardNode.setAttribute('aria-hidden', 'true');
          descriptionCardNode.addEventListener('click', function stopDescriptionClick(event) {
            event.stopPropagation();
          });
          node.append(img, promptNode, descriptionCardNode);

          return {
            id: item.id,
            previewUrl: item.previewUrl,
            naturalSizeX: item.w,
            ar: ar,
            skeleton: item.skeleton,
            sizeX: spring(sizeX),
            sizeY: spring(sizeY),
            x: spring(Math.floor(index / dimensions.cols) * -windowSizeX - windowSizeX),
            y: spring(windowSizeY + Math.floor(index / dimensions.cols) * imgMaxSizeY),
            scale: spring(1),
            fxFactor: spring(20),
            node: node,
            img: img,
            promptNode: promptNode,
            descriptionCardNode: descriptionCardNode,
          };
        });
      })();

      function springForEach(callback) {
        for (const item of data) {
          callback(item.sizeX);
          callback(item.sizeY);
          callback(item.x);
          callback(item.y);
          callback(item.scale);
          callback(item.fxFactor);
        }
      }

      function stepSpring(config, steps) {
        for (let index = 0; index < steps; index += 1) springStep(config);
        if (Math.abs(config.v) < 0.01 && Math.abs(config.dest - config.pos) < 0.01) {
          springGoToEnd(config);
          return false;
        }
        return true;
      }

      function stepSprings(steps) {
        let stillAnimating = false;
        for (const item of data) {
          if (stepSpring(item.sizeX, steps)) stillAnimating = true;
          if (stepSpring(item.sizeY, steps)) stillAnimating = true;
          if (stepSpring(item.x, steps)) stillAnimating = true;
          if (stepSpring(item.y, steps)) stillAnimating = true;
          if (stepSpring(item.scale, steps)) stillAnimating = true;
          if (stepSpring(item.fxFactor, steps)) stillAnimating = true;
        }
        return stillAnimating;
      }

      window.addEventListener('resize', scheduleRender);
      window.addEventListener('scroll', scheduleRender, true);
      window.addEventListener('popstate', scheduleRender);
      window.addEventListener('keydown', function onKeyDown(event) {
        if (
          event.target instanceof HTMLElement &&
          event.target.classList.contains('expandable') &&
          (event.code === 'Enter' || event.code === 'Space')
        ) event.preventDefault();
        events.keydown = event;
        scheduleRender();
      });
      window.addEventListener('click', function onClick(event) {
        events.click = event;
        scheduleRender();
      });
      window.addEventListener('mousemove', function onMouseMove(event) {
        events.mousemove = event;
        scheduleRender();
      });

      const dummyPlaceholder = document.createElement('div');
      dummyPlaceholder.style.position = 'absolute';
      dummyPlaceholder.style.width = '1px';
      document.body.append(dummyPlaceholder);

      function hitTest2DMode(items, pointerX, pointerY) {
        for (let index = 0; index < items.length; index += 1) {
          const item = items[index];
          if (item.skeleton) continue;
          if (
            item.x.dest <= pointerX &&
            pointerX < item.x.dest + item.sizeX.dest &&
            item.y.dest <= pointerY &&
            pointerY < item.y.dest + item.sizeY.dest
          ) return index;
        }
        return null;
      }

      function adjacentReadyIndex(items, focused, direction) {
        for (let index = focused + direction; index >= 0 && index < items.length; index += direction) {
          if (!items[index].skeleton) return index;
        }
        return focused;
      }

      function hitTest1DMode(items, focused, viewportWidth, pointerX) {
        const previous = adjacentReadyIndex(items, focused, -1);
        const next = adjacentReadyIndex(items, focused, 1);
        if (previous !== focused && pointerX >= 0 && pointerX <= hitArea1DSizeX) return previous;
        if (next !== focused && pointerX >= viewportWidth - hitArea1DSizeX) return next;
        return null;
      }

      function decodeHash(value) {
        try {
          return decodeURIComponent(value);
        } catch {
          return '';
        }
      }

      function render(now) {
        const inputCode = events.keydown == null ? null : events.keydown.code;
        let clickedTarget = null;

        if (events.click != null) {
          clickedTarget = events.click.target;
          pointer.x = events.click.clientX;
          pointer.y = events.click.clientY;
        }
        if (events.mousemove != null) {
          pointer.x = events.mousemove.clientX;
          pointer.y = events.mousemove.clientY;
        }
        if (debug) {
          if (inputCode === 'KeyA') debugTimestamp += 1000 / 60;
          now = debugTimestamp;
        }

        const newWindowSizeX = document.documentElement.clientWidth;
        const windowSizeY = document.documentElement.clientHeight;
        const animationDisabled = reducedMotion.matches;
        const isMobileLayout = coarsePointer.matches;
        const currentScrollY = isSafari ? document.body.scrollTop : window.scrollY;
        const currentScrollX = isSafari ? document.body.scrollLeft : window.scrollX;
        const hashImageId = decodeHash(window.location.hash.slice(1));
        let focused = null;
        for (let index = 0; index < data.length; index += 1) {
          if (!data[index].skeleton && data[index].id === hashImageId) focused = index;
        }
        if (expandedPromptId != null && (focused == null || data[focused].id !== expandedPromptId)) {
          expandedPromptId = null;
        }

        const descriptionOverlayContentSizeY = focused == null
          ? prompt1DSizeY
          : Math.max(prompt1DSizeY, data[focused].promptNode.scrollHeight + promptPaddingBottom);
        const descriptionOverlayHasOverflow =
          focused != null && descriptionOverlayContentSizeY > prompt1DSizeY + 1;

        const pointerXLocal = pointer.x + currentScrollX;
        const pointerYLocal = pointer.y + currentScrollY;
        let newFocused = inputCode === 'Escape'
          ? null
          : (inputCode === 'ArrowLeft' || inputCode === 'ArrowRight') && focused == null
            ? 0
            : inputCode === 'ArrowLeft'
              ? adjacentReadyIndex(data, focused, -1)
              : inputCode === 'ArrowRight'
                ? adjacentReadyIndex(data, focused, 1)
                : focused;

        const descriptionOverlayTriggerNode = focused == null ? null : data[focused].promptNode;
        const descriptionOverlayKeyboardRequested =
          descriptionOverlayTriggerNode != null &&
          events.keydown != null &&
          events.keydown.target === descriptionOverlayTriggerNode &&
          (inputCode === 'Enter' || inputCode === 'Space');
        const descriptionOverlayPromptClicked =
          descriptionOverlayTriggerNode != null && clickedTarget === descriptionOverlayTriggerNode;
        const descriptionOverlayToggleRequested =
          descriptionOverlayHasOverflow &&
          (descriptionOverlayKeyboardRequested || descriptionOverlayPromptClicked);

        if (descriptionOverlayToggleRequested) {
          const focusedId = data[focused].id;
          expandedPromptId = expandedPromptId === focusedId ? null : focusedId;
        }
        if (inputCode === 'Escape' && expandedPromptId != null) {
          expandedPromptId = null;
          newFocused = focused;
        }

        if (clickedTarget != null) {
          if (descriptionOverlayToggleRequested) {
            newFocused = focused;
          } else if (expandedPromptId != null) {
            expandedPromptId = null;
            newFocused = focused;
          } else if (clickedTarget instanceof HTMLElement && clickedTarget.tagName === 'FIGCAPTION') {
            const selection = window.getSelection();
            if (selection != null) {
              const range = document.createRange();
              range.selectNodeContents(clickedTarget);
              selection.removeAllRanges();
              selection.addRange(range);
            }
          } else if (focused == null) {
            newFocused = hitTest2DMode(data, pointerXLocal, pointerYLocal) ?? newFocused;
          } else {
            newFocused = isMobileLayout
              ? null
              : hitTest1DMode(data, focused, newWindowSizeX, pointerXLocal);
          }
        }
        if (newFocused !== focused) expandedPromptId = null;

        const dimensions = colsBoxMaxSizeXF(newWindowSizeX);
        const cols = dimensions.cols;
        const boxMaxSizeX = dimensions.boxMaxSizeX;
        const boxes2DSizeX = [];
        const boxes2DSizeY = [];
        const rowsTop = [windowPaddingTop];
        let rowMaxSizeY = 0;

        for (let index = 0; index < data.length; index += 1) {
          const item = data[index];
          const imgMaxSizeY = item.ar === 1
            ? boxMaxSizeX * 0.85
            : item.ar < 1
              ? boxMaxSizeX * 1.05
              : boxMaxSizeX;
          const sizeX = Math.min(item.naturalSizeX, boxMaxSizeX, imgMaxSizeY * item.ar);
          const sizeY = sizeX / item.ar + promptSizeY;
          boxes2DSizeX.push(sizeX);
          boxes2DSizeY.push(sizeY);
          rowMaxSizeY = Math.max(rowMaxSizeY, sizeY);
          if (index % cols === cols - 1 || index === data.length - 1) {
            rowsTop.push(rowsTop[rowsTop.length - 1] + rowMaxSizeY + boxesGapY);
            rowMaxSizeY = 0;
          }
        }

        let cursor = 'auto';
        let newAnchor = anchor;
        let adjustedScrollTop = currentScrollY;
        const hoverMagnetFactor = 40;

        if (newFocused == null) {
          if (focused != null) {
            const focusedTop = rowsTop[Math.floor(focused / cols)];
            if (focusedTop <= currentScrollY || focusedTop + boxes2DSizeY[focused] >= currentScrollY + windowSizeY) {
              adjustedScrollTop = focusedTop - boxesGapY - gapTopPeek;
            }
          }

          for (let index = 0; index < data.length; index += 1) {
            const item = data[index];
            const sizeX = boxes2DSizeX[index];
            const sizeY = boxes2DSizeY[index];
            const currentRow = Math.floor(index / cols);
            const currentRowMaxSizeY = rowsTop[currentRow + 1] - boxesGapY - rowsTop[currentRow];
            item.sizeX.dest = sizeX;
            item.sizeY.dest = sizeY;
            item.x.dest = boxesGapX + (boxMaxSizeX + boxesGapX) * (index % cols) + (boxMaxSizeX - sizeX) / 2;
            item.y.dest = rowsTop[currentRow] + (currentRowMaxSizeY - sizeY) / 2;
            item.scale.dest = 1;
            item.fxFactor.dest = 1;
          }

          const hit = hitTest2DMode(data, pointerXLocal, pointerYLocal);
          if (hit != null) {
            cursor = 'zoom-in';
            const item = data[hit];
            item.x.dest += (pointerXLocal - (item.x.dest + item.sizeX.dest / 2)) / hoverMagnetFactor;
            item.y.dest += (pointerYLocal - (item.y.dest + item.sizeY.dest / 2)) / hoverMagnetFactor;
            item.scale.dest = 1.02;
          }

          const anchorY = data[anchor].y.dest - gapTopPeek;
          if (newWindowSizeX !== windowSizeX) adjustedScrollTop = Math.max(0, anchorY);
          if (adjustedScrollTop !== scrollY && Math.abs(anchorY - adjustedScrollTop) > windowSizeY / 10) {
            for (newAnchor = 0; newAnchor < data.length; newAnchor += cols) {
              const item = data[newAnchor];
              if (item.y.dest + item.sizeY.dest - adjustedScrollTop > windowSizeY / 5) break;
            }
            newAnchor = Math.min(newAnchor, data.length - 1);
          }
        } else {
          const focusedPaddingTop = isMobileLayout ? 16 : windowPaddingTop;
          const focusedGapY = isMobileLayout ? 16 : boxes1DGapY;
          const focusedInsetX = isMobileLayout ? 12 : boxes1DGapX + hitArea1DSizeX;
          const img1DSizeY = Math.max(1, windowSizeY - focusedPaddingTop - prompt1DSizeY - focusedGapY);
          const box1DMaxSizeX = Math.max(1, newWindowSizeX - focusedInsetX * 2);
          let currentLeft = isMobileLayout ? 0 : focusedInsetX;

          for (let index = newFocused - 1; index >= 0; index -= 1) {
            const item = data[index];
            const imgSizeX = Math.min(item.naturalSizeX, box1DMaxSizeX, img1DSizeY * item.ar) * 0.7;
            currentLeft -= imgSizeX + boxes1DGapX;
          }

          const edgeRubberBandVelocityX = inputCode === 'ArrowLeft' && adjacentReadyIndex(data, focused, -1) === focused
            ? 2000
            : inputCode === 'ArrowRight' && adjacentReadyIndex(data, focused, 1) === focused
              ? -2000
              : 0;

          for (let index = 0; index < data.length; index += 1) {
            const item = data[index];
            const imgSizeX = Math.min(item.naturalSizeX, box1DMaxSizeX, img1DSizeY * item.ar) * (index === newFocused ? 1 : 0.7);
            const boxSizeY = imgSizeX / item.ar + prompt1DSizeY;
            item.sizeX.dest = imgSizeX;
            item.sizeY.dest = boxSizeY;
            item.y.dest = Math.max(focusedPaddingTop, (windowSizeY - boxSizeY) / 2) + adjustedScrollTop;
            item.x.dest = index === newFocused ? (newWindowSizeX - imgSizeX) / 2 : currentLeft;
            item.x.v += edgeRubberBandVelocityX / (index === newFocused ? 1 : 4);
            item.scale.dest = 1;
            item.fxFactor.dest = index === newFocused ? 1 : 0.2;
            currentLeft = index === newFocused
              ? isMobileLayout
                ? newWindowSizeX + boxes1DGapX
                : newWindowSizeX - hitArea1DSizeX
              : currentLeft + imgSizeX + boxes1DGapX;
          }

          const hit = isMobileLayout
            ? null
            : hitTest1DMode(data, newFocused, newWindowSizeX, pointerXLocal);
          if (hit == null) {
            cursor = 'zoom-out';
          } else {
            cursor = 'zoom-in';
            const item = data[hit];
            item.x.dest += (pointerXLocal - (item.x.dest + item.sizeX.dest / 2)) / hoverMagnetFactor;
            item.y.dest += (pointerYLocal - (item.y.dest + item.sizeY.dest / 2)) / hoverMagnetFactor;
            item.scale.dest = 1.02;
            item.fxFactor.dest = 0.5;
          }
        }

        for (const item of data) item.y.pos += adjustedScrollTop - currentScrollY;

        let newAnimatedUntilTime = animatedUntilTime ?? now;
        const steps = Math.floor((now - newAnimatedUntilTime) / msPerAnimationStep);
        newAnimatedUntilTime += steps * msPerAnimationStep;
        const stillAnimating = animationDisabled ? false : stepSprings(steps);
        if (animationDisabled) springForEach(springGoToEnd);

        const browserUIMaxSizeTop = 100;
        const browserUIMaxSizeBottom = 150;
        for (let index = 0; index < data.length; index += 1) {
          const item = data[index];
          const node = item.node;
          const img = item.img;
          const promptNode = item.promptNode;
          const descriptionCardNode = item.descriptionCardNode;
          const visible =
            item.y.pos - adjustedScrollTop <= windowSizeY + browserUIMaxSizeBottom &&
            item.y.pos + item.sizeY.pos - adjustedScrollTop >= -browserUIMaxSizeTop &&
            item.x.pos <= newWindowSizeX &&
            item.x.pos + item.sizeX.pos >= 0;

          if (visible) {
            node.style.width = item.sizeX.pos + 'px';
            node.style.height = item.sizeY.pos + 'px';
            node.style.transform = 'translate3d(' + item.x.pos + 'px,' + item.y.pos + 'px,0) scale(' + item.scale.pos + ')';
            node.style.filter = newFocused != null && (index === newFocused - 1 || index === newFocused || index === newFocused + 1)
              ? 'brightness(' + item.fxFactor.pos * 100 + '%) blur(' + Math.max(0, 6 - item.fxFactor.pos * 6) + 'px)'
              : 'brightness(' + item.fxFactor.pos * 100 + '%)';
            promptNode.style.top = item.sizeX.pos / item.ar + 'px';

            if (index === newFocused) {
              const descriptionOverlayCanOpen =
                newFocused === focused && descriptionOverlayHasOverflow;
              const descriptionOverlayIsOpen =
                descriptionOverlayCanOpen && expandedPromptId === item.id;
              node.style.zIndex = String(data.length + 1);
              node.classList.toggle('description-expanded', descriptionOverlayIsOpen);
              promptNode.style.display = 'block';
              promptNode.style.overflowY = 'hidden';
              promptNode.style.height = prompt1DSizeY - promptPaddingBottom + 'px';
              promptNode.style.setProperty('line-clamp', '999');
              promptNode.style.webkitLineClamp = '999';
              promptNode.classList.toggle('expandable', descriptionOverlayCanOpen);
              if (descriptionOverlayCanOpen) {
                promptNode.dataset.expanded = String(descriptionOverlayIsOpen);
                promptNode.tabIndex = 0;
                promptNode.setAttribute('role', 'button');
                promptNode.setAttribute('aria-expanded', String(descriptionOverlayIsOpen));
                promptNode.setAttribute(
                  'aria-label',
                  descriptionOverlayIsOpen ? 'Collapse description' : 'Expand description',
                );
              } else {
                delete promptNode.dataset.expanded;
                promptNode.removeAttribute('tabindex');
                promptNode.removeAttribute('role');
                promptNode.removeAttribute('aria-expanded');
                promptNode.removeAttribute('aria-label');
              }
              descriptionCardNode.setAttribute('aria-hidden', String(!descriptionOverlayIsOpen));
              if (descriptionOverlayIsOpen) {
                descriptionCardNode.tabIndex = 0;
                descriptionCardNode.setAttribute('role', 'document');
                descriptionCardNode.setAttribute('aria-label', 'Full description');
              } else {
                descriptionCardNode.removeAttribute('tabindex');
                descriptionCardNode.removeAttribute('role');
                descriptionCardNode.removeAttribute('aria-label');
              }
              img.style.display = img.dataset.loadedSrc === item.previewUrl ? 'block' : 'none';
              if (!stillAnimating && img.dataset.src !== item.previewUrl) {
                img.dataset.src = item.previewUrl;
                img.onload = function onPreviewLoaded() {
                  img.dataset.loadedSrc = item.previewUrl;
                  scheduleRender();
                };
                img.onerror = function onPreviewError() {
                  img.dataset.loadedSrc = '';
                  img.style.display = 'none';
                };
                img.src = item.previewUrl;
              }
            } else {
              node.style.zIndex = String(index + 1);
              node.classList.remove('description-expanded');
              promptNode.style.display = '-webkit-box';
              promptNode.style.overflowY = 'hidden';
              promptNode.style.height = promptSizeY - promptPaddingBottom + 'px';
              promptNode.style.setProperty('line-clamp', '2');
              promptNode.style.webkitLineClamp = '2';
              promptNode.classList.remove('expandable');
              delete promptNode.dataset.expanded;
              promptNode.removeAttribute('tabindex');
              promptNode.removeAttribute('role');
              promptNode.removeAttribute('aria-expanded');
              promptNode.removeAttribute('aria-label');
              descriptionCardNode.setAttribute('aria-hidden', 'true');
              descriptionCardNode.removeAttribute('tabindex');
              descriptionCardNode.removeAttribute('role');
              descriptionCardNode.removeAttribute('aria-label');
              img.style.display = 'none';
            }

            if (node.parentNode == null) document.body.appendChild(node);
          } else if (node.parentNode != null) {
            document.body.removeChild(node);
          }
        }

        document.body.style.cursor = cursor;
        document.body.style.overflowY = newFocused == null ? 'auto' : 'hidden';
        dummyPlaceholder.style.height = rowsTop[rowsTop.length - 1] + 'px';

        if (adjustedScrollTop !== currentScrollY) {
          (isSafari ? document.body : window).scrollTo({ top: adjustedScrollTop });
        }
        if (newFocused !== focused) {
          const hash = newFocused == null ? '' : '#' + encodeURIComponent(data[newFocused].id);
          window.history.pushState(null, '', window.location.pathname + window.location.search + hash);
        }

        events.keydown = null;
        events.click = null;
        events.mousemove = null;
        animatedUntilTime = stillAnimating ? newAnimatedUntilTime : null;
        anchor = newAnchor;
        windowSizeX = newWindowSizeX;
        scrollY = adjustedScrollTop;
        return stillAnimating;
      }

      statusNode.hidden = true;
      scheduleRender();

      return function hydrateBox(index, item) {
        const box = data[index];
        if (!box || !box.skeleton) return Promise.resolve();

        return new Promise(function preloadThumbnail(resolve) {
          const thumbnail = new Image();
          thumbnail.decoding = 'async';
          thumbnail.onload = function onThumbnailLoaded() {
            box.previewUrl = item.previewUrl;
            box.naturalSizeX = item.w;
            box.ar = item.w / item.h;
            box.skeleton = false;
            box.node.classList.remove('skeleton');
            box.node.removeAttribute('aria-hidden');
            box.node.style.backgroundImage = 'url("' + item.thumbnailUrl.replace(/"/g, '%22') + '")';
            box.img.alt = item.prompt;
            box.promptNode.textContent = item.prompt;
            box.descriptionCardNode.textContent = item.prompt;
            scheduleRender();
            resolve();
          };
          thumbnail.onerror = function onThumbnailError() {
            console.warn('Unable to load asset thumbnail', item.id);
            resolve();
          };
          thumbnail.src = item.thumbnailUrl;
        });
      };
    }

    loadPhotoGalleryData()
      .then(function onGalleryLoaded(result) {
        if (result.items.length === 0) {
          setStatus('This album is empty', 'No image assets were returned by Immich.', false);
          return;
        }
        const hydrateBox = startGallery(result.items);
        if (result.remainingAssets.length > 0) {
          mapWithConcurrency(result.remainingAssets, 6, async function loadRemainingAsset(asset, index) {
            const itemIndex = result.remainingOffset + index;
            const item = await loadGalleryItem(asset, itemIndex, result.showMetadata);
            await hydrateBox(itemIndex, item);
          }).catch(function onRemainingAssetsError(error) {
            console.error('Unable to finish loading the album', error);
          });
        }
      })
      .catch(function onGalleryError(error) {
        console.error(error);
        setStatus('Unable to load this album', error instanceof Error ? error.message : String(error), false);
      });
  </script>
</body>
</html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();

    if (url.pathname === "/favicon.ico") {
      if (!MEDIA_METHODS.has(method)) return forbidden();
      return forwardPublicAsset(request, env, url);
    }

    if (url.pathname.startsWith("/api/")) {
      if (!isAllowedApi(url.pathname, method, url.searchParams)) return forbidden();
      return forwardApi(request, env, url);
    }

    if (!MEDIA_METHODS.has(method)) return forbidden();
    if (!shareKeyFromPath(url.pathname)) return forbidden();
    return galleryResponse(method === "HEAD");
  },
};

async function forwardPublicAsset(request, env, requestUrl) {
  const targetUrl = new URL(requestUrl.pathname + requestUrl.search, ORIGIN_URL);
  const headers = sanitizeHeaders(request.headers, requestUrl);

  try {
    const response = await env.NAS.fetch(targetUrl, {
      method: request.method,
      headers,
      redirect: "manual",
    });
    return response;
  } catch {
    return upstreamErrorResponse(502);
  }
}

function galleryResponse(headOnly) {
  const headers = new Headers({
    "cache-control": "no-store",
    "content-security-policy": "default-src 'none'; connect-src 'self'; img-src 'self' data:; style-src 'unsafe-inline'; script-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
    "content-type": "text/html; charset=utf-8",
    "referrer-policy": "no-referrer",
    "x-content-type-options": "nosniff",
  });
  return new Response(headOnly ? null : GALLERY_HTML, { status: 200, headers });
}

function forbidden() {
  return new Response(DENY_BODY, {
    status: 403,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "x-content-type-options": "nosniff",
    },
  });
}

function isAllowedApi(pathname, method, searchParams) {
  if (!isValidShareKey(searchParams.get("key"))) return false;
  if (method === "GET" && pathname === "/api/shared-links/me") return true;
  if (method === "GET" && (pathname === "/api/timeline/buckets" || pathname === "/api/timeline/bucket")) return true;
  if (method === "GET" && /^\/api\/assets\/[^/]+$/.test(pathname)) return true;
  if (!MEDIA_METHODS.has(method) || !/^\/api\/assets\/[^/]+\/thumbnail$/.test(pathname)) return false;
  return ["original", "fullsize", "preview", "thumbnail"].includes(searchParams.get("size"));
}

async function forwardApi(request, env, requestUrl) {
  const targetUrl = buildTargetUrl(requestUrl);
  const headers = sanitizeHeaders(request.headers, requestUrl);

  let response;
  try {
		response = await env.NAS.fetch(targetUrl, {
			method: request.method,
			headers,
			redirect: "manual",
			...(requestUrl.pathname.startsWith("/api/timeline") ? { cache: "no-store" } : {}),
		});
	} catch (e) {
		console.error(e)
    return upstreamErrorResponse(502);
  }

  if (!response.ok) return upstreamErrorResponse(response.status);
  if (response.status >= 300 && response.status < 400) return upstreamErrorResponse(502);
  if (requestUrl.pathname === "/api/shared-links/me") return sanitizeSharedLinkResponse(response);
  if (/^\/api\/assets\/[^/]+$/.test(requestUrl.pathname)) return sanitizeAssetResponse(response);
  return sanitizeMediaResponse(response);
}

async function sanitizeSharedLinkResponse(response) {
  let payload;
  try {
    payload = await response.clone().json();
  } catch {
    return upstreamErrorResponse(502);
  }

  if (!payload || !payload.album || typeof payload.album.id !== "string") return upstreamErrorResponse(502);

  return jsonResponse({
    album: {
      id: payload.album.id,
      albumName: typeof payload.album.albumName === "string" ? payload.album.albumName : "",
      order: payload.album.order === "asc" ? "asc" : "desc",
      assetCount: Number.isFinite(Number(payload.album.assetCount)) ? Number(payload.album.assetCount) : 0,
    },
    showMetadata: payload.showMetadata === true,
  });
}

async function sanitizeAssetResponse(response) {
  let payload;
  try {
    payload = await response.clone().json();
  } catch {
    return upstreamErrorResponse(502);
  }

  if (!payload || typeof payload.id !== "string") return upstreamErrorResponse(502);
  return jsonResponse({
    id: payload.id,
    width: Number.isFinite(Number(payload.width)) ? Number(payload.width) : null,
    height: Number.isFinite(Number(payload.height)) ? Number(payload.height) : null,
    originalFileName: typeof payload.originalFileName === "string" ? payload.originalFileName : "",
    exifInfo: {
      description: payload.exifInfo && typeof payload.exifInfo.description === "string"
        ? payload.exifInfo.description
        : "",
    },
  });
}

function jsonResponse(payload) {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      "cache-control": "no-store",
      "content-type": "application/json; charset=utf-8",
      "x-content-type-options": "nosniff",
    },
  });
}

function sanitizeMediaResponse(response) {
  const headers = new Headers(response.headers);
  headers.delete("content-disposition");
  headers.delete("location");
  headers.delete("set-cookie");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function upstreamErrorResponse(status) {
  const safeStatus = status >= 400 && status <= 599 ? status : 502;
  return new Response("Immich request failed", {
    status: safeStatus,
    headers: {
      "cache-control": "no-store",
      "content-type": "text/plain; charset=utf-8",
      "x-content-type-options": "nosniff",
    },
  });
}

function buildTargetUrl(requestUrl) {
  const targetUrl = new URL(requestUrl.pathname, ORIGIN_URL);
  const source = requestUrl.searchParams;
  const copyParam = (name) => {
    const value = source.get(name);
    if (value) targetUrl.searchParams.set(name, value);
  };

  if (requestUrl.pathname === "/api/timeline/buckets") {
    copyParam("albumId");
    copyParam("order");
  } else if (requestUrl.pathname === "/api/timeline/bucket") {
    copyParam("albumId");
    copyParam("order");
    copyParam("timeBucket");
  } else if (/^\/api\/assets\/[^/]+\/thumbnail$/.test(requestUrl.pathname)) {
    copyParam("size");
    copyParam("c");
    targetUrl.searchParams.set("edited", "true");
  }

  targetUrl.searchParams.set("key", source.get("key"));
  return targetUrl;
}

function shareKeyFromPath(pathname) {
  const match = pathname.match(/^\/share\/([^/]+)\/?$/);
  if (!match) return "";
  try {
    const key = decodeURIComponent(match[1]);
    return isValidShareKey(key) ? key : "";
  } catch {
    return "";
  }
}

function isValidShareKey(key) {
  return typeof key === "string" && /^[A-Za-z0-9_-]{20,256}$/.test(key);
}

function sanitizeHeaders(sourceHeaders, url) {
  const headers = new Headers(sourceHeaders);
  headers.delete("authorization");
  headers.delete("cookie");
  headers.delete("x-api-key");
  headers.delete("x-immich-session-token");
  headers.delete("x-immich-user-token");
  headers.delete("accept-encoding");
  headers.set("x-forwarded-host", url.hostname);
  headers.set("x-forwarded-proto", url.protocol.replace(":", ""));

  const clientIp = sourceHeaders.get("cf-connecting-ip");
  if (clientIp) headers.set("x-forwarded-for", clientIp);
  else headers.delete("x-forwarded-for");
  return headers;
}
