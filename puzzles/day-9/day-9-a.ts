import { readData } from '../../shared.ts';
import '../../utils/Array.ts';
import chalk from 'chalk';

export async function day9a(dataPath?: string) {
  const data = await (
    await readData(dataPath)
  ).map((line) => line.split(' ').toNumbers());

  const checkNextNumber = (arr: number[]) => {
    const _arr = [[...arr]];
    while (!_arr.at(-1).every((num) => num === 0)) {
      const nextArr: number[] = [];
      const lastArr = _arr.at(-1);
      for (let i = 0; i < lastArr.length - 1; i++) {
        nextArr.push(lastArr[i + 1] - lastArr[i]);
      }
      _arr.push(nextArr);
    }
    return _arr.reverse().reduce((sum, prev) => sum + prev.at(-1), 0);
  };

  return data.reduce((sum, prev) => sum + checkNextNumber(prev), 0);
}

const answer = await day9a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
