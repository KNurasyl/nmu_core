import { Card, Progress } from 'antd'
import Image from 'next/image'
import cardBg from '../../assets/images/Course_bg_new.png'

interface CourseCardProps {
	title: string
	description?: string | null
	progress: number
	image?: string
	onClick: VoidFunction
}

const CourseCard = ({
	title,
	description,
	progress,
	image,
	onClick
}: CourseCardProps) => (
	<Card className='course_card' onClick={onClick}>
		<div className='course_card__bg'>
			<Image
				src={image || cardBg}
				alt={title}
				fill
				style={{ objectFit: 'cover' }}
				priority
			/>
			<div className='course_card__overlay' />
			<div className='course_card__content'>
				<div className='course_card__title'>{title}</div>
				<div className='course_card__desc'>{description}</div>
				<div className='course_card__progress_wrap'>
					<Progress
						percent={progress}
						showInfo={false}
						strokeColor='#2d3eea'
						trailColor='#5556'
						size='small'
					/>
					<span className='course_card__percent'>{progress}%</span>
				</div>
			</div>
		</div>
	</Card>
)

export default CourseCard
