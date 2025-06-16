import {
	CheckOutlined,
	CloseOutlined,
	SettingOutlined,
} from '@ant-design/icons'
import { Button, Popover, Row, Switch, TableProps, Tag, Typography } from 'antd'

interface IUserCourseAccessDisplay {
	_id: string
	accessStartDate?: string | null
	accessEndDate?: string | null
	active: boolean
	trialPeriod: boolean
	comment?: string | null
	course: {
		_id: string
		courseName: string
		description?: string | null
		lang: string
	}
}

interface IProps {
	onHandleStatus: (
		id: string,
		value: boolean,
		status: 'active' | 'trial'
	) => void
	loading: boolean
}

export const userCoursesColumns = ({
	onHandleStatus,
	loading,
}: IProps): TableProps<IUserCourseAccessDisplay>['columns'] => [
	{
		title: 'ID',
		dataIndex: '_id',
		key: '_id',
	},
	{
		title: 'Курс',
		dataIndex: 'course',
		key: 'course',
		render: val => (
			<Typography>
				{val?.courseName}/{val?.lang}
			</Typography>
		),
	},
	{
		title: 'Дата начала',
		dataIndex: 'accessStartDate',
		key: 'accessStartDate',
		render: val => new Date(val).toLocaleDateString(),
	},
	{
		title: 'Дата завершение',
		dataIndex: 'accessEndDate',
		key: 'accessEndDate',
		render: val => (val ? new Date(val).toLocaleDateString() : '-'),
	},
	{
		title: 'Статус',
		dataIndex: '',
		key: 'status',
		render: (_, record: IUserCourseAccessDisplay) => (
			<>
				{record.active ? (
					<Tag color='green'>Открыт</Tag>
				) : (
					<Tag color='red'>Закрыт</Tag>
				)}
				{record.trialPeriod && (
					<Tag color='blue' style={{ marginLeft: 4 }}>
						Пробный
					</Tag>
				)}
			</>
		),
	},
	{
		title: 'Действия',
		dataIndex: 'action',
		key: 'action',
		render: (_, record) => {
			const popoverContent = (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 8,
						width: '100%',
					}}
				>
					<Row style={{ width: '100%', marginBottom: 8 }}>
						<Typography style={{ marginRight: '10px' }}>Доступ:</Typography>
						<Switch
							checkedChildren={<CheckOutlined />}
							unCheckedChildren={<CloseOutlined />}
							checked={record.active}
							loading={loading}
							onChange={val => onHandleStatus(record._id, val, 'active')}
						/>
					</Row>
					<Row style={{ width: '100%' }}>
						<Typography style={{ marginRight: '10px' }}>Пробный:</Typography>
						<Switch
							checkedChildren={<CheckOutlined />}
							unCheckedChildren={<CloseOutlined />}
							checked={record.trialPeriod}
							loading={loading}
							onChange={val => onHandleStatus(record._id, val, 'trial')}
						/>
					</Row>
				</div>
			)
			return (
				<Popover
					content={popoverContent}
					title='Изменить статус'
					trigger='click'
				>
					<Button
						icon={<SettingOutlined style={{ fontSize: '18px' }} />}
						style={{ width: '100%' }}
					/>
				</Popover>
			)
		},
	},
]
