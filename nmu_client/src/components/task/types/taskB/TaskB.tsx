'use client'

import { AudioPlayerHandle } from '@/components/player/AudioPlayer'
import { getRandomItems } from '@/lib/utils/getRandomItems'
import { useTaskStore } from '@/stores/task.store'
import { ITaskAB } from '@/types/tasks'
import { Row } from 'antd'
import { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TaskCheck from '../../TaskCheck'
import TaskResult from '../../TaskResult'
import TaskStatusAlert from '../../TaskStatusAlert'
import TaskAnswer from './TaskAnswer'
import TaskVariants from './TaskVariants'

interface IProps {
	onFinished: VoidFunction
}

const TaskB = ({ onFinished }: IProps) => {
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

	const task = currentTask as ITaskAB

	// Новый объект-реф
	const audioRefs = useRef<Record<string, AudioPlayerHandle | null>>({})
	const [playingIndex, setPlayingIndex] = useState<string | null>(null)
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
		setPlayingIndex(null)
		setSelected(null)
		// Остановить все плееры
		Object.values(audioRefs.current).forEach(ref => ref?.stop())
		nextTask()
	}

	const handlePlay = (refKey: string) => {
		// Остановить все кроме текущего
		Object.entries(audioRefs.current).forEach(([key, audio]) => {
			if (audio && key !== refKey) audio.stop()
		})
		setPlayingIndex(refKey)
		audioRefs.current[refKey]?.play()
	}

	const handleEnd = () => {
		setPlayingIndex(null)
	}

	return (
		<Row className='task_b'>
			<TaskAnswer arabicLetter={task?.correctAnswer?.arabicLetter} />

			<TaskVariants
				variants={variants}
				setSelected={setSelected}
				selected={selected}
				handleEnd={handleEnd}
				handlePlay={handlePlay}
				playingIndex={playingIndex}
				audioRefs={audioRefs}
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

export default TaskB
