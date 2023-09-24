import toString from './toString';

const isGenerator = (fn: unknown): fn is AsyncGenerator<void, void, void> =>
  toString.call(fn) === '[object GeneratorFunction]';

export default isGenerator;
