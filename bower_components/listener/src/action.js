import Handlers from './handlers';

// Private symbols.
const __element__ = Symbol();
const __elementScopeMap__ = Symbol();
const __isRegistered__ = Symbol('isRegistered');
const __scopeMap__ = Symbol();
const __register__ = Symbol('register');
const __unregister__ = Symbol('unregister');

class Action {

  /**
   * Helper class for using {{#crossLink "Events"}}{{/crossLink}}.
   * @class Events.Action
   * @constructor
   * @param {Element} element Element to operate on.
   * @param {Object} scope Scope of the registered events.
   */
  constructor(element, scope) {
    this[__element__] = element;

    if (!this[__element__][__scopeMap__]) {
      this[__element__][__scopeMap__] = new Map();
    }

    if (!this[__element__][__scopeMap__].has(scope)) {
      this[__element__][__scopeMap__].set(scope, new Map());
    }

    this[__elementScopeMap__] = this[__element__][__scopeMap__].get(scope);
  }

  /**
   * @method __isRegistered__
   * @param {string} type The type of event to be checked.
   * @param {string} eventName Name of the event to be checked.
   * @private
   */
  [__isRegistered__](type, eventName) {
    if (!this[__elementScopeMap__].get(type)) {
      return false;
    }

    return this[__elementScopeMap__].get(type).has(eventName);
  }

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
  [__register__](type, eventName, handler) {
    if (this[__isRegistered__](type, eventName)) {
      return this;
    }

    Handlers.getRegisterFn(type)(this[__element__], eventName, handler);

    if (!this[__elementScopeMap__].has(type)) {
      this[__elementScopeMap__].set(type, new Map());
    }

    this[__elementScopeMap__].get(type).set(eventName, handler);
    return this;
  }

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
  [__unregister__](type, eventName) {
    if (!type) {
      // Unregisters all events.
      for (let registeredType of this[__elementScopeMap__].keys()) {
        this[__unregister__](registeredType);
      }
      return this;
    }

    let typeMap = this[__elementScopeMap__].get(type);
    if (!typeMap) {
      return this;
    }

    if (!eventName) {
      // Unregisters all events of the given type.
      if (typeMap) {
        for (let event of typeMap.keys()) {
          this[__unregister__](type, event);
        }
      }
      return this;
    }

    let registeredEvent = typeMap.get(eventName);
    if (registeredEvent) {
      // Unregister the given event name.
      Handlers.getUnregisterFn(type)(this[__element__], eventName, registeredEvent);
      this[__elementScopeMap__].get(type).delete(eventName);
    }

    return this;
  }

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
  on(type, eventName, handler) {
    return this[__register__](type, eventName, handler);
  }

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
  off(type, eventName) {
    return this[__unregister__](type, eventName);
  }

  get element() {
    return this[__element__];
  }
}

export default Action;