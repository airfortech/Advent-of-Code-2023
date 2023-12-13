import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day10b(dataPath?: string) {
  const data = await readData(dataPath);
  return data;
}

const answer = await day10b();
console.log(answer);
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
