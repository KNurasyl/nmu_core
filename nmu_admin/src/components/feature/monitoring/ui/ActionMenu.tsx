'use client'

import { MonitoringItem, MonitoringTableHandlers } from '@/types/types'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import DeleteDialog from './DeleteDialog' // ⬅️ новое
import FreezeDialog from './FreezeDialog'

type Props = {
	record: MonitoringItem
	handlers: MonitoringTableHandlers
	buttonClassName?: string
}

export default function ActionMenu({
	record,
	handlers,
	buttonClassName,
}: Props) {
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const [freezeOpen, setFreezeOpen] = useState(false)
	const [deleteOpen, setDeleteOpen] = useState(false) // ⬅️ новое
	const ref = useRef<HTMLDivElement>(null)

	const has = record.hasMentorSupport ?? true
	const frozen = !!record.isFrozen

	useEffect(() => {
		const onDocPointerDown = (e: PointerEvent) => {
			if (!ref.current) return
			if (!ref.current.contains(e.target as Node)) setOpen(false)
		}
		document.addEventListener('pointerdown', onDocPointerDown)
		return () => document.removeEventListener('pointerdown', onDocPointerDown)
	}, [])

	return (
		<div ref={ref}>
			<button
				onClick={e => {
					e.stopPropagation()
					setOpen(v => !v)
				}}
				className={
					buttonClassName ??
					'rounded-lg px-2 py-1 hover:bg-muted text-gray-900 cursor-pointer'
				}
				aria-label='Действия'
			>
				⋯
			</button>

			{open && (
				<div className='absolute right-0 z-20 mt-2 w-56 rounded-xl border border-border bg-card p-1 shadow-lg'>
					<button
						className='block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-900 hover:bg-muted'
						onClick={() => {
							router.push(`/user/${record._id}`)
							setOpen(false)
						}}
					>
						Подробнее
					</button>
					<button
						className='block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-900 hover:bg-muted'
						onClick={() => {
							handlers.onOpenCourse(record._id)
							setOpen(false)
						}}
					>
						Открыть курс
					</button>
					<button
						className='block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-900 hover:bg-muted'
						onClick={() => {
							handlers.onToggleSupport(record._id, !has)
							setOpen(false)
						}}
					>
						{has ? 'Остановить сервис' : 'Включить сервис'}
					</button>
					<button
						className='block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-900 hover:bg-muted'
						onClick={() => {
							if (frozen) handlers.onUnfreeze(record._id)
							else setFreezeOpen(true)
							setOpen(false)
						}}
					>
						{frozen ? 'Снять заморозку' : 'Заморозить'}
					</button>

					{/* пункт удаления */}
					<button
						className='block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50'
						onClick={() => {
							setOpen(false)
							setDeleteOpen(true)
						}}
					>
						Удалить
					</button>
				</div>
			)}

			<FreezeDialog
				open={freezeOpen}
				onClose={() => setFreezeOpen(false)}
				onConfirm={(s, e) => {
					handlers.onFreeze(record._id, s, e)
					setFreezeOpen(false)
				}}
			/>

			<DeleteDialog
				open={deleteOpen}
				onClose={() => setDeleteOpen(false)}
				userName={record.userName}
				phoneNumber={record.phoneNumber as string | null | undefined}
				onConfirm={() => {
					handlers.onDelete(record._id, record.userName ?? undefined) // ⬅️ новое
					setDeleteOpen(false)
				}}
			/>
		</div>
	)
}
