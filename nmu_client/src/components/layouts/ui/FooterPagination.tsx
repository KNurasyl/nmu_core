'use client'

import { useAuthStore } from '@/stores/auth.store'
import {
	BookOutlined,
	GlobalOutlined,
	LogoutOutlined,
	SettingOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { Dropdown, MenuProps } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const FooterPagination = () => {
	const [hide, setHide] = useState(false)
	const lastScrollY = useRef(0)

	const { t, i18n } = useTranslation('common')
	const pathname = usePathname()
	const router = useRouter()
	const { setUser } = useAuthStore(state => state)

	const handleMenuClick: MenuProps['onClick'] = useCallback(
		({ key }: { key: string }) => {
			if (key === '/profile') router.push('/profile')
			if (key === 'logout') {
				setUser(null)
				router.replace('/auth')
			}
			if (key === 'lang') {
				const newLang = i18n.language === 'ru' ? 'kk' : 'ru'
				i18n.changeLanguage(newLang)
				toast.success(t('language_switched'))
			}
		},
		[i18n, router, setUser, t]
	)

	useEffect(() => {
		const handleScroll = () => {
			const currentY = window.scrollY

			if (currentY > lastScrollY.current && currentY > 40) {
				// скроллим вниз — прячем
				setHide(true)
			} else if (currentY < lastScrollY.current) {
				// скроллим вверх — показываем
				setHide(false)
			}
			lastScrollY.current = currentY
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const navItems = [
		{
			key: '/',
			label: t('courses'),
			icon: <BookOutlined />,
			type: 'link',
		},
		{
			key: 'settings',
			label: t('settings'),
			icon: <SettingOutlined />,
			type: 'dropdown',
		},
	]

	const menuItems: MenuProps['items'] = [
		{
			key: '/profile',
			label: t('profile'),
			icon: <UserOutlined />,
		},
		{
			key: 'lang',
			label: t('language'),
			icon: <GlobalOutlined />,
		},
		{
			key: 'logout',
			label: t('logout'),
			icon: <LogoutOutlined />,
			danger: true,
		},
	]

	return (
		<Footer className={`footer_mobile${hide ? ' footer--hidden' : ''}`}>
			{navItems.map(item =>
				item.type === 'link' ? (
					<Link
						href={item.key}
						key={item.key}
						className={`nav-btn${pathname === item.key ? ' active' : ''}`}
					>
						<span className='nav-icon'>{item.icon}</span>
						<span className='nav-label'>{item.label}</span>
					</Link>
				) : (
					<Dropdown
						key={item.key}
						menu={{ items: menuItems, onClick: handleMenuClick }}
						placement='top'
						arrow
						trigger={['click']}
					>
						<button className='nav-btn' type='button'>
							<span className='nav-icon'>{item.icon}</span>
							<span className='nav-label'>{item.label}</span>
						</button>
					</Dropdown>
				)
			)}
		</Footer>
	)
}

export default FooterPagination
