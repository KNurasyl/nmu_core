import { Progress } from 'antd'
import Image from 'next/image'
import cardBg from '../../assets/images/Course_bg_new.png'

interface IProps {
	courseName?: string
	description?: string | null
	progress: number
}

const LessonPromo = ({ courseName, description, progress }: IProps) => {
	return (
		<section className='lesson_promo'>
			<Image
				src={cardBg}
				alt={'course_promo'}
				fill
				style={{ objectFit: 'cover' }}
				priority
			/>
			<div className='lesson_promo__overlay' />
			<div className='lesson_promo__content'>
				<div className='lesson_promo__top'>
					<h1 className='lesson_promo__title'>{courseName}</h1>
					<Progress
						type='circle'
						percent={progress}
						size={54}
						strokeColor='#19c37d'
						trailColor='#eee'
						className='lesson_promo__progress-circle'
						format={percent => `${percent}%`}
					/>
				</div>
				<div className='lesson_promo__desc'>{description}</div>
				<Progress
					percent={progress}
					showInfo={false}
					strokeColor='#19c37d'
					trailColor='#fff2'
					className='lesson_promo__progress-bar'
				/>
			</div>
		</section>
	)
}

export default LessonPromo
