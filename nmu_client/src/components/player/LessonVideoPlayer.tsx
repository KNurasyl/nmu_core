interface IProps {
	lesson?: {
		lessonName?: string | null
		videoUrl?: string | null
	}
}

const LessonVideoPlayer = ({ lesson }: IProps) => {
	if (!lesson?.videoUrl) return null

	return (
		<div className='lesson_video_wrapper'>
			<iframe
				title={lesson.lessonName || 'Урок'}
				src={lesson.videoUrl}
				allow='autoplay; fullscreen; picture-in-picture; clipboard-write'
				allowFullScreen
				style={{
					border: 'none',
					borderRadius: '15px',
					width: '100%',
					height: '100%',
				}}
			></iframe>
		</div>
	)
}

export default LessonVideoPlayer
