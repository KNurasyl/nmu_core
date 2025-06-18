import { CloseOutlined } from '@ant-design/icons'
import { Button, Progress, Row } from 'antd'

interface IProps {
	percent: number
	onClose: VoidFunction
}

const TaskProgress = ({ percent, onClose }: IProps) => {
	return (
		<Row className='task_progress'>
			<Progress percent={percent} showInfo={false} strokeColor='#572e12' />
			<Button
				icon={<CloseOutlined color='#572e12' />}
				className='close_btn'
				onClick={onClose}
			/>
		</Row>
	)
}

export default TaskProgress
