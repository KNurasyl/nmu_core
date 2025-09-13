export function StatCard({
	title,
	value,
	accent, // 'blue' | 'amber' | 'red'
}: {
	title: string
	value: number
	accent?: 'blue' | 'amber' | 'red'
}) {
	const tone =
		accent === 'red'
			? 'bg-red-50 text-red-700'
			: accent === 'amber'
			? 'bg-amber-50 text-amber-700'
			: accent === 'blue'
			? 'bg-blue/5 text-blue-900'
			: 'bg-muted text-gray-900'

	return (
		<div className='rounded-2xl border border-border bg-card p-4'>
			<div className='text-sm text-gray-600'>{title}</div>
			<div
				className={`mt-2 inline-flex items-center rounded-xl px-3 py-1 text-lg font-semibold ${tone}`}
			>
				{new Intl.NumberFormat('ru-RU').format(value)}
			</div>
		</div>
	)
}
