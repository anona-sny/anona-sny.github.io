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
        "/assets/icon-note.svg",
      ])
    );
  });