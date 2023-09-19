import { Noop } from '../types';

const isFunction = (fn: Noop) => typeof fn === 'function';

export default isFunction;
