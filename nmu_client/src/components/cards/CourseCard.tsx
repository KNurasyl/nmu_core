import { FlagOutlined, LockOutlined } from '@ant-design/icons'
import { Card, Progress, Tag } from 'antd'
import Image from 'next/image'
import cardBg from '../../assets/images/Course_bg_new.png'

interface CourseCardProps {
	title: string
	description?: string | null
	progress: number
	image?: string
	onClick: VoidFunction
	active: boolean
	lockText: string
	trialPeriod: boolean
	trialPeriodText: string
}

const CourseCard = ({
	title,
	description,
	progress,
	image,
	onClick,
	active,
	lockText,
	trialPeriod,
	trialPeriodText,
}: CourseCardProps) => (
	<Card
		className={`course_card${!active ? ' course_card--inactive' : ''}`}
		onClick={active ? onClick : undefined}
		hoverable={active}
		style={{
			cursor: active ? 'pointer' : 'not-allowed',
			opacity: active ? 1 : 0.6,
		}}
	>
		<div className='course_card__bg' style={{ position: 'relative' }}>
			<Image
				src={image || cardBg}
				alt={title}
				fill
				style={{ objectFit: 'cover' }}
				priority
			/>

			{trialPeriod && (
				<div className='course_card__trial_flag'>
					<Tag color='blue' icon={<FlagOutlined />}>
						{trialPeriodText}
					</Tag>
				</div>
			)}

			{!active && (
				<>
					<div className='course_card__lock_overlay' />
					<div className='course_card__lock_icon'>
						<LockOutlined style={{ fontSize: 36, color: '#fff' }} />
						<div style={{ color: '#fff', marginTop: 8 }}>{lockText}</div>
					</div>
				</>
			)}

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
