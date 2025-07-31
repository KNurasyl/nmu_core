'use client'

import { GET_COURSES } from '@/graphql/course'
import {
	GetCoursesQuery,
	GetMonitoringQuery,
} from '@/graphql/generated/graphql'
import { GET_USER_MONITORING } from '@/graphql/user'
import { useQuery } from '@apollo/client'
import { Row, Table } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import MonitoringFilter from './monitoringFilter/MonitoringFilter'
import UserAddModal from './monitoringModal/UserAddModal'
import { monitoringTableColumn } from './table/MonitoringTableColumn'

const PAGE_SIZE = 10

const MonitoringList = () => {
	const [page, setPage] = useState(1)
	const [search, setSearch] = useState('')
	const [idle, setIdle] = useState(false)
	const [todayOnly, setTodayOnly] = useState(false)
	const [statusFilter, setStatusFilter] = useState('all')
	const [planFilter, setPlanFilter] = useState('all')
	const [courseFilter, setCourseFilter] = useState('all')
	const [addUserOpen, setAddUserOpen] = useState(false)

	useEffect(() => {
		setPage(1)
	}, [search, idle, todayOnly, statusFilter, planFilter, courseFilter])

	const variables = useMemo(() => {
		const args: Record<string, unknown> = { page, pageSize: PAGE_SIZE }

		if (search.trim()) args.search = search.trim()
		if (idle) args.idle = true
		if (todayOnly) args.todayOnly = true
		if (statusFilter !== 'all') args.status = statusFilter
		if (planFilter !== 'all')
			args.plan = planFilter === 'trialPeriod' ? 'trial' : 'full'
		if (courseFilter !== 'all') args.courseId = courseFilter

		return { args }
	}, [page, search, idle, todayOnly, statusFilter, planFilter, courseFilter])

	const { data, loading, refetch } = useQuery<GetMonitoringQuery>(
		GET_USER_MONITORING,
		{ variables, fetchPolicy: 'network-only' }
	)

	const { data: coursesData } = useQuery<GetCoursesQuery>(GET_COURSES)

	const courseItems = coursesData?.getCourses?.map(c => ({
		label: c?.courseName,
		value: c?._id,
	}))

	return (
		<Row style={{ width: '100%', height: '100%' }}>
			<UserAddModal
				open={addUserOpen}
				onClose={() => setAddUserOpen(false)}
				refetch={refetch}
			/>

			<MonitoringFilter
				search={search}
				setSearch={setSearch}
				idle={idle}
				setIdle={setIdle}
				todayOnly={todayOnly}
				setTodayOnly={setTodayOnly}
				statusFilter={statusFilter}
				setStatusFilter={setStatusFilter}
				planFilter={planFilter}
				setPlanFilter={setPlanFilter}
				setAddUserOpen={setAddUserOpen}
				courseFilter={courseFilter}
				setCourseFilter={setCourseFilter}
				courseItems={courseItems}
			/>

			<Table
				style={{ width: '100%', height: '88%', overflowY: 'scroll' }}
				columns={monitoringTableColumn()}
				dataSource={data?.getMonitoring?.items ?? []}
				loading={loading}
				rowKey='_id'
				scroll={{ x: 1400 }}
				pagination={{
					current: page,
					pageSize: PAGE_SIZE,
					total: data?.getMonitoring?.total ?? 0,
					showSizeChanger: false,
					showTotal: (t, [from, to]) => `${from}-${to} из ${t}`,
					onChange: setPage,
				}}
			/>
		</Row>
	)
}

export default MonitoringList
