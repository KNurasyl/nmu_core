import { Providers } from '@/providers/Providers'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
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
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
