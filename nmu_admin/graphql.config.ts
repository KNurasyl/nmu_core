import type { CodegenConfig } from '@graphql-codegen/cli'
import 'dotenv/config'

const config: CodegenConfig = {
	schema: process.env.NEXT_PUBLIC_GRAPHQL_API,
	documents: ['./src/graphql/**/*.graphql'],
	ignoreNoDocuments: true,
	watch: true,
	generates: {
		'./src/graphql/generated/': {
			preset: 'client',
		},
	},
}

export default config
