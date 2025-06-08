/* eslint-disable @typescript-eslint/no-explicit-any */
import TaskA from './taskA/TaskA'
import TaskB from './TaskB'
import { TaskC } from './TaskC'
import TaskE from './TaskE'
import TaskF from './TaskF'
import TaskG from './TaskG'
import TaskQuran from './TaskQuran'
import TaskTajwid from './TaskTajwid'

interface TaskComponentProps<T = any> {
	data: T
	value: any
	onChange: (value: any) => void
}

export const taskRegistry: Record<string, React.FC<TaskComponentProps>> = {
	a: TaskA,
	b: TaskB,
	c: TaskC,
	e: TaskE,
	f: TaskF,
	g: TaskG,
	tajwid: TaskTajwid,
	quran: TaskQuran,
}
