export function calcProgress(total: number, left: number) {
	if (total === 0) return 100
	return Math.round(((total - left) / total) * 100)
}
