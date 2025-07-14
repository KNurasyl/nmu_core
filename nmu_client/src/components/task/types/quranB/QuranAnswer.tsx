'use client'

import { IQuranB } from '@/types/tasks'
import { Row, Typography } from 'antd'

interface Props {
	task?: IQuranB
	extractWordsBySura: (
		sura: any[] | undefined,
		words: any[] | undefined
	) => {
		step?: number
		text?: string
		words: { text?: string; start?: number; end?: number }[]
	}[]
	getWordStyle: (w: {
		text?: string
		start?: number
		end?: number
	}) => React.CSSProperties
}

const QuranAnswer = ({ task, extractWordsBySura, getWordStyle }: Props) => {
	const wordsSorted = task?.words?.length
		? [...task.words].sort((a, b) => (a.start ?? 0) - (b.start ?? 0))
		: []

	console.log(wordsSorted)

	return (
		<Row className='quran_b__answer'>
			{extractWordsBySura(task?.sura, wordsSorted).map((ayah, ayahIdx) => (
				<Row key={ayahIdx} className='ayah-line' wrap={false}>
					{ayah.words.reverse().map((w, idx) => (
						<Typography
							key={`${ayahIdx}-${idx}`}
							className='letter arab_letter'
							style={getWordStyle(w)}
						>
							{w.text}
						</Typography>
					))}
				</Row>
			))}
		</Row>
	)
}

export default QuranAnswer
