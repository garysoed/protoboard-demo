JS library to keep track of events and handles registering and unregistering.

To use this, you must first add register and unregister functions. For example:
```javascript
Handlers
    .add('dom',
        function(element, eventName, handler) {
          element.addEventListener(eventName, handler);
        },
        function(element, eventName, handler) {
          element.removeEventListener(eventName, handler);
        })
    .add('jquery',
        function(element, eventName, handler) {
          $(element).on(eventName, handler);
        },
        function(element, eventName, handler) {
          $(element).off(eventName, handler);
        });
```

After this point, you can register events as follows:

```javascript
Events
    .of(element)
    .on('dom', 'click', handleClick);
```

Every event is registered to a scope, given by the `of` function. This scope is useful during
unregistration:

```javascript
Events.of(element)
    .off('dom')           // Unregisters all 'dom' events
    .off('dom', 'click')  // Unregisters all 'click' events of 'dom' type.
    .off();               // Unregisters all events for this element.
```
