import { Providers } from '@/providers/Providers'
import type { Metadata } from 'next'
import { Inter, Noto_Naskh_Arabic } from 'next/font/google'
import '../styles/main.scss'

const inter = Inter({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-inter',
	display: 'swap',
	fallback: ['system-ui', 'sans-serif'],
})

const arabic = Noto_Naskh_Arabic({
	subsets: ['arabic'],
	weight: ['400', '700'],
	variable: '--font-arabic',
	display: 'swap',
	fallback: ['Amiri', 'serif'],
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
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en' className={`${inter.variable} ${arabic.variable}`}>
			<head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta name='google' content='notranslate' />
			</head>
			<body className={`${inter.className} ${arabic.className}`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
