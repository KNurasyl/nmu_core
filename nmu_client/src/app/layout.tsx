import { Providers } from '@/providers/Providers'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../styles/main.scss'

const inter = localFont({
	src: [
		{
			path: '../assets/fonts/Inter-fonts.ttf',
			weight: '100 900',
			style: 'normal',
		},
	],
	variable: '--font-inter',
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'Nur-Mubarak Online Academy',
	description: 'Нур-Мубарак онлайн академия',
	icons: {
		icon: '/main_logo.svg',
		shortcut: '/main_logo.svg',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={inter.variable}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
