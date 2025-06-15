import { TableProps, Tag, Tooltip } from 'antd'

export interface ILessonHistory {
	_id: string
	completed: boolean
	completedAt?: Date
	score?: number | null | undefined
	lesson?: {
		_id: string
		lessonCode: string
		lessonName: string
		description?: string | null | undefined
	}
}

export const lessonHistoryColumn: TableProps<ILessonHistory>['columns'] = [
	{
		title: 'ID',
		dataIndex: '_id',
		key: '_id',
	},
	{
		title: 'Название',
		dataIndex: ['lesson', 'lessonName'],
		key: 'lesson.lessonName',
	},
	{
		title: 'Описание',
		dataIndex: ['lesson', 'description'],
		key: 'lesson.description',
		render: (desc: string, record: ILessonHistory) => {
			const text = desc || record.lesson?.description || ''
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
		title: 'Прогресс',
		dataIndex: 'score',
		key: 'score',
	},
]
