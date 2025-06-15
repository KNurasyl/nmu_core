import { TableProps, Tag } from 'antd'

export interface ICourseHistory {
	_id: string
	completed: boolean
	completedAt?: Date
	score?: number | null | undefined
	course?: {
		_id?: string
		courseName?: string
	}
}

export const courseHistoryColumn: TableProps<ICourseHistory>['columns'] = [
	{
		title: 'ID',
		dataIndex: '_id',
		key: '_id',
	},
	{
		title: 'Название',
		dataIndex: ['course', 'courseName'],
		key: 'score',
	},
	{
		title: 'Статус',
		dataIndex: 'completed',
		key: 'completed',
		render: (_, record) => (
			<>
				{record?.completed ? (
					<Tag color='green'>
						Завершил {new Date(record?.completedAt || '').toLocaleDateString()}
					</Tag>
				) : (
					<Tag color='#6464f3'>Не завершил</Tag>
				)}
			</>
		),
	},
	{
		title: 'Прогресс (100)',
		dataIndex: 'score',
		key: 'score',
	},
]
