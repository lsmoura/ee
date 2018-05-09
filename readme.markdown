Simple Event Emitter

# Setup

```javascript
const ee = require('ee');

const emitter = new ee();
````

# Calls

## subscribe

subscribed functions will be called every time the eventName is fired, until
unsubscribed.

subscribing twice will not make the function fire twice, but if the function was
previously subscribedOnce (see below), it will now be a regular subscription.

```javascript
const callback = function (param) {
  const test = param + param;
  console.log(test);
};

emitter.subscribe('test', callback);
```

## subscribeOnce

subscribedOnce functions will be called only once, the next time the eventName
is fired.

`subscribeOnce` twice will not make the function fire twice, but if the function
was previously subscribed (see above) it will now be fired only once.

```javascript
const callbackOnce = function (param) {
  const test = param + param;
  console.log('only once', test);
};

emitter.subscribe('test', callbackOnce);
```

## emit

calls every registered function for the eventName. all extra the arguments
passed will be passed to the subscribers.

Only the first parameter is required.

```
emitter.emit('test', 'foo', 'bar');
```

## unsubscribe

unsubscribe the given callback from the event handler. It works for both regular
subscriptions and `subscribeOnce` subscriptions. It's only relevant to
unsubscribe from `subscribeOnce` subscriptions if the event has not fired.

you can unsubscribe as many times as you want and no error will be raised, it
will just not do anything.

```javascript
const callback = function (param) {
  const test = param + param;
  console.log(test);
};

emitter.subscribe('test', callback);
emitter.unsubscribe('test', callback);
```
