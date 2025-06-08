import { TableProps, Typography } from 'antd'

interface IUserCourseAccessDisplay {
	_id: string
	accessStartDate?: string | null
	accessEndDate?: string | null
	active: boolean
	comment?: string | null
	course: {
		_id: string
		courseName: string
		description?: string | null
		lang: string
	}
}

export const userCoursesColumns: TableProps<IUserCourseAccessDisplay>['columns'] =
	[
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
			title: 'Доступ',
			dataIndex: 'active',
			key: 'active',
			render: val => (val ? 'Открыт' : 'Закрыт'),
		},
	]
