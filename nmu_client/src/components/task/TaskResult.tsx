import { Button, Progress, Row, Typography } from 'antd'

interface IProps {
	show: boolean
	bravoTxt: string
	score: number
	correctAttempt: number
	correctAttemptTxt: string
	inCorrectAttempt: number
	inCorrectAttemptTxt: string
	totalAttempt: number
	totalAttemptTxt: string
	finishBtnTxt: string
	timeTxt: string
	timeout: string
	onClick: VoidFunction
}

const TaskResult = ({
	show,
	bravoTxt,
	score,
	correctAttempt,
	correctAttemptTxt,
	inCorrectAttempt,
	inCorrectAttemptTxt,
	timeTxt,
	timeout,
	totalAttempt,
	totalAttemptTxt,
	finishBtnTxt,
	onClick,
}: IProps) => {
	return show ? (
		<Row className='task_result'>
			<Row className='bravo_block'>
				<Row className='text_block'>
					<Typography>{bravoTxt}</Typography>
					<Typography>
						{totalAttempt} {totalAttemptTxt}
					</Typography>
					<Typography>
						{correctAttempt} {correctAttemptTxt}
					</Typography>
					<Typography>
						{inCorrectAttempt} {inCorrectAttemptTxt}
					</Typography>
				</Row>

				<Progress
					type='circle'
					percent={score}
					size={100}
					strokeColor='#19c37d'
					trailColor='#eee'
					className='lesson_promo__progress-circle'
					format={percent => `${percent}%`}
				/>
			</Row>

      <Row className='timeout_block'>
        <Typography>{timeTxt}</Typography>
        <Typography>{timeout}</Typography>
      </Row>

      <Button onClick={onClick}>{finishBtnTxt}</Button>
		</Row>
	) : null
}

export default TaskResult
