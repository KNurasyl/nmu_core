export function insertAt<T>(arr: T[], value: T, idx = 2): T[] {
	const pos = Math.min(idx, arr.length)
	return [...arr.slice(0, pos), value, ...arr.slice(pos)]
}