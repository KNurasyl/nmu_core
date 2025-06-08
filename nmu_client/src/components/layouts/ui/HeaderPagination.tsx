'use client'

import { LOGOUT } from '@/graphql/auth'
import { useAuthStore } from '@/stores/auth.store'
import { GlobalOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { Dropdown, MenuProps, Row } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import logo from '../../../assets/images/main_logo.svg'

export const HeaderPagination = () => {
	const { t, i18n } = useTranslation('common')
	const router = useRouter()
	const { user, setUser } = useAuthStore(state => state)

	const [logoutMutation] = useMutation(LOGOUT, {
		onCompleted() {
			setUser(null)
			router.replace('/auth')
		},
		onError() {
			toast.error('Ошибка logout')
		},
	})

	const handleMenuClick: MenuProps['onClick'] = async ({ key }) => {
		if (key === '/logout') {
			if (!user?._id) {
				toast.error('Ошибка: не найден userId')
				return
			}

			await logoutMutation({ variables: { userId: user?._id } })
		} else if (key === 'switch-lang') {
			const newLang = i18n.language === 'ru' ? 'kk' : 'ru'
			await i18n.changeLanguage(newLang)
			toast.success(t('language_switched'))
		} else {
			router.push(key)
		}
	}
	const items: MenuProps['items'] = [
		{
			label: t('profile'),
			key: '/profile',
			icon: <UserOutlined />,
		},
		{
			label: t('logout'),
			key: '/logout',
			icon: <LogoutOutlined />,
			danger: true,
		},
		{
			type: 'divider',
		},
		{
			label: 'каз/рус',
			key: 'switch-lang',
			icon: <GlobalOutlined />,
		},
	]

	return (
		<Row className='header_container'>
			<Link href='/' style={{ display: 'flex', alignItems: 'center' }}>
				<Image
					src={logo}
					alt={'logo'}
					height={60}
					width={60}
					style={{ cursor: 'pointer' }}
				/>
			</Link>
			<Dropdown.Button
				menu={{ items, onClick: handleMenuClick }}
				placement='bottomLeft'
				icon={<UserOutlined />}
				style={{ width: '122px' }}
			>
				{user?.userName}
			</Dropdown.Button>
		</Row>
	)
}
