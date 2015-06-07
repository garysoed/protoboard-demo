import Action from './action';
import Events from './events';
import Handlers from './handlers';

((window) => {
  window['Events'] = Events;
  window['Events']['Action'] = Action;
  window['Events']['Handlers'] = Handlers;
})(window);