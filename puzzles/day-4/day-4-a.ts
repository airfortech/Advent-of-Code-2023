import { readData } from '../../shared.ts';
import '../../utils/Array.ts';
import chalk from 'chalk';

export async function day4a(dataPath?: string) {
  const data = await readData(dataPath);
  const cards = data
    .map((line) => line.split(': ')[1].split(' | '))
    .map((card) =>
      card[0]
        .match(/.{1,3}/g)
        .toNumbers()
        .intersection(card[1].match(/.{1,3}/g).toNumbers())
    )
    .filter((card) => card.length > 0)
    .reduce(
      (prev, card) => prev + (card.length === 1 ? 1 : 2 ** (card.length - 1)),
      0
    );
  return cards;
}

const answer = await day4a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
