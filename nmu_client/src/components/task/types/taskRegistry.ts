import TaskQuranA from './quranA/QuranA'
import TaskQuranB from './quranB/QuranB'
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
	'quran-type-1': TaskQuranA,
	'quran-type-2': TaskQuranB,
}
