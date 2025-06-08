import { GetUserByIdQuery } from '@/graphql/generated/graphql'
import { GET_USER_BY_ID } from '@/graphql/user'
import { useQuery } from '@apollo/client'
import { Button, Row, Table } from 'antd'
import { useState } from 'react'
import UserAddAccessCourseModal from '../userModal/UserAddAccessCourseModal'
import { userCoursesColumns } from './table/UserCoursesColumn'

interface IProps {
	userId: string
}

const UserCourses = ({ userId }: IProps) => {
	const [addAccessCourseOpen, setAddAccessCourseOpen] = useState(false)

	const { data, loading, refetch } = useQuery<GetUserByIdQuery>(GET_USER_BY_ID, {
		variables: { id: userId },
	})

	const courseAccesses = data?.getUserById?.courseAccesses ?? []

	return (
		<Row
			style={{ height: '100%', width: '100%', flexDirection: 'column' }}
			justify='space-between'
		>
			<UserAddAccessCourseModal
				open={addAccessCourseOpen}
				onClose={() => setAddAccessCourseOpen(false)}
				userId={userId}
        refetch={refetch}
			/>

			<Row
				style={{ height: '10%', width: '100%', marginBottom: '10px' }}
				justify='end'
			>
				<Button type='primary' onClick={() => setAddAccessCourseOpen(true)}>
					Добавить курс
				</Button>
			</Row>
			<Table
				style={{ height: '88%', width: '100%' }}
				loading={loading}
				columns={userCoursesColumns}
				dataSource={courseAccesses}
				rowKey='_id'
			/>
		</Row>
	)
}

export default UserCourses
