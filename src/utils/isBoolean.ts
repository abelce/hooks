export default (taregt: unknown): taregt is boolean =>
  typeof taregt === 'boolean';
