type Props = {
	open: boolean
	onClose: () => void
	onConfirm: () => void
	userName?: string | null
	phoneNumber?: string | null
}

export default function DeleteDialog({
	open,
	onClose,
	onConfirm,
	userName,
	phoneNumber,
}: Props) {
	if (!open) return null

	return (
		<div className='fixed inset-0 z-50 grid place-items-center bg-black/40 p-3'>
			<div className='w-full max-w-md rounded-2xl border border-border bg-card p-4 shadow-lg'>
				<div className='mb-2 text-lg font-semibold text-gray-900'>
					Удалить пользователя?
				</div>
				<p className='text-sm text-gray-700'>
					<span className='font-medium'>{userName || 'Пользователь'}</span>
					{phoneNumber ? ` (${phoneNumber})` : ''} будет окончательно удалён.
					Это действие нельзя отменить.
				</p>

				<div className='mt-4 flex justify-end gap-2'>
					<button
						className='rounded-xl border border-border px-3 py-2 text-sm text-gray-900'
						onClick={onClose}
					>
						Отмена
					</button>
					<button
						className='rounded-xl bg-red-600 px-3 py-2 text-sm text-white hover:opacity-90'
						onClick={onConfirm}
					>
						Удалить
					</button>
				</div>
			</div>
		</div>
	)
}
