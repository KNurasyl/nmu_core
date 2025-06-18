'use client'

import { Row, Tabs } from 'antd'
import GeneralInfo from './userTabs/GeneralInfo'
import UserCourses from './userTabs/UserCourses'
import UserHistory from './userTabs/UserHistory'
import UserProgress from './userTabs/UserProgress'

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
		{
			label: 'История',
			key: 'history',
			children: <UserHistory userId={userId} />,
		},
		{
			label: 'Прогресс',
			key: 'progress',
			children: <UserProgress userId={userId} />,
		},
	]

	return (
		<Row style={{ height: '100%', width: '100%', overflowY: 'scroll' }}>
			<Tabs style={{ width: '100%' }} tabPosition='left' items={items} />
		</Row>
	)
}

export default UserProfile
