'use client'

import { PieChartOutlined, SlidersOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoutButton } from './LogoutButton'

type Props = {
	open: boolean
	onClose: () => void
}

const nav = [
	{ name: 'Мониторинг', href: '/', icon: SlidersOutlined },
	{ name: 'Статистика', href: '/stats', icon: PieChartOutlined },
]

export const Sidebar = ({ open, onClose }: Props) => {
	const pathname = usePathname()

	return (
		<aside
			className={`fixed inset-y-0 left-0 z-40 w-40 transform bg-card border-r border-border transition-transform md:translate-x-0 md:static md:inset-0 ${
				open ? 'translate-x-0' : '-translate-x-full'
			}`}
		>
			<div className='flex h-16 items-center px-4 border-b border-border'>
				<span className='text-lg font-bold text-emerald'>NMU Admin</span>
			</div>
			<nav className='mt-4 space-y-1 px-2'>
				{nav.map(item => {
					const active = pathname === item.href
					return (
						<Link
							key={item.name}
							href={item.href}
							className={`flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
								active
									? 'bg-emerald/10 text-emerald'
									: 'text-gray-700 hover:bg-emerald/5 hover:text-emerald'
							}`}
							onClick={onClose}
						>
							<item.icon className='mr-3 h-5 w-5' />
							{item.name}
						</Link>
					)
				})}

				<LogoutButton />
			</nav>
		</aside>
	)
}
