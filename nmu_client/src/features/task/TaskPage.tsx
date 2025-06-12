'use client'

import TaskDesc from '@/components/task/TaskDesc'
import TaskProgress from '@/components/task/TaskProgress'
import TaskRenderer from '@/components/task/TaskRenderer'
import { GetTaskByIdQuery } from '@/graphql/generated/graphql'
import { CREATE_USER_TASK_PROGRESS, GET_TASK_BY_ID } from '@/graphql/task'
import { prepareTasks } from '@/lib/utils/prepareTasks'
import { useAuthStore } from '@/stores/auth.store'
import { useTaskStore } from '@/stores/task.store'
import { useMutation, useQuery } from '@apollo/client'
import { Row, Spin } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

interface IProps {
	taskId: string
}

const TaskPage = ({ taskId }: IProps) => {
	const router = useRouter()
	const { i18n } = useTranslation('common')
	const { user } = useAuthStore(state => state)
	const {
		setAllTasks,
		setCurrentTask,
		progress,
		currentCourseId,
		currentLessonId,
		score,
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
					courseId: currentCourseId,
					lessonId: currentLessonId,
					score: score,
					taskId: taskId,
					userId: user?._id || '',
				},
			},
			onCompleted() {
				router.push(`/lesson/${currentLessonId}`)
			},
			onError() {
				toast.error('Ошибка при завершений')
			},
		}
	)

	const task = data?.getTaskById
	const localizedData = task?.data?.[i18n.language] || task?.data?.ru || []

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
		}
	}, [localizedData, setAllTasks, setCurrentTask])

	const onFinishedHandler = () => {
		createUserTaskProgress()
	}

	return (
		<Spin spinning={loading || progressLoad}>
			<Row className='task_page'>
				<TaskProgress percent={progress} />
				<TaskDesc description='Описание задание' />
				<TaskRenderer type={task?.type} onFinished={onFinishedHandler} />
			</Row>
		</Spin>
	)
}

export default TaskPage
