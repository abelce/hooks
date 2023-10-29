export default (taregt: unknown): taregt is string =>
  typeof taregt === 'string';
