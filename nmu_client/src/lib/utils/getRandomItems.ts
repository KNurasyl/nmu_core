export function getRandomItems<T>(arr: T[], n: number): T[] {
  if (!Array.isArray(arr)) return [];
  const shuffled = arr.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}
