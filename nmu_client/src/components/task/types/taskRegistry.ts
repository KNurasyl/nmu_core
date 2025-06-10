import TaskA from './taskA/TaskA'
import TaskB from './taskB/TaskB'
import TaskC from './taskC/TaskC'
import TaskE from './TaskE'
import TaskF from './TaskF'
import TaskG from './TaskG'
import TaskQuran from './TaskQuran'
import TaskTajwid from './TaskTajwid'

interface IProps {
	onFinished: VoidFunction
}

export const taskRegistry: Record<string, React.FC<IProps>> = {
	a: TaskA,
	b: TaskB,
	c: TaskC,
	e: TaskE,
	f: TaskF,
	g: TaskG,
	tajwid: TaskTajwid,
	quran: TaskQuran,
}
