'use client'

import { ToastContainer } from 'react-toastify'
import { AppolloClientProvider } from './AppolloClientProvider'
import AuthGuard from './AuthGuard'
import { SessionGate } from './SessionGate'

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<ToastContainer position='top-right' autoClose={3000} />
			<AppolloClientProvider>
				<SessionGate>
					<AuthGuard>{children}</AuthGuard>
				</SessionGate>
			</AppolloClientProvider>
		</>
	)
}
