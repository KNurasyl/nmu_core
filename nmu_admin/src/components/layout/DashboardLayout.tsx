'use client'

import { LOGOUT } from '@/graphql/auth'
import { useAuthStore } from '@/stores/auth.store'
import {
	BookOutlined,
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	SlidersOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import {
	Button,
	Dropdown,
	Layout,
	Menu,
	MenuProps,
	notification,
	Row,
	theme,
} from 'antd'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import logo from '../../images/Logo.png'
import Breadcrumbs from '../ui/Breadcrumb'

const { Header, Sider, Content } = Layout

const items: MenuProps['items'] = [
	// {
	// 	key: '/',
	// 	icon: <UserOutlined />,
	// 	label: 'Пользователи',
	// },
	{
		key: '/',
		icon: <SlidersOutlined />,
		label: 'Мониторинг',
	},
	{
		key: '/courses',
		icon: <BookOutlined />,
		label: 'Курсы',
	},
]

const dropdownItems: MenuProps['items'] = [
	{
		label: 'Профиль',
		key: '/profile',
		icon: <UserOutlined />,
	},
	{
		label: 'Выйти',
		key: '/logout',
		icon: <LogoutOutlined />,
		danger: true,
	},
]

const DashboardLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken()

	const router = useRouter()
	const pathname = usePathname()

	const { user, setUser } = useAuthStore(state => state)
	const [logoutMutation] = useMutation(LOGOUT)

	const handleMenuClick: MenuProps['onClick'] = async ({ key }) => {
		if (key === '/logout') {
			if (!user?._id) {
				notification.error({
					message: 'Ошибка: не найден userId',
					placement: 'topRight',
				})
				return
			}

			try {
				await logoutMutation({ variables: { userId: user?._id } })
				setUser(null)
				router.replace('/auth')
			} catch {
				notification.error({
					message: 'Ошибка logout',
					placement: 'topRight',
				})
			}
		} else {
			router.push(key)
		}
	}

	return (
		<Layout style={{ height: '100vh' }}>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<Row justify='center'>
					<Image src={logo} alt='logo' width={80} height={80} />
				</Row>
				<Menu
					theme='dark'
					mode='inline'
					defaultSelectedKeys={['/']}
					selectedKeys={[pathname]}
					items={items}
					onClick={({ key }) => {
						router.push(key)
					}}
				/>
			</Sider>
			<Layout>
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Button
						type='text'
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: '16px',
							width: 64,
							height: 64,
						}}
					/>
					<Dropdown.Button
						menu={{ items: dropdownItems, onClick: handleMenuClick }}
						placement='bottomLeft'
						icon={<UserOutlined />}
						style={{ width: '150px' }}
					>
						{user?.userName}
					</Dropdown.Button>
				</Header>
				<Breadcrumbs />
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
					}}
				>
					{children}
				</Content>
			</Layout>
		</Layout>
	)
}

export default DashboardLayout
