import { Row, Typography } from 'antd'

interface IProps {
	arabicLetter: string
}

const TaskAnswer = ({ arabicLetter }: IProps) => {
	const isLong = arabicLetter?.length > 10

	return (
		<Row className='tajvid_a__answer'>
			<Row className='letter_block'>
				<Typography className={`letter ${isLong ? 'longLetter' : ''}`}>
					{arabicLetter}
				</Typography>
			</Row>
		</Row>
	)
}

export default TaskAnswer
