'use client'

import { useMutation, useQuery } from '@apollo/client'
import dayjs from 'dayjs'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import UserAddAccessCourseModal from '@/components/user/userModal/UserAddAccessCourseModal'
import { GET_COURSES } from '@/graphql/course'
import {
	GetCoursesQuery,
	GetMonitoringQuery,
} from '@/graphql/generated/graphql'
import {
	FREEZE_USER,
	GET_USER_MONITORING,
	REMOVE_USER_BY_ID,
	START_USER_MENTOR,
	STOP_USER_MENTOR,
	UNFREEZE_USER,
} from '@/graphql/user'
import { loadFilters, mapPlanToArg, saveFilters } from '@/helpers/monitoring'
import {
	CourseFilter,
	DEFAULT_FILTERS,
	FiltersState,
	PAGE_SIZE,
	PlanFilter,
	StatusFilter,
} from '@/types/monitoring'
import { MonitoringItem, MonitoringTableHandlers } from '@/types/types'
import { notification } from 'antd' // для тостов, у вас уже используется
import MonitoringCard from '../ui/MonitoringCard'
import MonitoringLegend from '../ui/MonitoringLegend'
import MonitoringTable from '../ui/MonitoringTable'
import MonitoringFilters from './MonitoringFilters'
import UserAddModal from './UserAddModal'

const MonitoringList = () => {
	// ------ state ------
	const [hydrated, setHydrated] = useState(false)
	const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS)
	const { search, idle, todayOnly, statusFilter, planFilter, courseFilter } =
		filters

	const [page, setPage] = useState(1)
	const [items, setItems] = useState<MonitoringItem[]>([])
	const [addUserOpen, setAddUserOpen] = useState(false)
	const [selectUserId, setSelectUserId] = useState('')
	const [addAccessCourseOpen, setAddAccessCourseOpen] = useState(false)

	const scrollRef = useRef<HTMLDivElement | null>(null)
	const sentinelRef = useRef<HTMLDivElement | null>(null)

	// ------ mutations ------
	const [startMentor] = useMutation(START_USER_MENTOR)
	const [stopMentor] = useMutation(STOP_USER_MENTOR)
	const [freezeUser] = useMutation(FREEZE_USER)
	const [unfreezeUser] = useMutation(UNFREEZE_USER)
	const [removeUser] = useMutation(REMOVE_USER_BY_ID) // ⬅️ новое

	// ------ hydrate filters ------
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

	// сеттеры
	const setSearchSafe = useCallback((v: string) => {
		setFilters(prev => ({ ...prev, search: v }))
	}, [])
	const setIdleSafe = useCallback((v: boolean) => {
		setFilters(prev => ({ ...prev, idle: v }))
	}, [])
	const setTodayOnlySafe = useCallback((v: boolean) => {
		setFilters(prev => ({ ...prev, todayOnly: v }))
	}, [])
	const setStatusFilterSafe = useCallback((v: string) => {
		setFilters(prev => ({ ...prev, statusFilter: v as StatusFilter }))
	}, [])
	const setPlanFilterSafe = useCallback((v: string) => {
		setFilters(prev => ({ ...prev, planFilter: v as PlanFilter }))
	}, [])
	const setCourseFilterSafe = useCallback((v: string) => {
		setFilters(prev => ({ ...prev, courseFilter: v as CourseFilter }))
	}, [])

	// ------ variables for query ------
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

	// ------ queries ------
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
			label: c?.courseName ?? '',
			value: c?._id ?? '',
		})) ?? []

	const total = data?.getMonitoring?.total ?? 0
	const pageItems = (data?.getMonitoring?.items ?? []) as MonitoringItem[]

	// аккумулируем страницы
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

	// инфинит-скролл
	useEffect(() => {
		const root = scrollRef.current
		const target = sentinelRef.current
		if (!root || !target) return
		const io = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting && !loading && canLoadMore) {
					setPage(p => p + 1)
				}
			},
			{ root, rootMargin: '0px 0px 120px 0px', threshold: 0 }
		)
		io.observe(target)
		return () => io.disconnect()
	}, [loading, canLoadMore])

	// ------ handlers ------
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
				if (enabled) await startMentor({ variables: { userId } })
				else await stopMentor({ variables: { userId } })
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

	// ⬇️ УДАЛЕНИЕ
	const handleDelete = useCallback(
		async (userId: string, userName?: string) => {
			// оптимистично скрываем из списка
			setItems(prev => prev.filter(i => i._id !== userId))
			try {
				await removeUser({ variables: { id: userId } })
				notification.success({
					message: 'Пользователь удалён',
					description: userName ? `Удалён: ${userName}` : undefined,
					placement: 'topRight',
				})
			} catch {
				// откатим локально и покажем ошибку
				await refetch()
				notification.error({
					message: 'Не удалось удалить',
					description: 'Попробуйте ещё раз',
					placement: 'topRight',
				})
			} finally {
				// синхронизируем общее количество и список
				refetch()
			}
		},
		[removeUser, refetch]
	)

	const tableHandlers: MonitoringTableHandlers = useMemo(
		() => ({
			onOpenCourse: handleOpenCourse,
			onToggleSupport: handleToggleSupport,
			onFreeze: handleFreeze,
			onUnfreeze: handleUnfreeze,
			onDelete: handleDelete, // ⬅️ новое
		}),
		[
			handleOpenCourse,
			handleToggleSupport,
			handleFreeze,
			handleUnfreeze,
			handleDelete,
		]
	)

	// ------ render ------
	return (
		<div className='flex h-full w-full flex-col text-gray-900'>
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

			<MonitoringFilters
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

			<MonitoringLegend />

			<div
				ref={scrollRef}
				className='relative flex-1 overflow-y-auto no-scrollbar'
			>
				{/* Desktop */}
				<div className='hidden md:block'>
					<MonitoringTable
						items={items}
						loading={isFetchingInitial || !hydrated}
						handlers={tableHandlers}
						rowClassName={r => {
							const has = r.hasMentorSupport ?? true
							const frozen = !!r.isFrozen
							return !has ? 'bg-red-50' : frozen ? 'bg-blue/5' : ''
						}}
						formatDate={d => (d ? dayjs(d).format('DD.MM.YY HH:mm') : '—')}
					/>
				</div>

				{/* Mobile — карточки */}
				<div className='md:hidden grid gap-3'>
					{items.map(u => (
						<MonitoringCard
							key={u._id}
							user={u}
							handlers={tableHandlers}
							formatDate={d => (d ? dayjs(d).format('DD.MM.YY HH:mm') : '—')}
						/>
					))}

					{(isFetchingInitial || !hydrated) && (
						<div className='py-4 text-center text-sm text-gray-500'>
							Загружаем…
						</div>
					)}
				</div>

				<div ref={sentinelRef} />
				<div className='py-3 text-center text-sm text-gray-500'>
					{isFetchingMore && 'Загружаем ещё…'}
					{!isFetchingMore &&
						items.length >= total &&
						total > 0 &&
						'Больше данных нет'}
				</div>
			</div>
		</div>
	)
}

export default MonitoringList
