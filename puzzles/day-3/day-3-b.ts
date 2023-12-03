import { readData, saveData } from '../../shared.ts';
import '../../utils/Array.ts';
import chalk from 'chalk';

const convertArrayToNumber = (arr: (string | number)[]): number => {
  return +arr.join('');
};

export async function day3b(dataPath?: string) {
  const data = await readData(dataPath);
  const array = [
    '.'.repeat(data[0].length),
    ...data,
    '.'.repeat(data[0].length),
  ].map((line) => '.' + line + '.');

  const sets: number[][] = [];
  for (let row = 1; row < array.length - 1; row++) {
    for (let col = 1; col < array[0].length - 1; col++) {
      const currentSymbol = array[row][col];
      const set: number[] = [];
      if (currentSymbol === '*') {
        if (!isNaN(+array[row][col - 1]))
          set.push(
            convertArrayToNumber(
              array[row].split('').getAdjacentNumbers(col - 1)
            )
          );
        if (!isNaN(+array[row][col + 1]))
          set.push(
            convertArrayToNumber(
              array[row].split('').getAdjacentNumbers(col + 1)
            )
          );
        if (isNaN(+array[row - 1][col])) {
          if (!isNaN(+array[row - 1][col - 1])) {
            set.push(
              convertArrayToNumber(
                array[row - 1].split('').getAdjacentNumbers(col - 1)
              )
            );
          }
          if (!isNaN(+array[row - 1][col + 1])) {
            set.push(
              convertArrayToNumber(
                array[row - 1].split('').getAdjacentNumbers(col + 1)
              )
            );
          }
        }
        if (!isNaN(+array[row - 1][col])) {
          set.push(
            convertArrayToNumber(
              array[row - 1].split('').getAdjacentNumbers(col)
            )
          );
        }
        if (isNaN(+array[row + 1][col])) {
          if (!isNaN(+array[row + 1][col - 1])) {
            set.push(
              convertArrayToNumber(
                array[row + 1].split('').getAdjacentNumbers(col - 1)
              )
            );
          }
          if (!isNaN(+array[row + 1][col + 1])) {
            set.push(
              convertArrayToNumber(
                array[row + 1].split('').getAdjacentNumbers(col + 1)
              )
            );
          }
        }
        if (!isNaN(+array[row + 1][col])) {
          set.push(
            convertArrayToNumber(
              array[row + 1].split('').getAdjacentNumbers(col)
            )
          );
        }
      }
      if (set.length > 1) sets.push(set);
    }
  }
  await saveData(JSON.stringify(sets), 'json');
  return sets.reduce((prev, set) => prev + set[0] * set[1], 0);
}

const answer = await day3b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
