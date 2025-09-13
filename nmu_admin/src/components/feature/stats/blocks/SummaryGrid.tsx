import { StatCard } from '../ui/StatCard'

export default function SummaryGrid({
	loading,
	total,
	active,
	frozen,
	noMentor,
}: {
	loading: boolean
	total: number
	active: number
	frozen: number
	noMentor: number
}) {
	if (loading) {
		return (
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
				{[...Array(4)].map((_, i) => (
					<div
						key={i}
						className='h-24 rounded-2xl border border-border bg-card animate-pulse'
					/>
				))}
			</div>
		)
	}

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
			<StatCard title='Всего студентов' value={total} />
			<StatCard title='Учится сейчас' value={active} accent='blue' />
			<StatCard title='На заморозке' value={frozen} accent='amber' />
			<StatCard title='Без ментора' value={noMentor} accent='red' />
		</div>
	)
}
