/* eslint-disable no-restricted-globals */
// /public/service-worker.js
self.addEventListener('install', function (event) {
    console.log('Service worker installing...');
   });
   self.addEventListener('activate', function (event) {
    console.log('Service worker activating...');
   });
   // eslint-disable-next-line no-restricted-globals
   self.addEventListener('fetch', function (event) {
    console.log('Fetching:', event.request.url);
   });