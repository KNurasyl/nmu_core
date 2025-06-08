/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import TaskDesc from '@/components/task/TaskDesc'
import TaskProgress from '@/components/task/TaskProgress'
import TaskRenderer from '@/components/task/TaskRenderer'
import { GetTaskByIdQuery } from '@/graphql/generated/graphql'
import { GET_TASK_BY_ID } from '@/graphql/task'
import { useQuery } from '@apollo/client'
import { Row, Spin } from 'antd'
// import { useState } from 'react'

interface IProps {
	taskId: string
}

const TaskPage = ({ taskId }: IProps) => {
	const { data, loading } = useQuery<GetTaskByIdQuery>(GET_TASK_BY_ID, {
		variables: {
			id: taskId,
		},
	})

	const tasks = data?.getTaskById?.data || []

	// const [currentIndex, setCurrentIndex] = useState(0)
	// const [answers, setAnswers] = useState<Record<string, any>>({})

	// const currentTask = tasks[currentIndex]

	console.log(tasks)

	return (
		<Spin spinning={loading}>
			<Row className='task_page'>
				<TaskProgress percent={0} />
				<TaskDesc description='Описание задание' />
				<TaskRenderer type={'a'} data={[]} value={''} onChange={() => {}} />
			</Row>
		</Spin>
	)
}

export default TaskPage
