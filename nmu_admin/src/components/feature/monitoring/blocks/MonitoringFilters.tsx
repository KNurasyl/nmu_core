'use client'

import { useDebounce } from '@/hooks/useDebounce'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

type Setter<T> = (value: T) => void

interface IProps {
	search: string
	setSearch: Setter<string>
	idle: boolean
	setIdle: Setter<boolean>
	todayOnly: boolean
	setTodayOnly: Setter<boolean>
	statusFilter: string
	setStatusFilter: Setter<string>
	planFilter: string
	setPlanFilter: Setter<string>
	setAddUserOpen: Setter<boolean>
	setCourseFilter: Setter<string>
	courseFilter: string
	courseItems: { label: string; value: string }[] | undefined
}

/** ====== авто-ширина для select по тексту ====== */
type Opt = { label: string; value: string }
function AutoWidthSelect({
	value,
	onChange,
	options,
	className,
	minPx = 110,
	maxPx,
}: {
	value: string
	onChange: (v: string) => void
	options: Opt[]
	className?: string
	minPx?: number
	maxPx?: number
}) {
	const selectRef = useRef<HTMLSelectElement>(null)
	const ghostRef = useRef<HTMLSpanElement>(null)
	const [width, setWidth] = useState<number>(minPx)

	const label = useMemo(
		() => options.find(o => o.value === value)?.label ?? '',
		[options, value]
	)

	const measure = () => {
		if (!ghostRef.current) return
		const extra = 12 + 32 + 2 // pl-3 + pr-8 + borders
		const w = ghostRef.current.offsetWidth + extra
		const clamped = Math.max(minPx, maxPx ? Math.min(w, maxPx) : w)
		setWidth(clamped)
	}

	useLayoutEffect(measure, [label, minPx, maxPx])
	useEffect(() => {
		const onResize = () => measure()
		window.addEventListener('resize', onResize)
		return () => window.removeEventListener('resize', onResize)
	}, [])

	return (
		<div className='relative'>
			<span
				ref={ghostRef}
				className='invisible absolute left-0 top-0 -z-10 whitespace-pre text-sm'
			>
				{label}
			</span>

			<select
				ref={selectRef}
				className={className}
				style={{ width }}
				value={value}
				onChange={e => onChange(e.target.value)}
			>
				{options.map(o => (
					<option key={o.value} value={o.value}>
						{o.label}
					</option>
				))}
			</select>
		</div>
	)
}

/** ====== фильтры ====== */
const MonitoringFilters = ({
	search,
	setSearch,
	idle,
	setIdle,
	todayOnly,
	setTodayOnly,
	statusFilter,
	setStatusFilter,
	planFilter,
	setPlanFilter,
	setAddUserOpen,
	setCourseFilter,
	courseFilter,
	courseItems,
}: IProps) => {
	const [open, setOpen] = useState(false)
	const [searchText, setSearchText] = useState(search)

	useEffect(() => setSearchText(search), [search])

	const debouncedSearchText = useDebounce(searchText, 500)
	useEffect(() => {
		const trimmed = debouncedSearchText.trim()
		if (trimmed !== search) setSearch(trimmed)
	}, [debouncedSearchText, search, setSearch])

	const inputCls =
		'h-9 rounded-xl border border-border bg-card px-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue'
	const selectCls =
		'h-9 rounded-xl border border-border bg-card pl-3 pr-8 text-sm text-gray-900 leading-none'
	const checkboxLbl = 'flex items-center gap-2 text-sm text-gray-900'

	// единый стиль для primary-кнопки
	const primaryBtn =
		'inline-flex items-center gap-2 shrink-0 rounded-2xl bg-blue px-4 py-2 text-sm font-medium text-gray-900 cursor-pointer shadow-sm ring-1 ring-blue/30 hover:brightness-95 hover:shadow md:hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue/60 active:translate-y-[1px] transition'

	const planOpts: Opt[] = useMemo(
		() => [
			{ value: 'all', label: 'Все планы' },
			{ value: 'fullPeriod', label: 'Полный' },
			{ value: 'trialPeriod', label: 'Пробный' },
		],
		[]
	)
	const statusOpts: Opt[] = useMemo(
		() => [
			{ value: 'all', label: 'Все статусы' },
			{ value: 'active', label: 'Активные' },
			{ value: 'stop', label: 'Сервис остановлен' },
		],
		[]
	)
	const courseOpts: Opt[] = useMemo(
		() => [{ value: 'all', label: 'Все курсы' }, ...(courseItems ?? [])],
		[courseItems]
	)

	return (
		<div className='mb-4 w-full'>
			{/* Desktop */}
			<div className='hidden md:block'>
				<div className='flex flex-wrap items-center gap-2'>
					<input
						className={`${inputCls} w-56 md:w-64`}
						placeholder='Поиск по телефону'
						value={searchText}
						onChange={e => setSearchText(e.target.value)}
					/>

					<AutoWidthSelect
						value={planFilter}
						onChange={setPlanFilter}
						options={planOpts}
						className={`${selectCls}`}
						minPx={110}
					/>

					<AutoWidthSelect
						value={statusFilter}
						onChange={setStatusFilter}
						options={statusOpts}
						className={`${selectCls}`}
						minPx={125}
					/>

					<AutoWidthSelect
						value={courseFilter}
						onChange={setCourseFilter}
						options={courseOpts}
						className={`${selectCls}`}
						minPx={150}
						maxPx={360}
					/>

					<label className={checkboxLbl}>
						<input
							type='checkbox'
							checked={todayOnly}
							onChange={e => setTodayOnly(e.target.checked)}
						/>
						Работали сегодня
					</label>

					<label className={checkboxLbl}>
						<input
							type='checkbox'
							checked={idle}
							onChange={e => setIdle(e.target.checked)}
						/>
						Неактивные &gt; 5 дн.
					</label>

					<button
						type='button'
						onClick={() => setAddUserOpen(true)}
						className={`ml-auto ${primaryBtn}`}
					>
						<span className='text-base leading-none'>＋</span>
						Студент
					</button>
				</div>
			</div>

			{/* Mobile */}
			<div className='md:hidden'>
				<button
					onClick={() => setOpen(o => !o)}
					className='w-full rounded-xl border border-border bg-card px-3 py-2 text-left text-sm font-medium text-gray-900'
				>
					Фильтры {open ? '▲' : '▼'}
				</button>

				{open && (
					<div className='mt-2 rounded-2xl border border-border bg-card p-3'>
						<div className='flex flex-col gap-2'>
							<input
								className={inputCls}
								placeholder='Поиск по телефону'
								value={searchText}
								onChange={e => setSearchText(e.target.value)}
							/>

							<AutoWidthSelect
								value={planFilter}
								onChange={setPlanFilter}
								options={planOpts}
								className={`${selectCls} w-auto`}
								minPx={110}
							/>
							<AutoWidthSelect
								value={statusFilter}
								onChange={setStatusFilter}
								options={statusOpts}
								className={`${selectCls} w-auto`}
								minPx={125}
							/>
							<AutoWidthSelect
								value={courseFilter}
								onChange={setCourseFilter}
								options={courseOpts}
								className={`${selectCls} w-auto`}
								minPx={150}
								maxPx={360}
							/>

							<label className={checkboxLbl}>
								<input
									type='checkbox'
									checked={todayOnly}
									onChange={e => setTodayOnly(e.target.checked)}
								/>
								Работали сегодня
							</label>

							<label className={checkboxLbl}>
								<input
									type='checkbox'
									checked={idle}
									onChange={e => setIdle(e.target.checked)}
								/>
								Неактивные &gt; 5 дн.
							</label>

							<button
								type='button'
								onClick={() => setAddUserOpen(true)}
								className={primaryBtn}
							>
								<span className='text-base leading-none'>＋</span>
								Студент
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default MonitoringFilters
