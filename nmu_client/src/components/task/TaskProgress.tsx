import { Progress, Row } from 'antd'

interface IProps {
	percent: number
}

const TaskProgress = ({ percent }: IProps) => {
	return (
		<Row className='task_progress'>
			<Progress percent={percent} showInfo={false} strokeColor='#444CE7' />
		</Row>
	)
}

export default TaskProgress
