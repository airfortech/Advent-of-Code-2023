const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);
};

export const leastCommonMultiple = (numbers: number[]): number => {
  let result = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    result = lcm(result, numbers[i]);
  }

  return result;
};
