// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"aLgel":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "ebd18d02d952272d";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"lbDgN":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const hero_1 = require("./pages/hero");
const top_1 = require("./pages/top");
const genres_1 = require("./pages/genres");
const lowerSection_1 = require("./pages/lowerSection");
// Used in hero
let hero = new hero_1.Hero;
hero.getUpcomingMovies();
//used in genres sections(main) 
let getByGenre = new genres_1.GetByGenre;
const genreList = [
    genres_1.MoviegenreIds.Horror,
    genres_1.MoviegenreIds.Comedy,
    genres_1.MoviegenreIds.Action
];
genreList.map((genre)=>{
    getByGenre.getMoviesByGenre(genre);
});
// Used in "top" section (asside)
let top = new top_1.Top;
top.getTrendingMoviesPreview();
// used in lower section
let lowerSection = new lowerSection_1.LowerSection;
lowerSection.addbutton("\xdaltimas", 1, lowerSection_1.sortBy.release_date_desc);
lowerSection.addbutton("Mas votadas", 2, lowerSection_1.sortBy.vote_count_desc);
lowerSection.addbutton("Populares", 3, lowerSection_1.sortBy.popularity_desc);
lowerSection.addSkeleton();
lowerSection.getFilteredMovies(lowerSection_1.sortBy.release_date_desc);

},{"./pages/hero":"gP8Wk","./pages/top":"hpkuE","./pages/genres":"5pj3C","./pages/lowerSection":"29Biz"}],"gP8Wk":[function(require,module,exports) {
"use strict";
var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Hero = void 0;
const fetchFromApi_1 = require("./fetchFromApi");
const movieSize_model_1 = require("../models/movieSize.model");
const lazyLoading_1 = require("../utils/lazyLoading");
class Hero {
    constructor(){
        this.movieList = [];
    }
    addSkeleton(selected = 1) {
        const limitContainer = document.getElementById("limitContainer");
        for(let index = 0; index < 3; index++){
            const heroTemplateSkeleton = `<img class="${index == selected ? "hero__image--center" : "hero__image"} skeleton"
                id="image${index}">`;
            limitContainer.insertAdjacentHTML("beforeend", heroTemplateSkeleton);
        }
    }
    getUpcomingMovies() {
        return __awaiter(this, void 0, void 0, function*() {
            this.addSkeleton();
            this.movieList = [];
            const data = yield (0, fetchFromApi_1.api)(`movie/upcoming`);
            const movies = data.results.slice(0, 5).filter((movie)=>movie.backdrop_path);
            movies.forEach((movie, index)=>{
                this.movieList.push({
                    title: movie.title,
                    backdrop_path: movie.backdrop_path
                });
            });
            this.populateimg(0);
            return this.movieList;
        });
    }
    Navigatemovies(next) {
        this.populateimg(next);
    }
    populateimg(selected) {
        const limitContainer = document.getElementById("limitContainer");
        limitContainer.innerHTML = `
                <div class="dot-container" id="dotContainer">
                    ${this.movieList.map((movie, index)=>{
            return `<div class="${index == selected ? "dot-container__dot--selected" : "dot-container__dot"}" id="${"dotss" + index}"></div>`;
        }).join("")}
                </div>
            `;
        for(let i = 0; i < this.movieList.length; i++){
            const dot = document.getElementById("dotss" + i);
            dot === null || dot === void 0 || dot.addEventListener("click", ()=>{
                this.Navigatemovies(i);
            });
        }
        this.movieList.map((movie, index)=>{
            return `<img class="${index == selected ? "hero__image--center" : "hero__image"}"
                        src="https://image.tmdb.org/t/p/${movieSize_model_1.backdropSize.w1280}/${this.movieList[index]["backdrop_path"]}" 
                        alt="${this.movieList[index]["title"]}" 
                        id="image${index}">`;
        }).join("");
        for(let i1 = selected - 1; i1 <= selected + 1; i1++){
            const img = document.createElement("img");
            if (i1 == selected) {
                const dot1 = document.getElementById("dotss" + i1);
                if (dot1 != null) dot1.className = "dot-container__dot--selected";
                img.classList.add("hero__image--center");
            } else img.classList.add("hero__image");
            if (i1 < 0) {
                img.setAttribute("data-src", "https://image.tmdb.org/t/p/" + movieSize_model_1.backdropSize.w1280 + this.movieList[this.movieList.length + i1]["backdrop_path"]);
                img.setAttribute("alt", this.movieList[this.movieList.length + i1]["title"] + " poster image");
                img.addEventListener("click", ()=>this.Navigatemovies(this.movieList.length + i1), false);
            } else if (i1 == selected) {
                img.setAttribute("data-src", "https://image.tmdb.org/t/p/" + movieSize_model_1.backdropSize.w1280 + this.movieList[i1]["backdrop_path"]);
                img.setAttribute("alt", this.movieList[i1]["title"] + " poster image");
            } else if (i1 > this.movieList.length - 1) {
                img.setAttribute("data-src", "https://image.tmdb.org/t/p/" + movieSize_model_1.backdropSize.w1280 + this.movieList[i1 - this.movieList.length]["backdrop_path"]);
                img.setAttribute("alt", this.movieList[i1 - this.movieList.length]["title"] + " poster image");
                img.addEventListener("click", ()=>this.Navigatemovies(i1 - this.movieList.length), false);
            } else {
                img.setAttribute("data-src", "https://image.tmdb.org/t/p/" + movieSize_model_1.backdropSize.w1280 + this.movieList[i1]["backdrop_path"]);
                img.setAttribute("alt", this.movieList[i1]["title"] + " poster image");
                img.addEventListener("click", ()=>this.Navigatemovies(i1), false);
            }
            lazyLoading_1.lazyLoading.observe(img);
            limitContainer.appendChild(img);
        }
    }
}
exports.Hero = Hero;

},{"../models/movieSize.model":"c91Nv","./fetchFromApi":"jrWas","../utils/lazyLoading":"8Wtc7"}],"c91Nv":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stillSize = exports.profileSizes = exports.posterSizes = exports.logoSizes = exports.backdropSize = void 0;
var backdropSize;
(function(backdropSize) {
    backdropSize["w300"] = "w300";
    backdropSize["w780"] = "w780";
    backdropSize["w1280"] = "w1280";
    backdropSize["original"] = "original";
})(backdropSize = exports.backdropSize || (exports.backdropSize = {}));
var logoSizes;
(function(logoSizes) {
    logoSizes["w45"] = "w45";
    logoSizes["w92"] = "w92";
    logoSizes["w154"] = "w154";
    logoSizes["w185"] = "w185";
    logoSizes["w300"] = "w300";
    logoSizes["w500"] = "w500";
    logoSizes["original"] = "original";
})(logoSizes = exports.logoSizes || (exports.logoSizes = {}));
var posterSizes;
(function(posterSizes) {
    posterSizes["w92"] = "w92";
    posterSizes["w154"] = "w154";
    posterSizes["w185"] = "w185";
    posterSizes["w342"] = "w342";
    posterSizes["w500"] = "w500";
    posterSizes["w780"] = "w780";
    posterSizes["original"] = "original";
})(posterSizes = exports.posterSizes || (exports.posterSizes = {}));
var profileSizes;
(function(profileSizes) {
    profileSizes["w45"] = "w45";
    profileSizes["w185"] = "w185";
    profileSizes["h632"] = "h632";
    profileSizes["original"] = "original";
})(profileSizes = exports.profileSizes || (exports.profileSizes = {}));
var stillSize;
(function(stillSize) {
    stillSize["w92"] = "w92";
    stillSize["w185"] = "w185";
    stillSize["w300"] = "w300";
    stillSize["original"] = "original";
})(stillSize = exports.stillSize || (exports.stillSize = {}));

},{}],"jrWas":[function(require,module,exports) {
"use strict";
var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.api = void 0;
const secret_1 = require("../secret");
const Url = "https://api.themoviedb.org/3/";
function api(section, args = "") {
    return __awaiter(this, void 0, void 0, function*() {
        const response = yield fetch(`${Url}${section}?api_key=${secret_1.APIKEY}&${args}`);
        const data = yield response.json();
        return data;
    });
}
exports.api = api;

},{"../secret":"kjLud"}],"kjLud":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.APIKEY = void 0;
exports.APIKEY = "6b172f6e7f8198f4eab9a3c5fc067454";

},{}],"8Wtc7":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lazyLoading = void 0;
exports.lazyLoading = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute("data-src");
            entry.target.setAttribute("src", url);
        }
    });
});

},{}],"hpkuE":[function(require,module,exports) {
"use strict";
var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Top = void 0;
const fetchFromApi_1 = require("./fetchFromApi");
const movieSize_model_1 = require("../models/movieSize.model");
const lazyLoading_1 = require("../utils/lazyLoading");
class Top {
    getTrendingMoviesPreview() {
        return __awaiter(this, void 0, void 0, function*() {
            this.addSkeleton();
            const data = yield (0, fetchFromApi_1.api)(`movie/top_rated`);
            const movies = data.results.slice(0, 5).filter((movie)=>movie.backdrop_path);
            const cards = document.querySelectorAll("#cardImg");
            const cardImg = document.querySelectorAll("#cardImg");
            const cardTextContainer = document.querySelectorAll("#cardTextContainer");
            cards.forEach((card, index)=>{
                cardImg[index].setAttribute("data-src", "https://image.tmdb.org/t/p/" + movieSize_model_1.posterSizes.w342 + movies[index].poster_path);
                cardImg[index].alt = movies[index].title + " poster image";
                lazyLoading_1.lazyLoading.observe(cardImg[index]);
                cardImg[index].onload = ()=>cardImg[index].parentElement.removeAttribute("class");
                cardTextContainer[index].setAttribute("class", "Card__text_container");
                cardTextContainer[index].innerHTML = `
                <H6 class="Card__title">${movies[index].title}</H6>
                <div class="Card__subtitle_container">
                    <p class="font-style-subtitle-1">${movies[index].vote_average + "/10"}</p>
                    <p class="font-style-subtitle-1">${movies[index].release_date.slice(0, 4)}</p>
                </div>
                `;
            });
        });
    }
    addSkeleton() {
        const cardContainer = document.querySelector("#cardContainer");
        for(let index = 0; index < 5; index++){
            const CardTemplate = `
                <div class="Card" >
                    <div class="skeleton" id="cardImgContainer${index}">
                        <img class="Card__img" id="cardImg">
                    </div>
                    <div class="Card__text_container card__text_container_skeleton skeleton" id="cardTextContainer">
                    </div>
                </div>
            `;
            cardContainer === null || cardContainer === void 0 || cardContainer.insertAdjacentHTML("beforeend", CardTemplate);
        }
    }
}
exports.Top = Top;

},{"../models/movieSize.model":"c91Nv","./fetchFromApi":"jrWas","../utils/lazyLoading":"8Wtc7"}],"5pj3C":[function(require,module,exports) {
"use strict";
var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GetByGenre = exports.MoviegenreIds = exports.direction = void 0;
const fetchFromApi_1 = require("./fetchFromApi");
const lazyLoading_1 = require("../utils/lazyLoading");
var direction;
(function(direction) {
    direction[direction["right"] = window.innerWidth * 0.8] = "right";
    direction[direction["left"] = -window.innerWidth * 0.8] = "left";
})(direction = exports.direction || (exports.direction = {}));
var MoviegenreIds;
(function(MoviegenreIds) {
    MoviegenreIds[MoviegenreIds["Action"] = 28] = "Action";
    MoviegenreIds[MoviegenreIds["Adventure"] = 12] = "Adventure";
    MoviegenreIds[MoviegenreIds["Animation"] = 16] = "Animation";
    MoviegenreIds[MoviegenreIds["Comedy"] = 35] = "Comedy";
    MoviegenreIds[MoviegenreIds["Crime"] = 80] = "Crime";
    MoviegenreIds[MoviegenreIds["Documentary"] = 99] = "Documentary";
    MoviegenreIds[MoviegenreIds["Drama"] = 18] = "Drama";
    MoviegenreIds[MoviegenreIds["Family"] = 10751] = "Family";
    MoviegenreIds[MoviegenreIds["Fantasy"] = 14] = "Fantasy";
    MoviegenreIds[MoviegenreIds["History"] = 36] = "History";
    MoviegenreIds[MoviegenreIds["Horror"] = 27] = "Horror";
    MoviegenreIds[MoviegenreIds["Music"] = 10402] = "Music";
    MoviegenreIds[MoviegenreIds["Mystery"] = 9648] = "Mystery";
    MoviegenreIds[MoviegenreIds["Romance"] = 10749] = "Romance";
    MoviegenreIds[MoviegenreIds["Science_Fiction"] = 878] = "Science_Fiction";
    MoviegenreIds[MoviegenreIds["TV_Movie"] = 10770] = "TV_Movie";
    MoviegenreIds[MoviegenreIds["Thriller"] = 53] = "Thriller";
    MoviegenreIds[MoviegenreIds["War"] = 10752] = "War";
    MoviegenreIds[MoviegenreIds["Western"] = 37] = "Western";
})(MoviegenreIds = exports.MoviegenreIds || (exports.MoviegenreIds = {}));
class GetByGenre {
    getMoviesByGenre(genreId) {
        return __awaiter(this, void 0, void 0, function*() {
            this.addSkeleton(genreId);
            const data = yield (0, fetchFromApi_1.api)("discover/movie", `with_genres=${genreId}`);
            const movies = data.results.filter((movie)=>movie.backdrop_path);
            const CarouselContainers = document.querySelectorAll("#CarouselContainer" + genreId);
            const CarouselImages = document.querySelectorAll("#CarouselImage" + genreId);
            const CarouselTitles = document.querySelectorAll("#CarouselTitle" + genreId);
            CarouselContainers.forEach((container, index)=>{
                if (movies[index]) {
                    CarouselImages[index].setAttribute("data-src", "https://image.tmdb.org/t/p/w780/" + movies[index].backdrop_path);
                    CarouselTitles[index].innerText = movies[index].title;
                    lazyLoading_1.lazyLoading.observe(CarouselImages[index]);
                    CarouselImages[index].onload = ()=>CarouselImages[index].setAttribute("class", "carousel_image");
                } else container.remove();
            });
        });
    }
    addSkeleton(genreId) {
        const carouselSection = document.getElementById("carouselSection");
        const genreHtmlTemplate = `
            <article class="carousel">
                <H2 class="carousel__title">${MoviegenreIds[genreId]}</H2>
                <div class="carousel__image_group" id="${"imageGroup" + genreId}">
                    <div class="carousel__image_strip" id="carouselImageStrip${genreId}"></div>
                    <div class="Navigation_container__next" id="carouselNext${genreId}">
                        <svg  class="carousel__next" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.90283 0L0 1.88L6.18084 8L0 14.12L1.90283 16L10 8L1.90283 0Z"/>
                        </svg>
                    </div>
                    <div class="Navigation_container__last" id="carouselLast${genreId}">
                        <svg  class="carousel__last" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.90283 0L0 1.88L6.18084 8L0 14.12L1.90283 16L10 8L1.90283 0Z"/>
                        </svg>
                    </div>
                </div>
            </article>
        `;
        carouselSection.insertAdjacentHTML("beforeend", genreHtmlTemplate);
        const imageGroup = document.getElementById("carouselImageStrip" + genreId);
        for(let index = 0; index < 20; index++){
            const imgTemplate = `
                <div class="carousel_image_container" id="CarouselContainer${genreId}">
                    <img class="carousel_image skeleton" id="CarouselImage${genreId}" >
                    <H6 class="carousel_image__title" id="CarouselTitle${genreId}">Productions</H6>
                </div>

            `;
            imageGroup.insertAdjacentHTML("beforeend", imgTemplate);
        }
        let arrowLast = document.getElementById("carouselLast" + genreId);
        arrowLast.addEventListener("click", ()=>this.NavigateGenre(genreId, direction.left));
        let arrowNext = document.getElementById("carouselNext" + genreId);
        arrowNext.addEventListener("click", ()=>this.NavigateGenre(genreId, direction.right));
    }
    NavigateGenre(genreId, dir) {
        const carouselImageGroup = document.getElementById("carouselImageStrip" + genreId);
        const limit = carouselImageGroup.scrollLeft + carouselImageGroup.offsetWidth * Math.sign(dir);
        scroll(genreId, dir);
        function scroll(genreId, dir) {
            carouselImageGroup.scrollBy(30 * Math.sign(dir), 0); // horizontal and vertical scroll increments
            if (direction[dir] == "right" && carouselImageGroup.scrollLeft <= limit && carouselImageGroup.scrollLeft < carouselImageGroup.scrollWidth - carouselImageGroup.offsetWidth) setTimeout(()=>scroll(genreId, dir), 5);
            else if (direction[dir] == "left" && carouselImageGroup.scrollLeft >= limit && carouselImageGroup.scrollLeft != 0) setTimeout(()=>scroll(genreId, dir), 5);
        }
    }
}
exports.GetByGenre = GetByGenre;

},{"./fetchFromApi":"jrWas","../utils/lazyLoading":"8Wtc7"}],"29Biz":[function(require,module,exports) {
"use strict";
var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LowerSection = exports.sortBy = void 0;
const fetchFromApi_1 = require("./fetchFromApi");
const movieSize_model_1 = require("../models/movieSize.model");
const lazyLoading_1 = require("../utils/lazyLoading");
var sortBy;
(function(sortBy) {
    sortBy["popularity_asc"] = "popularity.asc";
    sortBy["popularity_desc"] = "popularity.desc";
    sortBy["release_date_asc"] = "release_date.asc";
    sortBy["release_date_desc"] = "release_date.desc";
    sortBy["revenue_asc"] = "revenue.asc";
    sortBy["revenue_desc"] = "revenue.desc";
    sortBy["primary_release_date_asc"] = "primary_release_date.asc";
    sortBy["primary_release_date_desc"] = "primary_release_date.desc";
    sortBy["original_title_asc"] = "original_title.asc";
    sortBy["original_title_desc"] = "original_title.desc";
    sortBy["vote_average_asc"] = "vote_average.asc";
    sortBy["vote_average_desc"] = "vote_average.desc";
    sortBy["vote_count_asc"] = "vote_count.asc";
    sortBy["vote_count_desc"] = "vote_count.desc";
})(sortBy = exports.sortBy || (exports.sortBy = {}));
class LowerSection {
    constructor(){
        this._selected = "btn1";
        this.currentPage = 2;
    }
    addbutton(title, idNumber, sortby) {
        const id = "btn" + idNumber;
        const LowerButtonContainer = document.querySelector("#lowerButtonContainer");
        const btn = `
            <button id="${id}" class="lower__button" type="button">
                <H4 class="lower__button_title"> ${title} </H4>
            </button>
        `;
        LowerButtonContainer === null || LowerButtonContainer === void 0 || LowerButtonContainer.insertAdjacentHTML("beforeend", btn);
        const button = document.getElementById(id);
        button === null || button === void 0 || button.addEventListener("click", ()=>this.getFilteredMovies(sortby, id));
    }
    addSkeleton() {
        const lowerContent = document.getElementById("lowerContent");
        lowerContent.innerHTML = "";
        for(let index = 0; index < 20; index++){
            const lowerCard = `
                <div class="lower__card  lower__image skeleton" id="lowerCard" >
                </div>
            `;
            lowerContent.insertAdjacentHTML("beforeend", lowerCard);
        }
    }
    getFilteredMovies(sortby, id = this._selected) {
        return __awaiter(this, void 0, void 0, function*() {
            const selected = document.getElementById(this._selected);
            if (this._selected != id) {
                const newSelected = document.getElementById(id);
                this._selected = id;
                selected.className = "lower__button";
                newSelected.className = "lower__button--selected";
            } else selected.className = "lower__button--selected";
            const data = yield (0, fetchFromApi_1.api)(`discover/movie`, `sort_by=${sortby}`);
            const movies = data.results.filter((movie)=>movie.poster_path);
            const lowerCard = document.querySelectorAll("#lowerCard");
            lowerCard.forEach((card, index)=>{
                if (movies[index]) {
                    card.innerHTML = `
                    <img id="cardImg${index}" class="lower__image" data-src="${"https://image.tmdb.org/t/p/" + movieSize_model_1.posterSizes.w342 + movies[index].poster_path}" alt="${movies[index].title + " poster image"}">
                    <h5 class="lower__title">${movies[index].title}</h5>
                `;
                    const cardimg = document.getElementById("cardImg" + index);
                    lazyLoading_1.lazyLoading.observe(cardimg);
                    cardimg.onload = ()=>card.setAttribute("class", "lower__card");
                } else card.remove();
            });
            const lowerLoadMore = document.getElementById("lowerLoadMore");
            lowerLoadMore === null || lowerLoadMore === void 0 || lowerLoadMore.addEventListener("click", ()=>{
                this.getMoreMovies(sortby);
            });
        });
    }
    getMoreMovies(sortby) {
        return __awaiter(this, void 0, void 0, function*() {
            const data = yield (0, fetchFromApi_1.api)(`discover/movie`, `sort_by=${sortby}&page=${this.currentPage}`);
            const movies = data.results.filter((movie)=>movie.poster_path);
            const lowerContent = document.getElementById("lowerContent");
            movies.forEach((movie, index)=>{
                const card = `
                <div class="lower__card" id="lowerCard" >
                    <img class="lower__image" src="${"https://image.tmdb.org/t/p/" + movieSize_model_1.posterSizes.w342 + movies[index].poster_path}" alt="${movies[index].title + " poster image"}">
                    <h5 class="lower__title">${movies[index].title}</h5>
                </div>
            `;
                lowerContent === null || lowerContent === void 0 || lowerContent.insertAdjacentHTML("beforeend", card);
            });
            this.currentPage += 1;
        });
    }
}
exports.LowerSection = LowerSection;

},{"../models/movieSize.model":"c91Nv","./fetchFromApi":"jrWas","../utils/lazyLoading":"8Wtc7"}]},["aLgel","lbDgN"], "lbDgN", "parcelRequireace1")

//# sourceMappingURL=index.d952272d.js.map
