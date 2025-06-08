import { Row } from 'antd'

interface IProps {
	onClick: VoidFunction
	btnText: string
}

const TaskCheck = ({ onClick, btnText }: IProps) => {
	return (
		<Row className='task_a__check' justify='center'>
			<button className='task_a__check-btn' onClick={onClick}>
				{btnText}
			</button>
		</Row>
	)
}

export default TaskCheck
