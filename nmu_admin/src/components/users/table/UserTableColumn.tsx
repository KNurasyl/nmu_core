'use client'

import { User } from '@/graphql/generated/graphql'
import { ClearOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, Row, TableProps, Typography } from 'antd'
import { useRouter } from 'next/navigation'

const ActionButton = ({ userId }: { userId: string }) => {
	const router = useRouter()
	return (
		<Button type='link' onClick={() => router.replace(`/user/${userId}`)}>
			Подробнее
		</Button>
	)
}

type SearchHandler = (value: string) => void

export const userTableColumns = (
	onSearch: SearchHandler
): TableProps<User>['columns'] => [
	{
		title: 'ID',
		dataIndex: '_id',
		key: '_id',
	},
	{
		title: 'Телефон',
		dataIndex: 'phoneNumber',
		key: 'phoneNumber',
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div style={{ padding: 8 }}>
				<Input
					placeholder='Поиск по номеру'
					value={selectedKeys[0]}
					onChange={e => setSelectedKeys([e.target.value])}
					onPressEnter={() => {
						confirm()
						onSearch(selectedKeys[0] as string)
					}}
					style={{ width: 188, marginBottom: 8, display: 'block' }}
				/>
				<Row justify='space-between'>
					<Button
						type='primary'
						onClick={() => {
							confirm()
							onSearch(selectedKeys[0] as string)
						}}
						icon={<SearchOutlined />}
						size='small'
						style={{ width: 90, marginBottom: 8 }}
					>
						Поиск
					</Button>
					<Button
						onClick={() => {
							clearFilters?.()
							onSearch('')
						}}
						size='small'
						style={{ width: 50 }}
						icon={<ClearOutlined />}
					/>
				</Row>
			</div>
		),
		filterIcon: filtered => (
			<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
		),
	},
	{
		title: 'Имя',
		dataIndex: 'userName',
		key: 'userName',
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div style={{ padding: 8 }}>
				<Input
					placeholder='Поиск по имени'
					value={selectedKeys[0]}
					onChange={e => setSelectedKeys([e.target.value])}
					onPressEnter={() => {
						confirm()
						onSearch(selectedKeys[0] as string)
					}}
					style={{ width: 188, marginBottom: 8, display: 'block' }}
				/>
				<Row justify='space-between'>
					<Button
						type='primary'
						onClick={() => {
							confirm()
							onSearch(selectedKeys[0] as string)
						}}
						icon={<SearchOutlined />}
						size='small'
						style={{ width: 90, marginBottom: 8 }}
					>
						Поиск
					</Button>
					<Button
						onClick={() => {
							clearFilters?.()
							onSearch('')
						}}
						size='small'
						style={{ width: 50 }}
						icon={<ClearOutlined />}
					/>
				</Row>
			</div>
		),
		filterIcon: filtered => (
			<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
		),
	},
	{
		title: 'Роль',
		dataIndex: 'userRole',
		key: 'userRole',
		render: val => (
			<Typography>{val === 'student' ? 'Студент' : 'Админ'}</Typography>
		),
	},
	{
		title: 'Действия',
		key: 'action',
		render: (_, record) => <ActionButton userId={record._id} />,
	},
]
