'use client'

import LessonCard from '@/components/cards/LessonCard'
import LessonPromo from '@/components/promo/LessonPromo'
import { GET_COURSE_BY_ID } from '@/graphql/course'
import {
	GetCourseByIdQuery,
	GetLessonsByCourseIdQuery,
	UserCourseProgressByUserCourseQuery,
	UserLessonProgressOptionalQuery,
} from '@/graphql/generated/graphql'
import { GET_LESSON_BY_COURSE } from '@/graphql/lesson'
import {
	USER_COURSE_PROGRESS_BY_USER_COURSE,
	USER_LESSON_PROGRESS_OPTIONAL,
} from '@/graphql/progress'
import { useAuthStore } from '@/stores/auth.store'
import { useLoadingStore } from '@/stores/load.store'
import { useTaskStore } from '@/stores/task.store'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

interface IProps {
	courseId: string
}

const LessonList = ({ courseId }: IProps) => {
	const router = useRouter()
	const user = useAuthStore(state => state.user)
	const trialPeriod = useTaskStore(state => state.trialPeriod)
	const setLoading = useLoadingStore(state => state.setLoading)

	const { data: courseData, loading: courseLoad } =
		useQuery<GetCourseByIdQuery>(GET_COURSE_BY_ID, {
			variables: {
				id: courseId,
			},
		})

	const { data: courseProgressData, loading: progressCourseLoad } =
		useQuery<UserCourseProgressByUserCourseQuery>(
			USER_COURSE_PROGRESS_BY_USER_COURSE,
			{
				variables: {
					userId: user?._id || '',
					courseId: courseId,
				},
			}
		)

	const { data: lessonsData, loading } = useQuery<GetLessonsByCourseIdQuery>(
		GET_LESSON_BY_COURSE,
		{
			variables: {
				courseId,
			},
		}
	)

	const { data: lessonProgressData, loading: progressLessonLoad } =
		useQuery<UserLessonProgressOptionalQuery>(USER_LESSON_PROGRESS_OPTIONAL, {
			variables: {
				userId: user?._id || '',
			},
		})

	useEffect(() => {
		setLoading(
			loading || progressCourseLoad || progressCourseLoad || courseLoad
		)
	}, [loading, progressLessonLoad, progressCourseLoad, courseLoad])

	const lessons = useMemo(
		() =>
			(lessonsData?.getLessonsByCourseId ?? []).map(lesson => {
				const p = lessonProgressData?.userLessonProgressOptional?.find(
					pr => pr.lesson?._id === lesson?._id
				)

				return {
					...lesson,
					completed: p?.completed ?? false,
					score: p?.score ?? 0,
				}
			}),
		[lessonsData, lessonProgressData]
	)

	const courseProgress = courseProgressData?.userCourseProgressByUserCourse

	return (
		<>
			<LessonPromo
				courseName={courseData?.getCourseById?.courseName}
				description={courseData?.getCourseById?.description}
				progress={courseProgress?.score || 0}
			/>
			<div className='lesson_list'>
				{(trialPeriod ? lessons.slice(0, 5) : lessons)?.map(lesson => (
					<LessonCard
						key={lesson._id}
						lessonName={lesson.lessonName}
						description={lesson.description}
						progress={lesson.score}
						onClick={() => router.push(`/lesson/${lesson._id}`)}
					/>
				))}
			</div>
		</>
	)
}

export default LessonList
