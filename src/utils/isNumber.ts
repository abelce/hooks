export default (taregt: unknown): taregt is number =>
  toString.call(taregt) === '[object Number]' && !Number.isNaN(taregt);
