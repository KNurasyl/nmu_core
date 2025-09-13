'use client'

import { MonitoringItem, MonitoringTableHandlers } from '@/types/types'
import ActionMenu from './ActionMenu'

type Props = {
	user: MonitoringItem
	handlers: MonitoringTableHandlers
	formatDate: (d?: string | null) => string
}

export default function MonitoringCard({ user, handlers, formatDate }: Props) {
	const has = user.hasMentorSupport ?? true
	const frozen = !!user.isFrozen
	const p = user.coursesProgress?.[0]
	const done = Number(p?.completedLessons ?? 0)
	const total = Number(p?.totalLessons ?? 0)

	return (
		<div className='rounded-2xl border border-border bg-card p-3 text-gray-900 shadow-sm'>
			<div className='flex items-start justify-between gap-3'>
				<div>
					<div className='text-base font-semibold'>{user.userName ?? '—'}</div>
					<div className='text-sm'>
						{user.phoneNumber ? (
							<a
								className='text-blue underline'
								href={`tel:${user.phoneNumber}`}
							>
								{user.phoneNumber}
							</a>
						) : (
							'—'
						)}
					</div>
				</div>

				<ActionMenu
					record={user}
					handlers={handlers}
					buttonClassName='rounded-xl bg-muted px-3 py-1.5 hover:bg-blue/10 text-gray-900'
				/>
			</div>

			<div className='mt-2 flex flex-wrap gap-2'>
				{!has && (
					<span className='rounded-full bg-red-50 px-2 py-1 text-xs text-red-700'>
						Сервис остановлен
					</span>
				)}
				{frozen && (
					<span className='rounded-full bg-blue/5 px-2 py-1 text-xs text-blue-900'>
						Заморожен
					</span>
				)}
			</div>

			<div className='mt-3 grid grid-cols-2 gap-2 text-sm'>
				<div className='rounded-xl border border-border p-2'>
					<div className='text-xs text-gray-600'>Дата актив.</div>
					<div>{formatDate(user.lastActiveDate)}</div>
				</div>
				<div className='rounded-xl border border-border p-2'>
					<div className='text-xs text-gray-600'>Не заходил</div>
					<div>
						{user.lastActiveDays == null
							? '—'
							: user.lastActiveDays === 0
							? 'Сегодня'
							: user.lastActiveDays}
					</div>
				</div>

				<div className='col-span-2 rounded-xl border border-border p-2'>
					<div className='text-xs text-gray-600'>Последний урок</div>
					<div className='truncate'>{user.lastActiveLesson ?? '—'}</div>
				</div>

				<div className='col-span-2 rounded-xl border border-border p-2'>
					<div className='text-xs text-gray-600'>Прогресс (первый курс)</div>
					<div className='mt-1 inline-flex items-center gap-2'>
						<span className='rounded-full bg-blue/5 px-2 text-xs'>
							{done}/{total}
						</span>
						<span className='truncate'>{p?.courseName ?? '—'}</span>
					</div>
				</div>

				<div className='col-span-2 rounded-xl border border-border p-2'>
					<div className='text-xs text-gray-600'>Доступные курсы</div>
					<div className='mt-1 flex flex-wrap gap-1'>
						{(user.availableCourses ?? []).slice(0, 3).map(c => (
							<span
								key={String(c?.courseId)}
								className={`rounded-lg border px-2 py-1 text-xs ${
									c?.trialPeriod
										? 'border-amber-300 text-amber-700'
										: 'border-blue/40'
								}`}
							>
								{c?.courseName}
								{c?.trialPeriod && ' (Пробный)'}
							</span>
						))}
						{(user.availableCourses?.length ?? 0) > 3 && (
							<span className='rounded-lg border border-blue/40 px-2 py-1 text-xs'>
								+{(user.availableCourses?.length ?? 0) - 3}
							</span>
						)}
					</div>
				</div>
			</div>

			<div className='mt-3 grid grid-cols-2 gap-2'>
				<button
					className='rounded-xl border border-blue/40 px-3 py-2 text-sm hover:bg-blue/5'
					onClick={() => handlers.onOpenCourse(user._id)}
				>
					Открыть курс
				</button>
				<button
					className={`rounded-xl px-3 py-2 text-sm ${
						has
							? 'border border-red-300 text-red-700 hover:bg-red-50'
							: 'border border-green-300 text-green-700 hover:bg-green-50'
					}`}
					onClick={() => handlers.onToggleSupport(user._id, !has)}
				>
					{has ? 'Остановить сервис' : 'Включить сервис'}
				</button>
			</div>
		</div>
	)
}
