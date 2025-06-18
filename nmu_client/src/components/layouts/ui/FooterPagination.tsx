'use client'

import { useAuthStore } from '@/stores/auth.store'
import { Footer } from 'antd/es/layout/layout'
import { House, Languages, LogOut, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import AllahText from '../../../assets/images/Allah_text_logo.png'

const FooterPagination = () => {
	const [hide, setHide] = useState(false)
	const lastScrollY = useRef(0)

	const { t, i18n } = useTranslation('common')
	const pathname = usePathname()
	const router = useRouter()
	const { setUser } = useAuthStore(state => state)

	const handleMenuClick = useCallback(
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

			if (currentY > lastScrollY.current && currentY > 1) {
				setHide(true)
			} else if (currentY < lastScrollY.current) {
				setHide(false)
			}
			lastScrollY.current = currentY
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<Footer className={`footer_mobile${hide ? ' footer--hidden' : ''}`}>
			<Link href='/' className={`nav-btn ${pathname === '/' ? 'active' : ''}`}>
				<span className='nav-icon'>
					<House size={28} />
				</span>
			</Link>

			<Link
				href='/profile'
				className={`nav-btn ${pathname === '/profile' ? 'active' : ''}`}
			>
				<span className='nav-icon'>
					<User size={28} />
				</span>
			</Link>

			<span className='nav-btn-logo'>
				<Image
					src={AllahText}
					alt={'logo'}
					height={65}
					width={65}
					style={{ cursor: 'pointer' }}
				/>
			</span>

			<span
				className='nav-btn'
				onClick={() => handleMenuClick({ key: 'lang' })}
			>
				<span className='nav-icon'>
					<Languages size={28} />
				</span>
			</span>

			<span
				className='nav-btn'
				onClick={() => handleMenuClick({ key: 'logout' })}
			>
				<span className='nav-icon'>
					<LogOut size={28} />
				</span>
			</span>
		</Footer>
	)
}

export default FooterPagination
