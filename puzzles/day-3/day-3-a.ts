import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day3a(dataPath?: string) {
  const data = await readData(dataPath);
  const array = [
    '.'.repeat(data[0].length),
    ...data,
    '.'.repeat(data[0].length),
  ].map((line) => '.' + line + '.');

  const sets: { number: string; symbols: '' }[] = [];

  let prevSymbol = '.';
  let index = 0;
  for (let row = 1; row < array.length - 1; row++) {
    prevSymbol = '.';
    for (let col = 1; col < array[0].length - 1; col++) {
      const currentSymbol = array[row][col];
      const nextSymbol = array[row][col + 1];
      if (!isNaN(+currentSymbol)) {
        if (isNaN(+prevSymbol) && isNaN(+nextSymbol)) {
          sets[index] = { number: '0', symbols: '' };
          sets[index].number += currentSymbol;
          sets[index].symbols += array[row - 1][col - 1];
          sets[index].symbols += array[row][col - 1];
          sets[index].symbols += array[row + 1][col - 1];
          sets[index].symbols += array[row - 1][col];
          sets[index].symbols += array[row + 1][col];
          sets[index].symbols += array[row - 1][col + 1];
          sets[index].symbols += array[row][col + 1];
          sets[index].symbols += array[row + 1][col + 1];
          index++;
        }
        if (isNaN(+prevSymbol) && !isNaN(+nextSymbol)) {
          sets[index] = { number: '0', symbols: '' };
          sets[index].number += currentSymbol;
          sets[index].symbols += array[row - 1][col - 1];
          sets[index].symbols += array[row][col - 1];
          sets[index].symbols += array[row + 1][col - 1];
          sets[index].symbols += array[row - 1][col];
          sets[index].symbols += array[row + 1][col];
          index++;
        }
        if (!isNaN(+prevSymbol) && !isNaN(+nextSymbol)) {
          sets[index - 1].number += currentSymbol;
          sets[index - 1].symbols += array[row - 1][col];
          sets[index - 1].symbols += array[row + 1][col];
        }
        if (!isNaN(+prevSymbol) && isNaN(+nextSymbol)) {
          sets[index - 1].number += currentSymbol;
          sets[index - 1].symbols += array[row - 1][col];
          sets[index - 1].symbols += array[row + 1][col];
          sets[index - 1].symbols += array[row - 1][col + 1];
          sets[index - 1].symbols += array[row][col + 1];
          sets[index - 1].symbols += array[row + 1][col + 1];
        }
      }
      prevSymbol = currentSymbol;
    }
  }
  const result = sets
    .filter(({ symbols }) => symbols.split('').some((symbol) => symbol !== '.'))
    .reduce((prev, { number }) => prev + Number(number), 0);

  return result;
}

const answer = await day3a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
