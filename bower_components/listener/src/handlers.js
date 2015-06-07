const __data__ = Symbol();

const Handlers = {
  [__data__]: new Map(),

  add(name, registerFn, unregisterFn) {
    this[__data__].set(name, {
      register: registerFn,
      unregister: unregisterFn
    });
    return this;
  },

  getRegisterFn(name) {
    return this[__data__].has(name) ? this[__data__].get(name).register : () => undefined;
  },

  getUnregisterFn(name) {
    return this[__data__].has(name) ? this[__data__].get(name).unregister : () => undefined;
  }
};

export default Handlers;
