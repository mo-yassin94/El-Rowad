﻿/*
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function () {
	window.CKEDITOR && window.CKEDITOR.dom || (window.CKEDITOR || (window.CKEDITOR = function () {
			var a = /(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i,
				e = {
					timestamp: "IA8F",
					version: "4.11.1 (Full)",
					revision: "c264cac",
					rnd: Math.floor(900 * Math.random()) + 100,
					_: {
						pending: [],
						basePathSrcPattern: a
					},
					status: "unloaded",
					basePath: function () {
						var c = window.CKEDITOR_BASEPATH || "";
						if (!c)
							for (var b = document.getElementsByTagName("script"), e = 0; e < b.length; e++) {
								var f = b[e].src.match(a);
								if (f) {
									c = f[1];
									break
								}
							} - 1 == c.indexOf(":/") && "//" !=
							c.slice(0, 2) && (c = 0 === c.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + c : location.href.match(/^[^\?]*\/(?:)/)[0] + c);
						if (!c) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
						return c
					}(),
					getUrl: function (a) {
						-1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a);
						this.timestamp && "/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a) && (a += (0 <= a.indexOf("?") ? "\x26" : "?") + "t\x3d" + this.timestamp);
						return a
					},
					domReady: function () {
						function a() {
							try {
								document.addEventListener ? (document.removeEventListener("DOMContentLoaded", a, !1), c()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), c())
							} catch (f) {}
						}

						function c() {
							for (var a; a = b.shift();) a()
						}
						var b = [];
						return function (f) {
							function c() {
								try {
									document.documentElement.doScroll("left")
								} catch (h) {
									setTimeout(c, 1);
									return
								}
								a()
							}
							b.push(f);
							"complete" === document.readyState && setTimeout(a, 1);
							if (1 == b.length)
								if (document.addEventListener) document.addEventListener("DOMContentLoaded",
									a, !1), window.addEventListener("load", a, !1);
								else if (document.attachEvent) {
								document.attachEvent("onreadystatechange", a);
								window.attachEvent("onload", a);
								f = !1;
								try {
									f = !window.frameElement
								} catch (m) {}
								document.documentElement.doScroll && f && c()
							}
						}
					}()
				},
				b = window.CKEDITOR_GETURL;
			if (b) {
				var c = e.getUrl;
				e.getUrl = function (a) {
					return b.call(e, a) || c.call(e, a)
				}
			}
			return e
		}()), CKEDITOR.event || (CKEDITOR.event = function () {}, CKEDITOR.event.implementOn = function (a) {
				var e = CKEDITOR.event.prototype,
					b;
				for (b in e) null == a[b] && (a[b] = e[b])
			},
			CKEDITOR.event.prototype = function () {
				function a(a) {
					var g = e(this);
					return g[a] || (g[a] = new b(a))
				}
				var e = function (a) {
						a = a.getPrivate && a.getPrivate() || a._ || (a._ = {});
						return a.events || (a.events = {})
					},
					b = function (a) {
						this.name = a;
						this.listeners = []
					};
				b.prototype = {
					getListenerIndex: function (a) {
						for (var b = 0, e = this.listeners; b < e.length; b++)
							if (e[b].fn == a) return b;
						return -1
					}
				};
				return {
					define: function (c, b) {
						var e = a.call(this, c);
						CKEDITOR.tools.extend(e, b, !0)
					},
					on: function (c, b, e, k, f) {
						function d(a, h, n, f) {
							a = {
								name: c,
								sender: this,
								editor: a,
								data: h,
								listenerData: k,
								stop: n,
								cancel: f,
								removeListener: m
							};
							return !1 === b.call(e, a) ? !1 : a.data
						}

						function m() {
							n.removeListener(c, b)
						}
						var h = a.call(this, c);
						if (0 > h.getListenerIndex(b)) {
							h = h.listeners;
							e || (e = this);
							isNaN(f) && (f = 10);
							var n = this;
							d.fn = b;
							d.priority = f;
							for (var p = h.length - 1; 0 <= p; p--)
								if (h[p].priority <= f) return h.splice(p + 1, 0, d), {
									removeListener: m
								};
							h.unshift(d)
						}
						return {
							removeListener: m
						}
					},
					once: function () {
						var a = Array.prototype.slice.call(arguments),
							b = a[1];
						a[1] = function (a) {
							a.removeListener();
							return b.apply(this,
								arguments)
						};
						return this.on.apply(this, a)
					},
					capture: function () {
						CKEDITOR.event.useCapture = 1;
						var a = this.on.apply(this, arguments);
						CKEDITOR.event.useCapture = 0;
						return a
					},
					fire: function () {
						var a = 0,
							b = function () {
								a = 1
							},
							l = 0,
							k = function () {
								l = 1
							};
						return function (f, d, m) {
							var h = e(this)[f];
							f = a;
							var n = l;
							a = l = 0;
							if (h) {
								var p = h.listeners;
								if (p.length)
									for (var p = p.slice(0), q, y = 0; y < p.length; y++) {
										if (h.errorProof) try {
											q = p[y].call(this, m, d, b, k)
										} catch (u) {} else q = p[y].call(this, m, d, b, k);
										!1 === q ? l = 1 : "undefined" != typeof q && (d = q);
										if (a || l) break
									}
							}
							d =
								l ? !1 : "undefined" == typeof d ? !0 : d;
							a = f;
							l = n;
							return d
						}
					}(),
					fireOnce: function (a, b, l) {
						b = this.fire(a, b, l);
						delete e(this)[a];
						return b
					},
					removeListener: function (a, b) {
						var l = e(this)[a];
						if (l) {
							var k = l.getListenerIndex(b);
							0 <= k && l.listeners.splice(k, 1)
						}
					},
					removeAllListeners: function () {
						var a = e(this),
							b;
						for (b in a) delete a[b]
					},
					hasListeners: function (a) {
						return (a = e(this)[a]) && 0 < a.listeners.length
					}
				}
			}()), CKEDITOR.editor || (CKEDITOR.editor = function () {
				CKEDITOR._.pending.push([this, arguments]);
				CKEDITOR.event.call(this)
			}, CKEDITOR.editor.prototype.fire =
			function (a, e) {
				a in {
					instanceReady: 1,
					loaded: 1
				} && (this[a] = !0);
				return CKEDITOR.event.prototype.fire.call(this, a, e, this)
			}, CKEDITOR.editor.prototype.fireOnce = function (a, e) {
				a in {
					instanceReady: 1,
					loaded: 1
				} && (this[a] = !0);
				return CKEDITOR.event.prototype.fireOnce.call(this, a, e, this)
			}, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype)), CKEDITOR.env || (CKEDITOR.env = function () {
			var a = navigator.userAgent.toLowerCase(),
				e = a.match(/edge[ \/](\d+.?\d*)/),
				b = -1 < a.indexOf("trident/"),
				b = !(!e && !b),
				b = {
					ie: b,
					edge: !!e,
					webkit: !b &&
						-1 < a.indexOf(" applewebkit/"),
					air: -1 < a.indexOf(" adobeair/"),
					mac: -1 < a.indexOf("macintosh"),
					quirks: "BackCompat" == document.compatMode && (!document.documentMode || 10 > document.documentMode),
					mobile: -1 < a.indexOf("mobile"),
					iOS: /(ipad|iphone|ipod)/.test(a),
					isCustomDomain: function () {
						if (!this.ie) return !1;
						var a = document.domain,
							b = window.location.hostname;
						return a != b && a != "[" + b + "]"
					},
					secure: "https:" == location.protocol
				};
			b.gecko = "Gecko" == navigator.product && !b.webkit && !b.ie;
			b.webkit && (-1 < a.indexOf("chrome") ? b.chrome = !0 : b.safari = !0);
			var c = 0;
			b.ie && (c = e ? parseFloat(e[1]) : b.quirks || !document.documentMode ? parseFloat(a.match(/msie (\d+)/)[1]) : document.documentMode, b.ie9Compat = 9 == c, b.ie8Compat = 8 == c, b.ie7Compat = 7 == c, b.ie6Compat = 7 > c || b.quirks);
			b.gecko && (e = a.match(/rv:([\d\.]+)/)) && (e = e[1].split("."), c = 1E4 * e[0] + 100 * (e[1] || 0) + 1 * (e[2] || 0));
			b.air && (c = parseFloat(a.match(/ adobeair\/(\d+)/)[1]));
			b.webkit && (c = parseFloat(a.match(/ applewebkit\/(\d+)/)[1]));
			b.version = c;
			b.isCompatible = !(b.ie && 7 > c) && !(b.gecko && 4E4 > c) && !(b.webkit &&
				534 > c);
			b.hidpi = 2 <= window.devicePixelRatio;
			b.needsBrFiller = b.gecko || b.webkit || b.ie && 10 < c;
			b.needsNbspFiller = b.ie && 11 > c;
			b.cssClass = "cke_browser_" + (b.ie ? "ie" : b.gecko ? "gecko" : b.webkit ? "webkit" : "unknown");
			b.quirks && (b.cssClass += " cke_browser_quirks");
			b.ie && (b.cssClass += " cke_browser_ie" + (b.quirks ? "6 cke_browser_iequirks" : b.version));
			b.air && (b.cssClass += " cke_browser_air");
			b.iOS && (b.cssClass += " cke_browser_ios");
			b.hidpi && (b.cssClass += " cke_hidpi");
			return b
		}()), "unloaded" == CKEDITOR.status && function () {
			CKEDITOR.event.implementOn(CKEDITOR);
			CKEDITOR.loadFullCore = function () {
				if ("basic_ready" != CKEDITOR.status) CKEDITOR.loadFullCore._load = 1;
				else {
					delete CKEDITOR.loadFullCore;
					var a = document.createElement("script");
					a.type = "text/javascript";
					a.src = CKEDITOR.basePath + "ckeditor.js";
					document.getElementsByTagName("head")[0].appendChild(a)
				}
			};
			CKEDITOR.loadFullCoreTimeout = 0;
			CKEDITOR.add = function (a) {
				(this._.pending || (this._.pending = [])).push(a)
			};
			(function () {
				CKEDITOR.domReady(function () {
					var a = CKEDITOR.loadFullCore,
						e = CKEDITOR.loadFullCoreTimeout;
					a && (CKEDITOR.status =
						"basic_ready", a && a._load ? a() : e && setTimeout(function () {
							CKEDITOR.loadFullCore && CKEDITOR.loadFullCore()
						}, 1E3 * e))
				})
			})();
			CKEDITOR.status = "basic_loaded"
		}(), "use strict", CKEDITOR.VERBOSITY_WARN = 1, CKEDITOR.VERBOSITY_ERROR = 2, CKEDITOR.verbosity = CKEDITOR.VERBOSITY_WARN | CKEDITOR.VERBOSITY_ERROR, CKEDITOR.warn = function (a, e) {
			CKEDITOR.verbosity & CKEDITOR.VERBOSITY_WARN && CKEDITOR.fire("log", {
				type: "warn",
				errorCode: a,
				additionalData: e
			})
		}, CKEDITOR.error = function (a, e) {
			CKEDITOR.verbosity & CKEDITOR.VERBOSITY_ERROR && CKEDITOR.fire("log", {
				type: "error",
				errorCode: a,
				additionalData: e
			})
		}, CKEDITOR.on("log", function (a) {
			if (window.console && window.console.log) {
				var e = console[a.data.type] ? a.data.type : "log",
					b = a.data.errorCode;
				if (a = a.data.additionalData) console[e]("[CKEDITOR] Error code: " + b + ".", a);
				else console[e]("[CKEDITOR] Error code: " + b + ".");
				console[e]("[CKEDITOR] For more information about this error go to https://ckeditor.com/docs/ckeditor4/latest/guide/dev_errors.html#" + b)
			}
		}, null, null, 999), CKEDITOR.dom = {}, function () {
			function a(a, h, f) {
				this._minInterval =
					a;
				this._context = f;
				this._lastOutput = this._scheduledTimer = 0;
				this._output = CKEDITOR.tools.bind(h, f || {});
				var d = this;
				this.input = function () {
					function a() {
						d._lastOutput = (new Date).getTime();
						d._scheduledTimer = 0;
						d._call()
					}
					if (!d._scheduledTimer || !1 !== d._reschedule()) {
						var h = (new Date).getTime() - d._lastOutput;
						h < d._minInterval ? d._scheduledTimer = setTimeout(a, d._minInterval - h) : a()
					}
				}
			}

			function e(h, f, d) {
				a.call(this, h, f, d);
				this._args = [];
				var b = this;
				this.input = CKEDITOR.tools.override(this.input, function (a) {
					return function () {
						b._args =
							Array.prototype.slice.call(arguments);
						a.call(this)
					}
				})
			}
			var b = [],
				c = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.ie ? "-ms-" : "",
				g = /&/g,
				l = />/g,
				k = /</g,
				f = /"/g,
				d = /&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g,
				m = {
					lt: "\x3c",
					gt: "\x3e",
					amp: "\x26",
					quot: '"',
					nbsp: " ",
					shy: "­"
				},
				h = function (a, h) {
					return "#" == h[0] ? String.fromCharCode(parseInt(h.slice(1), 10)) : m[h]
				};
			CKEDITOR.on("reset", function () {
				b = []
			});
			CKEDITOR.tools = {
				arrayCompare: function (a, h) {
					if (!a && !h) return !0;
					if (!a || !h || a.length != h.length) return !1;
					for (var f = 0; f < a.length; f++)
						if (a[f] != h[f]) return !1;
					return !0
				},
				getIndex: function (a, h) {
					for (var f = 0; f < a.length; ++f)
						if (h(a[f])) return f;
					return -1
				},
				clone: function (a) {
					var h;
					if (a && a instanceof Array) {
						h = [];
						for (var f = 0; f < a.length; f++) h[f] = CKEDITOR.tools.clone(a[f]);
						return h
					}
					if (null === a || "object" != typeof a || a instanceof String || a instanceof Number || a instanceof Boolean || a instanceof Date || a instanceof RegExp || a.nodeType || a.window === a) return a;
					h = new a.constructor;
					for (f in a) h[f] = CKEDITOR.tools.clone(a[f]);
					return h
				},
				capitalize: function (a, h) {
					return a.charAt(0).toUpperCase() + (h ? a.slice(1) : a.slice(1).toLowerCase())
				},
				extend: function (a) {
					var h = arguments.length,
						f, d;
					"boolean" == typeof (f = arguments[h - 1]) ? h-- : "boolean" == typeof (f = arguments[h - 2]) && (d = arguments[h - 1], h -= 2);
					for (var b = 1; b < h; b++) {
						var c = arguments[b],
							m;
						for (m in c)
							if (!0 === f || null == a[m])
								if (!d || m in d) a[m] = c[m]
					}
					return a
				},
				prototypedCopy: function (a) {
					var h = function () {};
					h.prototype = a;
					return new h
				},
				copy: function (a) {
					var h = {},
						f;
					for (f in a) h[f] = a[f];
					return h
				},
				isArray: function (a) {
					return "[object Array]" ==
						Object.prototype.toString.call(a)
				},
				isEmpty: function (a) {
					for (var h in a)
						if (a.hasOwnProperty(h)) return !1;
					return !0
				},
				cssVendorPrefix: function (a, h, f) {
					if (f) return c + a + ":" + h + ";" + a + ":" + h;
					f = {};
					f[a] = h;
					f[c + a] = h;
					return f
				},
				cssStyleToDomStyle: function () {
					var a = document.createElement("div").style,
						h = "undefined" != typeof a.cssFloat ? "cssFloat" : "undefined" != typeof a.styleFloat ? "styleFloat" : "float";
					return function (a) {
						return "float" == a ? h : a.replace(/-./g, function (a) {
							return a.substr(1).toUpperCase()
						})
					}
				}(),
				buildStyleHtml: function (a) {
					a = [].concat(a);
					for (var h, f = [], d = 0; d < a.length; d++)
						if (h = a[d]) /@import|[{}]/.test(h) ? f.push("\x3cstyle\x3e" + h + "\x3c/style\x3e") : f.push('\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' + h + '"\x3e');
					return f.join("")
				},
				htmlEncode: function (a) {
					return void 0 === a || null === a ? "" : String(a).replace(g, "\x26amp;").replace(l, "\x26gt;").replace(k, "\x26lt;")
				},
				htmlDecode: function (a) {
					return a.replace(d, h)
				},
				htmlEncodeAttr: function (a) {
					return CKEDITOR.tools.htmlEncode(a).replace(f, "\x26quot;")
				},
				htmlDecodeAttr: function (a) {
					return CKEDITOR.tools.htmlDecode(a)
				},
				transformPlainTextToHtml: function (a, h) {
					var f = h == CKEDITOR.ENTER_BR,
						d = this.htmlEncode(a.replace(/\r\n/g, "\n")),
						d = d.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;"),
						b = h == CKEDITOR.ENTER_P ? "p" : "div";
					if (!f) {
						var c = /\n{2}/g;
						if (c.test(d)) var m = "\x3c" + b + "\x3e",
							g = "\x3c/" + b + "\x3e",
							d = m + d.replace(c, function () {
								return g + m
							}) + g
					}
					d = d.replace(/\n/g, "\x3cbr\x3e");
					f || (d = d.replace(new RegExp("\x3cbr\x3e(?\x3d\x3c/" + b + "\x3e)"), function (a) {
						return CKEDITOR.tools.repeat(a, 2)
					}));
					d = d.replace(/^ | $/g, "\x26nbsp;");
					return d = d.replace(/(>|\s) /g,
						function (a, h) {
							return h + "\x26nbsp;"
						}).replace(/ (?=<)/g, "\x26nbsp;")
				},
				getNextNumber: function () {
					var a = 0;
					return function () {
						return ++a
					}
				}(),
				getNextId: function () {
					return "cke_" + this.getNextNumber()
				},
				getUniqueId: function () {
					for (var a = "e", h = 0; 8 > h; h++) a += Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
					return a
				},
				override: function (a, h) {
					var f = h(a);
					f.prototype = a.prototype;
					return f
				},
				setTimeout: function (a, h, f, d, b) {
					b || (b = window);
					f || (f = b);
					return b.setTimeout(function () {
							d ? a.apply(f, [].concat(d)) : a.apply(f)
						},
						h || 0)
				},
				throttle: function (a, h, f) {
					return new this.buffers.throttle(a, h, f)
				},
				trim: function () {
					var a = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
					return function (h) {
						return h.replace(a, "")
					}
				}(),
				ltrim: function () {
					var a = /^[ \t\n\r]+/g;
					return function (h) {
						return h.replace(a, "")
					}
				}(),
				rtrim: function () {
					var a = /[ \t\n\r]+$/g;
					return function (h) {
						return h.replace(a, "")
					}
				}(),
				indexOf: function (a, h) {
					if ("function" == typeof h)
						for (var f = 0, d = a.length; f < d; f++) {
							if (h(a[f])) return f
						} else {
							if (a.indexOf) return a.indexOf(h);
							f = 0;
							for (d = a.length; f <
								d; f++)
								if (a[f] === h) return f
						}
					return -1
				},
				search: function (a, h) {
					var f = CKEDITOR.tools.indexOf(a, h);
					return 0 <= f ? a[f] : null
				},
				bind: function (a, h) {
					return function () {
						return a.apply(h, arguments)
					}
				},
				createClass: function (a) {
					var h = a.$,
						f = a.base,
						d = a.privates || a._,
						b = a.proto;
					a = a.statics;
					!h && (h = function () {
						f && this.base.apply(this, arguments)
					});
					if (d) var c = h,
						h = function () {
							var a = this._ || (this._ = {}),
								h;
							for (h in d) {
								var f = d[h];
								a[h] = "function" == typeof f ? CKEDITOR.tools.bind(f, this) : f
							}
							c.apply(this, arguments)
						};
					f && (h.prototype = this.prototypedCopy(f.prototype),
						h.prototype.constructor = h, h.base = f, h.baseProto = f.prototype, h.prototype.base = function () {
							this.base = f.prototype.base;
							f.apply(this, arguments);
							this.base = arguments.callee
						});
					b && this.extend(h.prototype, b, !0);
					a && this.extend(h, a, !0);
					return h
				},
				addFunction: function (a, h) {
					return b.push(function () {
						return a.apply(h || this, arguments)
					}) - 1
				},
				removeFunction: function (a) {
					b[a] = null
				},
				callFunction: function (a) {
					var h = b[a];
					return h && h.apply(window, Array.prototype.slice.call(arguments, 1))
				},
				cssLength: function () {
					var a = /^-?\d+\.?\d*px$/,
						h;
					return function (f) {
						h = CKEDITOR.tools.trim(f + "") + "px";
						return a.test(h) ? h : f || ""
					}
				}(),
				convertToPx: function () {
					var a;
					return function (h) {
						a || (a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"\x3e\x3c/div\x3e', CKEDITOR.document), CKEDITOR.document.getBody().append(a));
						if (!/%$/.test(h)) {
							var f = 0 > parseFloat(h);
							f && (h = h.replace("-", ""));
							a.setStyle("width", h);
							h = a.$.clientWidth;
							return f ? -h : h
						}
						return h
					}
				}(),
				repeat: function (a, h) {
					return Array(h +
						1).join(a)
				},
				tryThese: function () {
					for (var a, h = 0, f = arguments.length; h < f; h++) {
						var d = arguments[h];
						try {
							a = d();
							break
						} catch (b) {}
					}
					return a
				},
				genKey: function () {
					return Array.prototype.slice.call(arguments).join("-")
				},
				defer: function (a) {
					return function () {
						var h = arguments,
							f = this;
						window.setTimeout(function () {
							a.apply(f, h)
						}, 0)
					}
				},
				normalizeCssText: function (a, h) {
					var f = [],
						d, b = CKEDITOR.tools.parseCssText(a, !0, h);
					for (d in b) f.push(d + ":" + b[d]);
					f.sort();
					return f.length ? f.join(";") + ";" : ""
				},
				convertRgbToHex: function (a) {
					return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi,
						function (a, h, f, d) {
							a = [h, f, d];
							for (h = 0; 3 > h; h++) a[h] = ("0" + parseInt(a[h], 10).toString(16)).slice(-2);
							return "#" + a.join("")
						})
				},
				normalizeHex: function (a) {
					return a.replace(/#(([0-9a-f]{3}){1,2})($|;|\s+)/gi, function (a, h, f, d) {
						a = h.toLowerCase();
						3 == a.length && (a = a.split(""), a = [a[0], a[0], a[1], a[1], a[2], a[2]].join(""));
						return "#" + a + d
					})
				},
				parseCssText: function (a, h, f) {
					var d = {};
					f && (a = (new CKEDITOR.dom.element("span")).setAttribute("style", a).getAttribute("style") || "");
					a && (a = CKEDITOR.tools.normalizeHex(CKEDITOR.tools.convertRgbToHex(a)));
					if (!a || ";" == a) return d;
					a.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (a, f, b) {
						h && (f = f.toLowerCase(), "font-family" == f && (b = b.replace(/\s*,\s*/g, ",")), b = CKEDITOR.tools.trim(b));
						d[f] = b
					});
					return d
				},
				writeCssText: function (a, h) {
					var f, d = [];
					for (f in a) d.push(f + ":" + a[f]);
					h && d.sort();
					return d.join("; ")
				},
				objectCompare: function (a, h, f) {
					var d;
					if (!a && !h) return !0;
					if (!a || !h) return !1;
					for (d in a)
						if (a[d] != h[d]) return !1;
					if (!f)
						for (d in h)
							if (a[d] != h[d]) return !1;
					return !0
				},
				objectKeys: function (a) {
					var h = [],
						f;
					for (f in a) h.push(f);
					return h
				},
				convertArrayToObject: function (a, h) {
					var f = {};
					1 == arguments.length && (h = !0);
					for (var d = 0, b = a.length; d < b; ++d) f[a[d]] = h;
					return f
				},
				fixDomain: function () {
					for (var a;;) try {
						a = window.parent.document.domain;
						break
					} catch (h) {
						a = a ? a.replace(/.+?(?:\.|$)/, "") : document.domain;
						if (!a) break;
						document.domain = a
					}
					return !!a
				},
				eventsBuffer: function (a, h, f) {
					return new this.buffers.event(a, h, f)
				},
				enableHtml5Elements: function (a, h) {
					for (var f = "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video".split(" "),
							d = f.length, b; d--;) b = a.createElement(f[d]), h && a.appendChild(b)
				},
				checkIfAnyArrayItemMatches: function (a, h) {
					for (var f = 0, d = a.length; f < d; ++f)
						if (a[f].match(h)) return !0;
					return !1
				},
				checkIfAnyObjectPropertyMatches: function (a, h) {
					for (var f in a)
						if (f.match(h)) return !0;
					return !1
				},
				keystrokeToString: function (a, h) {
					var f = this.keystrokeToArray(a, h);
					f.display = f.display.join("+");
					f.aria = f.aria.join("+");
					return f
				},
				keystrokeToArray: function (a, h) {
					var f = h & 16711680,
						d = h & 65535,
						b = CKEDITOR.env.mac,
						c = [],
						m = [];
					f & CKEDITOR.CTRL && (c.push(b ?
						"⌘" : a[17]), m.push(b ? a[224] : a[17]));
					f & CKEDITOR.ALT && (c.push(b ? "⌥" : a[18]), m.push(a[18]));
					f & CKEDITOR.SHIFT && (c.push(b ? "⇧" : a[16]), m.push(a[16]));
					d && (a[d] ? (c.push(a[d]), m.push(a[d])) : (c.push(String.fromCharCode(d)), m.push(String.fromCharCode(d))));
					return {
						display: c,
						aria: m
					}
				},
				transparentImageData: "data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw\x3d\x3d",
				getCookie: function (a) {
					a = a.toLowerCase();
					for (var h = document.cookie.split(";"), f, d, b = 0; b < h.length; b++)
						if (f = h[b].split("\x3d"),
							d = decodeURIComponent(CKEDITOR.tools.trim(f[0]).toLowerCase()), d === a) return decodeURIComponent(1 < f.length ? f[1] : "");
					return null
				},
				setCookie: function (a, h) {
					document.cookie = encodeURIComponent(a) + "\x3d" + encodeURIComponent(h) + ";path\x3d/"
				},
				getCsrfToken: function () {
					var a = CKEDITOR.tools.getCookie("ckCsrfToken");
					if (!a || 40 != a.length) {
						var a = [],
							h = "";
						if (window.crypto && window.crypto.getRandomValues) a = new Uint8Array(40), window.crypto.getRandomValues(a);
						else
							for (var f = 0; 40 > f; f++) a.push(Math.floor(256 * Math.random()));
						for (f = 0; f < a.length; f++) var d = "abcdefghijklmnopqrstuvwxyz0123456789".charAt(a[f] % 36),
							h = h + (.5 < Math.random() ? d.toUpperCase() : d);
						a = h;
						CKEDITOR.tools.setCookie("ckCsrfToken", a)
					}
					return a
				},
				escapeCss: function (a) {
					return a ? window.CSS && CSS.escape ? CSS.escape(a) : isNaN(parseInt(a.charAt(0), 10)) ? a : "\\3" + a.charAt(0) + " " + a.substring(1, a.length) : ""
				},
				getMouseButton: function (a) {
					var h = (a = a.data) && a.$;
					return a && h ? CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? 4 === h.button ? CKEDITOR.MOUSE_BUTTON_MIDDLE : 1 === h.button ? CKEDITOR.MOUSE_BUTTON_LEFT :
						CKEDITOR.MOUSE_BUTTON_RIGHT : h.button : !1
				},
				convertHexStringToBytes: function (a) {
					var h = [],
						f = a.length / 2,
						d;
					for (d = 0; d < f; d++) h.push(parseInt(a.substr(2 * d, 2), 16));
					return h
				},
				convertBytesToBase64: function (a) {
					var h = "",
						f = a.length,
						d;
					for (d = 0; d < f; d += 3) {
						var b = a.slice(d, d + 3),
							c = b.length,
							m = [],
							g;
						if (3 > c)
							for (g = c; 3 > g; g++) b[g] = 0;
						m[0] = (b[0] & 252) >> 2;
						m[1] = (b[0] & 3) << 4 | b[1] >> 4;
						m[2] = (b[1] & 15) << 2 | (b[2] & 192) >> 6;
						m[3] = b[2] & 63;
						for (g = 0; 4 > g; g++) h = g <= c ? h + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(m[g]) : h +
							"\x3d"
					}
					return h
				},
				style: {
					parse: {
						_colors: {
							aliceblue: "#F0F8FF",
							antiquewhite: "#FAEBD7",
							aqua: "#00FFFF",
							aquamarine: "#7FFFD4",
							azure: "#F0FFFF",
							beige: "#F5F5DC",
							bisque: "#FFE4C4",
							black: "#000000",
							blanchedalmond: "#FFEBCD",
							blue: "#0000FF",
							blueviolet: "#8A2BE2",
							brown: "#A52A2A",
							burlywood: "#DEB887",
							cadetblue: "#5F9EA0",
							chartreuse: "#7FFF00",
							chocolate: "#D2691E",
							coral: "#FF7F50",
							cornflowerblue: "#6495ED",
							cornsilk: "#FFF8DC",
							crimson: "#DC143C",
							cyan: "#00FFFF",
							darkblue: "#00008B",
							darkcyan: "#008B8B",
							darkgoldenrod: "#B8860B",
							darkgray: "#A9A9A9",
							darkgreen: "#006400",
							darkgrey: "#A9A9A9",
							darkkhaki: "#BDB76B",
							darkmagenta: "#8B008B",
							darkolivegreen: "#556B2F",
							darkorange: "#FF8C00",
							darkorchid: "#9932CC",
							darkred: "#8B0000",
							darksalmon: "#E9967A",
							darkseagreen: "#8FBC8F",
							darkslateblue: "#483D8B",
							darkslategray: "#2F4F4F",
							darkslategrey: "#2F4F4F",
							darkturquoise: "#00CED1",
							darkviolet: "#9400D3",
							deeppink: "#FF1493",
							deepskyblue: "#00BFFF",
							dimgray: "#696969",
							dimgrey: "#696969",
							dodgerblue: "#1E90FF",
							firebrick: "#B22222",
							floralwhite: "#FFFAF0",
							forestgreen: "#228B22",
							fuchsia: "#FF00FF",
							gainsboro: "#DCDCDC",
							ghostwhite: "#F8F8FF",
							gold: "#FFD700",
							goldenrod: "#DAA520",
							gray: "#808080",
							green: "#008000",
							greenyellow: "#ADFF2F",
							grey: "#808080",
							honeydew: "#F0FFF0",
							hotpink: "#FF69B4",
							indianred: "#CD5C5C",
							indigo: "#4B0082",
							ivory: "#FFFFF0",
							khaki: "#F0E68C",
							lavender: "#E6E6FA",
							lavenderblush: "#FFF0F5",
							lawngreen: "#7CFC00",
							lemonchiffon: "#FFFACD",
							lightblue: "#ADD8E6",
							lightcoral: "#F08080",
							lightcyan: "#E0FFFF",
							lightgoldenrodyellow: "#FAFAD2",
							lightgray: "#D3D3D3",
							lightgreen: "#90EE90",
							lightgrey: "#D3D3D3",
							lightpink: "#FFB6C1",
							lightsalmon: "#FFA07A",
							lightseagreen: "#20B2AA",
							lightskyblue: "#87CEFA",
							lightslategray: "#778899",
							lightslategrey: "#778899",
							lightsteelblue: "#B0C4DE",
							lightyellow: "#FFFFE0",
							lime: "#00FF00",
							limegreen: "#32CD32",
							linen: "#FAF0E6",
							magenta: "#FF00FF",
							maroon: "#800000",
							mediumaquamarine: "#66CDAA",
							mediumblue: "#0000CD",
							mediumorchid: "#BA55D3",
							mediumpurple: "#9370DB",
							mediumseagreen: "#3CB371",
							mediumslateblue: "#7B68EE",
							mediumspringgreen: "#00FA9A",
							mediumturquoise: "#48D1CC",
							mediumvioletred: "#C71585",
							midnightblue: "#191970",
							mintcream: "#F5FFFA",
							mistyrose: "#FFE4E1",
							moccasin: "#FFE4B5",
							navajowhite: "#FFDEAD",
							navy: "#000080",
							oldlace: "#FDF5E6",
							olive: "#808000",
							olivedrab: "#6B8E23",
							orange: "#FFA500",
							orangered: "#FF4500",
							orchid: "#DA70D6",
							palegoldenrod: "#EEE8AA",
							palegreen: "#98FB98",
							paleturquoise: "#AFEEEE",
							palevioletred: "#DB7093",
							papayawhip: "#FFEFD5",
							peachpuff: "#FFDAB9",
							peru: "#CD853F",
							pink: "#FFC0CB",
							plum: "#DDA0DD",
							powderblue: "#B0E0E6",
							purple: "#800080",
							rebeccapurple: "#663399",
							red: "#FF0000",
							rosybrown: "#BC8F8F",
							royalblue: "#4169E1",
							saddlebrown: "#8B4513",
							salmon: "#FA8072",
							sandybrown: "#F4A460",
							seagreen: "#2E8B57",
							seashell: "#FFF5EE",
							sienna: "#A0522D",
							silver: "#C0C0C0",
							skyblue: "#87CEEB",
							slateblue: "#6A5ACD",
							slategray: "#708090",
							slategrey: "#708090",
							snow: "#FFFAFA",
							springgreen: "#00FF7F",
							steelblue: "#4682B4",
							tan: "#D2B48C",
							teal: "#008080",
							thistle: "#D8BFD8",
							tomato: "#FF6347",
							turquoise: "#40E0D0",
							violet: "#EE82EE",
							wheat: "#F5DEB3",
							white: "#FFFFFF",
							whitesmoke: "#F5F5F5",
							yellow: "#FFFF00",
							yellowgreen: "#9ACD32"
						},
						_borderStyle: "none hidden dotted dashed solid double groove ridge inset outset".split(" "),
						_widthRegExp: /^(thin|medium|thick|[\+-]?\d+(\.\d+)?[a-z%]+|[\+-]?0+(\.0+)?|\.\d+[a-z%]+)$/,
						_rgbaRegExp: /rgba?\(\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*(?:,\s*[0-9.]+\s*)?\)/gi,
						_hslaRegExp: /hsla?\(\s*[0-9.]+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[0-9.]+\s*)?\)/gi,
						background: function (a) {
							var h = {},
								f = this._findColor(a);
							f.length && (h.color = f[0], CKEDITOR.tools.array.forEach(f, function (h) {
								a = a.replace(h, "")
							}));
							if (a = CKEDITOR.tools.trim(a)) h.unprocessed = a;
							return h
						},
						margin: function (a) {
							function h(a) {
								f.top = d[a[0]];
								f.right =
									d[a[1]];
								f.bottom = d[a[2]];
								f.left = d[a[3]]
							}
							var f = {},
								d = a.match(/(?:\-?[\.\d]+(?:%|\w*)|auto|inherit|initial|unset)/g) || ["0px"];
							switch (d.length) {
								case 1:
									h([0, 0, 0, 0]);
									break;
								case 2:
									h([0, 1, 0, 1]);
									break;
								case 3:
									h([0, 1, 2, 1]);
									break;
								case 4:
									h([0, 1, 2, 3])
							}
							return f
						},
						border: function (a) {
							var h = {},
								f = a.split(/\s+/g);
							a = CKEDITOR.tools.style.parse._findColor(a);
							a.length && (h.color = a[0]);
							CKEDITOR.tools.array.forEach(f, function (a) {
								h.style || -1 === CKEDITOR.tools.indexOf(CKEDITOR.tools.style.parse._borderStyle, a) ? !h.width && CKEDITOR.tools.style.parse._widthRegExp.test(a) &&
									(h.width = a) : h.style = a
							});
							return h
						},
						_findColor: function (a) {
							var h = [],
								f = CKEDITOR.tools.array,
								h = h.concat(a.match(this._rgbaRegExp) || []),
								h = h.concat(a.match(this._hslaRegExp) || []);
							return h = h.concat(f.filter(a.split(/\s+/), function (a) {
								return a.match(/^\#[a-f0-9]{3}(?:[a-f0-9]{3})?$/gi) ? !0 : a.toLowerCase() in CKEDITOR.tools.style.parse._colors
							}))
						}
					}
				},
				array: {
					filter: function (a, h, f) {
						var d = [];
						this.forEach(a, function (b, c) {
							h.call(f, b, c, a) && d.push(b)
						});
						return d
					},
					forEach: function (a, h, f) {
						var d = a.length,
							b;
						for (b = 0; b < d; b++) h.call(f,
							a[b], b, a)
					},
					map: function (a, h, f) {
						for (var d = [], b = 0; b < a.length; b++) d.push(h.call(f, a[b], b, a));
						return d
					},
					reduce: function (a, h, f, d) {
						for (var b = 0; b < a.length; b++) f = h.call(d, f, a[b], b, a);
						return f
					},
					every: function (a, h, f) {
						if (!a.length) return !0;
						h = this.filter(a, h, f);
						return a.length === h.length
					}
				},
				object: {
					findKey: function (a, h) {
						if ("object" !== typeof a) return null;
						for (var f in a)
							if (a[f] === h) return f;
						return null
					},
					merge: function (a, h) {
						var f = CKEDITOR.tools,
							d = f.clone(a),
							b = f.clone(h);
						f.array.forEach(f.objectKeys(b), function (a) {
							d[a] =
								"object" === typeof b[a] && "object" === typeof d[a] ? f.object.merge(d[a], b[a]) : b[a]
						});
						return d
					}
				},
				getAbsoluteRectPosition: function (a, h) {
					function f(a) {
						if (a) {
							var h = a.getClientRect();
							d.top += h.top;
							d.left += h.left;
							"x" in d && "y" in d && (d.x += h.x, d.y += h.y);
							f(a.getWindow().getFrame())
						}
					}
					var d = CKEDITOR.tools.copy(h);
					f(a.getFrame());
					var b = CKEDITOR.document.getWindow().getScrollPosition();
					d.top += b.y;
					d.left += b.x;
					"x" in d && "y" in d && (d.y += b.y, d.x += b.x);
					d.right = d.left + d.width;
					d.bottom = d.top + d.height;
					return d
				}
			};
			a.prototype = {
				reset: function () {
					this._lastOutput =
						0;
					this._clearTimer()
				},
				_reschedule: function () {
					return !1
				},
				_call: function () {
					this._output()
				},
				_clearTimer: function () {
					this._scheduledTimer && clearTimeout(this._scheduledTimer);
					this._scheduledTimer = 0
				}
			};
			e.prototype = CKEDITOR.tools.prototypedCopy(a.prototype);
			e.prototype._reschedule = function () {
				this._scheduledTimer && this._clearTimer()
			};
			e.prototype._call = function () {
				this._output.apply(this._context, this._args)
			};
			CKEDITOR.tools.buffers = {};
			CKEDITOR.tools.buffers.event = a;
			CKEDITOR.tools.buffers.throttle = e;
			CKEDITOR.tools.array.indexOf =
				CKEDITOR.tools.indexOf;
			CKEDITOR.tools.array.isArray = CKEDITOR.tools.isArray;
			CKEDITOR.MOUSE_BUTTON_LEFT = 0;
			CKEDITOR.MOUSE_BUTTON_MIDDLE = 1;
			CKEDITOR.MOUSE_BUTTON_RIGHT = 2
		}(), CKEDITOR.dtd = function () {
			var a = CKEDITOR.tools.extend,
				e = function (a, h) {
					for (var f = CKEDITOR.tools.clone(a), d = 1; d < arguments.length; d++) {
						h = arguments[d];
						for (var b in h) delete f[b]
					}
					return f
				},
				b = {},
				c = {},
				g = {
					address: 1,
					article: 1,
					aside: 1,
					blockquote: 1,
					details: 1,
					div: 1,
					dl: 1,
					fieldset: 1,
					figure: 1,
					footer: 1,
					form: 1,
					h1: 1,
					h2: 1,
					h3: 1,
					h4: 1,
					h5: 1,
					h6: 1,
					header: 1,
					hgroup: 1,
					hr: 1,
					main: 1,
					menu: 1,
					nav: 1,
					ol: 1,
					p: 1,
					pre: 1,
					section: 1,
					table: 1,
					ul: 1
				},
				l = {
					command: 1,
					link: 1,
					meta: 1,
					noscript: 1,
					script: 1,
					style: 1
				},
				k = {},
				f = {
					"#": 1
				},
				d = {
					center: 1,
					dir: 1,
					noframes: 1
				};
			a(b, {
				a: 1,
				abbr: 1,
				area: 1,
				audio: 1,
				b: 1,
				bdi: 1,
				bdo: 1,
				br: 1,
				button: 1,
				canvas: 1,
				cite: 1,
				code: 1,
				command: 1,
				datalist: 1,
				del: 1,
				dfn: 1,
				em: 1,
				embed: 1,
				i: 1,
				iframe: 1,
				img: 1,
				input: 1,
				ins: 1,
				kbd: 1,
				keygen: 1,
				label: 1,
				map: 1,
				mark: 1,
				meter: 1,
				noscript: 1,
				object: 1,
				output: 1,
				progress: 1,
				q: 1,
				ruby: 1,
				s: 1,
				samp: 1,
				script: 1,
				select: 1,
				small: 1,
				span: 1,
				strong: 1,
				sub: 1,
				sup: 1,
				textarea: 1,
				time: 1,
				u: 1,
				"var": 1,
				video: 1,
				wbr: 1
			}, f, {
				acronym: 1,
				applet: 1,
				basefont: 1,
				big: 1,
				font: 1,
				isindex: 1,
				strike: 1,
				style: 1,
				tt: 1
			});
			a(c, g, b, d);
			e = {
				a: e(b, {
					a: 1,
					button: 1
				}),
				abbr: b,
				address: c,
				area: k,
				article: c,
				aside: c,
				audio: a({
					source: 1,
					track: 1
				}, c),
				b: b,
				base: k,
				bdi: b,
				bdo: b,
				blockquote: c,
				body: c,
				br: k,
				button: e(b, {
					a: 1,
					button: 1
				}),
				canvas: b,
				caption: c,
				cite: b,
				code: b,
				col: k,
				colgroup: {
					col: 1
				},
				command: k,
				datalist: a({
					option: 1
				}, b),
				dd: c,
				del: b,
				details: a({
					summary: 1
				}, c),
				dfn: b,
				div: c,
				dl: {
					dt: 1,
					dd: 1
				},
				dt: c,
				em: b,
				embed: k,
				fieldset: a({
					legend: 1
				}, c),
				figcaption: c,
				figure: a({
						figcaption: 1
					},
					c),
				footer: c,
				form: c,
				h1: b,
				h2: b,
				h3: b,
				h4: b,
				h5: b,
				h6: b,
				head: a({
					title: 1,
					base: 1
				}, l),
				header: c,
				hgroup: {
					h1: 1,
					h2: 1,
					h3: 1,
					h4: 1,
					h5: 1,
					h6: 1
				},
				hr: k,
				html: a({
					head: 1,
					body: 1
				}, c, l),
				i: b,
				iframe: f,
				img: k,
				input: k,
				ins: b,
				kbd: b,
				keygen: k,
				label: b,
				legend: b,
				li: c,
				link: k,
				main: c,
				map: c,
				mark: b,
				menu: a({
					li: 1
				}, c),
				meta: k,
				meter: e(b, {
					meter: 1
				}),
				nav: c,
				noscript: a({
					link: 1,
					meta: 1,
					style: 1
				}, b),
				object: a({
					param: 1
				}, b),
				ol: {
					li: 1
				},
				optgroup: {
					option: 1
				},
				option: f,
				output: b,
				p: b,
				param: k,
				pre: b,
				progress: e(b, {
					progress: 1
				}),
				q: b,
				rp: b,
				rt: b,
				ruby: a({
					rp: 1,
					rt: 1
				}, b),
				s: b,
				samp: b,
				script: f,
				section: c,
				select: {
					optgroup: 1,
					option: 1
				},
				small: b,
				source: k,
				span: b,
				strong: b,
				style: f,
				sub: b,
				summary: a({
					h1: 1,
					h2: 1,
					h3: 1,
					h4: 1,
					h5: 1,
					h6: 1
				}, b),
				sup: b,
				table: {
					caption: 1,
					colgroup: 1,
					thead: 1,
					tfoot: 1,
					tbody: 1,
					tr: 1
				},
				tbody: {
					tr: 1
				},
				td: c,
				textarea: f,
				tfoot: {
					tr: 1
				},
				th: c,
				thead: {
					tr: 1
				},
				time: e(b, {
					time: 1
				}),
				title: f,
				tr: {
					th: 1,
					td: 1
				},
				track: k,
				u: b,
				ul: {
					li: 1
				},
				"var": b,
				video: a({
					source: 1,
					track: 1
				}, c),
				wbr: k,
				acronym: b,
				applet: a({
					param: 1
				}, c),
				basefont: k,
				big: b,
				center: c,
				dialog: k,
				dir: {
					li: 1
				},
				font: b,
				isindex: k,
				noframes: c,
				strike: b,
				tt: b
			};
			a(e, {
				$block: a({
					audio: 1,
					dd: 1,
					dt: 1,
					figcaption: 1,
					li: 1,
					video: 1
				}, g, d),
				$blockLimit: {
					article: 1,
					aside: 1,
					audio: 1,
					body: 1,
					caption: 1,
					details: 1,
					dir: 1,
					div: 1,
					dl: 1,
					fieldset: 1,
					figcaption: 1,
					figure: 1,
					footer: 1,
					form: 1,
					header: 1,
					hgroup: 1,
					main: 1,
					menu: 1,
					nav: 1,
					ol: 1,
					section: 1,
					table: 1,
					td: 1,
					th: 1,
					tr: 1,
					ul: 1,
					video: 1
				},
				$cdata: {
					script: 1,
					style: 1
				},
				$editable: {
					address: 1,
					article: 1,
					aside: 1,
					blockquote: 1,
					body: 1,
					details: 1,
					div: 1,
					fieldset: 1,
					figcaption: 1,
					footer: 1,
					form: 1,
					h1: 1,
					h2: 1,
					h3: 1,
					h4: 1,
					h5: 1,
					h6: 1,
					header: 1,
					hgroup: 1,
					main: 1,
					nav: 1,
					p: 1,
					pre: 1,
					section: 1
				},
				$empty: {
					area: 1,
					base: 1,
					basefont: 1,
					br: 1,
					col: 1,
					command: 1,
					dialog: 1,
					embed: 1,
					hr: 1,
					img: 1,
					input: 1,
					isindex: 1,
					keygen: 1,
					link: 1,
					meta: 1,
					param: 1,
					source: 1,
					track: 1,
					wbr: 1
				},
				$inline: b,
				$list: {
					dl: 1,
					ol: 1,
					ul: 1
				},
				$listItem: {
					dd: 1,
					dt: 1,
					li: 1
				},
				$nonBodyContent: a({
					body: 1,
					head: 1,
					html: 1
				}, e.head),
				$nonEditable: {
					applet: 1,
					audio: 1,
					button: 1,
					embed: 1,
					iframe: 1,
					map: 1,
					object: 1,
					option: 1,
					param: 1,
					script: 1,
					textarea: 1,
					video: 1
				},
				$object: {
					applet: 1,
					audio: 1,
					button: 1,
					hr: 1,
					iframe: 1,
					img: 1,
					input: 1,
					object: 1,
					select: 1,
					table: 1,
					textarea: 1,
					video: 1
				},
				$removeEmpty: {
					abbr: 1,
					acronym: 1,
					b: 1,
					bdi: 1,
					bdo: 1,
					big: 1,
					cite: 1,
					code: 1,
					del: 1,
					dfn: 1,
					em: 1,
					font: 1,
					i: 1,
					ins: 1,
					label: 1,
					kbd: 1,
					mark: 1,
					meter: 1,
					output: 1,
					q: 1,
					ruby: 1,
					s: 1,
					samp: 1,
					small: 1,
					span: 1,
					strike: 1,
					strong: 1,
					sub: 1,
					sup: 1,
					time: 1,
					tt: 1,
					u: 1,
					"var": 1
				},
				$tabIndex: {
					a: 1,
					area: 1,
					button: 1,
					input: 1,
					object: 1,
					select: 1,
					textarea: 1
				},
				$tableContent: {
					caption: 1,
					col: 1,
					colgroup: 1,
					tbody: 1,
					td: 1,
					tfoot: 1,
					th: 1,
					thead: 1,
					tr: 1
				},
				$transparent: {
					a: 1,
					audio: 1,
					canvas: 1,
					del: 1,
					ins: 1,
					map: 1,
					noscript: 1,
					object: 1,
					video: 1
				},
				$intermediate: {
					caption: 1,
					colgroup: 1,
					dd: 1,
					dt: 1,
					figcaption: 1,
					legend: 1,
					li: 1,
					optgroup: 1,
					option: 1,
					rp: 1,
					rt: 1,
					summary: 1,
					tbody: 1,
					td: 1,
					tfoot: 1,
					th: 1,
					thead: 1,
					tr: 1
				}
			});
			return e
		}(), CKEDITOR.dom.event = function (a) {
			this.$ = a
		}, CKEDITOR.dom.event.prototype = {
			getKey: function () {
				return this.$.keyCode || this.$.which
			},
			getKeystroke: function () {
				var a = this.getKey();
				if (this.$.ctrlKey || this.$.metaKey) a += CKEDITOR.CTRL;
				this.$.shiftKey && (a += CKEDITOR.SHIFT);
				this.$.altKey && (a += CKEDITOR.ALT);
				return a
			},
			preventDefault: function (a) {
				var e = this.$;
				e.preventDefault ? e.preventDefault() : e.returnValue = !1;
				a && this.stopPropagation()
			},
			stopPropagation: function () {
				var a = this.$;
				a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
			},
			getTarget: function () {
				var a = this.$.target || this.$.srcElement;
				return a ? new CKEDITOR.dom.node(a) : null
			},
			getPhase: function () {
				return this.$.eventPhase || 2
			},
			getPageOffset: function () {
				var a = this.getTarget().getDocument().$;
				return {
					x: this.$.pageX || this.$.clientX + (a.documentElement.scrollLeft || a.body.scrollLeft),
					y: this.$.pageY || this.$.clientY + (a.documentElement.scrollTop || a.body.scrollTop)
				}
			}
		}, CKEDITOR.CTRL = 1114112,
		CKEDITOR.SHIFT = 2228224, CKEDITOR.ALT = 4456448, CKEDITOR.EVENT_PHASE_CAPTURING = 1, CKEDITOR.EVENT_PHASE_AT_TARGET = 2, CKEDITOR.EVENT_PHASE_BUBBLING = 3, CKEDITOR.dom.domObject = function (a) {
			a && (this.$ = a)
		}, CKEDITOR.dom.domObject.prototype = function () {
			var a = function (a, b) {
				return function (c) {
					"undefined" != typeof CKEDITOR && a.fire(b, new CKEDITOR.dom.event(c))
				}
			};
			return {
				getPrivate: function () {
					var a;
					(a = this.getCustomData("_")) || this.setCustomData("_", a = {});
					return a
				},
				on: function (e) {
					var b = this.getCustomData("_cke_nativeListeners");
					b || (b = {}, this.setCustomData("_cke_nativeListeners", b));
					b[e] || (b = b[e] = a(this, e), this.$.addEventListener ? this.$.addEventListener(e, b, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" + e, b));
					return CKEDITOR.event.prototype.on.apply(this, arguments)
				},
				removeListener: function (a) {
					CKEDITOR.event.prototype.removeListener.apply(this, arguments);
					if (!this.hasListeners(a)) {
						var b = this.getCustomData("_cke_nativeListeners"),
							c = b && b[a];
						c && (this.$.removeEventListener ? this.$.removeEventListener(a,
							c, !1) : this.$.detachEvent && this.$.detachEvent("on" + a, c), delete b[a])
					}
				},
				removeAllListeners: function () {
					var a = this.getCustomData("_cke_nativeListeners"),
						b;
					for (b in a) {
						var c = a[b];
						this.$.detachEvent ? this.$.detachEvent("on" + b, c) : this.$.removeEventListener && this.$.removeEventListener(b, c, !1);
						delete a[b]
					}
					CKEDITOR.event.prototype.removeAllListeners.call(this)
				}
			}
		}(),
		function (a) {
			var e = {};
			CKEDITOR.on("reset", function () {
				e = {}
			});
			a.equals = function (a) {
				try {
					return a && a.$ === this.$
				} catch (c) {
					return !1
				}
			};
			a.setCustomData = function (a,
				c) {
				var g = this.getUniqueId();
				(e[g] || (e[g] = {}))[a] = c;
				return this
			};
			a.getCustomData = function (a) {
				var c = this.$["data-cke-expando"];
				return (c = c && e[c]) && a in c ? c[a] : null
			};
			a.removeCustomData = function (a) {
				var c = this.$["data-cke-expando"],
					c = c && e[c],
					g, l;
				c && (g = c[a], l = a in c, delete c[a]);
				return l ? g : null
			};
			a.clearCustomData = function () {
				this.removeAllListeners();
				var a = this.$["data-cke-expando"];
				a && delete e[a]
			};
			a.getUniqueId = function () {
				return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber())
			};
			CKEDITOR.event.implementOn(a)
		}(CKEDITOR.dom.domObject.prototype), CKEDITOR.dom.node = function (a) {
			return a ? new CKEDITOR.dom[a.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : a.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : a.nodeType == CKEDITOR.NODE_TEXT ? "text" : a.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : a.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](a) : this
		}, CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject, CKEDITOR.NODE_ELEMENT = 1, CKEDITOR.NODE_DOCUMENT = 9, CKEDITOR.NODE_TEXT =
		3, CKEDITOR.NODE_COMMENT = 8, CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11, CKEDITOR.POSITION_IDENTICAL = 0, CKEDITOR.POSITION_DISCONNECTED = 1, CKEDITOR.POSITION_FOLLOWING = 2, CKEDITOR.POSITION_PRECEDING = 4, CKEDITOR.POSITION_IS_CONTAINED = 8, CKEDITOR.POSITION_CONTAINS = 16, CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
			appendTo: function (a, e) {
				a.append(this, e);
				return a
			},
			clone: function (a, e) {
				function b(c) {
					c["data-cke-expando"] && (c["data-cke-expando"] = !1);
					if (c.nodeType == CKEDITOR.NODE_ELEMENT || c.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
						if (e ||
							c.nodeType != CKEDITOR.NODE_ELEMENT || c.removeAttribute("id", !1), a) {
							c = c.childNodes;
							for (var g = 0; g < c.length; g++) b(c[g])
						}
				}

				function c(b) {
					if (b.type == CKEDITOR.NODE_ELEMENT || b.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
						if (b.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
							var g = b.getName();
							":" == g[0] && b.renameNode(g.substring(1))
						}
						if (a)
							for (g = 0; g < b.getChildCount(); g++) c(b.getChild(g))
					}
				}
				var g = this.$.cloneNode(a);
				b(g);
				g = new CKEDITOR.dom.node(g);
				CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (this.type == CKEDITOR.NODE_ELEMENT || this.type ==
					CKEDITOR.NODE_DOCUMENT_FRAGMENT) && c(g);
				return g
			},
			hasPrevious: function () {
				return !!this.$.previousSibling
			},
			hasNext: function () {
				return !!this.$.nextSibling
			},
			insertAfter: function (a) {
				a.$.parentNode.insertBefore(this.$, a.$.nextSibling);
				return a
			},
			insertBefore: function (a) {
				a.$.parentNode.insertBefore(this.$, a.$);
				return a
			},
			insertBeforeMe: function (a) {
				this.$.parentNode.insertBefore(a.$, this.$);
				return a
			},
			getAddress: function (a) {
				for (var e = [], b = this.getDocument().$.documentElement, c = this.$; c && c != b;) {
					var g = c.parentNode;
					g && e.unshift(this.getIndex.call({
						$: c
					}, a));
					c = g
				}
				return e
			},
			getDocument: function () {
				return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument)
			},
			getIndex: function (a) {
				function e(a, f) {
					var d = f ? a.nextSibling : a.previousSibling;
					return d && d.nodeType == CKEDITOR.NODE_TEXT ? b(d) ? e(d, f) : d : null
				}

				function b(a) {
					return !a.nodeValue || a.nodeValue == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE
				}
				var c = this.$,
					g = -1,
					l;
				if (!this.$.parentNode || a && c.nodeType == CKEDITOR.NODE_TEXT && b(c) && !e(c) && !e(c, !0)) return -1;
				do a && c != this.$ && c.nodeType == CKEDITOR.NODE_TEXT && (l || b(c)) || (g++, l = c.nodeType == CKEDITOR.NODE_TEXT); while (c = c.previousSibling);
				return g
			},
			getNextSourceNode: function (a, e, b) {
				if (b && !b.call) {
					var c = b;
					b = function (a) {
						return !a.equals(c)
					}
				}
				a = !a && this.getFirst && this.getFirst();
				var g;
				if (!a) {
					if (this.type == CKEDITOR.NODE_ELEMENT && b && !1 === b(this, !0)) return null;
					a = this.getNext()
				}
				for (; !a && (g = (g || this).getParent());) {
					if (b && !1 === b(g, !0)) return null;
					a = g.getNext()
				}
				return !a || b && !1 === b(a) ? null : e && e != a.type ? a.getNextSourceNode(!1,
					e, b) : a
			},
			getPreviousSourceNode: function (a, e, b) {
				if (b && !b.call) {
					var c = b;
					b = function (a) {
						return !a.equals(c)
					}
				}
				a = !a && this.getLast && this.getLast();
				var g;
				if (!a) {
					if (this.type == CKEDITOR.NODE_ELEMENT && b && !1 === b(this, !0)) return null;
					a = this.getPrevious()
				}
				for (; !a && (g = (g || this).getParent());) {
					if (b && !1 === b(g, !0)) return null;
					a = g.getPrevious()
				}
				return !a || b && !1 === b(a) ? null : e && a.type != e ? a.getPreviousSourceNode(!1, e, b) : a
			},
			getPrevious: function (a) {
				var e = this.$,
					b;
				do b = (e = e.previousSibling) && 10 != e.nodeType && new CKEDITOR.dom.node(e);
				while (b && a && !a(b));
				return b
			},
			getNext: function (a) {
				var e = this.$,
					b;
				do b = (e = e.nextSibling) && new CKEDITOR.dom.node(e); while (b && a && !a(b));
				return b
			},
			getParent: function (a) {
				var e = this.$.parentNode;
				return e && (e.nodeType == CKEDITOR.NODE_ELEMENT || a && e.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(e) : null
			},
			getParents: function (a) {
				var e = this,
					b = [];
				do b[a ? "push" : "unshift"](e); while (e = e.getParent());
				return b
			},
			getCommonAncestor: function (a) {
				if (a.equals(this)) return this;
				if (a.contains && a.contains(this)) return a;
				var e = this.contains ? this : this.getParent();
				do
					if (e.contains(a)) return e;
				while (e = e.getParent());
				return null
			},
			getPosition: function (a) {
				var e = this.$,
					b = a.$;
				if (e.compareDocumentPosition) return e.compareDocumentPosition(b);
				if (e == b) return CKEDITOR.POSITION_IDENTICAL;
				if (this.type == CKEDITOR.NODE_ELEMENT && a.type == CKEDITOR.NODE_ELEMENT) {
					if (e.contains) {
						if (e.contains(b)) return CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING;
						if (b.contains(e)) return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
					}
					if ("sourceIndex" in
						e) return 0 > e.sourceIndex || 0 > b.sourceIndex ? CKEDITOR.POSITION_DISCONNECTED : e.sourceIndex < b.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING
				}
				e = this.getAddress();
				a = a.getAddress();
				for (var b = Math.min(e.length, a.length), c = 0; c < b; c++)
					if (e[c] != a[c]) return e[c] < a[c] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING;
				return e.length < a.length ? CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
			},
			getAscendant: function (a, e) {
				var b =
					this.$,
					c, g;
				e || (b = b.parentNode);
				"function" == typeof a ? (g = !0, c = a) : (g = !1, c = function (b) {
					b = "string" == typeof b.nodeName ? b.nodeName.toLowerCase() : "";
					return "string" == typeof a ? b == a : b in a
				});
				for (; b;) {
					if (c(g ? new CKEDITOR.dom.node(b) : b)) return new CKEDITOR.dom.node(b);
					try {
						b = b.parentNode
					} catch (l) {
						b = null
					}
				}
				return null
			},
			hasAscendant: function (a, e) {
				var b = this.$;
				e || (b = b.parentNode);
				for (; b;) {
					if (b.nodeName && b.nodeName.toLowerCase() == a) return !0;
					b = b.parentNode
				}
				return !1
			},
			move: function (a, e) {
				a.append(this.remove(), e)
			},
			remove: function (a) {
				var e =
					this.$,
					b = e.parentNode;
				if (b) {
					if (a)
						for (; a = e.firstChild;) b.insertBefore(e.removeChild(a), e);
					b.removeChild(e)
				}
				return this
			},
			replace: function (a) {
				this.insertBefore(a);
				a.remove()
			},
			trim: function () {
				this.ltrim();
				this.rtrim()
			},
			ltrim: function () {
				for (var a; this.getFirst && (a = this.getFirst());) {
					if (a.type == CKEDITOR.NODE_TEXT) {
						var e = CKEDITOR.tools.ltrim(a.getText()),
							b = a.getLength();
						if (e) e.length < b && (a.split(b - e.length), this.$.removeChild(this.$.firstChild));
						else {
							a.remove();
							continue
						}
					}
					break
				}
			},
			rtrim: function () {
				for (var a; this.getLast &&
					(a = this.getLast());) {
					if (a.type == CKEDITOR.NODE_TEXT) {
						var e = CKEDITOR.tools.rtrim(a.getText()),
							b = a.getLength();
						if (e) e.length < b && (a.split(e.length), this.$.lastChild.parentNode.removeChild(this.$.lastChild));
						else {
							a.remove();
							continue
						}
					}
					break
				}
				CKEDITOR.env.needsBrFiller && (a = this.$.lastChild) && 1 == a.type && "br" == a.nodeName.toLowerCase() && a.parentNode.removeChild(a)
			},
			isReadOnly: function (a) {
				var e = this;
				this.type != CKEDITOR.NODE_ELEMENT && (e = this.getParent());
				CKEDITOR.env.edge && e && e.is("textarea", "input") && (a = !0);
				if (!a && e && "undefined" != typeof e.$.isContentEditable) return !(e.$.isContentEditable || e.data("cke-editable"));
				for (; e;) {
					if (e.data("cke-editable")) return !1;
					if (e.hasAttribute("contenteditable")) return "false" == e.getAttribute("contenteditable");
					e = e.getParent()
				}
				return !0
			}
		}), CKEDITOR.dom.window = function (a) {
			CKEDITOR.dom.domObject.call(this, a)
		}, CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
			focus: function () {
				this.$.focus()
			},
			getViewPaneSize: function () {
				var a =
					this.$.document,
					e = "CSS1Compat" == a.compatMode;
				return {
					width: (e ? a.documentElement.clientWidth : a.body.clientWidth) || 0,
					height: (e ? a.documentElement.clientHeight : a.body.clientHeight) || 0
				}
			},
			getScrollPosition: function () {
				var a = this.$;
				if ("pageXOffset" in a) return {
					x: a.pageXOffset || 0,
					y: a.pageYOffset || 0
				};
				a = a.document;
				return {
					x: a.documentElement.scrollLeft || a.body.scrollLeft || 0,
					y: a.documentElement.scrollTop || a.body.scrollTop || 0
				}
			},
			getFrame: function () {
				var a = this.$.frameElement;
				return a ? new CKEDITOR.dom.element.get(a) :
					null
			}
		}), CKEDITOR.dom.document = function (a) {
			CKEDITOR.dom.domObject.call(this, a)
		}, CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
			type: CKEDITOR.NODE_DOCUMENT,
			appendStyleSheet: function (a) {
				if (this.$.createStyleSheet) this.$.createStyleSheet(a);
				else {
					var e = new CKEDITOR.dom.element("link");
					e.setAttributes({
						rel: "stylesheet",
						type: "text/css",
						href: a
					});
					this.getHead().append(e)
				}
			},
			appendStyleText: function (a) {
				if (this.$.createStyleSheet) {
					var e = this.$.createStyleSheet("");
					e.cssText = a
				} else {
					var b = new CKEDITOR.dom.element("style", this);
					b.append(new CKEDITOR.dom.text(a, this));
					this.getHead().append(b)
				}
				return e || b.$.sheet
			},
			createElement: function (a, e) {
				var b = new CKEDITOR.dom.element(a, this);
				e && (e.attributes && b.setAttributes(e.attributes), e.styles && b.setStyles(e.styles));
				return b
			},
			createText: function (a) {
				return new CKEDITOR.dom.text(a, this)
			},
			focus: function () {
				this.getWindow().focus()
			},
			getActive: function () {
				var a;
				try {
					a = this.$.activeElement
				} catch (e) {
					return null
				}
				return new CKEDITOR.dom.element(a)
			},
			getById: function (a) {
				return (a = this.$.getElementById(a)) ? new CKEDITOR.dom.element(a) : null
			},
			getByAddress: function (a, e) {
				for (var b = this.$.documentElement, c = 0; b && c < a.length; c++) {
					var g = a[c];
					if (e)
						for (var l = -1, k = 0; k < b.childNodes.length; k++) {
							var f = b.childNodes[k];
							if (!0 !== e || 3 != f.nodeType || !f.previousSibling || 3 != f.previousSibling.nodeType)
								if (l++, l == g) {
									b = f;
									break
								}
						} else b = b.childNodes[g]
				}
				return b ? new CKEDITOR.dom.node(b) : null
			},
			getElementsByTag: function (a, e) {
				CKEDITOR.env.ie && 8 >= document.documentMode || !e || (a = e + ":" +
					a);
				return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(a))
			},
			getHead: function () {
				var a = this.$.getElementsByTagName("head")[0];
				return a = a ? new CKEDITOR.dom.element(a) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), !0)
			},
			getBody: function () {
				return new CKEDITOR.dom.element(this.$.body)
			},
			getDocumentElement: function () {
				return new CKEDITOR.dom.element(this.$.documentElement)
			},
			getWindow: function () {
				return new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView)
			},
			write: function (a) {
				this.$.open("text/html",
					"replace");
				CKEDITOR.env.ie && (a = a.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$\x26\n\x3cscript data-cke-temp\x3d"1"\x3e(' + CKEDITOR.tools.fixDomain + ")();\x3c/script\x3e"));
				this.$.write(a);
				this.$.close()
			},
			find: function (a) {
				return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(a))
			},
			findOne: function (a) {
				return (a = this.$.querySelector(a)) ? new CKEDITOR.dom.element(a) : null
			},
			_getHtml5ShivFrag: function () {
				var a = this.getCustomData("html5ShivFrag");
				a || (a = this.$.createDocumentFragment(), CKEDITOR.tools.enableHtml5Elements(a, !0), this.setCustomData("html5ShivFrag", a));
				return a
			}
		}), CKEDITOR.dom.nodeList = function (a) {
			this.$ = a
		}, CKEDITOR.dom.nodeList.prototype = {
			count: function () {
				return this.$.length
			},
			getItem: function (a) {
				return 0 > a || a >= this.$.length ? null : (a = this.$[a]) ? new CKEDITOR.dom.node(a) : null
			},
			toArray: function () {
				return CKEDITOR.tools.array.map(this.$, function (a) {
					return new CKEDITOR.dom.node(a)
				})
			}
		}, CKEDITOR.dom.element = function (a, e) {
			"string" == typeof a && (a = (e ? e.$ : document).createElement(a));
			CKEDITOR.dom.domObject.call(this,
				a)
		}, CKEDITOR.dom.element.get = function (a) {
			return (a = "string" == typeof a ? document.getElementById(a) || document.getElementsByName(a)[0] : a) && (a.$ ? a : new CKEDITOR.dom.element(a))
		}, CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node, CKEDITOR.dom.element.createFromHtml = function (a, e) {
			var b = new CKEDITOR.dom.element("div", e);
			b.setHtml(a);
			return b.getFirst().remove()
		}, CKEDITOR.dom.element.setMarker = function (a, e, b, c) {
			var g = e.getCustomData("list_marker_id") || e.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"),
				l = e.getCustomData("list_marker_names") || e.setCustomData("list_marker_names", {}).getCustomData("list_marker_names");
			a[g] = e;
			l[b] = 1;
			return e.setCustomData(b, c)
		}, CKEDITOR.dom.element.clearAllMarkers = function (a) {
			for (var e in a) CKEDITOR.dom.element.clearMarkers(a, a[e], 1)
		}, CKEDITOR.dom.element.clearMarkers = function (a, e, b) {
			var c = e.getCustomData("list_marker_names"),
				g = e.getCustomData("list_marker_id"),
				l;
			for (l in c) e.removeCustomData(l);
			e.removeCustomData("list_marker_names");
			b && (e.removeCustomData("list_marker_id"),
				delete a[g])
		},
		function () {
			function a(a, d) {
				return -1 < (" " + a + " ").replace(l, " ").indexOf(" " + d + " ")
			}

			function e(a) {
				var d = !0;
				a.$.id || (a.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber(), d = !1);
				return function () {
					d || a.removeAttribute("id")
				}
			}

			function b(a, d) {
				var b = CKEDITOR.tools.escapeCss(a.$.id);
				return "#" + b + " " + d.split(/,\s*/).join(", #" + b + " ")
			}

			function c(a) {
				for (var d = 0, b = 0, h = k[a].length; b < h; b++) d += parseFloat(this.getComputedStyle(k[a][b]) || 0, 10) || 0;
				return d
			}
			var g = document.createElement("_").classList,
				g = "undefined" !==
				typeof g && null !== String(g.add).match(/\[Native code\]/gi),
				l = /[\n\t\r]/g;
			CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
				type: CKEDITOR.NODE_ELEMENT,
				addClass: g ? function (a) {
					this.$.classList.add(a);
					return this
				} : function (f) {
					var d = this.$.className;
					d && (a(d, f) || (d += " " + f));
					this.$.className = d || f;
					return this
				},
				removeClass: g ? function (a) {
					var d = this.$;
					d.classList.remove(a);
					d.className || d.removeAttribute("class");
					return this
				} : function (f) {
					var d = this.getAttribute("class");
					d && a(d, f) && ((d = d.replace(new RegExp("(?:^|\\s+)" +
						f + "(?\x3d\\s|$)"), "").replace(/^\s+/, "")) ? this.setAttribute("class", d) : this.removeAttribute("class"));
					return this
				},
				hasClass: function (f) {
					return a(this.$.className, f)
				},
				append: function (a, d) {
					"string" == typeof a && (a = this.getDocument().createElement(a));
					d ? this.$.insertBefore(a.$, this.$.firstChild) : this.$.appendChild(a.$);
					return a
				},
				appendHtml: function (a) {
					if (this.$.childNodes.length) {
						var d = new CKEDITOR.dom.element("div", this.getDocument());
						d.setHtml(a);
						d.moveChildren(this)
					} else this.setHtml(a)
				},
				appendText: function (a) {
					null !=
						this.$.text && CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? this.$.text += a : this.append(new CKEDITOR.dom.text(a))
				},
				appendBogus: function (a) {
					if (a || CKEDITOR.env.needsBrFiller) {
						for (a = this.getLast(); a && a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(a.getText());) a = a.getPrevious();
						a && a.is && a.is("br") || (a = this.getDocument().createElement("br"), CKEDITOR.env.gecko && a.setAttribute("type", "_moz"), this.append(a))
					}
				},
				breakParent: function (a, d) {
					var b = new CKEDITOR.dom.range(this.getDocument());
					b.setStartAfter(this);
					b.setEndAfter(a);
					var h = b.extractContents(!1, d || !1),
						c;
					b.insertNode(this.remove());
					if (CKEDITOR.env.ie && !CKEDITOR.env.edge) {
						for (b = new CKEDITOR.dom.element("div"); c = h.getFirst();) c.$.style.backgroundColor && (c.$.style.backgroundColor = c.$.style.backgroundColor), b.append(c);
						b.insertAfter(this);
						b.remove(!0)
					} else h.insertAfterNode(this)
				},
				contains: document.compareDocumentPosition ? function (a) {
					return !!(this.$.compareDocumentPosition(a.$) & 16)
				} : function (a) {
					var d = this.$;
					return a.type != CKEDITOR.NODE_ELEMENT ? d.contains(a.getParent().$) :
						d != a.$ && d.contains(a.$)
				},
				focus: function () {
					function a() {
						try {
							this.$.focus()
						} catch (f) {}
					}
					return function (d) {
						d ? CKEDITOR.tools.setTimeout(a, 100, this) : a.call(this)
					}
				}(),
				getHtml: function () {
					var a = this.$.innerHTML;
					return CKEDITOR.env.ie ? a.replace(/<\?[^>]*>/g, "") : a
				},
				getOuterHtml: function () {
					if (this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/, "");
					var a = this.$.ownerDocument.createElement("div");
					a.appendChild(this.$.cloneNode(!0));
					return a.innerHTML
				},
				getClientRect: function (a) {
					var d = CKEDITOR.tools.extend({},
						this.$.getBoundingClientRect());
					!d.width && (d.width = d.right - d.left);
					!d.height && (d.height = d.bottom - d.top);
					return a ? CKEDITOR.tools.getAbsoluteRectPosition(this.getWindow(), d) : d
				},
				setHtml: CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? function (a) {
					try {
						var d = this.$;
						if (this.getParent()) return d.innerHTML = a;
						var b = this.getDocument()._getHtml5ShivFrag();
						b.appendChild(d);
						d.innerHTML = a;
						b.removeChild(d);
						return a
					} catch (h) {
						this.$.innerHTML = "";
						d = new CKEDITOR.dom.element("body", this.getDocument());
						d.$.innerHTML = a;
						for (d = d.getChildren(); d.count();) this.append(d.getItem(0));
						return a
					}
				} : function (a) {
					return this.$.innerHTML = a
				},
				setText: function () {
					var a = document.createElement("p");
					a.innerHTML = "x";
					a = a.textContent;
					return function (d) {
						this.$[a ? "textContent" : "innerText"] = d
					}
				}(),
				getAttribute: function () {
					var a = function (a) {
						return this.$.getAttribute(a, 2)
					};
					return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (a) {
						switch (a) {
							case "class":
								a = "className";
								break;
							case "http-equiv":
								a = "httpEquiv";
								break;
							case "name":
								return this.$.name;
							case "tabindex":
								return a = this.$.getAttribute(a,
									2), 0 !== a && 0 === this.$.tabIndex && (a = null), a;
							case "checked":
								return a = this.$.attributes.getNamedItem(a), (a.specified ? a.nodeValue : this.$.checked) ? "checked" : null;
							case "hspace":
							case "value":
								return this.$[a];
							case "style":
								return this.$.style.cssText;
							case "contenteditable":
							case "contentEditable":
								return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") : null
						}
						return this.$.getAttribute(a, 2)
					} : a
				}(),
				getAttributes: function (a) {
					var d = {},
						b = this.$.attributes,
						h;
					a = CKEDITOR.tools.isArray(a) ?
						a : [];
					for (h = 0; h < b.length; h++) - 1 === CKEDITOR.tools.indexOf(a, b[h].name) && (d[b[h].name] = b[h].value);
					return d
				},
				getChildren: function () {
					return new CKEDITOR.dom.nodeList(this.$.childNodes)
				},
				getComputedStyle: document.defaultView && document.defaultView.getComputedStyle ? function (a) {
					var d = this.getWindow().$.getComputedStyle(this.$, null);
					return d ? d.getPropertyValue(a) : ""
				} : function (a) {
					return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)]
				},
				getDtd: function () {
					var a = CKEDITOR.dtd[this.getName()];
					this.getDtd =
						function () {
							return a
						};
					return a
				},
				getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag,
				getTabIndex: function () {
					var a = this.$.tabIndex;
					return 0 !== a || CKEDITOR.dtd.$tabIndex[this.getName()] || 0 === parseInt(this.getAttribute("tabindex"), 10) ? a : -1
				},
				getText: function () {
					return this.$.textContent || this.$.innerText || ""
				},
				getWindow: function () {
					return this.getDocument().getWindow()
				},
				getId: function () {
					return this.$.id || null
				},
				getNameAtt: function () {
					return this.$.name || null
				},
				getName: function () {
					var a = this.$.nodeName.toLowerCase();
					if (CKEDITOR.env.ie && 8 >= document.documentMode) {
						var d = this.$.scopeName;
						"HTML" != d && (a = d.toLowerCase() + ":" + a)
					}
					this.getName = function () {
						return a
					};
					return this.getName()
				},
				getValue: function () {
					return this.$.value
				},
				getFirst: function (a) {
					var d = this.$.firstChild;
					(d = d && new CKEDITOR.dom.node(d)) && a && !a(d) && (d = d.getNext(a));
					return d
				},
				getLast: function (a) {
					var d = this.$.lastChild;
					(d = d && new CKEDITOR.dom.node(d)) && a && !a(d) && (d = d.getPrevious(a));
					return d
				},
				getStyle: function (a) {
					return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)]
				},
				is: function () {
					var a = this.getName();
					if ("object" == typeof arguments[0]) return !!arguments[0][a];
					for (var d = 0; d < arguments.length; d++)
						if (arguments[d] == a) return !0;
					return !1
				},
				isEditable: function (a) {
					var d = this.getName();
					return this.isReadOnly() || "none" == this.getComputedStyle("display") || "hidden" == this.getComputedStyle("visibility") || CKEDITOR.dtd.$nonEditable[d] || CKEDITOR.dtd.$empty[d] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount() ? !1 : !1 !== a ? (a = CKEDITOR.dtd[d] ||
						CKEDITOR.dtd.span, !(!a || !a["#"])) : !0
				},
				isIdentical: function (a) {
					var d = this.clone(0, 1);
					a = a.clone(0, 1);
					d.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
					a.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
					if (d.$.isEqualNode) return d.$.style.cssText = CKEDITOR.tools.normalizeCssText(d.$.style.cssText), a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText), d.$.isEqualNode(a.$);
					d = d.getOuterHtml();
					a =
						a.getOuterHtml();
					if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version && this.is("a")) {
						var b = this.getParent();
						b.type == CKEDITOR.NODE_ELEMENT && (b = b.clone(), b.setHtml(d), d = b.getHtml(), b.setHtml(a), a = b.getHtml())
					}
					return d == a
				},
				isVisible: function () {
					var a = (this.$.offsetHeight || this.$.offsetWidth) && "hidden" != this.getComputedStyle("visibility"),
						d, b;
					a && CKEDITOR.env.webkit && (d = this.getWindow(), !d.equals(CKEDITOR.document.getWindow()) && (b = d.$.frameElement) && (a = (new CKEDITOR.dom.element(b)).isVisible()));
					return !!a
				},
				isEmptyInlineRemoveable: function () {
					if (!CKEDITOR.dtd.$removeEmpty[this.getName()]) return !1;
					for (var a = this.getChildren(), d = 0, b = a.count(); d < b; d++) {
						var h = a.getItem(d);
						if (h.type != CKEDITOR.NODE_ELEMENT || !h.data("cke-bookmark"))
							if (h.type == CKEDITOR.NODE_ELEMENT && !h.isEmptyInlineRemoveable() || h.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(h.getText())) return !1
					}
					return !0
				},
				hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function () {
					for (var a = this.$.attributes, d = 0; d < a.length; d++) {
						var b = a[d];
						switch (b.nodeName) {
							case "class":
								if (this.getAttribute("class")) return !0;
							case "data-cke-expando":
								continue;
							default:
								if (b.specified) return !0
						}
					}
					return !1
				} : function () {
					var a = this.$.attributes,
						d = a.length,
						b = {
							"data-cke-expando": 1,
							_moz_dirty: 1
						};
					return 0 < d && (2 < d || !b[a[0].nodeName] || 2 == d && !b[a[1].nodeName])
				},
				hasAttribute: function () {
					function a(d) {
						var b = this.$.attributes.getNamedItem(d);
						if ("input" == this.getName()) switch (d) {
							case "class":
								return 0 < this.$.className.length;
							case "checked":
								return !!this.$.checked;
							case "value":
								return d = this.getAttribute("type"), "checkbox" == d || "radio" == d ? "on" != this.$.value : !!this.$.value
						}
						return b ?
							b.specified : !1
					}
					return CKEDITOR.env.ie ? 8 > CKEDITOR.env.version ? function (d) {
						return "name" == d ? !!this.$.name : a.call(this, d)
					} : a : function (a) {
						return !!this.$.attributes.getNamedItem(a)
					}
				}(),
				hide: function () {
					this.setStyle("display", "none")
				},
				moveChildren: function (a, d) {
					var b = this.$;
					a = a.$;
					if (b != a) {
						var h;
						if (d)
							for (; h = b.lastChild;) a.insertBefore(b.removeChild(h), a.firstChild);
						else
							for (; h = b.firstChild;) a.appendChild(b.removeChild(h))
					}
				},
				mergeSiblings: function () {
					function a(d, b, h) {
						if (b && b.type == CKEDITOR.NODE_ELEMENT) {
							for (var f = []; b.data("cke-bookmark") || b.isEmptyInlineRemoveable();)
								if (f.push(b), b = h ? b.getNext() : b.getPrevious(), !b || b.type != CKEDITOR.NODE_ELEMENT) return;
							if (d.isIdentical(b)) {
								for (var c = h ? d.getLast() : d.getFirst(); f.length;) f.shift().move(d, !h);
								b.moveChildren(d, !h);
								b.remove();
								c && c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings()
							}
						}
					}
					return function (b) {
						if (!1 === b || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) a(this, this.getNext(), !0), a(this, this.getPrevious())
					}
				}(),
				show: function () {
					this.setStyles({
						display: "",
						visibility: ""
					})
				},
				setAttribute: function () {
					var a = function (a, b) {
						this.$.setAttribute(a, b);
						return this
					};
					return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (b, c) {
						"class" == b ? this.$.className = c : "style" == b ? this.$.style.cssText = c : "tabindex" == b ? this.$.tabIndex = c : "checked" == b ? this.$.checked = c : "contenteditable" == b ? a.call(this, "contentEditable", c) : a.apply(this, arguments);
						return this
					} : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function (b, c) {
						if ("src" == b && c.match(/^http:\/\//)) try {
							a.apply(this,
								arguments)
						} catch (h) {} else a.apply(this, arguments);
						return this
					} : a
				}(),
				setAttributes: function (a) {
					for (var b in a) this.setAttribute(b, a[b]);
					return this
				},
				setValue: function (a) {
					this.$.value = a;
					return this
				},
				removeAttribute: function () {
					var a = function (a) {
						this.$.removeAttribute(a)
					};
					return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (a) {
						"class" == a ? a = "className" : "tabindex" == a ? a = "tabIndex" : "contenteditable" == a && (a = "contentEditable");
						this.$.removeAttribute(a)
					} : a
				}(),
				removeAttributes: function (a) {
					if (CKEDITOR.tools.isArray(a))
						for (var b =
								0; b < a.length; b++) this.removeAttribute(a[b]);
					else
						for (b in a = a || this.getAttributes(), a) a.hasOwnProperty(b) && this.removeAttribute(b)
				},
				removeStyle: function (a) {
					var b = this.$.style;
					if (b.removeProperty || "border" != a && "margin" != a && "padding" != a) b.removeProperty ? b.removeProperty(a) : b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a)), this.$.style.cssText || this.removeAttribute("style");
					else {
						var c = ["top", "left", "right", "bottom"],
							h;
						"border" == a && (h = ["color", "style", "width"]);
						for (var b = [], g = 0; g < c.length; g++)
							if (h)
								for (var e =
										0; e < h.length; e++) b.push([a, c[g], h[e]].join("-"));
							else b.push([a, c[g]].join("-"));
						for (a = 0; a < b.length; a++) this.removeStyle(b[a])
					}
				},
				setStyle: function (a, b) {
					this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] = b;
					return this
				},
				setStyles: function (a) {
					for (var b in a) this.setStyle(b, a[b]);
					return this
				},
				setOpacity: function (a) {
					CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? (a = Math.round(100 * a), this.setStyle("filter", 100 <= a ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity\x3d" + a + ")")) : this.setStyle("opacity", a)
				},
				unselectable: function () {
					this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select",
						"none"));
					if (CKEDITOR.env.ie) {
						this.setAttribute("unselectable", "on");
						for (var a, b = this.getElementsByTag("*"), c = 0, h = b.count(); c < h; c++) a = b.getItem(c), a.setAttribute("unselectable", "on")
					}
				},
				getPositionedAncestor: function () {
					for (var a = this;
						"html" != a.getName();) {
						if ("static" != a.getComputedStyle("position")) return a;
						a = a.getParent()
					}
					return null
				},
				getDocumentPosition: function (a) {
					var b = 0,
						c = 0,
						h = this.getDocument(),
						g = h.getBody(),
						e = "BackCompat" == h.$.compatMode;
					if (document.documentElement.getBoundingClientRect && (CKEDITOR.env.ie ?
							8 !== CKEDITOR.env.version : 1)) {
						var k = this.$.getBoundingClientRect(),
							l = h.$.documentElement,
							u = l.clientTop || g.$.clientTop || 0,
							r = l.clientLeft || g.$.clientLeft || 0,
							w = !0;
						CKEDITOR.env.ie && (w = h.getDocumentElement().contains(this), h = h.getBody().contains(this), w = e && h || !e && w);
						w && (CKEDITOR.env.webkit || CKEDITOR.env.ie && 12 <= CKEDITOR.env.version ? (b = g.$.scrollLeft || l.scrollLeft, c = g.$.scrollTop || l.scrollTop) : (c = e ? g.$ : l, b = c.scrollLeft, c = c.scrollTop), b = k.left + b - r, c = k.top + c - u)
					} else
						for (u = this, r = null; u && "body" != u.getName() &&
							"html" != u.getName();) {
							b += u.$.offsetLeft - u.$.scrollLeft;
							c += u.$.offsetTop - u.$.scrollTop;
							u.equals(this) || (b += u.$.clientLeft || 0, c += u.$.clientTop || 0);
							for (; r && !r.equals(u);) b -= r.$.scrollLeft, c -= r.$.scrollTop, r = r.getParent();
							r = u;
							u = (k = u.$.offsetParent) ? new CKEDITOR.dom.element(k) : null
						}
					a && (k = this.getWindow(), u = a.getWindow(), !k.equals(u) && k.$.frameElement && (a = (new CKEDITOR.dom.element(k.$.frameElement)).getDocumentPosition(a), b += a.x, c += a.y));
					document.documentElement.getBoundingClientRect || !CKEDITOR.env.gecko ||
						e || (b += this.$.clientLeft ? 1 : 0, c += this.$.clientTop ? 1 : 0);
					return {
						x: b,
						y: c
					}
				},
				scrollIntoView: function (a) {
					var b = this.getParent();
					if (b) {
						do
							if ((b.$.clientWidth && b.$.clientWidth < b.$.scrollWidth || b.$.clientHeight && b.$.clientHeight < b.$.scrollHeight) && !b.is("body") && this.scrollIntoParent(b, a, 1), b.is("html")) {
								var c = b.getWindow();
								try {
									var h = c.$.frameElement;
									h && (b = new CKEDITOR.dom.element(h))
								} catch (g) {}
							}
						while (b = b.getParent())
					}
				},
				scrollIntoParent: function (a, b, c) {
					var h, g, e, k;

					function l(h, b) {
						/body|html/.test(a.getName()) ?
							a.getWindow().$.scrollBy(h, b) : (a.$.scrollLeft += h, a.$.scrollTop += b)
					}

					function u(a, h) {
						var b = {
							x: 0,
							y: 0
						};
						if (!a.is(w ? "body" : "html")) {
							var c = a.$.getBoundingClientRect();
							b.x = c.left;
							b.y = c.top
						}
						c = a.getWindow();
						c.equals(h) || (c = u(CKEDITOR.dom.element.get(c.$.frameElement), h), b.x += c.x, b.y += c.y);
						return b
					}

					function r(a, h) {
						return parseInt(a.getComputedStyle("margin-" + h) || 0, 10) || 0
					}!a && (a = this.getWindow());
					e = a.getDocument();
					var w = "BackCompat" == e.$.compatMode;
					a instanceof CKEDITOR.dom.window && (a = w ? e.getBody() : e.getDocumentElement());
					CKEDITOR.env.webkit && (e = this.getEditor(!1)) && (e._.previousScrollTop = null);
					e = a.getWindow();
					g = u(this, e);
					var t = u(a, e),
						B = this.$.offsetHeight;
					h = this.$.offsetWidth;
					var v = a.$.clientHeight,
						z = a.$.clientWidth;
					e = g.x - r(this, "left") - t.x || 0;
					k = g.y - r(this, "top") - t.y || 0;
					h = g.x + h + r(this, "right") - (t.x + z) || 0;
					g = g.y + B + r(this, "bottom") - (t.y + v) || 0;
					(0 > k || 0 < g) && l(0, !0 === b ? k : !1 === b ? g : 0 > k ? k : g);
					c && (0 > e || 0 < h) && l(0 > e ? e : h, 0)
				},
				setState: function (a, b, c) {
					b = b || "cke";
					switch (a) {
						case CKEDITOR.TRISTATE_ON:
							this.addClass(b + "_on");
							this.removeClass(b +
								"_off");
							this.removeClass(b + "_disabled");
							c && this.setAttribute("aria-pressed", !0);
							c && this.removeAttribute("aria-disabled");
							break;
						case CKEDITOR.TRISTATE_DISABLED:
							this.addClass(b + "_disabled");
							this.removeClass(b + "_off");
							this.removeClass(b + "_on");
							c && this.setAttribute("aria-disabled", !0);
							c && this.removeAttribute("aria-pressed");
							break;
						default:
							this.addClass(b + "_off"), this.removeClass(b + "_on"), this.removeClass(b + "_disabled"), c && this.removeAttribute("aria-pressed"), c && this.removeAttribute("aria-disabled")
					}
				},
				getFrameDocument: function () {
					var a = this.$;
					try {
						a.contentWindow.document
					} catch (b) {
						a.src = a.src
					}
					return a && new CKEDITOR.dom.document(a.contentWindow.document)
				},
				copyAttributes: function (a, b) {
					var c = this.$.attributes;
					b = b || {};
					for (var h = 0; h < c.length; h++) {
						var g = c[h],
							e = g.nodeName.toLowerCase(),
							k;
						if (!(e in b))
							if ("checked" == e && (k = this.getAttribute(e))) a.setAttribute(e, k);
							else if (!CKEDITOR.env.ie || this.hasAttribute(e)) k = this.getAttribute(e), null === k && (k = g.nodeValue), a.setAttribute(e, k)
					}
					"" !== this.$.style.cssText &&
						(a.$.style.cssText = this.$.style.cssText)
				},
				renameNode: function (a) {
					if (this.getName() != a) {
						var b = this.getDocument();
						a = new CKEDITOR.dom.element(a, b);
						this.copyAttributes(a);
						this.moveChildren(a);
						this.getParent(!0) && this.$.parentNode.replaceChild(a.$, this.$);
						a.$["data-cke-expando"] = this.$["data-cke-expando"];
						this.$ = a.$;
						delete this.getName
					}
				},
				getChild: function () {
					function a(b, c) {
						var h = b.childNodes;
						if (0 <= c && c < h.length) return h[c]
					}
					return function (b) {
						var c = this.$;
						if (b.slice)
							for (b = b.slice(); 0 < b.length && c;) c = a(c,
								b.shift());
						else c = a(c, b);
						return c ? new CKEDITOR.dom.node(c) : null
					}
				}(),
				getChildCount: function () {
					return this.$.childNodes.length
				},
				disableContextMenu: function () {
					function a(b) {
						return b.type == CKEDITOR.NODE_ELEMENT && b.hasClass("cke_enable_context_menu")
					}
					this.on("contextmenu", function (b) {
						b.data.getTarget().getAscendant(a, !0) || b.data.preventDefault()
					})
				},
				getDirection: function (a) {
					return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir ||
						"ltr" : this.getStyle("direction") || this.getAttribute("dir")
				},
				data: function (a, b) {
					a = "data-" + a;
					if (void 0 === b) return this.getAttribute(a);
					!1 === b ? this.removeAttribute(a) : this.setAttribute(a, b);
					return null
				},
				getEditor: function (a) {
					var b = CKEDITOR.instances,
						c, h, g;
					a = a || void 0 === a;
					for (c in b)
						if (h = b[c], h.element.equals(this) && h.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || !a && (g = h.editable()) && (g.equals(this) || g.contains(this))) return h;
					return null
				},
				find: function (a) {
					var c = e(this);
					a = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(b(this,
						a)));
					c();
					return a
				},
				findOne: function (a) {
					var c = e(this);
					a = this.$.querySelector(b(this, a));
					c();
					return a ? new CKEDITOR.dom.element(a) : null
				},
				forEach: function (a, b, c) {
					if (!(c || b && this.type != b)) var h = a(this);
					if (!1 !== h) {
						c = this.getChildren();
						for (var g = 0; g < c.count(); g++) h = c.getItem(g), h.type == CKEDITOR.NODE_ELEMENT ? h.forEach(a, b) : b && h.type != b || a(h)
					}
				}
			});
			var k = {
				width: ["border-left-width", "border-right-width", "padding-left", "padding-right"],
				height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"]
			};
			CKEDITOR.dom.element.prototype.setSize = function (a, b, g) {
				"number" == typeof b && (!g || CKEDITOR.env.ie && CKEDITOR.env.quirks || (b -= c.call(this, a)), this.setStyle(a, b + "px"))
			};
			CKEDITOR.dom.element.prototype.getSize = function (a, b) {
				var g = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(a)], this.$["client" + CKEDITOR.tools.capitalize(a)]) || 0;
				b && (g -= c.call(this, a));
				return g
			}
		}(), CKEDITOR.dom.documentFragment = function (a) {
			a = a || CKEDITOR.document;
			this.$ = a.type == CKEDITOR.NODE_DOCUMENT ? a.$.createDocumentFragment() : a
		}, CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype,
			CKEDITOR.dom.element.prototype, {
				type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
				insertAfterNode: function (a) {
					a = a.$;
					a.parentNode.insertBefore(this.$, a.nextSibling)
				},
				getHtml: function () {
					var a = new CKEDITOR.dom.element("div");
					this.clone(1, 1).appendTo(a);
					return a.getHtml().replace(/\s*data-cke-expando=".*?"/g, "")
				}
			}, !0, {
				append: 1,
				appendBogus: 1,
				clone: 1,
				getFirst: 1,
				getHtml: 1,
				getLast: 1,
				getParent: 1,
				getNext: 1,
				getPrevious: 1,
				appendTo: 1,
				moveChildren: 1,
				insertBefore: 1,
				insertAfterNode: 1,
				replace: 1,
				trim: 1,
				type: 1,
				ltrim: 1,
				rtrim: 1,
				getDocument: 1,
				getChildCount: 1,
				getChild: 1,
				getChildren: 1
			}),
		function () {
			function a(a, h) {
				var b = this.range;
				if (this._.end) return null;
				if (!this._.start) {
					this._.start = 1;
					if (b.collapsed) return this.end(), null;
					b.optimize()
				}
				var c, d = b.startContainer;
				c = b.endContainer;
				var f = b.startOffset,
					g = b.endOffset,
					m, e = this.guard,
					n = this.type,
					k = a ? "getPreviousSourceNode" : "getNextSourceNode";
				if (!a && !this._.guardLTR) {
					var l = c.type == CKEDITOR.NODE_ELEMENT ? c : c.getParent(),
						A = c.type == CKEDITOR.NODE_ELEMENT ? c.getChild(g) : c.getNext();
					this._.guardLTR = function (a,
						h) {
						return (!h || !l.equals(a)) && (!A || !a.equals(A)) && (a.type != CKEDITOR.NODE_ELEMENT || !h || !a.equals(b.root))
					}
				}
				if (a && !this._.guardRTL) {
					var G = d.type == CKEDITOR.NODE_ELEMENT ? d : d.getParent(),
						E = d.type == CKEDITOR.NODE_ELEMENT ? f ? d.getChild(f - 1) : null : d.getPrevious();
					this._.guardRTL = function (a, h) {
						return (!h || !G.equals(a)) && (!E || !a.equals(E)) && (a.type != CKEDITOR.NODE_ELEMENT || !h || !a.equals(b.root))
					}
				}
				var D = a ? this._.guardRTL : this._.guardLTR;
				m = e ? function (a, h) {
					return !1 === D(a, h) ? !1 : e(a, h)
				} : D;
				this.current ? c = this.current[k](!1,
					n, m) : (a ? c.type == CKEDITOR.NODE_ELEMENT && (c = 0 < g ? c.getChild(g - 1) : !1 === m(c, !0) ? null : c.getPreviousSourceNode(!0, n, m)) : (c = d, c.type == CKEDITOR.NODE_ELEMENT && ((c = c.getChild(f)) || (c = !1 === m(d, !0) ? null : d.getNextSourceNode(!0, n, m)))), c && !1 === m(c) && (c = null));
				for (; c && !this._.end;) {
					this.current = c;
					if (!this.evaluator || !1 !== this.evaluator(c)) {
						if (!h) return c
					} else if (h && this.evaluator) return !1;
					c = c[k](!1, n, m)
				}
				this.end();
				return this.current = null
			}

			function e(h) {
				for (var b, c = null; b = a.call(this, h);) c = b;
				return c
			}
			CKEDITOR.dom.walker =
				CKEDITOR.tools.createClass({
					$: function (a) {
						this.range = a;
						this._ = {}
					},
					proto: {
						end: function () {
							this._.end = 1
						},
						next: function () {
							return a.call(this)
						},
						previous: function () {
							return a.call(this, 1)
						},
						checkForward: function () {
							return !1 !== a.call(this, 0, 1)
						},
						checkBackward: function () {
							return !1 !== a.call(this, 1, 1)
						},
						lastForward: function () {
							return e.call(this)
						},
						lastBackward: function () {
							return e.call(this, 1)
						},
						reset: function () {
							delete this.current;
							this._ = {}
						}
					}
				});
			var b = {
					block: 1,
					"list-item": 1,
					table: 1,
					"table-row-group": 1,
					"table-header-group": 1,
					"table-footer-group": 1,
					"table-row": 1,
					"table-column-group": 1,
					"table-column": 1,
					"table-cell": 1,
					"table-caption": 1
				},
				c = {
					absolute: 1,
					fixed: 1
				};
			CKEDITOR.dom.element.prototype.isBlockBoundary = function (a) {
				return "none" != this.getComputedStyle("float") || this.getComputedStyle("position") in c || !b[this.getComputedStyle("display")] ? !!(this.is(CKEDITOR.dtd.$block) || a && this.is(a)) : !0
			};
			CKEDITOR.dom.walker.blockBoundary = function (a) {
				return function (h) {
					return !(h.type == CKEDITOR.NODE_ELEMENT && h.isBlockBoundary(a))
				}
			};
			CKEDITOR.dom.walker.listItemBoundary =
				function () {
					return this.blockBoundary({
						br: 1
					})
				};
			CKEDITOR.dom.walker.bookmark = function (a, h) {
				function b(a) {
					return a && a.getName && "span" == a.getName() && a.data("cke-bookmark")
				}
				return function (c) {
					var d, f;
					d = c && c.type != CKEDITOR.NODE_ELEMENT && (f = c.getParent()) && b(f);
					d = a ? d : d || b(c);
					return !!(h ^ d)
				}
			};
			CKEDITOR.dom.walker.whitespaces = function (a) {
				return function (h) {
					var b;
					h && h.type == CKEDITOR.NODE_TEXT && (b = !CKEDITOR.tools.trim(h.getText()) || CKEDITOR.env.webkit && h.getText() == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE);
					return !!(a ^ b)
				}
			};
			CKEDITOR.dom.walker.invisible = function (a) {
				var h = CKEDITOR.dom.walker.whitespaces(),
					b = CKEDITOR.env.webkit ? 1 : 0;
				return function (c) {
					h(c) ? c = 1 : (c.type == CKEDITOR.NODE_TEXT && (c = c.getParent()), c = c.$.offsetWidth <= b);
					return !!(a ^ c)
				}
			};
			CKEDITOR.dom.walker.nodeType = function (a, h) {
				return function (b) {
					return !!(h ^ b.type == a)
				}
			};
			CKEDITOR.dom.walker.bogus = function (a) {
				function h(a) {
					return !l(a) && !k(a)
				}
				return function (b) {
					var c = CKEDITOR.env.needsBrFiller ? b.is && b.is("br") : b.getText && g.test(b.getText());
					c && (c = b.getParent(),
						b = b.getNext(h), c = c.isBlockBoundary() && (!b || b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary()));
					return !!(a ^ c)
				}
			};
			CKEDITOR.dom.walker.temp = function (a) {
				return function (h) {
					h.type != CKEDITOR.NODE_ELEMENT && (h = h.getParent());
					h = h && h.hasAttribute("data-cke-temp");
					return !!(a ^ h)
				}
			};
			var g = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
				l = CKEDITOR.dom.walker.whitespaces(),
				k = CKEDITOR.dom.walker.bookmark(),
				f = CKEDITOR.dom.walker.temp(),
				d = function (a) {
					return k(a) || l(a) || a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$inline) && !a.is(CKEDITOR.dtd.$empty)
				};
			CKEDITOR.dom.walker.ignored = function (a) {
				return function (h) {
					h = l(h) || k(h) || f(h);
					return !!(a ^ h)
				}
			};
			var m = CKEDITOR.dom.walker.ignored();
			CKEDITOR.dom.walker.empty = function (a) {
				return function (h) {
					for (var b = 0, c = h.getChildCount(); b < c; ++b)
						if (!m(h.getChild(b))) return !!a;
					return !a
				}
			};
			var h = CKEDITOR.dom.walker.empty(),
				n = CKEDITOR.dom.walker.validEmptyBlockContainers = CKEDITOR.tools.extend(function (a) {
					var h = {},
						b;
					for (b in a) CKEDITOR.dtd[b]["#"] && (h[b] = 1);
					return h
				}(CKEDITOR.dtd.$block), {
					caption: 1,
					td: 1,
					th: 1
				});
			CKEDITOR.dom.walker.editable =
				function (a) {
					return function (b) {
						b = m(b) ? !1 : b.type == CKEDITOR.NODE_TEXT || b.type == CKEDITOR.NODE_ELEMENT && (b.is(CKEDITOR.dtd.$inline) || b.is("hr") || "false" == b.getAttribute("contenteditable") || !CKEDITOR.env.needsBrFiller && b.is(n) && h(b)) ? !0 : !1;
						return !!(a ^ b)
					}
				};
			CKEDITOR.dom.element.prototype.getBogus = function () {
				var a = this;
				do a = a.getPreviousSourceNode(); while (d(a));
				return a && (CKEDITOR.env.needsBrFiller ? a.is && a.is("br") : a.getText && g.test(a.getText())) ? a : !1
			}
		}(), CKEDITOR.dom.range = function (a) {
			this.endOffset = this.endContainer =
				this.startOffset = this.startContainer = null;
			this.collapsed = !0;
			var e = a instanceof CKEDITOR.dom.document;
			this.document = e ? a : a.getDocument();
			this.root = e ? a.getBody() : a
		},
		function () {
			function a(a) {
				a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset
			}

			function e(a, b, c, d, f) {
				function g(a, h, b, c) {
					var d = b ? a.getPrevious() : a.getNext();
					if (c && k) return d;
					v || c ? h.append(a.clone(!0, f), b) : (a.remove(), l && h.append(a, b));
					return d
				}

				function m() {
					var a, h, b, c = Math.min(L.length,
						F.length);
					for (a = 0; a < c; a++)
						if (h = L[a], b = F[a], !h.equals(b)) return a;
					return a - 1
				}

				function e() {
					var b = S - 1,
						c = D && I && !z.equals(C);
					b < N - 1 || b < R - 1 || c ? (c ? a.moveToPosition(C, CKEDITOR.POSITION_BEFORE_START) : R == b + 1 && E ? a.moveToPosition(F[b], CKEDITOR.POSITION_BEFORE_END) : a.moveToPosition(F[b + 1], CKEDITOR.POSITION_BEFORE_START), d && (b = L[b + 1]) && b.type == CKEDITOR.NODE_ELEMENT && (c = CKEDITOR.dom.element.createFromHtml('\x3cspan data-cke-bookmark\x3d"1" style\x3d"display:none"\x3e\x26nbsp;\x3c/span\x3e', a.document), c.insertAfter(b),
						b.mergeSiblings(!1), a.moveToBookmark({
							startNode: c
						}))) : a.collapse(!0)
				}
				a.optimizeBookmark();
				var k = 0 === b,
					l = 1 == b,
					v = 2 == b;
				b = v || l;
				var z = a.startContainer,
					C = a.endContainer,
					x = a.startOffset,
					A = a.endOffset,
					G, E, D, I, H, J;
				if (v && C.type == CKEDITOR.NODE_TEXT && (z.equals(C) || z.type === CKEDITOR.NODE_ELEMENT && z.getFirst().equals(C))) c.append(a.document.createText(C.substring(x, A)));
				else {
					C.type == CKEDITOR.NODE_TEXT ? v ? J = !0 : C = C.split(A) : 0 < C.getChildCount() ? A >= C.getChildCount() ? (C = C.getChild(A - 1), E = !0) : C = C.getChild(A) : I = E = !0;
					z.type ==
						CKEDITOR.NODE_TEXT ? v ? H = !0 : z.split(x) : 0 < z.getChildCount() ? 0 === x ? (z = z.getChild(x), G = !0) : z = z.getChild(x - 1) : D = G = !0;
					for (var L = z.getParents(), F = C.getParents(), S = m(), N = L.length - 1, R = F.length - 1, K = c, V, Z, X, da = -1, P = S; P <= N; P++) {
						Z = L[P];
						X = Z.getNext();
						for (P != N || Z.equals(F[P]) && N < R ? b && (V = K.append(Z.clone(0, f))) : G ? g(Z, K, !1, D) : H && K.append(a.document.createText(Z.substring(x))); X;) {
							if (X.equals(F[P])) {
								da = P;
								break
							}
							X = g(X, K)
						}
						K = V
					}
					K = c;
					for (P = S; P <= R; P++)
						if (c = F[P], X = c.getPrevious(), c.equals(L[P])) b && (K = K.getChild(0));
						else {
							P !=
								R || c.equals(L[P]) && R < N ? b && (V = K.append(c.clone(0, f))) : E ? g(c, K, !1, I) : J && K.append(a.document.createText(c.substring(0, A)));
							if (P > da)
								for (; X;) X = g(X, K, !0);
							K = V
						}
					v || e()
				}
			}

			function b() {
				var a = !1,
					b = CKEDITOR.dom.walker.whitespaces(),
					c = CKEDITOR.dom.walker.bookmark(!0),
					d = CKEDITOR.dom.walker.bogus();
				return function (f) {
					return c(f) || b(f) ? !0 : d(f) && !a ? a = !0 : f.type == CKEDITOR.NODE_TEXT && (f.hasAscendant("pre") || CKEDITOR.tools.trim(f.getText()).length) || f.type == CKEDITOR.NODE_ELEMENT && !f.is(l) ? !1 : !0
				}
			}

			function c(a) {
				var b = CKEDITOR.dom.walker.whitespaces(),
					c = CKEDITOR.dom.walker.bookmark(1);
				return function (d) {
					return c(d) || b(d) ? !0 : !a && k(d) || d.type == CKEDITOR.NODE_ELEMENT && d.is(CKEDITOR.dtd.$removeEmpty)
				}
			}

			function g(a) {
				return function () {
					var b;
					return this[a ? "getPreviousNode" : "getNextNode"](function (a) {
						!b && m(a) && (b = a);
						return d(a) && !(k(a) && a.equals(b))
					})
				}
			}
			var l = {
					abbr: 1,
					acronym: 1,
					b: 1,
					bdo: 1,
					big: 1,
					cite: 1,
					code: 1,
					del: 1,
					dfn: 1,
					em: 1,
					font: 1,
					i: 1,
					ins: 1,
					label: 1,
					kbd: 1,
					q: 1,
					samp: 1,
					small: 1,
					span: 1,
					strike: 1,
					strong: 1,
					sub: 1,
					sup: 1,
					tt: 1,
					u: 1,
					"var": 1
				},
				k = CKEDITOR.dom.walker.bogus(),
				f = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
				d = CKEDITOR.dom.walker.editable(),
				m = CKEDITOR.dom.walker.ignored(!0);
			CKEDITOR.dom.range.prototype = {
				clone: function () {
					var a = new CKEDITOR.dom.range(this.root);
					a._setStartContainer(this.startContainer);
					a.startOffset = this.startOffset;
					a._setEndContainer(this.endContainer);
					a.endOffset = this.endOffset;
					a.collapsed = this.collapsed;
					return a
				},
				collapse: function (a) {
					a ? (this._setEndContainer(this.startContainer), this.endOffset = this.startOffset) : (this._setStartContainer(this.endContainer),
						this.startOffset = this.endOffset);
					this.collapsed = !0
				},
				cloneContents: function (a) {
					var b = new CKEDITOR.dom.documentFragment(this.document);
					this.collapsed || e(this, 2, b, !1, "undefined" == typeof a ? !0 : a);
					return b
				},
				deleteContents: function (a) {
					this.collapsed || e(this, 0, null, a)
				},
				extractContents: function (a, b) {
					var c = new CKEDITOR.dom.documentFragment(this.document);
					this.collapsed || e(this, 1, c, a, "undefined" == typeof b ? !0 : b);
					return c
				},
				createBookmark: function (a) {
					var b, c, d, f, g = this.collapsed;
					b = this.document.createElement("span");
					b.data("cke-bookmark", 1);
					b.setStyle("display", "none");
					b.setHtml("\x26nbsp;");
					a && (d = "cke_bm_" + CKEDITOR.tools.getNextNumber(), b.setAttribute("id", d + (g ? "C" : "S")));
					g || (c = b.clone(), c.setHtml("\x26nbsp;"), a && c.setAttribute("id", d + "E"), f = this.clone(), f.collapse(), f.insertNode(c));
					f = this.clone();
					f.collapse(!0);
					f.insertNode(b);
					c ? (this.setStartAfter(b), this.setEndBefore(c)) : this.moveToPosition(b, CKEDITOR.POSITION_AFTER_END);
					return {
						startNode: a ? d + (g ? "C" : "S") : b,
						endNode: a ? d + "E" : c,
						serializable: a,
						collapsed: g
					}
				},
				createBookmark2: function () {
					function a(h) {
						var b =
							h.container,
							d = h.offset,
							f;
						f = b;
						var g = d;
						f = f.type != CKEDITOR.NODE_ELEMENT || 0 === g || g == f.getChildCount() ? 0 : f.getChild(g - 1).type == CKEDITOR.NODE_TEXT && f.getChild(g).type == CKEDITOR.NODE_TEXT;
						f && (b = b.getChild(d - 1), d = b.getLength());
						if (b.type == CKEDITOR.NODE_ELEMENT && 0 < d) {
							a: {
								for (f = b; d--;)
									if (g = f.getChild(d).getIndex(!0), 0 <= g) {
										d = g;
										break a
									}
								d = -1
							}
							d += 1
						}
						if (b.type == CKEDITOR.NODE_TEXT) {
							f = b;
							for (g = 0;
								(f = f.getPrevious()) && f.type == CKEDITOR.NODE_TEXT;) g += f.getText().replace(CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE, "").length;
							f = g;
							b.getText() ? d += f : (g = b.getPrevious(c), f ? (d = f, b = g ? g.getNext() : b.getParent().getFirst()) : (b = b.getParent(), d = g ? g.getIndex(!0) + 1 : 0))
						}
						h.container = b;
						h.offset = d
					}

					function b(a, h) {
						var c = h.getCustomData("cke-fillingChar");
						if (c) {
							var d = a.container;
							c.equals(d) && (a.offset -= CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE.length, 0 >= a.offset && (a.offset = d.getIndex(), a.container = d.getParent()))
						}
					}
					var c = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT, !0);
					return function (c) {
						var d = this.collapsed,
							f = {
								container: this.startContainer,
								offset: this.startOffset
							},
							g = {
								container: this.endContainer,
								offset: this.endOffset
							};
						c && (a(f), b(f, this.root), d || (a(g), b(g, this.root)));
						return {
							start: f.container.getAddress(c),
							end: d ? null : g.container.getAddress(c),
							startOffset: f.offset,
							endOffset: g.offset,
							normalized: c,
							collapsed: d,
							is2: !0
						}
					}
				}(),
				moveToBookmark: function (a) {
					if (a.is2) {
						var b = this.document.getByAddress(a.start, a.normalized),
							c = a.startOffset,
							d = a.end && this.document.getByAddress(a.end, a.normalized);
						a = a.endOffset;
						this.setStart(b, c);
						d ? this.setEnd(d, a) : this.collapse(!0)
					} else b =
						(c = a.serializable) ? this.document.getById(a.startNode) : a.startNode, a = c ? this.document.getById(a.endNode) : a.endNode, this.setStartBefore(b), b.remove(), a ? (this.setEndBefore(a), a.remove()) : this.collapse(!0)
				},
				getBoundaryNodes: function () {
					var a = this.startContainer,
						b = this.endContainer,
						c = this.startOffset,
						d = this.endOffset,
						f;
					if (a.type == CKEDITOR.NODE_ELEMENT)
						if (f = a.getChildCount(), f > c) a = a.getChild(c);
						else if (1 > f) a = a.getPreviousSourceNode();
					else {
						for (a = a.$; a.lastChild;) a = a.lastChild;
						a = new CKEDITOR.dom.node(a);
						a =
							a.getNextSourceNode() || a
					}
					if (b.type == CKEDITOR.NODE_ELEMENT)
						if (f = b.getChildCount(), f > d) b = b.getChild(d).getPreviousSourceNode(!0);
						else if (1 > f) b = b.getPreviousSourceNode();
					else {
						for (b = b.$; b.lastChild;) b = b.lastChild;
						b = new CKEDITOR.dom.node(b)
					}
					a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b);
					return {
						startNode: a,
						endNode: b
					}
				},
				getCommonAncestor: function (a, b) {
					var c = this.startContainer,
						d = this.endContainer,
						c = c.equals(d) ? a && c.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? c.getChild(this.startOffset) :
						c : c.getCommonAncestor(d);
					return b && !c.is ? c.getParent() : c
				},
				optimize: function () {
					var a = this.startContainer,
						b = this.startOffset;
					a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setStartAfter(a) : this.setStartBefore(a));
					a = this.endContainer;
					b = this.endOffset;
					a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a))
				},
				optimizeBookmark: function () {
					var a = this.startContainer,
						b = this.endContainer;
					a.is && a.is("span") && a.data("cke-bookmark") && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START);
					b && b.is && b.is("span") && b.data("cke-bookmark") && this.setEndAt(b, CKEDITOR.POSITION_AFTER_END)
				},
				trim: function (a, b) {
					var c = this.startContainer,
						d = this.startOffset,
						f = this.collapsed;
					if ((!a || f) && c && c.type == CKEDITOR.NODE_TEXT) {
						if (d)
							if (d >= c.getLength()) d = c.getIndex() + 1, c = c.getParent();
							else {
								var g = c.split(d),
									d = c.getIndex() + 1,
									c = c.getParent();
								this.startContainer.equals(this.endContainer) ? this.setEnd(g, this.endOffset - this.startOffset) : c.equals(this.endContainer) && (this.endOffset += 1)
							}
						else d = c.getIndex(), c = c.getParent();
						this.setStart(c, d);
						if (f) {
							this.collapse(!0);
							return
						}
					}
					c = this.endContainer;
					d = this.endOffset;
					b || f || !c || c.type != CKEDITOR.NODE_TEXT || (d ? (d >= c.getLength() || c.split(d), d = c.getIndex() + 1) : d = c.getIndex(), c = c.getParent(), this.setEnd(c, d))
				},
				enlarge: function (a, b) {
					function c(a) {
						return a && a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") ? null : a
					}
					var d = new RegExp(/[^\s\ufeff]/);
					switch (a) {
						case CKEDITOR.ENLARGE_INLINE:
							var f = 1;
						case CKEDITOR.ENLARGE_ELEMENT:
							var g = function (a, b) {
								var h = new CKEDITOR.dom.range(e);
								h.setStart(a, b);
								h.setEndAt(e, CKEDITOR.POSITION_BEFORE_END);
								var h = new CKEDITOR.dom.walker(h),
									c;
								for (h.guard = function (a) {
										return !(a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary())
									}; c = h.next();) {
									if (c.type != CKEDITOR.NODE_TEXT) return !1;
									G = c != a ? c.getText() : c.substring(b);
									if (d.test(G)) return !1
								}
								return !0
							};
							if (this.collapsed) break;
							var m = this.getCommonAncestor(),
								e = this.root,
								k, l, v, z, C, x = !1,
								A, G;
							A = this.startContainer;
							var E = this.startOffset;
							A.type == CKEDITOR.NODE_TEXT ? (E && (A = !CKEDITOR.tools.trim(A.substring(0, E)).length &&
								A, x = !!A), A && ((z = A.getPrevious()) || (v = A.getParent()))) : (E && (z = A.getChild(E - 1) || A.getLast()), z || (v = A));
							for (v = c(v); v || z;) {
								if (v && !z) {
									!C && v.equals(m) && (C = !0);
									if (f ? v.isBlockBoundary() : !e.contains(v)) break;
									x && "inline" == v.getComputedStyle("display") || (x = !1, C ? k = v : this.setStartBefore(v));
									z = v.getPrevious()
								}
								for (; z;)
									if (A = !1, z.type == CKEDITOR.NODE_COMMENT) z = z.getPrevious();
									else {
										if (z.type == CKEDITOR.NODE_TEXT) G = z.getText(), d.test(G) && (z = null), A = /[\s\ufeff]$/.test(G);
										else if ((z.$.offsetWidth > (CKEDITOR.env.webkit ? 1 :
												0) || b && z.is("br")) && !z.data("cke-bookmark"))
											if (x && CKEDITOR.dtd.$removeEmpty[z.getName()]) {
												G = z.getText();
												if (d.test(G)) z = null;
												else
													for (var E = z.$.getElementsByTagName("*"), D = 0, I; I = E[D++];)
														if (!CKEDITOR.dtd.$removeEmpty[I.nodeName.toLowerCase()]) {
															z = null;
															break
														}
												z && (A = !!G.length)
											} else z = null;
										A && (x ? C ? k = v : v && this.setStartBefore(v) : x = !0);
										if (z) {
											A = z.getPrevious();
											if (!v && !A) {
												v = z;
												z = null;
												break
											}
											z = A
										} else v = null
									}
								v && (v = c(v.getParent()))
							}
							A = this.endContainer;
							E = this.endOffset;
							v = z = null;
							C = x = !1;
							A.type == CKEDITOR.NODE_TEXT ?
								CKEDITOR.tools.trim(A.substring(E)).length ? x = !0 : (x = !A.getLength(), E == A.getLength() ? (z = A.getNext()) || (v = A.getParent()) : g(A, E) && (v = A.getParent())) : (z = A.getChild(E)) || (v = A);
							for (; v || z;) {
								if (v && !z) {
									!C && v.equals(m) && (C = !0);
									if (f ? v.isBlockBoundary() : !e.contains(v)) break;
									x && "inline" == v.getComputedStyle("display") || (x = !1, C ? l = v : v && this.setEndAfter(v));
									z = v.getNext()
								}
								for (; z;) {
									A = !1;
									if (z.type == CKEDITOR.NODE_TEXT) G = z.getText(), g(z, 0) || (z = null), A = /^[\s\ufeff]/.test(G);
									else if (z.type == CKEDITOR.NODE_ELEMENT) {
										if ((0 < z.$.offsetWidth ||
												b && z.is("br")) && !z.data("cke-bookmark"))
											if (x && CKEDITOR.dtd.$removeEmpty[z.getName()]) {
												G = z.getText();
												if (d.test(G)) z = null;
												else
													for (E = z.$.getElementsByTagName("*"), D = 0; I = E[D++];)
														if (!CKEDITOR.dtd.$removeEmpty[I.nodeName.toLowerCase()]) {
															z = null;
															break
														}
												z && (A = !!G.length)
											} else z = null
									} else A = 1;
									A && x && (C ? l = v : this.setEndAfter(v));
									if (z) {
										A = z.getNext();
										if (!v && !A) {
											v = z;
											z = null;
											break
										}
										z = A
									} else v = null
								}
								v && (v = c(v.getParent()))
							}
							k && l && (m = k.contains(l) ? l : k, this.setStartBefore(m), this.setEndAfter(m));
							break;
						case CKEDITOR.ENLARGE_BLOCK_CONTENTS:
						case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:
							v =
								new CKEDITOR.dom.range(this.root);
							e = this.root;
							v.setStartAt(e, CKEDITOR.POSITION_AFTER_START);
							v.setEnd(this.startContainer, this.startOffset);
							v = new CKEDITOR.dom.walker(v);
							var H, J, L = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? {
									br: 1
								} : null),
								F = null,
								S = function (a) {
									if (a.type == CKEDITOR.NODE_ELEMENT && "false" == a.getAttribute("contenteditable"))
										if (F) {
											if (F.equals(a)) {
												F = null;
												return
											}
										} else F = a;
									else if (F) return;
									var b = L(a);
									b || (H = a);
									return b
								},
								f = function (a) {
									var b = S(a);
									!b && a.is && a.is("br") &&
										(J = a);
									return b
								};
							v.guard = S;
							v = v.lastBackward();
							H = H || e;
							this.setStartAt(H, !H.is("br") && (!v && this.checkStartOfBlock() || v && H.contains(v)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END);
							if (a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) {
								v = this.clone();
								v = new CKEDITOR.dom.walker(v);
								var N = CKEDITOR.dom.walker.whitespaces(),
									R = CKEDITOR.dom.walker.bookmark();
								v.evaluator = function (a) {
									return !N(a) && !R(a)
								};
								if ((v = v.previous()) && v.type == CKEDITOR.NODE_ELEMENT && v.is("br")) break
							}
							v = this.clone();
							v.collapse();
							v.setEndAt(e,
								CKEDITOR.POSITION_BEFORE_END);
							v = new CKEDITOR.dom.walker(v);
							v.guard = a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? f : S;
							H = F = J = null;
							v = v.lastForward();
							H = H || e;
							this.setEndAt(H, !v && this.checkEndOfBlock() || v && H.contains(v) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START);
							J && this.setEndAfter(J)
					}
				},
				shrink: function (a, b, c) {
					var d = "boolean" === typeof c ? c : c && "boolean" === typeof c.shrinkOnBlockBoundary ? c.shrinkOnBlockBoundary : !0,
						f = c && c.skipBogus;
					if (!this.collapsed) {
						a = a || CKEDITOR.SHRINK_TEXT;
						var g = this.clone(),
							m =
							this.startContainer,
							e = this.endContainer,
							k = this.startOffset,
							l = this.endOffset,
							v = c = 1;
						m && m.type == CKEDITOR.NODE_TEXT && (k ? k >= m.getLength() ? g.setStartAfter(m) : (g.setStartBefore(m), c = 0) : g.setStartBefore(m));
						e && e.type == CKEDITOR.NODE_TEXT && (l ? l >= e.getLength() ? g.setEndAfter(e) : (g.setEndAfter(e), v = 0) : g.setEndBefore(e));
						var g = new CKEDITOR.dom.walker(g),
							z = CKEDITOR.dom.walker.bookmark(),
							C = CKEDITOR.dom.walker.bogus();
						g.evaluator = function (b) {
							return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT)
						};
						var x;
						g.guard = function (b, c) {
							if (f && C(b) || z(b)) return !0;
							if (a == CKEDITOR.SHRINK_ELEMENT && b.type == CKEDITOR.NODE_TEXT || c && b.equals(x) || !1 === d && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary() || b.type == CKEDITOR.NODE_ELEMENT && b.hasAttribute("contenteditable")) return !1;
							c || b.type != CKEDITOR.NODE_ELEMENT || (x = b);
							return !0
						};
						c && (m = g[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(m, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START);
						v && (g.reset(), (g = g[a == CKEDITOR.SHRINK_ELEMENT ?
							"lastBackward" : "previous"]()) && this.setEndAt(g, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END));
						return !(!c && !v)
					}
				},
				insertNode: function (a) {
					this.optimizeBookmark();
					this.trim(!1, !0);
					var b = this.startContainer,
						c = b.getChild(this.startOffset);
					c ? a.insertBefore(c) : b.append(a);
					a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++;
					this.setStartBefore(a)
				},
				moveToPosition: function (a, b) {
					this.setStartAt(a, b);
					this.collapse(!0)
				},
				moveToRange: function (a) {
					this.setStart(a.startContainer, a.startOffset);
					this.setEnd(a.endContainer, a.endOffset)
				},
				selectNodeContents: function (a) {
					this.setStart(a, 0);
					this.setEnd(a, a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount())
				},
				setStart: function (b, c) {
					b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex(), b = b.getParent());
					this._setStartContainer(b);
					this.startOffset = c;
					this.endContainer || (this._setEndContainer(b), this.endOffset = c);
					a(this)
				},
				setEnd: function (b, c) {
					b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex() +
						1, b = b.getParent());
					this._setEndContainer(b);
					this.endOffset = c;
					this.startContainer || (this._setStartContainer(b), this.startOffset = c);
					a(this)
				},
				setStartAfter: function (a) {
					this.setStart(a.getParent(), a.getIndex() + 1)
				},
				setStartBefore: function (a) {
					this.setStart(a.getParent(), a.getIndex())
				},
				setEndAfter: function (a) {
					this.setEnd(a.getParent(), a.getIndex() + 1)
				},
				setEndBefore: function (a) {
					this.setEnd(a.getParent(), a.getIndex())
				},
				setStartAt: function (b, c) {
					switch (c) {
						case CKEDITOR.POSITION_AFTER_START:
							this.setStart(b, 0);
							break;
						case CKEDITOR.POSITION_BEFORE_END:
							b.type == CKEDITOR.NODE_TEXT ? this.setStart(b, b.getLength()) : this.setStart(b, b.getChildCount());
							break;
						case CKEDITOR.POSITION_BEFORE_START:
							this.setStartBefore(b);
							break;
						case CKEDITOR.POSITION_AFTER_END:
							this.setStartAfter(b)
					}
					a(this)
				},
				setEndAt: function (b, c) {
					switch (c) {
						case CKEDITOR.POSITION_AFTER_START:
							this.setEnd(b, 0);
							break;
						case CKEDITOR.POSITION_BEFORE_END:
							b.type == CKEDITOR.NODE_TEXT ? this.setEnd(b, b.getLength()) : this.setEnd(b, b.getChildCount());
							break;
						case CKEDITOR.POSITION_BEFORE_START:
							this.setEndBefore(b);
							break;
						case CKEDITOR.POSITION_AFTER_END:
							this.setEndAfter(b)
					}
					a(this)
				},
				fixBlock: function (a, b) {
					var c = this.createBookmark(),
						d = this.document.createElement(b);
					this.collapse(a);
					this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);
					this.extractContents().appendTo(d);
					d.trim();
					this.insertNode(d);
					var f = d.getBogus();
					f && f.remove();
					d.appendBogus();
					this.moveToBookmark(c);
					return d
				},
				splitBlock: function (a, b) {
					var c = new CKEDITOR.dom.elementPath(this.startContainer, this.root),
						d = new CKEDITOR.dom.elementPath(this.endContainer, this.root),
						f = c.block,
						g = d.block,
						m = null;
					if (!c.blockLimit.equals(d.blockLimit)) return null;
					"br" != a && (f || (f = this.fixBlock(!0, a), g = (new CKEDITOR.dom.elementPath(this.endContainer, this.root)).block), g || (g = this.fixBlock(!1, a)));
					c = f && this.checkStartOfBlock();
					d = g && this.checkEndOfBlock();
					this.deleteContents();
					f && f.equals(g) && (d ? (m = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(g, CKEDITOR.POSITION_AFTER_END), g = null) : c ? (m = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(f,
						CKEDITOR.POSITION_BEFORE_START), f = null) : (g = this.splitElement(f, b || !1), f.is("ul", "ol") || f.appendBogus()));
					return {
						previousBlock: f,
						nextBlock: g,
						wasStartOfBlock: c,
						wasEndOfBlock: d,
						elementPath: m
					}
				},
				splitElement: function (a, b) {
					if (!this.collapsed) return null;
					this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END);
					var c = this.extractContents(!1, b || !1),
						d = a.clone(!1, b || !1);
					c.appendTo(d);
					d.insertAfter(a);
					this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END);
					return d
				},
				removeEmptyBlocksAtEnd: function () {
					function a(h) {
						return function (a) {
							return b(a) ||
								c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable() || h.is("table") && a.is("caption") ? !1 : !0
						}
					}
					var b = CKEDITOR.dom.walker.whitespaces(),
						c = CKEDITOR.dom.walker.bookmark(!1);
					return function (b) {
						for (var c = this.createBookmark(), d = this[b ? "endPath" : "startPath"](), f = d.block || d.blockLimit, g; f && !f.equals(d.root) && !f.getFirst(a(f));) g = f.getParent(), this[b ? "setEndAt" : "setStartAt"](f, CKEDITOR.POSITION_AFTER_END), f.remove(1), f = g;
						this.moveToBookmark(c)
					}
				}(),
				startPath: function () {
					return new CKEDITOR.dom.elementPath(this.startContainer,
						this.root)
				},
				endPath: function () {
					return new CKEDITOR.dom.elementPath(this.endContainer, this.root)
				},
				checkBoundaryOfElement: function (a, b) {
					var d = b == CKEDITOR.START,
						f = this.clone();
					f.collapse(d);
					f[d ? "setStartAt" : "setEndAt"](a, d ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END);
					f = new CKEDITOR.dom.walker(f);
					f.evaluator = c(d);
					return f[d ? "checkBackward" : "checkForward"]()
				},
				checkStartOfBlock: function () {
					var a = this.startContainer,
						c = this.startOffset;
					CKEDITOR.env.ie && c && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.ltrim(a.substring(0,
						c)), f.test(a) && this.trim(0, 1));
					this.trim();
					a = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
					c = this.clone();
					c.collapse(!0);
					c.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START);
					a = new CKEDITOR.dom.walker(c);
					a.evaluator = b();
					return a.checkBackward()
				},
				checkEndOfBlock: function () {
					var a = this.endContainer,
						c = this.endOffset;
					CKEDITOR.env.ie && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.rtrim(a.substring(c)), f.test(a) && this.trim(1, 0));
					this.trim();
					a = new CKEDITOR.dom.elementPath(this.endContainer,
						this.root);
					c = this.clone();
					c.collapse(!1);
					c.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END);
					a = new CKEDITOR.dom.walker(c);
					a.evaluator = b();
					return a.checkForward()
				},
				getPreviousNode: function (a, b, c) {
					var d = this.clone();
					d.collapse(1);
					d.setStartAt(c || this.root, CKEDITOR.POSITION_AFTER_START);
					c = new CKEDITOR.dom.walker(d);
					c.evaluator = a;
					c.guard = b;
					return c.previous()
				},
				getNextNode: function (a, b, c) {
					var d = this.clone();
					d.collapse();
					d.setEndAt(c || this.root, CKEDITOR.POSITION_BEFORE_END);
					c = new CKEDITOR.dom.walker(d);
					c.evaluator = a;
					c.guard = b;
					return c.next()
				},
				checkReadOnly: function () {
					function a(b, c) {
						for (; b;) {
							if (b.type == CKEDITOR.NODE_ELEMENT) {
								if ("false" == b.getAttribute("contentEditable") && !b.data("cke-editable")) return 0;
								if (b.is("html") || "true" == b.getAttribute("contentEditable") && (b.contains(c) || b.equals(c))) break
							}
							b = b.getParent()
						}
						return 1
					}
					return function () {
						var b = this.startContainer,
							c = this.endContainer;
						return !(a(b, c) && a(c, b))
					}
				}(),
				moveToElementEditablePosition: function (a, b) {
					if (a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable(!1)) return this.moveToPosition(a,
						b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START), !0;
					for (var c = 0; a;) {
						if (a.type == CKEDITOR.NODE_TEXT) {
							b && this.endContainer && this.checkEndOfBlock() && f.test(a.getText()) ? this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START);
							c = 1;
							break
						}
						if (a.type == CKEDITOR.NODE_ELEMENT)
							if (a.isEditable()) this.moveToPosition(a, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START), c = 1;
							else if (b && a.is("br") && this.endContainer &&
							this.checkEndOfBlock()) this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START);
						else if ("false" == a.getAttribute("contenteditable") && a.is(CKEDITOR.dtd.$block)) return this.setStartBefore(a), this.setEndAfter(a), !0;
						var d = a,
							g = c,
							e = void 0;
						d.type == CKEDITOR.NODE_ELEMENT && d.isEditable(!1) && (e = d[b ? "getLast" : "getFirst"](m));
						g || e || (e = d[b ? "getPrevious" : "getNext"](m));
						a = e
					}
					return !!c
				},
				moveToClosestEditablePosition: function (a, b) {
					var c, d = 0,
						f, g, m = [CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START];
					a ? (c = new CKEDITOR.dom.range(this.root),
						c.moveToPosition(a, m[b ? 0 : 1])) : c = this.clone();
					if (a && !a.is(CKEDITOR.dtd.$block)) d = 1;
					else if (f = c[b ? "getNextEditableNode" : "getPreviousEditableNode"]()) d = 1, (g = f.type == CKEDITOR.NODE_ELEMENT) && f.is(CKEDITOR.dtd.$block) && "false" == f.getAttribute("contenteditable") ? (c.setStartAt(f, CKEDITOR.POSITION_BEFORE_START), c.setEndAt(f, CKEDITOR.POSITION_AFTER_END)) : !CKEDITOR.env.needsBrFiller && g && f.is(CKEDITOR.dom.walker.validEmptyBlockContainers) ? (c.setEnd(f, 0), c.collapse()) : c.moveToPosition(f, m[b ? 1 : 0]);
					d && this.moveToRange(c);
					return !!d
				},
				moveToElementEditStart: function (a) {
					return this.moveToElementEditablePosition(a)
				},
				moveToElementEditEnd: function (a) {
					return this.moveToElementEditablePosition(a, !0)
				},
				getEnclosedNode: function () {
					var a = this.clone();
					a.optimize();
					if (a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT) return null;
					var a = new CKEDITOR.dom.walker(a),
						b = CKEDITOR.dom.walker.bookmark(!1, !0),
						c = CKEDITOR.dom.walker.whitespaces(!0);
					a.evaluator = function (a) {
						return c(a) && b(a)
					};
					var d = a.next();
					a.reset();
					return d && d.equals(a.previous()) ? d : null
				},
				getTouchedStartNode: function () {
					var a = this.startContainer;
					return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a
				},
				getTouchedEndNode: function () {
					var a = this.endContainer;
					return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a
				},
				getNextEditableNode: g(),
				getPreviousEditableNode: g(1),
				_getTableElement: function (a) {
					a = a || {
						td: 1,
						th: 1,
						tr: 1,
						tbody: 1,
						thead: 1,
						tfoot: 1,
						table: 1
					};
					var b = this.startContainer,
						c =
						this.endContainer,
						d = b.getAscendant("table", !0),
						f = c.getAscendant("table", !0);
					return CKEDITOR.env.safari && d && c.equals(this.root) ? b.getAscendant(a, !0) : this.getEnclosedNode() ? this.getEnclosedNode().getAscendant(a, !0) : d && f && (d.equals(f) || d.contains(f) || f.contains(d)) ? b.getAscendant(a, !0) : null
				},
				scrollIntoView: function () {
					var a = new CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", this.document),
						b, c, d, f = this.clone();
					f.optimize();
					(d = f.startContainer.type == CKEDITOR.NODE_TEXT) ? (c = f.startContainer.getText(),
						b = f.startContainer.split(f.startOffset), a.insertAfter(f.startContainer)) : f.insertNode(a);
					a.scrollIntoView();
					d && (f.startContainer.setText(c), b.remove());
					a.remove()
				},
				getClientRects: function () {
					function a(b, c) {
						var h = CKEDITOR.tools.array.map(b, function (a) {
								return a
							}),
							d = new CKEDITOR.dom.range(c.root),
							f, g, m;
						c.startContainer instanceof CKEDITOR.dom.element && (g = 0 === c.startOffset && c.startContainer.hasAttribute("data-widget"));
						c.endContainer instanceof CKEDITOR.dom.element && (m = (m = c.endOffset === (c.endContainer.getChildCount ?
							c.endContainer.getChildCount() : c.endContainer.length)) && c.endContainer.hasAttribute("data-widget"));
						g && d.setStart(c.startContainer.getParent(), c.startContainer.getIndex());
						m && d.setEnd(c.endContainer.getParent(), c.endContainer.getIndex() + 1);
						if (g || m) c = d;
						d = c.cloneContents();
						d = CKEDITOR.dom.document.prototype.find.call(d, "[data-cke-widget-id]").toArray();
						if (d = CKEDITOR.tools.array.map(d, function (a) {
								var b = c.root.editor;
								a = a.getAttribute("data-cke-widget-id");
								return b.widgets.instances[a].element
							})) return d =
							CKEDITOR.tools.array.map(d, function (a) {
								var b;
								b = a.getParent().hasClass("cke_widget_wrapper") ? a.getParent() : a;
								f = this.root.getDocument().$.createRange();
								f.setStart(b.getParent().$, b.getIndex());
								f.setEnd(b.getParent().$, b.getIndex() + 1);
								b = f.getClientRects();
								b.widgetRect = a.getClientRect();
								return b
							}, c), CKEDITOR.tools.array.forEach(d, function (a) {
								function b(d) {
									CKEDITOR.tools.array.forEach(h, function (b, f) {
										var g = CKEDITOR.tools.objectCompare(a[d], b);
										g || (g = CKEDITOR.tools.objectCompare(a.widgetRect, b));
										g && (Array.prototype.splice.call(h,
											f, a.length - d, a.widgetRect), c = !0)
									});
									c || (d < h.length - 1 ? b(d + 1) : h.push(a.widgetRect))
								}
								var c;
								b(0)
							}), h
					}

					function b(a, c, h) {
						var f;
						c.collapsed ? h.startContainer instanceof CKEDITOR.dom.element ? (a = h.checkStartOfBlock(), f = new CKEDITOR.dom.text("​"), a ? h.startContainer.append(f, !0) : 0 === h.startOffset ? f.insertBefore(h.startContainer.getFirst()) : (h = h.startContainer.getChildren().getItem(h.startOffset - 1), f.insertAfter(h)), c.setStart(f.$, 0), c.setEnd(f.$, 0), a = c.getClientRects(), f.remove()) : h.startContainer instanceof CKEDITOR.dom.text &&
							("" === h.startContainer.getText() ? (h.startContainer.setText("​"), a = c.getClientRects(), h.startContainer.setText("")) : a = [d(h.createBookmark())]) : a = [d(h.createBookmark())];
						return a
					}

					function c(a, b, h) {
						a = CKEDITOR.tools.extend({}, a);
						b && (a = CKEDITOR.tools.getAbsoluteRectPosition(h.document.getWindow(), a));
						!a.width && (a.width = a.right - a.left);
						!a.height && (a.height = a.bottom - a.top);
						return a
					}

					function d(a) {
						var b = a.startNode;
						a = a.endNode;
						var c;
						b.setText("​");
						b.removeStyle("display");
						a ? (a.setText("​"), a.removeStyle("display"),
							c = [b.getClientRect(), a.getClientRect()], a.remove()) : c = [b.getClientRect(), b.getClientRect()];
						b.remove();
						return {
							right: Math.max(c[0].right, c[1].right),
							bottom: Math.max(c[0].bottom, c[1].bottom),
							left: Math.min(c[0].left, c[1].left),
							top: Math.min(c[0].top, c[1].top),
							width: Math.abs(c[0].left - c[1].left),
							height: Math.max(c[0].bottom, c[1].bottom) - Math.min(c[0].top, c[1].top)
						}
					}
					return void 0 !== this.document.getSelection ? function (d) {
						var f = this.root.getDocument().$.createRange(),
							g;
						f.setStart(this.startContainer.$, this.startOffset);
						f.setEnd(this.endContainer.$, this.endOffset);
						g = f.getClientRects();
						g = a(g, this);
						g.length || (g = b(g, f, this));
						return CKEDITOR.tools.array.map(g, function (a) {
							return c(a, d, this)
						}, this)
					} : function (a) {
						return [c(d(this.createBookmark()), a, this)]
					}
				}(),
				_setStartContainer: function (a) {
					this.startContainer = a
				},
				_setEndContainer: function (a) {
					this.endContainer = a
				},
				_find: function (a, b) {
					var c = this.getCommonAncestor(),
						d = this.getBoundaryNodes(),
						f = [],
						g, m, e, k;
					if (c && c.find)
						for (m = c.find(a), g = 0; g < m.count(); g++)
							if (c = m.getItem(g), b || !c.isReadOnly()) e =
								c.getPosition(d.startNode) & CKEDITOR.POSITION_FOLLOWING || d.startNode.equals(c), k = c.getPosition(d.endNode) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IS_CONTAINED || d.endNode.equals(c), e && k && f.push(c);
					return f
				}
			};
			CKEDITOR.dom.range.mergeRanges = function (a) {
				return CKEDITOR.tools.array.reduce(a, function (a, b) {
					var c = a[a.length - 1],
						h = !1;
					b = b.clone();
					b.enlarge(CKEDITOR.ENLARGE_ELEMENT);
					if (c) {
						var d = new CKEDITOR.dom.range(b.root),
							h = new CKEDITOR.dom.walker(d),
							f = CKEDITOR.dom.walker.whitespaces();
						d.setStart(c.endContainer,
							c.endOffset);
						d.setEnd(b.startContainer, b.startOffset);
						for (d = h.next(); f(d) || b.endContainer.equals(d);) d = h.next();
						h = !d
					}
					h ? c.setEnd(b.endContainer, b.endOffset) : a.push(b);
					return a
				}, [])
			}
		}(), CKEDITOR.POSITION_AFTER_START = 1, CKEDITOR.POSITION_BEFORE_END = 2, CKEDITOR.POSITION_BEFORE_START = 3, CKEDITOR.POSITION_AFTER_END = 4, CKEDITOR.ENLARGE_ELEMENT = 1, CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2, CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3, CKEDITOR.ENLARGE_INLINE = 4, CKEDITOR.START = 1, CKEDITOR.END = 2, CKEDITOR.SHRINK_ELEMENT = 1, CKEDITOR.SHRINK_TEXT =
		2, "use strict",
		function () {
			function a(a) {
				1 > arguments.length || (this.range = a, this.forceBrBreak = 0, this.enlargeBr = 1, this.enforceRealBlocks = 0, this._ || (this._ = {}))
			}

			function e(a) {
				var b = [];
				a.forEach(function (a) {
					if ("true" == a.getAttribute("contenteditable")) return b.push(a), !1
				}, CKEDITOR.NODE_ELEMENT, !0);
				return b
			}

			function b(a, c, d, f) {
				a: {
					null == f && (f = e(d));
					for (var g; g = f.shift();)
						if (g.getDtd().p) {
							f = {
								element: g,
								remaining: f
							};
							break a
						}
					f = null
				}
				if (!f) return 0;
				if ((g = CKEDITOR.filter.instances[f.element.data("cke-filter")]) &&
					!g.check(c)) return b(a, c, d, f.remaining);c = new CKEDITOR.dom.range(f.element);c.selectNodeContents(f.element);c = c.createIterator();c.enlargeBr = a.enlargeBr;c.enforceRealBlocks = a.enforceRealBlocks;c.activeFilter = c.filter = g;a._.nestedEditable = {
					element: f.element,
					container: d,
					remaining: f.remaining,
					iterator: c
				};
				return 1
			}

			function c(a, b, c) {
				if (!b) return !1;
				a = a.clone();
				a.collapse(!c);
				return a.checkBoundaryOfElement(b, c ? CKEDITOR.START : CKEDITOR.END)
			}
			var g = /^[\r\n\t ]+$/,
				l = CKEDITOR.dom.walker.bookmark(!1, !0),
				k = CKEDITOR.dom.walker.whitespaces(!0),
				f = function (a) {
					return l(a) && k(a)
				},
				d = {
					dd: 1,
					dt: 1,
					li: 1
				};
			a.prototype = {
				getNextParagraph: function (a) {
					var h, e, k, q, y;
					a = a || "p";
					if (this._.nestedEditable) {
						if (h = this._.nestedEditable.iterator.getNextParagraph(a)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, h;
						this.activeFilter = this.filter;
						if (b(this, a, this._.nestedEditable.container, this._.nestedEditable.remaining)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, this._.nestedEditable.iterator.getNextParagraph(a);
						this._.nestedEditable =
							null
					}
					if (!this.range.root.getDtd()[a]) return null;
					if (!this._.started) {
						var u = this.range.clone();
						e = u.startPath();
						var r = u.endPath(),
							w = !u.collapsed && c(u, e.block),
							t = !u.collapsed && c(u, r.block, 1);
						u.shrink(CKEDITOR.SHRINK_ELEMENT, !0);
						w && u.setStartAt(e.block, CKEDITOR.POSITION_BEFORE_END);
						t && u.setEndAt(r.block, CKEDITOR.POSITION_AFTER_START);
						e = u.endContainer.hasAscendant("pre", !0) || u.startContainer.hasAscendant("pre", !0);
						u.enlarge(this.forceBrBreak && !e || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
						u.collapsed || (e = new CKEDITOR.dom.walker(u.clone()), r = CKEDITOR.dom.walker.bookmark(!0, !0), e.evaluator = r, this._.nextNode = e.next(), e = new CKEDITOR.dom.walker(u.clone()), e.evaluator = r, e = e.previous(), this._.lastNode = e.getNextSourceNode(!0, null, u.root), this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary() && (r = this.range.clone(), r.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END), r.checkEndOfBlock() &&
							(r = new CKEDITOR.dom.elementPath(r.endContainer, r.root), this._.lastNode = (r.block || r.blockLimit).getNextSourceNode(!0))), this._.lastNode && u.root.contains(this._.lastNode) || (this._.lastNode = this._.docEndMarker = u.document.createText(""), this._.lastNode.insertAfter(e)), u = null);
						this._.started = 1;
						e = u
					}
					r = this._.nextNode;
					u = this._.lastNode;
					for (this._.nextNode = null; r;) {
						var w = 0,
							t = r.hasAscendant("pre"),
							B = r.type != CKEDITOR.NODE_ELEMENT,
							v = 0;
						if (B) r.type == CKEDITOR.NODE_TEXT && g.test(r.getText()) && (B = 0);
						else {
							var z = r.getName();
							if (CKEDITOR.dtd.$block[z] && "false" == r.getAttribute("contenteditable")) {
								h = r;
								b(this, a, h);
								break
							} else if (r.isBlockBoundary(this.forceBrBreak && !t && {
									br: 1
								})) {
								if ("br" == z) B = 1;
								else if (!e && !r.getChildCount() && "hr" != z) {
									h = r;
									k = r.equals(u);
									break
								}
								e && (e.setEndAt(r, CKEDITOR.POSITION_BEFORE_START), "br" != z && (this._.nextNode = r));
								w = 1
							} else {
								if (r.getFirst()) {
									e || (e = this.range.clone(), e.setStartAt(r, CKEDITOR.POSITION_BEFORE_START));
									r = r.getFirst();
									continue
								}
								B = 1
							}
						}
						B && !e && (e = this.range.clone(), e.setStartAt(r, CKEDITOR.POSITION_BEFORE_START));
						k = (!w || B) && r.equals(u);
						if (e && !w)
							for (; !r.getNext(f) && !k;) {
								z = r.getParent();
								if (z.isBlockBoundary(this.forceBrBreak && !t && {
										br: 1
									})) {
									w = 1;
									B = 0;
									k || z.equals(u);
									e.setEndAt(z, CKEDITOR.POSITION_BEFORE_END);
									break
								}
								r = z;
								B = 1;
								k = r.equals(u);
								v = 1
							}
						B && e.setEndAt(r, CKEDITOR.POSITION_AFTER_END);
						r = this._getNextSourceNode(r, v, u);
						if ((k = !r) || w && e) break
					}
					if (!h) {
						if (!e) return this._.docEndMarker && this._.docEndMarker.remove(), this._.nextNode = null;
						h = new CKEDITOR.dom.elementPath(e.startContainer, e.root);
						r = h.blockLimit;
						w = {
							div: 1,
							th: 1,
							td: 1
						};
						h = h.block;
						!h && r && !this.enforceRealBlocks && w[r.getName()] && e.checkStartOfBlock() && e.checkEndOfBlock() && !r.equals(e.root) ? h = r : !h || this.enforceRealBlocks && h.is(d) ? (h = this.range.document.createElement(a), e.extractContents().appendTo(h), h.trim(), e.insertNode(h), q = y = !0) : "li" != h.getName() ? e.checkStartOfBlock() && e.checkEndOfBlock() || (h = h.clone(!1), e.extractContents().appendTo(h), h.trim(), y = e.splitBlock(), q = !y.wasStartOfBlock, y = !y.wasEndOfBlock, e.insertNode(h)) : k || (this._.nextNode = h.equals(u) ? null : this._getNextSourceNode(e.getBoundaryNodes().endNode,
							1, u))
					}
					q && (q = h.getPrevious()) && q.type == CKEDITOR.NODE_ELEMENT && ("br" == q.getName() ? q.remove() : q.getLast() && "br" == q.getLast().$.nodeName.toLowerCase() && q.getLast().remove());
					y && (q = h.getLast()) && q.type == CKEDITOR.NODE_ELEMENT && "br" == q.getName() && (!CKEDITOR.env.needsBrFiller || q.getPrevious(l) || q.getNext(l)) && q.remove();
					this._.nextNode || (this._.nextNode = k || h.equals(u) || !u ? null : this._getNextSourceNode(h, 1, u));
					return h
				},
				_getNextSourceNode: function (a, b, c) {
					function d(a) {
						return !(a.equals(c) || a.equals(f))
					}
					var f =
						this.range.root;
					for (a = a.getNextSourceNode(b, null, d); !l(a);) a = a.getNextSourceNode(b, null, d);
					return a
				}
			};
			CKEDITOR.dom.range.prototype.createIterator = function () {
				return new a(this)
			}
		}(), CKEDITOR.command = function (a, e) {
			this.uiItems = [];
			this.exec = function (b) {
				if (this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed()) return !1;
				this.editorFocus && a.focus();
				return !1 === this.fire("exec") ? !0 : !1 !== e.exec.call(this, a, b)
			};
			this.refresh = function (a, b) {
				if (!this.readOnly && a.readOnly) return !0;
				if (this.context && !b.isContextFor(this.context) ||
					!this.checkAllowed(!0)) return this.disable(), !0;
				this.startDisabled || this.enable();
				this.modes && !this.modes[a.mode] && this.disable();
				return !1 === this.fire("refresh", {
					editor: a,
					path: b
				}) ? !0 : e.refresh && !1 !== e.refresh.apply(this, arguments)
			};
			var b;
			this.checkAllowed = function (c) {
				return c || "boolean" != typeof b ? b = a.activeFilter.checkFeature(this) : b
			};
			CKEDITOR.tools.extend(this, e, {
				modes: {
					wysiwyg: 1
				},
				editorFocus: 1,
				contextSensitive: !!e.context,
				state: CKEDITOR.TRISTATE_DISABLED
			});
			CKEDITOR.event.call(this)
		}, CKEDITOR.command.prototype = {
			enable: function () {
				this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(this.preserveState && "undefined" != typeof this.previousState ? this.previousState : CKEDITOR.TRISTATE_OFF)
			},
			disable: function () {
				this.setState(CKEDITOR.TRISTATE_DISABLED)
			},
			setState: function (a) {
				if (this.state == a || a != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed()) return !1;
				this.previousState = this.state;
				this.state = a;
				this.fire("state");
				return !0
			},
			toggleState: function () {
				this.state == CKEDITOR.TRISTATE_OFF ? this.setState(CKEDITOR.TRISTATE_ON) :
					this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF)
			}
		}, CKEDITOR.event.implementOn(CKEDITOR.command.prototype), CKEDITOR.ENTER_P = 1, CKEDITOR.ENTER_BR = 2, CKEDITOR.ENTER_DIV = 3, CKEDITOR.config = {
			customConfig: "config.js",
			autoUpdateElement: !0,
			language: "",
			defaultLanguage: "en",
			contentsLangDirection: "",
			enterMode: CKEDITOR.ENTER_P,
			forceEnterMode: !1,
			shiftEnterMode: CKEDITOR.ENTER_BR,
			docType: "\x3c!DOCTYPE html\x3e",
			bodyId: "",
			bodyClass: "",
			fullPage: !1,
			height: 200,
			contentsCss: CKEDITOR.getUrl("contents.css"),
			extraPlugins: "",
			removePlugins: "",
			protectedSource: [],
			tabIndex: 0,
			width: "",
			baseFloatZIndex: 1E4,
			blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85]
		},
		function () {
			function a(a, b, c, h, d) {
				var f, g;
				a = [];
				for (f in b) {
					g = b[f];
					g = "boolean" == typeof g ? {} : "function" == typeof g ? {
						match: g
					} : D(g);
					"$" != f.charAt(0) && (g.elements = f);
					c && (g.featureName = c.toLowerCase());
					var e = g;
					e.elements = k(e.elements, /\s+/) || null;
					e.propertiesOnly = e.propertiesOnly || !0 === e.elements;
					var m = /\s*,\s*/,
						l = void 0;
					for (l in J) {
						e[l] = k(e[l],
							m) || null;
						var n = e,
							v = L[l],
							r = k(e[L[l]], m),
							z = e[l],
							F = [],
							t = !0,
							x = void 0;
						r ? t = !1 : r = {};
						for (x in z) "!" == x.charAt(0) && (x = x.slice(1), F.push(x), r[x] = !0, t = !1);
						for (; x = F.pop();) z[x] = z["!" + x], delete z["!" + x];
						n[v] = (t ? !1 : r) || null
					}
					e.match = e.match || null;
					h.push(g);
					a.push(g)
				}
				b = d.elements;
				d = d.generic;
				var p;
				c = 0;
				for (h = a.length; c < h; ++c) {
					f = D(a[c]);
					g = !0 === f.classes || !0 === f.styles || !0 === f.attributes;
					e = f;
					l = v = m = void 0;
					for (m in J) e[m] = w(e[m]);
					n = !0;
					for (l in L) {
						m = L[l];
						v = e[m];
						r = [];
						z = void 0;
						for (z in v) - 1 < z.indexOf("*") ? r.push(new RegExp("^" +
							z.replace(/\*/g, ".*") + "$")) : r.push(z);
						v = r;
						v.length && (e[m] = v, n = !1)
					}
					e.nothingRequired = n;
					e.noProperties = !(e.attributes || e.classes || e.styles);
					if (!0 === f.elements || null === f.elements) d[g ? "unshift" : "push"](f);
					else
						for (p in e = f.elements, delete f.elements, e)
							if (b[p]) b[p][g ? "unshift" : "push"](f);
							else b[p] = [f]
				}
			}

			function e(a, c, h, d) {
				if (!a.match || a.match(c))
					if (d || f(a, c))
						if (a.propertiesOnly || (h.valid = !0), h.allAttributes || (h.allAttributes = b(a.attributes, c.attributes, h.validAttributes)), h.allStyles || (h.allStyles = b(a.styles,
								c.styles, h.validStyles)), !h.allClasses) {
							a = a.classes;
							c = c.classes;
							d = h.validClasses;
							if (a)
								if (!0 === a) a = !0;
								else {
									for (var g = 0, e = c.length, m; g < e; ++g) m = c[g], d[m] || (d[m] = a(m));
									a = !1
								}
							else a = !1;
							h.allClasses = a
						}
			}

			function b(a, b, c) {
				if (!a) return !1;
				if (!0 === a) return !0;
				for (var h in b) c[h] || (c[h] = a(h));
				return !1
			}

			function c(a, b, c) {
				if (!a.match || a.match(b)) {
					if (a.noProperties) return !1;
					c.hadInvalidAttribute = g(a.attributes, b.attributes) || c.hadInvalidAttribute;
					c.hadInvalidStyle = g(a.styles, b.styles) || c.hadInvalidStyle;
					a = a.classes;
					b = b.classes;
					if (a) {
						for (var h = !1, d = !0 === a, f = b.length; f--;)
							if (d || a(b[f])) b.splice(f, 1), h = !0;
						a = h
					} else a = !1;
					c.hadInvalidClass = a || c.hadInvalidClass
				}
			}

			function g(a, b) {
				if (!a) return !1;
				var c = !1,
					h = !0 === a,
					d;
				for (d in b)
					if (h || a(d)) delete b[d], c = !0;
				return c
			}

			function l(a, b, c) {
				if (a.disabled || a.customConfig && !c || !b) return !1;
				a._.cachedChecks = {};
				return !0
			}

			function k(a, b) {
				if (!a) return !1;
				if (!0 === a) return a;
				if ("string" == typeof a) return a = I(a), "*" == a ? !0 : CKEDITOR.tools.convertArrayToObject(a.split(b));
				if (CKEDITOR.tools.isArray(a)) return a.length ?
					CKEDITOR.tools.convertArrayToObject(a) : !1;
				var c = {},
					h = 0,
					d;
				for (d in a) c[d] = a[d], h++;
				return h ? c : !1
			}

			function f(a, b) {
				if (a.nothingRequired) return !0;
				var c, h, f, g;
				if (f = a.requiredClasses)
					for (g = b.classes, c = 0; c < f.length; ++c)
						if (h = f[c], "string" == typeof h) {
							if (-1 == CKEDITOR.tools.indexOf(g, h)) return !1
						} else if (!CKEDITOR.tools.checkIfAnyArrayItemMatches(g, h)) return !1;
				return d(b.styles, a.requiredStyles) && d(b.attributes, a.requiredAttributes)
			}

			function d(a, b) {
				if (!b) return !0;
				for (var c = 0, h; c < b.length; ++c)
					if (h = b[c], "string" ==
						typeof h) {
						if (!(h in a)) return !1
					} else if (!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(a, h)) return !1;
				return !0
			}

			function m(a) {
				if (!a) return {};
				a = a.split(/\s*,\s*/).sort();
				for (var b = {}; a.length;) b[a.shift()] = "cke-test";
				return b
			}

			function h(a) {
				var b, c, h, d, f = {},
					g = 1;
				for (a = I(a); b = a.match(F);)(c = b[2]) ? (h = n(c, "styles"), d = n(c, "attrs"), c = n(c, "classes")) : h = d = c = null, f["$" + g++] = {
					elements: b[1],
					classes: c,
					styles: h,
					attributes: d
				}, a = a.slice(b[0].length);
				return f
			}

			function n(a, b) {
				var c = a.match(S[b]);
				return c ? I(c[1]) : null
			}

			function p(a) {
				var b = a.styleBackup = a.attributes.style,
					c = a.classBackup = a.attributes["class"];
				a.styles || (a.styles = CKEDITOR.tools.parseCssText(b || "", 1));
				a.classes || (a.classes = c ? c.split(/\s+/) : [])
			}

			function q(a, b, h, d) {
				var f = 0,
					g;
				d.toHtml && (b.name = b.name.replace(N, "$1"));
				if (d.doCallbacks && a.elementCallbacks) {
					a: {
						g = a.elementCallbacks;
						for (var m = 0, k = g.length, l; m < k; ++m)
							if (l = g[m](b)) {
								g = l;
								break a
							}
						g = void 0
					}
					if (g) return g
				}
				if (d.doTransform && (g = a._.transformations[b.name])) {
					p(b);
					for (m = 0; m < g.length; ++m) z(a, b, g[m]);
					u(b)
				}
				if (d.doFilter) {
					a: {
						m =
						b.name;k = a._;a = k.allowedRules.elements[m];g = k.allowedRules.generic;m = k.disallowedRules.elements[m];k = k.disallowedRules.generic;l = d.skipRequired;
						var n = {
								valid: !1,
								validAttributes: {},
								validClasses: {},
								validStyles: {},
								allAttributes: !1,
								allClasses: !1,
								allStyles: !1,
								hadInvalidAttribute: !1,
								hadInvalidClass: !1,
								hadInvalidStyle: !1
							},
							v, F;
						if (a || g) {
							p(b);
							if (m)
								for (v = 0, F = m.length; v < F; ++v)
									if (!1 === c(m[v], b, n)) {
										a = null;
										break a
									}
							if (k)
								for (v = 0, F = k.length; v < F; ++v) c(k[v], b, n);
							if (a)
								for (v = 0, F = a.length; v < F; ++v) e(a[v], b, n, l);
							if (g)
								for (v =
									0, F = g.length; v < F; ++v) e(g[v], b, n, l);
							a = n
						} else a = null
					}
					if (!a || !a.valid) return h.push(b), 1;F = a.validAttributes;
					var t = a.validStyles;g = a.validClasses;
					var m = b.attributes,
						x = b.styles,
						k = b.classes;l = b.classBackup;
					var L = b.styleBackup,
						w, y, C = [],
						n = [],
						E = /^data-cke-/;v = !1;delete m.style;delete m["class"];delete b.classBackup;delete b.styleBackup;
					if (!a.allAttributes)
						for (w in m) F[w] || (E.test(w) ? w == (y = w.replace(/^data-cke-saved-/, "")) || F[y] || (delete m[w], v = !0) : (delete m[w], v = !0));
					if (!a.allStyles || a.hadInvalidStyle) {
						for (w in x) a.allStyles ||
							t[w] ? C.push(w + ":" + x[w]) : v = !0;
						C.length && (m.style = C.sort().join("; "))
					} else L && (m.style = L);
					if (!a.allClasses || a.hadInvalidClass) {
						for (w = 0; w < k.length; ++w)(a.allClasses || g[k[w]]) && n.push(k[w]);
						n.length && (m["class"] = n.sort().join(" "));
						l && n.length < l.split(/\s+/).length && (v = !0)
					} else l && (m["class"] = l);v && (f = 1);
					if (!d.skipFinalValidation && !r(b)) return h.push(b), 1
				}
				d.toHtml && (b.name = b.name.replace(R, "cke:$1"));
				return f
			}

			function y(a) {
				var b = [],
					c;
				for (c in a) - 1 < c.indexOf("*") && b.push(c.replace(/\*/g, ".*"));
				return b.length ?
					new RegExp("^(?:" + b.join("|") + ")$") : null
			}

			function u(a) {
				var b = a.attributes,
					c;
				delete b.style;
				delete b["class"];
				if (c = CKEDITOR.tools.writeCssText(a.styles, !0)) b.style = c;
				a.classes.length && (b["class"] = a.classes.sort().join(" "))
			}

			function r(a) {
				switch (a.name) {
					case "a":
						if (!(a.children.length || a.attributes.name || a.attributes.id)) return !1;
						break;
					case "img":
						if (!a.attributes.src) return !1
				}
				return !0
			}

			function w(a) {
				if (!a) return !1;
				if (!0 === a) return !0;
				var b = y(a);
				return function (c) {
					return c in a || b && c.match(b)
				}
			}

			function t() {
				return new CKEDITOR.htmlParser.element("br")
			}

			function B(a) {
				return a.type == CKEDITOR.NODE_ELEMENT && ("br" == a.name || E.$block[a.name])
			}

			function v(a, b, c) {
				var h = a.name;
				if (E.$empty[h] || !a.children.length) "hr" == h && "br" == b ? a.replaceWith(t()) : (a.parent && c.push({
					check: "it",
					el: a.parent
				}), a.remove());
				else if (E.$block[h] || "tr" == h)
					if ("br" == b) a.previous && !B(a.previous) && (b = t(), b.insertBefore(a)), a.next && !B(a.next) && (b = t(), b.insertAfter(a)), a.replaceWithChildren();
					else {
						var h = a.children,
							d;
						b: {
							d = E[b];
							for (var f = 0, g = h.length, e; f < g; ++f)
								if (e = h[f], e.type == CKEDITOR.NODE_ELEMENT &&
									!d[e.name]) {
									d = !1;
									break b
								}
							d = !0
						}
						if (d) a.name = b, a.attributes = {}, c.push({
							check: "parent-down",
							el: a
						});
						else {
							d = a.parent;
							for (var f = d.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || "body" == d.name, m, k, g = h.length; 0 < g;) e = h[--g], f && (e.type == CKEDITOR.NODE_TEXT || e.type == CKEDITOR.NODE_ELEMENT && E.$inline[e.name]) ? (m || (m = new CKEDITOR.htmlParser.element(b), m.insertAfter(a), c.push({
								check: "parent-down",
								el: m
							})), m.add(e, 0)) : (m = null, k = E[d.name] || E.span, e.insertAfter(a), d.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || e.type != CKEDITOR.NODE_ELEMENT ||
								k[e.name] || c.push({
									check: "el-up",
									el: e
								}));
							a.remove()
						}
					}
				else h in {
					style: 1,
					script: 1
				} ? a.remove() : (a.parent && c.push({
					check: "it",
					el: a.parent
				}), a.replaceWithChildren())
			}

			function z(a, b, c) {
				var h, d;
				for (h = 0; h < c.length; ++h)
					if (d = c[h], !(d.check && !a.check(d.check, !1) || d.left && !d.left(b))) {
						d.right(b, K);
						break
					}
			}

			function C(a, b) {
				var c = b.getDefinition(),
					h = c.attributes,
					d = c.styles,
					f, g, e, m;
				if (a.name != c.element) return !1;
				for (f in h)
					if ("class" == f)
						for (c = h[f].split(/\s+/), e = a.classes.join("|"); m = c.pop();) {
							if (-1 == e.indexOf(m)) return !1
						} else if (a.attributes[f] !=
							h[f]) return !1;
				for (g in d)
					if (a.styles[g] != d[g]) return !1;
				return !0
			}

			function x(a, b) {
				var c, h;
				"string" == typeof a ? c = a : a instanceof CKEDITOR.style ? h = a : (c = a[0], h = a[1]);
				return [{
					element: c,
					left: h,
					right: function (a, c) {
						c.transform(a, b)
					}
				}]
			}

			function A(a) {
				return function (b) {
					return C(b, a)
				}
			}

			function G(a) {
				return function (b, c) {
					c[a](b)
				}
			}
			var E = CKEDITOR.dtd,
				D = CKEDITOR.tools.copy,
				I = CKEDITOR.tools.trim,
				H = ["", "p", "br", "div"];
			CKEDITOR.FILTER_SKIP_TREE = 2;
			CKEDITOR.filter = function (a, b) {
				this.allowedContent = [];
				this.disallowedContent = [];
				this.elementCallbacks = null;
				this.disabled = !1;
				this.editor = null;
				this.id = CKEDITOR.tools.getNextNumber();
				this._ = {
					allowedRules: {
						elements: {},
						generic: []
					},
					disallowedRules: {
						elements: {},
						generic: []
					},
					transformations: {},
					cachedTests: {},
					cachedChecks: {}
				};
				CKEDITOR.filter.instances[this.id] = this;
				var c = this.editor = a instanceof CKEDITOR.editor ? a : null;
				if (c && !b) {
					this.customConfig = !0;
					var h = c.config.allowedContent;
					!0 === h ? this.disabled = !0 : (h || (this.customConfig = !1), this.allow(h, "config", 1), this.allow(c.config.extraAllowedContent,
						"extra", 1), this.allow(H[c.enterMode] + " " + H[c.shiftEnterMode], "default", 1), this.disallow(c.config.disallowedContent))
				} else this.customConfig = !1, this.allow(b || a, "default", 1)
			};
			CKEDITOR.filter.instances = {};
			CKEDITOR.filter.prototype = {
				allow: function (b, c, d) {
					if (!l(this, b, d)) return !1;
					var f, g;
					if ("string" == typeof b) b = h(b);
					else if (b instanceof CKEDITOR.style) {
						if (b.toAllowedContentRules) return this.allow(b.toAllowedContentRules(this.editor), c, d);
						f = b.getDefinition();
						b = {};
						d = f.attributes;
						b[f.element] = f = {
							styles: f.styles,
							requiredStyles: f.styles && CKEDITOR.tools.objectKeys(f.styles)
						};
						d && (d = D(d), f.classes = d["class"] ? d["class"].split(/\s+/) : null, f.requiredClasses = f.classes, delete d["class"], f.attributes = d, f.requiredAttributes = d && CKEDITOR.tools.objectKeys(d))
					} else if (CKEDITOR.tools.isArray(b)) {
						for (f = 0; f < b.length; ++f) g = this.allow(b[f], c, d);
						return g
					}
					a(this, b, c, this.allowedContent, this._.allowedRules);
					return !0
				},
				applyTo: function (a, b, c, h) {
					if (this.disabled) return !1;
					var d = this,
						f = [],
						g = this.editor && this.editor.config.protectedSource,
						e, m = !1,
						k = {
							doFilter: !c,
							doTransform: !0,
							doCallbacks: !0,
							toHtml: b
						};
					a.forEach(function (a) {
						if (a.type == CKEDITOR.NODE_ELEMENT) {
							if ("off" == a.attributes["data-cke-filter"]) return !1;
							if (!b || "span" != a.name || !~CKEDITOR.tools.objectKeys(a.attributes).join("|").indexOf("data-cke-"))
								if (e = q(d, a, f, k), e & 1) m = !0;
								else if (e & 2) return !1
						} else if (a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) {
							var c;
							a: {
								var h = decodeURIComponent(a.value.replace(/^\{cke_protected\}/, ""));c = [];
								var l, n, v;
								if (g)
									for (n = 0; n <
										g.length; ++n)
										if ((v = h.match(g[n])) && v[0].length == h.length) {
											c = !0;
											break a
										}
								h = CKEDITOR.htmlParser.fragment.fromHtml(h);1 == h.children.length && (l = h.children[0]).type == CKEDITOR.NODE_ELEMENT && q(d, l, c, k);c = !c.length
							}
							c || f.push(a)
						}
					}, null, !0);
					f.length && (m = !0);
					var l;
					a = [];
					h = H[h || (this.editor ? this.editor.enterMode : CKEDITOR.ENTER_P)];
					for (var n; c = f.pop();) c.type == CKEDITOR.NODE_ELEMENT ? v(c, h, a) : c.remove();
					for (; l = a.pop();)
						if (c = l.el, c.parent) switch (n = E[c.parent.name] || E.span, l.check) {
							case "it":
								E.$removeEmpty[c.name] &&
									!c.children.length ? v(c, h, a) : r(c) || v(c, h, a);
								break;
							case "el-up":
								c.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || n[c.name] || v(c, h, a);
								break;
							case "parent-down":
								c.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || n[c.name] || v(c.parent, h, a)
						}
						return m
				},
				checkFeature: function (a) {
					if (this.disabled || !a) return !0;
					a.toFeature && (a = a.toFeature(this.editor));
					return !a.requiredContent || this.check(a.requiredContent)
				},
				disable: function () {
					this.disabled = !0
				},
				disallow: function (b) {
					if (!l(this, b, !0)) return !1;
					"string" == typeof b && (b =
						h(b));
					a(this, b, null, this.disallowedContent, this._.disallowedRules);
					return !0
				},
				addContentForms: function (a) {
					if (!this.disabled && a) {
						var b, c, h = [],
							d;
						for (b = 0; b < a.length && !d; ++b) c = a[b], ("string" == typeof c || c instanceof CKEDITOR.style) && this.check(c) && (d = c);
						if (d) {
							for (b = 0; b < a.length; ++b) h.push(x(a[b], d));
							this.addTransformations(h)
						}
					}
				},
				addElementCallback: function (a) {
					this.elementCallbacks || (this.elementCallbacks = []);
					this.elementCallbacks.push(a)
				},
				addFeature: function (a) {
					if (this.disabled || !a) return !0;
					a.toFeature &&
						(a = a.toFeature(this.editor));
					this.allow(a.allowedContent, a.name);
					this.addTransformations(a.contentTransformations);
					this.addContentForms(a.contentForms);
					return a.requiredContent && (this.customConfig || this.disallowedContent.length) ? this.check(a.requiredContent) : !0
				},
				addTransformations: function (a) {
					var b, c;
					if (!this.disabled && a) {
						var h = this._.transformations,
							d;
						for (d = 0; d < a.length; ++d) {
							b = a[d];
							var f = void 0,
								g = void 0,
								e = void 0,
								m = void 0,
								k = void 0,
								l = void 0;
							c = [];
							for (g = 0; g < b.length; ++g) e = b[g], "string" == typeof e ? (e =
								e.split(/\s*:\s*/), m = e[0], k = null, l = e[1]) : (m = e.check, k = e.left, l = e.right), f || (f = e, f = f.element ? f.element : m ? m.match(/^([a-z0-9]+)/i)[0] : f.left.getDefinition().element), k instanceof CKEDITOR.style && (k = A(k)), c.push({
								check: m == f ? null : m,
								left: k,
								right: "string" == typeof l ? G(l) : l
							});
							b = f;
							h[b] || (h[b] = []);
							h[b].push(c)
						}
					}
				},
				check: function (a, b, c) {
					if (this.disabled) return !0;
					if (CKEDITOR.tools.isArray(a)) {
						for (var d = a.length; d--;)
							if (this.check(a[d], b, c)) return !0;
						return !1
					}
					var f, g;
					if ("string" == typeof a) {
						g = a + "\x3c" + (!1 === b ? "0" :
							"1") + (c ? "1" : "0") + "\x3e";
						if (g in this._.cachedChecks) return this._.cachedChecks[g];
						f = h(a).$1;
						var e = f.styles,
							d = f.classes;
						f.name = f.elements;
						f.classes = d = d ? d.split(/\s*,\s*/) : [];
						f.styles = m(e);
						f.attributes = m(f.attributes);
						f.children = [];
						d.length && (f.attributes["class"] = d.join(" "));
						e && (f.attributes.style = CKEDITOR.tools.writeCssText(f.styles))
					} else f = a.getDefinition(), e = f.styles, d = f.attributes || {}, e && !CKEDITOR.tools.isEmpty(e) ? (e = D(e), d.style = CKEDITOR.tools.writeCssText(e, !0)) : e = {}, f = {
						name: f.element,
						attributes: d,
						classes: d["class"] ? d["class"].split(/\s+/) : [],
						styles: e,
						children: []
					};
					var e = CKEDITOR.tools.clone(f),
						k = [],
						l;
					if (!1 !== b && (l = this._.transformations[f.name])) {
						for (d = 0; d < l.length; ++d) z(this, f, l[d]);
						u(f)
					}
					q(this, e, k, {
						doFilter: !0,
						doTransform: !1 !== b,
						skipRequired: !c,
						skipFinalValidation: !c
					});
					0 < k.length ? c = !1 : ((b = f.attributes["class"]) && (f.attributes["class"] = f.attributes["class"].split(" ").sort().join(" ")), c = CKEDITOR.tools.objectCompare(f.attributes, e.attributes, !0), b && (f.attributes["class"] = b));
					"string" == typeof a &&
						(this._.cachedChecks[g] = c);
					return c
				},
				getAllowedEnterMode: function () {
					var a = ["p", "div", "br"],
						b = {
							p: CKEDITOR.ENTER_P,
							div: CKEDITOR.ENTER_DIV,
							br: CKEDITOR.ENTER_BR
						};
					return function (c, h) {
						var d = a.slice(),
							f;
						if (this.check(H[c])) return c;
						for (h || (d = d.reverse()); f = d.pop();)
							if (this.check(f)) return b[f];
						return CKEDITOR.ENTER_BR
					}
				}(),
				clone: function () {
					var a = new CKEDITOR.filter,
						b = CKEDITOR.tools.clone;
					a.allowedContent = b(this.allowedContent);
					a._.allowedRules = b(this._.allowedRules);
					a.disallowedContent = b(this.disallowedContent);
					a._.disallowedRules = b(this._.disallowedRules);
					a._.transformations = b(this._.transformations);
					a.disabled = this.disabled;
					a.editor = this.editor;
					return a
				},
				destroy: function () {
					delete CKEDITOR.filter.instances[this.id];
					delete this._;
					delete this.allowedContent;
					delete this.disallowedContent
				}
			};
			var J = {
					styles: 1,
					attributes: 1,
					classes: 1
				},
				L = {
					styles: "requiredStyles",
					attributes: "requiredAttributes",
					classes: "requiredClasses"
				},
				F = /^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,
				S = {
					styles: /{([^}]+)}/,
					attrs: /\[([^\]]+)\]/,
					classes: /\(([^\)]+)\)/
				},
				N = /^cke:(object|embed|param)$/,
				R = /^(object|embed|param)$/,
				K;
			K = CKEDITOR.filter.transformationsTools = {
				sizeToStyle: function (a) {
					this.lengthToStyle(a, "width");
					this.lengthToStyle(a, "height")
				},
				sizeToAttribute: function (a) {
					this.lengthToAttribute(a, "width");
					this.lengthToAttribute(a, "height")
				},
				lengthToStyle: function (a, b, c) {
					c = c || b;
					if (!(c in a.styles)) {
						var d = a.attributes[b];
						d && (/^\d+$/.test(d) && (d += "px"), a.styles[c] = d)
					}
					delete a.attributes[b]
				},
				lengthToAttribute: function (a, b, c) {
					c = c || b;
					if (!(c in a.attributes)) {
						var d = a.styles[b],
							h = d && d.match(/^(\d+)(?:\.\d*)?px$/);
						h ? a.attributes[c] = h[1] : "cke-test" == d && (a.attributes[c] = "cke-test")
					}
					delete a.styles[b]
				},
				alignmentToStyle: function (a) {
					if (!("float" in a.styles)) {
						var b = a.attributes.align;
						if ("left" == b || "right" == b) a.styles["float"] = b
					}
					delete a.attributes.align
				},
				alignmentToAttribute: function (a) {
					if (!("align" in a.attributes)) {
						var b = a.styles["float"];
						if ("left" == b || "right" == b) a.attributes.align = b
					}
					delete a.styles["float"]
				},
				splitBorderShorthand: function (a) {
					if (a.styles.border) {
						var b = CKEDITOR.tools.style.parse.border(a.styles.border);
						b.color && (a.styles["border-color"] = b.color);
						b.style && (a.styles["border-style"] = b.style);
						b.width && (a.styles["border-width"] = b.width);
						delete a.styles.border
					}
				},
				listTypeToStyle: function (a) {
					if (a.attributes.type) switch (a.attributes.type) {
						case "a":
							a.styles["list-style-type"] = "lower-alpha";
							break;
						case "A":
							a.styles["list-style-type"] = "upper-alpha";
							break;
						case "i":
							a.styles["list-style-type"] = "lower-roman";
							break;
						case "I":
							a.styles["list-style-type"] = "upper-roman";
							break;
						case "1":
							a.styles["list-style-type"] = "decimal";
							break;
						default:
							a.styles["list-style-type"] = a.attributes.type
					}
				},
				splitMarginShorthand: function (a) {
					function b(d) {
						a.styles["margin-top"] = c[d[0]];
						a.styles["margin-right"] = c[d[1]];
						a.styles["margin-bottom"] = c[d[2]];
						a.styles["margin-left"] = c[d[3]]
					}
					if (a.styles.margin) {
						var c = a.styles.margin.match(/(\-?[\.\d]+\w+)/g) || ["0px"];
						switch (c.length) {
							case 1:
								b([0, 0, 0, 0]);
								break;
							case 2:
								b([0, 1, 0, 1]);
								break;
							case 3:
								b([0,
									1, 2, 1
								]);
								break;
							case 4:
								b([0, 1, 2, 3])
						}
						delete a.styles.margin
					}
				},
				matchesStyle: C,
				transform: function (a, b) {
					if ("string" == typeof b) a.name = b;
					else {
						var c = b.getDefinition(),
							d = c.styles,
							h = c.attributes,
							f, g, e, m;
						a.name = c.element;
						for (f in h)
							if ("class" == f)
								for (c = a.classes.join("|"), e = h[f].split(/\s+/); m = e.pop();) - 1 == c.indexOf(m) && a.classes.push(m);
							else a.attributes[f] = h[f];
						for (g in d) a.styles[g] = d[g]
					}
				}
			}
		}(),
		function () {
			CKEDITOR.focusManager = function (a) {
				if (a.focusManager) return a.focusManager;
				this.hasFocus = !1;
				this.currentActive =
					null;
				this._ = {
					editor: a
				};
				return this
			};
			CKEDITOR.focusManager._ = {
				blurDelay: 200
			};
			CKEDITOR.focusManager.prototype = {
				focus: function (a) {
					this._.timer && clearTimeout(this._.timer);
					a && (this.currentActive = a);
					this.hasFocus || this._.locked || ((a = CKEDITOR.currentInstance) && a.focusManager.blur(1), this.hasFocus = !0, (a = this._.editor.container) && a.addClass("cke_focus"), this._.editor.fire("focus"))
				},
				lock: function () {
					this._.locked = 1
				},
				unlock: function () {
					delete this._.locked
				},
				blur: function (a) {
					function e() {
						if (this.hasFocus) {
							this.hasFocus = !1;
							var a = this._.editor.container;
							a && a.removeClass("cke_focus");
							this._.editor.fire("blur")
						}
					}
					if (!this._.locked) {
						this._.timer && clearTimeout(this._.timer);
						var b = CKEDITOR.focusManager._.blurDelay;
						a || !b ? e.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function () {
							delete this._.timer;
							e.call(this)
						}, b, this)
					}
				},
				add: function (a, e) {
					var b = a.getCustomData("focusmanager");
					if (!b || b != this) {
						b && b.remove(a);
						var b = "focus",
							c = "blur";
						e && (CKEDITOR.env.ie ? (b = "focusin", c = "focusout") : CKEDITOR.event.useCapture = 1);
						var g = {
							blur: function () {
								a.equals(this.currentActive) &&
									this.blur()
							},
							focus: function () {
								this.focus(a)
							}
						};
						a.on(b, g.focus, this);
						a.on(c, g.blur, this);
						e && (CKEDITOR.event.useCapture = 0);
						a.setCustomData("focusmanager", this);
						a.setCustomData("focusmanager_handlers", g)
					}
				},
				remove: function (a) {
					a.removeCustomData("focusmanager");
					var e = a.removeCustomData("focusmanager_handlers");
					a.removeListener("blur", e.blur);
					a.removeListener("focus", e.focus)
				}
			}
		}(), CKEDITOR.keystrokeHandler = function (a) {
			if (a.keystrokeHandler) return a.keystrokeHandler;
			this.keystrokes = {};
			this.blockedKeystrokes = {};
			this._ = {
				editor: a
			};
			return this
		},
		function () {
			var a, e = function (b) {
					b = b.data;
					var g = b.getKeystroke(),
						e = this.keystrokes[g],
						k = this._.editor;
					a = !1 === k.fire("key", {
						keyCode: g,
						domEvent: b
					});
					a || (e && (a = !1 !== k.execCommand(e, {
						from: "keystrokeHandler"
					})), a || (a = !!this.blockedKeystrokes[g]));
					a && b.preventDefault(!0);
					return !a
				},
				b = function (b) {
					a && (a = !1, b.data.preventDefault(!0))
				};
			CKEDITOR.keystrokeHandler.prototype = {
				attach: function (a) {
					a.on("keydown", e, this);
					if (CKEDITOR.env.gecko && CKEDITOR.env.mac) a.on("keypress", b, this)
				}
			}
		}(),
		function () {
			CKEDITOR.lang = {
				languages: {
					af: 1,
					ar: 1,
					az: 1,
					bg: 1,
					bn: 1,
					bs: 1,
					ca: 1,
					cs: 1,
					cy: 1,
					da: 1,
					de: 1,
					"de-ch": 1,
					el: 1,
					"en-au": 1,
					"en-ca": 1,
					"en-gb": 1,
					en: 1,
					eo: 1,
					es: 1,
					"es-mx": 1,
					et: 1,
					eu: 1,
					fa: 1,
					fi: 1,
					fo: 1,
					"fr-ca": 1,
					fr: 1,
					gl: 1,
					gu: 1,
					he: 1,
					hi: 1,
					hr: 1,
					hu: 1,
					id: 1,
					is: 1,
					it: 1,
					ja: 1,
					ka: 1,
					km: 1,
					ko: 1,
					ku: 1,
					lt: 1,
					lv: 1,
					mk: 1,
					mn: 1,
					ms: 1,
					nb: 1,
					nl: 1,
					no: 1,
					oc: 1,
					pl: 1,
					"pt-br": 1,
					pt: 1,
					ro: 1,
					ru: 1,
					si: 1,
					sk: 1,
					sl: 1,
					sq: 1,
					"sr-latn": 1,
					sr: 1,
					sv: 1,
					th: 1,
					tr: 1,
					tt: 1,
					ug: 1,
					uk: 1,
					vi: 1,
					"zh-cn": 1,
					zh: 1
				},
				rtl: {
					ar: 1,
					fa: 1,
					he: 1,
					ku: 1,
					ug: 1
				},
				load: function (a, e, b) {
					a && CKEDITOR.lang.languages[a] ||
						(a = this.detect(e, a));
					var c = this;
					e = function () {
						c[a].dir = c.rtl[a] ? "rtl" : "ltr";
						b(a, c[a])
					};
					this[a] ? e() : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + a + ".js"), e, this)
				},
				detect: function (a, e) {
					var b = this.languages;
					e = e || navigator.userLanguage || navigator.language || a;
					var c = e.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),
						g = c[1],
						c = c[2];
					b[g + "-" + c] ? g = g + "-" + c : b[g] || (g = null);
					CKEDITOR.lang.detect = g ? function () {
						return g
					} : function (a) {
						return a
					};
					return g || a
				}
			}
		}(), CKEDITOR.scriptLoader = function () {
			var a = {},
				e = {};
			return {
				load: function (b,
					c, g, l) {
					var k = "string" == typeof b;
					k && (b = [b]);
					g || (g = CKEDITOR);
					var f = b.length,
						d = [],
						m = [],
						h = function (a) {
							c && (k ? c.call(g, a) : c.call(g, d, m))
						};
					if (0 === f) h(!0);
					else {
						var n = function (a, b) {
								(b ? d : m).push(a);
								0 >= --f && (l && CKEDITOR.document.getDocumentElement().removeStyle("cursor"), h(b))
							},
							p = function (b, c) {
								a[b] = 1;
								var d = e[b];
								delete e[b];
								for (var h = 0; h < d.length; h++) d[h](b, c)
							},
							q = function (b) {
								if (a[b]) n(b, !0);
								else {
									var d = e[b] || (e[b] = []);
									d.push(n);
									if (!(1 < d.length)) {
										var h = new CKEDITOR.dom.element("script");
										h.setAttributes({
											type: "text/javascript",
											src: b
										});
										c && (CKEDITOR.env.ie && (8 >= CKEDITOR.env.version || CKEDITOR.env.ie9Compat) ? h.$.onreadystatechange = function () {
											if ("loaded" == h.$.readyState || "complete" == h.$.readyState) h.$.onreadystatechange = null, p(b, !0)
										} : (h.$.onload = function () {
											setTimeout(function () {
												p(b, !0)
											}, 0)
										}, h.$.onerror = function () {
											p(b, !1)
										}));
										h.appendTo(CKEDITOR.document.getHead())
									}
								}
							};
						l && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait");
						for (var y = 0; y < f; y++) q(b[y])
					}
				},
				queue: function () {
					function a() {
						var b;
						(b = c[0]) && this.load(b.scriptUrl,
							b.callback, CKEDITOR, 0)
					}
					var c = [];
					return function (g, e) {
						var k = this;
						c.push({
							scriptUrl: g,
							callback: function () {
								e && e.apply(this, arguments);
								c.shift();
								a.call(k)
							}
						});
						1 == c.length && a.call(this)
					}
				}()
			}
		}(), CKEDITOR.resourceManager = function (a, e) {
			this.basePath = a;
			this.fileName = e;
			this.registered = {};
			this.loaded = {};
			this.externals = {};
			this._ = {
				waitingList: {}
			}
		}, CKEDITOR.resourceManager.prototype = {
			add: function (a, e) {
				if (this.registered[a]) throw Error('[CKEDITOR.resourceManager.add] The resource name "' + a + '" is already registered.');
				var b = this.registered[a] = e || {};
				b.name = a;
				b.path = this.getPath(a);
				CKEDITOR.fire(a + CKEDITOR.tools.capitalize(this.fileName) + "Ready", b);
				return this.get(a)
			},
			get: function (a) {
				return this.registered[a] || null
			},
			getPath: function (a) {
				var e = this.externals[a];
				return CKEDITOR.getUrl(e && e.dir || this.basePath + a + "/")
			},
			getFilePath: function (a) {
				var e = this.externals[a];
				return CKEDITOR.getUrl(this.getPath(a) + (e ? e.file : this.fileName + ".js"))
			},
			addExternal: function (a, e, b) {
				a = a.split(",");
				for (var c = 0; c < a.length; c++) {
					var g = a[c];
					b || (e = e.replace(/[^\/]+$/, function (a) {
						b = a;
						return ""
					}));
					this.externals[g] = {
						dir: e,
						file: b || this.fileName + ".js"
					}
				}
			},
			load: function (a, e, b) {
				CKEDITOR.tools.isArray(a) || (a = a ? [a] : []);
				for (var c = this.loaded, g = this.registered, l = [], k = {}, f = {}, d = 0; d < a.length; d++) {
					var m = a[d];
					if (m)
						if (c[m] || g[m]) f[m] = this.get(m);
						else {
							var h = this.getFilePath(m);
							l.push(h);
							h in k || (k[h] = []);
							k[h].push(m)
						}
				}
				CKEDITOR.scriptLoader.load(l, function (a, d) {
					if (d.length) throw Error('[CKEDITOR.resourceManager.load] Resource name "' + k[d[0]].join(",") +
						'" was not found at "' + d[0] + '".');
					for (var h = 0; h < a.length; h++)
						for (var g = k[a[h]], m = 0; m < g.length; m++) {
							var l = g[m];
							f[l] = this.get(l);
							c[l] = 1
						}
					e.call(b, f)
				}, this)
			}
		}, CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin"), CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function (a) {
			var e = {};
			return function (b, c, g) {
				var l = {},
					k = function (b) {
						a.call(this, b, function (a) {
							CKEDITOR.tools.extend(l, a);
							var b = [],
								h;
							for (h in a) {
								var f = a[h],
									p = f && f.requires;
								if (!e[h]) {
									if (f.icons)
										for (var q = f.icons.split(","),
												y = q.length; y--;) CKEDITOR.skin.addIcon(q[y], f.path + "icons/" + (CKEDITOR.env.hidpi && f.hidpi ? "hidpi/" : "") + q[y] + ".png");
									e[h] = 1
								}
								if (p)
									for (p.split && (p = p.split(",")), f = 0; f < p.length; f++) l[p[f]] || b.push(p[f])
							}
							if (b.length) k.call(this, b);
							else {
								for (h in l) f = l[h], f.onLoad && !f.onLoad._called && (!1 === f.onLoad() && delete l[h], f.onLoad._called = 1);
								c && c.call(g || window, l)
							}
						}, this)
					};
				k.call(this, b)
			}
		}), CKEDITOR.plugins.setLang = function (a, e, b) {
			var c = this.get(a);
			a = c.langEntries || (c.langEntries = {});
			c = c.lang || (c.lang = []);
			c.split &&
				(c = c.split(",")); - 1 == CKEDITOR.tools.indexOf(c, e) && c.push(e);
			a[e] = b
		}, CKEDITOR.ui = function (a) {
			if (a.ui) return a.ui;
			this.items = {};
			this.instances = {};
			this.editor = a;
			this._ = {
				handlers: {}
			};
			return this
		}, CKEDITOR.ui.prototype = {
			add: function (a, e, b) {
				b.name = a.toLowerCase();
				var c = this.items[a] = {
					type: e,
					command: b.command || null,
					args: Array.prototype.slice.call(arguments, 2)
				};
				CKEDITOR.tools.extend(c, b)
			},
			get: function (a) {
				return this.instances[a]
			},
			create: function (a) {
				var e = this.items[a],
					b = e && this._.handlers[e.type],
					c = e && e.command &&
					this.editor.getCommand(e.command),
					b = b && b.create.apply(this, e.args);
				this.instances[a] = b;
				c && c.uiItems.push(b);
				b && !b.type && (b.type = e.type);
				return b
			},
			addHandler: function (a, e) {
				this._.handlers[a] = e
			},
			space: function (a) {
				return CKEDITOR.document.getById(this.spaceId(a))
			},
			spaceId: function (a) {
				return this.editor.id + "_" + a
			}
		}, CKEDITOR.event.implementOn(CKEDITOR.ui),
		function () {
			function a(a, d, h) {
				CKEDITOR.event.call(this);
				a = a && CKEDITOR.tools.clone(a);
				if (void 0 !== d) {
					if (!(d instanceof CKEDITOR.dom.element)) throw Error("Expect element of type CKEDITOR.dom.element.");
					if (!h) throw Error("One of the element modes must be specified.");
					if (CKEDITOR.env.ie && CKEDITOR.env.quirks && h == CKEDITOR.ELEMENT_MODE_INLINE) throw Error("Inline element mode is not supported on IE quirks.");
					if (!b(d, h)) throw Error('The specified element mode is not supported on element: "' + d.getName() + '".');
					this.element = d;
					this.elementMode = h;
					this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (d.getId() || d.getNameAtt())
				} else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE;
				this._ = {};
				this.commands = {};
				this.templates = {};
				this.name = this.name || e();
				this.id = CKEDITOR.tools.getNextId();
				this.status = "unloaded";
				this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config);
				this.ui = new CKEDITOR.ui(this);
				this.focusManager = new CKEDITOR.focusManager(this);
				this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this);
				this.on("readOnly", c);
				this.on("selectionChange", function (a) {
					l(this, a.data.path)
				});
				this.on("activeFilterChange", function () {
					l(this, this.elementPath(), !0)
				});
				this.on("mode", c);
				this.on("instanceReady", function () {
					if (this.config.startupFocus) {
						if ("end" ===
							this.config.startupFocus) {
							var a = this.createRange();
							a.selectNodeContents(this.editable());
							a.shrink(CKEDITOR.SHRINK_ELEMENT, !0);
							a.collapse();
							this.getSelection().selectRanges([a])
						}
						this.focus()
					}
				});
				CKEDITOR.fire("instanceCreated", null, this);
				CKEDITOR.add(this);
				CKEDITOR.tools.setTimeout(function () {
					"destroyed" !== this.status ? f(this, a) : CKEDITOR.warn("editor-incorrect-destroy")
				}, 0, this)
			}

			function e() {
				do var a = "editor" + ++y; while (CKEDITOR.instances[a]);
				return a
			}

			function b(a, b) {
				return b == CKEDITOR.ELEMENT_MODE_INLINE ?
					a.is(CKEDITOR.dtd.$editable) || a.is("textarea") : b == CKEDITOR.ELEMENT_MODE_REPLACE ? !a.is(CKEDITOR.dtd.$nonBodyContent) : 1
			}

			function c() {
				var a = this.commands,
					b;
				for (b in a) g(this, a[b])
			}

			function g(a, b) {
				b[b.startDisabled ? "disable" : a.readOnly && !b.readOnly ? "disable" : b.modes[a.mode] ? "enable" : "disable"]()
			}

			function l(a, b, c) {
				if (b) {
					var d, h, f = a.commands;
					for (h in f) d = f[h], (c || d.contextSensitive) && d.refresh(a, b)
				}
			}

			function k(a) {
				var b = a.config.customConfig;
				if (!b) return !1;
				var b = CKEDITOR.getUrl(b),
					c = u[b] || (u[b] = {});
				c.fn ?
					(c.fn.call(a, a.config), CKEDITOR.getUrl(a.config.customConfig) != b && k(a) || a.fireOnce("customConfigLoaded")) : CKEDITOR.scriptLoader.queue(b, function () {
						c.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function () {};
						k(a)
					});
				return !0
			}

			function f(a, b) {
				a.on("customConfigLoaded", function () {
					if (b) {
						if (b.on)
							for (var c in b.on) a.on(c, b.on[c]);
						CKEDITOR.tools.extend(a.config, b, !0);
						delete a.config.on
					}
					c = a.config;
					a.readOnly = c.readOnly ? !0 : a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.is("textarea") ? a.element.hasAttribute("disabled") ||
						a.element.hasAttribute("readonly") : a.element.isReadOnly() : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : !1;
					a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? !(a.element.is("textarea") || CKEDITOR.dtd[a.element.getName()].p) : !1;
					a.tabIndex = c.tabIndex || a.element && a.element.getAttribute("tabindex") || 0;
					a.activeEnterMode = a.enterMode = a.blockless ? CKEDITOR.ENTER_BR : c.enterMode;
					a.activeShiftEnterMode = a.shiftEnterMode = a.blockless ? CKEDITOR.ENTER_BR :
						c.shiftEnterMode;
					c.skin && (CKEDITOR.skinName = c.skin);
					a.fireOnce("configLoaded");
					a.dataProcessor = new CKEDITOR.htmlDataProcessor(a);
					a.filter = a.activeFilter = new CKEDITOR.filter(a);
					d(a)
				});
				b && null != b.customConfig && (a.config.customConfig = b.customConfig);
				k(a) || a.fireOnce("customConfigLoaded")
			}

			function d(a) {
				CKEDITOR.skin.loadPart("editor", function () {
					m(a)
				})
			}

			function m(a) {
				CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function (b, c) {
					var d = a.config.title;
					a.langCode = b;
					a.lang = CKEDITOR.tools.prototypedCopy(c);
					a.title = "string" == typeof d || !1 === d ? d : [a.lang.editor, a.name].join(", ");
					a.config.contentsLangDirection || (a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir);
					a.fire("langLoaded");
					h(a)
				})
			}

			function h(a) {
				a.getStylesSet(function (b) {
					a.once("loaded", function () {
						a.fire("stylesSet", {
							styles: b
						})
					}, null, null, 1);
					n(a)
				})
			}

			function n(a) {
				function b(a) {
					if (!a) return "";
					CKEDITOR.tools.isArray(a) && (a = a.join(","));
					return a.replace(/\s/g, "")
				}
				var c = a.config,
					d = b(c.plugins),
					h = b(c.extraPlugins),
					f = b(c.removePlugins);
				if (h) var g = new RegExp("(?:^|,)(?:" + h.replace(/,/g, "|") + ")(?\x3d,|$)", "g"),
					d = d.replace(g, ""),
					d = d + ("," + h);
				if (f) var e = new RegExp("(?:^|,)(?:" + f.replace(/,/g, "|") + ")(?\x3d,|$)", "g"),
					d = d.replace(e, "");
				CKEDITOR.env.air && (d += ",adobeair");
				CKEDITOR.plugins.load(d.split(","), function (b) {
					var d = [],
						h = [],
						f = [];
					a.plugins = CKEDITOR.tools.extend({}, a.plugins, b);
					for (var g in b) {
						var m = b[g],
							k = m.lang,
							l = null,
							n = m.requires,
							v;
						CKEDITOR.tools.isArray(n) && (n = n.join(","));
						if (n && (v = n.match(e)))
							for (; n =
								v.pop();) CKEDITOR.error("editor-plugin-required", {
								plugin: n.replace(",", ""),
								requiredBy: g
							});
						k && !a.lang[g] && (k.split && (k = k.split(",")), 0 <= CKEDITOR.tools.indexOf(k, a.langCode) ? l = a.langCode : (l = a.langCode.replace(/-.*/, ""), l = l != a.langCode && 0 <= CKEDITOR.tools.indexOf(k, l) ? l : 0 <= CKEDITOR.tools.indexOf(k, "en") ? "en" : k[0]), m.langEntries && m.langEntries[l] ? (a.lang[g] = m.langEntries[l], l = null) : f.push(CKEDITOR.getUrl(m.path + "lang/" + l + ".js")));
						h.push(l);
						d.push(m)
					}
					CKEDITOR.scriptLoader.load(f, function () {
						for (var b = ["beforeInit",
								"init", "afterInit"
							], f = 0; f < b.length; f++)
							for (var g = 0; g < d.length; g++) {
								var e = d[g];
								0 === f && h[g] && e.lang && e.langEntries && (a.lang[e.name] = e.langEntries[h[g]]);
								if (e[b[f]]) e[b[f]](a)
							}
						a.fireOnce("pluginsLoaded");
						c.keystrokes && a.setKeystroke(a.config.keystrokes);
						for (g = 0; g < a.config.blockedKeystrokes.length; g++) a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[g]] = 1;
						a.status = "loaded";
						a.fireOnce("loaded");
						CKEDITOR.fire("instanceLoaded", null, a)
					})
				})
			}

			function p() {
				var a = this.element;
				if (a && this.elementMode !=
					CKEDITOR.ELEMENT_MODE_APPENDTO) {
					var b = this.getData();
					this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b));
					a.is("textarea") ? a.setValue(b) : a.setHtml(b);
					return !0
				}
				return !1
			}

			function q(a, b) {
				function c(a) {
					var b = a.startContainer,
						d = a.endContainer;
					return b.is && (b.is("tr") || b.is("td") && b.equals(d) && a.endOffset === b.getChildCount()) ? !0 : !1
				}

				function d(a) {
					var b = a.startContainer;
					return b.is("tr") ? a.cloneContents() : b.clone(!0)
				}
				for (var h = new CKEDITOR.dom.documentFragment, f, g, e, m = 0; m < a.length; m++) {
					var k = a[m],
						l = k.startContainer.getAscendant("tr", !0);
					c(k) ? (f || (f = l.getAscendant("table").clone(), f.append(l.getAscendant({
						thead: 1,
						tbody: 1,
						tfoot: 1
					}).clone()), h.append(f), f = f.findOne("thead, tbody, tfoot")), g && g.equals(l) || (g = l, e = l.clone(), f.append(e)), e.append(d(k))) : h.append(k.cloneContents())
				}
				return f ? h : b.getHtmlFromRange(a[0])
			}
			a.prototype = CKEDITOR.editor.prototype;
			CKEDITOR.editor = a;
			var y = 0,
				u = {};
			CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
				plugins: {
					detectConflict: function (a, b) {
						for (var c = 0; c < b.length; c++) {
							var d =
								b[c];
							if (this[d]) return CKEDITOR.warn("editor-plugin-conflict", {
								plugin: a,
								replacedWith: d
							}), !0
						}
						return !1
					}
				},
				addCommand: function (a, b) {
					b.name = a.toLowerCase();
					var c = b instanceof CKEDITOR.command ? b : new CKEDITOR.command(this, b);
					this.mode && g(this, c);
					return this.commands[a] = c
				},
				_attachToForm: function () {
					function a(b) {
						c.updateElement();
						c._.required && !d.getValue() && !1 === c.fire("required") && b.data.preventDefault()
					}

					function b(a) {
						return !!(a && a.call && a.apply)
					}
					var c = this,
						d = c.element,
						h = new CKEDITOR.dom.element(d.$.form);
					d.is("textarea") && h && (h.on("submit", a), b(h.$.submit) && (h.$.submit = CKEDITOR.tools.override(h.$.submit, function (b) {
						return function () {
							a();
							b.apply ? b.apply(this) : b()
						}
					})), c.on("destroy", function () {
						h.removeListener("submit", a)
					}))
				},
				destroy: function (a) {
					var b = CKEDITOR.filter.instances,
						c = this;
					this.fire("beforeDestroy");
					!a && p.call(this);
					this.editable(null);
					this.filter && delete this.filter;
					CKEDITOR.tools.array.forEach(CKEDITOR.tools.objectKeys(b), function (a) {
						a = b[a];
						c === a.editor && a.destroy()
					});
					delete this.activeFilter;
					this.status = "destroyed";
					this.fire("destroy");
					this.removeAllListeners();
					CKEDITOR.remove(this);
					CKEDITOR.fire("instanceDestroyed", null, this)
				},
				elementPath: function (a) {
					if (!a) {
						a = this.getSelection();
						if (!a) return null;
						a = a.getStartElement()
					}
					return a ? new CKEDITOR.dom.elementPath(a, this.editable()) : null
				},
				createRange: function () {
					var a = this.editable();
					return a ? new CKEDITOR.dom.range(a) : null
				},
				execCommand: function (a, b) {
					var c = this.getCommand(a),
						d = {
							name: a,
							commandData: b || {},
							command: c
						};
					return c && c.state != CKEDITOR.TRISTATE_DISABLED &&
						!1 !== this.fire("beforeCommandExec", d) && (d.returnValue = c.exec(d.commandData), !c.async && !1 !== this.fire("afterCommandExec", d)) ? d.returnValue : !1
				},
				getCommand: function (a) {
					return this.commands[a]
				},
				getData: function (a) {
					!a && this.fire("beforeGetData");
					var b = this._.data;
					"string" != typeof b && (b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() : b.getHtml() : "");
					b = {
						dataValue: b
					};
					!a && this.fire("getData", b);
					return b.dataValue
				},
				getSnapshot: function () {
					var a = this.fire("getSnapshot");
					"string" != typeof a && (a = (a = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.is("textarea") ? a.getValue() : a.getHtml() : "");
					return a
				},
				loadSnapshot: function (a) {
					this.fire("loadSnapshot", a)
				},
				setData: function (a, b, c) {
					var d = !0,
						h = b;
					b && "object" == typeof b && (c = b.internal, h = b.callback, d = !b.noSnapshot);
					!c && d && this.fire("saveSnapshot");
					if (h || !c) this.once("dataReady", function (a) {
						!c && d && this.fire("saveSnapshot");
						h && h.call(a.editor)
					});
					a = {
						dataValue: a
					};
					!c && this.fire("setData", a);
					this._.data = a.dataValue;
					!c && this.fire("afterSetData", a)
				},
				setReadOnly: function (a) {
					a = null == a || a;
					this.readOnly != a && (this.readOnly = a, this.keystrokeHandler.blockedKeystrokes[8] = +a, this.editable().setReadOnly(a), this.fire("readOnly"))
				},
				insertHtml: function (a, b, c) {
					this.fire("insertHtml", {
						dataValue: a,
						mode: b,
						range: c
					})
				},
				insertText: function (a) {
					this.fire("insertText", a)
				},
				insertElement: function (a) {
					this.fire("insertElement", a)
				},
				getSelectedHtml: function (a) {
					var b = this.editable(),
						c = this.getSelection(),
						c = c && c.getRanges();
					if (!b || !c || 0 === c.length) return null;
					b = q(c, b);
					return a ? b.getHtml() : b
				},
				extractSelectedHtml: function (a, b) {
					var c = this.editable(),
						d = this.getSelection().getRanges(),
						h = new CKEDITOR.dom.documentFragment,
						f;
					if (!c || 0 === d.length) return null;
					for (f = 0; f < d.length; f++) h.append(c.extractHtmlFromRange(d[f], b));
					b || this.getSelection().selectRanges([d[0]]);
					return a ? h.getHtml() : h
				},
				focus: function () {
					this.fire("beforeFocus")
				},
				checkDirty: function () {
					return "ready" == this.status && this._.previousValue !== this.getSnapshot()
				},
				resetDirty: function () {
					this._.previousValue =
						this.getSnapshot()
				},
				updateElement: function () {
					return p.call(this)
				},
				setKeystroke: function () {
					for (var a = this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [
							[].slice.call(arguments, 0)
						], c, d, h = b.length; h--;) c = b[h], d = 0, CKEDITOR.tools.isArray(c) && (d = c[1], c = c[0]), d ? a[c] = d : delete a[c]
				},
				getCommandKeystroke: function (a, b) {
					var c = "string" === typeof a ? this.getCommand(a) : a,
						d = [];
					if (c) {
						var h = CKEDITOR.tools.object.findKey(this.commands, c),
							f = this.keystrokeHandler.keystrokes;
						if (c.fakeKeystroke) d.push(c.fakeKeystroke);
						else
							for (var g in f) f[g] === h && d.push(g)
					}
					return b ? d : d[0] || null
				},
				addFeature: function (a) {
					return this.filter.addFeature(a)
				},
				setActiveFilter: function (a) {
					a || (a = this.filter);
					this.activeFilter !== a && (this.activeFilter = a, this.fire("activeFilterChange"), a === this.filter ? this.setActiveEnterMode(null, null) : this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode), a.getAllowedEnterMode(this.shiftEnterMode, !0)))
				},
				setActiveEnterMode: function (a, b) {
					a = a ? this.blockless ? CKEDITOR.ENTER_BR : a : this.enterMode;
					b = b ? this.blockless ?
						CKEDITOR.ENTER_BR : b : this.shiftEnterMode;
					if (this.activeEnterMode != a || this.activeShiftEnterMode != b) this.activeEnterMode = a, this.activeShiftEnterMode = b, this.fire("activeEnterModeChange")
				},
				showNotification: function (a) {
					alert(a)
				}
			})
		}(), CKEDITOR.ELEMENT_MODE_NONE = 0, CKEDITOR.ELEMENT_MODE_REPLACE = 1, CKEDITOR.ELEMENT_MODE_APPENDTO = 2, CKEDITOR.ELEMENT_MODE_INLINE = 3, CKEDITOR.htmlParser = function () {
			this._ = {
				htmlPartsRegex: /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g
			}
		},
		function () {
			var a = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
				e = {
					checked: 1,
					compact: 1,
					declare: 1,
					defer: 1,
					disabled: 1,
					ismap: 1,
					multiple: 1,
					nohref: 1,
					noresize: 1,
					noshade: 1,
					nowrap: 1,
					readonly: 1,
					selected: 1
				};
			CKEDITOR.htmlParser.prototype = {
				onTagOpen: function () {},
				onTagClose: function () {},
				onText: function () {},
				onCDATA: function () {},
				onComment: function () {},
				parse: function (b) {
					for (var c, g, l = 0, k; c = this._.htmlPartsRegex.exec(b);) {
						g = c.index;
						if (g > l)
							if (l = b.substring(l, g), k) k.push(l);
							else this.onText(l);
						l = this._.htmlPartsRegex.lastIndex;
						if (g = c[1])
							if (g = g.toLowerCase(), k && CKEDITOR.dtd.$cdata[g] && (this.onCDATA(k.join("")), k = null), !k) {
								this.onTagClose(g);
								continue
							}
						if (k) k.push(c[0]);
						else if (g = c[3]) {
							if (g = g.toLowerCase(), !/="/.test(g)) {
								var f = {},
									d, m = c[4];
								c = !!c[5];
								if (m)
									for (; d = a.exec(m);) {
										var h = d[1].toLowerCase();
										d = d[2] || d[3] || d[4] || "";
										f[h] = !d && e[h] ? h : CKEDITOR.tools.htmlDecodeAttr(d)
									}
								this.onTagOpen(g, f, c);
								!k && CKEDITOR.dtd.$cdata[g] && (k = [])
							}
						} else if (g = c[2]) this.onComment(g)
					}
					if (b.length > l) this.onText(b.substring(l,
						b.length))
				}
			}
		}(), CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
			$: function () {
				this._ = {
					output: []
				}
			},
			proto: {
				openTag: function (a) {
					this._.output.push("\x3c", a)
				},
				openTagClose: function (a, e) {
					e ? this._.output.push(" /\x3e") : this._.output.push("\x3e")
				},
				attribute: function (a, e) {
					"string" == typeof e && (e = CKEDITOR.tools.htmlEncodeAttr(e));
					this._.output.push(" ", a, '\x3d"', e, '"')
				},
				closeTag: function (a) {
					this._.output.push("\x3c/", a, "\x3e")
				},
				text: function (a) {
					this._.output.push(a)
				},
				comment: function (a) {
					this._.output.push("\x3c!--",
						a, "--\x3e")
				},
				write: function (a) {
					this._.output.push(a)
				},
				reset: function () {
					this._.output = [];
					this._.indent = !1
				},
				getHtml: function (a) {
					var e = this._.output.join("");
					a && this.reset();
					return e
				}
			}
		}), "use strict",
		function () {
			CKEDITOR.htmlParser.node = function () {};
			CKEDITOR.htmlParser.node.prototype = {
				remove: function () {
					var a = this.parent.children,
						e = CKEDITOR.tools.indexOf(a, this),
						b = this.previous,
						c = this.next;
					b && (b.next = c);
					c && (c.previous = b);
					a.splice(e, 1);
					this.parent = null
				},
				replaceWith: function (a) {
					var e = this.parent.children,
						b = CKEDITOR.tools.indexOf(e, this),
						c = a.previous = this.previous,
						g = a.next = this.next;
					c && (c.next = a);
					g && (g.previous = a);
					e[b] = a;
					a.parent = this.parent;
					this.parent = null
				},
				insertAfter: function (a) {
					var e = a.parent.children,
						b = CKEDITOR.tools.indexOf(e, a),
						c = a.next;
					e.splice(b + 1, 0, this);
					this.next = a.next;
					this.previous = a;
					a.next = this;
					c && (c.previous = this);
					this.parent = a.parent
				},
				insertBefore: function (a) {
					var e = a.parent.children,
						b = CKEDITOR.tools.indexOf(e, a);
					e.splice(b, 0, this);
					this.next = a;
					(this.previous = a.previous) && (a.previous.next =
						this);
					a.previous = this;
					this.parent = a.parent
				},
				getAscendant: function (a) {
					var e = "function" == typeof a ? a : "string" == typeof a ? function (b) {
							return b.name == a
						} : function (b) {
							return b.name in a
						},
						b = this.parent;
					for (; b && b.type == CKEDITOR.NODE_ELEMENT;) {
						if (e(b)) return b;
						b = b.parent
					}
					return null
				},
				wrapWith: function (a) {
					this.replaceWith(a);
					a.add(this);
					return a
				},
				getIndex: function () {
					return CKEDITOR.tools.indexOf(this.parent.children, this)
				},
				getFilterContext: function (a) {
					return a || {}
				}
			}
		}(), "use strict", CKEDITOR.htmlParser.comment =
		function (a) {
			this.value = a;
			this._ = {
				isBlockLike: !1
			}
		}, CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
			type: CKEDITOR.NODE_COMMENT,
			filter: function (a, e) {
				var b = this.value;
				if (!(b = a.onComment(e, b, this))) return this.remove(), !1;
				if ("string" != typeof b) return this.replaceWith(b), !1;
				this.value = b;
				return !0
			},
			writeHtml: function (a, e) {
				e && this.filter(e);
				a.comment(this.value)
			}
		}), "use strict",
		function () {
			CKEDITOR.htmlParser.text = function (a) {
				this.value = a;
				this._ = {
					isBlockLike: !1
				}
			};
			CKEDITOR.htmlParser.text.prototype =
				CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
					type: CKEDITOR.NODE_TEXT,
					filter: function (a, e) {
						if (!(this.value = a.onText(e, this.value, this))) return this.remove(), !1
					},
					writeHtml: function (a, e) {
						e && this.filter(e);
						a.text(this.value)
					}
				})
		}(), "use strict",
		function () {
			CKEDITOR.htmlParser.cdata = function (a) {
				this.value = a
			};
			CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
				type: CKEDITOR.NODE_TEXT,
				filter: function () {},
				writeHtml: function (a) {
					a.write(this.value)
				}
			})
		}(), "use strict",
		CKEDITOR.htmlParser.fragment = function () {
			this.children = [];
			this.parent = null;
			this._ = {
				isBlockLike: !0,
				hasInlineStarted: !1
			}
		},
		function () {
			function a(a) {
				return a.attributes["data-cke-survive"] ? !1 : "a" == a.name && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name]
			}
			var e = CKEDITOR.tools.extend({
					table: 1,
					ul: 1,
					ol: 1,
					dl: 1
				}, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl),
				b = {
					ol: 1,
					ul: 1
				},
				c = CKEDITOR.tools.extend({}, {
					html: 1
				}, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, {
					style: 1,
					script: 1
				}),
				g = {
					ul: "li",
					ol: "li",
					dl: "dd",
					table: "tbody",
					tbody: "tr",
					thead: "tr",
					tfoot: "tr",
					tr: "td"
				};
			CKEDITOR.htmlParser.fragment.fromHtml = function (l, k, f) {
				function d(a) {
					var b;
					if (0 < r.length)
						for (var c = 0; c < r.length; c++) {
							var d = r[c],
								h = d.name,
								f = CKEDITOR.dtd[h],
								g = t.name && CKEDITOR.dtd[t.name];
							g && !g[h] || a && f && !f[a] && CKEDITOR.dtd[a] ? h == t.name && (n(t, t.parent, 1), c--) : (b || (m(), b = 1), d = d.clone(), d.parent = t, t = d, r.splice(c, 1), c--)
						}
				}

				function m() {
					for (; w.length;) n(w.shift(), t)
				}

				function h(a) {
					if (a._.isBlockLike && "pre" != a.name && "textarea" != a.name) {
						var b =
							a.children.length,
							c = a.children[b - 1],
							d;
						c && c.type == CKEDITOR.NODE_TEXT && ((d = CKEDITOR.tools.rtrim(c.value)) ? c.value = d : a.children.length = b - 1)
					}
				}

				function n(b, c, d) {
					c = c || t || u;
					var g = t;
					void 0 === b.previous && (p(c, b) && (t = c, y.onTagOpen(f, {}), b.returnPoint = c = t), h(b), a(b) && !b.children.length || c.add(b), "pre" == b.name && (v = !1), "textarea" == b.name && (B = !1));
					b.returnPoint ? (t = b.returnPoint, delete b.returnPoint) : t = d ? c : g
				}

				function p(a, b) {
					if ((a == u || "body" == a.name) && f && (!a.name || CKEDITOR.dtd[a.name][f])) {
						var c, d;
						return (c = b.attributes &&
							(d = b.attributes["data-cke-real-element-type"]) ? d : b.name) && c in CKEDITOR.dtd.$inline && !(c in CKEDITOR.dtd.head) && !b.isOrphan || b.type == CKEDITOR.NODE_TEXT
					}
				}

				function q(a, b) {
					return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ? a == b || "dt" == a && "dd" == b || "dd" == a && "dt" == b : !1
				}
				var y = new CKEDITOR.htmlParser,
					u = k instanceof CKEDITOR.htmlParser.element ? k : "string" == typeof k ? new CKEDITOR.htmlParser.element(k) : new CKEDITOR.htmlParser.fragment,
					r = [],
					w = [],
					t = u,
					B = "textarea" == u.name,
					v = "pre" == u.name;
				y.onTagOpen =
					function (h, f, g, k) {
						f = new CKEDITOR.htmlParser.element(h, f);
						f.isUnknown && g && (f.isEmpty = !0);
						f.isOptionalClose = k;
						if (a(f)) r.push(f);
						else {
							if ("pre" == h) v = !0;
							else {
								if ("br" == h && v) {
									t.add(new CKEDITOR.htmlParser.text("\n"));
									return
								}
								"textarea" == h && (B = !0)
							}
							if ("br" == h) w.push(f);
							else {
								for (; !(k = (g = t.name) ? CKEDITOR.dtd[g] || (t._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c, f.isUnknown || t.isUnknown || k[h]);)
									if (t.isOptionalClose) y.onTagClose(g);
									else if (h in b && g in b) g = t.children, (g = g[g.length - 1]) && "li" == g.name || n(g = new CKEDITOR.htmlParser.element("li"),
									t), !f.returnPoint && (f.returnPoint = t), t = g;
								else if (h in CKEDITOR.dtd.$listItem && !q(h, g)) y.onTagOpen("li" == h ? "ul" : "dl", {}, 0, 1);
								else if (g in e && !q(h, g)) !f.returnPoint && (f.returnPoint = t), t = t.parent;
								else if (g in CKEDITOR.dtd.$inline && r.unshift(t), t.parent) n(t, t.parent, 1);
								else {
									f.isOrphan = 1;
									break
								}
								d(h);
								m();
								f.parent = t;
								f.isEmpty ? n(f) : t = f
							}
						}
					};
				y.onTagClose = function (a) {
					for (var b = r.length - 1; 0 <= b; b--)
						if (a == r[b].name) {
							r.splice(b, 1);
							return
						}
					for (var c = [], d = [], h = t; h != u && h.name != a;) h._.isBlockLike || d.unshift(h), c.push(h),
						h = h.returnPoint || h.parent;
					if (h != u) {
						for (b = 0; b < c.length; b++) {
							var g = c[b];
							n(g, g.parent)
						}
						t = h;
						h._.isBlockLike && m();
						n(h, h.parent);
						h == t && (t = t.parent);
						r = r.concat(d)
					}
					"body" == a && (f = !1)
				};
				y.onText = function (a) {
					if (!(t._.hasInlineStarted && !w.length || v || B) && (a = CKEDITOR.tools.ltrim(a), 0 === a.length)) return;
					var b = t.name,
						h = b ? CKEDITOR.dtd[b] || (t._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c;
					if (!B && !h["#"] && b in e) y.onTagOpen(g[b] || ""), y.onText(a);
					else {
						m();
						d();
						v || B || (a = a.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " "));
						a =
							new CKEDITOR.htmlParser.text(a);
						if (p(t, a)) this.onTagOpen(f, {}, 0, 1);
						t.add(a)
					}
				};
				y.onCDATA = function (a) {
					t.add(new CKEDITOR.htmlParser.cdata(a))
				};
				y.onComment = function (a) {
					m();
					d();
					t.add(new CKEDITOR.htmlParser.comment(a))
				};
				y.parse(l);
				for (m(); t != u;) n(t, t.parent, 1);
				h(u);
				return u
			};
			CKEDITOR.htmlParser.fragment.prototype = {
				type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
				add: function (a, b) {
					isNaN(b) && (b = this.children.length);
					var c = 0 < b ? this.children[b - 1] : null;
					if (c) {
						if (a._.isBlockLike && c.type == CKEDITOR.NODE_TEXT && (c.value = CKEDITOR.tools.rtrim(c.value),
								0 === c.value.length)) {
							this.children.pop();
							this.add(a);
							return
						}
						c.next = a
					}
					a.previous = c;
					a.parent = this;
					this.children.splice(b, 0, a);
					this._.hasInlineStarted || (this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike)
				},
				filter: function (a, b) {
					b = this.getFilterContext(b);
					a.onRoot(b, this);
					this.filterChildren(a, !1, b)
				},
				filterChildren: function (a, b, c) {
					if (this.childrenFilteredBy != a.id) {
						c = this.getFilterContext(c);
						if (b && !this.parent) a.onRoot(c, this);
						this.childrenFilteredBy = a.id;
						for (b = 0; b < this.children.length; b++) !1 === this.children[b].filter(a, c) && b--
					}
				},
				writeHtml: function (a, b) {
					b && this.filter(b);
					this.writeChildrenHtml(a)
				},
				writeChildrenHtml: function (a, b, c) {
					var d = this.getFilterContext();
					if (c && !this.parent && b) b.onRoot(d, this);
					b && this.filterChildren(b, !1, d);
					b = 0;
					c = this.children;
					for (d = c.length; b < d; b++) c[b].writeHtml(a)
				},
				forEach: function (a, b, c) {
					if (!(c || b && this.type != b)) var d = a(this);
					if (!1 !== d) {
						c = this.children;
						for (var g = 0; g < c.length; g++) d = c[g], d.type == CKEDITOR.NODE_ELEMENT ? d.forEach(a,
							b) : b && d.type != b || a(d)
					}
				},
				getFilterContext: function (a) {
					return a || {}
				}
			}
		}(), "use strict",
		function () {
			function a() {
				this.rules = []
			}

			function e(b, c, g, e) {
				var k, f;
				for (k in c)(f = b[k]) || (f = b[k] = new a), f.add(c[k], g, e)
			}
			CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
				$: function (b) {
					this.id = CKEDITOR.tools.getNextNumber();
					this.elementNameRules = new a;
					this.attributeNameRules = new a;
					this.elementsRules = {};
					this.attributesRules = {};
					this.textRules = new a;
					this.commentRules = new a;
					this.rootRules = new a;
					b && this.addRules(b, 10)
				},
				proto: {
					addRules: function (a, c) {
						var g;
						"number" == typeof c ? g = c : c && "priority" in c && (g = c.priority);
						"number" != typeof g && (g = 10);
						"object" != typeof c && (c = {});
						a.elementNames && this.elementNameRules.addMany(a.elementNames, g, c);
						a.attributeNames && this.attributeNameRules.addMany(a.attributeNames, g, c);
						a.elements && e(this.elementsRules, a.elements, g, c);
						a.attributes && e(this.attributesRules, a.attributes, g, c);
						a.text && this.textRules.add(a.text, g, c);
						a.comment && this.commentRules.add(a.comment, g, c);
						a.root && this.rootRules.add(a.root,
							g, c)
					},
					applyTo: function (a) {
						a.filter(this)
					},
					onElementName: function (a, c) {
						return this.elementNameRules.execOnName(a, c)
					},
					onAttributeName: function (a, c) {
						return this.attributeNameRules.execOnName(a, c)
					},
					onText: function (a, c, g) {
						return this.textRules.exec(a, c, g)
					},
					onComment: function (a, c, g) {
						return this.commentRules.exec(a, c, g)
					},
					onRoot: function (a, c) {
						return this.rootRules.exec(a, c)
					},
					onElement: function (a, c) {
						for (var g = [this.elementsRules["^"], this.elementsRules[c.name], this.elementsRules.$], e, k = 0; 3 > k; k++)
							if (e = g[k]) {
								e =
									e.exec(a, c, this);
								if (!1 === e) return null;
								if (e && e != c) return this.onNode(a, e);
								if (c.parent && !c.name) break
							}
						return c
					},
					onNode: function (a, c) {
						var g = c.type;
						return g == CKEDITOR.NODE_ELEMENT ? this.onElement(a, c) : g == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(a, c.value)) : g == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(a, c.value)) : null
					},
					onAttribute: function (a, c, g, e) {
						return (g = this.attributesRules[g]) ? g.exec(a, e, c, this) : e
					}
				}
			});
			CKEDITOR.htmlParser.filterRulesGroup = a;
			a.prototype = {
				add: function (a, c, g) {
					this.rules.splice(this.findIndex(c), 0, {
						value: a,
						priority: c,
						options: g
					})
				},
				addMany: function (a, c, g) {
					for (var e = [this.findIndex(c), 0], k = 0, f = a.length; k < f; k++) e.push({
						value: a[k],
						priority: c,
						options: g
					});
					this.rules.splice.apply(this.rules, e)
				},
				findIndex: function (a) {
					for (var c = this.rules, g = c.length - 1; 0 <= g && a < c[g].priority;) g--;
					return g + 1
				},
				exec: function (a, c) {
					var g = c instanceof CKEDITOR.htmlParser.node || c instanceof CKEDITOR.htmlParser.fragment,
						e = Array.prototype.slice.call(arguments, 1),
						k = this.rules,
						f = k.length,
						d, m, h, n;
					for (n = 0; n < f; n++)
						if (g && (d = c.type, m = c.name), h = k[n], !(a.nonEditable && !h.options.applyToAll || a.nestedEditable && h.options.excludeNestedEditable)) {
							h = h.value.apply(null, e);
							if (!1 === h || g && h && (h.name != m || h.type != d)) return h;
							null != h && (e[0] = c = h)
						}
					return c
				},
				execOnName: function (a, c) {
					for (var g = 0, e = this.rules, k = e.length, f; c && g < k; g++) f = e[g], a.nonEditable && !f.options.applyToAll || a.nestedEditable && f.options.excludeNestedEditable || (c = c.replace(f.value[0], f.value[1]));
					return c
				}
			}
		}(),
		function () {
			function a(a,
				d) {
				function h(a) {
					return a || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", {
						"data-cke-bogus": 1
					})
				}

				function f(a, d) {
					return function (f) {
						if (f.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
							var g = [],
								m = b(f),
								k, v;
							if (m)
								for (e(m, 1) && g.push(m); m;) l(m) && (k = c(m)) && e(k) && ((v = c(k)) && !l(v) ? g.push(k) : (h(n).insertAfter(k), k.remove())), m = m.previous;
							for (m = 0; m < g.length; m++) g[m].remove();
							if (g = !a || !1 !== ("function" == typeof d ? d(f) : d)) n || CKEDITOR.env.needsBrFiller || f.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT ?
								n || CKEDITOR.env.needsBrFiller || !(7 < document.documentMode || f.name in CKEDITOR.dtd.tr || f.name in CKEDITOR.dtd.$listItem) ? (g = b(f), g = !g || "form" == f.name && "input" == g.name) : g = !1 : g = !1;
							g && f.add(h(a))
						}
					}
				}

				function e(a, b) {
					if ((!n || CKEDITOR.env.needsBrFiller) && a.type == CKEDITOR.NODE_ELEMENT && "br" == a.name && !a.attributes["data-cke-eol"]) return !0;
					var c;
					return a.type == CKEDITOR.NODE_TEXT && (c = a.value.match(t)) && (c.index && ((new CKEDITOR.htmlParser.text(a.value.substring(0, c.index))).insertBefore(a), a.value = c[0]), !CKEDITOR.env.needsBrFiller &&
						n && (!b || a.parent.name in F) || !n && ((c = a.previous) && "br" == c.name || !c || l(c))) ? !0 : !1
				}
				var m = {
						elements: {}
					},
					n = "html" == d,
					F = CKEDITOR.tools.extend({}, C),
					p;
				for (p in F) "#" in v[p] || delete F[p];
				for (p in F) m.elements[p] = f(n, a.config.fillEmptyBlocks);
				m.root = f(n, !1);
				m.elements.br = function (a) {
					return function (b) {
						if (b.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
							var d = b.attributes;
							if ("data-cke-bogus" in d || "data-cke-eol" in d) delete d["data-cke-bogus"];
							else {
								for (d = b.next; d && g(d);) d = d.next;
								var f = c(b);
								!d && l(b.parent) ? k(b.parent,
									h(a)) : l(d) && f && !l(f) && h(a).insertBefore(d)
							}
						}
					}
				}(n);
				return m
			}

			function e(a, b) {
				return a != CKEDITOR.ENTER_BR && !1 !== b ? a == CKEDITOR.ENTER_DIV ? "div" : "p" : !1
			}

			function b(a) {
				for (a = a.children[a.children.length - 1]; a && g(a);) a = a.previous;
				return a
			}

			function c(a) {
				for (a = a.previous; a && g(a);) a = a.previous;
				return a
			}

			function g(a) {
				return a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"]
			}

			function l(a) {
				return a && (a.type == CKEDITOR.NODE_ELEMENT && a.name in
					C || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
			}

			function k(a, b) {
				var c = a.children[a.children.length - 1];
				a.children.push(b);
				b.parent = a;
				c && (c.next = b, b.previous = c)
			}

			function f(a) {
				a = a.attributes;
				"false" != a.contenteditable && (a["data-cke-editable"] = a.contenteditable ? "true" : 1);
				a.contenteditable = "false"
			}

			function d(a) {
				a = a.attributes;
				switch (a["data-cke-editable"]) {
					case "true":
						a.contenteditable = "true";
						break;
					case "1":
						delete a.contenteditable
				}
			}

			function m(a) {
				return a.replace(D, function (a, b, c) {
					return "\x3c" + b + c.replace(I,
						function (a, b) {
							return H.test(b) && -1 == c.indexOf("data-cke-saved-" + b) ? " data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a : a
						}) + "\x3e"
				})
			}

			function h(a, b) {
				return a.replace(b, function (a, b, c) {
					0 === a.indexOf("\x3ctextarea") && (a = b + u(c).replace(/</g, "\x26lt;").replace(/>/g, "\x26gt;") + "\x3c/textarea\x3e");
					return "\x3ccke:encoded\x3e" + encodeURIComponent(a) + "\x3c/cke:encoded\x3e"
				})
			}

			function n(a) {
				return a.replace(F, function (a, b) {
					return decodeURIComponent(b)
				})
			}

			function p(a) {
				return a.replace(/\x3c!--(?!{cke_protected})[\s\S]+?--\x3e/g,
					function (a) {
						return "\x3c!--" + B + "{C}" + encodeURIComponent(a).replace(/--/g, "%2D%2D") + "--\x3e"
					})
			}

			function q(a) {
				return CKEDITOR.tools.array.reduce(a.split(""), function (a, b) {
					var c = b.toLowerCase(),
						d = b.toUpperCase(),
						h = y(c);
					c !== d && (h += "|" + y(d));
					return a + ("(" + h + ")")
				}, "")
			}

			function y(a) {
				var b;
				b = a.charCodeAt(0);
				var c = b.toString(16);
				b = {
					htmlCode: "\x26#" + b + ";?",
					hex: "\x26#x0*" + c + ";?",
					entity: {
						"\x3c": "\x26lt;",
						"\x3e": "\x26gt;",
						":": "\x26colon;"
					}[a]
				};
				for (var d in b) b[d] && (a += "|" + b[d]);
				return a
			}

			function u(a) {
				return a.replace(/\x3c!--\{cke_protected\}\{C\}([\s\S]+?)--\x3e/g,
					function (a, b) {
						return decodeURIComponent(b)
					})
			}

			function r(a, b) {
				var c = b._.dataStore;
				return a.replace(/\x3c!--\{cke_protected\}([\s\S]+?)--\x3e/g, function (a, b) {
					return decodeURIComponent(b)
				}).replace(/\{cke_protected_(\d+)\}/g, function (a, b) {
					return c && c[b] || ""
				})
			}

			function w(a, b) {
				var c = [],
					d = b.config.protectedSource,
					h = b._.dataStore || (b._.dataStore = {
						id: 1
					}),
					f = /<\!--\{cke_temp(comment)?\}(\d*?)--\x3e/g,
					d = [/<script[\s\S]*?(<\/script>|$)/gi, /<noscript[\s\S]*?<\/noscript>/gi, /<meta[\s\S]*?\/?>/gi].concat(d);
				a = a.replace(/\x3c!--[\s\S]*?--\x3e/g,
					function (a) {
						return "\x3c!--{cke_tempcomment}" + (c.push(a) - 1) + "--\x3e"
					});
				for (var g = 0; g < d.length; g++) a = a.replace(d[g], function (a) {
					a = a.replace(f, function (a, b, d) {
						return c[d]
					});
					return /cke_temp(comment)?/.test(a) ? a : "\x3c!--{cke_temp}" + (c.push(a) - 1) + "--\x3e"
				});
				a = a.replace(f, function (a, b, d) {
					return "\x3c!--" + B + (b ? "{C}" : "") + encodeURIComponent(c[d]).replace(/--/g, "%2D%2D") + "--\x3e"
				});
				a = a.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g, function (a) {
					return a.replace(/\x3c!--\{cke_protected\}([^>]*)--\x3e/g,
						function (a, b) {
							h[h.id] = decodeURIComponent(b);
							return "{cke_protected_" + h.id++ + "}"
						})
				});
				return a = a.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g, function (a, c, d, h) {
					return "\x3c" + c + d + "\x3e" + r(u(h), b) + "\x3c/" + c + "\x3e"
				})
			}
			CKEDITOR.htmlDataProcessor = function (b) {
				var c, d, f = this;
				this.editor = b;
				this.dataFilter = c = new CKEDITOR.htmlParser.filter;
				this.htmlFilter = d = new CKEDITOR.htmlParser.filter;
				this.writer = new CKEDITOR.htmlParser.basicWriter;
				c.addRules(x);
				c.addRules(A, {
					applyToAll: !0
				});
				c.addRules(a(b, "data"), {
					applyToAll: !0
				});
				d.addRules(G);
				d.addRules(E, {
					applyToAll: !0
				});
				d.addRules(a(b, "html"), {
					applyToAll: !0
				});
				b.on("toHtml", function (a) {
						a = a.data;
						var c = a.dataValue,
							d, c = c.replace(S, ""),
							c = w(c, b),
							c = h(c, L),
							c = m(c),
							c = h(c, J),
							c = c.replace(N, "$1cke:$2"),
							c = c.replace(K, "\x3ccke:$1$2\x3e\x3c/cke:$1\x3e"),
							c = c.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"),
							c = c.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi, "$1data-cke-" + CKEDITOR.rnd + "-$2");
						d = a.context || b.editable().getName();
						var f;
						CKEDITOR.env.ie && 9 > CKEDITOR.env.version && "pre" ==
							d && (d = "div", c = "\x3cpre\x3e" + c + "\x3c/pre\x3e", f = 1);
						d = b.document.createElement(d);
						d.setHtml("a" + c);
						c = d.getHtml().substr(1);
						c = c.replace(new RegExp("data-cke-" + CKEDITOR.rnd + "-", "ig"), "");
						f && (c = c.replace(/^<pre>|<\/pre>$/gi, ""));
						c = c.replace(R, "$1$2");
						c = n(c);
						c = u(c);
						d = !1 === a.fixForBody ? !1 : e(a.enterMode, b.config.autoParagraph);
						c = CKEDITOR.htmlParser.fragment.fromHtml(c, a.context, d);
						d && (f = c, !f.children.length && CKEDITOR.dtd[f.name][d] && (d = new CKEDITOR.htmlParser.element(d), f.add(d)));
						a.dataValue = c
					}, null, null,
					5);
				b.on("toHtml", function (a) {
					a.data.filter.applyTo(a.data.dataValue, !0, a.data.dontFilter, a.data.enterMode) && b.fire("dataFiltered")
				}, null, null, 6);
				b.on("toHtml", function (a) {
					a.data.dataValue.filterChildren(f.dataFilter, !0)
				}, null, null, 10);
				b.on("toHtml", function (a) {
					a = a.data;
					var b = a.dataValue,
						c = new CKEDITOR.htmlParser.basicWriter;
					b.writeChildrenHtml(c);
					b = c.getHtml(!0);
					a.dataValue = p(b)
				}, null, null, 15);
				b.on("toDataFormat", function (a) {
					var c = a.data.dataValue;
					a.data.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/^<br *\/?>/i,
						""));
					a.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(c, a.data.context, e(a.data.enterMode, b.config.autoParagraph))
				}, null, null, 5);
				b.on("toDataFormat", function (a) {
					a.data.dataValue.filterChildren(f.htmlFilter, !0)
				}, null, null, 10);
				b.on("toDataFormat", function (a) {
					a.data.filter.applyTo(a.data.dataValue, !1, !0)
				}, null, null, 11);
				b.on("toDataFormat", function (a) {
					var c = a.data.dataValue,
						d = f.writer;
					d.reset();
					c.writeChildrenHtml(d);
					c = d.getHtml(!0);
					c = u(c);
					c = r(c, b);
					a.data.dataValue = c
				}, null, null, 15)
			};
			CKEDITOR.htmlDataProcessor.prototype = {
				toHtml: function (a, b, c, d) {
					var h = this.editor,
						f, g, e, m;
					b && "object" == typeof b ? (f = b.context, c = b.fixForBody, d = b.dontFilter, g = b.filter, e = b.enterMode, m = b.protectedWhitespaces) : f = b;
					f || null === f || (f = h.editable().getName());
					return h.fire("toHtml", {
						dataValue: a,
						context: f,
						fixForBody: c,
						dontFilter: d,
						filter: g || h.filter,
						enterMode: e || h.enterMode,
						protectedWhitespaces: m
					}).dataValue
				},
				toDataFormat: function (a, b) {
					var c, d, h;
					b && (c = b.context, d = b.filter, h = b.enterMode);
					c || null === c || (c = this.editor.editable().getName());
					return this.editor.fire("toDataFormat", {
						dataValue: a,
						filter: d || this.editor.filter,
						context: c,
						enterMode: h || this.editor.enterMode
					}).dataValue
				}
			};
			var t = /(?:&nbsp;|\xa0)$/,
				B = "{cke_protected}",
				v = CKEDITOR.dtd,
				z = "caption colgroup col thead tfoot tbody".split(" "),
				C = CKEDITOR.tools.extend({}, v.$blockLimit, v.$block),
				x = {
					elements: {
						input: f,
						textarea: f
					}
				},
				A = {
					attributeNames: [
						[/^on/, "data-cke-pa-on"],
						[/^srcdoc/, "data-cke-pa-srcdoc"],
						[/^data-cke-expando$/, ""]
					],
					elements: {
						iframe: function (a) {
							if (a.attributes && a.attributes.src) {
								var b = a.attributes.src.toLowerCase().replace(/[^a-z]/gi,
									"");
								if (0 === b.indexOf("javascript") || 0 === b.indexOf("data")) a.attributes["data-cke-pa-src"] = a.attributes.src, delete a.attributes.src
							}
						}
					}
				},
				G = {
					elements: {
						embed: function (a) {
							var b = a.parent;
							if (b && "object" == b.name) {
								var c = b.attributes.width,
									b = b.attributes.height;
								c && (a.attributes.width = c);
								b && (a.attributes.height = b)
							}
						},
						a: function (a) {
							var b = a.attributes;
							if (!(a.children.length || b.name || b.id || a.attributes["data-cke-saved-name"])) return !1
						}
					}
				},
				E = {
					elementNames: [
						[/^cke:/, ""],
						[/^\?xml:namespace$/, ""]
					],
					attributeNames: [
						[/^data-cke-(saved|pa)-/,
							""
						],
						[/^data-cke-.*/, ""],
						["hidefocus", ""]
					],
					elements: {
						$: function (a) {
							var b = a.attributes;
							if (b) {
								if (b["data-cke-temp"]) return !1;
								for (var c = ["name", "href", "src"], d, h = 0; h < c.length; h++) d = "data-cke-saved-" + c[h], d in b && delete b[c[h]]
							}
							return a
						},
						table: function (a) {
							a.children.slice(0).sort(function (a, b) {
								var c, d;
								a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type && (c = CKEDITOR.tools.indexOf(z, a.name), d = CKEDITOR.tools.indexOf(z, b.name)); - 1 < c && -1 < d && c != d || (c = a.parent ? a.getIndex() : -1, d = b.parent ? b.getIndex() : -1);
								return c > d ?
									1 : -1
							})
						},
						param: function (a) {
							a.children = [];
							a.isEmpty = !0;
							return a
						},
						span: function (a) {
							"Apple-style-span" == a.attributes["class"] && delete a.name
						},
						html: function (a) {
							delete a.attributes.contenteditable;
							delete a.attributes["class"]
						},
						body: function (a) {
							delete a.attributes.spellcheck;
							delete a.attributes.contenteditable
						},
						style: function (a) {
							var b = a.children[0];
							b && b.value && (b.value = CKEDITOR.tools.trim(b.value));
							a.attributes.type || (a.attributes.type = "text/css")
						},
						title: function (a) {
							var b = a.children[0];
							!b && k(a, b = new CKEDITOR.htmlParser.text);
							b.value = a.attributes["data-cke-title"] || ""
						},
						input: d,
						textarea: d
					},
					attributes: {
						"class": function (a) {
							return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || !1
						}
					}
				};
			CKEDITOR.env.ie && (E.attributes.style = function (a) {
				return a.replace(/(^|;)([^\:]+)/g, function (a) {
					return a.toLowerCase()
				})
			});
			var D = /<(a|area|img|input|source)\b([^>]*)>/gi,
				I = /([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi,
				H = /^(href|src|name)$/i,
				J = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,
				L = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi,
				F = /<cke:encoded>([^<]*)<\/cke:encoded>/gi,
				S = new RegExp("(" + q("\x3ccke:encoded\x3e") + "(.*?)" + q("\x3c/cke:encoded\x3e") + ")|(" + q("\x3c") + q("/") + "?" + q("cke:encoded\x3e") + ")", "gi"),
				N = /(<\/?)((?:object|embed|param|html|body|head|title)([\s][^>]*)?>)/gi,
				R = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi,
				K = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi
		}(), "use strict", CKEDITOR.htmlParser.element = function (a, e) {
			this.name = a;
			this.attributes = e || {};
			this.children = [];
			var b = a || "",
				c = b.match(/^cke:(.*)/);
			c && (b = c[1]);
			b = !!(CKEDITOR.dtd.$nonBodyContent[b] || CKEDITOR.dtd.$block[b] || CKEDITOR.dtd.$listItem[b] || CKEDITOR.dtd.$tableContent[b] || CKEDITOR.dtd.$nonEditable[b] || "br" == b);
			this.isEmpty = !!CKEDITOR.dtd.$empty[a];
			this.isUnknown = !CKEDITOR.dtd[a];
			this._ = {
				isBlockLike: b,
				hasInlineStarted: this.isEmpty || !b
			}
		}, CKEDITOR.htmlParser.cssStyle = function (a) {
			var e = {};
			((a instanceof CKEDITOR.htmlParser.element ? a.attributes.style : a) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g,
				function (a, c, g) {
					"font-family" == c && (g = g.replace(/["']/g, ""));
					e[c.toLowerCase()] = g
				});
			return {
				rules: e,
				populate: function (a) {
					var c = this.toString();
					c && (a instanceof CKEDITOR.dom.element ? a.setAttribute("style", c) : a instanceof CKEDITOR.htmlParser.element ? a.attributes.style = c : a.style = c)
				},
				toString: function () {
					var a = [],
						c;
					for (c in e) e[c] && a.push(c, ":", e[c], ";");
					return a.join("")
				}
			}
		},
		function () {
			function a(a) {
				return function (b) {
					return b.type == CKEDITOR.NODE_ELEMENT && ("string" == typeof a ? b.name == a : b.name in a)
				}
			}
			var e =
				function (a, b) {
					a = a[0];
					b = b[0];
					return a < b ? -1 : a > b ? 1 : 0
				},
				b = CKEDITOR.htmlParser.fragment.prototype;
			CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
				type: CKEDITOR.NODE_ELEMENT,
				add: b.add,
				clone: function () {
					return new CKEDITOR.htmlParser.element(this.name, this.attributes)
				},
				filter: function (a, b) {
					var e = this,
						k, f;
					b = e.getFilterContext(b);
					if (!e.parent) a.onRoot(b, e);
					for (;;) {
						k = e.name;
						if (!(f = a.onElementName(b, k))) return this.remove(), !1;
						e.name = f;
						if (!(e = a.onElement(b, e))) return this.remove(), !1;
						if (e !== this) return this.replaceWith(e), !1;
						if (e.name == k) break;
						if (e.type != CKEDITOR.NODE_ELEMENT) return this.replaceWith(e), !1;
						if (!e.name) return this.replaceWithChildren(), !1
					}
					k = e.attributes;
					var d, m;
					for (d in k) {
						for (f = k[d];;)
							if (m = a.onAttributeName(b, d))
								if (m != d) delete k[d], d = m;
								else break;
						else {
							delete k[d];
							break
						}
						m && (!1 === (f = a.onAttribute(b, e, m, f)) ? delete k[m] : k[m] = f)
					}
					e.isEmpty || this.filterChildren(a, !1, b);
					return !0
				},
				filterChildren: b.filterChildren,
				writeHtml: function (a, b) {
					b && this.filter(b);
					var l = this.name,
						k = [],
						f = this.attributes,
						d, m;
					a.openTag(l, f);
					for (d in f) k.push([d, f[d]]);
					a.sortAttributes && k.sort(e);
					d = 0;
					for (m = k.length; d < m; d++) f = k[d], a.attribute(f[0], f[1]);
					a.openTagClose(l, this.isEmpty);
					this.writeChildrenHtml(a);
					this.isEmpty || a.closeTag(l)
				},
				writeChildrenHtml: b.writeChildrenHtml,
				replaceWithChildren: function () {
					for (var a = this.children, b = a.length; b;) a[--b].insertAfter(this);
					this.remove()
				},
				forEach: b.forEach,
				getFirst: function (b) {
					if (!b) return this.children.length ? this.children[0] : null;
					"function" != typeof b &&
						(b = a(b));
					for (var g = 0, e = this.children.length; g < e; ++g)
						if (b(this.children[g])) return this.children[g];
					return null
				},
				getHtml: function () {
					var a = new CKEDITOR.htmlParser.basicWriter;
					this.writeChildrenHtml(a);
					return a.getHtml()
				},
				setHtml: function (a) {
					a = this.children = CKEDITOR.htmlParser.fragment.fromHtml(a).children;
					for (var b = 0, e = a.length; b < e; ++b) a[b].parent = this
				},
				getOuterHtml: function () {
					var a = new CKEDITOR.htmlParser.basicWriter;
					this.writeHtml(a);
					return a.getHtml()
				},
				split: function (a) {
					for (var b = this.children.splice(a,
							this.children.length - a), e = this.clone(), k = 0; k < b.length; ++k) b[k].parent = e;
					e.children = b;
					b[0] && (b[0].previous = null);
					0 < a && (this.children[a - 1].next = null);
					this.parent.add(e, this.getIndex() + 1);
					return e
				},
				find: function (a, b) {
					void 0 === b && (b = !1);
					var e = [],
						k;
					for (k = 0; k < this.children.length; k++) {
						var f = this.children[k];
						"function" == typeof a && a(f) ? e.push(f) : "string" == typeof a && f.name === a && e.push(f);
						b && f.find && (e = e.concat(f.find(a, b)))
					}
					return e
				},
				addClass: function (a) {
					if (!this.hasClass(a)) {
						var b = this.attributes["class"] ||
							"";
						this.attributes["class"] = b + (b ? " " : "") + a
					}
				},
				removeClass: function (a) {
					var b = this.attributes["class"];
					b && ((b = CKEDITOR.tools.trim(b.replace(new RegExp("(?:\\s+|^)" + a + "(?:\\s+|$)"), " "))) ? this.attributes["class"] = b : delete this.attributes["class"])
				},
				hasClass: function (a) {
					var b = this.attributes["class"];
					return b ? (new RegExp("(?:^|\\s)" + a + "(?\x3d\\s|$)")).test(b) : !1
				},
				getFilterContext: function (a) {
					var b = [];
					a || (a = {
						nonEditable: !1,
						nestedEditable: !1
					});
					a.nonEditable || "false" != this.attributes.contenteditable ? a.nonEditable &&
						!a.nestedEditable && "true" == this.attributes.contenteditable && b.push("nestedEditable", !0) : b.push("nonEditable", !0);
					if (b.length) {
						a = CKEDITOR.tools.copy(a);
						for (var e = 0; e < b.length; e += 2) a[b[e]] = b[e + 1]
					}
					return a
				}
			}, !0)
		}(),
		function () {
			var a = /{([^}]+)}/g;
			CKEDITOR.template = function (a) {
				this.source = String(a)
			};
			CKEDITOR.template.prototype.output = function (e, b) {
				var c = this.source.replace(a, function (a, b) {
					return void 0 !== e[b] ? e[b] : a
				});
				return b ? b.push(c) : c
			}
		}(), delete CKEDITOR.loadFullCore, CKEDITOR.instances = {}, CKEDITOR.document =
		new CKEDITOR.dom.document(document), CKEDITOR.add = function (a) {
			CKEDITOR.instances[a.name] = a;
			a.on("focus", function () {
				CKEDITOR.currentInstance != a && (CKEDITOR.currentInstance = a, CKEDITOR.fire("currentInstance"))
			});
			a.on("blur", function () {
				CKEDITOR.currentInstance == a && (CKEDITOR.currentInstance = null, CKEDITOR.fire("currentInstance"))
			});
			CKEDITOR.fire("instance", null, a)
		}, CKEDITOR.remove = function (a) {
			delete CKEDITOR.instances[a.name]
		},
		function () {
			var a = {};
			CKEDITOR.addTemplate = function (e, b) {
				var c = a[e];
				if (c) return c;
				c = {
					name: e,
					source: b
				};
				CKEDITOR.fire("template", c);
				return a[e] = new CKEDITOR.template(c.source)
			};
			CKEDITOR.getTemplate = function (e) {
				return a[e]
			}
		}(),
		function () {
			var a = [];
			CKEDITOR.addCss = function (e) {
				a.push(e)
			};
			CKEDITOR.getCss = function () {
				return a.join("\n")
			}
		}(), CKEDITOR.on("instanceDestroyed", function () {
			CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset")
		}), CKEDITOR.TRISTATE_ON = 1, CKEDITOR.TRISTATE_OFF = 2, CKEDITOR.TRISTATE_DISABLED = 0,
		function () {
			CKEDITOR.inline = function (a, e) {
				if (!CKEDITOR.env.isCompatible) return null;
				a = CKEDITOR.dom.element.get(a);
				if (a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
				var b = new CKEDITOR.editor(e, a, CKEDITOR.ELEMENT_MODE_INLINE),
					c = a.is("textarea") ? a : null;
				c ? (b.setData(c.getValue(), null, !0), a = CKEDITOR.dom.element.createFromHtml('\x3cdiv contenteditable\x3d"' + !!b.readOnly + '" class\x3d"cke_textarea_inline"\x3e' + c.getValue() + "\x3c/div\x3e", CKEDITOR.document), a.insertAfter(c), c.hide(), c.$.form && b._attachToForm()) : b.setData(a.getHtml(),
					null, !0);
				b.on("loaded", function () {
					b.fire("uiReady");
					b.editable(a);
					b.container = a;
					b.ui.contentsElement = a;
					b.setData(b.getData(1));
					b.resetDirty();
					b.fire("contentDom");
					b.mode = "wysiwyg";
					b.fire("mode");
					b.status = "ready";
					b.fireOnce("instanceReady");
					CKEDITOR.fire("instanceReady", null, b)
				}, null, null, 1E4);
				b.on("destroy", function () {
					c && (b.container.clearCustomData(), b.container.remove(), c.show());
					b.element.clearCustomData();
					delete b.element
				});
				return b
			};
			CKEDITOR.inlineAll = function () {
				var a, e, b;
				for (b in CKEDITOR.dtd.$editable)
					for (var c =
							CKEDITOR.document.getElementsByTag(b), g = 0, l = c.count(); g < l; g++) a = c.getItem(g), "true" == a.getAttribute("contenteditable") && (e = {
						element: a,
						config: {}
					}, !1 !== CKEDITOR.fire("inline", e) && CKEDITOR.inline(a, e.config))
			};
			CKEDITOR.domReady(function () {
				!CKEDITOR.disableAutoInline && CKEDITOR.inlineAll()
			})
		}(), CKEDITOR.replaceClass = "ckeditor",
		function () {
			function a(a, g, l, k) {
				if (!CKEDITOR.env.isCompatible) return null;
				a = CKEDITOR.dom.element.get(a);
				if (a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
				var f = new CKEDITOR.editor(g, a, k);
				k == CKEDITOR.ELEMENT_MODE_REPLACE && (a.setStyle("visibility", "hidden"), f._.required = a.hasAttribute("required"), a.removeAttribute("required"));
				l && f.setData(l, null, !0);
				f.on("loaded", function () {
					b(f);
					k == CKEDITOR.ELEMENT_MODE_REPLACE && f.config.autoUpdateElement && a.$.form && f._attachToForm();
					f.setMode(f.config.startupMode, function () {
						f.resetDirty();
						f.status = "ready";
						f.fireOnce("instanceReady");
						CKEDITOR.fire("instanceReady", null, f)
					})
				});
				f.on("destroy", e);
				return f
			}

			function e() {
				var a =
					this.container,
					b = this.element;
				a && (a.clearCustomData(), a.remove());
				b && (b.clearCustomData(), this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (b.show(), this._.required && b.setAttribute("required", "required")), delete this.element)
			}

			function b(a) {
				var b = a.name,
					e = a.element,
					k = a.elementMode,
					f = a.fire("uiSpace", {
						space: "top",
						html: ""
					}).html,
					d = a.fire("uiSpace", {
						space: "bottom",
						html: ""
					}).html,
					m = new CKEDITOR.template('\x3c{outerEl} id\x3d"cke_{name}" class\x3d"{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' +
						CKEDITOR.env.cssClass + '"  dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"application"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : "") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : "") + '\x3c{outerEl} class\x3d"cke_inner cke_reset" role\x3d"presentation"\x3e{topHtml}\x3c{outerEl} id\x3d"{contentId}" class\x3d"cke_contents cke_reset" role\x3d"presentation"\x3e\x3c/{outerEl}\x3e{bottomHtml}\x3c/{outerEl}\x3e\x3c/{outerEl}\x3e'),
					b = CKEDITOR.dom.element.createFromHtml(m.output({
						id: a.id,
						name: b,
						langDir: a.lang.dir,
						langCode: a.langCode,
						voiceLabel: a.title,
						topHtml: f ? '\x3cspan id\x3d"' + a.ui.spaceId("top") + '" class\x3d"cke_top cke_reset_all" role\x3d"presentation" style\x3d"height:auto"\x3e' + f + "\x3c/span\x3e" : "",
						contentId: a.ui.spaceId("contents"),
						bottomHtml: d ? '\x3cspan id\x3d"' + a.ui.spaceId("bottom") + '" class\x3d"cke_bottom cke_reset_all" role\x3d"presentation"\x3e' + d + "\x3c/span\x3e" : "",
						outerEl: CKEDITOR.env.ie ? "span" : "div"
					}));
				k == CKEDITOR.ELEMENT_MODE_REPLACE ?
					(e.hide(), b.insertAfter(e)) : e.append(b);
				a.container = b;
				a.ui.contentsElement = a.ui.space("contents");
				f && a.ui.space("top").unselectable();
				d && a.ui.space("bottom").unselectable();
				e = a.config.width;
				k = a.config.height;
				e && b.setStyle("width", CKEDITOR.tools.cssLength(e));
				k && a.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(k));
				b.disableContextMenu();
				CKEDITOR.env.webkit && b.on("focus", function () {
					a.focus()
				});
				a.fireOnce("uiReady")
			}
			CKEDITOR.replace = function (b, g) {
				return a(b, g, null, CKEDITOR.ELEMENT_MODE_REPLACE)
			};
			CKEDITOR.appendTo = function (b, g, e) {
				return a(b, g, e, CKEDITOR.ELEMENT_MODE_APPENDTO)
			};
			CKEDITOR.replaceAll = function () {
				for (var a = document.getElementsByTagName("textarea"), b = 0; b < a.length; b++) {
					var e = null,
						k = a[b];
					if (k.name || k.id) {
						if ("string" == typeof arguments[0]) {
							if (!(new RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)")).test(k.className)) continue
						} else if ("function" == typeof arguments[0] && (e = {}, !1 === arguments[0](k, e))) continue;
						this.replace(k, e)
					}
				}
			};
			CKEDITOR.editor.prototype.addMode = function (a, b) {
				(this._.modes || (this._.modes = {}))[a] = b
			};
			CKEDITOR.editor.prototype.setMode = function (a, b) {
				var e = this,
					k = this._.modes;
				if (a != e.mode && k && k[a]) {
					e.fire("beforeSetMode", a);
					if (e.mode) {
						var f = e.checkDirty(),
							k = e._.previousModeData,
							d, m = 0;
						e.fire("beforeModeUnload");
						e.editable(0);
						e._.previousMode = e.mode;
						e._.previousModeData = d = e.getData(1);
						"source" == e.mode && k == d && (e.fire("lockSnapshot", {
							forceUpdate: !0
						}), m = 1);
						e.ui.space("contents").setHtml("");
						e.mode = ""
					} else e._.previousModeData = e.getData(1);
					this._.modes[a](function () {
						e.mode = a;
						void 0 !== f && !f &&
							e.resetDirty();
						m ? e.fire("unlockSnapshot") : "wysiwyg" == a && e.fire("saveSnapshot");
						setTimeout(function () {
							e.fire("mode");
							b && b.call(e)
						}, 0)
					})
				}
			};
			CKEDITOR.editor.prototype.resize = function (a, b, e, k) {
				var f = this.container,
					d = this.ui.space("contents"),
					m = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement;
				k = k ? this.container.getFirst(function (a) {
					return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner")
				}) : f;
				k.setSize("width", a, !0);
				m && (m.style.width = "1%");
				var h = (k.$.offsetHeight || 0) - (d.$.clientHeight ||
						0),
					f = Math.max(b - (e ? 0 : h), 0);
				b = e ? b + h : b;
				d.setStyle("height", f + "px");
				m && (m.style.width = "100%");
				this.fire("resize", {
					outerHeight: b,
					contentsHeight: f,
					outerWidth: a || k.getSize("width")
				})
			};
			CKEDITOR.editor.prototype.getResizable = function (a) {
				return a ? this.ui.space("contents") : this.container
			};
			CKEDITOR.domReady(function () {
				CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass)
			})
		}(), CKEDITOR.config.startupMode = "wysiwyg",
		function () {
			function a(a) {
				var b = a.editor,
					d = a.data.path,
					h = d.blockLimit,
					f = a.data.selection,
					g = f.getRanges()[0],
					m;
				if (CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller)
					if (f = e(f, d)) f.appendBogus(), m = CKEDITOR.env.ie;
				k(b, d.block, h) && g.collapsed && !g.getCommonAncestor().isReadOnly() && (d = g.clone(), d.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), h = new CKEDITOR.dom.walker(d), h.guard = function (a) {
					return !c(a) || a.type == CKEDITOR.NODE_COMMENT || a.isReadOnly()
				}, !h.checkForward() || d.checkStartOfBlock() && d.checkEndOfBlock()) && (b = g.fixBlock(!0, b.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p"), CKEDITOR.env.needsBrFiller ||
					(b = b.getFirst(c)) && b.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(b.getText()).match(/^(?:&nbsp;|\xa0)$/) && b.remove(), m = 1, a.cancel());
				m && g.select()
			}

			function e(a, b) {
				if (a.isFake) return 0;
				var d = b.block || b.blockLimit,
					h = d && d.getLast(c);
				if (!(!d || !d.isBlockBoundary() || h && h.type == CKEDITOR.NODE_ELEMENT && h.isBlockBoundary() || d.is("pre") || d.getBogus())) return d
			}

			function b(a) {
				var b = a.data.getTarget();
				b.is("input") && (b = b.getAttribute("type"), "submit" != b && "reset" != b || a.data.preventDefault())
			}

			function c(a) {
				return h(a) &&
					n(a)
			}

			function g(a, b) {
				return function (c) {
					var d = c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget;
					(d = d && d.nodeType == CKEDITOR.NODE_ELEMENT ? new CKEDITOR.dom.element(d) : null) && (b.equals(d) || b.contains(d)) || a.call(this, c)
				}
			}

			function l(a) {
				function b(a) {
					return function (b, h) {
						h && b.type == CKEDITOR.NODE_ELEMENT && b.is(f) && (d = b);
						if (!(h || !c(b) || a && q(b))) return !1
					}
				}
				var d, h = a.getRanges()[0];
				a = a.root;
				var f = {
					table: 1,
					ul: 1,
					ol: 1,
					dl: 1
				};
				if (h.startPath().contains(f)) {
					var g = h.clone();
					g.collapse(1);
					g.setStartAt(a,
						CKEDITOR.POSITION_AFTER_START);
					a = new CKEDITOR.dom.walker(g);
					a.guard = b();
					a.checkBackward();
					if (d) return g = h.clone(), g.collapse(), g.setEndAt(d, CKEDITOR.POSITION_AFTER_END), a = new CKEDITOR.dom.walker(g), a.guard = b(!0), d = !1, a.checkForward(), d
				}
				return null
			}

			function k(a, b, c) {
				return !1 !== a.config.autoParagraph && a.activeEnterMode != CKEDITOR.ENTER_BR && (a.editable().equals(c) && !b || b && "true" == b.getAttribute("contenteditable"))
			}

			function f(a) {
				return a.activeEnterMode != CKEDITOR.ENTER_BR && !1 !== a.config.autoParagraph ?
					a.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : !1
			}

			function d(a) {
				var b = a.editor;
				b.getSelection().scrollIntoView();
				setTimeout(function () {
					b.fire("saveSnapshot")
				}, 0)
			}

			function m(a, b, c) {
				var d = a.getCommonAncestor(b);
				for (b = a = c ? b : a;
					(a = a.getParent()) && !d.equals(a) && 1 == a.getChildCount();) b = a;
				b.remove()
			}
			var h, n, p, q, y, u, r, w, t, B;
			CKEDITOR.editable = CKEDITOR.tools.createClass({
				base: CKEDITOR.dom.element,
				$: function (a, b) {
					this.base(b.$ || b);
					this.editor = a;
					this.status = "unloaded";
					this.hasFocus = !1;
					this.setup()
				},
				proto: {
					focus: function () {
						var a;
						if (CKEDITOR.env.webkit && !this.hasFocus && (a = this.editor._.previousActive || this.getDocument().getActive(), this.contains(a))) {
							a.focus();
							return
						}
						CKEDITOR.env.edge && 14 < CKEDITOR.env.version && !this.hasFocus && this.getDocument().equals(CKEDITOR.document) && (this.editor._.previousScrollTop = this.$.scrollTop);
						try {
							if (!CKEDITOR.env.ie || CKEDITOR.env.edge && 14 < CKEDITOR.env.version || !this.getDocument().equals(CKEDITOR.document))
								if (CKEDITOR.env.chrome) {
									var b = this.$.scrollTop;
									this.$.focus();
									this.$.scrollTop = b
								} else this.$.focus();
							else this.$.setActive()
						} catch (c) {
							if (!CKEDITOR.env.ie) throw c;
						}
						CKEDITOR.env.safari && !this.isInline() && (a = CKEDITOR.document.getActive(), a.equals(this.getWindow().getFrame()) || this.getWindow().focus())
					},
					on: function (a, b) {
						var c = Array.prototype.slice.call(arguments, 0);
						CKEDITOR.env.ie && /^focus|blur$/.exec(a) && (a = "focus" == a ? "focusin" : "focusout", b = g(b, this), c[0] = a, c[1] = b);
						return CKEDITOR.dom.element.prototype.on.apply(this, c)
					},
					attachListener: function (a) {
						!this._.listeners && (this._.listeners = []);
						var b = Array.prototype.slice.call(arguments,
								1),
							b = a.on.apply(a, b);
						this._.listeners.push(b);
						return b
					},
					clearListeners: function () {
						var a = this._.listeners;
						try {
							for (; a.length;) a.pop().removeListener()
						} catch (b) {}
					},
					restoreAttrs: function () {
						var a = this._.attrChanges,
							b, c;
						for (c in a) a.hasOwnProperty(c) && (b = a[c], null !== b ? this.setAttribute(c, b) : this.removeAttribute(c))
					},
					attachClass: function (a) {
						var b = this.getCustomData("classes");
						this.hasClass(a) || (!b && (b = []), b.push(a), this.setCustomData("classes", b), this.addClass(a))
					},
					changeAttr: function (a, b) {
						var c = this.getAttribute(a);
						b !== c && (!this._.attrChanges && (this._.attrChanges = {}), a in this._.attrChanges || (this._.attrChanges[a] = c), this.setAttribute(a, b))
					},
					insertText: function (a) {
						this.editor.focus();
						this.insertHtml(this.transformPlainTextToHtml(a), "text")
					},
					transformPlainTextToHtml: function (a) {
						var b = this.editor.getSelection().getStartElement().hasAscendant("pre", !0) ? CKEDITOR.ENTER_BR : this.editor.activeEnterMode;
						return CKEDITOR.tools.transformPlainTextToHtml(a, b)
					},
					insertHtml: function (a, b, c) {
						var h = this.editor;
						h.focus();
						h.fire("saveSnapshot");
						c || (c = h.getSelection().getRanges()[0]);
						u(this, b || "html", a, c);
						c.select();
						d(this);
						this.editor.fire("afterInsertHtml", {})
					},
					insertHtmlIntoRange: function (a, b, c) {
						u(this, c || "html", a, b);
						this.editor.fire("afterInsertHtml", {
							intoRange: b
						})
					},
					insertElement: function (a, b) {
						var h = this.editor;
						h.focus();
						h.fire("saveSnapshot");
						var f = h.activeEnterMode,
							h = h.getSelection(),
							g = a.getName(),
							g = CKEDITOR.dtd.$block[g];
						b || (b = h.getRanges()[0]);
						this.insertElementIntoRange(a, b) && (b.moveToPosition(a, CKEDITOR.POSITION_AFTER_END), g && ((g =
							a.getNext(function (a) {
								return c(a) && !q(a)
							})) && g.type == CKEDITOR.NODE_ELEMENT && g.is(CKEDITOR.dtd.$block) ? g.getDtd()["#"] ? b.moveToElementEditStart(g) : b.moveToElementEditEnd(a) : g || f == CKEDITOR.ENTER_BR || (g = b.fixBlock(!0, f == CKEDITOR.ENTER_DIV ? "div" : "p"), b.moveToElementEditStart(g))));
						h.selectRanges([b]);
						d(this)
					},
					insertElementIntoSelection: function (a) {
						this.insertElement(a)
					},
					insertElementIntoRange: function (a, b) {
						var c = this.editor,
							d = c.config.enterMode,
							h = a.getName(),
							f = CKEDITOR.dtd.$block[h];
						if (b.checkReadOnly()) return !1;
						b.deleteContents(1);
						b.startContainer.type == CKEDITOR.NODE_ELEMENT && (b.startContainer.is({
							tr: 1,
							table: 1,
							tbody: 1,
							thead: 1,
							tfoot: 1
						}) ? r(b) : b.startContainer.is(CKEDITOR.dtd.$list) && w(b));
						var g, e;
						if (f)
							for (;
								(g = b.getCommonAncestor(0, 1)) && (e = CKEDITOR.dtd[g.getName()]) && (!e || !e[h]);) g.getName() in CKEDITOR.dtd.span ? b.splitElement(g) : b.checkStartOfBlock() && b.checkEndOfBlock() ? (b.setStartBefore(g), b.collapse(!0), g.remove()) : b.splitBlock(d == CKEDITOR.ENTER_DIV ? "div" : "p", c.editable());
						b.insertNode(a);
						return !0
					},
					setData: function (a,
						b) {
						b || (a = this.editor.dataProcessor.toHtml(a));
						this.setHtml(a);
						this.fixInitialSelection();
						"unloaded" == this.status && (this.status = "ready");
						this.editor.fire("dataReady")
					},
					getData: function (a) {
						var b = this.getHtml();
						a || (b = this.editor.dataProcessor.toDataFormat(b));
						return b
					},
					setReadOnly: function (a) {
						this.setAttribute("contenteditable", !a)
					},
					detach: function () {
						this.removeClass("cke_editable");
						this.status = "detached";
						var a = this.editor;
						this._.detach();
						delete a.document;
						delete a.window
					},
					isInline: function () {
						return this.getDocument().equals(CKEDITOR.document)
					},
					fixInitialSelection: function () {
						function a() {
							var b = c.getDocument().$,
								d = b.getSelection(),
								h;
							a: if (d.anchorNode && d.anchorNode == c.$) h = !0;
								else {
									if (CKEDITOR.env.webkit && (h = c.getDocument().getActive()) && h.equals(c) && !d.anchorNode) {
										h = !0;
										break a
									}
									h = void 0
								}
							h && (h = new CKEDITOR.dom.range(c), h.moveToElementEditStart(c), b = b.createRange(), b.setStart(h.startContainer.$, h.startOffset), b.collapse(!0), d.removeAllRanges(), d.addRange(b))
						}

						function b() {
							var a = c.getDocument().$,
								d = a.selection,
								h = c.getDocument().getActive();
							"None" ==
							d.type && h.equals(c) && (d = new CKEDITOR.dom.range(c), a = a.body.createTextRange(), d.moveToElementEditStart(c), d = d.startContainer, d.type != CKEDITOR.NODE_ELEMENT && (d = d.getParent()), a.moveToElementText(d.$), a.collapse(!0), a.select())
						}
						var c = this;
						if (CKEDITOR.env.ie && (9 > CKEDITOR.env.version || CKEDITOR.env.quirks)) this.hasFocus && (this.focus(), b());
						else if (this.hasFocus) this.focus(), a();
						else this.once("focus", function () {
							a()
						}, null, null, -999)
					},
					getHtmlFromRange: function (a) {
						if (a.collapsed) return new CKEDITOR.dom.documentFragment(a.document);
						a = {
							doc: this.getDocument(),
							range: a.clone()
						};
						t.eol.detect(a, this);
						t.bogus.exclude(a);
						t.cell.shrink(a);
						a.fragment = a.range.cloneContents();
						t.tree.rebuild(a, this);
						t.eol.fix(a, this);
						return new CKEDITOR.dom.documentFragment(a.fragment.$)
					},
					extractHtmlFromRange: function (a, b) {
						var c = B,
							d = {
								range: a,
								doc: a.document
							},
							h = this.getHtmlFromRange(a);
						if (a.collapsed) return a.optimize(), h;
						a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
						c.table.detectPurge(d);
						d.bookmark = a.createBookmark();
						delete d.range;
						var f = this.editor.createRange();
						f.moveToPosition(d.bookmark.startNode, CKEDITOR.POSITION_BEFORE_START);
						d.targetBookmark = f.createBookmark();
						c.list.detectMerge(d, this);
						c.table.detectRanges(d, this);
						c.block.detectMerge(d, this);
						d.tableContentsRanges ? (c.table.deleteRanges(d), a.moveToBookmark(d.bookmark), d.range = a) : (a.moveToBookmark(d.bookmark), d.range = a, a.extractContents(c.detectExtractMerge(d)));
						a.moveToBookmark(d.targetBookmark);
						a.optimize();
						c.fixUneditableRangePosition(a);
						c.list.merge(d, this);
						c.table.purge(d, this);
						c.block.merge(d, this);
						if (b) {
							c = a.startPath();
							if (d = a.checkStartOfBlock() && a.checkEndOfBlock() && c.block && !a.root.equals(c.block)) {
								a: {
									var d = c.block.getElementsByTag("span"),
										f = 0,
										g;
									if (d)
										for (; g = d.getItem(f++);)
											if (!n(g)) {
												d = !0;
												break a
											}
									d = !1
								}
								d = !d
							}
							d && (a.moveToPosition(c.block, CKEDITOR.POSITION_BEFORE_START), c.block.remove())
						} else c.autoParagraph(this.editor, a), p(a.startContainer) && a.startContainer.appendBogus();
						a.startContainer.mergeSiblings();
						return h
					},
					setup: function () {
						var a = this.editor;
						this.attachListener(a, "beforeGetData", function () {
							var b =
								this.getData();
							this.is("textarea") || !1 !== a.config.ignoreEmptyParagraph && (b = b.replace(y, function (a, b) {
								return b
							}));
							a.setData(b, null, 1)
						}, this);
						this.attachListener(a, "getSnapshot", function (a) {
							a.data = this.getData(1)
						}, this);
						this.attachListener(a, "afterSetData", function () {
							this.setData(a.getData(1))
						}, this);
						this.attachListener(a, "loadSnapshot", function (a) {
							this.setData(a.data, 1)
						}, this);
						this.attachListener(a, "beforeFocus", function () {
								var b = a.getSelection();
								(b = b && b.getNative()) && "Control" == b.type || this.focus()
							},
							this);
						this.attachListener(a, "insertHtml", function (a) {
							this.insertHtml(a.data.dataValue, a.data.mode, a.data.range)
						}, this);
						this.attachListener(a, "insertElement", function (a) {
							this.insertElement(a.data)
						}, this);
						this.attachListener(a, "insertText", function (a) {
							this.insertText(a.data)
						}, this);
						this.setReadOnly(a.readOnly);
						this.attachClass("cke_editable");
						a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? this.attachClass("cke_editable_inline") : a.elementMode != CKEDITOR.ELEMENT_MODE_REPLACE && a.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO ||
							this.attachClass("cke_editable_themed");
						this.attachClass("cke_contents_" + a.config.contentsLangDirection);
						a.keystrokeHandler.blockedKeystrokes[8] = +a.readOnly;
						a.keystrokeHandler.attach(this);
						this.on("blur", function () {
							this.hasFocus = !1
						}, null, null, -1);
						this.on("focus", function () {
							this.hasFocus = !0
						}, null, null, -1);
						if (CKEDITOR.env.webkit) this.on("scroll", function () {
							a._.previousScrollTop = a.editable().$.scrollTop
						}, null, null, -1);
						if (CKEDITOR.env.edge && 14 < CKEDITOR.env.version) {
							var d = function () {
								var b = a.editable();
								null != a._.previousScrollTop && b.getDocument().equals(CKEDITOR.document) && (b.$.scrollTop = a._.previousScrollTop, a._.previousScrollTop = null, this.removeListener("scroll", d))
							};
							this.on("scroll", d)
						}
						a.focusManager.add(this);
						this.equals(CKEDITOR.document.getActive()) && (this.hasFocus = !0, a.once("contentDom", function () {
							a.focusManager.focus(this)
						}, this));
						this.isInline() && this.changeAttr("tabindex", a.tabIndex);
						if (!this.is("textarea")) {
							a.document = this.getDocument();
							a.window = this.getWindow();
							var f = a.document;
							this.changeAttr("spellcheck", !a.config.disableNativeSpellChecker);
							var g = a.config.contentsLangDirection;
							this.getDirection(1) != g && this.changeAttr("dir", g);
							var e = CKEDITOR.getCss();
							if (e) {
								var g = f.getHead(),
									k = g.getCustomData("stylesheet");
								k ? e != k.getText() && (CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? k.$.styleSheet.cssText = e : k.setText(e)) : (e = f.appendStyleText(e), e = new CKEDITOR.dom.element(e.ownerNode || e.owningElement), g.setCustomData("stylesheet", e), e.data("cke-temp", 1))
							}
							g = f.getCustomData("stylesheet_ref") || 0;
							f.setCustomData("stylesheet_ref",
								g + 1);
							this.setCustomData("cke_includeReadonly", !a.config.disableReadonlyStyling);
							this.attachListener(this, "click", function (a) {
								a = a.data;
								var b = (new CKEDITOR.dom.elementPath(a.getTarget(), this)).contains("a");
								b && 2 != a.$.button && b.isReadOnly() && a.preventDefault()
							});
							var n = {
								8: 1,
								46: 1
							};
							this.attachListener(a, "key", function (b) {
								if (a.readOnly) return !0;
								var c = b.data.domEvent.getKey(),
									d;
								b = a.getSelection();
								if (0 !== b.getRanges().length) {
									if (c in n) {
										var f, g = b.getRanges()[0],
											e = g.startPath(),
											m, k, p, c = 8 == c;
										CKEDITOR.env.ie &&
											11 > CKEDITOR.env.version && (f = b.getSelectedElement()) || (f = l(b)) ? (a.fire("saveSnapshot"), g.moveToPosition(f, CKEDITOR.POSITION_BEFORE_START), f.remove(), g.select(), a.fire("saveSnapshot"), d = 1) : g.collapsed && ((m = e.block) && (p = m[c ? "getPrevious" : "getNext"](h)) && p.type == CKEDITOR.NODE_ELEMENT && p.is("table") && g[c ? "checkStartOfBlock" : "checkEndOfBlock"]() ? (a.fire("saveSnapshot"), g[c ? "checkEndOfBlock" : "checkStartOfBlock"]() && m.remove(), g["moveToElementEdit" + (c ? "End" : "Start")](p), g.select(), a.fire("saveSnapshot"),
												d = 1) : e.blockLimit && e.blockLimit.is("td") && (k = e.blockLimit.getAscendant("table")) && g.checkBoundaryOfElement(k, c ? CKEDITOR.START : CKEDITOR.END) && (p = k[c ? "getPrevious" : "getNext"](h)) ? (a.fire("saveSnapshot"), g["moveToElementEdit" + (c ? "End" : "Start")](p), g.checkStartOfBlock() && g.checkEndOfBlock() ? p.remove() : g.select(), a.fire("saveSnapshot"), d = 1) : (k = e.contains(["td", "th", "caption"])) && g.checkBoundaryOfElement(k, c ? CKEDITOR.START : CKEDITOR.END) && (d = 1))
									}
									return !d
								}
							});
							a.blockless && CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller &&
								this.attachListener(this, "keyup", function (b) {
									b.data.getKeystroke() in n && !this.getFirst(c) && (this.appendBogus(), b = a.createRange(), b.moveToPosition(this, CKEDITOR.POSITION_AFTER_START), b.select())
								});
							this.attachListener(this, "dblclick", function (b) {
								if (a.readOnly) return !1;
								b = {
									element: b.data.getTarget()
								};
								a.fire("doubleclick", b)
							});
							CKEDITOR.env.ie && this.attachListener(this, "click", b);
							CKEDITOR.env.ie && !CKEDITOR.env.edge || this.attachListener(this, "mousedown", function (b) {
								var c = b.data.getTarget();
								c.is("img", "hr",
									"input", "textarea", "select") && !c.isReadOnly() && (a.getSelection().selectElement(c), c.is("input", "textarea", "select") && b.data.preventDefault())
							});
							CKEDITOR.env.edge && this.attachListener(this, "mouseup", function (b) {
								(b = b.data.getTarget()) && b.is("img") && !b.isReadOnly() && a.getSelection().selectElement(b)
							});
							CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function (b) {
								if (2 == b.data.$.button && (b = b.data.getTarget(), !b.getAscendant("table") && !b.getOuterHtml().replace(y, ""))) {
									var c = a.createRange();
									c.moveToElementEditStart(b);
									c.select(!0)
								}
							});
							CKEDITOR.env.webkit && (this.attachListener(this, "click", function (a) {
								a.data.getTarget().is("input", "select") && a.data.preventDefault()
							}), this.attachListener(this, "mouseup", function (a) {
								a.data.getTarget().is("input", "textarea") && a.data.preventDefault()
							}));
							CKEDITOR.env.webkit && this.attachListener(a, "key", function (b) {
								if (a.readOnly) return !0;
								var c = b.data.domEvent.getKey();
								if (c in n && (b = a.getSelection(), 0 !== b.getRanges().length)) {
									var c = 8 == c,
										d = b.getRanges()[0];
									b = d.startPath();
									if (d.collapsed) a: {
										var h =
											b.block;
										if (h && d[c ? "checkStartOfBlock" : "checkEndOfBlock"]() && d.moveToClosestEditablePosition(h, !c) && d.collapsed) {
											if (d.startContainer.type == CKEDITOR.NODE_ELEMENT) {
												var f = d.startContainer.getChild(d.startOffset - (c ? 1 : 0));
												if (f && f.type == CKEDITOR.NODE_ELEMENT && f.is("hr")) {
													a.fire("saveSnapshot");
													f.remove();
													b = !0;
													break a
												}
											}
											d = d.startPath().block;
											if (!d || d && d.contains(h)) b = void 0;
											else {
												a.fire("saveSnapshot");
												var g;
												(g = (c ? d : h).getBogus()) && g.remove();
												g = a.getSelection();
												f = g.createBookmarks();
												(c ? h : d).moveChildren(c ?
													d : h, !1);
												b.lastElement.mergeSiblings();
												m(h, d, !c);
												g.selectBookmarks(f);
												b = !0
											}
										} else b = !1
									}
									else c = d, g = b.block, d = c.endPath().block, g && d && !g.equals(d) ? (a.fire("saveSnapshot"), (h = g.getBogus()) && h.remove(), c.enlarge(CKEDITOR.ENLARGE_INLINE), c.deleteContents(), d.getParent() && (d.moveChildren(g, !1), b.lastElement.mergeSiblings(), m(g, d, !0)), c = a.getSelection().getRanges()[0], c.collapse(1), c.optimize(), "" === c.startContainer.getHtml() && c.startContainer.appendBogus(), c.select(), b = !0) : b = !1;
									if (!b) return;
									a.getSelection().scrollIntoView();
									a.fire("saveSnapshot");
									return !1
								}
							}, this, null, 100)
						}
					}
				},
				_: {
					detach: function () {
						this.editor.setData(this.editor.getData(), 0, 1);
						this.clearListeners();
						this.restoreAttrs();
						var a;
						if (a = this.removeCustomData("classes"))
							for (; a.length;) this.removeClass(a.pop());
						if (!this.is("textarea")) {
							a = this.getDocument();
							var b = a.getHead();
							if (b.getCustomData("stylesheet")) {
								var c = a.getCustomData("stylesheet_ref");
								--c ? a.setCustomData("stylesheet_ref", c) : (a.removeCustomData("stylesheet_ref"), b.removeCustomData("stylesheet").remove())
							}
						}
						this.editor.fire("contentDomUnload");
						delete this.editor
					}
				}
			});
			CKEDITOR.editor.prototype.editable = function (a) {
				var b = this._.editable;
				if (b && a) return 0;
				arguments.length && (b = this._.editable = a ? a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), null));
				return b
			};
			CKEDITOR.on("instanceLoaded", function (b) {
				var c = b.editor;
				c.on("insertElement", function (a) {
					a = a.data;
					a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") || a.is("textarea")) && ("false" != a.getAttribute("contentEditable") && a.data("cke-editable", a.hasAttribute("contenteditable") ?
						"true" : "1"), a.setAttribute("contentEditable", !1))
				});
				c.on("selectionChange", function (b) {
					if (!c.readOnly) {
						var d = c.getSelection();
						d && !d.isLocked && (d = c.checkDirty(), c.fire("lockSnapshot"), a(b), c.fire("unlockSnapshot"), !d && c.resetDirty())
					}
				})
			});
			CKEDITOR.on("instanceCreated", function (a) {
				var b = a.editor;
				b.on("mode", function () {
					var a = b.editable();
					if (a && a.isInline()) {
						var c = b.title;
						a.changeAttr("role", "textbox");
						a.changeAttr("aria-multiline", "true");
						a.changeAttr("aria-label", c);
						c && a.changeAttr("title", c);
						var d =
							b.fire("ariaEditorHelpLabel", {}).label;
						if (d && (c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents"))) {
							var h = CKEDITOR.tools.getNextId(),
								d = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + h + '" class\x3d"cke_voice_label"\x3e' + d + "\x3c/span\x3e");
							c.append(d);
							a.changeAttr("aria-describedby", h)
						}
					}
				})
			});
			CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");
			h = CKEDITOR.dom.walker.whitespaces(!0);
			n = CKEDITOR.dom.walker.bookmark(!1, !0);
			p = CKEDITOR.dom.walker.empty();
			q = CKEDITOR.dom.walker.bogus();
			y = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi;
			u = function () {
				function a(b) {
					return b.type == CKEDITOR.NODE_ELEMENT
				}

				function b(c, d) {
					var h, f, g, e, m = [],
						k = d.range.startContainer;
					h = d.range.startPath();
					for (var k = n[k.getName()], l = 0, p = c.getChildren(), t = p.count(), y = -1, r = -1, x = 0, w = h.contains(n.$list); l < t; ++l) h = p.getItem(l), a(h) ? (g = h.getName(), w && g in CKEDITOR.dtd.$list ?
						m = m.concat(b(h, d)) : (e = !!k[g], "br" != g || !h.data("cke-eol") || l && l != t - 1 || (x = (f = l ? m[l - 1].node : p.getItem(l + 1)) && (!a(f) || !f.is("br")), f = f && a(f) && n.$block[f.getName()]), -1 != y || e || (y = l), e || (r = l), m.push({
							isElement: 1,
							isLineBreak: x,
							isBlock: h.isBlockBoundary(),
							hasBlockSibling: f,
							node: h,
							name: g,
							allowed: e
						}), f = x = 0)) : m.push({
						isElement: 0,
						node: h,
						allowed: 1
					}); - 1 < y && (m[y].firstNotAllowed = 1); - 1 < r && (m[r].lastNotAllowed = 1);
					return m
				}

				function d(b, c) {
					var h = [],
						f = b.getChildren(),
						g = f.count(),
						e, m = 0,
						k = n[c],
						l = !b.is(n.$inline) || b.is("br");
					for (l && h.push(" "); m < g; m++) e = f.getItem(m), a(e) && !e.is(k) ? h = h.concat(d(e, c)) : h.push(e);
					l && h.push(" ");
					return h
				}

				function h(b) {
					return a(b.startContainer) && b.startContainer.getChild(b.startOffset - 1)
				}

				function g(b) {
					return b && a(b) && (b.is(n.$removeEmpty) || b.is("a") && !b.isBlockBoundary())
				}

				function e(b, c, d, h) {
					var f = b.clone(),
						g, m;
					f.setEndAt(c, CKEDITOR.POSITION_BEFORE_END);
					(g = (new CKEDITOR.dom.walker(f)).next()) && a(g) && l[g.getName()] && (m = g.getPrevious()) && a(m) && !m.getParent().equals(b.startContainer) && d.contains(m) &&
						h.contains(g) && g.isIdentical(m) && (g.moveChildren(m), g.remove(), e(b, c, d, h))
				}

				function m(b, c) {
					function d(b, c) {
						if (c.isBlock && c.isElement && !c.node.is("br") && a(b) && b.is("br")) return b.remove(), 1
					}
					var h = c.endContainer.getChild(c.endOffset),
						f = c.endContainer.getChild(c.endOffset - 1);
					h && d(h, b[b.length - 1]);
					f && d(f, b[0]) && (c.setEnd(c.endContainer, c.endOffset - 1), c.collapse())
				}
				var n = CKEDITOR.dtd,
					l = {
						p: 1,
						div: 1,
						h1: 1,
						h2: 1,
						h3: 1,
						h4: 1,
						h5: 1,
						h6: 1,
						ul: 1,
						ol: 1,
						li: 1,
						pre: 1,
						dl: 1,
						blockquote: 1
					},
					p = {
						p: 1,
						div: 1,
						h1: 1,
						h2: 1,
						h3: 1,
						h4: 1,
						h5: 1,
						h6: 1
					},
					t = CKEDITOR.tools.extend({}, n.$inline);
				delete t.br;
				return function (l, F, y, r) {
					var w = l.editor,
						q = !1;
					"unfiltered_html" == F && (F = "html", q = !0);
					if (!r.checkReadOnly()) {
						var B = (new CKEDITOR.dom.elementPath(r.startContainer, r.root)).blockLimit || r.root;
						l = {
							type: F,
							dontFilter: q,
							editable: l,
							editor: w,
							range: r,
							blockLimit: B,
							mergeCandidates: [],
							zombies: []
						};
						F = l.range;
						r = l.mergeCandidates;
						var u, I;
						"text" == l.type && F.shrink(CKEDITOR.SHRINK_ELEMENT, !0, !1) && (u = CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e",
							F.document), F.insertNode(u), F.setStartAfter(u));
						q = new CKEDITOR.dom.elementPath(F.startContainer);
						l.endPath = B = new CKEDITOR.dom.elementPath(F.endContainer);
						if (!F.collapsed) {
							var w = B.block || B.blockLimit,
								da = F.getCommonAncestor();
							w && !w.equals(da) && !w.contains(da) && F.checkEndOfBlock() && l.zombies.push(w);
							F.deleteContents()
						}
						for (;
							(I = h(F)) && a(I) && I.isBlockBoundary() && q.contains(I);) F.moveToPosition(I, CKEDITOR.POSITION_BEFORE_END);
						e(F, l.blockLimit, q, B);
						u && (F.setEndBefore(u), F.collapse(), u.remove());
						u = F.startPath();
						if (w = u.contains(g, !1, 1)) F.splitElement(w), l.inlineStylesRoot = w, l.inlineStylesPeak = u.lastElement;
						u = F.createBookmark();
						(w = u.startNode.getPrevious(c)) && a(w) && g(w) && r.push(w);
						(w = u.startNode.getNext(c)) && a(w) && g(w) && r.push(w);
						for (w = u.startNode;
							(w = w.getParent()) && g(w);) r.push(w);
						F.moveToBookmark(u);
						if (u = y) {
							u = l.range;
							if ("text" == l.type && l.inlineStylesRoot) {
								I = l.inlineStylesPeak;
								F = I.getDocument().createText("{cke-peak}");
								for (r = l.inlineStylesRoot.getParent(); !I.equals(r);) F = F.appendTo(I.clone()), I = I.getParent();
								y = F.getOuterHtml().split("{cke-peak}").join(y)
							}
							I = l.blockLimit.getName();
							if (/^\s+|\s+$/.test(y) && "span" in CKEDITOR.dtd[I]) {
								var P = '\x3cspan data-cke-marker\x3d"1"\x3e\x26nbsp;\x3c/span\x3e';
								y = P + y + P
							}
							y = l.editor.dataProcessor.toHtml(y, {
								context: null,
								fixForBody: !1,
								protectedWhitespaces: !!P,
								dontFilter: l.dontFilter,
								filter: l.editor.activeFilter,
								enterMode: l.editor.activeEnterMode
							});
							I = u.document.createElement("body");
							I.setHtml(y);
							P && (I.getFirst().remove(), I.getLast().remove());
							if ((P = u.startPath().block) && (1 !=
									P.getChildCount() || !P.getBogus())) a: {
								var Q;
								if (1 == I.getChildCount() && a(Q = I.getFirst()) && Q.is(p) && !Q.hasAttribute("contenteditable")) {
									P = Q.getElementsByTag("*");
									u = 0;
									for (r = P.count(); u < r; u++)
										if (F = P.getItem(u), !F.is(t)) break a;
									Q.moveChildren(Q.getParent(1));
									Q.remove()
								}
							}
							l.dataWrapper = I;
							u = y
						}
						if (u) {
							Q = l.range;
							u = Q.document;
							var M;
							I = l.blockLimit;
							r = 0;
							var U, P = [],
								T, O;
							y = w = 0;
							var W, aa;
							F = Q.startContainer;
							var q = l.endPath.elements[0],
								ba, B = q.getPosition(F),
								da = !!q.getCommonAncestor(F) && B != CKEDITOR.POSITION_IDENTICAL && !(B &
									CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED);
							F = b(l.dataWrapper, l);
							for (m(F, Q); r < F.length; r++) {
								B = F[r];
								if (M = B.isLineBreak) {
									M = Q;
									W = I;
									var Y = void 0,
										ca = void 0;
									B.hasBlockSibling ? M = 1 : (Y = M.startContainer.getAscendant(n.$block, 1)) && Y.is({
										div: 1,
										p: 1
									}) ? (ca = Y.getPosition(W), ca == CKEDITOR.POSITION_IDENTICAL || ca == CKEDITOR.POSITION_CONTAINS ? M = 0 : (W = M.splitElement(Y), M.moveToPosition(W, CKEDITOR.POSITION_AFTER_START), M = 1)) : M = 0
								}
								if (M) y = 0 < r;
								else {
									M = Q.startPath();
									!B.isBlock && k(l.editor, M.block, M.blockLimit) && (O =
										f(l.editor)) && (O = u.createElement(O), O.appendBogus(), Q.insertNode(O), CKEDITOR.env.needsBrFiller && (U = O.getBogus()) && U.remove(), Q.moveToPosition(O, CKEDITOR.POSITION_BEFORE_END));
									if ((M = Q.startPath().block) && !M.equals(T)) {
										if (U = M.getBogus()) U.remove(), P.push(M);
										T = M
									}
									B.firstNotAllowed && (w = 1);
									if (w && B.isElement) {
										M = Q.startContainer;
										for (W = null; M && !n[M.getName()][B.name];) {
											if (M.equals(I)) {
												M = null;
												break
											}
											W = M;
											M = M.getParent()
										}
										if (M) W && (aa = Q.splitElement(W), l.zombies.push(aa), l.zombies.push(W));
										else {
											W = I.getName();
											ba = !r;
											M = r == F.length - 1;
											W = d(B.node, W);
											for (var Y = [], ca = W.length, ea = 0, ia = void 0, ja = 0, fa = -1; ea < ca; ea++) ia = W[ea], " " == ia ? (ja || ba && !ea || (Y.push(new CKEDITOR.dom.text(" ")), fa = Y.length), ja = 1) : (Y.push(ia), ja = 0);
											M && fa == Y.length && Y.pop();
											ba = Y
										}
									}
									if (ba) {
										for (; M = ba.pop();) Q.insertNode(M);
										ba = 0
									} else Q.insertNode(B.node);
									B.lastNotAllowed && r < F.length - 1 && ((aa = da ? q : aa) && Q.setEndAt(aa, CKEDITOR.POSITION_AFTER_START), w = 0);
									Q.collapse()
								}
							}
							1 != F.length ? U = !1 : (U = F[0], U = U.isElement && "false" == U.node.getAttribute("contenteditable"));
							U && (y = !0, M = F[0].node, Q.setStartAt(M, CKEDITOR.POSITION_BEFORE_START), Q.setEndAt(M, CKEDITOR.POSITION_AFTER_END));
							l.dontMoveCaret = y;
							l.bogusNeededBlocks = P
						}
						U = l.range;
						var ga;
						aa = l.bogusNeededBlocks;
						for (ba = U.createBookmark(); T = l.zombies.pop();) T.getParent() && (O = U.clone(), O.moveToElementEditStart(T), O.removeEmptyBlocksAtEnd());
						if (aa)
							for (; T = aa.pop();) CKEDITOR.env.needsBrFiller ? T.appendBogus() : T.append(U.document.createText(" "));
						for (; T = l.mergeCandidates.pop();) T.mergeSiblings();
						U.moveToBookmark(ba);
						if (!l.dontMoveCaret) {
							for (T =
								h(U); T && a(T) && !T.is(n.$empty);) {
								if (T.isBlockBoundary()) U.moveToPosition(T, CKEDITOR.POSITION_BEFORE_END);
								else {
									if (g(T) && T.getHtml().match(/(\s|&nbsp;)$/g)) {
										ga = null;
										break
									}
									ga = U.clone();
									ga.moveToPosition(T, CKEDITOR.POSITION_BEFORE_END)
								}
								T = T.getLast(c)
							}
							ga && U.moveToRange(ga)
						}
					}
				}
			}();
			r = function () {
				function a(b) {
					b = new CKEDITOR.dom.walker(b);
					b.guard = function (a, b) {
						if (b) return !1;
						if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$tableContent)
					};
					b.evaluator = function (a) {
						return a.type == CKEDITOR.NODE_ELEMENT
					};
					return b
				}

				function b(a, c, d) {
					c = a.getDocument().createElement(c);
					a.append(c, d);
					return c
				}

				function c(a) {
					var b = a.count(),
						d;
					for (b; 0 < b--;) d = a.getItem(b), CKEDITOR.tools.trim(d.getHtml()) || (d.appendBogus(), CKEDITOR.env.ie && 9 > CKEDITOR.env.version && d.getChildCount() && d.getFirst().remove())
				}
				return function (d) {
					var h = d.startContainer,
						f = h.getAscendant("table", 1),
						g = !1;
					c(f.getElementsByTag("td"));
					c(f.getElementsByTag("th"));
					f = d.clone();
					f.setStart(h, 0);
					f = a(f).lastBackward();
					f || (f = d.clone(), f.setEndAt(h, CKEDITOR.POSITION_BEFORE_END),
						f = a(f).lastForward(), g = !0);
					f || (f = h);
					f.is("table") ? (d.setStartAt(f, CKEDITOR.POSITION_BEFORE_START), d.collapse(!0), f.remove()) : (f.is({
						tbody: 1,
						thead: 1,
						tfoot: 1
					}) && (f = b(f, "tr", g)), f.is("tr") && (f = b(f, f.getParent().is("thead") ? "th" : "td", g)), (h = f.getBogus()) && h.remove(), d.moveToPosition(f, g ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END))
				}
			}();
			w = function () {
				function a(b) {
					b = new CKEDITOR.dom.walker(b);
					b.guard = function (a, b) {
						if (b) return !1;
						if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$list) ||
							a.is(CKEDITOR.dtd.$listItem)
					};
					b.evaluator = function (a) {
						return a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$listItem)
					};
					return b
				}
				return function (b) {
					var c = b.startContainer,
						d = !1,
						h;
					h = b.clone();
					h.setStart(c, 0);
					h = a(h).lastBackward();
					h || (h = b.clone(), h.setEndAt(c, CKEDITOR.POSITION_BEFORE_END), h = a(h).lastForward(), d = !0);
					h || (h = c);
					h.is(CKEDITOR.dtd.$list) ? (b.setStartAt(h, CKEDITOR.POSITION_BEFORE_START), b.collapse(!0), h.remove()) : ((c = h.getBogus()) && c.remove(), b.moveToPosition(h, d ? CKEDITOR.POSITION_AFTER_START :
						CKEDITOR.POSITION_BEFORE_END), b.select())
				}
			}();
			t = {
				eol: {
					detect: function (a, b) {
						var c = a.range,
							d = c.clone(),
							h = c.clone(),
							f = new CKEDITOR.dom.elementPath(c.startContainer, b),
							g = new CKEDITOR.dom.elementPath(c.endContainer, b);
						d.collapse(1);
						h.collapse();
						f.block && d.checkBoundaryOfElement(f.block, CKEDITOR.END) && (c.setStartAfter(f.block), a.prependEolBr = 1);
						g.block && h.checkBoundaryOfElement(g.block, CKEDITOR.START) && (c.setEndBefore(g.block), a.appendEolBr = 1)
					},
					fix: function (a, b) {
						var c = b.getDocument(),
							d;
						a.appendEolBr && (d =
							this.createEolBr(c), a.fragment.append(d));
						!a.prependEolBr || d && !d.getPrevious() || a.fragment.append(this.createEolBr(c), 1)
					},
					createEolBr: function (a) {
						return a.createElement("br", {
							attributes: {
								"data-cke-eol": 1
							}
						})
					}
				},
				bogus: {
					exclude: function (a) {
						var b = a.range.getBoundaryNodes(),
							c = b.startNode,
							b = b.endNode;
						!b || !q(b) || c && c.equals(b) || a.range.setEndBefore(b)
					}
				},
				tree: {
					rebuild: function (a, b) {
						var c = a.range,
							d = c.getCommonAncestor(),
							h = new CKEDITOR.dom.elementPath(d, b),
							f = new CKEDITOR.dom.elementPath(c.startContainer, b),
							c = new CKEDITOR.dom.elementPath(c.endContainer, b),
							g;
						d.type == CKEDITOR.NODE_TEXT && (d = d.getParent());
						if (h.blockLimit.is({
								tr: 1,
								table: 1
							})) {
							var e = h.contains("table").getParent();
							g = function (a) {
								return !a.equals(e)
							}
						} else if (h.block && h.block.is(CKEDITOR.dtd.$listItem) && (f = f.contains(CKEDITOR.dtd.$list), c = c.contains(CKEDITOR.dtd.$list), !f.equals(c))) {
							var m = h.contains(CKEDITOR.dtd.$list).getParent();
							g = function (a) {
								return !a.equals(m)
							}
						}
						g || (g = function (a) {
							return !a.equals(h.block) && !a.equals(h.blockLimit)
						});
						this.rebuildFragment(a,
							b, d, g)
					},
					rebuildFragment: function (a, b, c, d) {
						for (var h; c && !c.equals(b) && d(c);) h = c.clone(0, 1), a.fragment.appendTo(h), a.fragment = h, c = c.getParent()
					}
				},
				cell: {
					shrink: function (a) {
						a = a.range;
						var b = a.startContainer,
							c = a.endContainer,
							d = a.startOffset,
							h = a.endOffset;
						b.type == CKEDITOR.NODE_ELEMENT && b.equals(c) && b.is("tr") && ++d == h && a.shrink(CKEDITOR.SHRINK_TEXT)
					}
				}
			};
			B = function () {
				function a(b, c) {
					var d = b.getParent();
					if (d.is(CKEDITOR.dtd.$inline)) b[c ? "insertBefore" : "insertAfter"](d)
				}

				function b(c, d, h) {
					a(d);
					a(h, 1);
					for (var f; f =
						h.getNext();) f.insertAfter(d), d = f;
					p(c) && c.remove()
				}

				function c(a, b) {
					var d = new CKEDITOR.dom.range(a);
					d.setStartAfter(b.startNode);
					d.setEndBefore(b.endNode);
					return d
				}
				return {
					list: {
						detectMerge: function (a, b) {
							var d = c(b, a.bookmark),
								h = d.startPath(),
								f = d.endPath(),
								g = h.contains(CKEDITOR.dtd.$list),
								e = f.contains(CKEDITOR.dtd.$list);
							a.mergeList = g && e && g.getParent().equals(e.getParent()) && !g.equals(e);
							a.mergeListItems = h.block && f.block && h.block.is(CKEDITOR.dtd.$listItem) && f.block.is(CKEDITOR.dtd.$listItem);
							if (a.mergeList ||
								a.mergeListItems) d = d.clone(), d.setStartBefore(a.bookmark.startNode), d.setEndAfter(a.bookmark.endNode), a.mergeListBookmark = d.createBookmark()
						},
						merge: function (a, c) {
							if (a.mergeListBookmark) {
								var d = a.mergeListBookmark.startNode,
									h = a.mergeListBookmark.endNode,
									f = new CKEDITOR.dom.elementPath(d, c),
									g = new CKEDITOR.dom.elementPath(h, c);
								if (a.mergeList) {
									var e = f.contains(CKEDITOR.dtd.$list),
										m = g.contains(CKEDITOR.dtd.$list);
									e.equals(m) || (m.moveChildren(e), m.remove())
								}
								a.mergeListItems && (f = f.contains(CKEDITOR.dtd.$listItem),
									g = g.contains(CKEDITOR.dtd.$listItem), f.equals(g) || b(g, d, h));
								d.remove();
								h.remove()
							}
						}
					},
					block: {
						detectMerge: function (a, b) {
							if (!a.tableContentsRanges && !a.mergeListBookmark) {
								var c = new CKEDITOR.dom.range(b);
								c.setStartBefore(a.bookmark.startNode);
								c.setEndAfter(a.bookmark.endNode);
								a.mergeBlockBookmark = c.createBookmark()
							}
						},
						merge: function (a, c) {
							if (a.mergeBlockBookmark && !a.purgeTableBookmark) {
								var d = a.mergeBlockBookmark.startNode,
									h = a.mergeBlockBookmark.endNode,
									f = new CKEDITOR.dom.elementPath(d, c),
									g = new CKEDITOR.dom.elementPath(h,
										c),
									f = f.block,
									g = g.block;
								f && g && !f.equals(g) && b(g, d, h);
								d.remove();
								h.remove()
							}
						}
					},
					table: function () {
						function a(c) {
							var h = [],
								f, g = new CKEDITOR.dom.walker(c),
								e = c.startPath().contains(d),
								m = c.endPath().contains(d),
								k = {};
							g.guard = function (a, g) {
								if (a.type == CKEDITOR.NODE_ELEMENT) {
									var l = "visited_" + (g ? "out" : "in");
									if (a.getCustomData(l)) return;
									CKEDITOR.dom.element.setMarker(k, a, l, 1)
								}
								if (g && e && a.equals(e)) f = c.clone(), f.setEndAt(e, CKEDITOR.POSITION_BEFORE_END), h.push(f);
								else if (!g && m && a.equals(m)) f = c.clone(), f.setStartAt(m,
									CKEDITOR.POSITION_AFTER_START), h.push(f);
								else {
									if (l = !g) l = a.type == CKEDITOR.NODE_ELEMENT && a.is(d) && (!e || b(a, e)) && (!m || b(a, m));
									if (!l && (l = g))
										if (a.is(d)) var l = e && e.getAscendant("table", !0),
											n = m && m.getAscendant("table", !0),
											p = a.getAscendant("table", !0),
											l = l && l.contains(p) || n && n.contains(p);
										else l = void 0;
									l && (f = c.clone(), f.selectNodeContents(a), h.push(f))
								}
							};
							g.lastForward();
							CKEDITOR.dom.element.clearAllMarkers(k);
							return h
						}

						function b(a, c) {
							var d = CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED,
								h = a.getPosition(c);
							return h === CKEDITOR.POSITION_IDENTICAL ? !1 : 0 === (h & d)
						}
						var d = {
							td: 1,
							th: 1,
							caption: 1
						};
						return {
							detectPurge: function (a) {
								var b = a.range,
									c = b.clone();
								c.enlarge(CKEDITOR.ENLARGE_ELEMENT);
								var c = new CKEDITOR.dom.walker(c),
									h = 0;
								c.evaluator = function (a) {
									a.type == CKEDITOR.NODE_ELEMENT && a.is(d) && ++h
								};
								c.checkForward();
								if (1 < h) {
									var c = b.startPath().contains("table"),
										f = b.endPath().contains("table");
									c && f && b.checkBoundaryOfElement(c, CKEDITOR.START) && b.checkBoundaryOfElement(f, CKEDITOR.END) && (b = a.range.clone(), b.setStartBefore(c),
										b.setEndAfter(f), a.purgeTableBookmark = b.createBookmark())
								}
							},
							detectRanges: function (h, f) {
								var g = c(f, h.bookmark),
									e = g.clone(),
									m, k, l = g.getCommonAncestor();
								l.is(CKEDITOR.dtd.$tableContent) && !l.is(d) && (l = l.getAscendant("table", !0));
								k = l;
								l = new CKEDITOR.dom.elementPath(g.startContainer, k);
								k = new CKEDITOR.dom.elementPath(g.endContainer, k);
								l = l.contains("table");
								k = k.contains("table");
								if (l || k) l && k && b(l, k) ? (h.tableSurroundingRange = e, e.setStartAt(l, CKEDITOR.POSITION_AFTER_END), e.setEndAt(k, CKEDITOR.POSITION_BEFORE_START),
									e = g.clone(), e.setEndAt(l, CKEDITOR.POSITION_AFTER_END), m = g.clone(), m.setStartAt(k, CKEDITOR.POSITION_BEFORE_START), m = a(e).concat(a(m))) : l ? k || (h.tableSurroundingRange = e, e.setStartAt(l, CKEDITOR.POSITION_AFTER_END), g.setEndAt(l, CKEDITOR.POSITION_AFTER_END)) : (h.tableSurroundingRange = e, e.setEndAt(k, CKEDITOR.POSITION_BEFORE_START), g.setStartAt(k, CKEDITOR.POSITION_AFTER_START)), h.tableContentsRanges = m ? m : a(g)
							},
							deleteRanges: function (a) {
								for (var b; b = a.tableContentsRanges.pop();) b.extractContents(), p(b.startContainer) &&
									b.startContainer.appendBogus();
								a.tableSurroundingRange && a.tableSurroundingRange.extractContents()
							},
							purge: function (a) {
								if (a.purgeTableBookmark) {
									var b = a.doc,
										c = a.range.clone(),
										b = b.createElement("p");
									b.insertBefore(a.purgeTableBookmark.startNode);
									c.moveToBookmark(a.purgeTableBookmark);
									c.deleteContents();
									a.range.moveToPosition(b, CKEDITOR.POSITION_AFTER_START)
								}
							}
						}
					}(),
					detectExtractMerge: function (a) {
						return !(a.range.startPath().contains(CKEDITOR.dtd.$listItem) && a.range.endPath().contains(CKEDITOR.dtd.$listItem))
					},
					fixUneditableRangePosition: function (a) {
						a.startContainer.getDtd()["#"] || a.moveToClosestEditablePosition(null, !0)
					},
					autoParagraph: function (a, b) {
						var c = b.startPath(),
							d;
						k(a, c.block, c.blockLimit) && (d = f(a)) && (d = b.document.createElement(d), d.appendBogus(), b.insertNode(d), b.moveToPosition(d, CKEDITOR.POSITION_AFTER_START))
					}
				}
			}()
		}(),
		function () {
			function a(a) {
				return CKEDITOR.plugins.widget && CKEDITOR.plugins.widget.isDomWidget(a)
			}

			function e(b, c) {
				if (0 === b.length || a(b[0].getEnclosedNode())) return !1;
				var d, h;
				if ((d = !c &&
						1 === b.length) && !(d = b[0].collapsed)) {
					var f = b[0];
					d = f.startContainer.getAscendant({
						td: 1,
						th: 1
					}, !0);
					var g = f.endContainer.getAscendant({
						td: 1,
						th: 1
					}, !0);
					h = CKEDITOR.tools.trim;
					d && d.equals(g) && !d.findOne("td, th, tr, tbody, table") ? (f = f.cloneContents(), d = f.getFirst() ? h(f.getFirst().getText()) !== h(d.getText()) : !0) : d = !1
				}
				if (d) return !1;
				for (h = 0; h < b.length; h++)
					if (d = b[h]._getTableElement(), !d) return !1;
				return !0
			}

			function b(a) {
				function b(a) {
					a = a.find("td, th");
					var c = [],
						d;
					for (d = 0; d < a.count(); d++) c.push(a.getItem(d));
					return c
				}
				var c = [],
					d, h;
				for (h = 0; h < a.length; h++) d = a[h]._getTableElement(), d.is && d.is({
					td: 1,
					th: 1
				}) ? c.push(d) : c = c.concat(b(d));
				return c
			}

			function c(a) {
				a = b(a);
				var c = "",
					d = [],
					h, f;
				for (f = 0; f < a.length; f++) h && !h.equals(a[f].getAscendant("tr")) ? (c += d.join("\t") + "\n", h = a[f].getAscendant("tr"), d = []) : 0 === f && (h = a[f].getAscendant("tr")), d.push(a[f].getText());
				return c += d.join("\t")
			}

			function g(a) {
				var b = this.root.editor,
					d = b.getSelection(1);
				this.reset();
				v = !0;
				d.root.once("selectionchange", function (a) {
					a.cancel()
				}, null, null, 0);
				d.selectRanges([a[0]]);
				d = this._.cache;
				d.ranges = new CKEDITOR.dom.rangeList(a);
				d.type = CKEDITOR.SELECTION_TEXT;
				d.selectedElement = a[0]._getTableElement();
				d.selectedText = c(a);
				d.nativeSel = null;
				this.isFake = 1;
				this.rev = w++;
				b._.fakeSelection = this;
				v = !1;
				this.root.fire("selectionchange")
			}

			function l() {
				var b = this._.fakeSelection,
					c;
				if (b) {
					c = this.getSelection(1);
					var d;
					if (!(d = !c) && (d = !c.isHidden())) {
						d = b;
						var h = c.getRanges(),
							f = d.getRanges(),
							g = h.length && h[0]._getTableElement() && h[0]._getTableElement().getAscendant("table", !0),
							m = f.length && f[0]._getTableElement() &&
							f[0]._getTableElement().getAscendant("table", !0),
							k = 1 === h.length && h[0]._getTableElement() && h[0]._getTableElement().is("table"),
							l = 1 === f.length && f[0]._getTableElement() && f[0]._getTableElement().is("table");
						if (a(d.getSelectedElement())) d = !1;
						else {
							var n = 1 === h.length && h[0].collapsed,
								f = e(h, !!CKEDITOR.env.webkit) && e(f);
							g = g && m ? g.equals(m) || m.contains(g) : !1;
							g && (n || f) ? (k && !l && d.selectRanges(h), d = !0) : d = !1
						}
						d = !d
					}
					d && (b.reset(), b = 0)
				}
				if (!b && (b = c || this.getSelection(1), !b || b.getType() == CKEDITOR.SELECTION_NONE)) return;
				this.fire("selectionCheck", b);
				c = this.elementPath();
				c.compare(this._.selectionPreviousPath) || (d = this._.selectionPreviousPath && this._.selectionPreviousPath.blockLimit.equals(c.blockLimit), !CKEDITOR.env.webkit && !CKEDITOR.env.gecko || d || (this._.previousActive = this.document.getActive()), this._.selectionPreviousPath = c, this.fire("selectionChange", {
					selection: b,
					path: c
				}))
			}

			function k() {
				C = !0;
				z || (f.call(this), z = CKEDITOR.tools.setTimeout(f, 200, this))
			}

			function f() {
				z = null;
				C && (CKEDITOR.tools.setTimeout(l, 0, this), C = !1)
			}

			function d(a) {
				return x(a) || a.type == CKEDITOR.NODE_ELEMENT && !a.is(CKEDITOR.dtd.$empty) ? !0 : !1
			}

			function m(a) {
				function b(c, d) {
					return c && c.type != CKEDITOR.NODE_TEXT ? a.clone()["moveToElementEdit" + (d ? "End" : "Start")](c) : !1
				}
				if (!(a.root instanceof CKEDITOR.editable)) return !1;
				var c = a.startContainer,
					h = a.getPreviousNode(d, null, c),
					f = a.getNextNode(d, null, c);
				return b(h) || b(f, 1) || !(h || f || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary() && c.getBogus()) ? !0 : !1
			}

			function h(a) {
				n(a, !1);
				var b = a.getDocument().createText(t);
				a.setCustomData("cke-fillingChar", b);
				return b
			}

			function n(a, b) {
				var c = a && a.removeCustomData("cke-fillingChar");
				if (c) {
					if (!1 !== b) {
						var d = a.getDocument().getSelection().getNative(),
							h = d && "None" != d.type && d.getRangeAt(0),
							f = t.length;
						if (c.getLength() > f && h && h.intersectsNode(c.$)) {
							var g = [{
								node: d.anchorNode,
								offset: d.anchorOffset
							}, {
								node: d.focusNode,
								offset: d.focusOffset
							}];
							d.anchorNode == c.$ && d.anchorOffset > f && (g[0].offset -= f);
							d.focusNode == c.$ && d.focusOffset > f && (g[1].offset -= f)
						}
					}
					c.setText(p(c.getText(), 1));
					g && (c = a.getDocument().$,
						d = c.getSelection(), c = c.createRange(), c.setStart(g[0].node, g[0].offset), c.collapse(!0), d.removeAllRanges(), d.addRange(c), d.extend(g[1].node, g[1].offset))
				}
			}

			function p(a, b) {
				return b ? a.replace(B, function (a, b) {
					return b ? " " : ""
				}) : a.replace(t, "")
			}

			function q(a, b) {
				var c = b && CKEDITOR.tools.htmlEncode(b) || "\x26nbsp;",
					c = CKEDITOR.dom.element.createFromHtml('\x3cdiv data-cke-hidden-sel\x3d"1" data-cke-temp\x3d"1" style\x3d"' + (CKEDITOR.env.ie && 14 > CKEDITOR.env.version ? "display:none" : "position:fixed;top:0;left:-1000px;width:0;height:0;overflow:hidden;") +
						'"\x3e' + c + "\x3c/div\x3e", a.document);
				a.fire("lockSnapshot");
				a.editable().append(c);
				var d = a.getSelection(1),
					h = a.createRange(),
					f = d.root.on("selectionchange", function (a) {
						a.cancel()
					}, null, null, 0);
				h.setStartAt(c, CKEDITOR.POSITION_AFTER_START);
				h.setEndAt(c, CKEDITOR.POSITION_BEFORE_END);
				d.selectRanges([h]);
				f.removeListener();
				a.fire("unlockSnapshot");
				a._.hiddenSelectionContainer = c
			}

			function y(a) {
				var b = {
					37: 1,
					39: 1,
					8: 1,
					46: 1
				};
				return function (c) {
					var d = c.data.getKeystroke();
					if (b[d]) {
						var h = a.getSelection().getRanges(),
							f = h[0];
						1 == h.length && f.collapsed && (d = f[38 > d ? "getPreviousEditableNode" : "getNextEditableNode"]()) && d.type == CKEDITOR.NODE_ELEMENT && "false" == d.getAttribute("contenteditable") && (a.getSelection().fake(d), c.data.preventDefault(), c.cancel())
					}
				}
			}

			function u(a) {
				for (var b = 0; b < a.length; b++) {
					var c = a[b];
					c.getCommonAncestor().isReadOnly() && a.splice(b, 1);
					if (!c.collapsed) {
						if (c.startContainer.isReadOnly())
							for (var d = c.startContainer, h; d && !((h = d.type == CKEDITOR.NODE_ELEMENT) && d.is("body") || !d.isReadOnly());) h && "false" ==
								d.getAttribute("contentEditable") && c.setStartAfter(d), d = d.getParent();
						d = c.startContainer;
						h = c.endContainer;
						var f = c.startOffset,
							g = c.endOffset,
							e = c.clone();
						d && d.type == CKEDITOR.NODE_TEXT && (f >= d.getLength() ? e.setStartAfter(d) : e.setStartBefore(d));
						h && h.type == CKEDITOR.NODE_TEXT && (g ? e.setEndAfter(h) : e.setEndBefore(h));
						d = new CKEDITOR.dom.walker(e);
						d.evaluator = function (d) {
							if (d.type == CKEDITOR.NODE_ELEMENT && d.isReadOnly()) {
								var h = c.clone();
								c.setEndBefore(d);
								c.collapsed && a.splice(b--, 1);
								d.getPosition(e.endContainer) &
									CKEDITOR.POSITION_CONTAINS || (h.setStartAfter(d), h.collapsed || a.splice(b + 1, 0, h));
								return !0
							}
							return !1
						};
						d.next()
					}
				}
				return a
			}
			var r = "function" != typeof window.getSelection,
				w = 1,
				t = CKEDITOR.tools.repeat("​", 7),
				B = new RegExp(t + "( )?", "g"),
				v, z, C, x = CKEDITOR.dom.walker.invisible(1),
				A = function () {
					function a(b) {
						return function (a) {
							var c = a.editor.createRange();
							c.moveToClosestEditablePosition(a.selected, b) && a.editor.getSelection().selectRanges([c]);
							return !1
						}
					}

					function b(a) {
						return function (b) {
							var c = b.editor,
								d = c.createRange(),
								h;
							if (!c.readOnly) return (h = d.moveToClosestEditablePosition(b.selected, a)) || (h = d.moveToClosestEditablePosition(b.selected, !a)), h && c.getSelection().selectRanges([d]), c.fire("saveSnapshot"), b.selected.remove(), h || (d.moveToElementEditablePosition(c.editable()), c.getSelection().selectRanges([d])), c.fire("saveSnapshot"), !1
						}
					}
					var c = a(),
						d = a(1);
					return {
						37: c,
						38: c,
						39: d,
						40: d,
						8: b(),
						46: b(1)
					}
				}();
			CKEDITOR.on("instanceCreated", function (a) {
				function b() {
					var a = c.getSelection();
					a && a.removeAllRanges()
				}
				var c = a.editor;
				c.on("contentDom",
					function () {
						function a() {
							w = new CKEDITOR.dom.selection(c.getSelection());
							w.lock()
						}

						function b() {
							f.removeListener("mouseup", b);
							m.removeListener("mouseup", b);
							var a = CKEDITOR.document.$.selection,
								c = a.createRange();
							"None" != a.type && c.parentElement() && c.parentElement().ownerDocument == h.$ && c.select()
						}

						function d(a) {
							a = a.getRanges()[0];
							return a ? (a = a.startContainer.getAscendant(function (a) {
									return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable")
								}, !0)) && "false" === a.getAttribute("contenteditable") ?
								a : null : null
						}
						var h = c.document,
							f = CKEDITOR.document,
							g = c.editable(),
							e = h.getBody(),
							m = h.getDocumentElement(),
							p = g.isInline(),
							t, w;
						CKEDITOR.env.gecko && g.attachListener(g, "focus", function (a) {
							a.removeListener();
							0 !== t && (a = c.getSelection().getNative()) && a.isCollapsed && a.anchorNode == g.$ && (a = c.createRange(), a.moveToElementEditStart(g), a.select())
						}, null, null, -2);
						g.attachListener(g, CKEDITOR.env.webkit || CKEDITOR.env.gecko ? "focusin" : "focus", function () {
							if (t && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) {
								t = c._.previousActive &&
									c._.previousActive.equals(h.getActive());
								var a = null != c._.previousScrollTop && c._.previousScrollTop != g.$.scrollTop;
								CKEDITOR.env.webkit && t && a && (g.$.scrollTop = c._.previousScrollTop)
							}
							c.unlockSelection(t);
							t = 0
						}, null, null, -1);
						g.attachListener(g, "mousedown", function () {
							t = 0
						});
						if (CKEDITOR.env.ie || p) r ? g.attachListener(g, "beforedeactivate", a, null, null, -1) : g.attachListener(c, "selectionCheck", a, null, null, -1), g.attachListener(g, CKEDITOR.env.webkit || CKEDITOR.env.gecko ? "focusout" : "blur", function () {
							c.lockSelection(w);
							t = 1
						}, null, null, -1), g.attachListener(g, "mousedown", function () {
							t = 0
						});
						if (CKEDITOR.env.ie && !p) {
							var v;
							g.attachListener(g, "mousedown", function (a) {
								2 == a.data.$.button && ((a = c.document.getSelection()) && a.getType() != CKEDITOR.SELECTION_NONE || (v = c.window.getScrollPosition()))
							});
							g.attachListener(g, "mouseup", function (a) {
								2 == a.data.$.button && v && (c.document.$.documentElement.scrollLeft = v.x, c.document.$.documentElement.scrollTop = v.y);
								v = null
							});
							if ("BackCompat" != h.$.compatMode) {
								if (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) {
									var q,
										B;
									m.on("mousedown", function (a) {
										function b(a) {
											a = a.data.$;
											if (q) {
												var c = e.$.createTextRange();
												try {
													c.moveToPoint(a.clientX, a.clientY)
												} catch (d) {}
												q.setEndPoint(0 > B.compareEndPoints("StartToStart", c) ? "EndToEnd" : "StartToStart", c);
												q.select()
											}
										}

										function c() {
											m.removeListener("mousemove", b);
											f.removeListener("mouseup", c);
											m.removeListener("mouseup", c);
											q.select()
										}
										a = a.data;
										if (a.getTarget().is("html") && a.$.y < m.$.clientHeight && a.$.x < m.$.clientWidth) {
											q = e.$.createTextRange();
											try {
												q.moveToPoint(a.$.clientX, a.$.clientY)
											} catch (d) {}
											B =
												q.duplicate();
											m.on("mousemove", b);
											f.on("mouseup", c);
											m.on("mouseup", c)
										}
									})
								}
								if (7 < CKEDITOR.env.version && 11 > CKEDITOR.env.version) m.on("mousedown", function (a) {
									a.data.getTarget().is("html") && (f.on("mouseup", b), m.on("mouseup", b))
								})
							}
						}
						g.attachListener(g, "selectionchange", l, c);
						g.attachListener(g, "keyup", k, c);
						g.attachListener(g, "touchstart", k, c);
						g.attachListener(g, "touchend", k, c);
						CKEDITOR.env.ie && g.attachListener(g, "keydown", function (a) {
								var b = this.getSelection(1),
									c = d(b);
								c && !c.equals(g) && (b.selectElement(c), a.data.preventDefault())
							},
							c);
						g.attachListener(g, CKEDITOR.env.webkit || CKEDITOR.env.gecko ? "focusin" : "focus", function () {
							c.forceNextSelectionCheck();
							c.selectionChange(1)
						});
						if (p && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) {
							var u;
							g.attachListener(g, "mousedown", function () {
								u = 1
							});
							g.attachListener(h.getDocumentElement(), "mouseup", function () {
								u && k.call(c);
								u = 0
							})
						} else g.attachListener(CKEDITOR.env.ie ? g : h.getDocumentElement(), "mouseup", k, c);
						CKEDITOR.env.webkit && g.attachListener(h, "keydown", function (a) {
							switch (a.data.getKey()) {
								case 13:
								case 33:
								case 34:
								case 35:
								case 36:
								case 37:
								case 39:
								case 8:
								case 45:
								case 46:
									g.hasFocus &&
										n(g)
							}
						}, null, null, -1);
						g.attachListener(g, "keydown", y(c), null, null, -1)
					});
				c.on("setData", function () {
					c.unlockSelection();
					CKEDITOR.env.webkit && b()
				});
				c.on("contentDomUnload", function () {
					c.unlockSelection()
				});
				if (CKEDITOR.env.ie9Compat) c.on("beforeDestroy", b, null, null, 9);
				c.on("dataReady", function () {
					delete c._.fakeSelection;
					delete c._.hiddenSelectionContainer;
					c.selectionChange(1)
				});
				c.on("loadSnapshot", function () {
					var a = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT),
						b = c.editable().getLast(a);
					b && b.hasAttribute("data-cke-hidden-sel") &&
						(b.remove(), CKEDITOR.env.gecko && (a = c.editable().getFirst(a)) && a.is("br") && a.getAttribute("_moz_editor_bogus_node") && a.remove())
				}, null, null, 100);
				c.on("key", function (a) {
					if ("wysiwyg" == c.mode) {
						var b = c.getSelection();
						if (b.isFake) {
							var d = A[a.data.keyCode];
							if (d) return d({
								editor: c,
								selected: b.getSelectedElement(),
								selection: b,
								keyEvent: a
							})
						}
					}
				})
			});
			if (CKEDITOR.env.webkit) CKEDITOR.on("instanceReady", function (a) {
				var b = a.editor;
				b.on("selectionChange", function () {
					var a = b.editable(),
						c = a.getCustomData("cke-fillingChar");
					c && (c.getCustomData("ready") ? (n(a), a.editor.fire("selectionCheck")) : c.setCustomData("ready", 1))
				}, null, null, -1);
				b.on("beforeSetMode", function () {
					n(b.editable())
				}, null, null, -1);
				b.on("getSnapshot", function (a) {
					a.data && (a.data = p(a.data))
				}, b, null, 20);
				b.on("toDataFormat", function (a) {
					a.data.dataValue = p(a.data.dataValue)
				}, null, null, 0)
			});
			CKEDITOR.editor.prototype.selectionChange = function (a) {
				(a ? l : k).call(this)
			};
			CKEDITOR.editor.prototype.getSelection = function (a) {
				return !this._.savedSelection && !this._.fakeSelection ||
					a ? (a = this.editable()) && "wysiwyg" == this.mode ? new CKEDITOR.dom.selection(a) : null : this._.savedSelection || this._.fakeSelection
			};
			CKEDITOR.editor.prototype.lockSelection = function (a) {
				a = a || this.getSelection(1);
				return a.getType() != CKEDITOR.SELECTION_NONE ? (!a.isLocked && a.lock(), this._.savedSelection = a, !0) : !1
			};
			CKEDITOR.editor.prototype.unlockSelection = function (a) {
				var b = this._.savedSelection;
				return b ? (b.unlock(a), delete this._.savedSelection, !0) : !1
			};
			CKEDITOR.editor.prototype.forceNextSelectionCheck = function () {
				delete this._.selectionPreviousPath
			};
			CKEDITOR.dom.document.prototype.getSelection = function () {
				return new CKEDITOR.dom.selection(this)
			};
			CKEDITOR.dom.range.prototype.select = function () {
				var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root);
				a.selectRanges([this]);
				return a
			};
			CKEDITOR.SELECTION_NONE = 1;
			CKEDITOR.SELECTION_TEXT = 2;
			CKEDITOR.SELECTION_ELEMENT = 3;
			CKEDITOR.dom.selection = function (a) {
				if (a instanceof CKEDITOR.dom.selection) {
					var b = a;
					a = a.root
				}
				var c = a instanceof CKEDITOR.dom.element;
				this.rev = b ? b.rev : w++;
				this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument();
				this.root = c ? a : this.document.getBody();
				this.isLocked = 0;
				this._ = {
					cache: {}
				};
				if (b) return CKEDITOR.tools.extend(this._.cache, b._.cache), this.isFake = b.isFake, this.isLocked = b.isLocked, this;
				a = this.getNative();
				var d, h;
				if (a)
					if (a.getRangeAt) d = (h = a.rangeCount && a.getRangeAt(0)) && new CKEDITOR.dom.node(h.commonAncestorContainer);
					else {
						try {
							h = a.createRange()
						} catch (f) {}
						d = h && CKEDITOR.dom.element.get(h.item && h.item(0) || h.parentElement())
					}
				if (!d ||
					d.type != CKEDITOR.NODE_ELEMENT && d.type != CKEDITOR.NODE_TEXT || !this.root.equals(d) && !this.root.contains(d)) this._.cache.type = CKEDITOR.SELECTION_NONE, this._.cache.startElement = null, this._.cache.selectedElement = null, this._.cache.selectedText = "", this._.cache.ranges = new CKEDITOR.dom.rangeList;
				return this
			};
			var G = {
				img: 1,
				hr: 1,
				li: 1,
				table: 1,
				tr: 1,
				td: 1,
				th: 1,
				embed: 1,
				object: 1,
				ol: 1,
				ul: 1,
				a: 1,
				input: 1,
				form: 1,
				select: 1,
				textarea: 1,
				button: 1,
				fieldset: 1,
				thead: 1,
				tfoot: 1
			};
			CKEDITOR.tools.extend(CKEDITOR.dom.selection, {
				_removeFillingCharSequenceString: p,
				_createFillingCharSequenceNode: h,
				FILLING_CHAR_SEQUENCE: t
			});
			CKEDITOR.dom.selection.prototype = {
				getNative: function () {
					return void 0 !== this._.cache.nativeSel ? this._.cache.nativeSel : this._.cache.nativeSel = r ? this.document.$.selection : this.document.getWindow().$.getSelection()
				},
				getType: r ? function () {
					var a = this._.cache;
					if (a.type) return a.type;
					var b = CKEDITOR.SELECTION_NONE;
					try {
						var c = this.getNative(),
							d = c.type;
						"Text" == d && (b = CKEDITOR.SELECTION_TEXT);
						"Control" == d && (b = CKEDITOR.SELECTION_ELEMENT);
						c.createRange().parentElement() &&
							(b = CKEDITOR.SELECTION_TEXT)
					} catch (h) {}
					return a.type = b
				} : function () {
					var a = this._.cache;
					if (a.type) return a.type;
					var b = CKEDITOR.SELECTION_TEXT,
						c = this.getNative();
					if (!c || !c.rangeCount) b = CKEDITOR.SELECTION_NONE;
					else if (1 == c.rangeCount) {
						var c = c.getRangeAt(0),
							d = c.startContainer;
						d == c.endContainer && 1 == d.nodeType && 1 == c.endOffset - c.startOffset && G[d.childNodes[c.startOffset].nodeName.toLowerCase()] && (b = CKEDITOR.SELECTION_ELEMENT)
					}
					return a.type = b
				},
				getRanges: function () {
					var a = r ? function () {
						function a(b) {
							return (new CKEDITOR.dom.node(b)).getIndex()
						}
						var b = function (b, c) {
							b = b.duplicate();
							b.collapse(c);
							var d = b.parentElement();
							if (!d.hasChildNodes()) return {
								container: d,
								offset: 0
							};
							for (var h = d.children, f, g, e = b.duplicate(), m = 0, k = h.length - 1, l = -1, n, p; m <= k;)
								if (l = Math.floor((m + k) / 2), f = h[l], e.moveToElementText(f), n = e.compareEndPoints("StartToStart", b), 0 < n) k = l - 1;
								else if (0 > n) m = l + 1;
							else return {
								container: d,
								offset: a(f)
							};
							if (-1 == l || l == h.length - 1 && 0 > n) {
								e.moveToElementText(d);
								e.setEndPoint("StartToStart", b);
								e = e.text.replace(/(\r\n|\r)/g, "\n").length;
								h = d.childNodes;
								if (!e) return f =
									h[h.length - 1], f.nodeType != CKEDITOR.NODE_TEXT ? {
										container: d,
										offset: h.length
									} : {
										container: f,
										offset: f.nodeValue.length
									};
								for (d = h.length; 0 < e && 0 < d;) g = h[--d], g.nodeType == CKEDITOR.NODE_TEXT && (p = g, e -= g.nodeValue.length);
								return {
									container: p,
									offset: -e
								}
							}
							e.collapse(0 < n ? !0 : !1);
							e.setEndPoint(0 < n ? "StartToStart" : "EndToStart", b);
							e = e.text.replace(/(\r\n|\r)/g, "\n").length;
							if (!e) return {
								container: d,
								offset: a(f) + (0 < n ? 0 : 1)
							};
							for (; 0 < e;) try {
								g = f[0 < n ? "previousSibling" : "nextSibling"], g.nodeType == CKEDITOR.NODE_TEXT && (e -= g.nodeValue.length,
									p = g), f = g
							} catch (t) {
								return {
									container: d,
									offset: a(f)
								}
							}
							return {
								container: p,
								offset: 0 < n ? -e : p.nodeValue.length + e
							}
						};
						return function () {
							var a = this.getNative(),
								c = a && a.createRange(),
								d = this.getType();
							if (!a) return [];
							if (d == CKEDITOR.SELECTION_TEXT) return a = new CKEDITOR.dom.range(this.root), d = b(c, !0), a.setStart(new CKEDITOR.dom.node(d.container), d.offset), d = b(c), a.setEnd(new CKEDITOR.dom.node(d.container), d.offset), a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() &&
								a.collapse(), [a];
							if (d == CKEDITOR.SELECTION_ELEMENT) {
								for (var d = [], h = 0; h < c.length; h++) {
									for (var f = c.item(h), g = f.parentNode, e = 0, a = new CKEDITOR.dom.range(this.root); e < g.childNodes.length && g.childNodes[e] != f; e++);
									a.setStart(new CKEDITOR.dom.node(g), e);
									a.setEnd(new CKEDITOR.dom.node(g), e + 1);
									d.push(a)
								}
								return d
							}
							return []
						}
					}() : function () {
						var a = [],
							b, c = this.getNative();
						if (!c) return a;
						for (var d = 0; d < c.rangeCount; d++) {
							var h = c.getRangeAt(d);
							b = new CKEDITOR.dom.range(this.root);
							b.setStart(new CKEDITOR.dom.node(h.startContainer),
								h.startOffset);
							b.setEnd(new CKEDITOR.dom.node(h.endContainer), h.endOffset);
							a.push(b)
						}
						return a
					};
					return function (b) {
						var c = this._.cache,
							d = c.ranges;
						d || (c.ranges = d = new CKEDITOR.dom.rangeList(a.call(this)));
						return b ? u(new CKEDITOR.dom.rangeList(d.slice())) : d
					}
				}(),
				getStartElement: function () {
					var a = this._.cache;
					if (void 0 !== a.startElement) return a.startElement;
					var b;
					switch (this.getType()) {
						case CKEDITOR.SELECTION_ELEMENT:
							return this.getSelectedElement();
						case CKEDITOR.SELECTION_TEXT:
							var c = this.getRanges()[0];
							if (c) {
								if (c.collapsed) b = c.startContainer, b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent());
								else {
									for (c.optimize(); b = c.startContainer, c.startOffset == (b.getChildCount ? b.getChildCount() : b.getLength()) && !b.isBlockBoundary();) c.setStartAfter(b);
									b = c.startContainer;
									if (b.type != CKEDITOR.NODE_ELEMENT) return b.getParent();
									if ((b = b.getChild(c.startOffset)) && b.type == CKEDITOR.NODE_ELEMENT)
										for (c = b.getFirst(); c && c.type == CKEDITOR.NODE_ELEMENT;) b = c, c = c.getFirst();
									else b = c.startContainer
								}
								b = b.$
							}
					}
					return a.startElement = b ?
						new CKEDITOR.dom.element(b) : null
				},
				getSelectedElement: function () {
					var a = this._.cache;
					if (void 0 !== a.selectedElement) return a.selectedElement;
					var b = this,
						c = CKEDITOR.tools.tryThese(function () {
							return b.getNative().createRange().item(0)
						}, function () {
							for (var a = b.getRanges()[0].clone(), c, d, h = 2; h && !((c = a.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT && G[c.getName()] && (d = c)); h--) a.shrink(CKEDITOR.SHRINK_ELEMENT);
							return d && d.$
						});
					return a.selectedElement = c ? new CKEDITOR.dom.element(c) : null
				},
				getSelectedText: function () {
					var a =
						this._.cache;
					if (void 0 !== a.selectedText) return a.selectedText;
					var b = this.getNative(),
						b = r ? "Control" == b.type ? "" : b.createRange().text : b.toString();
					return a.selectedText = b
				},
				lock: function () {
					this.getRanges();
					this.getStartElement();
					this.getSelectedElement();
					this.getSelectedText();
					this._.cache.nativeSel = null;
					this.isLocked = 1
				},
				unlock: function (a) {
					if (this.isLocked) {
						if (a) var b = this.getSelectedElement(),
							c = this.getRanges(),
							d = this.isFake;
						this.isLocked = 0;
						this.reset();
						a && (a = b || c[0] && c[0].getCommonAncestor()) && a.getAscendant("body",
							1) && (e(c) ? g.call(this, c) : d ? this.fake(b) : b ? this.selectElement(b) : this.selectRanges(c))
					}
				},
				reset: function () {
					this._.cache = {};
					this.isFake = 0;
					var a = this.root.editor;
					if (a && a._.fakeSelection)
						if (this.rev == a._.fakeSelection.rev) {
							delete a._.fakeSelection;
							var b = a._.hiddenSelectionContainer;
							if (b) {
								var c = a.checkDirty();
								a.fire("lockSnapshot");
								b.remove();
								a.fire("unlockSnapshot");
								!c && a.resetDirty()
							}
							delete a._.hiddenSelectionContainer
						} else CKEDITOR.warn("selection-fake-reset");
					this.rev = w++
				},
				selectElement: function (a) {
					var b =
						new CKEDITOR.dom.range(this.root);
					b.setStartBefore(a);
					b.setEndAfter(a);
					this.selectRanges([b])
				},
				selectRanges: function (a) {
					var b = this.root.editor,
						c = b && b._.hiddenSelectionContainer;
					this.reset();
					if (c)
						for (var c = this.root, d, f = 0; f < a.length; ++f) d = a[f], d.endContainer.equals(c) && (d.endOffset = Math.min(d.endOffset, c.getChildCount()));
					if (a.length)
						if (this.isLocked) {
							var k = CKEDITOR.document.getActive();
							this.unlock();
							this.selectRanges(a);
							this.lock();
							k && !k.equals(this.root) && k.focus()
						} else {
							var l;
							a: {
								var p, t;
								if (1 == a.length &&
									!(t = a[0]).collapsed && (l = t.getEnclosedNode()) && l.type == CKEDITOR.NODE_ELEMENT && (t = t.clone(), t.shrink(CKEDITOR.SHRINK_ELEMENT, !0), (p = t.getEnclosedNode()) && p.type == CKEDITOR.NODE_ELEMENT && (l = p), "false" == l.getAttribute("contenteditable"))) break a;l = void 0
							}
							if (l) this.fake(l);
							else if (b && b.plugins.tableselection && CKEDITOR.plugins.tableselection.isSupportedEnvironment && e(a) && !v) g.call(this, a);
							else {
								if (r) {
									p = CKEDITOR.dom.walker.whitespaces(!0);
									l = /\ufeff|\u00a0/;
									t = {
										table: 1,
										tbody: 1,
										tr: 1
									};
									1 < a.length && (b = a[a.length -
										1], a[0].setEnd(b.endContainer, b.endOffset));
									b = a[0];
									a = b.collapsed;
									var y, w, q;
									if ((c = b.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT && c.getName() in G && (!c.is("a") || !c.getText())) try {
										q = c.$.createControlRange();
										q.addElement(c.$);
										q.select();
										return
									} catch (B) {}
									if (b.startContainer.type == CKEDITOR.NODE_ELEMENT && b.startContainer.getName() in t || b.endContainer.type == CKEDITOR.NODE_ELEMENT && b.endContainer.getName() in t) b.shrink(CKEDITOR.NODE_ELEMENT, !0), a = b.collapsed;
									q = b.createBookmark();
									t = q.startNode;
									a || (k = q.endNode);
									q = b.document.$.body.createTextRange();
									q.moveToElementText(t.$);
									q.moveStart("character", 1);
									k ? (l = b.document.$.body.createTextRange(), l.moveToElementText(k.$), q.setEndPoint("EndToEnd", l), q.moveEnd("character", -1)) : (y = t.getNext(p), w = t.hasAscendant("pre"), y = !(y && y.getText && y.getText().match(l)) && (w || !t.hasPrevious() || t.getPrevious().is && t.getPrevious().is("br")), w = b.document.createElement("span"), w.setHtml("\x26#65279;"), w.insertBefore(t), y && b.document.createText("﻿").insertBefore(t));
									b.setStartBefore(t);
									t.remove();
									a ? (y ? (q.moveStart("character", -1), q.select(), b.document.$.selection.clear()) : q.select(), b.moveToPosition(w, CKEDITOR.POSITION_BEFORE_START), w.remove()) : (b.setEndBefore(k), k.remove(), q.select())
								} else {
									k = this.getNative();
									if (!k) return;
									this.removeAllRanges();
									for (q = 0; q < a.length; q++) {
										if (q < a.length - 1 && (y = a[q], w = a[q + 1], l = y.clone(), l.setStart(y.endContainer, y.endOffset), l.setEnd(w.startContainer, w.startOffset), !l.collapsed && (l.shrink(CKEDITOR.NODE_ELEMENT, !0), b = l.getCommonAncestor(), l = l.getEnclosedNode(),
												b.isReadOnly() || l && l.isReadOnly()))) {
											w.setStart(y.startContainer, y.startOffset);
											a.splice(q--, 1);
											continue
										}
										b = a[q];
										w = this.document.$.createRange();
										b.collapsed && CKEDITOR.env.webkit && m(b) && (l = h(this.root), b.insertNode(l), (y = l.getNext()) && !l.getPrevious() && y.type == CKEDITOR.NODE_ELEMENT && "br" == y.getName() ? (n(this.root), b.moveToPosition(y, CKEDITOR.POSITION_BEFORE_START)) : b.moveToPosition(l, CKEDITOR.POSITION_AFTER_END));
										w.setStart(b.startContainer.$, b.startOffset);
										try {
											w.setEnd(b.endContainer.$, b.endOffset)
										} catch (u) {
											if (0 <=
												u.toString().indexOf("NS_ERROR_ILLEGAL_VALUE")) b.collapse(1), w.setEnd(b.endContainer.$, b.endOffset);
											else throw u;
										}
										k.addRange(w)
									}
								}
								this.reset();
								this.root.fire("selectionchange")
							}
						}
				},
				fake: function (a, b) {
					var c = this.root.editor;
					void 0 === b && a.hasAttribute("aria-label") && (b = a.getAttribute("aria-label"));
					this.reset();
					q(c, b);
					var d = this._.cache,
						h = new CKEDITOR.dom.range(this.root);
					h.setStartBefore(a);
					h.setEndAfter(a);
					d.ranges = new CKEDITOR.dom.rangeList(h);
					d.selectedElement = d.startElement = a;
					d.type = CKEDITOR.SELECTION_ELEMENT;
					d.selectedText = d.nativeSel = null;
					this.isFake = 1;
					this.rev = w++;
					c._.fakeSelection = this;
					this.root.fire("selectionchange")
				},
				isHidden: function () {
					var a = this.getCommonAncestor();
					a && a.type == CKEDITOR.NODE_TEXT && (a = a.getParent());
					return !(!a || !a.data("cke-hidden-sel"))
				},
				isInTable: function (a) {
					return e(this.getRanges(), a)
				},
				isCollapsed: function () {
					var a = this.getRanges();
					return 1 === a.length && a[0].collapsed
				},
				createBookmarks: function (a) {
					a = this.getRanges().createBookmarks(a);
					this.isFake && (a.isFake = 1);
					return a
				},
				createBookmarks2: function (a) {
					a =
						this.getRanges().createBookmarks2(a);
					this.isFake && (a.isFake = 1);
					return a
				},
				selectBookmarks: function (a) {
					for (var b = [], c, d = 0; d < a.length; d++) {
						var h = new CKEDITOR.dom.range(this.root);
						h.moveToBookmark(a[d]);
						b.push(h)
					}
					a.isFake && (c = e(b) ? b[0]._getTableElement() : b[0].getEnclosedNode(), c && c.type == CKEDITOR.NODE_ELEMENT || (CKEDITOR.warn("selection-not-fake"), a.isFake = 0));
					a.isFake && !e(b) ? this.fake(c) : this.selectRanges(b);
					return this
				},
				getCommonAncestor: function () {
					var a = this.getRanges();
					return a.length ? a[0].startContainer.getCommonAncestor(a[a.length -
						1].endContainer) : null
				},
				scrollIntoView: function () {
					this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView()
				},
				removeAllRanges: function () {
					if (this.getType() != CKEDITOR.SELECTION_NONE) {
						var a = this.getNative();
						try {
							a && a[r ? "empty" : "removeAllRanges"]()
						} catch (b) {}
						this.reset()
					}
				}
			}
		}(), "use strict", CKEDITOR.STYLE_BLOCK = 1, CKEDITOR.STYLE_INLINE = 2, CKEDITOR.STYLE_OBJECT = 3,
		function () {
			function a(a, b) {
				for (var c, d;
					(a = a.getParent()) && !a.equals(b);)
					if (a.getAttribute("data-nostyle")) c = a;
					else if (!d) {
					var h = a.getAttribute("contentEditable");
					"false" == h ? c = a : "true" == h && (d = 1)
				}
				return c
			}

			function e(a, b, c, d) {
				return (a.getPosition(b) | d) == d && (!c.childRule || c.childRule(a))
			}

			function b(c) {
				var d = c.document;
				if (c.collapsed) d = w(this, d), c.insertNode(d), c.moveToPosition(d, CKEDITOR.POSITION_BEFORE_END);
				else {
					var h = this.element,
						f = this._.definition,
						m, k = f.ignoreReadonly,
						l = k || f.includeReadonly;
					null == l && (l = c.root.getCustomData("cke_includeReadonly"));
					var n = CKEDITOR.dtd[h];
					n || (m = !0, n = CKEDITOR.dtd.span);
					c.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
					c.trim();
					var p = c.createBookmark(),
						t = p.startNode,
						r = p.endNode,
						q = t,
						v;
					if (!k) {
						var B = c.getCommonAncestor(),
							k = a(t, B),
							B = a(r, B);
						k && (q = k.getNextSourceNode(!0));
						B && (r = B)
					}
					for (q.getPosition(r) == CKEDITOR.POSITION_FOLLOWING && (q = 0); q;) {
						k = !1;
						if (q.equals(r)) q = null, k = !0;
						else {
							var u = q.type == CKEDITOR.NODE_ELEMENT ? q.getName() : null,
								B = u && "false" == q.getAttribute("contentEditable"),
								x = u && q.getAttribute("data-nostyle");
							if (u && q.data("cke-bookmark") || q.type === CKEDITOR.NODE_COMMENT) {
								q = q.getNextSourceNode(!0);
								continue
							}
							if (B && l && CKEDITOR.dtd.$block[u])
								for (var z = q,
										A = g(z), C = void 0, G = A.length, ea = 0, z = G && new CKEDITOR.dom.range(z.getDocument()); ea < G; ++ea) {
									var C = A[ea],
										E = CKEDITOR.filter.instances[C.data("cke-filter")];
									if (E ? E.check(this) : 1) z.selectNodeContents(C), b.call(this, z)
								}
							A = u ? !n[u] || x ? 0 : B && !l ? 0 : e(q, r, f, J) : 1;
							if (A)
								if (C = q.getParent(), A = f, G = h, ea = m, !C || !(C.getDtd() || CKEDITOR.dtd.span)[G] && !ea || A.parentRule && !A.parentRule(C)) k = !0;
								else {
									if (v || u && CKEDITOR.dtd.$removeEmpty[u] && (q.getPosition(r) | J) != J || (v = c.clone(), v.setStartBefore(q)), u = q.type, u == CKEDITOR.NODE_TEXT || B ||
										u == CKEDITOR.NODE_ELEMENT && !q.getChildCount()) {
										for (var u = q, H;
											(k = !u.getNext(I)) && (H = u.getParent(), n[H.getName()]) && e(H, t, f, L);) u = H;
										v.setEndAfter(u)
									}
								}
							else k = !0;
							q = q.getNextSourceNode(x || B)
						}
						if (k && v && !v.collapsed) {
							for (var k = w(this, d), B = k.hasAttributes(), x = v.getCommonAncestor(), u = {}, A = {}, C = {}, G = {}, fa, D, ha; k && x;) {
								if (x.getName() == h) {
									for (fa in f.attributes) !G[fa] && (ha = x.getAttribute(D)) && (k.getAttribute(fa) == ha ? A[fa] = 1 : G[fa] = 1);
									for (D in f.styles) !C[D] && (ha = x.getStyle(D)) && (k.getStyle(D) == ha ? u[D] = 1 : C[D] = 1)
								}
								x =
									x.getParent()
							}
							for (fa in A) k.removeAttribute(fa);
							for (D in u) k.removeStyle(D);
							B && !k.hasAttributes() && (k = null);
							k ? (v.extractContents().appendTo(k), v.insertNode(k), y.call(this, k), k.mergeSiblings(), CKEDITOR.env.ie || k.$.normalize()) : (k = new CKEDITOR.dom.element("span"), v.extractContents().appendTo(k), v.insertNode(k), y.call(this, k), k.remove(!0));
							v = null
						}
					}
					c.moveToBookmark(p);
					c.shrink(CKEDITOR.SHRINK_TEXT);
					c.shrink(CKEDITOR.NODE_ELEMENT, !0)
				}
			}

			function c(a) {
				function b() {
					for (var a = new CKEDITOR.dom.elementPath(d.getParent()),
							c = new CKEDITOR.dom.elementPath(l.getParent()), h = null, f = null, g = 0; g < a.elements.length; g++) {
						var e = a.elements[g];
						if (e == a.block || e == a.blockLimit) break;
						n.checkElementRemovable(e, !0) && (h = e)
					}
					for (g = 0; g < c.elements.length; g++) {
						e = c.elements[g];
						if (e == c.block || e == c.blockLimit) break;
						n.checkElementRemovable(e, !0) && (f = e)
					}
					f && l.breakParent(f);
					h && d.breakParent(h)
				}
				a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
				var c = a.createBookmark(),
					d = c.startNode,
					h = this._.definition.alwaysRemoveElement;
				if (a.collapsed) {
					for (var f = new CKEDITOR.dom.elementPath(d.getParent(),
							a.root), g, e = 0, m; e < f.elements.length && (m = f.elements[e]) && m != f.block && m != f.blockLimit; e++)
						if (this.checkElementRemovable(m)) {
							var k;
							!h && a.collapsed && (a.checkBoundaryOfElement(m, CKEDITOR.END) || (k = a.checkBoundaryOfElement(m, CKEDITOR.START))) ? (g = m, g.match = k ? "start" : "end") : (m.mergeSiblings(), m.is(this.element) ? q.call(this, m) : u(m, v(this)[m.getName()]))
						}
					if (g) {
						h = d;
						for (e = 0;; e++) {
							m = f.elements[e];
							if (m.equals(g)) break;
							else if (m.match) continue;
							else m = m.clone();
							m.append(h);
							h = m
						}
						h["start" == g.match ? "insertBefore" : "insertAfter"](g)
					}
				} else {
					var l =
						c.endNode,
						n = this;
					b();
					for (f = d; !f.equals(l);) g = f.getNextSourceNode(), f.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(f) && (f.getName() == this.element ? q.call(this, f) : u(f, v(this)[f.getName()]), g.type == CKEDITOR.NODE_ELEMENT && g.contains(d) && (b(), g = d.getNext())), f = g
				}
				a.moveToBookmark(c);
				a.shrink(CKEDITOR.NODE_ELEMENT, !0)
			}

			function g(a) {
				var b = [];
				a.forEach(function (a) {
					if ("true" == a.getAttribute("contenteditable")) return b.push(a), !1
				}, CKEDITOR.NODE_ELEMENT, !0);
				return b
			}

			function l(a) {
				var b = a.getEnclosedNode() ||
					a.getCommonAncestor(!1, !0);
				(a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) && !a.isReadOnly() && t(a, this)
			}

			function k(a) {
				var b = a.getCommonAncestor(!0, !0);
				if (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) {
					var b = this._.definition,
						c = b.attributes;
					if (c)
						for (var d in c) a.removeAttribute(d, c[d]);
					if (b.styles)
						for (var h in b.styles) b.styles.hasOwnProperty(h) && a.removeStyle(h)
				}
			}

			function f(a) {
				var b = a.createBookmark(!0),
					c = a.createIterator();
				c.enforceRealBlocks = !0;
				this._.enterMode &&
					(c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR);
				for (var d, h = a.document, f; d = c.getNextParagraph();) !d.isReadOnly() && (c.activeFilter ? c.activeFilter.check(this) : 1) && (f = w(this, h, d), m(d, f));
				a.moveToBookmark(b)
			}

			function d(a) {
				var b = a.createBookmark(1),
					c = a.createIterator();
				c.enforceRealBlocks = !0;
				c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
				for (var d, h; d = c.getNextParagraph();) this.checkElementRemovable(d) && (d.is("pre") ? ((h = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode ==
					CKEDITOR.ENTER_P ? "p" : "div")) && d.copyAttributes(h), m(d, h)) : q.call(this, d));
				a.moveToBookmark(b)
			}

			function m(a, b) {
				var c = !b;
				c && (b = a.getDocument().createElement("div"), a.copyAttributes(b));
				var d = b && b.is("pre"),
					f = a.is("pre"),
					g = !d && f;
				if (d && !f) {
					f = b;
					(g = a.getBogus()) && g.remove();
					g = a.getHtml();
					g = n(g, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, "");
					g = g.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1");
					g = g.replace(/([ \t\n\r]+|&nbsp;)/g, " ");
					g = g.replace(/<br\b[^>]*>/gi, "\n");
					if (CKEDITOR.env.ie) {
						var e = a.getDocument().createElement("div");
						e.append(f);
						f.$.outerHTML = "\x3cpre\x3e" + g + "\x3c/pre\x3e";
						f.copyAttributes(e.getFirst());
						f = e.getFirst().remove()
					} else f.setHtml(g);
					b = f
				} else g ? b = p(c ? [a.getHtml()] : h(a), b) : a.moveChildren(b);
				b.replace(a);
				if (d) {
					var c = b,
						m;
					(m = c.getPrevious(H)) && m.type == CKEDITOR.NODE_ELEMENT && m.is("pre") && (d = n(m.getHtml(), /\n$/, "") + "\n\n" + n(c.getHtml(), /^\n/, ""), CKEDITOR.env.ie ? c.$.outerHTML = "\x3cpre\x3e" + d + "\x3c/pre\x3e" : c.setHtml(d), m.remove())
				} else c && r(b)
			}

			function h(a) {
				var b = [];
				n(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi,
					function (a, b, c) {
						return b + "\x3c/pre\x3e" + c + "\x3cpre\x3e"
					}).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function (a, c) {
					b.push(c)
				});
				return b
			}

			function n(a, b, c) {
				var d = "",
					h = "";
				a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function (a, b, c) {
					b && (d = b);
					c && (h = c);
					return ""
				});
				return d + a.replace(b, c) + h
			}

			function p(a, b) {
				var c;
				1 < a.length && (c = new CKEDITOR.dom.documentFragment(b.getDocument()));
				for (var d = 0; d < a.length; d++) {
					var h = a[d],
						h = h.replace(/(\r\n|\r)/g, "\n"),
						h = n(h, /^[ \t]*\n/,
							""),
						h = n(h, /\n$/, ""),
						h = n(h, /^[ \t]+|[ \t]+$/g, function (a, b) {
							return 1 == a.length ? "\x26nbsp;" : b ? " " + CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) : CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " "
						}),
						h = h.replace(/\n/g, "\x3cbr\x3e"),
						h = h.replace(/[ \t]{2,}/g, function (a) {
							return CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " "
						});
					if (c) {
						var f = b.clone();
						f.setHtml(h);
						c.append(f)
					} else b.setHtml(h)
				}
				return c || b
			}

			function q(a, b) {
				var c = this._.definition,
					d = c.attributes,
					c = c.styles,
					h = v(this)[a.getName()],
					f = CKEDITOR.tools.isEmpty(d) &&
					CKEDITOR.tools.isEmpty(c),
					g;
				for (g in d)
					if ("class" != g && !this._.definition.fullMatch || a.getAttribute(g) == z(g, d[g])) b && "data-" == g.slice(0, 5) || (f = a.hasAttribute(g), a.removeAttribute(g));
				for (var e in c) this._.definition.fullMatch && a.getStyle(e) != z(e, c[e], !0) || (f = f || !!a.getStyle(e), a.removeStyle(e));
				u(a, h, A[a.getName()]);
				f && (this._.definition.alwaysRemoveElement ? r(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? r(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ?
					"p" : "div"))
			}

			function y(a) {
				for (var b = v(this), c = a.getElementsByTag(this.element), d, h = c.count(); 0 <= --h;) d = c.getItem(h), d.isReadOnly() || q.call(this, d, !0);
				for (var f in b)
					if (f != this.element)
						for (c = a.getElementsByTag(f), h = c.count() - 1; 0 <= h; h--) d = c.getItem(h), d.isReadOnly() || u(d, b[f])
			}

			function u(a, b, c) {
				if (b = b && b.attributes)
					for (var d = 0; d < b.length; d++) {
						var h = b[d][0],
							f;
						if (f = a.getAttribute(h)) {
							var g = b[d][1];
							(null === g || g.test && g.test(f) || "string" == typeof g && f == g) && a.removeAttribute(h)
						}
					}
				c || r(a)
			}

			function r(a, b) {
				if (!a.hasAttributes() ||
					b)
					if (CKEDITOR.dtd.$block[a.getName()]) {
						var c = a.getPrevious(H),
							d = a.getNext(H);
						!c || c.type != CKEDITOR.NODE_TEXT && c.isBlockBoundary({
							br: 1
						}) || a.append("br", 1);
						!d || d.type != CKEDITOR.NODE_TEXT && d.isBlockBoundary({
							br: 1
						}) || a.append("br");
						a.remove(!0)
					} else c = a.getFirst(), d = a.getLast(), a.remove(!0), c && (c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings(), d && !c.equals(d) && d.type == CKEDITOR.NODE_ELEMENT && d.mergeSiblings())
			}

			function w(a, b, c) {
				var d;
				d = a.element;
				"*" == d && (d = "span");
				d = new CKEDITOR.dom.element(d, b);
				c && c.copyAttributes(d);
				d = t(d, a);
				b.getCustomData("doc_processing_style") && d.hasAttribute("id") ? d.removeAttribute("id") : b.setCustomData("doc_processing_style", 1);
				return d
			}

			function t(a, b) {
				var c = b._.definition,
					d = c.attributes,
					c = CKEDITOR.style.getStyleText(c);
				if (d)
					for (var h in d) a.setAttribute(h, d[h]);
				c && a.setAttribute("style", c);
				a.getDocument().removeCustomData("doc_processing_style");
				return a
			}

			function B(a, b) {
				for (var c in a) a[c] = a[c].replace(D, function (a, c) {
					return b[c]
				})
			}

			function v(a) {
				if (a._.overrides) return a._.overrides;
				var b =
					a._.overrides = {},
					c = a._.definition.overrides;
				if (c) {
					CKEDITOR.tools.isArray(c) || (c = [c]);
					for (var d = 0; d < c.length; d++) {
						var h = c[d],
							f, g;
						"string" == typeof h ? f = h.toLowerCase() : (f = h.element ? h.element.toLowerCase() : a.element, g = h.attributes);
						h = b[f] || (b[f] = {});
						if (g) {
							var h = h.attributes = h.attributes || [],
								e;
							for (e in g) h.push([e.toLowerCase(), g[e]])
						}
					}
				}
				return b
			}

			function z(a, b, c) {
				var d = new CKEDITOR.dom.element("span");
				d[c ? "setStyle" : "setAttribute"](a, b);
				return d[c ? "getStyle" : "getAttribute"](a)
			}

			function C(a, b) {
				function c(a,
					b) {
					return "font-family" == b.toLowerCase() ? a.replace(/["']/g, "") : a
				}
				"string" == typeof a && (a = CKEDITOR.tools.parseCssText(a));
				"string" == typeof b && (b = CKEDITOR.tools.parseCssText(b, !0));
				for (var d in a)
					if (!(d in b) || c(b[d], d) != c(a[d], d) && "inherit" != a[d] && "inherit" != b[d]) return !1;
				return !0
			}

			function x(a, b, c) {
				var d = a.getRanges();
				b = b ? this.removeFromRange : this.applyToRange;
				var h, f;
				if (a.isFake && a.isInTable())
					for (h = [], f = 0; f < d.length; f++) h.push(d[f].clone());
				for (var g = d.createIterator(); f = g.getNextRange();) b.call(this,
					f, c);
				a.selectRanges(h || d)
			}
			var A = {
					address: 1,
					div: 1,
					h1: 1,
					h2: 1,
					h3: 1,
					h4: 1,
					h5: 1,
					h6: 1,
					p: 1,
					pre: 1,
					section: 1,
					header: 1,
					footer: 1,
					nav: 1,
					article: 1,
					aside: 1,
					figure: 1,
					dialog: 1,
					hgroup: 1,
					time: 1,
					meter: 1,
					menu: 1,
					command: 1,
					keygen: 1,
					output: 1,
					progress: 1,
					details: 1,
					datagrid: 1,
					datalist: 1
				},
				G = {
					a: 1,
					blockquote: 1,
					embed: 1,
					hr: 1,
					img: 1,
					li: 1,
					object: 1,
					ol: 1,
					table: 1,
					td: 1,
					tr: 1,
					th: 1,
					ul: 1,
					dl: 1,
					dt: 1,
					dd: 1,
					form: 1,
					audio: 1,
					video: 1
				},
				E = /\s*(?:;\s*|$)/,
				D = /#\((.+?)\)/g,
				I = CKEDITOR.dom.walker.bookmark(0, 1),
				H = CKEDITOR.dom.walker.whitespaces(1);
			CKEDITOR.style =
				function (a, b) {
					if ("string" == typeof a.type) return new CKEDITOR.style.customHandlers[a.type](a);
					var c = a.attributes;
					c && c.style && (a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style)), delete c.style);
					b && (a = CKEDITOR.tools.clone(a), B(a.attributes, b), B(a.styles, b));
					c = this.element = a.element ? "string" == typeof a.element ? a.element.toLowerCase() : a.element : "*";
					this.type = a.type || (A[c] ? CKEDITOR.STYLE_BLOCK : G[c] ? CKEDITOR.STYLE_OBJECT : CKEDITOR.STYLE_INLINE);
					"object" == typeof this.element &&
						(this.type = CKEDITOR.STYLE_OBJECT);
					this._ = {
						definition: a
					}
				};
			CKEDITOR.style.prototype = {
				apply: function (a) {
					if (a instanceof CKEDITOR.dom.document) return x.call(this, a.getSelection());
					if (this.checkApplicable(a.elementPath(), a)) {
						var b = this._.enterMode;
						b || (this._.enterMode = a.activeEnterMode);
						x.call(this, a.getSelection(), 0, a);
						this._.enterMode = b
					}
				},
				remove: function (a) {
					if (a instanceof CKEDITOR.dom.document) return x.call(this, a.getSelection(), 1);
					if (this.checkApplicable(a.elementPath(), a)) {
						var b = this._.enterMode;
						b || (this._.enterMode = a.activeEnterMode);
						x.call(this, a.getSelection(), 1, a);
						this._.enterMode = b
					}
				},
				applyToRange: function (a) {
					this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? b : this.type == CKEDITOR.STYLE_BLOCK ? f : this.type == CKEDITOR.STYLE_OBJECT ? l : null;
					return this.applyToRange(a)
				},
				removeFromRange: function (a) {
					this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? c : this.type == CKEDITOR.STYLE_BLOCK ? d : this.type == CKEDITOR.STYLE_OBJECT ? k : null;
					return this.removeFromRange(a)
				},
				applyToObject: function (a) {
					t(a, this)
				},
				checkActive: function (a, b) {
					switch (this.type) {
						case CKEDITOR.STYLE_BLOCK:
							return this.checkElementRemovable(a.block || a.blockLimit, !0, b);
						case CKEDITOR.STYLE_OBJECT:
						case CKEDITOR.STYLE_INLINE:
							for (var c = a.elements, d = 0, h; d < c.length; d++)
								if (h = c[d], this.type != CKEDITOR.STYLE_INLINE || h != a.block && h != a.blockLimit) {
									if (this.type == CKEDITOR.STYLE_OBJECT) {
										var f = h.getName();
										if (!("string" == typeof this.element ? f == this.element : f in this.element)) continue
									}
									if (this.checkElementRemovable(h, !0, b)) return !0
								}
					}
					return !1
				},
				checkApplicable: function (a,
					b, c) {
					b && b instanceof CKEDITOR.filter && (c = b);
					if (c && !c.check(this)) return !1;
					switch (this.type) {
						case CKEDITOR.STYLE_OBJECT:
							return !!a.contains(this.element);
						case CKEDITOR.STYLE_BLOCK:
							return !!a.blockLimit.getDtd()[this.element]
					}
					return !0
				},
				checkElementMatch: function (a, b) {
					var c = this._.definition;
					if (!a || !c.ignoreReadonly && a.isReadOnly()) return !1;
					var d = a.getName();
					if ("string" == typeof this.element ? d == this.element : d in this.element) {
						if (!b && !a.hasAttributes()) return !0;
						if (d = c._AC) c = d;
						else {
							var d = {},
								h = 0,
								f = c.attributes;
							if (f)
								for (var g in f) h++, d[g] = f[g];
							if (g = CKEDITOR.style.getStyleText(c)) d.style || h++, d.style = g;
							d._length = h;
							c = c._AC = d
						}
						if (c._length) {
							for (var e in c)
								if ("_length" != e)
									if (d = a.getAttribute(e) || "", "style" == e ? C(c[e], d) : c[e] == d) {
										if (!b) return !0
									} else if (b) return !1;
							if (b) return !0
						} else return !0
					}
					return !1
				},
				checkElementRemovable: function (a, b, c) {
					if (this.checkElementMatch(a, b, c)) return !0;
					if (b = v(this)[a.getName()]) {
						var d;
						if (!(b = b.attributes)) return !0;
						for (c = 0; c < b.length; c++)
							if (d = b[c][0], d = a.getAttribute(d)) {
								var h = b[c][1];
								if (null === h) return !0;
								if ("string" == typeof h) {
									if (d == h) return !0
								} else if (h.test(d)) return !0
							}
					}
					return !1
				},
				buildPreview: function (a) {
					var b = this._.definition,
						c = [],
						d = b.element;
					"bdo" == d && (d = "span");
					var c = ["\x3c", d],
						h = b.attributes;
					if (h)
						for (var f in h) c.push(" ", f, '\x3d"', h[f], '"');
					(h = CKEDITOR.style.getStyleText(b)) && c.push(' style\x3d"', h, '"');
					c.push("\x3e", a || b.name, "\x3c/", d, "\x3e");
					return c.join("")
				},
				getDefinition: function () {
					return this._.definition
				}
			};
			CKEDITOR.style.getStyleText = function (a) {
				var b = a._ST;
				if (b) return b;
				var b = a.styles,
					c = a.attributes && a.attributes.style || "",
					d = "";
				c.length && (c = c.replace(E, ";"));
				for (var h in b) {
					var f = b[h],
						g = (h + ":" + f).replace(E, ";");
					"inherit" == f ? d += g : c += g
				}
				c.length && (c = CKEDITOR.tools.normalizeCssText(c, !0));
				return a._ST = c + d
			};
			CKEDITOR.style.customHandlers = {};
			CKEDITOR.style.addCustomHandler = function (a) {
				var b = function (a) {
					this._ = {
						definition: a
					};
					this.setup && this.setup(a)
				};
				b.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype), {
						assignedTo: CKEDITOR.STYLE_OBJECT
					},
					a, !0);
				return this.customHandlers[a.type] = b
			};
			var J = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED,
				L = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED
		}(), CKEDITOR.styleCommand = function (a, e) {
			this.requiredContent = this.allowedContent = this.style = a;
			CKEDITOR.tools.extend(this, e, !0)
		}, CKEDITOR.styleCommand.prototype.exec = function (a) {
			a.focus();
			this.state == CKEDITOR.TRISTATE_OFF ? a.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON &&
				a.removeStyle(this.style)
		}, CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet"), CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet), CKEDITOR.loadStylesSet = function (a, e, b) {
			CKEDITOR.stylesSet.addExternal(a, e, "");
			CKEDITOR.stylesSet.load(a, b)
		}, CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
			attachStyleStateChange: function (a, e) {
				var b = this._.styleStateChangeCallbacks;
				b || (b = this._.styleStateChangeCallbacks = [], this.on("selectionChange", function (a) {
					for (var g = 0; g <
						b.length; g++) {
						var e = b[g],
							k = e.style.checkActive(a.data.path, this) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF;
						e.fn.call(this, k)
					}
				}));
				b.push({
					style: a,
					fn: e
				})
			},
			applyStyle: function (a) {
				a.apply(this)
			},
			removeStyle: function (a) {
				a.remove(this)
			},
			getStylesSet: function (a) {
				if (this._.stylesDefinitions) a(this._.stylesDefinitions);
				else {
					var e = this,
						b = e.config.stylesCombo_stylesSet || e.config.stylesSet;
					if (!1 === b) a(null);
					else if (b instanceof Array) e._.stylesDefinitions = b, a(b);
					else {
						b || (b = "default");
						var b = b.split(":"),
							c = b[0];
						CKEDITOR.stylesSet.addExternal(c, b[1] ? b.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), "");
						CKEDITOR.stylesSet.load(c, function (b) {
							e._.stylesDefinitions = b[c];
							a(e._.stylesDefinitions)
						})
					}
				}
			}
		}), CKEDITOR.dom.comment = function (a, e) {
			"string" == typeof a && (a = (e ? e.$ : document).createComment(a));
			CKEDITOR.dom.domObject.call(this, a)
		}, CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node, CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, {
			type: CKEDITOR.NODE_COMMENT,
			getOuterHtml: function () {
				return "\x3c!--" + this.$.nodeValue +
					"--\x3e"
			}
		}), "use strict",
		function () {
			var a = {},
				e = {},
				b;
			for (b in CKEDITOR.dtd.$blockLimit) b in CKEDITOR.dtd.$list || (a[b] = 1);
			for (b in CKEDITOR.dtd.$block) b in CKEDITOR.dtd.$blockLimit || b in CKEDITOR.dtd.$empty || (e[b] = 1);
			CKEDITOR.dom.elementPath = function (b, g) {
				var l = null,
					k = null,
					f = [],
					d = b,
					m;
				g = g || b.getDocument().getBody();
				d || (d = g);
				do
					if (d.type == CKEDITOR.NODE_ELEMENT) {
						f.push(d);
						if (!this.lastElement && (this.lastElement = d, d.is(CKEDITOR.dtd.$object) || "false" == d.getAttribute("contenteditable"))) continue;
						if (d.equals(g)) break;
						if (!k && (m = d.getName(), "true" == d.getAttribute("contenteditable") ? k = d : !l && e[m] && (l = d), a[m])) {
							if (m = !l && "div" == m) {
								a: {
									m = d.getChildren();
									for (var h = 0, n = m.count(); h < n; h++) {
										var p = m.getItem(h);
										if (p.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[p.getName()]) {
											m = !0;
											break a
										}
									}
									m = !1
								}
								m = !m
							}
							m ? l = d : k = d
						}
					}
				while (d = d.getParent());
				k || (k = g);
				this.block = l;
				this.blockLimit = k;
				this.root = g;
				this.elements = f
			}
		}(), CKEDITOR.dom.elementPath.prototype = {
			compare: function (a) {
				var e = this.elements;
				a = a && a.elements;
				if (!a || e.length != a.length) return !1;
				for (var b = 0; b < e.length; b++)
					if (!e[b].equals(a[b])) return !1;
				return !0
			},
			contains: function (a, e, b) {
				var c = 0,
					g;
				"string" == typeof a && (g = function (b) {
					return b.getName() == a
				});
				a instanceof CKEDITOR.dom.element ? g = function (b) {
					return b.equals(a)
				} : CKEDITOR.tools.isArray(a) ? g = function (b) {
					return -1 < CKEDITOR.tools.indexOf(a, b.getName())
				} : "function" == typeof a ? g = a : "object" == typeof a && (g = function (b) {
					return b.getName() in a
				});
				var l = this.elements,
					k = l.length;
				e && (b ? c += 1 : --k);
				b && (l = Array.prototype.slice.call(l, 0), l.reverse());
				for (; c < k; c++)
					if (g(l[c])) return l[c];
				return null
			},
			isContextFor: function (a) {
				var e;
				return a in CKEDITOR.dtd.$block ? (e = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit, !!e.getDtd()[a]) : !0
			},
			direction: function () {
				return (this.block || this.blockLimit || this.root).getDirection(1)
			}
		}, CKEDITOR.dom.text = function (a, e) {
			"string" == typeof a && (a = (e ? e.$ : document).createTextNode(a));
			this.$ = a
		}, CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node, CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
			type: CKEDITOR.NODE_TEXT,
			getLength: function () {
				return this.$.nodeValue.length
			},
			getText: function () {
				return this.$.nodeValue
			},
			setText: function (a) {
				this.$.nodeValue = a
			},
			split: function (a) {
				var e = this.$.parentNode,
					b = e.childNodes.length,
					c = this.getLength(),
					g = this.getDocument(),
					l = new CKEDITOR.dom.text(this.$.splitText(a), g);
				e.childNodes.length == b && (a >= c ? (l = g.createText(""), l.insertAfter(this)) : (a = g.createText(""), a.insertAfter(l), a.remove()));
				return l
			},
			substring: function (a, e) {
				return "number" != typeof e ? this.$.nodeValue.substr(a) :
					this.$.nodeValue.substring(a, e)
			}
		}),
		function () {
			function a(a, c, g) {
				var e = a.serializable,
					k = c[g ? "endContainer" : "startContainer"],
					f = g ? "endOffset" : "startOffset",
					d = e ? c.document.getById(a.startNode) : a.startNode;
				a = e ? c.document.getById(a.endNode) : a.endNode;
				k.equals(d.getPrevious()) ? (c.startOffset = c.startOffset - k.getLength() - a.getPrevious().getLength(), k = a.getNext()) : k.equals(a.getPrevious()) && (c.startOffset -= k.getLength(), k = a.getNext());
				k.equals(d.getParent()) && c[f]++;
				k.equals(a.getParent()) && c[f]++;
				c[g ? "endContainer" :
					"startContainer"] = k;
				return c
			}
			CKEDITOR.dom.rangeList = function (a) {
				if (a instanceof CKEDITOR.dom.rangeList) return a;
				a ? a instanceof CKEDITOR.dom.range && (a = [a]) : a = [];
				return CKEDITOR.tools.extend(a, e)
			};
			var e = {
				createIterator: function () {
					var a = this,
						c = CKEDITOR.dom.walker.bookmark(),
						g = [],
						e;
					return {
						getNextRange: function (k) {
							e = void 0 === e ? 0 : e + 1;
							var f = a[e];
							if (f && 1 < a.length) {
								if (!e)
									for (var d = a.length - 1; 0 <= d; d--) g.unshift(a[d].createBookmark(!0));
								if (k)
									for (var m = 0; a[e + m + 1];) {
										var h = f.document;
										k = 0;
										d = h.getById(g[m].endNode);
										for (h = h.getById(g[m + 1].startNode);;) {
											d = d.getNextSourceNode(!1);
											if (h.equals(d)) k = 1;
											else if (c(d) || d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary()) continue;
											break
										}
										if (!k) break;
										m++
									}
								for (f.moveToBookmark(g.shift()); m--;) d = a[++e], d.moveToBookmark(g.shift()), f.setEnd(d.endContainer, d.endOffset)
							}
							return f
						}
					}
				},
				createBookmarks: function (b) {
					for (var c = [], g, e = 0; e < this.length; e++) {
						c.push(g = this[e].createBookmark(b, !0));
						for (var k = e + 1; k < this.length; k++) this[k] = a(g, this[k]), this[k] = a(g, this[k], !0)
					}
					return c
				},
				createBookmarks2: function (a) {
					for (var c = [], g = 0; g < this.length; g++) c.push(this[g].createBookmark2(a));
					return c
				},
				moveToBookmarks: function (a) {
					for (var c = 0; c < this.length; c++) this[c].moveToBookmark(a[c])
				}
			}
		}(),
		function () {
			function a() {
				return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/")
			}

			function e(b) {
				var c = CKEDITOR.skin["ua_" + b],
					d = CKEDITOR.env;
				if (c)
					for (var c = c.split(",").sort(function (a, b) {
							return a > b ? -1 : 1
						}), f = 0, g; f < c.length; f++)
						if (g = c[f], d.ie && (g.replace(/^ie/, "") == d.version || d.quirks && "iequirks" ==
								g) && (g = "ie"), d[g]) {
							b += "_" + c[f];
							break
						}
				return CKEDITOR.getUrl(a() + b + ".css")
			}

			function b(a, b) {
				l[a] || (CKEDITOR.document.appendStyleSheet(e(a)), l[a] = 1);
				b && b()
			}

			function c(a) {
				var b = a.getById(k);
				b || (b = a.getHead().append("style"), b.setAttribute("id", k), b.setAttribute("type", "text/css"));
				return b
			}

			function g(a, b, c) {
				var d, f, g;
				if (CKEDITOR.env.webkit)
					for (b = b.split("}").slice(0, -1), f = 0; f < b.length; f++) b[f] = b[f].split("{");
				for (var e = 0; e < a.length; e++)
					if (CKEDITOR.env.webkit)
						for (f = 0; f < b.length; f++) {
							g = b[f][1];
							for (d = 0; d <
								c.length; d++) g = g.replace(c[d][0], c[d][1]);
							a[e].$.sheet.addRule(b[f][0], g)
						} else {
							g = b;
							for (d = 0; d < c.length; d++) g = g.replace(c[d][0], c[d][1]);
							CKEDITOR.env.ie && 11 > CKEDITOR.env.version ? a[e].$.styleSheet.cssText += g : a[e].$.innerHTML += g
						}
			}
			var l = {};
			CKEDITOR.skin = {
				path: a,
				loadPart: function (c, d) {
					CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a() + "skin.js"), function () {
						b(c, d)
					}) : b(c, d)
				},
				getPath: function (a) {
					return CKEDITOR.getUrl(e(a))
				},
				icons: {},
				addIcon: function (a, b, c, d) {
					a =
						a.toLowerCase();
					this.icons[a] || (this.icons[a] = {
						path: b,
						offset: c || 0,
						bgsize: d || "16px"
					})
				},
				getIconStyle: function (a, b, c, d, f) {
					var g;
					a && (a = a.toLowerCase(), b && (g = this.icons[a + "-rtl"]), g || (g = this.icons[a]));
					a = c || g && g.path || "";
					d = d || g && g.offset;
					f = f || g && g.bgsize || "16px";
					a && (a = a.replace(/'/g, "\\'"));
					return a && "background-image:url('" + CKEDITOR.getUrl(a) + "');background-position:0 " + d + "px;background-size:" + f + ";"
				}
			};
			CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
				getUiColor: function () {
					return this.uiColor
				},
				setUiColor: function (a) {
					var b =
						c(CKEDITOR.document);
					return (this.setUiColor = function (a) {
						this.uiColor = a;
						var c = CKEDITOR.skin.chameleon,
							e = "",
							m = "";
						"function" == typeof c && (e = c(this, "editor"), m = c(this, "panel"));
						a = [
							[d, a]
						];
						g([b], e, a);
						g(f, m, a)
					}).call(this, a)
				}
			});
			var k = "cke_ui_color",
				f = [],
				d = /\$color/g;
			CKEDITOR.on("instanceLoaded", function (a) {
				if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
					var b = a.editor;
					a = function (a) {
						a = (a.data[0] || a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument();
						if (!a.getById("cke_ui_color")) {
							a = c(a);
							f.push(a);
							var e = b.getUiColor();
							e && g([a], CKEDITOR.skin.chameleon(b, "panel"), [
								[d, e]
							])
						}
					};
					b.on("panelShow", a);
					b.on("menuShow", a);
					b.config.uiColor && b.setUiColor(b.config.uiColor)
				}
			})
		}(),
		function () {
			if (CKEDITOR.env.webkit) CKEDITOR.env.hc = !1;
			else {
				var a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"\x3e\x3c/div\x3e', CKEDITOR.document);
				a.appendTo(CKEDITOR.document.getHead());
				try {
					var e = a.getComputedStyle("border-top-color"),
						b = a.getComputedStyle("border-right-color");
					CKEDITOR.env.hc = !(!e || e != b)
				} catch (c) {
					CKEDITOR.env.hc = !1
				}
				a.remove()
			}
			CKEDITOR.env.hc && (CKEDITOR.env.cssClass += " cke_hc");
			CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}");
			CKEDITOR.status = "loaded";
			CKEDITOR.fireOnce("loaded");
			if (a = CKEDITOR._.pending)
				for (delete CKEDITOR._.pending, e = 0; e < a.length; e++) CKEDITOR.editor.prototype.constructor.apply(a[e][0], a[e][1]), CKEDITOR.add(a[e][0])
		}(), CKEDITOR.skin.name = "moono-lisa", CKEDITOR.skin.ua_editor = "ie,iequirks,ie8,gecko",
		CKEDITOR.skin.ua_dialog = "ie,iequirks,ie8", CKEDITOR.skin.chameleon = function () {
			var a = function () {
					return function (a, c) {
						for (var g = a.match(/[^#]./g), e = 0; 3 > e; e++) {
							var k = e,
								f;
							f = parseInt(g[e], 16);
							f = ("0" + (0 > c ? 0 | f * (1 + c) : 0 | f + (255 - f) * c).toString(16)).slice(-2);
							g[k] = f
						}
						return "#" + g.join("")
					}
				}(),
				e = {
					editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_bottom [background-color:{defaultBackground};border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [background-color:{defaultBackground};outline-color:{defaultBorder};] {id} .cke_dialog_tab [background-color:{dialogTab};border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [background-color:{lightBackground};] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} a.cke_button_off:hover,{id} a.cke_button_off:focus,{id} a.cke_button_off:active [background-color:{darkBackground};border-color:{toolbarElementsBorder};] {id} .cke_button_on [background-color:{ckeButtonOn};border-color:{toolbarElementsBorder};] {id} .cke_toolbar_separator,{id} .cke_toolgroup a.cke_button:last-child:after,{id} .cke_toolgroup a.cke_button.cke_button_disabled:hover:last-child:after [background-color: {toolbarElementsBorder};border-color: {toolbarElementsBorder};] {id} a.cke_combo_button:hover,{id} a.cke_combo_button:focus,{id} .cke_combo_on a.cke_combo_button [border-color:{toolbarElementsBorder};background-color:{darkBackground};] {id} .cke_combo:after [border-color:{toolbarElementsBorder};] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover,{id} a.cke_path_item:focus,{id} a.cke_path_item:active [background-color:{darkBackground};] {id}.cke_panel [border-color:{defaultBorder};] "),
					panel: new CKEDITOR.template(".cke_panel_grouptitle [background-color:{lightBackground};border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover,.cke_menubutton:focus,.cke_menubutton:active [background-color:{menubuttonHover};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menubutton_disabled:hover .cke_menubutton_icon,.cke_menubutton_disabled:focus .cke_menubutton_icon,.cke_menubutton_disabled:active .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")
				};
			return function (b, c) {
				var g = a(b.uiColor, .4),
					g = {
						id: "." + b.id,
						defaultBorder: a(g, -.2),
						toolbarElementsBorder: a(g, -.25),
						defaultBackground: g,
						lightBackground: a(g, .8),
						darkBackground: a(g, -.15),
						ckeButtonOn: a(g, .4),
						ckeResizer: a(g, -.4),
						ckeColorauto: a(g, .8),
						dialogBody: a(g, .7),
						dialogTab: a(g, .65),
						dialogTabSelected: "#FFF",
						dialogTabSelectedBorder: "#FFF",
						elementsPathColor: a(g, -.6),
						menubuttonHover: a(g, .1),
						menubuttonIcon: a(g, .5),
						menubuttonIconHover: a(g, .3)
					};
				return e[c].output(g).replace(/\[/g, "{").replace(/\]/g, "}")
			}
		}(),
		CKEDITOR.plugins.add("dialogui", {
			onLoad: function () {
				var a = function (a) {
						this._ || (this._ = {});
						this._["default"] = this._.initValue = a["default"] || "";
						this._.required = a.required || !1;
						for (var b = [this._], c = 1; c < arguments.length; c++) b.push(arguments[c]);
						b.push(!0);
						CKEDITOR.tools.extend.apply(CKEDITOR.tools, b);
						return this._
					},
					e = {
						build: function (a, b, c) {
							return new CKEDITOR.ui.dialog.textInput(a, b, c)
						}
					},
					b = {
						build: function (a, b, c) {
							return new CKEDITOR.ui.dialog[b.type](a, b, c)
						}
					},
					c = {
						isChanged: function () {
							return this.getValue() !=
								this.getInitValue()
						},
						reset: function (a) {
							this.setValue(this.getInitValue(), a)
						},
						setInitValue: function () {
							this._.initValue = this.getValue()
						},
						resetInitValue: function () {
							this._.initValue = this._["default"]
						},
						getInitValue: function () {
							return this._.initValue
						}
					},
					g = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
						onChange: function (a, b) {
							this._.domOnChangeRegistered || (a.on("load", function () {
								this.getInputElement().on("change", function () {
										a.parts.dialog.isVisible() && this.fire("change", {
											value: this.getValue()
										})
									},
									this)
							}, this), this._.domOnChangeRegistered = !0);
							this.on("change", b)
						}
					}, !0),
					l = /^on([A-Z]\w+)/,
					k = function (a) {
						for (var b in a)(l.test(b) || "title" == b || "type" == b) && delete a[b];
						return a
					},
					f = function (a) {
						a = a.data.getKeystroke();
						a == CKEDITOR.SHIFT + CKEDITOR.ALT + 36 ? this.setDirectionMarker("ltr") : a == CKEDITOR.SHIFT + CKEDITOR.ALT + 35 && this.setDirectionMarker("rtl")
					};
				CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
					labeledElement: function (b, c, h, f) {
						if (!(4 > arguments.length)) {
							var g = a.call(this, c);
							g.labelId = CKEDITOR.tools.getNextId() +
								"_label";
							this._.children = [];
							var e = {
								role: c.role || "presentation"
							};
							c.includeLabel && (e["aria-labelledby"] = g.labelId);
							CKEDITOR.ui.dialog.uiElement.call(this, b, c, h, "div", null, e, function () {
								var a = [],
									h = c.required ? " cke_required" : "";
								"horizontal" != c.labelLayout ? a.push('\x3clabel class\x3d"cke_dialog_ui_labeled_label' + h + '" ', ' id\x3d"' + g.labelId + '"', g.inputId ? ' for\x3d"' + g.inputId + '"' : "", (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e", c.label, "\x3c/label\x3e", '\x3cdiv class\x3d"cke_dialog_ui_labeled_content"',
									c.controlStyle ? ' style\x3d"' + c.controlStyle + '"' : "", ' role\x3d"presentation"\x3e', f.call(this, b, c), "\x3c/div\x3e") : (h = {
									type: "hbox",
									widths: c.widths,
									padding: 0,
									children: [{
										type: "html",
										html: '\x3clabel class\x3d"cke_dialog_ui_labeled_label' + h + '" id\x3d"' + g.labelId + '" for\x3d"' + g.inputId + '"' + (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e" + CKEDITOR.tools.htmlEncode(c.label) + "\x3c/label\x3e"
									}, {
										type: "html",
										html: '\x3cspan class\x3d"cke_dialog_ui_labeled_content"' + (c.controlStyle ? ' style\x3d"' + c.controlStyle +
											'"' : "") + "\x3e" + f.call(this, b, c) + "\x3c/span\x3e"
									}]
								}, CKEDITOR.dialog._.uiElementBuilders.hbox.build(b, h, a));
								return a.join("")
							})
						}
					},
					textInput: function (b, c, h) {
						if (!(3 > arguments.length)) {
							a.call(this, c);
							var g = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput",
								e = {
									"class": "cke_dialog_ui_input_" + c.type,
									id: g,
									type: c.type
								};
							c.validate && (this.validate = c.validate);
							c.maxLength && (e.maxlength = c.maxLength);
							c.size && (e.size = c.size);
							c.inputStyle && (e.style = c.inputStyle);
							var k = this,
								l = !1;
							b.on("load", function () {
								k.getInputElement().on("keydown",
									function (a) {
										13 == a.data.getKeystroke() && (l = !0)
									});
								k.getInputElement().on("keyup", function (a) {
									13 == a.data.getKeystroke() && l && (b.getButton("ok") && setTimeout(function () {
										b.getButton("ok").click()
									}, 0), l = !1);
									k.bidi && f.call(k, a)
								}, null, null, 1E3)
							});
							CKEDITOR.ui.dialog.labeledElement.call(this, b, c, h, function () {
								var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_', c.type, '" role\x3d"presentation"'];
								c.width && a.push('style\x3d"width:' + c.width + '" ');
								a.push("\x3e\x3cinput ");
								e["aria-labelledby"] = this._.labelId;
								this._.required &&
									(e["aria-required"] = this._.required);
								for (var b in e) a.push(b + '\x3d"' + e[b] + '" ');
								a.push(" /\x3e\x3c/div\x3e");
								return a.join("")
							})
						}
					},
					textarea: function (b, c, h) {
						if (!(3 > arguments.length)) {
							a.call(this, c);
							var g = this,
								e = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea",
								k = {};
							c.validate && (this.validate = c.validate);
							k.rows = c.rows || 5;
							k.cols = c.cols || 20;
							k["class"] = "cke_dialog_ui_input_textarea " + (c["class"] || "");
							"undefined" != typeof c.inputStyle && (k.style = c.inputStyle);
							c.dir && (k.dir = c.dir);
							if (g.bidi) b.on("load",
								function () {
									g.getInputElement().on("keyup", f)
								}, g);
							CKEDITOR.ui.dialog.labeledElement.call(this, b, c, h, function () {
								k["aria-labelledby"] = this._.labelId;
								this._.required && (k["aria-required"] = this._.required);
								var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_textarea" role\x3d"presentation"\x3e\x3ctextarea id\x3d"', e, '" '],
									b;
								for (b in k) a.push(b + '\x3d"' + CKEDITOR.tools.htmlEncode(k[b]) + '" ');
								a.push("\x3e", CKEDITOR.tools.htmlEncode(g._["default"]), "\x3c/textarea\x3e\x3c/div\x3e");
								return a.join("")
							})
						}
					},
					checkbox: function (b,
						c, h) {
						if (!(3 > arguments.length)) {
							var f = a.call(this, c, {
								"default": !!c["default"]
							});
							c.validate && (this.validate = c.validate);
							CKEDITOR.ui.dialog.uiElement.call(this, b, c, h, "span", null, null, function () {
								var a = CKEDITOR.tools.extend({}, c, {
										id: c.id ? c.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox"
									}, !0),
									h = [],
									g = CKEDITOR.tools.getNextId() + "_label",
									e = {
										"class": "cke_dialog_ui_checkbox_input",
										type: "checkbox",
										"aria-labelledby": g
									};
								k(a);
								c["default"] && (e.checked = "checked");
								"undefined" != typeof a.inputStyle && (a.style = a.inputStyle);
								f.checkbox = new CKEDITOR.ui.dialog.uiElement(b, a, h, "input", null, e);
								h.push(' \x3clabel id\x3d"', g, '" for\x3d"', e.id, '"' + (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e", CKEDITOR.tools.htmlEncode(c.label), "\x3c/label\x3e");
								return h.join("")
							})
						}
					},
					radio: function (b, c, h) {
						if (!(3 > arguments.length)) {
							a.call(this, c);
							this._["default"] || (this._["default"] = this._.initValue = c.items[0][1]);
							c.validate && (this.validate = c.validate);
							var f = [],
								g = this;
							c.role = "radiogroup";
							c.includeLabel = !0;
							CKEDITOR.ui.dialog.labeledElement.call(this,
								b, c, h,
								function () {
									for (var a = [], h = [], e = (c.id ? c.id : CKEDITOR.tools.getNextId()) + "_radio", l = 0; l < c.items.length; l++) {
										var w = c.items[l],
											t = void 0 !== w[2] ? w[2] : w[0],
											B = void 0 !== w[1] ? w[1] : w[0],
											v = CKEDITOR.tools.getNextId() + "_radio_input",
											z = v + "_label",
											v = CKEDITOR.tools.extend({}, c, {
												id: v,
												title: null,
												type: null
											}, !0),
											t = CKEDITOR.tools.extend({}, v, {
												title: t
											}, !0),
											C = {
												type: "radio",
												"class": "cke_dialog_ui_radio_input",
												name: e,
												value: B,
												"aria-labelledby": z
											},
											x = [];
										g._["default"] == B && (C.checked = "checked");
										k(v);
										k(t);
										"undefined" != typeof v.inputStyle &&
											(v.style = v.inputStyle);
										v.keyboardFocusable = !0;
										f.push(new CKEDITOR.ui.dialog.uiElement(b, v, x, "input", null, C));
										x.push(" ");
										new CKEDITOR.ui.dialog.uiElement(b, t, x, "label", null, {
											id: z,
											"for": C.id
										}, w[0]);
										a.push(x.join(""))
									}
									new CKEDITOR.ui.dialog.hbox(b, f, a, h);
									return h.join("")
								});
							this._.children = f
						}
					},
					button: function (b, c, h) {
						if (arguments.length) {
							"function" == typeof c && (c = c(b.getParentEditor()));
							a.call(this, c, {
								disabled: c.disabled || !1
							});
							CKEDITOR.event.implementOn(this);
							var f = this;
							b.on("load", function () {
								var a = this.getElement();
								(function () {
									a.on("click", function (a) {
										f.click();
										a.data.preventDefault()
									});
									a.on("keydown", function (a) {
										a.data.getKeystroke() in {
											32: 1
										} && (f.click(), a.data.preventDefault())
									})
								})();
								a.unselectable()
							}, this);
							var g = CKEDITOR.tools.extend({}, c);
							delete g.style;
							var e = CKEDITOR.tools.getNextId() + "_label";
							CKEDITOR.ui.dialog.uiElement.call(this, b, g, h, "a", null, {
									style: c.style,
									href: "javascript:void(0)",
									title: c.label,
									hidefocus: "true",
									"class": c["class"],
									role: "button",
									"aria-labelledby": e
								}, '\x3cspan id\x3d"' + e + '" class\x3d"cke_dialog_ui_button"\x3e' +
								CKEDITOR.tools.htmlEncode(c.label) + "\x3c/span\x3e")
						}
					},
					select: function (b, c, h) {
						if (!(3 > arguments.length)) {
							var f = a.call(this, c);
							c.validate && (this.validate = c.validate);
							f.inputId = CKEDITOR.tools.getNextId() + "_select";
							CKEDITOR.ui.dialog.labeledElement.call(this, b, c, h, function () {
								var a = CKEDITOR.tools.extend({}, c, {
										id: c.id ? c.id + "_select" : CKEDITOR.tools.getNextId() + "_select"
									}, !0),
									h = [],
									g = [],
									e = {
										id: f.inputId,
										"class": "cke_dialog_ui_input_select",
										"aria-labelledby": this._.labelId
									};
								h.push('\x3cdiv class\x3d"cke_dialog_ui_input_',
									c.type, '" role\x3d"presentation"');
								c.width && h.push('style\x3d"width:' + c.width + '" ');
								h.push("\x3e");
								void 0 !== c.size && (e.size = c.size);
								void 0 !== c.multiple && (e.multiple = c.multiple);
								k(a);
								for (var l = 0, w; l < c.items.length && (w = c.items[l]); l++) g.push('\x3coption value\x3d"', CKEDITOR.tools.htmlEncode(void 0 !== w[1] ? w[1] : w[0]).replace(/"/g, "\x26quot;"), '" /\x3e ', CKEDITOR.tools.htmlEncode(w[0]));
								"undefined" != typeof a.inputStyle && (a.style = a.inputStyle);
								f.select = new CKEDITOR.ui.dialog.uiElement(b, a, h, "select", null,
									e, g.join(""));
								h.push("\x3c/div\x3e");
								return h.join("")
							})
						}
					},
					file: function (b, c, h) {
						if (!(3 > arguments.length)) {
							void 0 === c["default"] && (c["default"] = "");
							var f = CKEDITOR.tools.extend(a.call(this, c), {
								definition: c,
								buttons: []
							});
							c.validate && (this.validate = c.validate);
							b.on("load", function () {
								CKEDITOR.document.getById(f.frameId).getParent().addClass("cke_dialog_ui_input_file")
							});
							CKEDITOR.ui.dialog.labeledElement.call(this, b, c, h, function () {
								f.frameId = CKEDITOR.tools.getNextId() + "_fileInput";
								var a = ['\x3ciframe frameborder\x3d"0" allowtransparency\x3d"0" class\x3d"cke_dialog_ui_input_file" role\x3d"presentation" id\x3d"',
									f.frameId, '" title\x3d"', c.label, '" src\x3d"javascript:void('
								];
								a.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0");
								a.push(')"\x3e\x3c/iframe\x3e');
								return a.join("")
							})
						}
					},
					fileButton: function (b, c, h) {
						var f = this;
						if (!(3 > arguments.length)) {
							a.call(this, c);
							c.validate && (this.validate = c.validate);
							var g = CKEDITOR.tools.extend({}, c),
								e = g.onClick;
							g.className = (g.className ? g.className + " " : "") + "cke_dialog_ui_button";
							g.onClick = function (a) {
								var h =
									c["for"];
								a = e ? e.call(this, a) : !1;
								!1 !== a && ("xhr" !== a && b.getContentElement(h[0], h[1]).submit(), this.disable())
							};
							b.on("load", function () {
								b.getContentElement(c["for"][0], c["for"][1])._.buttons.push(f)
							});
							CKEDITOR.ui.dialog.button.call(this, b, g, h)
						}
					},
					html: function () {
						var a = /^\s*<[\w:]+\s+([^>]*)?>/,
							b = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,
							c = /\/$/;
						return function (f, g, e) {
							if (!(3 > arguments.length)) {
								var k = [],
									l = g.html;
								"\x3c" != l.charAt(0) && (l = "\x3cspan\x3e" + l + "\x3c/span\x3e");
								var r = g.focus;
								if (r) {
									var w = this.focus;
									this.focus = function () {
										("function" == typeof r ? r : w).call(this);
										this.fire("focus")
									};
									g.isFocusable && (this.isFocusable = this.isFocusable);
									this.keyboardFocusable = !0
								}
								CKEDITOR.ui.dialog.uiElement.call(this, f, g, k, "span", null, null, "");
								k = k.join("").match(a);
								l = l.match(b) || ["", "", ""];
								c.test(l[1]) && (l[1] = l[1].slice(0, -1), l[2] = "/" + l[2]);
								e.push([l[1], " ", k[1] || "", l[2]].join(""))
							}
						}
					}(),
					fieldset: function (a, b, c, f, g) {
						var e = g.label;
						this._ = {
							children: b
						};
						CKEDITOR.ui.dialog.uiElement.call(this, a, g, f, "fieldset", null, null, function () {
							var a = [];
							e && a.push("\x3clegend" + (g.labelStyle ? ' style\x3d"' + g.labelStyle + '"' : "") + "\x3e" + e + "\x3c/legend\x3e");
							for (var b = 0; b < c.length; b++) a.push(c[b]);
							return a.join("")
						})
					}
				}, !0);
				CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement;
				CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
					setLabel: function (a) {
						var b = CKEDITOR.document.getById(this._.labelId);
						1 > b.getChildCount() ? (new CKEDITOR.dom.text(a, CKEDITOR.document)).appendTo(b) : b.getChild(0).$.nodeValue =
							a;
						return this
					},
					getLabel: function () {
						var a = CKEDITOR.document.getById(this._.labelId);
						return !a || 1 > a.getChildCount() ? "" : a.getChild(0).getText()
					},
					eventProcessors: g
				}, !0);
				CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
					click: function () {
						return this._.disabled ? !1 : this.fire("click", {
							dialog: this._.dialog
						})
					},
					enable: function () {
						this._.disabled = !1;
						var a = this.getElement();
						a && a.removeClass("cke_disabled")
					},
					disable: function () {
						this._.disabled = !0;
						this.getElement().addClass("cke_disabled")
					},
					isVisible: function () {
						return this.getElement().getFirst().isVisible()
					},
					isEnabled: function () {
						return !this._.disabled
					},
					eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
						onClick: function (a, b) {
							this.on("click", function () {
								b.apply(this, arguments)
							})
						}
					}, !0),
					accessKeyUp: function () {
						this.click()
					},
					accessKeyDown: function () {
						this.focus()
					},
					keyboardFocusable: !0
				}, !0);
				CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
					getInputElement: function () {
						return CKEDITOR.document.getById(this._.inputId)
					},
					focus: function () {
						var a = this.selectParentTab();
						setTimeout(function () {
							var b = a.getInputElement();
							b && b.$.focus()
						}, 0)
					},
					select: function () {
						var a = this.selectParentTab();
						setTimeout(function () {
							var b = a.getInputElement();
							b && (b.$.focus(), b.$.select())
						}, 0)
					},
					accessKeyUp: function () {
						this.select()
					},
					setValue: function (a) {
						if (this.bidi) {
							var b = a && a.charAt(0);
							(b = "‪" == b ? "ltr" : "‫" == b ? "rtl" : null) && (a = a.slice(1));
							this.setDirectionMarker(b)
						}
						a || (a = "");
						return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments)
					},
					getValue: function () {
						var a = CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this);
						if (this.bidi && a) {
							var b = this.getDirectionMarker();
							b && (a = ("ltr" == b ? "‪" : "‫") + a)
						}
						return a
					},
					setDirectionMarker: function (a) {
						var b = this.getInputElement();
						a ? b.setAttributes({
							dir: a,
							"data-cke-dir-marker": a
						}) : this.getDirectionMarker() && b.removeAttributes(["dir", "data-cke-dir-marker"])
					},
					getDirectionMarker: function () {
						return this.getInputElement().data("cke-dir-marker")
					},
					keyboardFocusable: !0
				}, c, !0);
				CKEDITOR.ui.dialog.textarea.prototype =
					new CKEDITOR.ui.dialog.textInput;
				CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
					getInputElement: function () {
						return this._.select.getElement()
					},
					add: function (a, b, c) {
						var f = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document),
							g = this.getInputElement().$;
						f.$.text = a;
						f.$.value = void 0 === b || null === b ? a : b;
						void 0 === c || null === c ? CKEDITOR.env.ie ? g.add(f.$) : g.add(f.$, null) : g.add(f.$, c);
						return this
					},
					remove: function (a) {
						this.getInputElement().$.remove(a);
						return this
					},
					clear: function () {
						for (var a = this.getInputElement().$; 0 < a.length;) a.remove(0);
						return this
					},
					keyboardFocusable: !0
				}, c, !0);
				CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
					getInputElement: function () {
						return this._.checkbox.getElement()
					},
					setValue: function (a, b) {
						this.getInputElement().$.checked = a;
						!b && this.fire("change", {
							value: a
						})
					},
					getValue: function () {
						return this.getInputElement().$.checked
					},
					accessKeyUp: function () {
						this.setValue(!this.getValue())
					},
					eventProcessors: {
						onChange: function (a,
							b) {
							if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return g.onChange.apply(this, arguments);
							a.on("load", function () {
								var a = this._.checkbox.getElement();
								a.on("propertychange", function (b) {
									b = b.data.$;
									"checked" == b.propertyName && this.fire("change", {
										value: a.$.checked
									})
								}, this)
							}, this);
							this.on("change", b);
							return null
						}
					},
					keyboardFocusable: !0
				}, c, !0);
				CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
					setValue: function (a, b) {
						for (var c = this._.children, f, g = 0; g < c.length && (f = c[g]); g++) f.getElement().$.checked =
							f.getValue() == a;
						!b && this.fire("change", {
							value: a
						})
					},
					getValue: function () {
						for (var a = this._.children, b = 0; b < a.length; b++)
							if (a[b].getElement().$.checked) return a[b].getValue();
						return null
					},
					accessKeyUp: function () {
						var a = this._.children,
							b;
						for (b = 0; b < a.length; b++)
							if (a[b].getElement().$.checked) {
								a[b].getElement().focus();
								return
							}
						a[0].getElement().focus()
					},
					eventProcessors: {
						onChange: function (a, b) {
							if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return g.onChange.apply(this, arguments);
							a.on("load", function () {
								for (var a =
										this._.children, b = this, c = 0; c < a.length; c++) a[c].getElement().on("propertychange", function (a) {
									a = a.data.$;
									"checked" == a.propertyName && this.$.checked && b.fire("change", {
										value: this.getAttribute("value")
									})
								})
							}, this);
							this.on("change", b);
							return null
						}
					}
				}, c, !0);
				CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, c, {
					getInputElement: function () {
						var a = CKEDITOR.document.getById(this._.frameId).getFrameDocument();
						return 0 < a.$.forms.length ? new CKEDITOR.dom.element(a.$.forms[0].elements[0]) :
							this.getElement()
					},
					submit: function () {
						this.getInputElement().getParent().$.submit();
						return this
					},
					getAction: function () {
						return this.getInputElement().getParent().$.action
					},
					registerEvents: function (a) {
						var b = /^on([A-Z]\w+)/,
							c, f = function (a, b, c, d) {
								a.on("formLoaded", function () {
									a.getInputElement().on(c, d, a)
								})
							},
							g;
						for (g in a)
							if (c = g.match(b)) this.eventProcessors[g] ? this.eventProcessors[g].call(this, this._.dialog, a[g]) : f(this, this._.dialog, c[1].toLowerCase(), a[g]);
						return this
					},
					reset: function () {
						function a() {
							c.$.open();
							var d = "";
							f.size && (d = f.size - (CKEDITOR.env.ie ? 7 : 0));
							var t = b.frameId + "_input";
							c.$.write(['\x3chtml dir\x3d"' + l + '" lang\x3d"' + r + '"\x3e\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e\x3cbody style\x3d"margin: 0; overflow: hidden; background: transparent;"\x3e', '\x3cform enctype\x3d"multipart/form-data" method\x3d"POST" dir\x3d"' + l + '" lang\x3d"' + r + '" action\x3d"', CKEDITOR.tools.htmlEncode(f.action), '"\x3e\x3clabel id\x3d"', b.labelId, '" for\x3d"', t, '" style\x3d"display:none"\x3e', CKEDITOR.tools.htmlEncode(f.label),
								'\x3c/label\x3e\x3cinput style\x3d"width:100%" id\x3d"', t, '" aria-labelledby\x3d"', b.labelId, '" type\x3d"file" name\x3d"', CKEDITOR.tools.htmlEncode(f.id || "cke_upload"), '" size\x3d"', CKEDITOR.tools.htmlEncode(0 < d ? d : ""), '" /\x3e\x3c/form\x3e\x3c/body\x3e\x3c/html\x3e\x3cscript\x3e', CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + e + ");", "window.onbeforeunload \x3d function() {window.parent.CKEDITOR.tools.callFunction(" + k + ")}", "\x3c/script\x3e"
							].join(""));
							c.$.close();
							for (d = 0; d < g.length; d++) g[d].enable()
						}
						var b = this._,
							c = CKEDITOR.document.getById(b.frameId).getFrameDocument(),
							f = b.definition,
							g = b.buttons,
							e = this.formLoadedNumber,
							k = this.formUnloadNumber,
							l = b.dialog._.editor.lang.dir,
							r = b.dialog._.editor.langCode;
						e || (e = this.formLoadedNumber = CKEDITOR.tools.addFunction(function () {
							this.fire("formLoaded")
						}, this), k = this.formUnloadNumber = CKEDITOR.tools.addFunction(function () {
							this.getInputElement().clearCustomData()
						}, this), this.getDialog()._.editor.on("destroy", function () {
							CKEDITOR.tools.removeFunction(e);
							CKEDITOR.tools.removeFunction(k)
						}));
						CKEDITOR.env.gecko ? setTimeout(a, 500) : a()
					},
					getValue: function () {
						return this.getInputElement().$.value || ""
					},
					setInitValue: function () {
						this._.initValue = ""
					},
					eventProcessors: {
						onChange: function (a, b) {
							this._.domOnChangeRegistered || (this.on("formLoaded", function () {
								this.getInputElement().on("change", function () {
									this.fire("change", {
										value: this.getValue()
									})
								}, this)
							}, this), this._.domOnChangeRegistered = !0);
							this.on("change", b)
						}
					},
					keyboardFocusable: !0
				}, !0);
				CKEDITOR.ui.dialog.fileButton.prototype =
					new CKEDITOR.ui.dialog.button;
				CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype);
				CKEDITOR.dialog.addUIElement("text", e);
				CKEDITOR.dialog.addUIElement("password", e);
				CKEDITOR.dialog.addUIElement("tel", e);
				CKEDITOR.dialog.addUIElement("textarea", b);
				CKEDITOR.dialog.addUIElement("checkbox", b);
				CKEDITOR.dialog.addUIElement("radio", b);
				CKEDITOR.dialog.addUIElement("button", b);
				CKEDITOR.dialog.addUIElement("select", b);
				CKEDITOR.dialog.addUIElement("file", b);
				CKEDITOR.dialog.addUIElement("fileButton",
					b);
				CKEDITOR.dialog.addUIElement("html", b);
				CKEDITOR.dialog.addUIElement("fieldset", {
					build: function (a, b, c) {
						for (var f = b.children, g, e = [], k = [], l = 0; l < f.length && (g = f[l]); l++) {
							var r = [];
							e.push(r);
							k.push(CKEDITOR.dialog._.uiElementBuilders[g.type].build(a, g, r))
						}
						return new CKEDITOR.ui.dialog[b.type](a, k, e, c, b)
					}
				})
			}
		}), CKEDITOR.DIALOG_RESIZE_NONE = 0, CKEDITOR.DIALOG_RESIZE_WIDTH = 1, CKEDITOR.DIALOG_RESIZE_HEIGHT = 2, CKEDITOR.DIALOG_RESIZE_BOTH = 3, CKEDITOR.DIALOG_STATE_IDLE = 1, CKEDITOR.DIALOG_STATE_BUSY = 2,
		function () {
			function a() {
				for (var a =
						this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--)
					if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
				return null
			}

			function e() {
				for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; c < b + a; c++)
					if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
				return null
			}

			function b(a, b) {
				for (var c = a.$.getElementsByTagName("input"), d = 0, h = c.length; d <
					h; d++) {
					var f = new CKEDITOR.dom.element(c[d]);
					"text" == f.getAttribute("type").toLowerCase() && (b ? (f.setAttribute("value", f.getCustomData("fake_value") || ""), f.removeCustomData("fake_value")) : (f.setCustomData("fake_value", f.getAttribute("value")), f.setAttribute("value", "")))
				}
			}

			function c(a, b) {
				var c = this.getInputElement();
				c && (a ? c.removeAttribute("aria-invalid") : c.setAttribute("aria-invalid", !0));
				a || (this.select ? this.select() : this.focus());
				b && alert(b);
				this.fire("validated", {
					valid: a,
					msg: b
				})
			}

			function g() {
				var a =
					this.getInputElement();
				a && a.removeAttribute("aria-invalid")
			}

			function l(a) {
				var b = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", u).output({
						id: CKEDITOR.tools.getNextNumber(),
						editorId: a.id,
						langDir: a.lang.dir,
						langCode: a.langCode,
						editorDialogClass: "cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog",
						closeTitle: a.lang.common.close,
						hidpi: CKEDITOR.env.hidpi ? "cke_hidpi" : ""
					})),
					c = b.getChild([0, 0, 0, 0, 0]),
					d = c.getChild(0),
					h = c.getChild(1);
				a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(c);
				!CKEDITOR.env.ie || CKEDITOR.env.quirks || CKEDITOR.env.edge || (a = "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())", CKEDITOR.dom.element.createFromHtml('\x3ciframe frameBorder\x3d"0" class\x3d"cke_iframe_shim" src\x3d"' + a + '" tabIndex\x3d"-1"\x3e\x3c/iframe\x3e').appendTo(c.getParent()));
				d.unselectable();
				h.unselectable();
				return {
					element: b,
					parts: {
						dialog: b.getChild(0),
						title: d,
						close: h,
						tabs: c.getChild(2),
						contents: c.getChild([3, 0, 0, 0]),
						footer: c.getChild([3, 0, 1, 0])
					}
				}
			}

			function k(a, b, c) {
				this.element = b;
				this.focusIndex = c;
				this.tabIndex = 0;
				this.isFocusable = function () {
					return !b.getAttribute("disabled") && b.isVisible()
				};
				this.focus = function () {
					a._.currentFocusIndex = this.focusIndex;
					this.element.focus()
				};
				b.on("keydown", function (a) {
					a.data.getKeystroke() in {
						32: 1,
						13: 1
					} && this.fire("click")
				});
				b.on("focus", function () {
					this.fire("mouseover")
				});
				b.on("blur", function () {
					this.fire("mouseout")
				})
			}

			function f(a) {
				function b() {
					a.layout()
				}
				var c = CKEDITOR.document.getWindow();
				c.on("resize", b);
				a.on("hide", function () {
					c.removeListener("resize", b)
				})
			}

			function d(a, b) {
				this._ = {
					dialog: a
				};
				CKEDITOR.tools.extend(this, b)
			}

			function m(a) {
				function b(c) {
					var k = a.getSize(),
						m = CKEDITOR.document.getWindow().getViewPaneSize(),
						l = c.data.$.screenX,
						n = c.data.$.screenY,
						t = l - d.x,
						p = n - d.y;
					d = {
						x: l,
						y: n
					};
					h.x += t;
					h.y += p;
					a.move(h.x + e[3] < g ? -e[3] : h.x - e[1] > m.width - k.width - g ? m.width - k.width + ("rtl" == f.lang.dir ? 0 : e[1]) : h.x, h.y + e[0] < g ? -e[0] : h.y - e[2] > m.height - k.height - g ? m.height - k.height + e[2] : h.y, 1);
					c.data.preventDefault()
				}

				function c() {
					CKEDITOR.document.removeListener("mousemove", b);
					CKEDITOR.document.removeListener("mouseup", c);
					if (CKEDITOR.env.ie6Compat) {
						var a = x.getChild(0).getFrameDocument();
						a.removeListener("mousemove", b);
						a.removeListener("mouseup", c)
					}
				}
				var d = null,
					h = null,
					f = a.getParentEditor(),
					g = f.config.dialog_magnetDistance,
					e = CKEDITOR.skin.margins || [0, 0, 0, 0];
				"undefined" == typeof g && (g = 20);
				a.parts.title.on("mousedown", function (f) {
					d = {
						x: f.data.$.screenX,
						y: f.data.$.screenY
					};
					CKEDITOR.document.on("mousemove", b);
					CKEDITOR.document.on("mouseup",
						c);
					h = a.getPosition();
					if (CKEDITOR.env.ie6Compat) {
						var g = x.getChild(0).getFrameDocument();
						g.on("mousemove", b);
						g.on("mouseup", c)
					}
					f.data.preventDefault()
				}, a)
			}

			function h(a) {
				function b(c) {
					var n = "rtl" == f.lang.dir,
						t = l.width,
						p = l.height,
						r = t + (c.data.$.screenX - m.x) * (n ? -1 : 1) * (a._.moved ? 1 : 2),
						w = p + (c.data.$.screenY - m.y) * (a._.moved ? 1 : 2),
						v = a._.element.getFirst(),
						v = n && v.getComputedStyle("right"),
						y = a.getPosition();
					y.y + w > k.height && (w = k.height - y.y);
					(n ? v : y.x) + r > k.width && (r = k.width - (n ? v : y.x));
					if (h == CKEDITOR.DIALOG_RESIZE_WIDTH ||
						h == CKEDITOR.DIALOG_RESIZE_BOTH) t = Math.max(d.minWidth || 0, r - g);
					if (h == CKEDITOR.DIALOG_RESIZE_HEIGHT || h == CKEDITOR.DIALOG_RESIZE_BOTH) p = Math.max(d.minHeight || 0, w - e);
					a.resize(t, p);
					a._.moved || a.layout();
					c.data.preventDefault()
				}

				function c() {
					CKEDITOR.document.removeListener("mouseup", c);
					CKEDITOR.document.removeListener("mousemove", b);
					n && (n.remove(), n = null);
					if (CKEDITOR.env.ie6Compat) {
						var a = x.getChild(0).getFrameDocument();
						a.removeListener("mouseup", c);
						a.removeListener("mousemove", b)
					}
				}
				var d = a.definition,
					h = d.resizable;
				if (h != CKEDITOR.DIALOG_RESIZE_NONE) {
					var f = a.getParentEditor(),
						g, e, k, m, l, n, t = CKEDITOR.tools.addFunction(function (d) {
							l = a.getSize();
							var h = a.parts.contents;
							h.$.getElementsByTagName("iframe").length && (n = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_dialog_resize_cover" style\x3d"height: 100%; position: absolute; width: 100%;"\x3e\x3c/div\x3e'), h.append(n));
							e = l.height - a.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.quirks));
							g = l.width - a.parts.contents.getSize("width",
								1);
							m = {
								x: d.screenX,
								y: d.screenY
							};
							k = CKEDITOR.document.getWindow().getViewPaneSize();
							CKEDITOR.document.on("mousemove", b);
							CKEDITOR.document.on("mouseup", c);
							CKEDITOR.env.ie6Compat && (h = x.getChild(0).getFrameDocument(), h.on("mousemove", b), h.on("mouseup", c));
							d.preventDefault && d.preventDefault()
						});
					a.on("load", function () {
						var b = "";
						h == CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" : h == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical");
						b = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_resizer' +
							b + " cke_resizer_" + f.lang.dir + '" title\x3d"' + CKEDITOR.tools.htmlEncode(f.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + t + ', event )"\x3e' + ("ltr" == f.lang.dir ? "◢" : "◣") + "\x3c/div\x3e");
						a.parts.footer.append(b, 1)
					});
					f.on("destroy", function () {
						CKEDITOR.tools.removeFunction(t)
					})
				}
			}

			function n(a) {
				a.data.preventDefault(1)
			}

			function p(a) {
				var b = CKEDITOR.document.getWindow(),
					c = a.config,
					d = CKEDITOR.skinName || a.config.skin,
					h = c.dialog_backgroundCoverColor || ("moono-lisa" == d ? "black" : "white"),
					d = c.dialog_backgroundCoverOpacity,
					f = c.baseFloatZIndex,
					c = CKEDITOR.tools.genKey(h, d, f),
					g = C[c];
				g ? g.show() : (f = ['\x3cdiv tabIndex\x3d"-1" style\x3d"position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", f, "; top: 0px; left: 0px; ", CKEDITOR.env.ie6Compat ? "" : "background-color: " + h, '" class\x3d"cke_dialog_background_cover"\x3e'], CKEDITOR.env.ie6Compat && (h = "\x3chtml\x3e\x3cbody style\x3d\\'background-color:" + h + ";\\'\x3e\x3c/body\x3e\x3c/html\x3e", f.push('\x3ciframe hidefocus\x3d"true" frameborder\x3d"0" id\x3d"cke_dialog_background_iframe" src\x3d"javascript:'),
						f.push("void((function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.write( '" + h + "' );document.close();") + "})())"), f.push('" style\x3d"position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity\x3d0)"\x3e\x3c/iframe\x3e')), f.push("\x3c/div\x3e"), g = CKEDITOR.dom.element.createFromHtml(f.join("")), g.setOpacity(void 0 !== d ? d : .5), g.on("keydown", n), g.on("keypress", n), g.on("keyup", n), g.appendTo(CKEDITOR.document.getBody()),
					C[c] = g);
				a.focusManager.add(g);
				x = g;
				a = function () {
					var a = b.getViewPaneSize();
					g.setStyles({
						width: a.width + "px",
						height: a.height + "px"
					})
				};
				var e = function () {
					var a = b.getScrollPosition(),
						c = CKEDITOR.dialog._.currentTop;
					g.setStyles({
						left: a.x + "px",
						top: a.y + "px"
					});
					if (c) {
						do a = c.getPosition(), c.move(a.x, a.y); while (c = c._.parentDialog)
					}
				};
				z = a;
				b.on("resize", a);
				a();
				CKEDITOR.env.mac && CKEDITOR.env.webkit || g.focus();
				if (CKEDITOR.env.ie6Compat) {
					var k = function () {
						e();
						arguments.callee.prevScrollHandler.apply(this, arguments)
					};
					b.$.setTimeout(function () {
						k.prevScrollHandler =
							window.onscroll || function () {};
						window.onscroll = k
					}, 0);
					e()
				}
			}

			function q(a) {
				x && (a.focusManager.remove(x), a = CKEDITOR.document.getWindow(), x.hide(), a.removeListener("resize", z), CKEDITOR.env.ie6Compat && a.$.setTimeout(function () {
					window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null
				}, 0), z = null)
			}
			var y = CKEDITOR.tools.cssLength,
				u = '\x3cdiv class\x3d"cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"dialog" aria-labelledby\x3d"cke_dialog_title_{id}"\x3e\x3ctable class\x3d"cke_dialog ' +
				CKEDITOR.env.cssClass + ' cke_{langDir}" style\x3d"position:absolute" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd role\x3d"presentation"\x3e\x3cdiv class\x3d"cke_dialog_body" role\x3d"presentation"\x3e\x3cdiv id\x3d"cke_dialog_title_{id}" class\x3d"cke_dialog_title" role\x3d"presentation"\x3e\x3c/div\x3e\x3ca id\x3d"cke_dialog_close_button_{id}" class\x3d"cke_dialog_close_button" href\x3d"javascript:void(0)" title\x3d"{closeTitle}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e\x3cdiv id\x3d"cke_dialog_tabs_{id}" class\x3d"cke_dialog_tabs" role\x3d"tablist"\x3e\x3c/div\x3e\x3ctable class\x3d"cke_dialog_contents" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_contents_{id}" class\x3d"cke_dialog_contents_body" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_footer_{id}" class\x3d"cke_dialog_footer" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e';
			CKEDITOR.dialog = function (b, d) {
				function f() {
					var a = A._.focusList;
					a.sort(function (a, b) {
						return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex
					});
					for (var b = a.length, c = 0; c < b; c++) a[c].focusIndex = c
				}

				function k(a) {
					var b = A._.focusList;
					a = a || 0;
					if (!(1 > b.length)) {
						var c = A._.currentFocusIndex;
						A._.tabBarMode && 0 > a && (c = 0);
						try {
							b[c].getInputElement().$.blur()
						} catch (d) {}
						var h = c,
							f = 1 < A._.pageCount;
						do {
							h += a;
							if (f && !A._.tabBarMode && (h == b.length || -1 == h)) {
								A._.tabBarMode = !0;
								A._.tabs[A._.currentTabId][0].focus();
								A._.currentFocusIndex = -1;
								return
							}
							h = (h + b.length) % b.length;
							if (h == c) break
						} while (a && !b[h].isFocusable());
						b[h].focus();
						"text" == b[h].type && b[h].select()
					}
				}

				function n(c) {
					if (A == CKEDITOR.dialog._.currentTop) {
						var d = c.data.getKeystroke(),
							h = "rtl" == b.lang.dir,
							f = [37, 38, 39, 40];
						x = z = 0;
						if (9 == d || d == CKEDITOR.SHIFT + 9) k(d == CKEDITOR.SHIFT + 9 ? -1 : 1), x = 1;
						else if (d == CKEDITOR.ALT + 121 && !A._.tabBarMode && 1 < A.getPageCount()) A._.tabBarMode = !0, A._.tabs[A._.currentTabId][0].focus(), A._.currentFocusIndex = -1, x = 1;
						else if (-1 != CKEDITOR.tools.indexOf(f,
								d) && A._.tabBarMode) d = -1 != CKEDITOR.tools.indexOf([h ? 39 : 37, 38], d) ? a.call(A) : e.call(A), A.selectPage(d), A._.tabs[d][0].focus(), x = 1;
						else if (13 != d && 32 != d || !A._.tabBarMode)
							if (13 == d) d = c.data.getTarget(), d.is("a", "button", "select", "textarea") || d.is("input") && "button" == d.$.type || ((d = this.getButton("ok")) && CKEDITOR.tools.setTimeout(d.click, 0, d), x = 1), z = 1;
							else if (27 == d)(d = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(d.click, 0, d) : !1 !== this.fire("cancel", {
							hide: !0
						}).hide && this.hide(), z = 1;
						else return;
						else this.selectPage(this._.currentTabId),
							this._.tabBarMode = !1, this._.currentFocusIndex = -1, k(1), x = 1;
						t(c)
					}
				}

				function t(a) {
					x ? a.data.preventDefault(1) : z && a.data.stopPropagation()
				}
				var p = CKEDITOR.dialog._.dialogDefinitions[d],
					w = CKEDITOR.tools.clone(r),
					y = b.config.dialog_buttonsOrder || "OS",
					B = b.lang.dir,
					q = {},
					x, z;
				("OS" == y && CKEDITOR.env.mac || "rtl" == y && "ltr" == B || "ltr" == y && "rtl" == B) && w.buttons.reverse();
				p = CKEDITOR.tools.extend(p(b), w);
				p = CKEDITOR.tools.clone(p);
				p = new v(this, p);
				w = l(b);
				this._ = {
					editor: b,
					element: w.element,
					name: d,
					contentSize: {
						width: 0,
						height: 0
					},
					size: {
						width: 0,
						height: 0
					},
					contents: {},
					buttons: {},
					accessKeyMap: {},
					tabs: {},
					tabIdList: [],
					currentTabId: null,
					currentTabIndex: null,
					pageCount: 0,
					lastTab: null,
					tabBarMode: !1,
					focusList: [],
					currentFocusIndex: 0,
					hasFocus: !1
				};
				this.parts = w.parts;
				CKEDITOR.tools.setTimeout(function () {
					b.fire("ariaWidget", this.parts.contents)
				}, 0, this);
				w = {
					position: CKEDITOR.env.ie6Compat ? "absolute" : "fixed",
					top: 0,
					visibility: "hidden"
				};
				w["rtl" == B ? "right" : "left"] = 0;
				this.parts.dialog.setStyles(w);
				CKEDITOR.event.call(this);
				this.definition = p = CKEDITOR.fire("dialogDefinition", {
					name: d,
					definition: p
				}, b).definition;
				if (!("removeDialogTabs" in b._) && b.config.removeDialogTabs) {
					w = b.config.removeDialogTabs.split(";");
					for (B = 0; B < w.length; B++)
						if (y = w[B].split(":"), 2 == y.length) {
							var u = y[0];
							q[u] || (q[u] = []);
							q[u].push(y[1])
						}
					b._.removeDialogTabs = q
				}
				if (b._.removeDialogTabs && (q = b._.removeDialogTabs[d]))
					for (B = 0; B < q.length; B++) p.removeContents(q[B]);
				if (p.onLoad) this.on("load", p.onLoad);
				if (p.onShow) this.on("show", p.onShow);
				if (p.onHide) this.on("hide", p.onHide);
				if (p.onOk) this.on("ok", function (a) {
					b.fire("saveSnapshot");
					setTimeout(function () {
						b.fire("saveSnapshot")
					}, 0);
					!1 === p.onOk.call(this, a) && (a.data.hide = !1)
				});
				this.state = CKEDITOR.DIALOG_STATE_IDLE;
				if (p.onCancel) this.on("cancel", function (a) {
					!1 === p.onCancel.call(this, a) && (a.data.hide = !1)
				});
				var A = this,
					O = function (a) {
						var b = A._.contents,
							c = !1,
							d;
						for (d in b)
							for (var h in b[d])
								if (c = a.call(this, b[d][h])) return
					};
				this.on("ok", function (a) {
					O(function (b) {
						if (b.validate) {
							var d = b.validate(this),
								h = "string" == typeof d || !1 === d;
							h && (a.data.hide = !1, a.stop());
							c.call(b, !h, "string" == typeof d ?
								d : void 0);
							return h
						}
					})
				}, this, null, 0);
				this.on("cancel", function (a) {
					O(function (c) {
						if (c.isChanged()) return b.config.dialog_noConfirmCancel || confirm(b.lang.common.confirmCancel) || (a.data.hide = !1), !0
					})
				}, this, null, 0);
				this.parts.close.on("click", function (a) {
					!1 !== this.fire("cancel", {
						hide: !0
					}).hide && this.hide();
					a.data.preventDefault()
				}, this);
				this.changeFocus = k;
				var C = this._.element;
				b.focusManager.add(C, 1);
				this.on("show", function () {
					C.on("keydown", n, this);
					if (CKEDITOR.env.gecko) C.on("keypress", t, this)
				});
				this.on("hide",
					function () {
						C.removeListener("keydown", n);
						CKEDITOR.env.gecko && C.removeListener("keypress", t);
						O(function (a) {
							g.apply(a)
						})
					});
				this.on("iframeAdded", function (a) {
					(new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown", n, this, null, 0)
				});
				this.on("show", function () {
					f();
					var a = 1 < A._.pageCount;
					b.config.dialog_startupFocusTab && a ? (A._.tabBarMode = !0, A._.tabs[A._.currentTabId][0].focus(), A._.currentFocusIndex = -1) : this._.hasFocus || (this._.currentFocusIndex = a ? -1 : this._.focusList.length - 1, p.onFocus ?
						(a = p.onFocus.call(this)) && a.focus() : k(1))
				}, this, null, 4294967295);
				if (CKEDITOR.env.ie6Compat) this.on("load", function () {
					var a = this.getElement(),
						b = a.getFirst();
					b.remove();
					b.appendTo(a)
				}, this);
				m(this);
				h(this);
				(new CKEDITOR.dom.text(p.title, CKEDITOR.document)).appendTo(this.parts.title);
				for (B = 0; B < p.contents.length; B++)(q = p.contents[B]) && this.addPage(q);
				this.parts.tabs.on("click", function (a) {
					var b = a.data.getTarget();
					b.hasClass("cke_dialog_tab") && (b = b.$.id, this.selectPage(b.substring(4, b.lastIndexOf("_"))),
						this._.tabBarMode && (this._.tabBarMode = !1, this._.currentFocusIndex = -1, k(1)), a.data.preventDefault())
				}, this);
				B = [];
				q = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, {
					type: "hbox",
					className: "cke_dialog_footer_buttons",
					widths: [],
					children: p.buttons
				}, B).getChild();
				this.parts.footer.setHtml(B.join(""));
				for (B = 0; B < q.length; B++) this._.buttons[q[B].id] = q[B]
			};
			CKEDITOR.dialog.prototype = {
				destroy: function () {
					this.hide();
					this._.element.remove()
				},
				resize: function () {
					return function (a, b) {
						this._.contentSize && this._.contentSize.width ==
							a && this._.contentSize.height == b || (CKEDITOR.dialog.fire("resize", {
								dialog: this,
								width: a,
								height: b
							}, this._.editor), this.fire("resize", {
								width: a,
								height: b
							}, this._.editor), this.parts.contents.setStyles({
								width: a + "px",
								height: b + "px"
							}), "rtl" == this._.editor.lang.dir && this._.position && (this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10)), this._.contentSize = {
								width: a,
								height: b
							})
					}
				}(),
				getSize: function () {
					var a = this._.element.getFirst();
					return {
						width: a.$.offsetWidth || 0,
						height: a.$.offsetHeight || 0
					}
				},
				move: function (a, b, c) {
					var d = this._.element.getFirst(),
						h = "rtl" == this._.editor.lang.dir,
						f = "fixed" == d.getComputedStyle("position");
					CKEDITOR.env.ie && d.setStyle("zoom", "100%");
					f && this._.position && this._.position.x == a && this._.position.y == b || (this._.position = {
							x: a,
							y: b
						}, f || (f = CKEDITOR.document.getWindow().getScrollPosition(), a += f.x, b += f.y), h && (f = this.getSize(), a = CKEDITOR.document.getWindow().getViewPaneSize().width - f.width - a), b = {
							top: (0 < b ? b : 0) + "px"
						},
						b[h ? "right" : "left"] = (0 < a ? a : 0) + "px", d.setStyles(b), c && (this._.moved = 1))
				},
				getPosition: function () {
					return CKEDITOR.tools.extend({}, this._.position)
				},
				show: function () {
					var a = this._.element,
						b = this.definition;
					a.getParent() && a.getParent().equals(CKEDITOR.document.getBody()) ? a.setStyle("display", "block") : a.appendTo(CKEDITOR.document.getBody());
					this.resize(this._.contentSize && this._.contentSize.width || b.width || b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight);
					this.reset();
					null ===
						this._.currentTabId && this.selectPage(this.definition.contents[0].id);
					null === CKEDITOR.dialog._.currentZIndex && (CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex);
					this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex += 10);
					null === CKEDITOR.dialog._.currentTop ? (CKEDITOR.dialog._.currentTop = this, this._.parentDialog = null, p(this._.editor)) : (this._.parentDialog = CKEDITOR.dialog._.currentTop, this._.parentDialog.getElement().getFirst().$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex /
						2), CKEDITOR.dialog._.currentTop = this);
					a.on("keydown", G);
					a.on("keyup", E);
					this._.hasFocus = !1;
					for (var c in b.contents)
						if (b.contents[c]) {
							var a = b.contents[c],
								d = this._.tabs[a.id],
								h = a.requiredContent,
								g = 0;
							if (d) {
								for (var e in this._.contents[a.id]) {
									var k = this._.contents[a.id][e];
									"hbox" != k.type && "vbox" != k.type && k.getInputElement() && (k.requiredContent && !this._.editor.activeFilter.check(k.requiredContent) ? k.disable() : (k.enable(), g++))
								}!g || h && !this._.editor.activeFilter.check(h) ? d[0].addClass("cke_dialog_tab_disabled") :
									d[0].removeClass("cke_dialog_tab_disabled")
							}
						}
					CKEDITOR.tools.setTimeout(function () {
						this.layout();
						f(this);
						this.parts.dialog.setStyle("visibility", "");
						this.fireOnce("load", {});
						CKEDITOR.ui.fire("ready", this);
						this.fire("show", {});
						this._.editor.fire("dialogShow", this);
						this._.parentDialog || this._.editor.focusManager.lock();
						this.foreach(function (a) {
							a.setInitValue && a.setInitValue()
						})
					}, 100, this)
				},
				layout: function () {
					var a = this.parts.dialog,
						b = this.getSize(),
						c = CKEDITOR.document.getWindow().getViewPaneSize(),
						d =
						(c.width - b.width) / 2,
						h = (c.height - b.height) / 2;
					CKEDITOR.env.ie6Compat || (b.height + (0 < h ? h : 0) > c.height || b.width + (0 < d ? d : 0) > c.width ? a.setStyle("position", "absolute") : a.setStyle("position", "fixed"));
					this.move(this._.moved ? this._.position.x : d, this._.moved ? this._.position.y : h)
				},
				foreach: function (a) {
					for (var b in this._.contents)
						for (var c in this._.contents[b]) a.call(this, this._.contents[b][c]);
					return this
				},
				reset: function () {
					var a = function (a) {
						a.reset && a.reset(1)
					};
					return function () {
						this.foreach(a);
						return this
					}
				}(),
				setupContent: function () {
					var a = arguments;
					this.foreach(function (b) {
						b.setup && b.setup.apply(b, a)
					})
				},
				commitContent: function () {
					var a = arguments;
					this.foreach(function (b) {
						CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur();
						b.commit && b.commit.apply(b, a)
					})
				},
				hide: function () {
					if (this.parts.dialog.isVisible()) {
						this.fire("hide", {});
						this._.editor.fire("dialogHide", this);
						this.selectPage(this._.tabIdList[0]);
						var a = this._.element;
						a.setStyle("display", "none");
						this.parts.dialog.setStyle("visibility",
							"hidden");
						for (I(this); CKEDITOR.dialog._.currentTop != this;) CKEDITOR.dialog._.currentTop.hide();
						if (this._.parentDialog) {
							var b = this._.parentDialog.getElement().getFirst();
							b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2))
						} else q(this._.editor);
						if (CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex -= 10;
						else {
							CKEDITOR.dialog._.currentZIndex = null;
							a.removeListener("keydown", G);
							a.removeListener("keyup", E);
							var c = this._.editor;
							c.focus();
							setTimeout(function () {
								c.focusManager.unlock();
								CKEDITOR.env.iOS && c.window.focus()
							}, 0)
						}
						delete this._.parentDialog;
						this.foreach(function (a) {
							a.resetInitValue && a.resetInitValue()
						});
						this.setState(CKEDITOR.DIALOG_STATE_IDLE)
					}
				},
				addPage: function (a) {
					if (!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
						for (var b = [], c = a.label ? ' title\x3d"' + CKEDITOR.tools.htmlEncode(a.label) + '"' : "", d = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, {
								type: "vbox",
								className: "cke_dialog_page_contents",
								children: a.elements,
								expand: !!a.expand,
								padding: a.padding,
								style: a.style || "width: 100%;"
							}, b), h = this._.contents[a.id] = {}, f = d.getChild(), g = 0; d = f.shift();) d.notAllowed || "hbox" == d.type || "vbox" == d.type || g++, h[d.id] = d, "function" == typeof d.getChild && f.push.apply(f, d.getChild());
						g || (a.hidden = !0);
						b = CKEDITOR.dom.element.createFromHtml(b.join(""));
						b.setAttribute("role", "tabpanel");
						d = CKEDITOR.env;
						h = "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber();
						c = CKEDITOR.dom.element.createFromHtml(['\x3ca class\x3d"cke_dialog_tab"',
							0 < this._.pageCount ? " cke_last" : "cke_first", c, a.hidden ? ' style\x3d"display:none"' : "", ' id\x3d"', h, '"', d.gecko && !d.hc ? "" : ' href\x3d"javascript:void(0)"', ' tabIndex\x3d"-1" hidefocus\x3d"true" role\x3d"tab"\x3e', a.label, "\x3c/a\x3e"
						].join(""));
						b.setAttribute("aria-labelledby", h);
						this._.tabs[a.id] = [c, b];
						this._.tabIdList.push(a.id);
						!a.hidden && this._.pageCount++;
						this._.lastTab = c;
						this.updateStyle();
						b.setAttribute("name", a.id);
						b.appendTo(this.parts.contents);
						c.unselectable();
						this.parts.tabs.append(c);
						a.accessKey &&
							(D(this, this, "CTRL+" + a.accessKey, J, H), this._.accessKeyMap["CTRL+" + a.accessKey] = a.id)
					}
				},
				selectPage: function (a) {
					if (this._.currentTabId != a && !this._.tabs[a][0].hasClass("cke_dialog_tab_disabled") && !1 !== this.fire("selectPage", {
							page: a,
							currentPage: this._.currentTabId
						})) {
						for (var c in this._.tabs) {
							var d = this._.tabs[c][0],
								h = this._.tabs[c][1];
							c != a && (d.removeClass("cke_dialog_tab_selected"), h.hide());
							h.setAttribute("aria-hidden", c != a)
						}
						var f = this._.tabs[a];
						f[0].addClass("cke_dialog_tab_selected");
						CKEDITOR.env.ie6Compat ||
							CKEDITOR.env.ie7Compat ? (b(f[1]), f[1].show(), setTimeout(function () {
								b(f[1], 1)
							}, 0)) : f[1].show();
						this._.currentTabId = a;
						this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a)
					}
				},
				updateStyle: function () {
					this.parts.dialog[(1 === this._.pageCount ? "add" : "remove") + "Class"]("cke_single_page")
				},
				hidePage: function (b) {
					var c = this._.tabs[b] && this._.tabs[b][0];
					c && 1 != this._.pageCount && c.isVisible() && (b == this._.currentTabId && this.selectPage(a.call(this)), c.hide(), this._.pageCount--, this.updateStyle())
				},
				showPage: function (a) {
					if (a =
						this._.tabs[a] && this._.tabs[a][0]) a.show(), this._.pageCount++, this.updateStyle()
				},
				getElement: function () {
					return this._.element
				},
				getName: function () {
					return this._.name
				},
				getContentElement: function (a, b) {
					var c = this._.contents[a];
					return c && c[b]
				},
				getValueOf: function (a, b) {
					return this.getContentElement(a, b).getValue()
				},
				setValueOf: function (a, b, c) {
					return this.getContentElement(a, b).setValue(c)
				},
				getButton: function (a) {
					return this._.buttons[a]
				},
				click: function (a) {
					return this._.buttons[a].click()
				},
				disableButton: function (a) {
					return this._.buttons[a].disable()
				},
				enableButton: function (a) {
					return this._.buttons[a].enable()
				},
				getPageCount: function () {
					return this._.pageCount
				},
				getParentEditor: function () {
					return this._.editor
				},
				getSelectedElement: function () {
					return this.getParentEditor().getSelection().getSelectedElement()
				},
				addFocusable: function (a, b) {
					if ("undefined" == typeof b) b = this._.focusList.length, this._.focusList.push(new k(this, a, b));
					else {
						this._.focusList.splice(b, 0, new k(this, a, b));
						for (var c = b + 1; c < this._.focusList.length; c++) this._.focusList[c].focusIndex++
					}
				},
				setState: function (a) {
					if (this.state != a) {
						this.state = a;
						if (a == CKEDITOR.DIALOG_STATE_BUSY) {
							if (!this.parts.spinner) {
								var b = this.getParentEditor().lang.dir,
									c = {
										attributes: {
											"class": "cke_dialog_spinner"
										},
										styles: {
											"float": "rtl" == b ? "right" : "left"
										}
									};
								c.styles["margin-" + ("rtl" == b ? "left" : "right")] = "8px";
								this.parts.spinner = CKEDITOR.document.createElement("div", c);
								this.parts.spinner.setHtml("\x26#8987;");
								this.parts.spinner.appendTo(this.parts.title, 1)
							}
							this.parts.spinner.show();
							this.getButton("ok").disable()
						} else a ==
							CKEDITOR.DIALOG_STATE_IDLE && (this.parts.spinner && this.parts.spinner.hide(), this.getButton("ok").enable());
						this.fire("state", a)
					}
				}
			};
			CKEDITOR.tools.extend(CKEDITOR.dialog, {
				add: function (a, b) {
					this._.dialogDefinitions[a] && "function" != typeof b || (this._.dialogDefinitions[a] = b)
				},
				exists: function (a) {
					return !!this._.dialogDefinitions[a]
				},
				getCurrent: function () {
					return CKEDITOR.dialog._.currentTop
				},
				isTabEnabled: function (a, b, c) {
					a = a.config.removeDialogTabs;
					return !(a && a.match(new RegExp("(?:^|;)" + b + ":" + c + "(?:$|;)",
						"i")))
				},
				okButton: function () {
					var a = function (a, b) {
						b = b || {};
						return CKEDITOR.tools.extend({
							id: "ok",
							type: "button",
							label: a.lang.common.ok,
							"class": "cke_dialog_ui_button_ok",
							onClick: function (a) {
								a = a.data.dialog;
								!1 !== a.fire("ok", {
									hide: !0
								}).hide && a.hide()
							}
						}, b, !0)
					};
					a.type = "button";
					a.override = function (b) {
						return CKEDITOR.tools.extend(function (c) {
							return a(c, b)
						}, {
							type: "button"
						}, !0)
					};
					return a
				}(),
				cancelButton: function () {
					var a = function (a, b) {
						b = b || {};
						return CKEDITOR.tools.extend({
							id: "cancel",
							type: "button",
							label: a.lang.common.cancel,
							"class": "cke_dialog_ui_button_cancel",
							onClick: function (a) {
								a = a.data.dialog;
								!1 !== a.fire("cancel", {
									hide: !0
								}).hide && a.hide()
							}
						}, b, !0)
					};
					a.type = "button";
					a.override = function (b) {
						return CKEDITOR.tools.extend(function (c) {
							return a(c, b)
						}, {
							type: "button"
						}, !0)
					};
					return a
				}(),
				addUIElement: function (a, b) {
					this._.uiElementBuilders[a] = b
				}
			});
			CKEDITOR.dialog._ = {
				uiElementBuilders: {},
				dialogDefinitions: {},
				currentTop: null,
				currentZIndex: null
			};
			CKEDITOR.event.implementOn(CKEDITOR.dialog);
			CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
			var r = {
					resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
					minWidth: 600,
					minHeight: 400,
					buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton]
				},
				w = function (a, b, c) {
					for (var d = 0, h; h = a[d]; d++)
						if (h.id == b || c && h[c] && (h = w(h[c], b, c))) return h;
					return null
				},
				t = function (a, b, c, d, h) {
					if (c) {
						for (var f = 0, g; g = a[f]; f++) {
							if (g.id == c) return a.splice(f, 0, b), b;
							if (d && g[d] && (g = t(g[d], b, c, d, !0))) return g
						}
						if (h) return null
					}
					a.push(b);
					return b
				},
				B = function (a, b, c) {
					for (var d = 0, h; h = a[d]; d++) {
						if (h.id == b) return a.splice(d, 1);
						if (c && h[c] && (h = B(h[c],
								b, c))) return h
					}
					return null
				},
				v = function (a, b) {
					this.dialog = a;
					for (var c = b.contents, h = 0, f; f = c[h]; h++) c[h] = f && new d(a, f);
					CKEDITOR.tools.extend(this, b)
				};
			v.prototype = {
				getContents: function (a) {
					return w(this.contents, a)
				},
				getButton: function (a) {
					return w(this.buttons, a)
				},
				addContents: function (a, b) {
					return t(this.contents, a, b)
				},
				addButton: function (a, b) {
					return t(this.buttons, a, b)
				},
				removeContents: function (a) {
					B(this.contents, a)
				},
				removeButton: function (a) {
					B(this.buttons, a)
				}
			};
			d.prototype = {
				get: function (a) {
					return w(this.elements,
						a, "children")
				},
				add: function (a, b) {
					return t(this.elements, a, b, "children")
				},
				remove: function (a) {
					B(this.elements, a, "children")
				}
			};
			var z, C = {},
				x, A = {},
				G = function (a) {
					var b = a.data.$.ctrlKey || a.data.$.metaKey,
						c = a.data.$.altKey,
						d = a.data.$.shiftKey,
						h = String.fromCharCode(a.data.$.keyCode);
					(b = A[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + h]) && b.length && (b = b[b.length - 1], b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key), a.data.preventDefault())
				},
				E = function (a) {
					var b = a.data.$.ctrlKey || a.data.$.metaKey,
						c = a.data.$.altKey,
						d = a.data.$.shiftKey,
						h = String.fromCharCode(a.data.$.keyCode);
					(b = A[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + h]) && b.length && (b = b[b.length - 1], b.keyup && (b.keyup.call(b.uiElement, b.dialog, b.key), a.data.preventDefault()))
				},
				D = function (a, b, c, d, h) {
					(A[c] || (A[c] = [])).push({
						uiElement: a,
						dialog: b,
						key: c,
						keyup: h || a.accessKeyUp,
						keydown: d || a.accessKeyDown
					})
				},
				I = function (a) {
					for (var b in A) {
						for (var c = A[b], d = c.length - 1; 0 <= d; d--) c[d].dialog != a && c[d].uiElement != a || c.splice(d, 1);
						0 === c.length && delete A[b]
					}
				},
				H = function (a,
					b) {
					a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b])
				},
				J = function () {};
			(function () {
				CKEDITOR.ui.dialog = {
					uiElement: function (a, b, c, d, h, f, g) {
						if (!(4 > arguments.length)) {
							var e = (d.call ? d(b) : d) || "div",
								k = ["\x3c", e, " "],
								m = (h && h.call ? h(b) : h) || {},
								l = (f && f.call ? f(b) : f) || {},
								n = (g && g.call ? g.call(this, a, b) : g) || "",
								t = this.domId = l.id || CKEDITOR.tools.getNextId() + "_uiElement";
							b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent) && (m.display = "none", this.notAllowed = !0);
							l.id = t;
							var p = {};
							b.type && (p["cke_dialog_ui_" +
								b.type] = 1);
							b.className && (p[b.className] = 1);
							b.disabled && (p.cke_disabled = 1);
							for (var w = l["class"] && l["class"].split ? l["class"].split(" ") : [], t = 0; t < w.length; t++) w[t] && (p[w[t]] = 1);
							w = [];
							for (t in p) w.push(t);
							l["class"] = w.join(" ");
							b.title && (l.title = b.title);
							p = (b.style || "").split(";");
							b.align && (w = b.align, m["margin-left"] = "left" == w ? 0 : "auto", m["margin-right"] = "right" == w ? 0 : "auto");
							for (t in m) p.push(t + ":" + m[t]);
							b.hidden && p.push("display:none");
							for (t = p.length - 1; 0 <= t; t--) "" === p[t] && p.splice(t, 1);
							0 < p.length && (l.style =
								(l.style ? l.style + "; " : "") + p.join("; "));
							for (t in l) k.push(t + '\x3d"' + CKEDITOR.tools.htmlEncode(l[t]) + '" ');
							k.push("\x3e", n, "\x3c/", e, "\x3e");
							c.push(k.join(""));
							(this._ || (this._ = {})).dialog = a;
							"boolean" == typeof b.isChanged && (this.isChanged = function () {
								return b.isChanged
							});
							"function" == typeof b.isChanged && (this.isChanged = b.isChanged);
							"function" == typeof b.setValue && (this.setValue = CKEDITOR.tools.override(this.setValue, function (a) {
								return function (c) {
									a.call(this, b.setValue.call(this, c))
								}
							}));
							"function" == typeof b.getValue &&
								(this.getValue = CKEDITOR.tools.override(this.getValue, function (a) {
									return function () {
										return b.getValue.call(this, a.call(this))
									}
								}));
							CKEDITOR.event.implementOn(this);
							this.registerEvents(b);
							this.accessKeyUp && this.accessKeyDown && b.accessKey && D(this, a, "CTRL+" + b.accessKey);
							var r = this;
							a.on("load", function () {
								var b = r.getInputElement();
								if (b) {
									var c = r.type in {
										checkbox: 1,
										ratio: 1
									} && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? "cke_dialog_ui_focused" : "";
									b.on("focus", function () {
										a._.tabBarMode = !1;
										a._.hasFocus = !0;
										r.fire("focus");
										c && this.addClass(c)
									});
									b.on("blur", function () {
										r.fire("blur");
										c && this.removeClass(c)
									})
								}
							});
							CKEDITOR.tools.extend(this, b);
							this.keyboardFocusable && (this.tabIndex = b.tabIndex || 0, this.focusIndex = a._.focusList.push(this) - 1, this.on("focus", function () {
								a._.currentFocusIndex = r.focusIndex
							}))
						}
					},
					hbox: function (a, b, c, d, h) {
						if (!(4 > arguments.length)) {
							this._ || (this._ = {});
							var f = this._.children = b,
								g = h && h.widths || null,
								e = h && h.height || null,
								k, m = {
									role: "presentation"
								};
							h && h.align && (m.align = h.align);
							CKEDITOR.ui.dialog.uiElement.call(this,
								a, h || {
									type: "hbox"
								}, d, "table", {}, m,
								function () {
									var a = ['\x3ctbody\x3e\x3ctr class\x3d"cke_dialog_ui_hbox"\x3e'];
									for (k = 0; k < c.length; k++) {
										var b = "cke_dialog_ui_hbox_child",
											d = [];
										0 === k && (b = "cke_dialog_ui_hbox_first");
										k == c.length - 1 && (b = "cke_dialog_ui_hbox_last");
										a.push('\x3ctd class\x3d"', b, '" role\x3d"presentation" ');
										g ? g[k] && d.push("width:" + y(g[k])) : d.push("width:" + Math.floor(100 / c.length) + "%");
										e && d.push("height:" + y(e));
										h && void 0 !== h.padding && d.push("padding:" + y(h.padding));
										CKEDITOR.env.ie && CKEDITOR.env.quirks &&
											f[k].align && d.push("text-align:" + f[k].align);
										0 < d.length && a.push('style\x3d"' + d.join("; ") + '" ');
										a.push("\x3e", c[k], "\x3c/td\x3e")
									}
									a.push("\x3c/tr\x3e\x3c/tbody\x3e");
									return a.join("")
								})
						}
					},
					vbox: function (a, b, c, d, h) {
						if (!(3 > arguments.length)) {
							this._ || (this._ = {});
							var f = this._.children = b,
								g = h && h.width || null,
								e = h && h.heights || null;
							CKEDITOR.ui.dialog.uiElement.call(this, a, h || {
								type: "vbox"
							}, d, "div", null, {
								role: "presentation"
							}, function () {
								var b = ['\x3ctable role\x3d"presentation" cellspacing\x3d"0" border\x3d"0" '];
								b.push('style\x3d"');
								h && h.expand && b.push("height:100%;");
								b.push("width:" + y(g || "100%"), ";");
								CKEDITOR.env.webkit && b.push("float:none;");
								b.push('"');
								b.push('align\x3d"', CKEDITOR.tools.htmlEncode(h && h.align || ("ltr" == a.getParentEditor().lang.dir ? "left" : "right")), '" ');
								b.push("\x3e\x3ctbody\x3e");
								for (var d = 0; d < c.length; d++) {
									var k = [];
									b.push('\x3ctr\x3e\x3ctd role\x3d"presentation" ');
									g && k.push("width:" + y(g || "100%"));
									e ? k.push("height:" + y(e[d])) : h && h.expand && k.push("height:" + Math.floor(100 / c.length) + "%");
									h && void 0 !== h.padding && k.push("padding:" + y(h.padding));
									CKEDITOR.env.ie && CKEDITOR.env.quirks && f[d].align && k.push("text-align:" + f[d].align);
									0 < k.length && b.push('style\x3d"', k.join("; "), '" ');
									b.push(' class\x3d"cke_dialog_ui_vbox_child"\x3e', c[d], "\x3c/td\x3e\x3c/tr\x3e")
								}
								b.push("\x3c/tbody\x3e\x3c/table\x3e");
								return b.join("")
							})
						}
					}
				}
			})();
			CKEDITOR.ui.dialog.uiElement.prototype = {
				getElement: function () {
					return CKEDITOR.document.getById(this.domId)
				},
				getInputElement: function () {
					return this.getElement()
				},
				getDialog: function () {
					return this._.dialog
				},
				setValue: function (a, b) {
					this.getInputElement().setValue(a);
					!b && this.fire("change", {
						value: a
					});
					return this
				},
				getValue: function () {
					return this.getInputElement().getValue()
				},
				isChanged: function () {
					return !1
				},
				selectParentTab: function () {
					for (var a = this.getInputElement();
						(a = a.getParent()) && -1 == a.$.className.search("cke_dialog_page_contents"););
					if (!a) return this;
					a = a.getAttribute("name");
					this._.dialog._.currentTabId != a && this._.dialog.selectPage(a);
					return this
				},
				focus: function () {
					this.selectParentTab().getInputElement().focus();
					return this
				},
				registerEvents: function (a) {
					var b = /^on([A-Z]\w+)/,
						c, d = function (a, b, c, d) {
							b.on("load", function () {
								a.getInputElement().on(c, d, a)
							})
						},
						h;
					for (h in a)
						if (c = h.match(b)) this.eventProcessors[h] ? this.eventProcessors[h].call(this, this._.dialog, a[h]) : d(this, this._.dialog, c[1].toLowerCase(), a[h]);
					return this
				},
				eventProcessors: {
					onLoad: function (a, b) {
						a.on("load", b, this)
					},
					onShow: function (a, b) {
						a.on("show", b, this)
					},
					onHide: function (a, b) {
						a.on("hide", b, this)
					}
				},
				accessKeyDown: function () {
					this.focus()
				},
				accessKeyUp: function () {},
				disable: function () {
					var a = this.getElement();
					this.getInputElement().setAttribute("disabled", "true");
					a.addClass("cke_disabled")
				},
				enable: function () {
					var a = this.getElement();
					this.getInputElement().removeAttribute("disabled");
					a.removeClass("cke_disabled")
				},
				isEnabled: function () {
					return !this.getElement().hasClass("cke_disabled")
				},
				isVisible: function () {
					return this.getInputElement().isVisible()
				},
				isFocusable: function () {
					return this.isEnabled() && this.isVisible() ? !0 : !1
				}
			};
			CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
				getChild: function (a) {
					if (1 > arguments.length) return this._.children.concat();
					a.splice || (a = [a]);
					return 2 > a.length ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null
				}
			}, !0);
			CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox;
			(function () {
				var a = {
					build: function (a, b, c) {
						for (var d = b.children, h, f = [], g = [], e = 0; e < d.length && (h = d[e]); e++) {
							var k = [];
							f.push(k);
							g.push(CKEDITOR.dialog._.uiElementBuilders[h.type].build(a, h, k))
						}
						return new CKEDITOR.ui.dialog[b.type](a,
							g, f, c, b)
					}
				};
				CKEDITOR.dialog.addUIElement("hbox", a);
				CKEDITOR.dialog.addUIElement("vbox", a)
			})();
			CKEDITOR.dialogCommand = function (a, b) {
				this.dialogName = a;
				CKEDITOR.tools.extend(this, b, !0)
			};
			CKEDITOR.dialogCommand.prototype = {
				exec: function (a) {
					var b = this.tabId;
					a.openDialog(this.dialogName, function (a) {
						b && a.selectPage(b)
					})
				},
				canUndo: !1,
				editorFocus: 1
			};
			(function () {
				var a = /^([a]|[^a])+$/,
					b = /^\d*$/,
					c = /^\d*(?:\.\d+)?$/,
					d = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/,
					h = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
					f = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;
				CKEDITOR.VALIDATE_OR = 1;
				CKEDITOR.VALIDATE_AND = 2;
				CKEDITOR.dialog.validate = {
					functions: function () {
						var a = arguments;
						return function () {
							var b = this && this.getValue ? this.getValue() : a[0],
								c, d = CKEDITOR.VALIDATE_AND,
								h = [],
								f;
							for (f = 0; f < a.length; f++)
								if ("function" == typeof a[f]) h.push(a[f]);
								else break;
							f < a.length && "string" == typeof a[f] && (c = a[f], f++);
							f < a.length && "number" == typeof a[f] && (d = a[f]);
							var g = d == CKEDITOR.VALIDATE_AND ? !0 : !1;
							for (f = 0; f < h.length; f++) g = d == CKEDITOR.VALIDATE_AND ? g &&
								h[f](b) : g || h[f](b);
							return g ? !0 : c
						}
					},
					regex: function (a, b) {
						return function (c) {
							c = this && this.getValue ? this.getValue() : c;
							return a.test(c) ? !0 : b
						}
					},
					notEmpty: function (b) {
						return this.regex(a, b)
					},
					integer: function (a) {
						return this.regex(b, a)
					},
					number: function (a) {
						return this.regex(c, a)
					},
					cssLength: function (a) {
						return this.functions(function (a) {
							return h.test(CKEDITOR.tools.trim(a))
						}, a)
					},
					htmlLength: function (a) {
						return this.functions(function (a) {
							return d.test(CKEDITOR.tools.trim(a))
						}, a)
					},
					inlineStyle: function (a) {
						return this.functions(function (a) {
								return f.test(CKEDITOR.tools.trim(a))
							},
							a)
					},
					equals: function (a, b) {
						return this.functions(function (b) {
							return b == a
						}, b)
					},
					notEqual: function (a, b) {
						return this.functions(function (b) {
							return b != a
						}, b)
					}
				};
				CKEDITOR.on("instanceDestroyed", function (a) {
					if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) {
						for (var b; b = CKEDITOR.dialog._.currentTop;) b.hide();
						for (var c in C) C[c].remove();
						C = {}
					}
					a = a.editor._.storedDialogs;
					for (var d in a) a[d].destroy()
				})
			})();
			CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
				openDialog: function (a, b) {
					var c = null,
						d = CKEDITOR.dialog._.dialogDefinitions[a];
					null === CKEDITOR.dialog._.currentTop && p(this);
					if ("function" == typeof d) c = this._.storedDialogs || (this._.storedDialogs = {}), c = c[a] || (c[a] = new CKEDITOR.dialog(this, a)), b && b.call(c, c), c.show();
					else {
						if ("failed" == d) throw q(this), Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.');
						"string" == typeof d && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d), function () {
							"function" != typeof CKEDITOR.dialog._.dialogDefinitions[a] && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed");
							this.openDialog(a,
								b)
						}, this, 0, 1)
					}
					CKEDITOR.skin.loadPart("dialog");
					return c
				}
			})
		}(), CKEDITOR.plugins.add("dialog", {
			requires: "dialogui",
			init: function (a) {
				a.on("doubleclick", function (e) {
					e.data.dialog && a.openDialog(e.data.dialog)
				}, null, null, 999)
			}
		}),
		function () {
			CKEDITOR.plugins.add("a11yhelp", {
				requires: "dialog",
				availableLangs: {
					af: 1,
					ar: 1,
					az: 1,
					bg: 1,
					ca: 1,
					cs: 1,
					cy: 1,
					da: 1,
					de: 1,
					"de-ch": 1,
					el: 1,
					en: 1,
					"en-au": 1,
					"en-gb": 1,
					eo: 1,
					es: 1,
					"es-mx": 1,
					et: 1,
					eu: 1,
					fa: 1,
					fi: 1,
					fo: 1,
					fr: 1,
					"fr-ca": 1,
					gl: 1,
					gu: 1,
					he: 1,
					hi: 1,
					hr: 1,
					hu: 1,
					id: 1,
					it: 1,
					ja: 1,
					km: 1,
					ko: 1,
					ku: 1,
					lt: 1,
					lv: 1,
					mk: 1,
					mn: 1,
					nb: 1,
					nl: 1,
					no: 1,
					oc: 1,
					pl: 1,
					pt: 1,
					"pt-br": 1,
					ro: 1,
					ru: 1,
					si: 1,
					sk: 1,
					sl: 1,
					sq: 1,
					sr: 1,
					"sr-latn": 1,
					sv: 1,
					th: 1,
					tr: 1,
					tt: 1,
					ug: 1,
					uk: 1,
					vi: 1,
					zh: 1,
					"zh-cn": 1
				},
				init: function (a) {
					var e = this;
					a.addCommand("a11yHelp", {
						exec: function () {
							var b = a.langCode,
								b = e.availableLangs[b] ? b : e.availableLangs[b.replace(/-.*/, "")] ? b.replace(/-.*/, "") : "en";
							CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e.path + "dialogs/lang/" + b + ".js"), function () {
								a.lang.a11yhelp = e.langEntries[b];
								a.openDialog("a11yHelp")
							})
						},
						modes: {
							wysiwyg: 1,
							source: 1
						},
						readOnly: 1,
						canUndo: !1
					});
					a.setKeystroke(CKEDITOR.ALT + 48, "a11yHelp");
					CKEDITOR.dialog.add("a11yHelp", this.path + "dialogs/a11yhelp.js");
					a.on("ariaEditorHelpLabel", function (b) {
						b.data.label = a.lang.common.editorHelp
					})
				}
			})
		}(), CKEDITOR.plugins.add("about", {
			requires: "dialog",
			init: function (a) {
				var e = a.addCommand("about", new CKEDITOR.dialogCommand("about"));
				e.modes = {
					wysiwyg: 1,
					source: 1
				};
				e.canUndo = !1;
				e.readOnly = 1;
				a.ui.addButton && a.ui.addButton("About", {
					label: a.lang.about.dlgTitle,
					command: "about",
					toolbar: "about"
				});
				CKEDITOR.dialog.add("about", this.path + "dialogs/about.js")
			}
		}), CKEDITOR.plugins.add("basicstyles", {
			init: function (a) {
				var e = 0,
					b = function (b, f, d, g) {
						if (g) {
							g = new CKEDITOR.style(g);
							var h = c[d];
							h.unshift(g);
							a.attachStyleStateChange(g, function (b) {
								!a.readOnly && a.getCommand(d).setState(b)
							});
							a.addCommand(d, new CKEDITOR.styleCommand(g, {
								contentForms: h
							}));
							a.ui.addButton && a.ui.addButton(b, {
								label: f,
								command: d,
								toolbar: "basicstyles," + (e += 10)
							})
						}
					},
					c = {
						bold: ["strong", "b", ["span", function (a) {
							a = a.styles["font-weight"];
							return "bold" ==
								a || 700 <= +a
						}]],
						italic: ["em", "i", ["span", function (a) {
							return "italic" == a.styles["font-style"]
						}]],
						underline: ["u", ["span", function (a) {
							return "underline" == a.styles["text-decoration"]
						}]],
						strike: ["s", "strike", ["span", function (a) {
							return "line-through" == a.styles["text-decoration"]
						}]],
						subscript: ["sub"],
						superscript: ["sup"]
					},
					g = a.config,
					l = a.lang.basicstyles;
				b("Bold", l.bold, "bold", g.coreStyles_bold);
				b("Italic", l.italic, "italic", g.coreStyles_italic);
				b("Underline", l.underline, "underline", g.coreStyles_underline);
				b("Strike",
					l.strike, "strike", g.coreStyles_strike);
				b("Subscript", l.subscript, "subscript", g.coreStyles_subscript);
				b("Superscript", l.superscript, "superscript", g.coreStyles_superscript);
				a.setKeystroke([
					[CKEDITOR.CTRL + 66, "bold"],
					[CKEDITOR.CTRL + 73, "italic"],
					[CKEDITOR.CTRL + 85, "underline"]
				])
			}
		}), CKEDITOR.config.coreStyles_bold = {
			element: "strong",
			overrides: "b"
		}, CKEDITOR.config.coreStyles_italic = {
			element: "em",
			overrides: "i"
		}, CKEDITOR.config.coreStyles_underline = {
			element: "u"
		}, CKEDITOR.config.coreStyles_strike = {
			element: "s",
			overrides: "strike"
		}, CKEDITOR.config.coreStyles_subscript = {
			element: "sub"
		}, CKEDITOR.config.coreStyles_superscript = {
			element: "sup"
		},
		function () {
			function a(a, b, c, d) {
				if (!a.isReadOnly() && !a.equals(c.editable())) {
					CKEDITOR.dom.element.setMarker(d, a, "bidi_processed", 1);
					d = a;
					for (var f = c.editable();
						(d = d.getParent()) && !d.equals(f);)
						if (d.getCustomData("bidi_processed")) {
							a.removeStyle("direction");
							a.removeAttribute("dir");
							return
						}
					d = "useComputedState" in c.config ? c.config.useComputedState : 1;
					(d ? a.getComputedStyle("direction") :
						a.getStyle("direction") || a.hasAttribute("dir")) != b && (a.removeStyle("direction"), d ? (a.removeAttribute("dir"), b != a.getComputedStyle("direction") && a.setAttribute("dir", b)) : a.setAttribute("dir", b), c.forceNextSelectionCheck())
				}
			}

			function e(a, b, c) {
				var d = a.getCommonAncestor(!1, !0);
				a = a.clone();
				a.enlarge(c == CKEDITOR.ENTER_BR ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
				if (a.checkBoundaryOfElement(d, CKEDITOR.START) && a.checkBoundaryOfElement(d, CKEDITOR.END)) {
					for (var f; d && d.type == CKEDITOR.NODE_ELEMENT &&
						(f = d.getParent()) && 1 == f.getChildCount() && !(d.getName() in b);) d = f;
					return d.type == CKEDITOR.NODE_ELEMENT && d.getName() in b && d
				}
			}

			function b(b) {
				return {
					context: "p",
					allowedContent: {
						"h1 h2 h3 h4 h5 h6 table ul ol blockquote div tr p div li td": {
							propertiesOnly: !0,
							attributes: "dir"
						}
					},
					requiredContent: "p[dir]",
					refresh: function (a, b) {
						var c = a.config.useComputedState,
							d, c = void 0 === c || c;
						if (!c) {
							d = b.lastElement;
							for (var h = a.editable(); d && !(d.getName() in k || d.equals(h));) {
								var f = d.getParent();
								if (!f) break;
								d = f
							}
						}
						d = d || b.block ||
							b.blockLimit;
						d.equals(a.editable()) && (h = a.getSelection().getRanges()[0].getEnclosedNode()) && h.type == CKEDITOR.NODE_ELEMENT && (d = h);
						d && (c = c ? d.getComputedStyle("direction") : d.getStyle("direction") || d.getAttribute("dir"), a.getCommand("bidirtl").setState("rtl" == c ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF), a.getCommand("bidiltr").setState("ltr" == c ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF));
						c = (b.block || b.blockLimit || a.editable()).getDirection(1);
						c != (a._.selDir || a.lang.dir) && (a._.selDir = c, a.fire("contentDirChanged",
							c))
					},
					exec: function (c) {
						var d = c.getSelection(),
							f = c.config.enterMode,
							k = d.getRanges();
						if (k && k.length) {
							for (var m = {}, r = d.createBookmarks(), k = k.createIterator(), w, t = 0; w = k.getNextRange(1);) {
								var B = w.getEnclosedNode();
								B && (!B || B.type == CKEDITOR.NODE_ELEMENT && B.getName() in l) || (B = e(w, g, f));
								B && a(B, b, c, m);
								var v = new CKEDITOR.dom.walker(w),
									z = r[t].startNode,
									C = r[t++].endNode;
								v.evaluator = function (a) {
									var b = f == CKEDITOR.ENTER_P ? "p" : "div",
										c;
									if (c = (a ? a.type == CKEDITOR.NODE_ELEMENT : !1) && a.getName() in g) {
										if (b = a.is(b)) b = (b = a.getParent()) ?
											b.type == CKEDITOR.NODE_ELEMENT : !1;
										c = !(b && a.getParent().is("blockquote"))
									}
									return !!(c && a.getPosition(z) & CKEDITOR.POSITION_FOLLOWING && (a.getPosition(C) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_CONTAINS) == CKEDITOR.POSITION_PRECEDING)
								};
								for (; B = v.next();) a(B, b, c, m);
								w = w.createIterator();
								for (w.enlargeBr = f != CKEDITOR.ENTER_BR; B = w.getNextParagraph(f == CKEDITOR.ENTER_P ? "p" : "div");) a(B, b, c, m)
							}
							CKEDITOR.dom.element.clearAllMarkers(m);
							c.forceNextSelectionCheck();
							d.selectBookmarks(r);
							c.focus()
						}
					}
				}
			}

			function c(a) {
				var b =
					a == f.setAttribute,
					c = a == f.removeAttribute,
					d = /\bdirection\s*:\s*(.*?)\s*(:?$|;)/;
				return function (f, g) {
					if (!this.isReadOnly()) {
						var e;
						if (e = f == (b || c ? "dir" : "direction") || "style" == f && (c || d.test(g))) {
							a: {
								e = this;
								for (var k = e.getDocument().getBody().getParent(); e;) {
									if (e.equals(k)) {
										e = !1;
										break a
									}
									e = e.getParent()
								}
								e = !0
							}
							e = !e
						}
						if (e && (e = this.getDirection(1), k = a.apply(this, arguments), e != this.getDirection(1))) return this.getDocument().fire("dirChanged", this), k
					}
					return a.apply(this, arguments)
				}
			}
			var g = {
					table: 1,
					ul: 1,
					ol: 1,
					blockquote: 1,
					div: 1
				},
				l = {},
				k = {};
			CKEDITOR.tools.extend(l, g, {
				tr: 1,
				p: 1,
				div: 1,
				li: 1
			});
			CKEDITOR.tools.extend(k, l, {
				td: 1
			});
			CKEDITOR.plugins.add("bidi", {
				init: function (a) {
					function c(b, d, f, g, e) {
						a.addCommand(f, new CKEDITOR.command(a, g));
						a.ui.addButton && a.ui.addButton(b, {
							label: d,
							command: f,
							toolbar: "bidi," + e
						})
					}
					if (!a.blockless) {
						var d = a.lang.bidi;
						c("BidiLtr", d.ltr, "bidiltr", b("ltr"), 10);
						c("BidiRtl", d.rtl, "bidirtl", b("rtl"), 20);
						a.on("contentDom", function () {
							a.document.on("dirChanged", function (b) {
								a.fire("dirChanged", {
									node: b.data,
									dir: b.data.getDirection(1)
								})
							})
						});
						a.on("contentDirChanged", function (b) {
							b = (a.lang.dir != b.data ? "add" : "remove") + "Class";
							var c = a.ui.space(a.config.toolbarLocation);
							if (c) c[b]("cke_mixed_dir_content")
						})
					}
				}
			});
			for (var f = CKEDITOR.dom.element.prototype, d = ["setStyle", "removeStyle", "setAttribute", "removeAttribute"], m = 0; m < d.length; m++) f[d[m]] = CKEDITOR.tools.override(f[d[m]], c)
		}(),
		function () {
			var a = {
				exec: function (a) {
					var b = a.getCommand("blockquote").state,
						c = a.getSelection(),
						g = c && c.getRanges()[0];
					if (g) {
						var l = c.createBookmarks();
						if (CKEDITOR.env.ie) {
							var k =
								l[0].startNode,
								f = l[0].endNode,
								d;
							if (k && "blockquote" == k.getParent().getName())
								for (d = k; d = d.getNext();)
									if (d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary()) {
										k.move(d, !0);
										break
									}
							if (f && "blockquote" == f.getParent().getName())
								for (d = f; d = d.getPrevious();)
									if (d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary()) {
										f.move(d);
										break
									}
						}
						var m = g.createIterator();
						m.enlargeBr = a.config.enterMode != CKEDITOR.ENTER_BR;
						if (b == CKEDITOR.TRISTATE_OFF) {
							for (k = []; b = m.getNextParagraph();) k.push(b);
							1 > k.length && (b = a.document.createElement(a.config.enterMode ==
								CKEDITOR.ENTER_P ? "p" : "div"), f = l.shift(), g.insertNode(b), b.append(new CKEDITOR.dom.text("﻿", a.document)), g.moveToBookmark(f), g.selectNodeContents(b), g.collapse(!0), f = g.createBookmark(), k.push(b), l.unshift(f));
							d = k[0].getParent();
							g = [];
							for (f = 0; f < k.length; f++) b = k[f], d = d.getCommonAncestor(b.getParent());
							for (b = {
									table: 1,
									tbody: 1,
									tr: 1,
									ol: 1,
									ul: 1
								}; b[d.getName()];) d = d.getParent();
							for (f = null; 0 < k.length;) {
								for (b = k.shift(); !b.getParent().equals(d);) b = b.getParent();
								b.equals(f) || g.push(b);
								f = b
							}
							for (; 0 < g.length;)
								if (b =
									g.shift(), "blockquote" == b.getName()) {
									for (f = new CKEDITOR.dom.documentFragment(a.document); b.getFirst();) f.append(b.getFirst().remove()), k.push(f.getLast());
									f.replace(b)
								} else k.push(b);
							g = a.document.createElement("blockquote");
							for (g.insertBefore(k[0]); 0 < k.length;) b = k.shift(), g.append(b)
						} else if (b == CKEDITOR.TRISTATE_ON) {
							f = [];
							for (d = {}; b = m.getNextParagraph();) {
								for (k = g = null; b.getParent();) {
									if ("blockquote" == b.getParent().getName()) {
										g = b.getParent();
										k = b;
										break
									}
									b = b.getParent()
								}
								g && k && !k.getCustomData("blockquote_moveout") &&
									(f.push(k), CKEDITOR.dom.element.setMarker(d, k, "blockquote_moveout", !0))
							}
							CKEDITOR.dom.element.clearAllMarkers(d);
							b = [];
							k = [];
							for (d = {}; 0 < f.length;) m = f.shift(), g = m.getParent(), m.getPrevious() ? m.getNext() ? (m.breakParent(m.getParent()), k.push(m.getNext())) : m.remove().insertAfter(g) : m.remove().insertBefore(g), g.getCustomData("blockquote_processed") || (k.push(g), CKEDITOR.dom.element.setMarker(d, g, "blockquote_processed", !0)), b.push(m);
							CKEDITOR.dom.element.clearAllMarkers(d);
							for (f = k.length - 1; 0 <= f; f--) {
								g = k[f];
								a: {
									d = g;
									for (var m = 0, h = d.getChildCount(), n = void 0; m < h && (n = d.getChild(m)); m++)
										if (n.type == CKEDITOR.NODE_ELEMENT && n.isBlockBoundary()) {
											d = !1;
											break a
										}
									d = !0
								}
								d && g.remove()
							}
							if (a.config.enterMode == CKEDITOR.ENTER_BR)
								for (g = !0; b.length;)
									if (m = b.shift(), "div" == m.getName()) {
										f = new CKEDITOR.dom.documentFragment(a.document);
										!g || !m.getPrevious() || m.getPrevious().type == CKEDITOR.NODE_ELEMENT && m.getPrevious().isBlockBoundary() || f.append(a.document.createElement("br"));
										for (g = m.getNext() && !(m.getNext().type == CKEDITOR.NODE_ELEMENT &&
												m.getNext().isBlockBoundary()); m.getFirst();) m.getFirst().remove().appendTo(f);
										g && f.append(a.document.createElement("br"));
										f.replace(m);
										g = !1
									}
						}
						c.selectBookmarks(l);
						a.focus()
					}
				},
				refresh: function (a, b) {
					this.setState(a.elementPath(b.block || b.blockLimit).contains("blockquote", 1) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
				},
				context: "blockquote",
				allowedContent: "blockquote",
				requiredContent: "blockquote"
			};
			CKEDITOR.plugins.add("blockquote", {
				init: function (e) {
					e.blockless || (e.addCommand("blockquote", a), e.ui.addButton &&
						e.ui.addButton("Blockquote", {
							label: e.lang.blockquote.toolbar,
							command: "blockquote",
							toolbar: "blocks,10"
						}))
				}
			})
		}(), "use strict",
		function () {
			function a(a, c) {
				CKEDITOR.tools.extend(this, c, {
					editor: a,
					id: "cke-" + CKEDITOR.tools.getUniqueId(),
					area: a._.notificationArea
				});
				c.type || (this.type = "info");
				this.element = this._createElement();
				a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(this.element)
			}

			function e(a) {
				var c = this;
				this.editor = a;
				this.notifications = [];
				this.element = this._createElement();
				this._uiBuffer = CKEDITOR.tools.eventsBuffer(10, this._layout, this);
				this._changeBuffer = CKEDITOR.tools.eventsBuffer(500, this._layout, this);
				a.on("destroy", function () {
					c._removeListeners();
					c.element.remove()
				})
			}
			CKEDITOR.plugins.add("notification", {
				init: function (a) {
					function c(a) {
						var b = new CKEDITOR.dom.element("div");
						b.setStyles({
							position: "fixed",
							"margin-left": "-9999px"
						});
						b.setAttributes({
							"aria-live": "assertive",
							"aria-atomic": "true"
						});
						b.setText(a);
						CKEDITOR.document.getBody().append(b);
						setTimeout(function () {
								b.remove()
							},
							100)
					}
					a._.notificationArea = new e(a);
					a.showNotification = function (c, e, k) {
						var f, d;
						"progress" == e ? f = k : d = k;
						c = new CKEDITOR.plugins.notification(a, {
							message: c,
							type: e,
							progress: f,
							duration: d
						});
						c.show();
						return c
					};
					a.on("key", function (g) {
						if (27 == g.data.keyCode) {
							var e = a._.notificationArea.notifications;
							e.length && (c(a.lang.notification.closed), e[e.length - 1].hide(), g.cancel())
						}
					})
				}
			});
			a.prototype = {
				show: function () {
					!1 !== this.editor.fire("notificationShow", {
						notification: this
					}) && (this.area.add(this), this._hideAfterTimeout())
				},
				update: function (a) {
					var c = !0;
					!1 === this.editor.fire("notificationUpdate", {
						notification: this,
						options: a
					}) && (c = !1);
					var g = this.element,
						e = g.findOne(".cke_notification_message"),
						k = g.findOne(".cke_notification_progress"),
						f = a.type;
					g.removeAttribute("role");
					a.progress && "progress" != this.type && (f = "progress");
					f && (g.removeClass(this._getClass()), g.removeAttribute("aria-label"), this.type = f, g.addClass(this._getClass()), g.setAttribute("aria-label", this.type), "progress" != this.type || k ? "progress" != this.type && k && k.remove() :
						(k = this._createProgressElement(), k.insertBefore(e)));
					void 0 !== a.message && (this.message = a.message, e.setHtml(this.message));
					void 0 !== a.progress && (this.progress = a.progress, k && k.setStyle("width", this._getPercentageProgress()));
					c && a.important && (g.setAttribute("role", "alert"), this.isVisible() || this.area.add(this));
					this.duration = a.duration;
					this._hideAfterTimeout()
				},
				hide: function () {
					!1 !== this.editor.fire("notificationHide", {
						notification: this
					}) && this.area.remove(this)
				},
				isVisible: function () {
					return 0 <= CKEDITOR.tools.indexOf(this.area.notifications,
						this)
				},
				_createElement: function () {
					var a = this,
						c, g, e = this.editor.lang.common.close;
					c = new CKEDITOR.dom.element("div");
					c.addClass("cke_notification");
					c.addClass(this._getClass());
					c.setAttributes({
						id: this.id,
						role: "alert",
						"aria-label": this.type
					});
					"progress" == this.type && c.append(this._createProgressElement());
					g = new CKEDITOR.dom.element("p");
					g.addClass("cke_notification_message");
					g.setHtml(this.message);
					c.append(g);
					g = CKEDITOR.dom.element.createFromHtml('\x3ca class\x3d"cke_notification_close" href\x3d"javascript:void(0)" title\x3d"' +
						e + '" role\x3d"button" tabindex\x3d"-1"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e');
					c.append(g);
					g.on("click", function () {
						a.editor.focus();
						a.hide()
					});
					return c
				},
				_getClass: function () {
					return "progress" == this.type ? "cke_notification_info" : "cke_notification_" + this.type
				},
				_createProgressElement: function () {
					var a = new CKEDITOR.dom.element("span");
					a.addClass("cke_notification_progress");
					a.setStyle("width", this._getPercentageProgress());
					return a
				},
				_getPercentageProgress: function () {
					return Math.round(100 *
						(this.progress || 0)) + "%"
				},
				_hideAfterTimeout: function () {
					var a = this,
						c;
					this._hideTimeoutId && clearTimeout(this._hideTimeoutId);
					if ("number" == typeof this.duration) c = this.duration;
					else if ("info" == this.type || "success" == this.type) c = "number" == typeof this.editor.config.notification_duration ? this.editor.config.notification_duration : 5E3;
					c && (a._hideTimeoutId = setTimeout(function () {
						a.hide()
					}, c))
				}
			};
			e.prototype = {
				add: function (a) {
					this.notifications.push(a);
					this.element.append(a.element);
					1 == this.element.getChildCount() &&
						(CKEDITOR.document.getBody().append(this.element), this._attachListeners());
					this._layout()
				},
				remove: function (a) {
					var c = CKEDITOR.tools.indexOf(this.notifications, a);
					0 > c || (this.notifications.splice(c, 1), a.element.remove(), this.element.getChildCount() || (this._removeListeners(), this.element.remove()))
				},
				_createElement: function () {
					var a = this.editor,
						c = a.config,
						g = new CKEDITOR.dom.element("div");
					g.addClass("cke_notifications_area");
					g.setAttribute("id", "cke_notifications_area_" + a.name);
					g.setStyle("z-index", c.baseFloatZIndex -
						2);
					return g
				},
				_attachListeners: function () {
					var a = CKEDITOR.document.getWindow(),
						c = this.editor;
					a.on("scroll", this._uiBuffer.input);
					a.on("resize", this._uiBuffer.input);
					c.on("change", this._changeBuffer.input);
					c.on("floatingSpaceLayout", this._layout, this, null, 20);
					c.on("blur", this._layout, this, null, 20)
				},
				_removeListeners: function () {
					var a = CKEDITOR.document.getWindow(),
						c = this.editor;
					a.removeListener("scroll", this._uiBuffer.input);
					a.removeListener("resize", this._uiBuffer.input);
					c.removeListener("change", this._changeBuffer.input);
					c.removeListener("floatingSpaceLayout", this._layout);
					c.removeListener("blur", this._layout)
				},
				_layout: function () {
					function a() {
						c.setStyle("left", w(t + e.width - n - p))
					}
					var c = this.element,
						g = this.editor,
						e = g.ui.contentsElement.getClientRect(),
						k = g.ui.contentsElement.getDocumentPosition(),
						f, d, m = c.getClientRect(),
						h, n = this._notificationWidth,
						p = this._notificationMargin;
					h = CKEDITOR.document.getWindow();
					var q = h.getScrollPosition(),
						y = h.getViewPaneSize(),
						u = CKEDITOR.document.getBody(),
						r = u.getDocumentPosition(),
						w = CKEDITOR.tools.cssLength;
					n && p || (h = this.element.getChild(0), n = this._notificationWidth = h.getClientRect().width, p = this._notificationMargin = parseInt(h.getComputedStyle("margin-left"), 10) + parseInt(h.getComputedStyle("margin-right"), 10));
					g.toolbar && (f = g.ui.space("top"), d = f.getClientRect());
					f && f.isVisible() && d.bottom > e.top && d.bottom < e.bottom - m.height ? c.setStyles({
						position: "fixed",
						top: w(d.bottom)
					}) : 0 < e.top ? c.setStyles({
						position: "absolute",
						top: w(k.y)
					}) : k.y + e.height - m.height > q.y ? c.setStyles({
						position: "fixed",
						top: 0
					}) : c.setStyles({
						position: "absolute",
						top: w(k.y + e.height - m.height)
					});
					var t = "fixed" == c.getStyle("position") ? e.left : "static" != u.getComputedStyle("position") ? k.x - r.x : k.x;
					e.width < n + p ? k.x + n + p > q.x + y.width ? a() : c.setStyle("left", w(t)) : k.x + n + p > q.x + y.width ? c.setStyle("left", w(t)) : k.x + e.width / 2 + n / 2 + p > q.x + y.width ? c.setStyle("left", w(t - k.x + q.x + y.width - n - p)) : 0 > e.left + e.width - n - p ? a() : 0 > e.left + e.width / 2 - n / 2 ? c.setStyle("left", w(t - k.x + q.x)) : c.setStyle("left", w(t + e.width / 2 - n / 2 - p / 2))
				}
			};
			CKEDITOR.plugins.notification = a
		}(),
		function () {
			var a = '\x3ca id\x3d"{id}" class\x3d"cke_button cke_button__{name} cke_button_{state} {cls}"' +
				(CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' title\x3d"{title}" tabindex\x3d"-1" hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasArrow}" aria-disabled\x3d"{ariaDisabled}"';
			CKEDITOR.env.gecko && CKEDITOR.env.mac && (a += ' onkeypress\x3d"return false;"');
			CKEDITOR.env.gecko && (a += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
			var a = a + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" ' +
					(CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{style}"'),
				a = a + '\x3e\x26nbsp;\x3c/span\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_button_label cke_button__{name}_label" aria-hidden\x3d"false"\x3e{label}\x3c/span\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_button_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e{arrowHtml}\x3c/a\x3e',
				e = CKEDITOR.addTemplate("buttonArrow", '\x3cspan class\x3d"cke_button_arrow"\x3e' + (CKEDITOR.env.hc ? "\x26#9660;" : "") + "\x3c/span\x3e"),
				b = CKEDITOR.addTemplate("button", a);
			CKEDITOR.plugins.add("button", {
				beforeInit: function (a) {
					a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler)
				}
			});
			CKEDITOR.UI_BUTTON = "button";
			CKEDITOR.ui.button = function (a) {
				CKEDITOR.tools.extend(this, a, {
					title: a.label,
					click: a.click || function (b) {
						b.execCommand(a.command)
					}
				});
				this._ = {}
			};
			CKEDITOR.ui.button.handler = {
				create: function (a) {
					return new CKEDITOR.ui.button(a)
				}
			};
			CKEDITOR.ui.button.prototype = {
				render: function (a, g) {
					function l() {
						var b = a.mode;
						b && (b = this.modes[b] ? void 0 !== k[b] ? k[b] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, b = a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : b, this.setState(b), this.refresh && this.refresh())
					}
					var k = null,
						f = CKEDITOR.env,
						d = this._.id = CKEDITOR.tools.getNextId(),
						m = "",
						h = this.command,
						n, p, q;
					this._.editor = a;
					var y = {
							id: d,
							button: this,
							editor: a,
							focus: function () {
								CKEDITOR.document.getById(d).focus()
							},
							execute: function () {
								this.button.click(a)
							},
							attach: function (a) {
								this.button.attach(a)
							}
						},
						u = CKEDITOR.tools.addFunction(function (a) {
							if (y.onkey) return a = new CKEDITOR.dom.event(a), !1 !== y.onkey(y, a.getKeystroke())
						}),
						r = CKEDITOR.tools.addFunction(function (a) {
							var b;
							y.onfocus && (b = !1 !== y.onfocus(y, new CKEDITOR.dom.event(a)));
							return b
						}),
						w = 0;
					y.clickFn = n = CKEDITOR.tools.addFunction(function () {
						w && (a.unlockSelection(1), w = 0);
						y.execute();
						f.iOS && a.focus()
					});
					this.modes ? (k = {}, a.on("beforeModeUnload", function () {
						a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED && (k[a.mode] =
							this._.state)
					}, this), a.on("activeFilterChange", l, this), a.on("mode", l, this), !this.readOnly && a.on("readOnly", l, this)) : h && (h = a.getCommand(h)) && (h.on("state", function () {
						this.setState(h.state)
					}, this), m += h.state == CKEDITOR.TRISTATE_ON ? "on" : h.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off");
					var t;
					if (this.directional) a.on("contentDirChanged", function (b) {
						var d = CKEDITOR.document.getById(this._.id),
							h = d.getFirst();
						b = b.data;
						b != a.lang.dir ? d.addClass("cke_" + b) : d.removeClass("cke_ltr").removeClass("cke_rtl");
						h.setAttribute("style",
							CKEDITOR.skin.getIconStyle(t, "rtl" == b, this.icon, this.iconOffset))
					}, this);
					h ? (p = a.getCommandKeystroke(h)) && (q = CKEDITOR.tools.keystrokeToString(a.lang.common.keyboard, p)) : m += "off";
					p = this.name || this.command;
					var B = null,
						v = this.icon;
					t = p;
					this.icon && !/\./.test(this.icon) ? (t = this.icon, v = null) : (this.icon && (B = this.icon), CKEDITOR.env.hidpi && this.iconHiDpi && (B = this.iconHiDpi));
					B ? (CKEDITOR.skin.addIcon(B, B), v = null) : B = t;
					m = {
						id: d,
						name: p,
						iconName: t,
						label: this.label,
						cls: (this.hasArrow ? "cke_button_expandable " : "") + (this.className ||
							""),
						state: m,
						ariaDisabled: "disabled" == m ? "true" : "false",
						title: this.title + (q ? " (" + q.display + ")" : ""),
						ariaShortcut: q ? a.lang.common.keyboardShortcut + " " + q.aria : "",
						titleJs: f.gecko && !f.hc ? "" : (this.title || "").replace("'", ""),
						hasArrow: "string" === typeof this.hasArrow && this.hasArrow || (this.hasArrow ? "true" : "false"),
						keydownFn: u,
						focusFn: r,
						clickFn: n,
						style: CKEDITOR.skin.getIconStyle(B, "rtl" == a.lang.dir, v, this.iconOffset),
						arrowHtml: this.hasArrow ? e.output() : ""
					};
					b.output(m, g);
					if (this.onRender) this.onRender();
					return y
				},
				setState: function (a) {
					if (this._.state == a) return !1;
					this._.state = a;
					var b = CKEDITOR.document.getById(this._.id);
					return b ? (b.setState(a, "cke_button"), b.setAttribute("aria-disabled", a == CKEDITOR.TRISTATE_DISABLED), this.hasArrow ? b.setAttribute("aria-expanded", a == CKEDITOR.TRISTATE_ON) : a === CKEDITOR.TRISTATE_ON ? b.setAttribute("aria-pressed", !0) : b.removeAttribute("aria-pressed"), !0) : !1
				},
				getState: function () {
					return this._.state
				},
				toFeature: function (a) {
					if (this._.feature) return this._.feature;
					var b = this;
					this.allowedContent ||
						this.requiredContent || !this.command || (b = a.getCommand(this.command) || b);
					return this._.feature = b
				}
			};
			CKEDITOR.ui.prototype.addButton = function (a, b) {
				this.add(a, CKEDITOR.UI_BUTTON, b)
			}
		}(),
		function () {
			function a(a) {
				function b() {
					for (var d = c(), h = CKEDITOR.tools.clone(a.config.toolbarGroups) || e(a), m = 0; m < h.length; m++) {
						var l = h[m];
						if ("/" != l) {
							"string" == typeof l && (l = h[m] = {
								name: l
							});
							var u, r = l.groups;
							if (r)
								for (var w = 0; w < r.length; w++) u = r[w], (u = d[u]) && f(l, u);
							(u = d[l.name]) && f(l, u)
						}
					}
					return h
				}

				function c() {
					var b = {},
						d, h, f;
					for (d in a.ui.items) h =
						a.ui.items[d], f = h.toolbar || "others", f = f.split(","), h = f[0], f = parseInt(f[1] || -1, 10), b[h] || (b[h] = []), b[h].push({
							name: d,
							order: f
						});
					for (h in b) b[h] = b[h].sort(function (a, b) {
						return a.order == b.order ? 0 : 0 > b.order ? -1 : 0 > a.order ? 1 : a.order < b.order ? -1 : 1
					});
					return b
				}

				function f(b, c) {
					if (c.length) {
						b.items ? b.items.push(a.ui.create("-")) : b.items = [];
						for (var d; d = c.shift();) d = "string" == typeof d ? d : d.name, m && -1 != CKEDITOR.tools.indexOf(m, d) || (d = a.ui.create(d)) && a.addFeature(d) && b.items.push(d)
					}
				}

				function d(a) {
					var b = [],
						c, d, h;
					for (c =
						0; c < a.length; ++c) d = a[c], h = {}, "/" == d ? b.push(d) : CKEDITOR.tools.isArray(d) ? (f(h, CKEDITOR.tools.clone(d)), b.push(h)) : d.items && (f(h, CKEDITOR.tools.clone(d.items)), h.name = d.name, b.push(h));
					return b
				}
				var m = a.config.removeButtons,
					m = m && m.split(","),
					h = a.config.toolbar;
				"string" == typeof h && (h = a.config["toolbar_" + h]);
				return a.toolbar = h ? d(h) : b()
			}

			function e(a) {
				return a._.toolbarGroups || (a._.toolbarGroups = [{
					name: "document",
					groups: ["mode", "document", "doctools"]
				}, {
					name: "clipboard",
					groups: ["clipboard", "undo"]
				}, {
					name: "editing",
					groups: ["find", "selection", "spellchecker"]
				}, {
					name: "forms"
				}, "/", {
					name: "basicstyles",
					groups: ["basicstyles", "cleanup"]
				}, {
					name: "paragraph",
					groups: ["list", "indent", "blocks", "align", "bidi"]
				}, {
					name: "links"
				}, {
					name: "insert"
				}, "/", {
					name: "styles"
				}, {
					name: "colors"
				}, {
					name: "tools"
				}, {
					name: "others"
				}, {
					name: "about"
				}])
			}
			var b = function () {
				this.toolbars = [];
				this.focusCommandExecuted = !1
			};
			b.prototype.focus = function () {
				for (var a = 0, b; b = this.toolbars[a++];)
					for (var c = 0, f; f = b.items[c++];)
						if (f.focus) {
							f.focus();
							return
						}
			};
			var c = {
				modes: {
					wysiwyg: 1,
					source: 1
				},
				readOnly: 1,
				exec: function (a) {
					a.toolbox && (a.toolbox.focusCommandExecuted = !0, CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function () {
						a.toolbox.focus()
					}, 100) : a.toolbox.focus())
				}
			};
			CKEDITOR.plugins.add("toolbar", {
				requires: "button",
				init: function (g) {
					var e, k = function (a, b) {
						var c, h = "rtl" == g.lang.dir,
							n = g.config.toolbarGroupCycling,
							p = h ? 37 : 39,
							h = h ? 39 : 37,
							n = void 0 === n || n;
						switch (b) {
							case 9:
							case CKEDITOR.SHIFT + 9:
								for (; !c || !c.items.length;)
									if (c = 9 == b ? (c ? c.next : a.toolbar.next) || g.toolbox.toolbars[0] : (c ? c.previous :
											a.toolbar.previous) || g.toolbox.toolbars[g.toolbox.toolbars.length - 1], c.items.length)
										for (a = c.items[e ? c.items.length - 1 : 0]; a && !a.focus;)(a = e ? a.previous : a.next) || (c = 0);
								a && a.focus();
								return !1;
							case p:
								c = a;
								do c = c.next, !c && n && (c = a.toolbar.items[0]); while (c && !c.focus);
								c ? c.focus() : k(a, 9);
								return !1;
							case 40:
								return a.button && a.button.hasArrow ? a.execute() : k(a, 40 == b ? p : h), !1;
							case h:
							case 38:
								c = a;
								do c = c.previous, !c && n && (c = a.toolbar.items[a.toolbar.items.length - 1]); while (c && !c.focus);
								c ? c.focus() : (e = 1, k(a, CKEDITOR.SHIFT +
									9), e = 0);
								return !1;
							case 27:
								return g.focus(), !1;
							case 13:
							case 32:
								return a.execute(), !1
						}
						return !0
					};
					g.on("uiSpace", function (c) {
						if (c.data.space == g.config.toolbarLocation) {
							c.removeListener();
							g.toolbox = new b;
							var d = CKEDITOR.tools.getNextId(),
								e = ['\x3cspan id\x3d"', d, '" class\x3d"cke_voice_label"\x3e', g.lang.toolbar.toolbars, "\x3c/span\x3e", '\x3cspan id\x3d"' + g.ui.spaceId("toolbox") + '" class\x3d"cke_toolbox" role\x3d"group" aria-labelledby\x3d"', d, '" onmousedown\x3d"return false;"\x3e'],
								d = !1 !== g.config.toolbarStartupExpanded,
								h, l;
							g.config.toolbarCanCollapse && g.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && e.push('\x3cspan class\x3d"cke_toolbox_main"' + (d ? "\x3e" : ' style\x3d"display:none"\x3e'));
							for (var p = g.toolbox.toolbars, q = a(g), y = q.length, u = 0; u < y; u++) {
								var r, w = 0,
									t, B = q[u],
									v = "/" !== B && ("/" === q[u + 1] || u == y - 1),
									z;
								if (B)
									if (h && (e.push("\x3c/span\x3e"), l = h = 0), "/" === B) e.push('\x3cspan class\x3d"cke_toolbar_break"\x3e\x3c/span\x3e');
									else {
										z = B.items || B;
										for (var C = 0; C < z.length; C++) {
											var x = z[C],
												A;
											if (x) {
												var G = function (a) {
													a = a.render(g, e);
													E = w.items.push(a) -
														1;
													0 < E && (a.previous = w.items[E - 1], a.previous.next = a);
													a.toolbar = w;
													a.onkey = k;
													a.onfocus = function () {
														g.toolbox.focusCommandExecuted || g.focus()
													}
												};
												if (x.type == CKEDITOR.UI_SEPARATOR) l = h && x;
												else {
													A = !1 !== x.canGroup;
													if (!w) {
														r = CKEDITOR.tools.getNextId();
														w = {
															id: r,
															items: []
														};
														t = B.name && (g.lang.toolbar.toolbarGroups[B.name] || B.name);
														e.push('\x3cspan id\x3d"', r, '" class\x3d"cke_toolbar' + (v ? ' cke_toolbar_last"' : '"'), t ? ' aria-labelledby\x3d"' + r + '_label"' : "", ' role\x3d"toolbar"\x3e');
														t && e.push('\x3cspan id\x3d"', r, '_label" class\x3d"cke_voice_label"\x3e',
															t, "\x3c/span\x3e");
														e.push('\x3cspan class\x3d"cke_toolbar_start"\x3e\x3c/span\x3e');
														var E = p.push(w) - 1;
														0 < E && (w.previous = p[E - 1], w.previous.next = w)
													}
													A ? h || (e.push('\x3cspan class\x3d"cke_toolgroup" role\x3d"presentation"\x3e'), h = 1) : h && (e.push("\x3c/span\x3e"), h = 0);
													l && (G(l), l = 0);
													G(x)
												}
											}
										}
										h && (e.push("\x3c/span\x3e"), l = h = 0);
										w && e.push('\x3cspan class\x3d"cke_toolbar_end"\x3e\x3c/span\x3e\x3c/span\x3e')
									}
							}
							g.config.toolbarCanCollapse && e.push("\x3c/span\x3e");
							if (g.config.toolbarCanCollapse && g.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
								var D =
									CKEDITOR.tools.addFunction(function () {
										g.execCommand("toolbarCollapse")
									});
								g.on("destroy", function () {
									CKEDITOR.tools.removeFunction(D)
								});
								g.addCommand("toolbarCollapse", {
									readOnly: 1,
									exec: function (a) {
										var b = a.ui.space("toolbar_collapser"),
											c = b.getPrevious(),
											d = a.ui.space("contents"),
											h = c.getParent(),
											f = parseInt(d.$.style.height, 10),
											g = h.$.offsetHeight,
											e = b.hasClass("cke_toolbox_collapser_min");
										e ? (c.show(), b.removeClass("cke_toolbox_collapser_min"), b.setAttribute("title", a.lang.toolbar.toolbarCollapse)) : (c.hide(),
											b.addClass("cke_toolbox_collapser_min"), b.setAttribute("title", a.lang.toolbar.toolbarExpand));
										b.getFirst().setText(e ? "▲" : "◀");
										d.setStyle("height", f - (h.$.offsetHeight - g) + "px");
										a.fire("resize", {
											outerHeight: a.container.$.offsetHeight,
											contentsHeight: d.$.offsetHeight,
											outerWidth: a.container.$.offsetWidth
										})
									},
									modes: {
										wysiwyg: 1,
										source: 1
									}
								});
								g.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse");
								e.push('\x3ca title\x3d"' + (d ? g.lang.toolbar.toolbarCollapse : g.lang.toolbar.toolbarExpand) +
									'" id\x3d"' + g.ui.spaceId("toolbar_collapser") + '" tabIndex\x3d"-1" class\x3d"cke_toolbox_collapser');
								d || e.push(" cke_toolbox_collapser_min");
								e.push('" onclick\x3d"CKEDITOR.tools.callFunction(' + D + ')"\x3e', '\x3cspan class\x3d"cke_arrow"\x3e\x26#9650;\x3c/span\x3e', "\x3c/a\x3e")
							}
							e.push("\x3c/span\x3e");
							c.data.html += e.join("")
						}
					});
					g.on("destroy", function () {
						if (this.toolbox) {
							var a, b = 0,
								c, h, g;
							for (a = this.toolbox.toolbars; b < a.length; b++)
								for (h = a[b].items, c = 0; c < h.length; c++) g = h[c], g.clickFn && CKEDITOR.tools.removeFunction(g.clickFn),
									g.keyDownFn && CKEDITOR.tools.removeFunction(g.keyDownFn)
						}
					});
					g.on("uiReady", function () {
						var a = g.ui.space("toolbox");
						a && g.focusManager.add(a, 1)
					});
					g.addCommand("toolbarFocus", c);
					g.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus");
					g.ui.add("-", CKEDITOR.UI_SEPARATOR, {});
					g.ui.addHandler(CKEDITOR.UI_SEPARATOR, {
						create: function () {
							return {
								render: function (a, b) {
									b.push('\x3cspan class\x3d"cke_toolbar_separator" role\x3d"separator"\x3e\x3c/span\x3e');
									return {}
								}
							}
						}
					})
				}
			});
			CKEDITOR.ui.prototype.addToolbarGroup = function (a, b,
				c) {
				var f = e(this.editor),
					d = 0 === b,
					m = {
						name: a
					};
				if (c) {
					if (c = CKEDITOR.tools.search(f, function (a) {
							return a.name == c
						})) {
						!c.groups && (c.groups = []);
						if (b && (b = CKEDITOR.tools.indexOf(c.groups, b), 0 <= b)) {
							c.groups.splice(b + 1, 0, a);
							return
						}
						d ? c.groups.splice(0, 0, a) : c.groups.push(a);
						return
					}
					b = null
				}
				b && (b = CKEDITOR.tools.indexOf(f, function (a) {
					return a.name == b
				}));
				d ? f.splice(0, 0, a) : "number" == typeof b ? f.splice(b + 1, 0, m) : f.push(a)
			}
		}(), CKEDITOR.UI_SEPARATOR = "separator", CKEDITOR.config.toolbarLocation = "top", "use strict",
		function () {
			function a(a,
				b, c) {
				b.type || (b.type = "auto");
				if (c && !1 === a.fire("beforePaste", b) || !b.dataValue && b.dataTransfer.isEmpty()) return !1;
				b.dataValue || (b.dataValue = "");
				if (CKEDITOR.env.gecko && "drop" == b.method && a.toolbox) a.once("afterPaste", function () {
					a.toolbox.focus()
				});
				return a.fire("paste", b)
			}

			function e(b) {
				function c() {
					var a = b.editable();
					if (CKEDITOR.plugins.clipboard.isCustomCopyCutSupported) {
						var d = function (a) {
							b.getSelection().isCollapsed() || (b.readOnly && "cut" == a.name || A.initPasteDataTransfer(a, b), a.data.preventDefault())
						};
						a.on("copy", d);
						a.on("cut", d);
						a.on("cut", function () {
							b.readOnly || b.extractSelectedHtml()
						}, null, null, 999)
					}
					a.on(A.mainPasteEvent, function (a) {
						"beforepaste" == A.mainPasteEvent && G || z(a)
					});
					"beforepaste" == A.mainPasteEvent && (a.on("paste", function (a) {
						E || (g(), a.data.preventDefault(), z(a), k("paste"))
					}), a.on("contextmenu", e, null, null, 0), a.on("beforepaste", function (a) {
						!a.data || a.data.$.ctrlKey || a.data.$.shiftKey || e()
					}, null, null, 0));
					a.on("beforecut", function () {
						!G && m(b)
					});
					var f;
					a.attachListener(CKEDITOR.env.ie ? a : b.document.getDocumentElement(),
						"mouseup",
						function () {
							f = setTimeout(function () {
								C()
							}, 0)
						});
					b.on("destroy", function () {
						clearTimeout(f)
					});
					a.on("keyup", C)
				}

				function d(a) {
					return {
						type: a,
						canUndo: "cut" == a,
						startDisabled: !0,
						fakeKeystroke: "cut" == a ? CKEDITOR.CTRL + 88 : CKEDITOR.CTRL + 67,
						exec: function () {
							"cut" == this.type && m();
							var a;
							var c = this.type;
							if (CKEDITOR.env.ie) a = k(c);
							else try {
								a = b.document.$.execCommand(c, !1, null)
							} catch (d) {
								a = !1
							}
							a || b.showNotification(b.lang.clipboard[this.type + "Error"]);
							return a
						}
					}
				}

				function f() {
					return {
						canUndo: !1,
						async: !0,
						fakeKeystroke: CKEDITOR.CTRL +
							86,
						exec: function (b, c) {
							function d(c, g) {
								g = "undefined" !== typeof g ? g : !0;
								c ? (c.method = "paste", c.dataTransfer || (c.dataTransfer = A.initPasteDataTransfer()), a(b, c, g)) : f && !b._.forcePasteDialog && b.showNotification(k, "info", b.config.clipboard_notificationDuration);
								b._.forcePasteDialog = !1;
								b.fire("afterCommandExec", {
									name: "paste",
									command: h,
									returnValue: !!c
								})
							}
							c = "undefined" !== typeof c && null !== c ? c : {};
							var h = this,
								f = "undefined" !== typeof c.notification ? c.notification : !0,
								g = c.type,
								e = CKEDITOR.tools.keystrokeToString(b.lang.common.keyboard,
									b.getCommandKeystroke(this)),
								k = "string" === typeof f ? f : b.lang.clipboard.pasteNotification.replace(/%1/, '\x3ckbd aria-label\x3d"' + e.aria + '"\x3e' + e.display + "\x3c/kbd\x3e"),
								e = "string" === typeof c ? c : c.dataValue;
							g && !0 !== b.config.forcePasteAsPlainText && "allow-word" !== b.config.forcePasteAsPlainText ? b._.nextPasteType = g : delete b._.nextPasteType;
							"string" === typeof e ? d({
								dataValue: e
							}) : b.getClipboardData(d)
						}
					}
				}

				function g() {
					E = 1;
					setTimeout(function () {
						E = 0
					}, 100)
				}

				function e() {
					G = 1;
					setTimeout(function () {
						G = 0
					}, 10)
				}

				function k(a) {
					var c =
						b.document,
						d = c.getBody(),
						f = !1,
						g = function () {
							f = !0
						};
					d.on(a, g);
					7 < CKEDITOR.env.version ? c.$.execCommand(a) : c.$.selection.createRange().execCommand(a);
					d.removeListener(a, g);
					return f
				}

				function m() {
					if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
						var a = b.getSelection(),
							c, d, f;
						a.getType() == CKEDITOR.SELECTION_ELEMENT && (c = a.getSelectedElement()) && (d = a.getRanges()[0], f = b.document.createText(""), f.insertBefore(c), d.setStartBefore(f), d.setEndAfter(c), a.selectRanges([d]), setTimeout(function () {
								c.getParent() && (f.remove(), a.selectElement(c))
							},
							0))
					}
				}

				function l(a, c) {
					var d = b.document,
						f = b.editable(),
						g = function (a) {
							a.cancel()
						},
						e;
					if (!d.getById("cke_pastebin")) {
						var k = b.getSelection(),
							m = k.createBookmarks();
						CKEDITOR.env.ie && k.root.fire("selectionchange");
						var n = new CKEDITOR.dom.element(!CKEDITOR.env.webkit && !f.is("body") || CKEDITOR.env.ie ? "div" : "body", d);
						n.setAttributes({
							id: "cke_pastebin",
							"data-cke-temp": "1"
						});
						var t = 0,
							d = d.getWindow();
						CKEDITOR.env.webkit ? (f.append(n), n.addClass("cke_editable"), f.is("body") || (t = "static" != f.getComputedStyle("position") ?
							f : CKEDITOR.dom.element.get(f.$.offsetParent), t = t.getDocumentPosition().y)) : f.getAscendant(CKEDITOR.env.ie ? "body" : "html", 1).append(n);
						n.setStyles({
							position: "absolute",
							top: d.getScrollPosition().y - t + 10 + "px",
							width: "1px",
							height: Math.max(1, d.getViewPaneSize().height - 20) + "px",
							overflow: "hidden",
							margin: 0,
							padding: 0
						});
						CKEDITOR.env.safari && n.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "text"));
						(t = n.getParent().isReadOnly()) ? (n.setOpacity(0), n.setAttribute("contenteditable", !0)) : n.setStyle("ltr" == b.config.contentsLangDirection ?
							"left" : "right", "-10000px");
						b.on("selectionChange", g, null, null, 0);
						if (CKEDITOR.env.webkit || CKEDITOR.env.gecko) e = f.once("blur", g, null, null, -100);
						t && n.focus();
						t = new CKEDITOR.dom.range(n);
						t.selectNodeContents(n);
						var p = t.select();
						CKEDITOR.env.ie && (e = f.once("blur", function () {
							b.lockSelection(p)
						}));
						var w = CKEDITOR.document.getWindow().getScrollPosition().y;
						setTimeout(function () {
							CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = w);
							e && e.removeListener();
							CKEDITOR.env.ie && f.focus();
							k.selectBookmarks(m);
							n.remove();
							var a;
							CKEDITOR.env.webkit && (a = n.getFirst()) && a.is && a.hasClass("Apple-style-span") && (n = a);
							b.removeListener("selectionChange", g);
							c(n.getHtml())
						}, 0)
					}
				}

				function B() {
					if ("paste" == A.mainPasteEvent) return b.fire("beforePaste", {
						type: "auto",
						method: "paste"
					}), !1;
					b.focus();
					g();
					var a = b.focusManager;
					a.lock();
					if (b.editable().fire(A.mainPasteEvent) && !k("paste")) return a.unlock(), !1;
					a.unlock();
					return !0
				}

				function v(a) {
					if ("wysiwyg" == b.mode) switch (a.data.keyCode) {
						case CKEDITOR.CTRL + 86:
						case CKEDITOR.SHIFT + 45:
							a =
								b.editable();
							g();
							"paste" == A.mainPasteEvent && a.fire("beforepaste");
							break;
						case CKEDITOR.CTRL + 88:
						case CKEDITOR.SHIFT + 46:
							b.fire("saveSnapshot"), setTimeout(function () {
								b.fire("saveSnapshot")
							}, 50)
					}
				}

				function z(c) {
					var d = {
						type: "auto",
						method: "paste",
						dataTransfer: A.initPasteDataTransfer(c)
					};
					d.dataTransfer.cacheData();
					var f = !1 !== b.fire("beforePaste", d);
					f && A.canClipboardApiBeTrusted(d.dataTransfer, b) ? (c.data.preventDefault(), setTimeout(function () {
						a(b, d)
					}, 0)) : l(c, function (c) {
						d.dataValue = c.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig,
							"");
						f && a(b, d)
					})
				}

				function C() {
					if ("wysiwyg" == b.mode) {
						var a = x("paste");
						b.getCommand("cut").setState(x("cut"));
						b.getCommand("copy").setState(x("copy"));
						b.getCommand("paste").setState(a);
						b.fire("pasteState", a)
					}
				}

				function x(a) {
					if (D && a in {
							paste: 1,
							cut: 1
						}) return CKEDITOR.TRISTATE_DISABLED;
					if ("paste" == a) return CKEDITOR.TRISTATE_OFF;
					a = b.getSelection();
					var c = a.getRanges();
					return a.getType() == CKEDITOR.SELECTION_NONE || 1 == c.length && c[0].collapsed ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF
				}
				var A = CKEDITOR.plugins.clipboard,
					G = 0,
					E = 0,
					D = 0;
				(function () {
					b.on("key", v);
					b.on("contentDom", c);
					b.on("selectionChange", function (a) {
						D = a.data.selection.getRanges()[0].checkReadOnly();
						C()
					});
					if (b.contextMenu) {
						b.contextMenu.addListener(function (a, b) {
							D = b.getRanges()[0].checkReadOnly();
							return {
								cut: x("cut"),
								copy: x("copy"),
								paste: x("paste")
							}
						});
						var a = null;
						b.on("menuShow", function () {
							a && (a.removeListener(), a = null);
							var c = b.contextMenu.findItemByCommandName("paste");
							c && c.element && (a = c.element.on("touchend", function () {
								b._.forcePasteDialog = !0
							}))
						})
					}
					if (b.ui.addButton) b.once("instanceReady",
						function () {
							b._.pasteButtons && CKEDITOR.tools.array.forEach(b._.pasteButtons, function (a) {
								if (a = b.ui.get(a))
									if (a = CKEDITOR.document.getById(a._.id)) a.on("touchend", function () {
										b._.forcePasteDialog = !0
									})
							})
						})
				})();
				(function () {
					function a(c, d, f, g, e) {
						var k = b.lang.clipboard[d];
						b.addCommand(d, f);
						b.ui.addButton && b.ui.addButton(c, {
							label: k,
							command: d,
							toolbar: "clipboard," + g
						});
						b.addMenuItems && b.addMenuItem(d, {
							label: k,
							command: d,
							group: "clipboard",
							order: e
						})
					}
					a("Cut", "cut", d("cut"), 10, 1);
					a("Copy", "copy", d("copy"), 20, 4);
					a("Paste",
						"paste", f(), 30, 8);
					b._.pasteButtons || (b._.pasteButtons = []);
					b._.pasteButtons.push("Paste")
				})();
				b.getClipboardData = function (a, c) {
					function d(a) {
						a.removeListener();
						a.cancel();
						c(a.data)
					}

					function f(a) {
						a.removeListener();
						a.cancel();
						c({
							type: e,
							dataValue: a.data.dataValue,
							dataTransfer: a.data.dataTransfer,
							method: "paste"
						})
					}
					var g = !1,
						e = "auto";
					c || (c = a, a = null);
					b.on("beforePaste", function (a) {
						a.removeListener();
						g = !0;
						e = a.data.type
					}, null, null, 1E3);
					b.on("paste", d, null, null, 0);
					!1 === B() && (b.removeListener("paste", d), b._.forcePasteDialog &&
						g && b.fire("pasteDialog") ? (b.on("pasteDialogCommit", f), b.on("dialogHide", function (a) {
							a.removeListener();
							a.data.removeListener("pasteDialogCommit", f);
							a.data._.committed || c(null)
						})) : c(null))
				}
			}

			function b(a) {
				if (CKEDITOR.env.webkit) {
					if (!a.match(/^[^<]*$/g) && !a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return "html"
				} else if (CKEDITOR.env.ie) {
					if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi) && !a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return "html"
				} else if (CKEDITOR.env.gecko) {
					if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi)) return "html"
				} else return "html";
				return "htmlifiedtext"
			}

			function c(a, b) {
				function c(a) {
					return CKEDITOR.tools.repeat("\x3c/p\x3e\x3cp\x3e", ~~(a / 2)) + (1 == a % 2 ? "\x3cbr\x3e" : "")
				}
				b = b.replace(/(?!\u3000)\s+/g, " ").replace(/> +</g, "\x3e\x3c").replace(/<br ?\/>/gi, "\x3cbr\x3e");
				b = b.replace(/<\/?[A-Z]+>/g, function (a) {
					return a.toLowerCase()
				});
				if (b.match(/^[^<]$/)) return b;
				CKEDITOR.env.webkit && -1 < b.indexOf("\x3cdiv\x3e") && (b = b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "\x3cbr\x3e").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "\x3cdiv\x3e\x3c/div\x3e"),
					b.match(/<div>(<br>|)<\/div>/) && (b = "\x3cp\x3e" + b.replace(/(<div>(<br>|)<\/div>)+/g, function (a) {
						return c(a.split("\x3c/div\x3e\x3cdiv\x3e").length + 1)
					}) + "\x3c/p\x3e"), b = b.replace(/<\/div><div>/g, "\x3cbr\x3e"), b = b.replace(/<\/?div>/g, ""));
				CKEDITOR.env.gecko && a.enterMode != CKEDITOR.ENTER_BR && (CKEDITOR.env.gecko && (b = b.replace(/^<br><br>$/, "\x3cbr\x3e")), -1 < b.indexOf("\x3cbr\x3e\x3cbr\x3e") && (b = "\x3cp\x3e" + b.replace(/(<br>){2,}/g, function (a) {
					return c(a.length / 4)
				}) + "\x3c/p\x3e"));
				return k(a, b)
			}

			function g(a) {
				function b() {
					var a = {},
						c;
					for (c in CKEDITOR.dtd) "$" != c.charAt(0) && "div" != c && "span" != c && (a[c] = 1);
					return a
				}
				var c = {};
				return {
					get: function (d) {
						return "plain-text" == d ? c.plainText || (c.plainText = new CKEDITOR.filter(a, "br")) : "semantic-content" == d ? ((d = c.semanticContent) || (d = new CKEDITOR.filter(a, {}), d.allow({
							$1: {
								elements: b(),
								attributes: !0,
								styles: !1,
								classes: !1
							}
						}), d = c.semanticContent = d), d) : d ? new CKEDITOR.filter(a, d) : null
					}
				}
			}

			function l(a, b, c) {
				b = CKEDITOR.htmlParser.fragment.fromHtml(b);
				var d = new CKEDITOR.htmlParser.basicWriter;
				c.applyTo(b, !0, !1, a.activeEnterMode);
				b.writeHtml(d);
				return d.getHtml()
			}

			function k(a, b) {
				a.enterMode == CKEDITOR.ENTER_BR ? b = b.replace(/(<\/p><p>)+/g, function (a) {
					return CKEDITOR.tools.repeat("\x3cbr\x3e", a.length / 7 * 2)
				}).replace(/<\/?p>/g, "") : a.enterMode == CKEDITOR.ENTER_DIV && (b = b.replace(/<(\/)?p>/g, "\x3c$1div\x3e"));
				return b
			}

			function f(a) {
				a.data.preventDefault();
				a.data.$.dataTransfer.dropEffect = "none"
			}

			function d(b) {
				var c = CKEDITOR.plugins.clipboard;
				b.on("contentDom", function () {
					function d(c, f, g) {
						f.select();
						a(b, {
							dataTransfer: g,
							method: "drop"
						}, 1);
						g.sourceEditor.fire("saveSnapshot");
						g.sourceEditor.editable().extractHtmlFromRange(c);
						g.sourceEditor.getSelection().selectRanges([c]);
						g.sourceEditor.fire("saveSnapshot")
					}

					function f(d, g) {
						d.select();
						a(b, {
							dataTransfer: g,
							method: "drop"
						}, 1);
						c.resetDragDataTransfer()
					}

					function g(a, c, d) {
						var f = {
							$: a.data.$,
							target: a.data.getTarget()
						};
						c && (f.dragRange = c);
						d && (f.dropRange = d);
						!1 === b.fire(a.name, f) && a.data.preventDefault()
					}

					function e(a) {
						a.type != CKEDITOR.NODE_ELEMENT && (a = a.getParent());
						return a.getChildCount()
					}
					var k = b.editable(),
						m = CKEDITOR.plugins.clipboard.getDropTarget(b),
						l = b.ui.space("top"),
						B = b.ui.space("bottom");
					c.preventDefaultDropOnElement(l);
					c.preventDefaultDropOnElement(B);
					k.attachListener(m, "dragstart", g);
					k.attachListener(b, "dragstart", c.resetDragDataTransfer, c, null, 1);
					k.attachListener(b, "dragstart", function (a) {
						c.initDragDataTransfer(a, b)
					}, null, null, 2);
					k.attachListener(b, "dragstart", function () {
						var a = c.dragRange = b.getSelection().getRanges()[0];
						CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (c.dragStartContainerChildCount =
							a ? e(a.startContainer) : null, c.dragEndContainerChildCount = a ? e(a.endContainer) : null)
					}, null, null, 100);
					k.attachListener(m, "dragend", g);
					k.attachListener(b, "dragend", c.initDragDataTransfer, c, null, 1);
					k.attachListener(b, "dragend", c.resetDragDataTransfer, c, null, 100);
					k.attachListener(m, "dragover", function (a) {
						if (CKEDITOR.env.edge) a.data.preventDefault();
						else {
							var b = a.data.getTarget();
							b && b.is && b.is("html") ? a.data.preventDefault() : CKEDITOR.env.ie && CKEDITOR.plugins.clipboard.isFileApiSupported && a.data.$.dataTransfer.types.contains("Files") &&
								a.data.preventDefault()
						}
					});
					k.attachListener(m, "drop", function (a) {
						if (!a.data.$.defaultPrevented) {
							a.data.preventDefault();
							var d = a.data.getTarget();
							if (!d.isReadOnly() || d.type == CKEDITOR.NODE_ELEMENT && d.is("html")) {
								var d = c.getRangeAtDropPosition(a, b),
									f = c.dragRange;
								d && g(a, f, d)
							}
						}
					}, null, null, 9999);
					k.attachListener(b, "drop", c.initDragDataTransfer, c, null, 1);
					k.attachListener(b, "drop", function (a) {
						if (a = a.data) {
							var g = a.dropRange,
								e = a.dragRange,
								k = a.dataTransfer;
							k.getTransferType(b) == CKEDITOR.DATA_TRANSFER_INTERNAL ?
								setTimeout(function () {
									c.internalDrop(e, g, k, b)
								}, 0) : k.getTransferType(b) == CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? d(e, g, k) : f(g, k)
						}
					}, null, null, 9999)
				})
			}
			var m;
			CKEDITOR.plugins.add("clipboard", {
				requires: "dialog,notification,toolbar",
				init: function (a) {
					var f, k = g(a);
					a.config.forcePasteAsPlainText ? f = "plain-text" : a.config.pasteFilter ? f = a.config.pasteFilter : !CKEDITOR.env.webkit || "pasteFilter" in a.config || (f = "semantic-content");
					a.pasteFilter = k.get(f);
					e(a);
					d(a);
					CKEDITOR.dialog.add("paste", CKEDITOR.getUrl(this.path +
						"dialogs/paste.js"));
					if (CKEDITOR.env.gecko) {
						var m = ["image/png", "image/jpeg", "image/gif"],
							y;
						a.on("paste", function (b) {
							var c = b.data,
								d = c.dataTransfer;
							if (!c.dataValue && "paste" == c.method && d && 1 == d.getFilesCount() && y != d.id && (d = d.getFile(0), -1 != CKEDITOR.tools.indexOf(m, d.type))) {
								var f = new FileReader;
								f.addEventListener("load", function () {
									b.data.dataValue = '\x3cimg src\x3d"' + f.result + '" /\x3e';
									a.fire("paste", b.data)
								}, !1);
								f.addEventListener("abort", function () {
									a.fire("paste", b.data)
								}, !1);
								f.addEventListener("error",
									function () {
										a.fire("paste", b.data)
									}, !1);
								f.readAsDataURL(d);
								y = c.dataTransfer.id;
								b.stop()
							}
						}, null, null, 1)
					}
					a.on("paste", function (b) {
						b.data.dataTransfer || (b.data.dataTransfer = new CKEDITOR.plugins.clipboard.dataTransfer);
						if (!b.data.dataValue) {
							var c = b.data.dataTransfer,
								d = c.getData("text/html");
							if (d) b.data.dataValue = d, b.data.type = "html";
							else if (d = c.getData("text/plain")) b.data.dataValue = a.editable().transformPlainTextToHtml(d), b.data.type = "text"
						}
					}, null, null, 1);
					a.on("paste", function (a) {
						var b = a.data.dataValue,
							c = CKEDITOR.dtd.$block; - 1 < b.indexOf("Apple-") && (b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " "), "html" != a.data.type && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function (a, b) {
							return b.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;")
						})), -1 < b.indexOf('\x3cbr class\x3d"Apple-interchange-newline"\x3e') && (a.data.startsWithEOL = 1, a.data.preSniffing = "html", b = b.replace(/<br class="Apple-interchange-newline">/, "")), b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1"));
						if (b.match(/^<[^<]+cke_(editable|contents)/i)) {
							var d, f, h = new CKEDITOR.dom.element("div");
							for (h.setHtml(b); 1 == h.getChildCount() && (d = h.getFirst()) && d.type == CKEDITOR.NODE_ELEMENT && (d.hasClass("cke_editable") || d.hasClass("cke_contents"));) h = f = d;
							f && (b = f.getHtml().replace(/<br>$/i, ""))
						}
						CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function (b, d) {
							return d.toLowerCase() in c ? (a.data.preSniffing = "html", "\x3c" + d) : b
						}) : CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/, function (b, d) {
							return d in
								c ? (a.data.endsWithEOL = 1, "\x3c/" + d + "\x3e") : b
						}) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1"));
						a.data.dataValue = b
					}, null, null, 3);
					a.on("paste", function (d) {
						d = d.data;
						var f = a._.nextPasteType || d.type,
							g = d.dataValue,
							e, m = a.config.clipboard_defaultContentType || "html",
							n = d.dataTransfer.getTransferType(a) == CKEDITOR.DATA_TRANSFER_EXTERNAL,
							y = !0 === a.config.forcePasteAsPlainText;
						e = "html" == f || "html" == d.preSniffing ? "html" : b(g);
						delete a._.nextPasteType;
						"htmlifiedtext" == e && (g = c(a.config, g));
						if ("text" == f && "html" == e) g =
							l(a, g, k.get("plain-text"));
						else if (n && a.pasteFilter && !d.dontFilter || y) g = l(a, g, a.pasteFilter);
						d.startsWithEOL && (g = '\x3cbr data-cke-eol\x3d"1"\x3e' + g);
						d.endsWithEOL && (g += '\x3cbr data-cke-eol\x3d"1"\x3e');
						"auto" == f && (f = "html" == e || "html" == m ? "html" : "text");
						d.type = f;
						d.dataValue = g;
						delete d.preSniffing;
						delete d.startsWithEOL;
						delete d.endsWithEOL
					}, null, null, 6);
					a.on("paste", function (b) {
							b = b.data;
							b.dataValue && (a.insertHtml(b.dataValue, b.type, b.range), setTimeout(function () {
								a.fire("afterPaste")
							}, 0))
						}, null, null,
						1E3);
					a.on("pasteDialog", function (b) {
						setTimeout(function () {
							a.openDialog("paste", b.data)
						}, 0)
					})
				}
			});
			CKEDITOR.plugins.clipboard = {
				isCustomCopyCutSupported: (!CKEDITOR.env.ie || 16 <= CKEDITOR.env.version) && !CKEDITOR.env.iOS,
				isCustomDataTypesSupported: !CKEDITOR.env.ie || 16 <= CKEDITOR.env.version,
				isFileApiSupported: !CKEDITOR.env.ie || 9 < CKEDITOR.env.version,
				mainPasteEvent: CKEDITOR.env.ie && !CKEDITOR.env.edge ? "beforepaste" : "paste",
				addPasteButton: function (a, b, c) {
					a.ui.addButton && (a.ui.addButton(b, c), a._.pasteButtons ||
						(a._.pasteButtons = []), a._.pasteButtons.push(b))
				},
				canClipboardApiBeTrusted: function (a, b) {
					return a.getTransferType(b) != CKEDITOR.DATA_TRANSFER_EXTERNAL || CKEDITOR.env.chrome && !a.isEmpty() || CKEDITOR.env.gecko && (a.getData("text/html") || a.getFilesCount()) || CKEDITOR.env.safari && 603 <= CKEDITOR.env.version && !CKEDITOR.env.iOS || CKEDITOR.env.edge && 16 <= CKEDITOR.env.version ? !0 : !1
				},
				getDropTarget: function (a) {
					var b = a.editable();
					return CKEDITOR.env.ie && 9 > CKEDITOR.env.version || b.isInline() ? b : a.document
				},
				fixSplitNodesAfterDrop: function (a,
					b, c, d) {
					function f(a, c, d) {
						var h = a;
						h.type == CKEDITOR.NODE_TEXT && (h = a.getParent());
						if (h.equals(c) && d != c.getChildCount()) return a = b.startContainer.getChild(b.startOffset - 1), c = b.startContainer.getChild(b.startOffset), a && a.type == CKEDITOR.NODE_TEXT && c && c.type == CKEDITOR.NODE_TEXT && (d = a.getLength(), a.setText(a.getText() + c.getText()), c.remove(), b.setStart(a, d), b.collapse(!0)), !0
					}
					var g = b.startContainer;
					"number" == typeof d && "number" == typeof c && g.type == CKEDITOR.NODE_ELEMENT && (f(a.startContainer, g, c) || f(a.endContainer,
						g, d))
				},
				isDropRangeAffectedByDragRange: function (a, b) {
					var c = b.startContainer,
						d = b.endOffset;
					return a.endContainer.equals(c) && a.endOffset <= d || a.startContainer.getParent().equals(c) && a.startContainer.getIndex() < d || a.endContainer.getParent().equals(c) && a.endContainer.getIndex() < d ? !0 : !1
				},
				internalDrop: function (b, c, d, f) {
					var g = CKEDITOR.plugins.clipboard,
						e = f.editable(),
						k, m;
					f.fire("saveSnapshot");
					f.fire("lockSnapshot", {
						dontUpdate: 1
					});
					CKEDITOR.env.ie && 10 > CKEDITOR.env.version && this.fixSplitNodesAfterDrop(b, c, g.dragStartContainerChildCount,
						g.dragEndContainerChildCount);
					(m = this.isDropRangeAffectedByDragRange(b, c)) || (k = b.createBookmark(!1));
					g = c.clone().createBookmark(!1);
					m && (k = b.createBookmark(!1));
					b = k.startNode;
					c = k.endNode;
					m = g.startNode;
					c && b.getPosition(m) & CKEDITOR.POSITION_PRECEDING && c.getPosition(m) & CKEDITOR.POSITION_FOLLOWING && m.insertBefore(b);
					b = f.createRange();
					b.moveToBookmark(k);
					e.extractHtmlFromRange(b, 1);
					c = f.createRange();
					c.moveToBookmark(g);
					a(f, {
						dataTransfer: d,
						method: "drop",
						range: c
					}, 1);
					f.fire("unlockSnapshot")
				},
				getRangeAtDropPosition: function (a,
					b) {
					var c = a.data.$,
						d = c.clientX,
						f = c.clientY,
						g = b.getSelection(!0).getRanges()[0],
						e = b.createRange();
					if (a.data.testRange) return a.data.testRange;
					if (document.caretRangeFromPoint && b.document.$.caretRangeFromPoint(d, f)) c = b.document.$.caretRangeFromPoint(d, f), e.setStart(CKEDITOR.dom.node(c.startContainer), c.startOffset), e.collapse(!0);
					else if (c.rangeParent) e.setStart(CKEDITOR.dom.node(c.rangeParent), c.rangeOffset), e.collapse(!0);
					else {
						if (CKEDITOR.env.ie && 8 < CKEDITOR.env.version && g && b.editable().hasFocus) return g;
						if (document.body.createTextRange) {
							b.focus();
							c = b.document.getBody().$.createTextRange();
							try {
								for (var k = !1, m = 0; 20 > m && !k; m++) {
									if (!k) try {
										c.moveToPoint(d, f - m), k = !0
									} catch (l) {}
									if (!k) try {
										c.moveToPoint(d, f + m), k = !0
									} catch (v) {}
								}
								if (k) {
									var z = "cke-temp-" + (new Date).getTime();
									c.pasteHTML('\x3cspan id\x3d"' + z + '"\x3e​\x3c/span\x3e');
									var C = b.document.getById(z);
									e.moveToPosition(C, CKEDITOR.POSITION_BEFORE_START);
									C.remove()
								} else {
									var x = b.document.$.elementFromPoint(d, f),
										A = new CKEDITOR.dom.element(x),
										G;
									if (A.equals(b.editable()) ||
										"html" == A.getName()) return g && g.startContainer && !g.startContainer.equals(b.editable()) ? g : null;
									G = A.getClientRect();
									d < G.left ? e.setStartAt(A, CKEDITOR.POSITION_AFTER_START) : e.setStartAt(A, CKEDITOR.POSITION_BEFORE_END);
									e.collapse(!0)
								}
							} catch (E) {
								return null
							}
						} else return null
					}
					return e
				},
				initDragDataTransfer: function (a, b) {
					var c = a.data.$ ? a.data.$.dataTransfer : null,
						d = new this.dataTransfer(c, b);
					"dragstart" === a.name && d.storeId();
					c ? this.dragData && d.id == this.dragData.id ? d = this.dragData : this.dragData = d : this.dragData ?
						d = this.dragData : this.dragData = d;
					a.data.dataTransfer = d
				},
				resetDragDataTransfer: function () {
					this.dragData = null
				},
				initPasteDataTransfer: function (a, b) {
					if (this.isCustomCopyCutSupported) {
						if (a && a.data && a.data.$) {
							var c = a.data.$.clipboardData,
								d = new this.dataTransfer(c, b);
							"copy" !== a.name && "cut" !== a.name || d.storeId();
							this.copyCutData && d.id == this.copyCutData.id ? (d = this.copyCutData, d.$ = c) : this.copyCutData = d;
							return d
						}
						return new this.dataTransfer(null, b)
					}
					return new this.dataTransfer(CKEDITOR.env.edge && a && a.data.$ &&
						a.data.$.clipboardData || null, b)
				},
				preventDefaultDropOnElement: function (a) {
					a && a.on("dragover", f)
				}
			};
			m = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? "cke/id" : "Text";
			CKEDITOR.plugins.clipboard.dataTransfer = function (a, b) {
				a && (this.$ = a);
				this._ = {
					metaRegExp: /^<meta.*?>/i,
					bodyRegExp: /<body(?:[\s\S]*?)>([\s\S]*)<\/body>/i,
					fragmentRegExp: /\x3c!--(?:Start|End)Fragment--\x3e/g,
					data: {},
					files: [],
					nativeHtmlCache: "",
					normalizeType: function (a) {
						a = a.toLowerCase();
						return "text" == a || "text/plain" == a ? "Text" : "url" == a ?
							"URL" : a
					}
				};
				this._.fallbackDataTransfer = new CKEDITOR.plugins.clipboard.fallbackDataTransfer(this);
				this.id = this.getData(m);
				this.id || (this.id = "Text" == m ? "" : "cke-" + CKEDITOR.tools.getUniqueId());
				b && (this.sourceEditor = b, this.setData("text/html", b.getSelectedHtml(1)), "Text" == m || this.getData("text/plain") || this.setData("text/plain", b.getSelection().getSelectedText()))
			};
			CKEDITOR.DATA_TRANSFER_INTERNAL = 1;
			CKEDITOR.DATA_TRANSFER_CROSS_EDITORS = 2;
			CKEDITOR.DATA_TRANSFER_EXTERNAL = 3;
			CKEDITOR.plugins.clipboard.dataTransfer.prototype = {
				getData: function (a, b) {
					a = this._.normalizeType(a);
					var c = "text/html" == a && b ? this._.nativeHtmlCache : this._.data[a];
					if (void 0 === c || null === c || "" === c) {
						if (this._.fallbackDataTransfer.isRequired()) c = this._.fallbackDataTransfer.getData(a, b);
						else try {
							c = this.$.getData(a) || ""
						} catch (d) {
							c = ""
						}
						"text/html" != a || b || (c = this._stripHtml(c))
					}
					"Text" == a && CKEDITOR.env.gecko && this.getFilesCount() && "file://" == c.substring(0, 7) && (c = "");
					if ("string" === typeof c) var f = c.indexOf("\x3c/html\x3e"),
						c = -1 !== f ? c.substring(0, f + 7) : c;
					return c
				},
				setData: function (a, b) {
					a = this._.normalizeType(a);
					"text/html" == a ? (this._.data[a] = this._stripHtml(b), this._.nativeHtmlCache = b) : this._.data[a] = b;
					if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported || "URL" == a || "Text" == a)
						if ("Text" == m && "Text" == a && (this.id = b), this._.fallbackDataTransfer.isRequired()) this._.fallbackDataTransfer.setData(a, b);
						else try {
							this.$.setData(a, b)
						} catch (c) {}
				},
				storeId: function () {
					"Text" !== m && this.setData(m, this.id)
				},
				getTransferType: function (a) {
					return this.sourceEditor ? this.sourceEditor ==
						a ? CKEDITOR.DATA_TRANSFER_INTERNAL : CKEDITOR.DATA_TRANSFER_CROSS_EDITORS : CKEDITOR.DATA_TRANSFER_EXTERNAL
				},
				cacheData: function () {
					function a(c) {
						c = b._.normalizeType(c);
						var d = b.getData(c);
						"text/html" == c && (b._.nativeHtmlCache = b.getData(c, !0), d = b._stripHtml(d));
						d && (b._.data[c] = d)
					}
					if (this.$) {
						var b = this,
							c, d;
						if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
							if (this.$.types)
								for (c = 0; c < this.$.types.length; c++) a(this.$.types[c])
						} else a("Text"), a("URL");
						d = this._getImageFromClipboard();
						if (this.$ && this.$.files ||
							d) {
							this._.files = [];
							if (this.$.files && this.$.files.length)
								for (c = 0; c < this.$.files.length; c++) this._.files.push(this.$.files[c]);
							0 === this._.files.length && d && this._.files.push(d)
						}
					}
				},
				getFilesCount: function () {
					return this._.files.length ? this._.files.length : this.$ && this.$.files && this.$.files.length ? this.$.files.length : this._getImageFromClipboard() ? 1 : 0
				},
				getFile: function (a) {
					return this._.files.length ? this._.files[a] : this.$ && this.$.files && this.$.files.length ? this.$.files[a] : 0 === a ? this._getImageFromClipboard() :
						void 0
				},
				isEmpty: function () {
					var a = {},
						b;
					if (this.getFilesCount()) return !1;
					CKEDITOR.tools.array.forEach(CKEDITOR.tools.objectKeys(this._.data), function (b) {
						a[b] = 1
					});
					if (this.$)
						if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
							if (this.$.types)
								for (var c = 0; c < this.$.types.length; c++) a[this.$.types[c]] = 1
						} else a.Text = 1, a.URL = 1;
						"Text" != m && (a[m] = 0);
					for (b in a)
						if (a[b] && "" !== this.getData(b)) return !1;
					return !0
				},
				_getImageFromClipboard: function () {
					var a;
					if (this.$ && this.$.items && this.$.items[0]) try {
						if ((a = this.$.items[0].getAsFile()) &&
							a.type) return a
					} catch (b) {}
				},
				_stripHtml: function (a) {
					if (a && a.length) {
						a = a.replace(this._.metaRegExp, "");
						var b = this._.bodyRegExp.exec(a);
						b && b.length && (a = b[1], a = a.replace(this._.fragmentRegExp, ""))
					}
					return a
				}
			};
			CKEDITOR.plugins.clipboard.fallbackDataTransfer = function (a) {
				this._dataTransfer = a;
				this._customDataFallbackType = "text/html"
			};
			CKEDITOR.plugins.clipboard.fallbackDataTransfer._isCustomMimeTypeSupported = null;
			CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes = [];
			CKEDITOR.plugins.clipboard.fallbackDataTransfer.prototype = {
				isRequired: function () {
					var a = CKEDITOR.plugins.clipboard.fallbackDataTransfer,
						b = this._dataTransfer.$;
					if (null === a._isCustomMimeTypeSupported)
						if (b) {
							a._isCustomMimeTypeSupported = !1;
							if (CKEDITOR.env.edge && 17 <= CKEDITOR.env.version) return !0;
							try {
								b.setData("cke/mimetypetest", "cke test value"), a._isCustomMimeTypeSupported = "cke test value" === b.getData("cke/mimetypetest"), b.clearData("cke/mimetypetest")
							} catch (c) {}
						} else return !1;
					return !a._isCustomMimeTypeSupported
				},
				getData: function (a, b) {
					var c = this._getData(this._customDataFallbackType, !0);
					if (b) return c;
					var c = this._extractDataComment(c),
						d = null,
						d = a === this._customDataFallbackType ? c.content : c.data && c.data[a] ? c.data[a] : this._getData(a, !0);
					return null !== d ? d : ""
				},
				setData: function (a, b) {
					var c = a === this._customDataFallbackType;
					c && (b = this._applyDataComment(b, this._getFallbackTypeData()));
					var d = b,
						f = this._dataTransfer.$;
					try {
						f.setData(a, d), c && (this._dataTransfer._.nativeHtmlCache = d)
					} catch (g) {
						if (this._isUnsupportedMimeTypeError(g)) {
							c = CKEDITOR.plugins.clipboard.fallbackDataTransfer; - 1 === CKEDITOR.tools.indexOf(c._customTypes,
								a) && c._customTypes.push(a);
							var c = this._getFallbackTypeContent(),
								e = this._getFallbackTypeData();
							e[a] = d;
							try {
								d = this._applyDataComment(c, e), f.setData(this._customDataFallbackType, d), this._dataTransfer._.nativeHtmlCache = d
							} catch (k) {
								d = ""
							}
						}
					}
					return d
				},
				_getData: function (a, b) {
					var c = this._dataTransfer._.data;
					if (!b && c[a]) return c[a];
					try {
						return this._dataTransfer.$.getData(a)
					} catch (d) {
						return null
					}
				},
				_getFallbackTypeContent: function () {
					var a = this._dataTransfer._.data[this._customDataFallbackType];
					a || (a = this._extractDataComment(this._getData(this._customDataFallbackType, !0)).content);
					return a
				},
				_getFallbackTypeData: function () {
					var a = CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes,
						b = this._extractDataComment(this._getData(this._customDataFallbackType, !0)).data || {},
						c = this._dataTransfer._.data;
					CKEDITOR.tools.array.forEach(a, function (a) {
						void 0 !== c[a] ? b[a] = c[a] : void 0 !== b[a] && (b[a] = b[a])
					}, this);
					return b
				},
				_isUnsupportedMimeTypeError: function (a) {
					return a.message && -1 !== a.message.search(/element not found/gi)
				},
				_extractDataComment: function (a) {
					var b = {
						data: null,
						content: a ||
							""
					};
					if (a && 16 < a.length) {
						var c;
						(c = /\x3c!--cke-data:(.*?)--\x3e/g.exec(a)) && c[1] && (b.data = JSON.parse(decodeURIComponent(c[1])), b.content = a.replace(c[0], ""))
					}
					return b
				},
				_applyDataComment: function (a, b) {
					var c = "";
					b && CKEDITOR.tools.objectKeys(b).length && (c = "\x3c!--cke-data:" + encodeURIComponent(JSON.stringify(b)) + "--\x3e");
					return c + (a && a.length ? a : "")
				}
			}
		}(), CKEDITOR.config.clipboard_notificationDuration = 1E4, CKEDITOR.plugins.add("panelbutton", {
			requires: "button",
			onLoad: function () {
				function a(a) {
					var b = this._;
					b.state !=
						CKEDITOR.TRISTATE_DISABLED && (this.createPanel(a), b.on ? b.panel.hide() : b.panel.showBlock(this._.id, this.document.getById(this._.id), 4))
				}
				CKEDITOR.ui.panelButton = CKEDITOR.tools.createClass({
					base: CKEDITOR.ui.button,
					$: function (e) {
						var b = e.panel || {};
						delete e.panel;
						this.base(e);
						this.document = b.parent && b.parent.getDocument() || CKEDITOR.document;
						b.block = {
							attributes: b.attributes
						};
						b.toolbarRelated = !0;
						this.hasArrow = "listbox";
						this.click = a;
						this._ = {
							panelDefinition: b
						}
					},
					statics: {
						handler: {
							create: function (a) {
								return new CKEDITOR.ui.panelButton(a)
							}
						}
					},
					proto: {
						createPanel: function (a) {
							var b = this._;
							if (!b.panel) {
								var c = this._.panelDefinition,
									g = this._.panelDefinition.block,
									l = c.parent || CKEDITOR.document.getBody(),
									k = this._.panel = new CKEDITOR.ui.floatPanel(a, l, c),
									c = k.addBlock(b.id, g),
									f = this;
								k.onShow = function () {
									f.className && this.element.addClass(f.className + "_panel");
									f.setState(CKEDITOR.TRISTATE_ON);
									b.on = 1;
									f.editorFocus && a.focus();
									if (f.onOpen) f.onOpen()
								};
								k.onHide = function (c) {
									f.className && this.element.getFirst().removeClass(f.className + "_panel");
									f.setState(f.modes &&
										f.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
									b.on = 0;
									if (!c && f.onClose) f.onClose()
								};
								k.onEscape = function () {
									k.hide(1);
									f.document.getById(b.id).focus()
								};
								if (this.onBlock) this.onBlock(k, c);
								c.onHide = function () {
									b.on = 0;
									f.setState(CKEDITOR.TRISTATE_OFF)
								}
							}
						}
					}
				})
			},
			beforeInit: function (a) {
				a.ui.addHandler(CKEDITOR.UI_PANELBUTTON, CKEDITOR.ui.panelButton.handler)
			}
		}), CKEDITOR.UI_PANELBUTTON = "panelbutton",
		function () {
			CKEDITOR.plugins.add("panel", {
				beforeInit: function (a) {
					a.ui.addHandler(CKEDITOR.UI_PANEL,
						CKEDITOR.ui.panel.handler)
				}
			});
			CKEDITOR.UI_PANEL = "panel";
			CKEDITOR.ui.panel = function (a, b) {
				b && CKEDITOR.tools.extend(this, b);
				CKEDITOR.tools.extend(this, {
					className: "",
					css: []
				});
				this.id = CKEDITOR.tools.getNextId();
				this.document = a;
				this.isFramed = this.forceIFrame || this.css.length;
				this._ = {
					blocks: {}
				}
			};
			CKEDITOR.ui.panel.handler = {
				create: function (a) {
					return new CKEDITOR.ui.panel(a)
				}
			};
			var a = CKEDITOR.addTemplate("panel", '\x3cdiv lang\x3d"{langCode}" id\x3d"{id}" dir\x3d{dir} class\x3d"cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style\x3d"z-index:{z-index}" role\x3d"presentation"\x3e{frame}\x3c/div\x3e'),
				e = CKEDITOR.addTemplate("panel-frame", '\x3ciframe id\x3d"{id}" class\x3d"cke_panel_frame" role\x3d"presentation" frameborder\x3d"0" src\x3d"{src}"\x3e\x3c/iframe\x3e'),
				b = CKEDITOR.addTemplate("panel-frame-inner", '\x3c!DOCTYPE html\x3e\x3chtml class\x3d"cke_panel_container {env}" dir\x3d"{dir}" lang\x3d"{langCode}"\x3e\x3chead\x3e{css}\x3c/head\x3e\x3cbody class\x3d"cke_{dir}" style\x3d"margin:0;padding:0" onload\x3d"{onload}"\x3e\x3c/body\x3e\x3c/html\x3e');
			CKEDITOR.ui.panel.prototype = {
				render: function (c,
					g) {
					var l = {
						editorId: c.id,
						id: this.id,
						langCode: c.langCode,
						dir: c.lang.dir,
						cls: this.className,
						frame: "",
						env: CKEDITOR.env.cssClass,
						"z-index": c.config.baseFloatZIndex + 1
					};
					this.getHolderElement = function () {
						var a = this._.holder;
						if (!a) {
							if (this.isFramed) {
								var a = this.document.getById(this.id + "_frame"),
									c = a.getParent(),
									a = a.getFrameDocument();
								CKEDITOR.env.iOS && c.setStyles({
									overflow: "scroll",
									"-webkit-overflow-scrolling": "touch"
								});
								c = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function () {
										this.isLoaded = !0;
										if (this.onLoad) this.onLoad()
									},
									this));
								a.write(b.output(CKEDITOR.tools.extend({
									css: CKEDITOR.tools.buildStyleHtml(this.css),
									onload: "window.parent.CKEDITOR.tools.callFunction(" + c + ");"
								}, l)));
								a.getWindow().$.CKEDITOR = CKEDITOR;
								a.on("keydown", function (a) {
									var b = a.data.getKeystroke(),
										c = this.document.getById(this.id).getAttribute("dir");
									if ("input" !== a.data.getTarget().getName() || 37 !== b && 39 !== b) this._.onKeyDown && !1 === this._.onKeyDown(b) ? "input" === a.data.getTarget().getName() && 32 === b || a.data.preventDefault() : (27 == b || b == ("rtl" == c ? 39 : 37)) &&
										this.onEscape && !1 === this.onEscape(b) && a.data.preventDefault()
								}, this);
								a = a.getBody();
								a.unselectable();
								CKEDITOR.env.air && CKEDITOR.tools.callFunction(c)
							} else a = this.document.getById(this.id);
							this._.holder = a
						}
						return a
					};
					if (this.isFramed) {
						var k = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie && !CKEDITOR.env.edge ? "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())" : "";
						l.frame = e.output({
							id: this.id + "_frame",
							src: k
						})
					}
					k = a.output(l);
					g &&
						g.push(k);
					return k
				},
				addBlock: function (a, b) {
					b = this._.blocks[a] = b instanceof CKEDITOR.ui.panel.block ? b : new CKEDITOR.ui.panel.block(this.getHolderElement(), b);
					this._.currentBlock || this.showBlock(a);
					return b
				},
				getBlock: function (a) {
					return this._.blocks[a]
				},
				showBlock: function (a) {
					a = this._.blocks[a];
					var b = this._.currentBlock,
						e = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame");
					b && b.hide();
					this._.currentBlock = a;
					CKEDITOR.fire("ariaWidget", e);
					a._.focusIndex = -1;
					this._.onKeyDown =
						a.onKeyDown && CKEDITOR.tools.bind(a.onKeyDown, a);
					a.show();
					return a
				},
				destroy: function () {
					this.element && this.element.remove()
				}
			};
			CKEDITOR.ui.panel.block = CKEDITOR.tools.createClass({
				$: function (a, b) {
					this.element = a.append(a.getDocument().createElement("div", {
						attributes: {
							tabindex: -1,
							"class": "cke_panel_block"
						},
						styles: {
							display: "none"
						}
					}));
					b && CKEDITOR.tools.extend(this, b);
					this.element.setAttributes({
						role: this.attributes.role || "presentation",
						"aria-label": this.attributes["aria-label"],
						title: this.attributes.title ||
							this.attributes["aria-label"]
					});
					this.keys = {};
					this._.focusIndex = -1;
					this.element.disableContextMenu()
				},
				_: {
					markItem: function (a) {
						-1 != a && (a = this._.getItems().getItem(this._.focusIndex = a), CKEDITOR.env.webkit && a.getDocument().getWindow().focus(), a.focus(), this.onMark && this.onMark(a))
					},
					markFirstDisplayed: function (a) {
						for (var b = function (a) {
								return a.type == CKEDITOR.NODE_ELEMENT && "none" == a.getStyle("display")
							}, e = this._.getItems(), k, f, d = e.count() - 1; 0 <= d; d--)
							if (k = e.getItem(d), k.getAscendant(b) || (f = k, this._.focusIndex =
									d), "true" == k.getAttribute("aria-selected")) {
								f = k;
								this._.focusIndex = d;
								break
							}
						f && (a && a(), CKEDITOR.env.webkit && f.getDocument().getWindow().focus(), f.focus(), this.onMark && this.onMark(f))
					},
					getItems: function () {
						return this.element.find("a,input")
					}
				},
				proto: {
					show: function () {
						this.element.setStyle("display", "")
					},
					hide: function () {
						this.onHide && !0 === this.onHide.call(this) || this.element.setStyle("display", "none")
					},
					onKeyDown: function (a, b) {
						var e = this.keys[a];
						switch (e) {
							case "next":
								for (var k = this._.focusIndex, e = this._.getItems(),
										f; f = e.getItem(++k);)
									if (f.getAttribute("_cke_focus") && f.$.offsetWidth) {
										this._.focusIndex = k;
										f.focus(!0);
										break
									}
								return f || b ? !1 : (this._.focusIndex = -1, this.onKeyDown(a, 1));
							case "prev":
								k = this._.focusIndex;
								for (e = this._.getItems(); 0 < k && (f = e.getItem(--k));) {
									if (f.getAttribute("_cke_focus") && f.$.offsetWidth) {
										this._.focusIndex = k;
										f.focus(!0);
										break
									}
									f = null
								}
								return f || b ? !1 : (this._.focusIndex = e.count(), this.onKeyDown(a, 1));
							case "click":
							case "mouseup":
								return k = this._.focusIndex, (f = 0 <= k && this._.getItems().getItem(k)) &&
									(f.$[e] ? f.$[e]() : f.$["on" + e]()), !1
						}
						return !0
					}
				}
			})
		}(), CKEDITOR.plugins.add("floatpanel", {
			requires: "panel"
		}),
		function () {
			function a(a, c, g, l, k) {
				k = CKEDITOR.tools.genKey(c.getUniqueId(), g.getUniqueId(), a.lang.dir, a.uiColor || "", l.css || "", k || "");
				var f = e[k];
				f || (f = e[k] = new CKEDITOR.ui.panel(c, l), f.element = g.append(CKEDITOR.dom.element.createFromHtml(f.render(a), c)), f.element.setStyles({
					display: "none",
					position: "absolute"
				}));
				return f
			}
			var e = {};
			CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
				$: function (b, c, g,
					e) {
					function k() {
						h.hide()
					}
					g.forceIFrame = 1;
					g.toolbarRelated && b.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (c = CKEDITOR.document.getById("cke_" + b.name));
					var f = c.getDocument();
					e = a(b, f, c, g, e || 0);
					var d = e.element,
						m = d.getFirst(),
						h = this;
					d.disableContextMenu();
					this.element = d;
					this._ = {
						editor: b,
						panel: e,
						parentElement: c,
						definition: g,
						document: f,
						iframe: m,
						children: [],
						dir: b.lang.dir,
						showBlockParams: null,
						markFirst: void 0 !== g.markFirst ? g.markFirst : !0
					};
					b.on("mode", k);
					b.on("resize", k);
					f.getWindow().on("resize", function () {
							this.reposition()
						},
						this)
				},
				proto: {
					addBlock: function (a, c) {
						return this._.panel.addBlock(a, c)
					},
					addListBlock: function (a, c) {
						return this._.panel.addListBlock(a, c)
					},
					getBlock: function (a) {
						return this._.panel.getBlock(a)
					},
					showBlock: function (a, c, g, e, k, f) {
						var d = this._.panel,
							m = d.showBlock(a);
						this._.showBlockParams = [].slice.call(arguments);
						this.allowBlur(!1);
						var h = this._.editor.editable();
						this._.returnFocus = h.hasFocus ? h : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement);
						this._.hideTimeout = 0;
						var n = this.element,
							h = this._.iframe,
							h = CKEDITOR.env.ie && !CKEDITOR.env.edge ? h : new CKEDITOR.dom.window(h.$.contentWindow),
							p = n.getDocument(),
							q = this._.parentElement.getPositionedAncestor(),
							y = c.getDocumentPosition(p),
							p = q ? q.getDocumentPosition(p) : {
								x: 0,
								y: 0
							},
							u = "rtl" == this._.dir,
							r = y.x + (e || 0) - p.x,
							w = y.y + (k || 0) - p.y;
						!u || 1 != g && 4 != g ? u || 2 != g && 3 != g || (r += c.$.offsetWidth - 1) : r += c.$.offsetWidth;
						if (3 == g || 4 == g) w += c.$.offsetHeight - 1;
						this._.panel._.offsetParentId = c.getId();
						n.setStyles({
							top: w + "px",
							left: 0,
							display: ""
						});
						n.setOpacity(0);
						n.getFirst().removeStyle("width");
						this._.editor.focusManager.add(h);
						this._.blurSet || (CKEDITOR.event.useCapture = !0, h.on("blur", function (a) {
							function b() {
								delete this._.returnFocus;
								this.hide()
							}
							this.allowBlur() && a.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET && this.visible && !this._.activeChild && (CKEDITOR.env.iOS ? this._.hideTimeout || (this._.hideTimeout = CKEDITOR.tools.setTimeout(b, 0, this)) : b.call(this))
						}, this), h.on("focus", function () {
							this._.focused = !0;
							this.hideChild();
							this.allowBlur(!0)
						}, this), CKEDITOR.env.iOS && (h.on("touchstart", function () {
								clearTimeout(this._.hideTimeout)
							},
							this), h.on("touchend", function () {
							this._.hideTimeout = 0;
							this.focus()
						}, this)), CKEDITOR.event.useCapture = !1, this._.blurSet = 1);
						d.onEscape = CKEDITOR.tools.bind(function (a) {
							if (this.onEscape && !1 === this.onEscape(a)) return !1
						}, this);
						CKEDITOR.tools.setTimeout(function () {
							var a = CKEDITOR.tools.bind(function () {
								var a = n;
								a.removeStyle("width");
								if (m.autoSize) {
									var b = m.element.getDocument(),
										b = (CKEDITOR.env.webkit || CKEDITOR.env.edge ? m.element : b.getBody()).$.scrollWidth;
									CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetWidth ||
										0) - (a.$.clientWidth || 0) + 3);
									a.setStyle("width", b + 10 + "px");
									b = m.element.$.scrollHeight;
									CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetHeight || 0) - (a.$.clientHeight || 0) + 3);
									a.setStyle("height", b + "px");
									d._.currentBlock.element.setStyle("display", "none").removeStyle("display")
								} else a.removeStyle("height");
								u && (r -= n.$.offsetWidth);
								n.setStyle("left", r + "px");
								var b = d.element.getWindow(),
									a = n.$.getBoundingClientRect(),
									b = b.getViewPaneSize(),
									c = a.width || a.right - a.left,
									h = a.height || a.bottom - a.top,
									g = u ? a.right :
									b.width - a.left,
									e = u ? b.width - a.right : a.left;
								u ? g < c && (r = e > c ? r + c : b.width > c ? r - a.left : r - a.right + b.width) : g < c && (r = e > c ? r - c : b.width > c ? r - a.right + b.width : r - a.left);
								c = a.top;
								b.height - a.top < h && (w = c > h ? w - h : b.height > h ? w - a.bottom + b.height : w - a.top);
								CKEDITOR.env.ie && !CKEDITOR.env.edge && (b = a = new CKEDITOR.dom.element(n.$.offsetParent), "html" == b.getName() && (b = b.getDocument().getBody()), "rtl" == b.getComputedStyle("direction") && (r = CKEDITOR.env.ie8Compat ? r - 2 * n.getDocument().getDocumentElement().$.scrollLeft : r - (a.$.scrollWidth -
									a.$.clientWidth)));
								var a = n.getFirst(),
									k;
								(k = a.getCustomData("activePanel")) && k.onHide && k.onHide.call(this, 1);
								a.setCustomData("activePanel", this);
								n.setStyles({
									top: w + "px",
									left: r + "px"
								});
								n.setOpacity(1);
								f && f()
							}, this);
							d.isLoaded ? a() : d.onLoad = a;
							CKEDITOR.tools.setTimeout(function () {
								var a = CKEDITOR.env.webkit && CKEDITOR.document.getWindow().getScrollPosition().y;
								this.focus();
								m.element.focus();
								CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = a);
								this.allowBlur(!0);
								this._.markFirst && (CKEDITOR.env.ie ?
									CKEDITOR.tools.setTimeout(function () {
										m.markFirstDisplayed ? m.markFirstDisplayed() : m._.markFirstDisplayed()
									}, 0) : m.markFirstDisplayed ? m.markFirstDisplayed() : m._.markFirstDisplayed());
								this._.editor.fire("panelShow", this)
							}, 0, this)
						}, CKEDITOR.env.air ? 200 : 0, this);
						this.visible = 1;
						this.onShow && this.onShow.call(this)
					},
					reposition: function () {
						var a = this._.showBlockParams;
						this.visible && this._.showBlockParams && (this.hide(), this.showBlock.apply(this, a))
					},
					focus: function () {
						if (CKEDITOR.env.webkit) {
							var a = CKEDITOR.document.getActive();
							a && !a.equals(this._.iframe) && a.$.blur()
						}(this._.lastFocused || this._.iframe.getFrameDocument().getWindow()).focus()
					},
					blur: function () {
						var a = this._.iframe.getFrameDocument().getActive();
						a && a.is("a") && (this._.lastFocused = a)
					},
					hide: function (a) {
						if (this.visible && (!this.onHide || !0 !== this.onHide.call(this))) {
							this.hideChild();
							CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur();
							this.element.setStyle("display", "none");
							this.visible = 0;
							this.element.getFirst().removeCustomData("activePanel");
							if (a = a && this._.returnFocus) CKEDITOR.env.webkit && a.type && a.getWindow().$.focus(), a.focus();
							delete this._.lastFocused;
							this._.showBlockParams = null;
							this._.editor.fire("panelHide", this)
						}
					},
					allowBlur: function (a) {
						var c = this._.panel;
						void 0 !== a && (c.allowBlur = a);
						return c.allowBlur
					},
					showAsChild: function (a, c, g, e, k, f) {
						if (this._.activeChild != a || a._.panel._.offsetParentId != g.getId()) this.hideChild(), a.onHide = CKEDITOR.tools.bind(function () {
								CKEDITOR.tools.setTimeout(function () {
									this._.focused || this.hide()
								}, 0, this)
							},
							this), this._.activeChild = a, this._.focused = !1, a.showBlock(c, g, e, k, f), this.blur(), (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function () {
							a.element.getChild(0).$.style.cssText += ""
						}, 100)
					},
					hideChild: function (a) {
						var c = this._.activeChild;
						c && (delete c.onHide, delete this._.activeChild, c.hide(), a && this.focus())
					}
				}
			});
			CKEDITOR.on("instanceDestroyed", function () {
				var a = CKEDITOR.tools.isEmpty(CKEDITOR.instances),
					c;
				for (c in e) {
					var g = e[c];
					a ? g.destroy() : g.element.hide()
				}
				a && (e = {})
			})
		}(), CKEDITOR.plugins.add("colorbutton", {
			requires: "panelbutton,floatpanel",
			init: function (a) {
				function e(c, d, f, e, q) {
					var y = new CKEDITOR.style(l["colorButton_" + d + "Style"]),
						u = CKEDITOR.tools.getNextId() + "_colorBox",
						r;
					q = q || {};
					a.ui.add(c, CKEDITOR.UI_PANELBUTTON, {
						label: f,
						title: f,
						modes: {
							wysiwyg: 1
						},
						editorFocus: 0,
						toolbar: "colors," + e,
						allowedContent: y,
						requiredContent: y,
						contentTransformations: q.contentTransformations,
						panel: {
							css: CKEDITOR.skin.getPath("editor"),
							attributes: {
								role: "listbox",
								"aria-label": k.panelTitle
							}
						},
						onBlock: function (c, f) {
							r = f;
							f.autoSize = !0;
							f.element.addClass("cke_colorblock");
							f.element.setHtml(b(c, d, u));
							f.element.getDocument().getBody().setStyle("overflow", "hidden");
							CKEDITOR.ui.fire("ready", this);
							var g = f.keys,
								e = "rtl" == a.lang.dir;
							g[e ? 37 : 39] = "next";
							g[40] = "next";
							g[9] = "next";
							g[e ? 39 : 37] = "prev";
							g[38] = "prev";
							g[CKEDITOR.SHIFT + 9] = "prev";
							g[32] = "click"
						},
						refresh: function () {
							a.activeFilter.check(y) || this.setState(CKEDITOR.TRISTATE_DISABLED)
						},
						onOpen: function () {
							var b = a.getSelection(),
								c = b && b.getStartElement(),
								f = a.elementPath(c);
							if (f) {
								c = f.block ||
									f.blockLimit || a.document.getBody();
								do f = c && c.getComputedStyle("back" == d ? "background-color" : "color") || "transparent"; while ("back" == d && "transparent" == f && c && (c = c.getParent()));
								f && "transparent" != f || (f = "#ffffff");
								!1 !== l.colorButton_enableAutomatic && this._.panel._.iframe.getFrameDocument().getById(u).setStyle("background-color", f);
								if (c = b && b.getRanges()[0]) {
									for (var b = new CKEDITOR.dom.walker(c), e = c.collapsed ? c.startContainer : b.next(), c = ""; e;) {
										e.type !== CKEDITOR.NODE_ELEMENT && (e = e.getParent());
										e = g(e.getComputedStyle("back" ==
											d ? "background-color" : "color"));
										c = c || e;
										if (c !== e) {
											c = "";
											break
										}
										e = b.next()
									}
									b = c;
									c = r._.getItems();
									for (e = 0; e < c.count(); e++) {
										var k = c.getItem(e);
										k.removeAttribute("aria-selected");
										b && b == g(k.getAttribute("data-value")) && k.setAttribute("aria-selected", !0)
									}
								}
								return f
							}
						}
					})
				}

				function b(b, d, f) {
					b = [];
					var g = l.colorButton_colors.split(","),
						e = l.colorButton_colorsPerRow || 6,
						y = a.plugins.colordialog && !1 !== l.colorButton_enableMore,
						u = g.length + (y ? 2 : 1),
						r = CKEDITOR.tools.addFunction(function (b, d) {
							function f(b) {
								var h = l["colorButton_" +
									d + "Style"];
								a.removeStyle(new CKEDITOR.style(h, {
									color: "inherit"
								}));
								h.childRule = "back" == d ? function (a) {
									return c(a)
								} : function (a) {
									return !(a.is("a") || a.getElementsByTag("a").count()) || c(a)
								};
								a.focus();
								b && a.applyStyle(new CKEDITOR.style(h, {
									color: b
								}));
								a.fire("saveSnapshot")
							}
							a.focus();
							a.fire("saveSnapshot");
							if ("?" == b) a.getColorFromDialog(function (a) {
								if (a) return f(a)
							});
							else return f(b)
						});
					!1 !== l.colorButton_enableAutomatic && b.push('\x3ca class\x3d"cke_colorauto" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"',
						k.auto, '" onclick\x3d"CKEDITOR.tools.callFunction(', r, ",null,'", d, "');return false;\" href\x3d\"javascript:void('", k.auto, '\')" role\x3d"option" aria-posinset\x3d"1" aria-setsize\x3d"', u, '"\x3e\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e\x3ctr\x3e\x3ctd colspan\x3d"' + e + '" align\x3d"center"\x3e\x3cspan class\x3d"cke_colorbox" id\x3d"', f, '"\x3e\x3c/span\x3e', k.auto, "\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/a\x3e");
					b.push('\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e');
					for (f = 0; f < g.length; f++) {
						0 === f % e && b.push("\x3c/tr\x3e\x3ctr\x3e");
						var w = g[f].split("/"),
							t = w[0],
							B = w[1] || t;
						w[1] ? w = t : (t = "#" + t.replace(/^(.)(.)(.)$/, "$1$1$2$2$3$3"), w = a.lang.colorbutton.colors[B] || B);
						b.push('\x3ctd\x3e\x3ca class\x3d"cke_colorbox" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"', w, '" onclick\x3d"CKEDITOR.tools.callFunction(', r, ",'", t, "','", d, "'); return false;\" href\x3d\"javascript:void('", w, '\')" data-value\x3d"' + B + '" role\x3d"option" aria-posinset\x3d"', f + 2, '" aria-setsize\x3d"', u, '"\x3e\x3cspan class\x3d"cke_colorbox" style\x3d"background-color:#',
							B, '"\x3e\x3c/span\x3e\x3c/a\x3e\x3c/td\x3e')
					}
					y && b.push('\x3c/tr\x3e\x3ctr\x3e\x3ctd colspan\x3d"' + e + '" align\x3d"center"\x3e\x3ca class\x3d"cke_colormore" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"', k.more, '" onclick\x3d"CKEDITOR.tools.callFunction(', r, ",'?','", d, "');return false;\" href\x3d\"javascript:void('", k.more, "')\"", ' role\x3d"option" aria-posinset\x3d"', u, '" aria-setsize\x3d"', u, '"\x3e', k.more, "\x3c/a\x3e\x3c/td\x3e");
					b.push("\x3c/tr\x3e\x3c/table\x3e");
					return b.join("")
				}

				function c(a) {
					return "false" ==
						a.getAttribute("contentEditable") || a.getAttribute("data-nostyle")
				}

				function g(a) {
					return CKEDITOR.tools.normalizeHex("#" + CKEDITOR.tools.convertRgbToHex(a || "")).replace(/#/g, "")
				}
				var l = a.config,
					k = a.lang.colorbutton;
				if (!CKEDITOR.env.hc) {
					e("TextColor", "fore", k.textColorTitle, 10, {
						contentTransformations: [
							[{
								element: "font",
								check: "span{color}",
								left: function (a) {
									return !!a.attributes.color
								},
								right: function (a) {
									a.name = "span";
									a.attributes.color && (a.styles.color = a.attributes.color);
									delete a.attributes.color
								}
							}]
						]
					});
					var f = {},
						d = a.config.colorButton_normalizeBackground;
					if (void 0 === d || d) f.contentTransformations = [
						[{
							element: "span",
							left: function (a) {
								var b = CKEDITOR.tools;
								if ("span" != a.name || !a.styles || !a.styles.background) return !1;
								a = b.style.parse.background(a.styles.background);
								return a.color && 1 === b.objectKeys(a).length
							},
							right: function (b) {
								var c = (new CKEDITOR.style(a.config.colorButton_backStyle, {
									color: b.styles.background
								})).getDefinition();
								b.name = c.element;
								b.styles = c.styles;
								b.attributes = c.attributes || {};
								return b
							}
						}]
					];
					e("BGColor",
						"back", k.bgColorTitle, 20, f)
				}
			}
		}), CKEDITOR.config.colorButton_colors = "1ABC9C,2ECC71,3498DB,9B59B6,4E5F70,F1C40F,16A085,27AE60,2980B9,8E44AD,2C3E50,F39C12,E67E22,E74C3C,ECF0F1,95A5A6,DDD,FFF,D35400,C0392B,BDC3C7,7F8C8D,999,000", CKEDITOR.config.colorButton_foreStyle = {
			element: "span",
			styles: {
				color: "#(color)"
			},
			overrides: [{
				element: "font",
				attributes: {
					color: null
				}
			}]
		}, CKEDITOR.config.colorButton_backStyle = {
			element: "span",
			styles: {
				"background-color": "#(color)"
			}
		}, CKEDITOR.plugins.colordialog = {
			requires: "dialog",
			init: function (a) {
				var e = new CKEDITOR.dialogCommand("colordialog");
				e.editorFocus = !1;
				a.addCommand("colordialog", e);
				CKEDITOR.dialog.add("colordialog", this.path + "dialogs/colordialog.js");
				a.getColorFromDialog = function (b, c) {
					var g, e, k;
					g = function (a) {
						e(this);
						a = "ok" == a.name ? this.getValueOf("picker", "selectedColor") : null;
						/^[0-9a-f]{3}([0-9a-f]{3})?$/i.test(a) && (a = "#" + a);
						b.call(c, a)
					};
					e = function (a) {
						a.removeListener("ok", g);
						a.removeListener("cancel", g)
					};
					k = function (a) {
						a.on("ok", g);
						a.on("cancel", g)
					};
					a.execCommand("colordialog");
					if (a._.storedDialogs && a._.storedDialogs.colordialog) k(a._.storedDialogs.colordialog);
					else CKEDITOR.on("dialogDefinition", function (a) {
						if ("colordialog" == a.data.name) {
							var b = a.data.definition;
							a.removeListener();
							b.onLoad = CKEDITOR.tools.override(b.onLoad, function (a) {
								return function () {
									k(this);
									b.onLoad = a;
									"function" == typeof a && a.call(this)
								}
							})
						}
					})
				}
			}
		}, CKEDITOR.plugins.add("colordialog", CKEDITOR.plugins.colordialog),
		function () {
			function a(a, b, c, g) {
				var h = new CKEDITOR.dom.walker(a);
				if (a = a.startContainer.getAscendant(b, !0) || a.endContainer.getAscendant(b, !0))
					if (c(a), g) return;
				for (; a = h.next();)
					if (a = a.getAscendant(b, !0))
						if (c(a), g) break
			}

			function e(a, b) {
				var d = {
					ul: "ol",
					ol: "ul"
				};
				return -1 !== c(b, function (b) {
					return b.element === a || b.element === d[a]
				})
			}

			function b(a) {
				this.styles = null;
				this.sticky = !1;
				this.editor = a;
				this.filter = new CKEDITOR.filter(a, a.config.copyFormatting_allowRules);
				!0 === a.config.copyFormatting_allowRules && (this.filter.disabled = !0);
				a.config.copyFormatting_disallowRules && this.filter.disallow(a.config.copyFormatting_disallowRules)
			}
			var c = CKEDITOR.tools.indexOf,
				g = CKEDITOR.tools.getMouseButton,
				l = !1;
			CKEDITOR.plugins.add("copyformatting", {
				lang: "az,de,en,it,ja,nb,nl,oc,pl,pt-br,ru,sv,tr,zh,zh-cn",
				icons: "copyformatting",
				hidpi: !0,
				init: function (a) {
					var b = CKEDITOR.plugins.copyformatting;
					b._addScreenReaderContainer();
					l || (CKEDITOR.document.appendStyleSheet(this.path + "styles/copyformatting.css"), l = !0);
					a.addContentsCss && a.addContentsCss(this.path + "styles/copyformatting.css");
					a.copyFormatting = new b.state(a);
					a.addCommand("copyFormatting", b.commands.copyFormatting);
					a.addCommand("applyFormatting", b.commands.applyFormatting);
					a.ui.addButton("CopyFormatting", {
						label: a.lang.copyformatting.label,
						command: "copyFormatting",
						toolbar: "cleanup,0"
					});
					a.on("contentDom", function () {
						var b = a.editable(),
							c = b.isInline() ? b : a.document,
							f = a.ui.get("CopyFormatting");
						b.attachListener(c, "mouseup", function (b) {
							g(b) === CKEDITOR.MOUSE_BUTTON_LEFT && a.execCommand("applyFormatting")
						});
						b.attachListener(CKEDITOR.document, "mouseup", function (c) {
							var f = a.getCommand("copyFormatting");
							g(c) !== CKEDITOR.MOUSE_BUTTON_LEFT ||
								f.state !== CKEDITOR.TRISTATE_ON || b.contains(c.data.getTarget()) || a.execCommand("copyFormatting")
						});
						f && (c = CKEDITOR.document.getById(f._.id), b.attachListener(c, "dblclick", function () {
							a.execCommand("copyFormatting", {
								sticky: !0
							})
						}), b.attachListener(c, "mouseup", function (a) {
							a.data.stopPropagation()
						}))
					});
					a.config.copyFormatting_keystrokeCopy && a.setKeystroke(a.config.copyFormatting_keystrokeCopy, "copyFormatting");
					a.on("key", function (b) {
						var c = a.getCommand("copyFormatting");
						b = b.data.domEvent;
						b.getKeystroke && 27 ===
							b.getKeystroke() && c.state === CKEDITOR.TRISTATE_ON && a.execCommand("copyFormatting")
					});
					a.copyFormatting.on("extractFormatting", function (c) {
						var g = c.data.element;
						if (g.contains(a.editable()) || g.equals(a.editable())) return c.cancel();
						g = b._convertElementToStyleDef(g);
						if (!a.copyFormatting.filter.check(new CKEDITOR.style(g), !0, !0)) return c.cancel();
						c.data.styleDef = g
					});
					a.copyFormatting.on("applyFormatting", function (d) {
						if (!d.data.preventFormatStripping) {
							var g = d.data.range,
								h = b._extractStylesFromRange(a, g),
								l = b._determineContext(g),
								p, q;
							if (a.copyFormatting._isContextAllowed(l))
								for (q = 0; q < h.length; q++) l = h[q], p = g.createBookmark(), -1 === c(b.preservedElements, l.element) ? CKEDITOR.env.webkit && !CKEDITOR.env.chrome ? h[q].removeFromRange(d.data.range, d.editor) : h[q].remove(d.editor) : e(l.element, d.data.styles) && b._removeStylesFromElementInRange(g, l.element), g.moveToBookmark(p)
						}
					});
					a.copyFormatting.on("applyFormatting", function (b) {
						var c = CKEDITOR.plugins.copyformatting,
							f = c._determineContext(b.data.range);
						"list" === f && a.copyFormatting._isContextAllowed("list") ?
							c._applyStylesToListContext(b.editor, b.data.range, b.data.styles) : "table" === f && a.copyFormatting._isContextAllowed("table") ? c._applyStylesToTableContext(b.editor, b.data.range, b.data.styles) : a.copyFormatting._isContextAllowed("text") && c._applyStylesToTextContext(b.editor, b.data.range, b.data.styles)
					}, null, null, 999)
				}
			});
			b.prototype._isContextAllowed = function (a) {
				var b = this.editor.config.copyFormatting_allowedContexts;
				return !0 === b || -1 !== c(b, a)
			};
			CKEDITOR.event.implementOn(b.prototype);
			CKEDITOR.plugins.copyformatting = {
				state: b,
				inlineBoundary: "h1 h2 h3 h4 h5 h6 p div".split(" "),
				excludedAttributes: ["id", "style", "href", "data-cke-saved-href", "dir"],
				elementsForInlineTransform: ["li"],
				excludedElementsFromInlineTransform: ["table", "thead", "tbody", "ul", "ol"],
				excludedAttributesFromInlineTransform: ["value", "type"],
				preservedElements: "ul ol li td th tr thead tbody table".split(" "),
				breakOnElements: ["ul", "ol", "table"],
				_initialKeystrokePasteCommand: null,
				commands: {
					copyFormatting: {
						exec: function (a, b) {
							var c = CKEDITOR.plugins.copyformatting,
								g = a.copyFormatting,
								h = b ? "keystrokeHandler" == b.from : !1,
								e = b ? b.sticky || h : !1,
								l = c._getCursorContainer(a),
								q = CKEDITOR.document.getDocumentElement();
							if (this.state === CKEDITOR.TRISTATE_ON) return g.styles = null, g.sticky = !1, l.removeClass("cke_copyformatting_active"), q.removeClass("cke_copyformatting_disabled"), q.removeClass("cke_copyformatting_tableresize_cursor"), c._putScreenReaderMessage(a, "canceled"), c._detachPasteKeystrokeHandler(a), this.setState(CKEDITOR.TRISTATE_OFF);
							g.styles = c._extractStylesFromElement(a,
								a.elementPath().lastElement);
							this.setState(CKEDITOR.TRISTATE_ON);
							h || (l.addClass("cke_copyformatting_active"), q.addClass("cke_copyformatting_tableresize_cursor"), a.config.copyFormatting_outerCursor && q.addClass("cke_copyformatting_disabled"));
							g.sticky = e;
							c._putScreenReaderMessage(a, "copied");
							c._attachPasteKeystrokeHandler(a)
						}
					},
					applyFormatting: {
						editorFocus: CKEDITOR.env.ie && !CKEDITOR.env.edge ? !1 : !0,
						exec: function (a, b) {
							var c = a.getCommand("copyFormatting"),
								g = b ? "keystrokeHandler" == b.from : !1,
								h = CKEDITOR.plugins.copyformatting,
								e = a.copyFormatting,
								l = h._getCursorContainer(a),
								q = CKEDITOR.document.getDocumentElement();
							if (g || c.state === CKEDITOR.TRISTATE_ON) {
								if (g && !e.styles) return h._putScreenReaderMessage(a, "failed"), h._detachPasteKeystrokeHandler(a), !1;
								g = h._applyFormat(a, e.styles);
								e.sticky || (e.styles = null, l.removeClass("cke_copyformatting_active"), q.removeClass("cke_copyformatting_disabled"), q.removeClass("cke_copyformatting_tableresize_cursor"), c.setState(CKEDITOR.TRISTATE_OFF), h._detachPasteKeystrokeHandler(a));
								h._putScreenReaderMessage(a,
									g ? "applied" : "canceled")
							}
						}
					}
				},
				_getCursorContainer: function (a) {
					return a.elementMode === CKEDITOR.ELEMENT_MODE_INLINE ? a.editable() : a.editable().getParent()
				},
				_convertElementToStyleDef: function (a) {
					var b = CKEDITOR.tools,
						c = a.getAttributes(CKEDITOR.plugins.copyformatting.excludedAttributes),
						b = b.parseCssText(a.getAttribute("style"), !0, !0);
					return {
						element: a.getName(),
						type: CKEDITOR.STYLE_INLINE,
						attributes: c,
						styles: b
					}
				},
				_extractStylesFromElement: function (a, b) {
					var d = {},
						g = [];
					do
						if (b.type === CKEDITOR.NODE_ELEMENT && !b.hasAttribute("data-cke-bookmark") &&
							(d.element = b, a.copyFormatting.fire("extractFormatting", d, a) && d.styleDef && g.push(new CKEDITOR.style(d.styleDef)), b.getName && -1 !== c(CKEDITOR.plugins.copyformatting.breakOnElements, b.getName()))) break;
					while ((b = b.getParent()) && b.type === CKEDITOR.NODE_ELEMENT);
					return g
				},
				_extractStylesFromRange: function (a, b) {
					for (var c = [], g = new CKEDITOR.dom.walker(b), h; h = g.next();) c = c.concat(CKEDITOR.plugins.copyformatting._extractStylesFromElement(a, h));
					return c
				},
				_removeStylesFromElementInRange: function (a, b) {
					for (var d = -1 !==
							c(["ol", "ul", "table"], b), g = new CKEDITOR.dom.walker(a), h; h = g.next();)
						if (h = h.getAscendant(b, !0))
							if (h.removeAttributes(h.getAttributes()), d) break
				},
				_getSelectedWordOffset: function (a) {
					function b(a, c) {
						return a[c ? "getPrevious" : "getNext"](function (a) {
							return a.type !== CKEDITOR.NODE_COMMENT
						})
					}

					function d(a) {
						return a.type == CKEDITOR.NODE_ELEMENT ? (a = a.getHtml().replace(/<span.*?>&nbsp;<\/span>/g, ""), a.replace(/<.*?>/g, "")) : a.getText()
					}

					function g(a, h) {
						var e = a,
							k = /\s/g,
							l = "p br ol ul li td th div caption body".split(" "),
							n = !1,
							p = !1,
							x, y;
						do {
							for (x = b(e, h); !x && e.getParent();) {
								e = e.getParent();
								if (-1 !== c(l, e.getName())) {
									p = n = !0;
									break
								}
								x = b(e, h)
							}
							if (x && x.getName && -1 !== c(l, x.getName())) {
								n = !0;
								break
							}
							e = x
						} while (e && e.getStyle && ("none" == e.getStyle("display") || !e.getText()));
						for (e || (e = a); e.type !== CKEDITOR.NODE_TEXT;) e = !n || h || p ? e.getChild(0) : e.getChild(e.getChildCount() - 1);
						for (l = d(e); null != (p = k.exec(l)) && (y = p.index, h););
						if ("number" !== typeof y && !n) return g(e, h);
						if (n) h ? y = 0 : (k = /([\.\b]*$)/, y = (p = k.exec(l)) ? p.index : l.length);
						else if (h && (y +=
								1, y > l.length)) return g(e);
						return {
							node: e,
							offset: y
						}
					}
					var h = /\b\w+\b/ig,
						e, l, q, y, u;
					q = y = u = a.startContainer;
					for (e = d(q); null != (l = h.exec(e));)
						if (l.index + l[0].length >= a.startOffset) return a = l.index, h = l.index + l[0].length, 0 === l.index && (l = g(q, !0), y = l.node, a = l.offset), h >= e.length && (e = g(q), u = e.node, h = e.offset), {
							startNode: y,
							startOffset: a,
							endNode: u,
							endOffset: h
						};
					return null
				},
				_filterStyles: function (a) {
					var b = CKEDITOR.tools.isEmpty,
						c = [],
						g, h;
					for (h = 0; h < a.length; h++) g = a[h]._.definition, -1 !== CKEDITOR.tools.indexOf(CKEDITOR.plugins.copyformatting.inlineBoundary,
						g.element) && (g.element = a[h].element = "span"), "span" === g.element && b(g.attributes) && b(g.styles) || c.push(a[h]);
					return c
				},
				_determineContext: function (a) {
					function b(c) {
						var f = new CKEDITOR.dom.walker(a),
							g;
						if (a.startContainer.getAscendant(c, !0) || a.endContainer.getAscendant(c, !0)) return !0;
						for (; g = f.next();)
							if (g.getAscendant(c, !0)) return !0
					}
					return b({
						ul: 1,
						ol: 1
					}) ? "list" : b("table") ? "table" : "text"
				},
				_applyStylesToTextContext: function (a, b, d) {
					var g = CKEDITOR.plugins.copyformatting,
						h = g.excludedAttributesFromInlineTransform,
						e, l;
					CKEDITOR.env.webkit && !CKEDITOR.env.chrome && a.getSelection().selectRanges([b]);
					for (e = 0; e < d.length; e++)
						if (b = d[e], -1 === c(g.excludedElementsFromInlineTransform, b.element)) {
							if (-1 !== c(g.elementsForInlineTransform, b.element))
								for (b.element = b._.definition.element = "span", l = 0; l < h.length; l++) b._.definition.attributes[h[l]] && delete b._.definition.attributes[h[l]];
							b.apply(a)
						}
				},
				_applyStylesToListContext: function (b, c, d) {
					var g, h, e;
					for (e = 0; e < d.length; e++) g = d[e], h = c.createBookmark(), "ol" === g.element || "ul" === g.element ?
						a(c, {
							ul: 1,
							ol: 1
						}, function (a) {
							var b = g;
							a.getName() !== b.element && a.renameNode(b.element);
							b.applyToObject(a)
						}, !0) : "li" === g.element ? a(c, "li", function (a) {
							g.applyToObject(a)
						}) : CKEDITOR.plugins.copyformatting._applyStylesToTextContext(b, c, [g]), c.moveToBookmark(h)
				},
				_applyStylesToTableContext: function (b, f, d) {
					function g(a, b) {
						a.getName() !== b.element && (b = b.getDefinition(), b.element = a.getName(), b = new CKEDITOR.style(b));
						b.applyToObject(a)
					}
					var h, e, l;
					for (l = 0; l < d.length; l++) h = d[l], e = f.createBookmark(), -1 !== c(["table",
						"tr"
					], h.element) ? a(f, h.element, function (a) {
						h.applyToObject(a)
					}) : -1 !== c(["td", "th"], h.element) ? a(f, {
						td: 1,
						th: 1
					}, function (a) {
						g(a, h)
					}) : -1 !== c(["thead", "tbody"], h.element) ? a(f, {
						thead: 1,
						tbody: 1
					}, function (a) {
						g(a, h)
					}) : CKEDITOR.plugins.copyformatting._applyStylesToTextContext(b, f, [h]), f.moveToBookmark(e)
				},
				_applyFormat: function (a, b) {
					var c = a.getSelection().getRanges()[0],
						g = CKEDITOR.plugins.copyformatting,
						h, e;
					if (!c) return !1;
					if (c.collapsed) {
						e = a.getSelection().createBookmarks();
						if (!(h = g._getSelectedWordOffset(c))) return;
						c = a.createRange();
						c.setStart(h.startNode, h.startOffset);
						c.setEnd(h.endNode, h.endOffset);
						c.select()
					}
					b = g._filterStyles(b);
					if (!a.copyFormatting.fire("applyFormatting", {
							styles: b,
							range: c,
							preventFormatStripping: !1
						}, a)) return !1;
					e && a.getSelection().selectBookmarks(e);
					return !0
				},
				_putScreenReaderMessage: function (a, b) {
					var c = this._getScreenReaderContainer();
					c && c.setText(a.lang.copyformatting.notification[b])
				},
				_addScreenReaderContainer: function () {
					if (this._getScreenReaderContainer()) return this._getScreenReaderContainer();
					if (!CKEDITOR.env.ie6Compat && !CKEDITOR.env.ie7Compat) return CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_screen_reader_only cke_copyformatting_notification"\x3e\x3cdiv aria-live\x3d"polite"\x3e\x3c/div\x3e\x3c/div\x3e')).getChild(0)
				},
				_getScreenReaderContainer: function () {
					if (!CKEDITOR.env.ie6Compat && !CKEDITOR.env.ie7Compat) return CKEDITOR.document.getBody().findOne(".cke_copyformatting_notification div[aria-live]")
				},
				_attachPasteKeystrokeHandler: function (a) {
					var b =
						a.config.copyFormatting_keystrokePaste;
					b && (this._initialKeystrokePasteCommand = a.keystrokeHandler.keystrokes[b], a.setKeystroke(b, "applyFormatting"))
				},
				_detachPasteKeystrokeHandler: function (a) {
					var b = a.config.copyFormatting_keystrokePaste;
					b && a.setKeystroke(b, this._initialKeystrokePasteCommand || !1)
				}
			};
			CKEDITOR.config.copyFormatting_outerCursor = !0;
			CKEDITOR.config.copyFormatting_allowRules = "b s u i em strong span p div td th ol ul li(*)[*]{*}";
			CKEDITOR.config.copyFormatting_disallowRules = "*[data-cke-widget*,data-widget*,data-cke-realelement](cke_widget*)";
			CKEDITOR.config.copyFormatting_allowedContexts = !0;
			CKEDITOR.config.copyFormatting_keystrokeCopy = CKEDITOR.CTRL + CKEDITOR.SHIFT + 67;
			CKEDITOR.config.copyFormatting_keystrokePaste = CKEDITOR.CTRL + CKEDITOR.SHIFT + 86
		}(), CKEDITOR.plugins.add("menu", {
			requires: "floatpanel",
			beforeInit: function (a) {
				for (var e = a.config.menu_groups.split(","), b = a._.menuGroups = {}, c = a._.menuItems = {}, g = 0; g < e.length; g++) b[e[g]] = g + 1;
				a.addMenuGroup = function (a, c) {
					b[a] = c || 100
				};
				a.addMenuItem = function (a, g) {
					b[g.group] && (c[a] = new CKEDITOR.menuItem(this,
						a, g))
				};
				a.addMenuItems = function (a) {
					for (var b in a) this.addMenuItem(b, a[b])
				};
				a.getMenuItem = function (a) {
					return c[a]
				};
				a.removeMenuItem = function (a) {
					delete c[a]
				}
			}
		}),
		function () {
			function a(a) {
				a.sort(function (a, b) {
					return a.group < b.group ? -1 : a.group > b.group ? 1 : a.order < b.order ? -1 : a.order > b.order ? 1 : 0
				})
			}
			var e = '\x3cspan class\x3d"cke_menuitem"\x3e\x3ca id\x3d"{id}" class\x3d"cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href\x3d"{href}" title\x3d"{title}" tabindex\x3d"-1" _cke_focus\x3d1 hidefocus\x3d"true" role\x3d"{role}" aria-label\x3d"{label}" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasPopup}" aria-disabled\x3d"{disabled}" {ariaChecked} draggable\x3d"false"';
			CKEDITOR.env.gecko && CKEDITOR.env.mac && (e += ' onkeypress\x3d"return false;"');
			CKEDITOR.env.gecko && (e += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;" ondragstart\x3d"return false;"');
			var e = e + (' onmouseover\x3d"CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout\x3d"CKEDITOR.tools.callFunction({moveOutFn},{index});" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;"\x3e'),
				b = CKEDITOR.addTemplate("menuItem",
					e + '\x3cspan class\x3d"cke_menubutton_inner"\x3e\x3cspan class\x3d"cke_menubutton_icon"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{iconStyle}"\x3e\x3c/span\x3e\x3c/span\x3e\x3cspan class\x3d"cke_menubutton_label"\x3e{label}\x3c/span\x3e{shortcutHtml}{arrowHtml}\x3c/span\x3e\x3c/a\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_voice_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e\x3c/span\x3e'),
				c = CKEDITOR.addTemplate("menuArrow", '\x3cspan class\x3d"cke_menuarrow"\x3e\x3cspan\x3e{label}\x3c/span\x3e\x3c/span\x3e'),
				g = CKEDITOR.addTemplate("menuShortcut", '\x3cspan class\x3d"cke_menubutton_label cke_menubutton_shortcut"\x3e{shortcut}\x3c/span\x3e');
			CKEDITOR.menu = CKEDITOR.tools.createClass({
				$: function (a, b) {
					b = this._.definition = b || {};
					this.id = CKEDITOR.tools.getNextId();
					this.editor = a;
					this.items = [];
					this._.listeners = [];
					this._.level = b.level || 1;
					var c = CKEDITOR.tools.extend({}, b.panel, {
							css: [CKEDITOR.skin.getPath("editor")],
							level: this._.level - 1,
							block: {}
						}),
						d = c.block.attributes = c.attributes || {};
					!d.role && (d.role = "menu");
					this._.panelDefinition =
						c
				},
				_: {
					onShow: function () {
						var a = this.editor.getSelection(),
							b = a && a.getStartElement(),
							c = this.editor.elementPath(),
							d = this._.listeners;
						this.removeAll();
						for (var g = 0; g < d.length; g++) {
							var h = d[g](b, a, c);
							if (h)
								for (var e in h) {
									var p = this.editor.getMenuItem(e);
									!p || p.command && !this.editor.getCommand(p.command).state || (p.state = h[e], this.add(p))
								}
						}
					},
					onClick: function (a) {
						this.hide();
						if (a.onClick) a.onClick();
						else a.command && this.editor.execCommand(a.command)
					},
					onEscape: function (a) {
						var b = this.parent;
						b ? b._.panel.hideChild(1) :
							27 == a && this.hide(1);
						return !1
					},
					onHide: function () {
						this.onHide && this.onHide()
					},
					showSubMenu: function (a) {
						var b = this._.subMenu,
							c = this.items[a];
						if (c = c.getItems && c.getItems()) {
							b ? b.removeAll() : (b = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, {
								level: this._.level + 1
							}, !0)), b.parent = this, b._.onClick = CKEDITOR.tools.bind(this._.onClick, this));
							for (var d in c) {
								var g = this.editor.getMenuItem(d);
								g && (g.state = c[d], b.add(g))
							}
							var h = this._.panel.getBlock(this.id).element.getDocument().getById(this.id +
								String(a));
							setTimeout(function () {
								b.show(h, 2)
							}, 0)
						} else this._.panel.hideChild(1)
					}
				},
				proto: {
					add: function (a) {
						a.order || (a.order = this.items.length);
						this.items.push(a)
					},
					removeAll: function () {
						this.items = []
					},
					show: function (b, c, f, d) {
						if (!this.parent && (this._.onShow(), !this.items.length)) return;
						c = c || ("rtl" == this.editor.lang.dir ? 2 : 1);
						var g = this.items,
							h = this.editor,
							e = this._.panel,
							p = this._.element;
						if (!e) {
							e = this._.panel = new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level);
							e.onEscape = CKEDITOR.tools.bind(function (a) {
								if (!1 === this._.onEscape(a)) return !1
							}, this);
							e.onShow = function () {
								e._.panel.getHolderElement().getParent().addClass("cke").addClass("cke_reset_all")
							};
							e.onHide = CKEDITOR.tools.bind(function () {
								this._.onHide && this._.onHide()
							}, this);
							p = e.addBlock(this.id, this._.panelDefinition.block);
							p.autoSize = !0;
							var q = p.keys;
							q[40] = "next";
							q[9] = "next";
							q[38] = "prev";
							q[CKEDITOR.SHIFT + 9] = "prev";
							q["rtl" == h.lang.dir ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click";
							q[32] = CKEDITOR.env.ie ? "mouseup" :
								"click";
							CKEDITOR.env.ie && (q[13] = "mouseup");
							p = this._.element = p.element;
							q = p.getDocument();
							q.getBody().setStyle("overflow", "hidden");
							q.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden");
							this._.itemOverFn = CKEDITOR.tools.addFunction(function (a) {
								clearTimeout(this._.showSubTimeout);
								this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, h.config.menu_subMenuDelay || 400, this, [a])
							}, this);
							this._.itemOutFn = CKEDITOR.tools.addFunction(function () {
								clearTimeout(this._.showSubTimeout)
							}, this);
							this._.itemClickFn = CKEDITOR.tools.addFunction(function (a) {
								var b = this.items[a];
								if (b.state == CKEDITOR.TRISTATE_DISABLED) this.hide(1);
								else if (b.getItems) this._.showSubMenu(a);
								else this._.onClick(b)
							}, this)
						}
						a(g);
						for (var q = h.elementPath(), q = ['\x3cdiv class\x3d"cke_menu' + (q && q.direction() != h.lang.dir ? " cke_mixed_dir_content" : "") + '" role\x3d"presentation"\x3e'], y = g.length, u = y && g[0].group, r = 0; r < y; r++) {
							var w = g[r];
							u != w.group && (q.push('\x3cdiv class\x3d"cke_menuseparator" role\x3d"separator"\x3e\x3c/div\x3e'),
								u = w.group);
							w.render(this, r, q)
						}
						q.push("\x3c/div\x3e");
						p.setHtml(q.join(""));
						CKEDITOR.ui.fire("ready", this);
						this.parent ? this.parent._.panel.showAsChild(e, this.id, b, c, f, d) : e.showBlock(this.id, b, c, f, d);
						h.fire("menuShow", [e])
					},
					addListener: function (a) {
						this._.listeners.push(a)
					},
					hide: function (a) {
						this._.onHide && this._.onHide();
						this._.panel && this._.panel.hide(a)
					},
					findItemByCommandName: function (a) {
						var b = CKEDITOR.tools.array.filter(this.items, function (b) {
							return a === b.command
						});
						return b.length ? (b = b[0], {
							item: b,
							element: this._.element.findOne("." + b.className)
						}) : null
					}
				}
			});
			CKEDITOR.menuItem = CKEDITOR.tools.createClass({
				$: function (a, b, c) {
					CKEDITOR.tools.extend(this, c, {
						order: 0,
						className: "cke_menubutton__" + b
					});
					this.group = a._.menuGroups[this.group];
					this.editor = a;
					this.name = b
				},
				proto: {
					render: function (a, e, f) {
						var d = a.id + String(e),
							m = "undefined" == typeof this.state ? CKEDITOR.TRISTATE_OFF : this.state,
							h = "",
							n = this.editor,
							p, q, y = m == CKEDITOR.TRISTATE_ON ? "on" : m == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off";
						this.role in {
							menuitemcheckbox: 1,
							menuitemradio: 1
						} && (h = ' aria-checked\x3d"' + (m == CKEDITOR.TRISTATE_ON ? "true" : "false") + '"');
						var u = this.getItems,
							r = "\x26#" + ("rtl" == this.editor.lang.dir ? "9668" : "9658") + ";",
							w = this.name;
						this.icon && !/\./.test(this.icon) && (w = this.icon);
						this.command && (p = n.getCommand(this.command), (p = n.getCommandKeystroke(p)) && (q = CKEDITOR.tools.keystrokeToString(n.lang.common.keyboard, p)));
						a = {
							id: d,
							name: this.name,
							iconName: w,
							label: this.label,
							cls: this.className || "",
							state: y,
							hasPopup: u ? "true" : "false",
							disabled: m == CKEDITOR.TRISTATE_DISABLED,
							title: this.label + (q ? " (" + q.display + ")" : ""),
							ariaShortcut: q ? n.lang.common.keyboardShortcut + " " + q.aria : "",
							href: "javascript:void('" + (this.label || "").replace("'") + "')",
							hoverFn: a._.itemOverFn,
							moveOutFn: a._.itemOutFn,
							clickFn: a._.itemClickFn,
							index: e,
							iconStyle: CKEDITOR.skin.getIconStyle(w, "rtl" == this.editor.lang.dir, w == this.icon ? null : this.icon, this.iconOffset),
							shortcutHtml: q ? g.output({
								shortcut: q.display
							}) : "",
							arrowHtml: u ? c.output({
								label: r
							}) : "",
							role: this.role ? this.role : "menuitem",
							ariaChecked: h
						};
						b.output(a, f)
					}
				}
			})
		}(),
		CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div", CKEDITOR.plugins.add("contextmenu", {
			requires: "menu",
			onLoad: function () {
				CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
					base: CKEDITOR.menu,
					$: function (a) {
						this.base.call(this, a, {
							panel: {
								css: a.config.contextmenu_contentsCss,
								className: "cke_menu_panel",
								attributes: {
									"aria-label": a.lang.contextmenu.options
								}
							}
						})
					},
					proto: {
						addTarget: function (a, e) {
							function b() {
								g = !1
							}
							var c, g;
							a.on("contextmenu", function (a) {
								a = a.data;
								var b = CKEDITOR.env.webkit ? c : CKEDITOR.env.mac ? a.$.metaKey : a.$.ctrlKey;
								if (!e || !b)
									if (a.preventDefault(), !g) {
										if (CKEDITOR.env.mac && CKEDITOR.env.webkit) {
											var b = this.editor,
												d = (new CKEDITOR.dom.elementPath(a.getTarget(), b.editable())).contains(function (a) {
													return a.hasAttribute("contenteditable")
												}, !0);
											d && "false" == d.getAttribute("contenteditable") && b.getSelection().fake(d)
										}
										var d = a.getTarget().getDocument(),
											l = a.getTarget().getDocument().getDocumentElement(),
											b = !d.equals(CKEDITOR.document),
											d = d.getWindow().getScrollPosition(),
											h = b ? a.$.clientX : a.$.pageX || d.x + a.$.clientX,
											n = b ? a.$.clientY : a.$.pageY || d.y + a.$.clientY;
										CKEDITOR.tools.setTimeout(function () {
											this.open(l, null, h, n)
										}, CKEDITOR.env.ie ? 200 : 0, this)
									}
							}, this);
							if (CKEDITOR.env.webkit) {
								var l = function () {
									c = 0
								};
								a.on("keydown", function (a) {
									c = CKEDITOR.env.mac ? a.data.$.metaKey : a.data.$.ctrlKey
								});
								a.on("keyup", l);
								a.on("contextmenu", l)
							}
							CKEDITOR.env.gecko && !CKEDITOR.env.mac && (a.on("keydown", function (a) {
								a.data.$.shiftKey &&
									121 === a.data.$.keyCode && (g = !0)
							}, null, null, 0), a.on("keyup", b), a.on("contextmenu", b))
						},
						open: function (a, e, b, c) {
							!1 !== this.editor.config.enableContextMenu && this.editor.getSelection().getType() !== CKEDITOR.SELECTION_NONE && (this.editor.focus(), a = a || CKEDITOR.document.getDocumentElement(), this.editor.selectionChange(1), this.show(a, e, b, c))
						}
					}
				})
			},
			beforeInit: function (a) {
				var e = a.contextMenu = new CKEDITOR.plugins.contextMenu(a);
				a.on("contentDom", function () {
					e.addTarget(a.editable(), !1 !== a.config.browserContextMenuOnCtrl)
				});
				a.addCommand("contextMenu", {
					exec: function (a) {
						var c = 0,
							g = 0,
							e = a.getSelection().getRanges(),
							e = e[e.length - 1].getClientRects(a.editable().isInline());
						if (e = e[e.length - 1]) c = e["rtl" === a.lang.dir ? "left" : "right"], g = e.bottom;
						a.contextMenu.open(a.document.getBody().getParent(), null, c, g)
					}
				});
				a.setKeystroke(CKEDITOR.SHIFT + 121, "contextMenu");
				a.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, "contextMenu")
			}
		}),
		function () {
			function a(a) {
				var b = this.att;
				a = a && a.hasAttribute(b) && a.getAttribute(b) || "";
				void 0 !== a && this.setValue(a)
			}

			function e() {
				for (var a, b = 0; b < arguments.length; b++)
					if (arguments[b] instanceof CKEDITOR.dom.element) {
						a = arguments[b];
						break
					}
				if (a) {
					var b = this.att,
						e = this.getValue();
					e ? a.setAttribute(b, e) : a.removeAttribute(b, e)
				}
			}
			var b = {
				id: 1,
				dir: 1,
				classes: 1,
				styles: 1
			};
			CKEDITOR.plugins.add("dialogadvtab", {
				requires: "dialog",
				allowedContent: function (a) {
					a || (a = b);
					var g = [];
					a.id && g.push("id");
					a.dir && g.push("dir");
					var e = "";
					g.length && (e += "[" + g.join(",") + "]");
					a.classes && (e += "(*)");
					a.styles && (e += "{*}");
					return e
				},
				createAdvancedTab: function (c,
					g, l) {
					g || (g = b);
					var k = c.lang.common,
						f = {
							id: "advanced",
							label: k.advancedTab,
							title: k.advancedTab,
							elements: [{
								type: "vbox",
								padding: 1,
								children: []
							}]
						},
						d = [];
					if (g.id || g.dir) g.id && d.push({
						id: "advId",
						att: "id",
						type: "text",
						requiredContent: l ? l + "[id]" : null,
						label: k.id,
						setup: a,
						commit: e
					}), g.dir && d.push({
						id: "advLangDir",
						att: "dir",
						type: "select",
						requiredContent: l ? l + "[dir]" : null,
						label: k.langDir,
						"default": "",
						style: "width:100%",
						items: [
							[k.notSet, ""],
							[k.langDirLTR, "ltr"],
							[k.langDirRTL, "rtl"]
						],
						setup: a,
						commit: e
					}), f.elements[0].children.push({
						type: "hbox",
						widths: ["50%", "50%"],
						children: [].concat(d)
					});
					if (g.styles || g.classes) d = [], g.styles && d.push({
						id: "advStyles",
						att: "style",
						type: "text",
						requiredContent: l ? l + "{cke-xyz}" : null,
						label: k.styles,
						"default": "",
						validate: CKEDITOR.dialog.validate.inlineStyle(k.invalidInlineStyle),
						onChange: function () {},
						getStyle: function (a, b) {
							var c = this.getValue().match(new RegExp("(?:^|;)\\s*" + a + "\\s*:\\s*([^;]*)", "i"));
							return c ? c[1] : b
						},
						updateStyle: function (a, b) {
							var d = this.getValue(),
								f = c.document.createElement("span");
							f.setAttribute("style",
								d);
							f.setStyle(a, b);
							d = CKEDITOR.tools.normalizeCssText(f.getAttribute("style"));
							this.setValue(d, 1)
						},
						setup: a,
						commit: e
					}), g.classes && d.push({
						type: "hbox",
						widths: ["45%", "55%"],
						children: [{
							id: "advCSSClasses",
							att: "class",
							type: "text",
							requiredContent: l ? l + "(cke-xyz)" : null,
							label: k.cssClasses,
							"default": "",
							setup: a,
							commit: e
						}]
					}), f.elements[0].children.push({
						type: "hbox",
						widths: ["50%", "50%"],
						children: [].concat(d)
					});
					return f
				}
			})
		}(),
		function () {
			CKEDITOR.plugins.add("div", {
				requires: "dialog",
				init: function (a) {
					if (!a.blockless) {
						var e =
							a.lang.div,
							b = "div(*)";
						CKEDITOR.dialog.isTabEnabled(a, "editdiv", "advanced") && (b += ";div[dir,id,lang,title]{*}");
						a.addCommand("creatediv", new CKEDITOR.dialogCommand("creatediv", {
							allowedContent: b,
							requiredContent: "div",
							contextSensitive: !0,
							contentTransformations: [
								["div: alignmentToStyle"]
							],
							refresh: function (a, b) {
								this.setState("div" in (a.config.div_wrapTable ? b.root : b.blockLimit).getDtd() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
							}
						}));
						a.addCommand("editdiv", new CKEDITOR.dialogCommand("editdiv", {
							requiredContent: "div"
						}));
						a.addCommand("removediv", {
							requiredContent: "div",
							exec: function (a) {
								function b(d) {
									(d = CKEDITOR.plugins.div.getSurroundDiv(a, d)) && !d.data("cke-div-added") && (m.push(d), d.data("cke-div-added"))
								}
								for (var e = a.getSelection(), k = e && e.getRanges(), f, d = e.createBookmarks(), m = [], h = 0; h < k.length; h++) f = k[h], f.collapsed ? b(e.getStartElement()) : (f = new CKEDITOR.dom.walker(f), f.evaluator = b, f.lastForward());
								for (h = 0; h < m.length; h++) m[h].remove(!0);
								e.selectBookmarks(d)
							}
						});
						a.ui.addButton && a.ui.addButton("CreateDiv", {
							label: e.toolbar,
							command: "creatediv",
							toolbar: "blocks,50"
						});
						a.addMenuItems && (a.addMenuItems({
							editdiv: {
								label: e.edit,
								command: "editdiv",
								group: "div",
								order: 1
							},
							removediv: {
								label: e.remove,
								command: "removediv",
								group: "div",
								order: 5
							}
						}), a.contextMenu && a.contextMenu.addListener(function (b) {
							return !b || b.isReadOnly() ? null : CKEDITOR.plugins.div.getSurroundDiv(a) ? {
								editdiv: CKEDITOR.TRISTATE_OFF,
								removediv: CKEDITOR.TRISTATE_OFF
							} : null
						}));
						CKEDITOR.dialog.add("creatediv", this.path + "dialogs/div.js");
						CKEDITOR.dialog.add("editdiv", this.path + "dialogs/div.js")
					}
				}
			});
			CKEDITOR.plugins.div = {
				getSurroundDiv: function (a, e) {
					var b = a.elementPath(e);
					return a.elementPath(b.blockLimit).contains(function (a) {
						return a.is("div") && !a.isReadOnly()
					}, 1)
				}
			}
		}(),
		function () {
			function a(a, b) {
				function k(b) {
					b = h.list[b];
					var c;
					b.equals(a.editable()) || "true" == b.getAttribute("contenteditable") ? (c = a.createRange(), c.selectNodeContents(b), c = c.select()) : (c = a.getSelection(), c.selectElement(b));
					CKEDITOR.env.ie && a.fire("selectionChange", {
						selection: c,
						path: new CKEDITOR.dom.elementPath(b)
					});
					a.focus()
				}

				function f() {
					m && m.setHtml('\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e');
					delete h.list
				}
				var d = a.ui.spaceId("path"),
					m, h = a._.elementsPath,
					n = h.idBase;
				b.html += '\x3cspan id\x3d"' + d + '_label" class\x3d"cke_voice_label"\x3e' + a.lang.elementspath.eleLabel + '\x3c/span\x3e\x3cspan id\x3d"' + d + '" class\x3d"cke_path" role\x3d"group" aria-labelledby\x3d"' + d + '_label"\x3e\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e\x3c/span\x3e';
				a.on("uiReady", function () {
					var b = a.ui.space("path");
					b && a.focusManager.add(b,
						1)
				});
				h.onClick = k;
				var p = CKEDITOR.tools.addFunction(k),
					q = CKEDITOR.tools.addFunction(function (b, c) {
						var d = h.idBase,
							f;
						c = new CKEDITOR.dom.event(c);
						f = "rtl" == a.lang.dir;
						switch (c.getKeystroke()) {
							case f ? 39:
								37:
									case 9:
								return (f = CKEDITOR.document.getById(d + (b + 1))) || (f = CKEDITOR.document.getById(d + "0")), f.focus(), !1;
							case f ? 37:
								39:
									case CKEDITOR.SHIFT + 9:
								return (f = CKEDITOR.document.getById(d + (b - 1))) || (f = CKEDITOR.document.getById(d + (h.list.length - 1))), f.focus(), !1;
							case 27:
								return a.focus(), !1;
							case 13:
							case 32:
								return k(b), !1
						}
						return !0
					});
				a.on("selectionChange", function (b) {
					for (var f = [], e = h.list = [], k = [], l = h.filters, B = !0, v = b.data.path.elements, z = v.length; z--;) {
						var C = v[z],
							x = 0;
						b = C.data("cke-display-name") ? C.data("cke-display-name") : C.data("cke-real-element-type") ? C.data("cke-real-element-type") : C.getName();
						(B = C.hasAttribute("contenteditable") ? "true" == C.getAttribute("contenteditable") : B) || C.hasAttribute("contenteditable") || (x = 1);
						for (var A = 0; A < l.length; A++) {
							var G = l[A](C, b);
							if (!1 === G) {
								x = 1;
								break
							}
							b = G || b
						}
						x || (e.unshift(C), k.unshift(b))
					}
					e =
						e.length;
					for (l = 0; l < e; l++) b = k[l], B = a.lang.elementspath.eleTitle.replace(/%1/, b), b = c.output({
						id: n + l,
						label: B,
						text: b,
						jsTitle: "javascript:void('" + b + "')",
						index: l,
						keyDownFn: q,
						clickFn: p
					}), f.unshift(b);
					m || (m = CKEDITOR.document.getById(d));
					k = m;
					k.setHtml(f.join("") + '\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e');
					a.fire("elementsPathUpdate", {
						space: k
					})
				});
				a.on("readOnly", f);
				a.on("contentDomUnload", f);
				a.addCommand("elementsPathFocus", e.toolbarFocus);
				a.setKeystroke(CKEDITOR.ALT + 122, "elementsPathFocus")
			}
			var e = {
					toolbarFocus: {
						editorFocus: !1,
						readOnly: 1,
						exec: function (a) {
							(a = CKEDITOR.document.getById(a._.elementsPath.idBase + "0")) && a.focus(CKEDITOR.env.ie || CKEDITOR.env.air)
						}
					}
				},
				b = "";
			CKEDITOR.env.gecko && CKEDITOR.env.mac && (b += ' onkeypress\x3d"return false;"');
			CKEDITOR.env.gecko && (b += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
			var c = CKEDITOR.addTemplate("pathItem", '\x3ca id\x3d"{id}" href\x3d"{jsTitle}" tabindex\x3d"-1" class\x3d"cke_path_item" title\x3d"{label}"' + b + ' hidefocus\x3d"true"  onkeydown\x3d"return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role\x3d"button" aria-label\x3d"{label}"\x3e{text}\x3c/a\x3e');
			CKEDITOR.plugins.add("elementspath", {
				init: function (b) {
					b._.elementsPath = {
						idBase: "cke_elementspath_" + CKEDITOR.tools.getNextNumber() + "_",
						filters: []
					};
					b.on("uiSpace", function (c) {
						"bottom" == c.data.space && a(b, c.data)
					})
				}
			})
		}(),
		function () {
			function a(a, b, c) {
				c = a.config.forceEnterMode || c;
				if ("wysiwyg" == a.mode) {
					b || (b = a.activeEnterMode);
					var d = a.elementPath();
					d && !d.isContextFor("p") && (b = CKEDITOR.ENTER_BR, c = 1);
					a.fire("saveSnapshot");
					b == CKEDITOR.ENTER_BR ? k(a, b, null, c) : f(a, b, null, c);
					a.fire("saveSnapshot")
				}
			}

			function e(a) {
				a =
					a.getSelection().getRanges(!0);
				for (var b = a.length - 1; 0 < b; b--) a[b].deleteContents();
				return a[0]
			}

			function b(a) {
				var b = a.startContainer.getAscendant(function (a) {
					return a.type == CKEDITOR.NODE_ELEMENT && "true" == a.getAttribute("contenteditable")
				}, !0);
				if (a.root.equals(b)) return a;
				b = new CKEDITOR.dom.range(b);
				b.moveToRange(a);
				return b
			}
			CKEDITOR.plugins.add("enterkey", {
				init: function (b) {
					b.addCommand("enter", {
						modes: {
							wysiwyg: 1
						},
						editorFocus: !1,
						exec: function (b) {
							a(b)
						}
					});
					b.addCommand("shiftEnter", {
						modes: {
							wysiwyg: 1
						},
						editorFocus: !1,
						exec: function (b) {
							a(b, b.activeShiftEnterMode, 1)
						}
					});
					b.setKeystroke([
						[13, "enter"],
						[CKEDITOR.SHIFT + 13, "shiftEnter"]
					])
				}
			});
			var c = CKEDITOR.dom.walker.whitespaces(),
				g = CKEDITOR.dom.walker.bookmark(),
				l, k, f, d;
			CKEDITOR.plugins.enterkey = {
				enterBlock: function (a, f, l, p) {
					function q(a) {
						var b;
						if (a === CKEDITOR.ENTER_BR || -1 === CKEDITOR.tools.indexOf(["td", "th"], w.lastElement.getName()) || 1 !== w.lastElement.getChildCount()) return !1;
						a = w.lastElement.getChild(0).clone(!0);
						(b = a.getBogus()) && b.remove();
						return a.getText().length ?
							!1 : !0
					}
					if (l = l || e(a)) {
						l = b(l);
						var y = l.document,
							u = l.checkStartOfBlock(),
							r = l.checkEndOfBlock(),
							w = a.elementPath(l.startContainer),
							t = w.block,
							B = f == CKEDITOR.ENTER_DIV ? "div" : "p",
							v;
						if (u && r) {
							if (t && (t.is("li") || t.getParent().is("li"))) {
								t.is("li") || (t = t.getParent());
								l = t.getParent();
								v = l.getParent();
								p = !t.hasPrevious();
								var r = !t.hasNext(),
									B = a.getSelection(),
									u = B.createBookmarks(),
									z = t.getDirection(1),
									C = t.getAttribute("class"),
									x = t.getAttribute("style"),
									A = v.getDirection(1) != z;
								a = a.enterMode != CKEDITOR.ENTER_BR || A || x || C;
								if (v.is("li")) p || r ? (p && r && l.remove(), t[r ? "insertAfter" : "insertBefore"](v)) : t.breakParent(v);
								else {
									if (a)
										if (w.block.is("li") ? (v = y.createElement(f == CKEDITOR.ENTER_P ? "p" : "div"), A && v.setAttribute("dir", z), x && v.setAttribute("style", x), C && v.setAttribute("class", C), t.moveChildren(v)) : v = w.block, p || r) v[p ? "insertBefore" : "insertAfter"](l);
										else t.breakParent(l), v.insertAfter(l);
									else if (t.appendBogus(!0), p || r)
										for (; y = t[p ? "getFirst" : "getLast"]();) y[p ? "insertBefore" : "insertAfter"](l);
									else
										for (t.breakParent(l); y = t.getLast();) y.insertAfter(l);
									t.remove()
								}
								B.selectBookmarks(u);
								return
							}
							if (t && t.getParent().is("blockquote")) {
								t.breakParent(t.getParent());
								t.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || t.getPrevious().remove();
								t.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || t.getNext().remove();
								l.moveToElementEditStart(t);
								l.select();
								return
							}
						} else if (t && t.is("pre") && !r) {
							k(a, f, l, p);
							return
						}
						if (x = l.splitBlock(B)) {
							a = x.previousBlock;
							t = x.nextBlock;
							u = x.wasStartOfBlock;
							r = x.wasEndOfBlock;
							t ? (z = t.getParent(), z.is("li") && (t.breakParent(z),
								t.move(t.getNext(), 1))) : a && (z = a.getParent()) && z.is("li") && (a.breakParent(z), z = a.getNext(), l.moveToElementEditStart(z), a.move(a.getPrevious()));
							if (u || r)
								if (q(f)) l.moveToElementEditStart(l.getTouchedStartNode());
								else {
									if (a) {
										if (a.is("li") || !d.test(a.getName()) && !a.is("pre")) v = a.clone()
									} else t && (v = t.clone());
									v ? p && !v.is("li") && v.renameNode(B) : z && z.is("li") ? v = z : (v = y.createElement(B), a && (C = a.getDirection()) && v.setAttribute("dir", C));
									if (y = x.elementPath)
										for (f = 0, p = y.elements.length; f < p; f++) {
											B = y.elements[f];
											if (B.equals(y.block) ||
												B.equals(y.blockLimit)) break;
											CKEDITOR.dtd.$removeEmpty[B.getName()] && (B = B.clone(), v.moveChildren(B), v.append(B))
										}
									v.appendBogus();
									v.getParent() || l.insertNode(v);
									v.is("li") && v.removeAttribute("value");
									!CKEDITOR.env.ie || !u || r && a.getChildCount() || (l.moveToElementEditStart(r ? a : v), l.select());
									l.moveToElementEditStart(u && !r ? t : v)
								}
							else t.is("li") && (v = l.clone(), v.selectNodeContents(t), v = new CKEDITOR.dom.walker(v), v.evaluator = function (a) {
								return !(g(a) || c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline &&
									!(a.getName() in CKEDITOR.dtd.$empty))
							}, (z = v.next()) && z.type == CKEDITOR.NODE_ELEMENT && z.is("ul", "ol") && (CKEDITOR.env.needsBrFiller ? y.createElement("br") : y.createText(" ")).insertBefore(z)), t && l.moveToElementEditStart(t);
							l.select();
							l.scrollIntoView()
						}
					}
				},
				enterBr: function (a, b, c, g) {
					if (c = c || e(a)) {
						var k = c.document,
							l = c.checkEndOfBlock(),
							u = new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()),
							r = u.block,
							w = r && u.block.getName();
						g || "li" != w ? (!g && l && d.test(w) ? (l = r.getDirection()) ? (k = k.createElement("div"),
							k.setAttribute("dir", l), k.insertAfter(r), c.setStart(k, 0)) : (k.createElement("br").insertAfter(r), CKEDITOR.env.gecko && k.createText("").insertAfter(r), c.setStartAt(r.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)) : (a = "pre" == w && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? k.createText("\r") : k.createElement("br"), c.deleteContents(), c.insertNode(a), CKEDITOR.env.needsBrFiller ? (k.createText("﻿").insertAfter(a), l && (r || u.blockLimit).appendBogus(), a.getNext().$.nodeValue =
							"", c.setStartAt(a.getNext(), CKEDITOR.POSITION_AFTER_START)) : c.setStartAt(a, CKEDITOR.POSITION_AFTER_END)), c.collapse(!0), c.select(), c.scrollIntoView()) : f(a, b, c, g)
					}
				}
			};
			l = CKEDITOR.plugins.enterkey;
			k = l.enterBr;
			f = l.enterBlock;
			d = /^h[1-6]$/
		}(),
		function () {
			function a(a, b) {
				var c = {},
					g = [],
					l = {
						nbsp: " ",
						shy: "­",
						gt: "\x3e",
						lt: "\x3c",
						amp: "\x26",
						apos: "'",
						quot: '"'
					};
				a = a.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function (a, d) {
					var f = b ? "\x26" + d + ";" : l[d];
					c[f] = b ? l[d] : "\x26" + d + ";";
					g.push(f);
					return ""
				});
				a = a.replace(/,$/,
					"");
				if (!b && a) {
					a = a.split(",");
					var k = document.createElement("div"),
						f;
					k.innerHTML = "\x26" + a.join(";\x26") + ";";
					f = k.innerHTML;
					k = null;
					for (k = 0; k < f.length; k++) {
						var d = f.charAt(k);
						c[d] = "\x26" + a[k] + ";";
						g.push(d)
					}
				}
				c.regex = g.join(b ? "|" : "");
				return c
			}
			CKEDITOR.plugins.add("entities", {
				afterInit: function (e) {
					function b(a) {
						return d[a]
					}

					function c(a) {
						return "force" != g.entities_processNumerical && k[a] ? k[a] : "\x26#" + a.charCodeAt(0) + ";"
					}
					var g = e.config;
					if (e = (e = e.dataProcessor) && e.htmlFilter) {
						var l = [];
						!1 !== g.basicEntities && l.push("nbsp,gt,lt,amp");
						g.entities && (l.length && l.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"),
							g.entities_latin && l.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"), g.entities_greek && l.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"),
							g.entities_additional && l.push(g.entities_additional));
						var k = a(l.join(",")),
							f = k.regex ? "[" + k.regex + "]" : "a^";
						delete k.regex;
						g.entities && g.entities_processNumerical && (f = "[^ -~]|" + f);
						var f = new RegExp(f, "g"),
							d = a("nbsp,gt,lt,amp,shy", !0),
							m = new RegExp(d.regex, "g");
						e.addRules({
							text: function (a) {
								return a.replace(m, b).replace(f, c)
							}
						}, {
							applyToAll: !0,
							excludeNestedEditable: !0
						})
					}
				}
			})
		}(), CKEDITOR.config.basicEntities = !0, CKEDITOR.config.entities = !0, CKEDITOR.config.entities_latin = !0, CKEDITOR.config.entities_greek = !0,
		CKEDITOR.config.entities_additional = "#39", CKEDITOR.plugins.add("popup"), CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
			popup: function (a, e, b, c) {
				e = e || "80%";
				b = b || "70%";
				"string" == typeof e && 1 < e.length && "%" == e.substr(e.length - 1, 1) && (e = parseInt(window.screen.width * parseInt(e, 10) / 100, 10));
				"string" == typeof b && 1 < b.length && "%" == b.substr(b.length - 1, 1) && (b = parseInt(window.screen.height * parseInt(b, 10) / 100, 10));
				640 > e && (e = 640);
				420 > b && (b = 420);
				var g = parseInt((window.screen.height - b) / 2, 10),
					l = parseInt((window.screen.width -
						e) / 2, 10);
				c = (c || "location\x3dno,menubar\x3dno,toolbar\x3dno,dependent\x3dyes,minimizable\x3dno,modal\x3dyes,alwaysRaised\x3dyes,resizable\x3dyes,scrollbars\x3dyes") + ",width\x3d" + e + ",height\x3d" + b + ",top\x3d" + g + ",left\x3d" + l;
				var k = window.open("", null, c, !0);
				if (!k) return !1;
				try {
					-1 == navigator.userAgent.toLowerCase().indexOf(" chrome/") && (k.moveTo(l, g), k.resizeTo(e, b)), k.focus(), k.location.href = a
				} catch (f) {
					window.open(a, null, c, !0)
				}
				return !0
			}
		}), "use strict",
		function () {
			function a(a) {
				this.editor = a;
				this.loaders = []
			}

			function e(a, c, e) {
				var f = a.config.fileTools_defaultFileName;
				this.editor = a;
				this.lang = a.lang;
				"string" === typeof c ? (this.data = c, this.file = b(this.data), this.loaded = this.total = this.file.size) : (this.data = null, this.file = c, this.total = this.file.size, this.loaded = 0);
				e ? this.fileName = e : this.file.name ? this.fileName = this.file.name : (a = this.file.type.split("/"), f && (a[0] = f), this.fileName = a.join("."));
				this.uploaded = 0;
				this.responseData = this.uploadTotal = null;
				this.status = "created";
				this.abort = function () {
					this.changeStatus("abort")
				}
			}

			function b(a) {
				var b = a.match(c)[1];
				a = a.replace(c, "");
				a = atob(a);
				var e = [],
					f, d, m, h;
				for (f = 0; f < a.length; f += 512) {
					d = a.slice(f, f + 512);
					m = Array(d.length);
					for (h = 0; h < d.length; h++) m[h] = d.charCodeAt(h);
					d = new Uint8Array(m);
					e.push(d)
				}
				return new Blob(e, {
					type: b
				})
			}
			CKEDITOR.plugins.add("filetools", {
				beforeInit: function (b) {
					b.uploadRepository = new a(b);
					b.on("fileUploadRequest", function (a) {
						var b = a.data.fileLoader;
						b.xhr.open("POST", b.uploadUrl, !0);
						a.data.requestData.upload = {
							file: b.file,
							name: b.fileName
						}
					}, null, null, 5);
					b.on("fileUploadRequest",
						function (a) {
							var c = a.data.fileLoader,
								f = new FormData;
							a = a.data.requestData;
							var d = b.config.fileTools_requestHeaders,
								e, h;
							for (h in a) {
								var n = a[h];
								"object" === typeof n && n.file ? f.append(h, n.file, n.name) : f.append(h, n)
							}
							f.append("ckCsrfToken", CKEDITOR.tools.getCsrfToken());
							if (d)
								for (e in d) c.xhr.setRequestHeader(e, d[e]);
							c.xhr.send(f)
						}, null, null, 999);
					b.on("fileUploadResponse", function (a) {
						var b = a.data.fileLoader,
							c = b.xhr,
							d = a.data;
						try {
							var e = JSON.parse(c.responseText);
							e.error && e.error.message && (d.message = e.error.message);
							if (e.uploaded)
								for (var g in e) d[g] = e[g];
							else a.cancel()
						} catch (n) {
							d.message = b.lang.filetools.responseError, CKEDITOR.warn("filetools-response-error", {
								responseText: c.responseText
							}), a.cancel()
						}
					}, null, null, 999)
				}
			});
			a.prototype = {
				create: function (a, b, c) {
					c = c || e;
					var f = this.loaders.length;
					a = new c(this.editor, a, b);
					a.id = f;
					this.loaders[f] = a;
					this.fire("instanceCreated", a);
					return a
				},
				isFinished: function () {
					for (var a = 0; a < this.loaders.length; ++a)
						if (!this.loaders[a].isFinished()) return !1;
					return !0
				}
			};
			e.prototype = {
				loadAndUpload: function (a,
					b) {
					var c = this;
					this.once("loaded", function (f) {
						f.cancel();
						c.once("update", function (a) {
							a.cancel()
						}, null, null, 0);
						c.upload(a, b)
					}, null, null, 0);
					this.load()
				},
				load: function () {
					var a = this,
						b = this.reader = new FileReader;
					a.changeStatus("loading");
					this.abort = function () {
						a.reader.abort()
					};
					b.onabort = function () {
						a.changeStatus("abort")
					};
					b.onerror = function () {
						a.message = a.lang.filetools.loadError;
						a.changeStatus("error")
					};
					b.onprogress = function (b) {
						a.loaded = b.loaded;
						a.update()
					};
					b.onload = function () {
						a.loaded = a.total;
						a.data = b.result;
						a.changeStatus("loaded")
					};
					b.readAsDataURL(this.file)
				},
				upload: function (a, b) {
					var c = b || {};
					a ? (this.uploadUrl = a, this.xhr = new XMLHttpRequest, this.attachRequestListeners(), this.editor.fire("fileUploadRequest", {
						fileLoader: this,
						requestData: c
					}) && this.changeStatus("uploading")) : (this.message = this.lang.filetools.noUrlError, this.changeStatus("error"))
				},
				attachRequestListeners: function () {
					function a() {
						"error" != c.status && (c.message = c.lang.filetools.networkError, c.changeStatus("error"))
					}

					function b() {
						"abort" != c.status &&
							c.changeStatus("abort")
					}
					var c = this,
						f = this.xhr;
					c.abort = function () {
						f.abort();
						b()
					};
					f.onerror = a;
					f.onabort = b;
					f.upload ? (f.upload.onprogress = function (a) {
						a.lengthComputable && (c.uploadTotal || (c.uploadTotal = a.total), c.uploaded = a.loaded, c.update())
					}, f.upload.onerror = a, f.upload.onabort = b) : (c.uploadTotal = c.total, c.update());
					f.onload = function () {
						c.update();
						if ("abort" != c.status)
							if (c.uploaded = c.uploadTotal, 200 > f.status || 299 < f.status) c.message = c.lang.filetools["httpError" + f.status], c.message || (c.message = c.lang.filetools.httpError.replace("%1",
								f.status)), c.changeStatus("error");
							else {
								for (var a = {
										fileLoader: c
									}, b = ["message", "fileName", "url"], e = c.editor.fire("fileUploadResponse", a), g = 0; g < b.length; g++) {
									var l = b[g];
									"string" === typeof a[l] && (c[l] = a[l])
								}
								c.responseData = a;
								delete c.responseData.fileLoader;
								!1 === e ? c.changeStatus("error") : c.changeStatus("uploaded")
							}
					}
				},
				changeStatus: function (a) {
					this.status = a;
					if ("error" == a || "abort" == a || "loaded" == a || "uploaded" == a) this.abort = function () {};
					this.fire(a);
					this.update()
				},
				update: function () {
					this.fire("update")
				},
				isFinished: function () {
					return !!this.status.match(/^(?:loaded|uploaded|error|abort)$/)
				}
			};
			CKEDITOR.event.implementOn(a.prototype);
			CKEDITOR.event.implementOn(e.prototype);
			var c = /^data:(\S*?);base64,/;
			CKEDITOR.fileTools || (CKEDITOR.fileTools = {});
			CKEDITOR.tools.extend(CKEDITOR.fileTools, {
				uploadRepository: a,
				fileLoader: e,
				getUploadUrl: function (a, b) {
					var c = CKEDITOR.tools.capitalize;
					return b && a[b + "UploadUrl"] ? a[b + "UploadUrl"] : a.uploadUrl ? a.uploadUrl : b && a["filebrowser" + c(b, 1) + "UploadUrl"] ? a["filebrowser" + c(b, 1) + "UploadUrl"] + "\x26responseType\x3djson" : a.filebrowserUploadUrl ? a.filebrowserUploadUrl +
						"\x26responseType\x3djson" : null
				},
				isTypeSupported: function (a, b) {
					return !!a.type.match(b)
				},
				isFileUploadSupported: "function" === typeof FileReader && "function" === typeof (new FileReader).readAsDataURL && "function" === typeof FormData && "function" === typeof (new FormData).append && "function" === typeof XMLHttpRequest && "function" === typeof Blob
			})
		}(),
		function () {
			function a(a, b) {
				var c = [];
				if (b)
					for (var d in b) c.push(d + "\x3d" + encodeURIComponent(b[d]));
				else return a;
				return a + (-1 != a.indexOf("?") ? "\x26" : "?") + c.join("\x26")
			}

			function e(b) {
				return !b.match(/command=QuickUpload/) ||
					b.match(/(\?|&)responseType=json/) ? b : a(b, {
						responseType: "json"
					})
			}

			function b(a) {
				a += "";
				return a.charAt(0).toUpperCase() + a.substr(1)
			}

			function c() {
				var c = this.getDialog(),
					d = c.getParentEditor();
				d._.filebrowserSe = this;
				var f = d.config["filebrowser" + b(c.getName()) + "WindowWidth"] || d.config.filebrowserWindowWidth || "80%",
					c = d.config["filebrowser" + b(c.getName()) + "WindowHeight"] || d.config.filebrowserWindowHeight || "70%",
					e = this.filebrowser.params || {};
				e.CKEditor = d.name;
				e.CKEditorFuncNum = d._.filebrowserFn;
				e.langCode ||
					(e.langCode = d.langCode);
				e = a(this.filebrowser.url, e);
				d.popup(e, f, c, d.config.filebrowserWindowFeatures || d.config.fileBrowserWindowFeatures)
			}

			function g(a) {
				var b = new CKEDITOR.dom.element(a.$.form);
				b && ((a = b.$.elements.ckCsrfToken) ? a = new CKEDITOR.dom.element(a) : (a = new CKEDITOR.dom.element("input"), a.setAttributes({
					name: "ckCsrfToken",
					type: "hidden"
				}), b.append(a)), a.setAttribute("value", CKEDITOR.tools.getCsrfToken()))
			}

			function l() {
				var a = this.getDialog();
				a.getParentEditor()._.filebrowserSe = this;
				return a.getContentElement(this["for"][0],
					this["for"][1]).getInputElement().$.value && a.getContentElement(this["for"][0], this["for"][1]).getAction() ? !0 : !1
			}

			function k(b, c, d) {
				var f = d.params || {};
				f.CKEditor = b.name;
				f.CKEditorFuncNum = b._.filebrowserFn;
				f.langCode || (f.langCode = b.langCode);
				c.action = a(d.url, f);
				c.filebrowser = d
			}

			function f(a, m, q, y) {
				if (y && y.length)
					for (var u, r = y.length; r--;)
						if (u = y[r], "hbox" != u.type && "vbox" != u.type && "fieldset" != u.type || f(a, m, q, u.children), u.filebrowser)
							if ("string" == typeof u.filebrowser && (u.filebrowser = {
									action: "fileButton" ==
										u.type ? "QuickUpload" : "Browse",
									target: u.filebrowser
								}), "Browse" == u.filebrowser.action) {
								var w = u.filebrowser.url;
								void 0 === w && (w = a.config["filebrowser" + b(m) + "BrowseUrl"], void 0 === w && (w = a.config.filebrowserBrowseUrl));
								w && (u.onClick = c, u.filebrowser.url = w, u.hidden = !1)
							} else if ("QuickUpload" == u.filebrowser.action && u["for"] && (w = u.filebrowser.url, void 0 === w && (w = a.config["filebrowser" + b(m) + "UploadUrl"], void 0 === w && (w = a.config.filebrowserUploadUrl)), w)) {
					var t = u.onClick;
					u.onClick = function (b) {
						var c = b.sender,
							f = c.getDialog().getContentElement(this["for"][0],
								this["for"][1]).getInputElement(),
							k = CKEDITOR.fileTools && CKEDITOR.fileTools.isFileUploadSupported;
						if (t && !1 === t.call(c, b)) return !1;
						if (l.call(c, b)) {
							if ("form" !== a.config.filebrowserUploadMethod && k) return b = a.uploadRepository.create(f.$.files[0]), b.on("uploaded", function (a) {
								var b = a.sender.responseData;
								h.call(a.sender.editor, b.url, b.message)
							}), b.on("error", d.bind(this)), b.on("abort", d.bind(this)), b.loadAndUpload(e(w)), "xhr";
							g(f);
							return !0
						}
						return !1
					};
					u.filebrowser.url = w;
					u.hidden = !1;
					k(a, q.getContents(u["for"][0]).get(u["for"][1]),
						u.filebrowser)
				}
			}

			function d(a) {
				var b = {};
				try {
					b = JSON.parse(a.sender.xhr.response) || {}
				} catch (c) {}
				this.enable();
				alert(b.error ? b.error.message : a.sender.message)
			}

			function m(a, b, c) {
				if (-1 !== c.indexOf(";")) {
					c = c.split(";");
					for (var d = 0; d < c.length; d++)
						if (m(a, b, c[d])) return !0;
					return !1
				}
				return (a = a.getContents(b).get(c).filebrowser) && a.url
			}

			function h(a, b) {
				var c = this._.filebrowserSe.getDialog(),
					d = this._.filebrowserSe["for"],
					f = this._.filebrowserSe.filebrowser.onSelect;
				d && c.getContentElement(d[0], d[1]).reset();
				if ("function" !=
					typeof b || !1 !== b.call(this._.filebrowserSe))
					if (!f || !1 !== f.call(this._.filebrowserSe, a, b))
						if ("string" == typeof b && b && alert(b), a && (d = this._.filebrowserSe, c = d.getDialog(), d = d.filebrowser.target || null))
							if (d = d.split(":"), f = c.getContentElement(d[0], d[1])) f.setValue(a), c.selectPage(d[0])
			}
			CKEDITOR.plugins.add("filebrowser", {
				requires: "popup,filetools",
				init: function (a) {
					a._.filebrowserFn = CKEDITOR.tools.addFunction(h, a);
					a.on("destroy", function () {
						CKEDITOR.tools.removeFunction(this._.filebrowserFn)
					})
				}
			});
			CKEDITOR.on("dialogDefinition",
				function (a) {
					if (a.editor.plugins.filebrowser)
						for (var b = a.data.definition, c, d = 0; d < b.contents.length; ++d)
							if (c = b.contents[d]) f(a.editor, a.data.name, b, c.elements), c.hidden && c.filebrowser && (c.hidden = !m(b, c.id, c.filebrowser))
				})
		}(), CKEDITOR.plugins.add("find", {
			requires: "dialog",
			init: function (a) {
				var e = a.addCommand("find", new CKEDITOR.dialogCommand("find")),
					b = a.addCommand("replace", new CKEDITOR.dialogCommand("find", {
						tabId: "replace"
					}));
				e.canUndo = !1;
				e.readOnly = 1;
				b.canUndo = !1;
				a.ui.addButton && (a.ui.addButton("Find", {
					label: a.lang.find.find,
					command: "find",
					toolbar: "find,10"
				}), a.ui.addButton("Replace", {
					label: a.lang.find.replace,
					command: "replace",
					toolbar: "find,20"
				}));
				CKEDITOR.dialog.add("find", this.path + "dialogs/find.js")
			}
		}), CKEDITOR.config.find_highlight = {
			element: "span",
			styles: {
				"background-color": "#004",
				color: "#fff"
			}
		},
		function () {
			function a(a, b) {
				var f = c.exec(a),
					d = c.exec(b);
				if (f) {
					if (!f[2] && "px" == d[2]) return d[1];
					if ("px" == f[2] && !d[2]) return d[1] + "px"
				}
				return b
			}
			var e = CKEDITOR.htmlParser.cssStyle,
				b = CKEDITOR.tools.cssLength,
				c = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i,
				g = {
					elements: {
						$: function (b) {
							var c = b.attributes;
							if ((c = (c = (c = c && c["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(c))) && c.children[0]) && b.attributes["data-cke-resizable"]) {
								var f = (new e(b)).rules;
								b = c.attributes;
								var d = f.width,
									f = f.height;
								d && (b.width = a(b.width, d));
								f && (b.height = a(b.height, f))
							}
							return c
						}
					}
				};
			CKEDITOR.plugins.add("fakeobjects", {
				init: function (a) {
					a.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}", "fakeobjects")
				},
				afterInit: function (a) {
					(a = (a = a.dataProcessor) && a.htmlFilter) && a.addRules(g, {
						applyToAll: !0
					})
				}
			});
			CKEDITOR.editor.prototype.createFakeElement = function (a, c, f, d) {
				var g = this.lang.fakeobjects,
					g = g[f] || g.unknown;
				c = {
					"class": c,
					"data-cke-realelement": encodeURIComponent(a.getOuterHtml()),
					"data-cke-real-node-type": a.type,
					alt: g,
					title: g,
					align: a.getAttribute("align") || ""
				};
				CKEDITOR.env.hc || (c.src = CKEDITOR.tools.transparentImageData);
				f && (c["data-cke-real-element-type"] = f);
				d && (c["data-cke-resizable"] = d, f = new e, d = a.getAttribute("width"),
					a = a.getAttribute("height"), d && (f.rules.width = b(d)), a && (f.rules.height = b(a)), f.populate(c));
				return this.document.createElement("img", {
					attributes: c
				})
			};
			CKEDITOR.editor.prototype.createFakeParserElement = function (a, c, f, d) {
				var g = this.lang.fakeobjects,
					g = g[f] || g.unknown,
					h;
				h = new CKEDITOR.htmlParser.basicWriter;
				a.writeHtml(h);
				h = h.getHtml();
				c = {
					"class": c,
					"data-cke-realelement": encodeURIComponent(h),
					"data-cke-real-node-type": a.type,
					alt: g,
					title: g,
					align: a.attributes.align || ""
				};
				CKEDITOR.env.hc || (c.src = CKEDITOR.tools.transparentImageData);
				f && (c["data-cke-real-element-type"] = f);
				d && (c["data-cke-resizable"] = d, d = a.attributes, a = new e, f = d.width, d = d.height, void 0 !== f && (a.rules.width = b(f)), void 0 !== d && (a.rules.height = b(d)), a.populate(c));
				return new CKEDITOR.htmlParser.element("img", c)
			};
			CKEDITOR.editor.prototype.restoreRealElement = function (b) {
				if (b.data("cke-real-node-type") != CKEDITOR.NODE_ELEMENT) return null;
				var c = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(b.data("cke-realelement")), this.document);
				if (b.data("cke-resizable")) {
					var f =
						b.getStyle("width");
					b = b.getStyle("height");
					f && c.setAttribute("width", a(c.getAttribute("width"), f));
					b && c.setAttribute("height", a(c.getAttribute("height"), b))
				}
				return c
			}
		}(),
		function () {
			function a(a) {
				a = a.attributes;
				return "application/x-shockwave-flash" == a.type || b.test(a.src || "")
			}

			function e(a, b) {
				return a.createFakeParserElement(b, "cke_flash", "flash", !0)
			}
			var b = /\.swf(?:$|\?)/i;
			CKEDITOR.plugins.add("flash", {
				requires: "dialog,fakeobjects",
				onLoad: function () {
					CKEDITOR.addCss("img.cke_flash{background-image: url(" +
						CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}")
				},
				init: function (a) {
					var b = "object[classid,codebase,height,hspace,vspace,width];param[name,value];embed[height,hspace,pluginspage,src,type,vspace,width]";
					CKEDITOR.dialog.isTabEnabled(a, "flash", "properties") && (b += ";object[align]; embed[allowscriptaccess,quality,scale,wmode]");
					CKEDITOR.dialog.isTabEnabled(a, "flash", "advanced") && (b +=
						";object[id]{*}; embed[bgcolor]{*}(*)");
					a.addCommand("flash", new CKEDITOR.dialogCommand("flash", {
						allowedContent: b,
						requiredContent: "embed"
					}));
					a.ui.addButton && a.ui.addButton("Flash", {
						label: a.lang.common.flash,
						command: "flash",
						toolbar: "insert,20"
					});
					CKEDITOR.dialog.add("flash", this.path + "dialogs/flash.js");
					a.addMenuItems && a.addMenuItems({
						flash: {
							label: a.lang.flash.properties,
							command: "flash",
							group: "flash"
						}
					});
					a.on("doubleclick", function (a) {
						var b = a.data.element;
						b.is("img") && "flash" == b.data("cke-real-element-type") &&
							(a.data.dialog = "flash")
					});
					a.contextMenu && a.contextMenu.addListener(function (a) {
						if (a && a.is("img") && !a.isReadOnly() && "flash" == a.data("cke-real-element-type")) return {
							flash: CKEDITOR.TRISTATE_OFF
						}
					})
				},
				afterInit: function (b) {
					var g = b.dataProcessor;
					(g = g && g.dataFilter) && g.addRules({
						elements: {
							"cke:object": function (g) {
								var k = g.attributes;
								if (!(k.classid && String(k.classid).toLowerCase() || a(g))) {
									for (k = 0; k < g.children.length; k++)
										if ("cke:embed" == g.children[k].name) {
											if (!a(g.children[k])) break;
											return e(b, g)
										}
									return null
								}
								return e(b,
									g)
							},
							"cke:embed": function (g) {
								return a(g) ? e(b, g) : null
							}
						}
					}, 5)
				}
			})
		}(), CKEDITOR.tools.extend(CKEDITOR.config, {
			flashEmbedTagOnly: !1,
			flashAddEmbedTag: !0,
			flashConvertOnEdit: !1
		}),
		function () {
			function a(a) {
				var g = a.config,
					l = a.fire("uiSpace", {
						space: "top",
						html: ""
					}).html,
					k = function () {
						function f(a, c, e) {
							d.setStyle(c, b(e));
							d.setStyle("position", a)
						}

						function h(a) {
							var b = m.getDocumentPosition();
							switch (a) {
								case "top":
									f("absolute", "top", b.y - t - z);
									break;
								case "pin":
									f("fixed", "top", x);
									break;
								case "bottom":
									f("absolute", "top", b.y +
										(r.height || r.bottom - r.top) + z)
							}
							l = a
						}
						var l, m, u, r, w, t, B, v = g.floatSpaceDockedOffsetX || 0,
							z = g.floatSpaceDockedOffsetY || 0,
							C = g.floatSpacePinnedOffsetX || 0,
							x = g.floatSpacePinnedOffsetY || 0;
						return function (f) {
							if (m = a.editable()) {
								var n = f && "focus" == f.name;
								n && d.show();
								a.fire("floatingSpaceLayout", {
									show: n
								});
								d.removeStyle("left");
								d.removeStyle("right");
								u = d.getClientRect();
								r = m.getClientRect();
								w = e.getViewPaneSize();
								t = u.height;
								B = "pageXOffset" in e.$ ? e.$.pageXOffset : CKEDITOR.document.$.documentElement.scrollLeft;
								l ? (t + z <=
									r.top ? h("top") : t + z > w.height - r.bottom ? h("pin") : h("bottom"), f = w.width / 2, f = g.floatSpacePreferRight ? "right" : 0 < r.left && r.right < w.width && r.width > u.width ? "rtl" == g.contentsLangDirection ? "right" : "left" : f - r.left > r.right - f ? "left" : "right", u.width > w.width ? (f = "left", n = 0) : (n = "left" == f ? 0 < r.left ? r.left : 0 : r.right < w.width ? w.width - r.right : 0, n + u.width > w.width && (f = "left" == f ? "right" : "left", n = 0)), d.setStyle(f, b(("pin" == l ? C : v) + n + ("pin" == l ? 0 : "left" == f ? B : -B)))) : (l = "pin", h("pin"), k(f))
							}
						}
					}();
				if (l) {
					var f = new CKEDITOR.template('\x3cdiv id\x3d"cke_{name}" class\x3d"cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' +
							CKEDITOR.env.cssClass + '" dir\x3d"{langDir}" title\x3d"' + (CKEDITOR.env.gecko ? " " : "") + '" lang\x3d"{langCode}" role\x3d"application" style\x3d"{style}"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : " ") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : " ") + '\x3cdiv class\x3d"cke_inner"\x3e\x3cdiv id\x3d"{topId}" class\x3d"cke_top" role\x3d"presentation"\x3e{content}\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'),
						d = CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(f.output({
							content: l,
							id: a.id,
							langDir: a.lang.dir,
							langCode: a.langCode,
							name: a.name,
							style: "display:none;z-index:" + (g.baseFloatZIndex - 1),
							topId: a.ui.spaceId("top"),
							voiceLabel: a.title
						}))),
						m = CKEDITOR.tools.eventsBuffer(500, k),
						h = CKEDITOR.tools.eventsBuffer(100, k);
					d.unselectable();
					d.on("mousedown", function (a) {
						a = a.data;
						a.getTarget().hasAscendant("a", 1) || a.preventDefault()
					});
					a.on("focus", function (b) {
						k(b);
						a.on("change", m.input);
						e.on("scroll", h.input);
						e.on("resize", h.input)
					});
					a.on("blur", function () {
						d.hide();
						a.removeListener("change",
							m.input);
						e.removeListener("scroll", h.input);
						e.removeListener("resize", h.input)
					});
					a.on("destroy", function () {
						e.removeListener("scroll", h.input);
						e.removeListener("resize", h.input);
						d.clearCustomData();
						d.remove()
					});
					a.focusManager.hasFocus && d.show();
					a.focusManager.add(d, 1)
				}
			}
			var e = CKEDITOR.document.getWindow(),
				b = CKEDITOR.tools.cssLength;
			CKEDITOR.plugins.add("floatingspace", {
				init: function (b) {
					b.on("loaded", function () {
						a(this)
					}, null, null, 20)
				}
			})
		}(), CKEDITOR.plugins.add("listblock", {
			requires: "panel",
			onLoad: function () {
				var a =
					CKEDITOR.addTemplate("panel-list", '\x3cul role\x3d"presentation" class\x3d"cke_panel_list"\x3e{items}\x3c/ul\x3e'),
					e = CKEDITOR.addTemplate("panel-list-item", '\x3cli id\x3d"{id}" class\x3d"cke_panel_listItem" role\x3dpresentation\x3e\x3ca id\x3d"{id}_option" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"{title}" href\x3d"javascript:void(\'{val}\')"  {onclick}\x3d"CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role\x3d"option"\x3e{text}\x3c/a\x3e\x3c/li\x3e'),
					b = CKEDITOR.addTemplate("panel-list-group",
						'\x3ch1 id\x3d"{id}" class\x3d"cke_panel_grouptitle" role\x3d"presentation" \x3e{label}\x3c/h1\x3e'),
					c = /\'/g;
				CKEDITOR.ui.panel.prototype.addListBlock = function (a, b) {
					return this.addBlock(a, new CKEDITOR.ui.listBlock(this.getHolderElement(), b))
				};
				CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
					base: CKEDITOR.ui.panel.block,
					$: function (a, b) {
						b = b || {};
						var c = b.attributes || (b.attributes = {});
						(this.multiSelect = !!b.multiSelect) && (c["aria-multiselectable"] = !0);
						!c.role && (c.role = "listbox");
						this.base.apply(this, arguments);
						this.element.setAttribute("role", c.role);
						c = this.keys;
						c[40] = "next";
						c[9] = "next";
						c[38] = "prev";
						c[CKEDITOR.SHIFT + 9] = "prev";
						c[32] = CKEDITOR.env.ie ? "mouseup" : "click";
						CKEDITOR.env.ie && (c[13] = "mouseup");
						this._.pendingHtml = [];
						this._.pendingList = [];
						this._.items = {};
						this._.groups = {}
					},
					_: {
						close: function () {
							if (this._.started) {
								var b = a.output({
									items: this._.pendingList.join("")
								});
								this._.pendingList = [];
								this._.pendingHtml.push(b);
								delete this._.started
							}
						},
						getClick: function () {
							this._.click || (this._.click = CKEDITOR.tools.addFunction(function (a) {
								var b =
									this.toggle(a);
								if (this.onClick) this.onClick(a, b)
							}, this));
							return this._.click
						}
					},
					proto: {
						add: function (a, b, k) {
							var f = CKEDITOR.tools.getNextId();
							this._.started || (this._.started = 1, this._.size = this._.size || 0);
							this._.items[a] = f;
							var d;
							d = CKEDITOR.tools.htmlEncodeAttr(a).replace(c, "\\'");
							a = {
								id: f,
								val: d,
								onclick: CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick",
								clickFn: this._.getClick(),
								title: CKEDITOR.tools.htmlEncodeAttr(k || a),
								text: b || a
							};
							this._.pendingList.push(e.output(a))
						},
						startGroup: function (a) {
							this._.close();
							var c = CKEDITOR.tools.getNextId();
							this._.groups[a] = c;
							this._.pendingHtml.push(b.output({
								id: c,
								label: a
							}))
						},
						commit: function () {
							this._.close();
							this.element.appendHtml(this._.pendingHtml.join(""));
							delete this._.size;
							this._.pendingHtml = []
						},
						toggle: function (a) {
							var b = this.isMarked(a);
							b ? this.unmark(a) : this.mark(a);
							return !b
						},
						hideGroup: function (a) {
							var b = (a = this.element.getDocument().getById(this._.groups[a])) && a.getNext();
							a && (a.setStyle("display", "none"), b && "ul" == b.getName() && b.setStyle("display", "none"))
						},
						hideItem: function (a) {
							this.element.getDocument().getById(this._.items[a]).setStyle("display",
								"none")
						},
						showAll: function () {
							var a = this._.items,
								b = this._.groups,
								c = this.element.getDocument(),
								f;
							for (f in a) c.getById(a[f]).setStyle("display", "");
							for (var d in b) a = c.getById(b[d]), f = a.getNext(), a.setStyle("display", ""), f && "ul" == f.getName() && f.setStyle("display", "")
						},
						mark: function (a) {
							this.multiSelect || this.unmarkAll();
							a = this._.items[a];
							var b = this.element.getDocument().getById(a);
							b.addClass("cke_selected");
							this.element.getDocument().getById(a + "_option").setAttribute("aria-selected", !0);
							this.onMark && this.onMark(b)
						},
						markFirstDisplayed: function () {
							var a = this;
							this._.markFirstDisplayed(function () {
								a.multiSelect || a.unmarkAll()
							})
						},
						unmark: function (a) {
							var b = this.element.getDocument();
							a = this._.items[a];
							var c = b.getById(a);
							c.removeClass("cke_selected");
							b.getById(a + "_option").removeAttribute("aria-selected");
							this.onUnmark && this.onUnmark(c)
						},
						unmarkAll: function () {
							var a = this._.items,
								b = this.element.getDocument(),
								c;
							for (c in a) {
								var f = a[c];
								b.getById(f).removeClass("cke_selected");
								b.getById(f + "_option").removeAttribute("aria-selected")
							}
							this.onUnmark &&
								this.onUnmark()
						},
						isMarked: function (a) {
							return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected")
						},
						focus: function (a) {
							this._.focusIndex = -1;
							var b = this.element.getElementsByTag("a"),
								c, f = -1;
							if (a)
								for (c = this.element.getDocument().getById(this._.items[a]).getFirst(); a = b.getItem(++f);) {
									if (a.equals(c)) {
										this._.focusIndex = f;
										break
									}
								} else this.element.focus();
							c && setTimeout(function () {
								c.focus()
							}, 0)
						}
					}
				})
			}
		}), CKEDITOR.plugins.add("richcombo", {
			requires: "floatpanel,listblock,button",
			beforeInit: function (a) {
				a.ui.addHandler(CKEDITOR.UI_RICHCOMBO,
					CKEDITOR.ui.richCombo.handler)
			}
		}),
		function () {
			var a = '\x3cspan id\x3d"{id}" class\x3d"cke_combo cke_combo__{name} {cls}" role\x3d"presentation"\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_combo_label"\x3e{label}\x3c/span\x3e\x3ca class\x3d"cke_combo_button" title\x3d"{title}" tabindex\x3d"-1"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-haspopup\x3d"listbox"';
			CKEDITOR.env.gecko && CKEDITOR.env.mac &&
				(a += ' onkeypress\x3d"return false;"');
			CKEDITOR.env.gecko && (a += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
			var a = a + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan id\x3d"{id}_text" class\x3d"cke_combo_text cke_combo_inlinelabel"\x3e{label}\x3c/span\x3e\x3cspan class\x3d"cke_combo_open"\x3e\x3cspan class\x3d"cke_combo_arrow"\x3e' +
					(CKEDITOR.env.hc ? "\x26#9660;" : CKEDITOR.env.air ? "\x26nbsp;" : "") + "\x3c/span\x3e\x3c/span\x3e\x3c/a\x3e\x3c/span\x3e"),
				e = CKEDITOR.addTemplate("combo", a);
			CKEDITOR.UI_RICHCOMBO = "richcombo";
			CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
				$: function (a) {
					CKEDITOR.tools.extend(this, a, {
						canGroup: !1,
						title: a.label,
						modes: {
							wysiwyg: 1
						},
						editorFocus: 1
					});
					a = this.panel || {};
					delete this.panel;
					this.id = CKEDITOR.tools.getNextNumber();
					this.document = a.parent && a.parent.getDocument() || CKEDITOR.document;
					a.className = "cke_combopanel";
					a.block = {
						multiSelect: a.multiSelect,
						attributes: a.attributes
					};
					a.toolbarRelated = !0;
					this._ = {
						panelDefinition: a,
						items: {},
						listeners: []
					}
				},
				proto: {
					renderHtml: function (a) {
						var c = [];
						this.render(a, c);
						return c.join("")
					},
					render: function (a, c) {
						function g() {
							if (this.getState() != CKEDITOR.TRISTATE_ON) {
								var c = this.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
								a.readOnly && !this.readOnly && (c = CKEDITOR.TRISTATE_DISABLED);
								this.setState(c);
								this.setValue("");
								c != CKEDITOR.TRISTATE_DISABLED && this.refresh && this.refresh()
							}
						}
						var l = CKEDITOR.env,
							k = "cke_" + this.id,
							f = CKEDITOR.tools.addFunction(function (c) {
								p && (a.unlockSelection(1), p = 0);
								m.execute(c)
							}, this),
							d = this,
							m = {
								id: k,
								combo: this,
								focus: function () {
									CKEDITOR.document.getById(k).getChild(1).focus()
								},
								execute: function (c) {
									var f = d._;
									if (f.state != CKEDITOR.TRISTATE_DISABLED)
										if (d.createPanel(a), f.on) f.panel.hide();
										else {
											d.commit();
											var e = d.getValue();
											e ? f.list.mark(e) : f.list.unmarkAll();
											f.panel.showBlock(d.id, new CKEDITOR.dom.element(c), 4)
										}
								},
								clickFn: f
							};
						this._.listeners.push(a.on("activeFilterChange",
							g, this));
						this._.listeners.push(a.on("mode", g, this));
						this._.listeners.push(a.on("selectionChange", g, this));
						!this.readOnly && this._.listeners.push(a.on("readOnly", g, this));
						var h = CKEDITOR.tools.addFunction(function (a, b) {
								a = new CKEDITOR.dom.event(a);
								var c = a.getKeystroke();
								switch (c) {
									case 13:
									case 32:
									case 40:
										CKEDITOR.tools.callFunction(f, b);
										break;
									default:
										m.onkey(m, c)
								}
								a.preventDefault()
							}),
							n = CKEDITOR.tools.addFunction(function () {
								m.onfocus && m.onfocus()
							}),
							p = 0;
						m.keyDownFn = h;
						l = {
							id: k,
							name: this.name || this.command,
							label: this.label,
							title: this.title,
							cls: this.className || "",
							titleJs: l.gecko && !l.hc ? "" : (this.title || "").replace("'", ""),
							keydownFn: h,
							focusFn: n,
							clickFn: f
						};
						e.output(l, c);
						if (this.onRender) this.onRender();
						return m
					},
					createPanel: function (a) {
						if (!this._.panel) {
							var c = this._.panelDefinition,
								e = this._.panelDefinition.block,
								l = c.parent || CKEDITOR.document.getBody(),
								k = "cke_combopanel__" + this.name,
								f = new CKEDITOR.ui.floatPanel(a, l, c),
								c = f.addListBlock(this.id, e),
								d = this;
							f.onShow = function () {
								this.element.addClass(k);
								d.setState(CKEDITOR.TRISTATE_ON);
								d._.on = 1;
								d.editorFocus && !a.focusManager.hasFocus && a.focus();
								if (d.onOpen) d.onOpen()
							};
							f.onHide = function (c) {
								this.element.removeClass(k);
								d.setState(d.modes && d.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
								d._.on = 0;
								if (!c && d.onClose) d.onClose()
							};
							f.onEscape = function () {
								f.hide(1)
							};
							c.onClick = function (a, b) {
								d.onClick && d.onClick.call(d, a, b);
								f.hide()
							};
							this._.panel = f;
							this._.list = c;
							f.getBlock(this.id).onHide = function () {
								d._.on = 0;
								d.setState(CKEDITOR.TRISTATE_OFF)
							};
							this.init && this.init()
						}
					},
					setValue: function (a,
						c) {
						this._.value = a;
						var e = this.document.getById("cke_" + this.id + "_text");
						e && (a || c ? e.removeClass("cke_combo_inlinelabel") : (c = this.label, e.addClass("cke_combo_inlinelabel")), e.setText("undefined" != typeof c ? c : a))
					},
					getValue: function () {
						return this._.value || ""
					},
					unmarkAll: function () {
						this._.list.unmarkAll()
					},
					mark: function (a) {
						this._.list.mark(a)
					},
					hideItem: function (a) {
						this._.list.hideItem(a)
					},
					hideGroup: function (a) {
						this._.list.hideGroup(a)
					},
					showAll: function () {
						this._.list.showAll()
					},
					add: function (a, c, e) {
						this._.items[a] =
							e || a;
						this._.list.add(a, c, e)
					},
					startGroup: function (a) {
						this._.list.startGroup(a)
					},
					commit: function () {
						this._.committed || (this._.list.commit(), this._.committed = 1, CKEDITOR.ui.fire("ready", this));
						this._.committed = 1
					},
					setState: function (a) {
						if (this._.state != a) {
							var c = this.document.getById("cke_" + this.id);
							c.setState(a, "cke_combo");
							a == CKEDITOR.TRISTATE_DISABLED ? c.setAttribute("aria-disabled", !0) : c.removeAttribute("aria-disabled");
							this._.state = a
						}
					},
					getState: function () {
						return this._.state
					},
					enable: function () {
						this._.state ==
							CKEDITOR.TRISTATE_DISABLED && this.setState(this._.lastState)
					},
					disable: function () {
						this._.state != CKEDITOR.TRISTATE_DISABLED && (this._.lastState = this._.state, this.setState(CKEDITOR.TRISTATE_DISABLED))
					},
					destroy: function () {
						CKEDITOR.tools.array.forEach(this._.listeners, function (a) {
							a.removeListener()
						});
						this._.listeners = []
					}
				},
				statics: {
					handler: {
						create: function (a) {
							return new CKEDITOR.ui.richCombo(a)
						}
					}
				}
			});
			CKEDITOR.ui.prototype.addRichCombo = function (a, c) {
				this.add(a, CKEDITOR.UI_RICHCOMBO, c)
			}
		}(),
		function () {
			function a(a,
				c, g, l, k, f, d, m) {
				var h = a.config,
					n = new CKEDITOR.style(d),
					p = k.split(";");
				k = [];
				for (var q = {}, y = 0; y < p.length; y++) {
					var u = p[y];
					if (u) {
						var u = u.split("/"),
							r = {},
							w = p[y] = u[0];
						r[g] = k[y] = u[1] || w;
						q[w] = new CKEDITOR.style(d, r);
						q[w]._.definition.name = w
					} else p.splice(y--, 1)
				}
				a.ui.addRichCombo(c, {
					label: l.label,
					title: l.panelTitle,
					toolbar: "styles," + m,
					defaultValue: "cke-default",
					allowedContent: n,
					requiredContent: n,
					contentTransformations: "span" === d.element ? [
						[{
							element: "font",
							check: "span",
							left: function (a) {
								return !!a.attributes.size ||
									!!a.attributes.align || !!a.attributes.face
							},
							right: function (a) {
								var b = " x-small small medium large x-large xx-large 48px".split(" ");
								a.name = "span";
								a.attributes.size && (a.styles["font-size"] = b[a.attributes.size], delete a.attributes.size);
								a.attributes.align && (a.styles["text-align"] = a.attributes.align, delete a.attributes.align);
								a.attributes.face && (a.styles["font-family"] = a.attributes.face, delete a.attributes.face)
							}
						}]
					] : null,
					panel: {
						css: [CKEDITOR.skin.getPath("editor")].concat(h.contentsCss),
						multiSelect: !1,
						attributes: {
							"aria-label": l.panelTitle
						}
					},
					init: function () {
						var c;
						c = "(" + a.lang.common.optionDefault + ")";
						this.startGroup(l.panelTitle);
						this.add(this.defaultValue, c, c);
						for (var d = 0; d < p.length; d++) c = p[d], this.add(c, q[c].buildPreview(), c)
					},
					onClick: function (c) {
						a.focus();
						a.fire("saveSnapshot");
						var d = this.getValue(),
							f = q[c],
							h, g, k, m, l;
						if (d && c != d)
							if (h = q[d], d = a.getSelection().getRanges()[0], d.collapsed) {
								if (g = a.elementPath(), k = g.contains(function (a) {
										return h.checkElementRemovable(a)
									})) {
									m = d.checkBoundaryOfElement(k,
										CKEDITOR.START);
									l = d.checkBoundaryOfElement(k, CKEDITOR.END);
									if (m && l) {
										for (m = d.createBookmark(); g = k.getFirst();) g.insertBefore(k);
										k.remove();
										d.moveToBookmark(m)
									} else m || l ? d.moveToPosition(k, m ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_END) : (d.splitElement(k), d.moveToPosition(k, CKEDITOR.POSITION_AFTER_END)), e(d, g.elements.slice(), k);
									a.getSelection().selectRanges([d])
								}
							} else a.removeStyle(h);
						c === this.defaultValue ? h && a.removeStyle(h) : a.applyStyle(f);
						a.fire("saveSnapshot")
					},
					onRender: function () {
						a.on("selectionChange",
							function (c) {
								var d = this.getValue();
								c = c.data.path.elements;
								for (var e = 0, h; e < c.length; e++) {
									h = c[e];
									for (var g in q)
										if (q[g].checkElementMatch(h, !0, a)) {
											g != d && this.setValue(g);
											return
										}
								}
								this.setValue("", f)
							}, this)
					},
					refresh: function () {
						a.activeFilter.check(n) || this.setState(CKEDITOR.TRISTATE_DISABLED)
					}
				})
			}

			function e(a, c, g) {
				var l = c.pop();
				if (l) {
					if (g) return e(a, c, l.equals(g) ? null : g);
					g = l.clone();
					a.insertNode(g);
					a.moveToPosition(g, CKEDITOR.POSITION_AFTER_START);
					e(a, c)
				}
			}
			CKEDITOR.plugins.add("font", {
				requires: "richcombo",
				init: function (b) {
					var c = b.config;
					a(b, "Font", "family", b.lang.font, c.font_names, c.font_defaultLabel, c.font_style, 30);
					a(b, "FontSize", "size", b.lang.font.fontSize, c.fontSize_sizes, c.fontSize_defaultLabel, c.fontSize_style, 40)
				}
			})
		}(), CKEDITOR.config.font_names = "Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif",
		CKEDITOR.config.font_defaultLabel = "", CKEDITOR.config.font_style = {
			element: "span",
			styles: {
				"font-family": "#(family)"
			},
			overrides: [{
				element: "font",
				attributes: {
					face: null
				}
			}]
		}, CKEDITOR.config.fontSize_sizes = "8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px", CKEDITOR.config.fontSize_defaultLabel = "", CKEDITOR.config.fontSize_style = {
			element: "span",
			styles: {
				"font-size": "#(size)"
			},
			overrides: [{
				element: "font",
				attributes: {
					size: null
				}
			}]
		}, CKEDITOR.plugins.add("format", {
			requires: "richcombo",
			init: function (a) {
				if (!a.blockless) {
					for (var e = a.config, b = a.lang.format, c = e.format_tags.split(";"), g = {}, l = 0, k = [], f = 0; f < c.length; f++) {
						var d = c[f],
							m = new CKEDITOR.style(e["format_" + d]);
						if (!a.filter.customConfig || a.filter.check(m)) l++, g[d] = m, g[d]._.enterMode = a.config.enterMode, k.push(m)
					}
					0 !== l && a.ui.addRichCombo("Format", {
						label: b.label,
						title: b.panelTitle,
						toolbar: "styles,20",
						allowedContent: k,
						panel: {
							css: [CKEDITOR.skin.getPath("editor")].concat(e.contentsCss),
							multiSelect: !1,
							attributes: {
								"aria-label": b.panelTitle
							}
						},
						init: function () {
							this.startGroup(b.panelTitle);
							for (var a in g) {
								var c = b["tag_" + a];
								this.add(a, g[a].buildPreview(c), c)
							}
						},
						onClick: function (b) {
							a.focus();
							a.fire("saveSnapshot");
							b = g[b];
							var c = a.elementPath();
							b.checkActive(c, a) || a.applyStyle(b);
							setTimeout(function () {
								a.fire("saveSnapshot")
							}, 0)
						},
						onRender: function () {
							a.on("selectionChange", function (b) {
									var c = this.getValue();
									b = b.data.path;
									this.refresh();
									for (var d in g)
										if (g[d].checkActive(b, a)) {
											d != c && this.setValue(d, a.lang.format["tag_" + d]);
											return
										}
									this.setValue("")
								},
								this)
						},
						onOpen: function () {
							this.showAll();
							for (var b in g) a.activeFilter.check(g[b]) || this.hideItem(b)
						},
						refresh: function () {
							var b = a.elementPath();
							if (b) {
								if (b.isContextFor("p"))
									for (var c in g)
										if (a.activeFilter.check(g[c])) return;
								this.setState(CKEDITOR.TRISTATE_DISABLED)
							}
						}
					})
				}
			}
		}), CKEDITOR.config.format_tags = "p;h1;h2;h3;h4;h5;h6;pre;address;div", CKEDITOR.config.format_p = {
			element: "p"
		}, CKEDITOR.config.format_div = {
			element: "div"
		}, CKEDITOR.config.format_pre = {
			element: "pre"
		}, CKEDITOR.config.format_address = {
			element: "address"
		},
		CKEDITOR.config.format_h1 = {
			element: "h1"
		}, CKEDITOR.config.format_h2 = {
			element: "h2"
		}, CKEDITOR.config.format_h3 = {
			element: "h3"
		}, CKEDITOR.config.format_h4 = {
			element: "h4"
		}, CKEDITOR.config.format_h5 = {
			element: "h5"
		}, CKEDITOR.config.format_h6 = {
			element: "h6"
		}, CKEDITOR.plugins.add("forms", {
			requires: "dialog,fakeobjects",
			onLoad: function () {
				CKEDITOR.addCss(".cke_editable form{border: 1px dotted #FF0000;padding: 2px;}\n");
				CKEDITOR.addCss("img.cke_hidden{background-image: url(" + CKEDITOR.getUrl(this.path + "images/hiddenfield.gif") +
					");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 16px !important;height: 16px !important;}")
			},
			init: function (a) {
				var e = a.lang,
					b = 0,
					c = {
						email: 1,
						password: 1,
						search: 1,
						tel: 1,
						text: 1,
						url: 1
					},
					g = {
						checkbox: "input[type,name,checked,required]",
						radio: "input[type,name,checked,required]",
						textfield: "input[type,name,value,size,maxlength,required]",
						textarea: "textarea[cols,rows,name,required]",
						select: "select[name,size,multiple,required]; option[value,selected]",
						button: "input[type,name,value]",
						form: "form[action,name,id,enctype,target,method]",
						hiddenfield: "input[type,name,value]",
						imagebutton: "input[type,alt,src]{width,height,border,border-width,border-style,margin,float}"
					},
					l = {
						checkbox: "input",
						radio: "input",
						textfield: "input",
						textarea: "textarea",
						select: "select",
						button: "input",
						form: "form",
						hiddenfield: "input",
						imagebutton: "input"
					},
					k = function (c, d, f) {
						var k = {
							allowedContent: g[d],
							requiredContent: l[d]
						};
						"form" == d && (k.context = "form");
						a.addCommand(d, new CKEDITOR.dialogCommand(d, k));
						a.ui.addButton && a.ui.addButton(c, {
							label: e.common[c.charAt(0).toLowerCase() + c.slice(1)],
							command: d,
							toolbar: "forms," + (b += 10)
						});
						CKEDITOR.dialog.add(d, f)
					},
					f = this.path + "dialogs/";
				!a.blockless && k("Form", "form", f + "form.js");
				k("Checkbox", "checkbox", f + "checkbox.js");
				k("Radio", "radio", f + "radio.js");
				k("TextField", "textfield", f + "textfield.js");
				k("Textarea", "textarea", f + "textarea.js");
				k("Select", "select", f + "select.js");
				k("Button", "button", f + "button.js");
				var d = a.plugins.image;
				d && !a.plugins.image2 && k("ImageButton", "imagebutton", CKEDITOR.plugins.getPath("image") +
					"dialogs/image.js");
				k("HiddenField", "hiddenfield", f + "hiddenfield.js");
				a.addMenuItems && (k = {
					checkbox: {
						label: e.forms.checkboxAndRadio.checkboxTitle,
						command: "checkbox",
						group: "checkbox"
					},
					radio: {
						label: e.forms.checkboxAndRadio.radioTitle,
						command: "radio",
						group: "radio"
					},
					textfield: {
						label: e.forms.textfield.title,
						command: "textfield",
						group: "textfield"
					},
					hiddenfield: {
						label: e.forms.hidden.title,
						command: "hiddenfield",
						group: "hiddenfield"
					},
					button: {
						label: e.forms.button.title,
						command: "button",
						group: "button"
					},
					select: {
						label: e.forms.select.title,
						command: "select",
						group: "select"
					},
					textarea: {
						label: e.forms.textarea.title,
						command: "textarea",
						group: "textarea"
					}
				}, d && (k.imagebutton = {
					label: e.image.titleButton,
					command: "imagebutton",
					group: "imagebutton"
				}), !a.blockless && (k.form = {
					label: e.forms.form.menu,
					command: "form",
					group: "form"
				}), a.addMenuItems(k));
				a.contextMenu && (!a.blockless && a.contextMenu.addListener(function (a, b, c) {
					if ((a = c.contains("form", 1)) && !a.isReadOnly()) return {
						form: CKEDITOR.TRISTATE_OFF
					}
				}), a.contextMenu.addListener(function (a) {
					if (a && !a.isReadOnly()) {
						var b =
							a.getName();
						if ("select" == b) return {
							select: CKEDITOR.TRISTATE_OFF
						};
						if ("textarea" == b) return {
							textarea: CKEDITOR.TRISTATE_OFF
						};
						if ("input" == b) {
							var f = a.getAttribute("type") || "text";
							switch (f) {
								case "button":
								case "submit":
								case "reset":
									return {
										button: CKEDITOR.TRISTATE_OFF
									};
								case "checkbox":
									return {
										checkbox: CKEDITOR.TRISTATE_OFF
									};
								case "radio":
									return {
										radio: CKEDITOR.TRISTATE_OFF
									};
								case "image":
									return d ? {
										imagebutton: CKEDITOR.TRISTATE_OFF
									} : null
							}
							if (c[f]) return {
								textfield: CKEDITOR.TRISTATE_OFF
							}
						}
						if ("img" == b && "hiddenfield" ==
							a.data("cke-real-element-type")) return {
							hiddenfield: CKEDITOR.TRISTATE_OFF
						}
					}
				}));
				a.on("doubleclick", function (b) {
					var d = b.data.element;
					if (!a.blockless && d.is("form")) b.data.dialog = "form";
					else if (d.is("select")) b.data.dialog = "select";
					else if (d.is("textarea")) b.data.dialog = "textarea";
					else if (d.is("img") && "hiddenfield" == d.data("cke-real-element-type")) b.data.dialog = "hiddenfield";
					else if (d.is("input")) {
						d = d.getAttribute("type") || "text";
						switch (d) {
							case "button":
							case "submit":
							case "reset":
								b.data.dialog = "button";
								break;
							case "checkbox":
								b.data.dialog = "checkbox";
								break;
							case "radio":
								b.data.dialog = "radio";
								break;
							case "image":
								b.data.dialog = "imagebutton"
						}
						c[d] && (b.data.dialog = "textfield")
					}
				})
			},
			afterInit: function (a) {
				var e = a.dataProcessor,
					b = e && e.htmlFilter,
					e = e && e.dataFilter;
				CKEDITOR.env.ie && b && b.addRules({
					elements: {
						input: function (a) {
							a = a.attributes;
							var b = a.type;
							b || (a.type = "text");
							"checkbox" != b && "radio" != b || "on" != a.value || delete a.value
						}
					}
				}, {
					applyToAll: !0
				});
				e && e.addRules({
					elements: {
						input: function (b) {
							if ("hidden" == b.attributes.type) return a.createFakeParserElement(b,
								"cke_hidden", "hiddenfield")
						}
					}
				}, {
					applyToAll: !0
				})
			}
		}), CKEDITOR.plugins.forms = {
			_setupRequiredAttribute: function (a) {
				this.setValue(a.hasAttribute("required"))
			}
		},
		function () {
			var a = {
				canUndo: !1,
				exec: function (a) {
					var b = a.document.createElement("hr");
					a.insertElement(b)
				},
				allowedContent: "hr",
				requiredContent: "hr"
			};
			CKEDITOR.plugins.add("horizontalrule", {
				init: function (e) {
					e.blockless || (e.addCommand("horizontalrule", a), e.ui.addButton && e.ui.addButton("HorizontalRule", {
						label: e.lang.horizontalrule.toolbar,
						command: "horizontalrule",
						toolbar: "insert,40"
					}))
				}
			})
		}(), CKEDITOR.plugins.add("htmlwriter", {
			init: function (a) {
				var e = new CKEDITOR.htmlWriter;
				e.forceSimpleAmpersand = a.config.forceSimpleAmpersand;
				e.indentationChars = a.config.dataIndentationChars || "\t";
				a.dataProcessor.writer = e
			}
		}), CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({
			base: CKEDITOR.htmlParser.basicWriter,
			$: function () {
				this.base();
				this.indentationChars = "\t";
				this.selfClosingEnd = " /\x3e";
				this.lineBreakChars = "\n";
				this.sortAttributes = 1;
				this._.indent = 0;
				this._.indentation = "";
				this._.inPre =
					0;
				this._.rules = {};
				var a = CKEDITOR.dtd,
					e;
				for (e in CKEDITOR.tools.extend({}, a.$nonBodyContent, a.$block, a.$listItem, a.$tableContent)) this.setRules(e, {
					indent: !a[e]["#"],
					breakBeforeOpen: 1,
					breakBeforeClose: !a[e]["#"],
					breakAfterClose: 1,
					needsSpace: e in a.$block && !(e in {
						li: 1,
						dt: 1,
						dd: 1
					})
				});
				this.setRules("br", {
					breakAfterOpen: 1
				});
				this.setRules("title", {
					indent: 0,
					breakAfterOpen: 0
				});
				this.setRules("style", {
					indent: 0,
					breakBeforeClose: 1
				});
				this.setRules("pre", {
					breakAfterOpen: 1,
					indent: 0
				})
			},
			proto: {
				openTag: function (a) {
					var e =
						this._.rules[a];
					this._.afterCloser && e && e.needsSpace && this._.needsSpace && this._.output.push("\n");
					this._.indent ? this.indentation() : e && e.breakBeforeOpen && (this.lineBreak(), this.indentation());
					this._.output.push("\x3c", a);
					this._.afterCloser = 0
				},
				openTagClose: function (a, e) {
					var b = this._.rules[a];
					e ? (this._.output.push(this.selfClosingEnd), b && b.breakAfterClose && (this._.needsSpace = b.needsSpace)) : (this._.output.push("\x3e"), b && b.indent && (this._.indentation += this.indentationChars));
					b && b.breakAfterOpen && this.lineBreak();
					"pre" == a && (this._.inPre = 1)
				},
				attribute: function (a, e) {
					"string" == typeof e && (e = CKEDITOR.tools.htmlEncodeAttr(e), this.forceSimpleAmpersand && (e = e.replace(/&amp;/g, "\x26")));
					this._.output.push(" ", a, '\x3d"', e, '"')
				},
				closeTag: function (a) {
					var e = this._.rules[a];
					e && e.indent && (this._.indentation = this._.indentation.substr(this.indentationChars.length));
					this._.indent ? this.indentation() : e && e.breakBeforeClose && (this.lineBreak(), this.indentation());
					this._.output.push("\x3c/", a, "\x3e");
					"pre" == a && (this._.inPre = 0);
					e &&
						e.breakAfterClose && (this.lineBreak(), this._.needsSpace = e.needsSpace);
					this._.afterCloser = 1
				},
				text: function (a) {
					this._.indent && (this.indentation(), !this._.inPre && (a = CKEDITOR.tools.ltrim(a)));
					this._.output.push(a)
				},
				comment: function (a) {
					this._.indent && this.indentation();
					this._.output.push("\x3c!--", a, "--\x3e")
				},
				lineBreak: function () {
					!this._.inPre && 0 < this._.output.length && this._.output.push(this.lineBreakChars);
					this._.indent = 1
				},
				indentation: function () {
					!this._.inPre && this._.indentation && this._.output.push(this._.indentation);
					this._.indent = 0
				},
				reset: function () {
					this._.output = [];
					this._.indent = 0;
					this._.indentation = "";
					this._.afterCloser = 0;
					this._.inPre = 0;
					this._.needsSpace = 0
				},
				setRules: function (a, e) {
					var b = this._.rules[a];
					b ? CKEDITOR.tools.extend(b, e, !0) : this._.rules[a] = e
				}
			}
		}),
		function () {
			CKEDITOR.plugins.add("iframe", {
				requires: "dialog,fakeobjects",
				onLoad: function () {
					CKEDITOR.addCss("img.cke_iframe{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}")
				},
				init: function (a) {
					var e = a.lang.iframe,
						b = "iframe[align,longdesc,frameborder,height,name,scrolling,src,title,width]";
					a.plugins.dialogadvtab && (b += ";iframe" + a.plugins.dialogadvtab.allowedContent({
						id: 1,
						classes: 1,
						styles: 1
					}));
					CKEDITOR.dialog.add("iframe", this.path + "dialogs/iframe.js");
					a.addCommand("iframe", new CKEDITOR.dialogCommand("iframe", {
						allowedContent: b,
						requiredContent: "iframe"
					}));
					a.ui.addButton && a.ui.addButton("Iframe", {
						label: e.toolbar,
						command: "iframe",
						toolbar: "insert,80"
					});
					a.on("doubleclick", function (a) {
						var b =
							a.data.element;
						b.is("img") && "iframe" == b.data("cke-real-element-type") && (a.data.dialog = "iframe")
					});
					a.addMenuItems && a.addMenuItems({
						iframe: {
							label: e.title,
							command: "iframe",
							group: "image"
						}
					});
					a.contextMenu && a.contextMenu.addListener(function (a) {
						if (a && a.is("img") && "iframe" == a.data("cke-real-element-type")) return {
							iframe: CKEDITOR.TRISTATE_OFF
						}
					})
				},
				afterInit: function (a) {
					var e = a.dataProcessor;
					(e = e && e.dataFilter) && e.addRules({
						elements: {
							iframe: function (b) {
								return a.createFakeParserElement(b, "cke_iframe", "iframe", !0)
							}
						}
					})
				}
			})
		}(),
		function () {
			function a(a, c) {
				c || (c = a.getSelection().getSelectedElement());
				if (c && c.is("img") && !c.data("cke-realelement") && !c.isReadOnly()) return c
			}

			function e(a) {
				var c = a.getStyle("float");
				if ("inherit" == c || "none" == c) c = 0;
				c || (c = a.getAttribute("align"));
				return c
			}
			CKEDITOR.plugins.add("image", {
				requires: "dialog",
				init: function (b) {
					if (!b.plugins.detectConflict("image", ["easyimage", "image2"])) {
						CKEDITOR.dialog.add("image", this.path + "dialogs/image.js");
						var c = "img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}";
						CKEDITOR.dialog.isTabEnabled(b, "image", "advanced") && (c = "img[alt,dir,id,lang,longdesc,!src,title]{*}(*)");
						b.addCommand("image", new CKEDITOR.dialogCommand("image", {
							allowedContent: c,
							requiredContent: "img[alt,src]",
							contentTransformations: [
								["img{width}: sizeToStyle", "img[width]: sizeToAttribute"],
								["img{float}: alignmentToStyle", "img[align]: alignmentToAttribute"]
							]
						}));
						b.ui.addButton && b.ui.addButton("Image", {
							label: b.lang.common.image,
							command: "image",
							toolbar: "insert,10"
						});
						b.on("doubleclick", function (a) {
							var b =
								a.data.element;
							!b.is("img") || b.data("cke-realelement") || b.isReadOnly() || (a.data.dialog = "image")
						});
						b.addMenuItems && b.addMenuItems({
							image: {
								label: b.lang.image.menu,
								command: "image",
								group: "image"
							}
						});
						b.contextMenu && b.contextMenu.addListener(function (c) {
							if (a(b, c)) return {
								image: CKEDITOR.TRISTATE_OFF
							}
						})
					}
				},
				afterInit: function (b) {
					function c(c) {
						var l = b.getCommand("justify" + c);
						if (l) {
							if ("left" == c || "right" == c) l.on("exec", function (k) {
								var f = a(b),
									d;
								f && (d = e(f), d == c ? (f.removeStyle("float"), c == e(f) && f.removeAttribute("align")) :
									f.setStyle("float", c), k.cancel())
							});
							l.on("refresh", function (k) {
								var f = a(b);
								f && (f = e(f), this.setState(f == c ? CKEDITOR.TRISTATE_ON : "right" == c || "left" == c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED), k.cancel())
							})
						}
					}
					b.plugins.image2 || (c("left"), c("right"), c("center"), c("block"))
				}
			})
		}(), CKEDITOR.config.image_removeLinkByEmptyURL = !0,
		function () {
			function a(a, g) {
				var l, k;
				g.on("refresh", function (a) {
						var c = [e],
							g;
						for (g in a.data.states) c.push(a.data.states[g]);
						this.setState(CKEDITOR.tools.search(c, b) ? b : e)
					}, g, null,
					100);
				g.on("exec", function (b) {
					l = a.getSelection();
					k = l.createBookmarks(1);
					b.data || (b.data = {});
					b.data.done = !1
				}, g, null, 0);
				g.on("exec", function () {
					a.forceNextSelectionCheck();
					l.selectBookmarks(k)
				}, g, null, 100)
			}
			var e = CKEDITOR.TRISTATE_DISABLED,
				b = CKEDITOR.TRISTATE_OFF;
			CKEDITOR.plugins.add("indent", {
				init: function (b) {
					var e = CKEDITOR.plugins.indent.genericDefinition;
					a(b, b.addCommand("indent", new e(!0)));
					a(b, b.addCommand("outdent", new e));
					b.ui.addButton && (b.ui.addButton("Indent", {
						label: b.lang.indent.indent,
						command: "indent",
						directional: !0,
						toolbar: "indent,20"
					}), b.ui.addButton("Outdent", {
						label: b.lang.indent.outdent,
						command: "outdent",
						directional: !0,
						toolbar: "indent,10"
					}));
					b.on("dirChanged", function (a) {
						var e = b.createRange(),
							f = a.data.node;
						e.setStartBefore(f);
						e.setEndAfter(f);
						for (var d = new CKEDITOR.dom.walker(e), g; g = d.next();)
							if (g.type == CKEDITOR.NODE_ELEMENT)
								if (!g.equals(f) && g.getDirection()) e.setStartAfter(g), d = new CKEDITOR.dom.walker(e);
								else {
									var h = b.config.indentClasses;
									if (h)
										for (var n = "ltr" == a.data.dir ? ["_rtl", ""] : ["", "_rtl"],
												p = 0; p < h.length; p++) g.hasClass(h[p] + n[0]) && (g.removeClass(h[p] + n[0]), g.addClass(h[p] + n[1]));
									h = g.getStyle("margin-right");
									n = g.getStyle("margin-left");
									h ? g.setStyle("margin-left", h) : g.removeStyle("margin-left");
									n ? g.setStyle("margin-right", n) : g.removeStyle("margin-right")
								}
					})
				}
			});
			CKEDITOR.plugins.indent = {
				genericDefinition: function (a) {
					this.isIndent = !!a;
					this.startDisabled = !this.isIndent
				},
				specificDefinition: function (a, b, e) {
					this.name = b;
					this.editor = a;
					this.jobs = {};
					this.enterBr = a.config.enterMode == CKEDITOR.ENTER_BR;
					this.isIndent = !!e;
					this.relatedGlobal = e ? "indent" : "outdent";
					this.indentKey = e ? 9 : CKEDITOR.SHIFT + 9;
					this.database = {}
				},
				registerCommands: function (a, b) {
					a.on("pluginsLoaded", function () {
						for (var a in b)(function (a, b) {
							var c = a.getCommand(b.relatedGlobal),
								e;
							for (e in b.jobs) c.on("exec", function (c) {
								c.data.done || (a.fire("lockSnapshot"), b.execJob(a, e) && (c.data.done = !0), a.fire("unlockSnapshot"), CKEDITOR.dom.element.clearAllMarkers(b.database))
							}, this, null, e), c.on("refresh", function (c) {
								c.data.states || (c.data.states = {});
								c.data.states[b.name + "@" + e] = b.refreshJob(a, e, c.data.path)
							}, this, null, e);
							a.addFeature(b)
						})(this, b[a])
					})
				}
			};
			CKEDITOR.plugins.indent.genericDefinition.prototype = {
				context: "p",
				exec: function () {}
			};
			CKEDITOR.plugins.indent.specificDefinition.prototype = {
				execJob: function (a, b) {
					var l = this.jobs[b];
					if (l.state != e) return l.exec.call(this, a)
				},
				refreshJob: function (a, b, l) {
					b = this.jobs[b];
					a.activeFilter.checkFeature(this) ? b.state = b.refresh.call(this, a, l) : b.state = e;
					return b.state
				},
				getContext: function (a) {
					return a.contains(this.context)
				}
			}
		}(),
		function () {
			function a(a, b, c) {
				if (!a.getCustomData("indent_processed")) {
					var g = this.editor,
						h = this.isIndent;
					if (b) {
						g = a.$.className.match(this.classNameRegex);
						c = 0;
						g && (g = g[1], c = CKEDITOR.tools.indexOf(b, g) + 1);
						if (0 > (c += h ? 1 : -1)) return;
						c = Math.min(c, b.length);
						c = Math.max(c, 0);
						a.$.className = CKEDITOR.tools.ltrim(a.$.className.replace(this.classNameRegex, ""));
						0 < c && a.addClass(b[c - 1])
					} else {
						b = e(a, c);
						c = parseInt(a.getStyle(b), 10);
						var l = g.config.indentOffset || 40;
						isNaN(c) && (c = 0);
						c += (h ? 1 : -1) * l;
						if (0 > c) return;
						c = Math.max(c,
							0);
						c = Math.ceil(c / l) * l;
						a.setStyle(b, c ? c + (g.config.indentUnit || "px") : "");
						"" === a.getAttribute("style") && a.removeAttribute("style")
					}
					CKEDITOR.dom.element.setMarker(this.database, a, "indent_processed", 1)
				}
			}

			function e(a, b) {
				return "ltr" == (b || a.getComputedStyle("direction")) ? "margin-left" : "margin-right"
			}
			var b = CKEDITOR.dtd.$listItem,
				c = CKEDITOR.dtd.$list,
				g = CKEDITOR.TRISTATE_DISABLED,
				l = CKEDITOR.TRISTATE_OFF;
			CKEDITOR.plugins.add("indentblock", {
				requires: "indent",
				init: function (k) {
					function f() {
						d.specificDefinition.apply(this,
							arguments);
						this.allowedContent = {
							"div h1 h2 h3 h4 h5 h6 ol p pre ul": {
								propertiesOnly: !0,
								styles: m ? null : "margin-left,margin-right",
								classes: m || null
							}
						};
						this.contentTransformations = [
							["div: splitMarginShorthand"],
							["h1: splitMarginShorthand"],
							["h2: splitMarginShorthand"],
							["h3: splitMarginShorthand"],
							["h4: splitMarginShorthand"],
							["h5: splitMarginShorthand"],
							["h6: splitMarginShorthand"],
							["ol: splitMarginShorthand"],
							["p: splitMarginShorthand"],
							["pre: splitMarginShorthand"],
							["ul: splitMarginShorthand"]
						];
						this.enterBr &&
							(this.allowedContent.div = !0);
						this.requiredContent = (this.enterBr ? "div" : "p") + (m ? "(" + m.join(",") + ")" : "{margin-left}");
						this.jobs = {
							20: {
								refresh: function (a, c) {
									var d = c.block || c.blockLimit;
									if (!d.is(b)) var f = d.getAscendant(b),
										d = f && c.contains(f) || d;
									d.is(b) && (d = d.getParent());
									if (this.enterBr || this.getContext(c)) {
										if (m) {
											var f = m,
												d = d.$.className.match(this.classNameRegex),
												k = this.isIndent,
												f = d ? k ? d[1] != f.slice(-1) : !0 : k;
											return f ? l : g
										}
										return this.isIndent ? l : d ? CKEDITOR[0 >= (parseInt(d.getStyle(e(d)), 10) || 0) ? "TRISTATE_DISABLED" :
											"TRISTATE_OFF"] : g
									}
									return g
								},
								exec: function (b) {
									var d = b.getSelection(),
										d = d && d.getRanges()[0],
										f;
									if (f = b.elementPath().contains(c)) a.call(this, f, m);
									else
										for (d = d.createIterator(), b = b.config.enterMode, d.enforceRealBlocks = !0, d.enlargeBr = b != CKEDITOR.ENTER_BR; f = d.getNextParagraph(b == CKEDITOR.ENTER_P ? "p" : "div");) f.isReadOnly() || a.call(this, f, m);
									return !0
								}
							}
						}
					}
					var d = CKEDITOR.plugins.indent,
						m = k.config.indentClasses;
					d.registerCommands(k, {
						indentblock: new f(k, "indentblock", !0),
						outdentblock: new f(k, "outdentblock")
					});
					CKEDITOR.tools.extend(f.prototype, d.specificDefinition.prototype, {
						context: {
							div: 1,
							dl: 1,
							h1: 1,
							h2: 1,
							h3: 1,
							h4: 1,
							h5: 1,
							h6: 1,
							ul: 1,
							ol: 1,
							p: 1,
							pre: 1,
							table: 1
						},
						classNameRegex: m ? new RegExp("(?:^|\\s+)(" + m.join("|") + ")(?\x3d$|\\s)") : null
					})
				}
			})
		}(),
		function () {
			function a(a) {
				function c(d) {
					for (var e = l.startContainer, t = l.endContainer; e && !e.getParent().equals(d);) e = e.getParent();
					for (; t && !t.getParent().equals(d);) t = t.getParent();
					if (!e || !t) return !1;
					for (var B = [], v = !1; !v;) e.equals(t) && (v = !0), B.push(e), e = e.getNext();
					if (1 > B.length) return !1;
					e = d.getParents(!0);
					for (t = 0; t < e.length; t++)
						if (e[t].getName && k[e[t].getName()]) {
							d = e[t];
							break
						}
					for (var e = g.isIndent ? 1 : -1, t = B[0], B = B[B.length - 1], v = CKEDITOR.plugins.list.listToArray(d, h), z = v[B.getCustomData("listarray_index")].indent, t = t.getCustomData("listarray_index"); t <= B.getCustomData("listarray_index"); t++)
						if (v[t].indent += e, 0 < e) {
							for (var y = v[t].parent, x = t - 1; 0 <= x; x--)
								if (v[x].indent === e) {
									y = v[x].parent;
									break
								}
							v[t].parent = new CKEDITOR.dom.element(y.getName(), y.getDocument())
						}
					for (t = B.getCustomData("listarray_index") +
						1; t < v.length && v[t].indent > z; t++) v[t].indent += e;
					e = CKEDITOR.plugins.list.arrayToList(v, h, null, a.config.enterMode, d.getDirection());
					if (!g.isIndent) {
						var A;
						if ((A = d.getParent()) && A.is("li"))
							for (var B = e.listNode.getChildren(), u = [], q, t = B.count() - 1; 0 <= t; t--)(q = B.getItem(t)) && q.is && q.is("li") && u.push(q)
					}
					e && e.listNode.replace(d);
					if (u && u.length)
						for (t = 0; t < u.length; t++) {
							for (q = d = u[t];
								(q = q.getNext()) && q.is && q.getName() in k;) CKEDITOR.env.needsNbspFiller && !d.getFirst(b) && d.append(l.document.createText(" ")), d.append(q);
							d.insertAfter(A)
						}
					e && a.fire("contentDomInvalidated");
					return !0
				}
				for (var g = this, h = this.database, k = this.context, l, q = a.getSelection(), q = (q && q.getRanges()).createIterator(); l = q.getNextRange();) {
					for (var y = l.getCommonAncestor(); y && (y.type != CKEDITOR.NODE_ELEMENT || !k[y.getName()]);) {
						if (a.editable().equals(y)) {
							y = !1;
							break
						}
						y = y.getParent()
					}
					y || (y = l.startPath().contains(k)) && l.setEndAt(y, CKEDITOR.POSITION_BEFORE_END);
					if (!y) {
						var u = l.getEnclosedNode();
						u && u.type == CKEDITOR.NODE_ELEMENT && u.getName() in k && (l.setStartAt(u,
							CKEDITOR.POSITION_AFTER_START), l.setEndAt(u, CKEDITOR.POSITION_BEFORE_END), y = u)
					}
					y && l.startContainer.type == CKEDITOR.NODE_ELEMENT && l.startContainer.getName() in k && (u = new CKEDITOR.dom.walker(l), u.evaluator = e, l.startContainer = u.next());
					y && l.endContainer.type == CKEDITOR.NODE_ELEMENT && l.endContainer.getName() in k && (u = new CKEDITOR.dom.walker(l), u.evaluator = e, l.endContainer = u.previous());
					if (y) return c(y)
				}
				return 0
			}

			function e(a) {
				return a.type == CKEDITOR.NODE_ELEMENT && a.is("li")
			}

			function b(a) {
				return c(a) && g(a)
			}
			var c = CKEDITOR.dom.walker.whitespaces(!0),
				g = CKEDITOR.dom.walker.bookmark(!1, !0),
				l = CKEDITOR.TRISTATE_DISABLED,
				k = CKEDITOR.TRISTATE_OFF;
			CKEDITOR.plugins.add("indentlist", {
				requires: "indent",
				init: function (b) {
					function c(b) {
						e.specificDefinition.apply(this, arguments);
						this.requiredContent = ["ul", "ol"];
						b.on("key", function (a) {
							var c = b.elementPath();
							if ("wysiwyg" == b.mode && a.data.keyCode == this.indentKey && c) {
								var d = this.getContext(c);
								!d || this.isIndent && CKEDITOR.plugins.indentList.firstItemInPath(this.context, c, d) ||
									(b.execCommand(this.relatedGlobal), a.cancel())
							}
						}, this);
						this.jobs[this.isIndent ? 10 : 30] = {
							refresh: this.isIndent ? function (a, b) {
								var c = this.getContext(b),
									d = CKEDITOR.plugins.indentList.firstItemInPath(this.context, b, c);
								return c && this.isIndent && !d ? k : l
							} : function (a, b) {
								return !this.getContext(b) || this.isIndent ? l : k
							},
							exec: CKEDITOR.tools.bind(a, this)
						}
					}
					var e = CKEDITOR.plugins.indent;
					e.registerCommands(b, {
						indentlist: new c(b, "indentlist", !0),
						outdentlist: new c(b, "outdentlist")
					});
					CKEDITOR.tools.extend(c.prototype, e.specificDefinition.prototype, {
						context: {
							ol: 1,
							ul: 1
						}
					})
				}
			});
			CKEDITOR.plugins.indentList = {};
			CKEDITOR.plugins.indentList.firstItemInPath = function (a, b, c) {
				var h = b.contains(e);
				c || (c = b.contains(a));
				return c && h && h.equals(c.getFirst(e))
			}
		}(),
		function () {
			function a(a, b) {
				b = void 0 === b || b;
				var e;
				if (b) e = a.getComputedStyle("text-align");
				else {
					for (; !a.hasAttribute || !a.hasAttribute("align") && !a.getStyle("text-align");) {
						e = a.getParent();
						if (!e) break;
						a = e
					}
					e = a.getStyle("text-align") || a.getAttribute("align") || ""
				}
				e && (e = e.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i,
					""));
				!e && b && (e = "rtl" == a.getComputedStyle("direction") ? "right" : "left");
				return e
			}

			function e(a, b, e) {
				this.editor = a;
				this.name = b;
				this.value = e;
				this.context = "p";
				b = a.config.justifyClasses;
				var k = a.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div";
				if (b) {
					switch (e) {
						case "left":
							this.cssClassName = b[0];
							break;
						case "center":
							this.cssClassName = b[1];
							break;
						case "right":
							this.cssClassName = b[2];
							break;
						case "justify":
							this.cssClassName = b[3]
					}
					this.cssClassRegex = new RegExp("(?:^|\\s+)(?:" + b.join("|") + ")(?\x3d$|\\s)");
					this.requiredContent =
						k + "(" + this.cssClassName + ")"
				} else this.requiredContent = k + "{text-align}";
				this.allowedContent = {
					"caption div h1 h2 h3 h4 h5 h6 p pre td th li": {
						propertiesOnly: !0,
						styles: this.cssClassName ? null : "text-align",
						classes: this.cssClassName || null
					}
				};
				a.config.enterMode == CKEDITOR.ENTER_BR && (this.allowedContent.div = !0)
			}

			function b(a) {
				var b = a.editor,
					e = b.createRange();
				e.setStartBefore(a.data.node);
				e.setEndAfter(a.data.node);
				for (var k = new CKEDITOR.dom.walker(e), f; f = k.next();)
					if (f.type == CKEDITOR.NODE_ELEMENT)
						if (!f.equals(a.data.node) &&
							f.getDirection()) e.setStartAfter(f), k = new CKEDITOR.dom.walker(e);
						else {
							var d = b.config.justifyClasses;
							d && (f.hasClass(d[0]) ? (f.removeClass(d[0]), f.addClass(d[2])) : f.hasClass(d[2]) && (f.removeClass(d[2]), f.addClass(d[0])));
							d = f.getStyle("text-align");
							"left" == d ? f.setStyle("text-align", "right") : "right" == d && f.setStyle("text-align", "left")
						}
			}
			e.prototype = {
				exec: function (b) {
					var e = b.getSelection(),
						l = b.config.enterMode;
					if (e) {
						for (var k = e.createBookmarks(), f = e.getRanges(), d = this.cssClassName, m, h, n = b.config.useComputedState,
								n = void 0 === n || n, p = f.length - 1; 0 <= p; p--)
							for (m = f[p].createIterator(), m.enlargeBr = l != CKEDITOR.ENTER_BR; h = m.getNextParagraph(l == CKEDITOR.ENTER_P ? "p" : "div");)
								if (!h.isReadOnly()) {
									var q = h.getName(),
										y;
									y = b.activeFilter.check(q + "{text-align}");
									if ((q = b.activeFilter.check(q + "(" + d + ")")) || y) {
										h.removeAttribute("align");
										h.removeStyle("text-align");
										var u = d && (h.$.className = CKEDITOR.tools.ltrim(h.$.className.replace(this.cssClassRegex, ""))),
											r = this.state == CKEDITOR.TRISTATE_OFF && (!n || a(h, !0) != this.value);
										d && q ? r ? h.addClass(d) :
											u || h.removeAttribute("class") : r && y && h.setStyle("text-align", this.value)
									}
								}
						b.focus();
						b.forceNextSelectionCheck();
						e.selectBookmarks(k)
					}
				},
				refresh: function (b, e) {
					var l = e.block || e.blockLimit,
						k = l.getName(),
						f = l.equals(b.editable()),
						k = this.cssClassName ? b.activeFilter.check(k + "(" + this.cssClassName + ")") : b.activeFilter.check(k + "{text-align}");
					f && 1 === e.elements.length ? this.setState(CKEDITOR.TRISTATE_OFF) : !f && k ? this.setState(a(l, this.editor.config.useComputedState) == this.value ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) :
						this.setState(CKEDITOR.TRISTATE_DISABLED)
				}
			};
			CKEDITOR.plugins.add("justify", {
				init: function (a) {
					if (!a.blockless) {
						var g = new e(a, "justifyleft", "left"),
							l = new e(a, "justifycenter", "center"),
							k = new e(a, "justifyright", "right"),
							f = new e(a, "justifyblock", "justify");
						a.addCommand("justifyleft", g);
						a.addCommand("justifycenter", l);
						a.addCommand("justifyright", k);
						a.addCommand("justifyblock", f);
						a.ui.addButton && (a.ui.addButton("JustifyLeft", {
							label: a.lang.common.alignLeft,
							command: "justifyleft",
							toolbar: "align,10"
						}), a.ui.addButton("JustifyCenter", {
							label: a.lang.common.center,
							command: "justifycenter",
							toolbar: "align,20"
						}), a.ui.addButton("JustifyRight", {
							label: a.lang.common.alignRight,
							command: "justifyright",
							toolbar: "align,30"
						}), a.ui.addButton("JustifyBlock", {
							label: a.lang.common.justify,
							command: "justifyblock",
							toolbar: "align,40"
						}));
						a.on("dirChanged", b)
					}
				}
			})
		}(), CKEDITOR.plugins.add("menubutton", {
			requires: "button,menu",
			onLoad: function () {
				var a = function (a) {
					var b = this._,
						c = b.menu;
					b.state !== CKEDITOR.TRISTATE_DISABLED && (b.on && c ? c.hide() : (b.previousState = b.state,
						c || (c = b.menu = new CKEDITOR.menu(a, {
							panel: {
								className: "cke_menu_panel",
								attributes: {
									"aria-label": a.lang.common.options
								}
							}
						}), c.onHide = CKEDITOR.tools.bind(function () {
							var c = this.command ? a.getCommand(this.command).modes : this.modes;
							this.setState(!c || c[a.mode] ? b.previousState : CKEDITOR.TRISTATE_DISABLED);
							b.on = 0
						}, this), this.onMenu && c.addListener(this.onMenu)), this.setState(CKEDITOR.TRISTATE_ON), b.on = 1, setTimeout(function () {
							c.show(CKEDITOR.document.getById(b.id), 4)
						}, 0)))
				};
				CKEDITOR.ui.menuButton = CKEDITOR.tools.createClass({
					base: CKEDITOR.ui.button,
					$: function (e) {
						delete e.panel;
						this.base(e);
						this.hasArrow = "menu";
						this.click = a
					},
					statics: {
						handler: {
							create: function (a) {
								return new CKEDITOR.ui.menuButton(a)
							}
						}
					}
				})
			},
			beforeInit: function (a) {
				a.ui.addHandler(CKEDITOR.UI_MENUBUTTON, CKEDITOR.ui.menuButton.handler)
			}
		}), CKEDITOR.UI_MENUBUTTON = "menubutton", "use strict",
		function () {
			CKEDITOR.plugins.add("language", {
				requires: "menubutton",
				init: function (a) {
					var e = a.config.language_list || ["ar:Arabic:rtl", "fr:French", "es:Spanish"],
						b = this,
						c = a.lang.language,
						g = {},
						l, k, f, d;
					a.addCommand("language", {
						allowedContent: "span[!lang,!dir]",
						requiredContent: "span[lang,dir]",
						contextSensitive: !0,
						exec: function (a, b) {
							var c = g["language_" + b];
							if (c) a[c.style.checkActive(a.elementPath(), a) ? "removeStyle" : "applyStyle"](c.style)
						},
						refresh: function (a) {
							this.setState(b.getCurrentLangElement(a) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
						}
					});
					for (d = 0; d < e.length; d++) l = e[d].split(":"), k = l[0], f = "language_" + k, g[f] = {
						label: l[1],
						langId: k,
						group: "language",
						order: d,
						ltr: "rtl" != ("" + l[2]).toLowerCase(),
						onClick: function () {
							a.execCommand("language",
								this.langId)
						},
						role: "menuitemcheckbox"
					}, g[f].style = new CKEDITOR.style({
						element: "span",
						attributes: {
							lang: k,
							dir: g[f].ltr ? "ltr" : "rtl"
						}
					});
					g.language_remove = {
						label: c.remove,
						group: "language_remove",
						state: CKEDITOR.TRISTATE_DISABLED,
						order: g.length,
						onClick: function () {
							var c = b.getCurrentLangElement(a);
							c && a.execCommand("language", c.getAttribute("lang"))
						}
					};
					a.addMenuGroup("language", 1);
					a.addMenuGroup("language_remove");
					a.addMenuItems(g);
					a.ui.add("Language", CKEDITOR.UI_MENUBUTTON, {
						label: c.button,
						allowedContent: "span[!lang,!dir]",
						requiredContent: "span[lang,dir]",
						toolbar: "bidi,30",
						command: "language",
						onMenu: function () {
							var c = {},
								d = b.getCurrentLangElement(a),
								f;
							for (f in g) c[f] = CKEDITOR.TRISTATE_OFF;
							c.language_remove = d ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
							d && (c["language_" + d.getAttribute("lang")] = CKEDITOR.TRISTATE_ON);
							return c
						}
					});
					a.addRemoveFormatFilter && a.addRemoveFormatFilter(function (a) {
						return !(a.is("span") && a.getAttribute("dir") && a.getAttribute("lang"))
					})
				},
				getCurrentLangElement: function (a) {
					var e = a.elementPath();
					a =
						e && e.elements;
					var b;
					if (e)
						for (var c = 0; c < a.length; c++) e = a[c], !b && "span" == e.getName() && e.hasAttribute("dir") && e.hasAttribute("lang") && (b = e);
					return b
				}
			})
		}(), "use strict",
		function () {
			function a(a) {
				return a.replace(/'/g, "\\$\x26")
			}

			function e(a) {
				for (var b, c = a.length, d = [], f = 0; f < c; f++) b = a.charCodeAt(f), d.push(b);
				return "String.fromCharCode(" + d.join(",") + ")"
			}

			function b(b, c) {
				var d = b.plugins.link,
					f = d.compiledProtectionFunction.params,
					e, h;
				h = [d.compiledProtectionFunction.name, "("];
				for (var g = 0; g < f.length; g++) d = f[g].toLowerCase(),
					e = c[d], 0 < g && h.push(","), h.push("'", e ? a(encodeURIComponent(c[d])) : "", "'");
				h.push(")");
				return h.join("")
			}

			function c(a) {
				a = a.config.emailProtection || "";
				var b;
				a && "encode" != a && (b = {}, a.replace(/^([^(]+)\(([^)]+)\)$/, function (a, c, d) {
					b.name = c;
					b.params = [];
					d.replace(/[^,\s]+/g, function (a) {
						b.params.push(a)
					})
				}));
				return b
			}
			CKEDITOR.plugins.add("link", {
				requires: "dialog,fakeobjects",
				onLoad: function () {
					function a(b) {
						return c.replace(/%1/g, "rtl" == b ? "right" : "left").replace(/%2/g, "cke_contents_" + b)
					}
					var b = "background:url(" +
						CKEDITOR.getUrl(this.path + "images" + (CKEDITOR.env.hidpi ? "/hidpi" : "") + "/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;background-size:16px;",
						c = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" + b + "padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{" + b + "width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}";
					CKEDITOR.addCss(a("ltr") + a("rtl"))
				},
				init: function (a) {
					var b = "a[!href]";
					CKEDITOR.dialog.isTabEnabled(a, "link", "advanced") &&
						(b = b.replace("]", ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type,download]{*}(*)"));
					CKEDITOR.dialog.isTabEnabled(a, "link", "target") && (b = b.replace("]", ",target,onclick]"));
					a.addCommand("link", new CKEDITOR.dialogCommand("link", {
						allowedContent: b,
						requiredContent: "a[href]"
					}));
					a.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", {
						allowedContent: "a[!name,id]",
						requiredContent: "a[name]"
					}));
					a.addCommand("unlink", new CKEDITOR.unlinkCommand);
					a.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand);
					a.setKeystroke(CKEDITOR.CTRL + 76, "link");
					a.setKeystroke(CKEDITOR.CTRL + 75, "link");
					a.ui.addButton && (a.ui.addButton("Link", {
						label: a.lang.link.toolbar,
						command: "link",
						toolbar: "links,10"
					}), a.ui.addButton("Unlink", {
						label: a.lang.link.unlink,
						command: "unlink",
						toolbar: "links,20"
					}), a.ui.addButton("Anchor", {
						label: a.lang.link.anchor.toolbar,
						command: "anchor",
						toolbar: "links,30"
					}));
					CKEDITOR.dialog.add("link", this.path + "dialogs/link.js");
					CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js");
					a.on("doubleclick",
						function (b) {
							var c = b.data.element.getAscendant({
								a: 1,
								img: 1
							}, !0);
							c && !c.isReadOnly() && (c.is("a") ? (b.data.dialog = !c.getAttribute("name") || c.getAttribute("href") && c.getChildCount() ? "link" : "anchor", b.data.link = c) : CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, c) && (b.data.dialog = "anchor"))
						}, null, null, 0);
					a.on("doubleclick", function (b) {
						b.data.dialog in {
							link: 1,
							anchor: 1
						} && b.data.link && a.getSelection().selectElement(b.data.link)
					}, null, null, 20);
					a.addMenuItems && a.addMenuItems({
						anchor: {
							label: a.lang.link.anchor.menu,
							command: "anchor",
							group: "anchor",
							order: 1
						},
						removeAnchor: {
							label: a.lang.link.anchor.remove,
							command: "removeAnchor",
							group: "anchor",
							order: 5
						},
						link: {
							label: a.lang.link.menu,
							command: "link",
							group: "link",
							order: 1
						},
						unlink: {
							label: a.lang.link.unlink,
							command: "unlink",
							group: "link",
							order: 5
						}
					});
					a.contextMenu && a.contextMenu.addListener(function (b) {
						if (!b || b.isReadOnly()) return null;
						b = CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, b);
						if (!b && !(b = CKEDITOR.plugins.link.getSelectedLink(a))) return null;
						var c = {};
						b.getAttribute("href") &&
							b.getChildCount() && (c = {
								link: CKEDITOR.TRISTATE_OFF,
								unlink: CKEDITOR.TRISTATE_OFF
							});
						b && b.hasAttribute("name") && (c.anchor = c.removeAnchor = CKEDITOR.TRISTATE_OFF);
						return c
					});
					this.compiledProtectionFunction = c(a)
				},
				afterInit: function (a) {
					a.dataProcessor.dataFilter.addRules({
						elements: {
							a: function (b) {
								return b.attributes.name ? b.children.length ? null : a.createFakeParserElement(b, "cke_anchor", "anchor") : null
							}
						}
					});
					var b = a._.elementsPath && a._.elementsPath.filters;
					b && b.push(function (b, c) {
						if ("a" == c && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(a,
								b) || b.getAttribute("name") && (!b.getAttribute("href") || !b.getChildCount()))) return "anchor"
					})
				}
			});
			var g = /^javascript:/,
				l = /^mailto:([^?]+)(?:\?(.+))?$/,
				k = /subject=([^;?:@&=$,\/]*)/i,
				f = /body=([^;?:@&=$,\/]*)/i,
				d = /^#(.*)$/,
				m = /^((?:http|https|ftp|news):\/\/)?(.*)$/,
				h = /^(_(?:self|top|parent|blank))$/,
				n = /^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/,
				p = /^javascript:([^(]+)\(([^)]+)\)$/,
				q = /\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/,
				y = /(?:^|,)([^=]+)=(\d+|yes|no)/gi,
				u = /^tel:(.*)$/,
				r = {
					id: "advId",
					dir: "advLangDir",
					accessKey: "advAccessKey",
					name: "advName",
					lang: "advLangCode",
					tabindex: "advTabIndex",
					title: "advTitle",
					type: "advContentType",
					"class": "advCSSClasses",
					charset: "advCharset",
					style: "advStyles",
					rel: "advRel"
				};
			CKEDITOR.plugins.link = {
				getSelectedLink: function (a, b) {
					var c = a.getSelection(),
						d = c.getSelectedElement(),
						f = c.getRanges(),
						e = [],
						h;
					if (!b && d && d.is("a")) return d;
					for (d = 0; d < f.length; d++)
						if (h = c.getRanges()[d], h.shrink(CKEDITOR.SHRINK_ELEMENT, !0, {
								skipBogus: !0
							}), (h = a.elementPath(h.getCommonAncestor()).contains("a", 1)) && b) e.push(h);
						else if (h) return h;
					return b ? e : null
				},
				getEditorAnchors: function (a) {
					for (var b = a.editable(), c = b.isInline() && !a.plugins.divarea ? a.document : b, b = c.getElementsByTag("a"), c = c.getElementsByTag("img"), d = [], f = 0, e; e = b.getItem(f++);)(e.data("cke-saved-name") || e.hasAttribute("name")) && d.push({
						name: e.data("cke-saved-name") || e.getAttribute("name"),
						id: e.getAttribute("id")
					});
					for (f = 0; e = c.getItem(f++);)(e = this.tryRestoreFakeAnchor(a,
						e)) && d.push({
						name: e.getAttribute("name"),
						id: e.getAttribute("id")
					});
					return d
				},
				fakeAnchor: !0,
				tryRestoreFakeAnchor: function (a, b) {
					if (b && b.data("cke-real-element-type") && "anchor" == b.data("cke-real-element-type")) {
						var c = a.restoreRealElement(b);
						if (c.data("cke-saved-name")) return c
					}
				},
				parseLinkAttributes: function (a, b) {
					var c = b && (b.data("cke-saved-href") || b.getAttribute("href")) || "",
						e = a.plugins.link.compiledProtectionFunction,
						z = a.config.emailProtection,
						C, x = {};
					c.match(g) && ("encode" == z ? c = c.replace(n, function (a,
						b, c) {
						c = c || "";
						return "mailto:" + String.fromCharCode.apply(String, b.split(",")) + c.replace(/\\'/g, "'")
					}) : z && c.replace(p, function (a, b, c) {
						if (b == e.name) {
							x.type = "email";
							a = x.email = {};
							b = /(^')|('$)/g;
							c = c.match(/[^,\s]+/g);
							for (var d = c.length, f, h, g = 0; g < d; g++) f = decodeURIComponent, h = c[g].replace(b, "").replace(/\\'/g, "'"), h = f(h), f = e.params[g].toLowerCase(), a[f] = h;
							a.address = [a.name, a.domain].join("@")
						}
					}));
					if (!x.type)
						if (z = c.match(d)) x.type = "anchor", x.anchor = {}, x.anchor.name = x.anchor.id = z[1];
						else if (z = c.match(u)) x.type =
						"tel", x.tel = z[1];
					else if (z = c.match(l)) {
						C = c.match(k);
						c = c.match(f);
						x.type = "email";
						var A = x.email = {};
						A.address = z[1];
						C && (A.subject = decodeURIComponent(C[1]));
						c && (A.body = decodeURIComponent(c[1]))
					} else c && (C = c.match(m)) && (x.type = "url", x.url = {}, x.url.protocol = C[1], x.url.url = C[2]);
					if (b) {
						if (c = b.getAttribute("target")) x.target = {
							type: c.match(h) ? c : "frame",
							name: c
						};
						else if (c = (c = b.data("cke-pa-onclick") || b.getAttribute("onclick")) && c.match(q))
							for (x.target = {
									type: "popup",
									name: c[1]
								}; z = y.exec(c[2]);) "yes" != z[2] && "1" !=
								z[2] || z[1] in {
									height: 1,
									width: 1,
									top: 1,
									left: 1
								} ? isFinite(z[2]) && (x.target[z[1]] = z[2]) : x.target[z[1]] = !0;
						null !== b.getAttribute("download") && (x.download = !0);
						var c = {},
							G;
						for (G in r)(z = b.getAttribute(G)) && (c[r[G]] = z);
						if (G = b.data("cke-saved-name") || c.advName) c.advName = G;
						CKEDITOR.tools.isEmpty(c) || (x.advanced = c)
					}
					return x
				},
				getLinkAttributes: function (c, d) {
					var f = c.config.emailProtection || "",
						h = {};
					switch (d.type) {
						case "url":
							var f = d.url && void 0 !== d.url.protocol ? d.url.protocol : "http://",
								g = d.url && CKEDITOR.tools.trim(d.url.url) ||
								"";
							h["data-cke-saved-href"] = 0 === g.indexOf("/") ? g : f + g;
							break;
						case "anchor":
							f = d.anchor && d.anchor.id;
							h["data-cke-saved-href"] = "#" + (d.anchor && d.anchor.name || f || "");
							break;
						case "email":
							var k = d.email,
								g = k.address;
							switch (f) {
								case "":
								case "encode":
									var l = encodeURIComponent(k.subject || ""),
										m = encodeURIComponent(k.body || ""),
										k = [];
									l && k.push("subject\x3d" + l);
									m && k.push("body\x3d" + m);
									k = k.length ? "?" + k.join("\x26") : "";
									"encode" == f ? (f = ["javascript:void(location.href\x3d'mailto:'+", e(g)], k && f.push("+'", a(k), "'"), f.push(")")) :
										f = ["mailto:", g, k];
									break;
								default:
									f = g.split("@", 2), k.name = f[0], k.domain = f[1], f = ["javascript:", b(c, k)]
							}
							h["data-cke-saved-href"] = f.join("");
							break;
						case "tel":
							h["data-cke-saved-href"] = "tel:" + d.tel
					}
					if (d.target)
						if ("popup" == d.target.type) {
							for (var f = ["window.open(this.href, '", d.target.name || "", "', '"], n = "resizable status location toolbar menubar fullscreen scrollbars dependent".split(" "), g = n.length, l = function (a) {
									d.target[a] && n.push(a + "\x3d" + d.target[a])
								}, k = 0; k < g; k++) n[k] += d.target[n[k]] ? "\x3dyes" : "\x3dno";
							l("width");
							l("left");
							l("height");
							l("top");
							f.push(n.join(","), "'); return false;");
							h["data-cke-pa-onclick"] = f.join("")
						} else "notSet" != d.target.type && d.target.name && (h.target = d.target.name);
					d.download && (h.download = "");
					if (d.advanced) {
						for (var y in r)(f = d.advanced[r[y]]) && (h[y] = f);
						h.name && (h["data-cke-saved-name"] = h.name)
					}
					h["data-cke-saved-href"] && (h.href = h["data-cke-saved-href"]);
					y = {
						target: 1,
						onclick: 1,
						"data-cke-pa-onclick": 1,
						"data-cke-saved-name": 1,
						download: 1
					};
					d.advanced && CKEDITOR.tools.extend(y, r);
					for (var p in h) delete y[p];
					return {
						set: h,
						removed: CKEDITOR.tools.objectKeys(y)
					}
				},
				showDisplayTextForElement: function (a, b) {
					var c = {
							img: 1,
							table: 1,
							tbody: 1,
							thead: 1,
							tfoot: 1,
							input: 1,
							select: 1,
							textarea: 1
						},
						d = b.getSelection();
					return b.widgets && b.widgets.focused || d && 1 < d.getRanges().length ? !1 : !a || !a.getName || !a.is(c)
				}
			};
			CKEDITOR.unlinkCommand = function () {};
			CKEDITOR.unlinkCommand.prototype = {
				exec: function (a) {
					if (CKEDITOR.env.ie) {
						var b = a.getSelection().getRanges()[0],
							c = b.getPreviousEditableNode() && b.getPreviousEditableNode().getAscendant("a", !0) ||
							b.getNextEditableNode() && b.getNextEditableNode().getAscendant("a", !0),
							d;
						b.collapsed && c && (d = b.createBookmark(), b.selectNodeContents(c), b.select())
					}
					c = new CKEDITOR.style({
						element: "a",
						type: CKEDITOR.STYLE_INLINE,
						alwaysRemoveElement: 1
					});
					a.removeStyle(c);
					d && (b.moveToBookmark(d), b.select())
				},
				refresh: function (a, b) {
					var c = b.lastElement && b.lastElement.getAscendant("a", !0);
					c && "a" == c.getName() && c.getAttribute("href") && c.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED)
				},
				contextSensitive: 1,
				startDisabled: 1,
				requiredContent: "a[href]",
				editorFocus: 1
			};
			CKEDITOR.removeAnchorCommand = function () {};
			CKEDITOR.removeAnchorCommand.prototype = {
				exec: function (a) {
					var b = a.getSelection(),
						c = b.createBookmarks(),
						d;
					if (b && (d = b.getSelectedElement()) && (d.getChildCount() ? d.is("a") : CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, d))) d.remove(1);
					else if (d = CKEDITOR.plugins.link.getSelectedLink(a)) d.hasAttribute("href") ? (d.removeAttributes({
							name: 1,
							"data-cke-saved-name": 1
						}), d.removeClass("cke_anchor")) :
						d.remove(1);
					b.selectBookmarks(c)
				},
				requiredContent: "a[name]"
			};
			CKEDITOR.tools.extend(CKEDITOR.config, {
				linkShowAdvancedTab: !0,
				linkShowTargetTab: !0
			})
		}(),
		function () {
			function a(a, b, c) {
				function d(c) {
					if (!(!(l = k[c ? "getFirst" : "getLast"]()) || l.is && l.isBlockBoundary() || !(m = b.root[c ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(!0))) || m.is && m.isBlockBoundary({
							br: 1
						}))) a.document.createElement("br")[c ? "insertBefore" : "insertAfter"](l)
				}
				for (var f = CKEDITOR.plugins.list.listToArray(b.root, c), e = [], h = 0; h < b.contents.length; h++) {
					var g =
						b.contents[h];
					(g = g.getAscendant("li", !0)) && !g.getCustomData("list_item_processed") && (e.push(g), CKEDITOR.dom.element.setMarker(c, g, "list_item_processed", !0))
				}
				g = null;
				for (h = 0; h < e.length; h++) g = e[h].getCustomData("listarray_index"), f[g].indent = -1;
				for (h = g + 1; h < f.length; h++)
					if (f[h].indent > f[h - 1].indent + 1) {
						e = f[h - 1].indent + 1 - f[h].indent;
						for (g = f[h].indent; f[h] && f[h].indent >= g;) f[h].indent += e, h++;
						h--
					}
				var k = CKEDITOR.plugins.list.arrayToList(f, c, null, a.config.enterMode, b.root.getAttribute("dir")).listNode,
					l, m;
				d(!0);
				d();
				k.replace(b.root);
				a.fire("contentDomInvalidated")
			}

			function e(a, b) {
				this.name = a;
				this.context = this.type = b;
				this.allowedContent = b + " li";
				this.requiredContent = b
			}

			function b(a, b, c, d) {
				for (var f, e; f = a[d ? "getLast" : "getFirst"](q);)(e = f.getDirection(1)) !== b.getDirection(1) && f.setAttribute("dir", e), f.remove(), c ? f[d ? "insertBefore" : "insertAfter"](c) : b.append(f, d)
			}

			function c(a) {
				function c(d) {
					var f = a[d ? "getPrevious" : "getNext"](h);
					f && f.type == CKEDITOR.NODE_ELEMENT && f.is(a.getName()) && (b(a, f, null, !d), a.remove(),
						a = f)
				}
				c();
				c(1)
			}

			function g(a) {
				return a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in CKEDITOR.dtd.$block || a.getName() in CKEDITOR.dtd.$listItem) && CKEDITOR.dtd[a.getName()]["#"]
			}

			function l(a, d, f) {
				a.fire("saveSnapshot");
				f.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);
				var e = f.extractContents();
				d.trim(!1, !0);
				var g = d.createBookmark(),
					l = new CKEDITOR.dom.elementPath(d.startContainer),
					m = l.block,
					l = l.lastElement.getAscendant("li", 1) || m,
					z = new CKEDITOR.dom.elementPath(f.startContainer),
					p = z.contains(CKEDITOR.dtd.$listItem),
					z = z.contains(CKEDITOR.dtd.$list);
				m ? (m = m.getBogus()) && m.remove() : z && (m = z.getPrevious(h)) && n(m) && m.remove();
				(m = e.getLast()) && m.type == CKEDITOR.NODE_ELEMENT && m.is("br") && m.remove();
				(m = d.startContainer.getChild(d.startOffset)) ? e.insertBefore(m): d.startContainer.append(e);
				p && (e = k(p)) && (l.contains(p) ? (b(e, p.getParent(), p), e.remove()) : l.append(e));
				for (; f.checkStartOfBlock() && f.checkEndOfBlock();) {
					z = f.startPath();
					e = z.block;
					if (!e) break;
					e.is("li") && (l = e.getParent(), e.equals(l.getLast(h)) && e.equals(l.getFirst(h)) &&
						(e = l));
					f.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START);
					e.remove()
				}
				f = f.clone();
				e = a.editable();
				f.setEndAt(e, CKEDITOR.POSITION_BEFORE_END);
				f = new CKEDITOR.dom.walker(f);
				f.evaluator = function (a) {
					return h(a) && !n(a)
				};
				(f = f.next()) && f.type == CKEDITOR.NODE_ELEMENT && f.getName() in CKEDITOR.dtd.$list && c(f);
				d.moveToBookmark(g);
				d.select();
				a.fire("saveSnapshot")
			}

			function k(a) {
				return (a = a.getLast(h)) && a.type == CKEDITOR.NODE_ELEMENT && a.getName() in f ? a : null
			}
			var f = {
					ol: 1,
					ul: 1
				},
				d = CKEDITOR.dom.walker.whitespaces(),
				m = CKEDITOR.dom.walker.bookmark(),
				h = function (a) {
					return !(d(a) || m(a))
				},
				n = CKEDITOR.dom.walker.bogus();
			CKEDITOR.plugins.list = {
				listToArray: function (a, b, c, d, e) {
					if (!f[a.getName()]) return [];
					d || (d = 0);
					c || (c = []);
					for (var h = 0, g = a.getChildCount(); h < g; h++) {
						var k = a.getChild(h);
						k.type == CKEDITOR.NODE_ELEMENT && k.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(k, b, c, d + 1);
						if ("li" == k.$.nodeName.toLowerCase()) {
							var l = {
								parent: a,
								indent: d,
								element: k,
								contents: []
							};
							e ? l.grandparent = e : (l.grandparent = a.getParent(), l.grandparent && "li" == l.grandparent.$.nodeName.toLowerCase() &&
								(l.grandparent = l.grandparent.getParent()));
							b && CKEDITOR.dom.element.setMarker(b, k, "listarray_index", c.length);
							c.push(l);
							for (var m = 0, n = k.getChildCount(), p; m < n; m++) p = k.getChild(m), p.type == CKEDITOR.NODE_ELEMENT && f[p.getName()] ? CKEDITOR.plugins.list.listToArray(p, b, c, d + 1, l.grandparent) : l.contents.push(p)
						}
					}
					return c
				},
				arrayToList: function (a, b, c, d, e) {
					c || (c = 0);
					if (!a || a.length < c + 1) return null;
					for (var g, k = a[c].parent.getDocument(), l = new CKEDITOR.dom.documentFragment(k), n = null, x = c, p = Math.max(a[c].indent, 0), q =
							null, E, D, I = d == CKEDITOR.ENTER_P ? "p" : "div";;) {
						var H = a[x];
						g = H.grandparent;
						E = H.element.getDirection(1);
						if (H.indent == p) {
							n && a[x].parent.getName() == n.getName() || (n = a[x].parent.clone(!1, 1), e && n.setAttribute("dir", e), l.append(n));
							q = n.append(H.element.clone(0, 1));
							E != n.getDirection(1) && q.setAttribute("dir", E);
							for (g = 0; g < H.contents.length; g++) q.append(H.contents[g].clone(1, 1));
							x++
						} else if (H.indent == Math.max(p, 0) + 1) H = a[x - 1].element.getDirection(1), x = CKEDITOR.plugins.list.arrayToList(a, null, x, d, H != E ? E : null), !q.getChildCount() &&
							CKEDITOR.env.needsNbspFiller && 7 >= k.$.documentMode && q.append(k.createText(" ")), q.append(x.listNode), x = x.nextIndex;
						else if (-1 == H.indent && !c && g) {
							f[g.getName()] ? (q = H.element.clone(!1, !0), E != g.getDirection(1) && q.setAttribute("dir", E)) : q = new CKEDITOR.dom.documentFragment(k);
							var n = g.getDirection(1) != E,
								J = H.element,
								L = J.getAttribute("class"),
								F = J.getAttribute("style"),
								S = q.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (d != CKEDITOR.ENTER_BR || n || F || L),
								N, R = H.contents.length,
								K;
							for (g = 0; g < R; g++)
								if (N = H.contents[g], m(N) &&
									1 < R) S ? K = N.clone(1, 1) : q.append(N.clone(1, 1));
								else if (N.type == CKEDITOR.NODE_ELEMENT && N.isBlockBoundary()) {
								n && !N.getDirection() && N.setAttribute("dir", E);
								D = N;
								var V = J.getAttribute("style");
								V && D.setAttribute("style", V.replace(/([^;])$/, "$1;") + (D.getAttribute("style") || ""));
								L && N.addClass(L);
								D = null;
								K && (q.append(K), K = null);
								q.append(N.clone(1, 1))
							} else S ? (D || (D = k.createElement(I), q.append(D), n && D.setAttribute("dir", E)), F && D.setAttribute("style", F), L && D.setAttribute("class", L), K && (D.append(K), K = null), D.append(N.clone(1,
								1))) : q.append(N.clone(1, 1));
							K && ((D || q).append(K), K = null);
							q.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && x != a.length - 1 && (CKEDITOR.env.needsBrFiller && (E = q.getLast()) && E.type == CKEDITOR.NODE_ELEMENT && E.is("br") && E.remove(), (E = q.getLast(h)) && E.type == CKEDITOR.NODE_ELEMENT && E.is(CKEDITOR.dtd.$block) || q.append(k.createElement("br")));
							E = q.$.nodeName.toLowerCase();
							"div" != E && "p" != E || q.appendBogus();
							l.append(q);
							n = null;
							x++
						} else return null;
						D = null;
						if (a.length <= x || Math.max(a[x].indent, 0) < p) break
					}
					if (b)
						for (a = l.getFirst(); a;) {
							if (a.type ==
								CKEDITOR.NODE_ELEMENT && (CKEDITOR.dom.element.clearMarkers(b, a), a.getName() in CKEDITOR.dtd.$listItem && (c = a, k = e = d = void 0, d = c.getDirection()))) {
								for (e = c.getParent(); e && !(k = e.getDirection());) e = e.getParent();
								d == k && c.removeAttribute("dir")
							}
							a = a.getNextSourceNode()
						}
					return {
						listNode: l,
						nextIndex: x
					}
				}
			};
			var p = /^h[1-6]$/,
				q = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);
			e.prototype = {
				exec: function (b) {
					this.refresh(b, b.elementPath());
					var d = b.config,
						e = b.getSelection(),
						g = e && e.getRanges();
					if (this.state == CKEDITOR.TRISTATE_OFF) {
						var k =
							b.editable();
						if (k.getFirst(h)) {
							var l = 1 == g.length && g[0];
							(d = l && l.getEnclosedNode()) && d.is && this.type == d.getName() && this.setState(CKEDITOR.TRISTATE_ON)
						} else d.enterMode == CKEDITOR.ENTER_BR ? k.appendBogus() : g[0].fixBlock(1, d.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), e.selectRanges(g)
					}
					for (var d = e.createBookmarks(!0), k = [], m = {}, g = g.createIterator(), n = 0;
						(l = g.getNextRange()) && ++n;) {
						var q = l.getBoundaryNodes(),
							x = q.startNode,
							A = q.endNode;
						x.type == CKEDITOR.NODE_ELEMENT && "td" == x.getName() && l.setStartAt(q.startNode, CKEDITOR.POSITION_AFTER_START);
						A.type == CKEDITOR.NODE_ELEMENT && "td" == A.getName() && l.setEndAt(q.endNode, CKEDITOR.POSITION_BEFORE_END);
						l = l.createIterator();
						for (l.forceBrBreak = this.state == CKEDITOR.TRISTATE_OFF; q = l.getNextParagraph();)
							if (!q.getCustomData("list_block")) {
								CKEDITOR.dom.element.setMarker(m, q, "list_block", 1);
								for (var G = b.elementPath(q), x = G.elements, A = 0, G = G.blockLimit, E, D = x.length - 1; 0 <= D && (E = x[D]); D--)
									if (f[E.getName()] && G.contains(E)) {
										G.removeCustomData("list_group_object_" + n);
										(x = E.getCustomData("list_group_object")) ? x.contents.push(q):
											(x = {
												root: E,
												contents: [q]
											}, k.push(x), CKEDITOR.dom.element.setMarker(m, E, "list_group_object", x));
										A = 1;
										break
									}
								A || (A = G, A.getCustomData("list_group_object_" + n) ? A.getCustomData("list_group_object_" + n).contents.push(q) : (x = {
									root: A,
									contents: [q]
								}, CKEDITOR.dom.element.setMarker(m, A, "list_group_object_" + n, x), k.push(x)))
							}
					}
					for (E = []; 0 < k.length;)
						if (x = k.shift(), this.state == CKEDITOR.TRISTATE_OFF)
							if (f[x.root.getName()]) {
								g = b;
								n = x;
								x = m;
								l = E;
								A = CKEDITOR.plugins.list.listToArray(n.root, x);
								G = [];
								for (q = 0; q < n.contents.length; q++) D =
									n.contents[q], (D = D.getAscendant("li", !0)) && !D.getCustomData("list_item_processed") && (G.push(D), CKEDITOR.dom.element.setMarker(x, D, "list_item_processed", !0));
								for (var D = n.root.getDocument(), I = void 0, H = void 0, q = 0; q < G.length; q++) {
									var J = G[q].getCustomData("listarray_index"),
										I = A[J].parent;
									I.is(this.type) || (H = D.createElement(this.type), I.copyAttributes(H, {
										start: 1,
										type: 1
									}), H.removeStyle("list-style-type"), A[J].parent = H)
								}
								x = CKEDITOR.plugins.list.arrayToList(A, x, null, g.config.enterMode);
								A = void 0;
								G = x.listNode.getChildCount();
								for (q = 0; q < G && (A = x.listNode.getChild(q)); q++) A.getName() == this.type && l.push(A);
								x.listNode.replace(n.root);
								g.fire("contentDomInvalidated")
							} else {
								A = b;
								l = x;
								q = E;
								G = l.contents;
								g = l.root.getDocument();
								n = [];
								1 == G.length && G[0].equals(l.root) && (x = g.createElement("div"), G[0].moveChildren && G[0].moveChildren(x), G[0].append(x), G[0] = x);
								l = l.contents[0].getParent();
								for (D = 0; D < G.length; D++) l = l.getCommonAncestor(G[D].getParent());
								I = A.config.useComputedState;
								A = x = void 0;
								I = void 0 === I || I;
								for (D = 0; D < G.length; D++)
									for (H = G[D]; J = H.getParent();) {
										if (J.equals(l)) {
											n.push(H);
											!A && H.getDirection() && (A = 1);
											H = H.getDirection(I);
											null !== x && (x = x && x != H ? null : H);
											break
										}
										H = J
									}
								if (!(1 > n.length)) {
									G = n[n.length - 1].getNext();
									D = g.createElement(this.type);
									q.push(D);
									for (I = q = void 0; n.length;) q = n.shift(), I = g.createElement("li"), H = q, H.is("pre") || p.test(H.getName()) || "false" == H.getAttribute("contenteditable") ? q.appendTo(I) : (q.copyAttributes(I), x && q.getDirection() && (I.removeStyle("direction"), I.removeAttribute("dir")), q.moveChildren(I), q.remove()), I.appendTo(D);
									x && A && D.setAttribute("dir", x);
									G ? D.insertBefore(G) :
										D.appendTo(l)
								}
							}
					else this.state == CKEDITOR.TRISTATE_ON && f[x.root.getName()] && a.call(this, b, x, m);
					for (D = 0; D < E.length; D++) c(E[D]);
					CKEDITOR.dom.element.clearAllMarkers(m);
					e.selectBookmarks(d);
					b.focus()
				},
				refresh: function (a, b) {
					var c = b.contains(f, 1),
						d = b.blockLimit || b.root;
					c && d.contains(c) ? this.setState(c.is(this.type) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF)
				}
			};
			CKEDITOR.plugins.add("list", {
				requires: "indentlist",
				init: function (a) {
					a.blockless || (a.addCommand("numberedlist",
						new e("numberedlist", "ol")), a.addCommand("bulletedlist", new e("bulletedlist", "ul")), a.ui.addButton && (a.ui.addButton("NumberedList", {
						label: a.lang.list.numberedlist,
						command: "numberedlist",
						directional: !0,
						toolbar: "list,10"
					}), a.ui.addButton("BulletedList", {
						label: a.lang.list.bulletedlist,
						command: "bulletedlist",
						directional: !0,
						toolbar: "list,20"
					})), a.on("key", function (b) {
						var c = b.data.domEvent.getKey(),
							d;
						if ("wysiwyg" == a.mode && c in {
								8: 1,
								46: 1
							}) {
							var e = a.getSelection().getRanges()[0],
								m = e && e.startPath();
							if (e && e.collapsed) {
								var p =
									8 == c,
									q = a.editable(),
									C = new CKEDITOR.dom.walker(e.clone());
								C.evaluator = function (a) {
									return h(a) && !n(a)
								};
								C.guard = function (a, b) {
									return !(b && a.type == CKEDITOR.NODE_ELEMENT && a.is("table"))
								};
								c = e.clone();
								if (p) {
									var x;
									(x = m.contains(f)) && e.checkBoundaryOfElement(x, CKEDITOR.START) && (x = x.getParent()) && x.is("li") && (x = k(x)) ? (d = x, x = x.getPrevious(h), c.moveToPosition(x && n(x) ? x : d, CKEDITOR.POSITION_BEFORE_START)) : (C.range.setStartAt(q, CKEDITOR.POSITION_AFTER_START), C.range.setEnd(e.startContainer, e.startOffset), (x = C.previous()) &&
										x.type == CKEDITOR.NODE_ELEMENT && (x.getName() in f || x.is("li")) && (x.is("li") || (C.range.selectNodeContents(x), C.reset(), C.evaluator = g, x = C.previous()), d = x, c.moveToElementEditEnd(d), c.moveToPosition(c.endPath().block, CKEDITOR.POSITION_BEFORE_END)));
									if (d) l(a, c, e), b.cancel();
									else {
										var A = m.contains(f);
										A && e.checkBoundaryOfElement(A, CKEDITOR.START) && (d = A.getFirst(h), e.checkBoundaryOfElement(d, CKEDITOR.START) && (x = A.getPrevious(h), k(d) ? x && (e.moveToElementEditEnd(x), e.select()) : a.execCommand("outdent"), b.cancel()))
									}
								} else if (d =
									m.contains("li")) {
									if (C.range.setEndAt(q, CKEDITOR.POSITION_BEFORE_END), p = (q = d.getLast(h)) && g(q) ? q : d, m = 0, (x = C.next()) && x.type == CKEDITOR.NODE_ELEMENT && x.getName() in f && x.equals(q) ? (m = 1, x = C.next()) : e.checkBoundaryOfElement(p, CKEDITOR.END) && (m = 2), m && x) {
										e = e.clone();
										e.moveToElementEditStart(x);
										if (1 == m && (c.optimize(), !c.startContainer.equals(d))) {
											for (d = c.startContainer; d.is(CKEDITOR.dtd.$inline);) A = d, d = d.getParent();
											A && c.moveToPosition(A, CKEDITOR.POSITION_AFTER_END)
										}
										2 == m && (c.moveToPosition(c.endPath().block,
											CKEDITOR.POSITION_BEFORE_END), e.endPath().block && e.moveToPosition(e.endPath().block, CKEDITOR.POSITION_AFTER_START));
										l(a, c, e);
										b.cancel()
									}
								} else C.range.setEndAt(q, CKEDITOR.POSITION_BEFORE_END), (x = C.next()) && x.type == CKEDITOR.NODE_ELEMENT && x.is(f) && (x = x.getFirst(h), m.block && e.checkStartOfBlock() && e.checkEndOfBlock() ? (m.block.remove(), e.moveToElementEditStart(x), e.select()) : k(x) ? (e.moveToElementEditStart(x), e.select()) : (e = e.clone(), e.moveToElementEditStart(x), l(a, c, e)), b.cancel());
								setTimeout(function () {
									a.selectionChange(1)
								})
							}
						}
					}))
				}
			})
		}(),
		function () {
			CKEDITOR.plugins.liststyle = {
				requires: "dialog,contextmenu",
				init: function (a) {
					if (!a.blockless) {
						var e;
						e = new CKEDITOR.dialogCommand("numberedListStyle", {
							requiredContent: "ol",
							allowedContent: "ol{list-style-type}[start]; li{list-style-type}[value]",
							contentTransformations: [
								["ol: listTypeToStyle"]
							]
						});
						e = a.addCommand("numberedListStyle", e);
						a.addFeature(e);
						CKEDITOR.dialog.add("numberedListStyle", this.path + "dialogs/liststyle.js");
						e = new CKEDITOR.dialogCommand("bulletedListStyle", {
							requiredContent: "ul",
							allowedContent: "ul{list-style-type}",
							contentTransformations: [
								["ul: listTypeToStyle"]
							]
						});
						e = a.addCommand("bulletedListStyle", e);
						a.addFeature(e);
						CKEDITOR.dialog.add("bulletedListStyle", this.path + "dialogs/liststyle.js");
						a.addMenuGroup("list", 108);
						a.addMenuItems({
							numberedlist: {
								label: a.lang.liststyle.numberedTitle,
								group: "list",
								command: "numberedListStyle"
							},
							bulletedlist: {
								label: a.lang.liststyle.bulletedTitle,
								group: "list",
								command: "bulletedListStyle"
							}
						});
						a.contextMenu.addListener(function (a) {
							if (!a || a.isReadOnly()) return null;
							for (; a;) {
								var c = a.getName();
								if ("ol" == c) return {
									numberedlist: CKEDITOR.TRISTATE_OFF
								};
								if ("ul" == c) return {
									bulletedlist: CKEDITOR.TRISTATE_OFF
								};
								a = a.getParent()
							}
							return null
						})
					}
				}
			};
			CKEDITOR.plugins.add("liststyle", CKEDITOR.plugins.liststyle)
		}(), "use strict",
		function () {
			function a(a, b, c) {
				return n(b) && n(c) && c.equals(b.getNext(function (a) {
					return !(aa(a) || ba(a) || p(a))
				}))
			}

			function e(a) {
				this.upper = a[0];
				this.lower = a[1];
				this.set.apply(this, a.slice(2))
			}

			function b(a) {
				var b = a.element;
				if (b && n(b) && (b = b.getAscendant(a.triggers, !0)) && a.editable.contains(b)) {
					var c = k(b);
					if ("true" == c.getAttribute("contenteditable")) return b;
					if (c.is(a.triggers)) return c
				}
				return null
			}

			function c(a, b, c) {
				v(a, b);
				v(a, c);
				a = b.size.bottom;
				c = c.size.top;
				return a && c ? 0 | (a + c) / 2 : a || c
			}

			function g(a, b, c) {
				return b = b[c ? "getPrevious" : "getNext"](function (b) {
					return b && b.type == CKEDITOR.NODE_TEXT && !aa(b) || n(b) && !p(b) && !h(a, b)
				})
			}

			function l(a, b, c) {
				return a > b && a < c
			}

			function k(a, b) {
				if (a.data("cke-editable")) return null;
				for (b || (a = a.getParent()); a && !a.data("cke-editable");) {
					if (a.hasAttribute("contenteditable")) return a;
					a = a.getParent()
				}
				return null
			}

			function f(a) {
				var b = a.doc,
					c = E('\x3cspan contenteditable\x3d"false" data-cke-magic-line\x3d"1" style\x3d"' + U + "position:absolute;border-top:1px dashed " + a.boxColor + '"\x3e\x3c/span\x3e', b),
					f = CKEDITOR.getUrl(this.path + "images/" + (D.hidpi ? "hidpi/" : "") + "icon" + (a.rtl ? "-rtl" : "") + ".png");
				A(c, {
					attach: function () {
						this.wrap.getParent() || this.wrap.appendTo(a.editable, !0);
						return this
					},
					lineChildren: [A(E('\x3cspan title\x3d"' + a.editor.lang.magicline.title + '" contenteditable\x3d"false"\x3e\x26#8629;\x3c/span\x3e',
						b), {
						base: U + "height:17px;width:17px;" + (a.rtl ? "left" : "right") + ":17px;background:url(" + f + ") center no-repeat " + a.boxColor + ";cursor:pointer;" + (D.hc ? "font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;" : "") + (D.hidpi ? "background-size: 9px 10px;" : ""),
						looks: ["top:-8px; border-radius: 2px;", "top:-17px; border-radius: 2px 2px 0px 0px;", "top:-1px; border-radius: 0px 0px 2px 2px;"]
					}), A(E(O, b), {
						base: T + "left:0px;border-left-color:" + a.boxColor + ";",
						looks: ["border-width:8px 0 8px 8px;top:-8px",
							"border-width:8px 0 0 8px;top:-8px", "border-width:0 0 8px 8px;top:0px"
						]
					}), A(E(O, b), {
						base: T + "right:0px;border-right-color:" + a.boxColor + ";",
						looks: ["border-width:8px 8px 8px 0;top:-8px", "border-width:8px 8px 0 0;top:-8px", "border-width:0 8px 8px 0;top:0px"]
					})],
					detach: function () {
						this.wrap.getParent() && this.wrap.remove();
						return this
					},
					mouseNear: function () {
						v(a, this);
						var b = a.holdDistance,
							c = this.size;
						return c && l(a.mouse.y, c.top - b, c.bottom + b) && l(a.mouse.x, c.left - b, c.right + b) ? !0 : !1
					},
					place: function () {
						var b = a.view,
							c = a.editable,
							d = a.trigger,
							f = d.upper,
							e = d.lower,
							h = f || e,
							g = h.getParent(),
							k = {};
						this.trigger = d;
						f && v(a, f, !0);
						e && v(a, e, !0);
						v(a, g, !0);
						a.inInlineMode && z(a, !0);
						g.equals(c) ? (k.left = b.scroll.x, k.right = -b.scroll.x, k.width = "") : (k.left = h.size.left - h.size.margin.left + b.scroll.x - (a.inInlineMode ? b.editable.left + b.editable.border.left : 0), k.width = h.size.outerWidth + h.size.margin.left + h.size.margin.right + b.scroll.x, k.right = "");
						f && e ? k.top = f.size.margin.bottom === e.size.margin.top ? 0 | f.size.bottom + f.size.margin.bottom / 2 : f.size.margin.bottom <
							e.size.margin.top ? f.size.bottom + f.size.margin.bottom : f.size.bottom + f.size.margin.bottom - e.size.margin.top : f ? e || (k.top = f.size.bottom + f.size.margin.bottom) : k.top = e.size.top - e.size.margin.top;
						d.is(R) || l(k.top, b.scroll.y - 15, b.scroll.y + 5) ? (k.top = a.inInlineMode ? 0 : b.scroll.y, this.look(R)) : d.is(K) || l(k.top, b.pane.bottom - 5, b.pane.bottom + 15) ? (k.top = a.inInlineMode ? b.editable.height + b.editable.padding.top + b.editable.padding.bottom : b.pane.bottom - 1, this.look(K)) : (a.inInlineMode && (k.top -= b.editable.top + b.editable.border.top),
							this.look(V));
						a.inInlineMode && (k.top--, k.top += b.editable.scroll.top, k.left += b.editable.scroll.left);
						for (var m in k) k[m] = CKEDITOR.tools.cssLength(k[m]);
						this.setStyles(k)
					},
					look: function (a) {
						if (this.oldLook != a) {
							for (var b = this.lineChildren.length, c; b--;)(c = this.lineChildren[b]).setAttribute("style", c.base + c.looks[0 | a / 2]);
							this.oldLook = a
						}
					},
					wrap: new G("span", a.doc)
				});
				for (b = c.lineChildren.length; b--;) c.lineChildren[b].appendTo(c);
				c.look(V);
				c.appendTo(c.wrap);
				c.unselectable();
				c.lineChildren[0].on("mouseup",
					function (b) {
						c.detach();
						d(a, function (b) {
							var c = a.line.trigger;
							b[c.is(L) ? "insertBefore" : "insertAfter"](c.is(L) ? c.lower : c.upper)
						}, !0);
						a.editor.focus();
						D.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView();
						b.data.preventDefault(!0)
					});
				c.on("mousedown", function (a) {
					a.data.preventDefault(!0)
				});
				a.line = c
			}

			function d(a, b, c) {
				var d = new CKEDITOR.dom.range(a.doc),
					f = a.editor,
					e;
				D.ie && a.enterMode == CKEDITOR.ENTER_BR ? e = a.doc.createText(Z) : (e = (e = k(a.element, !0)) && e.data("cke-enter-mode") || a.enterMode, e = new G(J[e],
					a.doc), e.is("br") || a.doc.createText(Z).appendTo(e));
				c && f.fire("saveSnapshot");
				b(e);
				d.moveToPosition(e, CKEDITOR.POSITION_AFTER_START);
				f.getSelection().selectRanges([d]);
				a.hotNode = e;
				c && f.fire("saveSnapshot")
			}

			function m(a, c) {
				return {
					canUndo: !0,
					modes: {
						wysiwyg: 1
					},
					exec: function () {
						function f(b) {
							var e = D.ie && 9 > D.version ? " " : Z,
								h = a.hotNode && a.hotNode.getText() == e && a.element.equals(a.hotNode) && a.lastCmdDirection === !!c;
							d(a, function (d) {
								h && a.hotNode && a.hotNode.remove();
								d[c ? "insertAfter" : "insertBefore"](b);
								d.setAttributes({
									"data-cke-magicline-hot": 1,
									"data-cke-magicline-dir": !!c
								});
								a.lastCmdDirection = !!c
							});
							D.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView();
							a.line.detach()
						}
						return function (d) {
							d = d.getSelection().getStartElement();
							var e;
							d = d.getAscendant(Q, 1);
							if (!u(a, d) && d && !d.equals(a.editable) && !d.contains(a.editable)) {
								(e = k(d)) && "false" == e.getAttribute("contenteditable") && (d = e);
								a.element = d;
								e = g(a, d, !c);
								var h;
								n(e) && e.is(a.triggers) && e.is(P) && (!g(a, e, !c) || (h = g(a, e, !c)) && n(h) && h.is(a.triggers)) ? f(e) : (h = b(a, d), n(h) && (g(a, h, !c) ? (d = g(a, h, !c)) &&
									n(d) && d.is(a.triggers) && f(h) : f(h)))
							}
						}
					}()
				}
			}

			function h(a, b) {
				if (!b || b.type != CKEDITOR.NODE_ELEMENT || !b.$) return !1;
				var c = a.line;
				return c.wrap.equals(b) || c.wrap.contains(b)
			}

			function n(a) {
				return a && a.type == CKEDITOR.NODE_ELEMENT && a.$
			}

			function p(a) {
				if (!n(a)) return !1;
				var b;
				(b = q(a)) || (n(a) ? (b = {
					left: 1,
					right: 1,
					center: 1
				}, b = !(!b[a.getComputedStyle("float")] && !b[a.getAttribute("align")])) : b = !1);
				return b
			}

			function q(a) {
				return !!{
					absolute: 1,
					fixed: 1
				}[a.getComputedStyle("position")]
			}

			function y(a, b) {
				return n(b) ? b.is(a.triggers) :
					null
			}

			function u(a, b) {
				if (!b) return !1;
				for (var c = b.getParents(1), d = c.length; d--;)
					for (var f = a.tabuList.length; f--;)
						if (c[d].hasAttribute(a.tabuList[f])) return !0;
				return !1
			}

			function r(a, b, c) {
				b = b[c ? "getLast" : "getFirst"](function (b) {
					return a.isRelevant(b) && !b.is(da)
				});
				if (!b) return !1;
				v(a, b);
				return c ? b.size.top > a.mouse.y : b.size.bottom < a.mouse.y
			}

			function w(a) {
				var b = a.editable,
					c = a.mouse,
					d = a.view,
					f = a.triggerOffset;
				z(a);
				var g = c.y > (a.inInlineMode ? d.editable.top + d.editable.height / 2 : Math.min(d.editable.height, d.pane.height) /
						2),
					b = b[g ? "getLast" : "getFirst"](function (a) {
						return !(aa(a) || ba(a))
					});
				if (!b) return null;
				h(a, b) && (b = a.line.wrap[g ? "getPrevious" : "getNext"](function (a) {
					return !(aa(a) || ba(a))
				}));
				if (!n(b) || p(b) || !y(a, b)) return null;
				v(a, b);
				return !g && 0 <= b.size.top && l(c.y, 0, b.size.top + f) ? (a = a.inInlineMode || 0 === d.scroll.y ? R : V, new e([null, b, L, N, a])) : g && b.size.bottom <= d.pane.height && l(c.y, b.size.bottom - f, d.pane.height) ? (a = a.inInlineMode || l(b.size.bottom, d.pane.height - f, d.pane.height) ? K : V, new e([b, null, F, N, a])) : null
			}

			function t(a) {
				var c =
					a.mouse,
					d = a.view,
					f = a.triggerOffset,
					h = b(a);
				if (!h) return null;
				v(a, h);
				var f = Math.min(f, 0 | h.size.outerHeight / 2),
					k = [],
					m, x;
				if (l(c.y, h.size.top - 1, h.size.top + f)) x = !1;
				else if (l(c.y, h.size.bottom - f, h.size.bottom + 1)) x = !0;
				else return null;
				if (p(h) || r(a, h, x) || h.getParent().is(X)) return null;
				var O = g(a, h, !x);
				if (O) {
					if (O && O.type == CKEDITOR.NODE_TEXT) return null;
					if (n(O)) {
						if (p(O) || !y(a, O) || O.getParent().is(X)) return null;
						k = [O, h][x ? "reverse" : "concat"]().concat([S, N])
					}
				} else h.equals(a.editable[x ? "getLast" : "getFirst"](a.isRelevant)) ?
					(z(a), x && l(c.y, h.size.bottom - f, d.pane.height) && l(h.size.bottom, d.pane.height - f, d.pane.height) ? m = K : l(c.y, 0, h.size.top + f) && (m = R)) : m = V, k = [null, h][x ? "reverse" : "concat"]().concat([x ? F : L, N, m, h.equals(a.editable[x ? "getLast" : "getFirst"](a.isRelevant)) ? x ? K : R : V]);
				return 0 in k ? new e(k) : null
			}

			function B(a, b, c, d) {
				for (var f = b.getDocumentPosition(), e = {}, h = {}, g = {}, k = {}, l = ca.length; l--;) e[ca[l]] = parseInt(b.getComputedStyle.call(b, "border-" + ca[l] + "-width"), 10) || 0, g[ca[l]] = parseInt(b.getComputedStyle.call(b, "padding-" +
					ca[l]), 10) || 0, h[ca[l]] = parseInt(b.getComputedStyle.call(b, "margin-" + ca[l]), 10) || 0;
				c && !d || C(a, d);
				k.top = f.y - (c ? 0 : a.view.scroll.y);
				k.left = f.x - (c ? 0 : a.view.scroll.x);
				k.outerWidth = b.$.offsetWidth;
				k.outerHeight = b.$.offsetHeight;
				k.height = k.outerHeight - (g.top + g.bottom + e.top + e.bottom);
				k.width = k.outerWidth - (g.left + g.right + e.left + e.right);
				k.bottom = k.top + k.outerHeight;
				k.right = k.left + k.outerWidth;
				a.inInlineMode && (k.scroll = {
					top: b.$.scrollTop,
					left: b.$.scrollLeft
				});
				return A({
						border: e,
						padding: g,
						margin: h,
						ignoreScroll: c
					},
					k, !0)
			}

			function v(a, b, c) {
				if (!n(b)) return b.size = null;
				if (!b.size) b.size = {};
				else if (b.size.ignoreScroll == c && b.size.date > new Date - M) return null;
				return A(b.size, B(a, b, c), {
					date: +new Date
				}, !0)
			}

			function z(a, b) {
				a.view.editable = B(a, a.editable, b, !0)
			}

			function C(a, b) {
				a.view || (a.view = {});
				var c = a.view;
				if (!(!b && c && c.date > new Date - M)) {
					var d = a.win,
						c = d.getScrollPosition(),
						d = d.getViewPaneSize();
					A(a.view, {
						scroll: {
							x: c.x,
							y: c.y,
							width: a.doc.$.documentElement.scrollWidth - d.width,
							height: a.doc.$.documentElement.scrollHeight -
								d.height
						},
						pane: {
							width: d.width,
							height: d.height,
							bottom: d.height + c.y
						},
						date: +new Date
					}, !0)
				}
			}

			function x(a, b, c, d) {
				for (var f = d, h = d, g = 0, k = !1, l = !1, m = a.view.pane.height, n = a.mouse; n.y + g < m && 0 < n.y - g;) {
					k || (k = b(f, d));
					l || (l = b(h, d));
					!k && 0 < n.y - g && (f = c(a, {
						x: n.x,
						y: n.y - g
					}));
					!l && n.y + g < m && (h = c(a, {
						x: n.x,
						y: n.y + g
					}));
					if (k && l) break;
					g += 2
				}
				return new e([f, h, null, null])
			}
			CKEDITOR.plugins.add("magicline", {
				init: function (a) {
					var c = a.config,
						k = c.magicline_triggerOffset || 30,
						l = {
							editor: a,
							enterMode: c.enterMode,
							triggerOffset: k,
							holdDistance: 0 |
								k * (c.magicline_holdDistance || .5),
							boxColor: c.magicline_color || "#ff0000",
							rtl: "rtl" == c.contentsLangDirection,
							tabuList: ["data-cke-hidden-sel"].concat(c.magicline_tabuList || []),
							triggers: c.magicline_everywhere ? Q : {
								table: 1,
								hr: 1,
								div: 1,
								ul: 1,
								ol: 1,
								dl: 1,
								form: 1,
								blockquote: 1
							}
						},
						x, O, r;
					l.isRelevant = function (a) {
						return n(a) && !h(l, a) && !p(a)
					};
					a.on("contentDom", function () {
						var k = a.editable(),
							n = a.document,
							p = a.window;
						A(l, {
							editable: k,
							inInlineMode: k.isInline(),
							doc: n,
							win: p,
							hotNode: null
						}, !0);
						l.boundary = l.inInlineMode ? l.editable :
							l.doc.getDocumentElement();
						k.is(H.$inline) || (l.inInlineMode && !q(k) && k.setStyles({
							position: "relative",
							top: null,
							left: null
						}), f.call(this, l), C(l), k.attachListener(a, "beforeUndoImage", function () {
							l.line.detach()
						}), k.attachListener(a, "beforeGetData", function () {
							l.line.wrap.getParent() && (l.line.detach(), a.once("getData", function () {
								l.line.attach()
							}, null, null, 1E3))
						}, null, null, 0), k.attachListener(l.inInlineMode ? n : n.getWindow().getFrame(), "mouseout", function (b) {
							if ("wysiwyg" == a.mode)
								if (l.inInlineMode) {
									var c = b.data.$.clientX;
									b = b.data.$.clientY;
									C(l);
									z(l, !0);
									var d = l.view.editable,
										f = l.view.scroll;
									c > d.left - f.x && c < d.right - f.x && b > d.top - f.y && b < d.bottom - f.y || (clearTimeout(r), r = null, l.line.detach())
								} else clearTimeout(r), r = null, l.line.detach()
						}), k.attachListener(k, "keyup", function () {
							l.hiddenMode = 0
						}), k.attachListener(k, "keydown", function (b) {
							if ("wysiwyg" == a.mode) switch (b.data.getKeystroke()) {
								case 2228240:
								case 16:
									l.hiddenMode = 1, l.line.detach()
							}
						}), k.attachListener(l.inInlineMode ? k : n, "mousemove", function (b) {
							O = !0;
							if ("wysiwyg" == a.mode &&
								!a.readOnly && !r) {
								var c = {
									x: b.data.$.clientX,
									y: b.data.$.clientY
								};
								r = setTimeout(function () {
									l.mouse = c;
									r = l.trigger = null;
									C(l);
									O && !l.hiddenMode && a.focusManager.hasFocus && !l.line.mouseNear() && (l.element = W(l, !0)) && ((l.trigger = w(l) || t(l) || Y(l)) && !u(l, l.trigger.upper || l.trigger.lower) ? l.line.attach().place() : (l.trigger = null, l.line.detach()), O = !1)
								}, 30)
							}
						}), k.attachListener(p, "scroll", function () {
							"wysiwyg" == a.mode && (l.line.detach(), D.webkit && (l.hiddenMode = 1, clearTimeout(x), x = setTimeout(function () {
								l.mouseDown || (l.hiddenMode =
									0)
							}, 50)))
						}), k.attachListener(I ? n : p, "mousedown", function () {
							"wysiwyg" == a.mode && (l.line.detach(), l.hiddenMode = 1, l.mouseDown = 1)
						}), k.attachListener(I ? n : p, "mouseup", function () {
							l.hiddenMode = 0;
							l.mouseDown = 0
						}), a.addCommand("accessPreviousSpace", m(l)), a.addCommand("accessNextSpace", m(l, !0)), a.setKeystroke([
							[c.magicline_keystrokePrevious, "accessPreviousSpace"],
							[c.magicline_keystrokeNext, "accessNextSpace"]
						]), a.on("loadSnapshot", function () {
							var b, c, d, f;
							for (f in {
									p: 1,
									br: 1,
									div: 1
								})
								for (b = a.document.getElementsByTag(f),
									d = b.count(); d--;)
									if ((c = b.getItem(d)).data("cke-magicline-hot")) {
										l.hotNode = c;
										l.lastCmdDirection = "true" === c.data("cke-magicline-dir") ? !0 : !1;
										return
									}
						}), this.backdoor = {
							accessFocusSpace: d,
							boxTrigger: e,
							isLine: h,
							getAscendantTrigger: b,
							getNonEmptyNeighbour: g,
							getSize: B,
							that: l,
							triggerEdge: t,
							triggerEditable: w,
							triggerExpand: Y
						})
					}, this)
				}
			});
			var A = CKEDITOR.tools.extend,
				G = CKEDITOR.dom.element,
				E = G.createFromHtml,
				D = CKEDITOR.env,
				I = CKEDITOR.env.ie && 9 > CKEDITOR.env.version,
				H = CKEDITOR.dtd,
				J = {},
				L = 128,
				F = 64,
				S = 32,
				N = 16,
				R = 4,
				K = 2,
				V = 1,
				Z = " ",
				X = H.$listItem,
				da = H.$tableContent,
				P = A({}, H.$nonEditable, H.$empty),
				Q = H.$block,
				M = 100,
				U = "width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;",
				T = U + "border-color:transparent;display:block;border-style:solid;",
				O = "\x3cspan\x3e" + Z + "\x3c/span\x3e";
			J[CKEDITOR.ENTER_BR] = "br";
			J[CKEDITOR.ENTER_P] = "p";
			J[CKEDITOR.ENTER_DIV] = "div";
			e.prototype = {
				set: function (a, b, c) {
					this.properties = a + b + (c || V);
					return this
				},
				is: function (a) {
					return (this.properties &
						a) == a
				}
			};
			var W = function () {
					function a(b, c) {
						var d = b.$.elementFromPoint(c.x, c.y);
						return d && d.nodeType ? new CKEDITOR.dom.element(d) : null
					}
					return function (b, c, d) {
						if (!b.mouse) return null;
						var f = b.doc,
							e = b.line.wrap;
						d = d || b.mouse;
						var g = a(f, d);
						c && h(b, g) && (e.hide(), g = a(f, d), e.show());
						return !g || g.type != CKEDITOR.NODE_ELEMENT || !g.$ || D.ie && 9 > D.version && !b.boundary.equals(g) && !b.boundary.contains(g) ? null : g
					}
				}(),
				aa = CKEDITOR.dom.walker.whitespaces(),
				ba = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT),
				Y = function () {
					function b(f) {
						var e =
							f.element,
							h, g, k;
						if (!n(e) || e.contains(f.editable) || e.isReadOnly()) return null;
						k = x(f, function (a, b) {
							return !b.equals(a)
						}, function (a, b) {
							return W(a, !0, b)
						}, e);
						h = k.upper;
						g = k.lower;
						if (a(f, h, g)) return k.set(S, 8);
						if (h && e.contains(h))
							for (; !h.getParent().equals(e);) h = h.getParent();
						else h = e.getFirst(function (a) {
							return d(f, a)
						});
						if (g && e.contains(g))
							for (; !g.getParent().equals(e);) g = g.getParent();
						else g = e.getLast(function (a) {
							return d(f, a)
						});
						if (!h || !g) return null;
						v(f, h);
						v(f, g);
						if (!l(f.mouse.y, h.size.top, g.size.bottom)) return null;
						for (var e = Number.MAX_VALUE, m, O, t, r; g && !g.equals(h) && (O = h.getNext(f.isRelevant));) m = Math.abs(c(f, h, O) - f.mouse.y), m < e && (e = m, t = h, r = O), h = O, v(f, h);
						if (!t || !r || !l(f.mouse.y, t.size.top, r.size.bottom)) return null;
						k.upper = t;
						k.lower = r;
						return k.set(S, 8)
					}

					function d(a, b) {
						return !(b && b.type == CKEDITOR.NODE_TEXT || ba(b) || p(b) || h(a, b) || b.type == CKEDITOR.NODE_ELEMENT && b.$ && b.is("br"))
					}
					return function (c) {
						var d = b(c),
							f;
						if (f = d) {
							f = d.upper;
							var e = d.lower;
							f = !f || !e || p(e) || p(f) || e.equals(f) || f.equals(e) || e.contains(f) || f.contains(e) ?
								!1 : y(c, f) && y(c, e) && a(c, f, e) ? !0 : !1
						}
						return f ? d : null
					}
				}(),
				ca = ["top", "left", "right", "bottom"]
		}(), CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.CTRL + CKEDITOR.SHIFT + 51, CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.CTRL + CKEDITOR.SHIFT + 52,
		function () {
			function a(a) {
				if (!a || a.type != CKEDITOR.NODE_ELEMENT || "form" != a.getName()) return [];
				for (var b = [], c = ["style", "className"], d = 0; d < c.length; d++) {
					var e = a.$.elements.namedItem(c[d]);
					e && (e = new CKEDITOR.dom.element(e), b.push([e, e.nextSibling]), e.remove())
				}
				return b
			}

			function e(a, b) {
				if (a && a.type == CKEDITOR.NODE_ELEMENT && "form" == a.getName() && 0 < b.length)
					for (var c = b.length - 1; 0 <= c; c--) {
						var d = b[c][0],
							e = b[c][1];
						e ? d.insertBefore(e) : d.appendTo(a)
					}
			}

			function b(b, c) {
				var f = a(b),
					d = {},
					g = b.$;
				c || (d["class"] = g.className || "", g.className = "");
				d.inline = g.style.cssText || "";
				c || (g.style.cssText = "position: static; overflow: visible");
				e(f);
				return d
			}

			function c(b, c) {
				var f = a(b),
					d = b.$;
				"class" in c && (d.className = c["class"]);
				"inline" in c && (d.style.cssText = c.inline);
				e(f)
			}

			function g(a) {
				if (!a.editable().isInline()) {
					var b =
						CKEDITOR.instances,
						c;
					for (c in b) {
						var d = b[c];
						"wysiwyg" != d.mode || d.readOnly || (d = d.document.getBody(), d.setAttribute("contentEditable", !1), d.setAttribute("contentEditable", !0))
					}
					a.editable().hasFocus && (a.toolbox.focus(), a.focus())
				}
			}
			CKEDITOR.plugins.add("maximize", {
				init: function (a) {
					function e() {
						var b = m.getViewPaneSize();
						a.resize(b.width, b.height, null, !0)
					}
					if (a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
						var f = a.lang,
							d = CKEDITOR.document,
							m = d.getWindow(),
							h, n, p, q = CKEDITOR.TRISTATE_OFF;
						a.addCommand("maximize", {
							modes: {
								wysiwyg: !CKEDITOR.env.iOS,
								source: !CKEDITOR.env.iOS
							},
							readOnly: 1,
							editorFocus: !1,
							exec: function () {
								var y = a.container.getFirst(function (a) {
										return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner")
									}),
									u = a.ui.space("contents");
								if ("wysiwyg" == a.mode) {
									var r = a.getSelection();
									h = r && r.getRanges();
									n = m.getScrollPosition()
								} else {
									var w = a.editable().$;
									h = !CKEDITOR.env.ie && [w.selectionStart, w.selectionEnd];
									n = [w.scrollLeft, w.scrollTop]
								}
								if (this.state == CKEDITOR.TRISTATE_OFF) {
									m.on("resize", e);
									p = m.getScrollPosition();
									for (r = a.container; r = r.getParent();) r.setCustomData("maximize_saved_styles", b(r)), r.setStyle("z-index", a.config.baseFloatZIndex - 5);
									u.setCustomData("maximize_saved_styles", b(u, !0));
									y.setCustomData("maximize_saved_styles", b(y, !0));
									u = {
										overflow: CKEDITOR.env.webkit ? "" : "hidden",
										width: 0,
										height: 0
									};
									d.getDocumentElement().setStyles(u);
									!CKEDITOR.env.gecko && d.getDocumentElement().setStyle("position", "fixed");
									CKEDITOR.env.gecko && CKEDITOR.env.quirks || d.getBody().setStyles(u);
									CKEDITOR.env.ie ? setTimeout(function () {
										m.$.scrollTo(0,
											0)
									}, 0) : m.$.scrollTo(0, 0);
									y.setStyle("position", CKEDITOR.env.gecko && CKEDITOR.env.quirks ? "fixed" : "absolute");
									y.$.offsetLeft;
									y.setStyles({
										"z-index": a.config.baseFloatZIndex - 5,
										left: "0px",
										top: "0px"
									});
									y.addClass("cke_maximized");
									e();
									u = y.getDocumentPosition();
									y.setStyles({
										left: -1 * u.x + "px",
										top: -1 * u.y + "px"
									});
									CKEDITOR.env.gecko && g(a)
								} else if (this.state == CKEDITOR.TRISTATE_ON) {
									m.removeListener("resize", e);
									for (var r = [u, y], t = 0; t < r.length; t++) c(r[t], r[t].getCustomData("maximize_saved_styles")), r[t].removeCustomData("maximize_saved_styles");
									for (r = a.container; r = r.getParent();) c(r, r.getCustomData("maximize_saved_styles")), r.removeCustomData("maximize_saved_styles");
									CKEDITOR.env.ie ? setTimeout(function () {
										m.$.scrollTo(p.x, p.y)
									}, 0) : m.$.scrollTo(p.x, p.y);
									y.removeClass("cke_maximized");
									CKEDITOR.env.webkit && (y.setStyle("display", "inline"), setTimeout(function () {
										y.setStyle("display", "block")
									}, 0));
									a.fire("resize", {
										outerHeight: a.container.$.offsetHeight,
										contentsHeight: u.$.offsetHeight,
										outerWidth: a.container.$.offsetWidth
									})
								}
								this.toggleState();
								if (r =
									this.uiItems[0]) u = this.state == CKEDITOR.TRISTATE_OFF ? f.maximize.maximize : f.maximize.minimize, r = CKEDITOR.document.getById(r._.id), r.getChild(1).setHtml(u), r.setAttribute("title", u), r.setAttribute("href", 'javascript:void("' + u + '");');
								"wysiwyg" == a.mode ? h ? (CKEDITOR.env.gecko && g(a), a.getSelection().selectRanges(h), (w = a.getSelection().getStartElement()) && w.scrollIntoView(!0)) : m.$.scrollTo(n.x, n.y) : (h && (w.selectionStart = h[0], w.selectionEnd = h[1]), w.scrollLeft = n[0], w.scrollTop = n[1]);
								h = n = null;
								q = this.state;
								a.fire("maximize",
									this.state)
							},
							canUndo: !1
						});
						a.ui.addButton && a.ui.addButton("Maximize", {
							label: f.maximize.maximize,
							command: "maximize",
							toolbar: "tools,10"
						});
						a.on("mode", function () {
							var b = a.getCommand("maximize");
							b.setState(b.state == CKEDITOR.TRISTATE_DISABLED ? CKEDITOR.TRISTATE_DISABLED : q)
						}, null, null, 100)
					}
				}
			})
		}(), CKEDITOR.plugins.add("newpage", {
			init: function (a) {
				a.addCommand("newpage", {
					modes: {
						wysiwyg: 1,
						source: 1
					},
					exec: function (a) {
						var b = this;
						a.setData(a.config.newpage_html || "", function () {
							a.focus();
							setTimeout(function () {
								a.fire("afterCommandExec", {
									name: "newpage",
									command: b
								});
								a.selectionChange()
							}, 200)
						})
					},
					async: !0
				});
				a.ui.addButton && a.ui.addButton("NewPage", {
					label: a.lang.newpage.toolbar,
					command: "newpage",
					toolbar: "document,20"
				})
			}
		}), "use strict",
		function () {
			function a(a) {
				return {
					"aria-label": a,
					"class": "cke_pagebreak",
					contenteditable: "false",
					"data-cke-display-name": "pagebreak",
					"data-cke-pagebreak": 1,
					style: "page-break-after: always",
					title: a
				}
			}
			CKEDITOR.plugins.add("pagebreak", {
				requires: "fakeobjects",
				onLoad: function () {
					var a = ("background:url(" + CKEDITOR.getUrl(this.path +
						"images/pagebreak.gif") + ") no-repeat center center;clear:both;width:100%;border-top:#999 1px dotted;border-bottom:#999 1px dotted;padding:0;height:7px;cursor:default;").replace(/;/g, " !important;");
					CKEDITOR.addCss("div.cke_pagebreak{" + a + "}")
				},
				init: function (a) {
					a.blockless || (a.addCommand("pagebreak", CKEDITOR.plugins.pagebreakCmd), a.ui.addButton && a.ui.addButton("PageBreak", {
						label: a.lang.pagebreak.toolbar,
						command: "pagebreak",
						toolbar: "insert,70"
					}), CKEDITOR.env.webkit && a.on("contentDom", function () {
						a.document.on("click",
							function (b) {
								b = b.data.getTarget();
								b.is("div") && b.hasClass("cke_pagebreak") && a.getSelection().selectElement(b)
							})
					}))
				},
				afterInit: function (e) {
					function b(b) {
						CKEDITOR.tools.extend(b.attributes, a(e.lang.pagebreak.alt), !0);
						b.children.length = 0
					}
					var c = e.dataProcessor,
						g = c && c.dataFilter,
						c = c && c.htmlFilter,
						l = /page-break-after\s*:\s*always/i,
						k = /display\s*:\s*none/i;
					c && c.addRules({
						attributes: {
							"class": function (a, b) {
								var c = a.replace("cke_pagebreak", "");
								if (c != a) {
									var e = CKEDITOR.htmlParser.fragment.fromHtml('\x3cspan style\x3d"display: none;"\x3e\x26nbsp;\x3c/span\x3e').children[0];
									b.children.length = 0;
									b.add(e);
									e = b.attributes;
									delete e["aria-label"];
									delete e.contenteditable;
									delete e.title
								}
								return c
							}
						}
					}, {
						applyToAll: !0,
						priority: 5
					});
					g && g.addRules({
						elements: {
							div: function (a) {
								if (a.attributes["data-cke-pagebreak"]) b(a);
								else if (l.test(a.attributes.style)) {
									var c = a.children[0];
									c && "span" == c.name && k.test(c.attributes.style) && b(a)
								}
							}
						}
					})
				}
			});
			CKEDITOR.plugins.pagebreakCmd = {
				exec: function (e) {
					var b = e.document.createElement("div", {
						attributes: a(e.lang.pagebreak.alt)
					});
					e.insertElement(b)
				},
				context: "div",
				allowedContent: {
					div: {
						styles: "!page-break-after"
					},
					span: {
						match: function (a) {
							return (a = a.parent) && "div" == a.name && a.styles && a.styles["page-break-after"]
						},
						styles: "display"
					}
				},
				requiredContent: "div{page-break-after}"
			}
		}(),
		function () {
			function a(a, b, c) {
				var g = CKEDITOR.cleanWord;
				g ? c() : (a = CKEDITOR.getUrl(a.config.pasteFromWordCleanupFile || b + "filter/default.js"), CKEDITOR.scriptLoader.load(a, c, null, !0));
				return !g
			}
			CKEDITOR.plugins.add("pastefromword", {
				requires: "clipboard",
				init: function (e) {
					function b(a) {
						var b = CKEDITOR.plugins.pastefromword &&
							CKEDITOR.plugins.pastefromword.images,
							c, e = [];
						if (b && a.editor.filter.check("img[src]") && (c = b.extractTagsFromHtml(a.data.dataValue), 0 !== c.length && (b = b.extractFromRtf(a.data.dataTransfer["text/rtf"]), 0 !== b.length && (CKEDITOR.tools.array.forEach(b, function (a) {
								e.push(a.type ? "data:" + a.type + ";base64," + CKEDITOR.tools.convertBytesToBase64(CKEDITOR.tools.convertHexStringToBytes(a.hex)) : null)
							}, this), c.length === e.length))))
							for (b = 0; b < c.length; b++) 0 === c[b].indexOf("file://") && e[b] && (a.data.dataValue = a.data.dataValue.replace(c[b],
								e[b]))
					}
					var c = 0,
						g = this.path,
						l = void 0 === e.config.pasteFromWord_inlineImages ? !0 : e.config.pasteFromWord_inlineImages;
					e.addCommand("pastefromword", {
						canUndo: !1,
						async: !0,
						exec: function (a, b) {
							c = 1;
							a.execCommand("paste", {
								type: "html",
								notification: b && "undefined" !== typeof b.notification ? b.notification : !0
							})
						}
					});
					CKEDITOR.plugins.clipboard.addPasteButton(e, "PasteFromWord", {
						label: e.lang.pastefromword.toolbar,
						command: "pastefromword",
						toolbar: "clipboard,50"
					});
					e.on("paste", function (b) {
						var f = b.data,
							d = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ?
							f.dataTransfer.getData("text/html", !0) : null,
							l = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? f.dataTransfer.getData("text/rtf") : null,
							d = d || f.dataValue,
							h = {
								dataValue: d,
								dataTransfer: {
									"text/rtf": l
								}
							},
							l = /(class=\"?Mso|style=(?:\"|\')[^\"]*?\bmso\-|w:WordDocument|<o:\w+>|<\/font>)/,
							l = /<meta\s*name=(?:\"|\')?generator(?:\"|\')?\s*content=(?:\"|\')?microsoft/gi.test(d) || l.test(d);
						if (d && (c || l) && (!1 !== e.fire("pasteFromWord", h) || c)) {
							f.dontFilter = !0;
							var n = a(e, g, function () {
								if (n) e.fire("paste", f);
								else if (!e.config.pasteFromWordPromptCleanup ||
									c || confirm(e.lang.pastefromword.confirmCleanup)) h.dataValue = CKEDITOR.cleanWord(h.dataValue, e), e.fire("afterPasteFromWord", h), f.dataValue = h.dataValue, !0 === e.config.forcePasteAsPlainText ? f.type = "text" : CKEDITOR.plugins.clipboard.isCustomCopyCutSupported || "allow-word" !== e.config.forcePasteAsPlainText || (f.type = "html");
								c = 0
							});
							n && b.cancel()
						}
					}, null, null, 3);
					if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported && l) e.on("afterPasteFromWord", b)
				}
			})
		}(),
		function () {
			var a = {
				canUndo: !1,
				async: !0,
				exec: function (a, b) {
					var c =
						a.lang,
						g = CKEDITOR.tools.keystrokeToString(c.common.keyboard, a.getCommandKeystroke(CKEDITOR.env.ie ? a.commands.paste : this)),
						l = b && "undefined" !== typeof b.notification ? b.notification : !b || !b.from || "keystrokeHandler" === b.from && CKEDITOR.env.ie,
						c = l && "string" === typeof l ? l : c.pastetext.pasteNotification.replace(/%1/, '\x3ckbd aria-label\x3d"' + g.aria + '"\x3e' + g.display + "\x3c/kbd\x3e");
					a.execCommand("paste", {
						type: "text",
						notification: l ? c : !1
					})
				}
			};
			CKEDITOR.plugins.add("pastetext", {
				requires: "clipboard",
				init: function (e) {
					var b =
						CKEDITOR.env.safari ? CKEDITOR.CTRL + CKEDITOR.ALT + CKEDITOR.SHIFT + 86 : CKEDITOR.CTRL + CKEDITOR.SHIFT + 86;
					e.addCommand("pastetext", a);
					e.setKeystroke(b, "pastetext");
					CKEDITOR.plugins.clipboard.addPasteButton(e, "PasteText", {
						label: e.lang.pastetext.button,
						command: "pastetext",
						toolbar: "clipboard,40"
					});
					if (e.config.forcePasteAsPlainText) e.on("beforePaste", function (a) {
						"html" != a.data.type && (a.data.type = "text")
					});
					e.on("pasteState", function (a) {
						e.getCommand("pastetext").setState(a.data)
					})
				}
			})
		}(),
		function () {
			var a, e = {
				modes: {
					wysiwyg: 1,
					source: 1
				},
				canUndo: !1,
				readOnly: 1,
				exec: function (b) {
					var c, e = b.config,
						l = e.baseHref ? '\x3cbase href\x3d"' + e.baseHref + '"/\x3e' : "";
					if (e.fullPage) c = b.getData().replace(/<head>/, "$\x26" + l).replace(/[^>]*(?=<\/title>)/, "$\x26 \x26mdash; " + b.lang.preview.preview);
					else {
						var e = "\x3cbody ",
							k = b.document && b.document.getBody();
						k && (k.getAttribute("id") && (e += 'id\x3d"' + k.getAttribute("id") + '" '), k.getAttribute("class") && (e += 'class\x3d"' + k.getAttribute("class") + '" '));
						e += "\x3e";
						c = b.config.docType + '\x3chtml dir\x3d"' + b.config.contentsLangDirection +
							'"\x3e\x3chead\x3e' + l + "\x3ctitle\x3e" + b.lang.preview.preview + "\x3c/title\x3e" + CKEDITOR.tools.buildStyleHtml(b.config.contentsCss) + "\x3c/head\x3e" + e + b.getData() + "\x3c/body\x3e\x3c/html\x3e"
					}
					l = 640;
					e = 420;
					k = 80;
					try {
						var f = window.screen,
							l = Math.round(.8 * f.width),
							e = Math.round(.7 * f.height),
							k = Math.round(.1 * f.width)
					} catch (d) {}
					if (!1 === b.fire("contentPreview", b = {
							dataValue: c
						})) return !1;
					var f = "",
						m;
					CKEDITOR.env.ie && (window._cke_htmlToLoad = b.dataValue, m = "javascript:void( (function(){document.open();" + ("(" + CKEDITOR.tools.fixDomain +
						")();").replace(/\/\/.*?\n/g, "").replace(/parent\./g, "window.opener.") + "document.write( window.opener._cke_htmlToLoad );document.close();window.opener._cke_htmlToLoad \x3d null;})() )", f = "");
					CKEDITOR.env.gecko && (window._cke_htmlToLoad = b.dataValue, f = CKEDITOR.getUrl(a + "preview.html"));
					f = window.open(f, null, "toolbar\x3dyes,location\x3dno,status\x3dyes,menubar\x3dyes,scrollbars\x3dyes,resizable\x3dyes,width\x3d" + l + ",height\x3d" + e + ",left\x3d" + k);
					CKEDITOR.env.ie && f && (f.location = m);
					CKEDITOR.env.ie || CKEDITOR.env.gecko ||
						(m = f.document, m.open(), m.write(b.dataValue), m.close());
					return !0
				}
			};
			CKEDITOR.plugins.add("preview", {
				init: function (b) {
					b.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && (a = this.path, b.addCommand("preview", e), b.ui.addButton && b.ui.addButton("Preview", {
						label: b.lang.preview.preview,
						command: "preview",
						toolbar: "document,40"
					}))
				}
			})
		}(), CKEDITOR.plugins.add("print", {
			init: function (a) {
				a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && (a.addCommand("print", CKEDITOR.plugins.print), a.ui.addButton && a.ui.addButton("Print", {
					label: a.lang.print.toolbar,
					command: "print",
					toolbar: "document,50"
				}))
			}
		}), CKEDITOR.plugins.print = {
			exec: function (a) {
				CKEDITOR.env.gecko ? a.window.$.print() : a.document.$.execCommand("Print")
			},
			canUndo: !1,
			readOnly: 1,
			modes: {
				wysiwyg: 1
			}
		}, CKEDITOR.plugins.add("removeformat", {
			init: function (a) {
				a.addCommand("removeFormat", CKEDITOR.plugins.removeformat.commands.removeformat);
				a.ui.addButton && a.ui.addButton("RemoveFormat", {
					label: a.lang.removeformat.toolbar,
					command: "removeFormat",
					toolbar: "cleanup,10"
				})
			}
		}), CKEDITOR.plugins.removeformat = {
			commands: {
				removeformat: {
					exec: function (a) {
						for (var e =
								a._.removeFormatRegex || (a._.removeFormatRegex = new RegExp("^(?:" + a.config.removeFormatTags.replace(/,/g, "|") + ")$", "i")), b = a._.removeAttributes || (a._.removeAttributes = a.config.removeFormatAttributes.split(",")), c = CKEDITOR.plugins.removeformat.filter, g = a.getSelection().getRanges(), l = g.createIterator(), k = function (a) {
									return a.type == CKEDITOR.NODE_ELEMENT
								}, f; f = l.getNextRange();) {
							f.collapsed || f.enlarge(CKEDITOR.ENLARGE_ELEMENT);
							var d = f.createBookmark(),
								m = d.startNode,
								h = d.endNode,
								n = function (b) {
									for (var d = a.elementPath(b),
											f = d.elements, h = 1, g;
										(g = f[h]) && !g.equals(d.block) && !g.equals(d.blockLimit); h++) e.test(g.getName()) && c(a, g) && b.breakParent(g)
								};
							n(m);
							if (h)
								for (n(h), m = m.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT); m && !m.equals(h);)
									if (m.isReadOnly()) {
										if (m.getPosition(h) & CKEDITOR.POSITION_CONTAINS) break;
										m = m.getNext(k)
									} else n = m.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT), "img" == m.getName() && m.data("cke-realelement") || !c(a, m) || (e.test(m.getName()) ? m.remove(1) : (m.removeAttributes(b), a.fire("removeFormatCleanup", m))), m = n;
							f.moveToBookmark(d)
						}
						a.forceNextSelectionCheck();
						a.getSelection().selectRanges(g)
					}
				}
			},
			filter: function (a, e) {
				for (var b = a._.removeFormatFilters || [], c = 0; c < b.length; c++)
					if (!1 === b[c](e)) return !1;
				return !0
			}
		}, CKEDITOR.editor.prototype.addRemoveFormatFilter = function (a) {
			this._.removeFormatFilters || (this._.removeFormatFilters = []);
			this._.removeFormatFilters.push(a)
		}, CKEDITOR.config.removeFormatTags = "b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var", CKEDITOR.config.removeFormatAttributes = "class,style,lang,width,height,align,hspace,valign",
		CKEDITOR.plugins.add("resize", {
			init: function (a) {
				function e(b) {
					var e = d.width,
						g = d.height,
						k = e + (b.data.$.screenX - f.x) * ("rtl" == l ? -1 : 1);
					b = g + (b.data.$.screenY - f.y);
					m && (e = Math.max(c.resize_minWidth, Math.min(k, c.resize_maxWidth)));
					h && (g = Math.max(c.resize_minHeight, Math.min(b, c.resize_maxHeight)));
					a.resize(m ? e : null, g)
				}

				function b() {
					CKEDITOR.document.removeListener("mousemove", e);
					CKEDITOR.document.removeListener("mouseup", b);
					a.document && (a.document.removeListener("mousemove", e), a.document.removeListener("mouseup",
						b))
				}
				var c = a.config,
					g = a.ui.spaceId("resizer"),
					l = a.element ? a.element.getDirection(1) : "ltr";
				!c.resize_dir && (c.resize_dir = "vertical");
				void 0 === c.resize_maxWidth && (c.resize_maxWidth = 3E3);
				void 0 === c.resize_maxHeight && (c.resize_maxHeight = 3E3);
				void 0 === c.resize_minWidth && (c.resize_minWidth = 750);
				void 0 === c.resize_minHeight && (c.resize_minHeight = 250);
				if (!1 !== c.resize_enabled) {
					var k = null,
						f, d, m = ("both" == c.resize_dir || "horizontal" == c.resize_dir) && c.resize_minWidth != c.resize_maxWidth,
						h = ("both" == c.resize_dir || "vertical" ==
							c.resize_dir) && c.resize_minHeight != c.resize_maxHeight,
						n = CKEDITOR.tools.addFunction(function (h) {
							k || (k = a.getResizable());
							d = {
								width: k.$.offsetWidth || 0,
								height: k.$.offsetHeight || 0
							};
							f = {
								x: h.screenX,
								y: h.screenY
							};
							c.resize_minWidth > d.width && (c.resize_minWidth = d.width);
							c.resize_minHeight > d.height && (c.resize_minHeight = d.height);
							CKEDITOR.document.on("mousemove", e);
							CKEDITOR.document.on("mouseup", b);
							a.document && (a.document.on("mousemove", e), a.document.on("mouseup", b));
							h.preventDefault && h.preventDefault()
						});
					a.on("destroy",
						function () {
							CKEDITOR.tools.removeFunction(n)
						});
					a.on("uiSpace", function (b) {
						if ("bottom" == b.data.space) {
							var c = "";
							m && !h && (c = " cke_resizer_horizontal");
							!m && h && (c = " cke_resizer_vertical");
							var d = '\x3cspan id\x3d"' + g + '" class\x3d"cke_resizer' + c + " cke_resizer_" + l + '" title\x3d"' + CKEDITOR.tools.htmlEncode(a.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + n + ', event)"\x3e' + ("ltr" == l ? "◢" : "◣") + "\x3c/span\x3e";
							"ltr" == l && "ltr" == c ? b.data.html += d : b.data.html = d + b.data.html
						}
					}, a, null, 100);
					a.on("maximize",
						function (b) {
							a.ui.space("resizer")[b.data == CKEDITOR.TRISTATE_ON ? "hide" : "show"]()
						})
				}
			}
		}),
		function () {
			var a = {
				readOnly: 1,
				modes: {
					wysiwyg: 1,
					source: 1
				},
				exec: function (a) {
					if (a.fire("save") && (a = a.element.$.form)) try {
						a.submit()
					} catch (b) {
						a.submit.click && a.submit.click()
					}
				}
			};
			CKEDITOR.plugins.add("save", {
				init: function (e) {
					e.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (e.addCommand("save", a).startDisabled = !e.element.$.form, e.ui.addButton && e.ui.addButton("Save", {
						label: e.lang.save.toolbar,
						command: "save",
						toolbar: "document,10"
					}))
				}
			})
		}(),
		"use strict", CKEDITOR.plugins.add("scayt", {
			requires: "menubutton,dialog",
			tabToOpen: null,
			dialogName: "scaytDialog",
			onLoad: function (a) {
				CKEDITOR.plugins.scayt.onLoadTimestamp = (new Date).getTime();
				"moono-lisa" == (CKEDITOR.skinName || a.config.skin) && CKEDITOR.document.appendStyleSheet(this.path + "skins/" + CKEDITOR.skin.name + "/scayt.css");
				CKEDITOR.document.appendStyleSheet(this.path + "dialogs/dialog.css")
			},
			init: function (a) {
				var e = this,
					b = CKEDITOR.plugins.scayt;
				this.bindEvents(a);
				this.parseConfig(a);
				this.addRule(a);
				CKEDITOR.dialog.add(this.dialogName, CKEDITOR.getUrl(this.path + "dialogs/options.js"));
				this.addMenuItems(a);
				var c = a.lang.scayt,
					g = CKEDITOR.env;
				a.ui.add("Scayt", CKEDITOR.UI_MENUBUTTON, {
					label: c.text_title,
					title: a.plugins.wsc ? a.lang.wsc.title : c.text_title,
					modes: {
						wysiwyg: !(g.ie && (8 > g.version || g.quirks))
					},
					toolbar: "spellchecker,20",
					refresh: function () {
						var c = a.ui.instances.Scayt.getState();
						a.scayt && (c = b.state.scayt[a.name] ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF);
						a.fire("scaytButtonState", c)
					},
					onRender: function () {
						var b =
							this;
						a.on("scaytButtonState", function (a) {
							void 0 !== typeof a.data && b.setState(a.data)
						})
					},
					onMenu: function () {
						var c = a.scayt;
						a.getMenuItem("scaytToggle").label = a.lang.scayt[c && b.state.scayt[a.name] ? "btn_disable" : "btn_enable"];
						var e = {
							scaytToggle: CKEDITOR.TRISTATE_OFF,
							scaytOptions: c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
							scaytLangs: c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
							scaytDict: c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
							scaytAbout: c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
							WSC: a.plugins.wsc ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
						};
						a.config.scayt_uiTabs[0] || delete e.scaytOptions;
						a.config.scayt_uiTabs[1] || delete e.scaytLangs;
						a.config.scayt_uiTabs[2] || delete e.scaytDict;
						c && !CKEDITOR.plugins.scayt.isNewUdSupported(c) && (delete e.scaytDict, a.config.scayt_uiTabs[2] = 0, CKEDITOR.plugins.scayt.alarmCompatibilityMessage());
						return e
					}
				});
				a.contextMenu && a.addMenuItems && (a.contextMenu.addListener(function (b, c) {
					var f = a.scayt,
						d, g;
					f && (g = f.getSelectionNode()) && (d = e.menuGenerator(a,
						g), f.showBanner("." + a.contextMenu._.definition.panel.className.split(" ").join(" .")));
					return d
				}), a.contextMenu._.onHide = CKEDITOR.tools.override(a.contextMenu._.onHide, function (b) {
					return function () {
						var c = a.scayt;
						c && c.hideBanner();
						return b.apply(this)
					}
				}))
			},
			addMenuItems: function (a) {
				var e = this,
					b = CKEDITOR.plugins.scayt;
				a.addMenuGroup("scaytButton");
				for (var c = a.config.scayt_contextMenuItemsOrder.split("|"), g = 0; g < c.length; g++) c[g] = "scayt_" + c[g];
				if ((c = ["grayt_description", "grayt_suggest", "grayt_control"].concat(c)) &&
					c.length)
					for (g = 0; g < c.length; g++) a.addMenuGroup(c[g], g - 10);
				a.addCommand("scaytToggle", {
					exec: function (a) {
						var c = a.scayt;
						b.state.scayt[a.name] = !b.state.scayt[a.name];
						!0 === b.state.scayt[a.name] ? c || b.createScayt(a) : c && b.destroy(a)
					}
				});
				a.addCommand("scaytAbout", {
					exec: function (a) {
						a.scayt.tabToOpen = "about";
						b.openDialog(e.dialogName, a)
					}
				});
				a.addCommand("scaytOptions", {
					exec: function (a) {
						a.scayt.tabToOpen = "options";
						b.openDialog(e.dialogName, a)
					}
				});
				a.addCommand("scaytLangs", {
					exec: function (a) {
						a.scayt.tabToOpen = "langs";
						b.openDialog(e.dialogName, a)
					}
				});
				a.addCommand("scaytDict", {
					exec: function (a) {
						a.scayt.tabToOpen = "dictionaries";
						b.openDialog(e.dialogName, a)
					}
				});
				c = {
					scaytToggle: {
						label: a.lang.scayt.btn_enable,
						group: "scaytButton",
						command: "scaytToggle"
					},
					scaytAbout: {
						label: a.lang.scayt.btn_about,
						group: "scaytButton",
						command: "scaytAbout"
					},
					scaytOptions: {
						label: a.lang.scayt.btn_options,
						group: "scaytButton",
						command: "scaytOptions"
					},
					scaytLangs: {
						label: a.lang.scayt.btn_langs,
						group: "scaytButton",
						command: "scaytLangs"
					},
					scaytDict: {
						label: a.lang.scayt.btn_dictionaries,
						group: "scaytButton",
						command: "scaytDict"
					}
				};
				a.plugins.wsc && (c.WSC = {
					label: a.lang.wsc.toolbar,
					group: "scaytButton",
					onClick: function () {
						var b = CKEDITOR.plugins.scayt,
							c = a.scayt,
							f = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.container.getText() : a.document.getBody().getText();
						(f = f.replace(/\s/g, "")) ? (c && b.state.scayt[a.name] && c.setMarkupPaused && c.setMarkupPaused(!0), a.lockSelection(), a.execCommand("checkspell")) : alert("Nothing to check!")
					}
				});
				a.addMenuItems(c)
			},
			bindEvents: function (a) {
				var e = CKEDITOR.plugins.scayt,
					b = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE,
					c = function () {
						e.destroy(a)
					},
					g = function () {
						!e.state.scayt[a.name] || a.readOnly || a.scayt || e.createScayt(a)
					},
					l = function () {
						var c = a.editable();
						c.attachListener(c, "focus", function (c) {
							CKEDITOR.plugins.scayt && !a.scayt && setTimeout(g, 0);
							c = CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[a.name] && a.scayt;
							var f, e;
							if ((b || c) && a._.savedSelection) {
								c = a._.savedSelection.getSelectedElement();
								c = !c && a._.savedSelection.getRanges();
								for (var k = 0; k < c.length; k++) e = c[k], "string" ===
									typeof e.startContainer.$.nodeValue && (f = e.startContainer.getText().length, (f < e.startOffset || f < e.endOffset) && a.unlockSelection(!1))
							}
						}, this, null, -10)
					},
					k = function () {
						b ? a.config.scayt_inlineModeImmediateMarkup ? g() : (a.on("blur", function () {
							setTimeout(c, 0)
						}), a.on("focus", g), a.focusManager.hasFocus && g()) : g();
						l();
						var f = a.editable();
						f.attachListener(f, "mousedown", function (b) {
							b = b.data.getTarget();
							var c = a.widgets && a.widgets.getByElement(b);
							c && (c.wrapper = b.getAscendant(function (a) {
								return a.hasAttribute("data-cke-widget-wrapper")
							}, !0))
						}, this, null, -10)
					};
				a.on("contentDom", k);
				a.on("beforeCommandExec", function (b) {
					var c = a.scayt,
						g = !1,
						h = !1,
						k = !0;
					b.data.name in e.options.disablingCommandExec && "wysiwyg" == a.mode ? c && (e.destroy(a), a.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED)) : "bold" !== b.data.name && "italic" !== b.data.name && "underline" !== b.data.name && "strike" !== b.data.name && "subscript" !== b.data.name && "superscript" !== b.data.name && "enter" !== b.data.name && "cut" !== b.data.name && "language" !== b.data.name || !c || ("cut" === b.data.name && (k = !1,
						h = !0), "language" === b.data.name && (h = g = !0), a.fire("reloadMarkupScayt", {
						removeOptions: {
							removeInside: k,
							forceBookmark: h,
							language: g
						},
						timeout: 0
					}))
				});
				a.on("beforeSetMode", function (b) {
					if ("source" == b.data) {
						if (b = a.scayt) e.destroy(a), a.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED);
						a.document && a.document.getBody().removeAttribute("_jquid")
					}
				});
				a.on("afterCommandExec", function (b) {
					"wysiwyg" != a.mode || "undo" != b.data.name && "redo" != b.data.name || setTimeout(function () {
						e.reloadMarkup(a.scayt)
					}, 250)
				});
				a.on("readOnly",
					function (b) {
						var c;
						b && (c = a.scayt, !0 === b.editor.readOnly ? c && c.fire("removeMarkupInDocument", {}) : c ? e.reloadMarkup(c) : "wysiwyg" == b.editor.mode && !0 === e.state.scayt[b.editor.name] && (e.createScayt(a), b.editor.fire("scaytButtonState", CKEDITOR.TRISTATE_ON)))
					});
				a.on("beforeDestroy", c);
				a.on("setData", function () {
					c();
					(a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE || a.plugins.divarea) && k()
				}, this, null, 50);
				a.on("reloadMarkupScayt", function (b) {
					var c = b.data && b.data.removeOptions,
						g = b.data && b.data.timeout,
						h = b.data && b.data.language,
						k = a.scayt;
					k && setTimeout(function () {
						h && (c.selectionNode = a.plugins.language.getCurrentLangElement(a), c.selectionNode = c.selectionNode && c.selectionNode.$ || null);
						k.removeMarkupInSelectionNode(c);
						e.reloadMarkup(k)
					}, g || 0)
				});
				a.on("insertElement", function () {
					a.fire("reloadMarkupScayt", {
						removeOptions: {
							forceBookmark: !0
						}
					})
				}, this, null, 50);
				a.on("insertHtml", function () {
					a.scayt && a.scayt.setFocused && a.scayt.setFocused(!0);
					a.fire("reloadMarkupScayt")
				}, this, null, 50);
				a.on("insertText", function () {
					a.scayt && a.scayt.setFocused &&
						a.scayt.setFocused(!0);
					a.fire("reloadMarkupScayt")
				}, this, null, 50);
				a.on("scaytDialogShown", function (b) {
					b.data.selectPage(a.scayt.tabToOpen)
				})
			},
			parseConfig: function (a) {
				var e = CKEDITOR.plugins.scayt;
				e.replaceOldOptionsNames(a.config);
				"boolean" !== typeof a.config.scayt_autoStartup && (a.config.scayt_autoStartup = !1);
				e.state.scayt[a.name] = a.config.scayt_autoStartup;
				"boolean" !== typeof a.config.grayt_autoStartup && (a.config.grayt_autoStartup = !1);
				"boolean" !== typeof a.config.scayt_inlineModeImmediateMarkup && (a.config.scayt_inlineModeImmediateMarkup = !1);
				e.state.grayt[a.name] = a.config.grayt_autoStartup;
				a.config.scayt_contextCommands || (a.config.scayt_contextCommands = "ignoreall|add");
				a.config.scayt_contextMenuItemsOrder || (a.config.scayt_contextMenuItemsOrder = "suggest|moresuggest|control");
				a.config.scayt_sLang || (a.config.scayt_sLang = "en_US");
				if (void 0 === a.config.scayt_maxSuggestions || "number" != typeof a.config.scayt_maxSuggestions || 0 > a.config.scayt_maxSuggestions) a.config.scayt_maxSuggestions = 3;
				if (void 0 === a.config.scayt_minWordLength || "number" !=
					typeof a.config.scayt_minWordLength || 1 > a.config.scayt_minWordLength) a.config.scayt_minWordLength = 3;
				if (void 0 === a.config.scayt_customDictionaryIds || "string" !== typeof a.config.scayt_customDictionaryIds) a.config.scayt_customDictionaryIds = "";
				if (void 0 === a.config.scayt_userDictionaryName || "string" !== typeof a.config.scayt_userDictionaryName) a.config.scayt_userDictionaryName = null;
				if ("string" === typeof a.config.scayt_uiTabs && 3 === a.config.scayt_uiTabs.split(",").length) {
					var b = [],
						c = [];
					a.config.scayt_uiTabs =
						a.config.scayt_uiTabs.split(",");
					CKEDITOR.tools.search(a.config.scayt_uiTabs, function (a) {
						1 === Number(a) || 0 === Number(a) ? (c.push(!0), b.push(Number(a))) : c.push(!1)
					});
					null === CKEDITOR.tools.search(c, !1) ? a.config.scayt_uiTabs = b : a.config.scayt_uiTabs = [1, 1, 1]
				} else a.config.scayt_uiTabs = [1, 1, 1];
				"string" != typeof a.config.scayt_serviceProtocol && (a.config.scayt_serviceProtocol = null);
				"string" != typeof a.config.scayt_serviceHost && (a.config.scayt_serviceHost = null);
				"string" != typeof a.config.scayt_servicePort && (a.config.scayt_servicePort =
					null);
				"string" != typeof a.config.scayt_servicePath && (a.config.scayt_servicePath = null);
				a.config.scayt_moreSuggestions || (a.config.scayt_moreSuggestions = "on");
				"string" !== typeof a.config.scayt_customerId && (a.config.scayt_customerId = "1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2");
				"string" !== typeof a.config.scayt_customPunctuation && (a.config.scayt_customPunctuation = "-");
				"string" !== typeof a.config.scayt_srcUrl && (e = document.location.protocol, e = -1 != e.search(/https?:/) ? e : "http:", a.config.scayt_srcUrl =
					e + "//svc.webspellchecker.net/spellcheck31/wscbundle/wscbundle.js");
				"boolean" !== typeof CKEDITOR.config.scayt_handleCheckDirty && (CKEDITOR.config.scayt_handleCheckDirty = !0);
				"boolean" !== typeof CKEDITOR.config.scayt_handleUndoRedo && (CKEDITOR.config.scayt_handleUndoRedo = !0);
				CKEDITOR.config.scayt_handleUndoRedo = CKEDITOR.plugins.undo ? CKEDITOR.config.scayt_handleUndoRedo : !1;
				"boolean" !== typeof a.config.scayt_multiLanguageMode && (a.config.scayt_multiLanguageMode = !1);
				"object" !== typeof a.config.scayt_multiLanguageStyles &&
					(a.config.scayt_multiLanguageStyles = {});
				a.config.scayt_ignoreAllCapsWords && "boolean" !== typeof a.config.scayt_ignoreAllCapsWords && (a.config.scayt_ignoreAllCapsWords = !1);
				a.config.scayt_ignoreDomainNames && "boolean" !== typeof a.config.scayt_ignoreDomainNames && (a.config.scayt_ignoreDomainNames = !1);
				a.config.scayt_ignoreWordsWithMixedCases && "boolean" !== typeof a.config.scayt_ignoreWordsWithMixedCases && (a.config.scayt_ignoreWordsWithMixedCases = !1);
				a.config.scayt_ignoreWordsWithNumbers && "boolean" !== typeof a.config.scayt_ignoreWordsWithNumbers &&
					(a.config.scayt_ignoreWordsWithNumbers = !1);
				if (a.config.scayt_disableOptionsStorage) {
					var e = CKEDITOR.tools.isArray(a.config.scayt_disableOptionsStorage) ? a.config.scayt_disableOptionsStorage : "string" === typeof a.config.scayt_disableOptionsStorage ? [a.config.scayt_disableOptionsStorage] : void 0,
						g = "all options lang ignore-all-caps-words ignore-domain-names ignore-words-with-mixed-cases ignore-words-with-numbers".split(" "),
						l = ["lang", "ignore-all-caps-words", "ignore-domain-names", "ignore-words-with-mixed-cases",
							"ignore-words-with-numbers"
						],
						k = CKEDITOR.tools.search,
						f = CKEDITOR.tools.indexOf;
					a.config.scayt_disableOptionsStorage = function (a) {
						for (var b = [], c = 0; c < a.length; c++) {
							var e = a[c],
								p = !!k(a, "options");
							if (!k(g, e) || p && k(l, function (a) {
									if ("lang" === a) return !1
								})) return;
							k(l, e) && l.splice(f(l, e), 1);
							if ("all" === e || p && k(a, "lang")) return [];
							"options" === e && (l = ["lang"])
						}
						return b = b.concat(l)
					}(e)
				}
			},
			addRule: function (a) {
				var e = CKEDITOR.plugins.scayt,
					b = a.dataProcessor,
					c = b && b.htmlFilter,
					g = a._.elementsPath && a._.elementsPath.filters,
					b = b && b.dataFilter,
					l = a.addRemoveFormatFilter,
					k = function (b) {
						if (a.scayt && (b.hasAttribute(e.options.data_attribute_name) || b.hasAttribute(e.options.problem_grammar_data_attribute))) return !1
					},
					f = function (b) {
						var c = !0;
						a.scayt && (b.hasAttribute(e.options.data_attribute_name) || b.hasAttribute(e.options.problem_grammar_data_attribute)) && (c = !1);
						return c
					};
				g && g.push(k);
				b && b.addRules({
					elements: {
						span: function (a) {
							var b = a.hasClass(e.options.misspelled_word_class) && a.attributes[e.options.data_attribute_name],
								c = a.hasClass(e.options.problem_grammar_class) &&
								a.attributes[e.options.problem_grammar_data_attribute];
							e && (b || c) && delete a.name;
							return a
						}
					}
				});
				c && c.addRules({
					elements: {
						span: function (a) {
							var b = a.hasClass(e.options.misspelled_word_class) && a.attributes[e.options.data_attribute_name],
								c = a.hasClass(e.options.problem_grammar_class) && a.attributes[e.options.problem_grammar_data_attribute];
							e && (b || c) && delete a.name;
							return a
						}
					}
				});
				l && l.call(a, f)
			},
			scaytMenuDefinition: function (a) {
				var e = this,
					b = CKEDITOR.plugins.scayt;
				a = a.scayt;
				return {
					scayt: {
						scayt_ignore: {
							label: a.getLocal("btn_ignore"),
							group: "scayt_control",
							order: 1,
							exec: function (a) {
								a.scayt.ignoreWord()
							}
						},
						scayt_ignoreall: {
							label: a.getLocal("btn_ignoreAll"),
							group: "scayt_control",
							order: 2,
							exec: function (a) {
								a.scayt.ignoreAllWords()
							}
						},
						scayt_add: {
							label: a.getLocal("btn_addWord"),
							group: "scayt_control",
							order: 3,
							exec: function (a) {
								var b = a.scayt;
								setTimeout(function () {
									b.addWordToUserDictionary()
								}, 10)
							}
						},
						scayt_option: {
							label: a.getLocal("btn_options"),
							group: "scayt_control",
							order: 4,
							exec: function (a) {
								a.scayt.tabToOpen = "options";
								b.openDialog(e.dialogName,
									a)
							},
							verification: function (a) {
								return 1 == a.config.scayt_uiTabs[0] ? !0 : !1
							}
						},
						scayt_language: {
							label: a.getLocal("btn_langs"),
							group: "scayt_control",
							order: 5,
							exec: function (a) {
								a.scayt.tabToOpen = "langs";
								b.openDialog(e.dialogName, a)
							},
							verification: function (a) {
								return 1 == a.config.scayt_uiTabs[1] ? !0 : !1
							}
						},
						scayt_dictionary: {
							label: a.getLocal("btn_dictionaries"),
							group: "scayt_control",
							order: 6,
							exec: function (a) {
								a.scayt.tabToOpen = "dictionaries";
								b.openDialog(e.dialogName, a)
							},
							verification: function (a) {
								return 1 == a.config.scayt_uiTabs[2] ?
									!0 : !1
							}
						},
						scayt_about: {
							label: a.getLocal("btn_about"),
							group: "scayt_control",
							order: 7,
							exec: function (a) {
								a.scayt.tabToOpen = "about";
								b.openDialog(e.dialogName, a)
							}
						}
					},
					grayt: {
						grayt_problemdescription: {
							label: "Grammar problem description",
							group: "grayt_description",
							order: 1,
							state: CKEDITOR.TRISTATE_DISABLED,
							exec: function (a) {}
						},
						grayt_ignore: {
							label: a.getLocal("btn_ignore"),
							group: "grayt_control",
							order: 2,
							exec: function (a) {
								a.scayt.ignorePhrase()
							}
						},
						grayt_ignoreall: {
							label: a.getLocal("btn_ignoreAll"),
							group: "grayt_control",
							order: 3,
							exec: function (a) {
								a.scayt.ignoreAllPhrases()
							}
						}
					}
				}
			},
			buildSuggestionMenuItems: function (a, e, b) {
				var c = {},
					g = {},
					l = b ? "word" : "phrase",
					k = b ? "startGrammarCheck" : "startSpellCheck",
					f = a.scayt;
				if (0 < e.length && "no_any_suggestions" !== e[0])
					if (b)
						for (b = 0; b < e.length; b++) {
							var d = "scayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[b].replace(" ", "_");
							a.addCommand(d, this.createCommand(CKEDITOR.plugins.scayt.suggestions[b], l, k));
							b < a.config.scayt_maxSuggestions ? (a.addMenuItem(d, {
								label: e[b],
								command: d,
								group: "scayt_suggest",
								order: b + 1
							}), c[d] = CKEDITOR.TRISTATE_OFF) : (a.addMenuItem(d, {
								label: e[b],
								command: d,
								group: "scayt_moresuggest",
								order: b + 1
							}), g[d] = CKEDITOR.TRISTATE_OFF, "on" === a.config.scayt_moreSuggestions && (a.addMenuItem("scayt_moresuggest", {
								label: f.getLocal("btn_moreSuggestions"),
								group: "scayt_moresuggest",
								order: 10,
								getItems: function () {
									return g
								}
							}), c.scayt_moresuggest = CKEDITOR.TRISTATE_OFF))
						} else
							for (b = 0; b < e.length; b++) d = "grayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[b].replace(" ", "_"), a.addCommand(d, this.createCommand(CKEDITOR.plugins.scayt.suggestions[b],
								l, k)), a.addMenuItem(d, {
								label: e[b],
								command: d,
								group: "grayt_suggest",
								order: b + 1
							}), c[d] = CKEDITOR.TRISTATE_OFF;
					else c.no_scayt_suggest = CKEDITOR.TRISTATE_DISABLED, a.addCommand("no_scayt_suggest", {
						exec: function () {}
					}), a.addMenuItem("no_scayt_suggest", {
						label: f.getLocal("btn_noSuggestions") || "no_scayt_suggest",
						command: "no_scayt_suggest",
						group: "scayt_suggest",
						order: 0
					});
				return c
			},
			menuGenerator: function (a, e) {
				var b = a.scayt,
					c = this.scaytMenuDefinition(a),
					g = {},
					l = a.config.scayt_contextCommands.split("|"),
					k = e.getAttribute(b.getLangAttribute()) ||
					b.getLang(),
					f, d, m, h;
				d = b.isScaytNode(e);
				m = b.isGraytNode(e);
				d ? (c = c.scayt, f = e.getAttribute(b.getScaytNodeAttributeName()), b.fire("getSuggestionsList", {
					lang: k,
					word: f
				}), g = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions, d)) : m && (c = c.grayt, g = e.getAttribute(b.getGraytNodeAttributeName()), b.getGraytNodeRuleAttributeName ? (f = e.getAttribute(b.getGraytNodeRuleAttributeName()), b.getProblemDescriptionText(g, f, k)) : b.getProblemDescriptionText(g, k), h = b.getProblemDescriptionText(g, f, k), c.grayt_problemdescription &&
					h && (h = h.replace(/([.!?])\s/g, "$1\x3cbr\x3e"), c.grayt_problemdescription.label = h), b.fire("getGrammarSuggestionsList", {
						lang: k,
						phrase: g,
						rule: f
					}), g = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions, d));
				if (d && "off" == a.config.scayt_contextCommands) return g;
				for (var n in c) d && -1 == CKEDITOR.tools.indexOf(l, n.replace("scayt_", "")) && "all" != a.config.scayt_contextCommands || m && "grayt_problemdescription" !== n && -1 == CKEDITOR.tools.indexOf(l, n.replace("grayt_", "")) && "all" != a.config.scayt_contextCommands ||
					(g[n] = "undefined" != typeof c[n].state ? c[n].state : CKEDITOR.TRISTATE_OFF, "function" !== typeof c[n].verification || c[n].verification(a) || delete g[n], a.addCommand(n, {
						exec: c[n].exec
					}), a.addMenuItem(n, {
						label: a.lang.scayt[c[n].label] || c[n].label,
						command: n,
						group: c[n].group,
						order: c[n].order
					}));
				return g
			},
			createCommand: function (a, e, b) {
				return {
					exec: function (c) {
						c = c.scayt;
						var g = {};
						g[e] = a;
						c.replaceSelectionNode(g);
						"startGrammarCheck" === b && c.removeMarkupInSelectionNode({
							grammarOnly: !0
						});
						c.fire(b)
					}
				}
			}
		}), CKEDITOR.plugins.scayt = {
			charsToObserve: [{
				charName: "cke-fillingChar",
				charCode: function () {
					var a = CKEDITOR.version.match(/^\d(\.\d*)*/),
						a = a && a[0],
						e;
					if (a) {
						e = "4.5.7";
						var b, a = a.replace(/\./g, "");
						e = e.replace(/\./g, "");
						b = a.length - e.length;
						b = 0 <= b ? b : 0;
						e = parseInt(a) >= parseInt(e) * Math.pow(10, b)
					}
					return e ? Array(7).join(String.fromCharCode(8203)) : String.fromCharCode(8203)
				}()
			}],
			onLoadTimestamp: "",
			state: {
				scayt: {},
				grayt: {}
			},
			warningCounter: 0,
			suggestions: [],
			options: {
				disablingCommandExec: {
					source: !0,
					newpage: !0,
					templates: !0
				},
				data_attribute_name: "data-scayt-word",
				misspelled_word_class: "scayt-misspell-word",
				problem_grammar_data_attribute: "data-grayt-phrase",
				problem_grammar_class: "gramm-problem"
			},
			backCompatibilityMap: {
				scayt_service_protocol: "scayt_serviceProtocol",
				scayt_service_host: "scayt_serviceHost",
				scayt_service_port: "scayt_servicePort",
				scayt_service_path: "scayt_servicePath",
				scayt_customerid: "scayt_customerId"
			},
			openDialog: function (a, e) {
				var b = e.scayt;
				b.isAllModulesReady && !1 === b.isAllModulesReady() || (e.lockSelection(), e.openDialog(a))
			},
			alarmCompatibilityMessage: function () {
				5 >
					this.warningCounter && (console.warn("You are using the latest version of SCAYT plugin for CKEditor with the old application version. In order to have access to the newest features, it is recommended to upgrade the application version to latest one as well. Contact us for more details at support@webspellchecker.net."), this.warningCounter += 1)
			},
			isNewUdSupported: function (a) {
				return a.getUserDictionary ? !0 : !1
			},
			reloadMarkup: function (a) {
				var e;
				a && (e = a.getScaytLangList(), a.reloadMarkup ? a.reloadMarkup() : (this.alarmCompatibilityMessage(),
					e && e.ltr && e.rtl && a.fire("startSpellCheck, startGrammarCheck")))
			},
			replaceOldOptionsNames: function (a) {
				for (var e in a) e in this.backCompatibilityMap && (a[this.backCompatibilityMap[e]] = a[e], delete a[e])
			},
			createScayt: function (a) {
				var e = this,
					b = CKEDITOR.plugins.scayt;
				this.loadScaytLibrary(a, function (a) {
					function g(a) {
						return new SCAYT.CKSCAYT(a, function () {}, function () {})
					}
					var l;
					a.window && (l = "BODY" == a.editable().$.nodeName ? a.window.getFrame() : a.editable());
					if (l) {
						l = {
							lang: a.config.scayt_sLang,
							container: l.$,
							customDictionary: a.config.scayt_customDictionaryIds,
							userDictionaryName: a.config.scayt_userDictionaryName,
							localization: a.langCode,
							customer_id: a.config.scayt_customerId,
							customPunctuation: a.config.scayt_customPunctuation,
							debug: a.config.scayt_debug,
							data_attribute_name: e.options.data_attribute_name,
							misspelled_word_class: e.options.misspelled_word_class,
							problem_grammar_data_attribute: e.options.problem_grammar_data_attribute,
							problem_grammar_class: e.options.problem_grammar_class,
							"options-to-restore": a.config.scayt_disableOptionsStorage,
							focused: a.editable().hasFocus,
							ignoreElementsRegex: a.config.scayt_elementsToIgnore,
							ignoreGraytElementsRegex: a.config.grayt_elementsToIgnore,
							minWordLength: a.config.scayt_minWordLength,
							multiLanguageMode: a.config.scayt_multiLanguageMode,
							multiLanguageStyles: a.config.scayt_multiLanguageStyles,
							graytAutoStartup: a.config.grayt_autoStartup,
							charsToObserve: b.charsToObserve
						};
						a.config.scayt_serviceProtocol && (l.service_protocol = a.config.scayt_serviceProtocol);
						a.config.scayt_serviceHost && (l.service_host = a.config.scayt_serviceHost);
						a.config.scayt_servicePort &&
							(l.service_port = a.config.scayt_servicePort);
						a.config.scayt_servicePath && (l.service_path = a.config.scayt_servicePath);
						"boolean" === typeof a.config.scayt_ignoreAllCapsWords && (l["ignore-all-caps-words"] = a.config.scayt_ignoreAllCapsWords);
						"boolean" === typeof a.config.scayt_ignoreDomainNames && (l["ignore-domain-names"] = a.config.scayt_ignoreDomainNames);
						"boolean" === typeof a.config.scayt_ignoreWordsWithMixedCases && (l["ignore-words-with-mixed-cases"] = a.config.scayt_ignoreWordsWithMixedCases);
						"boolean" === typeof a.config.scayt_ignoreWordsWithNumbers &&
							(l["ignore-words-with-numbers"] = a.config.scayt_ignoreWordsWithNumbers);
						var k;
						try {
							k = g(l)
						} catch (f) {
							e.alarmCompatibilityMessage(), delete l.charsToObserve, k = g(l)
						}
						k.subscribe("suggestionListSend", function (a) {
							for (var b = {}, c = [], f = 0; f < a.suggestionList.length; f++) b["word_" + a.suggestionList[f]] || (b["word_" + a.suggestionList[f]] = a.suggestionList[f], c.push(a.suggestionList[f]));
							CKEDITOR.plugins.scayt.suggestions = c
						});
						k.subscribe("selectionIsChanged", function (b) {
							a.getSelection().isLocked && "restoreSelection" !== b.action &&
								a.lockSelection();
							"restoreSelection" === b.action && a.selectionChange(!0)
						});
						k.subscribe("graytStateChanged", function (d) {
							b.state.grayt[a.name] = d.state
						});
						k.addMarkupHandler && k.addMarkupHandler(function (b) {
							var f = a.editable(),
								e = f.getCustomData(b.charName);
							e && (e.$ = b.node, f.setCustomData(b.charName, e))
						});
						a.scayt = k;
						a.fire("scaytButtonState", a.readOnly ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_ON)
					} else b.state.scayt[a.name] = !1
				})
			},
			destroy: function (a) {
				a.scayt && a.scayt.destroy();
				delete a.scayt;
				a.fire("scaytButtonState",
					CKEDITOR.TRISTATE_OFF)
			},
			loadScaytLibrary: function (a, e) {
				var b, c = function () {
					CKEDITOR.fireOnce("scaytReady");
					a.scayt || "function" === typeof e && e(a)
				};
				"undefined" === typeof window.SCAYT || "function" !== typeof window.SCAYT.CKSCAYT ? (b = a.config.scayt_srcUrl + "?" + this.onLoadTimestamp, CKEDITOR.scriptLoader.load(b, function (a) {
					a && c()
				})) : window.SCAYT && "function" === typeof window.SCAYT.CKSCAYT && c()
			}
		}, CKEDITOR.on("dialogDefinition", function (a) {
			var e = a.data.name;
			a = a.data.definition.dialog;
			"scaytDialog" !== e && "checkspell" !==
				e && (a.on("show", function (a) {
					a = a.sender && a.sender.getParentEditor();
					var c = CKEDITOR.plugins.scayt,
						e = a.scayt;
					e && c.state.scayt[a.name] && e.setMarkupPaused && e.setMarkupPaused(!0)
				}), a.on("hide", function (a) {
					a = a.sender && a.sender.getParentEditor();
					var c = CKEDITOR.plugins.scayt,
						e = a.scayt;
					e && c.state.scayt[a.name] && e.setMarkupPaused && e.setMarkupPaused(!1)
				}));
			if ("scaytDialog" === e) a.on("cancel", function (a) {
				return !1
			}, this, null, -1);
			if ("checkspell" === e) a.on("cancel", function (a) {
				a = a.sender && a.sender.getParentEditor();
				var c = CKEDITOR.plugins.scayt,
					e = a.scayt;
				e && c.state.scayt[a.name] && e.setMarkupPaused && e.setMarkupPaused(!1);
				a.unlockSelection()
			}, this, null, -2);
			if ("link" === e) a.on("ok", function (a) {
				var c = a.sender && a.sender.getParentEditor();
				c && setTimeout(function () {
					c.fire("reloadMarkupScayt", {
						removeOptions: {
							removeInside: !0,
							forceBookmark: !0
						},
						timeout: 0
					})
				}, 0)
			});
			if ("replace" === e) a.on("hide", function (a) {
				a = a.sender && a.sender.getParentEditor();
				var c = CKEDITOR.plugins.scayt,
					e = a.scayt;
				a && setTimeout(function () {
					e && (e.fire("removeMarkupInDocument", {}), c.reloadMarkup(e))
				}, 0)
			})
		}), CKEDITOR.on("scaytReady", function () {
			if (!0 === CKEDITOR.config.scayt_handleCheckDirty) {
				var a = CKEDITOR.editor.prototype;
				a.checkDirty = CKEDITOR.tools.override(a.checkDirty, function (a) {
					return function () {
						var c = null,
							e = this.scayt;
						if (CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt) {
							if (c = "ready" == this.status) var l = e.removeMarkupFromString(this.getSnapshot()),
								e = e.removeMarkupFromString(this._.previousValue),
								c = c && e !== l
						} else c = a.call(this);
						return c
					}
				});
				a.resetDirty = CKEDITOR.tools.override(a.resetDirty, function (a) {
					return function () {
						var c = this.scayt;
						CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt ? this._.previousValue = c.removeMarkupFromString(this.getSnapshot()) : a.call(this)
					}
				})
			}
			if (!0 === CKEDITOR.config.scayt_handleUndoRedo) {
				var a = CKEDITOR.plugins.undo.Image.prototype,
					e = "function" == typeof a.equalsContent ? "equalsContent" : "equals";
				a[e] = CKEDITOR.tools.override(a[e], function (a) {
					return function (c) {
						var e = c.editor.scayt,
							l =
							this.contents,
							k = c.contents,
							f = null;
						CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[c.editor.name] && c.editor.scayt && (this.contents = e.removeMarkupFromString(l) || "", c.contents = e.removeMarkupFromString(k) || "");
						f = a.apply(this, arguments);
						this.contents = l;
						c.contents = k;
						return f
					}
				})
			}
		}),
		function () {
			CKEDITOR.plugins.add("selectall", {
				init: function (a) {
					a.addCommand("selectAll", {
						modes: {
							wysiwyg: 1,
							source: 1
						},
						exec: function (a) {
							var b = a.editable();
							if (b.is("textarea")) a = b.$, CKEDITOR.env.ie && a.createTextRange ? a.createTextRange().execCommand("SelectAll") :
								(a.selectionStart = 0, a.selectionEnd = a.value.length), a.focus();
							else {
								if (b.is("body")) a.document.$.execCommand("SelectAll", !1, null);
								else {
									var c = a.createRange();
									c.selectNodeContents(b);
									c.select()
								}
								a.forceNextSelectionCheck();
								a.selectionChange()
							}
						},
						canUndo: !1
					});
					a.ui.addButton && a.ui.addButton("SelectAll", {
						label: a.lang.selectall.toolbar,
						command: "selectAll",
						toolbar: "selection,10"
					})
				}
			})
		}(),
		function () {
			var a = {
				readOnly: 1,
				preserveState: !0,
				editorFocus: !1,
				exec: function (a) {
					this.toggleState();
					this.refresh(a)
				},
				refresh: function (a) {
					if (a.document) {
						var b =
							this.state != CKEDITOR.TRISTATE_ON || a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && !a.focusManager.hasFocus ? "removeClass" : "attachClass";
						a.editable()[b]("cke_show_blocks")
					}
				}
			};
			CKEDITOR.plugins.add("showblocks", {
				onLoad: function () {
					var a = "p div pre address blockquote h1 h2 h3 h4 h5 h6".split(" "),
						b, c, g, l, k = CKEDITOR.getUrl(this.path),
						f = !(CKEDITOR.env.ie && 9 > CKEDITOR.env.version),
						d = f ? ":not([contenteditable\x3dfalse]):not(.cke_show_blocks_off)" : "",
						m, h;
					for (b = c = g = l = ""; m = a.pop();) h = a.length ? "," : "", b += ".cke_show_blocks " +
						m + d + h, g += ".cke_show_blocks.cke_contents_ltr " + m + d + h, l += ".cke_show_blocks.cke_contents_rtl " + m + d + h, c += ".cke_show_blocks " + m + d + "{background-image:url(" + CKEDITOR.getUrl(k + "images/block_" + m + ".png") + ")}";
					CKEDITOR.addCss((b + "{background-repeat:no-repeat;border:1px dotted gray;padding-top:8px}").concat(c, g + "{background-position:top left;padding-left:8px}", l + "{background-position:top right;padding-right:8px}"));
					f || CKEDITOR.addCss(".cke_show_blocks [contenteditable\x3dfalse],.cke_show_blocks .cke_show_blocks_off{border:none;padding-top:0;background-image:none}.cke_show_blocks.cke_contents_rtl [contenteditable\x3dfalse],.cke_show_blocks.cke_contents_rtl .cke_show_blocks_off{padding-right:0}.cke_show_blocks.cke_contents_ltr [contenteditable\x3dfalse],.cke_show_blocks.cke_contents_ltr .cke_show_blocks_off{padding-left:0}")
				},
				init: function (e) {
					function b() {
						c.refresh(e)
					}
					if (!e.blockless) {
						var c = e.addCommand("showblocks", a);
						c.canUndo = !1;
						e.config.startupOutlineBlocks && c.setState(CKEDITOR.TRISTATE_ON);
						e.ui.addButton && e.ui.addButton("ShowBlocks", {
							label: e.lang.showblocks.toolbar,
							command: "showblocks",
							toolbar: "tools,20"
						});
						e.on("mode", function () {
							c.state != CKEDITOR.TRISTATE_DISABLED && c.refresh(e)
						});
						e.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (e.on("focus", b), e.on("blur", b));
						e.on("contentDom", function () {
							c.state != CKEDITOR.TRISTATE_DISABLED &&
								c.refresh(e)
						})
					}
				}
			})
		}(),
		function () {
			var a = {
				preserveState: !0,
				editorFocus: !1,
				readOnly: 1,
				exec: function (a) {
					this.toggleState();
					this.refresh(a)
				},
				refresh: function (a) {
					if (a.document) {
						var b = this.state == CKEDITOR.TRISTATE_ON ? "attachClass" : "removeClass";
						a.editable()[b]("cke_show_borders")
					}
				}
			};
			CKEDITOR.plugins.add("showborders", {
				modes: {
					wysiwyg: 1
				},
				onLoad: function () {
					var a;
					a = (CKEDITOR.env.ie6Compat ? [".%1 table.%2,", ".%1 table.%2 td, .%1 table.%2 th", "{", "border : #d3d3d3 1px dotted", "}"] : ".%1 table.%2,;.%1 table.%2 \x3e tr \x3e td, .%1 table.%2 \x3e tr \x3e th,;.%1 table.%2 \x3e tbody \x3e tr \x3e td, .%1 table.%2 \x3e tbody \x3e tr \x3e th,;.%1 table.%2 \x3e thead \x3e tr \x3e td, .%1 table.%2 \x3e thead \x3e tr \x3e th,;.%1 table.%2 \x3e tfoot \x3e tr \x3e td, .%1 table.%2 \x3e tfoot \x3e tr \x3e th;{;border : #d3d3d3 1px dotted;}".split(";")).join("").replace(/%2/g,
						"cke_show_border").replace(/%1/g, "cke_show_borders ");
					CKEDITOR.addCss(a)
				},
				init: function (e) {
					var b = e.addCommand("showborders", a);
					b.canUndo = !1;
					!1 !== e.config.startupShowBorders && b.setState(CKEDITOR.TRISTATE_ON);
					e.on("mode", function () {
						b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(e)
					}, null, null, 100);
					e.on("contentDom", function () {
						b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(e)
					});
					e.on("removeFormatCleanup", function (a) {
						a = a.data;
						e.getCommand("showborders").state == CKEDITOR.TRISTATE_ON && a.is("table") && (!a.hasAttribute("border") ||
							0 >= parseInt(a.getAttribute("border"), 10)) && a.addClass("cke_show_border")
					})
				},
				afterInit: function (a) {
					var b = a.dataProcessor;
					a = b && b.dataFilter;
					b = b && b.htmlFilter;
					a && a.addRules({
						elements: {
							table: function (a) {
								a = a.attributes;
								var b = a["class"],
									e = parseInt(a.border, 10);
								e && !(0 >= e) || b && -1 != b.indexOf("cke_show_border") || (a["class"] = (b || "") + " cke_show_border")
							}
						}
					});
					b && b.addRules({
						elements: {
							table: function (a) {
								a = a.attributes;
								var b = a["class"];
								b && (a["class"] = b.replace("cke_show_border", "").replace(/\s{2}/, " ").replace(/^\s+|\s+$/,
									""))
							}
						}
					})
				}
			});
			CKEDITOR.on("dialogDefinition", function (a) {
				var b = a.data.name;
				if ("table" == b || "tableProperties" == b)
					if (a = a.data.definition, b = a.getContents("info").get("txtBorder"), b.commit = CKEDITOR.tools.override(b.commit, function (a) {
							return function (b, e) {
								a.apply(this, arguments);
								var k = parseInt(this.getValue(), 10);
								e[!k || 0 >= k ? "addClass" : "removeClass"]("cke_show_border")
							}
						}), a = (a = a.getContents("advanced")) && a.get("advCSSClasses")) a.setup = CKEDITOR.tools.override(a.setup, function (a) {
						return function () {
							a.apply(this,
								arguments);
							this.setValue(this.getValue().replace(/cke_show_border/, ""))
						}
					}), a.commit = CKEDITOR.tools.override(a.commit, function (a) {
						return function (b, e) {
							a.apply(this, arguments);
							parseInt(e.getAttribute("border"), 10) || e.addClass("cke_show_border")
						}
					})
			})
		}(), CKEDITOR.plugins.add("smiley", {
			requires: "dialog",
			init: function (a) {
				a.config.smiley_path = a.config.smiley_path || this.path + "images/";
				a.addCommand("smiley", new CKEDITOR.dialogCommand("smiley", {
					allowedContent: "img[alt,height,!src,title,width]",
					requiredContent: "img"
				}));
				a.ui.addButton && a.ui.addButton("Smiley", {
					label: a.lang.smiley.toolbar,
					command: "smiley",
					toolbar: "insert,50"
				});
				CKEDITOR.dialog.add("smiley", this.path + "dialogs/smiley.js")
			}
		}), CKEDITOR.config.smiley_images = "regular_smile.png sad_smile.png wink_smile.png teeth_smile.png confused_smile.png tongue_smile.png embarrassed_smile.png omg_smile.png whatchutalkingabout_smile.png angry_smile.png angel_smile.png shades_smile.png devil_smile.png cry_smile.png lightbulb.png thumbs_down.png thumbs_up.png heart.png broken_heart.png kiss.png envelope.png".split(" "),
		CKEDITOR.config.smiley_descriptions = "smiley;sad;wink;laugh;frown;cheeky;blush;surprise;indecision;angry;angel;cool;devil;crying;enlightened;no;yes;heart;broken heart;kiss;mail".split(";"),
		function () {
			CKEDITOR.plugins.add("sourcearea", {
				init: function (e) {
					function b() {
						var a = g && this.equals(CKEDITOR.document.getActive());
						this.hide();
						this.setStyle("height", this.getParent().$.clientHeight + "px");
						this.setStyle("width", this.getParent().$.clientWidth + "px");
						this.show();
						a && this.focus()
					}
					if (e.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
						var c =
							CKEDITOR.plugins.sourcearea;
						e.addMode("source", function (c) {
							var g = e.ui.space("contents").getDocument().createElement("textarea");
							g.setStyles(CKEDITOR.tools.extend({
								width: CKEDITOR.env.ie7Compat ? "99%" : "100%",
								height: "100%",
								resize: "none",
								outline: "none",
								"text-align": "left"
							}, CKEDITOR.tools.cssVendorPrefix("tab-size", e.config.sourceAreaTabSize || 4)));
							g.setAttribute("dir", "ltr");
							g.addClass("cke_source").addClass("cke_reset").addClass("cke_enable_context_menu");
							e.ui.space("contents").append(g);
							g = e.editable(new a(e,
								g));
							g.setData(e.getData(1));
							CKEDITOR.env.ie && (g.attachListener(e, "resize", b, g), g.attachListener(CKEDITOR.document.getWindow(), "resize", b, g), CKEDITOR.tools.setTimeout(b, 0, g));
							e.fire("ariaWidget", this);
							c()
						});
						e.addCommand("source", c.commands.source);
						e.ui.addButton && e.ui.addButton("Source", {
							label: e.lang.sourcearea.toolbar,
							command: "source",
							toolbar: "mode,10"
						});
						e.on("mode", function () {
							e.getCommand("source").setState("source" == e.mode ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
						});
						var g = CKEDITOR.env.ie && 9 ==
							CKEDITOR.env.version
					}
				}
			});
			var a = CKEDITOR.tools.createClass({
				base: CKEDITOR.editable,
				proto: {
					setData: function (a) {
						this.setValue(a);
						this.status = "ready";
						this.editor.fire("dataReady")
					},
					getData: function () {
						return this.getValue()
					},
					insertHtml: function () {},
					insertElement: function () {},
					insertText: function () {},
					setReadOnly: function (a) {
						this[(a ? "set" : "remove") + "Attribute"]("readOnly", "readonly")
					},
					detach: function () {
						a.baseProto.detach.call(this);
						this.clearCustomData();
						this.remove()
					}
				}
			})
		}(), CKEDITOR.plugins.sourcearea = {
			commands: {
				source: {
					modes: {
						wysiwyg: 1,
						source: 1
					},
					editorFocus: !1,
					readOnly: 1,
					exec: function (a) {
						"wysiwyg" == a.mode && a.fire("saveSnapshot");
						a.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED);
						a.setMode("source" == a.mode ? "wysiwyg" : "source")
					},
					canUndo: !1
				}
			}
		}, CKEDITOR.plugins.add("specialchar", {
			availableLangs: {
				af: 1,
				ar: 1,
				az: 1,
				bg: 1,
				ca: 1,
				cs: 1,
				cy: 1,
				da: 1,
				de: 1,
				"de-ch": 1,
				el: 1,
				en: 1,
				"en-au": 1,
				"en-ca": 1,
				"en-gb": 1,
				eo: 1,
				es: 1,
				"es-mx": 1,
				et: 1,
				eu: 1,
				fa: 1,
				fi: 1,
				fr: 1,
				"fr-ca": 1,
				gl: 1,
				he: 1,
				hr: 1,
				hu: 1,
				id: 1,
				it: 1,
				ja: 1,
				km: 1,
				ko: 1,
				ku: 1,
				lt: 1,
				lv: 1,
				nb: 1,
				nl: 1,
				no: 1,
				oc: 1,
				pl: 1,
				pt: 1,
				"pt-br": 1,
				ro: 1,
				ru: 1,
				si: 1,
				sk: 1,
				sl: 1,
				sq: 1,
				sv: 1,
				th: 1,
				tr: 1,
				tt: 1,
				ug: 1,
				uk: 1,
				vi: 1,
				zh: 1,
				"zh-cn": 1
			},
			requires: "dialog",
			init: function (a) {
				var e = this;
				CKEDITOR.dialog.add("specialchar", this.path + "dialogs/specialchar.js");
				a.addCommand("specialchar", {
					exec: function () {
						var b = a.langCode,
							b = e.availableLangs[b] ? b : e.availableLangs[b.replace(/-.*/, "")] ? b.replace(/-.*/, "") : "en";
						CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e.path + "dialogs/lang/" + b + ".js"), function () {
							CKEDITOR.tools.extend(a.lang.specialchar, e.langEntries[b]);
							a.openDialog("specialchar")
						})
					},
					modes: {
						wysiwyg: 1
					},
					canUndo: !1
				});
				a.ui.addButton && a.ui.addButton("SpecialChar", {
					label: a.lang.specialchar.toolbar,
					command: "specialchar",
					toolbar: "insert,50"
				})
			}
		}), CKEDITOR.config.specialChars = "! \x26quot; # $ % \x26amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; \x26lt; \x3d \x26gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ \x26euro; \x26lsquo; \x26rsquo; \x26ldquo; \x26rdquo; \x26ndash; \x26mdash; \x26iexcl; \x26cent; \x26pound; \x26curren; \x26yen; \x26brvbar; \x26sect; \x26uml; \x26copy; \x26ordf; \x26laquo; \x26not; \x26reg; \x26macr; \x26deg; \x26sup2; \x26sup3; \x26acute; \x26micro; \x26para; \x26middot; \x26cedil; \x26sup1; \x26ordm; \x26raquo; \x26frac14; \x26frac12; \x26frac34; \x26iquest; \x26Agrave; \x26Aacute; \x26Acirc; \x26Atilde; \x26Auml; \x26Aring; \x26AElig; \x26Ccedil; \x26Egrave; \x26Eacute; \x26Ecirc; \x26Euml; \x26Igrave; \x26Iacute; \x26Icirc; \x26Iuml; \x26ETH; \x26Ntilde; \x26Ograve; \x26Oacute; \x26Ocirc; \x26Otilde; \x26Ouml; \x26times; \x26Oslash; \x26Ugrave; \x26Uacute; \x26Ucirc; \x26Uuml; \x26Yacute; \x26THORN; \x26szlig; \x26agrave; \x26aacute; \x26acirc; \x26atilde; \x26auml; \x26aring; \x26aelig; \x26ccedil; \x26egrave; \x26eacute; \x26ecirc; \x26euml; \x26igrave; \x26iacute; \x26icirc; \x26iuml; \x26eth; \x26ntilde; \x26ograve; \x26oacute; \x26ocirc; \x26otilde; \x26ouml; \x26divide; \x26oslash; \x26ugrave; \x26uacute; \x26ucirc; \x26uuml; \x26yacute; \x26thorn; \x26yuml; \x26OElig; \x26oelig; \x26#372; \x26#374 \x26#373 \x26#375; \x26sbquo; \x26#8219; \x26bdquo; \x26hellip; \x26trade; \x26#9658; \x26bull; \x26rarr; \x26rArr; \x26hArr; \x26diams; \x26asymp;".split(" "),
		function () {
			CKEDITOR.plugins.add("stylescombo", {
				requires: "richcombo",
				init: function (a) {
					var e = a.config,
						b = a.lang.stylescombo,
						c = {},
						g = [],
						l = [];
					a.on("stylesSet", function (b) {
						if (b = b.data.styles) {
							for (var f, d, m, h = 0, n = b.length; h < n; h++)(f = b[h], a.blockless && f.element in CKEDITOR.dtd.$block || "string" == typeof f.type && !CKEDITOR.style.customHandlers[f.type] || (d = f.name, f = new CKEDITOR.style(f), a.filter.customConfig && !a.filter.check(f))) || (f._name = d, f._.enterMode = e.enterMode, f._.type = m = f.assignedTo || f.type, f._.weight =
								h + 1E3 * (m == CKEDITOR.STYLE_OBJECT ? 1 : m == CKEDITOR.STYLE_BLOCK ? 2 : 3), c[d] = f, g.push(f), l.push(f));
							g.sort(function (a, b) {
								return a._.weight - b._.weight
							})
						}
					});
					a.ui.addRichCombo("Styles", {
						label: b.label,
						title: b.panelTitle,
						toolbar: "styles,10",
						allowedContent: l,
						panel: {
							css: [CKEDITOR.skin.getPath("editor")].concat(e.contentsCss),
							multiSelect: !0,
							attributes: {
								"aria-label": b.panelTitle
							}
						},
						init: function () {
							var a, c, d, e, h, l;
							h = 0;
							for (l = g.length; h < l; h++) a = g[h], c = a._name, e = a._.type, e != d && (this.startGroup(b["panelTitle" + String(e)]),
								d = e), this.add(c, a.type == CKEDITOR.STYLE_OBJECT ? c : a.buildPreview(), c);
							this.commit()
						},
						onClick: function (b) {
							a.focus();
							a.fire("saveSnapshot");
							b = c[b];
							var f = a.elementPath();
							if (b.group && b.removeStylesFromSameGroup(a)) a.applyStyle(b);
							else a[b.checkActive(f, a) ? "removeStyle" : "applyStyle"](b);
							a.fire("saveSnapshot")
						},
						onRender: function () {
							a.on("selectionChange", function (b) {
								var f = this.getValue();
								b = b.data.path.elements;
								for (var d = 0, e = b.length, h; d < e; d++) {
									h = b[d];
									for (var g in c)
										if (c[g].checkElementRemovable(h, !0, a)) {
											g !=
												f && this.setValue(g);
											return
										}
								}
								this.setValue("")
							}, this)
						},
						onOpen: function () {
							var e = a.getSelection(),
								e = e.getSelectedElement() || e.getStartElement() || a.editable(),
								e = a.elementPath(e),
								f = [0, 0, 0, 0];
							this.showAll();
							this.unmarkAll();
							for (var d in c) {
								var g = c[d],
									h = g._.type;
								g.checkApplicable(e, a, a.activeFilter) ? f[h]++ : this.hideItem(d);
								g.checkActive(e, a) && this.mark(d)
							}
							f[CKEDITOR.STYLE_BLOCK] || this.hideGroup(b["panelTitle" + String(CKEDITOR.STYLE_BLOCK)]);
							f[CKEDITOR.STYLE_INLINE] || this.hideGroup(b["panelTitle" + String(CKEDITOR.STYLE_INLINE)]);
							f[CKEDITOR.STYLE_OBJECT] || this.hideGroup(b["panelTitle" + String(CKEDITOR.STYLE_OBJECT)])
						},
						refresh: function () {
							var b = a.elementPath();
							if (b) {
								for (var f in c)
									if (c[f].checkApplicable(b, a, a.activeFilter)) return;
								this.setState(CKEDITOR.TRISTATE_DISABLED)
							}
						},
						reset: function () {
							c = {};
							g = []
						}
					})
				}
			})
		}(),
		function () {
			function a(a) {
				return {
					editorFocus: !1,
					canUndo: !1,
					modes: {
						wysiwyg: 1
					},
					exec: function (b) {
						if (b.editable().hasFocus) {
							var c = b.getSelection(),
								f;
							if (f = (new CKEDITOR.dom.elementPath(c.getCommonAncestor(), c.root)).contains({
									td: 1,
									th: 1
								}, 1)) {
								var c = b.createRange(),
									d = CKEDITOR.tools.tryThese(function () {
										var b = f.getParent().$.cells[f.$.cellIndex + (a ? -1 : 1)];
										b.parentNode.parentNode;
										return b
									}, function () {
										var b = f.getParent(),
											b = b.getAscendant("table").$.rows[b.$.rowIndex + (a ? -1 : 1)];
										return b.cells[a ? b.cells.length - 1 : 0]
									});
								if (d || a)
									if (d) d = new CKEDITOR.dom.element(d), c.moveToElementEditStart(d), c.checkStartOfBlock() && c.checkEndOfBlock() || c.selectNodeContents(d);
									else return !0;
								else {
									for (var e = f.getAscendant("table").$, d = f.getParent().$.cells, e =
											new CKEDITOR.dom.element(e.insertRow(-1), b.document), h = 0, n = d.length; h < n; h++) e.append((new CKEDITOR.dom.element(d[h], b.document)).clone(!1, !1)).appendBogus();
									c.moveToElementEditStart(e)
								}
								c.select(!0);
								return !0
							}
						}
						return !1
					}
				}
			}
			var e = {
					editorFocus: !1,
					modes: {
						wysiwyg: 1,
						source: 1
					}
				},
				b = {
					exec: function (a) {
						a.container.focusNext(!0, a.tabIndex)
					}
				},
				c = {
					exec: function (a) {
						a.container.focusPrevious(!0, a.tabIndex)
					}
				};
			CKEDITOR.plugins.add("tab", {
				init: function (g) {
					for (var l = !1 !== g.config.enableTabKeyTools, k = g.config.tabSpaces || 0,
							f = ""; k--;) f += " ";
					if (f) g.on("key", function (a) {
						9 == a.data.keyCode && (g.insertText(f), a.cancel())
					});
					if (l) g.on("key", function (a) {
						(9 == a.data.keyCode && g.execCommand("selectNextCell") || a.data.keyCode == CKEDITOR.SHIFT + 9 && g.execCommand("selectPreviousCell")) && a.cancel()
					});
					g.addCommand("blur", CKEDITOR.tools.extend(b, e));
					g.addCommand("blurBack", CKEDITOR.tools.extend(c, e));
					g.addCommand("selectNextCell", a());
					g.addCommand("selectPreviousCell", a(!0))
				}
			})
		}(), CKEDITOR.dom.element.prototype.focusNext = function (a, e) {
			var b =
				void 0 === e ? this.getTabIndex() : e,
				c, g, l, k, f, d;
			if (0 >= b)
				for (f = this.getNextSourceNode(a, CKEDITOR.NODE_ELEMENT); f;) {
					if (f.isVisible() && 0 === f.getTabIndex()) {
						l = f;
						break
					}
					f = f.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT)
				} else
					for (f = this.getDocument().getBody().getFirst(); f = f.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
						if (!c)
							if (!g && f.equals(this)) {
								if (g = !0, a) {
									if (!(f = f.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break;
									c = 1
								}
							} else g && !this.contains(f) && (c = 1);
						if (f.isVisible() && !(0 > (d = f.getTabIndex()))) {
							if (c && d == b) {
								l =
									f;
								break
							}
							d > b && (!l || !k || d < k) ? (l = f, k = d) : l || 0 !== d || (l = f, k = d)
						}
					}
			l && l.focus()
		}, CKEDITOR.dom.element.prototype.focusPrevious = function (a, e) {
			for (var b = void 0 === e ? this.getTabIndex() : e, c, g, l, k = 0, f, d = this.getDocument().getBody().getLast(); d = d.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
				if (!c)
					if (!g && d.equals(this)) {
						if (g = !0, a) {
							if (!(d = d.getPreviousSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break;
							c = 1
						}
					} else g && !this.contains(d) && (c = 1);
				if (d.isVisible() && !(0 > (f = d.getTabIndex())))
					if (0 >= b) {
						if (c && 0 === f) {
							l = d;
							break
						}
						f > k &&
							(l = d, k = f)
					} else {
						if (c && f == b) {
							l = d;
							break
						}
						f < b && (!l || f > k) && (l = d, k = f)
					}
			}
			l && l.focus()
		}, CKEDITOR.plugins.add("table", {
			requires: "dialog",
			init: function (a) {
				function e(a) {
					return CKEDITOR.tools.extend(a || {}, {
						contextSensitive: 1,
						refresh: function (a, b) {
							this.setState(b.contains("table", 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
						}
					})
				}
				if (!a.blockless) {
					var b = a.lang.table;
					a.addCommand("table", new CKEDITOR.dialogCommand("table", {
						context: "table",
						allowedContent: "table{width,height}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];" +
							(a.plugins.dialogadvtab ? "table" + a.plugins.dialogadvtab.allowedContent() : ""),
						requiredContent: "table",
						contentTransformations: [
							["table{width}: sizeToStyle", "table[width]: sizeToAttribute"],
							["td: splitBorderShorthand"],
							[{
								element: "table",
								right: function (a) {
									if (a.styles) {
										var b;
										if (a.styles.border) b = CKEDITOR.tools.style.parse.border(a.styles.border);
										else if (CKEDITOR.env.ie && 8 === CKEDITOR.env.version) {
											var e = a.styles;
											e["border-left"] && e["border-left"] === e["border-right"] && e["border-right"] === e["border-top"] &&
												e["border-top"] === e["border-bottom"] && (b = CKEDITOR.tools.style.parse.border(e["border-top"]))
										}
										b && b.style && "solid" === b.style && b.width && 0 !== parseFloat(b.width) && (a.attributes.border = 1);
										"collapse" == a.styles["border-collapse"] && (a.attributes.cellspacing = 0)
									}
								}
							}]
						]
					}));
					a.addCommand("tableProperties", new CKEDITOR.dialogCommand("tableProperties", e()));
					a.addCommand("tableDelete", e({
						exec: function (a) {
							var b = a.elementPath().contains("table", 1);
							if (b) {
								var e = b.getParent(),
									k = a.editable();
								1 != e.getChildCount() || e.is("td",
									"th") || e.equals(k) || (b = e);
								a = a.createRange();
								a.moveToPosition(b, CKEDITOR.POSITION_BEFORE_START);
								b.remove();
								a.select()
							}
						}
					}));
					a.ui.addButton && a.ui.addButton("Table", {
						label: b.toolbar,
						command: "table",
						toolbar: "insert,30"
					});
					CKEDITOR.dialog.add("table", this.path + "dialogs/table.js");
					CKEDITOR.dialog.add("tableProperties", this.path + "dialogs/table.js");
					a.addMenuItems && a.addMenuItems({
						table: {
							label: b.menu,
							command: "tableProperties",
							group: "table",
							order: 5
						},
						tabledelete: {
							label: b.deleteTable,
							command: "tableDelete",
							group: "table",
							order: 1
						}
					});
					a.on("doubleclick", function (a) {
						a.data.element.is("table") && (a.data.dialog = "tableProperties")
					});
					a.contextMenu && a.contextMenu.addListener(function () {
						return {
							tabledelete: CKEDITOR.TRISTATE_OFF,
							table: CKEDITOR.TRISTATE_OFF
						}
					})
				}
			}
		}),
		function () {
			function a(a, b) {
				function c(a) {
					return b ? b.contains(a) && a.getAscendant("table", !0).equals(b) : !0
				}

				function d(a) {
					0 < f.length || a.type != CKEDITOR.NODE_ELEMENT || !y.test(a.getName()) || a.getCustomData("selected_cell") || (CKEDITOR.dom.element.setMarker(e, a, "selected_cell", !0), f.push(a))
				}
				var f = [],
					e = {};
				if (!a) return f;
				for (var h = a.getRanges(), g = 0; g < h.length; g++) {
					var k = h[g];
					if (k.collapsed)(k = k.getCommonAncestor().getAscendant({
						td: 1,
						th: 1
					}, !0)) && c(k) && f.push(k);
					else {
						var k = new CKEDITOR.dom.walker(k),
							l;
						for (k.guard = d; l = k.next();) l.type == CKEDITOR.NODE_ELEMENT && l.is(CKEDITOR.dtd.table) || (l = l.getAscendant({
							td: 1,
							th: 1
						}, !0)) && !l.getCustomData("selected_cell") && c(l) && (CKEDITOR.dom.element.setMarker(e, l, "selected_cell", !0), f.push(l))
					}
				}
				CKEDITOR.dom.element.clearAllMarkers(e);
				return f
			}

			function e(b, c) {
				for (var d = u(b) ? b : a(b), f = d[0], e = f.getAscendant("table"), f = f.getDocument(), h = d[0].getParent(), g = h.$.rowIndex, d = d[d.length - 1], k = d.getParent().$.rowIndex + d.$.rowSpan - 1, d = new CKEDITOR.dom.element(e.$.rows[k]), g = c ? g : k, h = c ? h : d, d = CKEDITOR.tools.buildTableMap(e), e = d[g], g = c ? d[g - 1] : d[g + 1], d = d[0].length, f = f.createElement("tr"), k = 0; e[k] && k < d; k++) {
					var l;
					1 < e[k].rowSpan && g && e[k] == g[k] ? (l = e[k], l.rowSpan += 1) : (l = (new CKEDITOR.dom.element(e[k])).clone(), l.removeAttribute("rowSpan"), l.appendBogus(), f.append(l),
						l = l.$);
					k += l.colSpan - 1
				}
				c ? f.insertBefore(h) : f.insertAfter(h);
				return f
			}

			function b(c) {
				if (c instanceof CKEDITOR.dom.selection) {
					var d = c.getRanges(),
						f = a(c),
						e = f[0].getAscendant("table"),
						h = CKEDITOR.tools.buildTableMap(e),
						g = f[0].getParent().$.rowIndex,
						f = f[f.length - 1],
						k = f.getParent().$.rowIndex + f.$.rowSpan - 1,
						f = [];
					c.reset();
					for (c = g; c <= k; c++) {
						for (var l = h[c], m = new CKEDITOR.dom.element(e.$.rows[c]), n = 0; n < l.length; n++) {
							var p = new CKEDITOR.dom.element(l[n]),
								q = p.getParent().$.rowIndex;
							1 == p.$.rowSpan ? p.remove() : (--p.$.rowSpan,
								q == c && (q = h[c + 1], q[n - 1] ? p.insertAfter(new CKEDITOR.dom.element(q[n - 1])) : (new CKEDITOR.dom.element(e.$.rows[c + 1])).append(p, 1)));
							n += p.$.colSpan - 1
						}
						f.push(m)
					}
					h = e.$.rows;
					d[0].moveToPosition(e, CKEDITOR.POSITION_BEFORE_START);
					g = new CKEDITOR.dom.element(h[k + 1] || (0 < g ? h[g - 1] : null) || e.$.parentNode);
					for (c = f.length; 0 <= c; c--) b(f[c]);
					return e.$.parentNode ? g : (d[0].select(), null)
				}
				c instanceof CKEDITOR.dom.element && (e = c.getAscendant("table"), 1 == e.$.rows.length ? e.remove() : c.remove());
				return null
			}

			function c(a) {
				for (var b =
						a.getParent().$.cells, c = 0, d = 0; d < b.length; d++) {
					var f = b[d],
						c = c + f.colSpan;
					if (f == a.$) break
				}
				return c - 1
			}

			function g(a, b) {
				for (var d = b ? Infinity : 0, f = 0; f < a.length; f++) {
					var e = c(a[f]);
					if (b ? e < d : e > d) d = e
				}
				return d
			}

			function l(b, c) {
				for (var d = u(b) ? b : a(b), f = d[0].getAscendant("table"), e = g(d, 1), d = g(d), h = c ? e : d, k = CKEDITOR.tools.buildTableMap(f), f = [], e = [], d = [], l = k.length, m = 0; m < l; m++) f.push(k[m][h]), e.push(c ? k[m][h - 1] : k[m][h + 1]);
				for (m = 0; m < l; m++) f[m] && (1 < f[m].colSpan && e[m] == f[m] ? (k = f[m], k.colSpan += 1) : (h = new CKEDITOR.dom.element(f[m]),
					k = h.clone(), k.removeAttribute("colSpan"), k.appendBogus(), k[c ? "insertBefore" : "insertAfter"].call(k, h), d.push(k), k = k.$), m += k.rowSpan - 1);
				return d
			}

			function k(b) {
				function c(a) {
					var b, d, f;
					b = a.getRanges();
					if (1 !== b.length) return a;
					b = b[0];
					if (b.collapsed || 0 !== b.endOffset) return a;
					d = b.endContainer;
					f = d.getName().toLowerCase();
					if ("td" !== f && "th" !== f) return a;
					for ((f = d.getPrevious()) || (f = d.getParent().getPrevious().getLast()); f.type !== CKEDITOR.NODE_TEXT && "br" !== f.getName().toLowerCase();)
						if (f = f.getLast(), !f) return a;
					b.setEndAt(f, CKEDITOR.POSITION_BEFORE_END);
					return b.select()
				}
				CKEDITOR.env.webkit && !b.isFake && (b = c(b));
				var d = b.getRanges(),
					f = a(b),
					e = f[0],
					h = f[f.length - 1],
					f = e.getAscendant("table"),
					g = CKEDITOR.tools.buildTableMap(f),
					k, l, m = [];
				b.reset();
				var n = 0;
				for (b = g.length; n < b; n++)
					for (var p = 0, q = g[n].length; p < q; p++) void 0 === k && g[n][p] == e.$ && (k = p), g[n][p] == h.$ && (l = p);
				for (n = k; n <= l; n++)
					for (p = 0; p < g.length; p++) h = g[p], e = new CKEDITOR.dom.element(f.$.rows[p]), h = new CKEDITOR.dom.element(h[n]), h.$ && (1 == h.$.colSpan ? h.remove() : --h.$.colSpan,
						p += h.$.rowSpan - 1, e.$.cells.length || m.push(e));
				k = g[0].length - 1 > l ? new CKEDITOR.dom.element(g[0][l + 1]) : k && -1 !== g[0][k - 1].cellIndex ? new CKEDITOR.dom.element(g[0][k - 1]) : new CKEDITOR.dom.element(f.$.parentNode);
				m.length == b && (d[0].moveToPosition(f, CKEDITOR.POSITION_AFTER_END), d[0].select(), f.remove());
				return k
			}

			function f(a, b) {
				var c = a.getStartElement().getAscendant({
					td: 1,
					th: 1
				}, !0);
				if (c) {
					var d = c.clone();
					d.appendBogus();
					b ? d.insertBefore(c) : d.insertAfter(c)
				}
			}

			function d(b) {
				if (b instanceof CKEDITOR.dom.selection) {
					var c =
						b.getRanges(),
						f = a(b),
						e = f[0] && f[0].getAscendant("table"),
						h;
					a: {
						var g = 0;h = f.length - 1;
						for (var k = {}, l, n; l = f[g++];) CKEDITOR.dom.element.setMarker(k, l, "delete_cell", !0);
						for (g = 0; l = f[g++];)
							if ((n = l.getPrevious()) && !n.getCustomData("delete_cell") || (n = l.getNext()) && !n.getCustomData("delete_cell")) {
								CKEDITOR.dom.element.clearAllMarkers(k);
								h = n;
								break a
							}
						CKEDITOR.dom.element.clearAllMarkers(k);g = f[0].getParent();
						(g = g.getPrevious()) ? h = g.getLast() : (g = f[h].getParent(), h = (g = g.getNext()) ? g.getChild(0) : null)
					}
					b.reset();
					for (b =
						f.length - 1; 0 <= b; b--) d(f[b]);
					h ? m(h, !0) : e && (c[0].moveToPosition(e, CKEDITOR.POSITION_BEFORE_START), c[0].select(), e.remove())
				} else b instanceof CKEDITOR.dom.element && (c = b.getParent(), 1 == c.getChildCount() ? c.remove() : b.remove())
			}

			function m(a, b) {
				var c = a.getDocument(),
					d = CKEDITOR.document;
				CKEDITOR.env.ie && 10 == CKEDITOR.env.version && (d.focus(), c.focus());
				c = new CKEDITOR.dom.range(c);
				c["moveToElementEdit" + (b ? "End" : "Start")](a) || (c.selectNodeContents(a), c.collapse(b ? !1 : !0));
				c.select(!0)
			}

			function h(a, b, c) {
				a = a[b];
				if ("undefined" == typeof c) return a;
				for (b = 0; a && b < a.length; b++) {
					if (c.is && a[b] == c.$) return b;
					if (b == c) return new CKEDITOR.dom.element(a[b])
				}
				return c.is ? -1 : null
			}

			function n(b, c, d) {
				var f = a(b),
					e;
				if ((c ? 1 != f.length : 2 > f.length) || (e = b.getCommonAncestor()) && e.type == CKEDITOR.NODE_ELEMENT && e.is("table")) return !1;
				var g;
				b = f[0];
				e = b.getAscendant("table");
				var k = CKEDITOR.tools.buildTableMap(e),
					l = k.length,
					m = k[0].length,
					n = b.getParent().$.rowIndex,
					p = h(k, n, b);
				if (c) {
					var q;
					try {
						var u = parseInt(b.getAttribute("rowspan"), 10) || 1;
						g = parseInt(b.getAttribute("colspan"), 10) || 1;
						q = k["up" == c ? n - u : "down" == c ? n + u : n]["left" == c ? p - g : "right" == c ? p + g : p]
					} catch (y) {
						return !1
					}
					if (!q || b.$ == q) return !1;
					f["up" == c || "left" == c ? "unshift" : "push"](new CKEDITOR.dom.element(q))
				}
				c = b.getDocument();
				var J = n,
					u = q = 0,
					L = !d && new CKEDITOR.dom.documentFragment(c),
					F = 0;
				for (c = 0; c < f.length; c++) {
					g = f[c];
					var S = g.getParent(),
						N = g.getFirst(),
						R = g.$.colSpan,
						K = g.$.rowSpan,
						S = S.$.rowIndex,
						V = h(k, S, g),
						F = F + R * K,
						u = Math.max(u, V - p + R);
					q = Math.max(q, S - n + K);
					d || (R = g, (K = R.getBogus()) && K.remove(),
						R.trim(), g.getChildren().count() && (S == J || !N || N.isBlockBoundary && N.isBlockBoundary({
							br: 1
						}) || (J = L.getLast(CKEDITOR.dom.walker.whitespaces(!0)), !J || J.is && J.is("br") || L.append("br")), g.moveChildren(L)), c ? g.remove() : g.setHtml(""));
					J = S
				}
				if (d) return q * u == F;
				L.moveChildren(b);
				b.appendBogus();
				u >= m ? b.removeAttribute("rowSpan") : b.$.rowSpan = q;
				q >= l ? b.removeAttribute("colSpan") : b.$.colSpan = u;
				d = new CKEDITOR.dom.nodeList(e.$.rows);
				f = d.count();
				for (c = f - 1; 0 <= c; c--) e = d.getItem(c), e.$.cells.length || (e.remove(), f++);
				return b
			}

			function p(b, c) {
				var d = a(b);
				if (1 < d.length) return !1;
				if (c) return !0;
				var d = d[0],
					f = d.getParent(),
					e = f.getAscendant("table"),
					g = CKEDITOR.tools.buildTableMap(e),
					k = f.$.rowIndex,
					l = h(g, k, d),
					m = d.$.rowSpan,
					n;
				if (1 < m) {
					n = Math.ceil(m / 2);
					for (var m = Math.floor(m / 2), f = k + n, e = new CKEDITOR.dom.element(e.$.rows[f]), g = h(g, f), p, f = d.clone(), k = 0; k < g.length; k++)
						if (p = g[k], p.parentNode == e.$ && k > l) {
							f.insertBefore(new CKEDITOR.dom.element(p));
							break
						} else p = null;
					p || e.append(f)
				} else
					for (m = n = 1, e = f.clone(), e.insertAfter(f), e.append(f = d.clone()),
						p = h(g, k), l = 0; l < p.length; l++) p[l].rowSpan++;
				f.appendBogus();
				d.$.rowSpan = n;
				f.$.rowSpan = m;
				1 == n && d.removeAttribute("rowSpan");
				1 == m && f.removeAttribute("rowSpan");
				return f
			}

			function q(b, c) {
				var d = a(b);
				if (1 < d.length) return !1;
				if (c) return !0;
				var d = d[0],
					f = d.getParent(),
					e = f.getAscendant("table"),
					e = CKEDITOR.tools.buildTableMap(e),
					g = h(e, f.$.rowIndex, d),
					k = d.$.colSpan;
				if (1 < k) f = Math.ceil(k / 2), k = Math.floor(k / 2);
				else {
					for (var k = f = 1, l = [], m = 0; m < e.length; m++) {
						var n = e[m];
						l.push(n[g]);
						1 < n[g].rowSpan && (m += n[g].rowSpan - 1)
					}
					for (e =
						0; e < l.length; e++) l[e].colSpan++
				}
				e = d.clone();
				e.insertAfter(d);
				e.appendBogus();
				d.$.colSpan = f;
				e.$.colSpan = k;
				1 == f && d.removeAttribute("colSpan");
				1 == k && e.removeAttribute("colSpan");
				return e
			}
			var y = /^(?:td|th)$/,
				u = CKEDITOR.tools.isArray;
			CKEDITOR.plugins.tabletools = {
				requires: "table,dialog,contextmenu",
				init: function (c) {
					function h(a) {
						return CKEDITOR.tools.extend(a || {}, {
							contextSensitive: 1,
							refresh: function (a, b) {
								this.setState(b.contains({
									td: 1,
									th: 1
								}, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
							}
						})
					}

					function g(a,
						b) {
						var d = c.addCommand(a, b);
						c.addFeature(d)
					}
					var u = c.lang.table,
						y = CKEDITOR.tools.style.parse;
					g("cellProperties", new CKEDITOR.dialogCommand("cellProperties", h({
						allowedContent: "td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]",
						requiredContent: "table",
						contentTransformations: [
							[{
								element: "td",
								left: function (a) {
									return a.styles.background && y.background(a.styles.background).color
								},
								right: function (a) {
									a.styles["background-color"] = y.background(a.styles.background).color
								}
							}, {
								element: "td",
								check: "td{vertical-align}",
								left: function (a) {
									return a.attributes && a.attributes.valign
								},
								right: function (a) {
									a.styles["vertical-align"] = a.attributes.valign;
									delete a.attributes.valign
								}
							}],
							[{
								element: "tr",
								check: "td{height}",
								left: function (a) {
									return a.styles && a.styles.height
								},
								right: function (a) {
									CKEDITOR.tools.array.forEach(a.children, function (b) {
										b.name in {
											td: 1,
											th: 1
										} && (b.attributes["cke-row-height"] = a.styles.height)
									});
									delete a.styles.height
								}
							}],
							[{
								element: "td",
								check: "td{height}",
								left: function (a) {
									return (a =
										a.attributes) && a["cke-row-height"]
								},
								right: function (a) {
									a.styles.height = a.attributes["cke-row-height"];
									delete a.attributes["cke-row-height"]
								}
							}]
						]
					})));
					CKEDITOR.dialog.add("cellProperties", this.path + "dialogs/tableCell.js");
					g("rowDelete", h({
						requiredContent: "table",
						exec: function (a) {
							a = a.getSelection();
							(a = b(a)) && m(a)
						}
					}));
					g("rowInsertBefore", h({
						requiredContent: "table",
						exec: function (b) {
							b = b.getSelection();
							b = a(b);
							e(b, !0)
						}
					}));
					g("rowInsertAfter", h({
						requiredContent: "table",
						exec: function (b) {
							b = b.getSelection();
							b = a(b);
							e(b)
						}
					}));
					g("columnDelete", h({
						requiredContent: "table",
						exec: function (a) {
							a = a.getSelection();
							(a = k(a)) && m(a, !0)
						}
					}));
					g("columnInsertBefore", h({
						requiredContent: "table",
						exec: function (b) {
							b = b.getSelection();
							b = a(b);
							l(b, !0)
						}
					}));
					g("columnInsertAfter", h({
						requiredContent: "table",
						exec: function (b) {
							b = b.getSelection();
							b = a(b);
							l(b)
						}
					}));
					g("cellDelete", h({
						requiredContent: "table",
						exec: function (a) {
							a = a.getSelection();
							d(a)
						}
					}));
					g("cellMerge", h({
						allowedContent: "td[colspan,rowspan]",
						requiredContent: "td[colspan,rowspan]",
						exec: function (a,
							b) {
							b.cell = n(a.getSelection());
							m(b.cell, !0)
						}
					}));
					g("cellMergeRight", h({
						allowedContent: "td[colspan]",
						requiredContent: "td[colspan]",
						exec: function (a, b) {
							b.cell = n(a.getSelection(), "right");
							m(b.cell, !0)
						}
					}));
					g("cellMergeDown", h({
						allowedContent: "td[rowspan]",
						requiredContent: "td[rowspan]",
						exec: function (a, b) {
							b.cell = n(a.getSelection(), "down");
							m(b.cell, !0)
						}
					}));
					g("cellVerticalSplit", h({
						allowedContent: "td[rowspan]",
						requiredContent: "td[rowspan]",
						exec: function (a) {
							m(q(a.getSelection()))
						}
					}));
					g("cellHorizontalSplit",
						h({
							allowedContent: "td[colspan]",
							requiredContent: "td[colspan]",
							exec: function (a) {
								m(p(a.getSelection()))
							}
						}));
					g("cellInsertBefore", h({
						requiredContent: "table",
						exec: function (a) {
							a = a.getSelection();
							f(a, !0)
						}
					}));
					g("cellInsertAfter", h({
						requiredContent: "table",
						exec: function (a) {
							a = a.getSelection();
							f(a)
						}
					}));
					c.addMenuItems && c.addMenuItems({
						tablecell: {
							label: u.cell.menu,
							group: "tablecell",
							order: 1,
							getItems: function () {
								var b = c.getSelection(),
									d = a(b);
								return {
									tablecell_insertBefore: CKEDITOR.TRISTATE_OFF,
									tablecell_insertAfter: CKEDITOR.TRISTATE_OFF,
									tablecell_delete: CKEDITOR.TRISTATE_OFF,
									tablecell_merge: n(b, null, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
									tablecell_merge_right: n(b, "right", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
									tablecell_merge_down: n(b, "down", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
									tablecell_split_vertical: q(b, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
									tablecell_split_horizontal: p(b, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
									tablecell_properties: 0 < d.length ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
								}
							}
						},
						tablecell_insertBefore: {
							label: u.cell.insertBefore,
							group: "tablecell",
							command: "cellInsertBefore",
							order: 5
						},
						tablecell_insertAfter: {
							label: u.cell.insertAfter,
							group: "tablecell",
							command: "cellInsertAfter",
							order: 10
						},
						tablecell_delete: {
							label: u.cell.deleteCell,
							group: "tablecell",
							command: "cellDelete",
							order: 15
						},
						tablecell_merge: {
							label: u.cell.merge,
							group: "tablecell",
							command: "cellMerge",
							order: 16
						},
						tablecell_merge_right: {
							label: u.cell.mergeRight,
							group: "tablecell",
							command: "cellMergeRight",
							order: 17
						},
						tablecell_merge_down: {
							label: u.cell.mergeDown,
							group: "tablecell",
							command: "cellMergeDown",
							order: 18
						},
						tablecell_split_horizontal: {
							label: u.cell.splitHorizontal,
							group: "tablecell",
							command: "cellHorizontalSplit",
							order: 19
						},
						tablecell_split_vertical: {
							label: u.cell.splitVertical,
							group: "tablecell",
							command: "cellVerticalSplit",
							order: 20
						},
						tablecell_properties: {
							label: u.cell.title,
							group: "tablecellproperties",
							command: "cellProperties",
							order: 21
						},
						tablerow: {
							label: u.row.menu,
							group: "tablerow",
							order: 1,
							getItems: function () {
								return {
									tablerow_insertBefore: CKEDITOR.TRISTATE_OFF,
									tablerow_insertAfter: CKEDITOR.TRISTATE_OFF,
									tablerow_delete: CKEDITOR.TRISTATE_OFF
								}
							}
						},
						tablerow_insertBefore: {
							label: u.row.insertBefore,
							group: "tablerow",
							command: "rowInsertBefore",
							order: 5
						},
						tablerow_insertAfter: {
							label: u.row.insertAfter,
							group: "tablerow",
							command: "rowInsertAfter",
							order: 10
						},
						tablerow_delete: {
							label: u.row.deleteRow,
							group: "tablerow",
							command: "rowDelete",
							order: 15
						},
						tablecolumn: {
							label: u.column.menu,
							group: "tablecolumn",
							order: 1,
							getItems: function () {
								return {
									tablecolumn_insertBefore: CKEDITOR.TRISTATE_OFF,
									tablecolumn_insertAfter: CKEDITOR.TRISTATE_OFF,
									tablecolumn_delete: CKEDITOR.TRISTATE_OFF
								}
							}
						},
						tablecolumn_insertBefore: {
							label: u.column.insertBefore,
							group: "tablecolumn",
							command: "columnInsertBefore",
							order: 5
						},
						tablecolumn_insertAfter: {
							label: u.column.insertAfter,
							group: "tablecolumn",
							command: "columnInsertAfter",
							order: 10
						},
						tablecolumn_delete: {
							label: u.column.deleteColumn,
							group: "tablecolumn",
							command: "columnDelete",
							order: 15
						}
					});
					c.contextMenu && c.contextMenu.addListener(function (a, b, c) {
						return (a = c.contains({
								td: 1,
								th: 1
							},
							1)) && !a.isReadOnly() ? {
							tablecell: CKEDITOR.TRISTATE_OFF,
							tablerow: CKEDITOR.TRISTATE_OFF,
							tablecolumn: CKEDITOR.TRISTATE_OFF
						} : null
					})
				},
				getCellColIndex: c,
				insertRow: e,
				insertColumn: l,
				getSelectedCells: a
			};
			CKEDITOR.plugins.add("tabletools", CKEDITOR.plugins.tabletools)
		}(), CKEDITOR.tools.buildTableMap = function (a, e, b, c, g) {
			a = a.$.rows;
			b = b || 0;
			c = "number" === typeof c ? c : a.length - 1;
			g = "number" === typeof g ? g : -1;
			var l = -1,
				k = [];
			for (e = e || 0; e <= c; e++) {
				l++;
				!k[l] && (k[l] = []);
				for (var f = -1, d = b; d <= (-1 === g ? a[e].cells.length - 1 : g); d++) {
					var m =
						a[e].cells[d];
					if (!m) break;
					for (f++; k[l][f];) f++;
					for (var h = isNaN(m.colSpan) ? 1 : m.colSpan, m = isNaN(m.rowSpan) ? 1 : m.rowSpan, n = 0; n < m && !(e + n > c); n++) {
						k[l + n] || (k[l + n] = []);
						for (var p = 0; p < h; p++) k[l + n][f + p] = a[e].cells[d]
					}
					f += h - 1;
					if (-1 !== g && f >= g) break
				}
			}
			return k
		},
		function () {
			function a(a) {
				return CKEDITOR.plugins.widget && CKEDITOR.plugins.widget.isDomWidget(a)
			}

			function e(a, b) {
				var c = a.getAscendant("table"),
					d = b.getAscendant("table"),
					f = CKEDITOR.tools.buildTableMap(c),
					e = m(a),
					h = m(b),
					g = [],
					k = {},
					l, n;
				c.contains(d) && (b = b.getAscendant({
					td: 1,
					th: 1
				}), h = m(b));
				e > h && (c = e, e = h, h = c, c = a, a = b, b = c);
				for (c = 0; c < f[e].length; c++)
					if (a.$ === f[e][c]) {
						l = c;
						break
					}
				for (c = 0; c < f[h].length; c++)
					if (b.$ === f[h][c]) {
						n = c;
						break
					}
				l > n && (c = l, l = n, n = c);
				for (c = e; c <= h; c++)
					for (e = l; e <= n; e++) d = new CKEDITOR.dom.element(f[c][e]), d.$ && !d.getCustomData("selected_cell") && (g.push(d), CKEDITOR.dom.element.setMarker(k, d, "selected_cell", !0));
				CKEDITOR.dom.element.clearAllMarkers(k);
				return g
			}

			function b(a) {
				if (a) return a = a.clone(), a.enlarge(CKEDITOR.ENLARGE_ELEMENT), (a = a.getEnclosedNode()) && a.is &&
					a.is(CKEDITOR.dtd.$tableContent)
			}

			function c(a) {
				return (a = a.editable().findOne(".cke_table-faked-selection")) && a.getAscendant("table")
			}

			function g(a, b) {
				var c = a.editable().find(".cke_table-faked-selection"),
					d;
				a.fire("lockSnapshot");
				a.editable().removeClass("cke_table-faked-selection-editor");
				for (d = 0; d < c.count(); d++) c.getItem(d).removeClass("cke_table-faked-selection");
				0 < c.count() && c.getItem(0).getAscendant("table").data("cke-table-faked-selection-table", !1);
				a.fire("unlockSnapshot");
				b && (r = {
						active: !1
					},
					a.getSelection().isInTable() && a.getSelection().reset())
			}

			function l(a, b) {
				var c = [],
					d, f;
				for (f = 0; f < b.length; f++) d = a.createRange(), d.setStartBefore(b[f]), d.setEndAfter(b[f]), c.push(d);
				a.getSelection().selectRanges(c)
			}

			function k(a) {
				var b = a.editable().find(".cke_table-faked-selection");
				1 > b.count() || (b = e(b.getItem(0), b.getItem(b.count() - 1)), l(a, b))
			}

			function f(b, c, d) {
				var f = t(b.getSelection(!0));
				c = c.is("table") ? null : c;
				var h;
				(h = r.active && !r.first) && !(h = c) && (h = b.getSelection().getRanges(), h = 1 < f.length || h[0] &&
					!h[0].collapsed ? !0 : !1);
				if (h) r.first = c || f[0], r.dirty = c ? !1 : 1 !== f.length;
				else if (r.active && c && r.first.getAscendant("table").equals(c.getAscendant("table"))) {
					f = e(r.first, c);
					if (!r.dirty && 1 === f.length && !a(d.data.getTarget())) return g(b, "mouseup" === d.name);
					r.dirty = !0;
					r.last = c;
					l(b, f)
				}
			}

			function d(a) {
				var b = (a = a.editor || a.sender.editor) && a.getSelection(),
					c = b && b.getRanges() || [],
					d;
				if (b && (g(a), b.isInTable() && b.isFake)) {
					1 === c.length && c[0]._getTableElement() && c[0]._getTableElement().is("table") && (d = c[0]._getTableElement());
					d = t(b, d);
					a.fire("lockSnapshot");
					for (b = 0; b < d.length; b++) d[b].addClass("cke_table-faked-selection");
					0 < d.length && (a.editable().addClass("cke_table-faked-selection-editor"), d[0].getAscendant("table").data("cke-table-faked-selection-table", ""));
					a.fire("unlockSnapshot")
				}
			}

			function m(a) {
				return a.getAscendant("tr", !0).$.rowIndex
			}

			function h(b) {
				function d(a, b) {
					return a && b ? a.equals(b) || a.contains(b) || b.contains(a) || a.getCommonAncestor(b).is(t) : !1
				}

				function e(a) {
					return !a.getAscendant("table", !0) && a.getDocument().equals(m.document)
				}

				function l(a, b, c, d) {
					if ("mousedown" === a.name && (CKEDITOR.tools.getMouseButton(a) === CKEDITOR.MOUSE_BUTTON_LEFT || !d)) return !0;
					if (b = a.name === (CKEDITOR.env.gecko ? "mousedown" : "mouseup") && !e(a.data.getTarget())) a = a.data.getTarget().getAscendant({
						td: 1,
						th: 1
					}, !0), b = !(a && a.hasClass("cke_table-faked-selection"));
					return b
				}
				if (b.data.getTarget().getName && ("mouseup" === b.name || !a(b.data.getTarget()))) {
					var m = b.editor || b.listenerData.editor,
						n = m.getSelection(1),
						p = c(m),
						q = b.data.getTarget(),
						u = q && q.getAscendant({
							td: 1,
							th: 1
						}, !0),
						q = q && q.getAscendant("table", !0),
						t = {
							table: 1,
							thead: 1,
							tbody: 1,
							tfoot: 1,
							tr: 1,
							td: 1,
							th: 1
						};
					l(b, n, p, q) && g(m, !0);
					!r.active && "mousedown" === b.name && CKEDITOR.tools.getMouseButton(b) === CKEDITOR.MOUSE_BUTTON_LEFT && q && (r = {
						active: !0
					}, CKEDITOR.document.on("mouseup", h, null, {
						editor: m
					}));
					(u || q) && f(m, u || q, b);
					"mouseup" === b.name && (CKEDITOR.tools.getMouseButton(b) === CKEDITOR.MOUSE_BUTTON_LEFT && (e(b.data.getTarget()) || d(p, q)) && k(m), r = {
						active: !1
					}, CKEDITOR.document.removeListener("mouseup", h))
				}
			}

			function n(a) {
				var b = a.data.getTarget().getAscendant({
					td: 1,
					th: 1
				}, !0);
				b && !b.hasClass("cke_table-faked-selection") && (a.cancel(), a.data.preventDefault())
			}

			function p(a, b) {
				function c(a) {
					a.cancel()
				}
				var d = a.getSelection(),
					f = d.createBookmarks(),
					e = a.document,
					h = a.createRange(),
					g = e.getDocumentElement().$,
					k = CKEDITOR.env.ie && 9 > CKEDITOR.env.version,
					l = a.blockless || CKEDITOR.env.ie ? "span" : "div",
					m, n, p, q;
				e.getById("cke_table_copybin") || (m = e.createElement(l), n = e.createElement(l), n.setAttributes({
					id: "cke_table_copybin",
					"data-cke-temp": "1"
				}), m.setStyles({
					position: "absolute",
					width: "1px",
					height: "1px",
					overflow: "hidden"
				}), m.setStyle("ltr" == a.config.contentsLangDirection ? "left" : "right", "-5000px"), m.setHtml(a.getSelectedHtml(!0)), a.fire("lockSnapshot"), n.append(m), a.editable().append(n), q = a.on("selectionChange", c, null, null, 0), k && (p = g.scrollTop), h.selectNodeContents(m), h.select(), k && (g.scrollTop = p), setTimeout(function () {
					n.remove();
					d.selectBookmarks(f);
					q.removeListener();
					a.fire("unlockSnapshot");
					b && (a.extractSelectedHtml(), a.fire("saveSnapshot"))
				}, 100))
			}

			function q(a) {
				var b = a.editor || a.sender.editor;
				b.getSelection().isInTable() && p(b, "cut" === a.name)
			}

			function y(a) {
				this._reset();
				a && this.setSelectedCells(a)
			}

			function u(a, b, c) {
				a.on("beforeCommandExec", function (c) {
					-1 !== CKEDITOR.tools.array.indexOf(b, c.data.name) && (c.data.selectedCells = t(a.getSelection()))
				});
				a.on("afterCommandExec", function (d) {
					-1 !== CKEDITOR.tools.array.indexOf(b, d.data.name) && c(a, d.data)
				})
			}
			var r = {
					active: !1
				},
				w, t, B, v, z;
			y.prototype = {};
			y.prototype._reset = function () {
				this.cells = {
					first: null,
					last: null,
					all: []
				};
				this.rows = {
					first: null,
					last: null
				}
			};
			y.prototype.setSelectedCells = function (a) {
				this._reset();
				a = a.slice(0);
				this._arraySortByDOMOrder(a);
				this.cells.all = a;
				this.cells.first = a[0];
				this.cells.last = a[a.length - 1];
				this.rows.first = a[0].getAscendant("tr");
				this.rows.last = this.cells.last.getAscendant("tr")
			};
			y.prototype.getTableMap = function () {
				var a = B(this.cells.first),
					b;
				a: {
					b = this.cells.last;
					var c = b.getAscendant("table"),
						d = m(b),
						c = CKEDITOR.tools.buildTableMap(c),
						f;
					for (f = 0; f < c[d].length; f++)
						if ((new CKEDITOR.dom.element(c[d][f])).equals(b)) {
							b = f;
							break a
						}
					b =
					void 0
				}
				return CKEDITOR.tools.buildTableMap(this._getTable(), m(this.rows.first), a, m(this.rows.last), b)
			};
			y.prototype._getTable = function () {
				return this.rows.first.getAscendant("table")
			};
			y.prototype.insertRow = function (a, b, c) {
				if ("undefined" === typeof a) a = 1;
				else if (0 >= a) return;
				for (var d = this.cells.first.$.cellIndex, f = this.cells.last.$.cellIndex, e = c ? [] : this.cells.all, h, g = 0; g < a; g++) h = v(c ? this.cells.all : e, b), h = CKEDITOR.tools.array.filter(h.find("td, th").toArray(), function (a) {
					return c ? !0 : a.$.cellIndex >= d && a.$.cellIndex <=
						f
				}), e = b ? h.concat(e) : e.concat(h);
				this.setSelectedCells(e)
			};
			y.prototype.insertColumn = function (a) {
				function b(a) {
					a = m(a);
					return a >= f && a <= e
				}
				if ("undefined" === typeof a) a = 1;
				else if (0 >= a) return;
				for (var c = this.cells, d = c.all, f = m(c.first), e = m(c.last), c = 0; c < a; c++) d = d.concat(CKEDITOR.tools.array.filter(z(d), b));
				this.setSelectedCells(d)
			};
			y.prototype.emptyCells = function (a) {
				a = a || this.cells.all;
				for (var b = 0; b < a.length; b++) a[b].setHtml("")
			};
			y.prototype._arraySortByDOMOrder = function (a) {
				a.sort(function (a, b) {
					return a.getPosition(b) &
						CKEDITOR.POSITION_PRECEDING ? -1 : 1
				})
			};
			var C = {
				onPaste: function (a) {
					function c(a) {
						return Math.max.apply(null, CKEDITOR.tools.array.map(a, function (a) {
							return a.length
						}, 0))
					}

					function d(a) {
						var b = f.createRange();
						b.selectNodeContents(a);
						b.select()
					}
					var f = a.editor,
						h = f.getSelection(),
						g = t(h),
						k = this.findTableInPastedContent(f, a.data.dataValue),
						m = h.isInTable(!0) && this.isBoundarySelection(h),
						n, p;
					!g.length || 1 === g.length && !b(h.getRanges()[0]) && !m || m && !k || (g = g[0].getAscendant("table"), n = new y(t(h, g)), f.once("afterPaste",
						function () {
							var a;
							if (p) {
								a = new CKEDITOR.dom.element(p[0][0]);
								var b = p[p.length - 1];
								a = e(a, new CKEDITOR.dom.element(b[b.length - 1]))
							} else a = n.cells.all;
							l(f, a)
						}), k ? (a.stop(), m ? (n.insertRow(1, 1 === m, !0), h.selectElement(n.rows.first)) : (n.emptyCells(), l(f, n.cells.all)), a = n.getTableMap(), p = CKEDITOR.tools.buildTableMap(k), n.insertRow(p.length - a.length), n.insertColumn(c(p) - c(a)), a = n.getTableMap(), this.pasteTable(n, a, p), f.fire("saveSnapshot"), setTimeout(function () {
						f.fire("afterPaste")
					}, 0)) : (d(n.cells.first), f.once("afterPaste",
						function () {
							f.fire("lockSnapshot");
							n.emptyCells(n.cells.all.slice(1));
							l(f, n.cells.all);
							f.fire("unlockSnapshot")
						})))
				},
				isBoundarySelection: function (a) {
					a = a.getRanges()[0];
					var b = a.endContainer.getAscendant("tr", !0);
					if (b && a.collapsed) {
						if (a.checkBoundaryOfElement(b, CKEDITOR.START)) return 1;
						if (a.checkBoundaryOfElement(b, CKEDITOR.END)) return 2
					}
					return 0
				},
				findTableInPastedContent: function (a, b) {
					var c = a.dataProcessor,
						d = new CKEDITOR.dom.element("body");
					c || (c = new CKEDITOR.htmlDataProcessor(a));
					d.setHtml(c.toHtml(b), {
						fixForBody: !1
					});
					return 1 < d.getChildCount() ? null : d.findOne("table")
				},
				pasteTable: function (a, b, c) {
					var d, f = B(a.cells.first),
						e = a._getTable(),
						h = {},
						g, k, l, m;
					for (l = 0; l < c.length; l++)
						for (g = new CKEDITOR.dom.element(e.$.rows[a.rows.first.$.rowIndex + l]), m = 0; m < c[l].length; m++)
							if (k = new CKEDITOR.dom.element(c[l][m]), d = b[l] && b[l][m] ? new CKEDITOR.dom.element(b[l][m]) : null, k && !k.getCustomData("processed")) {
								if (d && d.getParent()) k.replace(d);
								else if (0 === m || c[l][m - 1])(d = 0 !== m ? new CKEDITOR.dom.element(c[l][m - 1]) : null) &&
									g.equals(d.getParent()) ? k.insertAfter(d) : 0 < f ? g.$.cells[f] ? k.insertAfter(new CKEDITOR.dom.element(g.$.cells[f])) : g.append(k) : g.append(k, !0);
								CKEDITOR.dom.element.setMarker(h, k, "processed", !0)
							} else k.getCustomData("processed") && d && d.remove();
					CKEDITOR.dom.element.clearAllMarkers(h)
				}
			};
			CKEDITOR.plugins.tableselection = {
				getCellsBetween: e,
				keyboardIntegration: function (a) {
					function b(a) {
						var c = a.getEnclosedNode();
						c && "function" === typeof c.is && c.is({
							td: 1,
							th: 1
						}) ? c.setText("") : a.deleteContents();
						CKEDITOR.tools.array.forEach(a._find("td"),
							function (a) {
								a.appendBogus()
							})
					}
					var c = a.editable();
					c.attachListener(c, "keydown", function (a) {
						function c(b, d) {
							if (!d.length) return null;
							var e = a.createRange(),
								h = CKEDITOR.dom.range.mergeRanges(d);
							CKEDITOR.tools.array.forEach(h, function (a) {
								a.enlarge(CKEDITOR.ENLARGE_ELEMENT)
							});
							var g = h[0].getBoundaryNodes(),
								k = g.startNode,
								g = g.endNode;
							if (k && k.is && k.is(f)) {
								for (var l = k.getAscendant("table", !0), m = k.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, l), n = !1, p = function (a) {
										return !k.contains(a) && a.is && a.is("td", "th")
									}; m &&
									!p(m);) m = m.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, l);
								!m && g && g.is && !g.is("table") && g.getNext() && (m = g.getNext().findOne("td, th"), n = !0);
								if (m) e["moveToElementEdit" + (n ? "Start" : "End")](m);
								else e.setStartBefore(k.getAscendant("table", !0)), e.collapse(!0);
								h[0].deleteContents();
								return [e]
							}
							if (k) return e.moveToElementEditablePosition(k), [e]
						}
						var d = {
								37: 1,
								38: 1,
								39: 1,
								40: 1,
								8: 1,
								46: 1,
								13: 1
							},
							f = CKEDITOR.tools.extend({
								table: 1
							}, CKEDITOR.dtd.$tableContent);
						delete f.td;
						delete f.th;
						return function (f) {
							var e = f.data.getKey(),
								h = f.data.getKeystroke(),
								g, k = 37 === e || 38 == e,
								l, m, n;
							if (d[e] && !a.readOnly && (g = a.getSelection()) && g.isInTable() && g.isFake) {
								l = g.getRanges();
								m = l[0]._getTableElement();
								n = l[l.length - 1]._getTableElement();
								if (13 !== e || a.plugins.enterkey) f.data.preventDefault(), f.cancel();
								if (36 < e && 41 > e) l[0].moveToElementEditablePosition(k ? m : n, !k), g.selectRanges([l[0]]);
								else if (13 !== e || 13 === h || h === CKEDITOR.SHIFT + 13) {
									for (f = 0; f < l.length; f++) b(l[f]);
									(f = c(m, l)) ? l = f: l[0].moveToElementEditablePosition(m);
									g.selectRanges(l);
									13 === e && a.plugins.enterkey ?
										(a.fire("lockSnapshot"), 13 === h ? a.execCommand("enter") : a.execCommand("shiftEnter"), a.fire("unlockSnapshot"), a.fire("saveSnapshot")) : 13 !== e && a.fire("saveSnapshot")
								}
							}
						}
					}(a), null, null, -1);
					c.attachListener(c, "keypress", function (c) {
						var d = a.getSelection(),
							f = c.data.$.charCode || 13 === c.data.getKey(),
							e;
						if (!a.readOnly && d && d.isInTable() && d.isFake && f && !(c.data.getKeystroke() & CKEDITOR.CTRL)) {
							c = d.getRanges();
							f = c[0].getEnclosedNode().getAscendant({
								td: 1,
								th: 1
							}, !0);
							for (e = 0; e < c.length; e++) b(c[e]);
							f && (c[0].moveToElementEditablePosition(f),
								d.selectRanges([c[0]]))
						}
					}, null, null, -1)
				},
				isSupportedEnvironment: !(CKEDITOR.env.ie && 11 > CKEDITOR.env.version)
			};
			CKEDITOR.plugins.add("tableselection", {
				requires: "clipboard,tabletools",
				onLoad: function () {
					w = CKEDITOR.plugins.tabletools;
					t = w.getSelectedCells;
					B = w.getCellColIndex;
					v = w.insertRow;
					z = w.insertColumn;
					CKEDITOR.document.appendStyleSheet(this.path + "styles/tableselection.css")
				},
				init: function (a) {
					CKEDITOR.plugins.tableselection.isSupportedEnvironment && (a.addContentsCss && a.addContentsCss(this.path + "styles/tableselection.css"),
						a.on("contentDom", function () {
							var b = a.editable(),
								c = b.isInline() ? b : a.document,
								f = {
									editor: a
								};
							b.attachListener(c, "mousedown", h, null, f);
							b.attachListener(c, "mousemove", h, null, f);
							b.attachListener(c, "mouseup", h, null, f);
							b.attachListener(b, "dragstart", n);
							b.attachListener(a, "selectionCheck", d);
							CKEDITOR.plugins.tableselection.keyboardIntegration(a);
							CKEDITOR.plugins.clipboard && !CKEDITOR.plugins.clipboard.isCustomCopyCutSupported && (b.attachListener(b, "cut", q), b.attachListener(b, "copy", q))
						}), a.on("paste", C.onPaste,
							C), u(a, "rowInsertBefore rowInsertAfter columnInsertBefore columnInsertAfter cellInsertBefore cellInsertAfter".split(" "), function (a, b) {
							l(a, b.selectedCells)
						}), u(a, ["cellMerge", "cellMergeRight", "cellMergeDown"], function (a, b) {
							l(a, [b.commandData.cell])
						}), u(a, ["cellDelete"], function (a) {
							g(a, !0)
						}))
				}
			})
		}(),
		function () {
			CKEDITOR.plugins.add("templates", {
				requires: "dialog",
				init: function (a) {
					CKEDITOR.dialog.add("templates", CKEDITOR.getUrl(this.path + "dialogs/templates.js"));
					a.addCommand("templates", new CKEDITOR.dialogCommand("templates"));
					a.ui.addButton && a.ui.addButton("Templates", {
						label: a.lang.templates.button,
						command: "templates",
						toolbar: "doctools,10"
					})
				}
			});
			var a = {},
				e = {};
			CKEDITOR.addTemplates = function (b, c) {
				a[b] = c
			};
			CKEDITOR.getTemplates = function (b) {
				return a[b]
			};
			CKEDITOR.loadTemplates = function (a, c) {
				for (var g = [], l = 0, k = a.length; l < k; l++) e[a[l]] || (g.push(a[l]), e[a[l]] = 1);
				g.length ? CKEDITOR.scriptLoader.load(g, c) : setTimeout(c, 0)
			}
		}(), CKEDITOR.config.templates_files = [CKEDITOR.getUrl("plugins/templates/templates/default.js")], CKEDITOR.config.templates_replaceContent = !0, "use strict",
		function () {
			var a = [CKEDITOR.CTRL + 90, CKEDITOR.CTRL + 89, CKEDITOR.CTRL + CKEDITOR.SHIFT + 90],
				e = {
					8: 1,
					46: 1
				};
			CKEDITOR.plugins.add("undo", {
				init: function (c) {
					function d(a) {
						h.enabled && !1 !== a.data.command.canUndo && h.save()
					}

					function e() {
						h.enabled = c.readOnly ? !1 : "wysiwyg" == c.mode;
						h.onChange()
					}
					var h = c.undoManager = new b(c),
						g = h.editingHandler = new l(h),
						k = c.addCommand("undo", {
							exec: function () {
								h.undo() && (c.selectionChange(), this.fire("afterUndo"))
							},
							startDisabled: !0,
							canUndo: !1
						}),
						q = c.addCommand("redo", {
							exec: function () {
								h.redo() &&
									(c.selectionChange(), this.fire("afterRedo"))
							},
							startDisabled: !0,
							canUndo: !1
						});
					c.setKeystroke([
						[a[0], "undo"],
						[a[1], "redo"],
						[a[2], "redo"]
					]);
					h.onChange = function () {
						k.setState(h.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
						q.setState(h.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
					};
					c.on("beforeCommandExec", d);
					c.on("afterCommandExec", d);
					c.on("saveSnapshot", function (a) {
						h.save(a.data && a.data.contentOnly)
					});
					c.on("contentDom", g.attachListeners, g);
					c.on("instanceReady", function () {
						c.fire("saveSnapshot")
					});
					c.on("beforeModeUnload", function () {
						"wysiwyg" == c.mode && h.save(!0)
					});
					c.on("mode", e);
					c.on("readOnly", e);
					c.ui.addButton && (c.ui.addButton("Undo", {
						label: c.lang.undo.undo,
						command: "undo",
						toolbar: "undo,10"
					}), c.ui.addButton("Redo", {
						label: c.lang.undo.redo,
						command: "redo",
						toolbar: "undo,20"
					}));
					c.resetUndo = function () {
						h.reset();
						c.fire("saveSnapshot")
					};
					c.on("updateSnapshot", function () {
						h.currentImage && h.update()
					});
					c.on("lockSnapshot", function (a) {
						a = a.data;
						h.lock(a && a.dontUpdate, a && a.forceUpdate)
					});
					c.on("unlockSnapshot",
						h.unlock, h)
				}
			});
			CKEDITOR.plugins.undo = {};
			var b = CKEDITOR.plugins.undo.UndoManager = function (a) {
				this.strokesRecorded = [0, 0];
				this.locked = null;
				this.previousKeyGroup = -1;
				this.limit = a.config.undoStackSize || 20;
				this.strokesLimit = 25;
				this.editor = a;
				this.reset()
			};
			b.prototype = {
				type: function (a, c) {
					var e = b.getKeyGroup(a),
						h = this.strokesRecorded[e] + 1;
					c = c || h >= this.strokesLimit;
					this.typing || (this.hasUndo = this.typing = !0, this.hasRedo = !1, this.onChange());
					c ? (h = 0, this.editor.fire("saveSnapshot")) : this.editor.fire("change");
					this.strokesRecorded[e] =
						h;
					this.previousKeyGroup = e
				},
				keyGroupChanged: function (a) {
					return b.getKeyGroup(a) != this.previousKeyGroup
				},
				reset: function () {
					this.snapshots = [];
					this.index = -1;
					this.currentImage = null;
					this.hasRedo = this.hasUndo = !1;
					this.locked = null;
					this.resetType()
				},
				resetType: function () {
					this.strokesRecorded = [0, 0];
					this.typing = !1;
					this.previousKeyGroup = -1
				},
				refreshState: function () {
					this.hasUndo = !!this.getNextImage(!0);
					this.hasRedo = !!this.getNextImage(!1);
					this.resetType();
					this.onChange()
				},
				save: function (a, b, e) {
					var h = this.editor;
					if (this.locked ||
						"ready" != h.status || "wysiwyg" != h.mode) return !1;
					var g = h.editable();
					if (!g || "ready" != g.status) return !1;
					g = this.snapshots;
					b || (b = new c(h));
					if (!1 === b.contents) return !1;
					if (this.currentImage)
						if (b.equalsContent(this.currentImage)) {
							if (a || b.equalsSelection(this.currentImage)) return !1
						} else !1 !== e && h.fire("change");
					g.splice(this.index + 1, g.length - this.index - 1);
					g.length == this.limit && g.shift();
					this.index = g.push(b) - 1;
					this.currentImage = b;
					!1 !== e && this.refreshState();
					return !0
				},
				restoreImage: function (a) {
					var b = this.editor,
						c;
					a.bookmarks && (b.focus(), c = b.getSelection());
					this.locked = {
						level: 999
					};
					this.editor.loadSnapshot(a.contents);
					a.bookmarks ? c.selectBookmarks(a.bookmarks) : CKEDITOR.env.ie && (c = this.editor.document.getBody().$.createTextRange(), c.collapse(!0), c.select());
					this.locked = null;
					this.index = a.index;
					this.currentImage = this.snapshots[this.index];
					this.update();
					this.refreshState();
					b.fire("change")
				},
				getNextImage: function (a) {
					var b = this.snapshots,
						c = this.currentImage,
						e;
					if (c)
						if (a)
							for (e = this.index - 1; 0 <= e; e--) {
								if (a = b[e], !c.equalsContent(a)) return a.index =
									e, a
							} else
								for (e = this.index + 1; e < b.length; e++)
									if (a = b[e], !c.equalsContent(a)) return a.index = e, a;
					return null
				},
				redoable: function () {
					return this.enabled && this.hasRedo
				},
				undoable: function () {
					return this.enabled && this.hasUndo
				},
				undo: function () {
					if (this.undoable()) {
						this.save(!0);
						var a = this.getNextImage(!0);
						if (a) return this.restoreImage(a), !0
					}
					return !1
				},
				redo: function () {
					if (this.redoable() && (this.save(!0), this.redoable())) {
						var a = this.getNextImage(!1);
						if (a) return this.restoreImage(a), !0
					}
					return !1
				},
				update: function (a) {
					if (!this.locked) {
						a ||
							(a = new c(this.editor));
						for (var b = this.index, e = this.snapshots; 0 < b && this.currentImage.equalsContent(e[b - 1]);) --b;
						e.splice(b, this.index - b + 1, a);
						this.index = b;
						this.currentImage = a
					}
				},
				updateSelection: function (a) {
					if (!this.snapshots.length) return !1;
					var b = this.snapshots,
						c = b[b.length - 1];
					return c.equalsContent(a) && !c.equalsSelection(a) ? (this.currentImage = b[b.length - 1] = a, !0) : !1
				},
				lock: function (a, b) {
					if (this.locked) this.locked.level++;
					else if (a) this.locked = {
						level: 1
					};
					else {
						var e = null;
						if (b) e = !0;
						else {
							var h = new c(this.editor, !0);
							this.currentImage && this.currentImage.equalsContent(h) && (e = h)
						}
						this.locked = {
							update: e,
							level: 1
						}
					}
				},
				unlock: function () {
					if (this.locked && !--this.locked.level) {
						var a = this.locked.update;
						this.locked = null;
						if (!0 === a) this.update();
						else if (a) {
							var b = new c(this.editor, !0);
							a.equalsContent(b) || this.update()
						}
					}
				}
			};
			b.navigationKeyCodes = {
				37: 1,
				38: 1,
				39: 1,
				40: 1,
				36: 1,
				35: 1,
				33: 1,
				34: 1
			};
			b.keyGroups = {
				PRINTABLE: 0,
				FUNCTIONAL: 1
			};
			b.isNavigationKey = function (a) {
				return !!b.navigationKeyCodes[a]
			};
			b.getKeyGroup = function (a) {
				var c = b.keyGroups;
				return e[a] ? c.FUNCTIONAL : c.PRINTABLE
			};
			b.getOppositeKeyGroup = function (a) {
				var c = b.keyGroups;
				return a == c.FUNCTIONAL ? c.PRINTABLE : c.FUNCTIONAL
			};
			b.ieFunctionalKeysBug = function (a) {
				return CKEDITOR.env.ie && b.getKeyGroup(a) == b.keyGroups.FUNCTIONAL
			};
			var c = CKEDITOR.plugins.undo.Image = function (a, b) {
					this.editor = a;
					a.fire("beforeUndoImage");
					var c = a.getSnapshot();
					CKEDITOR.env.ie && c && (c = c.replace(/\s+data-cke-expando=".*?"/g, ""));
					this.contents = c;
					b || (this.bookmarks = (c = c && a.getSelection()) && c.createBookmarks2(!0));
					a.fire("afterUndoImage")
				},
				g = /\b(?:href|src|name)="[^"]*?"/gi;
			c.prototype = {
				equalsContent: function (a) {
					var b = this.contents;
					a = a.contents;
					CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) && (b = b.replace(g, ""), a = a.replace(g, ""));
					return b != a ? !1 : !0
				},
				equalsSelection: function (a) {
					var b = this.bookmarks;
					a = a.bookmarks;
					if (b || a) {
						if (!b || !a || b.length != a.length) return !1;
						for (var c = 0; c < b.length; c++) {
							var e = b[c],
								g = a[c];
							if (e.startOffset != g.startOffset || e.endOffset != g.endOffset || !CKEDITOR.tools.arrayCompare(e.start, g.start) || !CKEDITOR.tools.arrayCompare(e.end,
									g.end)) return !1
						}
					}
					return !0
				}
			};
			var l = CKEDITOR.plugins.undo.NativeEditingHandler = function (a) {
				this.undoManager = a;
				this.ignoreInputEvent = !1;
				this.keyEventsStack = new k;
				this.lastKeydownImage = null
			};
			l.prototype = {
				onKeydown: function (e) {
					var d = e.data.getKey();
					if (229 !== d)
						if (-1 < CKEDITOR.tools.indexOf(a, e.data.getKeystroke())) e.data.preventDefault();
						else if (this.keyEventsStack.cleanUp(e), e = this.undoManager, this.keyEventsStack.getLast(d) || this.keyEventsStack.push(d), this.lastKeydownImage = new c(e.editor), b.isNavigationKey(d) ||
						this.undoManager.keyGroupChanged(d))
						if (e.strokesRecorded[0] || e.strokesRecorded[1]) e.save(!1, this.lastKeydownImage, !1), e.resetType()
				},
				onInput: function () {
					if (this.ignoreInputEvent) this.ignoreInputEvent = !1;
					else {
						var a = this.keyEventsStack.getLast();
						a || (a = this.keyEventsStack.push(0));
						this.keyEventsStack.increment(a.keyCode);
						this.keyEventsStack.getTotalInputs() >= this.undoManager.strokesLimit && (this.undoManager.type(a.keyCode, !0), this.keyEventsStack.resetInputs())
					}
				},
				onKeyup: function (a) {
					var d = this.undoManager;
					a = a.data.getKey();
					var e = this.keyEventsStack.getTotalInputs();
					this.keyEventsStack.remove(a);
					if (!(b.ieFunctionalKeysBug(a) && this.lastKeydownImage && this.lastKeydownImage.equalsContent(new c(d.editor, !0))))
						if (0 < e) d.type(a);
						else if (b.isNavigationKey(a)) this.onNavigationKey(!0)
				},
				onNavigationKey: function (a) {
					var b = this.undoManager;
					!a && b.save(!0, null, !1) || b.updateSelection(new c(b.editor));
					b.resetType()
				},
				ignoreInputEventListener: function () {
					this.ignoreInputEvent = !0
				},
				activateInputEventListener: function () {
					this.ignoreInputEvent = !1
				},
				attachListeners: function () {
					var a = this.undoManager.editor,
						c = a.editable(),
						e = this;
					c.attachListener(c, "keydown", function (a) {
						e.onKeydown(a);
						if (b.ieFunctionalKeysBug(a.data.getKey())) e.onInput()
					}, null, null, 999);
					c.attachListener(c, CKEDITOR.env.ie ? "keypress" : "input", e.onInput, e, null, 999);
					c.attachListener(c, "keyup", e.onKeyup, e, null, 999);
					c.attachListener(c, "paste", e.ignoreInputEventListener, e, null, 999);
					c.attachListener(c, "drop", e.ignoreInputEventListener, e, null, 999);
					a.on("afterPaste", e.activateInputEventListener,
						e, null, 999);
					c.attachListener(c.isInline() ? c : a.document.getDocumentElement(), "click", function () {
						e.onNavigationKey()
					}, null, null, 999);
					c.attachListener(this.undoManager.editor, "blur", function () {
						e.keyEventsStack.remove(9)
					}, null, null, 999)
				}
			};
			var k = CKEDITOR.plugins.undo.KeyEventsStack = function () {
				this.stack = []
			};
			k.prototype = {
				push: function (a) {
					a = this.stack.push({
						keyCode: a,
						inputs: 0
					});
					return this.stack[a - 1]
				},
				getLastIndex: function (a) {
					if ("number" != typeof a) return this.stack.length - 1;
					for (var b = this.stack.length; b--;)
						if (this.stack[b].keyCode ==
							a) return b;
					return -1
				},
				getLast: function (a) {
					a = this.getLastIndex(a);
					return -1 != a ? this.stack[a] : null
				},
				increment: function (a) {
					this.getLast(a).inputs++
				},
				remove: function (a) {
					a = this.getLastIndex(a); - 1 != a && this.stack.splice(a, 1)
				},
				resetInputs: function (a) {
					if ("number" == typeof a) this.getLast(a).inputs = 0;
					else
						for (a = this.stack.length; a--;) this.stack[a].inputs = 0
				},
				getTotalInputs: function () {
					for (var a = this.stack.length, b = 0; a--;) b += this.stack[a].inputs;
					return b
				},
				cleanUp: function (a) {
					a = a.data.$;
					a.ctrlKey || a.metaKey || this.remove(17);
					a.shiftKey || this.remove(16);
					a.altKey || this.remove(18)
				}
			}
		}(), "use strict",
		function () {
			function a(a, b) {
				CKEDITOR.tools.extend(this, {
					editor: a,
					editable: a.editable(),
					doc: a.document,
					win: a.window
				}, b, !0);
				this.inline = this.editable.isInline();
				this.inline || (this.frame = this.win.getFrame());
				this.target = this[this.inline ? "editable" : "doc"]
			}

			function e(a, b) {
				CKEDITOR.tools.extend(this, b, {
					editor: a
				}, !0)
			}

			function b(a, b) {
				var c = a.editable();
				CKEDITOR.tools.extend(this, {
					editor: a,
					editable: c,
					inline: c.isInline(),
					doc: a.document,
					win: a.window,
					container: CKEDITOR.document.getBody(),
					winTop: CKEDITOR.document.getWindow()
				}, b, !0);
				this.hidden = {};
				this.visible = {};
				this.inline || (this.frame = this.win.getFrame());
				this.queryViewport();
				var e = CKEDITOR.tools.bind(this.queryViewport, this),
					f = CKEDITOR.tools.bind(this.hideVisible, this),
					k = CKEDITOR.tools.bind(this.removeAll, this);
				c.attachListener(this.winTop, "resize", e);
				c.attachListener(this.winTop, "scroll", e);
				c.attachListener(this.winTop, "resize", f);
				c.attachListener(this.win, "scroll", f);
				c.attachListener(this.inline ?
					c : this.frame, "mouseout",
					function (a) {
						var b = a.data.$.clientX;
						a = a.data.$.clientY;
						this.queryViewport();
						(b <= this.rect.left || b >= this.rect.right || a <= this.rect.top || a >= this.rect.bottom) && this.hideVisible();
						(0 >= b || b >= this.winTopPane.width || 0 >= a || a >= this.winTopPane.height) && this.hideVisible()
					}, this);
				c.attachListener(a, "resize", e);
				c.attachListener(a, "mode", k);
				a.on("destroy", k);
				this.lineTpl = (new CKEDITOR.template('\x3cdiv data-cke-lineutils-line\x3d"1" class\x3d"cke_reset_all" style\x3d"{lineStyle}"\x3e\x3cspan style\x3d"{tipLeftStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3cspan style\x3d"{tipRightStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3c/div\x3e')).output({
					lineStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},
						l, this.lineStyle, !0)),
					tipLeftStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({}, g, {
						left: "0px",
						"border-left-color": "red",
						"border-width": "6px 0 6px 6px"
					}, this.tipCss, this.tipLeftStyle, !0)),
					tipRightStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({}, g, {
						right: "0px",
						"border-right-color": "red",
						"border-width": "6px 6px 6px 0"
					}, this.tipCss, this.tipRightStyle, !0))
				})
			}

			function c(a) {
				var b;
				if (b = a && a.type == CKEDITOR.NODE_ELEMENT) b = !(k[a.getComputedStyle("float")] || k[a.getAttribute("align")]);
				return b &&
					!f[a.getComputedStyle("position")]
			}
			CKEDITOR.plugins.add("lineutils");
			CKEDITOR.LINEUTILS_BEFORE = 1;
			CKEDITOR.LINEUTILS_AFTER = 2;
			CKEDITOR.LINEUTILS_INSIDE = 4;
			a.prototype = {
				start: function (a) {
					var b = this,
						c = this.editor,
						e = this.doc,
						f, g, k, l, r = CKEDITOR.tools.eventsBuffer(50, function () {
							c.readOnly || "wysiwyg" != c.mode || (b.relations = {}, (g = e.$.elementFromPoint(k, l)) && g.nodeType && (f = new CKEDITOR.dom.element(g), b.traverseSearch(f), isNaN(k + l) || b.pixelSearch(f, k, l), a && a(b.relations, k, l)))
						});
					this.listener = this.editable.attachListener(this.target,
						"mousemove",
						function (a) {
							k = a.data.$.clientX;
							l = a.data.$.clientY;
							r.input()
						});
					this.editable.attachListener(this.inline ? this.editable : this.frame, "mouseout", function () {
						r.reset()
					})
				},
				stop: function () {
					this.listener && this.listener.removeListener()
				},
				getRange: function () {
					var a = {};
					a[CKEDITOR.LINEUTILS_BEFORE] = CKEDITOR.POSITION_BEFORE_START;
					a[CKEDITOR.LINEUTILS_AFTER] = CKEDITOR.POSITION_AFTER_END;
					a[CKEDITOR.LINEUTILS_INSIDE] = CKEDITOR.POSITION_AFTER_START;
					return function (b) {
						var c = this.editor.createRange();
						c.moveToPosition(this.relations[b.uid].element,
							a[b.type]);
						return c
					}
				}(),
				store: function () {
					function a(b, c, d) {
						var e = b.getUniqueId();
						e in d ? d[e].type |= c : d[e] = {
							element: b,
							type: c
						}
					}
					return function (b, e) {
						var f;
						e & CKEDITOR.LINEUTILS_AFTER && c(f = b.getNext()) && f.isVisible() && (a(f, CKEDITOR.LINEUTILS_BEFORE, this.relations), e ^= CKEDITOR.LINEUTILS_AFTER);
						e & CKEDITOR.LINEUTILS_INSIDE && c(f = b.getFirst()) && f.isVisible() && (a(f, CKEDITOR.LINEUTILS_BEFORE, this.relations), e ^= CKEDITOR.LINEUTILS_INSIDE);
						a(b, e, this.relations)
					}
				}(),
				traverseSearch: function (a) {
					var b, e, f;
					do
						if (f = a.$["data-cke-expando"], !(f && f in this.relations)) {
							if (a.equals(this.editable)) break;
							if (c(a))
								for (b in this.lookups)(e = this.lookups[b](a)) && this.store(a, e)
						}
					while ((!a || a.type != CKEDITOR.NODE_ELEMENT || "true" != a.getAttribute("contenteditable")) && (a = a.getParent()))
				},
				pixelSearch: function () {
					function a(d, e, f, g, k) {
						for (var l = 0, r; k(f);) {
							f += g;
							if (25 == ++l) break;
							if (r = this.doc.$.elementFromPoint(e, f))
								if (r == d) l = 0;
								else if (b(d, r) && (l = 0, c(r = new CKEDITOR.dom.element(r)))) return r
						}
					}
					var b = CKEDITOR.env.ie || CKEDITOR.env.webkit ? function (a, b) {
							return a.contains(b)
						} :
						function (a, b) {
							return !!(a.compareDocumentPosition(b) & 16)
						};
					return function (b, e, f) {
						var g = this.win.getViewPaneSize().height,
							k = a.call(this, b.$, e, f, -1, function (a) {
								return 0 < a
							});
						e = a.call(this, b.$, e, f, 1, function (a) {
							return a < g
						});
						if (k)
							for (this.traverseSearch(k); !k.getParent().equals(b);) k = k.getParent();
						if (e)
							for (this.traverseSearch(e); !e.getParent().equals(b);) e = e.getParent();
						for (; k || e;) {
							k && (k = k.getNext(c));
							if (!k || k.equals(e)) break;
							this.traverseSearch(k);
							e && (e = e.getPrevious(c));
							if (!e || e.equals(k)) break;
							this.traverseSearch(e)
						}
					}
				}(),
				greedySearch: function () {
					this.relations = {};
					for (var a = this.editable.getElementsByTag("*"), b = 0, e, f, g; e = a.getItem(b++);)
						if (!e.equals(this.editable) && e.type == CKEDITOR.NODE_ELEMENT && (e.hasAttribute("contenteditable") || !e.isReadOnly()) && c(e) && e.isVisible())
							for (g in this.lookups)(f = this.lookups[g](e)) && this.store(e, f);
					return this.relations
				}
			};
			e.prototype = {
				locate: function () {
					function a(b, d) {
						var e = b.element[d === CKEDITOR.LINEUTILS_BEFORE ? "getPrevious" : "getNext"]();
						return e && c(e) ? (b.siblingRect = e.getClientRect(),
							d == CKEDITOR.LINEUTILS_BEFORE ? (b.siblingRect.bottom + b.elementRect.top) / 2 : (b.elementRect.bottom + b.siblingRect.top) / 2) : d == CKEDITOR.LINEUTILS_BEFORE ? b.elementRect.top : b.elementRect.bottom
					}
					return function (b) {
						var c;
						this.locations = {};
						for (var e in b) c = b[e], c.elementRect = c.element.getClientRect(), c.type & CKEDITOR.LINEUTILS_BEFORE && this.store(e, CKEDITOR.LINEUTILS_BEFORE, a(c, CKEDITOR.LINEUTILS_BEFORE)), c.type & CKEDITOR.LINEUTILS_AFTER && this.store(e, CKEDITOR.LINEUTILS_AFTER, a(c, CKEDITOR.LINEUTILS_AFTER)), c.type &
							CKEDITOR.LINEUTILS_INSIDE && this.store(e, CKEDITOR.LINEUTILS_INSIDE, (c.elementRect.top + c.elementRect.bottom) / 2);
						return this.locations
					}
				}(),
				sort: function () {
					var a, b, c, e;
					return function (f, g) {
						a = this.locations;
						b = [];
						for (var k in a)
							for (var l in a[k])
								if (c = Math.abs(f - a[k][l]), b.length) {
									for (e = 0; e < b.length; e++)
										if (c < b[e].dist) {
											b.splice(e, 0, {
												uid: +k,
												type: l,
												dist: c
											});
											break
										}
									e == b.length && b.push({
										uid: +k,
										type: l,
										dist: c
									})
								} else b.push({
									uid: +k,
									type: l,
									dist: c
								});
						return "undefined" != typeof g ? b.slice(0, g) : b
					}
				}(),
				store: function (a,
					b, c) {
					this.locations[a] || (this.locations[a] = {});
					this.locations[a][b] = c
				}
			};
			var g = {
					display: "block",
					width: "0px",
					height: "0px",
					"border-color": "transparent",
					"border-style": "solid",
					position: "absolute",
					top: "-6px"
				},
				l = {
					height: "0px",
					"border-top": "1px dashed red",
					position: "absolute",
					"z-index": 9999
				};
			b.prototype = {
				removeAll: function () {
					for (var a in this.hidden) this.hidden[a].remove(), delete this.hidden[a];
					for (a in this.visible) this.visible[a].remove(), delete this.visible[a]
				},
				hideLine: function (a) {
					var b = a.getUniqueId();
					a.hide();
					this.hidden[b] = a;
					delete this.visible[b]
				},
				showLine: function (a) {
					var b = a.getUniqueId();
					a.show();
					this.visible[b] = a;
					delete this.hidden[b]
				},
				hideVisible: function () {
					for (var a in this.visible) this.hideLine(this.visible[a])
				},
				placeLine: function (a, b) {
					var c, e, f;
					if (c = this.getStyle(a.uid, a.type)) {
						for (f in this.visible)
							if (this.visible[f].getCustomData("hash") !== this.hash) {
								e = this.visible[f];
								break
							}
						if (!e)
							for (f in this.hidden)
								if (this.hidden[f].getCustomData("hash") !== this.hash) {
									this.showLine(e = this.hidden[f]);
									break
								}
						e || this.showLine(e = this.addLine());
						e.setCustomData("hash", this.hash);
						this.visible[e.getUniqueId()] = e;
						e.setStyles(c);
						b && b(e)
					}
				},
				getStyle: function (a, b) {
					var c = this.relations[a],
						e = this.locations[a][b],
						f = {};
					f.width = c.siblingRect ? Math.max(c.siblingRect.width, c.elementRect.width) : c.elementRect.width;
					f.top = this.inline ? e + this.winTopScroll.y - this.rect.relativeY : this.rect.top + this.winTopScroll.y + e;
					if (f.top - this.winTopScroll.y < this.rect.top || f.top - this.winTopScroll.y > this.rect.bottom) return !1;
					this.inline ?
						f.left = c.elementRect.left - this.rect.relativeX : (0 < c.elementRect.left ? f.left = this.rect.left + c.elementRect.left : (f.width += c.elementRect.left, f.left = this.rect.left), 0 < (c = f.left + f.width - (this.rect.left + this.winPane.width)) && (f.width -= c));
					f.left += this.winTopScroll.x;
					for (var g in f) f[g] = CKEDITOR.tools.cssLength(f[g]);
					return f
				},
				addLine: function () {
					var a = CKEDITOR.dom.element.createFromHtml(this.lineTpl);
					a.appendTo(this.container);
					return a
				},
				prepare: function (a, b) {
					this.relations = a;
					this.locations = b;
					this.hash = Math.random()
				},
				cleanup: function () {
					var a, b;
					for (b in this.visible) a = this.visible[b], a.getCustomData("hash") !== this.hash && this.hideLine(a)
				},
				queryViewport: function () {
					this.winPane = this.win.getViewPaneSize();
					this.winTopScroll = this.winTop.getScrollPosition();
					this.winTopPane = this.winTop.getViewPaneSize();
					this.rect = this.getClientRect(this.inline ? this.editable : this.frame)
				},
				getClientRect: function (a) {
					a = a.getClientRect();
					var b = this.container.getDocumentPosition(),
						c = this.container.getComputedStyle("position");
					a.relativeX = a.relativeY =
						0;
					"static" != c && (a.relativeY = b.y, a.relativeX = b.x, a.top -= a.relativeY, a.bottom -= a.relativeY, a.left -= a.relativeX, a.right -= a.relativeX);
					return a
				}
			};
			var k = {
					left: 1,
					right: 1,
					center: 1
				},
				f = {
					absolute: 1,
					fixed: 1
				};
			CKEDITOR.plugins.lineutils = {
				finder: a,
				locator: e,
				liner: b
			}
		}(),
		function () {
			function a(a) {
				return a.getName && !a.hasAttribute("data-cke-temp")
			}
			CKEDITOR.plugins.add("widgetselection", {
				init: function (a) {
					if (CKEDITOR.env.webkit) {
						var b = CKEDITOR.plugins.widgetselection;
						a.on("contentDom", function (a) {
							a = a.editor;
							var e = a.editable();
							e.attachListener(e, "keydown", function (a) {
								a.data.getKeystroke() == CKEDITOR.CTRL + 65 && CKEDITOR.tools.setTimeout(function () {
									b.addFillers(e) || b.removeFillers(e)
								}, 0)
							}, null, null, -1);
							a.on("selectionCheck", function (a) {
								b.removeFillers(a.editor.editable())
							});
							a.on("paste", function (a) {
								a.data.dataValue = b.cleanPasteData(a.data.dataValue)
							});
							"selectall" in a.plugins && b.addSelectAllIntegration(a)
						})
					}
				}
			});
			CKEDITOR.plugins.widgetselection = {
				startFiller: null,
				endFiller: null,
				fillerAttribute: "data-cke-filler-webkit",
				fillerContent: "\x26nbsp;",
				fillerTagName: "div",
				addFillers: function (e) {
					var b = e.editor;
					if (!this.isWholeContentSelected(e) && 0 < e.getChildCount()) {
						var c = e.getFirst(a),
							g = e.getLast(a);
						c && c.type == CKEDITOR.NODE_ELEMENT && !c.isEditable() && (this.startFiller = this.createFiller(), e.append(this.startFiller, 1));
						g && g.type == CKEDITOR.NODE_ELEMENT && !g.isEditable() && (this.endFiller = this.createFiller(!0), e.append(this.endFiller, 0));
						if (this.hasFiller(e)) return b = b.createRange(), b.selectNodeContents(e), b.select(), !0
					}
					return !1
				},
				removeFillers: function (a) {
					if (this.hasFiller(a) &&
						!this.isWholeContentSelected(a)) {
						var b = a.findOne(this.fillerTagName + "[" + this.fillerAttribute + "\x3dstart]"),
							c = a.findOne(this.fillerTagName + "[" + this.fillerAttribute + "\x3dend]");
						this.startFiller && b && this.startFiller.equals(b) ? this.removeFiller(this.startFiller, a) : this.startFiller = b;
						this.endFiller && c && this.endFiller.equals(c) ? this.removeFiller(this.endFiller, a) : this.endFiller = c
					}
				},
				cleanPasteData: function (a) {
					a && a.length && (a = a.replace(this.createFillerRegex(), "").replace(this.createFillerRegex(!0), ""));
					return a
				},
				isWholeContentSelected: function (a) {
					var b = a.editor.getSelection().getRanges()[0];
					return !b || b && b.collapsed ? !1 : (b = b.clone(), b.enlarge(CKEDITOR.ENLARGE_ELEMENT), !!(b && a && b.startContainer && b.endContainer && 0 === b.startOffset && b.endOffset === a.getChildCount() && b.startContainer.equals(a) && b.endContainer.equals(a)))
				},
				hasFiller: function (a) {
					return 0 < a.find(this.fillerTagName + "[" + this.fillerAttribute + "]").count()
				},
				createFiller: function (a) {
					var b = new CKEDITOR.dom.element(this.fillerTagName);
					b.setHtml(this.fillerContent);
					b.setAttribute(this.fillerAttribute, a ? "end" : "start");
					b.setAttribute("data-cke-temp", 1);
					b.setStyles({
						display: "block",
						width: 0,
						height: 0,
						padding: 0,
						border: 0,
						margin: 0,
						position: "absolute",
						top: 0,
						left: "-9999px",
						opacity: 0,
						overflow: "hidden"
					});
					return b
				},
				removeFiller: function (a, b) {
					if (a) {
						var c = b.editor,
							g = b.editor.getSelection().getRanges()[0].startPath(),
							l = c.createRange(),
							k, f;
						g.contains(a) && (k = a.getHtml(), f = !0);
						g = "start" == a.getAttribute(this.fillerAttribute);
						a.remove();
						k && 0 < k.length && k != this.fillerContent ? (b.insertHtmlIntoRange(k,
							c.getSelection().getRanges()[0]), l.setStartAt(b.getChild(b.getChildCount() - 1), CKEDITOR.POSITION_BEFORE_END), c.getSelection().selectRanges([l])) : f && (g ? l.setStartAt(b.getFirst().getNext(), CKEDITOR.POSITION_AFTER_START) : l.setEndAt(b.getLast().getPrevious(), CKEDITOR.POSITION_BEFORE_END), b.editor.getSelection().selectRanges([l]))
					}
				},
				createFillerRegex: function (a) {
					var b = this.createFiller(a).getOuterHtml().replace(/style="[^"]*"/gi, 'style\x3d"[^"]*"').replace(/>[^<]*</gi, "\x3e[^\x3c]*\x3c");
					return new RegExp((a ?
						"" : "^") + b + (a ? "$" : ""))
				},
				addSelectAllIntegration: function (a) {
					var b = this;
					a.editable().attachListener(a, "beforeCommandExec", function (c) {
						var g = a.editable();
						"selectAll" == c.data.name && g && b.addFillers(g)
					}, null, null, 9999)
				}
			}
		}(), "use strict",
		function () {
			function a(a) {
				this.editor = a;
				this.registered = {};
				this.instances = {};
				this.selected = [];
				this.widgetHoldingFocusedEditable = this.focused = null;
				this._ = {
					nextId: 0,
					upcasts: [],
					upcastCallbacks: [],
					filters: {}
				};
				G(this);
				A(this);
				this.on("checkWidgets", k);
				this.editor.on("contentDomInvalidated",
					this.checkWidgets, this);
				x(this);
				v(this);
				z(this);
				B(this);
				C(this)
			}

			function e(a, b, c, d, f) {
				var g = a.editor;
				CKEDITOR.tools.extend(this, d, {
					editor: g,
					id: b,
					inline: "span" == c.getParent().getName(),
					element: c,
					data: CKEDITOR.tools.extend({}, "function" == typeof d.defaults ? d.defaults() : d.defaults),
					dataReady: !1,
					inited: !1,
					ready: !1,
					edit: e.prototype.edit,
					focusedEditable: null,
					definition: d,
					repository: a,
					draggable: !1 !== d.draggable,
					_: {
						downcastFn: d.downcast && "string" == typeof d.downcast ? d.downcasts[d.downcast] : d.downcast
					}
				}, !0);
				a.fire("instanceCreated", this);
				da(this, d);
				this.init && this.init();
				this.inited = !0;
				(a = this.element.data("cke-widget-data")) && this.setData(JSON.parse(decodeURIComponent(a)));
				f && this.setData(f);
				this.data.classes || this.setData("classes", this.getClasses());
				this.dataReady = !0;
				Q(this);
				this.fire("data", this.data);
				this.isInited() && g.editable().contains(this.wrapper) && (this.ready = !0, this.fire("ready"))
			}

			function b(a, b, c) {
				CKEDITOR.dom.element.call(this, b.$);
				this.editor = a;
				this._ = {};
				b = this.filter = c.filter;
				CKEDITOR.dtd[this.getName()].p ?
					(this.enterMode = b ? b.getAllowedEnterMode(a.enterMode) : a.enterMode, this.shiftEnterMode = b ? b.getAllowedEnterMode(a.shiftEnterMode, !0) : a.shiftEnterMode) : this.enterMode = this.shiftEnterMode = CKEDITOR.ENTER_BR
			}

			function c(a, b) {
				a.addCommand(b.name, {
					exec: function (a, c) {
						function d() {
							a.widgets.finalizeCreation(h)
						}
						var e = a.widgets.focused;
						if (e && e.name == b.name) e.edit();
						else if (b.insert) b.insert({
							editor: a,
							commandData: c
						});
						else if (b.template) {
							var e = "function" == typeof b.defaults ? b.defaults() : b.defaults,
								e = CKEDITOR.dom.element.createFromHtml(b.template.output(e)),
								f, g = a.widgets.wrapElement(e, b.name),
								h = new CKEDITOR.dom.documentFragment(g.getDocument());
							h.append(g);
							(f = a.widgets.initOn(e, b, c && c.startupData)) ? (e = f.once("edit", function (b) {
								if (b.data.dialog) f.once("dialog", function (b) {
									b = b.data;
									var c, e;
									c = b.once("ok", d, null, null, 20);
									e = b.once("cancel", function (b) {
										b.data && !1 === b.data.hide || a.widgets.destroy(f, !0)
									});
									b.once("hide", function () {
										c.removeListener();
										e.removeListener()
									})
								});
								else d()
							}, null, null, 999), f.edit(), e.removeListener()) : d()
						}
					},
					allowedContent: b.allowedContent,
					requiredContent: b.requiredContent,
					contentForms: b.contentForms,
					contentTransformations: b.contentTransformations
				})
			}

			function g(a, b) {
				function c(a, d) {
					var e = b.upcast.split(","),
						f, g;
					for (g = 0; g < e.length; g++)
						if (f = e[g], f === a.name) return b.upcasts[f].call(this, a, d);
					return !1
				}

				function d(b, c, e) {
					var f = CKEDITOR.tools.getIndex(a._.upcasts, function (a) {
						return a[2] > e
					});
					0 > f && (f = a._.upcasts.length);
					a._.upcasts.splice(f, 0, [CKEDITOR.tools.bind(b, c), c.name, e])
				}
				var e = b.upcast,
					f = b.upcastPriority || 10;
				e && ("string" == typeof e ? d(c,
					b, f) : d(e, b, f))
			}

			function l(a, b) {
				a.focused = null;
				if (b.isInited()) {
					var c = b.editor.checkDirty();
					a.fire("widgetBlurred", {
						widget: b
					});
					b.setFocused(!1);
					!c && b.editor.resetDirty()
				}
			}

			function k(a) {
				a = a.data;
				if ("wysiwyg" == this.editor.mode) {
					var b = this.editor.editable(),
						c = this.instances,
						d, f, g, h;
					if (b) {
						for (d in c) c[d].isReady() && !b.contains(c[d].wrapper) && this.destroy(c[d], !0);
						if (a && a.initOnlyNew) c = this.initOnAll();
						else {
							var k = b.find(".cke_widget_wrapper"),
								c = [];
							d = 0;
							for (f = k.count(); d < f; d++) {
								g = k.getItem(d);
								if (h = !this.getByElement(g, !0)) {
									a: {
										h = u;
										for (var l = g; l = l.getParent();)
											if (h(l)) {
												h = !0;
												break a
											}
										h = !1
									}
									h = !h
								}
								h && b.contains(g) && (g.addClass("cke_widget_new"), c.push(this.initOn(g.getFirst(e.isDomWidgetElement))))
							}
						}
						a && a.focusInited && 1 == c.length && c[0].focus()
					}
				}
			}

			function f(a) {
				if ("undefined" != typeof a.attributes && a.attributes["data-widget"]) {
					var b = d(a),
						c = m(a),
						e = !1;
					b && b.value && b.value.match(/^\s/g) && (b.parent.attributes["data-cke-white-space-first"] = 1, b.value = b.value.replace(/^\s/g, "\x26nbsp;"), e = !0);
					c && c.value && c.value.match(/\s$/g) && (c.parent.attributes["data-cke-white-space-last"] =
						1, c.value = c.value.replace(/\s$/g, "\x26nbsp;"), e = !0);
					e && (a.attributes["data-cke-widget-white-space"] = 1)
				}
			}

			function d(a) {
				return a.find(function (a) {
					return 3 === a.type
				}, !0).shift()
			}

			function m(a) {
				return a.find(function (a) {
					return 3 === a.type
				}, !0).pop()
			}

			function h(a, b, c) {
				if (!c.allowedContent && !c.disallowedContent) return null;
				var d = this._.filters[a];
				d || (this._.filters[a] = d = {});
				a = d[b];
				a || (a = c.allowedContent ? new CKEDITOR.filter(c.allowedContent) : this.editor.filter.clone(), d[b] = a, c.disallowedContent && a.disallow(c.disallowedContent));
				return a
			}

			function n(a) {
				var b = [],
					c = a._.upcasts,
					d = a._.upcastCallbacks;
				return {
					toBeWrapped: b,
					iterator: function (a) {
						var f, g, h, k, l;
						if ("data-cke-widget-wrapper" in a.attributes) return (a = a.getFirst(e.isParserWidgetElement)) && b.push([a]), !1;
						if ("data-widget" in a.attributes) return b.push([a]), !1;
						if (l = c.length) {
							if (a.attributes["data-cke-widget-upcasted"]) return !1;
							k = 0;
							for (f = d.length; k < f; ++k)
								if (!1 === d[k](a)) return;
							for (k = 0; k < l; ++k)
								if (f = c[k], h = {}, g = f[0](a, h)) return g instanceof CKEDITOR.htmlParser.element && (a = g), a.attributes["data-cke-widget-data"] =
									encodeURIComponent(JSON.stringify(h)), a.attributes["data-cke-widget-upcasted"] = 1, b.push([a, f[1]]), !1
						}
					}
				}
			}

			function p(a, b) {
				return {
					tabindex: -1,
					contenteditable: "false",
					"data-cke-widget-wrapper": 1,
					"data-cke-filter": "off",
					"class": "cke_widget_wrapper cke_widget_new cke_widget_" + (a ? "inline" : "block") + (b ? " cke_widget_" + b : "")
				}
			}

			function q(a, b, c) {
				if (a.type == CKEDITOR.NODE_ELEMENT) {
					var d = CKEDITOR.dtd[a.name];
					if (d && !d[c.name]) {
						var d = a.split(b),
							e = a.parent;
						b = d.getIndex();
						a.children.length || (--b, a.remove());
						d.children.length ||
							d.remove();
						return q(e, b, c)
					}
				}
				a.add(c, b)
			}

			function y(a, b) {
				return "boolean" == typeof a.inline ? a.inline : !!CKEDITOR.dtd.$inline[b]
			}

			function u(a) {
				return a.hasAttribute("data-cke-temp")
			}

			function r(a, b, c, d) {
				var e = a.editor;
				e.fire("lockSnapshot");
				c ? (d = c.data("cke-widget-editable"), d = b.editables[d], a.widgetHoldingFocusedEditable = b, b.focusedEditable = d, c.addClass("cke_widget_editable_focused"), d.filter && e.setActiveFilter(d.filter), e.setActiveEnterMode(d.enterMode, d.shiftEnterMode)) : (d || b.focusedEditable.removeClass("cke_widget_editable_focused"),
					b.focusedEditable = null, a.widgetHoldingFocusedEditable = null, e.setActiveFilter(null), e.setActiveEnterMode(null, null));
				e.fire("unlockSnapshot")
			}

			function w(a) {
				a.contextMenu && a.contextMenu.addListener(function (b) {
					if (b = a.widgets.getByElement(b, !0)) return b.fire("contextMenu", {})
				})
			}

			function t(a, b) {
				return CKEDITOR.tools.trim(b)
			}

			function B(a) {
				var b = a.editor,
					c = CKEDITOR.plugins.lineutils;
				b.on("dragstart", function (c) {
					var d = c.data.target;
					e.isDomDragHandler(d) && (d = a.getByElement(d), c.data.dataTransfer.setData("cke/widget-id",
						d.id), b.focus(), d.focus())
				});
				b.on("drop", function (c) {
					var d = c.data.dataTransfer,
						e = d.getData("cke/widget-id"),
						f = d.getTransferType(b),
						d = b.createRange();
					"" !== e && f === CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? c.cancel() : "" !== e && f == CKEDITOR.DATA_TRANSFER_INTERNAL && (e = a.instances[e]) && (d.setStartBefore(e.wrapper), d.setEndAfter(e.wrapper), c.data.dragRange = d, delete CKEDITOR.plugins.clipboard.dragStartContainerChildCount, delete CKEDITOR.plugins.clipboard.dragEndContainerChildCount, c.data.dataTransfer.setData("text/html",
						b.editable().getHtmlFromRange(d).getHtml()), b.widgets.destroy(e, !0))
				});
				b.on("contentDom", function () {
					var d = b.editable();
					CKEDITOR.tools.extend(a, {
						finder: new c.finder(b, {
							lookups: {
								"default": function (b) {
									if (!b.is(CKEDITOR.dtd.$listItem) && b.is(CKEDITOR.dtd.$block) && !e.isDomNestedEditable(b) && !a._.draggedWidget.wrapper.contains(b)) {
										var c = e.getNestedEditable(d, b);
										if (c) {
											b = a._.draggedWidget;
											if (a.getByElement(c) == b) return;
											c = CKEDITOR.filter.instances[c.data("cke-filter")];
											b = b.requiredContent;
											if (c && b && !c.check(b)) return
										}
										return CKEDITOR.LINEUTILS_BEFORE |
											CKEDITOR.LINEUTILS_AFTER
									}
								}
							}
						}),
						locator: new c.locator(b),
						liner: new c.liner(b, {
							lineStyle: {
								cursor: "move !important",
								"border-top-color": "#666"
							},
							tipLeftStyle: {
								"border-left-color": "#666"
							},
							tipRightStyle: {
								"border-right-color": "#666"
							}
						})
					}, !0)
				})
			}

			function v(a) {
				var b = a.editor;
				b.on("contentDom", function () {
					var c = b.editable(),
						d = c.isInline() ? c : b.document,
						f, g;
					c.attachListener(d, "mousedown", function (c) {
						var d = c.data.getTarget();
						f = d instanceof CKEDITOR.dom.element ? a.getByElement(d) : null;
						g = 0;
						f && (f.inline && d.type == CKEDITOR.NODE_ELEMENT &&
							d.hasAttribute("data-cke-widget-drag-handler") ? (g = 1, a.focused != f && b.getSelection().removeAllRanges()) : e.getNestedEditable(f.wrapper, d) ? f = null : (c.data.preventDefault(), CKEDITOR.env.ie || f.focus()))
					});
					c.attachListener(d, "mouseup", function () {
						g && f && f.wrapper && (g = 0, f.focus())
					});
					CKEDITOR.env.ie && c.attachListener(d, "mouseup", function () {
						setTimeout(function () {
							f && f.wrapper && c.contains(f.wrapper) && (f.focus(), f = null)
						})
					})
				});
				b.on("doubleclick", function (b) {
					var c = a.getByElement(b.data.element);
					if (c && !e.getNestedEditable(c.wrapper,
							b.data.element)) return c.fire("doubleclick", {
						element: b.data.element
					})
				}, null, null, 1)
			}

			function z(a) {
				a.editor.on("key", function (b) {
					var c = a.focused,
						d = a.widgetHoldingFocusedEditable,
						e;
					c ? e = c.fire("key", {
						keyCode: b.data.keyCode
					}) : d && (c = b.data.keyCode, b = d.focusedEditable, c == CKEDITOR.CTRL + 65 ? (c = b.getBogus(), d = d.editor.createRange(), d.selectNodeContents(b), c && d.setEndAt(c, CKEDITOR.POSITION_BEFORE_START), d.select(), e = !1) : 8 == c || 46 == c ? (e = d.editor.getSelection().getRanges(), d = e[0], e = !(1 == e.length && d.collapsed &&
						d.checkBoundaryOfElement(b, CKEDITOR[8 == c ? "START" : "END"]))) : e = void 0);
					return e
				}, null, null, 1)
			}

			function C(a) {
				function b(c) {
					a.focused && H(a.focused, "cut" == c.name)
				}
				var c = a.editor;
				c.on("contentDom", function () {
					var a = c.editable();
					a.attachListener(a, "copy", b);
					a.attachListener(a, "cut", b)
				})
			}

			function x(a) {
				var b = a.editor;
				b.on("selectionCheck", function () {
					a.fire("checkSelection")
				});
				a.on("checkSelection", a.checkSelection, a);
				b.on("selectionChange", function (c) {
					var d = (c = e.getNestedEditable(b.editable(), c.data.selection.getStartElement())) &&
						a.getByElement(c),
						f = a.widgetHoldingFocusedEditable;
					f ? f === d && f.focusedEditable.equals(c) || (r(a, f, null), d && c && r(a, d, c)) : d && c && r(a, d, c)
				});
				b.on("dataReady", function () {
					E(a).commit()
				});
				b.on("blur", function () {
					var b;
					(b = a.focused) && l(a, b);
					(b = a.widgetHoldingFocusedEditable) && r(a, b, null)
				})
			}

			function A(a) {
				var b = a.editor,
					c = {};
				b.on("toDataFormat", function (b) {
					var f = CKEDITOR.tools.getNextNumber(),
						g = [];
					b.data.downcastingSessionId = f;
					c[f] = g;
					b.data.dataValue.forEach(function (b) {
						var c = b.attributes,
							f;
						if ("data-cke-widget-white-space" in
							c) {
							f = d(b);
							var h = m(b);
							f.parent.attributes["data-cke-white-space-first"] && (f.value = f.value.replace(/^&nbsp;/g, " "));
							h.parent.attributes["data-cke-white-space-last"] && (h.value = h.value.replace(/&nbsp;$/g, " "))
						}
						if ("data-cke-widget-id" in c) {
							if (c = a.instances[c["data-cke-widget-id"]]) f = b.getFirst(e.isParserWidgetElement), g.push({
								wrapper: b,
								element: f,
								widget: c,
								editables: {}
							}), "1" != f.attributes["data-cke-widget-keep-attr"] && delete f.attributes["data-widget"]
						} else if ("data-cke-widget-editable" in c) return g[g.length -
							1].editables[c["data-cke-widget-editable"]] = b, !1
					}, CKEDITOR.NODE_ELEMENT, !0)
				}, null, null, 8);
				b.on("toDataFormat", function (a) {
					if (a.data.downcastingSessionId) {
						a = c[a.data.downcastingSessionId];
						for (var b, d, e, f, g, h; b = a.shift();) {
							d = b.widget;
							e = b.element;
							f = d._.downcastFn && d._.downcastFn.call(d, e);
							for (h in b.editables) g = b.editables[h], delete g.attributes.contenteditable, g.setHtml(d.editables[h].getData());
							f || (f = e);
							b.wrapper.replaceWith(f)
						}
					}
				}, null, null, 13);
				b.on("contentDomUnload", function () {
					a.destroyAll(!0)
				})
			}

			function G(a) {
				var b = a.editor,
					c, d;
				b.on("toHtml", function (b) {
						var d = n(a),
							f;
						for (b.data.dataValue.forEach(d.iterator, CKEDITOR.NODE_ELEMENT, !0); f = d.toBeWrapped.pop();) {
							var g = f[0],
								h = g.parent;
							h.type == CKEDITOR.NODE_ELEMENT && h.attributes["data-cke-widget-wrapper"] && h.replaceWith(g);
							a.wrapElement(f[0], f[1])
						}
						c = b.data.protectedWhitespaces ? 3 == b.data.dataValue.children.length && e.isParserWidgetWrapper(b.data.dataValue.children[1]) : 1 == b.data.dataValue.children.length && e.isParserWidgetWrapper(b.data.dataValue.children[0])
					},
					null, null, 8);
				b.on("dataReady", function () {
					if (d)
						for (var c = b.editable().find(".cke_widget_wrapper"), f, g, h = 0, k = c.count(); h < k; ++h) f = c.getItem(h), g = f.getFirst(e.isDomWidgetElement), g.type == CKEDITOR.NODE_ELEMENT && g.data("widget") ? (g.replace(f), a.wrapElement(g)) : f.remove();
					d = 0;
					a.destroyAll(!0);
					a.initOnAll()
				});
				b.on("loadSnapshot", function (b) {
					/data-cke-widget/.test(b.data) && (d = 1);
					a.destroyAll(!0)
				}, null, null, 9);
				b.on("paste", function (a) {
					a = a.data;
					a.dataValue = a.dataValue.replace(U, t);
					a.range && (a = e.getNestedEditable(b.editable(),
						a.range.startContainer)) && (a = CKEDITOR.filter.instances[a.data("cke-filter")]) && b.setActiveFilter(a)
				});
				b.on("afterInsertHtml", function (d) {
					d.data.intoRange ? a.checkWidgets({
						initOnlyNew: !0
					}) : (b.fire("lockSnapshot"), a.checkWidgets({
						initOnlyNew: !0,
						focusInited: c
					}), b.fire("unlockSnapshot"))
				})
			}

			function E(a) {
				var b = a.selected,
					c = [],
					d = b.slice(0),
					e = null;
				return {
					select: function (a) {
						0 > CKEDITOR.tools.indexOf(b, a) && c.push(a);
						a = CKEDITOR.tools.indexOf(d, a);
						0 <= a && d.splice(a, 1);
						return this
					},
					focus: function (a) {
						e = a;
						return this
					},
					commit: function () {
						var f = a.focused !== e,
							g, h;
						a.editor.fire("lockSnapshot");
						for (f && (g = a.focused) && l(a, g); g = d.pop();) b.splice(CKEDITOR.tools.indexOf(b, g), 1), g.isInited() && (h = g.editor.checkDirty(), g.setSelected(!1), !h && g.editor.resetDirty());
						f && e && (h = a.editor.checkDirty(), a.focused = e, a.fire("widgetFocused", {
							widget: e
						}), e.setFocused(!0), !h && a.editor.resetDirty());
						for (; g = c.pop();) b.push(g), g.setSelected(!0);
						a.editor.fire("unlockSnapshot")
					}
				}
			}

			function D(a, b, c) {
				var d = 0;
				b = J(b);
				var e = a.data.classes || {},
					f;
				if (b) {
					for (e =
						CKEDITOR.tools.clone(e); f = b.pop();) c ? e[f] || (d = e[f] = 1) : e[f] && (delete e[f], d = 1);
					d && a.setData("classes", e)
				}
			}

			function I(a) {
				a.cancel()
			}

			function H(a, b) {
				var c = a.editor,
					d = c.document,
					e = CKEDITOR.env.edge && 16 <= CKEDITOR.env.version;
				if (!d.getById("cke_copybin")) {
					var f = !c.blockless && !CKEDITOR.env.ie || e ? "div" : "span",
						e = d.createElement(f),
						g = d.createElement(f),
						f = CKEDITOR.env.ie && 9 > CKEDITOR.env.version;
					g.setAttributes({
						id: "cke_copybin",
						"data-cke-temp": "1"
					});
					e.setStyles({
						position: "absolute",
						width: "1px",
						height: "1px",
						overflow: "hidden"
					});
					e.setStyle("ltr" == c.config.contentsLangDirection ? "left" : "right", "-5000px");
					var h = c.createRange();
					h.setStartBefore(a.wrapper);
					h.setEndAfter(a.wrapper);
					e.setHtml('\x3cspan data-cke-copybin-start\x3d"1"\x3e​\x3c/span\x3e' + c.editable().getHtmlFromRange(h).getHtml() + '\x3cspan data-cke-copybin-end\x3d"1"\x3e​\x3c/span\x3e');
					c.fire("saveSnapshot");
					c.fire("lockSnapshot");
					g.append(e);
					c.editable().append(g);
					var k = c.on("selectionChange", I, null, null, 0),
						l = a.repository.on("checkSelection", I,
							null, null, 0);
					if (f) var m = d.getDocumentElement().$,
						n = m.scrollTop;
					h = c.createRange();
					h.selectNodeContents(e);
					h.select();
					f && (m.scrollTop = n);
					setTimeout(function () {
						b || a.focus();
						g.remove();
						k.removeListener();
						l.removeListener();
						c.fire("unlockSnapshot");
						b && !c.readOnly && (a.repository.del(a), c.fire("saveSnapshot"))
					}, 100)
				}
			}

			function J(a) {
				return (a = (a = a.getDefinition().attributes) && a["class"]) ? a.split(/\s+/) : null
			}

			function L() {
				var a = CKEDITOR.document.getActive(),
					b = this.editor,
					c = b.editable();
				(c.isInline() ? c : b.document.getWindow().getFrame()).equals(a) &&
					b.focusManager.focus(c)
			}

			function F() {
				CKEDITOR.env.gecko && this.editor.unlockSelection();
				CKEDITOR.env.webkit || (this.editor.forceNextSelectionCheck(), this.editor.selectionChange(1))
			}

			function S(a) {
				var b = null;
				a.on("data", function () {
					var a = this.data.classes,
						c;
					if (b != a) {
						for (c in b) a && a[c] || this.removeClass(c);
						for (c in a) this.addClass(c);
						b = a
					}
				})
			}

			function N(a) {
				a.on("data", function () {
					if (a.wrapper) {
						var b = this.getLabel ? this.getLabel() : this.editor.lang.widget.label.replace(/%1/, this.pathName || this.element.getName());
						a.wrapper.setAttribute("role", "region");
						a.wrapper.setAttribute("aria-label", b)
					}
				}, null, null, 9999)
			}

			function R(a) {
				if (a.draggable) {
					var b = a.editor,
						c = a.wrapper.getLast(e.isDomDragHandlerContainer),
						d;
					c ? d = c.findOne("img") : (c = new CKEDITOR.dom.element("span", b.document), c.setAttributes({
						"class": "cke_reset cke_widget_drag_handler_container",
						style: "background:rgba(220,220,220,0.5);background-image:url(" + b.plugins.widget.path + "images/handle.png)"
					}), d = new CKEDITOR.dom.element("img", b.document), d.setAttributes({
						"class": "cke_reset cke_widget_drag_handler",
						"data-cke-widget-drag-handler": "1",
						src: CKEDITOR.tools.transparentImageData,
						width: 15,
						title: b.lang.widget.move,
						height: 15,
						role: "presentation"
					}), a.inline && d.setAttribute("draggable", "true"), c.append(d), a.wrapper.append(c));
					a.wrapper.on("dragover", function (a) {
						a.data.preventDefault()
					});
					a.wrapper.on("mouseenter", a.updateDragHandlerPosition, a);
					setTimeout(function () {
						a.on("data", a.updateDragHandlerPosition, a)
					}, 50);
					if (!a.inline && (d.on("mousedown", K, a), CKEDITOR.env.ie && 9 > CKEDITOR.env.version)) d.on("dragstart",
						function (a) {
							a.data.preventDefault(!0)
						});
					a.dragHandlerContainer = c
				}
			}

			function K(a) {
				function b() {
					var c;
					for (p.reset(); c = h.pop();) c.removeListener();
					var d = k;
					c = a.sender;
					var e = this.repository.finder,
						f = this.repository.liner,
						g = this.editor,
						l = this.editor.editable();
					CKEDITOR.tools.isEmpty(f.visible) || (d = e.getRange(d[0]), this.focus(), g.fire("drop", {
						dropRange: d,
						target: d.startContainer
					}));
					l.removeClass("cke_widget_dragging");
					f.hideVisible();
					g.fire("dragend", {
						target: c
					})
				}
				if (CKEDITOR.tools.getMouseButton(a) === CKEDITOR.MOUSE_BUTTON_LEFT) {
					var c =
						this.repository.finder,
						d = this.repository.locator,
						e = this.repository.liner,
						f = this.editor,
						g = f.editable(),
						h = [],
						k = [],
						l, m;
					this.repository._.draggedWidget = this;
					var n = c.greedySearch(),
						p = CKEDITOR.tools.eventsBuffer(50, function () {
							l = d.locate(n);
							k = d.sort(m, 1);
							k.length && (e.prepare(n, l), e.placeLine(k[0]), e.cleanup())
						});
					g.addClass("cke_widget_dragging");
					h.push(g.on("mousemove", function (a) {
						m = a.data.$.clientY;
						p.input()
					}));
					f.fire("dragstart", {
						target: a.sender
					});
					h.push(f.document.once("mouseup", b, this));
					g.isInline() ||
						h.push(CKEDITOR.document.once("mouseup", b, this))
				}
			}

			function V(a) {
				var b, c, d = a.editables;
				a.editables = {};
				if (a.editables)
					for (b in d) c = d[b], a.initEditable(b, "string" == typeof c ? {
						selector: c
					} : c)
			}

			function Z(a) {
				if (a.mask) {
					var b = a.wrapper.findOne(".cke_widget_mask");
					b || (b = new CKEDITOR.dom.element("img", a.editor.document), b.setAttributes({
						src: CKEDITOR.tools.transparentImageData,
						"class": "cke_reset cke_widget_mask"
					}), a.wrapper.append(b));
					a.mask = b
				}
			}

			function X(a) {
				if (a.parts) {
					var b = {},
						c, d;
					for (d in a.parts) c = a.wrapper.findOne(a.parts[d]),
						b[d] = c;
					a.parts = b
				}
			}

			function da(a, b) {
				P(a);
				X(a);
				V(a);
				Z(a);
				R(a);
				S(a);
				N(a);
				if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version) a.wrapper.on("dragstart", function (b) {
					var c = b.data.getTarget();
					e.getNestedEditable(a, c) || a.inline && e.isDomDragHandler(c) || b.data.preventDefault()
				});
				a.wrapper.removeClass("cke_widget_new");
				a.element.addClass("cke_widget_element");
				a.on("key", function (b) {
					b = b.data.keyCode;
					if (13 == b) a.edit();
					else {
						if (b == CKEDITOR.CTRL + 67 || b == CKEDITOR.CTRL + 88) {
							H(a, b == CKEDITOR.CTRL + 88);
							return
						}
						if (b in T || CKEDITOR.CTRL &
							b || CKEDITOR.ALT & b) return
					}
					return !1
				}, null, null, 999);
				a.on("doubleclick", function (b) {
					a.edit() && b.cancel()
				});
				if (b.data) a.on("data", b.data);
				if (b.edit) a.on("edit", b.edit)
			}

			function P(a) {
				(a.wrapper = a.element.getParent()).setAttribute("data-cke-widget-id", a.id)
			}

			function Q(a) {
				a.element.data("cke-widget-data", encodeURIComponent(JSON.stringify(a.data)))
			}

			function M() {
				function a() {}

				function b(a, c, d) {
					return d && this.checkElement(a) ? (a = d.widgets.getByElement(a, !0)) && a.checkStyleActive(this) : !1
				}
				var c = {};
				CKEDITOR.style.addCustomHandler({
					type: "widget",
					setup: function (a) {
						this.widget = a.widget;
						if (this.group = "string" == typeof a.group ? [a.group] : a.group) {
							a = this.widget;
							var b;
							c[a] || (c[a] = {});
							for (var d = 0, e = this.group.length; d < e; d++) b = this.group[d], c[a][b] || (c[a][b] = []), c[a][b].push(this)
						}
					},
					apply: function (a) {
						var b;
						a instanceof CKEDITOR.editor && this.checkApplicable(a.elementPath(), a) && (b = a.widgets.focused, this.group && this.removeStylesFromSameGroup(a), b.applyStyle(this))
					},
					remove: function (a) {
						a instanceof CKEDITOR.editor && this.checkApplicable(a.elementPath(),
							a) && a.widgets.focused.removeStyle(this)
					},
					removeStylesFromSameGroup: function (a) {
						var b, d, e = !1;
						if (!(a instanceof CKEDITOR.editor)) return !1;
						d = a.elementPath();
						if (this.checkApplicable(d, a))
							for (var f = 0, g = this.group.length; f < g; f++) {
								b = c[this.widget][this.group[f]];
								for (var h = 0; h < b.length; h++) b[h] !== this && b[h].checkActive(d, a) && (a.widgets.focused.removeStyle(b[h]), e = !0)
							}
						return e
					},
					checkActive: function (a, b) {
						return this.checkElementMatch(a.lastElement, 0, b)
					},
					checkApplicable: function (a, b) {
						return b instanceof CKEDITOR.editor ?
							this.checkElement(a.lastElement) : !1
					},
					checkElementMatch: b,
					checkElementRemovable: b,
					checkElement: function (a) {
						return e.isDomWidgetWrapper(a) ? (a = a.getFirst(e.isDomWidgetElement)) && a.data("widget") == this.widget : !1
					},
					buildPreview: function (a) {
						return a || this._.definition.name
					},
					toAllowedContentRules: function (a) {
						if (!a) return null;
						a = a.widgets.registered[this.widget];
						var b, c = {};
						if (!a) return null;
						if (a.styleableElements) {
							b = this.getClassesArray();
							if (!b) return null;
							c[a.styleableElements] = {
								classes: b,
								propertiesOnly: !0
							};
							return c
						}
						return a.styleToAllowedContentRules ? a.styleToAllowedContentRules(this) : null
					},
					getClassesArray: function () {
						var a = this._.definition.attributes && this._.definition.attributes["class"];
						return a ? CKEDITOR.tools.trim(a).split(/\s+/) : null
					},
					applyToRange: a,
					removeFromRange: a,
					applyToObject: a
				})
			}
			CKEDITOR.plugins.add("widget", {
				requires: "lineutils,clipboard,widgetselection",
				onLoad: function () {
					void 0 !== CKEDITOR.document.$.querySelectorAll && (CKEDITOR.addCss(".cke_widget_wrapper{position:relative;outline:none}.cke_widget_inline{display:inline-block}.cke_widget_wrapper:hover\x3e.cke_widget_element{outline:2px solid #ffd25c;cursor:default}.cke_widget_wrapper:hover .cke_widget_editable{outline:2px solid #ffd25c}.cke_widget_wrapper.cke_widget_focused\x3e.cke_widget_element,.cke_widget_wrapper .cke_widget_editable.cke_widget_editable_focused{outline:2px solid #47a4f5}.cke_widget_editable{cursor:text}.cke_widget_drag_handler_container{position:absolute;width:15px;height:0;display:none;opacity:0.75;transition:height 0s 0.2s;line-height:0}.cke_widget_wrapper:hover\x3e.cke_widget_drag_handler_container{height:15px;transition:none}.cke_widget_drag_handler_container:hover{opacity:1}img.cke_widget_drag_handler{cursor:move;width:15px;height:15px;display:inline-block}.cke_widget_mask{position:absolute;top:0;left:0;width:100%;height:100%;display:block}.cke_editable.cke_widget_dragging, .cke_editable.cke_widget_dragging *{cursor:move !important}"),
						M())
				},
				beforeInit: function (b) {
					void 0 !== CKEDITOR.document.$.querySelectorAll && (b.widgets = new a(b))
				},
				afterInit: function (a) {
					if (void 0 !== CKEDITOR.document.$.querySelectorAll) {
						var b = a.widgets.registered,
							c, d, e;
						for (d in b) c = b[d], (e = c.button) && a.ui.addButton && a.ui.addButton(CKEDITOR.tools.capitalize(c.name, !0), {
							label: e,
							command: c.name,
							toolbar: "insert,10"
						});
						w(a)
					}
				}
			});
			a.prototype = {
				MIN_SELECTION_CHECK_INTERVAL: 500,
				add: function (a, b) {
					b = CKEDITOR.tools.prototypedCopy(b);
					b.name = a;
					b._ = b._ || {};
					this.editor.fire("widgetDefinition",
						b);
					b.template && (b.template = new CKEDITOR.template(b.template));
					c(this.editor, b);
					g(this, b);
					return this.registered[a] = b
				},
				addUpcastCallback: function (a) {
					this._.upcastCallbacks.push(a)
				},
				checkSelection: function () {
					var a = this.editor.getSelection(),
						b = a.getSelectedElement(),
						c = E(this),
						d;
					if (b && (d = this.getByElement(b, !0))) return c.focus(d).select(d).commit();
					a = a.getRanges()[0];
					if (!a || a.collapsed) return c.commit();
					a = new CKEDITOR.dom.walker(a);
					for (a.evaluator = e.isDomWidgetWrapper; b = a.next();) c.select(this.getByElement(b));
					c.commit()
				},
				checkWidgets: function (a) {
					this.fire("checkWidgets", CKEDITOR.tools.copy(a || {}))
				},
				del: function (a) {
					if (this.focused === a) {
						var b = a.editor,
							c = b.createRange(),
							d;
						(d = c.moveToClosestEditablePosition(a.wrapper, !0)) || (d = c.moveToClosestEditablePosition(a.wrapper, !1));
						d && b.getSelection().selectRanges([c])
					}
					a.wrapper.remove();
					this.destroy(a, !0)
				},
				destroy: function (a, b) {
					this.widgetHoldingFocusedEditable === a && r(this, a, null, b);
					a.destroy(b);
					delete this.instances[a.id];
					this.fire("instanceDestroyed", a)
				},
				destroyAll: function (a,
					b) {
					var c, d, e = this.instances;
					if (b && !a) {
						d = b.find(".cke_widget_wrapper");
						for (var e = d.count(), f = 0; f < e; ++f)(c = this.getByElement(d.getItem(f), !0)) && this.destroy(c)
					} else
						for (d in e) c = e[d], this.destroy(c, a)
				},
				finalizeCreation: function (a) {
					(a = a.getFirst()) && e.isDomWidgetWrapper(a) && (this.editor.insertElement(a), a = this.getByElement(a), a.ready = !0, a.fire("ready"), a.focus())
				},
				getByElement: function () {
					function a(c) {
						return c.is(b) && c.data("cke-widget-id")
					}
					var b = {
						div: 1,
						span: 1
					};
					return function (b, c) {
						if (!b) return null;
						var d = a(b);
						if (!c && !d) {
							var e = this.editor.editable();
							do b = b.getParent(); while (b && !b.equals(e) && !(d = a(b)))
						}
						return this.instances[d] || null
					}
				}(),
				initOn: function (a, b, c) {
					b ? "string" == typeof b && (b = this.registered[b]) : b = this.registered[a.data("widget")];
					if (!b) return null;
					var d = this.wrapElement(a, b.name);
					return d ? d.hasClass("cke_widget_new") ? (a = new e(this, this._.nextId++, a, b, c), a.isInited() ? this.instances[a.id] = a : null) : this.getByElement(a) : null
				},
				initOnAll: function (a) {
					a = (a || this.editor.editable()).find(".cke_widget_new");
					for (var b = [], c, d = a.count(); d--;)(c = this.initOn(a.getItem(d).getFirst(e.isDomWidgetElement))) && b.push(c);
					return b
				},
				onWidget: function (a) {
					var b = Array.prototype.slice.call(arguments);
					b.shift();
					for (var c in this.instances) {
						var d = this.instances[c];
						d.name == a && d.on.apply(d, b)
					}
					this.on("instanceCreated", function (c) {
						c = c.data;
						c.name == a && c.on.apply(c, b)
					})
				},
				parseElementClasses: function (a) {
					if (!a) return null;
					a = CKEDITOR.tools.trim(a).split(/\s+/);
					for (var b, c = {}, d = 0; b = a.pop();) - 1 == b.indexOf("cke_") && (c[b] = d = 1);
					return d ?
						c : null
				},
				wrapElement: function (a, b) {
					var c = null,
						d, e;
					if (a instanceof CKEDITOR.dom.element) {
						b = b || a.data("widget");
						d = this.registered[b];
						if (!d) return null;
						if ((c = a.getParent()) && c.type == CKEDITOR.NODE_ELEMENT && c.data("cke-widget-wrapper")) return c;
						a.hasAttribute("data-cke-widget-keep-attr") || a.data("cke-widget-keep-attr", a.data("widget") ? 1 : 0);
						a.data("widget", b);
						(e = y(d, a.getName())) && f(a);
						c = new CKEDITOR.dom.element(e ? "span" : "div");
						c.setAttributes(p(e, b));
						c.data("cke-display-name", d.pathName ? d.pathName : a.getName());
						a.getParent(!0) && c.replace(a);
						a.appendTo(c)
					} else if (a instanceof CKEDITOR.htmlParser.element) {
						b = b || a.attributes["data-widget"];
						d = this.registered[b];
						if (!d) return null;
						if ((c = a.parent) && c.type == CKEDITOR.NODE_ELEMENT && c.attributes["data-cke-widget-wrapper"]) return c;
						"data-cke-widget-keep-attr" in a.attributes || (a.attributes["data-cke-widget-keep-attr"] = a.attributes["data-widget"] ? 1 : 0);
						b && (a.attributes["data-widget"] = b);
						(e = y(d, a.name)) && f(a);
						c = new CKEDITOR.htmlParser.element(e ? "span" : "div", p(e, b));
						c.attributes["data-cke-display-name"] =
							d.pathName ? d.pathName : a.name;
						d = a.parent;
						var g;
						d && (g = a.getIndex(), a.remove());
						c.add(a);
						d && q(d, g, c)
					}
					return c
				},
				_tests_createEditableFilter: h
			};
			CKEDITOR.event.implementOn(a.prototype);
			e.prototype = {
				addClass: function (a) {
					this.element.addClass(a);
					this.wrapper.addClass(e.WRAPPER_CLASS_PREFIX + a)
				},
				applyStyle: function (a) {
					D(this, a, 1)
				},
				checkStyleActive: function (a) {
					a = J(a);
					var b;
					if (!a) return !1;
					for (; b = a.pop();)
						if (!this.hasClass(b)) return !1;
					return !0
				},
				destroy: function (a) {
					this.fire("destroy");
					if (this.editables)
						for (var b in this.editables) this.destroyEditable(b,
							a);
					a || ("0" == this.element.data("cke-widget-keep-attr") && this.element.removeAttribute("data-widget"), this.element.removeAttributes(["data-cke-widget-data", "data-cke-widget-keep-attr"]), this.element.removeClass("cke_widget_element"), this.element.replace(this.wrapper));
					this.wrapper = null
				},
				destroyEditable: function (a, b) {
					var c = this.editables[a],
						d = !0;
					c.removeListener("focus", F);
					c.removeListener("blur", L);
					this.editor.focusManager.remove(c);
					if (c.filter) {
						for (var e in this.repository.instances) {
							var f = this.repository.instances[e];
							f.editables && (f = f.editables[a]) && f !== c && c.filter === f.filter && (d = !1)
						}
						d && (c.filter.destroy(), (d = this.repository._.filters[this.name]) && delete d[a])
					}
					b || (this.repository.destroyAll(!1, c), c.removeClass("cke_widget_editable"), c.removeClass("cke_widget_editable_focused"), c.removeAttributes(["contenteditable", "data-cke-widget-editable", "data-cke-enter-mode"]));
					delete this.editables[a]
				},
				edit: function () {
					var a = {
							dialog: this.dialog
						},
						b = this;
					if (!1 === this.fire("edit", a) || !a.dialog) return !1;
					this.editor.openDialog(a.dialog,
						function (a) {
							var c, d;
							!1 !== b.fire("dialog", a) && (c = a.on("show", function () {
								a.setupContent(b)
							}), d = a.on("ok", function () {
								var c, d = b.on("data", function (a) {
									c = 1;
									a.cancel()
								}, null, null, 0);
								b.editor.fire("saveSnapshot");
								a.commitContent(b);
								d.removeListener();
								c && (b.fire("data", b.data), b.editor.fire("saveSnapshot"))
							}), a.once("hide", function () {
								c.removeListener();
								d.removeListener()
							}))
						});
					return !0
				},
				getClasses: function () {
					return this.repository.parseElementClasses(this.element.getAttribute("class"))
				},
				hasClass: function (a) {
					return this.element.hasClass(a)
				},
				initEditable: function (a, c) {
					var d = this._findOneNotNested(c.selector);
					return d && d.is(CKEDITOR.dtd.$editable) ? (d = new b(this.editor, d, {
							filter: h.call(this.repository, this.name, a, c)
						}), this.editables[a] = d, d.setAttributes({
							contenteditable: "true",
							"data-cke-widget-editable": a,
							"data-cke-enter-mode": d.enterMode
						}), d.filter && d.data("cke-filter", d.filter.id), d.addClass("cke_widget_editable"), d.removeClass("cke_widget_editable_focused"), c.pathName && d.data("cke-display-name", c.pathName), this.editor.focusManager.add(d),
						d.on("focus", F, this), CKEDITOR.env.ie && d.on("blur", L, this), d._.initialSetData = !0, d.setData(d.getHtml()), !0) : !1
				},
				_findOneNotNested: function (a) {
					a = this.wrapper.find(a);
					for (var b, c, d = 0; d < a.count(); d++)
						if (b = a.getItem(d), c = b.getAscendant(e.isDomWidgetWrapper), this.wrapper.equals(c)) return b;
					return null
				},
				isInited: function () {
					return !(!this.wrapper || !this.inited)
				},
				isReady: function () {
					return this.isInited() && this.ready
				},
				focus: function () {
					var a = this.editor.getSelection();
					if (a) {
						var b = this.editor.checkDirty();
						a.fake(this.wrapper);
						!b && this.editor.resetDirty()
					}
					this.editor.focus()
				},
				removeClass: function (a) {
					this.element.removeClass(a);
					this.wrapper.removeClass(e.WRAPPER_CLASS_PREFIX + a)
				},
				removeStyle: function (a) {
					D(this, a, 0)
				},
				setData: function (a, b) {
					var c = this.data,
						d = 0;
					if ("string" == typeof a) c[a] !== b && (c[a] = b, d = 1);
					else {
						var e = a;
						for (a in e) c[a] !== e[a] && (d = 1, c[a] = e[a])
					}
					d && this.dataReady && (Q(this), this.fire("data", c));
					return this
				},
				setFocused: function (a) {
					this.wrapper[a ? "addClass" : "removeClass"]("cke_widget_focused");
					this.fire(a ? "focus" : "blur");
					return this
				},
				setSelected: function (a) {
					this.wrapper[a ? "addClass" : "removeClass"]("cke_widget_selected");
					this.fire(a ? "select" : "deselect");
					return this
				},
				updateDragHandlerPosition: function () {
					var a = this.editor,
						b = this.element.$,
						c = this._.dragHandlerOffset,
						b = {
							x: b.offsetLeft,
							y: b.offsetTop - 15
						};
					c && b.x == c.x && b.y == c.y || (c = a.checkDirty(), a.fire("lockSnapshot"), this.dragHandlerContainer.setStyles({
						top: b.y + "px",
						left: b.x + "px",
						display: "block"
					}), a.fire("unlockSnapshot"), !c && a.resetDirty(), this._.dragHandlerOffset = b)
				}
			};
			CKEDITOR.event.implementOn(e.prototype);
			e.getNestedEditable = function (a, b) {
				return !b || b.equals(a) ? null : e.isDomNestedEditable(b) ? b : e.getNestedEditable(a, b.getParent())
			};
			e.isDomDragHandler = function (a) {
				return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-drag-handler")
			};
			e.isDomDragHandlerContainer = function (a) {
				return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_widget_drag_handler_container")
			};
			e.isDomNestedEditable = function (a) {
				return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-editable")
			};
			e.isDomWidgetElement = function (a) {
				return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-widget")
			};
			e.isDomWidgetWrapper = function (a) {
				return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-wrapper")
			};
			e.isDomWidget = function (a) {
				return a ? this.isDomWidgetWrapper(a) || this.isDomWidgetElement(a) : !1
			};
			e.isParserWidgetElement = function (a) {
				return a.type == CKEDITOR.NODE_ELEMENT && !!a.attributes["data-widget"]
			};
			e.isParserWidgetWrapper = function (a) {
				return a.type == CKEDITOR.NODE_ELEMENT && !!a.attributes["data-cke-widget-wrapper"]
			};
			e.WRAPPER_CLASS_PREFIX = "cke_widget_wrapper_";
			b.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.dom.element.prototype), {
				setData: function (a) {
					this._.initialSetData || this.editor.widgets.destroyAll(!1, this);
					this._.initialSetData = !1;
					a = this.editor.dataProcessor.toHtml(a, {
						context: this.getName(),
						filter: this.filter,
						enterMode: this.enterMode
					});
					this.setHtml(a);
					this.editor.widgets.initOnAll(this)
				},
				getData: function () {
					return this.editor.dataProcessor.toDataFormat(this.getHtml(), {
						context: this.getName(),
						filter: this.filter,
						enterMode: this.enterMode
					})
				}
			});
			var U = /^(?:<(?:div|span)(?: data-cke-temp="1")?(?: id="cke_copybin")?(?: data-cke-temp="1")?>)?(?:<(?:div|span)(?: style="[^"]+")?>)?<span [^>]*data-cke-copybin-start="1"[^>]*>.?<\/span>([\s\S]+)<span [^>]*data-cke-copybin-end="1"[^>]*>.?<\/span>(?:<\/(?:div|span)>)?(?:<\/(?:div|span)>)?$/i,
				T = {
					37: 1,
					38: 1,
					39: 1,
					40: 1,
					8: 1,
					46: 1
				};
			CKEDITOR.plugins.widget = e;
			e.repository = a;
			e.nestedEditable = b
		}(),
		function () {
			function a(a, c, e) {
				this.editor = a;
				this.notification = null;
				this._message = new CKEDITOR.template(c);
				this._singularMessage = e ? new CKEDITOR.template(e) : null;
				this._tasks = [];
				this._doneTasks = this._doneWeights = this._totalWeights = 0
			}

			function e(a) {
				this._weight = a || 1;
				this._doneWeight = 0;
				this._isCanceled = !1
			}
			CKEDITOR.plugins.add("notificationaggregator", {
				requires: "notification"
			});
			a.prototype = {
				createTask: function (a) {
					a = a || {};
					var c = !this.notification,
						e;
					c && (this.notification = this._createNotification());
					e = this._addTask(a);
					e.on("updated", this._onTaskUpdate, this);
					e.on("done", this._onTaskDone,
						this);
					e.on("canceled", function () {
						this._removeTask(e)
					}, this);
					this.update();
					c && this.notification.show();
					return e
				},
				update: function () {
					this._updateNotification();
					this.isFinished() && this.fire("finished")
				},
				getPercentage: function () {
					return 0 === this.getTaskCount() ? 1 : this._doneWeights / this._totalWeights
				},
				isFinished: function () {
					return this.getDoneTaskCount() === this.getTaskCount()
				},
				getTaskCount: function () {
					return this._tasks.length
				},
				getDoneTaskCount: function () {
					return this._doneTasks
				},
				_updateNotification: function () {
					this.notification.update({
						message: this._getNotificationMessage(),
						progress: this.getPercentage()
					})
				},
				_getNotificationMessage: function () {
					var a = this.getTaskCount(),
						c = {
							current: this.getDoneTaskCount(),
							max: a,
							percentage: Math.round(100 * this.getPercentage())
						};
					return (1 == a && this._singularMessage ? this._singularMessage : this._message).output(c)
				},
				_createNotification: function () {
					return new CKEDITOR.plugins.notification(this.editor, {
						type: "progress"
					})
				},
				_addTask: function (a) {
					a = new e(a.weight);
					this._tasks.push(a);
					this._totalWeights += a._weight;
					return a
				},
				_removeTask: function (a) {
					var c = CKEDITOR.tools.indexOf(this._tasks,
						a); - 1 !== c && (a._doneWeight && (this._doneWeights -= a._doneWeight), this._totalWeights -= a._weight, this._tasks.splice(c, 1), this.update())
				},
				_onTaskUpdate: function (a) {
					this._doneWeights += a.data;
					this.update()
				},
				_onTaskDone: function () {
					this._doneTasks += 1;
					this.update()
				}
			};
			CKEDITOR.event.implementOn(a.prototype);
			e.prototype = {
				done: function () {
					this.update(this._weight)
				},
				update: function (a) {
					if (!this.isDone() && !this.isCanceled()) {
						a = Math.min(this._weight, a);
						var c = a - this._doneWeight;
						this._doneWeight = a;
						this.fire("updated",
							c);
						this.isDone() && this.fire("done")
					}
				},
				cancel: function () {
					this.isDone() || this.isCanceled() || (this._isCanceled = !0, this.fire("canceled"))
				},
				isDone: function () {
					return this._weight === this._doneWeight
				},
				isCanceled: function () {
					return this._isCanceled
				}
			};
			CKEDITOR.event.implementOn(e.prototype);
			CKEDITOR.plugins.notificationAggregator = a;
			CKEDITOR.plugins.notificationAggregator.task = e
		}(), "use strict",
		function () {
			CKEDITOR.plugins.add("uploadwidget", {
				requires: "widget,clipboard,filetools,notificationaggregator",
				init: function (a) {
					a.filter.allow("*[!data-widget,!data-cke-upload-id]")
				}
			});
			CKEDITOR.fileTools || (CKEDITOR.fileTools = {});
			CKEDITOR.tools.extend(CKEDITOR.fileTools, {
				addUploadWidget: function (a, e, b) {
					var c = CKEDITOR.fileTools,
						g = a.uploadRepository,
						l = b.supportedTypes ? 10 : 20;
					if (b.fileToElement) a.on("paste", function (b) {
						b = b.data;
						var f = a.widgets.registered[e],
							d = b.dataTransfer,
							l = d.getFilesCount(),
							h = f.loadMethod || "loadAndUpload",
							n, p;
						if (!b.dataValue && l)
							for (p = 0; p < l; p++)
								if (n = d.getFile(p), !f.supportedTypes || c.isTypeSupported(n, f.supportedTypes)) {
									var q = f.fileToElement(n);
									n = g.create(n, void 0,
										f.loaderType);
									q && (n[h](f.uploadUrl, f.additionalRequestParameters), CKEDITOR.fileTools.markElement(q, e, n.id), "loadAndUpload" != h && "upload" != h || f.skipNotifications || CKEDITOR.fileTools.bindNotifications(a, n), b.dataValue += q.getOuterHtml())
								}
					}, null, null, l);
					CKEDITOR.tools.extend(b, {
						downcast: function () {
							return new CKEDITOR.htmlParser.text("")
						},
						init: function () {
							var b = this,
								c = this.wrapper.findOne("[data-cke-upload-id]").data("cke-upload-id"),
								d = g.loaders[c],
								e = CKEDITOR.tools.capitalize,
								h, l;
							d.on("update", function (g) {
								if ("abort" ===
									d.status && "function" === typeof b.onAbort) b.onAbort(d);
								if (b.wrapper && b.wrapper.getParent()) {
									a.fire("lockSnapshot");
									g = "on" + e(d.status);
									if ("abort" === d.status || "function" !== typeof b[g] || !1 !== b[g](d)) l = "cke_upload_" + d.status, b.wrapper && l != h && (h && b.wrapper.removeClass(h), b.wrapper.addClass(l), h = l), "error" != d.status && "abort" != d.status || a.widgets.del(b);
									a.fire("unlockSnapshot")
								} else CKEDITOR.instances[a.name] && a.editable().find('[data-cke-upload-id\x3d"' + c + '"]').count() || d.abort(), g.removeListener()
							});
							d.update()
						},
						replaceWith: function (b, c) {
							if ("" === b.trim()) a.widgets.del(this);
							else {
								var d = this == a.widgets.focused,
									e = a.editable(),
									g = a.createRange(),
									l, p;
								d || (p = a.getSelection().createBookmarks());
								g.setStartBefore(this.wrapper);
								g.setEndAfter(this.wrapper);
								d && (l = g.createBookmark());
								e.insertHtmlIntoRange(b, g, c);
								a.widgets.checkWidgets({
									initOnlyNew: !0
								});
								a.widgets.destroy(this, !0);
								d ? (g.moveToBookmark(l), g.select()) : a.getSelection().selectBookmarks(p)
							}
						},
						_getLoader: function () {
							var a = this.wrapper.findOne("[data-cke-upload-id]");
							return a ? this.editor.uploadRepository.loaders[a.data("cke-upload-id")] : null
						}
					});
					a.widgets.add(e, b)
				},
				markElement: function (a, e, b) {
					a.setAttributes({
						"data-cke-upload-id": b,
						"data-widget": e
					})
				},
				bindNotifications: function (a, e) {
					function b() {
						c = a._.uploadWidgetNotificaionAggregator;
						if (!c || c.isFinished()) c = a._.uploadWidgetNotificaionAggregator = new CKEDITOR.plugins.notificationAggregator(a, a.lang.uploadwidget.uploadMany, a.lang.uploadwidget.uploadOne), c.once("finished", function () {
							var b = c.getTaskCount();
							0 === b ? c.notification.hide() :
								c.notification.update({
									message: 1 == b ? a.lang.uploadwidget.doneOne : a.lang.uploadwidget.doneMany.replace("%1", b),
									type: "success",
									important: 1
								})
						})
					}
					var c, g = null;
					e.on("update", function () {
						!g && e.uploadTotal && (b(), g = c.createTask({
							weight: e.uploadTotal
						}));
						g && "uploading" == e.status && g.update(e.uploaded)
					});
					e.on("uploaded", function () {
						g && g.done()
					});
					e.on("error", function () {
						g && g.cancel();
						a.showNotification(e.message, "warning")
					});
					e.on("abort", function () {
						g && g.cancel();
						CKEDITOR.instances[a.name] && a.showNotification(a.lang.uploadwidget.abort,
							"info")
					})
				}
			})
		}(), "use strict",
		function () {
			function a(a) {
				9 >= a && (a = "0" + a);
				return String(a)
			}

			function e(c) {
				var e = new Date,
					e = [e.getFullYear(), e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds()];
				b += 1;
				return "image-" + CKEDITOR.tools.array.map(e, a).join("") + "-" + b + "." + c
			}
			var b = 0;
			CKEDITOR.plugins.add("uploadimage", {
				requires: "uploadwidget",
				onLoad: function () {
					CKEDITOR.addCss(".cke_upload_uploading img{opacity: 0.3}")
				},
				init: function (a) {
					if (CKEDITOR.plugins.clipboard.isFileApiSupported) {
						var b = CKEDITOR.fileTools,
							l = b.getUploadUrl(a.config, "image");
						l && (b.addUploadWidget(a, "uploadimage", {
							supportedTypes: /image\/(jpeg|png|gif|bmp)/,
							uploadUrl: l,
							fileToElement: function () {
								var a = new CKEDITOR.dom.element("img");
								a.setAttribute("src", "data:image/gif;base64,R0lGODlhDgAOAIAAAAAAAP///yH5BAAAAAAALAAAAAAOAA4AAAIMhI+py+0Po5y02qsKADs\x3d");
								return a
							},
							parts: {
								img: "img"
							},
							onUploading: function (a) {
								this.parts.img.setAttribute("src", a.data)
							},
							onUploaded: function (a) {
								var b = this.parts.img.$;
								this.replaceWith('\x3cimg src\x3d"' + a.url + '" width\x3d"' +
									(a.responseData.width || b.naturalWidth) + '" height\x3d"' + (a.responseData.height || b.naturalHeight) + '"\x3e')
							}
						}), a.on("paste", function (k) {
							if (k.data.dataValue.match(/<img[\s\S]+data:/i)) {
								k = k.data;
								var f = document.implementation.createHTMLDocument(""),
									f = new CKEDITOR.dom.element(f.body),
									d, m, h;
								f.data("cke-editable", 1);
								f.appendHtml(k.dataValue);
								d = f.find("img");
								for (h = 0; h < d.count(); h++) {
									m = d.getItem(h);
									var n = m.getAttribute("src"),
										p = n && "data:" == n.substring(0, 5),
										q = null === m.data("cke-realelement");
									p && q && !m.data("cke-upload-id") &&
										!m.isReadOnly(1) && (p = (p = n.match(/image\/([a-z]+?);/i)) && p[1] || "jpg", n = a.uploadRepository.create(n, e(p)), n.upload(l), b.markElement(m, "uploadimage", n.id), b.bindNotifications(a, n))
								}
								k.dataValue = f.getHtml()
							}
						}))
					}
				}
			})
		}(), CKEDITOR.plugins.add("wsc", {
			requires: "dialog",
			parseApi: function (a) {
				a.config.wsc_onFinish = "function" === typeof a.config.wsc_onFinish ? a.config.wsc_onFinish : function () {};
				a.config.wsc_onClose = "function" === typeof a.config.wsc_onClose ? a.config.wsc_onClose : function () {}
			},
			parseConfig: function (a) {
				a.config.wsc_customerId =
					a.config.wsc_customerId || CKEDITOR.config.wsc_customerId || "1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk";
				a.config.wsc_customDictionaryIds = a.config.wsc_customDictionaryIds || CKEDITOR.config.wsc_customDictionaryIds || "";
				a.config.wsc_userDictionaryName = a.config.wsc_userDictionaryName || CKEDITOR.config.wsc_userDictionaryName || "";
				a.config.wsc_customLoaderScript = a.config.wsc_customLoaderScript || CKEDITOR.config.wsc_customLoaderScript;
				a.config.wsc_interfaceLang = a.config.wsc_interfaceLang;
				CKEDITOR.config.wsc_cmd = a.config.wsc_cmd || CKEDITOR.config.wsc_cmd || "spell";
				CKEDITOR.config.wsc_version = "v4.3.0-master-d769233";
				CKEDITOR.config.wsc_removeGlobalVariable = !0
			},
			onLoad: function (a) {
				"moono-lisa" == (CKEDITOR.skinName || a.config.skin) && CKEDITOR.document.appendStyleSheet(this.path + "skins/" + CKEDITOR.skin.name + "/wsc.css")
			},
			init: function (a) {
				var e = CKEDITOR.env;
				this.parseConfig(a);
				this.parseApi(a);
				a.addCommand("checkspell", new CKEDITOR.dialogCommand("checkspell")).modes = {
					wysiwyg: !CKEDITOR.env.opera &&
						!CKEDITOR.env.air && document.domain == window.location.hostname && !(e.ie && (8 > e.version || e.quirks))
				};
				"undefined" == typeof a.plugins.scayt && a.ui.addButton && a.ui.addButton("SpellChecker", {
					label: a.lang.wsc.toolbar,
					click: function (a) {
						var c = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.container.getText() : a.document.getBody().getText();
						(c = c.replace(/\s/g, "")) ? a.execCommand("checkspell"): alert("Nothing to check!")
					},
					toolbar: "spellchecker,10"
				});
				CKEDITOR.dialog.add("checkspell", this.path + (CKEDITOR.env.ie && 7 >= CKEDITOR.env.version ?
					"dialogs/wsc_ie.js" : window.postMessage ? "dialogs/wsc.js" : "dialogs/wsc_ie.js"))
			}
		}),
		function () {
			function a(a) {
				function b(a) {
					var c = !1;
					h.attachListener(h, "keydown", function () {
						var b = f.getBody().getElementsByTag(a);
						if (!c) {
							for (var d = 0; d < b.count(); d++) b.getItem(d).setCustomData("retain", !0);
							c = !0
						}
					}, null, null, 1);
					h.attachListener(h, "keyup", function () {
						var b = f.getElementsByTag(a);
						c && (1 == b.count() && !b.getItem(0).getCustomData("retain") && CKEDITOR.tools.isEmpty(b.getItem(0).getAttributes()) && b.getItem(0).remove(1),
							c = !1)
					})
				}
				var c = this.editor,
					f = a.document,
					d = f.body,
					m = f.getElementById("cke_actscrpt");
				m && m.parentNode.removeChild(m);
				(m = f.getElementById("cke_shimscrpt")) && m.parentNode.removeChild(m);
				(m = f.getElementById("cke_basetagscrpt")) && m.parentNode.removeChild(m);
				d.contentEditable = !0;
				CKEDITOR.env.ie && (d.hideFocus = !0, d.disabled = !0, d.removeAttribute("disabled"));
				delete this._.isLoadingData;
				this.$ = d;
				f = new CKEDITOR.dom.document(f);
				this.setup();
				this.fixInitialSelection();
				var h = this;
				CKEDITOR.env.ie && !CKEDITOR.env.edge &&
					f.getDocumentElement().addClass(f.$.compatMode);
				CKEDITOR.env.ie && !CKEDITOR.env.edge && c.enterMode != CKEDITOR.ENTER_P ? b("p") : CKEDITOR.env.edge && 15 > CKEDITOR.env.version && c.enterMode != CKEDITOR.ENTER_DIV && b("div");
				if (CKEDITOR.env.webkit || CKEDITOR.env.ie && 10 < CKEDITOR.env.version) f.getDocumentElement().on("mousedown", function (a) {
					a.data.getTarget().is("html") && setTimeout(function () {
						c.editable().focus()
					})
				});
				e(c);
				try {
					c.document.$.execCommand("2D-position", !1, !0)
				} catch (n) {}(CKEDITOR.env.gecko || CKEDITOR.env.ie &&
					"CSS1Compat" == c.document.$.compatMode) && this.attachListener(this, "keydown", function (a) {
					var b = a.data.getKeystroke();
					if (33 == b || 34 == b)
						if (CKEDITOR.env.ie) setTimeout(function () {
							c.getSelection().scrollIntoView()
						}, 0);
						else if (c.window.$.innerHeight > this.$.offsetHeight) {
						var d = c.createRange();
						d[33 == b ? "moveToElementEditStart" : "moveToElementEditEnd"](this);
						d.select();
						a.data.preventDefault()
					}
				});
				CKEDITOR.env.ie && this.attachListener(f, "blur", function () {
					try {
						f.$.selection.empty()
					} catch (a) {}
				});
				CKEDITOR.env.iOS && this.attachListener(f,
					"touchend",
					function () {
						a.focus()
					});
				d = c.document.getElementsByTag("title").getItem(0);
				d.data("cke-title", d.getText());
				CKEDITOR.env.ie && (c.document.$.title = this._.docTitle);
				CKEDITOR.tools.setTimeout(function () {
					"unloaded" == this.status && (this.status = "ready");
					c.fire("contentDom");
					this._.isPendingFocus && (c.focus(), this._.isPendingFocus = !1);
					setTimeout(function () {
						c.fire("dataReady")
					}, 0)
				}, 0, this)
			}

			function e(a) {
				function b() {
					var d;
					a.editable().attachListener(a, "selectionChange", function () {
						var b = a.getSelection().getSelectedElement();
						b && (d && (d.detachEvent("onresizestart", c), d = null), b.$.attachEvent("onresizestart", c), d = b.$)
					})
				}

				function c(a) {
					a.returnValue = !1
				}
				if (CKEDITOR.env.gecko) try {
					var e = a.document.$;
					e.execCommand("enableObjectResizing", !1, !a.config.disableObjectResizing);
					e.execCommand("enableInlineTableEditing", !1, !a.config.disableNativeTableHandles)
				} catch (d) {} else CKEDITOR.env.ie && 11 > CKEDITOR.env.version && a.config.disableObjectResizing && b(a)
			}

			function b() {
				var a = [];
				if (8 <= CKEDITOR.document.$.documentMode) {
					a.push("html.CSS1Compat [contenteditable\x3dfalse]{min-height:0 !important}");
					var b = [],
						c;
					for (c in CKEDITOR.dtd.$removeEmpty) b.push("html.CSS1Compat " + c + "[contenteditable\x3dfalse]");
					a.push(b.join(",") + "{display:inline-block}")
				} else CKEDITOR.env.gecko && (a.push("html{height:100% !important}"), a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}"));
				a.push("html{cursor:text;*cursor:auto}");
				a.push("img,input,textarea{cursor:default}");
				return a.join("\n")
			}
			var c;
			CKEDITOR.plugins.add("wysiwygarea", {
				init: function (a) {
					a.config.fullPage && a.addFeature({
						allowedContent: "html head title; style [media,type]; body (*)[id]; meta link [*]",
						requiredContent: "body"
					});
					a.addMode("wysiwyg", function (b) {
						function e(f) {
							f && f.removeListener();
							a.editable(new c(a, d.$.contentWindow.document.body));
							a.setData(a.getData(1), b)
						}
						var f = "document.open();" + (CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "") + "document.close();",
							f = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie && !CKEDITOR.env.edge ? "javascript:void(function(){" + encodeURIComponent(f) + "}())" : "",
							d = CKEDITOR.dom.element.createFromHtml('\x3ciframe src\x3d"' + f + '" frameBorder\x3d"0"\x3e\x3c/iframe\x3e');
						d.setStyles({
							width: "100%",
							height: "100%"
						});
						d.addClass("cke_wysiwyg_frame").addClass("cke_reset");
						f = a.ui.space("contents");
						f.append(d);
						var m = CKEDITOR.env.ie && !CKEDITOR.env.edge || CKEDITOR.env.gecko;
						if (m) d.on("load", e);
						var h = a.title,
							n = a.fire("ariaEditorHelpLabel", {}).label;
						h && (CKEDITOR.env.ie && n && (h += ", " + n), d.setAttribute("title", h));
						if (n) {
							var h = CKEDITOR.tools.getNextId(),
								p = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + h + '" class\x3d"cke_voice_label"\x3e' + n + "\x3c/span\x3e");
							f.append(p, 1);
							d.setAttribute("aria-describedby",
								h)
						}
						a.on("beforeModeUnload", function (a) {
							a.removeListener();
							p && p.remove()
						});
						d.setAttributes({
							tabIndex: a.tabIndex,
							allowTransparency: "true"
						});
						!m && e();
						a.fire("ariaWidget", d)
					})
				}
			});
			CKEDITOR.editor.prototype.addContentsCss = function (a) {
				var b = this.config,
					c = b.contentsCss;
				CKEDITOR.tools.isArray(c) || (b.contentsCss = c ? [c] : []);
				b.contentsCss.push(a)
			};
			c = CKEDITOR.tools.createClass({
				$: function () {
					this.base.apply(this, arguments);
					this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function (b) {
						CKEDITOR.tools.setTimeout(a,
							0, this, b)
					}, this);
					this._.docTitle = this.getWindow().getFrame().getAttribute("title")
				},
				base: CKEDITOR.editable,
				proto: {
					setData: function (a, c) {
						var e = this.editor;
						if (c) this.setHtml(a), this.fixInitialSelection(), e.fire("dataReady");
						else {
							this._.isLoadingData = !0;
							e._.dataStore = {
								id: 1
							};
							var f = e.config,
								d = f.fullPage,
								m = f.docType,
								h = CKEDITOR.tools.buildStyleHtml(b()).replace(/<style>/, '\x3cstyle data-cke-temp\x3d"1"\x3e');
							d || (h += CKEDITOR.tools.buildStyleHtml(e.config.contentsCss));
							var n = f.baseHref ? '\x3cbase href\x3d"' +
								f.baseHref + '" data-cke-temp\x3d"1" /\x3e' : "";
							d && (a = a.replace(/<!DOCTYPE[^>]*>/i, function (a) {
								e.docType = m = a;
								return ""
							}).replace(/<\?xml\s[^\?]*\?>/i, function (a) {
								e.xmlDeclaration = a;
								return ""
							}));
							a = e.dataProcessor.toHtml(a);
							d ? (/<body[\s|>]/.test(a) || (a = "\x3cbody\x3e" + a), /<html[\s|>]/.test(a) || (a = "\x3chtml\x3e" + a + "\x3c/html\x3e"), /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$\x26\x3ctitle\x3e\x3c/title\x3e")) : a = a.replace(/<html[^>]*>/, "$\x26\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e"),
								n && (a = a.replace(/<head[^>]*?>/, "$\x26" + n)), a = a.replace(/<\/head\s*>/, h + "$\x26"), a = m + a) : a = f.docType + '\x3chtml dir\x3d"' + f.contentsLangDirection + '" lang\x3d"' + (f.contentsLanguage || e.langCode) + '"\x3e\x3chead\x3e\x3ctitle\x3e' + this._.docTitle + "\x3c/title\x3e" + n + h + "\x3c/head\x3e\x3cbody" + (f.bodyId ? ' id\x3d"' + f.bodyId + '"' : "") + (f.bodyClass ? ' class\x3d"' + f.bodyClass + '"' : "") + "\x3e" + a + "\x3c/body\x3e\x3c/html\x3e";
							CKEDITOR.env.gecko && (a = a.replace(/<body/, '\x3cbody contenteditable\x3d"true" '), 2E4 > CKEDITOR.env.version &&
								(a = a.replace(/<body[^>]*>/, "$\x26\x3c!-- cke-content-start --\x3e")));
							f = '\x3cscript id\x3d"cke_actscrpt" type\x3d"text/javascript"' + (CKEDITOR.env.ie ? ' defer\x3d"defer" ' : "") + "\x3evar wasLoaded\x3d0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" + this._.frameLoadedHandler + ",window);wasLoaded\x3d1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "\x3c/script\x3e";
							CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (f += '\x3cscript id\x3d"cke_shimscrpt"\x3ewindow.parent.CKEDITOR.tools.enableHtml5Elements(document)\x3c/script\x3e');
							n && CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (f += '\x3cscript id\x3d"cke_basetagscrpt"\x3evar baseTag \x3d document.querySelector( "base" );baseTag.href \x3d baseTag.href;\x3c/script\x3e');
							a = a.replace(/(?=\s*<\/(:?head)>)/, f);
							this.clearCustomData();
							this.clearListeners();
							e.fire("contentDomUnload");
							var p = this.getDocument();
							try {
								p.write(a)
							} catch (q) {
								setTimeout(function () {
									p.write(a)
								}, 0)
							}
						}
					},
					getData: function (a) {
						if (a) return this.getHtml();
						a = this.editor;
						var b = a.config,
							c = b.fullPage,
							e = c && a.docType,
							d = c && a.xmlDeclaration,
							m = this.getDocument(),
							c = c ? m.getDocumentElement().getOuterHtml() : m.getBody().getHtml();
						CKEDITOR.env.gecko && b.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/<br>(?=\s*(:?$|<\/body>))/, ""));
						c = a.dataProcessor.toDataFormat(c);
						d && (c = d + "\n" + c);
						e && (c = e + "\n" + c);
						return c
					},
					focus: function () {
						this._.isLoadingData ? this._.isPendingFocus = !0 : c.baseProto.focus.call(this)
					},
					detach: function () {
						var a = this.editor,
							b = a.document,
							e;
						try {
							e = a.window.getFrame()
						} catch (f) {}
						c.baseProto.detach.call(this);
						this.clearCustomData();
						b.getDocumentElement().clearCustomData();
						CKEDITOR.tools.removeFunction(this._.frameLoadedHandler);
						e && e.getParent() ? (e.clearCustomData(), (a = e.removeCustomData("onResize")) && a.removeListener(), e.remove()) : CKEDITOR.warn("editor-destroy-iframe")
					}
				}
			})
		}(), CKEDITOR.config.disableObjectResizing = !1, CKEDITOR.config.disableNativeTableHandles = !0, CKEDITOR.config.disableNativeSpellChecker = !0, CKEDITOR.config.plugins = "dialogui,dialog,a11yhelp,about,basicstyles,bidi,blockquote,notification,button,toolbar,clipboard,panelbutton,panel,floatpanel,colorbutton,colordialog,copyformatting,menu,contextmenu,dialogadvtab,div,elementspath,enterkey,entities,popup,filetools,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,format,forms,horizontalrule,htmlwriter,iframe,image,indent,indentblock,indentlist,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastefromword,pastetext,preview,print,removeformat,resize,save,scayt,selectall,showblocks,showborders,smiley,sourcearea,specialchar,stylescombo,tab,table,tabletools,tableselection,templates,undo,lineutils,widgetselection,widget,notificationaggregator,uploadwidget,uploadimage,wsc,wysiwygarea",
		CKEDITOR.config.skin = "moono-lisa",
		function () {
			var a = function (a, b) {
				var c = CKEDITOR.getUrl("plugins/" + b);
				a = a.split(",");
				for (var g = 0; g < a.length; g++) CKEDITOR.skin.icons[a[g]] = {
					path: c,
					offset: -a[++g],
					bgsize: a[++g]
				}
			};
			CKEDITOR.env.hidpi ? a("about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,bidiltr,168,,bidirtl,192,,blockquote,216,,copy-rtl,240,,copy,264,,cut-rtl,288,,cut,312,,paste-rtl,336,,paste,360,,codesnippet,384,,bgcolor,408,,textcolor,432,,copyformatting,456,,creatediv,480,,docprops-rtl,504,,docprops,528,,easyimagealigncenter,552,,easyimagealignleft,576,,easyimagealignright,600,,easyimagealt,624,,easyimagefull,648,,easyimageside,672,,easyimageupload,696,,embed,720,,embedsemantic,744,,emojipanel,768,,find-rtl,792,,find,816,,replace,840,,flash,864,,button,888,,checkbox,912,,form,936,,hiddenfield,960,,imagebutton,984,,radio,1008,,select-rtl,1032,,select,1056,,textarea-rtl,1080,,textarea,1104,,textfield-rtl,1128,,textfield,1152,,horizontalrule,1176,,iframe,1200,,image,1224,,indent-rtl,1248,,indent,1272,,outdent-rtl,1296,,outdent,1320,,justifyblock,1344,,justifycenter,1368,,justifyleft,1392,,justifyright,1416,,language,1440,,anchor-rtl,1464,,anchor,1488,,link,1512,,unlink,1536,,bulletedlist-rtl,1560,,bulletedlist,1584,,numberedlist-rtl,1608,,numberedlist,1632,,mathjax,1656,,maximize,1680,,newpage-rtl,1704,,newpage,1728,,pagebreak-rtl,1752,,pagebreak,1776,,pastefromword-rtl,1800,,pastefromword,1824,,pastetext-rtl,1848,,pastetext,1872,,placeholder,1896,,preview-rtl,1920,,preview,1944,,print,1968,,removeformat,1992,,save,2016,,scayt,2040,,selectall,2064,,showblocks-rtl,2088,,showblocks,2112,,smiley,2136,,source-rtl,2160,,source,2184,,sourcedialog-rtl,2208,,sourcedialog,2232,,specialchar,2256,,table,2280,,templates-rtl,2304,,templates,2328,,uicolor,2352,,redo-rtl,2376,,redo,2400,,undo-rtl,2424,,undo,2448,,simplebox,4944,auto,spellchecker,2496,",
				"icons_hidpi.png") : a("about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,bidiltr,168,auto,bidirtl,192,auto,blockquote,216,auto,copy-rtl,240,auto,copy,264,auto,cut-rtl,288,auto,cut,312,auto,paste-rtl,336,auto,paste,360,auto,codesnippet,384,auto,bgcolor,408,auto,textcolor,432,auto,copyformatting,456,auto,creatediv,480,auto,docprops-rtl,504,auto,docprops,528,auto,easyimagealigncenter,552,auto,easyimagealignleft,576,auto,easyimagealignright,600,auto,easyimagealt,624,auto,easyimagefull,648,auto,easyimageside,672,auto,easyimageupload,696,auto,embed,720,auto,embedsemantic,744,auto,emojipanel,768,auto,find-rtl,792,auto,find,816,auto,replace,840,auto,flash,864,auto,button,888,auto,checkbox,912,auto,form,936,auto,hiddenfield,960,auto,imagebutton,984,auto,radio,1008,auto,select-rtl,1032,auto,select,1056,auto,textarea-rtl,1080,auto,textarea,1104,auto,textfield-rtl,1128,auto,textfield,1152,auto,horizontalrule,1176,auto,iframe,1200,auto,image,1224,auto,indent-rtl,1248,auto,indent,1272,auto,outdent-rtl,1296,auto,outdent,1320,auto,justifyblock,1344,auto,justifycenter,1368,auto,justifyleft,1392,auto,justifyright,1416,auto,language,1440,auto,anchor-rtl,1464,auto,anchor,1488,auto,link,1512,auto,unlink,1536,auto,bulletedlist-rtl,1560,auto,bulletedlist,1584,auto,numberedlist-rtl,1608,auto,numberedlist,1632,auto,mathjax,1656,auto,maximize,1680,auto,newpage-rtl,1704,auto,newpage,1728,auto,pagebreak-rtl,1752,auto,pagebreak,1776,auto,pastefromword-rtl,1800,auto,pastefromword,1824,auto,pastetext-rtl,1848,auto,pastetext,1872,auto,placeholder,1896,auto,preview-rtl,1920,auto,preview,1944,auto,print,1968,auto,removeformat,1992,auto,save,2016,auto,scayt,2040,auto,selectall,2064,auto,showblocks-rtl,2088,auto,showblocks,2112,auto,smiley,2136,auto,source-rtl,2160,auto,source,2184,auto,sourcedialog-rtl,2208,auto,sourcedialog,2232,auto,specialchar,2256,auto,table,2280,auto,templates-rtl,2304,auto,templates,2328,auto,uicolor,2352,auto,redo-rtl,2376,auto,redo,2400,auto,undo-rtl,2424,auto,undo,2448,auto,simplebox,2472,auto,spellchecker,2496,auto",
				"icons.png")
		}())
})();
