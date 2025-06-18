'use client'

import TaskCard from '@/components/cards/TaskCard'
import LessonVideoPlayer from '@/components/player/LessonVideoPlayer'
import { GetLessonByIdQuery } from '@/graphql/generated/graphql'
import { GET_LESSON_BY_ID } from '@/graphql/lesson'
import { USER_TASK_PROGRESS_OPTIONAL } from '@/graphql/progress'
import { useAuthStore } from '@/stores/auth.store'
import { useTaskStore } from '@/stores/task.store'
import { useQuery } from '@apollo/client'
import { Row, Spin } from 'antd'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

interface IProps {
	lessonId: string
}

const LessonPage = ({ lessonId }: IProps) => {
	const router = useRouter()
	const { t, i18n } = useTranslation('common')
	const user = useAuthStore(state => state.user)
	const { setCurrenLessontId, reset } = useTaskStore(state => state)

	const { data, loading } = useQuery<GetLessonByIdQuery>(GET_LESSON_BY_ID, {
		variables: { id: lessonId },
	})

	const { data: taskProgressData, loading: progressLoad } = useQuery(
		USER_TASK_PROGRESS_OPTIONAL,
		{
			variables: {
				userId: user?._id || '',
			},
			fetchPolicy: 'network-only',
		}
	)

	const onClickHandler = (id?: string) => {
		reset()
		router.push(`/task/${id}`)
		setCurrenLessontId(lessonId)
	}

	const tasks = useMemo(
		() =>
			(data?.getLessonById?.tasks ?? []).map(task => {
				const p = taskProgressData?.userTaskProgressOptional?.find(
					pr => pr.task?._id === task?._id
				)
				return {
					...task,
					completed: p?.completed ?? false,
					score: p?.score ?? null,
				}
			}),
		[data, taskProgressData]
	)

	return (
		<Spin spinning={loading || progressLoad}>
			<Row className='lesson_container'>
				<LessonVideoPlayer lesson={data?.getLessonById} />

				<Row className='task_grid'>
					{tasks?.map((task, index) => {
						const localizeDesc = task?.description
							? task.description[i18n.language as 'kk' | 'ru']
							: 'ru'

						return (
							<TaskCard
								key={task?._id}
								title={`${index + 1}-${t('task')}`}
								description={localizeDesc}
								completed={task?.completed}
								score={task?.score}
								noDescText={t('noDesc')}
								onClick={() => onClickHandler(task?._id)}
							/>
						)
					})}
				</Row>
			</Row>
		</Spin>
	)
}

export default LessonPage
