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
	completed: boolean
}

const LessonCard = ({
	lessonName,
	thumbnail,
	description,
	progress,
	onClick,
	completed,
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
					{completed && (
						<div className='lesson_card__completed-icon'>
							<svg width='36' height='36' viewBox='0 0 24 24' fill='none'>
								<circle
									cx='12'
									cy='12'
									r='12'
									fill='#52C41A'
									fillOpacity='0.6'
								/>
								<path
									d='M7 13l3 3 7-7'
									stroke='#fff'
									strokeWidth='2.2'
									strokeLinecap='round'
								/>
							</svg>
						</div>
					)}
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
