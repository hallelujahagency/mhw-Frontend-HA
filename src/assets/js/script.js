
/*!
  * Bootstrap v4.1.1 (https://getbootstrap.com/)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
    typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
    (factory((global.bootstrap = {}),global.jQuery,global.Popper));
  }(this, (function (exports,$,Popper) { 'use strict';
  
    $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
    Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;
  
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
  
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }
  
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }
  
      return obj;
    }
  
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
  
        if (typeof Object.getOwnPropertySymbols === 'function') {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
  
        ownKeys.forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      }
  
      return target;
    }
  
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.1.1): util.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
  
    var Util = function ($$$1) {
      /**
       * ------------------------------------------------------------------------
       * Private TransitionEnd Helpers
       * ------------------------------------------------------------------------
       */
      var TRANSITION_END = 'transitionend';
      var MAX_UID = 1000000;
      var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)
  
      function toType(obj) {
        return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
      }
  
      function getSpecialTransitionEndEvent() {
        return {
          bindType: TRANSITION_END,
          delegateType: TRANSITION_END,
          handle: function handle(event) {
            if ($$$1(event.target).is(this)) {
              return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
            }
  
            return undefined; // eslint-disable-line no-undefined
          }
        };
      }
  
      function transitionEndEmulator(duration) {
        var _this = this;
  
        var called = false;
        $$$1(this).one(Util.TRANSITION_END, function () {
          called = true;
        });
        setTimeout(function () {
          if (!called) {
            Util.triggerTransitionEnd(_this);
          }
        }, duration);
        return this;
      }
  
      function setTransitionEndSupport() {
        $$$1.fn.emulateTransitionEnd = transitionEndEmulator;
        $$$1.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
      }
      /**
       * --------------------------------------------------------------------------
       * Public Util Api
       * --------------------------------------------------------------------------
       */
  
  
      var Util = {
        TRANSITION_END: 'bsTransitionEnd',
        getUID: function getUID(prefix) {
          do {
            // eslint-disable-next-line no-bitwise
            prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
          } while (document.getElementById(prefix));
  
          return prefix;
        },
        getSelectorFromElement: function getSelectorFromElement(element) {
          var selector = element.getAttribute('data-target');
  
          if (!selector || selector === '#') {
            selector = element.getAttribute('href') || '';
          }
  
          try {
            var $selector = $$$1(document).find(selector);
            return $selector.length > 0 ? selector : null;
          } catch (err) {
            return null;
          }
        },
        getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
          if (!element) {
            return 0;
          } // Get transition-duration of the element
  
  
          var transitionDuration = $$$1(element).css('transition-duration');
          var floatTransitionDuration = parseFloat(transitionDuration); // Return 0 if element or transition duration is not found
  
          if (!floatTransitionDuration) {
            return 0;
          } // If multiple durations are defined, take the first
  
  
          transitionDuration = transitionDuration.split(',')[0];
          return parseFloat(transitionDuration) * MILLISECONDS_MULTIPLIER;
        },
        reflow: function reflow(element) {
          return element.offsetHeight;
        },
        triggerTransitionEnd: function triggerTransitionEnd(element) {
          $$$1(element).trigger(TRANSITION_END);
        },
        // TODO: Remove in v5
        supportsTransitionEnd: function supportsTransitionEnd() {
          return Boolean(TRANSITION_END);
        },
        isElement: function isElement(obj) {
          return (obj[0] || obj).nodeType;
        },
        typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
          for (var property in configTypes) {
            if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
              var expectedTypes = configTypes[property];
              var value = config[property];
              var valueType = value && Util.isElement(value) ? 'element' : toType(value);
  
              if (!new RegExp(expectedTypes).test(valueType)) {
                throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
              }
            }
          }
        }
      };
      setTransitionEndSupport();
      return Util;
    }($);
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.1.1): alert.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
  
    var Alert = function ($$$1) {
      /**
       * ------------------------------------------------------------------------
       * Constants
       * ------------------------------------------------------------------------
       */
      var NAME = 'alert';
      var VERSION = '4.1.1';
      var DATA_KEY = 'bs.alert';
      var EVENT_KEY = "." + DATA_KEY;
      var DATA_API_KEY = '.data-api';
      var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
      var Selector = {
        DISMISS: '[data-dismiss="alert"]'
      };
      var Event = {
        CLOSE: "close" + EVENT_KEY,
        CLOSED: "closed" + EVENT_KEY,
        CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
      };
      var ClassName = {
        ALERT: 'alert',
        FADE: 'fade',
        SHOW: 'show'
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */
  
      };
  
      var Alert =
      /*#__PURE__*/
      function () {
        function Alert(element) {
          this._element = element;
        } // Getters
  
  
        var _proto = Alert.prototype;
  
        // Public
        _proto.close = function close(element) {
          var rootElement = this._element;
  
          if (element) {
            rootElement = this._getRootElement(element);
          }
  
          var customEvent = this._triggerCloseEvent(rootElement);
  
          if (customEvent.isDefaultPrevented()) {
            return;
          }
  
          this._removeElement(rootElement);
        };
  
        _proto.dispose = function dispose() {
          $$$1.removeData(this._element, DATA_KEY);
          this._element = null;
        }; // Private
  
  
        _proto._getRootElement = function _getRootElement(element) {
          var selector = Util.getSelectorFromElement(element);
          var parent = false;
  
          if (selector) {
            parent = $$$1(selector)[0];
          }
  
          if (!parent) {
            parent = $$$1(element).closest("." + ClassName.ALERT)[0];
          }
  
          return parent;
        };
  
        _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
          var closeEvent = $$$1.Event(Event.CLOSE);
          $$$1(element).trigger(closeEvent);
          return closeEvent;
        };
  
        _proto._removeElement = function _removeElement(element) {
          var _this = this;
  
          $$$1(element).removeClass(ClassName.SHOW);
  
          if (!$$$1(element).hasClass(ClassName.FADE)) {
            this._destroyElement(element);
  
            return;
          }
  
          var transitionDuration = Util.getTransitionDurationFromElement(element);
          $$$1(element).one(Util.TRANSITION_END, function (event) {
            return _this._destroyElement(element, event);
          }).emulateTransitionEnd(transitionDuration);
        };
  
        _proto._destroyElement = function _destroyElement(element) {
          $$$1(element).detach().trigger(Event.CLOSED).remove();
        }; // Static
  
  
        Alert._jQueryInterface = function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $$$1(this);
            var data = $element.data(DATA_KEY);
  
            if (!data) {
              data = new Alert(this);
              $element.data(DATA_KEY, data);
            }
  
            if (config === 'close') {
              data[config](this);
            }
          });
        };
  
        Alert._handleDismiss = function _handleDismiss(alertInstance) {
          return function (event) {
            if (event) {
              event.preventDefault();
            }
  
            alertInstance.close(this);
          };
        };
  
        _createClass(Alert, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION;
          }
        }]);
  
        return Alert;
      }();
      /**
       * ------------------------------------------------------------------------
       * Data Api implementation
       * ------------------------------------------------------------------------
       */
  
  
      $$$1(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
      /**
       * ------------------------------------------------------------------------
       * jQuery
       * ------------------------------------------------------------------------
       */
  
      $$$1.fn[NAME] = Alert._jQueryInterface;
      $$$1.fn[NAME].Constructor = Alert;
  
      $$$1.fn[NAME].noConflict = function () {
        $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
        return Alert._jQueryInterface;
      };
  
      return Alert;
    }($);
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.1.1): button.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
  
    var Button = function ($$$1) {
      /**
       * ------------------------------------------------------------------------
       * Constants
       * ------------------------------------------------------------------------
       */
      var NAME = 'button';
      var VERSION = '4.1.1';
      var DATA_KEY = 'bs.button';
      var EVENT_KEY = "." + DATA_KEY;
      var DATA_API_KEY = '.data-api';
      var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
      var ClassName = {
        ACTIVE: 'active',
        BUTTON: 'btn',
        FOCUS: 'focus'
      };
      var Selector = {
        DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
        DATA_TOGGLE: '[data-toggle="buttons"]',
        INPUT: 'input',
        ACTIVE: '.active',
        BUTTON: '.btn'
      };
      var Event = {
        CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
        FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY + DATA_API_KEY + " " + ("blur" + EVENT_KEY + DATA_API_KEY)
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */
  
      };
  
      var Button =
      /*#__PURE__*/
      function () {
        function Button(element) {
          this._element = element;
        } // Getters
  
  
        var _proto = Button.prototype;
  
        // Public
        _proto.toggle = function toggle() {
          var triggerChangeEvent = true;
          var addAriaPressed = true;
          var rootElement = $$$1(this._element).closest(Selector.DATA_TOGGLE)[0];
  
          if (rootElement) {
            var input = $$$1(this._element).find(Selector.INPUT)[0];
  
            if (input) {
              if (input.type === 'radio') {
                if (input.checked && $$$1(this._element).hasClass(ClassName.ACTIVE)) {
                  triggerChangeEvent = false;
                } else {
                  var activeElement = $$$1(rootElement).find(Selector.ACTIVE)[0];
  
                  if (activeElement) {
                    $$$1(activeElement).removeClass(ClassName.ACTIVE);
                  }
                }
              }
  
              if (triggerChangeEvent) {
                if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                  return;
                }
  
                input.checked = !$$$1(this._element).hasClass(ClassName.ACTIVE);
                $$$1(input).trigger('change');
              }
  
              input.focus();
              addAriaPressed = false;
            }
          }
  
          if (addAriaPressed) {
            this._element.setAttribute('aria-pressed', !$$$1(this._element).hasClass(ClassName.ACTIVE));
          }
  
          if (triggerChangeEvent) {
            $$$1(this._element).toggleClass(ClassName.ACTIVE);
          }
        };
  
        _proto.dispose = function dispose() {
          $$$1.removeData(this._element, DATA_KEY);
          this._element = null;
        }; // Static
  
  
        Button._jQueryInterface = function _jQueryInterface(config) {
          return this.each(function () {
            var data = $$$1(this).data(DATA_KEY);
  
            if (!data) {
              data = new Button(this);
              $$$1(this).data(DATA_KEY, data);
            }
  
            if (config === 'toggle') {
              data[config]();
            }
          });
        };
  
        _createClass(Button, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION;
          }
        }]);
  
        return Button;
      }();
      /**
       * ------------------------------------------------------------------------
       * Data Api implementation
       * ------------------------------------------------------------------------
       */
  
  
      $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
        event.preventDefault();
        var button = event.target;
  
        if (!$$$1(button).hasClass(ClassName.BUTTON)) {
          button = $$$1(button).closest(Selector.BUTTON);
        }
  
        Button._jQueryInterface.call($$$1(button), 'toggle');
      }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
        var button = $$$1(event.target).closest(Selector.BUTTON)[0];
        $$$1(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
      });
      /**
       * ------------------------------------------------------------------------
       * jQuery
       * ------------------------------------------------------------------------
       */
  
      $$$1.fn[NAME] = Button._jQueryInterface;
      $$$1.fn[NAME].Constructor = Button;
  
      $$$1.fn[NAME].noConflict = function () {
        $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
        return Button._jQueryInterface;
      };
  
      return Button;
    }($);
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.1.1): carousel.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
  
    var Carousel = function ($$$1) {
      /**
       * ------------------------------------------------------------------------
       * Constants
       * ------------------------------------------------------------------------
       */
      var NAME = 'carousel';
      var VERSION = '4.1.1';
      var DATA_KEY = 'bs.carousel';
      var EVENT_KEY = "." + DATA_KEY;
      var DATA_API_KEY = '.data-api';
      var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
      var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
  
      var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key
  
      var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch
  
      var Default = {
        interval: 5000,
        keyboard: true,
        slide: false,
        pause: 'hover',
        wrap: true
      };
      var DefaultType = {
        interval: '(number|boolean)',
        keyboard: 'boolean',
        slide: '(boolean|string)',
        pause: '(string|boolean)',
        wrap: 'boolean'
      };
      var Direction = {
        NEXT: 'next',
        PREV: 'prev',
        LEFT: 'left',
        RIGHT: 'right'
      };
      var Event = {
        SLIDE: "slide" + EVENT_KEY,
        SLID: "slid" + EVENT_KEY,
        KEYDOWN: "keydown" + EVENT_KEY,
        MOUSEENTER: "mouseenter" + EVENT_KEY,
        MOUSELEAVE: "mouseleave" + EVENT_KEY,
        TOUCHEND: "touchend" + EVENT_KEY,
        LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
        CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
      };
      var ClassName = {
        CAROUSEL: 'carousel',
        ACTIVE: 'active',
        SLIDE: 'slide',
        RIGHT: 'carousel-item-right',
        LEFT: 'carousel-item-left',
        NEXT: 'carousel-item-next',
        PREV: 'carousel-item-prev',
        ITEM: 'carousel-item'
      };
      var Selector = {
        ACTIVE: '.active',
        ACTIVE_ITEM: '.active.carousel-item',
        ITEM: '.carousel-item',
        NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
        INDICATORS: '.carousel-indicators',
        DATA_SLIDE: '[data-slide], [data-slide-to]',
        DATA_RIDE: '[data-ride="carousel"]'
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */
  
      };
  
      var Carousel =
      /*#__PURE__*/
      function () {
        function Carousel(element, config) {
          this._items = null;
          this._interval = null;
          this._activeElement = null;
          this._isPaused = false;
          this._isSliding = false;
          this.touchTimeout = null;
          this._config = this._getConfig(config);
          this._element = $$$1(element)[0];
          this._indicatorsElement = $$$1(this._element).find(Selector.INDICATORS)[0];
  
          this._addEventListeners();
        } // Getters
  
  
        var _proto = Carousel.prototype;
  
        // Public
        _proto.next = function next() {
          if (!this._isSliding) {
            this._slide(Direction.NEXT);
          }
        };
  
        _proto.nextWhenVisible = function nextWhenVisible() {
          // Don't call next when the page isn't visible
          // or the carousel or its parent isn't visible
          if (!document.hidden && $$$1(this._element).is(':visible') && $$$1(this._element).css('visibility') !== 'hidden') {
            this.next();
          }
        };
  
        _proto.prev = function prev() {
          if (!this._isSliding) {
            this._slide(Direction.PREV);
          }
        };
  
        _proto.pause = function pause(event) {
          if (!event) {
            this._isPaused = true;
          }
  
          if ($$$1(this._element).find(Selector.NEXT_PREV)[0]) {
            Util.triggerTransitionEnd(this._element);
            this.cycle(true);
          }
  
          clearInterval(this._interval);
          this._interval = null;
        };
  
        _proto.cycle = function cycle(event) {
          if (!event) {
            this._isPaused = false;
          }
  
          if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
          }
  
          if (this._config.interval && !this._isPaused) {
            this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
          }
        };
  
        _proto.to = function to(index) {
          var _this = this;
  
          this._activeElement = $$$1(this._element).find(Selector.ACTIVE_ITEM)[0];
  
          var activeIndex = this._getItemIndex(this._activeElement);
  
          if (index > this._items.length - 1 || index < 0) {
            return;
          }
  
          if (this._isSliding) {
            $$$1(this._element).one(Event.SLID, function () {
              return _this.to(index);
            });
            return;
          }
  
          if (activeIndex === index) {
            this.pause();
            this.cycle();
            return;
          }
  
          var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;
  
          this._slide(direction, this._items[index]);
        };
  
        _proto.dispose = function dispose() {
          $$$1(this._element).off(EVENT_KEY);
          $$$1.removeData(this._element, DATA_KEY);
          this._items = null;
          this._config = null;
          this._element = null;
          this._interval = null;
          this._isPaused = null;
          this._isSliding = null;
          this._activeElement = null;
          this._indicatorsElement = null;
        }; // Private
  
  
        _proto._getConfig = function _getConfig(config) {
          config = _objectSpread({}, Default, config);
          Util.typeCheckConfig(NAME, config, DefaultType);
          return config;
        };
  
        _proto._addEventListeners = function _addEventListeners() {
          var _this2 = this;
  
          if (this._config.keyboard) {
            $$$1(this._element).on(Event.KEYDOWN, function (event) {
              return _this2._keydown(event);
            });
          }
  
          if (this._config.pause === 'hover') {
            $$$1(this._element).on(Event.MOUSEENTER, function (event) {
              return _this2.pause(event);
            }).on(Event.MOUSELEAVE, function (event) {
              return _this2.cycle(event);
            });
  
            if ('ontouchstart' in document.documentElement) {
              // If it's a touch-enabled device, mouseenter/leave are fired as
              // part of the mouse compatibility events on first tap - the carousel
              // would stop cycling until user tapped out of it;
              // here, we listen for touchend, explicitly pause the carousel
              // (as if it's the second time we tap on it, mouseenter compat event
              // is NOT fired) and after a timeout (to allow for mouse compatibility
              // events to fire) we explicitly restart cycling
              $$$1(this._element).on(Event.TOUCHEND, function () {
                _this2.pause();
  
                if (_this2.touchTimeout) {
                  clearTimeout(_this2.touchTimeout);
                }
  
                _this2.touchTimeout = setTimeout(function (event) {
                  return _this2.cycle(event);
                }, TOUCHEVENT_COMPAT_WAIT + _this2._config.interval);
              });
            }
          }
        };
  
        _proto._keydown = function _keydown(event) {
          if (/input|textarea/i.test(event.target.tagName)) {
            return;
          }
  
          switch (event.which) {
            case ARROW_LEFT_KEYCODE:
              event.preventDefault();
              this.prev();
              break;
  
            case ARROW_RIGHT_KEYCODE:
              event.preventDefault();
              this.next();
              break;
  
            default:
          }
        };
  
        _proto._getItemIndex = function _getItemIndex(element) {
          this._items = $$$1.makeArray($$$1(element).parent().find(Selector.ITEM));
          return this._items.indexOf(element);
        };
  
        _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
          var isNextDirection = direction === Direction.NEXT;
          var isPrevDirection = direction === Direction.PREV;
  
          var activeIndex = this._getItemIndex(activeElement);
  
          var lastItemIndex = this._items.length - 1;
          var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;
  
          if (isGoingToWrap && !this._config.wrap) {
            return activeElement;
          }
  
          var delta = direction === Direction.PREV ? -1 : 1;
          var itemIndex = (activeIndex + delta) % this._items.length;
          return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
        };
  
        _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
          var targetIndex = this._getItemIndex(relatedTarget);
  
          var fromIndex = this._getItemIndex($$$1(this._element).find(Selector.ACTIVE_ITEM)[0]);
  
          var slideEvent = $$$1.Event(Event.SLIDE, {
            relatedTarget: relatedTarget,
            direction: eventDirectionName,
            from: fromIndex,
            to: targetIndex
          });
          $$$1(this._element).trigger(slideEvent);
          return slideEvent;
        };
  
        _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
          if (this._indicatorsElement) {
            $$$1(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
  
            var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];
  
            if (nextIndicator) {
              $$$1(nextIndicator).addClass(ClassName.ACTIVE);
            }
          }
        };
  
        _proto._slide = function _slide(direction, element) {
          var _this3 = this;
  
          var activeElement = $$$1(this._element).find(Selector.ACTIVE_ITEM)[0];
  
          var activeElementIndex = this._getItemIndex(activeElement);
  
          var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);
  
          var nextElementIndex = this._getItemIndex(nextElement);
  
          var isCycling = Boolean(this._interval);
          var directionalClassName;
          var orderClassName;
          var eventDirectionName;
  
          if (direction === Direction.NEXT) {
            directionalClassName = ClassName.LEFT;
            orderClassName = ClassName.NEXT;
            eventDirectionName = Direction.LEFT;
          } else {
            directionalClassName = ClassName.RIGHT;
            orderClassName = ClassName.PREV;
            eventDirectionName = Direction.RIGHT;
          }
  
          if (nextElement && $$$1(nextElement).hasClass(ClassName.ACTIVE)) {
            this._isSliding = false;
            return;
          }
  
          var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
  
          if (slideEvent.isDefaultPrevented()) {
            return;
          }
  
          if (!activeElement || !nextElement) {
            // Some weirdness is happening, so we bail
            return;
          }
  
          this._isSliding = true;
  
          if (isCycling) {
            this.pause();
          }
  
          this._setActiveIndicatorElement(nextElement);
  
          var slidEvent = $$$1.Event(Event.SLID, {
            relatedTarget: nextElement,
            direction: eventDirectionName,
            from: activeElementIndex,
            to: nextElementIndex
          });
  
          if ($$$1(this._element).hasClass(ClassName.SLIDE)) {
            $$$1(nextElement).addClass(orderClassName);
            Util.reflow(nextElement);
            $$$1(activeElement).addClass(directionalClassName);
            $$$1(nextElement).addClass(directionalClassName);
            var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
            $$$1(activeElement).one(Util.TRANSITION_END, function () {
              $$$1(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName.ACTIVE);
              $$$1(activeElement).removeClass(ClassName.ACTIVE + " " + orderClassName + " " + directionalClassName);
              _this3._isSliding = false;
              setTimeout(function () {
                return $$$1(_this3._element).trigger(slidEvent);
              }, 0);
            }).emulateTransitionEnd(transitionDuration);
          } else {
            $$$1(activeElement).removeClass(ClassName.ACTIVE);
            $$$1(nextElement).addClass(ClassName.ACTIVE);
            this._isSliding = false;
            $$$1(this._element).trigger(slidEvent);
          }
  
          if (isCycling) {
            this.cycle();
          }
        }; // Static
  
  
        Carousel._jQueryInterface = function _jQueryInterface(config) {
          return this.each(function () {
            var data = $$$1(this).data(DATA_KEY);
  
            var _config = _objectSpread({}, Default, $$$1(this).data());
  
            if (typeof config === 'object') {
              _config = _objectSpread({}, _config, config);
            }
  
            var action = typeof config === 'string' ? config : _config.slide;
  
            if (!data) {
              data = new Carousel(this, _config);
              $$$1(this).data(DATA_KEY, data);
            }
  
            if (typeof config === 'number') {
              data.to(config);
            } else if (typeof action === 'string') {
              if (typeof data[action] === 'undefined') {
                throw new TypeError("No method named \"" + action + "\"");
              }
  
              data[action]();
            } else if (_config.interval) {
              data.pause();
              data.cycle();
            }
          });
        };
  
        Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
          var selector = Util.getSelectorFromElement(this);
  
          if (!selector) {
            return;
          }
  
          var target = $$$1(selector)[0];
  
          if (!target || !$$$1(target).hasClass(ClassName.CAROUSEL)) {
            return;
          }
  
          var config = _objectSpread({}, $$$1(target).data(), $$$1(this).data());
  
          var slideIndex = this.getAttribute('data-slide-to');
  
          if (slideIndex) {
            config.interval = false;
          }
  
          Carousel._jQueryInterface.call($$$1(target), config);
  
          if (slideIndex) {
            $$$1(target).data(DATA_KEY).to(slideIndex);
          }
  
          event.preventDefault();
        };
  
        _createClass(Carousel, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION;
          }
        }, {
          key: "Default",
          get: function get() {
            return Default;
          }
        }]);
  
        return Carousel;
      }();
      /**
       * ------------------------------------------------------------------------
       * Data Api implementation
       * ------------------------------------------------------------------------
       */
  
  
      $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);
      $$$1(window).on(Event.LOAD_DATA_API, function () {
        $$$1(Selector.DATA_RIDE).each(function () {
          var $carousel = $$$1(this);
  
          Carousel._jQueryInterface.call($carousel, $carousel.data());
        });
      });
      /**
       * ------------------------------------------------------------------------
       * jQuery
       * ------------------------------------------------------------------------
       */
  
      $$$1.fn[NAME] = Carousel._jQueryInterface;
      $$$1.fn[NAME].Constructor = Carousel;
  
      $$$1.fn[NAME].noConflict = function () {
        $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
        return Carousel._jQueryInterface;
      };
  
      return Carousel;
    }($);
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.1.1): collapse.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
  
    var Collapse = function ($$$1) {
      /**
       * ------------------------------------------------------------------------
       * Constants
       * ------------------------------------------------------------------------
       */
      var NAME = 'collapse';
      var VERSION = '4.1.1';
      var DATA_KEY = 'bs.collapse';
      var EVENT_KEY = "." + DATA_KEY;
      var DATA_API_KEY = '.data-api';
      var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
      var Default = {
        toggle: true,
        parent: ''
      };
      var DefaultType = {
        toggle: 'boolean',
        parent: '(string|element)'
      };
      var Event = {
        SHOW: "show" + EVENT_KEY,
        SHOWN: "shown" + EVENT_KEY,
        HIDE: "hide" + EVENT_KEY,
        HIDDEN: "hidden" + EVENT_KEY,
        CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
      };
      var ClassName = {
        SHOW: 'show',
        COLLAPSE: 'collapse',
        COLLAPSING: 'collapsing',
        COLLAPSED: 'collapsed'
      };
      var Dimension = {
        WIDTH: 'width',
        HEIGHT: 'height'
      };
      var Selector = {
        ACTIVES: '.show, .collapsing',
        DATA_TOGGLE: '[data-toggle="collapse"]'
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */
  
      };
  
      var Collapse =
      /*#__PURE__*/
      function () {
        function Collapse(element, config) {
          this._isTransitioning = false;
          this._element = element;
          this._config = this._getConfig(config);
          this._triggerArray = $$$1.makeArray($$$1("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
          var tabToggles = $$$1(Selector.DATA_TOGGLE);
  
          for (var i = 0; i < tabToggles.length; i++) {
            var elem = tabToggles[i];
            var selector = Util.getSelectorFromElement(elem);
  
            if (selector !== null && $$$1(selector).filter(element).length > 0) {
              this._selector = selector;
  
              this._triggerArray.push(elem);
            }
          }
  
          this._parent = this._config.parent ? this._getParent() : null;
  
          if (!this._config.parent) {
            this._addAriaAndCollapsedClass(this._element, this._triggerArray);
          }
  
          if (this._config.toggle) {
            this.toggle();
          }
        } // Getters
  
  
        var _proto = Collapse.prototype;
  
        // Public
        _proto.toggle = function toggle() {
          if ($$$1(this._element).hasClass(ClassName.SHOW)) {
            this.hide();
          } else {
            this.show();
          }
        };
  
        _proto.show = function show() {
          var _this = this;
  
          if (this._isTransitioning || $$$1(this._element).hasClass(ClassName.SHOW)) {
            return;
          }
  
          var actives;
          var activesData;
  
          if (this._parent) {
            actives = $$$1.makeArray($$$1(this._parent).find(Selector.ACTIVES).filter("[data-parent=\"" + this._config.parent + "\"]"));
  
            if (actives.length === 0) {
              actives = null;
            }
          }
  
          if (actives) {
            activesData = $$$1(actives).not(this._selector).data(DATA_KEY);
  
            if (activesData && activesData._isTransitioning) {
              return;
            }
          }
  
          var startEvent = $$$1.Event(Event.SHOW);
          $$$1(this._element).trigger(startEvent);
  
          if (startEvent.isDefaultPrevented()) {
            return;
          }
  
          if (actives) {
            Collapse._jQueryInterface.call($$$1(actives).not(this._selector), 'hide');
  
            if (!activesData) {
              $$$1(actives).data(DATA_KEY, null);
            }
          }
  
          var dimension = this._getDimension();
  
          $$$1(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
          this._element.style[dimension] = 0;
  
          if (this._triggerArray.length > 0) {
            $$$1(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
          }
  
          this.setTransitioning(true);
  
          var complete = function complete() {
            $$$1(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
            _this._element.style[dimension] = '';
  
            _this.setTransitioning(false);
  
            $$$1(_this._element).trigger(Event.SHOWN);
          };
  
          var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
          var scrollSize = "scroll" + capitalizedDimension;
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          this._element.style[dimension] = this._element[scrollSize] + "px";
        };
  
        _proto.hide = function hide() {
          var _this2 = this;
  
          if (this._isTransitioning || !$$$1(this._element).hasClass(ClassName.SHOW)) {
            return;
          }
  
          var startEvent = $$$1.Event(Event.HIDE);
          $$$1(this._element).trigger(startEvent);
  
          if (startEvent.isDefaultPrevented()) {
            return;
          }
  
          var dimension = this._getDimension();
  
          this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
          Util.reflow(this._element);
          $$$1(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);
  
          if (this._triggerArray.length > 0) {
            for (var i = 0; i < this._triggerArray.length; i++) {
              var trigger = this._triggerArray[i];
              var selector = Util.getSelectorFromElement(trigger);
  
              if (selector !== null) {
                var $elem = $$$1(selector);
  
                if (!$elem.hasClass(ClassName.SHOW)) {
                  $$$1(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
                }
              }
            }
          }
  
          this.setTransitioning(true);
  
          var complete = function complete() {
            _this2.setTransitioning(false);
  
            $$$1(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
          };
  
          this._element.style[dimension] = '';
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        };
  
        _proto.setTransitioning = function setTransitioning(isTransitioning) {
          this._isTransitioning = isTransitioning;
        };
  
        _proto.dispose = function dispose() {
          $$$1.removeData(this._element, DATA_KEY);
          this._config = null;
          this._parent = null;
          this._element = null;
          this._triggerArray = null;
          this._isTransitioning = null;
        }; // Private
  
  
        _proto._getConfig = function _getConfig(config) {
          config = _objectSpread({}, Default, config);
          config.toggle = Boolean(config.toggle); // Coerce string values
  
          Util.typeCheckConfig(NAME, config, DefaultType);
          return config;
        };
  
        _proto._getDimension = function _getDimension() {
          var hasWidth = $$$1(this._element).hasClass(Dimension.WIDTH);
          return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
        };
  
        _proto._getParent = function _getParent() {
          var _this3 = this;
  
          var parent = null;
  
          if (Util.isElement(this._config.parent)) {
            parent = this._config.parent; // It's a jQuery object
  
            if (typeof this._config.parent.jquery !== 'undefined') {
              parent = this._config.parent[0];
            }
          } else {
            parent = $$$1(this._config.parent)[0];
          }
  
          var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
          $$$1(parent).find(selector).each(function (i, element) {
            _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
          });
          return parent;
        };
  
        _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
          if (element) {
            var isOpen = $$$1(element).hasClass(ClassName.SHOW);
  
            if (triggerArray.length > 0) {
              $$$1(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
            }
          }
        }; // Static
  
  
        Collapse._getTargetFromElement = function _getTargetFromElement(element) {
          var selector = Util.getSelectorFromElement(element);
          return selector ? $$$1(selector)[0] : null;
        };
  
        Collapse._jQueryInterface = function _jQueryInterface(config) {
          return this.each(function () {
            var $this = $$$1(this);
            var data = $this.data(DATA_KEY);
  
            var _config = _objectSpread({}, Default, $this.data(), typeof config === 'object' && config ? config : {});
  
            if (!data && _config.toggle && /show|hide/.test(config)) {
              _config.toggle = false;
            }
  
            if (!data) {
              data = new Collapse(this, _config);
              $this.data(DATA_KEY, data);
            }
  
            if (typeof config === 'string') {
              if (typeof data[config] === 'undefined') {
                throw new TypeError("No method named \"" + config + "\"");
              }
  
              data[config]();
            }
          });
        };
  
        _createClass(Collapse, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION;
          }
        }, {
          key: "Default",
          get: function get() {
            return Default;
          }
        }]);
  
        return Collapse;
      }();
      /**
       * ------------------------------------------------------------------------
       * Data Api implementation
       * ------------------------------------------------------------------------
       */
  
  
      $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
        // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
        if (event.currentTarget.tagName === 'A') {
          event.preventDefault();
        }
  
        var $trigger = $$$1(this);
        var selector = Util.getSelectorFromElement(this);
        $$$1(selector).each(function () {
          var $target = $$$1(this);
          var data = $target.data(DATA_KEY);
          var config = data ? 'toggle' : $trigger.data();
  
          Collapse._jQueryInterface.call($target, config);
        });
      });
      /**
       * ------------------------------------------------------------------------
       * jQuery
       * ------------------------------------------------------------------------
       */
  
      $$$1.fn[NAME] = Collapse._jQueryInterface;
      $$$1.fn[NAME].Constructor = Collapse;
  
      $$$1.fn[NAME].noConflict = function () {
        $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
        return Collapse._jQueryInterface;
      };
  
      return Collapse;
    }($);
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.1.1): dropdown.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
  
    var Dropdown = function ($$$1) {
      /**
       * ------------------------------------------------------------------------
       * Constants
       * ------------------------------------------------------------------------
       */
      var NAME = 'dropdown';
      var VERSION = '4.1.1';
      var DATA_KEY = 'bs.dropdown';
      var EVENT_KEY = "." + DATA_KEY;
      var DATA_API_KEY = '.data-api';
      var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
      var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
  
      var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key
  
      var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key
  
      var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
  
      var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
  
      var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)
  
      var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
      var Event = {
        HIDE: "hide" + EVENT_KEY,
        HIDDEN: "hidden" + EVENT_KEY,
        SHOW: "show" + EVENT_KEY,
        SHOWN: "shown" + EVENT_KEY,
        CLICK: "click" + EVENT_KEY,
        CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
        KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
        KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
      };
      var ClassName = {
        DISABLED: 'disabled',
        SHOW: 'show',
        DROPUP: 'dropup',
        DROPRIGHT: 'dropright',
        DROPLEFT: 'dropleft',
        MENURIGHT: 'dropdown-menu-right',
        MENULEFT: 'dropdown-menu-left',
        POSITION_STATIC: 'position-static'
      };
      var Selector = {
        DATA_TOGGLE: '[data-toggle="dropdown"]',
        FORM_CHILD: '.dropdown form',
        MENU: '.dropdown-menu',
        NAVBAR_NAV: '.navbar-nav',
        VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
      };
      var AttachmentMap = {
        TOP: 'top-start',
        TOPEND: 'top-end',
        BOTTOM: 'bottom-start',
        BOTTOMEND: 'bottom-end',
        RIGHT: 'right-start',
        RIGHTEND: 'right-end',
        LEFT: 'left-start',
        LEFTEND: 'left-end'
      };
      var Default = {
        offset: 0,
        flip: true,
        boundary: 'scrollParent',
        reference: 'toggle',
        display: 'dynamic'
      };
      var DefaultType = {
        offset: '(number|string|function)',
        flip: 'boolean',
        boundary: '(string|element)',
        reference: '(string|element)',
        display: 'string'
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */
  
      };
  
      var Dropdown =
      /*#__PURE__*/
      function () {
        function Dropdown(element, config) {
          this._element = element;
          this._popper = null;
          this._config = this._getConfig(config);
          this._menu = this._getMenuElement();
          this._inNavbar = this._detectNavbar();
  
          this._addEventListeners();
        } // Getters
  
  
        var _proto = Dropdown.prototype;
  
        // Public
        _proto.toggle = function toggle() {
          if (this._element.disabled || $$$1(this._element).hasClass(ClassName.DISABLED)) {
            return;
          }
  
          var parent = Dropdown._getParentFromElement(this._element);
  
          var isActive = $$$1(this._menu).hasClass(ClassName.SHOW);
  
          Dropdown._clearMenus();
  
          if (isActive) {
            return;
          }
  
          var relatedTarget = {
            relatedTarget: this._element
          };
          var showEvent = $$$1.Event(Event.SHOW, relatedTarget);
          $$$1(parent).trigger(showEvent);
  
          if (showEvent.isDefaultPrevented()) {
            return;
          } // Disable totally Popper.js for Dropdown in Navbar
  
  
          if (!this._inNavbar) {
            /**
             * Check for Popper dependency
             * Popper - https://popper.js.org
             */
            if (typeof Popper === 'undefined') {
              throw new TypeError('Bootstrap dropdown require Popper.js (https://popper.js.org)');
            }
  
            var referenceElement = this._element;
  
            if (this._config.reference === 'parent') {
              referenceElement = parent;
            } else if (Util.isElement(this._config.reference)) {
              referenceElement = this._config.reference; // Check if it's jQuery element
  
              if (typeof this._config.reference.jquery !== 'undefined') {
                referenceElement = this._config.reference[0];
              }
            } // If boundary is not `scrollParent`, then set position to `static`
            // to allow the menu to "escape" the scroll parent's boundaries
            // https://github.com/twbs/bootstrap/issues/24251
  
  
            if (this._config.boundary !== 'scrollParent') {
              $$$1(parent).addClass(ClassName.POSITION_STATIC);
            }
  
            this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
          } // If this is a touch-enabled device we add extra
          // empty mouseover listeners to the body's immediate children;
          // only needed because of broken event delegation on iOS
          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
  
  
          if ('ontouchstart' in document.documentElement && $$$1(parent).closest(Selector.NAVBAR_NAV).length === 0) {
            $$$1(document.body).children().on('mouseover', null, $$$1.noop);
          }
  
          this._element.focus();
  
          this._element.setAttribute('aria-expanded', true);
  
          $$$1(this._menu).toggleClass(ClassName.SHOW);
          $$$1(parent).toggleClass(ClassName.SHOW).trigger($$$1.Event(Event.SHOWN, relatedTarget));
        };
  
        _proto.dispose = function dispose() {
          $$$1.removeData(this._element, DATA_KEY);
          $$$1(this._element).off(EVENT_KEY);
          this._element = null;
          this._menu = null;
  
          if (this._popper !== null) {
            this._popper.destroy();
  
            this._popper = null;
          }
        };
  
        _proto.update = function update() {
          this._inNavbar = this._detectNavbar();
  
          if (this._popper !== null) {
            this._popper.scheduleUpdate();
          }
        }; // Private
  
  
        _proto._addEventListeners = function _addEventListeners() {
          var _this = this;
  
          $$$1(this._element).on(Event.CLICK, function (event) {
            event.preventDefault();
            event.stopPropagation();
  
            _this.toggle();
          });
        };
  
        _proto._getConfig = function _getConfig(config) {
          config = _objectSpread({}, this.constructor.Default, $$$1(this._element).data(), config);
          Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
          return config;
        };
  
        _proto._getMenuElement = function _getMenuElement() {
          if (!this._menu) {
            var parent = Dropdown._getParentFromElement(this._element);
  
            this._menu = $$$1(parent).find(Selector.MENU)[0];
          }
  
          return this._menu;
        };
  
        _proto._getPlacement = function _getPlacement() {
          var $parentDropdown = $$$1(this._element).parent();
          var placement = AttachmentMap.BOTTOM; // Handle dropup
  
          if ($parentDropdown.hasClass(ClassName.DROPUP)) {
            placement = AttachmentMap.TOP;
  
            if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
              placement = AttachmentMap.TOPEND;
            }
          } else if ($parentDropdown.hasClass(ClassName.DROPRIGHT)) {
            placement = AttachmentMap.RIGHT;
          } else if ($parentDropdown.hasClass(ClassName.DROPLEFT)) {
            placement = AttachmentMap.LEFT;
          } else if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
            placement = AttachmentMap.BOTTOMEND;
          }
  
          return placement;
        };
  
        _proto._detectNavbar = function _detectNavbar() {
          return $$$1(this._element).closest('.navbar').length > 0;
        };
  
        _proto._getPopperConfig = function _getPopperConfig() {
          var _this2 = this;
  
          var offsetConf = {};
  
          if (typeof this._config.offset === 'function') {
            offsetConf.fn = function (data) {
              data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets) || {});
              return data;
            };
          } else {
            offsetConf.offset = this._config.offset;
          }
  
          var popperConfig = {
            placement: this._getPlacement(),
            modifiers: {
              offset: offsetConf,
              flip: {
                enabled: this._config.flip
              },
              preventOverflow: {
                boundariesElement: this._config.boundary
              }
            } // Disable Popper.js if we have a static display
  
          };
  
          if (this._config.display === 'static') {
            popperConfig.modifiers.applyStyle = {
              enabled: false
            };
          }
  
          return popperConfig;
        }; // Static
  
  
        Dropdown._jQueryInterface = function _jQueryInterface(config) {
          return this.each(function () {
            var data = $$$1(this).data(DATA_KEY);
  
            var _config = typeof config === 'object' ? config : null;
  
            if (!data) {
              data = new Dropdown(this, _config);
              $$$1(this).data(DATA_KEY, data);
            }
  
            if (typeof config === 'string') {
              if (typeof data[config] === 'undefined') {
                throw new TypeError("No method named \"" + config + "\"");
              }
  
              data[config]();
            }
          });
        };
  
        Dropdown._clearMenus = function _clearMenus(event) {
          if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
            return;
          }
  
          var toggles = $$$1.makeArray($$$1(Selector.DATA_TOGGLE));
  
          for (var i = 0; i < toggles.length; i++) {
            var parent = Dropdown._getParentFromElement(toggles[i]);
  
            var context = $$$1(toggles[i]).data(DATA_KEY);
            var relatedTarget = {
              relatedTarget: toggles[i]
            };
  
            if (!context) {
              continue;
            }
  
            var dropdownMenu = context._menu;
  
            if (!$$$1(parent).hasClass(ClassName.SHOW)) {
              continue;
            }
  
            if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $$$1.contains(parent, event.target)) {
              continue;
            }
  
            var hideEvent = $$$1.Event(Event.HIDE, relatedTarget);
            $$$1(parent).trigger(hideEvent);
  
            if (hideEvent.isDefaultPrevented()) {
              continue;
            } // If this is a touch-enabled device we remove the extra
            // empty mouseover listeners we added for iOS support
  
  
            if ('ontouchstart' in document.documentElement) {
              $$$1(document.body).children().off('mouseover', null, $$$1.noop);
            }
  
            toggles[i].setAttribute('aria-expanded', 'false');
            $$$1(dropdownMenu).removeClass(ClassName.SHOW);
            $$$1(parent).removeClass(ClassName.SHOW).trigger($$$1.Event(Event.HIDDEN, relatedTarget));
          }
        };
  
        Dropdown._getParentFromElement = function _getParentFromElement(element) {
          var parent;
          var selector = Util.getSelectorFromElement(element);
  
          if (selector) {
            parent = $$$1(selector)[0];
          }
  
          return parent || element.parentNode;
        }; // eslint-disable-next-line complexity
  
  
        Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
          // If not input/textarea:
          //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
          // If input/textarea:
          //  - If space key => not a dropdown command
          //  - If key is other than escape
          //    - If key is not up or down => not a dropdown command
          //    - If trigger inside the menu => not a dropdown command
          if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $$$1(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
            return;
          }
  
          event.preventDefault();
          event.stopPropagation();
  
          if (this.disabled || $$$1(this).hasClass(ClassName.DISABLED)) {
            return;
          }
  
          var parent = Dropdown._getParentFromElement(this);
  
          var isActive = $$$1(parent).hasClass(ClassName.SHOW);
  
          if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
            if (event.which === ESCAPE_KEYCODE) {
              var toggle = $$$1(parent).find(Selector.DATA_TOGGLE)[0];
              $$$1(toggle).trigger('focus');
            }
  
            $$$1(this).trigger('click');
            return;
          }
  
          var items = $$$1(parent).find(Selector.VISIBLE_ITEMS).get();
  
          if (items.length === 0) {
            return;
          }
  
          var index = items.indexOf(event.target);
  
          if (event.which === ARROW_UP_KEYCODE && index > 0) {
            // Up
            index--;
          }
  
          if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
            // Down
            index++;
          }
  
          if (index < 0) {
            index = 0;
          }
  
          items[index].focus();
        };
  
        _createClass(Dropdown, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION;
          }
        }, {
          key: "Default",
          get: function get() {
            return Default;
          }
        }, {
          key: "DefaultType",
          get: function get() {
            return DefaultType;
          }
        }]);
  
        return Dropdown;
      }();
      /**
       * ------------------------------------------------------------------------
       * Data Api implementation
       * ------------------------------------------------------------------------
       */
  
  
      $$$1(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
        event.preventDefault();
        event.stopPropagation();
  
        Dropdown._jQueryInterface.call($$$1(this), 'toggle');
      }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
        e.stopPropagation();
      });
      /**
       * ------------------------------------------------------------------------
       * jQuery
       * ------------------------------------------------------------------------
       */
  
      $$$1.fn[NAME] = Dropdown._jQueryInterface;
      $$$1.fn[NAME].Constructor = Dropdown;
  
      $$$1.fn[NAME].noConflict = function () {
        $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
        return Dropdown._jQueryInterface;
      };
  
      return Dropdown;
    }($, Popper);
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.1.1): modal.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
  
    var Modal = function ($$$1) {
      /**
       * ------------------------------------------------------------------------
       * Constants
       * ------------------------------------------------------------------------
       */
      var NAME = 'modal';
      var VERSION = '4.1.1';
      var DATA_KEY = 'bs.modal';
      var EVENT_KEY = "." + DATA_KEY;
      var DATA_API_KEY = '.data-api';
      var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
      var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
  
      var Default = {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: true
      };
      var DefaultType = {
        backdrop: '(boolean|string)',
        keyboard: 'boolean',
        focus: 'boolean',
        show: 'boolean'
      };
      var Event = {
        HIDE: "hide" + EVENT_KEY,
        HIDDEN: "hidden" + EVENT_KEY,
        SHOW: "show" + EVENT_KEY,
        SHOWN: "shown" + EVENT_KEY,
        FOCUSIN: "focusin" + EVENT_KEY,
        RESIZE: "resize" + EVENT_KEY,
        CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
        KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
        MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
        MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
        CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
      };
      var ClassName = {
        SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
        BACKDROP: 'modal-backdrop',
        OPEN: 'modal-open',
        FADE: 'fade',
        SHOW: 'show'
      };
      var Selector = {
        DIALOG: '.modal-dialog',
        DATA_TOGGLE: '[data-toggle="modal"]',
        DATA_DISMISS: '[data-dismiss="modal"]',
        FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
        STICKY_CONTENT: '.sticky-top',
        NAVBAR_TOGGLER: '.navbar-toggler'
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */
  
      };
  
      var Modal =
      /*#__PURE__*/
      function () {
        function Modal(element, config) {
          this._config = this._getConfig(config);
          this._element = element;
          this._dialog = $$$1(element).find(Selector.DIALOG)[0];
          this._backdrop = null;
          this._isShown = false;
          this._isBodyOverflowing = false;
          this._ignoreBackdropClick = false;
          this._scrollbarWidth = 0;
        } // Getters
  
  
        var _proto = Modal.prototype;
  
        // Public
        _proto.toggle = function toggle(relatedTarget) {
          return this._isShown ? this.hide() : this.show(relatedTarget);
        };
  
        _proto.show = function show(relatedTarget) {
          var _this = this;
  
          if (this._isTransitioning || this._isShown) {
            return;
          }
  
          if ($$$1(this._element).hasClass(ClassName.FADE)) {
            this._isTransitioning = true;
          }
  
          var showEvent = $$$1.Event(Event.SHOW, {
            relatedTarget: relatedTarget
          });
          $$$1(this._element).trigger(showEvent);
  
          if (this._isShown || showEvent.isDefaultPrevented()) {
            return;
          }
  
          this._isShown = true;
  
          this._checkScrollbar();
  
          this._setScrollbar();
  
          this._adjustDialog();
  
          $$$1(document.body).addClass(ClassName.OPEN);
  
          this._setEscapeEvent();
  
          this._setResizeEvent();
  
          $$$1(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
            return _this.hide(event);
          });
          $$$1(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
            $$$1(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
              if ($$$1(event.target).is(_this._element)) {
                _this._ignoreBackdropClick = true;
              }
            });
          });
  
          this._showBackdrop(function () {
            return _this._showElement(relatedTarget);
          });
        };
  
        _proto.hide = function hide(event) {
          var _this2 = this;
  
          if (event) {
            event.preventDefault();
          }
  
          if (this._isTransitioning || !this._isShown) {
            return;
          }
  
          var hideEvent = $$$1.Event(Event.HIDE);
          $$$1(this._element).trigger(hideEvent);
  
          if (!this._isShown || hideEvent.isDefaultPrevented()) {
            return;
          }
  
          this._isShown = false;
          var transition = $$$1(this._element).hasClass(ClassName.FADE);
  
          if (transition) {
            this._isTransitioning = true;
          }
  
          this._setEscapeEvent();
  
          this._setResizeEvent();
  
          $$$1(document).off(Event.FOCUSIN);
          $$$1(this._element).removeClass(ClassName.SHOW);
          $$$1(this._element).off(Event.CLICK_DISMISS);
          $$$1(this._dialog).off(Event.MOUSEDOWN_DISMISS);
  
          if (transition) {
            var transitionDuration = Util.getTransitionDurationFromElement(this._element);
            $$$1(this._element).one(Util.TRANSITION_END, function (event) {
              return _this2._hideModal(event);
            }).emulateTransitionEnd(transitionDuration);
          } else {
            this._hideModal();
          }
        };
  
        _proto.dispose = function dispose() {
          $$$1.removeData(this._element, DATA_KEY);
          $$$1(window, document, this._element, this._backdrop).off(EVENT_KEY);
          this._config = null;
          this._element = null;
          this._dialog = null;
          this._backdrop = null;
          this._isShown = null;
          this._isBodyOverflowing = null;
          this._ignoreBackdropClick = null;
          this._scrollbarWidth = null;
        };
  
        _proto.handleUpdate = function handleUpdate() {
          this._adjustDialog();
        }; // Private
  
  
        _proto._getConfig = function _getConfig(config) {
          config = _objectSpread({}, Default, config);
          Util.typeCheckConfig(NAME, config, DefaultType);
          return config;
        };
  
        _proto._showElement = function _showElement(relatedTarget) {
          var _this3 = this;
  
          var transition = $$$1(this._element).hasClass(ClassName.FADE);
  
          if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
            // Don't move modal's DOM position
            document.body.appendChild(this._element);
          }
  
          this._element.style.display = 'block';
  
          this._element.removeAttribute('aria-hidden');
  
          this._element.scrollTop = 0;
  
          if (transition) {
            Util.reflow(this._element);
          }
  
          $$$1(this._element).addClass(ClassName.SHOW);
  
          if (this._config.focus) {
            this._enforceFocus();
          }
  
          var shownEvent = $$$1.Event(Event.SHOWN, {
            relatedTarget: relatedTarget
          });
  
          var transitionComplete = function transitionComplete() {
            if (_this3._config.focus) {
              _this3._element.focus();
            }
  
            _this3._isTransitioning = false;
            $$$1(_this3._element).trigger(shownEvent);
          };
  
          if (transition) {
            var transitionDuration = Util.getTransitionDurationFromElement(this._element);
            $$$1(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
          } else {
            transitionComplete();
          }
        };
  
        _proto._enforceFocus = function _enforceFocus() {
          var _this4 = this;
  
          $$$1(document).off(Event.FOCUSIN) // Guard against infinite focus loop
          .on(Event.FOCUSIN, function (event) {
            if (document !== event.target && _this4._element !== event.target && $$$1(_this4._element).has(event.target).length === 0) {
              _this4._element.focus();
            }
          });
        };
  
        _proto._setEscapeEvent = function _setEscapeEvent() {
          var _this5 = this;
  
          if (this._isShown && this._config.keyboard) {
            $$$1(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
              if (event.which === ESCAPE_KEYCODE) {
                event.preventDefault();
  
                _this5.hide();
              }
            });
          } else if (!this._isShown) {
            $$$1(this._element).off(Event.KEYDOWN_DISMISS);
          }
        };
  
        _proto._setResizeEvent = function _setResizeEvent() {
          var _this6 = this;
  
          if (this._isShown) {
            $$$1(window).on(Event.RESIZE, function (event) {
              return _this6.handleUpdate(event);
            });
          } else {
            $$$1(window).off(Event.RESIZE);
          }
        };
  
        _proto._hideModal = function _hideModal() {
          var _this7 = this;
  
          this._element.style.display = 'none';
  
          this._element.setAttribute('aria-hidden', true);
  
          this._isTransitioning = false;
  
          this._showBackdrop(function () {
            $$$1(document.body).removeClass(ClassName.OPEN);
  
            _this7._resetAdjustments();
  
            _this7._resetScrollbar();
  
            $$$1(_this7._element).trigger(Event.HIDDEN);
          });
        };
  
        _proto._removeBackdrop = function _removeBackdrop() {
          if (this._backdrop) {
            $$$1(this._backdrop).remove();
            this._backdrop = null;
          }
        };
  
        _proto._showBackdrop = function _showBackdrop(callback) {
          var _this8 = this;
  
          var animate = $$$1(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';
  
          if (this._isShown && this._config.backdrop) {
            this._backdrop = document.createElement('div');
            this._backdrop.className = ClassName.BACKDROP;
  
            if (animate) {
              $$$1(this._backdrop).addClass(animate);
            }
  
            $$$1(this._backdrop).appendTo(document.body);
            $$$1(this._element).on(Event.CLICK_DISMISS, function (event) {
              if (_this8._ignoreBackdropClick) {
                _this8._ignoreBackdropClick = false;
                return;
              }
  
              if (event.target !== event.currentTarget) {
                return;
              }
  
              if (_this8._config.backdrop === 'static') {
                _this8._element.focus();
              } else {
                _this8.hide();
              }
            });
  
            if (animate) {
              Util.reflow(this._backdrop);
            }
  
            $$$1(this._backdrop).addClass(ClassName.SHOW);
  
            if (!callback) {
              return;
            }
  
            if (!animate) {
              callback();
              return;
            }
  
            var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
            $$$1(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
          } else if (!this._isShown && this._backdrop) {
            $$$1(this._backdrop).removeClass(ClassName.SHOW);
  
            var callbackRemove = function callbackRemove() {
              _this8._removeBackdrop();
  
              if (callback) {
                callback();
              }
            };
  
            if ($$$1(this._element).hasClass(ClassName.FADE)) {
              var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
  
              $$$1(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
            } else {
              callbackRemove();
            }
          } else if (callback) {
            callback();
          }
        }; // ----------------------------------------------------------------------
        // the following methods are used to handle overflowing modals
        // todo (fat): these should probably be refactored out of modal.js
        // ----------------------------------------------------------------------
  
  
        _proto._adjustDialog = function _adjustDialog() {
          var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
  
          if (!this._isBodyOverflowing && isModalOverflowing) {
            this._element.style.paddingLeft = this._scrollbarWidth + "px";
          }
  
          if (this._isBodyOverflowing && !isModalOverflowing) {
            this._element.style.paddingRight = this._scrollbarWidth + "px";
          }
        };
  
        _proto._resetAdjustments = function _resetAdjustments() {
          this._element.style.paddingLeft = '';
          this._element.style.paddingRight = '';
        };
  
        _proto._checkScrollbar = function _checkScrollbar() {
          var rect = document.body.getBoundingClientRect();
          this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
          this._scrollbarWidth = this._getScrollbarWidth();
        };
  
        _proto._setScrollbar = function _setScrollbar() {
          var _this9 = this;
  
          if (this._isBodyOverflowing) {
            // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
            //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
            // Adjust fixed content padding
            $$$1(Selector.FIXED_CONTENT).each(function (index, element) {
              var actualPadding = $$$1(element)[0].style.paddingRight;
              var calculatedPadding = $$$1(element).css('padding-right');
              $$$1(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
            }); // Adjust sticky content margin
  
            $$$1(Selector.STICKY_CONTENT).each(function (index, element) {
              var actualMargin = $$$1(element)[0].style.marginRight;
              var calculatedMargin = $$$1(element).css('margin-right');
              $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
            }); // Adjust navbar-toggler margin
  
            $$$1(Selector.NAVBAR_TOGGLER).each(function (index, element) {
              var actualMargin = $$$1(element)[0].style.marginRight;
              var calculatedMargin = $$$1(element).css('margin-right');
              $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) + _this9._scrollbarWidth + "px");
            }); // Adjust body padding
  
            var actualPadding = document.body.style.paddingRight;
            var calculatedPadding = $$$1(document.body).css('padding-right');
            $$$1(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
          }
        };
  
        _proto._resetScrollbar = function _resetScrollbar() {
          // Restore fixed content padding
          $$$1(Selector.FIXED_CONTENT).each(function (index, element) {
            var padding = $$$1(element).data('padding-right');
  
            if (typeof padding !== 'undefined') {
              $$$1(element).css('padding-right', padding).removeData('padding-right');
            }
          }); // Restore sticky content and navbar-toggler margin
  
          $$$1(Selector.STICKY_CONTENT + ", " + Selector.NAVBAR_TOGGLER).each(function (index, element) {
            var margin = $$$1(element).data('margin-right');
  
            if (typeof margin !== 'undefined') {
              $$$1(element).css('margin-right', margin).removeData('margin-right');
            }
          }); // Restore body padding
  
          var padding = $$$1(document.body).data('padding-right');
  
          if (typeof padding !== 'undefined') {
            $$$1(document.body).css('padding-right', padding).removeData('padding-right');
          }
        };
  
        _proto._getScrollbarWidth = function _getScrollbarWidth() {
          // thx d.walsh
          var scrollDiv = document.createElement('div');
          scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
          document.body.appendChild(scrollDiv);
          var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
          document.body.removeChild(scrollDiv);
          return scrollbarWidth;
        }; // Static
  
  
        Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
          return this.each(function () {
            var data = $$$1(this).data(DATA_KEY);
  
            var _config = _objectSpread({}, Default, $$$1(this).data(), typeof config === 'object' && config ? config : {});
  
            if (!data) {
              data = new Modal(this, _config);
              $$$1(this).data(DATA_KEY, data);
            }
  
            if (typeof config === 'string') {
              if (typeof data[config] === 'undefined') {
                throw new TypeError("No method named \"" + config + "\"");
              }
  
              data[config](relatedTarget);
            } else if (_config.show) {
              data.show(relatedTarget);
            }
          });
        };
  
        _createClass(Modal, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION;
          }
        }, {
          key: "Default",
          get: function get() {
            return Default;
          }
        }]);
  
        return Modal;
      }();
      /**
       * ------------------------------------------------------------------------
       * Data Api implementation
       * ------------------------------------------------------------------------
       */
  
  
      $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
        var _this10 = this;
  
        var target;
        var selector = Util.getSelectorFromElement(this);
  
        if (selector) {
          target = $$$1(selector)[0];
        }
  
        var config = $$$1(target).data(DATA_KEY) ? 'toggle' : _objectSpread({}, $$$1(target).data(), $$$1(this).data());
  
        if (this.tagName === 'A' || this.tagName === 'AREA') {
          event.preventDefault();
        }
  
        var $target = $$$1(target).one(Event.SHOW, function (showEvent) {
          if (showEvent.isDefaultPrevented()) {
            // Only register focus restorer if modal will actually get shown
            return;
          }
  
          $target.one(Event.HIDDEN, function () {
            if ($$$1(_this10).is(':visible')) {
              _this10.focus();
            }
          });
        });
  
        Modal._jQueryInterface.call($$$1(target), config, this);
      });
      /**
       * ------------------------------------------------------------------------
       * jQuery
       * ------------------------------------------------------------------------
       */
  
      $$$1.fn[NAME] = Modal._jQueryInterface;
      $$$1.fn[NAME].Constructor = Modal;
  
      $$$1.fn[NAME].noConflict = function () {
        $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
        return Modal._jQueryInterface;
      };
  
      return Modal;
    }($);
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.1.1): tooltip.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
  
    var Tooltip = function ($$$1) {
      /**
       * ------------------------------------------------------------------------
       * Constants
       * ------------------------------------------------------------------------
       */
      var NAME = 'tooltip';
      var VERSION = '4.1.1';
      var DATA_KEY = 'bs.tooltip';
      var EVENT_KEY = "." + DATA_KEY;
      var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
      var CLASS_PREFIX = 'bs-tooltip';
      var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
      var DefaultType = {
        animation: 'boolean',
        template: 'string',
        title: '(string|element|function)',
        trigger: 'string',
        delay: '(number|object)',
        html: 'boolean',
        selector: '(string|boolean)',
        placement: '(string|function)',
        offset: '(number|string)',
        container: '(string|element|boolean)',
        fallbackPlacement: '(string|array)',
        boundary: '(string|element)'
      };
      var AttachmentMap = {
        AUTO: 'auto',
        TOP: 'top',
        RIGHT: 'right',
        BOTTOM: 'bottom',
        LEFT: 'left'
      };
      var Default = {
        animation: true,
        template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: false,
        selector: false,
        placement: 'top',
        offset: 0,
        container: false,
        fallbackPlacement: 'flip',
        boundary: 'scrollParent'
      };
      var HoverState = {
        SHOW: 'show',
        OUT: 'out'
      };
      var Event = {
        HIDE: "hide" + EVENT_KEY,
        HIDDEN: "hidden" + EVENT_KEY,
        SHOW: "show" + EVENT_KEY,
        SHOWN: "shown" + EVENT_KEY,
        INSERTED: "inserted" + EVENT_KEY,
        CLICK: "click" + EVENT_KEY,
        FOCUSIN: "focusin" + EVENT_KEY,
        FOCUSOUT: "focusout" + EVENT_KEY,
        MOUSEENTER: "mouseenter" + EVENT_KEY,
        MOUSELEAVE: "mouseleave" + EVENT_KEY
      };
      var ClassName = {
        FADE: 'fade',
        SHOW: 'show'
      };
      var Selector = {
        TOOLTIP: '.tooltip',
        TOOLTIP_INNER: '.tooltip-inner',
        ARROW: '.arrow'
      };
      var Trigger = {
        HOVER: 'hover',
        FOCUS: 'focus',
        CLICK: 'click',
        MANUAL: 'manual'
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */
  
      };
  
      var Tooltip =
      /*#__PURE__*/
      function () {
        function Tooltip(element, config) {
          /**
           * Check for Popper dependency
           * Popper - https://popper.js.org
           */
          if (typeof Popper === 'undefined') {
            throw new TypeError('Bootstrap tooltips require Popper.js (https://popper.js.org)');
          } // private
  
  
          this._isEnabled = true;
          this._timeout = 0;
          this._hoverState = '';
          this._activeTrigger = {};
          this._popper = null; // Protected
  
          this.element = element;
          this.config = this._getConfig(config);
          this.tip = null;
  
          this._setListeners();
        } // Getters
  
  
        var _proto = Tooltip.prototype;
  
        // Public
        _proto.enable = function enable() {
          this._isEnabled = true;
        };
  
        _proto.disable = function disable() {
          this._isEnabled = false;
        };
  
        _proto.toggleEnabled = function toggleEnabled() {
          this._isEnabled = !this._isEnabled;
        };
  
        _proto.toggle = function toggle(event) {
          if (!this._isEnabled) {
            return;
          }
  
          if (event) {
            var dataKey = this.constructor.DATA_KEY;
            var context = $$$1(event.currentTarget).data(dataKey);
  
            if (!context) {
              context = new this.constructor(event.currentTarget, this._getDelegateConfig());
              $$$1(event.currentTarget).data(dataKey, context);
            }
  
            context._activeTrigger.click = !context._activeTrigger.click;
  
            if (context._isWithActiveTrigger()) {
              context._enter(null, context);
            } else {
              context._leave(null, context);
            }
          } else {
            if ($$$1(this.getTipElement()).hasClass(ClassName.SHOW)) {
              this._leave(null, this);
  
              return;
            }
  
            this._enter(null, this);
          }
        };
  
        _proto.dispose = function dispose() {
          clearTimeout(this._timeout);
          $$$1.removeData(this.element, this.constructor.DATA_KEY);
          $$$1(this.element).off(this.constructor.EVENT_KEY);
          $$$1(this.element).closest('.modal').off('hide.bs.modal');
  
          if (this.tip) {
            $$$1(this.tip).remove();
          }
  
          this._isEnabled = null;
          this._timeout = null;
          this._hoverState = null;
          this._activeTrigger = null;
  
          if (this._popper !== null) {
            this._popper.destroy();
          }
  
          this._popper = null;
          this.element = null;
          this.config = null;
          this.tip = null;
        };
  
        _proto.show = function show() {
          var _this = this;
  
          if ($$$1(this.element).css('display') === 'none') {
            throw new Error('Please use show on visible elements');
          }
  
          var showEvent = $$$1.Event(this.constructor.Event.SHOW);
  
          if (this.isWithContent() && this._isEnabled) {
            $$$1(this.element).trigger(showEvent);
            var isInTheDom = $$$1.contains(this.element.ownerDocument.documentElement, this.element);
  
            if (showEvent.isDefaultPrevented() || !isInTheDom) {
              return;
            }
  
            var tip = this.getTipElement();
            var tipId = Util.getUID(this.constructor.NAME);
            tip.setAttribute('id', tipId);
            this.element.setAttribute('aria-describedby', tipId);
            this.setContent();
  
            if (this.config.animation) {
              $$$1(tip).addClass(ClassName.FADE);
            }
  
            var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;
  
            var attachment = this._getAttachment(placement);
  
            this.addAttachmentClass(attachment);
            var container = this.config.container === false ? document.body : $$$1(this.config.container);
            $$$1(tip).data(this.constructor.DATA_KEY, this);
  
            if (!$$$1.contains(this.element.ownerDocument.documentElement, this.tip)) {
              $$$1(tip).appendTo(container);
            }
  
            $$$1(this.element).trigger(this.constructor.Event.INSERTED);
            this._popper = new Popper(this.element, tip, {
              placement: attachment,
              modifiers: {
                offset: {
                  offset: this.config.offset
                },
                flip: {
                  behavior: this.config.fallbackPlacement
                },
                arrow: {
                  element: Selector.ARROW
                },
                preventOverflow: {
                  boundariesElement: this.config.boundary
                }
              },
              onCreate: function onCreate(data) {
                if (data.originalPlacement !== data.placement) {
                  _this._handlePopperPlacementChange(data);
                }
              },
              onUpdate: function onUpdate(data) {
                _this._handlePopperPlacementChange(data);
              }
            });
            $$$1(tip).addClass(ClassName.SHOW); // If this is a touch-enabled device we add extra
            // empty mouseover listeners to the body's immediate children;
            // only needed because of broken event delegation on iOS
            // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
  
            if ('ontouchstart' in document.documentElement) {
              $$$1(document.body).children().on('mouseover', null, $$$1.noop);
            }
  
            var complete = function complete() {
              if (_this.config.animation) {
                _this._fixTransition();
              }
  
              var prevHoverState = _this._hoverState;
              _this._hoverState = null;
              $$$1(_this.element).trigger(_this.constructor.Event.SHOWN);
  
              if (prevHoverState === HoverState.OUT) {
                _this._leave(null, _this);
              }
            };
  
            if ($$$1(this.tip).hasClass(ClassName.FADE)) {
              var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
              $$$1(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
            } else {
              complete();
            }
          }
        };
  
        _proto.hide = function hide(callback) {
          var _this2 = this;
  
          var tip = this.getTipElement();
          var hideEvent = $$$1.Event(this.constructor.Event.HIDE);
  
          var complete = function complete() {
            if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
              tip.parentNode.removeChild(tip);
            }
  
            _this2._cleanTipClass();
  
            _this2.element.removeAttribute('aria-describedby');
  
            $$$1(_this2.element).trigger(_this2.constructor.Event.HIDDEN);
  
            if (_this2._popper !== null) {
              _this2._popper.destroy();
            }
  
            if (callback) {
              callback();
            }
          };
  
          $$$1(this.element).trigger(hideEvent);
  
          if (hideEvent.isDefaultPrevented()) {
            return;
          }
  
          $$$1(tip).removeClass(ClassName.SHOW); // If this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support
  
          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().off('mouseover', null, $$$1.noop);
          }
  
          this._activeTrigger[Trigger.CLICK] = false;
          this._activeTrigger[Trigger.FOCUS] = false;
          this._activeTrigger[Trigger.HOVER] = false;
  
          if ($$$1(this.tip).hasClass(ClassName.FADE)) {
            var transitionDuration = Util.getTransitionDurationFromElement(tip);
            $$$1(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          } else {
            complete();
          }
  
          this._hoverState = '';
        };
  
        _proto.update = function update() {
          if (this._popper !== null) {
            this._popper.scheduleUpdate();
          }
        }; // Protected
  
  
        _proto.isWithContent = function isWithContent() {
          return Boolean(this.getTitle());
        };
  
        _proto.addAttachmentClass = function addAttachmentClass(attachment) {
          $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
        };
  
        _proto.getTipElement = function getTipElement() {
          this.tip = this.tip || $$$1(this.config.template)[0];
          return this.tip;
        };
  
        _proto.setContent = function setContent() {
          var $tip = $$$1(this.getTipElement());
          this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());
          $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
        };
  
        _proto.setElementContent = function setElementContent($element, content) {
          var html = this.config.html;
  
          if (typeof content === 'object' && (content.nodeType || content.jquery)) {
            // Content is a DOM node or a jQuery
            if (html) {
              if (!$$$1(content).parent().is($element)) {
                $element.empty().append(content);
              }
            } else {
              $element.text($$$1(content).text());
            }
          } else {
            $element[html ? 'html' : 'text'](content);
          }
        };
  
        _proto.getTitle = function getTitle() {
          var title = this.element.getAttribute('data-original-title');
  
          if (!title) {
            title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
          }
  
          return title;
        }; // Private
  
  
        _proto._getAttachment = function _getAttachment(placement) {
          return AttachmentMap[placement.toUpperCase()];
        };
  
        _proto._setListeners = function _setListeners() {
          var _this3 = this;
  
          var triggers = this.config.trigger.split(' ');
          triggers.forEach(function (trigger) {
            if (trigger === 'click') {
              $$$1(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function (event) {
                return _this3.toggle(event);
              });
            } else if (trigger !== Trigger.MANUAL) {
              var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
              var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;
              $$$1(_this3.element).on(eventIn, _this3.config.selector, function (event) {
                return _this3._enter(event);
              }).on(eventOut, _this3.config.selector, function (event) {
                return _this3._leave(event);
              });
            }
  
            $$$1(_this3.element).closest('.modal').on('hide.bs.modal', function () {
              return _this3.hide();
            });
          });
  
          if (this.config.selector) {
            this.config = _objectSpread({}, this.config, {
              trigger: 'manual',
              selector: ''
            });
          } else {
            this._fixTitle();
          }
        };
  
        _proto._fixTitle = function _fixTitle() {
          var titleType = typeof this.element.getAttribute('data-original-title');
  
          if (this.element.getAttribute('title') || titleType !== 'string') {
            this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
            this.element.setAttribute('title', '');
          }
        };
  
        _proto._enter = function _enter(event, context) {
          var dataKey = this.constructor.DATA_KEY;
          context = context || $$$1(event.currentTarget).data(dataKey);
  
          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $$$1(event.currentTarget).data(dataKey, context);
          }
  
          if (event) {
            context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
          }
  
          if ($$$1(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
            context._hoverState = HoverState.SHOW;
            return;
          }
  
          clearTimeout(context._timeout);
          context._hoverState = HoverState.SHOW;
  
          if (!context.config.delay || !context.config.delay.show) {
            context.show();
            return;
          }
  
          context._timeout = setTimeout(function () {
            if (context._hoverState === HoverState.SHOW) {
              context.show();
            }
          }, context.config.delay.show);
        };
  
        _proto._leave = function _leave(event, context) {
          var dataKey = this.constructor.DATA_KEY;
          context = context || $$$1(event.currentTarget).data(dataKey);
  
          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $$$1(event.currentTarget).data(dataKey, context);
          }
  
          if (event) {
            context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
          }
  
          if (context._isWithActiveTrigger()) {
            return;
          }
  
          clearTimeout(context._timeout);
          context._hoverState = HoverState.OUT;
  
          if (!context.config.delay || !context.config.delay.hide) {
            context.hide();
            return;
          }
  
          context._timeout = setTimeout(function () {
            if (context._hoverState === HoverState.OUT) {
              context.hide();
            }
          }, context.config.delay.hide);
        };
  
        _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
          for (var trigger in this._activeTrigger) {
            if (this._activeTrigger[trigger]) {
              return true;
            }
          }
  
          return false;
        };
  
        _proto._getConfig = function _getConfig(config) {
          config = _objectSpread({}, this.constructor.Default, $$$1(this.element).data(), typeof config === 'object' && config ? config : {});
  
          if (typeof config.delay === 'number') {
            config.delay = {
              show: config.delay,
              hide: config.delay
            };
          }
  
          if (typeof config.title === 'number') {
            config.title = config.title.toString();
          }
  
          if (typeof config.content === 'number') {
            config.content = config.content.toString();
          }
  
          Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
          return config;
        };
  
        _proto._getDelegateConfig = function _getDelegateConfig() {
          var config = {};
  
          if (this.config) {
            for (var key in this.config) {
              if (this.constructor.Default[key] !== this.config[key]) {
                config[key] = this.config[key];
              }
            }
          }
  
          return config;
        };
  
        _proto._cleanTipClass = function _cleanTipClass() {
          var $tip = $$$1(this.getTipElement());
          var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);
  
          if (tabClass !== null && tabClass.length > 0) {
            $tip.removeClass(tabClass.join(''));
          }
        };
  
        _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(data) {
          this._cleanTipClass();
  
          this.addAttachmentClass(this._getAttachment(data.placement));
        };
  
        _proto._fixTransition = function _fixTransition() {
          var tip = this.getTipElement();
          var initConfigAnimation = this.config.animation;
  
          if (tip.getAttribute('x-placement') !== null) {
            return;
          }
  
          $$$1(tip).removeClass(ClassName.FADE);
          this.config.animation = false;
          this.hide();
          this.show();
          this.config.animation = initConfigAnimation;
        }; // Static
  
  
        Tooltip._jQueryInterface = function _jQueryInterface(config) {
          return this.each(function () {
            var data = $$$1(this).data(DATA_KEY);
  
            var _config = typeof config === 'object' && config;
  
            if (!data && /dispose|hide/.test(config)) {
              return;
            }
  
            if (!data) {
              data = new Tooltip(this, _config);
              $$$1(this).data(DATA_KEY, data);
            }
  
            if (typeof config === 'string') {
              if (typeof data[config] === 'undefined') {
                throw new TypeError("No method named \"" + config + "\"");
              }
  
              data[config]();
            }
          });
        };
  
        _createClass(Tooltip, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION;
          }
        }, {
          key: "Default",
          get: function get() {
            return Default;
          }
        }, {
          key: "NAME",
          get: function get() {
            return NAME;
          }
        }, {
          key: "DATA_KEY",
          get: function get() {
            return DATA_KEY;
          }
        }, {
          key: "Event",
          get: function get() {
            return Event;
          }
        }, {
          key: "EVENT_KEY",
          get: function get() {
            return EVENT_KEY;
          }
        }, {
          key: "DefaultType",
          get: function get() {
            return DefaultType;
          }
        }]);
  
        return Tooltip;
      }();
      /**
       * ------------------------------------------------------------------------
       * jQuery
       * ------------------------------------------------------------------------
       */
  
  
      $$$1.fn[NAME] = Tooltip._jQueryInterface;
      $$$1.fn[NAME].Constructor = Tooltip;
  
      $$$1.fn[NAME].noConflict = function () {
        $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
        return Tooltip._jQueryInterface;
      };
  
      return Tooltip;
    }($, Popper);
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.1.1): popover.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
  
    var Popover = function ($$$1) {
      /**
       * ------------------------------------------------------------------------
       * Constants
       * ------------------------------------------------------------------------
       */
      var NAME = 'popover';
      var VERSION = '4.1.1';
      var DATA_KEY = 'bs.popover';
      var EVENT_KEY = "." + DATA_KEY;
      var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
      var CLASS_PREFIX = 'bs-popover';
      var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  
      var Default = _objectSpread({}, Tooltip.Default, {
        placement: 'right',
        trigger: 'click',
        content: '',
        template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
      });
  
      var DefaultType = _objectSpread({}, Tooltip.DefaultType, {
        content: '(string|element|function)'
      });
  
      var ClassName = {
        FADE: 'fade',
        SHOW: 'show'
      };
      var Selector = {
        TITLE: '.popover-header',
        CONTENT: '.popover-body'
      };
      var Event = {
        HIDE: "hide" + EVENT_KEY,
        HIDDEN: "hidden" + EVENT_KEY,
        SHOW: "show" + EVENT_KEY,
        SHOWN: "shown" + EVENT_KEY,
        INSERTED: "inserted" + EVENT_KEY,
        CLICK: "click" + EVENT_KEY,
        FOCUSIN: "focusin" + EVENT_KEY,
        FOCUSOUT: "focusout" + EVENT_KEY,
        MOUSEENTER: "mouseenter" + EVENT_KEY,
        MOUSELEAVE: "mouseleave" + EVENT_KEY
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */
  
      };
  
      var Popover =
      /*#__PURE__*/
      function (_Tooltip) {
        _inheritsLoose(Popover, _Tooltip);
  
        function Popover() {
          return _Tooltip.apply(this, arguments) || this;
        }
  
        var _proto = Popover.prototype;
  
        // Overrides
        _proto.isWithContent = function isWithContent() {
          return this.getTitle() || this._getContent();
        };
  
        _proto.addAttachmentClass = function addAttachmentClass(attachment) {
          $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
        };
  
        _proto.getTipElement = function getTipElement() {
          this.tip = this.tip || $$$1(this.config.template)[0];
          return this.tip;
        };
  
        _proto.setContent = function setContent() {
          var $tip = $$$1(this.getTipElement()); // We use append for html objects to maintain js events
  
          this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
  
          var content = this._getContent();
  
          if (typeof content === 'function') {
            content = content.call(this.element);
          }
  
          this.setElementContent($tip.find(Selector.CONTENT), content);
          $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
        }; // Private
  
  
        _proto._getContent = function _getContent() {
          return this.element.getAttribute('data-content') || this.config.content;
        };
  
        _proto._cleanTipClass = function _cleanTipClass() {
          var $tip = $$$1(this.getTipElement());
          var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);
  
          if (tabClass !== null && tabClass.length > 0) {
            $tip.removeClass(tabClass.join(''));
          }
        }; // Static
  
  
        Popover._jQueryInterface = function _jQueryInterface(config) {
          return this.each(function () {
            var data = $$$1(this).data(DATA_KEY);
  
            var _config = typeof config === 'object' ? config : null;
  
            if (!data && /destroy|hide/.test(config)) {
              return;
            }
  
            if (!data) {
              data = new Popover(this, _config);
              $$$1(this).data(DATA_KEY, data);
            }
  
            if (typeof config === 'string') {
              if (typeof data[config] === 'undefined') {
                throw new TypeError("No method named \"" + config + "\"");
              }
  
              data[config]();
            }
          });
        };
  
        _createClass(Popover, null, [{
          key: "VERSION",
          // Getters
          get: function get() {
            return VERSION;
          }
        }, {
          key: "Default",
          get: function get() {
            return Default;
          }
        }, {
          key: "NAME",
          get: function get() {
            return NAME;
          }
        }, {
          key: "DATA_KEY",
          get: function get() {
            return DATA_KEY;
          }
        }, {
          key: "Event",
          get: function get() {
            return Event;
          }
        }, {
          key: "EVENT_KEY",
          get: function get() {
            return EVENT_KEY;
          }
        }, {
          key: "DefaultType",
          get: function get() {
            return DefaultType;
          }
        }]);
  
        return Popover;
      }(Tooltip);
      /**
       * ------------------------------------------------------------------------
       * jQuery
       * ------------------------------------------------------------------------
       */
  
  
      $$$1.fn[NAME] = Popover._jQueryInterface;
      $$$1.fn[NAME].Constructor = Popover;
  
      $$$1.fn[NAME].noConflict = function () {
        $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
        return Popover._jQueryInterface;
      };
  
      return Popover;
    }($);
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.1.1): scrollspy.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
  
    var ScrollSpy = function ($$$1) {
      /**
       * ------------------------------------------------------------------------
       * Constants
       * ------------------------------------------------------------------------
       */
      var NAME = 'scrollspy';
      var VERSION = '4.1.1';
      var DATA_KEY = 'bs.scrollspy';
      var EVENT_KEY = "." + DATA_KEY;
      var DATA_API_KEY = '.data-api';
      var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
      var Default = {
        offset: 10,
        method: 'auto',
        target: ''
      };
      var DefaultType = {
        offset: 'number',
        method: 'string',
        target: '(string|element)'
      };
      var Event = {
        ACTIVATE: "activate" + EVENT_KEY,
        SCROLL: "scroll" + EVENT_KEY,
        LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
      };
      var ClassName = {
        DROPDOWN_ITEM: 'dropdown-item',
        DROPDOWN_MENU: 'dropdown-menu',
        ACTIVE: 'active'
      };
      var Selector = {
        DATA_SPY: '[data-spy="scroll"]',
        ACTIVE: '.active',
        NAV_LIST_GROUP: '.nav, .list-group',
        NAV_LINKS: '.nav-link',
        NAV_ITEMS: '.nav-item',
        LIST_ITEMS: '.list-group-item',
        DROPDOWN: '.dropdown',
        DROPDOWN_ITEMS: '.dropdown-item',
        DROPDOWN_TOGGLE: '.dropdown-toggle'
      };
      var OffsetMethod = {
        OFFSET: 'offset',
        POSITION: 'position'
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */
  
      };
  
      var ScrollSpy =
      /*#__PURE__*/
      function () {
        function ScrollSpy(element, config) {
          var _this = this;
  
          this._element = element;
          this._scrollElement = element.tagName === 'BODY' ? window : element;
          this._config = this._getConfig(config);
          this._selector = this._config.target + " " + Selector.NAV_LINKS + "," + (this._config.target + " " + Selector.LIST_ITEMS + ",") + (this._config.target + " " + Selector.DROPDOWN_ITEMS);
          this._offsets = [];
          this._targets = [];
          this._activeTarget = null;
          this._scrollHeight = 0;
          $$$1(this._scrollElement).on(Event.SCROLL, function (event) {
            return _this._process(event);
          });
          this.refresh();
  
          this._process();
        } // Getters
  
  
        var _proto = ScrollSpy.prototype;
  
        // Public
        _proto.refresh = function refresh() {
          var _this2 = this;
  
          var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
          var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
          var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
          this._offsets = [];
          this._targets = [];
          this._scrollHeight = this._getScrollHeight();
          var targets = $$$1.makeArray($$$1(this._selector));
          targets.map(function (element) {
            var target;
            var targetSelector = Util.getSelectorFromElement(element);
  
            if (targetSelector) {
              target = $$$1(targetSelector)[0];
            }
  
            if (target) {
              var targetBCR = target.getBoundingClientRect();
  
              if (targetBCR.width || targetBCR.height) {
                // TODO (fat): remove sketch reliance on jQuery position/offset
                return [$$$1(target)[offsetMethod]().top + offsetBase, targetSelector];
              }
            }
  
            return null;
          }).filter(function (item) {
            return item;
          }).sort(function (a, b) {
            return a[0] - b[0];
          }).forEach(function (item) {
            _this2._offsets.push(item[0]);
  
            _this2._targets.push(item[1]);
          });
        };
  
        _proto.dispose = function dispose() {
          $$$1.removeData(this._element, DATA_KEY);
          $$$1(this._scrollElement).off(EVENT_KEY);
          this._element = null;
          this._scrollElement = null;
          this._config = null;
          this._selector = null;
          this._offsets = null;
          this._targets = null;
          this._activeTarget = null;
          this._scrollHeight = null;
        }; // Private
  
  
        _proto._getConfig = function _getConfig(config) {
          config = _objectSpread({}, Default, typeof config === 'object' && config ? config : {});
  
          if (typeof config.target !== 'string') {
            var id = $$$1(config.target).attr('id');
  
            if (!id) {
              id = Util.getUID(NAME);
              $$$1(config.target).attr('id', id);
            }
  
            config.target = "#" + id;
          }
  
          Util.typeCheckConfig(NAME, config, DefaultType);
          return config;
        };
  
        _proto._getScrollTop = function _getScrollTop() {
          return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
        };
  
        _proto._getScrollHeight = function _getScrollHeight() {
          return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        };
  
        _proto._getOffsetHeight = function _getOffsetHeight() {
          return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
        };
  
        _proto._process = function _process() {
          var scrollTop = this._getScrollTop() + this._config.offset;
  
          var scrollHeight = this._getScrollHeight();
  
          var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();
  
          if (this._scrollHeight !== scrollHeight) {
            this.refresh();
          }
  
          if (scrollTop >= maxScroll) {
            var target = this._targets[this._targets.length - 1];
  
            if (this._activeTarget !== target) {
              this._activate(target);
            }
  
            return;
          }
  
          if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
            this._activeTarget = null;
  
            this._clear();
  
            return;
          }
  
          for (var i = this._offsets.length; i--;) {
            var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);
  
            if (isActiveTarget) {
              this._activate(this._targets[i]);
            }
          }
        };
  
        _proto._activate = function _activate(target) {
          this._activeTarget = target;
  
          this._clear();
  
          var queries = this._selector.split(','); // eslint-disable-next-line arrow-body-style
  
  
          queries = queries.map(function (selector) {
            return selector + "[data-target=\"" + target + "\"]," + (selector + "[href=\"" + target + "\"]");
          });
          var $link = $$$1(queries.join(','));
  
          if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
            $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
            $link.addClass(ClassName.ACTIVE);
          } else {
            // Set triggered link as active
            $link.addClass(ClassName.ACTIVE); // Set triggered links parents as active
            // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
  
            $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_LINKS + ", " + Selector.LIST_ITEMS).addClass(ClassName.ACTIVE); // Handle special case when .nav-link is inside .nav-item
  
            $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_ITEMS).children(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
          }
  
          $$$1(this._scrollElement).trigger(Event.ACTIVATE, {
            relatedTarget: target
          });
        };
  
        _proto._clear = function _clear() {
          $$$1(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
        }; // Static
  
  
        ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
          return this.each(function () {
            var data = $$$1(this).data(DATA_KEY);
  
            var _config = typeof config === 'object' && config;
  
            if (!data) {
              data = new ScrollSpy(this, _config);
              $$$1(this).data(DATA_KEY, data);
            }
  
            if (typeof config === 'string') {
              if (typeof data[config] === 'undefined') {
                throw new TypeError("No method named \"" + config + "\"");
              }
  
              data[config]();
            }
          });
        };
  
        _createClass(ScrollSpy, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION;
          }
        }, {
          key: "Default",
          get: function get() {
            return Default;
          }
        }]);
  
        return ScrollSpy;
      }();
      /**
       * ------------------------------------------------------------------------
       * Data Api implementation
       * ------------------------------------------------------------------------
       */
  
  
      $$$1(window).on(Event.LOAD_DATA_API, function () {
        var scrollSpys = $$$1.makeArray($$$1(Selector.DATA_SPY));
  
        for (var i = scrollSpys.length; i--;) {
          var $spy = $$$1(scrollSpys[i]);
  
          ScrollSpy._jQueryInterface.call($spy, $spy.data());
        }
      });
      /**
       * ------------------------------------------------------------------------
       * jQuery
       * ------------------------------------------------------------------------
       */
  
      $$$1.fn[NAME] = ScrollSpy._jQueryInterface;
      $$$1.fn[NAME].Constructor = ScrollSpy;
  
      $$$1.fn[NAME].noConflict = function () {
        $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
        return ScrollSpy._jQueryInterface;
      };
  
      return ScrollSpy;
    }($);
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.1.1): tab.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
  
    var Tab = function ($$$1) {
      /**
       * ------------------------------------------------------------------------
       * Constants
       * ------------------------------------------------------------------------
       */
      var NAME = 'tab';
      var VERSION = '4.1.1';
      var DATA_KEY = 'bs.tab';
      var EVENT_KEY = "." + DATA_KEY;
      var DATA_API_KEY = '.data-api';
      var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
      var Event = {
        HIDE: "hide" + EVENT_KEY,
        HIDDEN: "hidden" + EVENT_KEY,
        SHOW: "show" + EVENT_KEY,
        SHOWN: "shown" + EVENT_KEY,
        CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
      };
      var ClassName = {
        DROPDOWN_MENU: 'dropdown-menu',
        ACTIVE: 'active',
        DISABLED: 'disabled',
        FADE: 'fade',
        SHOW: 'show'
      };
      var Selector = {
        DROPDOWN: '.dropdown',
        NAV_LIST_GROUP: '.nav, .list-group',
        ACTIVE: '.active',
        ACTIVE_UL: '> li > .active',
        DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
        DROPDOWN_TOGGLE: '.dropdown-toggle',
        DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */
  
      };
  
      var Tab =
      /*#__PURE__*/
      function () {
        function Tab(element) {
          this._element = element;
        } // Getters
  
  
        var _proto = Tab.prototype;
  
        // Public
        _proto.show = function show() {
          var _this = this;
  
          if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $$$1(this._element).hasClass(ClassName.ACTIVE) || $$$1(this._element).hasClass(ClassName.DISABLED)) {
            return;
          }
  
          var target;
          var previous;
          var listElement = $$$1(this._element).closest(Selector.NAV_LIST_GROUP)[0];
          var selector = Util.getSelectorFromElement(this._element);
  
          if (listElement) {
            var itemSelector = listElement.nodeName === 'UL' ? Selector.ACTIVE_UL : Selector.ACTIVE;
            previous = $$$1.makeArray($$$1(listElement).find(itemSelector));
            previous = previous[previous.length - 1];
          }
  
          var hideEvent = $$$1.Event(Event.HIDE, {
            relatedTarget: this._element
          });
          var showEvent = $$$1.Event(Event.SHOW, {
            relatedTarget: previous
          });
  
          if (previous) {
            $$$1(previous).trigger(hideEvent);
          }
  
          $$$1(this._element).trigger(showEvent);
  
          if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
            return;
          }
  
          if (selector) {
            target = $$$1(selector)[0];
          }
  
          this._activate(this._element, listElement);
  
          var complete = function complete() {
            var hiddenEvent = $$$1.Event(Event.HIDDEN, {
              relatedTarget: _this._element
            });
            var shownEvent = $$$1.Event(Event.SHOWN, {
              relatedTarget: previous
            });
            $$$1(previous).trigger(hiddenEvent);
            $$$1(_this._element).trigger(shownEvent);
          };
  
          if (target) {
            this._activate(target, target.parentNode, complete);
          } else {
            complete();
          }
        };
  
        _proto.dispose = function dispose() {
          $$$1.removeData(this._element, DATA_KEY);
          this._element = null;
        }; // Private
  
  
        _proto._activate = function _activate(element, container, callback) {
          var _this2 = this;
  
          var activeElements;
  
          if (container.nodeName === 'UL') {
            activeElements = $$$1(container).find(Selector.ACTIVE_UL);
          } else {
            activeElements = $$$1(container).children(Selector.ACTIVE);
          }
  
          var active = activeElements[0];
          var isTransitioning = callback && active && $$$1(active).hasClass(ClassName.FADE);
  
          var complete = function complete() {
            return _this2._transitionComplete(element, active, callback);
          };
  
          if (active && isTransitioning) {
            var transitionDuration = Util.getTransitionDurationFromElement(active);
            $$$1(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          } else {
            complete();
          }
        };
  
        _proto._transitionComplete = function _transitionComplete(element, active, callback) {
          if (active) {
            $$$1(active).removeClass(ClassName.SHOW + " " + ClassName.ACTIVE);
            var dropdownChild = $$$1(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];
  
            if (dropdownChild) {
              $$$1(dropdownChild).removeClass(ClassName.ACTIVE);
            }
  
            if (active.getAttribute('role') === 'tab') {
              active.setAttribute('aria-selected', false);
            }
          }
  
          $$$1(element).addClass(ClassName.ACTIVE);
  
          if (element.getAttribute('role') === 'tab') {
            element.setAttribute('aria-selected', true);
          }
  
          Util.reflow(element);
          $$$1(element).addClass(ClassName.SHOW);
  
          if (element.parentNode && $$$1(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {
            var dropdownElement = $$$1(element).closest(Selector.DROPDOWN)[0];
  
            if (dropdownElement) {
              $$$1(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
            }
  
            element.setAttribute('aria-expanded', true);
          }
  
          if (callback) {
            callback();
          }
        }; // Static
  
  
        Tab._jQueryInterface = function _jQueryInterface(config) {
          return this.each(function () {
            var $this = $$$1(this);
            var data = $this.data(DATA_KEY);
  
            if (!data) {
              data = new Tab(this);
              $this.data(DATA_KEY, data);
            }
  
            if (typeof config === 'string') {
              if (typeof data[config] === 'undefined') {
                throw new TypeError("No method named \"" + config + "\"");
              }
  
              data[config]();
            }
          });
        };
  
        _createClass(Tab, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION;
          }
        }]);
  
        return Tab;
      }();
      /**
       * ------------------------------------------------------------------------
       * Data Api implementation
       * ------------------------------------------------------------------------
       */
  
  
      $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
        event.preventDefault();
  
        Tab._jQueryInterface.call($$$1(this), 'show');
      });
      /**
       * ------------------------------------------------------------------------
       * jQuery
       * ------------------------------------------------------------------------
       */
  
      $$$1.fn[NAME] = Tab._jQueryInterface;
      $$$1.fn[NAME].Constructor = Tab;
  
      $$$1.fn[NAME].noConflict = function () {
        $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
        return Tab._jQueryInterface;
      };
  
      return Tab;
    }($);
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.1.1): index.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
  
    (function ($$$1) {
      if (typeof $$$1 === 'undefined') {
        throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
      }
  
      var version = $$$1.fn.jquery.split(' ')[0].split('.');
      var minMajor = 1;
      var ltMajor = 2;
      var minMinor = 9;
      var minPatch = 1;
      var maxMajor = 4;
  
      if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
        throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
      }
    })($);
  
    exports.Util = Util;
    exports.Alert = Alert;
    exports.Button = Button;
    exports.Carousel = Carousel;
    exports.Collapse = Collapse;
    exports.Dropdown = Dropdown;
    exports.Modal = Modal;
    exports.Popover = Popover;
    exports.Scrollspy = ScrollSpy;
    exports.Tab = Tab;
    exports.Tooltip = Tooltip;
  
    Object.defineProperty(exports, '__esModule', { value: true });
  
  })));
  //# sourceMappingURL=bootstrap.js.map
  





/*
 Copyright (C) Federico Zivolo 2019
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */(function(e,t){'object'==typeof exports&&'undefined'!=typeof module?module.exports=t():'function'==typeof define&&define.amd?define(t):e.Popper=t()})(this,function(){'use strict';function e(e){return e&&'[object Function]'==={}.toString.call(e)}function t(e,t){if(1!==e.nodeType)return[];var o=e.ownerDocument.defaultView,n=o.getComputedStyle(e,null);return t?n[t]:n}function o(e){return'HTML'===e.nodeName?e:e.parentNode||e.host}function n(e){if(!e)return document.body;switch(e.nodeName){case'HTML':case'BODY':return e.ownerDocument.body;case'#document':return e.body;}var i=t(e),r=i.overflow,p=i.overflowX,s=i.overflowY;return /(auto|scroll|overlay)/.test(r+s+p)?e:n(o(e))}function i(e){return e&&e.referenceNode?e.referenceNode:e}function r(e){return 11===e?re:10===e?pe:re||pe}function p(e){if(!e)return document.documentElement;for(var o=r(10)?document.body:null,n=e.offsetParent||null;n===o&&e.nextElementSibling;)n=(e=e.nextElementSibling).offsetParent;var i=n&&n.nodeName;return i&&'BODY'!==i&&'HTML'!==i?-1!==['TH','TD','TABLE'].indexOf(n.nodeName)&&'static'===t(n,'position')?p(n):n:e?e.ownerDocument.documentElement:document.documentElement}function s(e){var t=e.nodeName;return'BODY'!==t&&('HTML'===t||p(e.firstElementChild)===e)}function d(e){return null===e.parentNode?e:d(e.parentNode)}function a(e,t){if(!e||!e.nodeType||!t||!t.nodeType)return document.documentElement;var o=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,n=o?e:t,i=o?t:e,r=document.createRange();r.setStart(n,0),r.setEnd(i,0);var l=r.commonAncestorContainer;if(e!==l&&t!==l||n.contains(i))return s(l)?l:p(l);var f=d(e);return f.host?a(f.host,t):a(e,d(t).host)}function l(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:'top',o='top'===t?'scrollTop':'scrollLeft',n=e.nodeName;if('BODY'===n||'HTML'===n){var i=e.ownerDocument.documentElement,r=e.ownerDocument.scrollingElement||i;return r[o]}return e[o]}function f(e,t){var o=2<arguments.length&&void 0!==arguments[2]&&arguments[2],n=l(t,'top'),i=l(t,'left'),r=o?-1:1;return e.top+=n*r,e.bottom+=n*r,e.left+=i*r,e.right+=i*r,e}function m(e,t){var o='x'===t?'Left':'Top',n='Left'==o?'Right':'Bottom';return parseFloat(e['border'+o+'Width'],10)+parseFloat(e['border'+n+'Width'],10)}function h(e,t,o,n){return ee(t['offset'+e],t['scroll'+e],o['client'+e],o['offset'+e],o['scroll'+e],r(10)?parseInt(o['offset'+e])+parseInt(n['margin'+('Height'===e?'Top':'Left')])+parseInt(n['margin'+('Height'===e?'Bottom':'Right')]):0)}function c(e){var t=e.body,o=e.documentElement,n=r(10)&&getComputedStyle(o);return{height:h('Height',t,o,n),width:h('Width',t,o,n)}}function g(e){return le({},e,{right:e.left+e.width,bottom:e.top+e.height})}function u(e){var o={};try{if(r(10)){o=e.getBoundingClientRect();var n=l(e,'top'),i=l(e,'left');o.top+=n,o.left+=i,o.bottom+=n,o.right+=i}else o=e.getBoundingClientRect()}catch(t){}var p={left:o.left,top:o.top,width:o.right-o.left,height:o.bottom-o.top},s='HTML'===e.nodeName?c(e.ownerDocument):{},d=s.width||e.clientWidth||p.width,a=s.height||e.clientHeight||p.height,f=e.offsetWidth-d,h=e.offsetHeight-a;if(f||h){var u=t(e);f-=m(u,'x'),h-=m(u,'y'),p.width-=f,p.height-=h}return g(p)}function b(e,o){var i=2<arguments.length&&void 0!==arguments[2]&&arguments[2],p=r(10),s='HTML'===o.nodeName,d=u(e),a=u(o),l=n(e),m=t(o),h=parseFloat(m.borderTopWidth,10),c=parseFloat(m.borderLeftWidth,10);i&&s&&(a.top=ee(a.top,0),a.left=ee(a.left,0));var b=g({top:d.top-a.top-h,left:d.left-a.left-c,width:d.width,height:d.height});if(b.marginTop=0,b.marginLeft=0,!p&&s){var w=parseFloat(m.marginTop,10),y=parseFloat(m.marginLeft,10);b.top-=h-w,b.bottom-=h-w,b.left-=c-y,b.right-=c-y,b.marginTop=w,b.marginLeft=y}return(p&&!i?o.contains(l):o===l&&'BODY'!==l.nodeName)&&(b=f(b,o)),b}function w(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1],o=e.ownerDocument.documentElement,n=b(e,o),i=ee(o.clientWidth,window.innerWidth||0),r=ee(o.clientHeight,window.innerHeight||0),p=t?0:l(o),s=t?0:l(o,'left'),d={top:p-n.top+n.marginTop,left:s-n.left+n.marginLeft,width:i,height:r};return g(d)}function y(e){var n=e.nodeName;if('BODY'===n||'HTML'===n)return!1;if('fixed'===t(e,'position'))return!0;var i=o(e);return!!i&&y(i)}function E(e){if(!e||!e.parentElement||r())return document.documentElement;for(var o=e.parentElement;o&&'none'===t(o,'transform');)o=o.parentElement;return o||document.documentElement}function v(e,t,r,p){var s=4<arguments.length&&void 0!==arguments[4]&&arguments[4],d={top:0,left:0},l=s?E(e):a(e,i(t));if('viewport'===p)d=w(l,s);else{var f;'scrollParent'===p?(f=n(o(t)),'BODY'===f.nodeName&&(f=e.ownerDocument.documentElement)):'window'===p?f=e.ownerDocument.documentElement:f=p;var m=b(f,l,s);if('HTML'===f.nodeName&&!y(l)){var h=c(e.ownerDocument),g=h.height,u=h.width;d.top+=m.top-m.marginTop,d.bottom=g+m.top,d.left+=m.left-m.marginLeft,d.right=u+m.left}else d=m}r=r||0;var v='number'==typeof r;return d.left+=v?r:r.left||0,d.top+=v?r:r.top||0,d.right-=v?r:r.right||0,d.bottom-=v?r:r.bottom||0,d}function x(e){var t=e.width,o=e.height;return t*o}function O(e,t,o,n,i){var r=5<arguments.length&&void 0!==arguments[5]?arguments[5]:0;if(-1===e.indexOf('auto'))return e;var p=v(o,n,r,i),s={top:{width:p.width,height:t.top-p.top},right:{width:p.right-t.right,height:p.height},bottom:{width:p.width,height:p.bottom-t.bottom},left:{width:t.left-p.left,height:p.height}},d=Object.keys(s).map(function(e){return le({key:e},s[e],{area:x(s[e])})}).sort(function(e,t){return t.area-e.area}),a=d.filter(function(e){var t=e.width,n=e.height;return t>=o.clientWidth&&n>=o.clientHeight}),l=0<a.length?a[0].key:d[0].key,f=e.split('-')[1];return l+(f?'-'+f:'')}function L(e,t,o){var n=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null,r=n?E(t):a(t,i(o));return b(o,r,n)}function S(e){var t=e.ownerDocument.defaultView,o=t.getComputedStyle(e),n=parseFloat(o.marginTop||0)+parseFloat(o.marginBottom||0),i=parseFloat(o.marginLeft||0)+parseFloat(o.marginRight||0),r={width:e.offsetWidth+i,height:e.offsetHeight+n};return r}function T(e){var t={left:'right',right:'left',bottom:'top',top:'bottom'};return e.replace(/left|right|bottom|top/g,function(e){return t[e]})}function C(e,t,o){o=o.split('-')[0];var n=S(e),i={width:n.width,height:n.height},r=-1!==['right','left'].indexOf(o),p=r?'top':'left',s=r?'left':'top',d=r?'height':'width',a=r?'width':'height';return i[p]=t[p]+t[d]/2-n[d]/2,i[s]=o===s?t[s]-n[a]:t[T(s)],i}function D(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function N(e,t,o){if(Array.prototype.findIndex)return e.findIndex(function(e){return e[t]===o});var n=D(e,function(e){return e[t]===o});return e.indexOf(n)}function P(t,o,n){var i=void 0===n?t:t.slice(0,N(t,'name',n));return i.forEach(function(t){t['function']&&console.warn('`modifier.function` is deprecated, use `modifier.fn`!');var n=t['function']||t.fn;t.enabled&&e(n)&&(o.offsets.popper=g(o.offsets.popper),o.offsets.reference=g(o.offsets.reference),o=n(o,t))}),o}function k(){if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=L(this.state,this.popper,this.reference,this.options.positionFixed),e.placement=O(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.positionFixed=this.options.positionFixed,e.offsets.popper=C(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position=this.options.positionFixed?'fixed':'absolute',e=P(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}function W(e,t){return e.some(function(e){var o=e.name,n=e.enabled;return n&&o===t})}function B(e){for(var t=[!1,'ms','Webkit','Moz','O'],o=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<t.length;n++){var i=t[n],r=i?''+i+o:e;if('undefined'!=typeof document.body.style[r])return r}return null}function H(){return this.state.isDestroyed=!0,W(this.modifiers,'applyStyle')&&(this.popper.removeAttribute('x-placement'),this.popper.style.position='',this.popper.style.top='',this.popper.style.left='',this.popper.style.right='',this.popper.style.bottom='',this.popper.style.willChange='',this.popper.style[B('transform')]=''),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function A(e){var t=e.ownerDocument;return t?t.defaultView:window}function M(e,t,o,i){var r='BODY'===e.nodeName,p=r?e.ownerDocument.defaultView:e;p.addEventListener(t,o,{passive:!0}),r||M(n(p.parentNode),t,o,i),i.push(p)}function F(e,t,o,i){o.updateBound=i,A(e).addEventListener('resize',o.updateBound,{passive:!0});var r=n(e);return M(r,'scroll',o.updateBound,o.scrollParents),o.scrollElement=r,o.eventsEnabled=!0,o}function I(){this.state.eventsEnabled||(this.state=F(this.reference,this.options,this.state,this.scheduleUpdate))}function R(e,t){return A(e).removeEventListener('resize',t.updateBound),t.scrollParents.forEach(function(e){e.removeEventListener('scroll',t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}function U(){this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=R(this.reference,this.state))}function Y(e){return''!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function V(e,t){Object.keys(t).forEach(function(o){var n='';-1!==['width','height','top','right','bottom','left'].indexOf(o)&&Y(t[o])&&(n='px'),e.style[o]=t[o]+n})}function j(e,t){Object.keys(t).forEach(function(o){var n=t[o];!1===n?e.removeAttribute(o):e.setAttribute(o,t[o])})}function q(e,t){var o=e.offsets,n=o.popper,i=o.reference,r=$,p=function(e){return e},s=r(i.width),d=r(n.width),a=-1!==['left','right'].indexOf(e.placement),l=-1!==e.placement.indexOf('-'),f=t?a||l||s%2==d%2?r:Z:p,m=t?r:p;return{left:f(1==s%2&&1==d%2&&!l&&t?n.left-1:n.left),top:m(n.top),bottom:m(n.bottom),right:f(n.right)}}function K(e,t,o){var n=D(e,function(e){var o=e.name;return o===t}),i=!!n&&e.some(function(e){return e.name===o&&e.enabled&&e.order<n.order});if(!i){var r='`'+t+'`';console.warn('`'+o+'`'+' modifier is required by '+r+' modifier in order to work, be sure to include it before '+r+'!')}return i}function z(e){return'end'===e?'start':'start'===e?'end':e}function G(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1],o=he.indexOf(e),n=he.slice(o+1).concat(he.slice(0,o));return t?n.reverse():n}function _(e,t,o,n){var i=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),r=+i[1],p=i[2];if(!r)return e;if(0===p.indexOf('%')){var s;switch(p){case'%p':s=o;break;case'%':case'%r':default:s=n;}var d=g(s);return d[t]/100*r}if('vh'===p||'vw'===p){var a;return a='vh'===p?ee(document.documentElement.clientHeight,window.innerHeight||0):ee(document.documentElement.clientWidth,window.innerWidth||0),a/100*r}return r}function X(e,t,o,n){var i=[0,0],r=-1!==['right','left'].indexOf(n),p=e.split(/(\+|\-)/).map(function(e){return e.trim()}),s=p.indexOf(D(p,function(e){return-1!==e.search(/,|\s/)}));p[s]&&-1===p[s].indexOf(',')&&console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');var d=/\s*,\s*|\s+/,a=-1===s?[p]:[p.slice(0,s).concat([p[s].split(d)[0]]),[p[s].split(d)[1]].concat(p.slice(s+1))];return a=a.map(function(e,n){var i=(1===n?!r:r)?'height':'width',p=!1;return e.reduce(function(e,t){return''===e[e.length-1]&&-1!==['+','-'].indexOf(t)?(e[e.length-1]=t,p=!0,e):p?(e[e.length-1]+=t,p=!1,e):e.concat(t)},[]).map(function(e){return _(e,i,t,o)})}),a.forEach(function(e,t){e.forEach(function(o,n){Y(o)&&(i[t]+=o*('-'===e[n-1]?-1:1))})}),i}function J(e,t){var o,n=t.offset,i=e.placement,r=e.offsets,p=r.popper,s=r.reference,d=i.split('-')[0];return o=Y(+n)?[+n,0]:X(n,p,s,d),'left'===d?(p.top+=o[0],p.left-=o[1]):'right'===d?(p.top+=o[0],p.left+=o[1]):'top'===d?(p.left+=o[0],p.top-=o[1]):'bottom'===d&&(p.left+=o[0],p.top+=o[1]),e.popper=p,e}var Q=Math.min,Z=Math.floor,$=Math.round,ee=Math.max,te='undefined'!=typeof window&&'undefined'!=typeof document&&'undefined'!=typeof navigator,oe=function(){for(var e=['Edge','Trident','Firefox'],t=0;t<e.length;t+=1)if(te&&0<=navigator.userAgent.indexOf(e[t]))return 1;return 0}(),ne=te&&window.Promise,ie=ne?function(e){var t=!1;return function(){t||(t=!0,window.Promise.resolve().then(function(){t=!1,e()}))}}:function(e){var t=!1;return function(){t||(t=!0,setTimeout(function(){t=!1,e()},oe))}},re=te&&!!(window.MSInputMethodContext&&document.documentMode),pe=te&&/MSIE 10/.test(navigator.userAgent),se=function(e,t){if(!(e instanceof t))throw new TypeError('Cannot call a class as a function')},de=function(){function e(e,t){for(var o,n=0;n<t.length;n++)o=t[n],o.enumerable=o.enumerable||!1,o.configurable=!0,'value'in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),ae=function(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e},le=Object.assign||function(e){for(var t,o=1;o<arguments.length;o++)for(var n in t=arguments[o],t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},fe=te&&/Firefox/i.test(navigator.userAgent),me=['auto-start','auto','auto-end','top-start','top','top-end','right-start','right','right-end','bottom-end','bottom','bottom-start','left-end','left','left-start'],he=me.slice(3),ce={FLIP:'flip',CLOCKWISE:'clockwise',COUNTERCLOCKWISE:'counterclockwise'},ge=function(){function t(o,n){var i=this,r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};se(this,t),this.scheduleUpdate=function(){return requestAnimationFrame(i.update)},this.update=ie(this.update.bind(this)),this.options=le({},t.Defaults,r),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=o&&o.jquery?o[0]:o,this.popper=n&&n.jquery?n[0]:n,this.options.modifiers={},Object.keys(le({},t.Defaults.modifiers,r.modifiers)).forEach(function(e){i.options.modifiers[e]=le({},t.Defaults.modifiers[e]||{},r.modifiers?r.modifiers[e]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(e){return le({name:e},i.options.modifiers[e])}).sort(function(e,t){return e.order-t.order}),this.modifiers.forEach(function(t){t.enabled&&e(t.onLoad)&&t.onLoad(i.reference,i.popper,i.options,t,i.state)}),this.update();var p=this.options.eventsEnabled;p&&this.enableEventListeners(),this.state.eventsEnabled=p}return de(t,[{key:'update',value:function(){return k.call(this)}},{key:'destroy',value:function(){return H.call(this)}},{key:'enableEventListeners',value:function(){return I.call(this)}},{key:'disableEventListeners',value:function(){return U.call(this)}}]),t}();return ge.Utils=('undefined'==typeof window?global:window).PopperUtils,ge.placements=me,ge.Defaults={placement:'bottom',positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(e){var t=e.placement,o=t.split('-')[0],n=t.split('-')[1];if(n){var i=e.offsets,r=i.reference,p=i.popper,s=-1!==['bottom','top'].indexOf(o),d=s?'left':'top',a=s?'width':'height',l={start:ae({},d,r[d]),end:ae({},d,r[d]+r[a]-p[a])};e.offsets.popper=le({},p,l[n])}return e}},offset:{order:200,enabled:!0,fn:J,offset:0},preventOverflow:{order:300,enabled:!0,fn:function(e,t){var o=t.boundariesElement||p(e.instance.popper);e.instance.reference===o&&(o=p(o));var n=B('transform'),i=e.instance.popper.style,r=i.top,s=i.left,d=i[n];i.top='',i.left='',i[n]='';var a=v(e.instance.popper,e.instance.reference,t.padding,o,e.positionFixed);i.top=r,i.left=s,i[n]=d,t.boundaries=a;var l=t.priority,f=e.offsets.popper,m={primary:function(e){var o=f[e];return f[e]<a[e]&&!t.escapeWithReference&&(o=ee(f[e],a[e])),ae({},e,o)},secondary:function(e){var o='right'===e?'left':'top',n=f[o];return f[e]>a[e]&&!t.escapeWithReference&&(n=Q(f[o],a[e]-('right'===e?f.width:f.height))),ae({},o,n)}};return l.forEach(function(e){var t=-1===['left','top'].indexOf(e)?'secondary':'primary';f=le({},f,m[t](e))}),e.offsets.popper=f,e},priority:['left','right','top','bottom'],padding:5,boundariesElement:'scrollParent'},keepTogether:{order:400,enabled:!0,fn:function(e){var t=e.offsets,o=t.popper,n=t.reference,i=e.placement.split('-')[0],r=Z,p=-1!==['top','bottom'].indexOf(i),s=p?'right':'bottom',d=p?'left':'top',a=p?'width':'height';return o[s]<r(n[d])&&(e.offsets.popper[d]=r(n[d])-o[a]),o[d]>r(n[s])&&(e.offsets.popper[d]=r(n[s])),e}},arrow:{order:500,enabled:!0,fn:function(e,o){var n;if(!K(e.instance.modifiers,'arrow','keepTogether'))return e;var i=o.element;if('string'==typeof i){if(i=e.instance.popper.querySelector(i),!i)return e;}else if(!e.instance.popper.contains(i))return console.warn('WARNING: `arrow.element` must be child of its popper element!'),e;var r=e.placement.split('-')[0],p=e.offsets,s=p.popper,d=p.reference,a=-1!==['left','right'].indexOf(r),l=a?'height':'width',f=a?'Top':'Left',m=f.toLowerCase(),h=a?'left':'top',c=a?'bottom':'right',u=S(i)[l];d[c]-u<s[m]&&(e.offsets.popper[m]-=s[m]-(d[c]-u)),d[m]+u>s[c]&&(e.offsets.popper[m]+=d[m]+u-s[c]),e.offsets.popper=g(e.offsets.popper);var b=d[m]+d[l]/2-u/2,w=t(e.instance.popper),y=parseFloat(w['margin'+f],10),E=parseFloat(w['border'+f+'Width'],10),v=b-e.offsets.popper[m]-y-E;return v=ee(Q(s[l]-u,v),0),e.arrowElement=i,e.offsets.arrow=(n={},ae(n,m,$(v)),ae(n,h,''),n),e},element:'[x-arrow]'},flip:{order:600,enabled:!0,fn:function(e,t){if(W(e.instance.modifiers,'inner'))return e;if(e.flipped&&e.placement===e.originalPlacement)return e;var o=v(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement,e.positionFixed),n=e.placement.split('-')[0],i=T(n),r=e.placement.split('-')[1]||'',p=[];switch(t.behavior){case ce.FLIP:p=[n,i];break;case ce.CLOCKWISE:p=G(n);break;case ce.COUNTERCLOCKWISE:p=G(n,!0);break;default:p=t.behavior;}return p.forEach(function(s,d){if(n!==s||p.length===d+1)return e;n=e.placement.split('-')[0],i=T(n);var a=e.offsets.popper,l=e.offsets.reference,f=Z,m='left'===n&&f(a.right)>f(l.left)||'right'===n&&f(a.left)<f(l.right)||'top'===n&&f(a.bottom)>f(l.top)||'bottom'===n&&f(a.top)<f(l.bottom),h=f(a.left)<f(o.left),c=f(a.right)>f(o.right),g=f(a.top)<f(o.top),u=f(a.bottom)>f(o.bottom),b='left'===n&&h||'right'===n&&c||'top'===n&&g||'bottom'===n&&u,w=-1!==['top','bottom'].indexOf(n),y=!!t.flipVariations&&(w&&'start'===r&&h||w&&'end'===r&&c||!w&&'start'===r&&g||!w&&'end'===r&&u),E=!!t.flipVariationsByContent&&(w&&'start'===r&&c||w&&'end'===r&&h||!w&&'start'===r&&u||!w&&'end'===r&&g),v=y||E;(m||b||v)&&(e.flipped=!0,(m||b)&&(n=p[d+1]),v&&(r=z(r)),e.placement=n+(r?'-'+r:''),e.offsets.popper=le({},e.offsets.popper,C(e.instance.popper,e.offsets.reference,e.placement)),e=P(e.instance.modifiers,e,'flip'))}),e},behavior:'flip',padding:5,boundariesElement:'viewport',flipVariations:!1,flipVariationsByContent:!1},inner:{order:700,enabled:!1,fn:function(e){var t=e.placement,o=t.split('-')[0],n=e.offsets,i=n.popper,r=n.reference,p=-1!==['left','right'].indexOf(o),s=-1===['top','left'].indexOf(o);return i[p?'left':'top']=r[o]-(s?i[p?'width':'height']:0),e.placement=T(t),e.offsets.popper=g(i),e}},hide:{order:800,enabled:!0,fn:function(e){if(!K(e.instance.modifiers,'hide','preventOverflow'))return e;var t=e.offsets.reference,o=D(e.instance.modifiers,function(e){return'preventOverflow'===e.name}).boundaries;if(t.bottom<o.top||t.left>o.right||t.top>o.bottom||t.right<o.left){if(!0===e.hide)return e;e.hide=!0,e.attributes['x-out-of-boundaries']=''}else{if(!1===e.hide)return e;e.hide=!1,e.attributes['x-out-of-boundaries']=!1}return e}},computeStyle:{order:850,enabled:!0,fn:function(e,t){var o=t.x,n=t.y,i=e.offsets.popper,r=D(e.instance.modifiers,function(e){return'applyStyle'===e.name}).gpuAcceleration;void 0!==r&&console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');var s,d,a=void 0===r?t.gpuAcceleration:r,l=p(e.instance.popper),f=u(l),m={position:i.position},h=q(e,2>window.devicePixelRatio||!fe),c='bottom'===o?'top':'bottom',g='right'===n?'left':'right',b=B('transform');if(d='bottom'==c?'HTML'===l.nodeName?-l.clientHeight+h.bottom:-f.height+h.bottom:h.top,s='right'==g?'HTML'===l.nodeName?-l.clientWidth+h.right:-f.width+h.right:h.left,a&&b)m[b]='translate3d('+s+'px, '+d+'px, 0)',m[c]=0,m[g]=0,m.willChange='transform';else{var w='bottom'==c?-1:1,y='right'==g?-1:1;m[c]=d*w,m[g]=s*y,m.willChange=c+', '+g}var E={"x-placement":e.placement};return e.attributes=le({},E,e.attributes),e.styles=le({},m,e.styles),e.arrowStyles=le({},e.offsets.arrow,e.arrowStyles),e},gpuAcceleration:!0,x:'bottom',y:'right'},applyStyle:{order:900,enabled:!0,fn:function(e){return V(e.instance.popper,e.styles),j(e.instance.popper,e.attributes),e.arrowElement&&Object.keys(e.arrowStyles).length&&V(e.arrowElement,e.arrowStyles),e},onLoad:function(e,t,o,n,i){var r=L(i,t,e,o.positionFixed),p=O(o.placement,r,t,e,o.modifiers.flip.boundariesElement,o.modifiers.flip.padding);return t.setAttribute('x-placement',p),V(t,{position:o.positionFixed?'fixed':'absolute'}),o},gpuAcceleration:void 0}}},ge});
//# sourceMappingURL=popper.min.js.map



var tippy=function(t){"use strict";t=t&&t.hasOwnProperty("default")?t.default:t;function e(){return(e=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}var n={passive:!0},r="tippy-iOS",i="tippy-popper",o="tippy-tooltip",a="tippy-content",p="tippy-backdrop",u="tippy-arrow",s="tippy-svg-arrow",c="."+i,l="."+o,f="."+a,d="."+u,v="."+s;function m(t,e){t.innerHTML=e}function h(t){return!(!t||!t._tippy||t._tippy.reference!==t)}function g(t,e){return{}.hasOwnProperty.call(t,e)}function b(t){return A(t)?[t]:function(t){return E(t,"NodeList")}(t)?k(t):Array.isArray(t)?t:k(document.querySelectorAll(t))}function y(t,e,n){if(Array.isArray(t)){var r=t[e];return null==r?Array.isArray(n)?n[e]:n:r}return t}function w(t,e){return t&&t.modifiers&&t.modifiers[e]}function E(t,e){var n={}.toString.call(t);return 0===n.indexOf("[object")&&n.indexOf(e+"]")>-1}function A(t){return E(t,"Element")}function T(t){return E(t,"MouseEvent")}function C(t,e){return"function"==typeof t?t.apply(void 0,e):t}function x(t,e,n,r){t.filter(function(t){return t.name===e})[0][n]=r}function I(){return document.createElement("div")}function O(t,e){t.forEach(function(t){t&&(t.style.transitionDuration=e+"ms")})}function D(t,e){t.forEach(function(t){t&&t.setAttribute("data-state",e)})}function L(t,e){return 0===e?t:function(r){clearTimeout(n),n=setTimeout(function(){t(r)},e)};var n}function M(t,e,n){t&&t!==e&&t.apply(void 0,n)}function k(t){return[].slice.call(t)}function S(t,e){for(;t;){if(e(t))return t;t=t.parentElement}return null}function P(t,e){return t.indexOf(e)>-1}function V(t){return t.split(/\s+/).filter(Boolean)}function B(t,e){return void 0!==t?t:e}function H(t){return[].concat(t)}function U(t){var e=H(t)[0];return e&&e.ownerDocument||document}function N(t,e){-1===t.indexOf(e)&&t.push(e)}function R(t){return"number"==typeof t?t:parseFloat(t)}function z(t,e,n){void 0===e&&(e=5);var r={top:0,right:0,bottom:0,left:0};return Object.keys(r).reduce(function(r,i){return r[i]="number"==typeof e?e:e[i],t===i&&(r[i]="number"==typeof e?e+n:e[t]+n),r},r)}var q={isTouch:!1},F=0;function j(){q.isTouch||(q.isTouch=!0,window.performance&&document.addEventListener("mousemove",_))}function _(){var t=performance.now();t-F<20&&(q.isTouch=!1,document.removeEventListener("mousemove",_)),F=t}function W(){var t=document.activeElement;if(h(t)){var e=t._tippy;t.blur&&!e.state.isVisible&&t.blur()}}var X="undefined"!=typeof window&&"undefined"!=typeof document,Y=X?navigator.userAgent:"",J=/MSIE |Trident\//.test(Y),G=/UCBrowser\//.test(Y),K=X&&/iPhone|iPad|iPod/.test(navigator.platform);function Q(t){var e=t&&K&&q.isTouch;document.body.classList[e?"add":"remove"](r)}var Z={allowHTML:!0,animateFill:!1,animation:"fade",appendTo:function(){return document.body},aria:"describedby",arrow:!0,boundary:"scrollParent",content:"",delay:0,distance:10,duration:[300,250],flip:!0,flipBehavior:"flip",flipOnUpdate:!1,followCursor:!1,hideOnClick:!0,ignoreAttributes:!1,inlinePositioning:!1,inertia:!1,interactive:!1,interactiveBorder:2,interactiveDebounce:0,lazy:!0,maxWidth:350,multiple:!1,offset:0,onAfterUpdate:function(){},onBeforeUpdate:function(){},onCreate:function(){},onDestroy:function(){},onHidden:function(){},onHide:function(){},onMount:function(){},onShow:function(){},onShown:function(){},onTrigger:function(){},onUntrigger:function(){},placement:"top",plugins:[],popperOptions:{},role:"tooltip",showOnCreate:!1,sticky:!1,theme:"",touch:!0,trigger:"mouseenter focus",triggerTarget:null,updateDuration:0,zIndex:9999},$=Object.keys(Z),tt=["arrow","boundary","distance","flip","flipBehavior","flipOnUpdate","offset","placement","popperOptions"];function et(t){return e({},t,{},t.plugins.reduce(function(e,n){var r=n.name,i=n.defaultValue;return r&&(e[r]=void 0!==t[r]?t[r]:i),e},{}))}function nt(t,n){var r=e({},n,{content:C(n.content,[t])},n.ignoreAttributes?{}:function(t,n){return(n?Object.keys(et(e({},Z,{plugins:n}))):$).reduce(function(e,n){var r=(t.getAttribute("data-tippy-"+n)||"").trim();if(!r)return e;if("content"===n)e[n]=r;else try{e[n]=JSON.parse(r)}catch(t){e[n]=r}return e},{})}(t,n.plugins));return r.interactive&&(r.aria=null),r}function rt(t){return t.split("-")[0]}function it(t){t.setAttribute("data-inertia","")}function ot(t){t.setAttribute("data-interactive","")}function at(t,e){if(A(e.content))m(t,""),t.appendChild(e.content);else if("function"!=typeof e.content){t[e.allowHTML?"innerHTML":"textContent"]=e.content}}function pt(t){return{tooltip:t.querySelector(l),content:t.querySelector(f),arrow:t.querySelector(d)||t.querySelector(v)}}function ut(t){var e=I();return!0===t?e.className=u:(e.className=s,A(t)?e.appendChild(t):m(e,t)),e}function st(t,e){var n=I();n.className=i,n.style.position="absolute",n.style.top="0",n.style.left="0";var r=I();r.className=o,r.id="tippy-"+t,r.setAttribute("data-state","hidden"),r.setAttribute("tabindex","-1"),ft(r,"add",e.theme);var p=I();return p.className=a,p.setAttribute("data-state","hidden"),e.interactive&&ot(r),e.arrow&&(r.setAttribute("data-arrow",""),r.appendChild(ut(e.arrow))),e.inertia&&it(r),at(p,e),r.appendChild(p),n.appendChild(r),ct(n,e,e),n}function ct(t,e,n){var r,i=pt(t),o=i.tooltip,a=i.content,p=i.arrow;t.style.zIndex=""+n.zIndex,o.setAttribute("data-animation",n.animation),o.style.maxWidth="number"==typeof(r=n.maxWidth)?r+"px":r,n.role?o.setAttribute("role",n.role):o.removeAttribute("role"),e.content!==n.content&&at(a,n),!e.arrow&&n.arrow?(o.appendChild(ut(n.arrow)),o.setAttribute("data-arrow","")):e.arrow&&!n.arrow?(o.removeChild(p),o.removeAttribute("data-arrow")):e.arrow!==n.arrow&&(o.removeChild(p),o.appendChild(ut(n.arrow))),!e.interactive&&n.interactive?ot(o):e.interactive&&!n.interactive&&function(t){t.removeAttribute("data-interactive")}(o),!e.inertia&&n.inertia?it(o):e.inertia&&!n.inertia&&function(t){t.removeAttribute("data-inertia")}(o),e.theme!==n.theme&&(ft(o,"remove",e.theme),ft(o,"add",n.theme))}function lt(t,e,n){var r=G&&void 0!==document.body.style.webkitTransition?"webkitTransitionEnd":"transitionend";t[e+"EventListener"](r,n)}function ft(t,e,n){V(n).forEach(function(n){t.classList[e](n+"-theme")})}var dt=1,vt=[],mt=[];function ht(r,i){var o,a,p,u=et(nt(r,i));if(!u.multiple&&r._tippy)return null;var s,l,f,d,v,m=!1,h=!1,b=0,E=[],A=L(Ot,u.interactiveDebounce),I=U(u.triggerTarget||r),F=dt++,j=st(F,u),_=pt(j),W=(v=u.plugins).filter(function(t,e){return v.indexOf(t)===e}),X=_.tooltip,Y=_.content,G=[X,Y],K={id:F,reference:r,popper:j,popperChildren:_,popperInstance:null,props:u,state:{currentPlacement:null,isEnabled:!0,isVisible:!1,isDestroyed:!1,isMounted:!1,isShown:!1},plugins:W,clearDelayTimeouts:function(){clearTimeout(o),clearTimeout(a),cancelAnimationFrame(p)},setProps:function(t){if(K.state.isDestroyed)return;ft("onBeforeUpdate",[K,t]),xt();var n=K.props,i=nt(r,e({},K.props,{},t,{ignoreAttributes:!0}));i.ignoreAttributes=B(t.ignoreAttributes,n.ignoreAttributes),K.props=i,Ct(),n.interactiveDebounce!==i.interactiveDebounce&&(bt(),A=L(Ot,i.interactiveDebounce));ct(j,n,i),K.popperChildren=pt(j),n.triggerTarget&&!i.triggerTarget?H(n.triggerTarget).forEach(function(t){t.removeAttribute("aria-expanded")}):i.triggerTarget&&r.removeAttribute("aria-expanded");gt(),K.popperInstance&&(tt.some(function(e){return g(t,e)&&t[e]!==n[e]})?(K.popperInstance.destroy(),kt(),K.state.isVisible&&K.popperInstance.enableEventListeners()):K.popperInstance.update());ft("onAfterUpdate",[K,t])},setContent:function(t){K.setProps({content:t})},show:function(t){void 0===t&&(t=y(K.props.duration,0,Z.duration));var e=K.state.isVisible,n=K.state.isDestroyed,r=!K.state.isEnabled,i=q.isTouch&&!K.props.touch;if(e||n||r||i)return;if(at().hasAttribute("disabled"))return;K.popperInstance||kt();if(ft("onShow",[K],!1),!1===K.props.onShow(K))return;wt(),j.style.visibility="visible",K.state.isVisible=!0,K.state.isMounted||O(G.concat(j),0);l=function(){K.state.isVisible&&(O([j],K.props.updateDuration),O(G,t),D(G,"visible"),ht(),gt(),N(mt,K),Q(!0),K.state.isMounted=!0,ft("onMount",[K]),function(t,e){At(t,e)}(t,function(){K.state.isShown=!0,ft("onShown",[K])}))},function(){b=0;var t,e=K.props.appendTo,n=at();t=K.props.interactive&&e===Z.appendTo||"parent"===e?n.parentNode:C(e,[n]);t.contains(j)||t.appendChild(j);x(K.popperInstance.modifiers,"flip","enabled",K.props.flip),K.popperInstance.enableEventListeners(),K.popperInstance.update()}()},hide:function(t){void 0===t&&(t=y(K.props.duration,1,Z.duration));var e=!K.state.isVisible&&!m,n=K.state.isDestroyed,r=!K.state.isEnabled&&!m;if(e||n||r)return;if(ft("onHide",[K],!1),!1===K.props.onHide(K)&&!m)return;Et(),j.style.visibility="hidden",K.state.isVisible=!1,K.state.isShown=!1,O(G,t),D(G,"hidden"),ht(),gt(),function(t,e){At(t,function(){!K.state.isVisible&&j.parentNode&&j.parentNode.contains(j)&&e()})}(t,function(){K.popperInstance.disableEventListeners(),K.popperInstance.options.placement=K.props.placement,j.parentNode.removeChild(j),0===(mt=mt.filter(function(t){return t!==K})).length&&Q(!1),K.state.isMounted=!1,ft("onHidden",[K])})},enable:function(){K.state.isEnabled=!0},disable:function(){K.hide(),K.state.isEnabled=!1},destroy:function(){if(K.state.isDestroyed)return;m=!0,K.clearDelayTimeouts(),K.hide(0),xt(),delete r._tippy,K.popperInstance&&K.popperInstance.destroy();m=!1,K.state.isDestroyed=!0,ft("onDestroy",[K])}};r._tippy=K,j._tippy=K;var $=W.map(function(t){return t.fn(K)});return Ct(),gt(),u.lazy||kt(),ft("onCreate",[K]),u.showOnCreate&&Pt(),j.addEventListener("mouseenter",function(){K.props.interactive&&K.state.isVisible&&K.clearDelayTimeouts()}),j.addEventListener("mouseleave",function(){K.props.interactive&&P(K.props.trigger,"mouseenter")&&I.addEventListener("mousemove",A)}),K;function it(){var t=K.props.touch;return Array.isArray(t)?t:[t,0]}function ot(){return"hold"===it()[0]}function at(){return d||r}function ut(t){return K.state.isMounted&&!K.state.isVisible||q.isTouch||!s||"focus"===s.type?0:y(K.props.delay,t?0:1,Z.delay)}function ft(t,e,n){var r;(void 0===n&&(n=!0),$.forEach(function(n){g(n,t)&&n[t].apply(n,e)}),n)&&(r=K.props)[t].apply(r,e)}function ht(){var t=K.props.aria;if(t){var e="aria-"+t,n=X.id;H(K.props.triggerTarget||r).forEach(function(t){var r=t.getAttribute(e);if(K.state.isVisible)t.setAttribute(e,r?r+" "+n:n);else{var i=r&&r.replace(n,"").trim();i?t.setAttribute(e,i):t.removeAttribute(e)}})}}function gt(){H(K.props.triggerTarget||r).forEach(function(t){K.props.interactive?t.setAttribute("aria-expanded",K.state.isVisible&&t===at()?"true":"false"):t.removeAttribute("aria-expanded")})}function bt(){I.body.removeEventListener("mouseleave",Vt),I.removeEventListener("mousemove",A),vt=vt.filter(function(t){return t!==A})}function yt(t){if(!K.props.interactive||!j.contains(t.target)){if(at().contains(t.target)){if(q.isTouch)return;if(K.state.isVisible&&P(K.props.trigger,"click"))return}!0===K.props.hideOnClick&&(K.clearDelayTimeouts(),K.hide(),h=!0,setTimeout(function(){h=!1}),K.state.isMounted||Et())}}function wt(){I.addEventListener("mousedown",yt,!0)}function Et(){I.removeEventListener("mousedown",yt,!0)}function At(t,e){function n(t){t.target===X&&(lt(X,"remove",n),e())}if(0===t)return e();lt(X,"remove",f),lt(X,"add",n),f=n}function Tt(t,e,n){void 0===n&&(n=!1),H(K.props.triggerTarget||r).forEach(function(r){r.addEventListener(t,e,n),E.push({node:r,eventType:t,handler:e,options:n})})}function Ct(){ot()&&(Tt("touchstart",It,n),Tt("touchend",Dt,n)),V(K.props.trigger).forEach(function(t){if("manual"!==t)switch(Tt(t,It),t){case"mouseenter":Tt("mouseleave",Dt);break;case"focus":Tt(J?"focusout":"blur",Lt)}})}function xt(){E.forEach(function(t){var e=t.node,n=t.eventType,r=t.handler,i=t.options;e.removeEventListener(n,r,i)}),E=[]}function It(t){if(K.state.isEnabled&&!Mt(t)&&!h)if(s=t,d=t.currentTarget,gt(),!K.state.isVisible&&T(t)&&vt.forEach(function(e){return e(t)}),"click"===t.type&&!1!==K.props.hideOnClick&&K.state.isVisible)Vt(t);else{var e=it(),n=e[0],r=e[1];q.isTouch&&"hold"===n&&r?o=setTimeout(function(){Pt(t)},r):Pt(t)}}function Ot(t){S(t.target,function(t){return t===r||t===j})||function(t,e){var n=e.clientX,r=e.clientY;return t.every(function(t){var e=t.popperRect,i=t.tooltipRect,o=t.interactiveBorder,a=Math.min(e.top,i.top),p=Math.max(e.right,i.right),u=Math.max(e.bottom,i.bottom),s=Math.min(e.left,i.left);return a-r>o||r-u>o||s-n>o||n-p>o})}(k(j.querySelectorAll(c)).concat(j).map(function(t){var e=t._tippy,n=e.popperChildren.tooltip,r=e.props.interactiveBorder;return{popperRect:t.getBoundingClientRect(),tooltipRect:n.getBoundingClientRect(),interactiveBorder:r}}),t)&&(bt(),Vt(t))}function Dt(t){if(!Mt(t))return K.props.interactive?(I.body.addEventListener("mouseleave",Vt),I.addEventListener("mousemove",A),void N(vt,A)):void Vt(t)}function Lt(t){t.target===at()&&(K.props.interactive&&t.relatedTarget&&j.contains(t.relatedTarget)||Vt(t))}function Mt(t){var e="ontouchstart"in window,n=P(t.type,"touch"),r=ot();return e&&q.isTouch&&r&&!n||q.isTouch&&!r&&n}function kt(){var n,i=K.props.popperOptions,o=K.popperChildren.arrow,a=w(i,"flip"),p=w(i,"preventOverflow");function u(t){var e=K.state.currentPlacement;K.state.currentPlacement=t.placement,K.props.flip&&!K.props.flipOnUpdate&&(t.flipped&&(K.popperInstance.options.placement=t.placement),x(K.popperInstance.modifiers,"flip","enabled",!1)),X.setAttribute("data-placement",t.placement),!1!==t.attributes["x-out-of-boundaries"]?X.setAttribute("data-out-of-boundaries",""):X.removeAttribute("data-out-of-boundaries");var r=rt(t.placement),i=P(["top","bottom"],r),o=P(["bottom","right"],r);X.style.top="0",X.style.left="0",X.style[i?"top":"left"]=(o?1:-1)*n+"px",e&&e!==t.placement&&K.popperInstance.update()}var s=e({eventsEnabled:!1,placement:K.props.placement},i,{modifiers:e({},i&&i.modifiers,{tippyDistance:{enabled:!0,order:0,fn:function(t){n=function(t,e){var n="string"==typeof e&&P(e,"rem"),r=t.documentElement;return r&&n?parseFloat(getComputedStyle(r).fontSize||String(16))*R(e):R(e)}(I,K.props.distance);var e=rt(t.placement),r=z(e,p&&p.padding,n),i=z(e,a&&a.padding,n),o=K.popperInstance.modifiers;return x(o,"preventOverflow","padding",r),x(o,"flip","padding",i),t}},preventOverflow:e({boundariesElement:K.props.boundary},p),flip:e({enabled:K.props.flip,behavior:K.props.flipBehavior},a),arrow:e({element:o,enabled:!!o},w(i,"arrow")),offset:e({offset:K.props.offset},w(i,"offset"))}),onCreate:function(t){u(t),M(i&&i.onCreate,s.onCreate,[t]),St()},onUpdate:function(t){u(t),M(i&&i.onUpdate,s.onUpdate,[t]),St()}});K.popperInstance=new t(r,j,s)}function St(){0===b?(b++,K.popperInstance.update()):l&&1===b&&(b++,j.offsetHeight,l())}function Pt(t){K.clearDelayTimeouts(),K.popperInstance||kt(),t&&ft("onTrigger",[K,t]),wt();var e=ut(!0);e?o=setTimeout(function(){K.show()},e):K.show()}function Vt(t){if(K.clearDelayTimeouts(),ft("onUntrigger",[K,t]),K.state.isVisible){var e=ut(!1);e?a=setTimeout(function(){K.state.isVisible&&K.hide()},e):p=requestAnimationFrame(function(){K.hide()})}else Et()}}function gt(t,r,i){void 0===r&&(r={}),void 0===i&&(i=[]),i=Z.plugins.concat(r.plugins||i),document.addEventListener("touchstart",j,e({},n,{capture:!0})),window.addEventListener("blur",W);var o=e({},Z,{},r,{plugins:i}),a=b(t).reduce(function(t,e){var n=e&&ht(e,o);return n&&t.push(n),t},[]);return A(t)?a[0]:a}gt.version="5.1.1",gt.defaultProps=Z,gt.setDefaultProps=function(t){Object.keys(t).forEach(function(e){Z[e]=t[e]})},gt.currentInput=q;var bt={mouseover:"mouseenter",focusin:"focus",click:"click"};var yt={name:"animateFill",defaultValue:!1,fn:function(t){var e=t.popperChildren,n=e.tooltip,r=e.content,i=t.props.animateFill&&!G?function(){var t=I();return t.className=p,D([t],"hidden"),t}():null;function o(){t.popperChildren.backdrop=i}return{onCreate:function(){i&&(o(),n.insertBefore(i,n.firstElementChild),n.setAttribute("data-animatefill",""),n.style.overflow="hidden",t.setProps({animation:"shift-away",arrow:!1}))},onMount:function(){if(i){var t=n.style.transitionDuration,e=Number(t.replace("ms",""));r.style.transitionDelay=Math.round(e/10)+"ms",i.style.transitionDuration=t,D([i],"visible")}},onShow:function(){i&&(i.style.transitionDuration="0ms")},onHide:function(){i&&D([i],"hidden")},onAfterUpdate:function(){o()}}}};var wt={name:"followCursor",defaultValue:!1,fn:function(t){var e,n=t.reference,r=t.popper,i=U(t.props.triggerTarget||n),o=null,a=!1,p=t.props;function u(){return"manual"===t.props.trigger.trim()}function s(){var e=!!u()||null!==o&&!(0===o.clientX&&0===o.clientY);return t.props.followCursor&&e}function c(){return q.isTouch||"initial"===t.props.followCursor&&t.state.isVisible}function l(){t.popperInstance&&(t.popperInstance.reference=n)}function f(){if(s()||t.props.placement!==p.placement){var e=p.placement,n=e.split("-")[1];a=!0,t.setProps({placement:s()&&n?e.replace(n,"start"===n?"end":"start"):e}),a=!1}}function d(){t.popperInstance&&s()&&(c()||!0!==t.props.followCursor)&&t.popperInstance.disableEventListeners()}function v(){s()?i.addEventListener("mousemove",g):l()}function m(){s()&&g(e)}function h(){i.removeEventListener("mousemove",g)}function g(i){var o=e=i,a=o.clientX,p=o.clientY;if(t.popperInstance&&t.state.currentPlacement){var u=S(i.target,function(t){return t===n}),s=n.getBoundingClientRect(),l=t.props.followCursor,f="horizontal"===l,d="vertical"===l,v=P(["top","bottom"],rt(t.state.currentPlacement)),m=function(t,e){var n=e?t.offsetWidth:t.offsetHeight;return{size:n,x:e?n:0,y:e?0:n}}(r,v),g=m.size,b=m.x,y=m.y;!u&&t.props.interactive||(t.popperInstance.reference={referenceNode:n,clientWidth:0,clientHeight:0,getBoundingClientRect:function(){return{width:v?g:0,height:v?0:g,top:(f?s.top:p)-y,bottom:(f?s.bottom:p)+y,left:(d?s.left:a)-b,right:(d?s.right:a)+b}}},t.popperInstance.update()),c()&&h()}}return{onAfterUpdate:function(t,e){var n;a||(n=e,Object.keys(n).forEach(function(t){p[t]=B(n[t],p[t])}),e.placement&&f()),e.placement&&d(),requestAnimationFrame(m)},onMount:function(){m(),d()},onShow:function(){u()&&(e=o={clientX:0,clientY:0},f(),v())},onTrigger:function(t,n){o||(T(n)&&(o={clientX:n.clientX,clientY:n.clientY},e=n),f(),v())},onUntrigger:function(){t.state.isVisible||(h(),o=null)},onHidden:function(){h(),l(),o=null}}}};var Et={name:"inlinePositioning",defaultValue:!1,fn:function(t){var e=t.reference;function n(){return t.props.inlinePositioning}return{onHidden:function(){n()&&(t.popperInstance.reference=e)},onShow:function(){n()&&(t.popperInstance.reference={referenceNode:e,clientWidth:0,clientHeight:0,getBoundingClientRect:function(){return function(t,e,n){if(n.length<2||null===t)return e;var r;switch(t){case"top":case"bottom":var i=n[0],o=n[n.length-1],a="top"===t,p=i.top,u=o.bottom,s=a?i.left:o.left,c=a?i.right:o.right;r={top:p,bottom:u,left:s,right:c,width:c-s,height:u-p};break;case"left":case"right":var l=Math.min.apply(Math,n.map(function(t){return t.left})),f=Math.max.apply(Math,n.map(function(t){return t.right})),d=n.filter(function(e){return"left"===t?e.left===l:e.right===f}),v=d[0].top,m=d[d.length-1].bottom;r={top:v,bottom:m,left:l,right:f,width:f-l,height:m-v};break;default:r=e}return r}(t.state.currentPlacement&&rt(t.state.currentPlacement),e.getBoundingClientRect(),k(e.getClientRects()))}})}}}};var At={name:"sticky",defaultValue:!1,fn:function(t){var e=t.reference,n=t.popper;function r(e){return!0===t.props.sticky||t.props.sticky===e}var i=null,o=null;function a(){var p=r("reference")?e.getBoundingClientRect():null,u=r("popper")?n.getBoundingClientRect():null;(p&&Tt(i,p)||u&&Tt(o,u))&&t.popperInstance.update(),i=p,o=u,t.state.isMounted&&requestAnimationFrame(a)}return{onMount:function(){t.props.sticky&&a()}}}};function Tt(t,e){return!t||!e||(t.top!==e.top||t.right!==e.right||t.bottom!==e.bottom||t.left!==e.left)}return X&&function(t){var e=document.createElement("style");e.textContent=t,e.setAttribute("data-tippy-stylesheet","");var n=document.head,r=document.querySelector("head>style,head>link");r?n.insertBefore(e,r):n.appendChild(e)}(".tippy-tooltip[data-animation=fade][data-state=hidden]{opacity:0}.tippy-iOS{cursor:pointer!important;-webkit-tap-highlight-color:transparent}.tippy-popper{pointer-events:none;max-width:calc(100vw - 10px);transition-timing-function:cubic-bezier(.165,.84,.44,1);transition-property:transform}.tippy-tooltip{position:relative;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;background-color:#333;transition-property:visibility,opacity,transform;outline:0}.tippy-tooltip[data-placement^=top]>.tippy-arrow{border-width:8px 8px 0;border-top-color:#333;margin:0 3px;transform-origin:50% 0;bottom:-7px}.tippy-tooltip[data-placement^=bottom]>.tippy-arrow{border-width:0 8px 8px;border-bottom-color:#333;margin:0 3px;transform-origin:50% 7px;top:-7px}.tippy-tooltip[data-placement^=left]>.tippy-arrow{border-width:8px 0 8px 8px;border-left-color:#333;margin:3px 0;transform-origin:0 50%;right:-7px}.tippy-tooltip[data-placement^=right]>.tippy-arrow{border-width:8px 8px 8px 0;border-right-color:#333;margin:3px 0;transform-origin:7px 50%;left:-7px}.tippy-tooltip[data-interactive][data-state=visible]{pointer-events:auto}.tippy-tooltip[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{position:absolute;border-color:transparent;border-style:solid}.tippy-content{padding:5px 9px}"),gt.setDefaultProps({plugins:[yt,wt,Et,At]}),gt.createSingleton=function(t,n,r){void 0===n&&(n={}),void 0===r&&(r=[]),r=n.plugins||r,t.forEach(function(t){t.disable()});var i,o,a=e({},Z,{},n).aria,p=!1,u=t.map(function(t){return t.reference}),s={fn:function(e){function n(t){if(i){var n="aria-"+i;t&&!e.props.interactive?o.setAttribute(n,e.popperChildren.tooltip.id):o.removeAttribute(n)}}return{onAfterUpdate:function(t,n){var r=n.aria;void 0!==r&&r!==a&&(p?(p=!0,e.setProps({aria:null}),p=!1):a=r)},onDestroy:function(){t.forEach(function(t){t.enable()})},onMount:function(){n(!0)},onUntrigger:function(){n(!1)},onTrigger:function(r,p){var s=p.currentTarget,c=u.indexOf(s);o=s,i=a,e.state.isVisible&&n(!0),e.popperInstance.reference={referenceNode:s,clientHeight:0,clientWidth:0,getBoundingClientRect:function(){return s.getBoundingClientRect()}},e.setContent(t[c].props.content)}}}};return gt(I(),e({},n,{plugins:[s].concat(r),aria:null,triggerTarget:u}))},gt.delegate=function(t,n,r){void 0===r&&(r=[]),r=n.plugins||r;var i,o,a=[],p=[],u=n.target,s=(i=["target"],o=e({},n),i.forEach(function(t){delete o[t]}),o),c=e({},s,{plugins:r,trigger:"manual"}),l=e({},s,{plugins:r,showOnCreate:!0}),f=gt(t,c);function d(t){if(t.target){var e=t.target.closest(u);if(e)if(P(e.getAttribute("data-tippy-trigger")||n.trigger||Z.trigger,bt[t.type])){var r=gt(e,l);r&&(p=p.concat(r))}}}function v(t,e,n,r){void 0===r&&(r=!1),t.addEventListener(e,n,r),a.push({node:t,eventType:e,handler:n,options:r})}return H(f).forEach(function(t){var e=t.destroy;t.destroy=function(t){void 0===t&&(t=!0),t&&p.forEach(function(t){t.destroy()}),p=[],a.forEach(function(t){var e=t.node,n=t.eventType,r=t.handler,i=t.options;e.removeEventListener(n,r,i)}),a=[],e()},function(t){var e=t.reference;v(e,"mouseover",d),v(e,"focusin",d),v(e,"click",d)}(t)}),f},gt.hideAll=function(t){var e=void 0===t?{}:t,n=e.exclude,r=e.duration;mt.forEach(function(t){var e=!1;n&&(e=h(n)?t.reference===n:t.popper===n.popper),e||t.hide(r)})},gt.roundArrow='<svg viewBox="0 0 18 7" xmlns="http://www.w3.org/2000/svg"><path d="M0 7s2.021-.015 5.253-4.218C6.584 1.051 7.797.007 9 0c1.203-.007 2.416 1.035 3.761 2.782C16.012 7.005 18 7 18 7H0z"/></svg>',gt}(Popper);
//# sourceMappingURL=tippy-bundle.iife.min.js.map




!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.feather=n():e.feather=n()}("undefined"!=typeof self?self:this,function(){return function(e){var n={};function i(t){if(n[t])return n[t].exports;var l=n[t]={i:t,l:!1,exports:{}};return e[t].call(l.exports,l,l.exports,i),l.l=!0,l.exports}return i.m=e,i.c=n,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:t})},i.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},i.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="",i(i.s=80)}([function(e,n,i){(function(n){var i="object",t=function(e){return e&&e.Math==Math&&e};e.exports=t(typeof globalThis==i&&globalThis)||t(typeof window==i&&window)||t(typeof self==i&&self)||t(typeof n==i&&n)||Function("return this")()}).call(this,i(75))},function(e,n){var i={}.hasOwnProperty;e.exports=function(e,n){return i.call(e,n)}},function(e,n,i){var t=i(0),l=i(11),r=i(33),o=i(62),a=t.Symbol,c=l("wks");e.exports=function(e){return c[e]||(c[e]=o&&a[e]||(o?a:r)("Symbol."+e))}},function(e,n,i){var t=i(6);e.exports=function(e){if(!t(e))throw TypeError(String(e)+" is not an object");return e}},function(e,n){e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,n,i){var t=i(8),l=i(7),r=i(10);e.exports=t?function(e,n,i){return l.f(e,n,r(1,i))}:function(e,n,i){return e[n]=i,e}},function(e,n){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,n,i){var t=i(8),l=i(35),r=i(3),o=i(18),a=Object.defineProperty;n.f=t?a:function(e,n,i){if(r(e),n=o(n,!0),r(i),l)try{return a(e,n,i)}catch(e){}if("get"in i||"set"in i)throw TypeError("Accessors not supported");return"value"in i&&(e[n]=i.value),e}},function(e,n,i){var t=i(4);e.exports=!t(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,n){e.exports={}},function(e,n){e.exports=function(e,n){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:n}}},function(e,n,i){var t=i(0),l=i(19),r=i(17),o=t["__core-js_shared__"]||l("__core-js_shared__",{});(e.exports=function(e,n){return o[e]||(o[e]=void 0!==n?n:{})})("versions",[]).push({version:"3.1.3",mode:r?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(e,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=o(i(43)),l=o(i(41)),r=o(i(40));function o(e){return e&&e.__esModule?e:{default:e}}n.default=Object.keys(l.default).map(function(e){return new t.default(e,l.default[e],r.default[e])}).reduce(function(e,n){return e[n.name]=n,e},{})},function(e,n){e.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},function(e,n,i){var t=i(72),l=i(20);e.exports=function(e){return t(l(e))}},function(e,n){e.exports={}},function(e,n,i){var t=i(11),l=i(33),r=t("keys");e.exports=function(e){return r[e]||(r[e]=l(e))}},function(e,n){e.exports=!1},function(e,n,i){var t=i(6);e.exports=function(e,n){if(!t(e))return e;var i,l;if(n&&"function"==typeof(i=e.toString)&&!t(l=i.call(e)))return l;if("function"==typeof(i=e.valueOf)&&!t(l=i.call(e)))return l;if(!n&&"function"==typeof(i=e.toString)&&!t(l=i.call(e)))return l;throw TypeError("Can't convert object to primitive value")}},function(e,n,i){var t=i(0),l=i(5);e.exports=function(e,n){try{l(t,e,n)}catch(i){t[e]=n}return n}},function(e,n){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on "+e);return e}},function(e,n){var i=Math.ceil,t=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?t:i)(e)}},function(e,n,i){var t;
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
!function(){"use strict";var i=function(){function e(){}function n(e,n){for(var i=n.length,t=0;t<i;++t)l(e,n[t])}e.prototype=Object.create(null);var i={}.hasOwnProperty;var t=/\s+/;function l(e,l){if(l){var r=typeof l;"string"===r?function(e,n){for(var i=n.split(t),l=i.length,r=0;r<l;++r)e[i[r]]=!0}(e,l):Array.isArray(l)?n(e,l):"object"===r?function(e,n){for(var t in n)i.call(n,t)&&(e[t]=!!n[t])}(e,l):"number"===r&&function(e,n){e[n]=!0}(e,l)}}return function(){for(var i=arguments.length,t=Array(i),l=0;l<i;l++)t[l]=arguments[l];var r=new e;n(r,t);var o=[];for(var a in r)r[a]&&o.push(a);return o.join(" ")}}();void 0!==e&&e.exports?e.exports=i:void 0===(t=function(){return i}.apply(n,[]))||(e.exports=t)}()},function(e,n,i){var t=i(7).f,l=i(1),r=i(2)("toStringTag");e.exports=function(e,n,i){e&&!l(e=i?e:e.prototype,r)&&t(e,r,{configurable:!0,value:n})}},function(e,n,i){var t=i(20);e.exports=function(e){return Object(t(e))}},function(e,n,i){var t=i(1),l=i(24),r=i(16),o=i(63),a=r("IE_PROTO"),c=Object.prototype;e.exports=o?Object.getPrototypeOf:function(e){return e=l(e),t(e,a)?e[a]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?c:null}},function(e,n,i){"use strict";var t,l,r,o=i(25),a=i(5),c=i(1),p=i(2),y=i(17),h=p("iterator"),x=!1;[].keys&&("next"in(r=[].keys())?(l=o(o(r)))!==Object.prototype&&(t=l):x=!0),void 0==t&&(t={}),y||c(t,h)||a(t,h,function(){return this}),e.exports={IteratorPrototype:t,BUGGY_SAFARI_ITERATORS:x}},function(e,n,i){var t=i(21),l=Math.min;e.exports=function(e){return e>0?l(t(e),9007199254740991):0}},function(e,n,i){var t=i(1),l=i(14),r=i(68),o=i(15),a=r(!1);e.exports=function(e,n){var i,r=l(e),c=0,p=[];for(i in r)!t(o,i)&&t(r,i)&&p.push(i);for(;n.length>c;)t(r,i=n[c++])&&(~a(p,i)||p.push(i));return p}},function(e,n,i){var t=i(0),l=i(11),r=i(5),o=i(1),a=i(19),c=i(36),p=i(37),y=p.get,h=p.enforce,x=String(c).split("toString");l("inspectSource",function(e){return c.call(e)}),(e.exports=function(e,n,i,l){var c=!!l&&!!l.unsafe,p=!!l&&!!l.enumerable,y=!!l&&!!l.noTargetGet;"function"==typeof i&&("string"!=typeof n||o(i,"name")||r(i,"name",n),h(i).source=x.join("string"==typeof n?n:"")),e!==t?(c?!y&&e[n]&&(p=!0):delete e[n],p?e[n]=i:r(e,n,i)):p?e[n]=i:a(n,i)})(Function.prototype,"toString",function(){return"function"==typeof this&&y(this).source||c.call(this)})},function(e,n){var i={}.toString;e.exports=function(e){return i.call(e).slice(8,-1)}},function(e,n,i){var t=i(8),l=i(73),r=i(10),o=i(14),a=i(18),c=i(1),p=i(35),y=Object.getOwnPropertyDescriptor;n.f=t?y:function(e,n){if(e=o(e),n=a(n,!0),p)try{return y(e,n)}catch(e){}if(c(e,n))return r(!l.f.call(e,n),e[n])}},function(e,n,i){var t=i(0),l=i(31).f,r=i(5),o=i(29),a=i(19),c=i(71),p=i(65);e.exports=function(e,n){var i,y,h,x,s,u=e.target,d=e.global,f=e.stat;if(i=d?t:f?t[u]||a(u,{}):(t[u]||{}).prototype)for(y in n){if(x=n[y],h=e.noTargetGet?(s=l(i,y))&&s.value:i[y],!p(d?y:u+(f?".":"#")+y,e.forced)&&void 0!==h){if(typeof x==typeof h)continue;c(x,h)}(e.sham||h&&h.sham)&&r(x,"sham",!0),o(i,y,x,e)}}},function(e,n){var i=0,t=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++i+t).toString(36))}},function(e,n,i){var t=i(0),l=i(6),r=t.document,o=l(r)&&l(r.createElement);e.exports=function(e){return o?r.createElement(e):{}}},function(e,n,i){var t=i(8),l=i(4),r=i(34);e.exports=!t&&!l(function(){return 7!=Object.defineProperty(r("div"),"a",{get:function(){return 7}}).a})},function(e,n,i){var t=i(11);e.exports=t("native-function-to-string",Function.toString)},function(e,n,i){var t,l,r,o=i(76),a=i(0),c=i(6),p=i(5),y=i(1),h=i(16),x=i(15),s=a.WeakMap;if(o){var u=new s,d=u.get,f=u.has,v=u.set;t=function(e,n){return v.call(u,e,n),n},l=function(e){return d.call(u,e)||{}},r=function(e){return f.call(u,e)}}else{var g=h("state");x[g]=!0,t=function(e,n){return p(e,g,n),n},l=function(e){return y(e,g)?e[g]:{}},r=function(e){return y(e,g)}}e.exports={set:t,get:l,has:r,enforce:function(e){return r(e)?l(e):t(e,{})},getterFor:function(e){return function(n){var i;if(!c(n)||(i=l(n)).type!==e)throw TypeError("Incompatible receiver, "+e+" required");return i}}}},function(e,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var i=arguments[n];for(var t in i)Object.prototype.hasOwnProperty.call(i,t)&&(e[t]=i[t])}return e},l=o(i(22)),r=o(i(12));function o(e){return e&&e.__esModule?e:{default:e}}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if("undefined"==typeof document)throw new Error("`feather.replace()` only works in a browser environment.");var n=document.querySelectorAll("[data-feather]");Array.from(n).forEach(function(n){return function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=function(e){return Array.from(e.attributes).reduce(function(e,n){return e[n.name]=n.value,e},{})}(e),o=i["data-feather"];delete i["data-feather"];var a=r.default[o].toSvg(t({},n,i,{class:(0,l.default)(n.class,i.class)})),c=(new DOMParser).parseFromString(a,"image/svg+xml").querySelector("svg");e.parentNode.replaceChild(c,e)}(n,e)})}},function(e,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t,l=i(12),r=(t=l)&&t.__esModule?t:{default:t};n.default=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(console.warn("feather.toSvg() is deprecated. Please use feather.icons[name].toSvg() instead."),!e)throw new Error("The required `key` (icon name) parameter is missing.");if(!r.default[e])throw new Error("No icon matching '"+e+"'. See the complete list of icons at https://feathericons.com");return r.default[e].toSvg(n)}},function(e){e.exports={activity:["pulse","health","action","motion"],airplay:["stream","cast","mirroring"],"alert-circle":["warning","alert","danger"],"alert-octagon":["warning","alert","danger"],"alert-triangle":["warning","alert","danger"],"at-sign":["mention","at","email","message"],award:["achievement","badge"],aperture:["camera","photo"],bell:["alarm","notification","sound"],"bell-off":["alarm","notification","silent"],bluetooth:["wireless"],"book-open":["read","library"],book:["read","dictionary","booklet","magazine","library"],bookmark:["read","clip","marker","tag"],briefcase:["work","bag","baggage","folder"],clipboard:["copy"],clock:["time","watch","alarm"],"cloud-drizzle":["weather","shower"],"cloud-lightning":["weather","bolt"],"cloud-rain":["weather"],"cloud-snow":["weather","blizzard"],cloud:["weather"],codepen:["logo"],codesandbox:["logo"],coffee:["drink","cup","mug","tea","cafe","hot","beverage"],command:["keyboard","cmd","terminal","prompt"],compass:["navigation","safari","travel","direction"],copy:["clone","duplicate"],"corner-down-left":["arrow"],"corner-down-right":["arrow"],"corner-left-down":["arrow"],"corner-left-up":["arrow"],"corner-right-down":["arrow"],"corner-right-up":["arrow"],"corner-up-left":["arrow"],"corner-up-right":["arrow"],"credit-card":["purchase","payment","cc"],crop:["photo","image"],crosshair:["aim","target"],database:["storage","memory"],delete:["remove"],disc:["album","cd","dvd","music"],"dollar-sign":["currency","money","payment"],droplet:["water"],edit:["pencil","change"],"edit-2":["pencil","change"],"edit-3":["pencil","change"],eye:["view","watch"],"eye-off":["view","watch","hide","hidden"],"external-link":["outbound"],facebook:["logo","social"],"fast-forward":["music"],figma:["logo","design","tool"],film:["movie","video"],"folder-minus":["directory"],"folder-plus":["directory"],folder:["directory"],framer:["logo","design","tool"],frown:["emoji","face","bad","sad","emotion"],gift:["present","box","birthday","party"],"git-branch":["code","version control"],"git-commit":["code","version control"],"git-merge":["code","version control"],"git-pull-request":["code","version control"],github:["logo","version control"],gitlab:["logo","version control"],global:["world","browser","language","translate"],"hard-drive":["computer","server","memory","data"],hash:["hashtag","number","pound"],headphones:["music","audio","sound"],heart:["like","love","emotion"],"help-circle":["question mark"],hexagon:["shape","node.js","logo"],home:["house","living"],image:["picture"],inbox:["email"],instagram:["logo","camera"],key:["password","login","authentication","secure"],"life-bouy":["help","life ring","support"],linkedin:["logo","social media"],lock:["security","password","secure"],"log-in":["sign in","arrow","enter"],"log-out":["sign out","arrow","exit"],mail:["email","message"],"map-pin":["location","navigation","travel","marker"],map:["location","navigation","travel"],maximize:["fullscreen"],"maximize-2":["fullscreen","arrows","expand"],meh:["emoji","face","neutral","emotion"],menu:["bars","navigation","hamburger"],"message-circle":["comment","chat"],"message-square":["comment","chat"],"mic-off":["record","sound","mute"],mic:["record","sound","listen"],minimize:["exit fullscreen","close"],"minimize-2":["exit fullscreen","arrows","close"],monitor:["tv","screen","display"],moon:["dark","night"],"more-horizontal":["ellipsis"],"more-vertical":["ellipsis"],"mouse-pointer":["arrow","cursor"],move:["arrows"],navigation:["location","travel"],"navigation-2":["location","travel"],octagon:["stop"],package:["box","container"],paperclip:["attachment"],pause:["music","stop"],"pause-circle":["music","audio","stop"],"pen-tool":["vector","drawing"],play:["music","start"],"play-circle":["music","start"],plus:["add","new"],"plus-circle":["add","new"],"plus-square":["add","new"],pocket:["logo","save"],power:["on","off"],radio:["signal"],rewind:["music"],rss:["feed","subscribe"],save:["floppy disk"],search:["find","magnifier","magnifying glass"],send:["message","mail","email","paper airplane","paper aeroplane"],settings:["cog","edit","gear","preferences"],shield:["security","secure"],"shield-off":["security","insecure"],"shopping-bag":["ecommerce","cart","purchase","store"],"shopping-cart":["ecommerce","cart","purchase","store"],shuffle:["music"],"skip-back":["music"],"skip-forward":["music"],slash:["ban","no"],sliders:["settings","controls"],smile:["emoji","face","happy","good","emotion"],speaker:["music"],star:["bookmark","favorite","like"],sun:["brightness","weather","light"],sunrise:["weather","time","morning","day"],sunset:["weather","time","evening","night"],tag:["label"],target:["bullseye"],terminal:["code","command line","prompt"],"thumbs-down":["dislike","bad","emotion"],"thumbs-up":["like","good","emotion"],"toggle-left":["on","off","switch"],"toggle-right":["on","off","switch"],trash:["garbage","delete","remove","bin"],"trash-2":["garbage","delete","remove","bin"],triangle:["delta"],truck:["delivery","van","shipping","transport","lorry"],twitter:["logo","social"],umbrella:["rain","weather"],"video-off":["camera","movie","film"],video:["camera","movie","film"],voicemail:["phone"],volume:["music","sound","mute"],"volume-1":["music","sound"],"volume-2":["music","sound"],"volume-x":["music","sound","mute"],watch:["clock","time"],wind:["weather","air"],"x-circle":["cancel","close","delete","remove","times","clear"],"x-octagon":["delete","stop","alert","warning","times","clear"],"x-square":["cancel","close","delete","remove","times","clear"],x:["cancel","close","delete","remove","times","clear"],youtube:["logo","video","play"],"zap-off":["flash","camera","lightning"],zap:["flash","camera","lightning"]}},function(e){e.exports={activity:'<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>',airplay:'<path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path><polygon points="12 15 17 21 7 21 12 15"></polygon>',"alert-circle":'<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>',"alert-octagon":'<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>',"alert-triangle":'<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>',"align-center":'<line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line>',"align-justify":'<line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line>',"align-left":'<line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line>',"align-right":'<line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line>',anchor:'<circle cx="12" cy="5" r="3"></circle><line x1="12" y1="22" x2="12" y2="8"></line><path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>',aperture:'<circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>',archive:'<polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line>',"arrow-down-circle":'<circle cx="12" cy="12" r="10"></circle><polyline points="8 12 12 16 16 12"></polyline><line x1="12" y1="8" x2="12" y2="16"></line>',"arrow-down-left":'<line x1="17" y1="7" x2="7" y2="17"></line><polyline points="17 17 7 17 7 7"></polyline>',"arrow-down-right":'<line x1="7" y1="7" x2="17" y2="17"></line><polyline points="17 7 17 17 7 17"></polyline>',"arrow-down":'<line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline>',"arrow-left-circle":'<circle cx="12" cy="12" r="10"></circle><polyline points="12 8 8 12 12 16"></polyline><line x1="16" y1="12" x2="8" y2="12"></line>',"arrow-left":'<line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>',"arrow-right-circle":'<circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line>',"arrow-right":'<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>',"arrow-up-circle":'<circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline><line x1="12" y1="16" x2="12" y2="8"></line>',"arrow-up-left":'<line x1="17" y1="17" x2="7" y2="7"></line><polyline points="7 17 7 7 17 7"></polyline>',"arrow-up-right":'<line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline>',"arrow-up":'<line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline>',"at-sign":'<circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>',award:'<circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>',"bar-chart-2":'<line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>',"bar-chart":'<line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>',"battery-charging":'<path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"></path><line x1="23" y1="13" x2="23" y2="11"></line><polyline points="11 6 7 12 13 12 9 18"></polyline>',battery:'<rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line>',"bell-off":'<path d="M13.73 21a2 2 0 0 1-3.46 0"></path><path d="M18.63 13A17.89 17.89 0 0 1 18 8"></path><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"></path><path d="M18 8a6 6 0 0 0-9.33-5"></path><line x1="1" y1="1" x2="23" y2="23"></line>',bell:'<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>',bluetooth:'<polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"></polyline>',bold:'<path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>',"book-open":'<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>',book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>',bookmark:'<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>',box:'<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>',briefcase:'<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>',calendar:'<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',"camera-off":'<line x1="1" y1="1" x2="23" y2="23"></line><path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"></path>',camera:'<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle>',cast:'<path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path><line x1="2" y1="20" x2="2.01" y2="20"></line>',"check-circle":'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>',"check-square":'<polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>',check:'<polyline points="20 6 9 17 4 12"></polyline>',"chevron-down":'<polyline points="6 9 12 15 18 9"></polyline>',"chevron-left":'<polyline points="15 18 9 12 15 6"></polyline>',"chevron-right":'<polyline points="9 18 15 12 9 6"></polyline>',"chevron-up":'<polyline points="18 15 12 9 6 15"></polyline>',"chevrons-down":'<polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline>',"chevrons-left":'<polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline>',"chevrons-right":'<polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline>',"chevrons-up":'<polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline>',chrome:'<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>',circle:'<circle cx="12" cy="12" r="10"></circle>',clipboard:'<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>',clock:'<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',"cloud-drizzle":'<line x1="8" y1="19" x2="8" y2="21"></line><line x1="8" y1="13" x2="8" y2="15"></line><line x1="16" y1="19" x2="16" y2="21"></line><line x1="16" y1="13" x2="16" y2="15"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="12" y1="15" x2="12" y2="17"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>',"cloud-lightning":'<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path><polyline points="13 11 9 17 15 17 11 23"></polyline>',"cloud-off":'<path d="M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3"></path><line x1="1" y1="1" x2="23" y2="23"></line>',"cloud-rain":'<line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>',"cloud-snow":'<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="8" y1="20" x2="8.01" y2="20"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="12" y1="22" x2="12.01" y2="22"></line><line x1="16" y1="16" x2="16.01" y2="16"></line><line x1="16" y1="20" x2="16.01" y2="20"></line>',cloud:'<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>',code:'<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>',codepen:'<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon><line x1="12" y1="22" x2="12" y2="15.5"></line><polyline points="22 8.5 12 15.5 2 8.5"></polyline><polyline points="2 15.5 12 8.5 22 15.5"></polyline><line x1="12" y1="2" x2="12" y2="8.5"></line>',codesandbox:'<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>',coffee:'<path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line>',columns:'<path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>',command:'<path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>',compass:'<circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>',copy:'<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>',"corner-down-left":'<polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path>',"corner-down-right":'<polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path>',"corner-left-down":'<polyline points="14 15 9 20 4 15"></polyline><path d="M20 4h-7a4 4 0 0 0-4 4v12"></path>',"corner-left-up":'<polyline points="14 9 9 4 4 9"></polyline><path d="M20 20h-7a4 4 0 0 1-4-4V4"></path>',"corner-right-down":'<polyline points="10 15 15 20 20 15"></polyline><path d="M4 4h7a4 4 0 0 1 4 4v12"></path>',"corner-right-up":'<polyline points="10 9 15 4 20 9"></polyline><path d="M4 20h7a4 4 0 0 0 4-4V4"></path>',"corner-up-left":'<polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>',"corner-up-right":'<polyline points="15 14 20 9 15 4"></polyline><path d="M4 20v-7a4 4 0 0 1 4-4h12"></path>',cpu:'<rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>',"credit-card":'<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>',crop:'<path d="M6.13 1L6 16a2 2 0 0 0 2 2h15"></path><path d="M1 6.13L16 6a2 2 0 0 1 2 2v15"></path>',crosshair:'<circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line>',database:'<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>',delete:'<path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line>',disc:'<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle>',"dollar-sign":'<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',"download-cloud":'<polyline points="8 17 12 21 16 17"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>',droplet:'<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>',"edit-2":'<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>',"edit-3":'<path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>',edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>',"external-link":'<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>',"eye-off":'<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>',eye:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>',facebook:'<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>',"fast-forward":'<polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon>',feather:'<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line>',figma:'<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path>',"file-minus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="9" y1="15" x2="15" y2="15"></line>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>',file:'<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline>',film:'<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line>',filter:'<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>',flag:'<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line>',"folder-minus":'<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="9" y1="14" x2="15" y2="14"></line>',"folder-plus":'<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line>',folder:'<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>',framer:'<path d="M5 16V9h14V2H5l14 14h-7m-7 0l7 7v-7m-7 0h7"></path>',frown:'<circle cx="12" cy="12" r="10"></circle><path d="M16 16s-1.5-2-4-2-4 2-4 2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>',gift:'<polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>',"git-branch":'<line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path>',"git-commit":'<circle cx="12" cy="12" r="4"></circle><line x1="1.05" y1="12" x2="7" y2="12"></line><line x1="17.01" y1="12" x2="22.96" y2="12"></line>',"git-merge":'<circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M6 21V9a9 9 0 0 0 9 9"></path>',"git-pull-request":'<circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line>',github:'<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>',gitlab:'<path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"></path>',globe:'<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>',grid:'<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>',"hard-drive":'<line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line>',hash:'<line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line>',headphones:'<path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>',heart:'<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>',"help-circle":'<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>',hexagon:'<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>',home:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',image:'<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>',inbox:'<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>',info:'<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>',instagram:'<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>',italic:'<line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line>',key:'<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>',layers:'<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>',layout:'<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>',"life-buoy":'<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line><line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>',"link-2":'<path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"></path><line x1="8" y1="12" x2="16" y2="12"></line>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>',linkedin:'<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>',list:'<line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>',loader:'<line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>',lock:'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>',"log-in":'<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line>',"log-out":'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>',mail:'<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>',"map-pin":'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>',map:'<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line>',"maximize-2":'<polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line>',maximize:'<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>',meh:'<circle cx="12" cy="12" r="10"></circle><line x1="8" y1="15" x2="16" y2="15"></line><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>',menu:'<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>',"message-circle":'<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>',"message-square":'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>',"mic-off":'<line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line>',mic:'<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line>',"minimize-2":'<polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="3" y1="21" x2="10" y2="14"></line>',minimize:'<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>',"minus-circle":'<circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line>',"minus-square":'<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line>',minus:'<line x1="5" y1="12" x2="19" y2="12"></line>',monitor:'<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>',moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>',"more-horizontal":'<circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle>',"more-vertical":'<circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle>',"mouse-pointer":'<path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path><path d="M13 13l6 6"></path>',move:'<polyline points="5 9 2 12 5 15"></polyline><polyline points="9 5 12 2 15 5"></polyline><polyline points="15 19 12 22 9 19"></polyline><polyline points="19 9 22 12 19 15"></polyline><line x1="2" y1="12" x2="22" y2="12"></line><line x1="12" y1="2" x2="12" y2="22"></line>',music:'<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>',"navigation-2":'<polygon points="12 2 19 21 12 17 5 21 12 2"></polygon>',navigation:'<polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>',octagon:'<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>',package:'<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>',paperclip:'<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>',"pause-circle":'<circle cx="12" cy="12" r="10"></circle><line x1="10" y1="15" x2="10" y2="9"></line><line x1="14" y1="15" x2="14" y2="9"></line>',pause:'<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>',"pen-tool":'<path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle>',percent:'<line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle>',"phone-call":'<path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',"phone-forwarded":'<polyline points="19 1 23 5 19 9"></polyline><line x1="15" y1="5" x2="23" y2="5"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',"phone-incoming":'<polyline points="16 2 16 8 22 8"></polyline><line x1="23" y1="1" x2="16" y2="8"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',"phone-missed":'<line x1="23" y1="1" x2="17" y2="7"></line><line x1="17" y1="1" x2="23" y2="7"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',"phone-off":'<path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path><line x1="23" y1="1" x2="1" y2="23"></line>',"phone-outgoing":'<polyline points="23 7 23 1 17 1"></polyline><line x1="16" y1="8" x2="23" y2="1"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',"pie-chart":'<path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>',"play-circle":'<circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon>',play:'<polygon points="5 3 19 12 5 21 5 3"></polygon>',"plus-circle":'<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>',"plus-square":'<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>',plus:'<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>',pocket:'<path d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"></path><polyline points="8 10 12 14 16 10"></polyline>',power:'<path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line>',printer:'<polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect>',radio:'<circle cx="12" cy="12" r="2"></circle><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>',"refresh-ccw":'<polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>',"refresh-cw":'<polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>',repeat:'<polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path>',rewind:'<polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon>',"rotate-ccw":'<polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>',"rotate-cw":'<polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>',rss:'<path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle>',save:'<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline>',scissors:'<circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line>',search:'<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>',send:'<line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>',server:'<rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line>',settings:'<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>',"share-2":'<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>',share:'<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line>',"shield-off":'<path d="M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18"></path><path d="M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38"></path><line x1="1" y1="1" x2="23" y2="23"></line>',shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',"shopping-bag":'<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>',"shopping-cart":'<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>',shuffle:'<polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line>',sidebar:'<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line>',"skip-back":'<polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line>',"skip-forward":'<polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line>',slack:'<path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"></path><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"></path><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"></path><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"></path><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"></path><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"></path>',slash:'<circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>',sliders:'<line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line>',smartphone:'<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>',smile:'<circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>',speaker:'<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><circle cx="12" cy="14" r="4"></circle><line x1="12" y1="6" x2="12.01" y2="6"></line>',square:'<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>',star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>',"stop-circle":'<circle cx="12" cy="12" r="10"></circle><rect x="9" y="9" width="6" height="6"></rect>',sun:'<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>',sunrise:'<path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="2" x2="12" y2="9"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="8 6 12 2 16 6"></polyline>',sunset:'<path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="9" x2="12" y2="2"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="16 5 12 9 8 5"></polyline>',tablet:'<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>',tag:'<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>',target:'<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>',terminal:'<polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line>',thermometer:'<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>',"thumbs-down":'<path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>',"thumbs-up":'<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>',"toggle-left":'<rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect><circle cx="8" cy="12" r="3"></circle>',"toggle-right":'<rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect><circle cx="16" cy="12" r="3"></circle>',tool:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>',"trash-2":'<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>',trash:'<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>',trello:'<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="7" y="7" width="3" height="9"></rect><rect x="14" y="7" width="3" height="5"></rect>',"trending-down":'<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline>',"trending-up":'<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>',triangle:'<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>',truck:'<rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>',tv:'<rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline>',twitch:'<path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>',twitter:'<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>',type:'<polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line>',umbrella:'<path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"></path>',underline:'<path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path><line x1="4" y1="21" x2="20" y2="21"></line>',unlock:'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path>',"upload-cloud":'<polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line>',"user-check":'<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline>',"user-minus":'<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="23" y1="11" x2="17" y2="11"></line>',"user-plus":'<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line>',"user-x":'<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="18" y1="8" x2="23" y2="13"></line><line x1="23" y1="8" x2="18" y2="13"></line>',user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',"video-off":'<path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"></path><line x1="1" y1="1" x2="23" y2="23"></line>',video:'<polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>',voicemail:'<circle cx="5.5" cy="11.5" r="4.5"></circle><circle cx="18.5" cy="11.5" r="4.5"></circle><line x1="5.5" y1="16" x2="18.5" y2="16"></line>',"volume-1":'<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>',"volume-2":'<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>',"volume-x":'<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>',volume:'<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>',watch:'<circle cx="12" cy="12" r="7"></circle><polyline points="12 9 12 12 13.5 13.5"></polyline><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path>',"wifi-off":'<line x1="1" y1="1" x2="23" y2="23"></line><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path><path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line>',wifi:'<path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line>',wind:'<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>',"x-circle":'<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>',"x-octagon":'<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>',"x-square":'<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line>',x:'<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>',youtube:'<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>',"zap-off":'<polyline points="12.41 6.75 13 2 10.57 4.92"></polyline><polyline points="18.57 12.91 21 10 15.66 10"></polyline><polyline points="8 8 3 14 12 14 11 22 16 16"></polyline><line x1="1" y1="1" x2="23" y2="23"></line>',zap:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>',"zoom-in":'<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>',"zoom-out":'<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line>'}},function(e){e.exports={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"}},function(e,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var i=arguments[n];for(var t in i)Object.prototype.hasOwnProperty.call(i,t)&&(e[t]=i[t])}return e},l=function(){function e(e,n){for(var i=0;i<n.length;i++){var t=n[i];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(n,i,t){return i&&e(n.prototype,i),t&&e(n,t),n}}(),r=a(i(22)),o=a(i(42));function a(e){return e&&e.__esModule?e:{default:e}}var c=function(){function e(n,i){var l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.name=n,this.contents=i,this.tags=l,this.attrs=t({},o.default,{class:"feather feather-"+n})}return l(e,[{key:"toSvg",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return"<svg "+function(e){return Object.keys(e).map(function(n){return n+'="'+e[n]+'"'}).join(" ")}(t({},this.attrs,e,{class:(0,r.default)(this.attrs.class,e.class)}))+">"+this.contents+"</svg>"}},{key:"toString",value:function(){return this.contents}}]),e}();n.default=c},function(e,n,i){"use strict";var t=o(i(12)),l=o(i(39)),r=o(i(38));function o(e){return e&&e.__esModule?e:{default:e}}e.exports={icons:t.default,toSvg:l.default,replace:r.default}},function(e,n,i){e.exports=i(0)},function(e,n,i){var t=i(2)("iterator"),l=!1;try{var r=0,o={next:function(){return{done:!!r++}},return:function(){l=!0}};o[t]=function(){return this},Array.from(o,function(){throw 2})}catch(e){}e.exports=function(e,n){if(!n&&!l)return!1;var i=!1;try{var r={};r[t]=function(){return{next:function(){return{done:i=!0}}}},e(r)}catch(e){}return i}},function(e,n,i){var t=i(30),l=i(2)("toStringTag"),r="Arguments"==t(function(){return arguments}());e.exports=function(e){var n,i,o;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(i=function(e,n){try{return e[n]}catch(e){}}(n=Object(e),l))?i:r?t(n):"Object"==(o=t(n))&&"function"==typeof n.callee?"Arguments":o}},function(e,n,i){var t=i(47),l=i(9),r=i(2)("iterator");e.exports=function(e){if(void 0!=e)return e[r]||e["@@iterator"]||l[t(e)]}},function(e,n,i){"use strict";var t=i(18),l=i(7),r=i(10);e.exports=function(e,n,i){var o=t(n);o in e?l.f(e,o,r(0,i)):e[o]=i}},function(e,n,i){var t=i(2),l=i(9),r=t("iterator"),o=Array.prototype;e.exports=function(e){return void 0!==e&&(l.Array===e||o[r]===e)}},function(e,n,i){var t=i(3);e.exports=function(e,n,i,l){try{return l?n(t(i)[0],i[1]):n(i)}catch(n){var r=e.return;throw void 0!==r&&t(r.call(e)),n}}},function(e,n){e.exports=function(e){if("function"!=typeof e)throw TypeError(String(e)+" is not a function");return e}},function(e,n,i){var t=i(52);e.exports=function(e,n,i){if(t(e),void 0===n)return e;switch(i){case 0:return function(){return e.call(n)};case 1:return function(i){return e.call(n,i)};case 2:return function(i,t){return e.call(n,i,t)};case 3:return function(i,t,l){return e.call(n,i,t,l)}}return function(){return e.apply(n,arguments)}}},function(e,n,i){"use strict";var t=i(53),l=i(24),r=i(51),o=i(50),a=i(27),c=i(49),p=i(48);e.exports=function(e){var n,i,y,h,x=l(e),s="function"==typeof this?this:Array,u=arguments.length,d=u>1?arguments[1]:void 0,f=void 0!==d,v=0,g=p(x);if(f&&(d=t(d,u>2?arguments[2]:void 0,2)),void 0==g||s==Array&&o(g))for(i=new s(n=a(x.length));n>v;v++)c(i,v,f?d(x[v],v):x[v]);else for(h=g.call(x),i=new s;!(y=h.next()).done;v++)c(i,v,f?r(h,d,[y.value,v],!0):y.value);return i.length=v,i}},function(e,n,i){var t=i(32),l=i(54);t({target:"Array",stat:!0,forced:!i(46)(function(e){Array.from(e)})},{from:l})},function(e,n,i){var t=i(6),l=i(3);e.exports=function(e,n){if(l(e),!t(n)&&null!==n)throw TypeError("Can't set "+String(n)+" as a prototype")}},function(e,n,i){var t=i(56);e.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var e,n=!1,i={};try{(e=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(i,[]),n=i instanceof Array}catch(e){}return function(i,l){return t(i,l),n?e.call(i,l):i.__proto__=l,i}}():void 0)},function(e,n,i){var t=i(0).document;e.exports=t&&t.documentElement},function(e,n,i){var t=i(28),l=i(13);e.exports=Object.keys||function(e){return t(e,l)}},function(e,n,i){var t=i(8),l=i(7),r=i(3),o=i(59);e.exports=t?Object.defineProperties:function(e,n){r(e);for(var i,t=o(n),a=t.length,c=0;a>c;)l.f(e,i=t[c++],n[i]);return e}},function(e,n,i){var t=i(3),l=i(60),r=i(13),o=i(15),a=i(58),c=i(34),p=i(16)("IE_PROTO"),y=function(){},h=function(){var e,n=c("iframe"),i=r.length;for(n.style.display="none",a.appendChild(n),n.src=String("javascript:"),(e=n.contentWindow.document).open(),e.write("<script>document.F=Object<\/script>"),e.close(),h=e.F;i--;)delete h.prototype[r[i]];return h()};e.exports=Object.create||function(e,n){var i;return null!==e?(y.prototype=t(e),i=new y,y.prototype=null,i[p]=e):i=h(),void 0===n?i:l(i,n)},o[p]=!0},function(e,n,i){var t=i(4);e.exports=!!Object.getOwnPropertySymbols&&!t(function(){return!String(Symbol())})},function(e,n,i){var t=i(4);e.exports=!t(function(){function e(){}return e.prototype.constructor=null,Object.getPrototypeOf(new e)!==e.prototype})},function(e,n,i){"use strict";var t=i(26).IteratorPrototype,l=i(61),r=i(10),o=i(23),a=i(9),c=function(){return this};e.exports=function(e,n,i){var p=n+" Iterator";return e.prototype=l(t,{next:r(1,i)}),o(e,p,!1,!0),a[p]=c,e}},function(e,n,i){var t=i(4),l=/#|\.prototype\./,r=function(e,n){var i=a[o(e)];return i==p||i!=c&&("function"==typeof n?t(n):!!n)},o=r.normalize=function(e){return String(e).replace(l,".").toLowerCase()},a=r.data={},c=r.NATIVE="N",p=r.POLYFILL="P";e.exports=r},function(e,n){n.f=Object.getOwnPropertySymbols},function(e,n,i){var t=i(21),l=Math.max,r=Math.min;e.exports=function(e,n){var i=t(e);return i<0?l(i+n,0):r(i,n)}},function(e,n,i){var t=i(14),l=i(27),r=i(67);e.exports=function(e){return function(n,i,o){var a,c=t(n),p=l(c.length),y=r(o,p);if(e&&i!=i){for(;p>y;)if((a=c[y++])!=a)return!0}else for(;p>y;y++)if((e||y in c)&&c[y]===i)return e||y||0;return!e&&-1}}},function(e,n,i){var t=i(28),l=i(13).concat("length","prototype");n.f=Object.getOwnPropertyNames||function(e){return t(e,l)}},function(e,n,i){var t=i(0),l=i(69),r=i(66),o=i(3),a=t.Reflect;e.exports=a&&a.ownKeys||function(e){var n=l.f(o(e)),i=r.f;return i?n.concat(i(e)):n}},function(e,n,i){var t=i(1),l=i(70),r=i(31),o=i(7);e.exports=function(e,n){for(var i=l(n),a=o.f,c=r.f,p=0;p<i.length;p++){var y=i[p];t(e,y)||a(e,y,c(n,y))}}},function(e,n,i){var t=i(4),l=i(30),r="".split;e.exports=t(function(){return!Object("z").propertyIsEnumerable(0)})?function(e){return"String"==l(e)?r.call(e,""):Object(e)}:Object},function(e,n,i){"use strict";var t={}.propertyIsEnumerable,l=Object.getOwnPropertyDescriptor,r=l&&!t.call({1:2},1);n.f=r?function(e){var n=l(this,e);return!!n&&n.enumerable}:t},function(e,n,i){"use strict";var t=i(32),l=i(64),r=i(25),o=i(57),a=i(23),c=i(5),p=i(29),y=i(2),h=i(17),x=i(9),s=i(26),u=s.IteratorPrototype,d=s.BUGGY_SAFARI_ITERATORS,f=y("iterator"),v=function(){return this};e.exports=function(e,n,i,y,s,g,m){l(i,n,y);var M,w,b,z=function(e){if(e===s&&O)return O;if(!d&&e in H)return H[e];switch(e){case"keys":case"values":case"entries":return function(){return new i(this,e)}}return function(){return new i(this)}},A=n+" Iterator",k=!1,H=e.prototype,V=H[f]||H["@@iterator"]||s&&H[s],O=!d&&V||z(s),j="Array"==n&&H.entries||V;if(j&&(M=r(j.call(new e)),u!==Object.prototype&&M.next&&(h||r(M)===u||(o?o(M,u):"function"!=typeof M[f]&&c(M,f,v)),a(M,A,!0,!0),h&&(x[A]=v))),"values"==s&&V&&"values"!==V.name&&(k=!0,O=function(){return V.call(this)}),h&&!m||H[f]===O||c(H,f,O),x[n]=O,s)if(w={values:z("values"),keys:g?O:z("keys"),entries:z("entries")},m)for(b in w)!d&&!k&&b in H||p(H,b,w[b]);else t({target:n,proto:!0,forced:d||k},w);return w}},function(e,n){var i;i=function(){return this}();try{i=i||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(i=window)}e.exports=i},function(e,n,i){var t=i(0),l=i(36),r=t.WeakMap;e.exports="function"==typeof r&&/native code/.test(l.call(r))},function(e,n,i){var t=i(21),l=i(20);e.exports=function(e,n,i){var r,o,a=String(l(e)),c=t(n),p=a.length;return c<0||c>=p?i?"":void 0:(r=a.charCodeAt(c))<55296||r>56319||c+1===p||(o=a.charCodeAt(c+1))<56320||o>57343?i?a.charAt(c):r:i?a.slice(c,c+2):o-56320+(r-55296<<10)+65536}},function(e,n,i){"use strict";var t=i(77),l=i(37),r=i(74),o=l.set,a=l.getterFor("String Iterator");r(String,"String",function(e){o(this,{type:"String Iterator",string:String(e),index:0})},function(){var e,n=a(this),i=n.string,l=n.index;return l>=i.length?{value:void 0,done:!0}:(e=t(i,l,!0),n.index+=e.length,{value:e,done:!1})})},function(e,n,i){i(78),i(55);var t=i(45);e.exports=t.Array.from},function(e,n,i){i(79),e.exports=i(44)}])});
//# sourceMappingURL=feather.min.js.map


feather.replace();






























/*-----------------------------------------------------------------------------------

 Template Name:Chitchat
 Template URI: themes.pixelstrap.com/chitchat
 Description: This is Chat website
 Author: Pixelstrap
 Author URI: https://themeforest.net/user/pixelstrap

 ----------------------------------------------------------------------------------- */
// 01. Tooltip js
// 02. Background Image js
// 03. OwlCarousel js
// 04. Chitchat Loader js
// 05. Search js
// 06. Mute js
// 07. Button Effect js
// 08. Collapse Title js
// 09. Refresh Request information next & previous button
// 10 .Full Screen
// 11. Header fix
// 12. Tap on Top
// 13. Customizer
// 14  Footer responsive js
// 15  Pin box
// 16  Reminder
// 17  Set wallpaper onclick
// 18  Custom tab
// 19  Theme mode
// 20. Add claas to nav
// 21. Live chat
// 22. Toggle classes
// 23. ADD tO-DO LIST
// 24. Right sidebar
// 25. Sticker
// 26. Emoji
// 27. Profile open
// 28. Dropdown

(function ($) {
    "use strict";

    /*=====================
      01. Tooltip js
      ==========================*/
      tippy('.sidebar-main .icon-btn', {
        theme: 'tooltiprad',
        placement: 'right-end',
        arrow: false
    });
      tippy('.user-popup', {
        content: "Status",
        theme: 'gradienttooltip',
        placement: 'right-end',
        arrow: false
    });
      tippy('.calls  > li > .icon-btn', {
        placement: 'bottom-end',
        arrow: true
    });
      tippy('.clfooter a', {
        placement: 'top-end',
        arrow: true
    });
      tippy('.audiocall2 a', {
        placement: 'top-end',
        arrow: true
    });
      tippy('.videocall a', {
        placement: 'top-end',
        arrow: true
    });

    /*=====================
      02. Background Image js
      ==========================*/
      $(".bg-top").parent().addClass('b-top');
      $(".bg-bottom").parent().addClass('b-bottom');
      $(".bg-center").parent().addClass('b-center');
      $(".bg_size_content").parent().addClass('b_size_content');
      $(".bg-img").parent().addClass('bg-size');
      $('.bg-img').each(function () {
        var el = $(this),
        src = el.attr('src'),
        parent = el.parent();
        parent.css({
            'background-image': 'url(' + src + ')',
            'background-size': 'cover',
            'background-position': 'center',
            'display': 'block'
        });
        el.hide();
    });

    /*=====================
      03. OwlCarousel js
      ==========================*/
     /* var owl_carousel_custom_recent = {
        init: function () {
            var recent = $('.recent-slider');
            recent.owlCarousel({
                items: 3,
                dots: false,
                loop: true,
                margin: 15,
                nav: false,
                autoplay: true,
                autoplayTimeout: 2000,
                autoplayHoverPause: true,
                responsive: {
                    768: {
                        items: 7
                    },
                    800: {
                        items: 7
                    },
                    801: {
                        items: 2
                    },
                    1366: {
                        items: 2
                    },
                    1600: {
                        items: 3
                    }
                }
            })
        }
    };
    owl_carousel_custom_recent.init();

    var owl_carousel_custom_testimonial = {
        init: function () {
            var recent = $('.testimonial-slider');
            recent.owlCarousel({
                items: 4,
                dots: false,
                loop: true,
                margin: 60,
                nav: false,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: false,
                responsive: {
                    320: {
                        items: 1,
                        margin: 25,
                    },
                    575: {
                        items: 2,
                        margin: 25,
                    },
                    1070: {
                        items: 3,
                        margin: 25,
                    },
                    1600: {
                        items: 4
                    },
                }
            })
        }
    };
    owl_carousel_custom_testimonial.init();

    var owl_carousel_custom_price = {
        init: function () {
            var recent = $('.price-slider');
            recent.owlCarousel({
                items: 3,
                dots: false,
                loop: true,
                margin: 60,
                nav: false,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: false,
                responsive: {
                    320: {
                        items: 1,
                        margin: 25,
                    },

                    601: {
                        items: 2,
                        margin: 25,
                    },
                    1070: {
                        items: 3,
                        margin: 25,
                    },
                    1600: {
                        items: 3
                    },
                }
            })
        }
    };
    owl_carousel_custom_price.init();

    var owl_carousel_custom_team = {
        init: function () {
            var recent = $('.team-slider');
            recent.owlCarousel({
                items: 2,
                dots: false,
                loop: true,
                margin: 20,
                nav: false,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: false,
                responsive: {
                    320: {
                        items: 1
                    },
                    1199: {
                        items: 2
                    },
                }
            })
        }
    };
    owl_carousel_custom_team.init();

    var owl_carousel_custom_testimonial = {
        init: function () {
            var recent = $('.counter-slider');
            recent.owlCarousel({
                items: 4,
                dots: false,
                loop: true,
                margin: 60,
                nav: false,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: false,
                responsive: {
                    320: {
                        items: 1,
                        margin: 25,
                    },
                    480: {
                        items: 2,
                        margin: 25,
                    },
                    575: {
                        items: 3,
                        margin: 25,
                    },
                    768: {
                        items: 4,
                        margin: 25,
                    },
                    1600: {
                        items: 4
                    },
                }
            })
        }
    };
    owl_carousel_custom_testimonial.init();*/

    /*=====================
         04. Chitchat Loder js
         ==========================*/
         $('.chitchat-loader').slideUp('slow', function () {
            $(this).remove();
        });

    /*=====================
         05. Search js
         ==========================*/
         $('.search').on('click', function (e) {
            $(this).siblings().toggleClass("open");
        });
         $('.close-search').on('click', function (e) {
            $(this).parent().parent().removeClass("open");
        });
         $('.search-right').on('click', function (e) {
            $(this).parent().parent().parent().parent().parent().parent().find(".form-inline").toggleClass("open");
        });
         $('.close-search').on('click', function (e) {
            $(this).parent().parent().removeClass("open");
        });

    /*=====================
         06. Mute js
         ==========================*/
         $('.mute').on('click', function (e) {
            $(this).children().toggleClass("off");
        });

    /*=====================
         07. Button Effect js
         ==========================*/
         $('.button-effect').on('click', function (e) {
            e.preventDefault();
            var self = $(this),
            wave = '.effect-wave',
            btnWidth = self.outerWidth(),
            x = e.offsetX,
            y = e.offsetY;
            self.prepend('<span class="effect-wave"></span>')
            $(wave)
            .css({
                'top': y,
                'left': x
            })
            .animate({
                opacity: '0',
                width: btnWidth * 2,
                height: btnWidth * 2
            }, 500, function () {
                self.find(wave).remove()
            })
        })

    /*=====================
         08. Collapse Title js
         ==========================*/
         $('.block-title').on('click', function (e) {
            e.preventDefault;
            var speed = 300;
            var thisItem = $(this).parent(),
            nextLevel = $(this).next('.block-content');
            if (thisItem.hasClass('open')) {
                thisItem.removeClass('open');
                nextLevel.slideUp(speed);
            } else {
                thisItem.addClass('open');
                nextLevel.slideDown(speed);
            }
        });

    /*=====================
         09. Refresh Request information next & previous button
         ==========================*/
         $('.refresh').on('click', function (e) {
            $(this).toggleClass('refreshed');
        });
         $('.req-info').on('click', function (e) {
            $(this).addClass('disabled');
        });
         $('.next').on('click', function (e) {
            $(this).parent().parent().siblings().addClass('open');
        });
         $('.previous').on('click', function (e) {
            $(this).parent().parent().parent().removeClass('open');
        });

         $('.chat-cont-toggle').on('click', function (e) {
            $('.chat-cont-setting ').toggleClass('open');
        });




    /*=====================
          10 .Full Screen
          ==========================*/

          $('.toggle-full-screen').on('click', function (e) {
            $('#videocall').toggleClass("active");
        })

    /*=====================
          11.Header fix
          ==========================*/
          $(window).scroll(function () {
            var scroll = $(window).scrollTop();
            if (scroll >= 60) {
                $(".landing-header").addClass("fixed");
            } else {
                $(".landing-header").removeClass("fixed");
            }
        });
    /*=====================
      12.Tap on Top
      ==========================*/
      $(window).on('scroll', function () {
        if ($(this).scrollTop() > 600) {
            $('.tap-top').fadeIn();
        } else {
            $('.tap-top').fadeOut();
        }
    });
      $('.tap-top').on('click', function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    /*=====================
           13. Customizer
           ==========================*/
         /*  $('<div class="sidebar-pannle-main"><ul><li class="rtl-setting icon-btn btn-primary">RTL</li><li class="cog-click icon-btn btn-success" ><i class="fa fa-cog"></i></li></ul></div> <section class="setting-sidebar"><div class="theme-title"><div class="media"><div><h2>Customizer</h2><h4>Real Time Customize</h4></div><div class="media-body"><a class="icon-btn btn-outline-light button-effect pull-right cog-close" href="#"><i class="fa fa-close"></i></a></div></div></div><div class="color-picker"><h5>Choose color</h5><ul class="colors"><li class="color active" data-attr="style"></li><li class="color1" data-attr="style1"></li><li class="color2" data-attr="style2"></li><li class="color3" data-attr="style3"></li><li class="color4" data-attr="style4"></li><li class="color5" data-attr="style5"></li><li class="color6" data-attr="style6"></li></ul></div><div class="theme-layout"><h5>Layout</h5><ul><li class="active" data-attr=""><div class="sidebar"></div><div class="sidebar-content"></div></li><li data-attr="dark-sidebar"><div class="sidebar"></div><div class="sidebar-content"></div></li><li data-attr="dark"><div class="sidebar"></div><div class="sidebar-content"></div></li><li data-attr="colorfull"><div class="sidebar"></div><div class="sidebar-content"></div></li></ul></div><div class="chat-wallpaper"><h5>Chat wallpaper</h5><ul class="wallpaper"><li class="bg-color bg-default active"></li><li class="bg-size" style="background-image: url("../assets/images/wallpaper/2.jpg"); background-size: cover; background-position: center center; display: block;"><img class="bg-img" src="../assets/images/wallpaper/2.jpg" alt="Avatar" style="display: none;"></li><li class="bg-size" style="background-image: url("../assets/images/wallpaper/3.jpg"); background-size: cover; background-position: center center; display: block;"><img class="bg-img" src="../assets/images/wallpaper/3.jpg" alt="Avatar" style="display: none;"></li><li class="bg-size" style="background-image: url("../assets/images/wallpaper/4.jpg"); background-size: cover; background-position: center center; display: block;"><img class="bg-img" src="../assets/images/wallpaper/4.jpg" alt="Avatar" style="display: none;"></li><li class="bg-size" style="background-image: url("../assets/images/wallpaper/5.jpg"); background-size: cover; background-position: center center; display: block;"><img class="bg-img" src="../assets/images/wallpaper/5.jpg" alt="Avatar" style="display: none;"></li><li class="bg-size" style="background-image: url("../assets/images/wallpaper/1.jpg"); background-size: cover; background-position: center center; display: block;"><img class="bg-img" src="../assets/images/wallpaper/1.jpg" alt="Avatar" style="display: none;"></li> <br><li class="bg-color grediant-1"></li><li class="bg-color grediant-2"></li><li class="bg-color grediant-3"></li><li class="bg-color grediant-4"></li><li class="bg-color grediant-5"></li><li class="bg-color grediant-6"></li></ul></div><div class="sidebar-setting"><h5>Sidebar</h5><ul><li class="active three-column"><div class="sm-sidebar"></div><div class="sidebar"></div><div class="sidebar-content"></div></li><li class="two-column"><div class="sidebar"></div><div class="sidebar-content"></div></li></ul></div> </section>').appendTo($('body'));
           $('.cog-click').on('click', function () {
            $('.setting-sidebar').css("right", "0px");
        });*/
           $(".cog-close").on('click', function () {
            $('.setting-sidebar').css("right", "-400px");
        });
           $(".theme-layout li").on('click', function () {
            $(".theme-layout li").removeClass('active');
            $(this).addClass("active");
            var themeLayout = $(this).attr("data-attr");
            $("body").attr("class", themeLayout);
        });
           var body_event = $("body");
           body_event.on("click", ".rtl-setting", function () {
            $(this).toggleClass('rtl');
            $('body').removeClass('rtl');
            if ($('.rtl-setting').hasClass('rtl')) {
                $('.rtl-setting').text('LTR');
                $('body').addClass('rtl');
            } else {
                $('.rtl-setting').text('RTL');
            }
            return false;
        });
           body_event.on("click", ".themes-content li", function () {
            $(this).addClass('active').siblings().removeClass('active');
            $color = $(this).attr("data-attr");
            $("#color").attr("href", "../assets/css/" + $color + ".css");
            return false;
        });

    /*=====================
    14 footer responsive js
    ==========================*/
    var contentwidth = jQuery(window).width();
    if ((contentwidth) < '768') {
        jQuery('.footer-title h3').append('<span class="according-menu"></span>');
        jQuery('.footer-title').on('click', function () {
            jQuery('.footer-title').removeClass('active');
            jQuery('.footer-contant').slideUp('normal');
            if (jQuery(this).next().is(':hidden') == true) {
                jQuery(this).addClass('active');
                jQuery(this).next().slideDown('normal');
            }
        });
        jQuery('.footer-contant').hide();
    } else {
        jQuery('.footer-contant').show();
    }
    /*=====================
        15. Pin box
        ==========================*/
        $('.ti-pin2').on('click', function () {
            $(this).parent().parent().parent().toggleClass('pined');
        });

    /*=====================
        16 Reminder
        ==========================*/
        $(".reminder-count li").on('click', function () {
            $('.reminder-count li').removeClass('active');
            $(this).addClass('active');
        });

        $('.Show-reminder').on('click', function (e) {
            $('.target-reminder-list').show(500);
            $('.Show-reminder').hide(0);
            $('.Hide-reminder').show(0);
        });
        $('.Hide-reminder').on('click', function (e) {
            $('.target-reminder-list').hide(500);
            $('.Show-reminder').show(0);
            $('.Hide-reminder').hide(0);
        });
        $('.toggle').on('click', function (e) {
            $('.target-reminder-list').toggle('slow');
        });

    /*=====================
        17 set wallpaper onclick
        ==========================*/
        $('.wallpaper li.bg-color').on('click', function () {
            var color = $(this).css('background-image');
            $(".wallpaper li").removeClass('active');
            $(this).addClass("active");
            $(".chitchat-main .messages").css({
                'background-image': color,
                'background-blend-mode': 'unset',
            });
        });
        $('.wallpaper li.bg-size').on('click', function () {
            var color = $(this).children(".bg-img").attr('src');
            $(".wallpaper li").removeClass('active');
            $(this).addClass("active");
            $(".chitchat-main .messages").css({
                'background-image': 'url(' + color + ')',
                'background-color': 'transparent'
            });
        });

    /*=====================
        18 custom tab
        ==========================*/
        $(".contact-log-main li , .call-log-main li").on('click', function () {
            $(this).parent().find("li").removeClass("active");
            $(this).addClass("active");
        });
      /*  $("#myTab1 li a").on('click', function () {
            var active_class = $(this).attr("data-to");
            $('.messages.custom-scroll').removeClass("active");
            $('#' + active_class).addClass("active");
        });*/
        $(".chat-tabs .nav-tabs li[data-to]").on('click', function () {
            $('.chitchat-main .tabto').removeClass("active");
            var active_class = $(this).attr("data-to");
            $('.' + active_class).addClass("active");
        });
        $(".sidebar-top  a").on('click', function () {
            $(".sidebar-top  a").removeClass("active");
            $(this).addClass("active");
            $('.dynemic-sidebar').removeClass("active");
            var active_class = $(this).attr("href");
            $('#' + active_class).addClass("active");
        });


    /*=====================
      22. toggle classes
      ==========================*/
      $('.mobile-sidebar').on('click', function () {
        $('.chitchat-container').toggleClass("mobile-menu");
    });
      $('.chat-main .chat-box').on('click', function () {
        $('.chitchat-container').toggleClass("mobile-menu");
    });
      $('.group-main .group-box').on('click', function () {
        $('.chitchat-container').toggleClass("mobile-menu");
    });
      $('.call-log-main .call-box').on('click', function () {
        $('.chitchat-container').toggleClass("mobile-menu");
    });
      $('.contact-log-main .contact-box').on('click', function () {
        $('.chitchat-container').toggleClass("mobile-menu");
    });

      $('.mobile-back').on('click', function () {
        $('.chitchat-container').toggleClass("mobile-menu");
        $('.main-nav').removeClass("on");
    });


      $('.chat-friend-toggle').on('click', function () {
        $('.chat-frind-content').toggle();
    });

      $('.gr-chat-friend-toggle').on('click', function () {
        $('.gr-chat-frind-content').toggle();
    });
      $('.msg-setting').on('click', function () {
        $(this).siblings('.msg-dropdown').toggle();
    });
      $(".favourite").on('click', function () {
        $(this).toggleClass("btn-outline-primary").toggleClass("btn-primary");
    });
      $(".edit-btn").on('click', function () {
        $(this).parent().parent().toggleClass("open");
    });

    /*=====================
        23. ADD tO-DO LIST
        ==========================*/

        $('.add').on('click', function (e) {
            var total_element = $(".element").length;
            var lastid = $(".element:last").attr("id");
            var split_id = lastid.split("_");
            var nextindex = Number(split_id[1]) + 1;
            var max = 100;
            if (total_element < max) {
                $(".element:last").after("<div class='element' id='div_" + nextindex + "'></div>");
                $("#div_" + nextindex).append("<form class='p-15'><div class='form-group' style='display :flex'><input type='checkbox' id='txt_" + nextindex + "'/><input type='text' class='m-l-15'/></div><div class='todo-buttons'><a class='badge badge-success font_label' href='#'' style='padding: 7px 12px'>Save</a><a class='badge badge-outline-primary font_label' href='#'' style='margin-left : 15px;padding: 7px 12px'>Cancel</a><span id='remove_" + nextindex + "' class='remove' style='margin-left : 40px'><i class='fa fa-trash' style='font-size : 20px'></i></span></div></form>");
            }
        });
        $('.todo-list').on('click', '.remove', function () {
            var id = this.id;
            var split_id = id.split("_");
            var deleteindex = split_id[1];
            $("#div_" + deleteindex).remove();
        });

        $('.trashbtn').on('click', function (e) {
            $(".todo-main-content .default-form").remove();
        });

    /*=====================
           24. right sidebar
           ==========================*/
           $(".app-list-ul  a").on('click', function () {
            $(".app-list-ul  a").removeClass("active");
            if ($(window).width() >= 1500) {
                $(".chitchat-main").removeClass("small-sidebar");
            }
            $(this).addClass("active");
            $('.apps-ul li').removeClass("active");
            var active_class = $(this).attr("href");
            $('#' + active_class).addClass("active");
        });

           $('.apps-toggle').on('click', function () {
            if (!$('body').hasClass('sidebar-active main-page menu-active'))
                $('body').toggleClass('sidebar-active main-page');
            $('body').removeClass('menu-active');
            $('.app-sidebar').toggleClass('active');
            $('.chitchat-main').toggleClass("small-sidebar");
        });



    /*=====================
           27. profile open close
           ==========================*/
           $('.menu-trigger, .close-profile').on('click', function (e) {
            $('body').toggleClass('menu-active'); //add class
            $('.app-sidebar').toggleClass('active'); //remove
            $('.chitchat-main').toggleClass("small-sidebar"); //remove
            if($( window ).width() <= 1440 ) {
                $('.chitchat-container').toggleClass('sidebar-overlap');
              $('.chitchat-main').addClass("small-sidebar"); //remove
          }
          if ($('body').hasClass('menu-active')) {
           // $('body').addClass('sidebar-active main-page');
           $('body').addClass('main-page');//custom
            $('.app-sidebar').removeClass('active');
            $('.chitchat-main').removeClass("small-sidebar");
        }

    });
    /*=====================
           28. dropdown
           ==========================*/

           $('.dropdown').click(function () {
            $(this).attr('tabindex', 1).focus();
            $(this).toggleClass('active');
            $(this).find('.dropdown-menu').slideToggle(300);
        });
           $('.dropdown').focusout(function () {
            $(this).removeClass('active');
            $(this).find('.dropdown-menu').slideUp(300);
        });
           $('.dropdown .dropdown-menu li').click(function () {
            $(this).parents('.dropdown').find('span').text($(this).text());
            $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
        });

    /*=====================
        29. Sidebar setting
        ==========================*/

        $(".sidebar-setting .two-column").on('click', function () {
            $(".sidebar-setting li").removeClass('active');
            $(this).addClass("active");
            $('.theme-title .icon-btn').removeClass("btn-outline-light").removeClass("btn-outline-primary");
            $('.main-nav').removeClass("on");
        });
        $(".sidebar-setting .three-column").on('click', function () {
            $(".sidebar-setting li").removeClass('active');
            $(this).addClass("active");
            $('.theme-title .icon-btn').addClass("btn-outline-light").addClass("btn-outline-primary");
            $('.main-nav').addClass("on");
        });

    /*=====================
        Chat 
        ==========================*/

        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
       /* $('.submit').on('click', function() {
            typingMessage();
            newMessage();
        });*/
/*$(window).on('keydown', function(e) {
            if (e.which == 13) {
                if(!e.target.value){
                    return false
                }
                typingMessage();
                newMessage();
                return false;
            }
        });*/

        $(".emojis-sub-contain ul li").click(function () {
            var number = $(this).html();            
            $("#setemoj").focus().val(function() {
               return this.value + number;
               $(".messages").animate({
                scrollTop: $(document).height()
            }, "fast");
           });
            $('#send-msg').removeClass('disabled').removeAttr("disabled")
        });

        
        $('#send-msg').addClass('disabled').attr("disabled", "disabled")
        $("#setemoj").keyup(function(e){
            if(!e.target.value){
                $('#send-msg').addClass('disabled').attr("disabled","disabled")
            } else {
                $('#send-msg').removeClass('disabled').removeAttr("disabled")
            }
        });

        function newMessage() {
            var message = $('.message-input input').val(); 
            if($.trim(message) == '') {
                return false;
            }
            $('<li class="replies"> <div class="media"> <div class="profile mr-4 bg-size" style="background-image: url(&quot;../assets/images/contact/1.jpg&quot;); background-size: cover; background-position: center center;"></div><div class="media-body"> <div class="contact-name"> <h5>Alan josheph</h5> <h6>01:42 AM</h6> <ul class="msg-box"> <li> <h5>' + message + '</h5> </li></ul> </div></div></div></li>').appendTo($('.messages .chatappend'));
            $('.message-input input').val(null);
            $('.chat-main .active .details h6').html('<span>You : </span>' + message);
            $(".messages").animate({ scrollTop: $(document).height() }, "fast");
        };

        function typingMessage() {
          $('<li class="sent last typing-m"> <div class="media"> <div class="profile mr-4 bg-size" style="background-image: url(&quot;../assets/images/contact/2.jpg&quot;); background-size: cover; background-position: center center; display: block;"><img class="bg-img" src="../assets/images/contact/2.jpg" alt="Avatar" style="display: none;"></div><div class="media-body"> <div class="contact-name"> <h5>Josephin water</h5> <h6>01:42 AM</h6> <ul class="msg-box"> <li> <h5> <div class="type"> <div class="typing-loader"></div></div></h5> </li></ul> </div></div></div></li>').appendTo($('.messages .chatappend'));
          $(".messages").animate({ scrollTop: $(document).height() }, "fast");   
          setTimeout(function() {
            $('.typing-m').hide(); 
            $('<li class="sent"> <div class="media"> <div class="profile mr-4 bg-size" style="background-image: url(&quot;../assets/images/contact/2.jpg&quot;); background-size: cover; background-position: center center; display: block;"></div><div class="media-body"> <div class="contact-name"> <h5>Josephin water</h5> <h6>01:35 AM</h6> <ul class="msg-box"> <li> <h5> Sorry its meethalfway  test </h5> <div class="badge badge-success sm ml-2"> R</div></li></ul> </div></div></div></li>').appendTo($('.messages .chatappend'));
            $('.chat-main .active .details h6').html('Sorry its meethalfway  test');
            $(".messages").animate({ scrollTop: $(document).height() }, "fast");   
        }, 2000);
      }



    /*=====================
       25. Sticker
       ==========================*/
       $('.sticker-contain ul li').on('click', function (e) {
        var sticker = $(this).children().html();
        $('<li class="replies"> <div class="media"> <div class="profile mr-4 bg-size" style="background-image: url("../assets/images/contact/1.jpg"); background-size: cover; background-position: center center;"></div><div class="media-body"> <div class="contact-name"> <h5>Alan josheph</h5> <h6>01:42 AM</h6> <ul class="msg-box"> <li> <h5>' + sticker + '</h5> </li></ul> </div></div></div></li>').appendTo($('.messages .chatappend'));
        $('.chat-main .active .details h6').html('<span>You : </span>' + sticker);
        var test = $(this).height();
                $(".messages").animate({

            scrollTop: $(document).height()
        }, "fast");
        $(".sticker-contain").removeClass("open");
        $(".toggle-sticker").removeClass("active");
    });

    // Toggle sticker
    $('.toggle-sticker').on('click', function () {
        $(this).toggleClass("active");
        $('.sticker-contain').toggleClass("open");
        $('.emojis-contain').removeClass("open");
        $(".toggle-emoji").removeClass("active");
        $('.contact-poll-content').css('display', 'none');
    });

    // Toggle emoji
    $('.toggle-emoji').on('click', function (e) {
        e.stopPropagation();
        $(this).toggleClass("active");
        $('.emojis-contain').toggleClass("open");
        $(".sticker-contain").removeClass("open");
        $(".toggle-sticker").removeClass("active");
        $('.contact-poll-content').css('display', 'none');
    });

    // Toggle poll
    $('.contact-poll').on('click', function (e) {
        $('.contact-poll-content').toggle();
        $('.emojis-contain').removeClass("open");
        $(".toggle-emoji, .toggle-sticker").removeClass("active");
    });

    // Outside click
    $(document).on('click', function (e) {
        var outside_space = $(".outside");
        if (!outside_space.is(e.target) &&
            outside_space.has(e.target).length === 0) {
            $(".sticker-contain").removeClass("open");
        $(".emojis-contain").removeClass("open");
        $(".toggle-emoji, .toggle-sticker").removeClass("active");
        $('.contact-poll-content').css('display', 'none');
        $('.chat-frind-content').css('display', 'none');
    }
})

    $(".mode").on("click", function () {
        $('.mode i').toggleClass("fa-moon-o").toggleClass("fa-lightbulb-o");
        $('body').toggleClass("dark");
    });       
    $(".mainnav").on("click", function () {
        $('.theme-title .icon-btn').toggleClass("btn-outline-light").toggleClass("btn-outline-primary");
        $('.main-nav').toggleClass("on");
    }); 
    
    $(".close-apps").on("click", function () {
        $('.apps-ul li').removeClass("active");
        $('.chitchat-main').addClass("small-sidebar");
    });

    $(".close-app").on("click", function () {
        $('body').removeClass("sidebar-active");
        $('.app-sidebar').removeClass("active");
    });
    
    $(".close-panel").on("click", function () {
        $('.dynemic-sidebar, .button-effect.active, sidebar-top .sidebar-top > li > a').removeClass("active");
        $('.recent-default').addClass("active");
    });
    
    $("body").on("click", ".colors li", function () {
        $(this).addClass('active').siblings().removeClass('active');
        var $color = $(this).attr("data-attr");
        $("#color").attr("href", "../assets/css/" + $color + ".css");
        return false;
    });


     /*=====================
   01. Switchery  js
   ==========================*/
   var elem = document.querySelector('.js-switch');
   var init = new Switchery(elem, { color: '#3fcc35', size: 'small' });
   var elem = document.querySelector('.js-switch1');
   var init = new Switchery(elem, { color: '#3fcc35', size: 'small' });
   var elem = document.querySelector('.js-switch2');
   var init = new Switchery(elem, { color: '#3fcc35', size: 'small' });
   var elem = document.querySelector('.js-switch5');



})(jQuery);


