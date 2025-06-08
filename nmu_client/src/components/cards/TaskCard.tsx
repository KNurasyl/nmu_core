import { CheckCircleTwoTone } from '@ant-design/icons'
import { Card, Tag, Typography } from 'antd'

const { Title, Paragraph } = Typography

interface IProps {
	title?: string
	description?: string
	completed?: boolean
	completedText?: string
	inProgressText?: string
	noDescText?: string
  onClick: VoidFunction
}

const TaskCard = ({
	title,
	description,
	completed,
	completedText,
	inProgressText,
	noDescText,
  onClick
}: IProps) => {
	return (
		<Card
			hoverable
      onClick={onClick}
			className={`task_card ${completed ? 'task_card--completed' : ''}`}
		>
			<div className='task_card__header'>
				<Title level={5} className='task_card__title'>
					{title}
				</Title>
				{completed && <CheckCircleTwoTone twoToneColor='#52c41a' />}
			</div>

			<Paragraph className='task_card__description'>
				{description || noDescText}
			</Paragraph>

			<Tag color={completed ? 'green' : 'blue'}>
				{completed ? completedText : inProgressText}
			</Tag>
		</Card>
	)
}

export default TaskCard
