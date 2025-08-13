'use client'

import { GET_COURSES } from '@/graphql/course'
import {
	GetCoursesQuery,
	GetMonitoringQuery,
} from '@/graphql/generated/graphql'
import { GET_USER_MONITORING } from '@/graphql/user'
import { useQuery } from '@apollo/client'
import { Row, Table } from 'antd'
import { useEffect, useMemo, useRef, useState } from 'react'
import MonitoringFilter from './monitoringFilter/MonitoringFilter'
import UserAddModal from './monitoringModal/UserAddModal'
import { monitoringTableColumn } from './table/MonitoringTableColumn'

const PAGE_SIZE = 10
const BOTTOM_THRESHOLD_PX = 120

type MonitoringItem = NonNullable<
	GetMonitoringQuery['getMonitoring']
>['items'][number]

const MonitoringList = () => {
	const [page, setPage] = useState(1)
	const [search, setSearch] = useState('')
	const [idle, setIdle] = useState(false)
	const [todayOnly, setTodayOnly] = useState(false)
	const [statusFilter, setStatusFilter] = useState('all')
	const [planFilter, setPlanFilter] = useState('all')
	const [courseFilter, setCourseFilter] = useState('all')
	const [addUserOpen, setAddUserOpen] = useState(false)
	const [items, setItems] = useState<MonitoringItem[]>([])
	const containerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		setPage(1)
		setItems([])
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
		{
			variables,
			fetchPolicy: 'network-only',
			notifyOnNetworkStatusChange: true,
		}
	)

	const { data: coursesData } = useQuery<GetCoursesQuery>(GET_COURSES)
	const courseItems = coursesData?.getCourses?.map(c => ({
		label: c?.courseName,
		value: c?._id,
	}))

	const total = data?.getMonitoring?.total ?? 0
	const pageItems = data?.getMonitoring?.items ?? []

	useEffect(() => {
		if (!data) return
		setItems(prev => {
			if (page === 1) return pageItems as MonitoringItem[]

			const map = new Map<string, MonitoringItem>()
			prev.forEach(it => it?._id && map.set(it._id, it))
			pageItems.forEach(it => it?._id && map.set(it._id, it as MonitoringItem))
			return Array.from(map.values())
		})
	}, [data, page])

	const canLoadMore = items.length < total
	const isFetchingInitial = loading && page === 1
	const isFetchingMore = loading && page > 1

	useEffect(() => {
		const el = containerRef.current
		if (!el) return

		const onScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = el
			const nearBottom =
				scrollTop + clientHeight >= scrollHeight - BOTTOM_THRESHOLD_PX

			if (nearBottom && !loading && canLoadMore) {
				setPage(p => p + 1)
			}
		}

		el.addEventListener('scroll', onScroll)
		return () => el.removeEventListener('scroll', onScroll)
	}, [loading, canLoadMore])

	console.log(items)

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

			<div
				ref={containerRef}
				style={{
					width: '100%',
					height: '88%',
					overflowY: 'auto',
					overflowX: 'auto',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Table
					columns={monitoringTableColumn()}
					dataSource={items}
					loading={isFetchingInitial}
					rowKey='_id'
					scroll={{ x: 'max-content' }}
					pagination={false}
				/>

				<div style={{ padding: 12, textAlign: 'center' }}>
					{isFetchingMore && 'Загружаем ещё...'}
					{!isFetchingMore && !canLoadMore && total > 0 && 'Больше данных нет'}
				</div>
			</div>
		</Row>
	)
}

export default MonitoringList
