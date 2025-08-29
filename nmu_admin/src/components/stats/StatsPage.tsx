'use client'

import { GET_USER_STATS } from '@/graphql/user'
import { ReloadOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import {
	Alert,
	Button,
	Card,
	Col,
	Divider,
	Empty,
	Progress,
	Row,
	Space,
	Spin,
	Statistic,
	Table,
	Typography,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useMemo } from 'react'

type CourseRow = {
	key: string
	courseName: string
	count: number
	percentOfActive: number
}

const StatsPage = () => {
	const { data, loading, error, refetch } = useQuery(GET_USER_STATS)
	const stats = data?.studentStatistics

	const courseRows: CourseRow[] = useMemo(() => {
		if (!stats?.courseStudents) return []
		const active = Math.max(stats.activeStudents || 0, 0)
		return stats.courseStudents.map(({ course, count }) => ({
			key: course.id,
			courseName: course.courseName,
			count,
			// доля от активных (на заметку: студент может учиться на нескольких курсах)
			percentOfActive: active > 0 ? Math.round((count / active) * 100) : 0,
		}))
	}, [stats])

	const columns: ColumnsType<CourseRow> = [
		{
			title: '#',
			dataIndex: 'index',
			width: 64,
			align: 'center',
			render: (_: unknown, __: CourseRow, index: number) => index + 1,
		},
		{
			title: 'Курс',
			dataIndex: 'courseName',
			ellipsis: true,
		},
		{
			title: 'Учащихся',
			dataIndex: 'count',
			sorter: (a, b) => a.count - b.count,
			defaultSortOrder: 'descend',
			width: 140,
			align: 'right',
		},
		{
			title: 'Доля от активных',
			dataIndex: 'percentOfActive',
			width: 240,
			render: (value: number) => <Progress percent={value} size='small' />,
		},
	]

	if (loading && !stats) {
		return (
			<div
				style={{
					minHeight: 320,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Spin size='large' />
			</div>
		)
	}

	if (error) {
		return (
			<Card>
				<Alert
					type='error'
					message='Не удалось загрузить статистику'
					description={error.message}
					action={
						<Button icon={<ReloadOutlined />} onClick={() => refetch()}>
							Повторить
						</Button>
					}
					showIcon
				/>
			</Card>
		)
	}

	return (
		<Space direction='vertical' size={16} style={{ width: '100%' }}>
			<Row justify='space-between' align='middle'>
				<Col>
					<Typography.Title level={3} style={{ margin: 0 }}>
						Статистика студентов
					</Typography.Title>
				</Col>
				<Col>
					<Button
						icon={<ReloadOutlined />}
						onClick={() => refetch()}
						disabled={loading}
					>
						Обновить
					</Button>
				</Col>
			</Row>

			<Row gutter={[16, 16]}>
				<Col xs={24} md={12} lg={6}>
					<Card>
						<Statistic
							title='Всего студентов'
							value={stats?.totalStudents ?? 0}
						/>
					</Card>
				</Col>
				<Col xs={24} md={12} lg={6}>
					<Card>
						<Statistic
							title='Учится сейчас'
							value={stats?.activeStudents ?? 0}
						/>
					</Card>
				</Col>
				<Col xs={24} md={12} lg={6}>
					<Card>
						<Statistic
							title='На заморозке'
							value={stats?.frozenStudents ?? 0}
						/>
					</Card>
				</Col>
				<Col xs={24} md={12} lg={6}>
					<Card>
						<Statistic
							title='Без ментора'
							value={stats?.noMentorStudents ?? 0}
						/>
					</Card>
				</Col>
			</Row>

			<Card>
				<Row justify='space-between' align='middle'>
					<Col>
						<Typography.Title level={4} style={{ margin: 0 }}>
							Активные студенты по курсам
						</Typography.Title>
					</Col>
					<Col>
						<Typography.Text type='secondary'>
							* Студент может учиться на нескольких курсах одновременно
						</Typography.Text>
					</Col>
				</Row>

				<Divider style={{ margin: '12px 0 16px' }} />

				{courseRows.length === 0 ? (
					<Empty description='Нет данных по курсам' />
				) : (
					<Table<CourseRow>
						columns={columns}
						dataSource={courseRows}
						rowKey='key'
						size='middle'
					/>
				)}
			</Card>
		</Space>
	)
}

export default StatsPage
