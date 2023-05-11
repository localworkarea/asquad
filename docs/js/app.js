(() => {
    var __webpack_modules__ = {
        614: function(module) {
            /*!
 * 
 *   typed.js - A JavaScript Typing Animation Library
 *   Author: Matt Boldt <me@mattboldt.com>
 *   Version: v2.0.12
 *   Url: https://github.com/mattboldt/typed.js
 *   License(s): MIT
 * 
 */
            (function webpackUniversalModuleDefinition(root, factory) {
                if (true) module.exports = factory();
            })(0, (function() {
                return function(modules) {
                    var installedModules = {};
                    function __nested_webpack_require_737__(moduleId) {
                        if (installedModules[moduleId]) return installedModules[moduleId].exports;
                        var module = installedModules[moduleId] = {
                            exports: {},
                            id: moduleId,
                            loaded: false
                        };
                        modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_737__);
                        module.loaded = true;
                        return module.exports;
                    }
                    __nested_webpack_require_737__.m = modules;
                    __nested_webpack_require_737__.c = installedModules;
                    __nested_webpack_require_737__.p = "";
                    return __nested_webpack_require_737__(0);
                }([ function(module, exports, __nested_webpack_require_2018__) {
                    "use strict";
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    var _createClass = function() {
                        function defineProperties(target, props) {
                            for (var i = 0; i < props.length; i++) {
                                var descriptor = props[i];
                                descriptor.enumerable = descriptor.enumerable || false;
                                descriptor.configurable = true;
                                if ("value" in descriptor) descriptor.writable = true;
                                Object.defineProperty(target, descriptor.key, descriptor);
                            }
                        }
                        return function(Constructor, protoProps, staticProps) {
                            if (protoProps) defineProperties(Constructor.prototype, protoProps);
                            if (staticProps) defineProperties(Constructor, staticProps);
                            return Constructor;
                        };
                    }();
                    function _classCallCheck(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }
                    var _initializerJs = __nested_webpack_require_2018__(1);
                    var _htmlParserJs = __nested_webpack_require_2018__(3);
                    var Typed = function() {
                        function Typed(elementId, options) {
                            _classCallCheck(this, Typed);
                            _initializerJs.initializer.load(this, options, elementId);
                            this.begin();
                        }
                        _createClass(Typed, [ {
                            key: "toggle",
                            value: function toggle() {
                                this.pause.status ? this.start() : this.stop();
                            }
                        }, {
                            key: "stop",
                            value: function stop() {
                                if (this.typingComplete) return;
                                if (this.pause.status) return;
                                this.toggleBlinking(true);
                                this.pause.status = true;
                                this.options.onStop(this.arrayPos, this);
                            }
                        }, {
                            key: "start",
                            value: function start() {
                                if (this.typingComplete) return;
                                if (!this.pause.status) return;
                                this.pause.status = false;
                                if (this.pause.typewrite) this.typewrite(this.pause.curString, this.pause.curStrPos); else this.backspace(this.pause.curString, this.pause.curStrPos);
                                this.options.onStart(this.arrayPos, this);
                            }
                        }, {
                            key: "destroy",
                            value: function destroy() {
                                this.reset(false);
                                this.options.onDestroy(this);
                            }
                        }, {
                            key: "reset",
                            value: function reset() {
                                var restart = arguments.length <= 0 || void 0 === arguments[0] ? true : arguments[0];
                                clearInterval(this.timeout);
                                this.replaceText("");
                                if (this.cursor && this.cursor.parentNode) {
                                    this.cursor.parentNode.removeChild(this.cursor);
                                    this.cursor = null;
                                }
                                this.strPos = 0;
                                this.arrayPos = 0;
                                this.curLoop = 0;
                                if (restart) {
                                    this.insertCursor();
                                    this.options.onReset(this);
                                    this.begin();
                                }
                            }
                        }, {
                            key: "begin",
                            value: function begin() {
                                var _this = this;
                                this.options.onBegin(this);
                                this.typingComplete = false;
                                this.shuffleStringsIfNeeded(this);
                                this.insertCursor();
                                if (this.bindInputFocusEvents) this.bindFocusEvents();
                                this.timeout = setTimeout((function() {
                                    if (!_this.currentElContent || 0 === _this.currentElContent.length) _this.typewrite(_this.strings[_this.sequence[_this.arrayPos]], _this.strPos); else _this.backspace(_this.currentElContent, _this.currentElContent.length);
                                }), this.startDelay);
                            }
                        }, {
                            key: "typewrite",
                            value: function typewrite(curString, curStrPos) {
                                var _this2 = this;
                                if (this.fadeOut && this.el.classList.contains(this.fadeOutClass)) {
                                    this.el.classList.remove(this.fadeOutClass);
                                    if (this.cursor) this.cursor.classList.remove(this.fadeOutClass);
                                }
                                var humanize = this.humanizer(this.typeSpeed);
                                var numChars = 1;
                                if (true === this.pause.status) {
                                    this.setPauseStatus(curString, curStrPos, true);
                                    return;
                                }
                                this.timeout = setTimeout((function() {
                                    curStrPos = _htmlParserJs.htmlParser.typeHtmlChars(curString, curStrPos, _this2);
                                    var pauseTime = 0;
                                    var substr = curString.substr(curStrPos);
                                    if ("^" === substr.charAt(0)) if (/^\^\d+/.test(substr)) {
                                        var skip = 1;
                                        substr = /\d+/.exec(substr)[0];
                                        skip += substr.length;
                                        pauseTime = parseInt(substr);
                                        _this2.temporaryPause = true;
                                        _this2.options.onTypingPaused(_this2.arrayPos, _this2);
                                        curString = curString.substring(0, curStrPos) + curString.substring(curStrPos + skip);
                                        _this2.toggleBlinking(true);
                                    }
                                    if ("`" === substr.charAt(0)) {
                                        while ("`" !== curString.substr(curStrPos + numChars).charAt(0)) {
                                            numChars++;
                                            if (curStrPos + numChars > curString.length) break;
                                        }
                                        var stringBeforeSkip = curString.substring(0, curStrPos);
                                        var stringSkipped = curString.substring(stringBeforeSkip.length + 1, curStrPos + numChars);
                                        var stringAfterSkip = curString.substring(curStrPos + numChars + 1);
                                        curString = stringBeforeSkip + stringSkipped + stringAfterSkip;
                                        numChars--;
                                    }
                                    _this2.timeout = setTimeout((function() {
                                        _this2.toggleBlinking(false);
                                        if (curStrPos >= curString.length) _this2.doneTyping(curString, curStrPos); else _this2.keepTyping(curString, curStrPos, numChars);
                                        if (_this2.temporaryPause) {
                                            _this2.temporaryPause = false;
                                            _this2.options.onTypingResumed(_this2.arrayPos, _this2);
                                        }
                                    }), pauseTime);
                                }), humanize);
                            }
                        }, {
                            key: "keepTyping",
                            value: function keepTyping(curString, curStrPos, numChars) {
                                if (0 === curStrPos) {
                                    this.toggleBlinking(false);
                                    this.options.preStringTyped(this.arrayPos, this);
                                }
                                curStrPos += numChars;
                                var nextString = curString.substr(0, curStrPos);
                                this.replaceText(nextString);
                                this.typewrite(curString, curStrPos);
                            }
                        }, {
                            key: "doneTyping",
                            value: function doneTyping(curString, curStrPos) {
                                var _this3 = this;
                                this.options.onStringTyped(this.arrayPos, this);
                                this.toggleBlinking(true);
                                if (this.arrayPos === this.strings.length - 1) {
                                    this.complete();
                                    if (false === this.loop || this.curLoop === this.loopCount) return;
                                }
                                this.timeout = setTimeout((function() {
                                    _this3.backspace(curString, curStrPos);
                                }), this.backDelay);
                            }
                        }, {
                            key: "backspace",
                            value: function backspace(curString, curStrPos) {
                                var _this4 = this;
                                if (true === this.pause.status) {
                                    this.setPauseStatus(curString, curStrPos, false);
                                    return;
                                }
                                if (this.fadeOut) return this.initFadeOut();
                                this.toggleBlinking(false);
                                var humanize = this.humanizer(this.backSpeed);
                                this.timeout = setTimeout((function() {
                                    curStrPos = _htmlParserJs.htmlParser.backSpaceHtmlChars(curString, curStrPos, _this4);
                                    var curStringAtPosition = curString.substr(0, curStrPos);
                                    _this4.replaceText(curStringAtPosition);
                                    if (_this4.smartBackspace) {
                                        var nextString = _this4.strings[_this4.arrayPos + 1];
                                        if (nextString && curStringAtPosition === nextString.substr(0, curStrPos)) _this4.stopNum = curStrPos; else _this4.stopNum = 0;
                                    }
                                    if (curStrPos > _this4.stopNum) {
                                        curStrPos--;
                                        _this4.backspace(curString, curStrPos);
                                    } else if (curStrPos <= _this4.stopNum) {
                                        _this4.arrayPos++;
                                        if (_this4.arrayPos === _this4.strings.length) {
                                            _this4.arrayPos = 0;
                                            _this4.options.onLastStringBackspaced();
                                            _this4.shuffleStringsIfNeeded();
                                            _this4.begin();
                                        } else _this4.typewrite(_this4.strings[_this4.sequence[_this4.arrayPos]], curStrPos);
                                    }
                                }), humanize);
                            }
                        }, {
                            key: "complete",
                            value: function complete() {
                                this.options.onComplete(this);
                                if (this.loop) this.curLoop++; else this.typingComplete = true;
                            }
                        }, {
                            key: "setPauseStatus",
                            value: function setPauseStatus(curString, curStrPos, isTyping) {
                                this.pause.typewrite = isTyping;
                                this.pause.curString = curString;
                                this.pause.curStrPos = curStrPos;
                            }
                        }, {
                            key: "toggleBlinking",
                            value: function toggleBlinking(isBlinking) {
                                if (!this.cursor) return;
                                if (this.pause.status) return;
                                if (this.cursorBlinking === isBlinking) return;
                                this.cursorBlinking = isBlinking;
                                if (isBlinking) this.cursor.classList.add("typed-cursor--blink"); else this.cursor.classList.remove("typed-cursor--blink");
                            }
                        }, {
                            key: "humanizer",
                            value: function humanizer(speed) {
                                return Math.round(Math.random() * speed / 2) + speed;
                            }
                        }, {
                            key: "shuffleStringsIfNeeded",
                            value: function shuffleStringsIfNeeded() {
                                if (!this.shuffle) return;
                                this.sequence = this.sequence.sort((function() {
                                    return Math.random() - .5;
                                }));
                            }
                        }, {
                            key: "initFadeOut",
                            value: function initFadeOut() {
                                var _this5 = this;
                                this.el.className += " " + this.fadeOutClass;
                                if (this.cursor) this.cursor.className += " " + this.fadeOutClass;
                                return setTimeout((function() {
                                    _this5.arrayPos++;
                                    _this5.replaceText("");
                                    if (_this5.strings.length > _this5.arrayPos) _this5.typewrite(_this5.strings[_this5.sequence[_this5.arrayPos]], 0); else {
                                        _this5.typewrite(_this5.strings[0], 0);
                                        _this5.arrayPos = 0;
                                    }
                                }), this.fadeOutDelay);
                            }
                        }, {
                            key: "replaceText",
                            value: function replaceText(str) {
                                if (this.attr) this.el.setAttribute(this.attr, str); else if (this.isInput) this.el.value = str; else if ("html" === this.contentType) this.el.innerHTML = str; else this.el.textContent = str;
                            }
                        }, {
                            key: "bindFocusEvents",
                            value: function bindFocusEvents() {
                                var _this6 = this;
                                if (!this.isInput) return;
                                this.el.addEventListener("focus", (function(e) {
                                    _this6.stop();
                                }));
                                this.el.addEventListener("blur", (function(e) {
                                    if (_this6.el.value && 0 !== _this6.el.value.length) return;
                                    _this6.start();
                                }));
                            }
                        }, {
                            key: "insertCursor",
                            value: function insertCursor() {
                                if (!this.showCursor) return;
                                if (this.cursor) return;
                                this.cursor = document.createElement("span");
                                this.cursor.className = "typed-cursor";
                                this.cursor.setAttribute("aria-hidden", true);
                                this.cursor.innerHTML = this.cursorChar;
                                this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling);
                            }
                        } ]);
                        return Typed;
                    }();
                    exports["default"] = Typed;
                    module.exports = exports["default"];
                }, function(module, exports, __nested_webpack_require_18228__) {
                    "use strict";
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    var _extends = Object.assign || function(target) {
                        for (var i = 1; i < arguments.length; i++) {
                            var source = arguments[i];
                            for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
                        }
                        return target;
                    };
                    var _createClass = function() {
                        function defineProperties(target, props) {
                            for (var i = 0; i < props.length; i++) {
                                var descriptor = props[i];
                                descriptor.enumerable = descriptor.enumerable || false;
                                descriptor.configurable = true;
                                if ("value" in descriptor) descriptor.writable = true;
                                Object.defineProperty(target, descriptor.key, descriptor);
                            }
                        }
                        return function(Constructor, protoProps, staticProps) {
                            if (protoProps) defineProperties(Constructor.prototype, protoProps);
                            if (staticProps) defineProperties(Constructor, staticProps);
                            return Constructor;
                        };
                    }();
                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }
                    function _classCallCheck(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }
                    var _defaultsJs = __nested_webpack_require_18228__(2);
                    var _defaultsJs2 = _interopRequireDefault(_defaultsJs);
                    var Initializer = function() {
                        function Initializer() {
                            _classCallCheck(this, Initializer);
                        }
                        _createClass(Initializer, [ {
                            key: "load",
                            value: function load(self, options, elementId) {
                                if ("string" === typeof elementId) self.el = document.querySelector(elementId); else self.el = elementId;
                                self.options = _extends({}, _defaultsJs2["default"], options);
                                self.isInput = "input" === self.el.tagName.toLowerCase();
                                self.attr = self.options.attr;
                                self.bindInputFocusEvents = self.options.bindInputFocusEvents;
                                self.showCursor = self.isInput ? false : self.options.showCursor;
                                self.cursorChar = self.options.cursorChar;
                                self.cursorBlinking = true;
                                self.elContent = self.attr ? self.el.getAttribute(self.attr) : self.el.textContent;
                                self.contentType = self.options.contentType;
                                self.typeSpeed = self.options.typeSpeed;
                                self.startDelay = self.options.startDelay;
                                self.backSpeed = self.options.backSpeed;
                                self.smartBackspace = self.options.smartBackspace;
                                self.backDelay = self.options.backDelay;
                                self.fadeOut = self.options.fadeOut;
                                self.fadeOutClass = self.options.fadeOutClass;
                                self.fadeOutDelay = self.options.fadeOutDelay;
                                self.isPaused = false;
                                self.strings = self.options.strings.map((function(s) {
                                    return s.trim();
                                }));
                                if ("string" === typeof self.options.stringsElement) self.stringsElement = document.querySelector(self.options.stringsElement); else self.stringsElement = self.options.stringsElement;
                                if (self.stringsElement) {
                                    self.strings = [];
                                    self.stringsElement.style.display = "none";
                                    var strings = Array.prototype.slice.apply(self.stringsElement.children);
                                    var stringsLength = strings.length;
                                    if (stringsLength) for (var i = 0; i < stringsLength; i += 1) {
                                        var stringEl = strings[i];
                                        self.strings.push(stringEl.innerHTML.trim());
                                    }
                                }
                                self.strPos = 0;
                                self.arrayPos = 0;
                                self.stopNum = 0;
                                self.loop = self.options.loop;
                                self.loopCount = self.options.loopCount;
                                self.curLoop = 0;
                                self.shuffle = self.options.shuffle;
                                self.sequence = [];
                                self.pause = {
                                    status: false,
                                    typewrite: true,
                                    curString: "",
                                    curStrPos: 0
                                };
                                self.typingComplete = false;
                                for (var i in self.strings) self.sequence[i] = i;
                                self.currentElContent = this.getCurrentElContent(self);
                                self.autoInsertCss = self.options.autoInsertCss;
                                this.appendAnimationCss(self);
                            }
                        }, {
                            key: "getCurrentElContent",
                            value: function getCurrentElContent(self) {
                                var elContent = "";
                                if (self.attr) elContent = self.el.getAttribute(self.attr); else if (self.isInput) elContent = self.el.value; else if ("html" === self.contentType) elContent = self.el.innerHTML; else elContent = self.el.textContent;
                                return elContent;
                            }
                        }, {
                            key: "appendAnimationCss",
                            value: function appendAnimationCss(self) {
                                var cssDataName = "data-typed-js-css";
                                if (!self.autoInsertCss) return;
                                if (!self.showCursor && !self.fadeOut) return;
                                if (document.querySelector("[" + cssDataName + "]")) return;
                                var css = document.createElement("style");
                                css.type = "text/css";
                                css.setAttribute(cssDataName, true);
                                var innerCss = "";
                                if (self.showCursor) innerCss += "\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      ";
                                if (self.fadeOut) innerCss += "\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      ";
                                if (0 === css.length) return;
                                css.innerHTML = innerCss;
                                document.body.appendChild(css);
                            }
                        } ]);
                        return Initializer;
                    }();
                    exports["default"] = Initializer;
                    var initializer = new Initializer;
                    exports.initializer = initializer;
                }, function(module, exports) {
                    "use strict";
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    var defaults = {
                        strings: [ "These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!" ],
                        stringsElement: null,
                        typeSpeed: 0,
                        startDelay: 0,
                        backSpeed: 0,
                        smartBackspace: true,
                        shuffle: false,
                        backDelay: 700,
                        fadeOut: false,
                        fadeOutClass: "typed-fade-out",
                        fadeOutDelay: 500,
                        loop: false,
                        loopCount: 1 / 0,
                        showCursor: true,
                        cursorChar: "|",
                        autoInsertCss: true,
                        attr: null,
                        bindInputFocusEvents: false,
                        contentType: "html",
                        onBegin: function onBegin(self) {},
                        onComplete: function onComplete(self) {},
                        preStringTyped: function preStringTyped(arrayPos, self) {},
                        onStringTyped: function onStringTyped(arrayPos, self) {},
                        onLastStringBackspaced: function onLastStringBackspaced(self) {},
                        onTypingPaused: function onTypingPaused(arrayPos, self) {},
                        onTypingResumed: function onTypingResumed(arrayPos, self) {},
                        onReset: function onReset(self) {},
                        onStop: function onStop(arrayPos, self) {},
                        onStart: function onStart(arrayPos, self) {},
                        onDestroy: function onDestroy(self) {}
                    };
                    exports["default"] = defaults;
                    module.exports = exports["default"];
                }, function(module, exports) {
                    "use strict";
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    var _createClass = function() {
                        function defineProperties(target, props) {
                            for (var i = 0; i < props.length; i++) {
                                var descriptor = props[i];
                                descriptor.enumerable = descriptor.enumerable || false;
                                descriptor.configurable = true;
                                if ("value" in descriptor) descriptor.writable = true;
                                Object.defineProperty(target, descriptor.key, descriptor);
                            }
                        }
                        return function(Constructor, protoProps, staticProps) {
                            if (protoProps) defineProperties(Constructor.prototype, protoProps);
                            if (staticProps) defineProperties(Constructor, staticProps);
                            return Constructor;
                        };
                    }();
                    function _classCallCheck(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }
                    var HTMLParser = function() {
                        function HTMLParser() {
                            _classCallCheck(this, HTMLParser);
                        }
                        _createClass(HTMLParser, [ {
                            key: "typeHtmlChars",
                            value: function typeHtmlChars(curString, curStrPos, self) {
                                if ("html" !== self.contentType) return curStrPos;
                                var curChar = curString.substr(curStrPos).charAt(0);
                                if ("<" === curChar || "&" === curChar) {
                                    var endTag = "";
                                    if ("<" === curChar) endTag = ">"; else endTag = ";";
                                    while (curString.substr(curStrPos + 1).charAt(0) !== endTag) {
                                        curStrPos++;
                                        if (curStrPos + 1 > curString.length) break;
                                    }
                                    curStrPos++;
                                }
                                return curStrPos;
                            }
                        }, {
                            key: "backSpaceHtmlChars",
                            value: function backSpaceHtmlChars(curString, curStrPos, self) {
                                if ("html" !== self.contentType) return curStrPos;
                                var curChar = curString.substr(curStrPos).charAt(0);
                                if (">" === curChar || ";" === curChar) {
                                    var endTag = "";
                                    if (">" === curChar) endTag = "<"; else endTag = "&";
                                    while (curString.substr(curStrPos - 1).charAt(0) !== endTag) {
                                        curStrPos--;
                                        if (curStrPos < 0) break;
                                    }
                                    curStrPos--;
                                }
                                return curStrPos;
                            }
                        } ]);
                        return HTMLParser;
                    }();
                    exports["default"] = HTMLParser;
                    var htmlParser = new HTMLParser;
                    exports.htmlParser = htmlParser;
                } ]);
            }));
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        "use strict";
        const flsModules = {};
        function isWebp() {
            function testWebP(callback) {
                let webP = new Image;
                webP.onload = webP.onerror = function() {
                    callback(2 == webP.height);
                };
                webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            testWebP((function(support) {
                let className = true === support ? "webp" : "no-webp";
                document.documentElement.classList.add(className);
            }));
        }
        let isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
            }
        };
        function addTouchClass() {
            if (isMobile.any()) document.documentElement.classList.add("touch");
        }
        function addLoadedClass() {
            if (!document.documentElement.classList.contains("loading")) window.addEventListener("load", (function() {
                setTimeout((function() {
                    document.documentElement.classList.add("loaded");
                }), 0);
            }));
        }
        function getHash() {
            if (location.hash) return location.hash.replace("#", "");
        }
        function setHash(hash) {
            hash = hash ? `#${hash}` : window.location.href.split("#")[0];
            history.pushState("", "", hash);
        }
        function fullVHfix() {
            const fullScreens = document.querySelectorAll("[data-fullscreen]");
            if (fullScreens.length && isMobile.any()) {
                window.addEventListener("resize", fixHeight);
                function fixHeight() {
                    let vh = .01 * window.innerHeight;
                    document.documentElement.style.setProperty("--vh", `${vh}px`);
                }
                fixHeight();
            }
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout((() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout((() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let bodyLockStatus = true;
        let bodyLockToggle = (delay = 500) => {
            if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
        };
        let bodyUnlock = (delay = 500) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                setTimeout((() => {
                    for (let index = 0; index < lock_padding.length; index++) {
                        const el = lock_padding[index];
                        el.style.paddingRight = "0px";
                    }
                    body.style.paddingRight = "0px";
                    document.documentElement.classList.remove("lock");
                }), delay);
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        let bodyLock = (delay = 500) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                }
                body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                document.documentElement.classList.add("lock");
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        function tabs() {
            const tabs = document.querySelectorAll("[data-tabs]");
            let tabsActiveHash = [];
            if (tabs.length > 0) {
                const hash = getHash();
                if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
                tabs.forEach(((tabsBlock, index) => {
                    tabsBlock.classList.add("_tab-init");
                    tabsBlock.setAttribute("data-tabs-index", index);
                    tabsBlock.addEventListener("click", setTabsAction);
                    initTabs(tabsBlock);
                }));
                let mdQueriesArray = dataMediaQueries(tabs, "tabs");
                if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                    mdQueriesItem.matchMedia.addEventListener("change", (function() {
                        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    }));
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
            }
            function setTitlePosition(tabsMediaArray, matchMedia) {
                tabsMediaArray.forEach((tabsMediaItem => {
                    tabsMediaItem = tabsMediaItem.item;
                    let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
                    let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
                    let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
                    let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
                    tabsTitleItems = Array.from(tabsTitleItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                    tabsContentItems = Array.from(tabsContentItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                    tabsContentItems.forEach(((tabsContentItem, index) => {
                        if (matchMedia.matches) {
                            tabsContent.append(tabsTitleItems[index]);
                            tabsContent.append(tabsContentItem);
                            tabsMediaItem.classList.add("_tab-spoller");
                        } else {
                            tabsTitles.append(tabsTitleItems[index]);
                            tabsMediaItem.classList.remove("_tab-spoller");
                        }
                    }));
                }));
            }
            function initTabs(tabsBlock) {
                let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
                let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
                const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
                const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
                if (tabsActiveHashBlock) {
                    const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
                    tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
                }
                if (tabsContent.length) {
                    tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsContent.forEach(((tabsContentItem, index) => {
                        tabsTitles[index].setAttribute("data-tabs-title", "");
                        tabsContentItem.setAttribute("data-tabs-item", "");
                        if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add("_tab-active");
                        tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
                    }));
                }
            }
            function setTabsStatus(tabsBlock) {
                let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
                let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
                const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
                function isTabsAnamate(tabsBlock) {
                    if (tabsBlock.hasAttribute("data-tabs-animate")) return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
                }
                const tabsBlockAnimate = isTabsAnamate(tabsBlock);
                if (tabsContent.length > 0) {
                    const isHash = tabsBlock.hasAttribute("data-tabs-hash");
                    tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsContent.forEach(((tabsContentItem, index) => {
                        if (tabsTitles[index].classList.contains("_tab-active")) {
                            if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = false;
                            if (isHash && !tabsContentItem.closest(".popup")) setHash(`tab-${tabsBlockIndex}-${index}`);
                        } else if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = true;
                    }));
                }
            }
            function setTabsAction(e) {
                const el = e.target;
                if (el.closest("[data-tabs-title]")) {
                    const tabTitle = el.closest("[data-tabs-title]");
                    const tabsBlock = tabTitle.closest("[data-tabs]");
                    if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
                        let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
                        tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter((item => item.closest("[data-tabs]") === tabsBlock)) : null;
                        tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
                        tabTitle.classList.add("_tab-active");
                        setTabsStatus(tabsBlock);
                    } else if (tabTitle.classList.contains("_tab-active")) document.querySelector(".technologies__btn_none").click();
                    e.preventDefault();
                }
            }
        }
        function menuInit() {
            if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
                if (bodyLockStatus && e.target.closest(".icon-menu")) {
                    bodyLockToggle();
                    document.documentElement.classList.toggle("menu-open");
                }
            }));
        }
        function menuClose() {
            bodyUnlock();
            document.documentElement.classList.remove("menu-open");
        }
        function FLS(message) {
            setTimeout((() => {
                if (window.FLS) console.log(message);
            }), 0);
        }
        function uniqArray(array) {
            return array.filter((function(item, index, self) {
                return self.indexOf(item) === index;
            }));
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter((function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            }));
            if (media.length) {
                const breakpointsArray = [];
                media.forEach((item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                }));
                let mdQueries = breakpointsArray.map((function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                }));
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach((breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter((function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        }));
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    }));
                    return mdQueriesArray;
                }
            }
        }
        class Popup {
            constructor(options) {
                let config = {
                    logging: true,
                    init: true,
                    attributeOpenButton: "data-popup",
                    attributeCloseButton: "data-close",
                    fixElementSelector: "[data-lp]",
                    youtubeAttribute: "data-popup-youtube",
                    youtubePlaceAttribute: "data-popup-youtube-place",
                    setAutoplayYoutube: true,
                    classes: {
                        popup: "popup-form",
                        popupContent: "popup-form__content",
                        popupActive: "popup_show",
                        bodyActive: "popup-show"
                    },
                    focusCatch: true,
                    closeEsc: true,
                    bodyLock: true,
                    hashSettings: {
                        location: false,
                        goHash: false
                    },
                    on: {
                        beforeOpen: function() {},
                        afterOpen: function() {},
                        beforeClose: function() {},
                        afterClose: function() {}
                    }
                };
                this.youTubeCode;
                this.isOpen = false;
                this.targetOpen = {
                    selector: false,
                    element: false
                };
                this.previousOpen = {
                    selector: false,
                    element: false
                };
                this.lastClosed = {
                    selector: false,
                    element: false
                };
                this._dataValue = false;
                this.hash = false;
                this._reopen = false;
                this._selectorOpen = false;
                this.lastFocusEl = false;
                this._focusEl = [ "a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])' ];
                this.options = {
                    ...config,
                    ...options,
                    classes: {
                        ...config.classes,
                        ...options?.classes
                    },
                    hashSettings: {
                        ...config.hashSettings,
                        ...options?.hashSettings
                    },
                    on: {
                        ...config.on,
                        ...options?.on
                    }
                };
                this.bodyLock = false;
                this.options.init ? this.initPopups() : null;
            }
            initPopups() {
                this.eventsPopup();
            }
            eventsPopup() {
                document.addEventListener("click", function(e) {
                    const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
                    if (buttonOpen) {
                        e.preventDefault();
                        this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
                        this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
                        if ("error" !== this._dataValue) {
                            if (!this.isOpen) this.lastFocusEl = buttonOpen;
                            this.targetOpen.selector = `${this._dataValue}`;
                            this._selectorOpen = true;
                            this.open();
                            return;
                        } else this.popupLogging(`Йой, не заповнено атрибут у ${buttonOpen.classList}`);
                        return;
                    }
                    const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
                    if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
                        e.preventDefault();
                        this.close();
                        return;
                    }
                }.bind(this));
                document.addEventListener("keydown", function(e) {
                    if (this.options.closeEsc && 27 == e.which && "Escape" === e.code && this.isOpen) {
                        e.preventDefault();
                        this.close();
                        return;
                    }
                    if (this.options.focusCatch && 9 == e.which && this.isOpen) {
                        this._focusCatch(e);
                        return;
                    }
                }.bind(this));
                if (this.options.hashSettings.goHash) {
                    window.addEventListener("hashchange", function() {
                        if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
                    }.bind(this));
                    window.addEventListener("load", function() {
                        if (window.location.hash) this._openToHash();
                    }.bind(this));
                }
            }
            open(selectorValue) {
                if (bodyLockStatus) {
                    this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
                    if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) {
                        this.targetOpen.selector = selectorValue;
                        this._selectorOpen = true;
                    }
                    if (this.isOpen) {
                        this._reopen = true;
                        this.close();
                    }
                    if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
                    if (!this._reopen) this.previousActiveElement = document.activeElement;
                    this.targetOpen.element = document.querySelector(this.targetOpen.selector);
                    if (this.targetOpen.element) {
                        if (this.options.hashSettings.location) {
                            this._getHash();
                            this._setHash();
                        }
                        this.options.on.beforeOpen(this);
                        document.dispatchEvent(new CustomEvent("beforePopupOpen", {
                            detail: {
                                popup: this
                            }
                        }));
                        this.targetOpen.element.classList.add(this.options.classes.popupActive);
                        document.documentElement.classList.add(this.options.classes.bodyActive);
                        if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
                        this.targetOpen.element.setAttribute("aria-hidden", "false");
                        this.previousOpen.selector = this.targetOpen.selector;
                        this.previousOpen.element = this.targetOpen.element;
                        this._selectorOpen = false;
                        this.isOpen = true;
                        setTimeout((() => {
                            this._focusTrap();
                        }), 1500);
                        this.options.on.afterOpen(this);
                        document.dispatchEvent(new CustomEvent("afterPopupOpen", {
                            detail: {
                                popup: this
                            }
                        }));
                    }
                }
            }
            close(selectorValue) {
                if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) this.previousOpen.selector = selectorValue;
                if (!this.isOpen || !bodyLockStatus) return;
                this.options.on.beforeClose(this);
                document.dispatchEvent(new CustomEvent("beforePopupClose", {
                    detail: {
                        popup: this
                    }
                }));
                if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
                this.previousOpen.element.classList.remove(this.options.classes.popupActive);
                this.previousOpen.element.setAttribute("aria-hidden", "true");
                if (!this._reopen) {
                    document.documentElement.classList.remove(this.options.classes.bodyActive);
                    !this.bodyLock ? bodyUnlock() : null;
                    this.isOpen = false;
                }
                this._removeHash();
                if (this._selectorOpen) {
                    this.lastClosed.selector = this.previousOpen.selector;
                    this.lastClosed.element = this.previousOpen.element;
                }
                this.options.on.afterClose(this);
                document.dispatchEvent(new CustomEvent("afterPopupClose", {
                    detail: {
                        popup: this
                    }
                }));
                setTimeout((() => {
                    this._focusTrap();
                }), 1500);
            }
            _getHash() {
                if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
            }
            _openToHash() {
                let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
                const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
                if (buttons && classInHash) this.open(classInHash);
            }
            _setHash() {
                history.pushState("", "", this.hash);
            }
            _removeHash() {
                history.pushState("", "", window.location.href.split("#")[0]);
            }
            _focusCatch(e) {
                const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
                const focusArray = Array.prototype.slice.call(focusable);
                const focusedIndex = focusArray.indexOf(document.activeElement);
                if (e.shiftKey && 0 === focusedIndex) {
                    focusArray[focusArray.length - 1].focus();
                    e.preventDefault();
                }
                if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
                    focusArray[0].focus();
                    e.preventDefault();
                }
            }
            _focusTrap() {
                const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
                if (!this.isOpen && this.lastFocusEl) this.lastFocusEl.focus(); else focusable[0].focus();
            }
        }
        flsModules.popup = new Popup({});
        let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
            const targetBlockElement = document.querySelector(targetBlock);
            if (targetBlockElement) {
                let headerItem = "";
                let headerItemHeight = 0;
                if (noHeader) {
                    headerItem = "header.header";
                    const headerElement = document.querySelector(headerItem);
                    if (!headerElement.classList.contains("_header-scroll")) {
                        headerElement.style.cssText = `transition-duration: 0s;`;
                        headerElement.classList.add("_header-scroll");
                        headerItemHeight = headerElement.offsetHeight;
                        headerElement.classList.remove("_header-scroll");
                        setTimeout((() => {
                            headerElement.style.cssText = ``;
                        }), 0);
                    } else headerItemHeight = headerElement.offsetHeight;
                }
                let options = {
                    speedAsDuration: true,
                    speed,
                    header: headerItem,
                    offset: offsetTop,
                    easing: "easeOutQuad"
                };
                document.documentElement.classList.contains("menu-open") ? menuClose() : null;
                if ("undefined" !== typeof SmoothScroll) (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
                    let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
                    targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
                    targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
                    window.scrollTo({
                        top: targetBlockElementPosition,
                        behavior: "smooth"
                    });
                }
                FLS(`[gotoBlock]: Юхуу...їдемо до ${targetBlock}`);
            } else FLS(`[gotoBlock]: Йой... Такого блоку немає на сторінці: ${targetBlock}`);
        };
        document.getElementById("btn-part-submit").disabled = true;
        document.getElementById("btn-req-submit").disabled = true;
        function formFieldsInit(options = {
            viewPass: false,
            autoHeight: false
        }) {
            document.body.addEventListener("focusin", (function(e) {
                const targetElement = e.target;
                if ("INPUT" === targetElement.tagName || "TEXTAREA" === targetElement.tagName) {
                    if (!targetElement.hasAttribute("data-no-focus-classes")) {
                        targetElement.classList.add("_form-focus");
                        targetElement.parentElement.classList.add("_form-focus");
                    }
                    targetElement.hasAttribute("data-validate") ? formValidate.removeError(targetElement) : null;
                }
            }));
            document.body.addEventListener("focusout", (function(e) {
                const targetElement = e.target;
                if ("INPUT" === targetElement.tagName || "TEXTAREA" === targetElement.tagName) {
                    if (!targetElement.hasAttribute("data-no-focus-classes")) {
                        targetElement.classList.remove("_form-focus");
                        targetElement.parentElement.classList.remove("_form-focus");
                    }
                    targetElement.hasAttribute("data-validate") ? formValidate.validateInput(targetElement) : null;
                }
            }));
        }
        let formValidate = {
            getErrors(form) {
                let error = 0;
                let formRequiredItems = form.querySelectorAll("*[data-required]");
                if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                    if ((null !== formRequiredItem.offsetParent || "SELECT" === formRequiredItem.tagName) && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
                }));
                return error;
            },
            validateInput(formRequiredItem) {
                let error = 0;
                if ("email" === formRequiredItem.dataset.required) {
                    formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                    if (this.emailTest(formRequiredItem)) {
                        this.addError(formRequiredItem);
                        error++;
                    } else this.removeError(formRequiredItem);
                } else if ("checkbox" === formRequiredItem.type && !formRequiredItem.checked) {
                    this.addError(formRequiredItem);
                    error++;
                } else if (!formRequiredItem.value.trim()) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
                if (0 == error) {
                    document.getElementById("btn-part-submit").disabled = false;
                    document.getElementById("btn-req-submit").disabled = false;
                } else {
                    document.getElementById("btn-part-submit").disabled = true;
                    document.getElementById("btn-req-submit").disabled = true;
                }
                return error;
            },
            addError(formRequiredItem) {
                const itemFormPhone = document.querySelectorAll(".item-form-phone");
                itemFormPhone.forEach((item => {
                    item.classList.add("_form-error");
                }));
                formRequiredItem.classList.add("_form-error");
                formRequiredItem.parentElement.classList.add("_form-error");
                let inputError = formRequiredItem.parentElement.querySelector(".form__error");
                if (inputError) formRequiredItem.parentElement.removeChild(inputError);
                if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
            },
            removeError(formRequiredItem) {
                const itemFormPhone = document.querySelectorAll(".item-form-phone");
                itemFormPhone.forEach((item => {
                    item.classList.remove("_form-error");
                }));
                formRequiredItem.classList.remove("_form-error");
                formRequiredItem.parentElement.classList.remove("_form-error");
                if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
            },
            formClean(form) {
                form.reset();
                setTimeout((() => {
                    let inputs = form.querySelectorAll("input,textarea");
                    for (let index = 0; index < inputs.length; index++) {
                        const el = inputs[index];
                        el.parentElement.classList.remove("_form-focus");
                        el.classList.remove("_form-focus");
                        formValidate.removeError(el);
                    }
                    let checkboxes = form.querySelectorAll(".checkbox__input");
                    if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                        const checkbox = checkboxes[index];
                        checkbox.checked = false;
                    }
                    if (flsModules.select) {
                        let selects = form.querySelectorAll(".select");
                        if (selects.length) for (let index = 0; index < selects.length; index++) {
                            const select = selects[index].querySelector("select");
                            flsModules.select.selectBuild(select);
                        }
                    }
                }), 0);
            },
            emailTest(formRequiredItem) {
                return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
            }
        };
        function formSubmit() {
            const forms = document.forms;
            if (forms.length) for (const form of forms) {
                form.addEventListener("submit", (function(e) {
                    const form = e.target;
                    formSubmitAction(form, e);
                }));
                form.addEventListener("reset", (function(e) {
                    const form = e.target;
                    formValidate.formClean(form);
                }));
            }
            async function formSubmitAction(form, e) {
                const error = !form.hasAttribute("data-no-validate") ? formValidate.getErrors(form) : 0;
                if (0 === error) {
                    const ajax = form.hasAttribute("data-ajax");
                    if (ajax) {
                        e.preventDefault();
                        const formAction = form.getAttribute("action") ? form.getAttribute("action").trim() : "#";
                        const formMethod = form.getAttribute("method") ? form.getAttribute("method").trim() : "GET";
                        const formData = new FormData(form);
                        form.classList.add("_sending");
                        const response = await fetch(formAction, {
                            method: formMethod,
                            body: formData
                        });
                        if (response.ok) {
                            let responseResult = await response.json();
                            form.classList.remove("_sending");
                            formSent(form, responseResult);
                        } else {
                            alert("Помилка");
                            form.classList.remove("_sending");
                        }
                    } else if (form.hasAttribute("data-dev")) {
                        e.preventDefault();
                        formSent(form);
                    }
                } else {
                    e.preventDefault();
                    if (form.querySelector("._form-error") && form.hasAttribute("data-goto-error")) {
                        const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : "._form-error";
                        gotoBlock(formGoToErrorClass, true, 1e3);
                    }
                }
            }
            function formSent(form, responseResult = ``) {
                document.dispatchEvent(new CustomEvent("formSent", {
                    detail: {
                        form
                    }
                }));
                setTimeout((() => {
                    if (flsModules.popup) {
                        const popup = form.dataset.popupMessage;
                        popup ? flsModules.popup.open(popup) : null;
                    }
                }), 0);
                formValidate.formClean(form);
            }
        }
        function getWindow(node) {
            if (null == node) return window;
            if ("[object Window]" !== node.toString()) {
                var ownerDocument = node.ownerDocument;
                return ownerDocument ? ownerDocument.defaultView || window : window;
            }
            return node;
        }
        function isElement(node) {
            var OwnElement = getWindow(node).Element;
            return node instanceof OwnElement || node instanceof Element;
        }
        function isHTMLElement(node) {
            var OwnElement = getWindow(node).HTMLElement;
            return node instanceof OwnElement || node instanceof HTMLElement;
        }
        function isShadowRoot(node) {
            if ("undefined" === typeof ShadowRoot) return false;
            var OwnElement = getWindow(node).ShadowRoot;
            return node instanceof OwnElement || node instanceof ShadowRoot;
        }
        var math_max = Math.max;
        var math_min = Math.min;
        var round = Math.round;
        function getUAString() {
            var uaData = navigator.userAgentData;
            if (null != uaData && uaData.brands) return uaData.brands.map((function(item) {
                return item.brand + "/" + item.version;
            })).join(" ");
            return navigator.userAgent;
        }
        function isLayoutViewport() {
            return !/^((?!chrome|android).)*safari/i.test(getUAString());
        }
        function getBoundingClientRect(element, includeScale, isFixedStrategy) {
            if (void 0 === includeScale) includeScale = false;
            if (void 0 === isFixedStrategy) isFixedStrategy = false;
            var clientRect = element.getBoundingClientRect();
            var scaleX = 1;
            var scaleY = 1;
            if (includeScale && isHTMLElement(element)) {
                scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
                scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
            }
            var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
            var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
            var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
            var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
            var width = clientRect.width / scaleX;
            var height = clientRect.height / scaleY;
            return {
                width,
                height,
                top: y,
                right: x + width,
                bottom: y + height,
                left: x,
                x,
                y
            };
        }
        function getWindowScroll(node) {
            var win = getWindow(node);
            var scrollLeft = win.pageXOffset;
            var scrollTop = win.pageYOffset;
            return {
                scrollLeft,
                scrollTop
            };
        }
        function getHTMLElementScroll(element) {
            return {
                scrollLeft: element.scrollLeft,
                scrollTop: element.scrollTop
            };
        }
        function getNodeScroll(node) {
            if (node === getWindow(node) || !isHTMLElement(node)) return getWindowScroll(node); else return getHTMLElementScroll(node);
        }
        function getNodeName(element) {
            return element ? (element.nodeName || "").toLowerCase() : null;
        }
        function getDocumentElement(element) {
            return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
        }
        function getWindowScrollBarX(element) {
            return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
        }
        function getComputedStyle(element) {
            return getWindow(element).getComputedStyle(element);
        }
        function isScrollParent(element) {
            var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
            return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
        }
        function isElementScaled(element) {
            var rect = element.getBoundingClientRect();
            var scaleX = round(rect.width) / element.offsetWidth || 1;
            var scaleY = round(rect.height) / element.offsetHeight || 1;
            return 1 !== scaleX || 1 !== scaleY;
        }
        function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
            if (void 0 === isFixed) isFixed = false;
            var isOffsetParentAnElement = isHTMLElement(offsetParent);
            var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
            var documentElement = getDocumentElement(offsetParent);
            var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
            var scroll = {
                scrollLeft: 0,
                scrollTop: 0
            };
            var offsets = {
                x: 0,
                y: 0
            };
            if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
                if ("body" !== getNodeName(offsetParent) || isScrollParent(documentElement)) scroll = getNodeScroll(offsetParent);
                if (isHTMLElement(offsetParent)) {
                    offsets = getBoundingClientRect(offsetParent, true);
                    offsets.x += offsetParent.clientLeft;
                    offsets.y += offsetParent.clientTop;
                } else if (documentElement) offsets.x = getWindowScrollBarX(documentElement);
            }
            return {
                x: rect.left + scroll.scrollLeft - offsets.x,
                y: rect.top + scroll.scrollTop - offsets.y,
                width: rect.width,
                height: rect.height
            };
        }
        function getLayoutRect(element) {
            var clientRect = getBoundingClientRect(element);
            var width = element.offsetWidth;
            var height = element.offsetHeight;
            if (Math.abs(clientRect.width - width) <= 1) width = clientRect.width;
            if (Math.abs(clientRect.height - height) <= 1) height = clientRect.height;
            return {
                x: element.offsetLeft,
                y: element.offsetTop,
                width,
                height
            };
        }
        function getParentNode(element) {
            if ("html" === getNodeName(element)) return element;
            return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
        }
        function getScrollParent(node) {
            if ([ "html", "body", "#document" ].indexOf(getNodeName(node)) >= 0) return node.ownerDocument.body;
            if (isHTMLElement(node) && isScrollParent(node)) return node;
            return getScrollParent(getParentNode(node));
        }
        function listScrollParents(element, list) {
            var _element$ownerDocumen;
            if (void 0 === list) list = [];
            var scrollParent = getScrollParent(element);
            var isBody = scrollParent === (null == (_element$ownerDocumen = element.ownerDocument) ? void 0 : _element$ownerDocumen.body);
            var win = getWindow(scrollParent);
            var target = isBody ? [ win ].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
            var updatedList = list.concat(target);
            return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
        }
        function isTableElement(element) {
            return [ "table", "td", "th" ].indexOf(getNodeName(element)) >= 0;
        }
        function getTrueOffsetParent(element) {
            if (!isHTMLElement(element) || "fixed" === getComputedStyle(element).position) return null;
            return element.offsetParent;
        }
        function getContainingBlock(element) {
            var isFirefox = /firefox/i.test(getUAString());
            var isIE = /Trident/i.test(getUAString());
            if (isIE && isHTMLElement(element)) {
                var elementCss = getComputedStyle(element);
                if ("fixed" === elementCss.position) return null;
            }
            var currentNode = getParentNode(element);
            if (isShadowRoot(currentNode)) currentNode = currentNode.host;
            while (isHTMLElement(currentNode) && [ "html", "body" ].indexOf(getNodeName(currentNode)) < 0) {
                var css = getComputedStyle(currentNode);
                if ("none" !== css.transform || "none" !== css.perspective || "paint" === css.contain || -1 !== [ "transform", "perspective" ].indexOf(css.willChange) || isFirefox && "filter" === css.willChange || isFirefox && css.filter && "none" !== css.filter) return currentNode; else currentNode = currentNode.parentNode;
            }
            return null;
        }
        function getOffsetParent(element) {
            var window = getWindow(element);
            var offsetParent = getTrueOffsetParent(element);
            while (offsetParent && isTableElement(offsetParent) && "static" === getComputedStyle(offsetParent).position) offsetParent = getTrueOffsetParent(offsetParent);
            if (offsetParent && ("html" === getNodeName(offsetParent) || "body" === getNodeName(offsetParent) && "static" === getComputedStyle(offsetParent).position)) return window;
            return offsetParent || getContainingBlock(element) || window;
        }
        var enums_top = "top";
        var bottom = "bottom";
        var right = "right";
        var left = "left";
        var auto = "auto";
        var basePlacements = [ enums_top, bottom, right, left ];
        var start = "start";
        var end = "end";
        var clippingParents = "clippingParents";
        var viewport = "viewport";
        var popper = "popper";
        var reference = "reference";
        var variationPlacements = basePlacements.reduce((function(acc, placement) {
            return acc.concat([ placement + "-" + start, placement + "-" + end ]);
        }), []);
        var enums_placements = [].concat(basePlacements, [ auto ]).reduce((function(acc, placement) {
            return acc.concat([ placement, placement + "-" + start, placement + "-" + end ]);
        }), []);
        var beforeRead = "beforeRead";
        var read = "read";
        var afterRead = "afterRead";
        var beforeMain = "beforeMain";
        var main = "main";
        var afterMain = "afterMain";
        var beforeWrite = "beforeWrite";
        var write = "write";
        var afterWrite = "afterWrite";
        var modifierPhases = [ beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite ];
        function order(modifiers) {
            var map = new Map;
            var visited = new Set;
            var result = [];
            modifiers.forEach((function(modifier) {
                map.set(modifier.name, modifier);
            }));
            function sort(modifier) {
                visited.add(modifier.name);
                var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
                requires.forEach((function(dep) {
                    if (!visited.has(dep)) {
                        var depModifier = map.get(dep);
                        if (depModifier) sort(depModifier);
                    }
                }));
                result.push(modifier);
            }
            modifiers.forEach((function(modifier) {
                if (!visited.has(modifier.name)) sort(modifier);
            }));
            return result;
        }
        function orderModifiers(modifiers) {
            var orderedModifiers = order(modifiers);
            return modifierPhases.reduce((function(acc, phase) {
                return acc.concat(orderedModifiers.filter((function(modifier) {
                    return modifier.phase === phase;
                })));
            }), []);
        }
        function debounce(fn) {
            var pending;
            return function() {
                if (!pending) pending = new Promise((function(resolve) {
                    Promise.resolve().then((function() {
                        pending = void 0;
                        resolve(fn());
                    }));
                }));
                return pending;
            };
        }
        function mergeByName(modifiers) {
            var merged = modifiers.reduce((function(merged, current) {
                var existing = merged[current.name];
                merged[current.name] = existing ? Object.assign({}, existing, current, {
                    options: Object.assign({}, existing.options, current.options),
                    data: Object.assign({}, existing.data, current.data)
                }) : current;
                return merged;
            }), {});
            return Object.keys(merged).map((function(key) {
                return merged[key];
            }));
        }
        var DEFAULT_OPTIONS = {
            placement: "bottom",
            modifiers: [],
            strategy: "absolute"
        };
        function areValidElements() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            return !args.some((function(element) {
                return !(element && "function" === typeof element.getBoundingClientRect);
            }));
        }
        function popperGenerator(generatorOptions) {
            if (void 0 === generatorOptions) generatorOptions = {};
            var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers = void 0 === _generatorOptions$def ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = void 0 === _generatorOptions$def2 ? DEFAULT_OPTIONS : _generatorOptions$def2;
            return function createPopper(reference, popper, options) {
                if (void 0 === options) options = defaultOptions;
                var state = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
                    modifiersData: {},
                    elements: {
                        reference,
                        popper
                    },
                    attributes: {},
                    styles: {}
                };
                var effectCleanupFns = [];
                var isDestroyed = false;
                var instance = {
                    state,
                    setOptions: function setOptions(setOptionsAction) {
                        var options = "function" === typeof setOptionsAction ? setOptionsAction(state.options) : setOptionsAction;
                        cleanupModifierEffects();
                        state.options = Object.assign({}, defaultOptions, state.options, options);
                        state.scrollParents = {
                            reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
                            popper: listScrollParents(popper)
                        };
                        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers)));
                        state.orderedModifiers = orderedModifiers.filter((function(m) {
                            return m.enabled;
                        }));
                        if (false) ;
                        runModifierEffects();
                        return instance.update();
                    },
                    forceUpdate: function forceUpdate() {
                        if (isDestroyed) return;
                        var _state$elements = state.elements, reference = _state$elements.reference, popper = _state$elements.popper;
                        if (!areValidElements(reference, popper)) {
                            if (false) ;
                            return;
                        }
                        state.rects = {
                            reference: getCompositeRect(reference, getOffsetParent(popper), "fixed" === state.options.strategy),
                            popper: getLayoutRect(popper)
                        };
                        state.reset = false;
                        state.placement = state.options.placement;
                        state.orderedModifiers.forEach((function(modifier) {
                            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
                        }));
                        for (var index = 0; index < state.orderedModifiers.length; index++) {
                            if (false) ;
                            if (true === state.reset) {
                                state.reset = false;
                                index = -1;
                                continue;
                            }
                            var _state$orderedModifie = state.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = void 0 === _state$orderedModifie2 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
                            if ("function" === typeof fn) state = fn({
                                state,
                                options: _options,
                                name,
                                instance
                            }) || state;
                        }
                    },
                    update: debounce((function() {
                        return new Promise((function(resolve) {
                            instance.forceUpdate();
                            resolve(state);
                        }));
                    })),
                    destroy: function destroy() {
                        cleanupModifierEffects();
                        isDestroyed = true;
                    }
                };
                if (!areValidElements(reference, popper)) {
                    if (false) ;
                    return instance;
                }
                instance.setOptions(options).then((function(state) {
                    if (!isDestroyed && options.onFirstUpdate) options.onFirstUpdate(state);
                }));
                function runModifierEffects() {
                    state.orderedModifiers.forEach((function(_ref3) {
                        var name = _ref3.name, _ref3$options = _ref3.options, options = void 0 === _ref3$options ? {} : _ref3$options, effect = _ref3.effect;
                        if ("function" === typeof effect) {
                            var cleanupFn = effect({
                                state,
                                name,
                                instance,
                                options
                            });
                            var noopFn = function noopFn() {};
                            effectCleanupFns.push(cleanupFn || noopFn);
                        }
                    }));
                }
                function cleanupModifierEffects() {
                    effectCleanupFns.forEach((function(fn) {
                        return fn();
                    }));
                    effectCleanupFns = [];
                }
                return instance;
            };
        }
        null && popperGenerator();
        var passive = {
            passive: true
        };
        function effect(_ref) {
            var state = _ref.state, instance = _ref.instance, options = _ref.options;
            var _options$scroll = options.scroll, scroll = void 0 === _options$scroll ? true : _options$scroll, _options$resize = options.resize, resize = void 0 === _options$resize ? true : _options$resize;
            var window = getWindow(state.elements.popper);
            var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
            if (scroll) scrollParents.forEach((function(scrollParent) {
                scrollParent.addEventListener("scroll", instance.update, passive);
            }));
            if (resize) window.addEventListener("resize", instance.update, passive);
            return function() {
                if (scroll) scrollParents.forEach((function(scrollParent) {
                    scrollParent.removeEventListener("scroll", instance.update, passive);
                }));
                if (resize) window.removeEventListener("resize", instance.update, passive);
            };
        }
        const eventListeners = {
            name: "eventListeners",
            enabled: true,
            phase: "write",
            fn: function fn() {},
            effect,
            data: {}
        };
        function getBasePlacement(placement) {
            return placement.split("-")[0];
        }
        function getVariation(placement) {
            return placement.split("-")[1];
        }
        function getMainAxisFromPlacement(placement) {
            return [ "top", "bottom" ].indexOf(placement) >= 0 ? "x" : "y";
        }
        function computeOffsets(_ref) {
            var reference = _ref.reference, element = _ref.element, placement = _ref.placement;
            var basePlacement = placement ? getBasePlacement(placement) : null;
            var variation = placement ? getVariation(placement) : null;
            var commonX = reference.x + reference.width / 2 - element.width / 2;
            var commonY = reference.y + reference.height / 2 - element.height / 2;
            var offsets;
            switch (basePlacement) {
              case enums_top:
                offsets = {
                    x: commonX,
                    y: reference.y - element.height
                };
                break;

              case bottom:
                offsets = {
                    x: commonX,
                    y: reference.y + reference.height
                };
                break;

              case right:
                offsets = {
                    x: reference.x + reference.width,
                    y: commonY
                };
                break;

              case left:
                offsets = {
                    x: reference.x - element.width,
                    y: commonY
                };
                break;

              default:
                offsets = {
                    x: reference.x,
                    y: reference.y
                };
            }
            var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
            if (null != mainAxis) {
                var len = "y" === mainAxis ? "height" : "width";
                switch (variation) {
                  case start:
                    offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
                    break;

                  case end:
                    offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
                    break;

                  default:
                }
            }
            return offsets;
        }
        function popperOffsets(_ref) {
            var state = _ref.state, name = _ref.name;
            state.modifiersData[name] = computeOffsets({
                reference: state.rects.reference,
                element: state.rects.popper,
                strategy: "absolute",
                placement: state.placement
            });
        }
        const modifiers_popperOffsets = {
            name: "popperOffsets",
            enabled: true,
            phase: "read",
            fn: popperOffsets,
            data: {}
        };
        var unsetSides = {
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto"
        };
        function roundOffsetsByDPR(_ref) {
            var x = _ref.x, y = _ref.y;
            var win = window;
            var dpr = win.devicePixelRatio || 1;
            return {
                x: round(x * dpr) / dpr || 0,
                y: round(y * dpr) / dpr || 0
            };
        }
        function mapToStyles(_ref2) {
            var _Object$assign2;
            var popper = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
            var _offsets$x = offsets.x, x = void 0 === _offsets$x ? 0 : _offsets$x, _offsets$y = offsets.y, y = void 0 === _offsets$y ? 0 : _offsets$y;
            var _ref3 = "function" === typeof roundOffsets ? roundOffsets({
                x,
                y
            }) : {
                x,
                y
            };
            x = _ref3.x;
            y = _ref3.y;
            var hasX = offsets.hasOwnProperty("x");
            var hasY = offsets.hasOwnProperty("y");
            var sideX = left;
            var sideY = enums_top;
            var win = window;
            if (adaptive) {
                var offsetParent = getOffsetParent(popper);
                var heightProp = "clientHeight";
                var widthProp = "clientWidth";
                if (offsetParent === getWindow(popper)) {
                    offsetParent = getDocumentElement(popper);
                    if ("static" !== getComputedStyle(offsetParent).position && "absolute" === position) {
                        heightProp = "scrollHeight";
                        widthProp = "scrollWidth";
                    }
                }
                offsetParent;
                if (placement === enums_top || (placement === left || placement === right) && variation === end) {
                    sideY = bottom;
                    var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
                    y -= offsetY - popperRect.height;
                    y *= gpuAcceleration ? 1 : -1;
                }
                if (placement === left || (placement === enums_top || placement === bottom) && variation === end) {
                    sideX = right;
                    var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
                    x -= offsetX - popperRect.width;
                    x *= gpuAcceleration ? 1 : -1;
                }
            }
            var commonStyles = Object.assign({
                position
            }, adaptive && unsetSides);
            var _ref4 = true === roundOffsets ? roundOffsetsByDPR({
                x,
                y
            }) : {
                x,
                y
            };
            x = _ref4.x;
            y = _ref4.y;
            if (gpuAcceleration) {
                var _Object$assign;
                return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", 
                _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", 
                _Object$assign));
            }
            return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", 
            _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
        }
        function computeStyles(_ref5) {
            var state = _ref5.state, options = _ref5.options;
            var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = void 0 === _options$gpuAccelerat ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = void 0 === _options$adaptive ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = void 0 === _options$roundOffsets ? true : _options$roundOffsets;
            if (false) ;
            var commonStyles = {
                placement: getBasePlacement(state.placement),
                variation: getVariation(state.placement),
                popper: state.elements.popper,
                popperRect: state.rects.popper,
                gpuAcceleration,
                isFixed: "fixed" === state.options.strategy
            };
            if (null != state.modifiersData.popperOffsets) state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
                offsets: state.modifiersData.popperOffsets,
                position: state.options.strategy,
                adaptive,
                roundOffsets
            })));
            if (null != state.modifiersData.arrow) state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
                offsets: state.modifiersData.arrow,
                position: "absolute",
                adaptive: false,
                roundOffsets
            })));
            state.attributes.popper = Object.assign({}, state.attributes.popper, {
                "data-popper-placement": state.placement
            });
        }
        const modifiers_computeStyles = {
            name: "computeStyles",
            enabled: true,
            phase: "beforeWrite",
            fn: computeStyles,
            data: {}
        };
        function applyStyles(_ref) {
            var state = _ref.state;
            Object.keys(state.elements).forEach((function(name) {
                var style = state.styles[name] || {};
                var attributes = state.attributes[name] || {};
                var element = state.elements[name];
                if (!isHTMLElement(element) || !getNodeName(element)) return;
                Object.assign(element.style, style);
                Object.keys(attributes).forEach((function(name) {
                    var value = attributes[name];
                    if (false === value) element.removeAttribute(name); else element.setAttribute(name, true === value ? "" : value);
                }));
            }));
        }
        function applyStyles_effect(_ref2) {
            var state = _ref2.state;
            var initialStyles = {
                popper: {
                    position: state.options.strategy,
                    left: "0",
                    top: "0",
                    margin: "0"
                },
                arrow: {
                    position: "absolute"
                },
                reference: {}
            };
            Object.assign(state.elements.popper.style, initialStyles.popper);
            state.styles = initialStyles;
            if (state.elements.arrow) Object.assign(state.elements.arrow.style, initialStyles.arrow);
            return function() {
                Object.keys(state.elements).forEach((function(name) {
                    var element = state.elements[name];
                    var attributes = state.attributes[name] || {};
                    var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
                    var style = styleProperties.reduce((function(style, property) {
                        style[property] = "";
                        return style;
                    }), {});
                    if (!isHTMLElement(element) || !getNodeName(element)) return;
                    Object.assign(element.style, style);
                    Object.keys(attributes).forEach((function(attribute) {
                        element.removeAttribute(attribute);
                    }));
                }));
            };
        }
        const modifiers_applyStyles = {
            name: "applyStyles",
            enabled: true,
            phase: "write",
            fn: applyStyles,
            effect: applyStyles_effect,
            requires: [ "computeStyles" ]
        };
        function distanceAndSkiddingToXY(placement, rects, offset) {
            var basePlacement = getBasePlacement(placement);
            var invertDistance = [ left, enums_top ].indexOf(basePlacement) >= 0 ? -1 : 1;
            var _ref = "function" === typeof offset ? offset(Object.assign({}, rects, {
                placement
            })) : offset, skidding = _ref[0], distance = _ref[1];
            skidding = skidding || 0;
            distance = (distance || 0) * invertDistance;
            return [ left, right ].indexOf(basePlacement) >= 0 ? {
                x: distance,
                y: skidding
            } : {
                x: skidding,
                y: distance
            };
        }
        function offset(_ref2) {
            var state = _ref2.state, options = _ref2.options, name = _ref2.name;
            var _options$offset = options.offset, offset = void 0 === _options$offset ? [ 0, 0 ] : _options$offset;
            var data = enums_placements.reduce((function(acc, placement) {
                acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
                return acc;
            }), {});
            var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
            if (null != state.modifiersData.popperOffsets) {
                state.modifiersData.popperOffsets.x += x;
                state.modifiersData.popperOffsets.y += y;
            }
            state.modifiersData[name] = data;
        }
        const modifiers_offset = {
            name: "offset",
            enabled: true,
            phase: "main",
            requires: [ "popperOffsets" ],
            fn: offset
        };
        var hash = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        function getOppositePlacement(placement) {
            return placement.replace(/left|right|bottom|top/g, (function(matched) {
                return hash[matched];
            }));
        }
        var getOppositeVariationPlacement_hash = {
            start: "end",
            end: "start"
        };
        function getOppositeVariationPlacement(placement) {
            return placement.replace(/start|end/g, (function(matched) {
                return getOppositeVariationPlacement_hash[matched];
            }));
        }
        function getViewportRect(element, strategy) {
            var win = getWindow(element);
            var html = getDocumentElement(element);
            var visualViewport = win.visualViewport;
            var width = html.clientWidth;
            var height = html.clientHeight;
            var x = 0;
            var y = 0;
            if (visualViewport) {
                width = visualViewport.width;
                height = visualViewport.height;
                var layoutViewport = isLayoutViewport();
                if (layoutViewport || !layoutViewport && "fixed" === strategy) {
                    x = visualViewport.offsetLeft;
                    y = visualViewport.offsetTop;
                }
            }
            return {
                width,
                height,
                x: x + getWindowScrollBarX(element),
                y
            };
        }
        function getDocumentRect(element) {
            var _element$ownerDocumen;
            var html = getDocumentElement(element);
            var winScroll = getWindowScroll(element);
            var body = null == (_element$ownerDocumen = element.ownerDocument) ? void 0 : _element$ownerDocumen.body;
            var width = math_max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
            var height = math_max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
            var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
            var y = -winScroll.scrollTop;
            if ("rtl" === getComputedStyle(body || html).direction) x += math_max(html.clientWidth, body ? body.clientWidth : 0) - width;
            return {
                width,
                height,
                x,
                y
            };
        }
        function contains(parent, child) {
            var rootNode = child.getRootNode && child.getRootNode();
            if (parent.contains(child)) return true; else if (rootNode && isShadowRoot(rootNode)) {
                var next = child;
                do {
                    if (next && parent.isSameNode(next)) return true;
                    next = next.parentNode || next.host;
                } while (next);
            }
            return false;
        }
        function rectToClientRect(rect) {
            return Object.assign({}, rect, {
                left: rect.x,
                top: rect.y,
                right: rect.x + rect.width,
                bottom: rect.y + rect.height
            });
        }
        function getInnerBoundingClientRect(element, strategy) {
            var rect = getBoundingClientRect(element, false, "fixed" === strategy);
            rect.top = rect.top + element.clientTop;
            rect.left = rect.left + element.clientLeft;
            rect.bottom = rect.top + element.clientHeight;
            rect.right = rect.left + element.clientWidth;
            rect.width = element.clientWidth;
            rect.height = element.clientHeight;
            rect.x = rect.left;
            rect.y = rect.top;
            return rect;
        }
        function getClientRectFromMixedType(element, clippingParent, strategy) {
            return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
        }
        function getClippingParents(element) {
            var clippingParents = listScrollParents(getParentNode(element));
            var canEscapeClipping = [ "absolute", "fixed" ].indexOf(getComputedStyle(element).position) >= 0;
            var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
            if (!isElement(clipperElement)) return [];
            return clippingParents.filter((function(clippingParent) {
                return isElement(clippingParent) && contains(clippingParent, clipperElement) && "body" !== getNodeName(clippingParent);
            }));
        }
        function getClippingRect(element, boundary, rootBoundary, strategy) {
            var mainClippingParents = "clippingParents" === boundary ? getClippingParents(element) : [].concat(boundary);
            var clippingParents = [].concat(mainClippingParents, [ rootBoundary ]);
            var firstClippingParent = clippingParents[0];
            var clippingRect = clippingParents.reduce((function(accRect, clippingParent) {
                var rect = getClientRectFromMixedType(element, clippingParent, strategy);
                accRect.top = math_max(rect.top, accRect.top);
                accRect.right = math_min(rect.right, accRect.right);
                accRect.bottom = math_min(rect.bottom, accRect.bottom);
                accRect.left = math_max(rect.left, accRect.left);
                return accRect;
            }), getClientRectFromMixedType(element, firstClippingParent, strategy));
            clippingRect.width = clippingRect.right - clippingRect.left;
            clippingRect.height = clippingRect.bottom - clippingRect.top;
            clippingRect.x = clippingRect.left;
            clippingRect.y = clippingRect.top;
            return clippingRect;
        }
        function getFreshSideObject() {
            return {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            };
        }
        function mergePaddingObject(paddingObject) {
            return Object.assign({}, getFreshSideObject(), paddingObject);
        }
        function expandToHashMap(value, keys) {
            return keys.reduce((function(hashMap, key) {
                hashMap[key] = value;
                return hashMap;
            }), {});
        }
        function detectOverflow(state, options) {
            if (void 0 === options) options = {};
            var _options = options, _options$placement = _options.placement, placement = void 0 === _options$placement ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = void 0 === _options$strategy ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = void 0 === _options$boundary ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = void 0 === _options$rootBoundary ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = void 0 === _options$elementConte ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = void 0 === _options$altBoundary ? false : _options$altBoundary, _options$padding = _options.padding, padding = void 0 === _options$padding ? 0 : _options$padding;
            var paddingObject = mergePaddingObject("number" !== typeof padding ? padding : expandToHashMap(padding, basePlacements));
            var altContext = elementContext === popper ? reference : popper;
            var popperRect = state.rects.popper;
            var element = state.elements[altBoundary ? altContext : elementContext];
            var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
            var referenceClientRect = getBoundingClientRect(state.elements.reference);
            var popperOffsets = computeOffsets({
                reference: referenceClientRect,
                element: popperRect,
                strategy: "absolute",
                placement
            });
            var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
            var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
            var overflowOffsets = {
                top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
                bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
                left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
                right: elementClientRect.right - clippingClientRect.right + paddingObject.right
            };
            var offsetData = state.modifiersData.offset;
            if (elementContext === popper && offsetData) {
                var offset = offsetData[placement];
                Object.keys(overflowOffsets).forEach((function(key) {
                    var multiply = [ right, bottom ].indexOf(key) >= 0 ? 1 : -1;
                    var axis = [ enums_top, bottom ].indexOf(key) >= 0 ? "y" : "x";
                    overflowOffsets[key] += offset[axis] * multiply;
                }));
            }
            return overflowOffsets;
        }
        function computeAutoPlacement(state, options) {
            if (void 0 === options) options = {};
            var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = void 0 === _options$allowedAutoP ? enums_placements : _options$allowedAutoP;
            var variation = getVariation(placement);
            var placements = variation ? flipVariations ? variationPlacements : variationPlacements.filter((function(placement) {
                return getVariation(placement) === variation;
            })) : basePlacements;
            var allowedPlacements = placements.filter((function(placement) {
                return allowedAutoPlacements.indexOf(placement) >= 0;
            }));
            if (0 === allowedPlacements.length) {
                allowedPlacements = placements;
                if (false) ;
            }
            var overflows = allowedPlacements.reduce((function(acc, placement) {
                acc[placement] = detectOverflow(state, {
                    placement,
                    boundary,
                    rootBoundary,
                    padding
                })[getBasePlacement(placement)];
                return acc;
            }), {});
            return Object.keys(overflows).sort((function(a, b) {
                return overflows[a] - overflows[b];
            }));
        }
        function getExpandedFallbackPlacements(placement) {
            if (getBasePlacement(placement) === auto) return [];
            var oppositePlacement = getOppositePlacement(placement);
            return [ getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement) ];
        }
        function flip(_ref) {
            var state = _ref.state, options = _ref.options, name = _ref.name;
            if (state.modifiersData[name]._skip) return;
            var _options$mainAxis = options.mainAxis, checkMainAxis = void 0 === _options$mainAxis ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = void 0 === _options$altAxis ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = void 0 === _options$flipVariatio ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
            var preferredPlacement = state.options.placement;
            var basePlacement = getBasePlacement(preferredPlacement);
            var isBasePlacement = basePlacement === preferredPlacement;
            var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [ getOppositePlacement(preferredPlacement) ] : getExpandedFallbackPlacements(preferredPlacement));
            var placements = [ preferredPlacement ].concat(fallbackPlacements).reduce((function(acc, placement) {
                return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
                    placement,
                    boundary,
                    rootBoundary,
                    padding,
                    flipVariations,
                    allowedAutoPlacements
                }) : placement);
            }), []);
            var referenceRect = state.rects.reference;
            var popperRect = state.rects.popper;
            var checksMap = new Map;
            var makeFallbackChecks = true;
            var firstFittingPlacement = placements[0];
            for (var i = 0; i < placements.length; i++) {
                var placement = placements[i];
                var _basePlacement = getBasePlacement(placement);
                var isStartVariation = getVariation(placement) === start;
                var isVertical = [ enums_top, bottom ].indexOf(_basePlacement) >= 0;
                var len = isVertical ? "width" : "height";
                var overflow = detectOverflow(state, {
                    placement,
                    boundary,
                    rootBoundary,
                    altBoundary,
                    padding
                });
                var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : enums_top;
                if (referenceRect[len] > popperRect[len]) mainVariationSide = getOppositePlacement(mainVariationSide);
                var altVariationSide = getOppositePlacement(mainVariationSide);
                var checks = [];
                if (checkMainAxis) checks.push(overflow[_basePlacement] <= 0);
                if (checkAltAxis) checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
                if (checks.every((function(check) {
                    return check;
                }))) {
                    firstFittingPlacement = placement;
                    makeFallbackChecks = false;
                    break;
                }
                checksMap.set(placement, checks);
            }
            if (makeFallbackChecks) {
                var numberOfChecks = flipVariations ? 3 : 1;
                var _loop = function _loop(_i) {
                    var fittingPlacement = placements.find((function(placement) {
                        var checks = checksMap.get(placement);
                        if (checks) return checks.slice(0, _i).every((function(check) {
                            return check;
                        }));
                    }));
                    if (fittingPlacement) {
                        firstFittingPlacement = fittingPlacement;
                        return "break";
                    }
                };
                for (var _i = numberOfChecks; _i > 0; _i--) {
                    var _ret = _loop(_i);
                    if ("break" === _ret) break;
                }
            }
            if (state.placement !== firstFittingPlacement) {
                state.modifiersData[name]._skip = true;
                state.placement = firstFittingPlacement;
                state.reset = true;
            }
        }
        const modifiers_flip = {
            name: "flip",
            enabled: true,
            phase: "main",
            fn: flip,
            requiresIfExists: [ "offset" ],
            data: {
                _skip: false
            }
        };
        function getAltAxis(axis) {
            return "x" === axis ? "y" : "x";
        }
        function within(min, value, max) {
            return math_max(min, math_min(value, max));
        }
        function withinMaxClamp(min, value, max) {
            var v = within(min, value, max);
            return v > max ? max : v;
        }
        function preventOverflow(_ref) {
            var state = _ref.state, options = _ref.options, name = _ref.name;
            var _options$mainAxis = options.mainAxis, checkMainAxis = void 0 === _options$mainAxis ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = void 0 === _options$altAxis ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = void 0 === _options$tether ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = void 0 === _options$tetherOffset ? 0 : _options$tetherOffset;
            var overflow = detectOverflow(state, {
                boundary,
                rootBoundary,
                padding,
                altBoundary
            });
            var basePlacement = getBasePlacement(state.placement);
            var variation = getVariation(state.placement);
            var isBasePlacement = !variation;
            var mainAxis = getMainAxisFromPlacement(basePlacement);
            var altAxis = getAltAxis(mainAxis);
            var popperOffsets = state.modifiersData.popperOffsets;
            var referenceRect = state.rects.reference;
            var popperRect = state.rects.popper;
            var tetherOffsetValue = "function" === typeof tetherOffset ? tetherOffset(Object.assign({}, state.rects, {
                placement: state.placement
            })) : tetherOffset;
            var normalizedTetherOffsetValue = "number" === typeof tetherOffsetValue ? {
                mainAxis: tetherOffsetValue,
                altAxis: tetherOffsetValue
            } : Object.assign({
                mainAxis: 0,
                altAxis: 0
            }, tetherOffsetValue);
            var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
            var data = {
                x: 0,
                y: 0
            };
            if (!popperOffsets) return;
            if (checkMainAxis) {
                var _offsetModifierState$;
                var mainSide = "y" === mainAxis ? enums_top : left;
                var altSide = "y" === mainAxis ? bottom : right;
                var len = "y" === mainAxis ? "height" : "width";
                var offset = popperOffsets[mainAxis];
                var min = offset + overflow[mainSide];
                var max = offset - overflow[altSide];
                var additive = tether ? -popperRect[len] / 2 : 0;
                var minLen = variation === start ? referenceRect[len] : popperRect[len];
                var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
                var arrowElement = state.elements.arrow;
                var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
                    width: 0,
                    height: 0
                };
                var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
                var arrowPaddingMin = arrowPaddingObject[mainSide];
                var arrowPaddingMax = arrowPaddingObject[altSide];
                var arrowLen = within(0, referenceRect[len], arrowRect[len]);
                var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
                var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
                var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
                var clientOffset = arrowOffsetParent ? "y" === mainAxis ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
                var offsetModifierValue = null != (_offsetModifierState$ = null == offsetModifierState ? void 0 : offsetModifierState[mainAxis]) ? _offsetModifierState$ : 0;
                var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
                var tetherMax = offset + maxOffset - offsetModifierValue;
                var preventedOffset = within(tether ? math_min(min, tetherMin) : min, offset, tether ? math_max(max, tetherMax) : max);
                popperOffsets[mainAxis] = preventedOffset;
                data[mainAxis] = preventedOffset - offset;
            }
            if (checkAltAxis) {
                var _offsetModifierState$2;
                var _mainSide = "x" === mainAxis ? enums_top : left;
                var _altSide = "x" === mainAxis ? bottom : right;
                var _offset = popperOffsets[altAxis];
                var _len = "y" === altAxis ? "height" : "width";
                var _min = _offset + overflow[_mainSide];
                var _max = _offset - overflow[_altSide];
                var isOriginSide = -1 !== [ enums_top, left ].indexOf(basePlacement);
                var _offsetModifierValue = null != (_offsetModifierState$2 = null == offsetModifierState ? void 0 : offsetModifierState[altAxis]) ? _offsetModifierState$2 : 0;
                var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
                var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
                var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
                popperOffsets[altAxis] = _preventedOffset;
                data[altAxis] = _preventedOffset - _offset;
            }
            state.modifiersData[name] = data;
        }
        const modifiers_preventOverflow = {
            name: "preventOverflow",
            enabled: true,
            phase: "main",
            fn: preventOverflow,
            requiresIfExists: [ "offset" ]
        };
        var toPaddingObject = function toPaddingObject(padding, state) {
            padding = "function" === typeof padding ? padding(Object.assign({}, state.rects, {
                placement: state.placement
            })) : padding;
            return mergePaddingObject("number" !== typeof padding ? padding : expandToHashMap(padding, basePlacements));
        };
        function arrow(_ref) {
            var _state$modifiersData$;
            var state = _ref.state, name = _ref.name, options = _ref.options;
            var arrowElement = state.elements.arrow;
            var popperOffsets = state.modifiersData.popperOffsets;
            var basePlacement = getBasePlacement(state.placement);
            var axis = getMainAxisFromPlacement(basePlacement);
            var isVertical = [ left, right ].indexOf(basePlacement) >= 0;
            var len = isVertical ? "height" : "width";
            if (!arrowElement || !popperOffsets) return;
            var paddingObject = toPaddingObject(options.padding, state);
            var arrowRect = getLayoutRect(arrowElement);
            var minProp = "y" === axis ? enums_top : left;
            var maxProp = "y" === axis ? bottom : right;
            var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
            var startDiff = popperOffsets[axis] - state.rects.reference[axis];
            var arrowOffsetParent = getOffsetParent(arrowElement);
            var clientSize = arrowOffsetParent ? "y" === axis ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
            var centerToReference = endDiff / 2 - startDiff / 2;
            var min = paddingObject[minProp];
            var max = clientSize - arrowRect[len] - paddingObject[maxProp];
            var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
            var offset = within(min, center, max);
            var axisProp = axis;
            state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, 
            _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
        }
        function arrow_effect(_ref2) {
            var state = _ref2.state, options = _ref2.options;
            var _options$element = options.element, arrowElement = void 0 === _options$element ? "[data-popper-arrow]" : _options$element;
            if (null == arrowElement) return;
            if ("string" === typeof arrowElement) {
                arrowElement = state.elements.popper.querySelector(arrowElement);
                if (!arrowElement) return;
            }
            if (false) ;
            if (!contains(state.elements.popper, arrowElement)) {
                if (false) ;
                return;
            }
            state.elements.arrow = arrowElement;
        }
        const modifiers_arrow = {
            name: "arrow",
            enabled: true,
            phase: "main",
            fn: arrow,
            effect: arrow_effect,
            requires: [ "popperOffsets" ],
            requiresIfExists: [ "preventOverflow" ]
        };
        function getSideOffsets(overflow, rect, preventedOffsets) {
            if (void 0 === preventedOffsets) preventedOffsets = {
                x: 0,
                y: 0
            };
            return {
                top: overflow.top - rect.height - preventedOffsets.y,
                right: overflow.right - rect.width + preventedOffsets.x,
                bottom: overflow.bottom - rect.height + preventedOffsets.y,
                left: overflow.left - rect.width - preventedOffsets.x
            };
        }
        function isAnySideFullyClipped(overflow) {
            return [ enums_top, right, bottom, left ].some((function(side) {
                return overflow[side] >= 0;
            }));
        }
        function hide(_ref) {
            var state = _ref.state, name = _ref.name;
            var referenceRect = state.rects.reference;
            var popperRect = state.rects.popper;
            var preventedOffsets = state.modifiersData.preventOverflow;
            var referenceOverflow = detectOverflow(state, {
                elementContext: "reference"
            });
            var popperAltOverflow = detectOverflow(state, {
                altBoundary: true
            });
            var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
            var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
            var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
            var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
            state.modifiersData[name] = {
                referenceClippingOffsets,
                popperEscapeOffsets,
                isReferenceHidden,
                hasPopperEscaped
            };
            state.attributes.popper = Object.assign({}, state.attributes.popper, {
                "data-popper-reference-hidden": isReferenceHidden,
                "data-popper-escaped": hasPopperEscaped
            });
        }
        const modifiers_hide = {
            name: "hide",
            enabled: true,
            phase: "main",
            requiresIfExists: [ "preventOverflow" ],
            fn: hide
        };
        var defaultModifiers = [ eventListeners, modifiers_popperOffsets, modifiers_computeStyles, modifiers_applyStyles, modifiers_offset, modifiers_flip, modifiers_preventOverflow, modifiers_arrow, modifiers_hide ];
        var popper_createPopper = popperGenerator({
            defaultModifiers
        });
        var BOX_CLASS = "tippy-box";
        var CONTENT_CLASS = "tippy-content";
        var BACKDROP_CLASS = "tippy-backdrop";
        var ARROW_CLASS = "tippy-arrow";
        var SVG_ARROW_CLASS = "tippy-svg-arrow";
        var TOUCH_OPTIONS = {
            passive: true,
            capture: true
        };
        var TIPPY_DEFAULT_APPEND_TO = function TIPPY_DEFAULT_APPEND_TO() {
            return document.body;
        };
        function getValueAtIndexOrReturn(value, index, defaultValue) {
            if (Array.isArray(value)) {
                var v = value[index];
                return null == v ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
            }
            return value;
        }
        function isType(value, type) {
            var str = {}.toString.call(value);
            return 0 === str.indexOf("[object") && str.indexOf(type + "]") > -1;
        }
        function invokeWithArgsOrReturn(value, args) {
            return "function" === typeof value ? value.apply(void 0, args) : value;
        }
        function tippy_esm_debounce(fn, ms) {
            if (0 === ms) return fn;
            var timeout;
            return function(arg) {
                clearTimeout(timeout);
                timeout = setTimeout((function() {
                    fn(arg);
                }), ms);
            };
        }
        function splitBySpaces(value) {
            return value.split(/\s+/).filter(Boolean);
        }
        function normalizeToArray(value) {
            return [].concat(value);
        }
        function pushIfUnique(arr, value) {
            if (-1 === arr.indexOf(value)) arr.push(value);
        }
        function unique(arr) {
            return arr.filter((function(item, index) {
                return arr.indexOf(item) === index;
            }));
        }
        function tippy_esm_getBasePlacement(placement) {
            return placement.split("-")[0];
        }
        function arrayFrom(value) {
            return [].slice.call(value);
        }
        function removeUndefinedProps(obj) {
            return Object.keys(obj).reduce((function(acc, key) {
                if (void 0 !== obj[key]) acc[key] = obj[key];
                return acc;
            }), {});
        }
        function div() {
            return document.createElement("div");
        }
        function tippy_esm_isElement(value) {
            return [ "Element", "Fragment" ].some((function(type) {
                return isType(value, type);
            }));
        }
        function isNodeList(value) {
            return isType(value, "NodeList");
        }
        function isMouseEvent(value) {
            return isType(value, "MouseEvent");
        }
        function isReferenceElement(value) {
            return !!(value && value._tippy && value._tippy.reference === value);
        }
        function getArrayOfElements(value) {
            if (tippy_esm_isElement(value)) return [ value ];
            if (isNodeList(value)) return arrayFrom(value);
            if (Array.isArray(value)) return value;
            return arrayFrom(document.querySelectorAll(value));
        }
        function setTransitionDuration(els, value) {
            els.forEach((function(el) {
                if (el) el.style.transitionDuration = value + "ms";
            }));
        }
        function setVisibilityState(els, state) {
            els.forEach((function(el) {
                if (el) el.setAttribute("data-state", state);
            }));
        }
        function getOwnerDocument(elementOrElements) {
            var _element$ownerDocumen;
            var _normalizeToArray = normalizeToArray(elementOrElements), element = _normalizeToArray[0];
            return null != element && null != (_element$ownerDocumen = element.ownerDocument) && _element$ownerDocumen.body ? element.ownerDocument : document;
        }
        function isCursorOutsideInteractiveBorder(popperTreeData, event) {
            var clientX = event.clientX, clientY = event.clientY;
            return popperTreeData.every((function(_ref) {
                var popperRect = _ref.popperRect, popperState = _ref.popperState, props = _ref.props;
                var interactiveBorder = props.interactiveBorder;
                var basePlacement = tippy_esm_getBasePlacement(popperState.placement);
                var offsetData = popperState.modifiersData.offset;
                if (!offsetData) return true;
                var topDistance = "bottom" === basePlacement ? offsetData.top.y : 0;
                var bottomDistance = "top" === basePlacement ? offsetData.bottom.y : 0;
                var leftDistance = "right" === basePlacement ? offsetData.left.x : 0;
                var rightDistance = "left" === basePlacement ? offsetData.right.x : 0;
                var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
                var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
                var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
                var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
                return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
            }));
        }
        function updateTransitionEndListener(box, action, listener) {
            var method = action + "EventListener";
            [ "transitionend", "webkitTransitionEnd" ].forEach((function(event) {
                box[method](event, listener);
            }));
        }
        function actualContains(parent, child) {
            var target = child;
            while (target) {
                var _target$getRootNode;
                if (parent.contains(target)) return true;
                target = null == target.getRootNode ? void 0 : null == (_target$getRootNode = target.getRootNode()) ? void 0 : _target$getRootNode.host;
            }
            return false;
        }
        var currentInput = {
            isTouch: false
        };
        var lastMouseMoveTime = 0;
        function onDocumentTouchStart() {
            if (currentInput.isTouch) return;
            currentInput.isTouch = true;
            if (window.performance) document.addEventListener("mousemove", onDocumentMouseMove);
        }
        function onDocumentMouseMove() {
            var now = performance.now();
            if (now - lastMouseMoveTime < 20) {
                currentInput.isTouch = false;
                document.removeEventListener("mousemove", onDocumentMouseMove);
            }
            lastMouseMoveTime = now;
        }
        function onWindowBlur() {
            var activeElement = document.activeElement;
            if (isReferenceElement(activeElement)) {
                var instance = activeElement._tippy;
                if (activeElement.blur && !instance.state.isVisible) activeElement.blur();
            }
        }
        function bindGlobalEventListeners() {
            document.addEventListener("touchstart", onDocumentTouchStart, TOUCH_OPTIONS);
            window.addEventListener("blur", onWindowBlur);
        }
        var isBrowser = "undefined" !== typeof window && "undefined" !== typeof document;
        var isIE11 = isBrowser ? !!window.msCrypto : false;
        if (false) ;
        var pluginProps = {
            animateFill: false,
            followCursor: false,
            inlinePositioning: false,
            sticky: false
        };
        var renderProps = {
            allowHTML: false,
            animation: "fade",
            arrow: true,
            content: "",
            inertia: false,
            maxWidth: 350,
            role: "tooltip",
            theme: "",
            zIndex: 9999
        };
        var defaultProps = Object.assign({
            appendTo: TIPPY_DEFAULT_APPEND_TO,
            aria: {
                content: "auto",
                expanded: "auto"
            },
            delay: 0,
            duration: [ 300, 250 ],
            getReferenceClientRect: null,
            hideOnClick: true,
            ignoreAttributes: false,
            interactive: false,
            interactiveBorder: 2,
            interactiveDebounce: 0,
            moveTransition: "",
            offset: [ 0, 10 ],
            onAfterUpdate: function onAfterUpdate() {},
            onBeforeUpdate: function onBeforeUpdate() {},
            onCreate: function onCreate() {},
            onDestroy: function onDestroy() {},
            onHidden: function onHidden() {},
            onHide: function onHide() {},
            onMount: function onMount() {},
            onShow: function onShow() {},
            onShown: function onShown() {},
            onTrigger: function onTrigger() {},
            onUntrigger: function onUntrigger() {},
            onClickOutside: function onClickOutside() {},
            placement: "top",
            plugins: [],
            popperOptions: {},
            render: null,
            showOnCreate: false,
            touch: true,
            trigger: "mouseenter focus",
            triggerTarget: null
        }, pluginProps, renderProps);
        var defaultKeys = Object.keys(defaultProps);
        var setDefaultProps = function setDefaultProps(partialProps) {
            if (false) ;
            var keys = Object.keys(partialProps);
            keys.forEach((function(key) {
                defaultProps[key] = partialProps[key];
            }));
        };
        function getExtendedPassedProps(passedProps) {
            var plugins = passedProps.plugins || [];
            var pluginProps = plugins.reduce((function(acc, plugin) {
                var name = plugin.name, defaultValue = plugin.defaultValue;
                if (name) {
                    var _name;
                    acc[name] = void 0 !== passedProps[name] ? passedProps[name] : null != (_name = defaultProps[name]) ? _name : defaultValue;
                }
                return acc;
            }), {});
            return Object.assign({}, passedProps, pluginProps);
        }
        function getDataAttributeProps(reference, plugins) {
            var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
                plugins
            }))) : defaultKeys;
            var props = propKeys.reduce((function(acc, key) {
                var valueAsString = (reference.getAttribute("data-tippy-" + key) || "").trim();
                if (!valueAsString) return acc;
                if ("content" === key) acc[key] = valueAsString; else try {
                    acc[key] = JSON.parse(valueAsString);
                } catch (e) {
                    acc[key] = valueAsString;
                }
                return acc;
            }), {});
            return props;
        }
        function evaluateProps(reference, props) {
            var out = Object.assign({}, props, {
                content: invokeWithArgsOrReturn(props.content, [ reference ])
            }, props.ignoreAttributes ? {} : getDataAttributeProps(reference, props.plugins));
            out.aria = Object.assign({}, defaultProps.aria, out.aria);
            out.aria = {
                expanded: "auto" === out.aria.expanded ? props.interactive : out.aria.expanded,
                content: "auto" === out.aria.content ? props.interactive ? null : "describedby" : out.aria.content
            };
            return out;
        }
        var innerHTML = function innerHTML() {
            return "innerHTML";
        };
        function dangerouslySetInnerHTML(element, html) {
            element[innerHTML()] = html;
        }
        function createArrowElement(value) {
            var arrow = div();
            if (true === value) arrow.className = ARROW_CLASS; else {
                arrow.className = SVG_ARROW_CLASS;
                if (tippy_esm_isElement(value)) arrow.appendChild(value); else dangerouslySetInnerHTML(arrow, value);
            }
            return arrow;
        }
        function setContent(content, props) {
            if (tippy_esm_isElement(props.content)) {
                dangerouslySetInnerHTML(content, "");
                content.appendChild(props.content);
            } else if ("function" !== typeof props.content) if (props.allowHTML) dangerouslySetInnerHTML(content, props.content); else content.textContent = props.content;
        }
        function getChildren(popper) {
            var box = popper.firstElementChild;
            var boxChildren = arrayFrom(box.children);
            return {
                box,
                content: boxChildren.find((function(node) {
                    return node.classList.contains(CONTENT_CLASS);
                })),
                arrow: boxChildren.find((function(node) {
                    return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
                })),
                backdrop: boxChildren.find((function(node) {
                    return node.classList.contains(BACKDROP_CLASS);
                }))
            };
        }
        function render(instance) {
            var popper = div();
            var box = div();
            box.className = BOX_CLASS;
            box.setAttribute("data-state", "hidden");
            box.setAttribute("tabindex", "-1");
            var content = div();
            content.className = CONTENT_CLASS;
            content.setAttribute("data-state", "hidden");
            setContent(content, instance.props);
            popper.appendChild(box);
            box.appendChild(content);
            onUpdate(instance.props, instance.props);
            function onUpdate(prevProps, nextProps) {
                var _getChildren = getChildren(popper), box = _getChildren.box, content = _getChildren.content, arrow = _getChildren.arrow;
                if (nextProps.theme) box.setAttribute("data-theme", nextProps.theme); else box.removeAttribute("data-theme");
                if ("string" === typeof nextProps.animation) box.setAttribute("data-animation", nextProps.animation); else box.removeAttribute("data-animation");
                if (nextProps.inertia) box.setAttribute("data-inertia", ""); else box.removeAttribute("data-inertia");
                box.style.maxWidth = "number" === typeof nextProps.maxWidth ? nextProps.maxWidth + "px" : nextProps.maxWidth;
                if (nextProps.role) box.setAttribute("role", nextProps.role); else box.removeAttribute("role");
                if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) setContent(content, instance.props);
                if (nextProps.arrow) {
                    if (!arrow) box.appendChild(createArrowElement(nextProps.arrow)); else if (prevProps.arrow !== nextProps.arrow) {
                        box.removeChild(arrow);
                        box.appendChild(createArrowElement(nextProps.arrow));
                    }
                } else if (arrow) box.removeChild(arrow);
            }
            return {
                popper,
                onUpdate
            };
        }
        render.$$tippy = true;
        var idCounter = 1;
        var mouseMoveListeners = [];
        var mountedInstances = [];
        function createTippy(reference, passedProps) {
            var props = evaluateProps(reference, Object.assign({}, defaultProps, getExtendedPassedProps(removeUndefinedProps(passedProps))));
            var showTimeout;
            var hideTimeout;
            var scheduleHideAnimationFrame;
            var isVisibleFromClick = false;
            var didHideDueToDocumentMouseDown = false;
            var didTouchMove = false;
            var ignoreOnFirstUpdate = false;
            var lastTriggerEvent;
            var currentTransitionEndListener;
            var onFirstUpdate;
            var listeners = [];
            var debouncedOnMouseMove = tippy_esm_debounce(onMouseMove, props.interactiveDebounce);
            var currentTarget;
            var id = idCounter++;
            var popperInstance = null;
            var plugins = unique(props.plugins);
            var state = {
                isEnabled: true,
                isVisible: false,
                isDestroyed: false,
                isMounted: false,
                isShown: false
            };
            var instance = {
                id,
                reference,
                popper: div(),
                popperInstance,
                props,
                state,
                plugins,
                clearDelayTimeouts,
                setProps,
                setContent,
                show,
                hide,
                hideWithInteractivity,
                enable,
                disable,
                unmount,
                destroy
            };
            if (!props.render) {
                if (false) ;
                return instance;
            }
            var _props$render = props.render(instance), popper = _props$render.popper, onUpdate = _props$render.onUpdate;
            popper.setAttribute("data-tippy-root", "");
            popper.id = "tippy-" + instance.id;
            instance.popper = popper;
            reference._tippy = instance;
            popper._tippy = instance;
            var pluginsHooks = plugins.map((function(plugin) {
                return plugin.fn(instance);
            }));
            var hasAriaExpanded = reference.hasAttribute("aria-expanded");
            addListeners();
            handleAriaExpandedAttribute();
            handleStyles();
            invokeHook("onCreate", [ instance ]);
            if (props.showOnCreate) scheduleShow();
            popper.addEventListener("mouseenter", (function() {
                if (instance.props.interactive && instance.state.isVisible) instance.clearDelayTimeouts();
            }));
            popper.addEventListener("mouseleave", (function() {
                if (instance.props.interactive && instance.props.trigger.indexOf("mouseenter") >= 0) getDocument().addEventListener("mousemove", debouncedOnMouseMove);
            }));
            return instance;
            function getNormalizedTouchSettings() {
                var touch = instance.props.touch;
                return Array.isArray(touch) ? touch : [ touch, 0 ];
            }
            function getIsCustomTouchBehavior() {
                return "hold" === getNormalizedTouchSettings()[0];
            }
            function getIsDefaultRenderFn() {
                var _instance$props$rende;
                return !!(null != (_instance$props$rende = instance.props.render) && _instance$props$rende.$$tippy);
            }
            function getCurrentTarget() {
                return currentTarget || reference;
            }
            function getDocument() {
                var parent = getCurrentTarget().parentNode;
                return parent ? getOwnerDocument(parent) : document;
            }
            function getDefaultTemplateChildren() {
                return getChildren(popper);
            }
            function getDelay(isShow) {
                if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && "focus" === lastTriggerEvent.type) return 0;
                return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
            }
            function handleStyles(fromHide) {
                if (void 0 === fromHide) fromHide = false;
                popper.style.pointerEvents = instance.props.interactive && !fromHide ? "" : "none";
                popper.style.zIndex = "" + instance.props.zIndex;
            }
            function invokeHook(hook, args, shouldInvokePropsHook) {
                if (void 0 === shouldInvokePropsHook) shouldInvokePropsHook = true;
                pluginsHooks.forEach((function(pluginHooks) {
                    if (pluginHooks[hook]) pluginHooks[hook].apply(pluginHooks, args);
                }));
                if (shouldInvokePropsHook) {
                    var _instance$props;
                    (_instance$props = instance.props)[hook].apply(_instance$props, args);
                }
            }
            function handleAriaContentAttribute() {
                var aria = instance.props.aria;
                if (!aria.content) return;
                var attr = "aria-" + aria.content;
                var id = popper.id;
                var nodes = normalizeToArray(instance.props.triggerTarget || reference);
                nodes.forEach((function(node) {
                    var currentValue = node.getAttribute(attr);
                    if (instance.state.isVisible) node.setAttribute(attr, currentValue ? currentValue + " " + id : id); else {
                        var nextValue = currentValue && currentValue.replace(id, "").trim();
                        if (nextValue) node.setAttribute(attr, nextValue); else node.removeAttribute(attr);
                    }
                }));
            }
            function handleAriaExpandedAttribute() {
                if (hasAriaExpanded || !instance.props.aria.expanded) return;
                var nodes = normalizeToArray(instance.props.triggerTarget || reference);
                nodes.forEach((function(node) {
                    if (instance.props.interactive) node.setAttribute("aria-expanded", instance.state.isVisible && node === getCurrentTarget() ? "true" : "false"); else node.removeAttribute("aria-expanded");
                }));
            }
            function cleanupInteractiveMouseListeners() {
                getDocument().removeEventListener("mousemove", debouncedOnMouseMove);
                mouseMoveListeners = mouseMoveListeners.filter((function(listener) {
                    return listener !== debouncedOnMouseMove;
                }));
            }
            function onDocumentPress(event) {
                if (currentInput.isTouch) if (didTouchMove || "mousedown" === event.type) return;
                var actualTarget = event.composedPath && event.composedPath()[0] || event.target;
                if (instance.props.interactive && actualContains(popper, actualTarget)) return;
                if (normalizeToArray(instance.props.triggerTarget || reference).some((function(el) {
                    return actualContains(el, actualTarget);
                }))) {
                    if (currentInput.isTouch) return;
                    if (instance.state.isVisible && instance.props.trigger.indexOf("click") >= 0) return;
                } else invokeHook("onClickOutside", [ instance, event ]);
                if (true === instance.props.hideOnClick) {
                    instance.clearDelayTimeouts();
                    instance.hide();
                    didHideDueToDocumentMouseDown = true;
                    setTimeout((function() {
                        didHideDueToDocumentMouseDown = false;
                    }));
                    if (!instance.state.isMounted) removeDocumentPress();
                }
            }
            function onTouchMove() {
                didTouchMove = true;
            }
            function onTouchStart() {
                didTouchMove = false;
            }
            function addDocumentPress() {
                var doc = getDocument();
                doc.addEventListener("mousedown", onDocumentPress, true);
                doc.addEventListener("touchend", onDocumentPress, TOUCH_OPTIONS);
                doc.addEventListener("touchstart", onTouchStart, TOUCH_OPTIONS);
                doc.addEventListener("touchmove", onTouchMove, TOUCH_OPTIONS);
            }
            function removeDocumentPress() {
                var doc = getDocument();
                doc.removeEventListener("mousedown", onDocumentPress, true);
                doc.removeEventListener("touchend", onDocumentPress, TOUCH_OPTIONS);
                doc.removeEventListener("touchstart", onTouchStart, TOUCH_OPTIONS);
                doc.removeEventListener("touchmove", onTouchMove, TOUCH_OPTIONS);
            }
            function onTransitionedOut(duration, callback) {
                onTransitionEnd(duration, (function() {
                    if (!instance.state.isVisible && popper.parentNode && popper.parentNode.contains(popper)) callback();
                }));
            }
            function onTransitionedIn(duration, callback) {
                onTransitionEnd(duration, callback);
            }
            function onTransitionEnd(duration, callback) {
                var box = getDefaultTemplateChildren().box;
                function listener(event) {
                    if (event.target === box) {
                        updateTransitionEndListener(box, "remove", listener);
                        callback();
                    }
                }
                if (0 === duration) return callback();
                updateTransitionEndListener(box, "remove", currentTransitionEndListener);
                updateTransitionEndListener(box, "add", listener);
                currentTransitionEndListener = listener;
            }
            function on(eventType, handler, options) {
                if (void 0 === options) options = false;
                var nodes = normalizeToArray(instance.props.triggerTarget || reference);
                nodes.forEach((function(node) {
                    node.addEventListener(eventType, handler, options);
                    listeners.push({
                        node,
                        eventType,
                        handler,
                        options
                    });
                }));
            }
            function addListeners() {
                if (getIsCustomTouchBehavior()) {
                    on("touchstart", onTrigger, {
                        passive: true
                    });
                    on("touchend", onMouseLeave, {
                        passive: true
                    });
                }
                splitBySpaces(instance.props.trigger).forEach((function(eventType) {
                    if ("manual" === eventType) return;
                    on(eventType, onTrigger);
                    switch (eventType) {
                      case "mouseenter":
                        on("mouseleave", onMouseLeave);
                        break;

                      case "focus":
                        on(isIE11 ? "focusout" : "blur", onBlurOrFocusOut);
                        break;

                      case "focusin":
                        on("focusout", onBlurOrFocusOut);
                        break;
                    }
                }));
            }
            function removeListeners() {
                listeners.forEach((function(_ref) {
                    var node = _ref.node, eventType = _ref.eventType, handler = _ref.handler, options = _ref.options;
                    node.removeEventListener(eventType, handler, options);
                }));
                listeners = [];
            }
            function onTrigger(event) {
                var _lastTriggerEvent;
                var shouldScheduleClickHide = false;
                if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) return;
                var wasFocused = "focus" === (null == (_lastTriggerEvent = lastTriggerEvent) ? void 0 : _lastTriggerEvent.type);
                lastTriggerEvent = event;
                currentTarget = event.currentTarget;
                handleAriaExpandedAttribute();
                if (!instance.state.isVisible && isMouseEvent(event)) mouseMoveListeners.forEach((function(listener) {
                    return listener(event);
                }));
                if ("click" === event.type && (instance.props.trigger.indexOf("mouseenter") < 0 || isVisibleFromClick) && false !== instance.props.hideOnClick && instance.state.isVisible) shouldScheduleClickHide = true; else scheduleShow(event);
                if ("click" === event.type) isVisibleFromClick = !shouldScheduleClickHide;
                if (shouldScheduleClickHide && !wasFocused) scheduleHide(event);
            }
            function onMouseMove(event) {
                var target = event.target;
                var isCursorOverReferenceOrPopper = getCurrentTarget().contains(target) || popper.contains(target);
                if ("mousemove" === event.type && isCursorOverReferenceOrPopper) return;
                var popperTreeData = getNestedPopperTree().concat(popper).map((function(popper) {
                    var _instance$popperInsta;
                    var instance = popper._tippy;
                    var state = null == (_instance$popperInsta = instance.popperInstance) ? void 0 : _instance$popperInsta.state;
                    if (state) return {
                        popperRect: popper.getBoundingClientRect(),
                        popperState: state,
                        props
                    };
                    return null;
                })).filter(Boolean);
                if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
                    cleanupInteractiveMouseListeners();
                    scheduleHide(event);
                }
            }
            function onMouseLeave(event) {
                var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf("click") >= 0 && isVisibleFromClick;
                if (shouldBail) return;
                if (instance.props.interactive) {
                    instance.hideWithInteractivity(event);
                    return;
                }
                scheduleHide(event);
            }
            function onBlurOrFocusOut(event) {
                if (instance.props.trigger.indexOf("focusin") < 0 && event.target !== getCurrentTarget()) return;
                if (instance.props.interactive && event.relatedTarget && popper.contains(event.relatedTarget)) return;
                scheduleHide(event);
            }
            function isEventListenerStopped(event) {
                return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf("touch") >= 0 : false;
            }
            function createPopperInstance() {
                destroyPopperInstance();
                var _instance$props2 = instance.props, popperOptions = _instance$props2.popperOptions, placement = _instance$props2.placement, offset = _instance$props2.offset, getReferenceClientRect = _instance$props2.getReferenceClientRect, moveTransition = _instance$props2.moveTransition;
                var arrow = getIsDefaultRenderFn() ? getChildren(popper).arrow : null;
                var computedReference = getReferenceClientRect ? {
                    getBoundingClientRect: getReferenceClientRect,
                    contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
                } : reference;
                var tippyModifier = {
                    name: "$$tippy",
                    enabled: true,
                    phase: "beforeWrite",
                    requires: [ "computeStyles" ],
                    fn: function fn(_ref2) {
                        var state = _ref2.state;
                        if (getIsDefaultRenderFn()) {
                            var _getDefaultTemplateCh = getDefaultTemplateChildren(), box = _getDefaultTemplateCh.box;
                            [ "placement", "reference-hidden", "escaped" ].forEach((function(attr) {
                                if ("placement" === attr) box.setAttribute("data-placement", state.placement); else if (state.attributes.popper["data-popper-" + attr]) box.setAttribute("data-" + attr, ""); else box.removeAttribute("data-" + attr);
                            }));
                            state.attributes.popper = {};
                        }
                    }
                };
                var modifiers = [ {
                    name: "offset",
                    options: {
                        offset
                    }
                }, {
                    name: "preventOverflow",
                    options: {
                        padding: {
                            top: 2,
                            bottom: 2,
                            left: 5,
                            right: 5
                        }
                    }
                }, {
                    name: "flip",
                    options: {
                        padding: 5
                    }
                }, {
                    name: "computeStyles",
                    options: {
                        adaptive: !moveTransition
                    }
                }, tippyModifier ];
                if (getIsDefaultRenderFn() && arrow) modifiers.push({
                    name: "arrow",
                    options: {
                        element: arrow,
                        padding: 3
                    }
                });
                modifiers.push.apply(modifiers, (null == popperOptions ? void 0 : popperOptions.modifiers) || []);
                instance.popperInstance = popper_createPopper(computedReference, popper, Object.assign({}, popperOptions, {
                    placement,
                    onFirstUpdate,
                    modifiers
                }));
            }
            function destroyPopperInstance() {
                if (instance.popperInstance) {
                    instance.popperInstance.destroy();
                    instance.popperInstance = null;
                }
            }
            function mount() {
                var appendTo = instance.props.appendTo;
                var parentNode;
                var node = getCurrentTarget();
                if (instance.props.interactive && appendTo === TIPPY_DEFAULT_APPEND_TO || "parent" === appendTo) parentNode = node.parentNode; else parentNode = invokeWithArgsOrReturn(appendTo, [ node ]);
                if (!parentNode.contains(popper)) parentNode.appendChild(popper);
                instance.state.isMounted = true;
                createPopperInstance();
                if (false) ;
            }
            function getNestedPopperTree() {
                return arrayFrom(popper.querySelectorAll("[data-tippy-root]"));
            }
            function scheduleShow(event) {
                instance.clearDelayTimeouts();
                if (event) invokeHook("onTrigger", [ instance, event ]);
                addDocumentPress();
                var delay = getDelay(true);
                var _getNormalizedTouchSe = getNormalizedTouchSettings(), touchValue = _getNormalizedTouchSe[0], touchDelay = _getNormalizedTouchSe[1];
                if (currentInput.isTouch && "hold" === touchValue && touchDelay) delay = touchDelay;
                if (delay) showTimeout = setTimeout((function() {
                    instance.show();
                }), delay); else instance.show();
            }
            function scheduleHide(event) {
                instance.clearDelayTimeouts();
                invokeHook("onUntrigger", [ instance, event ]);
                if (!instance.state.isVisible) {
                    removeDocumentPress();
                    return;
                }
                if (instance.props.trigger.indexOf("mouseenter") >= 0 && instance.props.trigger.indexOf("click") >= 0 && [ "mouseleave", "mousemove" ].indexOf(event.type) >= 0 && isVisibleFromClick) return;
                var delay = getDelay(false);
                if (delay) hideTimeout = setTimeout((function() {
                    if (instance.state.isVisible) instance.hide();
                }), delay); else scheduleHideAnimationFrame = requestAnimationFrame((function() {
                    instance.hide();
                }));
            }
            function enable() {
                instance.state.isEnabled = true;
            }
            function disable() {
                instance.hide();
                instance.state.isEnabled = false;
            }
            function clearDelayTimeouts() {
                clearTimeout(showTimeout);
                clearTimeout(hideTimeout);
                cancelAnimationFrame(scheduleHideAnimationFrame);
            }
            function setProps(partialProps) {
                if (false) ;
                if (instance.state.isDestroyed) return;
                invokeHook("onBeforeUpdate", [ instance, partialProps ]);
                removeListeners();
                var prevProps = instance.props;
                var nextProps = evaluateProps(reference, Object.assign({}, prevProps, removeUndefinedProps(partialProps), {
                    ignoreAttributes: true
                }));
                instance.props = nextProps;
                addListeners();
                if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
                    cleanupInteractiveMouseListeners();
                    debouncedOnMouseMove = tippy_esm_debounce(onMouseMove, nextProps.interactiveDebounce);
                }
                if (prevProps.triggerTarget && !nextProps.triggerTarget) normalizeToArray(prevProps.triggerTarget).forEach((function(node) {
                    node.removeAttribute("aria-expanded");
                })); else if (nextProps.triggerTarget) reference.removeAttribute("aria-expanded");
                handleAriaExpandedAttribute();
                handleStyles();
                if (onUpdate) onUpdate(prevProps, nextProps);
                if (instance.popperInstance) {
                    createPopperInstance();
                    getNestedPopperTree().forEach((function(nestedPopper) {
                        requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
                    }));
                }
                invokeHook("onAfterUpdate", [ instance, partialProps ]);
            }
            function setContent(content) {
                instance.setProps({
                    content
                });
            }
            function show() {
                if (false) ;
                var isAlreadyVisible = instance.state.isVisible;
                var isDestroyed = instance.state.isDestroyed;
                var isDisabled = !instance.state.isEnabled;
                var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
                var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);
                if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) return;
                if (getCurrentTarget().hasAttribute("disabled")) return;
                invokeHook("onShow", [ instance ], false);
                if (false === instance.props.onShow(instance)) return;
                instance.state.isVisible = true;
                if (getIsDefaultRenderFn()) popper.style.visibility = "visible";
                handleStyles();
                addDocumentPress();
                if (!instance.state.isMounted) popper.style.transition = "none";
                if (getIsDefaultRenderFn()) {
                    var _getDefaultTemplateCh2 = getDefaultTemplateChildren(), box = _getDefaultTemplateCh2.box, content = _getDefaultTemplateCh2.content;
                    setTransitionDuration([ box, content ], 0);
                }
                onFirstUpdate = function onFirstUpdate() {
                    var _instance$popperInsta2;
                    if (!instance.state.isVisible || ignoreOnFirstUpdate) return;
                    ignoreOnFirstUpdate = true;
                    void popper.offsetHeight;
                    popper.style.transition = instance.props.moveTransition;
                    if (getIsDefaultRenderFn() && instance.props.animation) {
                        var _getDefaultTemplateCh3 = getDefaultTemplateChildren(), _box = _getDefaultTemplateCh3.box, _content = _getDefaultTemplateCh3.content;
                        setTransitionDuration([ _box, _content ], duration);
                        setVisibilityState([ _box, _content ], "visible");
                    }
                    handleAriaContentAttribute();
                    handleAriaExpandedAttribute();
                    pushIfUnique(mountedInstances, instance);
                    null == (_instance$popperInsta2 = instance.popperInstance) ? void 0 : _instance$popperInsta2.forceUpdate();
                    invokeHook("onMount", [ instance ]);
                    if (instance.props.animation && getIsDefaultRenderFn()) onTransitionedIn(duration, (function() {
                        instance.state.isShown = true;
                        invokeHook("onShown", [ instance ]);
                    }));
                };
                mount();
            }
            function hide() {
                if (false) ;
                var isAlreadyHidden = !instance.state.isVisible;
                var isDestroyed = instance.state.isDestroyed;
                var isDisabled = !instance.state.isEnabled;
                var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);
                if (isAlreadyHidden || isDestroyed || isDisabled) return;
                invokeHook("onHide", [ instance ], false);
                if (false === instance.props.onHide(instance)) return;
                instance.state.isVisible = false;
                instance.state.isShown = false;
                ignoreOnFirstUpdate = false;
                isVisibleFromClick = false;
                if (getIsDefaultRenderFn()) popper.style.visibility = "hidden";
                cleanupInteractiveMouseListeners();
                removeDocumentPress();
                handleStyles(true);
                if (getIsDefaultRenderFn()) {
                    var _getDefaultTemplateCh4 = getDefaultTemplateChildren(), box = _getDefaultTemplateCh4.box, content = _getDefaultTemplateCh4.content;
                    if (instance.props.animation) {
                        setTransitionDuration([ box, content ], duration);
                        setVisibilityState([ box, content ], "hidden");
                    }
                }
                handleAriaContentAttribute();
                handleAriaExpandedAttribute();
                if (instance.props.animation) {
                    if (getIsDefaultRenderFn()) onTransitionedOut(duration, instance.unmount);
                } else instance.unmount();
            }
            function hideWithInteractivity(event) {
                if (false) ;
                getDocument().addEventListener("mousemove", debouncedOnMouseMove);
                pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
                debouncedOnMouseMove(event);
            }
            function unmount() {
                if (false) ;
                if (instance.state.isVisible) instance.hide();
                if (!instance.state.isMounted) return;
                destroyPopperInstance();
                getNestedPopperTree().forEach((function(nestedPopper) {
                    nestedPopper._tippy.unmount();
                }));
                if (popper.parentNode) popper.parentNode.removeChild(popper);
                mountedInstances = mountedInstances.filter((function(i) {
                    return i !== instance;
                }));
                instance.state.isMounted = false;
                invokeHook("onHidden", [ instance ]);
            }
            function destroy() {
                if (false) ;
                if (instance.state.isDestroyed) return;
                instance.clearDelayTimeouts();
                instance.unmount();
                removeListeners();
                delete reference._tippy;
                instance.state.isDestroyed = true;
                invokeHook("onDestroy", [ instance ]);
            }
        }
        function tippy(targets, optionalProps) {
            if (void 0 === optionalProps) optionalProps = {};
            var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);
            if (false) ;
            bindGlobalEventListeners();
            var passedProps = Object.assign({}, optionalProps, {
                plugins
            });
            var elements = getArrayOfElements(targets);
            if (false) ;
            var instances = elements.reduce((function(acc, reference) {
                var instance = reference && createTippy(reference, passedProps);
                if (instance) acc.push(instance);
                return acc;
            }), []);
            return tippy_esm_isElement(targets) ? instances[0] : instances;
        }
        tippy.defaultProps = defaultProps;
        tippy.setDefaultProps = setDefaultProps;
        tippy.currentInput = currentInput;
        Object.assign({}, modifiers_applyStyles, {
            effect: function effect(_ref) {
                var state = _ref.state;
                var initialStyles = {
                    popper: {
                        position: state.options.strategy,
                        left: "0",
                        top: "0",
                        margin: "0"
                    },
                    arrow: {
                        position: "absolute"
                    },
                    reference: {}
                };
                Object.assign(state.elements.popper.style, initialStyles.popper);
                state.styles = initialStyles;
                if (state.elements.arrow) Object.assign(state.elements.arrow.style, initialStyles.arrow);
            }
        });
        tippy.setDefaultProps({
            render
        });
        const tippy_esm = tippy;
        flsModules.tippy = tippy_esm("[data-tippy-content]", {
            arrow: true,
            placement: "left"
        });
        class ScrollWatcher {
            constructor(props) {
                let defaultConfig = {
                    logging: true
                };
                this.config = Object.assign(defaultConfig, props);
                this.observer;
                !document.documentElement.classList.contains("watcher") ? this.scrollWatcherRun() : null;
            }
            scrollWatcherUpdate() {
                this.scrollWatcherRun();
            }
            scrollWatcherRun() {
                document.documentElement.classList.add("watcher");
                this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"));
            }
            scrollWatcherConstructor(items) {
                if (items.length) {
                    let uniqParams = uniqArray(Array.from(items).map((function(item) {
                        return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : "0px"}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
                    })));
                    uniqParams.forEach((uniqParam => {
                        let uniqParamArray = uniqParam.split("|");
                        let paramsWatch = {
                            root: uniqParamArray[0],
                            margin: uniqParamArray[1],
                            threshold: uniqParamArray[2]
                        };
                        let groupItems = Array.from(items).filter((function(item) {
                            let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
                            let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : "0px";
                            let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
                            if (String(watchRoot) === paramsWatch.root && String(watchMargin) === paramsWatch.margin && String(watchThreshold) === paramsWatch.threshold) return item;
                        }));
                        let configWatcher = this.getScrollWatcherConfig(paramsWatch);
                        this.scrollWatcherInit(groupItems, configWatcher);
                    }));
                }
            }
            getScrollWatcherConfig(paramsWatch) {
                let configWatcher = {};
                if (document.querySelector(paramsWatch.root)) configWatcher.root = document.querySelector(paramsWatch.root);
                configWatcher.rootMargin = paramsWatch.margin;
                if (paramsWatch.margin.indexOf("px") < 0 && paramsWatch.margin.indexOf("%") < 0) return;
                if ("prx" === paramsWatch.threshold) {
                    paramsWatch.threshold = [];
                    for (let i = 0; i <= 1; i += .005) paramsWatch.threshold.push(i);
                } else paramsWatch.threshold = paramsWatch.threshold.split(",");
                configWatcher.threshold = paramsWatch.threshold;
                return configWatcher;
            }
            scrollWatcherCreate(configWatcher) {
                this.observer = new IntersectionObserver(((entries, observer) => {
                    entries.forEach((entry => {
                        this.scrollWatcherCallback(entry, observer);
                    }));
                }), configWatcher);
            }
            scrollWatcherInit(items, configWatcher) {
                this.scrollWatcherCreate(configWatcher);
                items.forEach((item => this.observer.observe(item)));
            }
            scrollWatcherIntersecting(entry, targetElement) {
                if (entry.isIntersecting) {
                    !targetElement.classList.contains("_watcher-view") ? targetElement.classList.add("_watcher-view") : null;
                    if (targetElement.classList.contains("request__wrapper")) {
                        const headerItem = document.querySelector(".header");
                        headerItem.classList.add("hide-header");
                    }
                    if (targetElement.classList.contains("footer")) {
                        const headerItem = document.querySelector(".header");
                        headerItem.classList.add("hide-header");
                    }
                } else {
                    targetElement.classList.contains("_watcher-view") ? targetElement.classList.remove("_watcher-view") : null;
                    if (targetElement.classList.contains("request__wrapper")) {
                        const headerItem = document.querySelector(".header");
                        headerItem.classList.remove("hide-header");
                    }
                    if (targetElement.classList.contains("footer")) {
                        const headerItem = document.querySelector(".header");
                        headerItem.classList.remove("hide-header");
                    }
                }
            }
            scrollWatcherOff(targetElement, observer) {
                observer.unobserve(targetElement);
                this.scrollWatcherLogging(`Я перестав стежити за ${targetElement.classList}`);
            }
            scrollWatcherLogging(message) {
                this.config.logging ? FLS(`[Спостерігач]: ${message}`) : null;
            }
            scrollWatcherCallback(entry, observer) {
                const targetElement = entry.target;
                this.scrollWatcherIntersecting(entry, targetElement);
                targetElement.hasAttribute("data-watch-once") && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
                document.dispatchEvent(new CustomEvent("watcherCallback", {
                    detail: {
                        entry
                    }
                }));
            }
        }
        flsModules.watcher = new ScrollWatcher({});
        var lib_typed = __webpack_require__(614);
        const animationHoldOn = bodymovin.loadAnimation({
            container: document.querySelector(".lottie__hold-on"),
            renderer: "svg",
            loop: false,
            autoplay: false,
            path: "files/hold_on.json"
        });
        const animationManageAmount = bodymovin.loadAnimation({
            container: document.querySelector(".lottie__manage-amount"),
            renderer: "svg",
            loop: true,
            autoplay: false,
            path: "files/ManagePayments_AmountFlow.json"
        });
        const animationManageGraphic = bodymovin.loadAnimation({
            container: document.querySelector(".lottie__manage-graphic"),
            renderer: "svg",
            loop: true,
            autoplay: false,
            path: "files/ManagePayments_GraphicCurrency.json"
        });
        const animationManageTransct = bodymovin.loadAnimation({
            container: document.querySelector(".lottie__manage-transactions"),
            renderer: "svg",
            loop: true,
            autoplay: false,
            path: "files/ManagePayments_TransactionFlow.json"
        });
        function ToogleHeader(e) {
            const el = e.target;
            const header = document.querySelector(".header");
            if (el.scrollTop >= 70) {
                header.classList.add("head-hidden");
                console.log("header добавил hidden: " + el.classList);
            } else {
                header.classList.remove("head-hidden");
                console.log("header удалил hidden: " + el.classList);
            }
        }
        document.querySelector(".manage");
        document.querySelector(".options");
        document.querySelector(".custom-first");
        document.querySelector(".custom-second");
        var $is_typed_call = false;
        class FullPage {
            constructor(element, options) {
                let config = {
                    noEventSelector: "[data-no-event]",
                    classInit: "fp-init",
                    wrapperAnimatedClass: "fp-switching",
                    selectorSection: "[data-fp-section]",
                    activeClass: "active-section",
                    previousClass: "previous-section",
                    nextClass: "next-section",
                    idActiveSection: 0,
                    mode: element.dataset.fpEffect ? element.dataset.fpEffect : "slider",
                    bullets: element.hasAttribute("data-fp-bullets") ? true : false,
                    bulletsClass: "fp-bullets",
                    bulletClass: "fp-bullet",
                    bulletActiveClass: "fp-bullet-active",
                    onInit: function() {},
                    onSwitching: function() {},
                    onDestroy: function() {}
                };
                this.options = Object.assign(config, options);
                this.wrapper = element;
                this.sections = this.wrapper.querySelectorAll(this.options.selectorSection);
                this.activeSection = false;
                this.activeSectionId = false;
                this.previousSection = false;
                this.previousSectionId = false;
                this.nextSection = false;
                this.nextSectionId = false;
                this.bulletsWrapper = false;
                this.stopEvent = false;
                if (this.sections.length) this.init();
            }
            init() {
                if (this.options.idActiveSection > this.sections.length - 1) return;
                this.setId();
                this.activeSectionId = this.options.idActiveSection;
                this.setEffectsClasses();
                this.setClasses();
                this.setStyle();
                if (this.options.bullets) {
                    this.setBullets();
                    this.setActiveBullet(this.activeSectionId);
                }
                this.events();
                setTimeout((() => {
                    document.documentElement.classList.add(this.options.classInit);
                    this.options.onInit(this);
                    document.dispatchEvent(new CustomEvent("fpinit", {
                        detail: {
                            fp: this
                        }
                    }));
                }), 0);
            }
            destroy() {
                this.removeEvents();
                this.removeClasses();
                document.documentElement.classList.remove(this.options.classInit);
                this.wrapper.classList.remove(this.options.wrapperAnimatedClass);
                this.removeEffectsClasses();
                this.removeZIndex();
                this.removeStyle();
                this.removeId();
                this.options.onDestroy(this);
                document.dispatchEvent(new CustomEvent("fpdestroy", {
                    detail: {
                        fp: this
                    }
                }));
            }
            setId() {
                for (let index = 0; index < this.sections.length; index++) {
                    const section = this.sections[index];
                    section.setAttribute("data-fp-id", index);
                }
            }
            removeId() {
                for (let index = 0; index < this.sections.length; index++) {
                    const section = this.sections[index];
                    section.removeAttribute("data-fp-id");
                }
            }
            setClasses() {
                this.previousSectionId = this.activeSectionId - 1 >= 0 ? this.activeSectionId - 1 : false;
                this.nextSectionId = this.activeSectionId + 1 < this.sections.length ? this.activeSectionId + 1 : false;
                this.activeSection = this.sections[this.activeSectionId];
                this.activeSection.classList.add(this.options.activeClass);
                for (let index = 0; index < this.sections.length; index++) document.documentElement.classList.remove(`fp-section-${index}`);
                document.documentElement.classList.add(`fp-section-${this.activeSectionId}`);
                if (false !== this.previousSectionId) {
                    this.previousSection = this.sections[this.previousSectionId];
                    this.previousSection.classList.add(this.options.previousClass);
                } else this.previousSection = false;
                if (false !== this.nextSectionId) {
                    this.nextSection = this.sections[this.nextSectionId];
                    this.nextSection.classList.add(this.options.nextClass);
                } else this.nextSection = false;
            }
            removeEffectsClasses() {
                switch (this.options.mode) {
                  case "fade":
                    this.wrapper.classList.remove("fade-mode");
                    this.setZIndex();
                    break;

                  default:
                    break;
                }
            }
            setEffectsClasses() {
                switch (this.options.mode) {
                  case "fade":
                    this.wrapper.classList.add("fade-mode");
                    this.setZIndex();
                    break;

                  default:
                    break;
                }
            }
            setStyle() {
                switch (this.options.mode) {
                  case "fade":
                    this.styleFade();
                    break;

                  default:
                    break;
                }
            }
            styleFade() {
                for (let index = 0; index < this.sections.length; index++) {
                    const section = this.sections[index];
                    const header = document.querySelector(".header");
                    const imageAnim = document.querySelector(".image-anim");
                    const requestSection = document.querySelector(".request");
                    const apiTyping = document.querySelector(".api__typing");
                    if (index === this.activeSectionId) {
                        section.style.opacity = "1";
                        section.style.pointerEvents = "all";
                        if (section.classList.contains("_header-hidden") && section.classList.contains("active-section")) header.classList.add("header-hidden");
                        if (!section.classList.contains("_header-hidden") && section.classList.contains("active-section")) header.classList.remove("header-hidden");
                        if (section.classList.contains("_header-black") && section.classList.contains("active-section")) document.documentElement.classList.add("header-black");
                        if (!section.classList.contains("_header-black") && section.classList.contains("active-section")) document.documentElement.classList.remove("header-black");
                        if (section.classList.contains("bg-black") && section.classList.contains("active-section")) document.documentElement.classList.add("bg-black");
                        if (!section.classList.contains("bg-black") && section.classList.contains("active-section")) document.documentElement.classList.remove("bg-black");
                        if (section.classList.contains("bg-blue") && section.classList.contains("active-section")) document.documentElement.classList.add("bg-blue");
                        if (!section.classList.contains("bg-blue") && section.classList.contains("active-section")) document.documentElement.classList.remove("bg-blue");
                        if (section.classList.contains("bg-gray") && section.classList.contains("active-section")) document.documentElement.classList.add("bg-gray");
                        if (!section.classList.contains("bg-gray") && section.classList.contains("active-section")) document.documentElement.classList.remove("bg-gray");
                        if (section.classList.contains("main") && section.classList.contains("active-section")) imageAnim.classList.add("_anim-main");
                        if (!section.classList.contains("main") && section.classList.contains("active-section")) imageAnim.classList.remove("_anim-main");
                        if (section.classList.contains("focus") && section.classList.contains("active-section")) imageAnim.classList.add("_anim-focus");
                        if (!section.classList.contains("focus") && section.classList.contains("active-section")) imageAnim.classList.remove("_anim-focus");
                        if (section.classList.contains("integrations") && section.classList.contains("active-section")) imageAnim.classList.add("_anim-integrations");
                        if (!section.classList.contains("integrations") && section.classList.contains("active-section")) imageAnim.classList.remove("_anim-integrations");
                        if (section.classList.contains("awesome") && section.classList.contains("active-section")) ;
                        if (!section.classList.contains("awesome") && section.classList.contains("active-section")) ;
                        if (section.classList.contains("hold") && section.classList.contains("active-section")) setTimeout((() => {
                            animationHoldOn.play();
                        }), 300);
                        if (!section.classList.contains("hold") && section.classList.contains("active-section")) animationHoldOn.stop();
                        if (section.classList.contains("choose") && section.classList.contains("active-section")) ;
                        if (section.classList.contains("manage") && section.classList.contains("active-section")) {
                            animationManageAmount.play();
                            animationManageGraphic.play();
                            animationManageTransct.play();
                            var list = document.getElementsByTagName("video");
                            for (let item of list) item.play();
                        }
                        if (section.classList.contains("options") && section.classList.contains("active-section")) ;
                        if (section.classList.contains("custom-first") && section.classList.contains("active-section")) ;
                        if (section.classList.contains("custom-second") && section.classList.contains("active-section")) ;
                        if (!section.classList.contains("manage") && section.classList.contains("active-section")) {
                            animationManageAmount.stop();
                            animationManageGraphic.stop();
                            animationManageTransct.stop();
                        }
                        if (section.classList.contains("api") && section.classList.contains("active-section")) {
                            header.classList.remove("head-hidden");
                            apiTyping.style.visibility = "hidden";
                            setTimeout((() => {
                                apiTyping.style.visibility = "visible";
                            }), 700);
                            if (!$is_typed_call) {
                                setTimeout((function() {
                                    new lib_typed("#typed", {
                                        stringsElement: "#typed-strings",
                                        typeSpeed: 0,
                                        loop: false,
                                        loopCount: 1 / 0,
                                        showCursor: false
                                    });
                                }), 700);
                                $is_typed_call = true;
                            }
                        }
                        function addAnim() {
                            if (section.classList.contains("request") && section.classList.contains("active-section")) {
                                requestSection.classList.add("_anim-start");
                                setTimeout(addAnim, 13100);
                            }
                        }
                        function removeAnim() {
                            if (section.classList.contains("request") && section.classList.contains("active-section")) {
                                requestSection.classList.remove("_anim-start");
                                setTimeout(removeAnim, 13e3);
                            }
                        }
                        setTimeout(addAnim, 13100);
                        setTimeout(removeAnim, 13e3);
                        if (section.classList.contains("request") && section.classList.contains("active-section")) requestSection.classList.add("_anim-start");
                        if (!section.classList.contains("request") && section.classList.contains("active-section")) requestSection.classList.remove("_anim-start");
                    } else {
                        section.style.opacity = "0";
                        section.style.pointerEvents = "none";
                    }
                }
            }
            removeStyle() {
                for (let index = 0; index < this.sections.length; index++) {
                    const section = this.sections[index];
                    section.style.opacity = "";
                    section.style.visibility = "";
                    section.style.transform = "";
                }
            }
            checkScroll(yCoord, element) {
                this.goScroll = false;
                if (!this.stopEvent && element) {
                    this.goScroll = true;
                    if (this.haveScroll(element)) {
                        this.goScroll = false;
                        const position = Math.round(element.scrollHeight - element.scrollTop);
                        if (Math.abs(position - element.scrollHeight) < 2 && yCoord <= 0 || Math.abs(position - element.clientHeight) < 2 && yCoord >= 0) this.goScroll = true;
                    }
                }
            }
            haveScroll(element) {
                return element.scrollHeight !== window.innerHeight;
            }
            removeClasses() {
                for (let index = 0; index < this.sections.length; index++) {
                    const section = this.sections[index];
                    section.classList.remove(this.options.activeClass);
                    section.classList.remove(this.options.previousClass);
                    section.classList.remove(this.options.nextClass);
                }
            }
            events() {
                this.events = {
                    wheel: this.wheel.bind(this),
                    touchdown: this.touchDown.bind(this),
                    touchup: this.touchUp.bind(this),
                    touchmove: this.touchMove.bind(this),
                    touchcancel: this.touchUp.bind(this),
                    transitionEnd: this.transitionend.bind(this),
                    clickblock: this.clickBlock.bind(this)
                };
                if (isMobile.iOS()) document.addEventListener("touchmove", (e => {
                    e.preventDefault();
                }));
                const chooseBlocks = document.querySelectorAll(".choose__block");
                for (let index = 0; index < chooseBlocks.length; index++) chooseBlocks[index].addEventListener("click", this.events.clickblock);
                this.setEvents();
            }
            clickBlock(e) {
                this.switchingSection(6);
            }
            setEvents() {
                this.wrapper.addEventListener("wheel", this.events.wheel);
                this.wrapper.addEventListener("touchstart", this.events.touchdown);
                if (this.options.bullets && this.bulletsWrapper) this.bulletsWrapper.addEventListener("click", this.events.click);
            }
            removeEvents() {
                this.wrapper.removeEventListener("wheel", this.events.wheel);
                this.wrapper.removeEventListener("touchdown", this.events.touchdown);
                this.wrapper.removeEventListener("touchup", this.events.touchup);
                this.wrapper.removeEventListener("touchcancel", this.events.touchup);
                this.wrapper.removeEventListener("touchmove", this.events.touchmove);
                if (this.bulletsWrapper) this.bulletsWrapper.removeEventListener("click", this.events.click);
            }
            touchDown(e) {
                this._yP = e.changedTouches[0].pageY;
                this._eventElement = e.target.closest(`.${this.options.activeClass}`);
                if (this._eventElement) {
                    this._eventElement.addEventListener("touchend", this.events.touchup);
                    this._eventElement.addEventListener("touchcancel", this.events.touchup);
                    this._eventElement.addEventListener("touchmove", this.events.touchmove);
                    this.clickOrTouch = true;
                    if (isMobile.iOS()) {
                        if (this._eventElement.scrollHeight !== this._eventElement.clientHeight) {
                            if (0 === this._eventElement.scrollTop) this._eventElement.scrollTop = 1;
                            if (this._eventElement.scrollTop === this._eventElement.scrollHeight - this._eventElement.clientHeight) this._eventElement.scrollTop = this._eventElement.scrollHeight - this._eventElement.clientHeight - 1;
                        }
                        this.allowUp = this._eventElement.scrollTop > 0;
                        this.allowDown = this._eventElement.scrollTop < this._eventElement.scrollHeight - this._eventElement.clientHeight;
                        this.lastY = e.changedTouches[0].pageY;
                    }
                }
            }
            touchMove(e) {
                const targetElement = e.target.closest(`.${this.options.activeClass}`);
                if (isMobile.iOS()) {
                    let up = e.changedTouches[0].pageY > this.lastY;
                    let down = !up;
                    this.lastY = e.changedTouches[0].pageY;
                    if (targetElement) if (up && this.allowUp || down && this.allowDown) e.stopPropagation(); else if (e.cancelable) e.preventDefault();
                }
                if (!this.clickOrTouch || e.target.closest(this.options.noEventSelector)) return;
                let yCoord = this._yP - e.changedTouches[0].pageY;
                this.checkScroll(yCoord, targetElement);
                if (this.goScroll && Math.abs(yCoord) > 20) this.choiceOfDirection(yCoord);
            }
            touchUp(e) {
                this._eventElement.removeEventListener("touchend", this.events.touchup);
                this._eventElement.removeEventListener("touchcancel", this.events.touchup);
                this._eventElement.removeEventListener("touchmove", this.events.touchmove);
                return this.clickOrTouch = false;
            }
            transitionend(e) {
                this.stopEvent = false;
                document.documentElement.classList.remove(this.options.wrapperAnimatedClass);
                this.wrapper.classList.remove(this.options.wrapperAnimatedClass);
            }
            wheel(e) {
                if (e.target.closest(this.options.noEventSelector)) return;
                const yCoord = e.deltaY;
                const targetElement = e.target.closest(`.${this.options.activeClass}`);
                this.checkScroll(yCoord, targetElement);
                if (this.goScroll) this.choiceOfDirection(yCoord);
            }
            choiceOfDirection(direction) {
                if (direction > 0 && false !== this.nextSection) this.activeSectionId = this.activeSectionId + 1 < this.sections.length ? ++this.activeSectionId : this.activeSectionId; else if (direction < 0 && false !== this.previousSection) this.activeSectionId = this.activeSectionId - 1 >= 0 ? --this.activeSectionId : this.activeSectionId;
                this.switchingSection(this.activeSectionId, direction);
            }
            switchingSection(idSection = this.activeSectionId, direction) {
                if (!direction) if (idSection < this.activeSectionId) direction = -100; else if (idSection > this.activeSectionId) direction = 100;
                this.activeSectionId = idSection;
                this.stopEvent = true;
                if (false === this.previousSectionId && direction < 0 || false === this.nextSectionId && direction > 0) this.stopEvent = false;
                if (this.stopEvent) {
                    document.documentElement.classList.add(this.options.wrapperAnimatedClass);
                    this.wrapper.classList.add(this.options.wrapperAnimatedClass);
                    this.removeClasses();
                    this.setClasses();
                    this.setStyle();
                    if (this.options.bullets) this.setActiveBullet(this.activeSectionId);
                    if (direction < 0) {
                        document.documentElement.classList.add("fp-up");
                        document.documentElement.classList.remove("fp-down");
                    } else {
                        document.documentElement.classList.remove("fp-up");
                        document.documentElement.classList.add("fp-down");
                    }
                    this.events.transitionEnd();
                    this.options.onSwitching(this);
                    document.dispatchEvent(new CustomEvent("fpswitching", {
                        detail: {
                            fp: this
                        }
                    }));
                }
            }
            setZIndex() {
                let zIndex = this.sections.length;
                for (let index = 0; index < this.sections.length; index++) {
                    const section = this.sections[index];
                    section.style.zIndex = zIndex;
                    --zIndex;
                }
            }
            removeZIndex() {
                for (let index = 0; index < this.sections.length; index++) {
                    const section = this.sections[index];
                    section.style.zIndex = "";
                }
            }
        }
        if (document.querySelector("[data-fp]")) flsModules.fullpage = new FullPage(document.querySelector("[data-fp]"), "");
        document.addEventListener("fpswitching", (function(e) {
            var pel = e.detail.fp.previousSection;
            var ael = e.detail.fp.activeSection;
            var nel = e.detail.fp.nextSection;
            document.querySelector(".header").classList.remove("head-hidden");
            if (ael.classList.contains("manage")) ael.addEventListener("scroll", ToogleHeader); else if (ael.classList.contains("api")) {
                pel.removeEventListener("scroll", ToogleHeader);
                setTimeout((() => {
                    pel.scrollTop = 0;
                    nel.scrollTop = 0;
                }), 500);
            } else if (ael.classList.contains("options") || ael.classList.contains("custom-first") || ael.classList.contains("custom-second")) {
                nel.removeEventListener("scroll", ToogleHeader);
                pel.removeEventListener("scroll", ToogleHeader);
                setTimeout((() => {
                    pel.scrollTop = 0;
                    nel.scrollTop = 0;
                }), 500);
                ael.addEventListener("scroll", ToogleHeader);
            }
        }));
        class DynamicAdapt {
            constructor(type) {
                this.type = type;
            }
            init() {
                this.оbjects = [];
                this.daClassname = "_dynamic_adapt_";
                this.nodes = [ ...document.querySelectorAll("[data-da]") ];
                this.nodes.forEach((node => {
                    const data = node.dataset.da.trim();
                    const dataArray = data.split(",");
                    const оbject = {};
                    оbject.element = node;
                    оbject.parent = node.parentNode;
                    оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
                    оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                    оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                    оbject.index = this.indexInParent(оbject.parent, оbject.element);
                    this.оbjects.push(оbject);
                }));
                this.arraySort(this.оbjects);
                this.mediaQueries = this.оbjects.map((({breakpoint}) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)).filter(((item, index, self) => self.indexOf(item) === index));
                this.mediaQueries.forEach((media => {
                    const mediaSplit = media.split(",");
                    const matchMedia = window.matchMedia(mediaSplit[0]);
                    const mediaBreakpoint = mediaSplit[1];
                    const оbjectsFilter = this.оbjects.filter((({breakpoint}) => breakpoint === mediaBreakpoint));
                    matchMedia.addEventListener("change", (() => {
                        this.mediaHandler(matchMedia, оbjectsFilter);
                    }));
                    this.mediaHandler(matchMedia, оbjectsFilter);
                }));
            }
            mediaHandler(matchMedia, оbjects) {
                if (matchMedia.matches) оbjects.forEach((оbject => {
                    this.moveTo(оbject.place, оbject.element, оbject.destination);
                })); else оbjects.forEach((({parent, element, index}) => {
                    if (element.classList.contains(this.daClassname)) this.moveBack(parent, element, index);
                }));
            }
            moveTo(place, element, destination) {
                element.classList.add(this.daClassname);
                if ("last" === place || place >= destination.children.length) {
                    destination.append(element);
                    return;
                }
                if ("first" === place) {
                    destination.prepend(element);
                    return;
                }
                destination.children[place].before(element);
            }
            moveBack(parent, element, index) {
                element.classList.remove(this.daClassname);
                if (void 0 !== parent.children[index]) parent.children[index].before(element); else parent.append(element);
            }
            indexInParent(parent, element) {
                return [ ...parent.children ].indexOf(element);
            }
            arraySort(arr) {
                if ("min" === this.type) arr.sort(((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if ("first" === a.place || "last" === b.place) return -1;
                        if ("last" === a.place || "first" === b.place) return 1;
                        return 0;
                    }
                    return a.breakpoint - b.breakpoint;
                })); else {
                    arr.sort(((a, b) => {
                        if (a.breakpoint === b.breakpoint) {
                            if (a.place === b.place) return 0;
                            if ("first" === a.place || "last" === b.place) return 1;
                            if ("last" === a.place || "first" === b.place) return -1;
                            return 0;
                        }
                        return b.breakpoint - a.breakpoint;
                    }));
                    return;
                }
            }
        }
        const da = new DynamicAdapt("max");
        da.init();
        (() => {
            function append(...nodes) {
                const length = nodes.length;
                for (let i = 0; i < length; i++) {
                    const node = nodes[i];
                    if (1 === node.nodeType || 11 === node.nodeType) this.appendChild(node); else this.appendChild(document.createTextNode(String(node)));
                }
            }
            function replaceChildren(...nodes) {
                while (this.lastChild) this.removeChild(this.lastChild);
                if (nodes.length) this.append(...nodes);
            }
            function replaceWith(...nodes) {
                const parent = this.parentNode;
                let i = nodes.length;
                if (!parent) return;
                if (!i) parent.removeChild(this);
                while (i--) {
                    let node = nodes[i];
                    if ("object" !== typeof node) node = this.ownerDocument.createTextNode(node); else if (node.parentNode) node.parentNode.removeChild(node);
                    if (!i) parent.replaceChild(node, this); else parent.insertBefore(this.previousSibling, node);
                }
            }
            if ("undefined" !== typeof Element) {
                if (!Element.prototype.append) {
                    Element.prototype.append = append;
                    DocumentFragment.prototype.append = append;
                }
                if (!Element.prototype.replaceChildren) {
                    Element.prototype.replaceChildren = replaceChildren;
                    DocumentFragment.prototype.replaceChildren = replaceChildren;
                }
                if (!Element.prototype.replaceWith) {
                    Element.prototype.replaceWith = replaceWith;
                    DocumentFragment.prototype.replaceWith = replaceWith;
                }
            }
        })();
        function extend(target, object) {
            return Object.getOwnPropertyNames(Object(target)).reduce(((extended, key) => {
                const currentValue = Object.getOwnPropertyDescriptor(Object(target), key);
                const newValue = Object.getOwnPropertyDescriptor(Object(object), key);
                return Object.defineProperty(extended, key, newValue || currentValue);
            }), {});
        }
        function isString(value) {
            return "string" === typeof value;
        }
        function isArray(value) {
            return Array.isArray(value);
        }
        function parseSettings(settings = {}) {
            const object = extend(settings);
            let types;
            if (void 0 !== object.types) types = object.types; else if (void 0 !== object.split) types = object.split;
            if (void 0 !== types) object.types = (isString(types) || isArray(types) ? String(types) : "").split(",").map((type => String(type).trim())).filter((type => /((line)|(word)|(char))/i.test(type)));
            if (object.absolute || object.position) object.absolute = object.absolute || /absolute/.test(settings.position);
            return object;
        }
        function parseTypes(value) {
            const types = isString(value) || isArray(value) ? String(value) : "";
            return {
                none: !types,
                lines: /line/i.test(types),
                words: /word/i.test(types),
                chars: /char/i.test(types)
            };
        }
        function isObject(value) {
            return null !== value && "object" === typeof value;
        }
        function isNode(input) {
            return isObject(input) && /^(1|3|11)$/.test(input.nodeType);
        }
        function isLength(value) {
            return "number" === typeof value && value > -1 && value % 1 === 0;
        }
        function isArrayLike(value) {
            return isObject(value) && isLength(value.length);
        }
        function toArray(value) {
            if (isArray(value)) return value;
            if (null == value) return [];
            return isArrayLike(value) ? Array.prototype.slice.call(value) : [ value ];
        }
        function getTargetElements(target) {
            let elements = target;
            if (isString(target)) if (/^(#[a-z]\w+)$/.test(target.trim())) elements = document.getElementById(target.trim().slice(1)); else elements = document.querySelectorAll(target);
            return toArray(elements).reduce(((result, element) => [ ...result, ...toArray(element).filter(isNode) ]), []);
        }
        const {entries, keys, values} = Object;
        const expando = `_splittype`;
        const cache = {};
        let uid = 0;
        function set(owner, key, value) {
            if (!isObject(owner)) {
                console.warn("[data.set] owner is not an object");
                return null;
            }
            const id = owner[expando] || (owner[expando] = ++uid);
            const data = cache[id] || (cache[id] = {});
            if (void 0 === value) {
                if (!!key && Object.getPrototypeOf(key) === Object.prototype) cache[id] = {
                    ...data,
                    ...key
                };
            } else if (void 0 !== key) data[key] = value;
            return value;
        }
        function get(owner, key) {
            const id = isObject(owner) ? owner[expando] : null;
            const data = id && cache[id] || {};
            if (void 0 === key) return data;
            return data[key];
        }
        function remove(element) {
            const id = element && element[expando];
            if (id) {
                delete element[id];
                delete cache[id];
            }
        }
        function cleanup() {
            entries(cache).forEach((([id, {isRoot, isSplit}]) => {
                if (!isRoot || !isSplit) {
                    cache[id] = null;
                    delete cache[id];
                }
            }));
        }
        function toWords(value, separator = " ") {
            const string = value ? String(value) : "";
            return string.trim().replace(/\s+/g, " ").split(separator);
        }
        const rsAstralRange = "\\ud800-\\udfff";
        const rsComboMarksRange = "\\u0300-\\u036f\\ufe20-\\ufe23";
        const rsComboSymbolsRange = "\\u20d0-\\u20f0";
        const rsVarRange = "\\ufe0e\\ufe0f";
        const rsAstral = `[${rsAstralRange}]`;
        const rsCombo = `[${rsComboMarksRange}${rsComboSymbolsRange}]`;
        const rsFitz = "\\ud83c[\\udffb-\\udfff]";
        const rsModifier = `(?:${rsCombo}|${rsFitz})`;
        const rsNonAstral = `[^${rsAstralRange}]`;
        const rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
        const rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
        const rsZWJ = "\\u200d";
        const reOptMod = `${rsModifier}?`;
        const rsOptVar = `[${rsVarRange}]?`;
        const rsOptJoin = "(?:" + rsZWJ + "(?:" + [ rsNonAstral, rsRegional, rsSurrPair ].join("|") + ")" + rsOptVar + reOptMod + ")*";
        const rsSeq = rsOptVar + reOptMod + rsOptJoin;
        const rsSymbol = `(?:${[ `${rsNonAstral}${rsCombo}?`, rsCombo, rsRegional, rsSurrPair, rsAstral ].join("|")}\n)`;
        const reUnicode = RegExp(`${rsFitz}(?=${rsFitz})|${rsSymbol}${rsSeq}`, "g");
        const unicodeRange = [ rsZWJ, rsAstralRange, rsComboMarksRange, rsComboSymbolsRange, rsVarRange ];
        const reHasUnicode = RegExp(`[${unicodeRange.join("")}]`);
        function asciiToArray(string) {
            return string.split("");
        }
        function hasUnicode(string) {
            return reHasUnicode.test(string);
        }
        function unicodeToArray(string) {
            return string.match(reUnicode) || [];
        }
        function stringToArray(string) {
            return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
        }
        function dist_toString(value) {
            return null == value ? "" : String(value);
        }
        function toChars(string, separator = "") {
            string = dist_toString(string);
            if (string && isString(string)) if (!separator && hasUnicode(string)) return stringToArray(string);
            return string.split(separator);
        }
        function createElement(name, attributes) {
            const element = document.createElement(name);
            if (!attributes) return element;
            Object.keys(attributes).forEach((attribute => {
                const rawValue = attributes[attribute];
                const value = isString(rawValue) ? rawValue.trim() : rawValue;
                if (null === value || "" === value) return;
                if ("children" === attribute) element.append(...toArray(value)); else element.setAttribute(attribute, value);
            }));
            return element;
        }
        var defaults = {
            splitClass: "",
            lineClass: "line",
            wordClass: "word",
            charClass: "char",
            types: [ "lines", "words", "chars" ],
            absolute: false,
            tagName: "div"
        };
        function splitWordsAndChars(textNode, settings) {
            settings = extend(defaults, settings);
            const types = parseTypes(settings.types);
            const TAG_NAME = settings.tagName;
            const VALUE = textNode.nodeValue;
            const splitText = document.createDocumentFragment();
            let words = [];
            let chars = [];
            if (/^\s/.test(VALUE)) splitText.append(" ");
            words = toWords(VALUE).reduce(((result, WORD, idx, arr) => {
                let wordElement;
                let characterElementsForCurrentWord;
                if (types.chars) characterElementsForCurrentWord = toChars(WORD).map((CHAR => {
                    const characterElement = createElement(TAG_NAME, {
                        class: `${settings.splitClass} ${settings.charClass}`,
                        style: "display: inline-block;",
                        children: CHAR
                    });
                    set(characterElement, "isChar", true);
                    chars = [ ...chars, characterElement ];
                    return characterElement;
                }));
                if (types.words || types.lines) {
                    wordElement = createElement(TAG_NAME, {
                        class: `${settings.wordClass} ${settings.splitClass}`,
                        style: `display: inline-block; ${types.words && settings.absolute ? `position: relative;` : ""}`,
                        children: types.chars ? characterElementsForCurrentWord : WORD
                    });
                    set(wordElement, {
                        isWord: true,
                        isWordStart: true,
                        isWordEnd: true
                    });
                    splitText.appendChild(wordElement);
                } else characterElementsForCurrentWord.forEach((characterElement => {
                    splitText.appendChild(characterElement);
                }));
                if (idx < arr.length - 1) splitText.append(" ");
                return types.words ? result.concat(wordElement) : result;
            }), []);
            if (/\s$/.test(VALUE)) splitText.append(" ");
            textNode.replaceWith(splitText);
            return {
                words,
                chars
            };
        }
        function split(node, settings) {
            const type = node.nodeType;
            const wordsAndChars = {
                words: [],
                chars: []
            };
            if (!/(1|3|11)/.test(type)) return wordsAndChars;
            if (3 === type && /\S/.test(node.nodeValue)) return splitWordsAndChars(node, settings);
            const childNodes = toArray(node.childNodes);
            if (childNodes.length) {
                set(node, "isSplit", true);
                if (!get(node).isRoot) {
                    node.style.display = "inline-block";
                    node.style.position = "relative";
                    const nextSibling = node.nextSibling;
                    const prevSibling = node.previousSibling;
                    const text = node.textContent || "";
                    const textAfter = nextSibling ? nextSibling.textContent : " ";
                    const textBefore = prevSibling ? prevSibling.textContent : " ";
                    set(node, {
                        isWordEnd: /\s$/.test(text) || /^\s/.test(textAfter),
                        isWordStart: /^\s/.test(text) || /\s$/.test(textBefore)
                    });
                }
            }
            return childNodes.reduce(((result, child) => {
                const {words, chars} = split(child, settings);
                return {
                    words: [ ...result.words, ...words ],
                    chars: [ ...result.chars, ...chars ]
                };
            }), wordsAndChars);
        }
        function getPosition(node, isWord, settings, scrollPos) {
            if (!settings.absolute) return {
                top: isWord ? node.offsetTop : null
            };
            const parent = node.offsetParent;
            const [scrollX, scrollY] = scrollPos;
            let parentX = 0;
            let parentY = 0;
            if (parent && parent !== document.body) {
                const parentRect = parent.getBoundingClientRect();
                parentX = parentRect.x + scrollX;
                parentY = parentRect.y + scrollY;
            }
            const {width, height, x, y} = node.getBoundingClientRect();
            const top = y + scrollY - parentY;
            const left = x + scrollX - parentX;
            return {
                width,
                height,
                top,
                left
            };
        }
        function unSplitWords(element) {
            if (!get(element).isWord) toArray(element.children).forEach((child => unSplitWords(child))); else {
                remove(element);
                element.replaceWith(...element.childNodes);
            }
        }
        const createFragment = () => document.createDocumentFragment();
        function repositionAfterSplit(element, settings, scrollPos) {
            const types = parseTypes(settings.types);
            const TAG_NAME = settings.tagName;
            const nodes = element.getElementsByTagName("*");
            const wordsInEachLine = [];
            let wordsInCurrentLine = [];
            let lineOffsetY = null;
            let elementHeight;
            let elementWidth;
            let contentBox;
            let lines = [];
            const parent = element.parentElement;
            const nextSibling = element.nextElementSibling;
            const splitText = createFragment();
            const cs = window.getComputedStyle(element);
            const align = cs.textAlign;
            const fontSize = parseFloat(cs.fontSize);
            const lineThreshold = .2 * fontSize;
            if (settings.absolute) {
                contentBox = {
                    left: element.offsetLeft,
                    top: element.offsetTop,
                    width: element.offsetWidth
                };
                elementWidth = element.offsetWidth;
                elementHeight = element.offsetHeight;
                set(element, {
                    cssWidth: element.style.width,
                    cssHeight: element.style.height
                });
            }
            toArray(nodes).forEach((node => {
                const isWordLike = node.parentElement === element;
                const {width, height, top, left} = getPosition(node, isWordLike, settings, scrollPos);
                if (/^br$/i.test(node.nodeName)) return;
                if (types.lines && isWordLike) {
                    if (null === lineOffsetY || top - lineOffsetY >= lineThreshold) {
                        lineOffsetY = top;
                        wordsInEachLine.push(wordsInCurrentLine = []);
                    }
                    wordsInCurrentLine.push(node);
                }
                if (settings.absolute) set(node, {
                    top,
                    left,
                    width,
                    height
                });
            }));
            if (parent) parent.removeChild(element);
            if (types.lines) {
                lines = wordsInEachLine.map((wordsInThisLine => {
                    const lineElement = createElement(TAG_NAME, {
                        class: `${settings.splitClass} ${settings.lineClass}`,
                        style: `display: block; text-align: ${align}; width: 100%;`
                    });
                    set(lineElement, "isLine", true);
                    const lineDimensions = {
                        height: 0,
                        top: 1e4
                    };
                    splitText.appendChild(lineElement);
                    wordsInThisLine.forEach(((wordOrElement, idx, arr) => {
                        const {isWordEnd, top, height} = get(wordOrElement);
                        const next = arr[idx + 1];
                        lineDimensions.height = Math.max(lineDimensions.height, height);
                        lineDimensions.top = Math.min(lineDimensions.top, top);
                        lineElement.appendChild(wordOrElement);
                        if (isWordEnd && get(next).isWordStart) lineElement.append(" ");
                    }));
                    if (settings.absolute) set(lineElement, {
                        height: lineDimensions.height,
                        top: lineDimensions.top
                    });
                    return lineElement;
                }));
                if (!types.words) unSplitWords(splitText);
                element.replaceChildren(splitText);
            }
            if (settings.absolute) {
                element.style.width = `${element.style.width || elementWidth}px`;
                element.style.height = `${elementHeight}px`;
                toArray(nodes).forEach((node => {
                    const {isLine, top, left, width, height} = get(node);
                    const parentData = get(node.parentElement);
                    const isChildOfLineNode = !isLine && parentData.isLine;
                    node.style.top = `${isChildOfLineNode ? top - parentData.top : top}px`;
                    node.style.left = isLine ? `${contentBox.left}px` : `${left - (isChildOfLineNode ? contentBox.left : 0)}px`;
                    node.style.height = `${height}px`;
                    node.style.width = isLine ? `${contentBox.width}px` : `${width}px`;
                    node.style.position = "absolute";
                }));
            }
            if (parent) if (nextSibling) parent.insertBefore(element, nextSibling); else parent.appendChild(element);
            return lines;
        }
        let _defaults = extend(defaults, {});
        class SplitType {
            static get data() {
                return cache;
            }
            static get defaults() {
                return _defaults;
            }
            static set defaults(options) {
                _defaults = extend(_defaults, parseSettings(options));
            }
            static setDefaults(options) {
                _defaults = extend(_defaults, parseSettings(options));
                return defaults;
            }
            static revert(elements) {
                getTargetElements(elements).forEach((element => {
                    const {isSplit, html, cssWidth, cssHeight} = get(element);
                    if (isSplit) {
                        element.innerHTML = html;
                        element.style.width = cssWidth || "";
                        element.style.height = cssHeight || "";
                        remove(element);
                    }
                }));
            }
            static create(target, options) {
                return new SplitType(target, options);
            }
            constructor(elements, options) {
                this.isSplit = false;
                this.settings = extend(_defaults, parseSettings(options));
                this.elements = getTargetElements(elements);
                this.split();
            }
            split(options) {
                this.revert();
                this.elements.forEach((element => {
                    set(element, "html", element.innerHTML);
                }));
                this.lines = [];
                this.words = [];
                this.chars = [];
                const scrollPos = [ window.pageXOffset, window.pageYOffset ];
                if (void 0 !== options) this.settings = extend(this.settings, parseSettings(options));
                const types = parseTypes(this.settings.types);
                if (types.none) return;
                this.elements.forEach((element => {
                    set(element, "isRoot", true);
                    const {words, chars} = split(element, this.settings);
                    this.words = [ ...this.words, ...words ];
                    this.chars = [ ...this.chars, ...chars ];
                }));
                this.elements.forEach((element => {
                    if (types.lines || this.settings.absolute) {
                        const lines = repositionAfterSplit(element, this.settings, scrollPos);
                        this.lines = [ ...this.lines, ...lines ];
                    }
                }));
                this.isSplit = true;
                window.scrollTo(scrollPos[0], scrollPos[1]);
                cleanup();
            }
            revert() {
                if (this.isSplit) {
                    this.lines = null;
                    this.words = null;
                    this.chars = null;
                    this.isSplit = false;
                }
                SplitType.revert(this.elements);
            }
        }
        const resetBtn = document.querySelectorAll(".reset-btn");
        resetBtn.forEach((item => {
            item.addEventListener("click", resetInput);
        }));
        function resetInput() {
            this.previousElementSibling.value = "";
            if ("TEXTAREA" == this.previousElementSibling.tagName) this.previousElementSibling.style.height = "initial";
            const formItems = document.querySelectorAll(".form__item");
            formItems.forEach((item => {
                item.classList.remove("_show-reset-btn");
            }));
        }
        const txHeight = 40;
        const tx = document.getElementsByTagName("textarea");
        for (let i = 0; i < tx.length; i++) {
            if ("" == tx[i].value) tx[i].setAttribute("style", "height:" + txHeight + "px;overflow-y:hidden;"); else tx[i].setAttribute("style", "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;");
            tx[i].addEventListener("input", OnInput);
        }
        function OnInput(e) {
            this.style.height = 0;
            this.style.height = this.scrollHeight + "px";
        }
        const menuBtn = document.querySelector(".menu__btn");
        const lottieBtnDemo = document.querySelector(".lottie__btn-demo");
        const animBtnDemo = bodymovin.loadAnimation({
            container: document.querySelector(".lottie__btn-demo"),
            renderer: "svg",
            loop: false,
            autoplay: false,
            path: "files/btn_demo.json"
        });
        if (menuBtn) {
            menuBtn.addEventListener("mouseenter", (function() {
                animBtnDemo.play();
                lottieBtnDemo.style.opacity = "1";
            }));
            menuBtn.addEventListener("mouseleave", (function() {
                animBtnDemo.stop();
                lottieBtnDemo.style.opacity = "0";
            }));
        }
        const requestBtn = document.querySelector(".text-block__btn");
        const lottieBtnReq = document.querySelector(".lottie__btn-request");
        const animBtnReq = bodymovin.loadAnimation({
            container: document.querySelector(".lottie__btn-request"),
            renderer: "svg",
            loop: false,
            autoplay: false,
            path: "files/btn_request.json"
        });
        if (requestBtn) {
            requestBtn.addEventListener("mouseenter", (function() {
                animBtnReq.play();
                lottieBtnReq.style.opacity = "1";
            }));
            requestBtn.addEventListener("mouseleave", (function() {
                animBtnReq.stop();
                lottieBtnReq.style.opacity = "0";
            }));
        }
        const formBtn = document.querySelectorAll(".form-btn");
        const lottieBtnFormLater = document.querySelector(".lottie__btn-later");
        const lottieBtnFormLaterTwo = document.querySelector(".lottie__btn-later-two");
        const lottieBtnFormSubm = document.querySelector(".lottie__btn-submit");
        const lottieBtnFormSubmTwo = document.querySelector(".lottie__btn-submit-two");
        const lottieBtnFormClose = document.querySelector(".lottie__btn-close");
        const animBtnFormLater = bodymovin.loadAnimation({
            container: document.querySelector(".lottie__btn-later"),
            renderer: "svg",
            loop: false,
            autoplay: false,
            path: "files/btn_later.json"
        });
        const animBtnFormLaterTwo = bodymovin.loadAnimation({
            container: document.querySelector(".lottie__btn-later-two"),
            renderer: "svg",
            loop: false,
            autoplay: false,
            path: "files/btn_later.json"
        });
        const animBtnFormSubmTwo = bodymovin.loadAnimation({
            container: document.querySelector(".lottie__btn-submit-two"),
            renderer: "svg",
            loop: false,
            autoplay: false,
            path: "files/btn_submit.json"
        });
        const animBtnFormSubm = bodymovin.loadAnimation({
            container: document.querySelector(".lottie__btn-submit"),
            renderer: "svg",
            loop: false,
            autoplay: false,
            path: "files/btn_submit.json"
        });
        const animBtnFormClose = bodymovin.loadAnimation({
            container: document.querySelector(".lottie__btn-close"),
            renderer: "svg",
            loop: false,
            autoplay: false,
            path: "files/btn_close.json"
        });
        if (formBtn) formBtn.forEach((formBtn => {
            if (formBtn.classList.contains("btn-gray-light")) {
                formBtn.addEventListener("mouseenter", (function() {
                    animBtnFormLater.play();
                    lottieBtnFormLater.style.opacity = "1";
                }));
                formBtn.addEventListener("mouseleave", (function() {
                    animBtnFormLater.stop();
                    lottieBtnFormLater.style.opacity = "0";
                }));
            }
            if (formBtn.classList.contains("btn-later-two")) {
                formBtn.addEventListener("mouseenter", (function() {
                    animBtnFormLaterTwo.play();
                    lottieBtnFormLaterTwo.style.opacity = "1";
                }));
                formBtn.addEventListener("mouseleave", (function() {
                    animBtnFormLaterTwo.stop();
                    lottieBtnFormLaterTwo.style.opacity = "0";
                }));
            }
            if (formBtn.classList.contains("btn-black")) {
                formBtn.addEventListener("mouseenter", (function() {
                    animBtnFormSubm.play();
                    lottieBtnFormSubm.style.opacity = "1";
                }));
                formBtn.addEventListener("mouseleave", (function() {
                    animBtnFormSubm.stop();
                    lottieBtnFormSubm.style.opacity = "0";
                }));
            }
            if (formBtn.classList.contains("btn-submit-two")) {
                formBtn.addEventListener("mouseenter", (function() {
                    animBtnFormSubmTwo.play();
                    lottieBtnFormSubmTwo.style.opacity = "1";
                }));
                formBtn.addEventListener("mouseleave", (function() {
                    animBtnFormSubmTwo.stop();
                    lottieBtnFormSubmTwo.style.opacity = "0";
                }));
            }
            if (formBtn.classList.contains("btn-close")) {
                formBtn.addEventListener("mouseenter", (function() {
                    animBtnFormClose.play();
                    lottieBtnFormClose.style.opacity = "1";
                }));
                formBtn.addEventListener("mouseleave", (function() {
                    animBtnFormClose.stop();
                    lottieBtnFormClose.style.opacity = "0";
                }));
            }
        }));
        const focusText = new SplitType(".focus__text", {
            types: "lines"
        });
        const animTextTop = new SplitType(".anim-text-top", {
            types: "lines"
        });
        const animTextBtm = new SplitType(".anim-text-btm", {
            types: "lines"
        });
        const manageBlockText = new SplitType(".manage__block-inf-txt-tablet", {
            types: "lines"
        });
        const optionsBlockText = new SplitType(".options__block-inf-txt", {
            types: "lines"
        });
        const customText = new SplitType(".custom__text-tablet", {
            types: "lines"
        });
        const apiText = new SplitType(".api__text-split", {
            types: "lines"
        });
        window.addEventListener("resize", (function() {
            focusText.split();
            animTextTop.split();
            animTextBtm.split();
            manageBlockText.split();
            optionsBlockText.split();
            customText.split();
            apiText.split();
        }));
        (function(factory) {
            if ("object" === typeof module && module.exports) module.exports = factory(); else window.intlTelInput = factory();
        })((function(undefined) {
            "use strict";
            return function() {
                var allCountries = [ [ "Albania", "al", "355" ], [ "Algeria", "dz", "213" ], [ "American Samoa", "as", "1", 5, [ "684" ] ], [ "Andorra", "ad", "376" ], [ "Angola", "ao", "244" ], [ "Anguilla", "ai", "1", 6, [ "264" ] ], [ "Antigua and Barbuda", "ag", "1", 7, [ "268" ] ], [ "Argentina", "ar", "54" ], [ "Armenia", "am", "374" ], [ "Aruba", "aw", "297" ], [ "Australia", "au", "61", 0 ], [ "Austria", "at", "43" ], [ "Azerbaijan", "az", "994" ], [ "Bahamas", "bs", "1", 8, [ "242" ] ], [ "Bahrain", "bh", "973" ], [ "Bangladesh", "bd", "880" ], [ "Barbados", "bb", "1", 9, [ "246" ] ], [ "Belarus", "by", "375" ], [ "Belgium", "be", "32" ], [ "Belize", "bz", "501" ], [ "Benin", "bj", "229" ], [ "Bermuda", "bm", "1", 10, [ "441" ] ], [ "Bhutan", "bt", "975" ], [ "Bolivia", "bo", "591" ], [ "Bosnia and Herzegovina", "ba", "387" ], [ "Botswana", "bw", "267" ], [ "Brazil", "br", "55" ], [ "British Indian Ocean Territory", "io", "246" ], [ "British Virgin Islands", "vg", "1", 11, [ "284" ] ], [ "Brunei", "bn", "673" ], [ "Bulgaria", "bg", "359" ], [ "Burkina Faso", "bf", "226" ], [ "Burundi", "bi", "257" ], [ "Cambodia", "kh", "855" ], [ "Cameroon", "cm", "237" ], [ "Canada", "ca", "1", 1, [ "204", "226", "236", "249", "250", "263", "289", "306", "343", "354", "365", "367", "368", "382", "387", "403", "416", "418", "428", "431", "437", "438", "450", "584", "468", "474", "506", "514", "519", "548", "579", "581", "584", "587", "604", "613", "639", "647", "672", "683", "705", "709", "742", "753", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905" ] ], [ "Cape Verde", "cv", "238" ], [ "Caribbean Netherlands", "bq", "599", 1, [ "3", "4", "7" ] ], [ "Cayman Islands", "ky", "1", 12, [ "345" ] ], [ "Central African Republic", "cf", "236" ], [ "Chad", "td", "235" ], [ "Chile", "cl", "56" ], [ "China", "cn", "86" ], [ "Christmas Island", "cx", "61", 2, [ "89164" ] ], [ "Cocos Islands", "cc", "61", 1, [ "89162" ] ], [ "Colombia", "co", "57" ], [ "Comoros", "km", "269" ], [ "Congo (DRC)", "cd", "243" ], [ "Congo (Republic)", "cg", "242" ], [ "Cook Islands", "ck", "682" ], [ "Costa Rica", "cr", "506" ], [ "Côte d’Ivoire", "ci", "225" ], [ "Croatia", "hr", "385" ], [ "Cuba", "cu", "53" ], [ "Curaçao", "cw", "599", 0 ], [ "Cyprus ", "cy", "357" ], [ "Czech Republic", "cz", "420" ], [ "Denmark", "dk", "45" ], [ "Djibouti", "dj", "253" ], [ "Dominica", "dm", "1", 13, [ "767" ] ], [ "Dominican Republic", "do", "1", 2, [ "809", "829", "849" ] ], [ "Ecuador", "ec", "593" ], [ "Egypt", "eg", "20" ], [ "El Salvador", "sv", "503" ], [ "Equatorial Guinea", "gq", "240" ], [ "Eritrea", "er", "291" ], [ "Estonia", "ee", "372" ], [ "Eswatini", "sz", "268" ], [ "Ethiopia", "et", "251" ], [ "Falkland Islands", "fk", "500" ], [ "Faroe Islands", "fo", "298" ], [ "Fiji", "fj", "679" ], [ "Finland", "fi", "358", 0 ], [ "France", "fr", "33" ], [ "French Guiana", "gf", "594" ], [ "French Polynesia", "pf", "689" ], [ "Gabon", "ga", "241" ], [ "Gambia", "gm", "220" ], [ "Georgia", "ge", "995" ], [ "Germany", "de", "49" ], [ "Ghana", "gh", "233" ], [ "Gibraltar", "gi", "350" ], [ "Greece", "gr", "30" ], [ "Greenland", "gl", "299" ], [ "Grenada", "gd", "1", 14, [ "473" ] ], [ "Guadeloupe", "gp", "590", 0 ], [ "Guam", "gu", "1", 15, [ "671" ] ], [ "Guatemala", "gt", "502" ], [ "Guernsey", "gg", "44", 1, [ "1481", "7781", "7839", "7911" ] ], [ "Guinea", "gn", "224" ], [ "Guinea-Bissau", "gw", "245" ], [ "Guyana", "gy", "592" ], [ "Haiti", "ht", "509" ], [ "Honduras", "hn", "504" ], [ "Hong Kong", "hk", "852" ], [ "Hungary", "hu", "36" ], [ "Iceland", "is", "354" ], [ "India", "in", "91" ], [ "Indonesia", "id", "62" ], [ "Iran", "ir", "98" ], [ "Iraq", "iq", "964" ], [ "Ireland", "ie", "353" ], [ "Isle of Man", "im", "44", 2, [ "1624", "74576", "7524", "7924", "7624" ] ], [ "Israel", "il", "972" ], [ "Italy", "it", "39", 0 ], [ "Jamaica", "jm", "1", 4, [ "876", "658" ] ], [ "Japan", "jp", "81" ], [ "Jersey", "je", "44", 3, [ "1534", "7509", "7700", "7797", "7829", "7937" ] ], [ "Jordan", "jo", "962" ], [ "Kazakhstan", "kz", "7", 1, [ "33", "7" ] ], [ "Kenya", "ke", "254" ], [ "Kiribati", "ki", "686" ], [ "Kosovo", "xk", "383" ], [ "Kuwait", "kw", "965" ], [ "Kyrgyzstan", "kg", "996" ], [ "Laos", "la", "856" ], [ "Latvia", "lv", "371" ], [ "Lebanon", "lb", "961" ], [ "Lesotho", "ls", "266" ], [ "Liberia", "lr", "231" ], [ "Libya", "ly", "218" ], [ "Liechtenstein", "li", "423" ], [ "Lithuania", "lt", "370" ], [ "Luxembourg", "lu", "352" ], [ "Macau", "mo", "853" ], [ "Madagascar", "mg", "261" ], [ "Malawi", "mw", "265" ], [ "Malaysia", "my", "60" ], [ "Maldives", "mv", "960" ], [ "Mali", "ml", "223" ], [ "Malta", "mt", "356" ], [ "Marshall Islands", "mh", "692" ], [ "Martinique", "mq", "596" ], [ "Mauritania", "mr", "222" ], [ "Mauritius", "mu", "230" ], [ "Mayotte", "yt", "262", 1, [ "269", "639" ] ], [ "Mexico", "mx", "52" ], [ "Micronesia", "fm", "691" ], [ "Moldova", "md", "373" ], [ "Monaco", "mc", "377" ], [ "Mongolia", "mn", "976" ], [ "Montenegro", "me", "382" ], [ "Montserrat", "ms", "1", 16, [ "664" ] ], [ "Morocco", "ma", "212", 0 ], [ "Mozambique", "mz", "258" ], [ "Myanmar (Burma)", "mm", "95" ], [ "Namibia", "na", "264" ], [ "Nauru", "nr", "674" ], [ "Nepal", "np", "977" ], [ "Netherlands", "nl", "31" ], [ "New Caledonia", "nc", "687" ], [ "New Zealand", "nz", "64" ], [ "Nicaragua", "ni", "505" ], [ "Niger", "ne", "227" ], [ "Nigeria", "ng", "234" ], [ "Niue", "nu", "683" ], [ "Norfolk Island", "nf", "672" ], [ "North Korea", "kp", "850" ], [ "North Macedonia", "mk", "389" ], [ "Northern Mariana Islands", "mp", "1", 17, [ "670" ] ], [ "Norway", "no", "47", 0 ], [ "Oman", "om", "968" ], [ "Pakistan", "pk", "92" ], [ "Palau", "pw", "680" ], [ "Palestine", "ps", "970" ], [ "Panama", "pa", "507" ], [ "Papua New Guinea", "pg", "675" ], [ "Paraguay", "py", "595" ], [ "Peru", "pe", "51" ], [ "Philippines", "ph", "63" ], [ "Poland", "pl", "48" ], [ "Portugal", "pt", "351" ], [ "Puerto Rico", "pr", "1", 3, [ "787", "939" ] ], [ "Qatar", "qa", "974" ], [ "Réunion", "re", "262", 0 ], [ "Romania", "ro", "40" ], [ "Russia", "ru", "7", 0 ], [ "Rwanda", "rw", "250" ], [ "Saint Barthélemy", "bl", "590", 1 ], [ "Saint Helena", "sh", "290" ], [ "Saint Kitts and Nevis", "kn", "1", 18, [ "869" ] ], [ "Saint Lucia", "lc", "1", 19, [ "758" ] ], [ "Saint Martin", "mf", "590", 2 ], [ "Saint Pierre and Miquelon", "pm", "508" ], [ "Saint Vincent and the Grenadines", "vc", "1", 20, [ "784" ] ], [ "Samoa", "ws", "685" ], [ "San Marino", "sm", "378" ], [ "São Tomé and Príncipe", "st", "239" ], [ "Saudi Arabia", "sa", "966" ], [ "Senegal", "sn", "221" ], [ "Serbia", "rs", "381" ], [ "Seychelles", "sc", "248" ], [ "Sierra Leone", "sl", "232" ], [ "Singapore", "sg", "65" ], [ "Sint Maarten", "sx", "1", 21, [ "721" ] ], [ "Slovakia", "sk", "421" ], [ "Slovenia", "si", "386" ], [ "Solomon Islands", "sb", "677" ], [ "Somalia", "so", "252" ], [ "South Africa", "za", "27" ], [ "South Korea", "kr", "82" ], [ "South Sudan", "ss", "211" ], [ "Spain", "es", "34" ], [ "Sri Lanka", "lk", "94" ], [ "Sudan", "sd", "249" ], [ "Suriname", "sr", "597" ], [ "Svalbard and Jan Mayen", "sj", "47", 1, [ "79" ] ], [ "Sweden", "se", "46" ], [ "Switzerland", "ch", "41" ], [ "Syria", "sy", "963" ], [ "Taiwan", "tw", "886" ], [ "Tajikistan", "tj", "992" ], [ "Tanzania", "tz", "255" ], [ "Thailand", "th", "66" ], [ "Timor-Leste", "tl", "670" ], [ "Togo", "tg", "228" ], [ "Tokelau", "tk", "690" ], [ "Tonga", "to", "676" ], [ "Trinidad and Tobago", "tt", "1", 22, [ "868" ] ], [ "Tunisia", "tn", "216" ], [ "Turkey", "tr", "90" ], [ "Turkmenistan", "tm", "993" ], [ "Turks and Caicos Islands", "tc", "1", 23, [ "649" ] ], [ "Tuvalu", "tv", "688" ], [ "U.S. Virgin Islands", "vi", "1", 24, [ "340" ] ], [ "Uganda", "ug", "256" ], [ "Ukraine", "ua", "380" ], [ "United Arab Emirates", "ae", "971" ], [ "United Kingdom", "gb", "44", 0 ], [ "United States", "us", "1", 0 ], [ "Uruguay", "uy", "598" ], [ "Uzbekistan", "uz", "998" ], [ "Vanuatu", "vu", "678" ], [ "Vatican City", "va", "39", 1, [ "06698" ] ], [ "Venezuela", "ve", "58" ], [ "Vietnam", "vn", "84" ], [ "Wallis and Futuna", "wf", "681" ], [ "Western Sahara", "eh", "212", 1, [ "5288", "5289" ] ], [ "Yemen", "ye", "967" ], [ "Zambia", "zm", "260" ], [ "Zimbabwe", "zw", "263" ], [ "Åland Islands", "ax", "358", 1, [ "18" ] ] ];
                for (var i = 0; i < allCountries.length; i++) {
                    var c = allCountries[i];
                    allCountries[i] = {
                        name: c[0],
                        iso2: c[1],
                        dialCode: c[2],
                        priority: c[3] || 0,
                        areaCodes: c[4] || null
                    };
                }
                "use strict";
                function _objectSpread(target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = null != arguments[i] ? Object(arguments[i]) : {};
                        var ownKeys = Object.keys(source);
                        if ("function" === typeof Object.getOwnPropertySymbols) ownKeys.push.apply(ownKeys, Object.getOwnPropertySymbols(source).filter((function(sym) {
                            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                        })));
                        ownKeys.forEach((function(key) {
                            _defineProperty(target, key, source[key]);
                        }));
                    }
                    return target;
                }
                function _defineProperty(obj, key, value) {
                    key = _toPropertyKey(key);
                    if (key in obj) Object.defineProperty(obj, key, {
                        value,
                        enumerable: true,
                        configurable: true,
                        writable: true
                    }); else obj[key] = value;
                    return obj;
                }
                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                }
                function _defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
                    }
                }
                function _createClass(Constructor, protoProps, staticProps) {
                    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) _defineProperties(Constructor, staticProps);
                    Object.defineProperty(Constructor, "prototype", {
                        writable: false
                    });
                    return Constructor;
                }
                function _toPropertyKey(arg) {
                    var key = _toPrimitive(arg, "string");
                    return "symbol" === typeof key ? key : String(key);
                }
                function _toPrimitive(input, hint) {
                    if ("object" !== typeof input || null === input) return input;
                    var prim = input[Symbol.toPrimitive];
                    if (prim !== undefined) {
                        var res = prim.call(input, hint || "default");
                        if ("object" !== typeof res) return res;
                        throw new TypeError("@@toPrimitive must return a primitive value.");
                    }
                    return ("string" === hint ? String : Number)(input);
                }
                var intlTelInputGlobals = {
                    getInstance: function getInstance(input) {
                        var id = input.getAttribute("data-intl-tel-input-id");
                        return window.intlTelInputGlobals.instances[id];
                    },
                    instances: {},
                    documentReady: function documentReady() {
                        return "complete" === document.readyState;
                    }
                };
                if ("object" === typeof window) window.intlTelInputGlobals = intlTelInputGlobals;
                var id = 0;
                var defaults = {
                    allowDropdown: true,
                    autoInsertDialCode: false,
                    autoPlaceholder: "polite",
                    customContainer: "",
                    customPlaceholder: null,
                    dropdownContainer: null,
                    excludeCountries: [],
                    formatOnDisplay: true,
                    geoIpLookup: null,
                    hiddenInput: "",
                    initialCountry: "",
                    localizedCountries: null,
                    nationalMode: true,
                    onlyCountries: [],
                    placeholderNumberType: "MOBILE",
                    preferredCountries: [ "us", "gb" ],
                    separateDialCode: false,
                    showFlags: true,
                    utilsScript: ""
                };
                var regionlessNanpNumbers = [ "800", "822", "833", "844", "855", "866", "877", "880", "881", "882", "883", "884", "885", "886", "887", "888", "889" ];
                var forEachProp = function forEachProp(obj, callback) {
                    var keys = Object.keys(obj);
                    for (var i = 0; i < keys.length; i++) callback(keys[i], obj[keys[i]]);
                };
                var forEachInstance = function forEachInstance(method) {
                    forEachProp(window.intlTelInputGlobals.instances, (function(key) {
                        window.intlTelInputGlobals.instances[key][method]();
                    }));
                };
                var Iti = function() {
                    function Iti(input, options) {
                        var _this = this;
                        _classCallCheck(this, Iti);
                        this.id = id++;
                        this.telInput = input;
                        this.activeItem = null;
                        this.highlightedItem = null;
                        var customOptions = options || {};
                        this.options = {};
                        forEachProp(defaults, (function(key, value) {
                            _this.options[key] = customOptions.hasOwnProperty(key) ? customOptions[key] : value;
                        }));
                        this.hadInitialPlaceholder = Boolean(input.getAttribute("placeholder"));
                    }
                    _createClass(Iti, [ {
                        key: "_init",
                        value: function _init() {
                            var _this2 = this;
                            if (this.options.nationalMode) this.options.autoInsertDialCode = false;
                            if (this.options.separateDialCode) this.options.autoInsertDialCode = false;
                            var forceShowFlags = this.options.allowDropdown && !this.options.separateDialCode;
                            if (!this.options.showFlags && forceShowFlags) this.options.showFlags = true;
                            this.isMobile = false;
                            if (this.isMobile) {
                                document.body.classList.add("iti-mobile");
                                if (!this.options.dropdownContainer) this.options.dropdownContainer = document.body;
                            }
                            if ("undefined" !== typeof Promise) {
                                var autoCountryPromise = new Promise((function(resolve, reject) {
                                    _this2.resolveAutoCountryPromise = resolve;
                                    _this2.rejectAutoCountryPromise = reject;
                                }));
                                var utilsScriptPromise = new Promise((function(resolve, reject) {
                                    _this2.resolveUtilsScriptPromise = resolve;
                                    _this2.rejectUtilsScriptPromise = reject;
                                }));
                                this.promise = Promise.all([ autoCountryPromise, utilsScriptPromise ]);
                            } else {
                                this.resolveAutoCountryPromise = this.rejectAutoCountryPromise = function() {};
                                this.resolveUtilsScriptPromise = this.rejectUtilsScriptPromise = function() {};
                            }
                            this.selectedCountryData = {};
                            this._processCountryData();
                            this._generateMarkup();
                            this._setInitialState();
                            this._initListeners();
                            this._initRequests();
                        }
                    }, {
                        key: "_processCountryData",
                        value: function _processCountryData() {
                            this._processAllCountries();
                            this._processCountryCodes();
                            this._processPreferredCountries();
                            if (this.options.localizedCountries) this._translateCountriesByLocale();
                            if (this.options.onlyCountries.length || this.options.localizedCountries) this.countries.sort(this._countryNameSort);
                        }
                    }, {
                        key: "_addCountryCode",
                        value: function _addCountryCode(iso2, countryCode, priority) {
                            if (countryCode.length > this.countryCodeMaxLen) this.countryCodeMaxLen = countryCode.length;
                            if (!this.countryCodes.hasOwnProperty(countryCode)) this.countryCodes[countryCode] = [];
                            for (var i = 0; i < this.countryCodes[countryCode].length; i++) if (this.countryCodes[countryCode][i] === iso2) return;
                            var index = priority !== undefined ? priority : this.countryCodes[countryCode].length;
                            this.countryCodes[countryCode][index] = iso2;
                        }
                    }, {
                        key: "_processAllCountries",
                        value: function _processAllCountries() {
                            if (this.options.onlyCountries.length) {
                                var lowerCaseOnlyCountries = this.options.onlyCountries.map((function(country) {
                                    return country.toLowerCase();
                                }));
                                this.countries = allCountries.filter((function(country) {
                                    return lowerCaseOnlyCountries.indexOf(country.iso2) > -1;
                                }));
                            } else if (this.options.excludeCountries.length) {
                                var lowerCaseExcludeCountries = this.options.excludeCountries.map((function(country) {
                                    return country.toLowerCase();
                                }));
                                this.countries = allCountries.filter((function(country) {
                                    return -1 === lowerCaseExcludeCountries.indexOf(country.iso2);
                                }));
                            } else this.countries = allCountries;
                        }
                    }, {
                        key: "_translateCountriesByLocale",
                        value: function _translateCountriesByLocale() {
                            for (var i = 0; i < this.countries.length; i++) {
                                var iso = this.countries[i].iso2.toLowerCase();
                                if (this.options.localizedCountries.hasOwnProperty(iso)) this.countries[i].name = this.options.localizedCountries[iso];
                            }
                        }
                    }, {
                        key: "_countryNameSort",
                        value: function _countryNameSort(a, b) {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                        }
                    }, {
                        key: "_processCountryCodes",
                        value: function _processCountryCodes() {
                            this.countryCodeMaxLen = 0;
                            this.dialCodes = {};
                            this.countryCodes = {};
                            for (var i = 0; i < this.countries.length; i++) {
                                var c = this.countries[i];
                                if (!this.dialCodes[c.dialCode]) this.dialCodes[c.dialCode] = true;
                                this._addCountryCode(c.iso2, c.dialCode, c.priority);
                            }
                            for (var _i = 0; _i < this.countries.length; _i++) {
                                var _c = this.countries[_i];
                                if (_c.areaCodes) {
                                    var rootCountryCode = this.countryCodes[_c.dialCode][0];
                                    for (var j = 0; j < _c.areaCodes.length; j++) {
                                        var areaCode = _c.areaCodes[j];
                                        for (var k = 1; k < areaCode.length; k++) {
                                            var partialDialCode = _c.dialCode + areaCode.substr(0, k);
                                            this._addCountryCode(rootCountryCode, partialDialCode);
                                            this._addCountryCode(_c.iso2, partialDialCode);
                                        }
                                        this._addCountryCode(_c.iso2, _c.dialCode + areaCode);
                                    }
                                }
                            }
                        }
                    }, {
                        key: "_processPreferredCountries",
                        value: function _processPreferredCountries() {
                            this.preferredCountries = [];
                            for (var i = 0; i < this.options.preferredCountries.length; i++) {
                                var countryCode = this.options.preferredCountries[i].toLowerCase();
                                var countryData = this._getCountryData(countryCode, false, true);
                                if (countryData) this.preferredCountries.push(countryData);
                            }
                        }
                    }, {
                        key: "_createEl",
                        value: function _createEl(name, attrs, container) {
                            var el = document.createElement(name);
                            if (attrs) forEachProp(attrs, (function(key, value) {
                                return el.setAttribute(key, value);
                            }));
                            if (container) container.appendChild(el);
                            return el;
                        }
                    }, {
                        key: "_generateMarkup",
                        value: function _generateMarkup() {
                            if (!this.telInput.hasAttribute("autocomplete") && !(this.telInput.form && this.telInput.form.hasAttribute("autocomplete"))) this.telInput.setAttribute("autocomplete", "off");
                            var _this$options = this.options, allowDropdown = _this$options.allowDropdown, separateDialCode = _this$options.separateDialCode, showFlags = _this$options.showFlags, customContainer = _this$options.customContainer, hiddenInput = _this$options.hiddenInput, dropdownContainer = _this$options.dropdownContainer;
                            var parentClass = "iti";
                            if (allowDropdown) parentClass += " iti--allow-dropdown";
                            if (separateDialCode) parentClass += " iti--separate-dial-code";
                            if (showFlags) parentClass += " iti--show-flags";
                            if (customContainer) parentClass += " ".concat(customContainer);
                            var wrapper = this._createEl("div", {
                                class: parentClass
                            });
                            this.telInput.parentNode.insertBefore(wrapper, this.telInput);
                            var showFlagsContainer = allowDropdown || showFlags || separateDialCode;
                            if (showFlagsContainer) this.flagsContainer = this._createEl("div", {
                                class: "iti__flag-container"
                            }, wrapper);
                            wrapper.appendChild(this.telInput);
                            if (showFlagsContainer) this.selectedFlag = this._createEl("div", _objectSpread({
                                class: "iti__selected-flag"
                            }, allowDropdown && {
                                role: "combobox",
                                "aria-haspopup": "listbox",
                                "aria-controls": "iti-".concat(this.id, "__country-listbox"),
                                "aria-owns": "iti-".concat(this.id, "__country-listbox"),
                                "aria-expanded": "false",
                                "aria-label": "Telephone country code"
                            }), this.flagsContainer);
                            if (showFlags) this.selectedFlagInner = this._createEl("div", {
                                class: "iti__flag"
                            }, this.selectedFlag);
                            if (this.selectedFlag && this.telInput.disabled) this.selectedFlag.setAttribute("aria-disabled", "true");
                            if (separateDialCode) this.selectedDialCode = this._createEl("div", {
                                class: "iti__selected-dial-code"
                            }, this.selectedFlag);
                            if (allowDropdown) {
                                if (!this.telInput.disabled) this.selectedFlag.setAttribute("tabindex", "0");
                                this.dropdownArrow = this._createEl("div", {
                                    class: "iti__arrow"
                                }, this.selectedFlag);
                                this.countryList = this._createEl("ul", {
                                    class: "iti__country-list iti__hide",
                                    id: "iti-".concat(this.id, "__country-listbox"),
                                    role: "listbox",
                                    "aria-label": "List of countries"
                                });
                                if (this.preferredCountries.length) {
                                    this._appendListItems(this.preferredCountries, "iti__preferred", true);
                                    this._createEl("li", {
                                        class: "iti__divider",
                                        role: "separator",
                                        "aria-disabled": "true"
                                    }, this.countryList);
                                }
                                this._appendListItems(this.countries, "iti__standard");
                                if (dropdownContainer) {
                                    this.dropdown = this._createEl("div", {
                                        class: "iti iti--container"
                                    });
                                    this.dropdown.appendChild(this.countryList);
                                } else this.flagsContainer.appendChild(this.countryList);
                            }
                            if (hiddenInput) {
                                var hiddenInputName = hiddenInput;
                                var name = this.telInput.getAttribute("name");
                                if (name) {
                                    var i = name.lastIndexOf("[");
                                    if (-1 !== i) hiddenInputName = "".concat(name.substr(0, i), "[").concat(hiddenInputName, "]");
                                }
                                this.hiddenInput = this._createEl("input", {
                                    type: "hidden",
                                    name: hiddenInputName
                                });
                                wrapper.appendChild(this.hiddenInput);
                            }
                        }
                    }, {
                        key: "_appendListItems",
                        value: function _appendListItems(countries, className, preferred) {
                            var tmp = preferred ? "<li class='li-intlTel-search'><div class='title-of-list-mob'>Country code</div><input class='input-intlTel-search' type='text' id='intlTel-search' placeholder='Search Country...' data-no-focus-classes><img class='icon-search-tel' src='img/icons/search-tel.svg' alt='search'></li>" : "";
                            for (var i = 0; i < countries.length; i++) {
                                var c = countries[i];
                                var idSuffix = preferred ? "-preferred" : "";
                                tmp += "<li class='iti__country ".concat(className, "' tabIndex='-1' id='iti-").concat(this.id, "__item-").concat(c.iso2).concat(idSuffix, "' role='option' data-dial-code='").concat(c.dialCode, "' data-country-code='").concat(c.iso2, "' aria-selected='false'>");
                                if (this.options.showFlags) tmp += "<div class='iti__flag-box'><div class='iti__flag iti__".concat(c.iso2, "'></div></div>");
                                tmp += "<span class='iti__country-name'>".concat(c.name, "</span>");
                                tmp += "<span class='iti__dial-code'>+".concat(c.dialCode, "</span>");
                                tmp += "</li>";
                            }
                            this.countryList.insertAdjacentHTML("beforeend", tmp);
                        }
                    }, {
                        key: "_setInitialState",
                        value: function _setInitialState() {
                            var attributeValue = this.telInput.getAttribute("value");
                            var inputValue = this.telInput.value;
                            var useAttribute = attributeValue && "+" === attributeValue.charAt(0) && (!inputValue || "+" !== inputValue.charAt(0));
                            var val = useAttribute ? attributeValue : inputValue;
                            var dialCode = this._getDialCode(val);
                            var isRegionlessNanp = this._isRegionlessNanp(val);
                            var _this$options2 = this.options, initialCountry = _this$options2.initialCountry, autoInsertDialCode = _this$options2.autoInsertDialCode;
                            if (dialCode && !isRegionlessNanp) this._updateFlagFromNumber(val); else if ("auto" !== initialCountry) {
                                if (initialCountry) this._setFlag(initialCountry.toLowerCase()); else if (dialCode && isRegionlessNanp) this._setFlag("us"); else {
                                    this.defaultCountry = this.preferredCountries.length ? this.preferredCountries[0].iso2 : this.countries[0].iso2;
                                    if (!val) this._setFlag(this.defaultCountry);
                                }
                                if (!val && autoInsertDialCode) this.telInput.value = "+".concat(this.selectedCountryData.dialCode);
                            }
                            if (val) this._updateValFromNumber(val);
                        }
                    }, {
                        key: "_initListeners",
                        value: function _initListeners() {
                            this._initKeyListeners();
                            if (this.options.autoInsertDialCode) this._initBlurListeners();
                            if (this.options.allowDropdown) this._initDropdownListeners();
                            if (this.hiddenInput) this._initHiddenInputListener();
                        }
                    }, {
                        key: "_initHiddenInputListener",
                        value: function _initHiddenInputListener() {
                            var _this3 = this;
                            this._handleHiddenInputSubmit = function() {
                                _this3.hiddenInput.value = _this3.getNumber();
                            };
                            if (this.telInput.form) this.telInput.form.addEventListener("submit", this._handleHiddenInputSubmit);
                        }
                    }, {
                        key: "_getClosestLabel",
                        value: function _getClosestLabel() {
                            var el = this.telInput;
                            while (el && "LABEL" !== el.tagName) el = el.parentNode;
                            return el;
                        }
                    }, {
                        key: "_initDropdownListeners",
                        value: function _initDropdownListeners() {
                            var _this4 = this;
                            this._handleLabelClick = function(e) {
                                if (_this4.countryList.classList.contains("iti__hide")) _this4.telInput.focus(); else e.preventDefault();
                            };
                            var label = this._getClosestLabel();
                            if (label) label.addEventListener("click", this._handleLabelClick);
                            this._handleClickSelectedFlag = function() {
                                if (_this4.countryList.classList.contains("iti__hide") && !_this4.telInput.disabled && !_this4.telInput.readOnly) _this4._showDropdown();
                            };
                            this.selectedFlag.addEventListener("click", this._handleClickSelectedFlag);
                            this._handleFlagsContainerKeydown = function(e) {
                                var isDropdownHidden = _this4.countryList.classList.contains("iti__hide");
                                if (isDropdownHidden && -1 !== [ "ArrowUp", "Up", "ArrowDown", "Down", " ", "Enter" ].indexOf(e.key)) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    _this4._showDropdown();
                                }
                                if ("Tab" === e.key) _this4._closeDropdown();
                            };
                            this.flagsContainer.addEventListener("keydown", this._handleFlagsContainerKeydown);
                        }
                    }, {
                        key: "_initRequests",
                        value: function _initRequests() {
                            var _this5 = this;
                            if (this.options.utilsScript && !window.intlTelInputUtils) if (window.intlTelInputGlobals.documentReady()) window.intlTelInputGlobals.loadUtils(this.options.utilsScript); else window.addEventListener("load", (function() {
                                window.intlTelInputGlobals.loadUtils(_this5.options.utilsScript);
                            })); else this.resolveUtilsScriptPromise();
                            if ("auto" === this.options.initialCountry) this._loadAutoCountry(); else this.resolveAutoCountryPromise();
                        }
                    }, {
                        key: "_loadAutoCountry",
                        value: function _loadAutoCountry() {
                            if (window.intlTelInputGlobals.autoCountry) this.handleAutoCountry(); else if (!window.intlTelInputGlobals.startedLoadingAutoCountry) {
                                window.intlTelInputGlobals.startedLoadingAutoCountry = true;
                                if ("function" === typeof this.options.geoIpLookup) this.options.geoIpLookup((function(countryCode) {
                                    window.intlTelInputGlobals.autoCountry = countryCode.toLowerCase();
                                    setTimeout((function() {
                                        return forEachInstance("handleAutoCountry");
                                    }));
                                }), (function() {
                                    return forEachInstance("rejectAutoCountryPromise");
                                }));
                            }
                        }
                    }, {
                        key: "_initKeyListeners",
                        value: function _initKeyListeners() {
                            var _this6 = this;
                            this._handleKeyupEvent = function() {
                                if (_this6._updateFlagFromNumber(_this6.telInput.value)) _this6._triggerCountryChange();
                            };
                            this.telInput.addEventListener("keyup", this._handleKeyupEvent);
                            this._handleClipboardEvent = function() {
                                setTimeout(_this6._handleKeyupEvent);
                            };
                            this.telInput.addEventListener("cut", this._handleClipboardEvent);
                            this.telInput.addEventListener("paste", this._handleClipboardEvent);
                        }
                    }, {
                        key: "_cap",
                        value: function _cap(number) {
                            var max = this.telInput.getAttribute("maxlength");
                            return max && number.length > max ? number.substr(0, max) : number;
                        }
                    }, {
                        key: "_initBlurListeners",
                        value: function _initBlurListeners() {
                            var _this7 = this;
                            this._handleSubmitOrBlurEvent = function() {
                                _this7._removeEmptyDialCode();
                            };
                            if (this.telInput.form) this.telInput.form.addEventListener("submit", this._handleSubmitOrBlurEvent);
                            this.telInput.addEventListener("blur", this._handleSubmitOrBlurEvent);
                        }
                    }, {
                        key: "_removeEmptyDialCode",
                        value: function _removeEmptyDialCode() {
                            if ("+" === this.telInput.value.charAt(0)) {
                                var numeric = this._getNumeric(this.telInput.value);
                                if (!numeric || this.selectedCountryData.dialCode === numeric) this.telInput.value = "";
                            }
                        }
                    }, {
                        key: "_getNumeric",
                        value: function _getNumeric(s) {
                            return s.replace(/\D/g, "");
                        }
                    }, {
                        key: "_trigger",
                        value: function _trigger(name) {
                            var e = document.createEvent("Event");
                            e.initEvent(name, true, true);
                            this.telInput.dispatchEvent(e);
                        }
                    }, {
                        key: "_showDropdown",
                        value: function _showDropdown() {
                            this.countryList.classList.remove("iti__hide");
                            this.selectedFlag.setAttribute("aria-expanded", "true");
                            this._setDropdownPosition();
                            if (this.activeItem) ;
                            this._bindDropdownListeners();
                            this.dropdownArrow.classList.add("iti__arrow--up");
                            this._trigger("open:countrydropdown");
                        }
                    }, {
                        key: "_toggleClass",
                        value: function _toggleClass(el, className, shouldHaveClass) {
                            if (shouldHaveClass && !el.classList.contains(className)) el.classList.add(className); else if (!shouldHaveClass && el.classList.contains(className)) el.classList.remove(className);
                        }
                    }, {
                        key: "_setDropdownPosition",
                        value: function _setDropdownPosition() {
                            var _this8 = this;
                            if (this.options.dropdownContainer) this.options.dropdownContainer.appendChild(this.dropdown);
                            if (!this.isMobile) {
                                var pos = this.telInput.getBoundingClientRect();
                                var windowTop = window.pageYOffset || document.documentElement.scrollTop;
                                var inputTop = pos.top + windowTop;
                                var dropdownHeight = this.countryList.offsetHeight;
                                var dropdownFitsBelow = inputTop + this.telInput.offsetHeight + dropdownHeight < windowTop + window.innerHeight;
                                var dropdownFitsAbove = inputTop - dropdownHeight > windowTop;
                                this._toggleClass(this.countryList, "iti__country-list--dropup", !dropdownFitsBelow && dropdownFitsAbove);
                                if (this.options.dropdownContainer) {
                                    var extraTop = !dropdownFitsBelow && dropdownFitsAbove ? 0 : this.telInput.offsetHeight;
                                    this.dropdown.style.top = "".concat(inputTop + extraTop, "px");
                                    this.dropdown.style.left = "".concat(pos.left + document.body.scrollLeft, "px");
                                    this._handleWindowScroll = function() {
                                        return _this8._closeDropdown();
                                    };
                                    window.addEventListener("scroll", this._handleWindowScroll);
                                }
                            }
                        }
                    }, {
                        key: "_getClosestListItem",
                        value: function _getClosestListItem(target) {
                            var el = target;
                            while (el && el !== this.countryList && !el.classList.contains("iti__country")) el = el.parentNode;
                            return el === this.countryList ? null : el;
                        }
                    }, {
                        key: "_bindDropdownListeners",
                        value: function _bindDropdownListeners() {
                            var _this9 = this;
                            this._handleMouseoverCountryList = function(e) {
                                var listItem = _this9._getClosestListItem(e.target);
                                if (listItem) _this9._highlightListItem(listItem, false);
                            };
                            this.countryList.addEventListener("mouseover", this._handleMouseoverCountryList);
                            this._handleClickCountryList = function(e) {
                                var listItem = _this9._getClosestListItem(e.target);
                                if (listItem) _this9._selectListItem(listItem);
                            };
                            this.countryList.addEventListener("click", this._handleClickCountryList);
                            var isOpening = true;
                            this._handleClickOffToClose = function(e) {
                                if (!isOpening && "intlTel-search" != e.target.id) _this9._closeDropdown();
                                isOpening = false;
                            };
                            document.documentElement.addEventListener("click", this._handleClickOffToClose);
                            this._handleKeydownOnDropdown = function(e) {
                                if ("ArrowUp" === e.key || "Up" === e.key || "ArrowDown" === e.key || "Down" === e.key) _this9._handleUpDownKey(e.key); else if ("Enter" === e.key) _this9._handleEnterKey(); else if ("Escape" === e.key) _this9._closeDropdown(); else if ("intlTel-search" == e.target.id) _this9._searchForCountry(e.target.value);
                            };
                            document.addEventListener("keyup", this._handleKeydownOnDropdown);
                        }
                    }, {
                        key: "_handleUpDownKey",
                        value: function _handleUpDownKey(key) {
                            var next = "ArrowUp" === key || "Up" === key ? this.highlightedItem.previousElementSibling : this.highlightedItem.nextElementSibling;
                            if (next) {
                                if (next.classList.contains("iti__divider")) next = "ArrowUp" === key || "Up" === key ? next.previousElementSibling : next.nextElementSibling;
                                this._highlightListItem(next, true);
                            }
                        }
                    }, {
                        key: "_handleEnterKey",
                        value: function _handleEnterKey() {
                            if (this.highlightedItem) this._selectListItem(this.highlightedItem);
                        }
                    }, {
                        key: "_searchForCountry",
                        value: function _searchForCountry(query) {
                            const boxes = this.countryList.querySelectorAll("li.iti__country");
                            boxes.forEach((box => {
                                if (query.length > 0) box.classList.add("hidden"); else box.classList.remove("hidden");
                            }));
                            for (var i = 0; i < this.countries.length; i++) {
                                console.log(this.countries[i].name);
                                if (this.countries[i].name.toLowerCase().includes(query.toLowerCase()) || this._startsWith(this.countries[i].dialCode, query.replace("+", ""))) {
                                    var listItem = this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(this.countries[i].iso2));
                                    listItem.classList.remove("hidden");
                                }
                            }
                        }
                    }, {
                        key: "_startsWith",
                        value: function _startsWith(a, b) {
                            return a.substr(0, b.length).toLowerCase() === b;
                        }
                    }, {
                        key: "_updateValFromNumber",
                        value: function _updateValFromNumber(originalNumber) {
                            var number = originalNumber;
                            if (this.options.formatOnDisplay && window.intlTelInputUtils && this.selectedCountryData) {
                                var useNational = this.options.nationalMode || "+" !== number.charAt(0) && !this.options.separateDialCode;
                                var _intlTelInputUtils$nu = intlTelInputUtils.numberFormat, NATIONAL = _intlTelInputUtils$nu.NATIONAL, INTERNATIONAL = _intlTelInputUtils$nu.INTERNATIONAL;
                                var format = useNational ? NATIONAL : INTERNATIONAL;
                                number = intlTelInputUtils.formatNumber(number, this.selectedCountryData.iso2, format);
                            }
                            number = this._beforeSetNumber(number);
                            this.telInput.value = number;
                        }
                    }, {
                        key: "_updateFlagFromNumber",
                        value: function _updateFlagFromNumber(originalNumber) {
                            var number = originalNumber;
                            var selectedDialCode = this.selectedCountryData.dialCode;
                            var isNanp = "1" === selectedDialCode;
                            if (number && isNanp && "+" !== number.charAt(0)) {
                                if ("1" !== number.charAt(0)) number = "1".concat(number);
                                number = "+".concat(number);
                            }
                            if (this.options.separateDialCode && selectedDialCode && "+" !== number.charAt(0)) number = "+".concat(selectedDialCode).concat(number);
                            var dialCode = this._getDialCode(number, true);
                            var numeric = this._getNumeric(number);
                            var countryCode = null;
                            if (dialCode) {
                                var countryCodes = this.countryCodes[this._getNumeric(dialCode)];
                                var alreadySelected = -1 !== countryCodes.indexOf(this.selectedCountryData.iso2) && numeric.length <= dialCode.length - 1;
                                var isRegionlessNanpNumber = "1" === selectedDialCode && this._isRegionlessNanp(numeric);
                                if (!isRegionlessNanpNumber && !alreadySelected) for (var j = 0; j < countryCodes.length; j++) if (countryCodes[j]) {
                                    countryCode = countryCodes[j];
                                    break;
                                }
                            } else if ("+" === number.charAt(0) && numeric.length) countryCode = ""; else if (!number || "+" === number) countryCode = this.defaultCountry;
                            if (null !== countryCode) return this._setFlag(countryCode);
                            return false;
                        }
                    }, {
                        key: "_isRegionlessNanp",
                        value: function _isRegionlessNanp(number) {
                            var numeric = this._getNumeric(number);
                            if ("1" === numeric.charAt(0)) {
                                var areaCode = numeric.substr(1, 3);
                                return -1 !== regionlessNanpNumbers.indexOf(areaCode);
                            }
                            return false;
                        }
                    }, {
                        key: "_highlightListItem",
                        value: function _highlightListItem(listItem, shouldFocus) {
                            var prevItem = this.highlightedItem;
                            if (prevItem) prevItem.classList.remove("iti__highlight");
                            this.highlightedItem = listItem;
                            this.highlightedItem.classList.add("iti__highlight");
                            this.selectedFlag.setAttribute("aria-activedescendant", listItem.getAttribute("id"));
                            if (shouldFocus) this.highlightedItem.focus();
                        }
                    }, {
                        key: "_getCountryData",
                        value: function _getCountryData(countryCode, ignoreOnlyCountriesOption, allowFail) {
                            var countryList = ignoreOnlyCountriesOption ? allCountries : this.countries;
                            for (var i = 0; i < countryList.length; i++) if (countryList[i].iso2 === countryCode) return countryList[i];
                            if (allowFail) return null;
                            throw new Error("No country data for '".concat(countryCode, "'"));
                        }
                    }, {
                        key: "_setFlag",
                        value: function _setFlag(countryCode) {
                            var prevCountry = this.selectedCountryData.iso2 ? this.selectedCountryData : {};
                            this.selectedCountryData = countryCode ? this._getCountryData(countryCode, false, false) : {};
                            if (this.selectedCountryData.iso2) this.defaultCountry = this.selectedCountryData.iso2;
                            if (this.options.showFlags) this.selectedFlagInner.setAttribute("class", "iti__flag iti__".concat(countryCode));
                            if (this.selectedFlag) {
                                var title = countryCode ? "".concat(this.selectedCountryData.name, ": +").concat(this.selectedCountryData.dialCode) : "Unknown";
                                this.selectedFlag.setAttribute("title", title);
                            }
                            if (this.options.separateDialCode) {
                                var dialCode = this.selectedCountryData.dialCode ? "+".concat(this.selectedCountryData.dialCode) : "";
                                this.selectedDialCode.innerHTML = dialCode;
                                var selectedFlagWidth = this.selectedFlag.offsetWidth || this._getHiddenSelectedFlagWidth();
                                this.telInput.style.paddingLeft = "".concat(selectedFlagWidth + 6, "px");
                            }
                            this._updatePlaceholder();
                            if (this.options.allowDropdown) {
                                var prevItem = this.activeItem;
                                if (prevItem) {
                                    prevItem.classList.remove("iti__active");
                                    prevItem.setAttribute("aria-selected", "false");
                                }
                                if (countryCode) {
                                    var nextItem = this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(countryCode, "-preferred")) || this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(countryCode));
                                    nextItem.setAttribute("aria-selected", "true");
                                    nextItem.classList.add("iti__active");
                                    this.activeItem = nextItem;
                                }
                            }
                            return prevCountry.iso2 !== countryCode;
                        }
                    }, {
                        key: "_getHiddenSelectedFlagWidth",
                        value: function _getHiddenSelectedFlagWidth() {
                            var containerClone = this.telInput.parentNode.cloneNode();
                            containerClone.style.visibility = "hidden";
                            document.body.appendChild(containerClone);
                            var flagsContainerClone = this.flagsContainer.cloneNode();
                            containerClone.appendChild(flagsContainerClone);
                            var selectedFlagClone = this.selectedFlag.cloneNode(true);
                            flagsContainerClone.appendChild(selectedFlagClone);
                            var width = selectedFlagClone.offsetWidth;
                            containerClone.parentNode.removeChild(containerClone);
                            return width;
                        }
                    }, {
                        key: "_updatePlaceholder",
                        value: function _updatePlaceholder() {
                            var shouldSetPlaceholder = "aggressive" === this.options.autoPlaceholder || !this.hadInitialPlaceholder && "polite" === this.options.autoPlaceholder;
                            if (window.intlTelInputUtils && shouldSetPlaceholder) {
                                var numberType = intlTelInputUtils.numberType[this.options.placeholderNumberType];
                                var placeholder = this.selectedCountryData.iso2 ? intlTelInputUtils.getExampleNumber(this.selectedCountryData.iso2, this.options.nationalMode, numberType) : "";
                                placeholder = this._beforeSetNumber(placeholder);
                                if ("function" === typeof this.options.customPlaceholder) placeholder = this.options.customPlaceholder(placeholder, this.selectedCountryData);
                                this.telInput.setAttribute("placeholder", placeholder);
                            }
                        }
                    }, {
                        key: "_selectListItem",
                        value: function _selectListItem(listItem) {
                            var flagChanged = this._setFlag(listItem.getAttribute("data-country-code"));
                            this._closeDropdown();
                            this._updateDialCode(listItem.getAttribute("data-dial-code"));
                            this.telInput.focus();
                            var len = this.telInput.value.length;
                            this.telInput.setSelectionRange(len, len);
                            if (flagChanged) this._triggerCountryChange();
                        }
                    }, {
                        key: "_closeDropdown",
                        value: function _closeDropdown() {
                            this.countryList.classList.add("iti__hide");
                            this.selectedFlag.setAttribute("aria-expanded", "false");
                            this.selectedFlag.removeAttribute("aria-activedescendant");
                            this.dropdownArrow.classList.remove("iti__arrow--up");
                            document.removeEventListener("keyup", this._handleKeydownOnDropdown);
                            document.getElementById("intlTel-search").value = "";
                            const boxes = this.countryList.querySelectorAll("li.iti__country");
                            boxes.forEach((box => {
                                box.classList.remove("hidden");
                            }));
                            document.documentElement.removeEventListener("click", this._handleClickOffToClose);
                            this.countryList.removeEventListener("mouseover", this._handleMouseoverCountryList);
                            this.countryList.removeEventListener("click", this._handleClickCountryList);
                            if (this.options.dropdownContainer) {
                                if (!this.isMobile) window.removeEventListener("scroll", this._handleWindowScroll);
                                if (this.dropdown.parentNode) this.dropdown.parentNode.removeChild(this.dropdown);
                            }
                            this._trigger("close:countrydropdown");
                        }
                    }, {
                        key: "_scrollTo",
                        value: function _scrollTo(element, middle) {
                            var container = this.countryList;
                            var windowTop = window.pageYOffset || document.documentElement.scrollTop;
                            var containerHeight = container.offsetHeight;
                            var containerTop = container.getBoundingClientRect().top + windowTop;
                            var containerBottom = containerTop + containerHeight;
                            var elementHeight = element.offsetHeight;
                            var elementTop = element.getBoundingClientRect().top + windowTop;
                            var elementBottom = elementTop + elementHeight;
                            var newScrollTop = elementTop - containerTop + container.scrollTop;
                            var middleOffset = containerHeight - elementHeight;
                            if (elementTop < containerTop) {
                                if (middle) newScrollTop -= middleOffset;
                                container.scrollTop = newScrollTop;
                            } else if (elementBottom > containerBottom) {
                                if (middle) newScrollTop += middleOffset;
                                var heightDifference = containerHeight - elementHeight;
                                container.scrollTop = newScrollTop - heightDifference;
                            }
                        }
                    }, {
                        key: "_updateDialCode",
                        value: function _updateDialCode(newDialCodeBare) {
                            var inputVal = this.telInput.value;
                            var newDialCode = "+".concat(newDialCodeBare);
                            var newNumber;
                            if ("+" === inputVal.charAt(0)) {
                                var prevDialCode = this._getDialCode(inputVal);
                                if (prevDialCode) newNumber = inputVal.replace(prevDialCode, newDialCode); else newNumber = newDialCode;
                                this.telInput.value = newNumber;
                            } else if (this.options.autoInsertDialCode) {
                                if (inputVal) newNumber = newDialCode + inputVal; else newNumber = newDialCode;
                                this.telInput.value = newNumber;
                            }
                        }
                    }, {
                        key: "_getDialCode",
                        value: function _getDialCode(number, includeAreaCode) {
                            var dialCode = "";
                            if ("+" === number.charAt(0)) {
                                var numericChars = "";
                                for (var i = 0; i < number.length; i++) {
                                    var c = number.charAt(i);
                                    if (!isNaN(parseInt(c, 10))) {
                                        numericChars += c;
                                        if (includeAreaCode) {
                                            if (this.countryCodes[numericChars]) dialCode = number.substr(0, i + 1);
                                        } else if (this.dialCodes[numericChars]) {
                                            dialCode = number.substr(0, i + 1);
                                            break;
                                        }
                                        if (numericChars.length === this.countryCodeMaxLen) break;
                                    }
                                }
                            }
                            return dialCode;
                        }
                    }, {
                        key: "_getFullNumber",
                        value: function _getFullNumber() {
                            var val = this.telInput.value.trim();
                            var dialCode = this.selectedCountryData.dialCode;
                            var prefix;
                            var numericVal = this._getNumeric(val);
                            if (this.options.separateDialCode && "+" !== val.charAt(0) && dialCode && numericVal) prefix = "+".concat(dialCode); else prefix = "";
                            return prefix + val;
                        }
                    }, {
                        key: "_beforeSetNumber",
                        value: function _beforeSetNumber(originalNumber) {
                            var number = originalNumber;
                            if (this.options.separateDialCode) {
                                var dialCode = this._getDialCode(number);
                                if (dialCode) {
                                    dialCode = "+".concat(this.selectedCountryData.dialCode);
                                    var start = " " === number[dialCode.length] || "-" === number[dialCode.length] ? dialCode.length + 1 : dialCode.length;
                                    number = number.substr(start);
                                }
                            }
                            return this._cap(number);
                        }
                    }, {
                        key: "_triggerCountryChange",
                        value: function _triggerCountryChange() {
                            this._trigger("countrychange");
                        }
                    }, {
                        key: "handleAutoCountry",
                        value: function handleAutoCountry() {
                            if ("auto" === this.options.initialCountry) {
                                this.defaultCountry = window.intlTelInputGlobals.autoCountry;
                                if (!this.telInput.value) this.setCountry(this.defaultCountry);
                                this.resolveAutoCountryPromise();
                            }
                        }
                    }, {
                        key: "handleUtils",
                        value: function handleUtils() {
                            if (window.intlTelInputUtils) {
                                if (this.telInput.value) this._updateValFromNumber(this.telInput.value);
                                this._updatePlaceholder();
                            }
                            this.resolveUtilsScriptPromise();
                        }
                    }, {
                        key: "destroy",
                        value: function destroy() {
                            var form = this.telInput.form;
                            if (this.options.allowDropdown) {
                                this._closeDropdown();
                                this.selectedFlag.removeEventListener("click", this._handleClickSelectedFlag);
                                this.flagsContainer.removeEventListener("keydown", this._handleFlagsContainerKeydown);
                                var label = this._getClosestLabel();
                                if (label) label.removeEventListener("click", this._handleLabelClick);
                            }
                            if (this.hiddenInput && form) form.removeEventListener("submit", this._handleHiddenInputSubmit);
                            if (this.options.autoInsertDialCode) {
                                if (form) form.removeEventListener("submit", this._handleSubmitOrBlurEvent);
                                this.telInput.removeEventListener("blur", this._handleSubmitOrBlurEvent);
                            }
                            this.telInput.removeEventListener("keyup", this._handleKeyupEvent);
                            this.telInput.removeEventListener("cut", this._handleClipboardEvent);
                            this.telInput.removeEventListener("paste", this._handleClipboardEvent);
                            this.telInput.removeAttribute("data-intl-tel-input-id");
                            var wrapper = this.telInput.parentNode;
                            wrapper.parentNode.insertBefore(this.telInput, wrapper);
                            wrapper.parentNode.removeChild(wrapper);
                            delete window.intlTelInputGlobals.instances[this.id];
                        }
                    }, {
                        key: "getExtension",
                        value: function getExtension() {
                            if (window.intlTelInputUtils) return intlTelInputUtils.getExtension(this._getFullNumber(), this.selectedCountryData.iso2);
                            return "";
                        }
                    }, {
                        key: "getNumber",
                        value: function getNumber(format) {
                            if (window.intlTelInputUtils) {
                                var iso2 = this.selectedCountryData.iso2;
                                return intlTelInputUtils.formatNumber(this._getFullNumber(), iso2, format);
                            }
                            return "";
                        }
                    }, {
                        key: "getNumberType",
                        value: function getNumberType() {
                            if (window.intlTelInputUtils) return intlTelInputUtils.getNumberType(this._getFullNumber(), this.selectedCountryData.iso2);
                            return -99;
                        }
                    }, {
                        key: "getSelectedCountryData",
                        value: function getSelectedCountryData() {
                            return this.selectedCountryData;
                        }
                    }, {
                        key: "getValidationError",
                        value: function getValidationError() {
                            if (window.intlTelInputUtils) {
                                var iso2 = this.selectedCountryData.iso2;
                                return intlTelInputUtils.getValidationError(this._getFullNumber(), iso2);
                            }
                            return -99;
                        }
                    }, {
                        key: "isValidNumber",
                        value: function isValidNumber() {
                            var val = this._getFullNumber().trim();
                            return window.intlTelInputUtils ? intlTelInputUtils.isValidNumber(val, this.selectedCountryData.iso2) : null;
                        }
                    }, {
                        key: "setCountry",
                        value: function setCountry(originalCountryCode) {
                            var countryCode = originalCountryCode.toLowerCase();
                            if (this.selectedCountryData.iso2 !== countryCode) {
                                this._setFlag(countryCode);
                                this._updateDialCode(this.selectedCountryData.dialCode);
                                this._triggerCountryChange();
                            }
                        }
                    }, {
                        key: "setNumber",
                        value: function setNumber(number) {
                            var flagChanged = this._updateFlagFromNumber(number);
                            this._updateValFromNumber(number);
                            if (flagChanged) this._triggerCountryChange();
                        }
                    }, {
                        key: "setPlaceholderNumberType",
                        value: function setPlaceholderNumberType(type) {
                            this.options.placeholderNumberType = type;
                            this._updatePlaceholder();
                        }
                    } ]);
                    return Iti;
                }();
                intlTelInputGlobals.getCountryData = function() {
                    return allCountries;
                };
                var injectScript = function injectScript(path, handleSuccess, handleFailure) {
                    var script = document.createElement("script");
                    script.onload = function() {
                        forEachInstance("handleUtils");
                        if (handleSuccess) handleSuccess();
                    };
                    script.onerror = function() {
                        forEachInstance("rejectUtilsScriptPromise");
                        if (handleFailure) handleFailure();
                    };
                    script.className = "iti-load-utils";
                    script.async = true;
                    script.src = path;
                    document.body.appendChild(script);
                };
                intlTelInputGlobals.loadUtils = function(path) {
                    if (!window.intlTelInputUtils && !window.intlTelInputGlobals.startedLoadingUtilsScript) {
                        window.intlTelInputGlobals.startedLoadingUtilsScript = true;
                        if ("undefined" !== typeof Promise) return new Promise((function(resolve, reject) {
                            return injectScript(path, resolve, reject);
                        }));
                        injectScript(path);
                    }
                    return null;
                };
                intlTelInputGlobals.defaults = defaults;
                intlTelInputGlobals.version = "18.1.5";
                return function(input, options) {
                    var iti = new Iti(input, options);
                    iti._init();
                    input.setAttribute("data-intl-tel-input-id", iti.id);
                    window.intlTelInputGlobals.instances[iti.id] = iti;
                    return iti;
                };
            }();
        }));
        const input = document.querySelector("#phone");
        const iti = intlTelInput(input, {
            nationalMode: false,
            formatOnDisplay: true,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.2/js/utils.js",
            preferredCountries: [ "ua", "us" ]
        });
        const input2 = document.querySelector("#phone_2");
        const iti2 = intlTelInput(input2, {
            nationalMode: false,
            formatOnDisplay: true,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.2/js/utils.js",
            preferredCountries: [ "ua", "us" ]
        });
        input.addEventListener("countrychange", (function() {
            var selectedCountryData = iti.getSelectedCountryData();
            var newPlaceholder = intlTelInputUtils.getExampleNumber(selectedCountryData.iso2, false, intlTelInputUtils.numberFormat.INTERNATIONAL);
            iti.setNumber("");
            var index_space = newPlaceholder.indexOf(" ");
            var phone_2 = newPlaceholder.slice(index_space);
            var phone_1 = newPlaceholder.substr(0, index_space);
            var mask = phone_1 + phone_2.replace(/[0-9]/g, "*");
            var im = new Inputmask({
                alias: "phone",
                mask
            });
            im.mask(input);
        }));
        input2.addEventListener("countrychange", (function() {
            var selectedCountryData = iti2.getSelectedCountryData();
            var newPlaceholder = intlTelInputUtils.getExampleNumber(selectedCountryData.iso2, false, intlTelInputUtils.numberFormat.INTERNATIONAL);
            iti2.setNumber("");
            var index_space = newPlaceholder.indexOf(" ");
            var phone_2 = newPlaceholder.slice(index_space);
            var phone_1 = newPlaceholder.substr(0, index_space);
            var mask = phone_1 + phone_2.replace(/[0-9]/g, "*");
            var im = new Inputmask({
                alias: "phone",
                mask
            });
            im.mask(input2);
        }));
        iti.promise.then((function() {
            input.dispatchEvent(new Event("countrychange"));
        }));
        iti2.promise.then((function() {
            input2.dispatchEvent(new Event("countrychange"));
        }));
        Inputmask.extendAliases({
            phone: {
                autoUnmask: true,
                clearIncomplete: false,
                allowPlus: true,
                allowMinus: false
            }
        });
        let formNameInput = document.getElementById("formName");
        formNameInput.addEventListener("keydown", (function(e) {
            if (e.key.match(/^[а-я][А-ЯёЁ][a-z][A-Z]+$/)) return e.preventDefault();
        }));
        formNameInput.addEventListener("input", (function(e) {
            formNameInput.value = formNameInput.value.replace(/[\d\~\!\@\#\$\%\^\&\*\(\)\+\_\=\+\[\]\,\.\<\>\/\?\|\\\"\;\:]/g, "");
        }));
        formNameInput.addEventListener("input", (function(e) {
            formNameInput.value = formNameInput.value.replace(/^[а-я][А-ЯёЁ][a-z][A-Z]+$/g, "");
        }));
        let formNameInputOne = document.getElementById("formName-1");
        formNameInputOne.addEventListener("keydown", (function(e) {
            if (e.key.match(/^[а-я][А-ЯёЁ][a-z][A-Z]+$/)) return e.preventDefault();
        }));
        formNameInputOne.addEventListener("input", (function(e) {
            formNameInputOne.value = formNameInputOne.value.replace(/[\d\~\!\@\#\$\%\^\&\*\(\)\+\_\=\+\[\]\,\.\<\>\/\?\|\\\"\;\:]/g, "");
        }));
        formNameInputOne.addEventListener("input", (function(e) {
            formNameInput.value = formNameInput.value.replace(/^[а-я][А-ЯёЁ][a-z][A-Z]+$/g, "");
        }));
        if (window.matchMedia("(max-width: 480px)").matches) {
            const customBlockScroll = document.querySelector(".custom-first .custom__anim");
            const optionsBlockScroll = document.querySelector(".options__btns");
            if (customBlockScroll) {
                customBlockScroll.style.justifyContent = "flex-end";
                setTimeout((() => {
                    customBlockScroll.style.justifyContent = "normal";
                }), 200);
            }
            if (optionsBlockScroll) {
                optionsBlockScroll.style.justifyContent = "center";
                setTimeout((() => {
                    optionsBlockScroll.style.justifyContent = "normal";
                }), 200);
            }
        }
        var product__body = document.querySelector(".product__body");
        product__body.addEventListener("wheel", (function(event) {
            if (event.wheelDelta > 0) product__body.scrollLeft -= 50; else product__body.scrollLeft += 50;
            var maxScroll = product__body.scrollWidth - product__body.clientWidth;
            if (product__body.scrollLeft > 0 && product__body.scrollLeft < maxScroll) {
                event.preventDefault();
                event.stopPropagation();
            }
        }), false);
        window["FLS"] = true;
        isWebp();
        addTouchClass();
        addLoadedClass();
        menuInit();
        fullVHfix();
        tabs();
        formFieldsInit({
            viewPass: false,
            autoHeight: false
        });
        formSubmit();
    })();
})();