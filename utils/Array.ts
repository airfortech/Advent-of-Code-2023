interface Array<T> {
  sum(): number;
  toNumbers(): number[];
  sortNumbersAscending(): T[];
  sortNumbersDescending(): T[];
  union(array: any[]): T[];
  difference(array: any[]): T[];
  intersection(array: any[]): T[];
  match(array: any[]): boolean;
  splitEveryNth(n: number): T[];
  rotate(): T[];
  rotate2dArray(deg?: 90 | 180 | 270): any[][];
  normalize2dArray(nullish?: string | 0 | null | undefined): [][];
  simplify2dArray(nullish?: string | 0 | null | undefined): any;
  extend2dArray(
    direction: "left" | "right" | "top" | "bottom",
    nullish?: any
  ): any;
}

Array.prototype.sum = function (): number {
  return this.reduce((sum: number, a: number) => sum + a, 0);
};

Array.prototype.toNumbers = function (): number[] {
  return this.map((a: any) => Number(a));
};

Array.prototype.sortNumbersAscending = function (): number[] {
  return this.sort((a: number, b: number) => a - b);
};

Array.prototype.sortNumbersDescending = function (): number[] {
  return this.sort((a: number, b: number) => b - a);
};

Array.prototype.union = function (array: any[]): any[] {
  let a = new Set(this);
  let b = new Set(array);
  return Array.from(new Set([...this, ...b]));
};

Array.prototype.difference = function (array: any[]): any[] {
  let a = new Set(this);
  let b = new Set(array);
  return Array.from(new Set([...a].filter(x => !b.has(x))));
};

Array.prototype.intersection = function (array: any[]): any[] {
  let a = new Set(this);
  let b = new Set(array);
  return Array.from(new Set([...a].filter(x => b.has(x))));
};

Array.prototype.match = function (array: any[]): boolean {
  return this.every((a: any) => array.includes(a));
};

Array.prototype.splitEveryNth = function (n: number): any[] {
  const arr: string[][] = [];

  for (let i = 0; i < this.length; i++) {
    if (!arr[Math.floor(i / n)]) arr[Math.floor(i / n)] = [];
    arr[Math.floor(i / n)].push(this[i]);
  }

  return arr;
};

Array.prototype.rotate = function (): any[] {
  return this[0].map((_: any, i: number) => this.map((row: any) => row[i]));
};

Array.prototype.normalize2dArray = function (
  nullish: string | 0 | null | undefined = null
): [][] {
  const lengthY = Math.max(...this.map((a: any) => a.length)) || 0;
  const lengthX = (this.length as number) || 0;
  const length = Math.max(lengthX, lengthY);

  for (let i = 0; i < length; i++) {
    const len = this[i] ? length - this[i].length : length;
    for (let j = 0; j < len; j++) {
      if (this[i]) this[i].push(nullish);
      else this[i] = [nullish];
    }
  }

  return this;
};

Array.prototype.simplify2dArray = function (
  nullish: string | 0 | null | undefined = null
): [][] {
  return this.map((a: []) => a.filter((a: any) => a !== nullish)).filter(
    (a: []) => a.length > 0
  );
};

// in progress
Array.prototype.rotate2dArray = function (deg: 90 | 180 | 270): any[][] {
  const arr = Array(this.length)
    .fill(null)
    .map((a: null) => Array(this.length).fill(null));
  for (let i = 0; i < this.length; i++) {
    for (let j = 0; j < this.length; j++)
      arr[i][j] = this[this.length - 1 - j][this.length - 1 - i];
  }
  return arr;
};

Array.prototype.extend2dArray = function (
  direction: "left" | "right" | "top" | "bottom",
  nullish: any = null
): any {
  let arr = this as any[][];
  if (direction === "right") return arr.map((a: any[]) => [...a, nullish]);
  if (direction === "left") return arr.map((a: any[]) => [nullish, ...a]);
  if (direction === "top") return [Array(arr[0].length).fill(nullish), ...arr];
  if (direction === "bottom")
    return [...arr, Array(arr[0].length).fill(nullish)];
};
