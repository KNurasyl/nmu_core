'use client'

import { Breadcrumb, Row } from 'antd'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

const Breadcrumbs = () => {
	const pathname = usePathname()

	const breadcrumbItems = useMemo(() => {
		const parts = pathname.split('/').filter(Boolean)

		const routeLabels: Record<string, string> = {
			'': 'Главная',
			courses: 'Курсы',
			user: 'Пользователь',
			profile: 'Профиль',
		}

		return [
			{ title: <span>Главная</span> },
			...parts.map(part => {
				return {
					title: routeLabels[part] || part,
				}
			}),
		]
	}, [pathname])
	return (
		<Row style={{ margin: '16px 24px 0' }}>
			<Breadcrumb items={breadcrumbItems} />
		</Row>
	)
}

export default Breadcrumbs
