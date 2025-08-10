'use client'

import { useTaskStore } from '@/stores/task.store'
import { ITaskF } from '@/types/tasks'
import { Row } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import TaskCheck from '../../TaskCheck'
import TaskResult from '../../TaskResult'
import TaskStatusAlert from '../../TaskStatusAlert'
import TaskAnswer from './TaskAnswer'
import TaskVarinats from './TaskVarinats'

interface IProps {
	onFinished: VoidFunction
}

const TaskF = ({ onFinished }: IProps) => {
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

	const task = currentTask as ITaskF

	const [selected, setSelected] = useState<string[]>([])

	const checkHandle = () => {
		if (!selected.length) return
		const correctLetters = task.types

		const isCorrect =
			selected.length === correctLetters.length &&
			selected.every((letter, idx) => letter === correctLetters[idx])

		if (isCorrect) {
			markCorrect(task)
			setStatus('success')
		} else {
			markWrong(task)
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
		<Row className='task_f'>
			<TaskAnswer arabicLetter={task?.letter} />

			<TaskVarinats selected={selected} setSelected={setSelected} />

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

export default TaskF
