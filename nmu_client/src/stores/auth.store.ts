import { User } from '@/graphql/generated/graphql'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AuthState {
	user: User | null
	accessToken: string | null
	devMode: boolean
	setUser: (user: User | null) => void
	setDevMode: (devMode: boolean) => void
	setAccessToken: (token: string | null) => void
	logout: () => void
}

export const useAuthStore = create<AuthState>()(
	devtools(
		set => ({
			user: null,
			accessToken: null,
			devMode: false,
			setUser: user => set({ user }),
			setDevMode: devMode => set({ devMode }),
			setAccessToken: token => set({ accessToken: token }),
			logout: () => set({ user: null, accessToken: null }),
		}),
		{ name: 'AuthStore' }
	)
)
