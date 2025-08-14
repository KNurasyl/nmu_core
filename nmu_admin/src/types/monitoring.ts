import { GetMonitoringQuery } from '@/graphql/generated/graphql'

export const PAGE_SIZE = 10
export const STORAGE_KEY = 'monitoringFilters:v1'

export type MonitoringItem = NonNullable<
	GetMonitoringQuery['getMonitoring']
>['items'][number]

export type StatusFilter = 'all' | 'active' | 'stop'
export type PlanFilter = 'all' | 'trialPeriod' | 'fullPeriod'
export type CourseFilter = 'all' | string

export type FiltersState = {
	search: string
	idle: boolean
	todayOnly: boolean
	statusFilter: StatusFilter
	planFilter: PlanFilter
	courseFilter: CourseFilter
}

export const DEFAULT_FILTERS: FiltersState = {
	search: '',
	idle: false,
	todayOnly: false,
	statusFilter: 'all',
	planFilter: 'all',
	courseFilter: 'all',
}
