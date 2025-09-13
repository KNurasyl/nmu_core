'use client'

import { MonitoringItem, MonitoringTableHandlers } from '@/types/types'
import { useEffect, useRef, useState } from 'react'
import ActionMenu from './ActionMenu'

type Props = {
	items: MonitoringItem[]
	loading: boolean
	handlers: MonitoringTableHandlers
	rowClassName?: (row: MonitoringItem) => string
	formatDate: (d?: string | null) => string
}

/* helpers */
const StatusPill = ({ ok }: { ok: boolean }) => (
	<span
		className={`inline-flex h-6 items-center rounded-full px-2 text-xs ${
			ok ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
		}`}
	>
		{ok ? 'Да' : 'Нет'}
	</span>
)

const IdlePill = ({ days }: { days?: number | null }) => {
	if (days == null) return <span>—</span>
	if (days === 0)
		return (
			<span className='inline-flex h-6 items-center rounded-full bg-green-50 px-2 text-xs text-green-700'>
				Сегодня
			</span>
		)
	const tone =
		days > 5 ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
	return (
		<span
			className={`inline-flex h-6 items-center rounded-full px-2 text-xs ${tone}`}
		>
			{days}
		</span>
	)
}

const CoursesProgress = ({
	list,
}: {
	list: MonitoringItem['coursesProgress']
}) => {
	const arr = Array.isArray(list) ? list.filter(Boolean) : []
	if (arr.length === 0) return <span>—</span>
	const head = arr.slice(0, 3)
	const rest = arr.length - head.length
	return (
		<div className='flex flex-col gap-1'>
			{head.map(p => {
				const done = Number(p?.completedLessons ?? 0)
				const total = Number(p?.totalLessons ?? 0)
				const isDone = total > 0 && done >= total
				return (
					<div key={String(p?.courseId)} className='flex items-center gap-2'>
						<span
							className={`inline-flex h-6 items-center rounded-full px-2 text-xs ${
								isDone
									? 'bg-green-50 text-green-700'
									: 'bg-blue/5 text-blue-900'
							}`}
						>
							{done}/{total}
						</span>
						<span
							className='max-w-[320px] truncate'
							title={String(p?.courseName ?? '')}
						>
							{p?.courseName}
						</span>
					</div>
				)
			})}
			{rest > 0 && <span className='text-xs text-gray-600'>+{rest}</span>}
		</div>
	)
}

const CourseBadges = ({
	list,
}: {
	list: MonitoringItem['availableCourses']
}) => {
	const arr = Array.isArray(list) ? list.filter(Boolean) : []
	if (arr.length === 0) return <span>—</span>
	const head = arr.slice(0, 2)
	const more = arr.length - head.length
	return (
		<div className='flex flex-wrap gap-1'>
			{head.map(c => (
				<span
					key={String(c?.courseId)}
					title={String(c?.courseName ?? '')}
					className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs ${
						c?.trialPeriod
							? 'border-amber-300 text-amber-700'
							: 'border-blue/40 text-gray-900'
					}`}
				>
					<span aria-hidden>📘</span>
					<span className='max-w-[160px] truncate'>{c?.courseName}</span>
					{c?.trialPeriod && <span className='text-amber-700'>(Пробный)</span>}
				</span>
			))}
			{more > 0 && (
				<span className='rounded-lg border border-blue/40 px-2 py-1 text-xs text-gray-900'>
					+{more}
				</span>
			)}
		</div>
	)
}

/* ====== TABLE ====== */
export default function MonitoringTable({
	items,
	loading,
	handlers,
	rowClassName,
	formatDate,
}: Props) {
	const hScrollRef = useRef<HTMLDivElement>(null)
	const [canLeft, setCanLeft] = useState(false)
	const [canRight, setCanRight] = useState(false)

	const updateArrows = () => {
		const el = hScrollRef.current
		if (!el) return
		const { scrollLeft, scrollWidth, clientWidth } = el
		setCanLeft(scrollLeft > 0)
		setCanRight(scrollLeft + clientWidth < scrollWidth - 1)
	}

	useEffect(() => {
		updateArrows()
		const el = hScrollRef.current
		if (!el) return
		const onScroll = () => updateArrows()
		el.addEventListener('scroll', onScroll, { passive: true })
		window.addEventListener('resize', updateArrows)
		return () => {
			el.removeEventListener('scroll', onScroll)
			window.removeEventListener('resize', updateArrows)
		}
	}, [])

	useEffect(updateArrows, [items])

	const scrollByX = (dx: number) => {
		hScrollRef.current?.scrollBy({ left: dx, behavior: 'smooth' })
	}

	return (
		<div className='relative'>
			{/* ЛЕВАЯ ШТОРКА */}
			<button
				aria-label='Прокрутить влево'
				onClick={() =>
					scrollByX(-(hScrollRef.current?.clientWidth ?? 600) * 0.8)
				}
				className={`absolute left-0 top-0 bottom-0 z-20 w-12 cursor-ew-resize
        flex items-center justify-center select-none
        bg-gradient-to-r from-black/20 to-transparent
        hover:from-black/30 transition
        ${
					canLeft
						? 'opacity-100 pointer-events-auto'
						: 'opacity-0 pointer-events-none'
				}`}
			>
				{/* «ручка» */}
				<div className='pointer-events-none flex gap-1'>
					<span className='h-10 w-1 rounded bg-white/70' />
					<span className='h-10 w-1 rounded bg-white/60' />
					<span className='h-10 w-1 rounded bg-white/70' />
				</div>
			</button>

			{/* ПРАВАЯ ШТОРКА */}
			<button
				aria-label='Прокрутить вправо'
				onClick={() =>
					scrollByX((hScrollRef.current?.clientWidth ?? 600) * 0.8)
				}
				className={`absolute right-0 top-0 bottom-0 z-20 w-12 cursor-ew-resize
        flex items-center justify-center select-none
        bg-gradient-to-l from-black/20 to-transparent
        hover:from-black/30 transition
        ${
					canRight
						? 'opacity-100 pointer-events-auto'
						: 'opacity-0 pointer-events-none'
				}`}
			>
				<div className='pointer-events-none flex gap-1'>
					<span className='h-10 w-1 rounded bg-white/70' />
					<span className='h-10 w-1 rounded bg-white/60' />
					<span className='h-10 w-1 rounded bg-white/70' />
				</div>
			</button>

			{/* ПРОКРУЧИВАЕМЫЙ КОНТЕЙНЕР */}
			<div
				ref={hScrollRef}
				className='max-w-full overflow-x-auto no-scrollbar rounded-2xl border border-border bg-card'
			>
				<table className='min-w-[1100px] w-full border-separate border-spacing-0 text-sm text-gray-900'>
					<thead>
						<tr className='text-left'>
							{[
								['Студент', 'w-[180px]'],
								['Телефон', 'w-[140px] text-center'],
								['Сервис', 'w-[110px] text-center'],
								['Дата актив.', 'w-[140px] text-center'],
								['Не заходил', 'w-[120px] text-center'],
								['Последний урок', 'w-[200px] text-center'],
								['Прогресс по курсам', 'w-[280px]'],
								['Доступные курсы', 'w-[220px] text-center'],
								['···', 'w-[48px] text-center'],
							].map(([title, w], i) => (
								<th
									key={i}
									className={`sticky top-0 z-20 bg-muted px-3 py-2 shadow-sm ${w}`}
								>
									{title}
								</th>
							))}
						</tr>
					</thead>

					<tbody>
						{loading ? (
							<tr>
								<td colSpan={9} className='px-3 py-6 text-center text-gray-600'>
									Загружаем…
								</td>
							</tr>
						) : (
							items.map(r => {
								const has = r.hasMentorSupport ?? true
								const frozen = !!r.isFrozen
								const rowTone = !has
									? 'text-red-700 font-medium'
									: 'text-gray-900'
								return (
									<tr
										key={r._id}
										className={`border-t border-border ${
											rowClassName?.(r) ?? ''
										} ${rowTone}`}
									>
										<td className='px-3 py-2'>
											<div className='flex items-center gap-2'>
												<span title={r.userName ?? ''} className='truncate'>
													{r.userName}
												</span>
												{!has && (
													<span className='rounded-full bg-red-50 px-2 text-xs text-red-700'>
														Сервис остановлен
													</span>
												)}
												{frozen && (
													<span className='rounded-full bg-blue/5 px-2 text-xs text-blue-900'>
														Заморожен
													</span>
												)}
											</div>
										</td>
										<td className='px-3 py-2 text-center'>
											{r.phoneNumber ? (
												<a
													className='text-blue underline'
													href={`tel:${r.phoneNumber}`}
												>
													{r.phoneNumber}
												</a>
											) : (
												'—'
											)}
										</td>
										<td className='px-3 py-2 text-center'>
											<StatusPill ok={has} />
										</td>
										<td className='px-3 py-2 text-center'>
											{formatDate(r.lastActiveDate)}
										</td>
										<td className='px-3 py-2 text-center'>
											<IdlePill
												days={r.lastActiveDays as number | null | undefined}
											/>
										</td>
										<td className='px-3 py-2 text-center'>
											{r.lastActiveLesson ?? '—'}
										</td>
										<td className='px-3 py-2'>
											<CoursesProgress list={r.coursesProgress} />
										</td>
										<td className='px-3 py-2 text-center'>
											<CourseBadges list={r.availableCourses} />
										</td>
										<td className='px-1 py-2 text-center'>
											<ActionMenu record={r} handlers={handlers} />
										</td>
									</tr>
								)
							})
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}
