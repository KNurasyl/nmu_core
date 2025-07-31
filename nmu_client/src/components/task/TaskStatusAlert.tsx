import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Row, Typography } from 'antd'
import { RefObject } from 'react'
import AudioPlayer, { AudioPlayerHandle } from '../player/AudioPlayer'

interface IProps {
	status: 'success' | 'error' | 'inProgress' | 'finished'
	message: string
	btnText: string
	onClick: VoidFunction
	correctVariant?: {
		item: string
		correctAnswer?: string
		audioFileName?: string
	}
	isPlaying?: boolean
	audioRef?: RefObject<AudioPlayerHandle | null>
	handlePlay?: VoidFunction
	handleEnd?: VoidFunction
	lessonCode?: string
}

const TaskStatusAlert = ({
	status,
	message,
	btnText,
	onClick,
	correctVariant,
	isPlaying,
	audioRef,
	handlePlay,
	handleEnd,
	lessonCode,
}: IProps) => {
	return status !== 'inProgress' ? (
		<>
			<div className='backdrop'></div>
			<Row
				className={`task_a__status-alert ${status}`}
				justify='center'
				align='middle'
			>
				<div className='task_a__status-alert-content'>
					<Row align='middle' justify='start' style={{ width: '100%' }}>
						<div className='task_a__status-alert-icon'>
							{status === 'success' ? (
								<CheckCircleOutlined style={{ color: '#34C759' }} />
							) : (
								<CloseCircleOutlined style={{ color: '#ff3b30' }} />
							)}
						</div>
						<span className='task_a__status-alert-message'>{message}</span>
					</Row>

					{correctVariant && correctVariant?.audioFileName && (
						<Row className='correctVariant'>
							<AudioPlayer
								ref={audioRef}
								audioSrc={`${lessonCode}/${correctVariant?.audioFileName}`}
								onPlayCallback={handlePlay}
								onEndCallback={handleEnd}
							>
								<Typography
									className={`correctVariant__letter arab_letter ${
										isPlaying ? 'playing' : ''
									}`}
								>
									{correctVariant?.correctAnswer || correctVariant?.item}
								</Typography>
							</AudioPlayer>
						</Row>
					)}

					<button className='task_a__status-alert-next' onClick={onClick}>
						{btnText}
					</button>
				</div>
			</Row>
		</>
	) : null
}

export default TaskStatusAlert
