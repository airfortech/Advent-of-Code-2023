import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day8a(dataPath?: string) {
  const data = await readData(dataPath);
  const path = data[0].split('');
  const nodes = data
    .slice(2)
    .map((node) => {
      const line = node.split(' = ');
      return {
        node: line[0],
        leftConnection: line[1].slice(1, 4),
        rightConnection: line[1].slice(6, 9),
      };
    })
    .sort((a, b) => {
      if (a.node > b.node) return 1;
      if (a.node < b.node) return -1;
      return 0;
    });
  let foundZZZ = false;
  let steps = 0;
  let currentIndex = 0;
  while (!foundZZZ) {
    for (let step of path) {
      if (step === 'L')
        currentIndex = nodes.findIndex(
          (node) => node.node === nodes[currentIndex].leftConnection
        );
      else
        currentIndex = nodes.findIndex(
          (node) => node.node === nodes[currentIndex].rightConnection
        );
      steps++;
      if (nodes[currentIndex].node === 'ZZZ') {
        foundZZZ = true;
        break;
      }
    }
  }
  return steps;
}

const answer = await day8a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
