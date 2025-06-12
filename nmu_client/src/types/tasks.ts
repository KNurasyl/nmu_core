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