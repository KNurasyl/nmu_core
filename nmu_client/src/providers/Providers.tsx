'use client'

import { I18nextProvider } from 'react-i18next'
import { ToastContainer } from 'react-toastify'
import i18n from '@/i18n/client'
import { AppolloClientProvider } from './AppolloClientProvider'
import AuthGuard from './AuthGuard'
import { SessionGate } from './SessionGate'

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<I18nextProvider i18n={i18n}>
			<ToastContainer position='top-right' autoClose={3000} />
			<AppolloClientProvider>
				<SessionGate>
					<AuthGuard>{children}</AuthGuard>
				</SessionGate>
			</AppolloClientProvider>
		</I18nextProvider>
	)
}
