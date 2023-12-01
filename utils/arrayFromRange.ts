export const arrayFromRange = (a: number, b: number): number[] => {
  const start = Math.min(a, b);
  const end = Math.max(a, b);
  const arr = new Array(end - start + 1).fill(1).map((_, i) => start + i);
  return b > a ? arr : arr.reverse();
};
