import { User } from '@/graphql/generated/graphql'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AuthState {
	user: User | null
	accessToken: string | null
	setUser: (user: User | null) => void
	setAccessToken: (token: string | null) => void
	logout: () => void
}

export const useAuthStore = create<AuthState>()(
	devtools(
		set => ({
			user: null,
			accessToken: null,
			setUser: user => set({ user }),
			setAccessToken: token => set({ accessToken: token }),
			logout: () => set({ user: null, accessToken: null }),
		}),
		{ name: 'AuthStore' }
	)
)
