export default (taregt: unknown): taregt is number =>
  typeof taregt === 'number' && !Number.isNaN(taregt);
