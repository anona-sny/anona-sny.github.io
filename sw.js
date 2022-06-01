"use strict";

// Our current cache version and its contents.
var CACHE = {
  version: "site-version-number",
  resources: [
    "/",
    "/index.html", // caches index.html
    "/assets/", // caches all the contents inside the /css folder
  ],
};

// Install service worker, adding all our cache entries
this.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE.version).then(function (cache) {
      return cache.addAll(CACHE.resources);
    })
  );
});

// Handle a fetch request. If not fetched from cache, attempt to add to cache.
this.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(function (resp) {
        return (
          resp ||
          fetch(event.request)
            .then(function (response) {
              return caches
                .open(CACHE.version)
                .then(function (cache) {
                  cache
                    .put(event.request, response.clone())
                    .catch(function (error) {
                      console.log("Could not add to cache!" + error);
                    });
                  return response;
                })
                .catch(function (error) {
                  console.log("Could not open cache!" + error);
                });
            })
            .catch(function (error) {
              console.log("Resource not found!" + error);
            })
        );
      })
      .catch(function (error) {
        console.log("Resource not found in the cache!" + error);
      })
  );
});

// Activate service worker
this.addEventListener("activate", function (event) {
  // Remove all caches that aren't whitelisted
  var cacheWhitelist = [CACHE.version];
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
