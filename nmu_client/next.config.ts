import type { NextConfig } from 'next'
import { i18nConfig } from './src/i18n/config'

const nextConfig: NextConfig = {
	reactStrictMode: true,
	...i18nConfig,
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
