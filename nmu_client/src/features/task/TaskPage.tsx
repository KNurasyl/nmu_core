'use client'

import TaskDesc from '@/components/task/TaskDesc'
import TaskProgress from '@/components/task/TaskProgress'
import TaskRenderer from '@/components/task/TaskRenderer'
import { GetTaskByIdQuery } from '@/graphql/generated/graphql'
import {
	USER_LESSON_PROGRESS_OPTIONAL,
	USER_TASK_PROGRESS_OPTIONAL,
} from '@/graphql/progress'
import { CREATE_USER_TASK_PROGRESS, GET_TASK_BY_ID } from '@/graphql/task'
import { prepareTasks } from '@/lib/utils/prepareTasks'
import { useAuthStore } from '@/stores/auth.store'
import { useLoadingStore } from '@/stores/load.store'
import { useTaskStore } from '@/stores/task.store'
import { ITaskE } from '@/types/tasks'
import { useMutation, useQuery } from '@apollo/client'
import { Row } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

interface IProps {
	taskId: string
}

const TaskPage = ({ taskId }: IProps) => {
	const router = useRouter()
	const { i18n, t } = useTranslation('common')
	const { user } = useAuthStore(state => state)
	const setLoading = useLoadingStore(state => state.setLoading)
	const {
		setAllTasks,
		setCurrentTask,
		setTaskType,
		progress,
		currentCourseId,
		currentLessonId,
		currentTask,
		score,
		elapsedTime,
		taskHistory,
	} = useTaskStore(state => state)

	const { data, loading } = useQuery<GetTaskByIdQuery>(GET_TASK_BY_ID, {
		variables: {
			id: taskId,
		},
	})

	const [createUserTaskProgress, { loading: progressLoad }] = useMutation(
		CREATE_USER_TASK_PROGRESS,
		{
			variables: {
				input: {
					completed: true,
					completedAt: new Date(),
					courseId: currentCourseId || '',
					lessonId: currentLessonId || '',
					score: score,
					taskId: taskId,
					userId: user?._id || '',
					elapsedTime: elapsedTime,
					results: {
						taskType: taskHistory?.taskType,
						correct: taskHistory?.correct,
						inCorrect: taskHistory?.inCorrect,
					},
				},
			},
			refetchQueries: [
				{
					query: USER_TASK_PROGRESS_OPTIONAL,
					variables: { userId: user?._id },
				},
				{
					query: USER_LESSON_PROGRESS_OPTIONAL,
					variables: { userId: user?._id },
				},
			],
			awaitRefetchQueries: true,
			onCompleted() {
				router.back()
			},
			onError() {
				toast.error('Ошибка при завершений')
			},
		}
	)

	const getPositionDesc = (position?: string) => {
		switch (position) {
			case 'start':
				return t('startWordDesc')
			case 'middle':
				return t('middleWordDesc')
			case 'end':
				return t('endWordDesc')
			default:
				return (
					task?.description?.[i18n.language as 'kk' | 'ru'] ||
					task?.description?.['ru'] ||
					''
				)
		}
	}

	const task = data?.getTaskById
	const localizedData = task?.data?.[i18n.language] || task?.data?.ru || []
	const localizeDesc = getPositionDesc((currentTask as ITaskE)?.position)

	useEffect(() => {
		if (localizedData && localizedData.length) {
			if (task?.type === 'e') {
				const tasks = localizedData[0]?.quiz
				setAllTasks(tasks)
				setCurrentTask(tasks[0] || null)
			} else if (task?.type === 'f' || task?.type === 'g') {
				const tasks = prepareTasks(localizedData[0].data)
				setAllTasks(tasks)
				setCurrentTask(tasks[0] || null)
			} else {
				const tasks = prepareTasks(localizedData)
				setAllTasks(tasks)
				setCurrentTask(tasks[0] || null)
			}

			setTaskType(task?.type || '')
		}
	}, [localizedData, setAllTasks, setCurrentTask])

	useEffect(() => {
		setLoading(loading || progressLoad)
	}, [loading, progressLoad])

	const onFinishedHandler = () => {
		createUserTaskProgress()
	}

	return (
		<Row className='task_page'>
			<TaskProgress percent={progress} onClose={() => router.back()} />
			<TaskDesc description={localizeDesc} />
			<TaskRenderer type={task?.type} onFinished={onFinishedHandler} />
		</Row>
	)
}

export default TaskPage
