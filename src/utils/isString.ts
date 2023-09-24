export default (taregt: unknown): taregt is string =>
  toString.call(taregt) === '[object String]';
