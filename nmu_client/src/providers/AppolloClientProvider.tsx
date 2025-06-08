'use client'

import { client } from '@/lib/appollo/appollo-client'
import { ApolloProvider } from '@apollo/client'
import type { PropsWithChildren } from 'react'

export function AppolloClientProvider({
	children,
}: PropsWithChildren<unknown>) {
	return <ApolloProvider client={client}>{children}</ApolloProvider>
}
