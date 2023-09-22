export default (taregt: any) =>
  typeof taregt === 'number' && !Number.isNaN(taregt);
