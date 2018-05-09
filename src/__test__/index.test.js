/* global require expect describe it jest */
const ee = require('../index');

jest.useFakeTimers();

describe('event emitter', () => {
  it('throw an error when called as function', () => {
    expect(() => ee()).toThrow();
  });

  it('calls the callback function properly', () => {
    const emitter = new ee();
    const mockCallback = jest.fn();
    emitter.subscribe('test', mockCallback);
    expect(mockCallback.mock.calls.length).toBe(0);
    emitter.emit('test');
    jest.runAllTimers();
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  it('does not call a function if we fire the wrong event', () => {
    const emitter = new ee();
    const mockCallback = jest.fn();
    emitter.subscribe('test', mockCallback);
    expect(mockCallback.mock.calls.length).toBe(0);
    emitter.emit('test2');
    jest.runAllTimers();
    expect(mockCallback.mock.calls.length).toBe(0);
  });

  it('calls a function only once when subscribeOnce', () => {
    const emitter = new ee();
    const mockCallback = jest.fn();
    emitter.subscribeOnce('test', mockCallback);
    expect(mockCallback.mock.calls.length).toBe(0);
    emitter.emit('test');
    emitter.emit('test');
    jest.runAllTimers();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});

// const logger = (prefix) => (...args) => console.log(prefix, ...args);
//
// const xLogger = logger('x:');
// const tLogger = logger('t:');
// const oLogger = logger('o:');
//
// const emitter = new ee();
//
// emitter.subscribe('test', tLogger);
// emitter.emit('test', 'hello world 1');
// emitter.subscribe('test', tLogger);
// emitter.emit('test', 'hello world 2');
// emitter.subscribeOnce('test', oLogger);
// emitter.subscribe('test', xLogger);
// emitter.emit('test', 'hello world 3');
// emitter.emit('test2', 'nothing here');
// emitter.emit('test', 'hello world 4');
// emitter.unsubscribe('test', xLogger);
// emitter.emit('test', 'hello world 5');
// emitter.unsubscribe('test', tLogger);
// emitter.emit('test2', 'nothing here (again');
