import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day2b(dataPath?: string) {
  const data = await readData(dataPath);
  const result = data
    .map((line) => {
      return {
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
          })
          .reduce(
            (prev, set) => {
              const obj = prev;
              if (set.red > prev.red) obj.red = set.red;
              if (set.green > prev.green) obj.green = set.green;
              if (set.blue > prev.blue) obj.blue = set.blue;
              return obj;
            },
            { red: 0, green: 0, blue: 0 }
          ),
      };
    })
    .reduce(
      (prev, { sets: { red, green, blue } }) => prev + red * green * blue,
      0
    );
  return result;
}

const answer = await day2b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
