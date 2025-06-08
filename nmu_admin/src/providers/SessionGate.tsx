'use client'
import { useSessionRestore } from '@/hooks/useSessionRestore'

export function SessionGate({ children }: { children: React.ReactNode }) {
	useSessionRestore()
	return <>{children}</>
}
