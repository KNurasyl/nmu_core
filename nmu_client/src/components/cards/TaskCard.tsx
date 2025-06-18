import { Card, Typography } from 'antd'

const { Title, Paragraph } = Typography

interface IProps {
	title?: string
	description?: string
	completed?: boolean
	noDescText?: string
	score: number | null
	onClick: VoidFunction
}

const TaskCard = ({
	title,
	description,
	completed,
	noDescText,
	score,
	onClick,
}: IProps) => {
	return (
		<Card
			hoverable
			onClick={onClick}
			className={`task_card ${completed ? 'task_card--completed' : ''}`}
		>
			<div className='task_card__icon'></div>

			<div className='task_card__text'>
				<Title level={5} className='task_card__title'>
					{title}
					{completed && (
						<div className='task_card__score-circle'>
							<span>{score ?? 0}</span>
						</div>
					)}
				</Title>

				<Paragraph className='task_card__description'>
					{description || noDescText}
				</Paragraph>
			</div>
		</Card>
	)
}

export default TaskCard
