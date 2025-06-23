import TajvidA from './tajvidA/TajvidA'
import TajvidB from './tajvidB/TajvidB'
import TajvidC from './tajvidC/TajvidC'
import TajvidD from './tajvidD/TajvidD'
import TaskA from './taskA/TaskA'
import TaskB from './taskB/TaskB'
import TaskC from './taskC/TaskC'
import TaskE from './taskE/TaskE'
import TaskF from './taskF/TaskF'
import TaskG from './taskG/TaskG'
import TaskQuran from './TaskQuran'

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
	tajvidA: TajvidA,
	tajvidB: TajvidB,
	tajvidC: TajvidC,
	tajvidD: TajvidD,
	quran: TaskQuran,
}
