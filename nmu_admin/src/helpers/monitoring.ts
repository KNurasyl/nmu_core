import {
	DEFAULT_FILTERS,
	FiltersState,
	PlanFilter,
	STORAGE_KEY,
} from '@/types/monitoring'

export function loadFilters(): FiltersState {
	try {
		const raw = localStorage.getItem(STORAGE_KEY)
		if (!raw) return DEFAULT_FILTERS
		const parsed = JSON.parse(raw) as Partial<FiltersState>
		return { ...DEFAULT_FILTERS, ...parsed }
	} catch {
		return DEFAULT_FILTERS
	}
}

export function saveFilters(f: FiltersState) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(f))
	} catch {}
}

export function mapPlanToArg(plan: PlanFilter): 'trial' | 'full' | undefined {
	if (plan === 'trialPeriod') return 'trial'
	if (plan === 'fullPeriod') return 'full'
	return undefined
}
