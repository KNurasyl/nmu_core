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
	fallback: ['system-ui', 'sans-serif'],
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
		<html lang='en' className={`${inter.className} ${inter.variable}`}>
			<head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta name='google' content='notranslate' />
			</head>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
