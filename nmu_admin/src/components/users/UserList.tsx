'use client'

import { GetUsersPaginatedQuery } from '@/graphql/generated/graphql'
import { GET_USERS_PAGINATED } from '@/graphql/user'
import { useQuery } from '@apollo/client'
import { Button, Row, Table } from 'antd'
import { useCallback, useState } from 'react'
import { userTableColumns } from './table/UserTableColumn'
import UserAddModal from './userListModal/UserAddModal'

const PAGE_SIZE = 20

const UserList = () => {
	const [page, setPage] = useState(1)
	const [addUserOpen, setAddUserOpen] = useState(false)
	const [searchValue, setSearchValue] = useState('')

	const { data, loading, refetch } = useQuery<GetUsersPaginatedQuery>(
		GET_USERS_PAGINATED,
		{
			variables: {
				args: {
					page,
					pageSize: PAGE_SIZE,
					search: searchValue || null,
				},
			},
			fetchPolicy: 'network-only',
		}
	)

	const handleSearch = useCallback(
		(value: string) => {
			setSearchValue(value)
			setPage(1)
			refetch({
				args: {
					page: 1,
					pageSize: PAGE_SIZE,
					search: value || null,
				},
			})
		},
		[refetch]
	)

	return (
		<Row style={{ height: '100%', width: '100%' }}>
			<UserAddModal
				open={addUserOpen}
				onClose={() => setAddUserOpen(false)}
				refetch={refetch}
			/>

			<Row style={{ height: '10%', width: '100%', justifyContent: 'end' }}>
				<Button type='primary' onClick={() => setAddUserOpen(true)}>
					Добавить пользователя
				</Button>
			</Row>
			<Table
				style={{ width: '100%', height: '90%', overflowY: 'scroll' }}
				columns={userTableColumns(handleSearch)}
				dataSource={data?.getUsersPaginated.users || []}
				loading={loading}
				rowKey='_id'
				pagination={{
					current: page,
					pageSize: PAGE_SIZE,
					total: data?.getUsersPaginated.total,
					showSizeChanger: false,
					showTotal: (total, range) => `${range[0]}-${range[1]} из ${total}`,
					onChange: newPage => {
						setPage(newPage)
					},
				}}
			/>
		</Row>
	)
}

export default UserList
