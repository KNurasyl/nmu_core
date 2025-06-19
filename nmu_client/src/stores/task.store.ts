import { insertAt } from '@/lib/utils/insertAt'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type TaskType = string // например, 'A' | 'B' | 'C'

interface TaskHistoryEntry {
	taskType: TaskType
	correct: unknown[]
	inCorrect: unknown[]
}

interface TaskState {
	allTasks: unknown[]
	currentTask: unknown
	currentLessonId: string | null
	currentCourseId: string | null
	progress: number
	correctCount: number
	wrongCount: number
	score: number
	startTime: number | null
	elapsedTime: string
	status: 'inProgress' | 'success' | 'error' | 'finished'
	trialPeriod: boolean | null
	// ВНИМАНИЕ: ОДИН объект, а не массив!
	taskHistory: TaskHistoryEntry

	// Actions
	setAllTasks: (tasks: unknown[]) => void
	setCurrentTask: (task: unknown) => void
	setStatus: (status: TaskState['status']) => void
	nextTask: () => void
	addErrorTask: (task: unknown) => void
	setCurrentLessonId: (lessonId?: string) => void
	setCurrentCourseId: (courseId?: string) => void
	setTrialPeriod: (trialPeriod: boolean | null) => void
	setTaskType: (type: TaskType) => void
	addCorrect: (task: unknown) => void
	addInCorrect: (task: unknown) => void
	resetHistory: () => void
	markCorrect: (task: unknown) => void
	markWrong: (task: unknown) => void
	reset: () => void
}

export const useTaskStore = create<TaskState>()(
	devtools(
		(set, get) => ({
			// --- STATE ---
			allTasks: [],
			currentTask: null,
			currentLessonId: null,
			currentCourseId: null,
			progress: 0,
			correctCount: 0,
			wrongCount: 0,
			score: 0,
			startTime: null,
			elapsedTime: '00:00',
			status: 'inProgress',
			trialPeriod: null,
			// Один объект, а не массив!
			taskHistory: {
				taskType: '',
				correct: [],
				inCorrect: [],
			},

			// --- ACTIONS ---
			setAllTasks: tasks =>
				set({
					allTasks: tasks,
					progress: 0,
					currentTask: tasks[0] || null,
					correctCount: 0,
					wrongCount: 0,
					score: 0,
					status: 'inProgress',
					startTime: Date.now(),
					elapsedTime: '00:00',
				}),

			setCurrentTask: task => set({ currentTask: task }),

			setStatus: status => set({ status }),

			setTrialPeriod: trialPeriod => set({ trialPeriod }),

			setCurrentLessonId: lessonId => set({ currentLessonId: lessonId }),

			setCurrentCourseId: courseId => set({ currentCourseId: courseId }),

			setTaskType: type =>
				set(state => ({
					taskHistory: {
						...state.taskHistory,
						taskType: type,
					},
				})),

			addCorrect: task =>
				set(state => ({
					taskHistory: {
						...state.taskHistory,
						correct: [...state.taskHistory.correct, task],
					},
				})),

			addInCorrect: task =>
				set(state => ({
					taskHistory: {
						...state.taskHistory,
						inCorrect: [...state.taskHistory.inCorrect, task],
					},
				})),

			resetHistory: () =>
				set({
					taskHistory: {
						taskType: '',
						correct: [],
						inCorrect: [],
					},
				}),

			markCorrect: task => {
				set(state => {
					const correctCount = state.correctCount + 1
					const total = correctCount + state.wrongCount
					const score =
						total === 0 ? 0 : Math.round((correctCount / total) * 100)
					get().addCorrect(task)
					return { correctCount, score }
				})
			},

			markWrong: task => {
				set(state => {
					const wrongCount = state.wrongCount + 1
					const total = state.correctCount + wrongCount
					const score =
						total === 0 ? 0 : Math.round((state.correctCount / total) * 100)
					get().addInCorrect(task)
					return { wrongCount, score }
				})
			},

			nextTask: () => {
				set(state => {
					const [, ...rest] = state.allTasks
					const total = state.correctCount + state.wrongCount
					const progress =
						total === 0 ? 0 : Math.round((total / (total + rest.length)) * 100)
					const isFinished = rest.length === 0

					let elapsedTime = state.elapsedTime

					if (isFinished && state.startTime) {
						const now = Date.now()
						const diff = now - state.startTime
						const minutes = Math.floor(diff / 60000)
						const seconds = Math.floor((diff % 60000) / 1000)
						elapsedTime = `${minutes.toString().padStart(2, '0')}:${seconds
							.toString()
							.padStart(2, '0')}`
					}

					return {
						allTasks: rest,
						currentTask: rest[0] || null,
						progress,
						status: isFinished ? 'finished' : 'inProgress',
						elapsedTime: isFinished ? elapsedTime : state.elapsedTime,
					}
				})
			},

			addErrorTask: task =>
				set(state => ({
					allTasks: insertAt(state.allTasks, task, 2),
				})),

			reset: () =>
				set({
					allTasks: [],
					currentTask: null,
					progress: 0,
					correctCount: 0,
					wrongCount: 0,
					score: 0,
					status: 'inProgress',
					startTime: null,
					elapsedTime: '00:00',
					trialPeriod: null,
					taskHistory: {
						taskType: '',
						correct: [],
						inCorrect: [],
					},
				}),
		}),
		{ name: 'TaskStore' }
	)
)
