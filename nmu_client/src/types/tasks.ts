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

export interface ITajvidB {
	type: 'tajvidB'
	subType:
		| 'tajvid-2l-1t'
		| 'tajvid-2l-2t'
		| 'tajvid-10l-1t'
		| 'tajvid-11l-1t'
		| 'tajvid-12l-1t'
	order: number
	lessonCode:
		| 'tajvid-lesson-2'
		| 'tajvid-lesson-10'
		| 'tajvid-lesson-11'
		| 'tajvid-lesson-12'
	description: string
	question: {
		item: string
		audioFileName?: string
		correctAnswer?: string
	}
	variants: {
		item: string
		audioFileName?: string
		isCorrect?: boolean
	}[]
}

export interface ITajvidC {
	type: 'tajvidC'
	subType:
		| 'tajvid-4l-2t'
		| 'tajvid-5l-2t'
		| 'tajvid-6l-2t'
		| 'tajvid-8l-2t'
		| 'tajvid-9l-2t'
		| 'tajvid-10l-2t'
		| 'tajvid-11l-2t'
		| 'tajvid-12l-2t'
		| 'tajvid-13l-2t'
		| 'tajvid-14l-1t'
	order: number
	lessonCode:
		| 'tajvid-lesson-4'
		| 'tajvid-lesson-5'
		| 'tajvid-lesson-6'
		| 'tajvid-lesson-8'
		| 'tajvid-lesson-9'
		| 'tajvid-lesson-10'
		| 'tajvid-lesson-11'
		| 'tajvid-lesson-12'
		| 'tajvid-lesson-13'
		| 'tajvid-lesson-14'
	description: string
	question: {
		item: string
		audioFileName?: string
	}
	variants: {
		item: string
		audioFileName?: string
		isCorrect?: boolean
	}[]
}

export interface ITajvidD {
	type: 'tajvidD'
	subType:
		| 'tajvid-6l-1t'
		| 'tajvid-7l-1t'
		| 'tajvid-7l-2t'
		| 'tajvid-8l-1t'
		| 'tajvid-9l-1t'
		| 'tajvid-10l-3t'
		| 'tajvid-13l-1t'
	order: number
	lessonCode:
		| 'tajvid-lesson-6'
		| 'tajvid-lesson-7'
		| 'tajvid-lesson-8'
		| 'tajvid-lesson-9'
		| 'tajvid-lesson-10'
		| 'tajvid-lesson-13'
	description: string
	variants: {
		item: string
		audioFileName?: string
		isCorrect?: boolean
	}[]
}

export interface IQuranA {
	audioFileName?: string
	text?: string
	audio_duration?: number
	taskType?: 'quran-type-1'
	lessonCode?: string
	taskCount?: string
	words?: {
		text?: string
		start?: number
		end?: number
	}[]
}

export interface IQuranB {
	audioFileName?: string
	audio_duration?: number
	taskType?: 'quran-type-2'
	lessonCode?: string
	taskCount?: string
	sura?: {
		step?: number
		text?: string
	}[]
	words?: {
		text?: string
		start?: number
		end?: number
	}[]
}
