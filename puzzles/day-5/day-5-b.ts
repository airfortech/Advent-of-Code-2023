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
  const seedsRange: { start: number; range: number }[] = [];
  for (let i = 0; i < seeds.length; i += 2) {
    seedsRange.push({ start: seeds[i], range: seeds[i + 1] });
  }
  const _maps: string[][] = [];
  data.slice(2).forEach((line) => {
    if (line.endsWith(':')) return _maps.push([]);
    if (line !== '') _maps.at(-1).push(line);
  });
  const maps = _maps.map((sets) =>
    sets.map((set) => {
      const source = +set.split(' ')[1];
      const destination = +set.split(' ')[0];
      const count = +set.split(' ')[2];
      return { destination, source, count };
    })
  );
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
  let min = Infinity;
  let timeCounter = 0;
  seedsRange.forEach((seed) => {
    for (let i = seed.start; i < seed.start + seed.range; i++) {
      if (timeCounter % 10000000 === 1) console.time('time');
      if (timeCounter % 10000000 === 0) {
        console.log(new Intl.NumberFormat('pl-PL').format(timeCounter));
        console.timeEnd('time');
      }
      timeCounter++;
      let number = i;
      maps.forEach((sets) => {
        let setNumber = number;
        sets.every(({ destination, source, count }) => {
          const mappedNumber = mapNumber(destination, source, count, number);
          if (mappedNumber !== null) {
            setNumber = mappedNumber;

            return false;
          }
          return true;
        });
        number = setNumber;
      });
      if (number < min) min = number;
    }
  });
  return min;
}

console.time('TotalTime');
const answer = await day5a();
console.timeEnd('TotalTime');
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
