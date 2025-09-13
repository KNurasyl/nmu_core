'use client'

import { LOGOUT } from '@/graphql/auth'
import { useAuthStore } from '@/stores/auth.store'
import { LogoutOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'

export const LogoutButton = () => {
	const router = useRouter()
	const { user, setUser } = useAuthStore(state => state)
	const [logoutMutation, { loading }] = useMutation(LOGOUT)

	const handleLogout = async () => {
		try {
			await logoutMutation({ variables: { userId: user?._id || '' } })
			setUser(null)
			router.replace('/auth')
		} catch (err) {
			console.error('Ошибка выхода:', err)
		}
	}

	return (
		<button
			onClick={handleLogout}
			disabled={loading}
			className='flex items-center w-full rounded-xl px-3 py-2 text-sm font-medium transition-colors 
                 text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer'
		>
			<LogoutOutlined className='mr-3 h-5 w-5' />
			{loading ? 'Выход...' : 'Выйти'}
		</button>
	)
}
