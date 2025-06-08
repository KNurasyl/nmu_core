import { taskRegistry } from './types/taskRegistry'

interface IProps {
	type: string
	data: unknown
	value: unknown
	onChange: (value: unknown) => void
}

const TaskRenderer = ({ type, data, value, onChange }: IProps) => {
	const Component = taskRegistry[type]

	if (!Component) return <div>Неизвестный тип задачи: {type}</div>

	return <Component data={data} value={value} onChange={onChange} />
}

export default TaskRenderer
