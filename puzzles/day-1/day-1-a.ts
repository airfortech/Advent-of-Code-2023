import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const data = (await readData(dataPath))
    .map((line) =>
      line
        .split('')
        .filter((letter) => isNaN(+letter) === false)
        .map((letter) => +letter)
    )
    .map((line) => +(line[0].toString() + line.at(-1).toString()))
    .reduce((prev, line) => line + prev, 0);
  return data;
}

const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
