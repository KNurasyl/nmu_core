import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Row } from 'antd'

interface IProps {
	status: 'success' | 'error' | 'inProgress' | 'finished'
	message: string
	btnText: string
	onClick: VoidFunction
}

const TaskStatusAlert = ({ status, message, btnText, onClick }: IProps) => {
	return status !== 'inProgress' ? (
		<>
			<div className='backdrop' />
			<Row
				className={`task_a__status-alert ${status}`}
				justify='center'
				align='middle'
			>
				<div className='task_a__status-alert-content'>
					<Row align='middle' justify='start' style={{ width: '100%' }}>
						<div className='task_a__status-alert-icon'>
							{status === 'success' ? (
								<CheckCircleOutlined style={{ color: '#34C759' }} />
							) : (
								<CloseCircleOutlined style={{ color: '#ff3b30' }} />
							)}
						</div>
						<span className='task_a__status-alert-message'>{message}</span>
					</Row>
					<button className='task_a__status-alert-next' onClick={onClick}>
						{btnText}
					</button>
				</div>
			</Row>
		</>
	) : null
}

export default TaskStatusAlert
