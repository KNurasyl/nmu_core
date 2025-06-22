export interface ITaskAB {
	order: number
	type: 'a' | 'b'
	correctAnswer: {
		arabicLetter: string
		audioFileName: string
		lessonCode: string
	}
	variants: {
		arabicLetter: string
		audioFileName: string
		lessonCode: string
	}[]
}

export interface ITaskC {
	order: number
	type: 'c'
	correctLetter: {
		arabicLetter: string
		audioFileName: string
		lessonCode: string
	}
	similarLetter: {
		arabicLetter: string
		audioFileName: string
		lessonCode: string
	}
}

export interface ITaskE {
	position: 'start' | 'middle' | 'end'
	correctVariants: {
		letter: string
		lesson: string
	}[]
	inCorrectVariants: {
		letter: string
		lesson: string
	}[]
}

export interface ITaskF {
	letter: string
	types: string[]
}

export interface ITaskG {
	audioFileName: string
	correctLetter: string
	variants: string[]
	lessonCode: string
}

export interface ITajvidA {
	type: 'tajvidA'
	subType:
		| 'tajvid-1l-1t'
		| 'tajvid-1l-2t'
		| 'tajvid-3l-1t'
		| 'tajvid-3l-2t'
		| 'tajvid-4l-1t'
		| 'tajvid-5l-1t'
	order: number
	lessonCode:
		| 'tajvid-lesson-1'
		| 'tajvid-lesson-3'
		| 'tajvid-lesson-4'
		| 'tajvid-lesson-5'
	description: string
	question: {
		item: string
		audioFileName?: string
	}
	correctVariant: {
		item: string
		correctAnswer?: string
		audioFileName?: string
	}
	variants: {
		item: string
		audioFileName?: string
	}[]
}
