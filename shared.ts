import { readFile, writeFile } from 'fs/promises';

export async function readData(path?: string) {
  const fileName = path || process.argv[2];
  const data = (await readFile(fileName)).toString().split('\n');
  return data;
}

export async function saveData(data: string, extension: string) {
  const path = process.argv[2].split('/');
  path.pop();
  const dir = path.join('/') + '/';
  await writeFile(dir + 'test-output.' + extension, data);
}
