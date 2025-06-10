'use client'

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
	} = useTaskStore(state => state)

	const task = currentTask as ITaskAB

	const audioRefs = useRef<(HTMLAudioElement | null)[]>([])
	const [playingIndex, setPlayingIndex] = useState<number | null>(null)
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

	const handlePlay = (idx: number) => {
		// Остановить всё кроме выбранного
		audioRefs.current.forEach((audio, i) => {
			if (audio && i !== idx) audio.pause()
		})
		// Запустить выбранный
		setPlayingIndex(idx)
		audioRefs.current[idx]?.play()
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
				timeout={'05:00'}
				onClick={onFinished}
			/>
		</Row>
	)
}

export default TaskB
