import AudioPlayer, { AudioPlayerHandle } from '@/components/player/AudioPlayer'
import { ITajvidB } from '@/types/tasks'
import { Row, Typography } from 'antd'
import { Volume2 } from 'lucide-react'
import { RefObject } from 'react'

interface IProps {
	isPlaying: boolean
	audioRef: RefObject<AudioPlayerHandle | null>
	handlePlay: VoidFunction
	handleEnd: VoidFunction
	audioSrc: string
	task: ITajvidB
}

const TaskAnswer = ({
	isPlaying,
	audioRef,
	handlePlay,
	handleEnd,
	audioSrc,
	task,
}: IProps) => {
	const isLong = task?.question?.item?.length > 10
	const isAudioType =
		task?.subType === 'tajvid-2l-1t' || task?.subType === 'tajvid-12l-1t'

	return (
		<Row className='tajvid_b__answer'>
			{isAudioType ? (
				<AudioPlayer
					ref={audioRef}
					audioSrc={audioSrc}
					onPlayCallback={handlePlay}
					onEndCallback={handleEnd}
				>
					<div className={`audio_container ${isPlaying ? 'playing' : ''}`}>
						<div className='wave wave1' />
						<div className='wave wave2' />
						<div className='wave wave3' />
						<div className='audio_button'>
							<Volume2 className='volume_icon' color='#5f3215' />
						</div>
					</div>
				</AudioPlayer>
			) : (
				<Row className='letter_block'>
					<Typography className={`letter ${isLong ? 'longLetter' : ''}`}>
						{task?.question?.item}
					</Typography>
				</Row>
			)}
		</Row>
	)
}

export default TaskAnswer
