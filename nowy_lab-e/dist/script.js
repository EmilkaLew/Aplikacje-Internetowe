/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var StyleManager = /*#__PURE__*/function () {
  function StyleManager() {
    _classCallCheck(this, StyleManager);
    // Znajdź element <link> w DOM
    this.themeLink = document.getElementById("theme-style");
    if (!this.themeLink) {
      throw new Error("Nie znaleziono elementu <link> z ID 'theme-style'.");
    }
    // Znajdź kontener na linki w DOM
    this.linksContainer = document.getElementById("style-links-container");
    if (!this.linksContainer) {
      throw new Error("Nie znaleziono kontenera na linki 'style-links-container'.");
    }
    // Zainicjalizuj stan aplikacji
    this.state = {
      currentStyle: this.themeLink.getAttribute("href") || "",
      styles: {
        "style1": "page1.css",
        "style2": "page2.css",
        "style3": "page3.css" //Nowy styl
      }
    };
    // Generowanie dynamicznych linków
    this.generateStyleLinks();
    // Podłącz zdarzenia do linków
    this.attachEventListeners();
  }
  /**
       * Dynamiczne generowanie linków do stylów na podstawie stanu aplikacji.
       */
  return _createClass(StyleManager, [{
    key: "generateStyleLinks",
    value: function generateStyleLinks() {
      var _this = this;
      this.linksContainer.innerHTML = "";
      var ul = document.createElement("ul");
      ul.classList.add("menu");
      var _loop = function _loop() {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          styleName = _Object$entries$_i[0],
          stylePath = _Object$entries$_i[1];
        var li = document.createElement("li");
        var link = document.createElement("a");
        link.href = "#";
        link.textContent = styleName;
        link.setAttribute("data-style", stylePath);
        link.addEventListener("click", function (event) {
          event.preventDefault();
          _this.changeStyle(stylePath);
        });
        li.appendChild(link);
        ul.appendChild(li);
      };
      for (var _i = 0, _Object$entries = Object.entries(this.state.styles); _i < _Object$entries.length; _i++) {
        _loop();
      }
      this.linksContainer.appendChild(ul);
    }
  }, {
    key: "attachEventListeners",
    value: function attachEventListeners() {
      var _this2 = this;
      var links = document.querySelectorAll("[data-style]");
      links.forEach(function (link) {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          var target = event.target;
          var styleName = target.getAttribute("data-style");
          if (styleName) {
            _this2.changeStyle(styleName);
          }
        });
      });
    }
  }, {
    key: "changeStyle",
    value: function changeStyle(newStylePath) {
      var _a;
      if (this.state.currentStyle !== newStylePath) {
        (_a = this.themeLink.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(this.themeLink);
        var newLink = document.createElement("link");
        newLink.id = "theme-style";
        newLink.rel = "stylesheet";
        newLink.href = "style/".concat(newStylePath);
        document.head.appendChild(newLink);
        this.state.currentStyle = newStylePath;
      }
    }
  }]);
}(); // Inicjalizacja
document.addEventListener("DOMContentLoaded", function () {
  new StyleManager();
});
/******/ })()
;