import { readData } from '../../shared.ts';
import chalk from 'chalk';

const strenghts = [
  'A',
  'K',
  'Q',
  'T',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
  'J',
];

const checkHand = (hand: string) => {
  const _cards = hand
    .split('')
    .reduce((prev: { figure: string; count: number }[], card) => {
      const arr = [...prev];
      const index = prev.findIndex(({ figure }) => figure === card);
      index > -1 ? arr[index].count++ : arr.push({ figure: card, count: 1 });
      return arr;
    }, [])
    .sort((a, b) => strenghts.indexOf(a.figure) - strenghts.indexOf(b.figure))
    .sort((a, b) => b.count - a.count)
    .sort((a, b) => {
      if (a.figure === 'J') return 1;
      if (b.figure === 'J') return -1;
      return 0;
    });
  const cards = [_cards[0]];
  for (let i = 1; i < _cards.length; i++) {
    if (_cards[i].figure === 'J') {
      cards[0].count += _cards[i].count;
    } else cards.push(_cards[i]);
  }
  if (cards[0].count === 5) return 6;
  if (cards[0].count === 4) return 5;
  if (cards[0].count === 3 && cards[1].count === 2) return 4;
  if (cards[0].count === 3) return 3;
  if (cards[0].count === 2 && cards[1].count === 2) return 2;
  if (cards[0].count === 2) return 1;
  return 0;
};

export async function day7b(dataPath?: string) {
  const data = (await readData(dataPath))
    .map((line) => {
      return { hand: line.split(' ')[0], bet: line.split(' ')[1] };
    })
    .sort((a, b) => {
      const handA = a.hand;
      const handB = b.hand;
      const handAStrenghts = handA
        .split('')
        .map((a) => String.fromCharCode(97 + strenghts.indexOf(a)));
      const handBStrenghts = handB
        .split('')
        .map((b) => String.fromCharCode(97 + strenghts.indexOf(b)));
      if (checkHand(handA) > checkHand(handB)) return -1;
      if (checkHand(handA) < checkHand(handB)) return 1;
      if (checkHand(handA) === checkHand(handB)) {
        if (handAStrenghts > handBStrenghts) {
          return 1;
        }
        if (handAStrenghts < handBStrenghts) {
          return -1;
        }
        return 0;
      }
    })
    .reverse()
    .reduce((prev, { bet }, i) => prev + (i + 1) * Number(bet), 0);
  return data;
}

const answer = await day7b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
