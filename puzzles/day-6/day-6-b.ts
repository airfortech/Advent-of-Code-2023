import { readData } from '../../shared.ts';
import '../../utils/Array.ts';
import chalk from 'chalk';

export async function day6b(dataPath?: string) {
  const data = await readData(dataPath);
  const time = +data[0].split(':')[1].split(/\s+/).join('');
  const distance = +data[1].split(':')[1].split(/\s+/).join('');
  let wins = 0;
  for (let i = 1; i < time; i++) {
    if ((time - i) * i > distance) wins++;
  }
  return wins;
}

const answer = await day6b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
