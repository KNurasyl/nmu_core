'use client'

import { GetUserByIdQuery, User } from '@/graphql/generated/graphql'
import { GET_USER_BY_ID } from '@/graphql/user'
import { useAuthStore } from '@/stores/auth.store'
import { useQuery } from '@apollo/client'
import { Button, Descriptions, Spin } from 'antd'
import { useState } from 'react'
import UserEditModal from '../userModal/UserEditModal'
import UserPasswordModal from '../userModal/UserPasswordModal'

interface IProps {
	userId: string
}

const FIELD_LABELS: Record<string, string> = {
	_id: 'ID',
	phoneNumber: 'Телефон',
	userName: 'Имя пользователя',
	userRole: 'Роль',
}

const GeneralInfo = ({ userId }: IProps) => {
	const [editOpen, setEditOpen] = useState(false)
	const [passOpen, setPassOpen] = useState(false)

	const authUser = useAuthStore(state => state.user)

	const { data, loading } = useQuery<GetUserByIdQuery>(GET_USER_BY_ID, {
		variables: { id: userId },
	})

	const user = data?.getUserById

	const isOwnDeveloper =
		authUser?._id === user?._id && authUser?.userRole === 'Developer'

	const items = user
		? [
				{
					key: '_id',
					label: FIELD_LABELS._id,
					children: user._id,
				},
				{
					key: 'userName',
					label: FIELD_LABELS.userName,
					children: user.userName,
				},
				{
					key: 'userRole',
					label: FIELD_LABELS.userRole,
					children: user.userRole,
				},
				{
					key: 'phoneNumber',
					label: FIELD_LABELS.phoneNumber,
					children: user.phoneNumber,
				},
				{
					key: 'password',
					label: 'Пароль',
					children: (
						<Button
							type='primary'
							onClick={() => setPassOpen(true)}
							disabled={isOwnDeveloper}
						>
							Сменить
						</Button>
					),
				},
		  ]
		: []

	return (
		<Spin spinning={loading}>
			<UserEditModal
				open={editOpen}
				onClose={() => setEditOpen(false)}
				user={user as User}
			/>
			<UserPasswordModal
				open={passOpen}
				onClose={() => setPassOpen(false)}
				userId={userId}
			/>

			<Descriptions
				title='Основная информация'
				bordered
				column={1}
				items={items}
				extra={
					<Button type='primary' onClick={() => setEditOpen(true)}>
						Изменить
					</Button>
				}
			/>
		</Spin>
	)
}

export default GeneralInfo
