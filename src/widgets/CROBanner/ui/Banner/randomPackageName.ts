export const randomPackageName = (a: number) => {
  const hour = new Date().getHours();
  if (a === 1) return hour % 2 === 0 ? 'Forex' : 'Crypto';
  if (a === 2) return hour % 2 === 0 ? 'Crypto' : 'Stocks';
  return hour % 2 === 0 ? 'Stocks' : 'Forex';
};
