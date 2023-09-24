const isFunction = (fn: unknown): fn is (...args: any) => any =>
  toString.call(fn) === '[object Function]';

export default isFunction;
