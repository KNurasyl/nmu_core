'use client'

import { LOGIN } from '@/graphql/auth'
import { useAuthStore } from '@/stores/auth.store'
import { useMutation } from '@apollo/client/react'
import { Lock, Phone } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

export const LoginForm = () => {
	const router = useRouter()
	const { setUser, setAccessToken } = useAuthStore(state => state)

	const [phoneNumber, setPhoneNumber] = useState('')
	const [password, setPassword] = useState('')

	const [login, { loading, error }] = useMutation(LOGIN, {
		onCompleted(data) {
			setUser(data.login.user)
			setAccessToken(data.login.accessToken)
			router.replace('/')
		},
		onError() {
			toast.error('Қате авторизация!')
		},
	})

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		await login({
			variables: { input: { phoneNumber, password } },
		})
	}

	return (
		<div className='flex items-center justify-center h-screen bg-muted px-4'>
			<form
				onSubmit={handleSubmit}
				className='card w-full max-w-md p-8 space-y-6'
			>
				<div className='text-center space-y-1'>
					<h2 className='text-2xl font-bold text-emerald'>Кіру</h2>
					<p className='text-sm text-gray-500'>
						Жүйеге кіру үшін деректерді енгізіңіз
					</p>
				</div>

				<Input
					label='Телефон'
					type='text'
					icon={<Phone className='h-4 w-4' />}
					value={phoneNumber}
					onChange={e => setPhoneNumber(e.target.value)}
				/>
				<Input
					label='Құпия сөз'
					type='password'
					icon={<Lock className='h-4 w-4' />}
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>

				<Button type='submit' disabled={loading}>
					{loading ? 'Жүктелуде...' : 'Кіру'}
				</Button>

				{error && (
					<p className='text-red-500 text-center text-sm'>{error.message}</p>
				)}
			</form>
		</div>
	)
}
