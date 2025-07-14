'use client'

import { AudioPlayerHandle } from '@/components/player/AudioPlayer'
import { getRandomItems } from '@/lib/utils/getRandomItems'
import { useAuthStore } from '@/stores/auth.store'
import { useTaskStore } from '@/stores/task.store'
import { ITaskAB } from '@/types/tasks'
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

const TaskA = ({ onFinished }: IProps) => {
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
		elapsedTime,
	} = useTaskStore(state => state)

	const devMode = useAuthStore(state => state.devMode)

	const task = currentTask as ITaskAB

	const audioRef = useRef<AudioPlayerHandle>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [selected, setSelected] = useState<string | null>(null)

	const variants = useMemo(() => {
		if (!task) return []
		const correct = task.correctAnswer?.arabicLetter
		if (!correct) return []

		const filtered =
			task.variants?.filter(v => v.arabicLetter !== correct) ?? []
		const randoms = getRandomItems(filtered, 3)
		const variantsWithCorrect = task.correctAnswer
			? [...randoms, task.correctAnswer]
			: randoms

		return getRandomItems(variantsWithCorrect, 4)
	}, [task])

	useEffect(() => {
		audioRef.current?.play()
		setIsPlaying(true)
	}, [task])

	const checkHandle = () => {
		if (!selected) return
		if (selected === task?.correctAnswer?.arabicLetter) {
			setStatus('success')
			markCorrect(task)
		} else {
			setStatus('error')
			markWrong(task)
			addErrorTask(task)
		}
	}

	const nextHandler = () => {
		setStatus('inProgress')
		setSelected(null)
		nextTask()
	}

	return (
		<Row className='task_a'>
			<TaskAnswer
				isPlaying={isPlaying}
				audioRef={audioRef}
				handlePlay={() => setIsPlaying(true)}
				handleEnd={() => setIsPlaying(false)}
				audioSrc={`${task?.correctAnswer?.lessonCode}/${task?.correctAnswer?.audioFileName}`}
			/>

			<TaskVarinats
				variants={variants}
				setSelected={setSelected}
				selected={selected}
				devMode={devMode}
				correctItem={task?.correctAnswer?.arabicLetter}
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
				timeout={elapsedTime}
				onClick={onFinished}
			/>
		</Row>
	)
}

export default TaskA
