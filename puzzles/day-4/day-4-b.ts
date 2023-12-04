import { readData } from '../../shared.ts';
import '../../utils/Array.ts';
import chalk from 'chalk';

export async function day4b(dataPath?: string) {
  const data = await readData(dataPath);
  const cards = data
    .map((line) => line.split(': ')[1].split(' | '))
    .map((card) =>
      card[0]
        .match(/.{1,3}/g)
        .toNumbers()
        .intersection(card[1].match(/.{1,3}/g).toNumbers())
    )
    .map((card) => {
      return { wons: card.length, copies: 1 };
    })
    .map((card, i, arr) => {
      if (card.wons > 0) {
        const copies = card.copies;
        for (let j = i + 1; j <= Math.min(card.wons + i, arr.length - 1); j++)
          arr[j].copies += copies;
      }
      return card;
    })
    .reduce((prev, card) => prev + card.copies, 0);
  return cards;
}

const answer = await day4b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
