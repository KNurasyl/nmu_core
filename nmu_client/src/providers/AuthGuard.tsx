'use client'
import { useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
	const user = useAuthStore(state => state.user)
	const router = useRouter()

	useEffect(() => {
		if (user === null) {
			router.replace('/auth')
		} else {
			router.replace('/')
		}
	}, [user, router])

	return <>{children}</>
}
