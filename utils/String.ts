interface String {
  hasDuplicates(): boolean;
}

String.prototype.hasDuplicates = function (): boolean {
  const word = this as string;
  const set = new Set([...word.split("")]);
  return word.length !== set.size;
};
