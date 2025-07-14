'use client'

import { IQuranA } from '@/types/tasks'
import { Row, Typography } from 'antd'

interface IProps {
	task?: IQuranA
	getWordStyle: (word: { text?: string; start?: number; end?: number }) => {
		backgroundImage: string
		WebkitBackgroundClip: string
		color: string
		transition: string
		lineHeight: string
	}
}

const QuranAnswer = ({ task, getWordStyle }: IProps) => {
	const words = task?.words?.length
		? [...task.words].sort((a, b) => (a.start ?? 0) - (b.start ?? 0))
		: []

	return (
		<Row className='quran_a__answer'>
			<Row className='letter_block' style={{ direction: 'rtl' }}>
				{words.map((word, idx) => (
					<Typography
						key={idx}
						className='letter arab_letter'
						style={getWordStyle(word)}
					>
						{word.text}
					</Typography>
				))}
			</Row>
		</Row>
	)
}

export default QuranAnswer
