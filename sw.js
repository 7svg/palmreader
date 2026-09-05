/* Minimal service worker.
 *
 * Its only job is to make the site installable as an app. It deliberately
 * does NOT cache anything: palm photos, AI checks and Supabase all need a
 * live connection, and a stale cache would show clients an old version of
 * the app after you push an update. */

self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
  // Always go to the network. If the device is offline the browser shows its
  // own offline page, which is the honest thing here — the app can't work
  // without a connection anyway.
  event.respondWith(fetch(event.request));
});
