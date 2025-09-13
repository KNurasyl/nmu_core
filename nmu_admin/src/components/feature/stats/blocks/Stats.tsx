'use client'

import { GET_USER_STATS } from '@/graphql/user'
import { useQuery } from '@apollo/client'
import { useMemo } from 'react'
import CoursesByActivity from './CoursesByActivity'
import SummaryGrid from './SummaryGrid'

type CourseRow = {
	key: string
	courseName: string
	count: number
	percentOfActive: number
}

export default function Stats() {
	const { data, loading, error, refetch } = useQuery(GET_USER_STATS, {
		fetchPolicy: 'cache-and-network',
	})
	const stats = data?.studentStatistics

	const courseRows: CourseRow[] = useMemo(() => {
		if (!stats?.courseStudents) return []
		const active = Math.max(stats.activeStudents || 0, 0)
		return stats.courseStudents.map(({ course, count }: any) => ({
			key: course.id,
			courseName: course.courseName,
			count,
			percentOfActive: active > 0 ? Math.round((count / active) * 100) : 0,
		}))
	}, [stats])

	return (
		<div className='mx-auto w-full max-w-5xl space-y-4 pb-24'>
			{/* header */}
			<div className='flex items-center justify-between gap-3'>
				<h1 className='text-xl md:text-2xl font-semibold text-gray-800'>
					Статистика студентов
				</h1>

				<button
					onClick={() => refetch()}
					disabled={loading}
					className='inline-flex items-center gap-2 rounded-xl bg-blue px-3 py-2 text-sm text-white hover:opacity-90 disabled:opacity-50'
				>
					<svg className='h-4 w-4' viewBox='0 0 24 24' fill='none'>
						<path
							d='M20 12a8 8 0 10-2.343 5.657M20 12V6m0 6h-6'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
					Обновить
				</button>
			</div>

			{/* ошибки / загрузка первого экрана */}
			{error && (
				<div className='rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
					<div className='font-medium text-gray-900'>
						Не удалось загрузить статистику
					</div>
					<div className='mt-1'>{error.message}</div>
				</div>
			)}

			{/* метрики */}
			<SummaryGrid
				loading={loading && !stats}
				total={stats?.totalStudents ?? 0}
				active={stats?.activeStudents ?? 0}
				frozen={stats?.frozenStudents ?? 0}
				noMentor={stats?.noMentorStudents ?? 0}
			/>

			{/* распределение по курсам */}
			<CoursesByActivity
				loading={loading && !stats}
				rows={courseRows}
				note='* Студент может учиться на нескольких курсах одновременно'
			/>
		</div>
	)
}
