import { TableProps, Tag, Tooltip } from 'antd'

export interface ITaskHistory {
	_id: string
	completed: boolean
	completedAt?: Date
	score?: number | null | undefined
	task?: {
		_id: string
		lessonCode: string
		type: string
		description?: {
			kk: string
			ru: string
		} | null
	}
}

export const taskHistoryColumn: TableProps<ITaskHistory>['columns'] = [
	{
		title: 'ID',
		dataIndex: '_id',
		key: '_id',
	},
	{
		title: 'Тип',
		dataIndex: ['task', 'type'],
		key: 'task.type',
	},
	{
		title: 'Описание',
		dataIndex: ['task', 'description', 'ru'],
		key: 'task.description.ru',
		render: (desc: string, record: ITaskHistory) => {
			const text = desc || record.task?.description?.ru || ''
			const maxLen = 40
			const cutText = text.length > maxLen ? text.slice(0, maxLen) + '…' : text
			return (
				<Tooltip title={text}>
					<span>{cutText}</span>
				</Tooltip>
			)
		},
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
		title: 'Набранный балл (100)',
		dataIndex: 'score',
		key: 'score',
	},
]
