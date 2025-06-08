'use client'

import TaskCard from '@/components/cards/TaskCard'
import LessonVideoPlayer from '@/components/player/LessonVideoPlayer'
import { GetLessonByIdQuery } from '@/graphql/generated/graphql'
import { GET_LESSON_BY_ID } from '@/graphql/lesson'
import { useQuery } from '@apollo/client'
import { Row, Spin } from 'antd'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

interface IProps {
	lessonId: string
}

const LessonPage = ({ lessonId }: IProps) => {
	const { t } = useTranslation('common')
	const router = useRouter()

	const { data, loading } = useQuery<GetLessonByIdQuery>(GET_LESSON_BY_ID, {
		variables: { id: lessonId },
	})

	return (
		<Spin spinning={loading}>
			<Row className='lesson_container'>
				<LessonVideoPlayer lesson={data?.getLessonById} />

				<Row className='task_grid'>
					{data?.getLessonById?.tasks?.map((task, index) => (
						<TaskCard
							key={task?._id}
							title={`${index + 1}-${t('task')}`}
							description={task?.description || ''}
							completed={false}
							completedText={t('completed')}
							inProgressText={t('inProgress')}
							noDescText={t('noDesc')}
							onClick={() => router.push(`/task/${task?._id}`)}
						/>
					))}
				</Row>
			</Row>
		</Spin>
	)
}

export default LessonPage
