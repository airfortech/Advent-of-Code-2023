import { readData } from '../../shared.ts';
import '../../utils/Array.ts';
import chalk from 'chalk';

interface Location {
  pos: number[];
  exitA: number[];
  exitB: number[];
}

export async function day10a(dataPath?: string) {
  const data: string[][] = (await readData(dataPath))
    .extend2dArray('left', '.')
    .extend2dArray('right', '.')
    .extend2dArray('top', '.')
    .extend2dArray('bottom', '.');
  const sRowPosition = data.findIndex((row) =>
    row.some((symbol) => symbol === 'S')
  );
  const sColPosition = data[sRowPosition].indexOf('S');
  const exits: { [key: string]: { exitA: number[]; exitB: number[] } } = {
    '|': { exitA: [-1, 0], exitB: [1, 0] },
    '-': { exitA: [0, -1], exitB: [0, 1] },
    L: { exitA: [-1, 0], exitB: [0, 1] },
    J: { exitA: [-1, 0], exitB: [0, -1] },
    '7': { exitA: [0, -1], exitB: [1, 0] },
    F: { exitA: [1, 0], exitB: [0, 1] },
  };

  const convertSToSymbol = (x: number, y: number) => {
    const n = ['|', '7', 'F'].includes(data[x - 1][y]);
    const s = ['|', 'L', 'J'].includes(data[x + 1][y]);
    const w = ['-', 'L', 'F'].includes(data[x][y - 1]);
    const e = ['-', 'J', '7'].includes(data[x][y + 1]);

    if (n && s) return '|';
    if (e && w) return '-';
    if (n && e) return 'L';
    if (n && w) return 'J';
    if (s && w) return '7';
    if (s && e) return 'F';
  };
  data[sRowPosition][sColPosition] = convertSToSymbol(
    sRowPosition,
    sColPosition
  );
  const _data = data.map((row, i) =>
    row.map((col, j) => {
      const pos = exits[col] || null;
      if (pos)
        return {
          pos: [i, j],
          exitA: [pos.exitA[0] + i, pos.exitA[1] + j],
          exitB: [pos.exitB[0] + i, pos.exitB[1] + j],
        };
      return col;
    })
  );
  let currentLocation = _data[sRowPosition][sColPosition] as Location;
  let nextStep: 'exitA' | 'exitB' = 'exitB';
  let steps = 0;
  let continueLoop = true;
  while (continueLoop) {
    if (
      currentLocation.pos[0] === sRowPosition &&
      currentLocation.pos[1] === sColPosition &&
      steps > 0
    )
      break;
    const nextLocationRow = currentLocation[nextStep][0];
    const nextLocationCol = currentLocation[nextStep][1];
    const nextLocation = _data[nextLocationRow][nextLocationCol] as Location;
    if (
      nextLocation.exitA[0] === currentLocation.pos[0] &&
      nextLocation.exitA[1] === currentLocation.pos[1]
    )
      nextStep = 'exitB';
    else nextStep = 'exitA';
    currentLocation = nextLocation;
    steps++;
  }
  return steps / 2;
}

const answer = await day10a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
