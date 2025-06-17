'use client'

import AudioPlayer, { AudioPlayerHandle } from '@/components/player/AudioPlayer'
import { useTaskStore } from '@/stores/task.store'
import { ITaskG } from '@/types/tasks'
import { Row } from 'antd'
import { Volume2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TaskCheck from '../../TaskCheck'
import TaskResult from '../../TaskResult'
import TaskStatusAlert from '../../TaskStatusAlert'
import TaskLetterButtons from './TaskLetterButtons'
import TaskLettersDisplay from './TaskLettersDisplay'

interface IProps {
	onFinished: VoidFunction
}

const TaskG = ({ onFinished }: IProps) => {
	const { t } = useTranslation('common')

	const {
		currentTask,
		nextTask,
		addErrorTask,
		markCorrect,
		markWrong,
		status,
		setStatus,
		score,
		correctCount,
		wrongCount,
	} = useTaskStore(state => state)

	const task = currentTask as ITaskG

	const audioRef = useRef<AudioPlayerHandle>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [selected, setSelected] = useState<string[]>([])
	
  useEffect(() => {
    audioRef.current?.stop()
    audioRef.current?.play()
    setIsPlaying(true)
  }, [task])

	const checkHandle = () => {
		if (!selected.length) return
		const correctLetter = task.correctLetter

		const isCorrect = selected.join('') === correctLetter

		if (isCorrect) {
			markCorrect()
			setStatus('success')
		} else {
			markWrong()
			setStatus('error')
			addErrorTask(task)
		}
	}

	const nextHandler = () => {
		setStatus('inProgress')
		setSelected([])
		nextTask()
	}

	return (
		<Row className='task_g'>
			<TaskLettersDisplay letters={selected} setSelected={setSelected} />

			<TaskLetterButtons
				variants={task?.variants}
				setSelected={setSelected}
				selected={selected}
			/>

			<Row className='pagination'>
				<TaskCheck onClick={checkHandle} btnText={t('check')} />
				<Row className='audio_blog'>
					<AudioPlayer
						ref={audioRef}
						audioSrc={`${task?.lessonCode}/${task?.audioFileName}`}
						onPlayCallback={() => setIsPlaying(true)}
						onEndCallback={() => setIsPlaying(false)}
					>
						<div className={`audio_container ${isPlaying ? 'playing' : ''}`}>
							<div className='wave wave1' />
							<div className='wave wave2' />
							<div className='wave wave3' />
							<div className='audio_button'>
								<Volume2 className='volume_icon' color='#fff' />
							</div>
						</div>
					</AudioPlayer>
				</Row>
			</Row>

			<TaskStatusAlert
				status={status}
				message={status === 'success' ? t('successMsg') : t('errorMsg')}
				btnText={t('nextBtnText')}
				onClick={nextHandler}
			/>

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
				timeout={'05:00'}
				onClick={onFinished}
			/>
		</Row>
	)
}

export default TaskG
