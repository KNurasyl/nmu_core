'use client'

import { ILoginFieldValues, LoginForm } from '@/components/forms/LoginForm'
import { LOGIN } from '@/graphql/auth'
import { useAuthStore } from '@/stores/auth.store'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

export const AuthPage = () => {
	const { t } = useTranslation('common')

	const router = useRouter()
	const { setUser, setAccessToken } = useAuthStore(state => state)

	const [login, { loading }] = useMutation(LOGIN, {
		onCompleted(data) {
			setUser(data.login.user)
			setAccessToken(data.login.accessToken)
			router.replace('/')
		},
		onError() {
			toast.error('Ошибка авторизации')
		},
	})

	const onFinish = async (values: ILoginFieldValues) => {
		await login({
			variables: { input: values },
		})
	}

	return (
		<LoginForm
			title={t('welcome')}
			subtitle={t('lets_start')}
			reqPhoneMsg={'reqPhoneMsg'}
			reqPassMsg={'reqPassMsg'}
			phonePlaceholder={'phonePlaceholder'}
			passPlaceholder={'passPlaceholder'}
			submitText={'submitText'}
			loading={loading}
			onFinish={onFinish}
		/>
	)
}
