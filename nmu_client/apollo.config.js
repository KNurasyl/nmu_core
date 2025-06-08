import 'dotenv/config'

export const service = {
	endpoint: {
		url: process.env.NEXT_PUBLIC_API_URL,
		skipSSLValidation: true,
	},
}
