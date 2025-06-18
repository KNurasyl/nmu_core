import { Card, Progress, Typography } from 'antd'
import Image from 'next/image'
import lesson_icon from '../../assets/images/lesson_card_icon.png'

const { Paragraph } = Typography
const { Meta } = Card

interface IProps {
	lessonName: string
	description?: string | null
	progress: number
	onClick: VoidFunction
}

const LessonCard = ({ lessonName, description, progress, onClick }: IProps) => {
	return (
		<Card
			hoverable
			className='lesson_card'
			onClick={onClick}
			cover={
				<div className='lesson_card__image-wrapper'>
					<Image
						src={lesson_icon}
						alt={'logo'}
						height={200}
						width={160}
						style={{ cursor: 'pointer' }}
					/>
				</div>
			}
		>
			<Meta
				title={
					<Typography className='lesson_card__title'>{lessonName}</Typography>
				}
				description={
					<Paragraph className='lesson_card__description'>
						{description || 'Описание отсутствует'}
					</Paragraph>
				}
			/>

			<Progress
				percent={progress}
				size='small'
				strokeColor='#4a7a48'
				className='lesson_card__progress'
			/>
		</Card>
	)
}

export default LessonCard
