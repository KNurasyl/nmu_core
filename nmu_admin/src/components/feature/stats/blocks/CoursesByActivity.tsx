'use client'

import { useMemo, useState } from 'react'

type Row = {
	key: string
	courseName: string
	count: number
	percentOfActive: number
}

export default function CoursesByActivity({
	loading,
	rows,
	note,
}: {
	loading: boolean
	rows: Row[]
	note?: string
}) {
	const [sortDir, setSortDir] = useState<'desc' | 'asc'>('desc')

	const sorted = useMemo(() => {
		const list = [...rows]
		list.sort((a, b) =>
			sortDir === 'desc' ? b.count - a.count : a.count - b.count
		)
		return list
	}, [rows, sortDir])

	return (
		<section className='rounded-2xl border border-border bg-card p-3 md:p-4'>
			<div className='flex items-center justify-between gap-3'>
				<h2 className='text-lg font-semibold text-gray-800'>
					Активные студенты по курсам
				</h2>
				{note && (
					<div className='hidden md:block text-sm text-gray-600'>{note}</div>
				)}
			</div>

			<div className='md:hidden mt-1 text-xs text-gray-600'>{note}</div>

			{/* пусто / загрузка */}
			{loading ? (
				<div className='mt-4 grid gap-2'>
					{[...Array(5)].map((_, i) => (
						<div
							key={i}
							className='h-14 rounded-xl border border-border bg-muted animate-pulse text-gray-800'
						/>
					))}
				</div>
			) : rows.length === 0 ? (
				<div className='mt-6 text-center text-sm text-gray-600'>
					Нет данных по курсам
				</div>
			) : (
				<>
					{/* Desktop table */}
					<div className='hidden md:block mt-3 overflow-x-auto no-scrollbar'>
						<table className='min-w-[720px] w-full text-sm'>
							<thead>
								<tr className='text-left text-gray-600'>
									<th className='px-3 py-2 w-16'>#</th>
									<th className='px-3 py-2'>Курс</th>
									<th
										className='px-3 py-2 w-36 text-right cursor-pointer select-none'
										onClick={() =>
											setSortDir(d => (d === 'desc' ? 'asc' : 'desc'))
										}
										title='Сортировать по количеству'
									>
										Учащихся {sortDir === 'desc' ? '↓' : '↑'}
									</th>
								</tr>
							</thead>
							<tbody>
								{sorted.map((r, i) => (
									<tr key={r.key} className='border-t border-border'>
										<td className='px-3 py-2 text-gray-800'>{i + 1}</td>
										<td className='px-3 py-2 truncate text-gray-800'>
											{r.courseName}
										</td>
										<td className='px-3 py-2 text-right text-gray-800'>
											{new Intl.NumberFormat('ru-RU').format(r.count)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Mobile cards */}
					<div className='md:hidden mt-3 grid gap-2'>
						{sorted.map((r, i) => (
							<div
								key={r.key}
								className='rounded-xl border border-border bg-card p-3'
							>
								<div className='flex items-center justify-between'>
									<div className='font-medium truncate pr-2 text-gray-800'>
										{i + 1}. {r.courseName}
									</div>
									<div className='text-sm text-gray-800'>{r.count}</div>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</section>
	)
}
