import { CloseOutlined } from '@ant-design/icons'
import { Button, Progress, Row } from 'antd'

interface IProps {
	percent: number
	onClose: VoidFunction
}

const TaskProgress = ({ percent, onClose }: IProps) => {
	return (
		<Row className='task_progress'>
			<Progress percent={percent} showInfo={false} strokeColor='#444CE7' />
			<Button icon={<CloseOutlined />} className='close_btn' onClick={onClose}/>
		</Row>
	)
}

export default TaskProgress
