'use client'

import { useAuthStore } from '@/stores/auth.store'
import { Menu } from 'lucide-react'

const roleLabels: Record<string, string> = {
	student: 'Студент',
	admin: 'Админ',
	developer: 'Разработчик',
}

const roleColors: Record<string, string> = {
	student: 'bg-gray-100 text-gray-700',
	admin: 'bg-emerald/10 text-emerald',
	developer: 'bg-purple-100 text-purple-700',
}

type Props = {
	onMenuClick: () => void
}

export const Topbar = ({ onMenuClick }: Props) => {
	const { user } = useAuthStore(state => state)

	const role = user?.userRole
	const roleLabel = role ? roleLabels[role] : undefined
	const roleStyle = role ? roleColors[role] : ''

	return (
		<header className='sticky top-0 z-20 flex h-16 items-center justify-between bg-card border-b border-border px-4 md:px-6'>
			<button
				className='md:hidden p-2 rounded-full bg-emerald/10 text-emerald hover:bg-emerald/20 transition'
				onClick={onMenuClick}
				aria-label='Open sidebar'
			>
				<Menu className='h-6 w-6' />
			</button>

			<h1 className='text-lg font-semibold text-gray-700'>Админ Панель</h1>

			<div className='flex items-center space-x-2'>
				<span className='text-sm font-medium text-gray-800'>
					{user?.userName}
				</span>
				{roleLabel && (
					<span
						className={`px-2 py-0.5 rounded-full text-xs font-medium ${roleStyle}`}
					>
						{roleLabel}
					</span>
				)}
			</div>
		</header>
	)
}
