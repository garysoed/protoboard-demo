import Action from './action';
import Handlers from './handlers';

// Private symbols.
const __registryRef__ = Symbol();

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

let Events = {
  /**
   * Creates an Events object that operates on the given element with the given scope.
   *
   * @method of
   * @param {Element} element The element to operate on.
   * @param {Object} scope Scope of the registered events.
   * @return {Events.Action} Chainable action object.
   * @static
   */
  of(element, scope) {
    return new Action(element, scope);
  }
};

export default Events;