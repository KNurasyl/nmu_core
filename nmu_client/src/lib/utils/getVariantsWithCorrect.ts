import { getRandomItems } from './getRandomItems'

export function getVariantsWithCorrect(
	variants: any[],
	correct: string
): any[] {
	if (!variants) return []
	const filtered = variants?.filter(v => v.arabicLetter !== correct)
	const randoms = getRandomItems(filtered, 3)
	return [...randoms, variants?.find(v => v.arabicLetter === correct)!]
}
