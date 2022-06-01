const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      "/",
      "index.html",
      "favicon.ico",
      "main.2307bda58832ab9d.js",
      "polyfills.8e591707cfaa9d0d.js",
      "runtime.aaedba49815d2ab0.js",
      "styles.127f990bf3eba71e.css",
      "/assets/background.jpg",
      "/assets/favicon.ico",
      "/assets/icon-add.png",
      "/assets/icon-calendar.png",
      "/assets/icon-calendar.svg",
      "/assets/icon-delete.svg",
      "/assets/icon-edit.svg",
      "/assets/icon-note.png",
      "flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
      "KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2",
      "KFOlCnqEu92Fr1MmEU9fChc4AMP6lbBP.woff2",
      "KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
      "KFOmCnqEu92Fr1Mu7GxKKTU1Kvnz.woff2",
    ])
  );
});

self.addEventListener("fetch", function (event) {
  console.log(event);
  var response;
  event.respondWith(
    caches
      .match(event.request)
      .catch(function () {
        return fetch(event.request);
      })
      .then(function (r) {
        response = r;
        caches.open("v1").then(function (cache) {
          cache.put(event.request, response);
        });
        return response.clone();
      })
      .catch(function () {})
  );
});
