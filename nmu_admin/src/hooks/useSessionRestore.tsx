import { REFRESH_TOKENS } from '@/graphql/auth'
import { useAuthStore } from '@/stores/auth.store'
import { useMutation } from '@apollo/client'
import { useEffect } from 'react'

export function useSessionRestore() {
	const { setAccessToken, setUser } = useAuthStore(state => state)
	const [refreshTokens] = useMutation(REFRESH_TOKENS)

	useEffect(() => {
		refreshTokens()
			.then(({ data }) => {
				if (data?.refreshTokens?.user && data.refreshTokens.accessToken) {
					setUser(data.refreshTokens.user)
					setAccessToken(data.refreshTokens.accessToken)
				}
			})
			.catch(() => {
				setUser(null)
				setAccessToken(null)
			})
	}, [])
}
