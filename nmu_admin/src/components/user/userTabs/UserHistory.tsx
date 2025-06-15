import {
	UserCourseProgressOptionalQuery,
	UserLessonProgressOptionalQuery,
	UserTaskProgressOptionalQuery,
} from '@/graphql/generated/graphql'
import {
	USER_COURSE_PROGRESS_OPTIONAL,
	USER_LESSON_PROGRESS_OPTIONAL,
	USER_TASK_PROGRESS_OPTIONAL,
} from '@/graphql/progeress'
import { useQuery } from '@apollo/client'
import { Row, Table, TableProps, Tabs } from 'antd'
import {
	courseHistoryColumn,
	ICourseHistory,
} from './table/historyTable/CourseHistoryColumn'
import {
	ILessonHistory,
	lessonHistoryColumn,
} from './table/historyTable/LessonHistoryColumn'
import {
	ITaskHistory,
	taskHistoryColumn,
} from './table/historyTable/TaskHistoryColumn'

interface IProps {
	userId: string
}

interface ITabTable<T> {
	rowKey: string
	loading: boolean
	columns: TableProps<T>['columns']
	dataSource: T[] | undefined
}

const TabTable = <T extends object>({
	loading,
	columns,
	dataSource,
	rowKey,
}: ITabTable<T>) => (
	<Table<T>
		style={{ height: '100%', width: '100%' }}
		loading={loading}
		columns={columns}
		dataSource={dataSource}
		rowKey={rowKey}
	/>
)

const UserHistory = ({ userId }: IProps) => {
	const { data: courseData, loading: courseLoad } =
		useQuery<UserCourseProgressOptionalQuery>(USER_COURSE_PROGRESS_OPTIONAL, {
			variables: {
				userId,
			},
		})

	const { data: lessonData, loading: lessonLoad } =
		useQuery<UserLessonProgressOptionalQuery>(USER_LESSON_PROGRESS_OPTIONAL, {
			variables: {
				userId,
			},
		})

	const { data: taskData, loading: taskLoad } =
		useQuery<UserTaskProgressOptionalQuery>(USER_TASK_PROGRESS_OPTIONAL, {
			variables: {
				userId,
			},
		})

	const item = [
		{
			key: 'courses',
			label: 'Курсы',
			children: (
				<TabTable<ICourseHistory>
					rowKey='_id'
					loading={courseLoad}
					columns={courseHistoryColumn}
					dataSource={courseData?.userCourseProgressOptional}
				/>
			),
		},
		{
			key: 'lessons',
			label: 'Уроки',
			children: (
				<TabTable<ILessonHistory>
					rowKey='_id'
					loading={lessonLoad}
					columns={lessonHistoryColumn}
					dataSource={lessonData?.userLessonProgressOptional}
				/>
			),
		},
		{
			key: 'tasks',
			label: 'Задачи',
			children: (
				<TabTable<ITaskHistory>
					rowKey='_id'
					loading={taskLoad}
					columns={taskHistoryColumn}
					dataSource={taskData?.userTaskProgressOptional}
				/>
			),
		},
	]

	return (
		<Row style={{ width: '100%', height: '100%' }}>
			<Tabs
				style={{ width: '100%', height: '100%' }}
				type='card'
				items={item}
			/>
		</Row>
	)
}

export default UserHistory
