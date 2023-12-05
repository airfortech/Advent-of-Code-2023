import { readData } from '../../shared.ts';
import '../../utils/Array.ts';
import chalk from 'chalk';

export async function day5a(dataPath?: string) {
  const data = await readData(dataPath);
  let seeds = data
    .join('\n')
    .match(/seeds: (.*)/)[1]
    .split(' ')
    .toNumbers();
  const maps: string[][] = [];
  data.slice(2).forEach((line) => {
    if (line.endsWith(':')) return maps.push([]);
    if (line !== '') maps.at(-1).push(line);
  });
  const mapNumber = (
    destination: number,
    source: number,
    count: number,
    seed: number
  ): number | null => {
    return seed < source || seed > source + count - 1
      ? null
      : destination + seed - source;
  };
  const numbers = [...seeds];
  for (let i = 0; i < numbers.length; i++) {
    maps.forEach((sets) => {
      sets.every((set) => {
        const source = +set.split(' ')[1];
        const destination = +set.split(' ')[0];
        const count = +set.split(' ')[2];
        const mappedNumber = mapNumber(destination, source, count, numbers[i]);
        if (mappedNumber !== null) {
          numbers[i] = mappedNumber;

          return false;
        }
        return true;
      });
    });
  }
  return Math.min(...numbers);
}

const answer = await day5a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
