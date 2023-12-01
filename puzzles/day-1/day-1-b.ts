import { readData } from '../../shared.ts';
import chalk from 'chalk';

const matchNumber = (match: string) => {
  switch (match) {
    case 'one':
      return '1';
    case 'two':
      return '2';
    case 'three':
      return '3';
    case 'four':
      return '4';
    case 'five':
      return '5';
    case 'six':
      return '6';
    case 'seven':
      return '7';
    case 'eight':
      return '8';
    case 'nine':
      return '9';
    default:
      return match;
  }
};

const matchReversedNumber = (match: string) => {
  switch (match) {
    case 'eno':
      return '1';
    case 'owt':
      return '2';
    case 'eerht':
      return '3';
    case 'ruof':
      return '4';
    case 'evif':
      return '5';
    case 'xis':
      return '6';
    case 'neves':
      return '7';
    case 'thgie':
      return '8';
    case 'enin':
      return '9';
    default:
      return match;
  }
};

export async function day1b(dataPath?: string) {
  const data = (await readData(dataPath))
    .map((line) => {
      const leftNumber = line
        .replace(/one|two|three|four|five|six|seven|eight|nine/, (match) =>
          matchNumber(match)
        )
        .split('')
        .filter((letter) => isNaN(+letter) === false)[0];
      const rightNumber = line
        .split('')
        .reverse()
        .join('')
        .replace(/eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/, (match) =>
          matchReversedNumber(match)
        )
        .split('')
        .filter((letter) => isNaN(+letter) === false)[0];
      return leftNumber + rightNumber;
    })
    .reduce((prev, line) => {
      return +line + prev;
    }, 0);
  return data;
}

const answer = await day1b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
