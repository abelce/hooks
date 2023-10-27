const isFunction = (fn: unknown): fn is (...args: any) => any =>
  typeof fn === 'function';

export default isFunction;
