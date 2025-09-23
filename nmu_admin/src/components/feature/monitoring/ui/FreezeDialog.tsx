'use client'

import { useEffect, useRef } from 'react'

type Props = {
	open: boolean
	onClose: () => void
	onConfirm: (startISO: string, endISO: string) => void
}

export default function FreezeDialog({ open, onClose, onConfirm }: Props) {
	const startRef = useRef<HTMLInputElement>(null)
	const endRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (open) setTimeout(() => startRef.current?.focus(), 0)
	}, [open])

	if (!open) return null

	const handleOk = () => {
		const s = startRef.current?.value
		const e = endRef.current?.value
		if (!s || !e) return
		const startISO = new Date(`${s}T00:00:00`).toISOString()
		const endISO = new Date(`${e}T23:59:59`).toISOString()
		onConfirm(startISO, endISO)
	}

	return (
		<div className='fixed inset-0 z-50 grid place-items-center bg-black/40 p-3'>
			<div className='w-full max-w-md rounded-2xl border border-border bg-card p-4 shadow-lg'>
				<div className='mb-3 text-lg font-semibold text-gray-900'>
					Заморозить пользователя
				</div>

				<div className='grid gap-3 text-gray-900'>
					<label className='text-sm'>
						Начало
						<input
							ref={startRef}
							type='date'
							className='mt-1 h-9 w-full rounded-xl border border-border bg-card px-2 text-sm'
						/>
					</label>
					<label className='text-sm'>
						Конец
						<input
							ref={endRef}
							type='date'
							className='mt-1 h-9 w-full rounded-xl border border-border bg-card px-2 text-sm'
						/>
					</label>
					<p className='text-xs text-gray-600'>
						В указанный период студент считается замороженным.
					</p>
				</div>

				<div className='mt-4 flex justify-end gap-2'>
					<button
						className='rounded-xl border border-border px-3 py-2 text-sm text-gray-900 cursor-pointer'
						onClick={onClose}
					>
						Отмена
					</button>
					<button
						className='rounded-xl bg-blue border border-border  px-3 py-2 text-sm text-gray-900 hover:opacity-90 cursor-pointer'
						onClick={handleOk}
					>
						Сохранить
					</button>
				</div>
			</div>
		</div>
	)
}
