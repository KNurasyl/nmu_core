import { Card, Progress, Typography } from 'antd'
import Image from 'next/image'

const { Paragraph } = Typography

const { Meta } = Card

interface IProps {
	lessonName: string
	thumbnail: string
	description?: string | null
	progress: number
	onClick: VoidFunction
}

const LessonCard = ({
	lessonName,
	thumbnail,
	description,
	progress,
	onClick
}: IProps) => {
	return (
		<Card
			hoverable
			className='lesson_card'
			onClick={onClick}
			cover={
				<div className='lesson_card__image-wrapper'>
					<Image
						src={thumbnail}
						alt={lessonName}
						fill
						style={{ objectFit: 'cover' }}
						priority
					/>
				</div>
			}
		>
			<Meta
				title={
					<Typography className='lesson_card__title'>{lessonName}</Typography>
				}
				description={
					<Paragraph
						className='lesson_card__description'
						ellipsis={{ rows: 2 }}
					>
						{description || 'Описание отсутствует'}
					</Paragraph>
				}
			/>

			<Progress
				percent={progress}
				size='small'
				strokeColor='#1890ff'
				className='lesson_card__progress'
			/>
		</Card>
	)
}

export default LessonCard
