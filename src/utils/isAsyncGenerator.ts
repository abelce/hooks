import isFunction from './isFunction';

const isAsyncGenerator = (
  val: AsyncGenerator<unknown, any, unknown> | Promise<any>,
): val is AsyncGenerator<unknown, any, unknown> => {
  return isFunction(
    (val as AsyncGenerator<unknown, any, unknown>)[Symbol.asyncIterator],
  );
};

export default isAsyncGenerator;
