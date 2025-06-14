// 定义要缓存的文件列表
const CACHE_NAME = 'book-inventory-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// 安装 Service Worker 时，缓存所有核心文件
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 拦截网络请求，如果缓存中存在，则直接从缓存返回
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果缓存中存在，则返回缓存的资源
        if (response) {
          return response;
        }
        // 否则，正常发起网络请求
        return fetch(event.request);
      })
  );
});