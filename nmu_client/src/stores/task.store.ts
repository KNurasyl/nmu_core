import { insertAt } from '@/lib/utils/insertAt'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface TaskState {
	allTasks: unknown[]
	trialPeriod: boolean | null
	currentTask: unknown
	currentLessonId: string | null
	currentCourseId: string | null
	progress: number
	correctCount: number
	wrongCount: number
	score: number
	status: 'inProgress' | 'success' | 'error' | 'finished'
	setAllTasks: (tasks: unknown[]) => void
	setCurrentTask: (task: unknown) => void
	setStatus: (status: TaskState['status']) => void
	nextTask: () => void
	addErrorTask: (task: unknown) => void
	markCorrect: () => void
	markWrong: () => void
	setCurrenLessontId: (lessonId?: string) => void
	setCurrenCourseId: (courseId?: string) => void
	setTrialPeriod: (trialPeriod: boolean | null) => void
	reset: () => void
}

export const useTaskStore = create<TaskState>()(
	devtools(
		set => ({
			allTasks: [],
			currentTask: null,
			currentLessonId: null,
			currentCourseId: null,
			progress: 0,
			correctCount: 0,
			wrongCount: 0,
			trialPeriod: null,
			score: 0,
			status: 'inProgress',
			setAllTasks: tasks =>
				set({
					allTasks: tasks,
					progress: 0,
					currentTask: (tasks as unknown[])[0] || null,
					correctCount: 0,
					wrongCount: 0,
					score: 0,
					status: 'inProgress',
				}),
			setCurrentTask: task => set({ currentTask: task }),
			setTrialPeriod: trialPeriod => set({ trialPeriod }),
			setCurrenLessontId: lessonId => set({ currentLessonId: lessonId }),
			setCurrenCourseId: courseId => set({ currentCourseId: courseId }),
			setStatus: status => set({ status }),
			nextTask: () =>
				set(state => {
					const [, ...rest] = state.allTasks
					const total = state.correctCount + state.wrongCount
					const progress =
						total === 0 ? 0 : Math.round((total / (total + rest.length)) * 100)
					const isFinished = rest.length === 0
					return {
						allTasks: rest,
						currentTask: rest[0] || null,
						progress,
						status: isFinished ? 'finished' : 'inProgress',
					}
				}),
			addErrorTask: task =>
				set(state => ({
					allTasks: insertAt(state.allTasks, task, 2),
				})),
			markCorrect: () =>
				set(state => {
					const correctCount = state.correctCount + 1
					const total = correctCount + state.wrongCount
					const score =
						total === 0 ? 0 : Math.round((correctCount / total) * 100)
					return { correctCount, score }
				}),
			markWrong: () =>
				set(state => {
					const wrongCount = state.wrongCount + 1
					const total = state.correctCount + wrongCount
					const score =
						total === 0 ? 0 : Math.round((state.correctCount / total) * 100)
					return { wrongCount, score }
				}),
			reset: () =>
				set({
					allTasks: [],
					currentTask: null,
					currentLessonId: null,
					currentCourseId: null,
					progress: 0,
					correctCount: 0,
					wrongCount: 0,
					trialPeriod: null,
					score: 0,
					status: 'inProgress',
				}),
		}),
		{ name: 'TaskStore' }
	)
)
