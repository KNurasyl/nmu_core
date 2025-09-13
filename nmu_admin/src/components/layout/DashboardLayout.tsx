'use client'

import { useState } from 'react'
import { Sidebar } from './ui/Sidebar'
import { Topbar } from './ui/Topbar'

const DashboardLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	return (
		<div className='flex h-[100dvh] md:h-screen bg-bg text-text'>
			{/* мобильный затемнённый оверлей */}
			<div
				className={`fixed inset-0 z-30 bg-black/40 md:hidden transition-opacity ${
					sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
				onClick={() => setSidebarOpen(false)}
			/>

			<Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

			{/* ВАЖНО: min-h-0, чтобы дочерний overflow заработал */}
			<div className='flex min-h-0 flex-1 flex-col'>
				<Topbar onMenuClick={() => setSidebarOpen(true)} />

				{/* ВАЖНО: min-h-0 + overflow-y-auto */}
				<main className='flex-1 min-h-0 overflow-y-auto overscroll-contain bg-muted p-4 md:p-6 pb-[env(safe-area-inset-bottom)]'>
					{children}
				</main>
			</div>
		</div>
	)
}

export default DashboardLayout
