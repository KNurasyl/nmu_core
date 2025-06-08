'use client'

import { Row } from 'antd'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TaskAnswer from './TaskAnswer'
import TaskCheck from './TaskCheck'
import TaskVarinats from './TaskVarinats'

const TaskA = () => {
	const { t } = useTranslation('common')

	const audioRef = useRef<HTMLAudioElement>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [selected, setSelected] = useState<string | null>(null)

	const handlePlay = () => {
		setIsPlaying(true)
	}

	const handleEnd = () => {
		setIsPlaying(false)
	}

	const variants = [
		{
			arabicLetter: 'aasd',
			audioFileName: '',
			lessonCode: '',
		},
		{
			arabicLetter: 'basd',
			audioFileName: '',
			lessonCode: '',
		},
		{
			arabicLetter: 'vad',
			audioFileName: '',
			lessonCode: '',
		},
		{
			arabicLetter: 'dff',
			audioFileName: '',
			lessonCode: '',
		},
	]

	return (
		<Row className='task_a'>
			<TaskAnswer
				isPlaying={isPlaying}
				audioRef={audioRef}
				handlePlay={handlePlay}
				handleEnd={handleEnd}
				audioSrc={'alif.mp3'}
			/>

			<TaskVarinats
				variants={variants}
				setSelected={setSelected}
				selected={selected}
			/>

			<TaskCheck onClick={() => {}} btnText={t('check')} />
		</Row>
	)
}

export default TaskA
