import { useAuthStore } from '@/stores/auth.store'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
	const accessToken = useAuthStore.getState().accessToken
	return {
		headers: {
			...headers,
			Authorization: accessToken ? `Bearer ${accessToken}` : '',
		},
	}
})

const httpLink = createHttpLink({
	uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
	credentials: 'include',
})

export const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
})
