'use client'

import { useTaskStore } from '@/stores/task.store'
import { IQuranA } from '@/types/tasks'
import { Row } from 'antd'
import { Volume2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TaskCheck from '../../TaskCheck'
import TaskResult from '../../TaskResult'
import QuranAnswer from './QuranAnswer'

interface IProps {
	onFinished: VoidFunction
}

const TaskQuranA = ({ onFinished }: IProps) => {
	const { t } = useTranslation('common')

	const {
		currentTask,
		nextTask,
		markCorrect,
		status,
		setStatus,
		score,
		correctCount,
		wrongCount,
		elapsedTime,
	} = useTaskStore(state => state)

	const task = currentTask as IQuranA

	const [isPlay, setIsPlay] = useState<boolean>(false)
	const audioRef = useRef<HTMLAudioElement>(null)
	const [currentTime, setCurrentTime] = useState(0)

	useEffect(() => {
		const audio = audioRef.current
		if (!audio) return

		const handle = () => setCurrentTime(audio.currentTime * 1000)
		audio.addEventListener('timeupdate', handle)

		return () => audio.removeEventListener('timeupdate', handle)
	}, [task?.audioFileName])

	useEffect(() => {
		const audio = audioRef.current
		if (audio) {
			audio.play()
			setIsPlay(true)
		}
	}, [currentTask])

	const getWordStyle = (word: {
		text?: string
		start?: number
		end?: number
	}) => {
		const baseColor = '#5f3215'
		const activeColor = '#FFA500'

		const { start, end } = word
		const percentage = Math.min(
			Math.max(
				((currentTime - (start || 0)) / ((end || 0) - (start || 0))) * 100,
				0
			),
			100
		)

		return {
			backgroundImage: `linear-gradient(to left,
                      ${activeColor} ${percentage}%,
                      ${baseColor}  ${percentage}%)`,
			WebkitBackgroundClip: 'text',
			color: 'transparent',
			transition: 'background-image 0.1s linear',
			lineHeight: 'normal',
		}
	}

	const checkHandle = () => {
		setStatus('success')
		markCorrect(task)
		nextTask()
	}

	return (
		<Row className='quran_a'>
			<QuranAnswer task={task} getWordStyle={getWordStyle} />

			<Row
				className={`pagination ${!task?.audioFileName ? 'without-audio' : ''}`}
			>
				<TaskCheck onClick={checkHandle} btnText={t('nextBtnText')} />
				{task?.audioFileName && (
					<Row className='audio_blog' onClick={() => audioRef.current?.play()}>
						<audio
							style={{ display: 'none' }}
							onPlay={() => setIsPlay(true)}
							onEnded={() => setIsPlay(false)}
							src={`/audio/${task?.lessonCode}/${task?.audioFileName}`}
							ref={audioRef}
							controls
						/>
						<div className={`audio_container ${isPlay ? 'playing' : ''}`}>
							<div className='wave wave1' />
							<div className='wave wave2' />
							<div className='wave wave3' />
							<div className='audio_button'>
								<Volume2 className='volume_icon' color='#5f3215' />
							</div>
						</div>
					</Row>
				)}
			</Row>

			<TaskResult
				show={status === 'finished'}
				bravoTxt={t('bravoTxt')}
				score={score}
				correctAttempt={correctCount}
				correctAttemptTxt={t('correctAttemptTxt')}
				inCorrectAttempt={wrongCount}
				inCorrectAttemptTxt={t('inCorrectAttemptTxt')}
				totalAttempt={correctCount + wrongCount}
				totalAttemptTxt={t('totalAttemptTxt')}
				finishBtnTxt={t('finishBtnTxt')}
				timeTxt={t('timeTxt')}
				timeout={elapsedTime}
				onClick={onFinished}
			/>
		</Row>
	)
}

export default TaskQuranA
