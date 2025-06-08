'use client'

import { Row, Tabs } from 'antd'
import GeneralInfo from './userTabs/GeneralInfo'
import UserCourses from './userTabs/UserCourses'

interface IProps {
	userId: string
}

const UserProfile = ({ userId }: IProps) => {
	const items = [
		{
			label: 'Основная информация',
			key: 'info',
			children: <GeneralInfo userId={userId} />,
		},
		{
			label: 'Курсы',
			key: 'courses',
			children: <UserCourses userId={userId} />,
		},
	]

	return (
		<Row style={{ height: '100%', width: '100%' }}>
			<Tabs style={{ width: '100%' }} tabPosition='left' items={items} />
		</Row>
	)
}

export default UserProfile
