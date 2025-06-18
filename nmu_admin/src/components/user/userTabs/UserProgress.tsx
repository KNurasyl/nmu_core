import {
	GetLessonByIdQuery,
	GetLessonsByCourseIdQuery,
	GetUserByIdQuery,
	UserCourseProgressOptionalQuery,
	UserLessonProgressOptionalQuery,
} from '@/graphql/generated/graphql'
import { GET_LESSON_BY_COURSE, GET_LESSON_BY_ID } from '@/graphql/lesson'
import {
	USER_COURSE_PROGRESS_OPTIONAL,
	USER_LESSON_PROGRESS_OPTIONAL,
	USER_TASK_PROGRESS_OPTIONAL,
} from '@/graphql/progeress'
import { GET_USER_BY_ID } from '@/graphql/user'
import { useQuery } from '@apollo/client'
import { Card, Progress, Row, Spin, Tag } from 'antd'
import { useMemo, useState } from 'react'
import UserTaskProgressModal from '../userModal/UserTaskProgressModal'

interface ITask {
	completed: boolean
	score: number | null
	__typename?: 'Task'
	_id?: string | undefined
	lessonCode?: string | undefined
	type?: string | undefined
	description?: {
		__typename?: 'Description'
		kk: string
		ru: string
	} | null
}

interface IProps {
	userId: string
}

const renderProgressRow = (score?: number | null) => (
	<Row align='middle' justify='space-between' style={{ width: '100%' }}>
		<Progress
			percent={score || 0}
			showInfo={false}
			strokeColor='#4a7a48'
			trailColor='#5556'
			size='small'
			style={{ width: '80%' }}
		/>
		<span className='course_card__percent'>{score ?? 0}%</span>
	</Row>
)

const UserProgress = ({ userId }: IProps) => {
	const [open, setOpen] = useState(false)
	const [selectCourse, setSelectCourse] = useState<string | null>(null)
	const [selectLesson, setSelectLesson] = useState<string | null>(null)
	const [selectTask, setSelectTask] = useState<ITask | null>(null)
	const [selectTaskId, setSelectTaskId] = useState<string | null>(null)

	const { data: userData, loading: userLoading } = useQuery<GetUserByIdQuery>(
		GET_USER_BY_ID,
		{ variables: { id: userId } }
	)

	const { data: courseProgressData, loading: courseProgressLoading } =
		useQuery<UserCourseProgressOptionalQuery>(USER_COURSE_PROGRESS_OPTIONAL, {
			variables: { userId },
		})

	const { data: lessonsData, loading: lessonsLoading } =
		useQuery<GetLessonsByCourseIdQuery>(GET_LESSON_BY_COURSE, {
			variables: { courseId: selectCourse },
			skip: !selectCourse,
		})

	const { data: lessonProgressData, loading: lessonProgressLoading } =
		useQuery<UserLessonProgressOptionalQuery>(USER_LESSON_PROGRESS_OPTIONAL, {
			variables: { userId },
		})

	const { data: lessonData, loading: lessonLoading } =
		useQuery<GetLessonByIdQuery>(GET_LESSON_BY_ID, {
			variables: { id: selectLesson },
			skip: !selectLesson,
		})

	const { data: taskProgressData, loading: taskProgressLoading } = useQuery(
		USER_TASK_PROGRESS_OPTIONAL,
		{
			variables: { userId },
			fetchPolicy: 'network-only',
		}
	)

	const courseList = useMemo(() => {
		return (userData?.getUserById.courseAccesses ?? []).map(access => {
			const progress = courseProgressData?.userCourseProgressOptional?.find(
				p => p.course?._id === access.course?._id
			)
			return {
				...access,
				completed: progress?.completed ?? false,
				score: progress?.score ?? 0,
			}
		})
	}, [userData, courseProgressData])

	const lessons = useMemo(() => {
		return (lessonsData?.getLessonsByCourseId ?? []).map(lesson => {
			const progress = lessonProgressData?.userLessonProgressOptional?.find(
				p => p.lesson?._id === lesson._id
			)
			return {
				...lesson,
				completed: progress?.completed ?? false,
				score: progress?.score ?? 0,
			}
		})
	}, [lessonsData, lessonProgressData])

	const tasks = useMemo(() => {
		return (lessonData?.getLessonById?.tasks ?? []).map(task => {
			const progress = taskProgressData?.userTaskProgressOptional?.find(
				p => p.task?._id === task?._id
			)
			return {
				...task,
				completed: progress?.completed ?? false,
				score: progress?.score ?? null,
			}
		})
	}, [lessonData, taskProgressData])

	const isLoading =
		userLoading ||
		courseProgressLoading ||
		lessonsLoading ||
		lessonLoading ||
		lessonProgressLoading ||
		taskProgressLoading

	const handleBack = () => {
		if (selectTask) return setSelectTask(null)
		if (selectLesson) return setSelectLesson(null)
		if (selectCourse) return setSelectCourse(null)
	}

	return (
		<Spin spinning={isLoading}>
			<UserTaskProgressModal
				open={open}
				onClose={() => setOpen(false)}
				userId={userId}
				taskId={selectTaskId || ''}
				lessonId={selectLesson || ''}
				courseId={selectCourse || ''}
				completed={selectTask?.completed || false}
			/>

			{(selectTask || selectLesson || selectCourse) && (
				<Row style={{ marginBottom: 20 }}>
					<button
						onClick={handleBack}
						style={{
							padding: '6px 12px',
							backgroundColor: '#4a7a48',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer',
						}}
					>
						← Назад
					</button>
				</Row>
			)}

			<Row
				align='middle'
				justify='space-between'
				style={{
					width: '100%',
					height: '100%',
					gap: 20,
					overflowY: 'scroll',
				}}
			>
				{/* КУРСЫ */}
				{!selectCourse &&
					courseList?.map(course => (
						<Card
							key={course._id}
							title={course.course?.courseName}
							style={{ width: '30%', cursor: 'pointer' }}
							onClick={() => setSelectCourse(course.course?._id)}
						>
							{renderProgressRow(course.score)}
						</Card>
					))}

				{/* УРОКИ */}
				{selectCourse &&
					!selectLesson &&
					lessons.map(lesson => (
						<Card
							key={lesson._id}
							title={lesson.lessonName}
							style={{ width: '30%', cursor: 'pointer' }}
							onClick={() => setSelectLesson(lesson._id)}
						>
							{renderProgressRow(lesson.score)}
						</Card>
					))}

				{/* ТАСКИ */}
				{selectLesson &&
					!selectTask &&
					tasks.map((task, index) => (
						<Card
							key={task._id}
							style={{ width: '30%', cursor: 'pointer' }}
							onClick={() => {
								setOpen(true)
								setSelectTaskId(task?._id || '')
							}}
						>
							<Row
								justify='space-between'
								align='middle'
								style={{ marginBottom: 12 }}
							>
								<span>{`${index + 1}-задание`}</span>
								<Tag color={task.completed ? 'green' : 'red'}>
									{task.completed ? 'выполнено' : 'не выполнено'}
								</Tag>
							</Row>
							{renderProgressRow(task.score)}
						</Card>
					))}
			</Row>
		</Spin>
	)
}

export default UserProgress
