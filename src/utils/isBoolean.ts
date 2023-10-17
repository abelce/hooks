export default (taregt: unknown): taregt is boolean =>
  toString.call(taregt) === '[object Boolean]';
