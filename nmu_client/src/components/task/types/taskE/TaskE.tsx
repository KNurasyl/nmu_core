'use client'

import { useTaskStore } from '@/stores/task.store'
import { ITaskE } from '@/types/tasks'
import { Row } from 'antd'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TaskCheck from '../../TaskCheck'
import TaskResult from '../../TaskResult'
import TaskStatusAlert from '../../TaskStatusAlert'
import TaskLetterButtons from './TaskLetterButtons'
import TaskLettersDisplay from './TaskLettersDisplay'

interface IProps {
	onFinished: VoidFunction
}

const TaskE = ({ onFinished }: IProps) => {
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

	const task = currentTask as ITaskE

	const [selected, setSelected] = useState<string[]>([])

	const variants = useMemo(() => {
		if (!task) return []
		return task?.correctVariants.concat(task?.inCorrectVariants)
	}, [task])

	const checkHandle = () => {
		if (!selected) return
		const correctLetters = task.correctVariants.map(v => v.letter)

		const isCorrect =
			selected.length === correctLetters.length &&
			selected.every((letter, idx) => letter === correctLetters[idx])

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
		<Row className='task_e'>
			<TaskLettersDisplay letters={selected} setSelected={setSelected} />

			<TaskLetterButtons
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

export default TaskE
