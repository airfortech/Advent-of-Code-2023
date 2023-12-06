import { readData } from '../../shared.ts';
import '../../utils/Array.ts';
import chalk from 'chalk';

export async function day6a(dataPath?: string) {
  const data = await readData(dataPath);
  const times = data[0].split(':')[1].split(/\s+/).filter(Boolean).toNumbers();
  const distances = data[1]
    .split(':')[1]
    .split(/\s+/)
    .filter(Boolean)
    .toNumbers();
  const racesRecords = Array(times.length)
    .fill(null)
    .map((_, i) => {
      return { time: times[i], distance: distances[i] };
    });
  const arr: number[] = [];
  racesRecords.forEach(({ time, distance }) => {
    let wins = 0;
    for (let i = 1; i < time; i++) {
      if ((time - i) * i > distance) wins++;
    }
    arr.push(wins);
  });
  return arr.reduce((prev, wins) => prev * wins, 1);
}

const answer = await day6a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
