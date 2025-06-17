'use client'

import { AudioPlayerHandle } from '@/components/player/AudioPlayer'
import { useTaskStore } from '@/stores/task.store'
import { ITaskC } from '@/types/tasks'
import { Row } from 'antd'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TaskCheck from '../../TaskCheck'
import TaskResult from '../../TaskResult'
import TaskStatusAlert from '../../TaskStatusAlert'
import TaskAnswer from './TaskAnswer'
import TaskVarinats from './TaskVarinats'

interface IProps {
	onFinished: VoidFunction
}

const TaskC = ({ onFinished }: IProps) => {
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

	const task = currentTask as ITaskC

	const audioRef = useRef<AudioPlayerHandle>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [selected, setSelected] = useState<string | null>(null)

	const variants = useMemo(() => {
		if (!task) return []
		const correct = task.correctLetter
		const similar = task.similarLetter

		return [correct, similar]
	}, [task])

	useEffect(() => {
		audioRef.current?.play() // запускаем новый
		setIsPlaying(true)
	}, [task])

	const checkHandle = () => {
		if (!selected) return
		if (selected === task?.correctLetter?.arabicLetter) {
			setStatus('success')
			markCorrect()
		} else {
			setStatus('error')
			markWrong()
			addErrorTask(task)
		}
	}

	const nextHandler = () => {
		setStatus('inProgress')
		setSelected(null)
		nextTask()
	}

	return (
		<Row className='task_c'>
			<TaskAnswer
				isPlaying={isPlaying}
				audioRef={audioRef}
				handlePlay={() => setIsPlaying(true)}
				handleEnd={() => setIsPlaying(false)}
				audioSrc={`${task?.correctLetter?.lessonCode}/${task?.correctLetter?.audioFileName}`}
			/>

			<TaskVarinats
				variants={variants}
				setSelected={setSelected}
				selected={selected}
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

export default TaskC
