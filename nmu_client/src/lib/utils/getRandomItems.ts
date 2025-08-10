export function getRandomItems<T>(arr: T[], n: number): T[] {
	if (!Array.isArray(arr)) return []
	const shuffled = arr.slice().sort(() => Math.random() - 0.5)
	return shuffled.slice(0, n)
}

export function shuffleArray<T>(array: T[]): T[] {
	const arr = [...array]
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[arr[i], arr[j]] = [arr[j], arr[i]]
	}
	return arr
}
