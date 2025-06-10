import { getRandomItems } from './getRandomItems'

interface IVariant {
	arabicLetter: string
}

export function getVariantsWithCorrect(
	variants: IVariant[],
	correct: string
): unknown[] {
	if (!variants) return []
	const filtered = variants?.filter(v => v?.arabicLetter !== correct)
	const randoms = getRandomItems(filtered, 3)
	return [...randoms, variants.find(v => v.arabicLetter === correct)!]
}
