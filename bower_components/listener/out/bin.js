(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Handlers = require('./handlers');

var _Handlers2 = _interopRequireWildcard(_Handlers);

// Private symbols.
var __element__ = Symbol();
var __elementScopeMap__ = Symbol();
var __isRegistered__ = Symbol('isRegistered');
var __scopeMap__ = Symbol();
var __register__ = Symbol('register');
var __unregister__ = Symbol('unregister');

var Action = (function () {

  /**
   * Helper class for using {{#crossLink "Events"}}{{/crossLink}}.
   * @class Events.Action
   * @constructor
   * @param {Element} element Element to operate on.
   * @param {Object} scope Scope of the registered events.
   */

  function Action(element, scope) {
    _classCallCheck(this, Action);

    this[__element__] = element;

    if (!this[__element__][__scopeMap__]) {
      this[__element__][__scopeMap__] = new Map();
    }

    if (!this[__element__][__scopeMap__].has(scope)) {
      this[__element__][__scopeMap__].set(scope, new Map());
    }

    this[__elementScopeMap__] = this[__element__][__scopeMap__].get(scope);
  }

  _createClass(Action, [{
    key: __isRegistered__,

    /**
     * @method __isRegistered__
     * @param {string} type The type of event to be checked.
     * @param {string} eventName Name of the event to be checked.
     * @private
     */
    value: function (type, eventName) {
      if (!this[__elementScopeMap__].get(type)) {
        return false;
      }

      return this[__elementScopeMap__].get(type).has(eventName);
    }
  }, {
    key: __register__,

    /**
     * Registers the given handler to the given event name for the given type.
     *
     * @method __register__
     * @param {string} type The type of event to register the handler to.
     * @param {string} eventName Name of the event to register the handler to.
     * @param {Function} handler Handler to be called for the given event.
     * @return {Events} The Events object for chaining.
     * @private
     */
    value: function (type, eventName, handler) {
      if (this[__isRegistered__](type, eventName)) {
        return this;
      }

      _Handlers2['default'].getRegisterFn(type)(this[__element__], eventName, handler);

      if (!this[__elementScopeMap__].has(type)) {
        this[__elementScopeMap__].set(type, new Map());
      }

      this[__elementScopeMap__].get(type).set(eventName, handler);
      return this;
    }
  }, {
    key: __unregister__,

    /**
     * Unregisters the handlers in the scope for the element.
     *
     * - If only type and eventName are given, all handlers listening to that event name of that type
     *   will be unregistered.
     * - If only type is given, all handlers listening for that type will be unregistered.
     * - If nothing is given, all handlers in the scope will be unregistered.
     *
     * @method __unregister__
     * @param {string=} type Type of event to unregister.
     * @param {string=} eventName If given, all handlers listening to this event will be
     *     unregistered.
     * @return {!Events} The Events object for chaining.
     * @private
     */
    value: function (type, eventName) {
      if (!type) {
        // Unregisters all events.
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this[__elementScopeMap__].keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var registeredType = _step.value;

            this[__unregister__](registeredType);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return this;
      }

      var typeMap = this[__elementScopeMap__].get(type);
      if (!typeMap) {
        return this;
      }

      if (!eventName) {
        // Unregisters all events of the given type.
        if (typeMap) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = typeMap.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _event = _step2.value;

              this[__unregister__](type, _event);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                _iterator2['return']();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
        return this;
      }

      var registeredEvent = typeMap.get(eventName);
      if (registeredEvent) {
        // Unregister the given event name.
        _Handlers2['default'].getUnregisterFn(type)(this[__element__], eventName, registeredEvent);
        this[__elementScopeMap__].get(type)['delete'](eventName);
      }

      return this;
    }
  }, {
    key: 'on',

    /**
     * Calls on method of the corresponding type on the element, registering the given event name
     * and handler.
     *
     * @method on
     * @param {string} type The registration type.
     * @param {string} eventName Name of the event to register the handler to.
     * @param {Function} handler Handler to be called for the given event.
     * @return {Events.Action} The Action object for chaining.
     */
    value: function on(type, eventName, handler) {
      return this[__register__](type, eventName, handler);
    }
  }, {
    key: 'off',

    /**
     * Calls off method of the corresponding type on the element, unregistering the handlers in the
     * scope for the element.
     *
     * - If eventName is given, all handlers listening to that event name will be unlistened.
     * - If nothing is given, all handlers in the scope will be unlistened.
     *
     * @method off
     * @param {string} type The registration type.
     * @param {string} [eventName] If given, all handlers listening to this event will be
     *     unlistened.
     * @return {Events.Action} The Action object for chaining.
     */
    value: function off(type, eventName) {
      return this[__unregister__](type, eventName);
    }
  }, {
    key: 'element',
    get: function () {
      return this[__element__];
    }
  }]);

  return Action;
})();

exports['default'] = Action;
module.exports = exports['default'];

},{"./handlers":3}],2:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Action = require('./action');

var _Action2 = _interopRequireWildcard(_Action);

var _Handlers = require('./handlers');

var _Handlers2 = _interopRequireWildcard(_Handlers);

// Private symbols.
var __registryRef__ = Symbol();

/**
 * For a given scope object, only one handler can be bound to an event type.
 *
 * ```javascript
 * var scope = {};
 *
 * // Add register and unregister functions
 * Handlers
 *     .add('dom',
 *         function(element, eventName, handler) {
 *           element.addEventListener(eventName, handler);
 *         },
 *         function(element, eventName, handler) {
 *           element.removeEventListener(eventName, handler);
 *         })
 *     .add('jquery',
 *         function(element, eventName, handler) {
 *           $(element).on(eventName, handler);
 *         },
 *         function(element, eventName, handler) {
 *           $(element).off(eventName, handler);
 *         });
 *
 * // Register for events.
 * Events.of(element, scope)
 *     .on('dom', 'click', handleClick)         // Handles DOM click event.
 *     .on('jquery', 'mouseup', handleMouseUp); // Handles mouseup event through JQuery.
 *
 * // Unregister events in the given scope.
 * Events.of(element, scope)
 *     .off('jquery')         // Unregisters all JQuery events.
 *     .off('dom', 'click')   // Unregisters all DOM click events.
 *     .off();                // Unregisters all events in this scope.
 * ```
 *
 * @class Events
 * @static
 */

var Events = {
  /**
   * Creates an Events object that operates on the given element with the given scope.
   *
   * @method of
   * @param {Element} element The element to operate on.
   * @param {Object} scope Scope of the registered events.
   * @return {Events.Action} Chainable action object.
   * @static
   */
  of: function of(element, scope) {
    return new _Action2['default'](element, scope);
  }
};

exports['default'] = Events;
module.exports = exports['default'];

},{"./action":1,"./handlers":3}],3:[function(require,module,exports){
"use strict";

var _Handlers;

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: key == null || typeof Symbol == "undefined" || key.constructor !== Symbol, configurable: true, writable: true }); };

Object.defineProperty(exports, "__esModule", {
  value: true
});
var __data__ = Symbol();

var Handlers = (_Handlers = {}, _defineProperty(_Handlers, __data__, new Map()), _defineProperty(_Handlers, "add", function add(name, registerFn, unregisterFn) {
  this[__data__].set(name, {
    register: registerFn,
    unregister: unregisterFn
  });
  return this;
}), _defineProperty(_Handlers, "getRegisterFn", function getRegisterFn(name) {
  return this[__data__].has(name) ? this[__data__].get(name).register : function () {
    return undefined;
  };
}), _defineProperty(_Handlers, "getUnregisterFn", function getUnregisterFn(name) {
  return this[__data__].has(name) ? this[__data__].get(name).unregister : function () {
    return undefined;
  };
}), _Handlers);

exports["default"] = Handlers;
module.exports = exports["default"];

},{}],4:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _Action = require('./action');

var _Action2 = _interopRequireWildcard(_Action);

var _Events = require('./events');

var _Events2 = _interopRequireWildcard(_Events);

var _Handlers = require('./handlers');

var _Handlers2 = _interopRequireWildcard(_Handlers);

(function (window) {
  window.Events = _Events2['default'];
  window.Events.Action = _Action2['default'];
  window.Events.Handlers = _Handlers2['default'];
})(window);

},{"./action":1,"./events":2,"./handlers":3}]},{},[4])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZ3NvZWQvcHJvai9saXN0ZW5lci9zcmMvYWN0aW9uLmpzIiwiL1VzZXJzL2dzb2VkL3Byb2ovbGlzdGVuZXIvc3JjL2V2ZW50cy5qcyIsIi9Vc2Vycy9nc29lZC9wcm9qL2xpc3RlbmVyL3NyYy9oYW5kbGVycy5qcyIsIi9Vc2Vycy9nc29lZC9wcm9qL2xpc3RlbmVyL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozt3QkNBcUIsWUFBWTs7Ozs7QUFHakMsSUFBTSxXQUFXLEdBQUcsTUFBTSxFQUFFLENBQUM7QUFDN0IsSUFBTSxtQkFBbUIsR0FBRyxNQUFNLEVBQUUsQ0FBQztBQUNyQyxJQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNoRCxJQUFNLFlBQVksR0FBRyxNQUFNLEVBQUUsQ0FBQztBQUM5QixJQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDeEMsSUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDOztJQUV0QyxNQUFNOzs7Ozs7Ozs7O0FBU0MsV0FUUCxNQUFNLENBU0UsT0FBTyxFQUFFLEtBQUssRUFBRTswQkFUeEIsTUFBTTs7QUFVUixRQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsT0FBTyxDQUFDOztBQUU1QixRQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFO0FBQ3BDLFVBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0tBQzdDOztBQUVELFFBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQy9DLFVBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztLQUN2RDs7QUFFRCxRQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQ3hFOztlQXJCRyxNQUFNO1NBNkJULGdCQUFnQjs7Ozs7Ozs7V0FBQyxVQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7QUFDbEMsVUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUN4QyxlQUFPLEtBQUssQ0FBQztPQUNkOztBQUVELGFBQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUMzRDs7U0FZQSxZQUFZOzs7Ozs7Ozs7Ozs7V0FBQyxVQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFO0FBQ3ZDLFVBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxFQUFFO0FBQzNDLGVBQU8sSUFBSSxDQUFDO09BQ2I7O0FBRUQsNEJBQVMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7O0FBRXBFLFVBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDeEMsWUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7T0FDaEQ7O0FBRUQsVUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDNUQsYUFBTyxJQUFJLENBQUM7S0FDYjs7U0FpQkEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FBQyxVQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7QUFDaEMsVUFBSSxDQUFDLElBQUksRUFBRTs7Ozs7OztBQUVULCtCQUEyQixJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLEVBQUUsOEhBQUU7Z0JBQXBELGNBQWM7O0FBQ3JCLGdCQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7V0FDdEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRCxlQUFPLElBQUksQ0FBQztPQUNiOztBQUVELFVBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsRCxVQUFJLENBQUMsT0FBTyxFQUFFO0FBQ1osZUFBTyxJQUFJLENBQUM7T0FDYjs7QUFFRCxVQUFJLENBQUMsU0FBUyxFQUFFOztBQUVkLFlBQUksT0FBTyxFQUFFOzs7Ozs7QUFDWCxrQ0FBa0IsT0FBTyxDQUFDLElBQUksRUFBRSxtSUFBRTtrQkFBekIsTUFBSzs7QUFDWixrQkFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksRUFBRSxNQUFLLENBQUMsQ0FBQzthQUNuQzs7Ozs7Ozs7Ozs7Ozs7O1NBQ0Y7QUFDRCxlQUFPLElBQUksQ0FBQztPQUNiOztBQUVELFVBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDN0MsVUFBSSxlQUFlLEVBQUU7O0FBRW5CLDhCQUFTLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQzlFLFlBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO09BQ3ZEOztBQUVELGFBQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7Ozs7Ozs7Ozs7O1dBWUMsWUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRTtBQUMzQixhQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3JEOzs7Ozs7Ozs7Ozs7Ozs7OztXQWVFLGFBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUNuQixhQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDOUM7OztTQUVVLFlBQUc7QUFDWixhQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUMxQjs7O1NBaEpHLE1BQU07OztxQkFtSkcsTUFBTTs7Ozs7Ozs7Ozs7O3NCQzdKRixVQUFVOzs7O3dCQUNSLFlBQVk7Ozs7O0FBR2pDLElBQU0sZUFBZSxHQUFHLE1BQU0sRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlDakMsSUFBSSxNQUFNLEdBQUc7Ozs7Ozs7Ozs7QUFVWCxJQUFFLEVBQUEsWUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ2pCLFdBQU8sd0JBQVcsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0dBQ25DO0NBQ0YsQ0FBQzs7cUJBRWEsTUFBTTs7Ozs7Ozs7Ozs7OztBQzVEckIsSUFBTSxRQUFRLEdBQUcsTUFBTSxFQUFFLENBQUM7O0FBRTFCLElBQU0sUUFBUSwrQ0FDWCxRQUFRLEVBQUcsSUFBSSxHQUFHLEVBQUUscUNBRWxCLGFBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUU7QUFDbEMsTUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7QUFDdkIsWUFBUSxFQUFFLFVBQVU7QUFDcEIsY0FBVSxFQUFFLFlBQVk7R0FDekIsQ0FBQyxDQUFDO0FBQ0gsU0FBTyxJQUFJLENBQUM7Q0FDYiwrQ0FFWSx1QkFBQyxJQUFJLEVBQUU7QUFDbEIsU0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxHQUFHO1dBQU0sU0FBUztHQUFBLENBQUM7Q0FDdkYsaURBRWMseUJBQUMsSUFBSSxFQUFFO0FBQ3BCLFNBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsR0FBRztXQUFNLFNBQVM7R0FBQSxDQUFDO0NBQ3pGLGFBQ0YsQ0FBQzs7cUJBRWEsUUFBUTs7Ozs7Ozs7c0JDdEJKLFVBQVU7Ozs7c0JBQ1YsVUFBVTs7Ozt3QkFDUixZQUFZOzs7O0FBRWpDLENBQUMsVUFBQyxNQUFNLEVBQUs7QUFDWCxRQUFNLE9BQVUsc0JBQVMsQ0FBQztBQUMxQixRQUFNLE9BQVUsT0FBVSxzQkFBUyxDQUFDO0FBQ3BDLFFBQU0sT0FBVSxTQUFZLHdCQUFXLENBQUM7Q0FDekMsQ0FBQSxDQUFFLE1BQU0sQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBIYW5kbGVycyBmcm9tICcuL2hhbmRsZXJzJztcblxuLy8gUHJpdmF0ZSBzeW1ib2xzLlxuY29uc3QgX19lbGVtZW50X18gPSBTeW1ib2woKTtcbmNvbnN0IF9fZWxlbWVudFNjb3BlTWFwX18gPSBTeW1ib2woKTtcbmNvbnN0IF9faXNSZWdpc3RlcmVkX18gPSBTeW1ib2woJ2lzUmVnaXN0ZXJlZCcpO1xuY29uc3QgX19zY29wZU1hcF9fID0gU3ltYm9sKCk7XG5jb25zdCBfX3JlZ2lzdGVyX18gPSBTeW1ib2woJ3JlZ2lzdGVyJyk7XG5jb25zdCBfX3VucmVnaXN0ZXJfXyA9IFN5bWJvbCgndW5yZWdpc3RlcicpO1xuXG5jbGFzcyBBY3Rpb24ge1xuXG4gIC8qKlxuICAgKiBIZWxwZXIgY2xhc3MgZm9yIHVzaW5nIHt7I2Nyb3NzTGluayBcIkV2ZW50c1wifX17ey9jcm9zc0xpbmt9fS5cbiAgICogQGNsYXNzIEV2ZW50cy5BY3Rpb25cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBFbGVtZW50IHRvIG9wZXJhdGUgb24uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZSBTY29wZSBvZiB0aGUgcmVnaXN0ZXJlZCBldmVudHMuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzY29wZSkge1xuICAgIHRoaXNbX19lbGVtZW50X19dID0gZWxlbWVudDtcblxuICAgIGlmICghdGhpc1tfX2VsZW1lbnRfX11bX19zY29wZU1hcF9fXSkge1xuICAgICAgdGhpc1tfX2VsZW1lbnRfX11bX19zY29wZU1hcF9fXSA9IG5ldyBNYXAoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXNbX19lbGVtZW50X19dW19fc2NvcGVNYXBfX10uaGFzKHNjb3BlKSkge1xuICAgICAgdGhpc1tfX2VsZW1lbnRfX11bX19zY29wZU1hcF9fXS5zZXQoc2NvcGUsIG5ldyBNYXAoKSk7XG4gICAgfVxuXG4gICAgdGhpc1tfX2VsZW1lbnRTY29wZU1hcF9fXSA9IHRoaXNbX19lbGVtZW50X19dW19fc2NvcGVNYXBfX10uZ2V0KHNjb3BlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9faXNSZWdpc3RlcmVkX19cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVGhlIHR5cGUgb2YgZXZlbnQgdG8gYmUgY2hlY2tlZC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSBOYW1lIG9mIHRoZSBldmVudCB0byBiZSBjaGVja2VkLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgW19faXNSZWdpc3RlcmVkX19dKHR5cGUsIGV2ZW50TmFtZSkge1xuICAgIGlmICghdGhpc1tfX2VsZW1lbnRTY29wZU1hcF9fXS5nZXQodHlwZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1tfX2VsZW1lbnRTY29wZU1hcF9fXS5nZXQodHlwZSkuaGFzKGV2ZW50TmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIHRoZSBnaXZlbiBoYW5kbGVyIHRvIHRoZSBnaXZlbiBldmVudCBuYW1lIGZvciB0aGUgZ2l2ZW4gdHlwZS5cbiAgICpcbiAgICogQG1ldGhvZCBfX3JlZ2lzdGVyX19cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVGhlIHR5cGUgb2YgZXZlbnQgdG8gcmVnaXN0ZXIgdGhlIGhhbmRsZXIgdG8uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgTmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVnaXN0ZXIgdGhlIGhhbmRsZXIgdG8uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXIgSGFuZGxlciB0byBiZSBjYWxsZWQgZm9yIHRoZSBnaXZlbiBldmVudC5cbiAgICogQHJldHVybiB7RXZlbnRzfSBUaGUgRXZlbnRzIG9iamVjdCBmb3IgY2hhaW5pbmcuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBbX19yZWdpc3Rlcl9fXSh0eXBlLCBldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICBpZiAodGhpc1tfX2lzUmVnaXN0ZXJlZF9fXSh0eXBlLCBldmVudE5hbWUpKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBIYW5kbGVycy5nZXRSZWdpc3RlckZuKHR5cGUpKHRoaXNbX19lbGVtZW50X19dLCBldmVudE5hbWUsIGhhbmRsZXIpO1xuXG4gICAgaWYgKCF0aGlzW19fZWxlbWVudFNjb3BlTWFwX19dLmhhcyh0eXBlKSkge1xuICAgICAgdGhpc1tfX2VsZW1lbnRTY29wZU1hcF9fXS5zZXQodHlwZSwgbmV3IE1hcCgpKTtcbiAgICB9XG5cbiAgICB0aGlzW19fZWxlbWVudFNjb3BlTWFwX19dLmdldCh0eXBlKS5zZXQoZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnJlZ2lzdGVycyB0aGUgaGFuZGxlcnMgaW4gdGhlIHNjb3BlIGZvciB0aGUgZWxlbWVudC5cbiAgICpcbiAgICogLSBJZiBvbmx5IHR5cGUgYW5kIGV2ZW50TmFtZSBhcmUgZ2l2ZW4sIGFsbCBoYW5kbGVycyBsaXN0ZW5pbmcgdG8gdGhhdCBldmVudCBuYW1lIG9mIHRoYXQgdHlwZVxuICAgKiAgIHdpbGwgYmUgdW5yZWdpc3RlcmVkLlxuICAgKiAtIElmIG9ubHkgdHlwZSBpcyBnaXZlbiwgYWxsIGhhbmRsZXJzIGxpc3RlbmluZyBmb3IgdGhhdCB0eXBlIHdpbGwgYmUgdW5yZWdpc3RlcmVkLlxuICAgKiAtIElmIG5vdGhpbmcgaXMgZ2l2ZW4sIGFsbCBoYW5kbGVycyBpbiB0aGUgc2NvcGUgd2lsbCBiZSB1bnJlZ2lzdGVyZWQuXG4gICAqXG4gICAqIEBtZXRob2QgX191bnJlZ2lzdGVyX19cbiAgICogQHBhcmFtIHtzdHJpbmc9fSB0eXBlIFR5cGUgb2YgZXZlbnQgdG8gdW5yZWdpc3Rlci5cbiAgICogQHBhcmFtIHtzdHJpbmc9fSBldmVudE5hbWUgSWYgZ2l2ZW4sIGFsbCBoYW5kbGVycyBsaXN0ZW5pbmcgdG8gdGhpcyBldmVudCB3aWxsIGJlXG4gICAqICAgICB1bnJlZ2lzdGVyZWQuXG4gICAqIEByZXR1cm4geyFFdmVudHN9IFRoZSBFdmVudHMgb2JqZWN0IGZvciBjaGFpbmluZy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIFtfX3VucmVnaXN0ZXJfX10odHlwZSwgZXZlbnROYW1lKSB7XG4gICAgaWYgKCF0eXBlKSB7XG4gICAgICAvLyBVbnJlZ2lzdGVycyBhbGwgZXZlbnRzLlxuICAgICAgZm9yIChsZXQgcmVnaXN0ZXJlZFR5cGUgb2YgdGhpc1tfX2VsZW1lbnRTY29wZU1hcF9fXS5rZXlzKCkpIHtcbiAgICAgICAgdGhpc1tfX3VucmVnaXN0ZXJfX10ocmVnaXN0ZXJlZFR5cGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbGV0IHR5cGVNYXAgPSB0aGlzW19fZWxlbWVudFNjb3BlTWFwX19dLmdldCh0eXBlKTtcbiAgICBpZiAoIXR5cGVNYXApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICghZXZlbnROYW1lKSB7XG4gICAgICAvLyBVbnJlZ2lzdGVycyBhbGwgZXZlbnRzIG9mIHRoZSBnaXZlbiB0eXBlLlxuICAgICAgaWYgKHR5cGVNYXApIHtcbiAgICAgICAgZm9yIChsZXQgZXZlbnQgb2YgdHlwZU1hcC5rZXlzKCkpIHtcbiAgICAgICAgICB0aGlzW19fdW5yZWdpc3Rlcl9fXSh0eXBlLCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGxldCByZWdpc3RlcmVkRXZlbnQgPSB0eXBlTWFwLmdldChldmVudE5hbWUpO1xuICAgIGlmIChyZWdpc3RlcmVkRXZlbnQpIHtcbiAgICAgIC8vIFVucmVnaXN0ZXIgdGhlIGdpdmVuIGV2ZW50IG5hbWUuXG4gICAgICBIYW5kbGVycy5nZXRVbnJlZ2lzdGVyRm4odHlwZSkodGhpc1tfX2VsZW1lbnRfX10sIGV2ZW50TmFtZSwgcmVnaXN0ZXJlZEV2ZW50KTtcbiAgICAgIHRoaXNbX19lbGVtZW50U2NvcGVNYXBfX10uZ2V0KHR5cGUpLmRlbGV0ZShldmVudE5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxzIG9uIG1ldGhvZCBvZiB0aGUgY29ycmVzcG9uZGluZyB0eXBlIG9uIHRoZSBlbGVtZW50LCByZWdpc3RlcmluZyB0aGUgZ2l2ZW4gZXZlbnQgbmFtZVxuICAgKiBhbmQgaGFuZGxlci5cbiAgICpcbiAgICogQG1ldGhvZCBvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUaGUgcmVnaXN0cmF0aW9uIHR5cGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgTmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVnaXN0ZXIgdGhlIGhhbmRsZXIgdG8uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXIgSGFuZGxlciB0byBiZSBjYWxsZWQgZm9yIHRoZSBnaXZlbiBldmVudC5cbiAgICogQHJldHVybiB7RXZlbnRzLkFjdGlvbn0gVGhlIEFjdGlvbiBvYmplY3QgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgb24odHlwZSwgZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgcmV0dXJuIHRoaXNbX19yZWdpc3Rlcl9fXSh0eXBlLCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxzIG9mZiBtZXRob2Qgb2YgdGhlIGNvcnJlc3BvbmRpbmcgdHlwZSBvbiB0aGUgZWxlbWVudCwgdW5yZWdpc3RlcmluZyB0aGUgaGFuZGxlcnMgaW4gdGhlXG4gICAqIHNjb3BlIGZvciB0aGUgZWxlbWVudC5cbiAgICpcbiAgICogLSBJZiBldmVudE5hbWUgaXMgZ2l2ZW4sIGFsbCBoYW5kbGVycyBsaXN0ZW5pbmcgdG8gdGhhdCBldmVudCBuYW1lIHdpbGwgYmUgdW5saXN0ZW5lZC5cbiAgICogLSBJZiBub3RoaW5nIGlzIGdpdmVuLCBhbGwgaGFuZGxlcnMgaW4gdGhlIHNjb3BlIHdpbGwgYmUgdW5saXN0ZW5lZC5cbiAgICpcbiAgICogQG1ldGhvZCBvZmZcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVGhlIHJlZ2lzdHJhdGlvbiB0eXBlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2V2ZW50TmFtZV0gSWYgZ2l2ZW4sIGFsbCBoYW5kbGVycyBsaXN0ZW5pbmcgdG8gdGhpcyBldmVudCB3aWxsIGJlXG4gICAqICAgICB1bmxpc3RlbmVkLlxuICAgKiBAcmV0dXJuIHtFdmVudHMuQWN0aW9ufSBUaGUgQWN0aW9uIG9iamVjdCBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBvZmYodHlwZSwgZXZlbnROYW1lKSB7XG4gICAgcmV0dXJuIHRoaXNbX191bnJlZ2lzdGVyX19dKHR5cGUsIGV2ZW50TmFtZSk7XG4gIH1cblxuICBnZXQgZWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpc1tfX2VsZW1lbnRfX107XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWN0aW9uOyIsImltcG9ydCBBY3Rpb24gZnJvbSAnLi9hY3Rpb24nO1xuaW1wb3J0IEhhbmRsZXJzIGZyb20gJy4vaGFuZGxlcnMnO1xuXG4vLyBQcml2YXRlIHN5bWJvbHMuXG5jb25zdCBfX3JlZ2lzdHJ5UmVmX18gPSBTeW1ib2woKTtcblxuLyoqXG4gKiBGb3IgYSBnaXZlbiBzY29wZSBvYmplY3QsIG9ubHkgb25lIGhhbmRsZXIgY2FuIGJlIGJvdW5kIHRvIGFuIGV2ZW50IHR5cGUuXG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogdmFyIHNjb3BlID0ge307XG4gKlxuICogLy8gQWRkIHJlZ2lzdGVyIGFuZCB1bnJlZ2lzdGVyIGZ1bmN0aW9uc1xuICogSGFuZGxlcnNcbiAqICAgICAuYWRkKCdkb20nLFxuICogICAgICAgICBmdW5jdGlvbihlbGVtZW50LCBldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAqICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAqICAgICAgICAgfSxcbiAqICAgICAgICAgZnVuY3Rpb24oZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gKiAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gKiAgICAgICAgIH0pXG4gKiAgICAgLmFkZCgnanF1ZXJ5JyxcbiAqICAgICAgICAgZnVuY3Rpb24oZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gKiAgICAgICAgICAgJChlbGVtZW50KS5vbihldmVudE5hbWUsIGhhbmRsZXIpO1xuICogICAgICAgICB9LFxuICogICAgICAgICBmdW5jdGlvbihlbGVtZW50LCBldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAqICAgICAgICAgICAkKGVsZW1lbnQpLm9mZihldmVudE5hbWUsIGhhbmRsZXIpO1xuICogICAgICAgICB9KTtcbiAqXG4gKiAvLyBSZWdpc3RlciBmb3IgZXZlbnRzLlxuICogRXZlbnRzLm9mKGVsZW1lbnQsIHNjb3BlKVxuICogICAgIC5vbignZG9tJywgJ2NsaWNrJywgaGFuZGxlQ2xpY2spICAgICAgICAgLy8gSGFuZGxlcyBET00gY2xpY2sgZXZlbnQuXG4gKiAgICAgLm9uKCdqcXVlcnknLCAnbW91c2V1cCcsIGhhbmRsZU1vdXNlVXApOyAvLyBIYW5kbGVzIG1vdXNldXAgZXZlbnQgdGhyb3VnaCBKUXVlcnkuXG4gKlxuICogLy8gVW5yZWdpc3RlciBldmVudHMgaW4gdGhlIGdpdmVuIHNjb3BlLlxuICogRXZlbnRzLm9mKGVsZW1lbnQsIHNjb3BlKVxuICogICAgIC5vZmYoJ2pxdWVyeScpICAgICAgICAgLy8gVW5yZWdpc3RlcnMgYWxsIEpRdWVyeSBldmVudHMuXG4gKiAgICAgLm9mZignZG9tJywgJ2NsaWNrJykgICAvLyBVbnJlZ2lzdGVycyBhbGwgRE9NIGNsaWNrIGV2ZW50cy5cbiAqICAgICAub2ZmKCk7ICAgICAgICAgICAgICAgIC8vIFVucmVnaXN0ZXJzIGFsbCBldmVudHMgaW4gdGhpcyBzY29wZS5cbiAqIGBgYFxuICpcbiAqIEBjbGFzcyBFdmVudHNcbiAqIEBzdGF0aWNcbiAqL1xuXG5sZXQgRXZlbnRzID0ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhbiBFdmVudHMgb2JqZWN0IHRoYXQgb3BlcmF0ZXMgb24gdGhlIGdpdmVuIGVsZW1lbnQgd2l0aCB0aGUgZ2l2ZW4gc2NvcGUuXG4gICAqXG4gICAqIEBtZXRob2Qgb2ZcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIG9wZXJhdGUgb24uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZSBTY29wZSBvZiB0aGUgcmVnaXN0ZXJlZCBldmVudHMuXG4gICAqIEByZXR1cm4ge0V2ZW50cy5BY3Rpb259IENoYWluYWJsZSBhY3Rpb24gb2JqZWN0LlxuICAgKiBAc3RhdGljXG4gICAqL1xuICBvZihlbGVtZW50LCBzY29wZSkge1xuICAgIHJldHVybiBuZXcgQWN0aW9uKGVsZW1lbnQsIHNjb3BlKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRzOyIsImNvbnN0IF9fZGF0YV9fID0gU3ltYm9sKCk7XG5cbmNvbnN0IEhhbmRsZXJzID0ge1xuICBbX19kYXRhX19dOiBuZXcgTWFwKCksXG5cbiAgYWRkKG5hbWUsIHJlZ2lzdGVyRm4sIHVucmVnaXN0ZXJGbikge1xuICAgIHRoaXNbX19kYXRhX19dLnNldChuYW1lLCB7XG4gICAgICByZWdpc3RlcjogcmVnaXN0ZXJGbixcbiAgICAgIHVucmVnaXN0ZXI6IHVucmVnaXN0ZXJGblxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldFJlZ2lzdGVyRm4obmFtZSkge1xuICAgIHJldHVybiB0aGlzW19fZGF0YV9fXS5oYXMobmFtZSkgPyB0aGlzW19fZGF0YV9fXS5nZXQobmFtZSkucmVnaXN0ZXIgOiAoKSA9PiB1bmRlZmluZWQ7XG4gIH0sXG5cbiAgZ2V0VW5yZWdpc3RlckZuKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpc1tfX2RhdGFfX10uaGFzKG5hbWUpID8gdGhpc1tfX2RhdGFfX10uZ2V0KG5hbWUpLnVucmVnaXN0ZXIgOiAoKSA9PiB1bmRlZmluZWQ7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhhbmRsZXJzO1xuIiwiaW1wb3J0IEFjdGlvbiBmcm9tICcuL2FjdGlvbic7XG5pbXBvcnQgRXZlbnRzIGZyb20gJy4vZXZlbnRzJztcbmltcG9ydCBIYW5kbGVycyBmcm9tICcuL2hhbmRsZXJzJztcblxuKCh3aW5kb3cpID0+IHtcbiAgd2luZG93WydFdmVudHMnXSA9IEV2ZW50cztcbiAgd2luZG93WydFdmVudHMnXVsnQWN0aW9uJ10gPSBBY3Rpb247XG4gIHdpbmRvd1snRXZlbnRzJ11bJ0hhbmRsZXJzJ10gPSBIYW5kbGVycztcbn0pKHdpbmRvdyk7Il19
