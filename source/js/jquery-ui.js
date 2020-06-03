/**
 * @license
 jQuery UI - v1.12.1 - 2020-02-29
 http://jqueryui.com
 Includes: widget.js, position.js, data.js, disable-selection.js, focusable.js, form-reset-mixin.js, jquery-1-7.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/mouse.js, widgets/slider.js
 Copyright jQuery Foundation and other contributors; Licensed MIT */
'use strict';
(function (factory) {
    if ("function" == typeof define && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery);
    }
})(function ($) {
    /**
     * @param {!Object} elem
     * @return {?}
     */
    function visible(elem) {
        var visibility = elem.css("visibility");
        for (; "inherit" === visibility;) {
            elem = elem.parent();
            visibility = elem.css("visibility");
        }
        return "hidden" !== visibility;
    }

    $.ui = $.ui || {};
    /** @type {string} */
    $.ui.version = "1.12.1";
    /** @type {number} */
    var uuid = 0;
    /** @type {function(this:(IArrayLike<T>|string), *=, *=): !Array<T>} */
    var slice = Array.prototype.slice;
    $.cleanData = function (origRelativeNext) {
        return function (checkSet) {
            var events;
            var elem;
            var i;
            /** @type {number} */
            i = 0;
            for (; null != (elem = checkSet[i]); i++) {
                try {
                    events = $._data(elem, "events");
                    if (events && events.remove) {
                        $(elem).triggerHandler("remove");
                    }
                } catch (a) {
                }
            }
            origRelativeNext(checkSet);
        };
    }($.cleanData);
    /**
     * @param {string} name
     * @param {!Function} base
     * @param {!Function} prototype
     * @return {?}
     */
    $.widget = function (name, base, prototype) {
        var existingConstructor;
        var constructor;
        var basePrototype;
        var proxiedPrototype = {};
        var namespace = name.split(".")[0];
        name = name.split(".")[1];
        /** @type {string} */
        var n = namespace + "-" + name;
        return prototype || (prototype = base, base = $.Widget), $.isArray(prototype) && (prototype = $.extend.apply(null, [{}].concat(prototype))), $.expr[":"][n.toLowerCase()] = function (e) {
            return !!$.data(e, n);
        }, $[namespace] = $[namespace] || {}, existingConstructor = $[namespace][name], constructor = $[namespace][name] = function (e, t) {
            return this._createWidget ? (arguments.length && this._createWidget(e, t), void 0) : new constructor(e, t);
        }, $.extend(constructor, existingConstructor, {
            version: prototype.version,
            _proto: $.extend({}, prototype),
            _childConstructors: []
        }), basePrototype = new base, basePrototype.options = $.widget.extend({}, basePrototype.options), $.each(prototype, function (prop, value) {
            return $.isFunction(value) ? (proxiedPrototype[prop] = function () {
                /**
                 * @return {?}
                 */
                function e() {
                    return base.prototype[prop].apply(this, arguments);
                }

                /**
                 * @param {?} dim
                 * @return {?}
                 */
                function n(dim) {
                    return base.prototype[prop].apply(this, dim);
                }

                return function () {
                    var _ref12;
                    var tmp = this._super;
                    var __superApply = this._superApply;
                    return this._super = e, this._superApply = n, _ref12 = value.apply(this, arguments), this._super = tmp, this._superApply = __superApply, _ref12;
                };
            }(), void 0) : (proxiedPrototype[prop] = value, void 0);
        }), constructor.prototype = $.widget.extend(basePrototype, {
            widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix || name : name
        }, proxiedPrototype, {
            constructor: constructor,
            namespace: namespace,
            widgetName: name,
            widgetFullName: n
        }), existingConstructor ? ($.each(existingConstructor._childConstructors, function (canCreateDiscussions, child) {
            var childPrototype = child.prototype;
            $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto);
        }), delete existingConstructor._childConstructors) : base._childConstructors.push(constructor), $.widget.bridge(name, constructor), constructor;
    };
    /**
     * @param {!Object} obj
     * @return {?}
     */
    $.widget.extend = function (obj) {
        var s;
        var n;
        /** @type {!Array<?>} */
        var params = slice.call(arguments, 1);
        /** @type {number} */
        var p = 0;
        /** @type {number} */
        var q = params.length;
        for (; q > p; p++) {
            for (s in params[p]) {
                n = params[p][s];
                if (params[p].hasOwnProperty(s) && void 0 !== n) {
                    obj[s] = $.isPlainObject(n) ? $.isPlainObject(obj[s]) ? $.widget.extend({}, obj[s], n) : $.widget.extend({}, n) : n;
                }
            }
        }
        return obj;
    };
    /**
     * @param {string} name
     * @param {!Function} object
     * @return {undefined}
     */
    $.widget.bridge = function (name, object) {
        var id = object.prototype.widgetFullName || name;
        /**
         * @param {string} a
         * @return {?}
         */
        $.fn[name] = function (a) {
            /** @type {boolean} */
            var o = "string" == typeof a;
            /** @type {!Array<?>} */
            var params = slice.call(arguments, 1);
            var h = this;
            return o ? this.length || "instance" !== a ? this.each(function () {
                var i;
                var s = $.data(this, id);
                return "instance" === a ? (h = s, false) : s ? $.isFunction(s[a]) && "_" !== a.charAt(0) ? (i = s[a].apply(s, params), i !== s && void 0 !== i ? (h = i && i.jquery ? h.pushStack(i.get()) : i, false) : void 0) : $.error("no such method '" + a + "' for " + name + " widget instance") : $.error("cannot call methods on " + name + " prior to initialization; " + "attempted to call method '" + a + "'");
            }) : h = void 0 : (params.length && (a = $.widget.extend.apply(null, [a].concat(params))), this.each(function () {
                var t = $.data(this, id);
                if (t) {
                    t.option(a || {});
                    if (t._init) {
                        t._init();
                    }
                } else {
                    $.data(this, id, new object(a, this));
                }
            })), h;
        };
    };
    /**
     * @return {undefined}
     */
    $.Widget = function () {
    };
    /** @type {!Array} */
    $.Widget._childConstructors = [];
    $.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            classes: {},
            disabled: false,
            create: null
        },
        _createWidget: function (options, element) {
            element = $(element || this.defaultElement || this)[0];
            this.element = $(element);
            /** @type {number} */
            this.uuid = uuid++;
            /** @type {string} */
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.bindings = $();
            this.hoverable = $();
            this.focusable = $();
            this.classesElementLookup = {};
            if (element !== this) {
                $.data(element, this.widgetFullName, this);
                this._on(true, this.element, {
                    remove: function (event) {
                        if (event.target === element) {
                            this.destroy();
                        }
                    }
                });
                this.document = $(element.style ? element.ownerDocument : element.document || element);
                this.window = $(this.document[0].defaultView || this.document[0].parentWindow);
            }
            this.options = $.widget.extend({}, this.options, this._getCreateOptions(), options);
            this._create();
            if (this.options.disabled) {
                this._setOptionDisabled(this.options.disabled);
            }
            this._trigger("create", null, this._getCreateEventData());
            this._init();
        },
        _getCreateOptions: function () {
            return {};
        },
        _getCreateEventData: $.noop,
        _create: $.noop,
        _init: $.noop,
        destroy: function () {
            var that = this;
            this._destroy();
            $.each(this.classesElementLookup, function (key, value) {
                that._removeClass(value, key);
            });
            this.element.off(this.eventNamespace).removeData(this.widgetFullName);
            this.widget().off(this.eventNamespace).removeAttr("aria-disabled");
            this.bindings.off(this.eventNamespace);
        },
        _destroy: $.noop,
        widget: function () {
            return this.element;
        },
        option: function (key, value) {
            var parts;
            var curOption;
            var i;
            /** @type {string} */
            var options = key;
            if (0 === arguments.length) {
                return $.widget.extend({}, this.options);
            }
            if ("string" == typeof key) {
                if (options = {}, parts = key.split("."), key = parts.shift(), parts.length) {
                    curOption = options[key] = $.widget.extend({}, this.options[key]);
                    /** @type {number} */
                    i = 0;
                    for (; parts.length - 1 > i; i++) {
                        curOption[parts[i]] = curOption[parts[i]] || {};
                        curOption = curOption[parts[i]];
                    }
                    if (key = parts.pop(), 1 === arguments.length) {
                        return void 0 === curOption[key] ? null : curOption[key];
                    }
                    curOption[key] = value;
                } else {
                    if (1 === arguments.length) {
                        return void 0 === this.options[key] ? null : this.options[key];
                    }
                    options[key] = value;
                }
            }
            return this._setOptions(options), this;
        },
        _setOptions: function (options) {
            var key;
            for (key in options) {
                this._setOption(key, options[key]);
            }
            return this;
        },
        _setOption: function (t, value) {
            return "classes" === t && this._setOptionClasses(value), this.options[t] = value, "disabled" === t && this._setOptionDisabled(value), this;
        },
        _setOptionClasses: function (value) {
            var classKey;
            var elements;
            var children;
            for (classKey in value) {
                children = this.classesElementLookup[classKey];
                if (value[classKey] !== this.options.classes[classKey] && children && children.length) {
                    elements = $(children.get());
                    this._removeClass(children, classKey);
                    elements.addClass(this._classes({
                        element: elements,
                        keys: classKey,
                        classes: value,
                        add: true
                    }));
                }
            }
        },
        _setOptionDisabled: function (value) {
            this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!value);
            if (value) {
                this._removeClass(this.hoverable, null, "ui-state-hover");
                this._removeClass(this.focusable, null, "ui-state-focus");
            }
        },
        enable: function () {
            return this._setOptions({
                disabled: false
            });
        },
        disable: function () {
            return this._setOptions({
                disabled: true
            });
        },
        _classes: function (options) {
            /**
             * @param {!Array} classes
             * @param {boolean} checkOption
             * @return {undefined}
             */
            function processClassString(classes, checkOption) {
                var a;
                var i;
                /** @type {number} */
                i = 0;
                for (; classes.length > i; i++) {
                    a = that.classesElementLookup[classes[i]] || $();
                    a = options.add ? $($.unique(a.get().concat(options.element.get()))) : $(a.not(options.element).get());
                    that.classesElementLookup[classes[i]] = a;
                    remainingClasses.push(classes[i]);
                    if (checkOption && options.classes[classes[i]]) {
                        remainingClasses.push(options.classes[classes[i]]);
                    }
                }
            }

            /** @type {!Array} */
            var remainingClasses = [];
            var that = this;
            return options = $.extend({
                element: this.element,
                classes: this.options.classes || {}
            }, options), this._on(options.element, {
                remove: "_untrackClassesElement"
            }), options.keys && processClassString(options.keys.match(/\S+/g) || [], true), options.extra && processClassString(options.extra.match(/\S+/g) || []), remainingClasses.join(" ");
        },
        _untrackClassesElement: function (event) {
            var that = this;
            $.each(that.classesElementLookup, function (key, showTargets) {
                if (-1 !== $.inArray(event.target, showTargets)) {
                    that.classesElementLookup[key] = $(showTargets.not(event.target).get());
                }
            });
        },
        _removeClass: function (className, keys, extra) {
            return this._toggleClass(className, keys, extra, false);
        },
        _addClass: function (element, keys, extra) {
            return this._toggleClass(element, keys, extra, true);
        },
        _toggleClass: function (element, keys, extra, add) {
            add = "boolean" == typeof add ? add : extra;
            /** @type {boolean} */
            var shift = "string" == typeof element || null === element;
            var options = {
                extra: shift ? keys : extra,
                keys: shift ? element : keys,
                element: shift ? this.element : element,
                add: add
            };
            return options.element.toggleClass(this._classes(options), add), this;
        },
        _on: function (t, element, handlers) {
            var delegateElement;
            var a = this;
            if ("boolean" != typeof t) {
                /** @type {string} */
                handlers = element;
                /** @type {string} */
                element = t;
                /** @type {boolean} */
                t = false;
            }
            if (handlers) {
                element = delegateElement = $(element);
                this.bindings = this.bindings.add(element);
            } else {
                /** @type {string} */
                handlers = element;
                element = this.element;
                delegateElement = this.widget();
            }
            $.each(handlers, function (_testModuleName, o) {
                /**
                 * @return {?}
                 */
                function handlerProxy() {
                    return t || a.options.disabled !== true && !$(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? a[o] : o).apply(a, arguments) : void 0;
                }

                if ("string" != typeof o) {
                    handlerProxy.guid = o.guid = o.guid || handlerProxy.guid || $.guid++;
                }
                var match = _testModuleName.match(/^([\w:-]*)\s*(.*)$/);
                var eventName = match[1] + a.eventNamespace;
                var selector = match[2];
                if (selector) {
                    delegateElement.on(eventName, selector, handlerProxy);
                } else {
                    element.on(eventName, handlerProxy);
                }
            });
        },
        _off: function (element, eventName) {
            eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            element.off(eventName).off(eventName);
            this.bindings = $(this.bindings.not(element).get());
            this.focusable = $(this.focusable.not(element).get());
            this.hoverable = $(this.hoverable.not(element).get());
        },
        _delay: function (e, t) {
            /**
             * @return {?}
             */
            function handlerProxy() {
                return ("string" == typeof e ? a[e] : e).apply(a, arguments);
            }

            var a = this;
            return setTimeout(handlerProxy, t || 0);
        },
        _hoverable: function (element) {
            this.hoverable = this.hoverable.add(element);
            this._on(element, {
                mouseenter: function (event) {
                    this._addClass($(event.currentTarget), null, "ui-state-hover");
                },
                mouseleave: function (event) {
                    this._removeClass($(event.currentTarget), null, "ui-state-hover");
                }
            });
        },
        _focusable: function (element) {
            this.focusable = this.focusable.add(element);
            this._on(element, {
                focusin: function (event) {
                    this._addClass($(event.currentTarget), null, "ui-state-focus");
                },
                focusout: function (event) {
                    this._removeClass($(event.currentTarget), null, "ui-state-focus");
                }
            });
        },
        _trigger: function (type, event, data) {
            var prop;
            var orig;
            var callback = this.options[type];
            if (data = data || {}, event = $.Event(event), event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase(), event.target = this.element[0], orig = event.originalEvent) {
                for (prop in orig) {
                    if (!(prop in event)) {
                        event[prop] = orig[prop];
                    }
                }
            }
            return this.element.trigger(event, data), !($.isFunction(callback) && callback.apply(this.element[0], [event].concat(data)) === false || event.isDefaultPrevented());
        }
    };
    $.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function (t, i) {
        /**
         * @param {!Object} s
         * @param {!Object} n
         * @param {!Function} a
         * @return {undefined}
         */
        $.Widget.prototype["_" + t] = function (s, n, a) {
            if ("string" == typeof n) {
                n = {
                    effect: n
                };
            }
            var hasOptions;
            var r = n ? n === true || "number" == typeof n ? i : n.effect || i : t;
            n = n || {};
            if ("number" == typeof n) {
                n = {
                    duration: n
                };
            }
            /** @type {boolean} */
            hasOptions = !$.isEmptyObject(n);
            /** @type {!Function} */
            n.complete = a;
            if (n.delay) {
                s.delay(n.delay);
            }
            if (hasOptions && $.effects && $.effects.effect[r]) {
                s[t](n);
            } else {
                if (r !== t && s[r]) {
                    s[r](n.duration, n.easing, a);
                } else {
                    s.queue(function (saveNotifs) {
                        $(this)[t]();
                        if (a) {
                            a.call(s[0]);
                        }
                        saveNotifs();
                    });
                }
            }
        };
    });
    $.widget;
    (function () {
        /**
         * @param {!Object} offsets
         * @param {number} width
         * @param {number} height
         * @return {?}
         */
        function getOffsets(offsets, width, height) {
            return [parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1), parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1)];
        }

        /**
         * @param {?} property
         * @param {string} value
         * @return {?}
         */
        function parseCss(property, value) {
            return parseInt($.css(property, value), 10) || 0;
        }

        /**
         * @param {!Object} n
         * @return {?}
         */
        function getDimensions(n) {
            var item = n[0];
            return 9 === item.nodeType ? {
                width: n.width(),
                height: n.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            } : $.isWindow(item) ? {
                width: n.width(),
                height: n.height(),
                offset: {
                    top: n.scrollTop(),
                    left: n.scrollLeft()
                }
            } : item.preventDefault ? {
                width: 0,
                height: 0,
                offset: {
                    top: item.pageY,
                    left: item.pageX
                }
            } : {
                width: n.outerWidth(),
                height: n.outerHeight(),
                offset: n.offset()
            };
        }

        var result;
        /** @type {function(...?): number} */
        var max = Math.max;
        /** @type {function(?): number} */
        var abs = Math.abs;
        /** @type {!RegExp} */
        var rhorizontal = /left|center|right/;
        /** @type {!RegExp} */
        var rvertical = /top|center|bottom/;
        /** @type {!RegExp} */
        var roffset = /[\+\-]\d+(\.[\d]+)?%?/;
        /** @type {!RegExp} */
        var rposition = /^\w+/;
        /** @type {!RegExp} */
        var rpercent = /%$/;
        /** @type {function(!Object): ?} */
        var oldSetupComputes = $.fn.position;
        $.position = {
            scrollbarWidth: function () {
                if (void 0 !== result) {
                    return result;
                }
                var width;
                var value;
                var div = $("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>");
                var target = div.children()[0];
                return $("body").append(div), width = target.offsetWidth, div.css("overflow", "scroll"), value = target.offsetWidth, width === value && (value = div[0].clientWidth), div.remove(), result = width - value;
            },
            getScrollInfo: function (within) {
                var overflowY = within.isWindow || within.isDocument ? "" : within.element.css("overflow-x");
                var undefined = within.isWindow || within.isDocument ? "" : within.element.css("overflow-y");
                /** @type {boolean} */
                var isLabel = "scroll" === overflowY || "auto" === overflowY && within.width < within.element[0].scrollWidth;
                /** @type {boolean} */
                var appearDelayWidth = "scroll" === undefined || "auto" === undefined && within.height < within.element[0].scrollHeight;
                return {
                    width: appearDelayWidth ? $.position.scrollbarWidth() : 0,
                    height: isLabel ? $.position.scrollbarWidth() : 0
                };
            },
            getWithinInfo: function (element) {
                var withinElement = $(element || window);
                var isWindow = $.isWindow(withinElement[0]);
                /** @type {boolean} */
                var isDocument = !!withinElement[0] && 9 === withinElement[0].nodeType;
                /** @type {boolean} */
                var hasOffset = !isWindow && !isDocument;
                return {
                    element: withinElement,
                    isWindow: isWindow,
                    isDocument: isDocument,
                    offset: hasOffset ? $(element).offset() : {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: withinElement.scrollLeft(),
                    scrollTop: withinElement.scrollTop(),
                    width: withinElement.outerWidth(),
                    height: withinElement.outerHeight()
                };
            }
        };
        /**
         * @param {!Object} options
         * @return {?}
         */
        $.fn.position = function (options) {
            if (!options || !options.of) {
                return oldSetupComputes.apply(this, arguments);
            }
            options = $.extend({}, options);
            var atOffset;
            var targetWidth;
            var targetHeight;
            var targetOffset;
            var basePosition;
            var dimensions;
            var target = $(options.of);
            var within = $.position.getWithinInfo(options.within);
            var scrollInfo = $.position.getScrollInfo(within);
            var collision = (options.collision || "flip").split(" ");
            var offsets = {};
            return dimensions = getDimensions(target), target[0].preventDefault && (options.at = "left top"), targetWidth = dimensions.width, targetHeight = dimensions.height, targetOffset = dimensions.offset, basePosition = $.extend({}, targetOffset), $.each(["my", "at"], function () {
                var t;
                var e;
                var pos = (options[this] || "").split(" ");
                if (1 === pos.length) {
                    pos = rhorizontal.test(pos[0]) ? pos.concat(["center"]) : rvertical.test(pos[0]) ? ["center"].concat(pos) : ["center", "center"];
                }
                pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center";
                pos[1] = rvertical.test(pos[1]) ? pos[1] : "center";
                /** @type {(Array<string>|null)} */
                t = roffset.exec(pos[0]);
                /** @type {(Array<string>|null)} */
                e = roffset.exec(pos[1]);
                /** @type {!Array} */
                offsets[this] = [t ? t[0] : 0, e ? e[0] : 0];
                /** @type {!Array} */
                options[this] = [rposition.exec(pos[0])[0], rposition.exec(pos[1])[0]];
            }), 1 === collision.length && (collision[1] = collision[0]), "right" === options.at[0] ? basePosition.left += targetWidth : "center" === options.at[0] && (basePosition.left += targetWidth / 2), "bottom" === options.at[1] ? basePosition.top += targetHeight : "center" === options.at[1] && (basePosition.top += targetHeight / 2), atOffset = getOffsets(offsets.at, targetWidth, targetHeight), basePosition.left += atOffset[0], basePosition.top += atOffset[1], this.each(function () {
                var collisionPosition;
                var using;
                var self = $(this);
                var elemWidth = self.outerWidth();
                var elemHeight = self.outerHeight();
                var marginLeft = parseCss(this, "marginLeft");
                var marginTop = parseCss(this, "marginTop");
                var collisionWidth = elemWidth + marginLeft + parseCss(this, "marginRight") + scrollInfo.width;
                var collisionHeight = elemHeight + marginTop + parseCss(this, "marginBottom") + scrollInfo.height;
                var position = $.extend({}, basePosition);
                var myOffset = getOffsets(offsets.my, self.outerWidth(), self.outerHeight());
                if ("right" === options.my[0]) {
                    position.left -= elemWidth;
                } else {
                    if ("center" === options.my[0]) {
                        position.left -= elemWidth / 2;
                    }
                }
                if ("bottom" === options.my[1]) {
                    position.top -= elemHeight;
                } else {
                    if ("center" === options.my[1]) {
                        position.top -= elemHeight / 2;
                    }
                }
                position.left += myOffset[0];
                position.top += myOffset[1];
                collisionPosition = {
                    marginLeft: marginLeft,
                    marginTop: marginTop
                };
                $.each(["left", "top"], function (i, dir) {
                    if ($.ui.position[collision[i]]) {
                        $.ui.position[collision[i]][dir](position, {
                            targetWidth: targetWidth,
                            targetHeight: targetHeight,
                            elemWidth: elemWidth,
                            elemHeight: elemHeight,
                            collisionPosition: collisionPosition,
                            collisionWidth: collisionWidth,
                            collisionHeight: collisionHeight,
                            offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
                            my: options.my,
                            at: options.at,
                            within: within,
                            elem: self
                        });
                    }
                });
                if (options.using) {
                    /**
                     * @param {?} props
                     * @return {undefined}
                     */
                    using = function (props) {
                        /** @type {number} */
                        var left = targetOffset.left - position.left;
                        /** @type {number} */
                        var right = left + targetWidth - elemWidth;
                        /** @type {number} */
                        var top = targetOffset.top - position.top;
                        /** @type {number} */
                        var bottom = top + targetHeight - elemHeight;
                        var feedback = {
                            target: {
                                element: target,
                                left: targetOffset.left,
                                top: targetOffset.top,
                                width: targetWidth,
                                height: targetHeight
                            },
                            element: {
                                element: self,
                                left: position.left,
                                top: position.top,
                                width: elemWidth,
                                height: elemHeight
                            },
                            horizontal: 0 > right ? "left" : left > 0 ? "right" : "center",
                            vertical: 0 > bottom ? "top" : top > 0 ? "bottom" : "middle"
                        };
                        if (elemWidth > targetWidth && targetWidth > abs(left + right)) {
                            /** @type {string} */
                            feedback.horizontal = "center";
                        }
                        if (elemHeight > targetHeight && targetHeight > abs(top + bottom)) {
                            /** @type {string} */
                            feedback.vertical = "middle";
                        }
                        /** @type {string} */
                        feedback.important = max(abs(left), abs(right)) > max(abs(top), abs(bottom)) ? "horizontal" : "vertical";
                        options.using.call(this, props, feedback);
                    };
                }
                self.offset($.extend(position, {
                    using: using
                }));
            });
        };
        $.ui.position = {
            fit: {
                left: function (position, data) {
                    var newOverRight;
                    var within = data.within;
                    var withinOffset = within.isWindow ? within.scrollLeft : within.offset.left;
                    var outerWidth = within.width;
                    /** @type {number} */
                    var collisionPosLeft = position.left - data.collisionPosition.marginLeft;
                    /** @type {number} */
                    var overLeft = withinOffset - collisionPosLeft;
                    /** @type {number} */
                    var overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset;
                    if (data.collisionWidth > outerWidth) {
                        if (overLeft > 0 && 0 >= overRight) {
                            /** @type {number} */
                            newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
                            position.left += overLeft - newOverRight;
                        } else {
                            position.left = overRight > 0 && 0 >= overLeft ? withinOffset : overLeft > overRight ? withinOffset + outerWidth - data.collisionWidth : withinOffset;
                        }
                    } else {
                        if (overLeft > 0) {
                            position.left += overLeft;
                        } else {
                            if (overRight > 0) {
                                position.left -= overRight;
                            } else {
                                /** @type {number} */
                                position.left = max(position.left - collisionPosLeft, position.left);
                            }
                        }
                    }
                },
                top: function (position, data) {
                    var newOverBottom;
                    var within = data.within;
                    var withinOffset = within.isWindow ? within.scrollTop : within.offset.top;
                    var outerHeight = data.within.height;
                    /** @type {number} */
                    var collisionPosTop = position.top - data.collisionPosition.marginTop;
                    /** @type {number} */
                    var overTop = withinOffset - collisionPosTop;
                    /** @type {number} */
                    var overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset;
                    if (data.collisionHeight > outerHeight) {
                        if (overTop > 0 && 0 >= overBottom) {
                            /** @type {number} */
                            newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
                            position.top += overTop - newOverBottom;
                        } else {
                            position.top = overBottom > 0 && 0 >= overTop ? withinOffset : overTop > overBottom ? withinOffset + outerHeight - data.collisionHeight : withinOffset;
                        }
                    } else {
                        if (overTop > 0) {
                            position.top += overTop;
                        } else {
                            if (overBottom > 0) {
                                position.top -= overBottom;
                            } else {
                                /** @type {number} */
                                position.top = max(position.top - collisionPosTop, position.top);
                            }
                        }
                    }
                }
            },
            flip: {
                left: function (position, data) {
                    var threshold;
                    var newOverLeft;
                    var within = data.within;
                    var withinOffset = within.offset.left + within.scrollLeft;
                    var outerWidth = within.width;
                    var offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left;
                    /** @type {number} */
                    var collisionPosLeft = position.left - data.collisionPosition.marginLeft;
                    /** @type {number} */
                    var overLeft = collisionPosLeft - offsetLeft;
                    /** @type {number} */
                    var dist = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft;
                    var myOffset = "left" === data.my[0] ? -data.elemWidth : "right" === data.my[0] ? data.elemWidth : 0;
                    var atOffset = "left" === data.at[0] ? data.targetWidth : "right" === data.at[0] ? -data.targetWidth : 0;
                    /** @type {number} */
                    var offset = -2 * data.offset[0];
                    if (0 > overLeft) {
                        /** @type {number} */
                        threshold = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;
                        if (0 > threshold || abs(overLeft) > threshold) {
                            position.left += myOffset + atOffset + offset;
                        }
                    } else {
                        if (dist > 0) {
                            /** @type {number} */
                            newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;
                            if (newOverLeft > 0 || dist > abs(newOverLeft)) {
                                position.left += myOffset + atOffset + offset;
                            }
                        }
                    }
                },
                top: function (position, data) {
                    var diff;
                    var threshold;
                    var within = data.within;
                    var withinOffset = within.offset.top + within.scrollTop;
                    var outerHeight = within.height;
                    var offsetTop = within.isWindow ? within.scrollTop : within.offset.top;
                    /** @type {number} */
                    var collisionPosTop = position.top - data.collisionPosition.marginTop;
                    /** @type {number} */
                    var overTop = collisionPosTop - offsetTop;
                    /** @type {number} */
                    var accelerateAmount = collisionPosTop + data.collisionHeight - outerHeight - offsetTop;
                    /** @type {boolean} */
                    var top = "top" === data.my[1];
                    var myOffset = top ? -data.elemHeight : "bottom" === data.my[1] ? data.elemHeight : 0;
                    var atOffset = "top" === data.at[1] ? data.targetHeight : "bottom" === data.at[1] ? -data.targetHeight : 0;
                    /** @type {number} */
                    var offset = -2 * data.offset[1];
                    if (0 > overTop) {
                        /** @type {number} */
                        threshold = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;
                        if (0 > threshold || abs(overTop) > threshold) {
                            position.top += myOffset + atOffset + offset;
                        }
                    } else {
                        if (accelerateAmount > 0) {
                            /** @type {number} */
                            diff = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;
                            if (diff > 0 || accelerateAmount > abs(diff)) {
                                position.top += myOffset + atOffset + offset;
                            }
                        }
                    }
                }
            },
            flipfit: {
                left: function () {
                    $.ui.position.flip.left.apply(this, arguments);
                    $.ui.position.fit.left.apply(this, arguments);
                },
                top: function () {
                    $.ui.position.flip.top.apply(this, arguments);
                    $.ui.position.fit.top.apply(this, arguments);
                }
            }
        };
    })();
    $.ui.position;
    $.extend($.expr[":"], {
        data: $.expr.createPseudo ? $.expr.createPseudo(function (e) {
            return function (i) {
                return !!$.data(i, e);
            };
        }) : function (elem, num, match) {
            return !!$.data(elem, match[3]);
        }
    });
    $.fn.extend({
        disableSelection: function () {
            /** @type {string} */
            var eventType = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
            return function () {
                return this.on(eventType + ".ui-disableSelection", function (event) {
                    event.preventDefault();
                });
            };
        }(),
        enableSelection: function () {
            return this.off(".ui-disableSelection");
        }
    });
    /**
     * @param {!Element} element
     * @param {string} isTabIndexNotNaN
     * @return {?}
     */
    $.ui.focusable = function (element, isTabIndexNotNaN) {
        var i;
        var f;
        var a;
        var fview;
        var ex1go;
        var nodeName = element.nodeName.toLowerCase();
        return "area" === nodeName ? (i = element.parentNode, f = i.name, element.href && f && "map" === i.nodeName.toLowerCase() ? (a = $("img[usemap='#" + f + "']"), a.length > 0 && a.is(":visible")) : false) : (/^(input|select|textarea|button|object)$/.test(nodeName) ? (fview = !element.disabled, fview && (ex1go = $(element).closest("fieldset")[0], ex1go && (fview = !ex1go.disabled))) : fview = "a" === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN, fview && $(element).is(":visible") &&
        visible($(element)));
    };
    $.extend($.expr[":"], {
        focusable: function (element) {
            return $.ui.focusable(element, null != $.attr(element, "tabindex"));
        }
    });
    $.ui.focusable;
    /**
     * @return {?}
     */
    $.fn.form = function () {
        return "string" == typeof this[0].form ? this.closest("form") : $(this[0].form);
    };
    $.ui.formResetMixin = {
        _formResetHandler: function () {
            var form = $(this);
            setTimeout(function () {
                var instances = form.data("ui-form-reset-instances");
                $.each(instances, function () {
                    this.refresh();
                });
            });
        },
        _bindFormResetHandler: function () {
            if (this.form = this.element.form(), this.form.length) {
                var instances = this.form.data("ui-form-reset-instances") || [];
                if (!instances.length) {
                    this.form.on("reset.ui-form-reset", this._formResetHandler);
                }
                instances.push(this);
                this.form.data("ui-form-reset-instances", instances);
            }
        },
        _unbindFormResetHandler: function () {
            if (this.form.length) {
                var instances = this.form.data("ui-form-reset-instances");
                instances.splice($.inArray(this, instances), 1);
                if (instances.length) {
                    this.form.data("ui-form-reset-instances", instances);
                } else {
                    this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset");
                }
            }
        }
    };
    if ("1.7" === $.fn.jquery.substring(0, 3)) {
        $.each(["Width", "Height"], function (canCreateDiscussions, name) {
            /**
             * @param {?} elem
             * @param {!Array} measure
             * @param {boolean} isOuter
             * @param {?} name
             * @return {?}
             */
            function getWH(elem, measure, isOuter, name) {
                return $.each(tablesongs, function () {
                    /** @type {number} */
                    measure = measure - (parseFloat($.css(elem, "padding" + this)) || 0);
                    if (isOuter) {
                        /** @type {number} */
                        measure = measure - (parseFloat($.css(elem, "border" + this + "Width")) || 0);
                    }
                    if (name) {
                        /** @type {number} */
                        measure = measure - (parseFloat($.css(elem, "margin" + this)) || 0);
                    }
                }), measure;
            }

            /** @type {!Array} */
            var tablesongs = "Width" === name ? ["Left", "Right"] : ["Top", "Bottom"];
            var itemCSS = name.toLowerCase();
            var orig = {
                innerWidth: $.fn.innerWidth,
                innerHeight: $.fn.innerHeight,
                outerWidth: $.fn.outerWidth,
                outerHeight: $.fn.outerHeight
            };
            /**
             * @param {!Array} width
             * @return {?}
             */
            $.fn["inner" + name] = function (width) {
                return void 0 === width ? orig["inner" + name].call(this) : this.each(function () {
                    $(this).css(itemCSS, getWH(this, width) + "px");
                });
            };
            /**
             * @param {!Array} width
             * @param {?} fontSize
             * @return {?}
             */
            $.fn["outer" + name] = function (width, fontSize) {
                return "number" != typeof width ? orig["outer" + name].call(this, width) : this.each(function () {
                    $(this).css(itemCSS, getWH(this, width, true, fontSize) + "px");
                });
            };
        });
        /**
         * @param {!Object} selector
         * @return {?}
         */
        $.fn.addBack = function (selector) {
            return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
        };
    }
    $.ui.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
    };
    $.ui.escapeSelector = function () {
        /** @type {!RegExp} */
        var tokensRegExp = /([!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~])/g;
        return function (originalBaseURL) {
            return originalBaseURL.replace(tokensRegExp, "\\$1");
        };
    }();
    /**
     * @return {?}
     */
    $.fn.labels = function () {
        var ancestor;
        var callback;
        var id;
        var node;
        var wrappedBadge;
        return this[0].labels && this[0].labels.length ? this.pushStack(this[0].labels) : (node = this.eq(0).parents("label"), id = this.attr("id"), id && (ancestor = this.eq(0).parents().last(), wrappedBadge = ancestor.add(ancestor.length ? ancestor.siblings() : this.siblings()), callback = "label[for='" + $.ui.escapeSelector(id) + "']", node = node.add(wrappedBadge.find(callback).addBack(callback))), this.pushStack(node));
    };
    /**
     * @param {boolean} includeHidden
     * @return {?}
     */
    $.fn.scrollParent = function (includeHidden) {
        var value = this.css("position");
        /** @type {boolean} */
        var isTranslucent = "absolute" === value;
        /** @type {!RegExp} */
        var overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;
        var options = this.parents().filter(function () {
            var parent = $(this);
            return isTranslucent && "static" === parent.css("position") ? false : overflowRegex.test(parent.css("overflow") + parent.css("overflow-y") + parent.css("overflow-x"));
        }).eq(0);
        return "fixed" !== value && options.length ? options : $(this[0].ownerDocument || document);
    };
    $.extend($.expr[":"], {
        tabbable: function (element) {
            var tabIndex = $.attr(element, "tabindex");
            /** @type {boolean} */
            var hasTabindex = null != tabIndex;
            return (!hasTabindex || tabIndex >= 0) && $.ui.focusable(element, hasTabindex);
        }
    });
    $.fn.extend({
        uniqueId: function () {
            /** @type {number} */
            var uuid = 0;
            return function () {
                return this.each(function () {
                    if (!this.id) {
                        /** @type {string} */
                        this.id = "ui-id-" + ++uuid;
                    }
                });
            };
        }(),
        removeUniqueId: function () {
            return this.each(function () {
                if (/^ui-id-\d+$/.test(this.id)) {
                    $(this).removeAttr("id");
                }
            });
        }
    });
    /** @type {boolean} */
    $.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    /** @type {boolean} */
    var n = false;
    $(document).on("mouseup", function () {
        /** @type {boolean} */
        n = false;
    });
    $.widget("ui.mouse", {
        version: "1.12.1",
        options: {
            cancel: "input, textarea, button, select, option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function () {
            var that = this;
            this.element.on("mousedown." + this.widgetName, function (event) {
                return that._mouseDown(event);
            }).on("click." + this.widgetName, function (event) {
                return true === $.data(event.target, that.widgetName + ".preventClickEvent") ? ($.removeData(event.target, that.widgetName + ".preventClickEvent"), event.stopImmediatePropagation(), false) : void 0;
            });
            /** @type {boolean} */
            this.started = false;
        },
        _mouseDestroy: function () {
            this.element.off("." + this.widgetName);
            if (this._mouseMoveDelegate) {
                this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);
            }
        },
        _mouseDown: function (event) {
            if (!n) {
                /** @type {boolean} */
                this._mouseMoved = false;
                if (this._mouseStarted) {
                    this._mouseUp(event);
                }
                /** @type {!Event} */
                this._mouseDownEvent = event;
                var that = this;
                /** @type {boolean} */
                var isIE = 1 === event.which;
                var isIE8 = "string" == typeof this.options.cancel && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false;
                return isIE && !isIE8 && this._mouseCapture(event) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                    /** @type {boolean} */
                    that.mouseDelayMet = true;
                }, this.options.delay)), this._mouseDistanceMet(event) && this._mouseDelayMet(event) && (this._mouseStarted = this._mouseStart(event) !== false, !this._mouseStarted) ? (event.preventDefault(), true) : (true === $.data(event.target, this.widgetName + ".preventClickEvent") && $.removeData(event.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (event) {
                    return that._mouseMove(event);
                }, this._mouseUpDelegate = function (event) {
                    return that._mouseUp(event);
                }, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate), event.preventDefault(), n = true, true)) : true;
            }
        },
        _mouseMove: function (event) {
            if (this._mouseMoved) {
                if ($.ui.ie && (!document.documentMode || 9 > document.documentMode) && !event.button) {
                    return this._mouseUp(event);
                }
                if (!event.which) {
                    if (event.originalEvent.altKey || event.originalEvent.ctrlKey || event.originalEvent.metaKey || event.originalEvent.shiftKey) {
                        /** @type {boolean} */
                        this.ignoreMissingWhich = true;
                    } else {
                        if (!this.ignoreMissingWhich) {
                            return this._mouseUp(event);
                        }
                    }
                }
            }
            return (event.which || event.button) && (this._mouseMoved = true), this._mouseStarted ? (this._mouseDrag(event), event.preventDefault()) : (this._mouseDistanceMet(event) && this._mouseDelayMet(event) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, event) !== false, this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event)), !this._mouseStarted);
        },
        _mouseUp: function (event) {
            this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                /** @type {boolean} */
                this._mouseStarted = false;
                if (event.target === this._mouseDownEvent.target) {
                    $.data(event.target, this.widgetName + ".preventClickEvent", true);
                }
                this._mouseStop(event);
            }
            if (this._mouseDelayTimer) {
                clearTimeout(this._mouseDelayTimer);
                delete this._mouseDelayTimer;
            }
            /** @type {boolean} */
            this.ignoreMissingWhich = false;
            /** @type {boolean} */
            n = false;
            event.preventDefault();
        },
        _mouseDistanceMet: function (event) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance;
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet;
        },
        _mouseStart: function () {
        },
        _mouseDrag: function () {
        },
        _mouseStop: function () {
        },
        _mouseCapture: function () {
            return true;
        }
    });
    $.widget("ui.slider", $.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "slide",
        options: {
            animate: false,
            classes: {
                "ui-slider": "ui-corner-all",
                "ui-slider-handle": "ui-corner-all",
                "ui-slider-range": "ui-corner-all ui-widget-header"
            },
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        numPages: 5,
        _create: function () {
            /** @type {boolean} */
            this._keySliding = false;
            /** @type {boolean} */
            this._mouseSliding = false;
            /** @type {boolean} */
            this._animateOff = true;
            /** @type {null} */
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this._calculateNewMax();
            this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content");
            this._refresh();
            /** @type {boolean} */
            this._animateOff = false;
        },
        _refresh: function () {
            this._createRange();
            this._createHandles();
            this._setupEvents();
            this._refreshValue();
        },
        _createHandles: function () {
            var end;
            var n;
            var opts = this.options;
            var val = this.element.find(".ui-slider-handle");
            /** @type {string} */
            var COMPAT_ARG = "<span tabindex='0'></span>";
            /** @type {!Array} */
            var a = [];
            n = opts.values && opts.values.length || 1;
            if (val.length > n) {
                val.slice(n).remove();
                val = val.slice(0, n);
            }
            end = val.length;
            for (; n > end; end++) {
                a.push(COMPAT_ARG);
            }
            this.handles = val.add($(a.join("")).appendTo(this.element));
            this._addClass(this.handles, "ui-slider-handle", "ui-state-default");
            this.handle = this.handles.eq(0);
            this.handles.each(function (e) {
                $(this).data("ui-slider-handle-index", e).attr("tabIndex", 0);
            });
        },
        _createRange: function () {
            var o = this.options;
            if (o.range) {
                if (o.range === true) {
                    if (o.values) {
                        if (o.values.length && 2 !== o.values.length) {
                            /** @type {!Array} */
                            o.values = [o.values[0], o.values[0]];
                        } else {
                            if ($.isArray(o.values)) {
                                o.values = o.values.slice(0);
                            }
                        }
                    } else {
                        /** @type {!Array} */
                        o.values = [this._valueMin(), this._valueMin()];
                    }
                }
                if (this.range && this.range.length) {
                    this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max");
                    this.range.css({
                        left: "",
                        bottom: ""
                    });
                } else {
                    this.range = $("<div>").appendTo(this.element);
                    this._addClass(this.range, "ui-slider-range");
                }
                if ("min" === o.range || "max" === o.range) {
                    this._addClass(this.range, "ui-slider-range-" + o.range);
                }
            } else {
                if (this.range) {
                    this.range.remove();
                }
                /** @type {null} */
                this.range = null;
            }
        },
        _setupEvents: function () {
            this._off(this.handles);
            this._on(this.handles, this._handleEvents);
            this._hoverable(this.handles);
            this._focusable(this.handles);
        },
        _destroy: function () {
            this.handles.remove();
            if (this.range) {
                this.range.remove();
            }
            this._mouseDestroy();
        },
        _mouseCapture: function (event) {
            var position;
            var normValue;
            var s;
            var closestHandle;
            var index;
            var allowed;
            var gamePos;
            var mouseOverHandle;
            var that = this;
            var o = this.options;
            return o.disabled ? false : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), position = {
                x: event.pageX,
                y: event.pageY
            }, normValue = this._normValueFromMouse(position), s = this._valueMax() - this._valueMin() + 1, this.handles.each(function (i) {
                /** @type {number} */
                var e = Math.abs(normValue - that.values(i));
                if (s > e || s === e && (i === that._lastChangedValue || that.values(i) === o.min)) {
                    /** @type {number} */
                    s = e;
                    closestHandle = $(this);
                    /** @type {number} */
                    index = i;
                }
            }), allowed = this._start(event, index), allowed === false ? false : (this._mouseSliding = true, this._handleIndex = index, this._addClass(closestHandle, null, "ui-state-active"), closestHandle.trigger("focus"), gamePos = closestHandle.offset(), mouseOverHandle = !$(event.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = mouseOverHandle ? {
                left: 0,
                top: 0
            } : {
                left: event.pageX - gamePos.left - closestHandle.width() / 2,
                top: event.pageY - gamePos.top - closestHandle.height() / 2 - (parseInt(closestHandle.css("borderTopWidth"), 10) || 0) - (parseInt(closestHandle.css("borderBottomWidth"), 10) || 0) + (parseInt(closestHandle.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(event, index, normValue), this._animateOff = true, true));
        },
        _mouseStart: function () {
            return true;
        },
        _mouseDrag: function (event) {
            var position = {
                x: event.pageX,
                y: event.pageY
            };
            var normValue = this._normValueFromMouse(position);
            return this._slide(event, this._handleIndex, normValue), false;
        },
        _mouseStop: function (event) {
            return this._removeClass(this.handles, null, "ui-state-active"), this._mouseSliding = false, this._stop(event, this._handleIndex), this._change(event, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = false, false;
        },
        _detectOrientation: function () {
            /** @type {string} */
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal";
        },
        _normValueFromMouse: function (position) {
            var pixelTotal;
            var pixelMouse;
            var percentMouse;
            var valueTotal;
            var valueMouse;
            return "horizontal" === this.orientation ? (pixelTotal = this.elementSize.width, pixelMouse = position.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (pixelTotal = this.elementSize.height, pixelMouse = position.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), percentMouse = pixelMouse / pixelTotal, percentMouse > 1 && (percentMouse = 1), 0 > percentMouse && (percentMouse = 0), "vertical" === this.orientation && (percentMouse =
                1 - percentMouse), valueTotal = this._valueMax() - this._valueMin(), valueMouse = this._valueMin() + percentMouse * valueTotal, this._trimAlignValue(valueMouse);
        },
        _uiHash: function (index, value, values) {
            var uiHash = {
                handle: this.handles[index],
                handleIndex: index,
                value: void 0 !== value ? value : this.value()
            };
            return this._hasMultipleValues() && (uiHash.value = void 0 !== value ? value : this.values(index), uiHash.values = values || this.values()), uiHash;
        },
        _hasMultipleValues: function () {
            return this.options.values && this.options.values.length;
        },
        _start: function (event, index) {
            return this._trigger("start", event, this._uiHash(index));
        },
        _slide: function (event, index, newVal) {
            var allowed;
            var startIndex;
            var value = this.value();
            var newValues = this.values();
            if (this._hasMultipleValues()) {
                startIndex = this.values(index ? 0 : 1);
                value = this.values(index);
                if (2 === this.options.values.length && this.options.range === true) {
                    /** @type {number} */
                    newVal = 0 === index ? Math.min(startIndex, newVal) : Math.max(startIndex, newVal);
                }
                /** @type {number} */
                newValues[index] = newVal;
            }
            if (newVal !== value) {
                allowed = this._trigger("slide", event, this._uiHash(index, newVal, newValues));
                if (allowed !== false) {
                    if (this._hasMultipleValues()) {
                        this.values(index, newVal);
                    } else {
                        this.value(newVal);
                    }
                }
            }
        },
        _stop: function (event, index) {
            this._trigger("stop", event, this._uiHash(index));
        },
        _change: function (args, index) {
            if (!(this._keySliding || this._mouseSliding)) {
                /** @type {number} */
                this._lastChangedValue = index;
                this._trigger("change", args, this._uiHash(index));
            }
        },
        value: function (val) {
            return arguments.length ? (this.options.value = this._trimAlignValue(val), this._refreshValue(), this._change(null, 0), void 0) : this._value();
        },
        values: function (index, newValue) {
            var vals;
            var newValues;
            var i;
            if (arguments.length > 1) {
                return this.options.values[index] = this._trimAlignValue(newValue), this._refreshValue(), this._change(null, index), void 0;
            }
            if (!arguments.length) {
                return this._values();
            }
            if (!$.isArray(arguments[0])) {
                return this._hasMultipleValues() ? this._values(index) : this.value();
            }
            vals = this.options.values;
            newValues = arguments[0];
            /** @type {number} */
            i = 0;
            for (; vals.length > i; i = i + 1) {
                vals[i] = this._trimAlignValue(newValues[i]);
                this._change(null, i);
            }
            this._refreshValue();
        },
        _setOption: function (key, undefined) {
            var i;
            /** @type {number} */
            var curvedSegmentsLength = 0;
            switch ("range" === key && this.options.range === true && ("min" === undefined ? (this.options.value = this._values(0), this.options.values = null) : "max" === undefined && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), $.isArray(this.options.values) && (curvedSegmentsLength = this.options.values.length), this._super(key, undefined), key) {
                case "orientation":
                    this._detectOrientation();
                    this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation);
                    this._refreshValue();
                    if (this.options.range) {
                        this._refreshRange(undefined);
                    }
                    this.handles.css("horizontal" === undefined ? "bottom" : "left", "");
                    break;
                case "value":
                    /** @type {boolean} */
                    this._animateOff = true;
                    this._refreshValue();
                    this._change(null, 0);
                    /** @type {boolean} */
                    this._animateOff = false;
                    break;
                case "values":
                    /** @type {boolean} */
                    this._animateOff = true;
                    this._refreshValue();
                    /** @type {number} */
                    i = curvedSegmentsLength - 1;
                    for (; i >= 0; i--) {
                        this._change(null, i);
                    }
                    /** @type {boolean} */
                    this._animateOff = false;
                    break;
                case "step":
                case "min":
                case "max":
                    /** @type {boolean} */
                    this._animateOff = true;
                    this._calculateNewMax();
                    this._refreshValue();
                    /** @type {boolean} */
                    this._animateOff = false;
                    break;
                case "range":
                    /** @type {boolean} */
                    this._animateOff = true;
                    this._refresh();
                    /** @type {boolean} */
                    this._animateOff = false;
            }
        },
        _setOptionDisabled: function (value) {
            this._super(value);
            this._toggleClass(null, "ui-state-disabled", !!value);
        },
        _value: function () {
            var val = this.options.value;
            return val = this._trimAlignValue(val);
        },
        _values: function (index) {
            var val;
            var vals;
            var i;
            if (arguments.length) {
                return val = this.options.values[index], val = this._trimAlignValue(val);
            }
            if (this._hasMultipleValues()) {
                vals = this.options.values.slice();
                /** @type {number} */
                i = 0;
                for (; vals.length > i; i = i + 1) {
                    vals[i] = this._trimAlignValue(vals[i]);
                }
                return vals;
            }
            return [];
        },
        _trimAlignValue: function (val) {
            if (this._valueMin() >= val) {
                return this._valueMin();
            }
            if (val >= this._valueMax()) {
                return this._valueMax();
            }
            var step = this.options.step > 0 ? this.options.step : 1;
            /** @type {number} */
            var valModStep = (val - this._valueMin()) % step;
            /** @type {number} */
            var alignValue = val - valModStep;
            return 2 * Math.abs(valModStep) >= step && (alignValue = alignValue + (valModStep > 0 ? step : -step)), parseFloat(alignValue.toFixed(5));
        },
        _calculateNewMax: function () {
            var max = this.options.max;
            var min = this._valueMin();
            var step = this.options.step;
            /** @type {number} */
            var aboveMin = Math.round((max - min) / step) * step;
            max = aboveMin + min;
            if (max > this.options.max) {
                /** @type {number} */
                max = max - step;
            }
            /** @type {number} */
            this.max = parseFloat(max.toFixed(this._precision()));
        },
        _precision: function () {
            var precision = this._precisionOf(this.options.step);
            return null !== this.options.min && (precision = Math.max(precision, this._precisionOf(this.options.min))), precision;
        },
        _precisionOf: function (num) {
            /** @type {string} */
            var p = "" + num;
            /** @type {number} */
            var g1 = p.indexOf(".");
            return -1 === g1 ? 0 : p.length - g1 - 1;
        },
        _valueMin: function () {
            return this.options.min;
        },
        _valueMax: function () {
            return this.max;
        },
        _refreshRange: function (undefined) {
            if ("vertical" === undefined) {
                this.range.css({
                    width: "",
                    left: ""
                });
            }
            if ("horizontal" === undefined) {
                this.range.css({
                    height: "",
                    bottom: ""
                });
            }
        },
        _refreshValue: function () {
            var prev_val;
            var val;
            var value;
            var valueMin;
            var valueMax;
            var r = this.options.range;
            var options = this.options;
            var self = this;
            var animate = this._animateOff ? false : options.animate;
            var style = {};
            if (this._hasMultipleValues()) {
                this.handles.each(function (d) {
                    /** @type {number} */
                    val = 100 * ((self.values(d) - self._valueMin()) / (self._valueMax() - self._valueMin()));
                    /** @type {string} */
                    style["horizontal" === self.orientation ? "left" : "bottom"] = val + "%";
                    $(this).stop(1, 1)[animate ? "animate" : "css"](style, options.animate);
                    if (self.options.range === true) {
                        if ("horizontal" === self.orientation) {
                            if (0 === d) {
                                self.range.stop(1, 1)[animate ? "animate" : "css"]({
                                    left: val + "%"
                                }, options.animate);
                            }
                            if (1 === d) {
                                self.range[animate ? "animate" : "css"]({
                                    width: val - prev_val + "%"
                                }, {
                                    queue: false,
                                    duration: options.animate
                                });
                            }
                        } else {
                            if (0 === d) {
                                self.range.stop(1, 1)[animate ? "animate" : "css"]({
                                    bottom: val + "%"
                                }, options.animate);
                            }
                            if (1 === d) {
                                self.range[animate ? "animate" : "css"]({
                                    height: val - prev_val + "%"
                                }, {
                                    queue: false,
                                    duration: options.animate
                                });
                            }
                        }
                    }
                    /** @type {number} */
                    prev_val = val;
                });
            } else {
                value = this.value();
                valueMin = this._valueMin();
                valueMax = this._valueMax();
                /** @type {number} */
                val = valueMax !== valueMin ? 100 * ((value - valueMin) / (valueMax - valueMin)) : 0;
                style["horizontal" === this.orientation ? "left" : "bottom"] = val + "%";
                this.handle.stop(1, 1)[animate ? "animate" : "css"](style, options.animate);
                if ("min" === r && "horizontal" === this.orientation) {
                    this.range.stop(1, 1)[animate ? "animate" : "css"]({
                        width: val + "%"
                    }, options.animate);
                }
                if ("max" === r && "horizontal" === this.orientation) {
                    this.range.stop(1, 1)[animate ? "animate" : "css"]({
                        width: 100 - val + "%"
                    }, options.animate);
                }
                if ("min" === r && "vertical" === this.orientation) {
                    this.range.stop(1, 1)[animate ? "animate" : "css"]({
                        height: val + "%"
                    }, options.animate);
                }
                if ("max" === r && "vertical" === this.orientation) {
                    this.range.stop(1, 1)[animate ? "animate" : "css"]({
                        height: 100 - val + "%"
                    }, options.animate);
                }
            }
        },
        _handleEvents: {
            keydown: function (event) {
                var allowed;
                var curVal;
                var newVal;
                var step;
                var index = $(event.target).data("ui-slider-handle-index");
                switch (event.keyCode) {
                    case $.ui.keyCode.HOME:
                    case $.ui.keyCode.END:
                    case $.ui.keyCode.PAGE_UP:
                    case $.ui.keyCode.PAGE_DOWN:
                    case $.ui.keyCode.UP:
                    case $.ui.keyCode.RIGHT:
                    case $.ui.keyCode.DOWN:
                    case $.ui.keyCode.LEFT:
                        if (event.preventDefault(), !this._keySliding && (this._keySliding = true, this._addClass($(event.target), null, "ui-state-active"), allowed = this._start(event, index), allowed === false)) {
                            return;
                        }
                }
                switch (step = this.options.step, curVal = newVal = this._hasMultipleValues() ? this.values(index) : this.value(), event.keyCode) {
                    case $.ui.keyCode.HOME:
                        newVal = this._valueMin();
                        break;
                    case $.ui.keyCode.END:
                        newVal = this._valueMax();
                        break;
                    case $.ui.keyCode.PAGE_UP:
                        newVal = this._trimAlignValue(curVal + (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case $.ui.keyCode.PAGE_DOWN:
                        newVal = this._trimAlignValue(curVal - (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case $.ui.keyCode.UP:
                    case $.ui.keyCode.RIGHT:
                        if (curVal === this._valueMax()) {
                            return;
                        }
                        newVal = this._trimAlignValue(curVal + step);
                        break;
                    case $.ui.keyCode.DOWN:
                    case $.ui.keyCode.LEFT:
                        if (curVal === this._valueMin()) {
                            return;
                        }
                        newVal = this._trimAlignValue(curVal - step);
                }
                this._slide(event, index, newVal);
            },
            keyup: function (event) {
                var index = $(event.target).data("ui-slider-handle-index");
                if (this._keySliding) {
                    /** @type {boolean} */
                    this._keySliding = false;
                    this._stop(event, index);
                    this._change(event, index);
                    this._removeClass($(event.target), null, "ui-state-active");
                }
            }
        }
    });
});
