import { readData } from '../../shared.ts';
import chalk from 'chalk';
import { leastCommonMultiple } from '../../utils/leastCommonMultiple.ts';

export async function day8b(dataPath?: string) {
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
      if (a.node[2] > b.node[2]) return 1;
      if (a.node[2] < b.node[2]) return -1;
      return 0;
    });
  const _nodes: {
    [key: string]: { leftConnection: string; rightConnection: string };
  } = {};
  for (let node of nodes) {
    _nodes[node.node] = {
      leftConnection: node.leftConnection,
      rightConnection: node.rightConnection,
    };
  }

  let currentNodes = nodes.filter((node) => node.node[2] === 'A');
  const findRepeats = (node: {
    node: string;
    leftConnection: string;
    rightConnection: string;
  }) => {
    let foundZ = false;
    let steps = 0;
    let currentNode = node;
    while (!foundZ) {
      for (let step of path) {
        if (step === 'L') {
          currentNode = {
            node: currentNode.leftConnection,
            leftConnection: _nodes[currentNode.leftConnection].leftConnection,
            rightConnection: _nodes[currentNode.leftConnection].rightConnection,
          };
        } else {
          currentNode = {
            node: currentNode.rightConnection,
            leftConnection: _nodes[currentNode.rightConnection].leftConnection,
            rightConnection:
              _nodes[currentNode.rightConnection].rightConnection,
          };
        }
        steps++;
        if (currentNode.node[2] === 'Z') {
          foundZ = true;
          break;
        }
      }
    }
    return steps;
  };
  const steps: number[] = [];
  currentNodes.forEach((node) => steps.push(findRepeats(node)));
  return leastCommonMultiple(steps);
}

const answer = await day8b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
