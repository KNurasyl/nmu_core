import { Row, Typography } from 'antd'

interface IProps {
	arabicLetter: string
}

const TaskAnswer = ({ arabicLetter }: IProps) => {
	return (
		<Row className='task_f__answer'>
			<Row className='letter_block'>
				<Typography className='letter'>{arabicLetter}</Typography>
			</Row>
		</Row>
	)
}

export default TaskAnswer
