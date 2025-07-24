import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
	reactStrictMode: true,
	i18n: {
		defaultLocale: 'kk',
		locales: ['ru', 'kk'],
		localeDetection: false,
	},
	localePath: path.resolve('./src/i18n/locales'),
	env: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.vimeocdn.com',
			},
			{
				protocol: 'http',
				hostname: 'f.vimeocdn.com',
			},
		],
	},
}

export default nextConfig
