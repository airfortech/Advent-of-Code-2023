import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day2a(dataPath?: string) {
  const data = await readData(dataPath);
  const result = data
    .map((line) => {
      return {
        id: +line.split(': ')[0].replace(/Game\s(\d+)/, '$1'),
        sets: line
          .split(': ')[1]
          .split('; ')
          .map((set) => {
            const red = set.match(/(\d+) red/);
            const green = set.match(/(\d+) green/);
            const blue = set.match(/(\d+) blue/);
            return {
              red: red ? +red[1] : 0,
              green: green ? +green[1] : 0,
              blue: blue ? +blue[1] : 0,
            };
          }),
      };
    })
    .filter((line) => {
      let areSetsCorrect = true;
      line.sets.forEach((set) => {
        if (set.blue > 14 || set.green > 13 || set.red > 12)
          areSetsCorrect = false;
      });
      return areSetsCorrect ? line : false;
    })
    .reduce((prev, { id }) => prev + id, 0);
  return result;
}

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
