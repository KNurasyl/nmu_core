import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactStrictMode: true,
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
