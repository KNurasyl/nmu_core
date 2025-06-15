import { Providers } from '@/providers/Providers'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.scss'

const outfit = Outfit({
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Admin Nur-Mubarak Online Academy',
	description: 'Админ панель Нур-Мубарак онлайн академий',
	icons: {
		icon: '/islamic-seeklogo.svg',
		shortcut: '/islamic-seeklogo.svg',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className={`${outfit.className}`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
