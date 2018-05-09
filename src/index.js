function ee() {
  if (!(this instanceof ee)) {
    throw new TypeError('Cannot call as a regular function. You need to use the `new` keyword.');
  }

  this.listeners = {};
};

ee.prototype.subscribe = function(eventName, callback) {
  const currentListeners = this.listeners[eventName] || [];

  this.listeners[eventName] = currentListeners
    .filter(element => element.callback !== callback)
    .concat({
      callback: callback,
      once: false,
    });

  return this;
};

ee.prototype.subscribeOnce = function(eventName, callback) {
  const currentListeners = this.listeners[eventName] || [];

  this.listeners[eventName] = currentListeners
    .filter(element => element.callback !== callback)
    .concat({
      callback: callback,
      once: true,
    });
  return this;
};

ee.prototype.emit = function(eventName, ...args) {
  const listeners = this.listeners[eventName];
  if (!listeners || listeners.length === 0) return;

  this.listeners[eventName] = listeners.filter(entry => {
    const callback = entry.callback;
    const once = entry.once;

    setTimeout(() => callback(...args), 0);

    return !once;
  });

  return this;
};

ee.prototype.unsubscribe = function(eventName, callback) {
  const currentListeners = this.listeners[eventName];
  if (!callback) return;

  if (!currentListeners || currentListeners.length === 0) return;

  this.listeners[eventName] = currentListeners
    .filter(element => element.callback !== callback);

  if (this.listeners[eventName].length === 0) delete this.listeners[eventName];

  return this;
};

module.exports = ee;
