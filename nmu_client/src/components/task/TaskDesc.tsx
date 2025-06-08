'use client'

import { Row, Typography } from 'antd'

interface IProps {
	description: string
}

const TaskDesc = ({ description }: IProps) => {
	return (
		<Row className='task_desc'>
			<Typography className='task_desc__title'>{description}</Typography>
		</Row>
	)
}

export default TaskDesc
