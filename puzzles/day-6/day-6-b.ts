import { readData } from '../../shared.ts';
import '../../utils/Array.ts';
import chalk from 'chalk';

export async function day6b(dataPath?: string) {
  const data = await readData(dataPath);
  return 0;
}

const answer = await day6b();
console.log(answer);
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
