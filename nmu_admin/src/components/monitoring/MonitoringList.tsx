'use client'

import { GET_COURSES } from '@/graphql/course'
import {
	GetCoursesQuery,
	GetMonitoringQuery,
} from '@/graphql/generated/graphql'
import {
	FREEZE_USER,
	GET_USER_MONITORING,
	START_USER_MENTOR,
	STOP_USER_MENTOR,
	UNFREEZE_USER,
} from '@/graphql/user'
import { loadFilters, mapPlanToArg, saveFilters } from '@/helpers/monitoring'
import {
	CourseFilter,
	DEFAULT_FILTERS,
	FiltersState,
	MonitoringItem,
	PAGE_SIZE,
	PlanFilter,
	StatusFilter,
} from '@/types/monitoring'
import { useMutation, useQuery } from '@apollo/client'
import { Row, Table, Typography } from 'antd'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import UserAddAccessCourseModal from '../user/userModal/UserAddAccessCourseModal'
import MonitoringFilter from './monitoringFilter/MonitoringFilter'
import UserAddModal from './monitoringModal/UserAddModal'
import {
	monitoringTableColumn,
	MonitoringTableHandlers,
} from './table/MonitoringTableColumn'

const { Text } = Typography

const MonitoringList = () => {
	const [hydrated, setHydrated] = useState(false)
	const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS)
	const { search, idle, todayOnly, statusFilter, planFilter, courseFilter } =
		filters

	const [page, setPage] = useState(1)
	const [items, setItems] = useState<MonitoringItem[]>([])
	const [addUserOpen, setAddUserOpen] = useState(false)
	const [selectUserId, setSelectUserId] = useState('')
	const [addAccessCourseOpen, setAddAccessCourseOpen] = useState(false)
	const containerRef = useRef<HTMLDivElement | null>(null)
	const sentinelRef = useRef<HTMLDivElement | null>(null)

	const [startMentor] = useMutation(START_USER_MENTOR)
	const [stopMentor] = useMutation(STOP_USER_MENTOR)
	const [freezeUser] = useMutation(FREEZE_USER)
	const [unfreezeUser] = useMutation(UNFREEZE_USER)

	useEffect(() => {
		setFilters(loadFilters())
		setHydrated(true)
	}, [])

	useEffect(() => {
		if (!hydrated) return
		setPage(1)
		setItems([])
	}, [
		hydrated,
		search,
		idle,
		todayOnly,
		statusFilter,
		planFilter,
		courseFilter,
	])

	useEffect(() => {
		if (!hydrated) return
		saveFilters(filters)
	}, [hydrated, filters])

	const setSearchSafe = useCallback(
		(v: string) => setFilters(prev => ({ ...prev, search: v })),
		[]
	)
	const setIdleSafe = useCallback(
		(v: boolean) => setFilters(prev => ({ ...prev, idle: v })),
		[]
	)
	const setTodayOnlySafe = useCallback(
		(v: boolean) => setFilters(prev => ({ ...prev, todayOnly: v })),
		[]
	)
	const setStatusFilterSafe = useCallback(
		(v: string) =>
			setFilters(prev => ({ ...prev, statusFilter: v as StatusFilter })),
		[]
	)
	const setPlanFilterSafe = useCallback(
		(v: string) =>
			setFilters(prev => ({ ...prev, planFilter: v as PlanFilter })),
		[]
	)
	const setCourseFilterSafe = useCallback(
		(v: string) =>
			setFilters(prev => ({ ...prev, courseFilter: v as CourseFilter })),
		[]
	)

	const variables = useMemo(() => {
		const args: Record<string, unknown> = { page, pageSize: PAGE_SIZE }
		const planArg = mapPlanToArg(planFilter)
		if (search.trim()) args.search = search.trim()
		if (idle) args.idle = true
		if (todayOnly) args.todayOnly = true
		if (statusFilter !== 'all') args.status = statusFilter
		if (planArg) args.plan = planArg
		if (courseFilter !== 'all') args.courseId = courseFilter
		return { args }
	}, [page, search, idle, todayOnly, statusFilter, planFilter, courseFilter])

	const { data, loading, refetch } = useQuery<GetMonitoringQuery>(
		GET_USER_MONITORING,
		{
			variables,
			fetchPolicy: 'network-only',
			notifyOnNetworkStatusChange: true,
			skip: !hydrated,
		}
	)

	const { data: coursesData } = useQuery<GetCoursesQuery>(GET_COURSES, {
		skip: !hydrated,
	})
	const courseItems =
		coursesData?.getCourses?.map(c => ({
			label: c?.courseName,
			value: c?._id,
		})) ?? []

	const total = data?.getMonitoring?.total ?? 0
	const pageItems = (data?.getMonitoring?.items ?? []) as MonitoringItem[]

	useEffect(() => {
		if (!data) return
		setItems(prev => {
			if (page === 1) return pageItems
			const map = new Map<string, MonitoringItem>()
			prev.forEach(it => it?._id && map.set(it._id, it))
			pageItems.forEach(it => it?._id && map.set(it._id, it))
			return Array.from(map.values())
		})
	}, [data, page])

	const canLoadMore = items.length < total
	const isFetchingInitial = loading && page === 1
	const isFetchingMore = loading && page > 1

	useEffect(() => {
		const root = containerRef.current
		const target = sentinelRef.current
		if (!root || !target) return
		const io = new IntersectionObserver(
			entries => {
				const e = entries[0]
				if (e.isIntersecting && !loading && canLoadMore) {
					setPage(p => p + 1)
				}
			},
			{ root, rootMargin: '0px 0px 120px 0px', threshold: 0 }
		)
		io.observe(target)
		return () => io.disconnect()
	}, [loading, canLoadMore])

	const handleOpenCourse = useCallback((userId: string) => {
		setSelectUserId(userId)
		setAddAccessCourseOpen(true)
	}, [])

	const handleToggleSupport = useCallback(
		async (userId: string, enabled: boolean) => {
			setItems(prev =>
				prev.map(i =>
					i._id === userId ? { ...i, hasMentorSupport: enabled } : i
				)
			)
			try {
				if (enabled) {
					await startMentor({ variables: { userId } })
				} else {
					await stopMentor({ variables: { userId } })
				}
			} catch {
				setItems(prev =>
					prev.map(i =>
						i._id === userId ? { ...i, hasMentorSupport: !enabled } : i
					)
				)
			} finally {
				refetch()
			}
		},
		[startMentor, stopMentor, refetch]
	)

	const handleFreeze = useCallback(
		async (userId: string, startISO: string, endISO: string) => {
			setItems(prev =>
				prev.map(i => (i._id === userId ? { ...i, isFrozen: true } : i))
			)
			try {
				await freezeUser({
					variables: {
						input: { userId, startDate: startISO, endDate: endISO },
					},
				})
			} catch {
				setItems(prev =>
					prev.map(i => (i._id === userId ? { ...i, isFrozen: false } : i))
				)
			} finally {
				refetch()
			}
		},
		[freezeUser, refetch]
	)

	const handleUnfreeze = useCallback(
		async (userId: string) => {
			setItems(prev =>
				prev.map(i => (i._id === userId ? { ...i, isFrozen: false } : i))
			)
			try {
				await unfreezeUser({ variables: { userId } })
			} catch {
				setItems(prev =>
					prev.map(i => (i._id === userId ? { ...i, isFrozen: true } : i))
				)
			} finally {
				refetch()
			}
		},
		[unfreezeUser, refetch]
	)

	const tableHandlers: MonitoringTableHandlers = useMemo(
		() => ({
			onOpenCourse: handleOpenCourse,
			onToggleSupport: handleToggleSupport,
			onFreeze: handleFreeze,
			onUnfreeze: handleUnfreeze,
		}),
		[handleOpenCourse, handleToggleSupport, handleFreeze, handleUnfreeze]
	)

	const columns = useMemo(
		() => monitoringTableColumn(tableHandlers),
		[tableHandlers]
	)

	return (
		<Row style={{ width: '100%', height: '100%' }}>
			<UserAddModal
				open={addUserOpen}
				onClose={() => setAddUserOpen(false)}
				refetch={refetch}
			/>

			<UserAddAccessCourseModal
				open={addAccessCourseOpen}
				onClose={() => setAddAccessCourseOpen(false)}
				userId={selectUserId}
				refetch={refetch}
			/>

			<MonitoringFilter
				search={search}
				setSearch={setSearchSafe}
				idle={idle}
				setIdle={setIdleSafe}
				todayOnly={todayOnly}
				setTodayOnly={setTodayOnlySafe}
				statusFilter={statusFilter}
				setStatusFilter={setStatusFilterSafe}
				planFilter={planFilter}
				setPlanFilter={setPlanFilterSafe}
				setAddUserOpen={setAddUserOpen}
				courseFilter={courseFilter}
				setCourseFilter={setCourseFilterSafe}
				courseItems={courseItems}
			/>

			<div style={{ position: 'relative', width: '100%', height: '88%' }}>
				<div
					style={{
						position: 'absolute',
						top: -120,
						right: 12,
						display: 'flex',
						gap: 16,
						alignItems: 'center',
						zIndex: 10,
						pointerEvents: 'none',
					}}
				>
					<span
						style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
					>
						<i
							style={{
								width: 14,
								height: 14,
								background: '#fff1f0',
								border: '1px solid #ffa39e',
								borderRadius: 4,
								display: 'inline-block',
							}}
						/>
						<Text type='secondary'>Сервис остановлен</Text>
					</span>
					<span
						style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
					>
						<i
							style={{
								width: 14,
								height: 14,
								background: '#e6f7ff',
								border: '1px solid #91d5ff',
								borderRadius: 4,
								display: 'inline-block',
							}}
						/>
						<Text type='secondary'>Заморожен</Text>
					</span>
				</div>

				<div
					ref={containerRef}
					style={{
						width: '100%',
						height: '100%',
						overflow: 'auto',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Table
						columns={columns}
						dataSource={items}
						loading={isFetchingInitial || !hydrated}
						rowKey='_id'
						scroll={{ x: 'max-content' }}
						pagination={false}
						onRow={record => {
							const r = record as MonitoringItem
							const has = r.hasMentorSupport ?? true
							const frozen = !!r.isFrozen
							return {
								style: {
									background: !has ? '#fff1f0' : frozen ? '#e6f7ff' : undefined,
								},
							}
						}}
					/>

					<div ref={sentinelRef} />
					<div style={{ padding: 12, textAlign: 'center' }}>
						{isFetchingMore && 'Загружаем ещё...'}
						{!isFetchingMore &&
							!canLoadMore &&
							total > 0 &&
							'Больше данных нет'}
					</div>
				</div>
			</div>
		</Row>
	)
}

export default MonitoringList
