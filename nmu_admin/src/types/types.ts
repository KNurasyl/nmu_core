import { GetMonitoringQuery } from '@/graphql/generated/graphql'

export type MonitoringItem = NonNullable<
	GetMonitoringQuery['getMonitoring']['items']
>[number]

export type MonitoringTableHandlers = {
	onOpenCourse: (userId: string) => void
	onToggleSupport: (userId: string, enabled: boolean) => void
	onFreeze: (userId: string, startISO: string, endISO: string) => void
	onUnfreeze: (userId: string) => void
	onDelete: (userId: string, userName?: string) => void // ⬅️ новое
}
