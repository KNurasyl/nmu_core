import { taskRegistry } from './types/taskRegistry'

interface IProps {
	type?: string
	onFinished: VoidFunction
}

const TaskRenderer = ({ type, onFinished }: IProps) => {
	const Component = taskRegistry[type || '']

	if (!Component) return <div>Неизвестный тип задачи: {type}</div>

	return <Component onFinished={onFinished}/>
}

export default TaskRenderer
