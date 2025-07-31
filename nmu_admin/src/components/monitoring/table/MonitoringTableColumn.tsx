'use client'

import { GetMonitoringQuery } from '@/graphql/generated/graphql'
import {
	BookOutlined,
	CheckCircleFilled,
	CloseCircleFilled,
} from '@ant-design/icons'
import {
	Button,
	Popover,
	Space,
	TableProps,
	Tag,
	Tooltip,
	Typography,
} from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

type MonitoringItem = GetMonitoringQuery['getMonitoring']['items'][number]
const { Text, Link } = Typography

const ActionButton = ({ userId }: { userId: string }) => {
	const router = useRouter()
	return (
		<Button type='link' onClick={() => router.replace(`/user/${userId}`)}>
			Подробнее
		</Button>
	)
}

const renderCourseTags = <
	T extends { courseId: string; courseName: string; trialPeriod?: boolean }
>(
	courses: readonly T[],
	color: 'blue' | 'success',
	withTrial = false
) => {
	if (!courses.length) return '—'

	const badge = (c: T) => (
		<Tag
			key={c.courseId}
			icon={<BookOutlined />}
			color={withTrial && c.trialPeriod ? 'volcano' : color}
			style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis' }}
		>
			{c.courseName}
			{withTrial && c.trialPeriod && ' (Пробный)'}
		</Tag>
	)

	const head = courses.slice(0, 2)
	const rest = courses.slice(2)

	return (
		<Space wrap size={[0, 4]}>
			{head.map(badge)}
			{rest.length > 0 && (
				<Popover
					title='Ещё курсы'
					overlayInnerStyle={{ maxHeight: 200, overflowY: 'auto' }}
					content={rest.map(badge)}
				>
					<Tag color={color}>+{rest.length}</Tag>
				</Popover>
			)}
		</Space>
	)
}

export const monitoringTableColumn =
	(): TableProps<MonitoringItem>['columns'] => [
		{
			title: 'Студент',
			dataIndex: 'userName',
			key: 'userName',
			width: 120,
			fixed: 'left',
			ellipsis: true,
			render: name => (
				<Tooltip title={name}>
					<Text>{name}</Text>
				</Tooltip>
			),
		},
		{
			title: 'Телефон',
			dataIndex: 'phoneNumber',
			key: 'phoneNumber',
			width: 150,
			align: 'center',
			render: phone => (
				<Link copyable href={`tel:${phone}`}>
					{phone}
				</Link>
			),
		},
		{
			title: 'Статус',
			dataIndex: 'inactive',
			key: 'inactive',
			width: 120,
			align: 'center',
			render: inactive =>
				inactive ? (
					<Tag icon={<CloseCircleFilled />} color='error'>
						Нет
					</Tag>
				) : (
					<Tag icon={<CheckCircleFilled />} color='success'>
						Да
					</Tag>
				),
		},
		{
			title: 'Дата активности',
			dataIndex: 'lastActiveDate',
			key: 'lastActiveDate',
			width: 160,
			align: 'center',
			render: d => (d ? dayjs(d).format('DD.MM.YY HH:mm') : '—'),
		},
		{
			title: 'Не заходил, дн.',
			dataIndex: 'lastActiveDays',
			key: 'lastActiveDays',
			width: 140,
			align: 'center',
			render: d =>
				d == null ? (
					'—'
				) : d === 0 ? (
					<Tag color='success'>Сегодня</Tag>
				) : (
					<Tag color={d > 5 ? 'error' : 'warning'}>{d}</Tag>
				),
		},
		{
			title: 'Последний урок',
			dataIndex: 'lastActiveLesson',
			key: 'lastActiveLesson',
			width: 140,
			align: 'center',
			ellipsis: true,
			render: l => l ?? '—',
		},
		{
			title: 'Доступные курсы',
			dataIndex: 'availableCourses',
			key: 'availableCourses',
			width: 200,
			align: 'center',
			render: courses => renderCourseTags(courses, 'blue', true),
		},
		{
			title: 'Пройденные',
			dataIndex: 'completedCourses',
			key: 'completedCourses',
			width: 200,
			align: 'center',
			render: courses => renderCourseTags(courses, 'success'),
		},
		{
			title: 'Действия',
			key: 'action',
			width: 120,
			fixed: 'right',
			ellipsis: true,
			align: 'end',
			render: (_, record) => <ActionButton userId={record._id} />,
		},
	]
