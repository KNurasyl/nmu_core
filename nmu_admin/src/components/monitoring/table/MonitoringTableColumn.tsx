'use client'

import { GetMonitoringQuery } from '@/graphql/generated/graphql'
import { BookOutlined, EllipsisOutlined } from '@ant-design/icons'
import type { MenuProps, TableProps } from 'antd'
import {
	Button,
	DatePicker,
	Dropdown,
	Modal,
	Popover,
	Space,
	Tag,
	Tooltip,
	Typography,
} from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type MonitoringItem = GetMonitoringQuery['getMonitoring']['items'][number]
const { Text, Link } = Typography
const { RangePicker } = DatePicker

export type MonitoringTableHandlers = {
	onOpenCourse: (userId: string) => void
	onToggleSupport: (userId: string, enabled: boolean) => void
	onFreeze: (userId: string, startISO: string, endISO: string) => void
	onUnfreeze: (userId: string) => void
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

const ActionMenu = ({
	record,
	onOpenCourse,
	onToggleSupport,
	onFreeze,
	onUnfreeze,
}: {
	record: MonitoringItem
	onOpenCourse: (userId: string) => void
	onToggleSupport: (userId: string, enabled: boolean) => void
	onFreeze: (userId: string, startISO: string, endISO: string) => void
	onUnfreeze: (userId: string) => void
}) => {
	const router = useRouter()
	const has = record?.hasMentorSupport ?? true
	const frozen = !!record?.isFrozen

	const [freezeOpen, setFreezeOpen] = useState(false)
	const [range, setRange] = useState<[Dayjs, Dayjs] | null>(null)

	const onClick: MenuProps['onClick'] = async ({ key }) => {
		switch (key) {
			case 'details':
				router.push(`/user/${record._id}`)
				break
			case 'openCourse':
				onOpenCourse(record._id)
				break
			case 'stopService':
				onToggleSupport(record._id, false)
				break
			case 'startService':
				onToggleSupport(record._id, true)
				break
			case 'freeze':
				setRange(null)
				setFreezeOpen(true)
				break
			case 'unfreeze':
				onUnfreeze(record._id)
				break
			default:
				break
		}
	}

	const items: MenuProps['items'] = [
		{ key: 'details', label: 'Подробнее' },
		{ type: 'divider' },
		{ key: 'openCourse', label: 'Открыть курс' },
		{ type: 'divider' },
		has
			? { key: 'stopService', label: 'Остановить сервис' }
			: { key: 'startService', label: 'Включить сервис' },
		{ type: 'divider' },
		frozen
			? { key: 'unfreeze', label: 'Снять заморозку' }
			: { key: 'freeze', label: 'Заморозить' },
	]

	const handleFreezeOk = () => {
		if (!range) return
		const [start, end] = range
		const startISO = start.startOf('day').toISOString()
		const endISO = end.endOf('day').toISOString()
		onFreeze(record._id, startISO, endISO)
		setFreezeOpen(false)
	}

	return (
		<>
			<Dropdown
				menu={{ items, onClick }}
				trigger={['click']}
				placement='bottomRight'
			>
				<Button type='text' icon={<EllipsisOutlined />} />
			</Dropdown>

			<Modal
				open={freezeOpen}
				title='Заморозить пользователя'
				onCancel={() => setFreezeOpen(false)}
				onOk={handleFreezeOk}
				okButtonProps={{ disabled: !range }}
			>
				<Space direction='vertical' size={12} style={{ width: '100%' }}>
					<RangePicker
						style={{ width: '100%' }}
						value={range ?? undefined}
						onChange={v => setRange((v as [Dayjs, Dayjs]) ?? null)}
						allowClear
						format='DD.MM.YYYY'
						disabledDate={d => !d || d.isAfter(dayjs().add(2, 'year'))}
					/>
					<Text type='secondary'>
						Выберите период заморозки. В это время студент считается
						замороженным.
					</Text>
				</Space>
			</Modal>
		</>
	)
}

export const monitoringTableColumn = (
	handlers: MonitoringTableHandlers
): TableProps<MonitoringItem>['columns'] => [
	{
		title: 'Студент',
		dataIndex: 'userName',
		key: 'userName',
		width: 180,
		fixed: 'left',
		ellipsis: true,
		render: (name: string, record) => {
			const has = record?.hasMentorSupport ?? true
			const frozen = !!record?.isFrozen
			return (
				<Tooltip title={name}>
					<Space size={6} wrap>
						<Text
							style={{
								color: has ? undefined : '#cf1322',
								fontWeight: has ? undefined : 600,
							}}
						>
							{name}
						</Text>
						{!has && <Tag color='error'>Сервис остановлен</Tag>}
						{frozen && <Tag color='processing'>Заморожен</Tag>}
					</Space>
				</Tooltip>
			)
		},
	},
	{
		title: 'Телефон',
		dataIndex: 'phoneNumber',
		key: 'phoneNumber',
		width: 135,
		align: 'center',
		render: (phone: string) => (
			<Link copyable href={`tel:${phone}`}>
				{phone}
			</Link>
		),
	},
	{
		title: 'Сервис',
		dataIndex: 'hasMentorSupport',
		key: 'hasMentorSupport',
		width: 110,
		align: 'center',
		render: (val: boolean | undefined) =>
			val ?? true ? (
				<Tag color='success'>Да</Tag>
			) : (
				<Tag color='error'>Нет</Tag>
			),
	},
	{
		title: 'Дата актив.',
		dataIndex: 'lastActiveDate',
		key: 'lastActiveDate',
		width: 140,
		align: 'center',
		render: (d?: string | null) =>
			d ? dayjs(d).format('DD.MM.YY HH:mm') : '—',
	},
	{
		title: 'Не заходил',
		dataIndex: 'lastActiveDays',
		key: 'lastActiveDays',
		width: 120,
		align: 'center',
		render: (d?: number | null) =>
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
		width: 200,
		align: 'center',
		ellipsis: true,
		render: (l?: string | null) => l ?? '—',
	},
	{
		title: 'Прогресс по курсам',
		dataIndex: 'coursesProgress',
		key: 'coursesProgress',
		width: 280,
		render: progress => renderCoursesProgress(progress),
	},
	{
		title: 'Доступные курсы',
		dataIndex: 'availableCourses',
		key: 'availableCourses',
		width: 220,
		align: 'center',
		render: courses => renderCourseTags(courses, 'blue', true),
	},
	{
		title: 'Действия',
		key: 'action',
		width: 40,
		fixed: 'right',
		ellipsis: true,
		align: 'center',
		render: (_, record) => (
			<ActionMenu
				record={record}
				onOpenCourse={handlers.onOpenCourse}
				onToggleSupport={handlers.onToggleSupport}
				onFreeze={handlers.onFreeze}
				onUnfreeze={handlers.onUnfreeze}
			/>
		),
	},
]
