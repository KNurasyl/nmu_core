import { insertAt } from '@/lib/utils/insertAt'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface TaskState {
  allTasks: any[]
  currentTask: any
  currentLessonId: any
  currentCourseId: any
  progress: number
  correctCount: number
  wrongCount: number
  score: number
  status: 'inProgress' | 'success' | 'error' | 'finished'
  setAllTasks: (tasks: any[]) => void
  setCurrentTask: (task: any) => void
  setStatus: (status: TaskState['status']) => void
  nextTask: () => void
  addErrorTask: (task: any) => void
  markCorrect: () => void
  markWrong: () => void
  setCurrenLessontId: (lessonId?: string) => void
  setCurrenCourseId: (courseId?: string) => void
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
      score: 0,
      status: 'inProgress',
      setAllTasks: tasks =>
        set({
          allTasks: tasks,
          progress: 0,
          currentTask: (tasks as any[])[0] || null,
          correctCount: 0,
          wrongCount: 0,
          score: 0,
          status: 'inProgress',
        }),
      setCurrentTask: task => set({ currentTask: task }),
      setCurrenLessontId: lessonId => set({ currentLessonId: lessonId }),
      setCurrenCourseId: courseId => set({ currentCourseId: courseId }),
      setStatus: status => set({ status }),
      nextTask: () =>
        set(state => {
          const [, ...rest] = state.allTasks
          const total = state.correctCount + state.wrongCount
          const progress =
            total === 0
              ? 0
              : Math.round((total / (total + rest.length)) * 100)
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
    }),
    { name: 'TaskStore' }
  )
)
