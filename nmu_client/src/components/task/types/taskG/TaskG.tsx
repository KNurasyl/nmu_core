'use client'

import { useTaskStore } from '@/stores/task.store'
import { ITaskG } from '@/types/tasks'
import { Row } from 'antd'
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

	const audioRef = useRef<HTMLAudioElement>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [selected, setSelected] = useState<string[]>([])

	useEffect(() => {
		if (!audioRef.current) return
		audioRef.current.currentTime = 0

		const playPromise = audioRef.current.play()
		if (playPromise && playPromise.catch) playPromise.catch(() => {})
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
				isPlaying={isPlaying}
				audioRef={audioRef}
				handlePlay={() => setIsPlaying(true)}
				handleEnd={() => setIsPlaying(false)}
				audioSrc={`${task?.lessonCode}/${task?.audioFileName}`}
			/>

			<TaskCheck onClick={checkHandle} btnText={t('check')} />

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
