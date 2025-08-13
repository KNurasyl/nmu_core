'use client'

import { GetMonitoringQuery } from '@/graphql/generated/graphql'
import { BookOutlined } from '@ant-design/icons'
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
	if (!courses?.length) return '—'

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
					content={
						<div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
							{rest.map(badge)}
						</div>
					}
				>
					<Tag color={color}>+{rest.length}</Tag>
				</Popover>
			)}
		</Space>
	)
}

const renderCoursesProgress = (
	raw: MonitoringItem['coursesProgress'] | undefined
) => {
	const list = Array.isArray(raw) ? raw.filter(Boolean) : []
	if (list.length === 0) return '—'

	const item = (p: NonNullable<(typeof list)[number]>) => {
		const done = Number(p.completedLessons ?? 0)
		const total = Number(p.totalLessons ?? 0)
		const isDone = total > 0 && done >= total

		return (
			<div
				key={String(p.courseId)}
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 8,
					maxWidth: 420,
				}}
			>
				<Tag color={isDone ? 'success' : 'processing'}>
					{done}/{total}
				</Tag>
				<Tooltip title={p.courseName}>
					<Text style={{ maxWidth: 320 }} ellipsis={{ tooltip: p.courseName }}>
						{p.courseName}
					</Text>
				</Tooltip>
			</div>
		)
	}

	const head = list.slice(0, 3)
	const rest = list.slice(3)

	return (
		<Space direction='vertical' size={4} style={{ width: '100%' }}>
			{head.map(item)}
			{rest.length > 0 && (
				<Popover
					title='Ещё курсы'
					content={
						<div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
							{rest.map(item)}
						</div>
					}
				>
					<Tag>+{rest.length}</Tag>
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
			width: 135,
			align: 'center',
			render: phone => (
				<Link copyable href={`tel:${phone}`}>
					{phone}
				</Link>
			),
		},
		{
			title: 'Дата актив.',
			dataIndex: 'lastActiveDate',
			key: 'lastActiveDate',
			width: 140,
			align: 'center',
			render: d => (d ? dayjs(d).format('DD.MM.YY HH:mm') : '—'),
		},
		{
			title: 'Не заходил',
			dataIndex: 'lastActiveDays',
			key: 'lastActiveDays',
			width: 120,
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
			width: 180,
			align: 'center',
			ellipsis: true,
			render: l => l ?? '—',
		},
		{
			title: 'Прогресс по курсам',
			dataIndex: 'coursesProgress',
			key: 'coursesProgress',
			width: 250,
			render: progress => renderCoursesProgress(progress),
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
