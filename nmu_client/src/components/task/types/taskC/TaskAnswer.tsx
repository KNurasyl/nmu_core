import AudioPlayer from '@/components/player/AudioPlayer'
import { Row } from 'antd'
import { Volume2 } from 'lucide-react'
import { RefObject } from 'react'

interface IProps {
	isPlaying: boolean
	audioRef: RefObject<HTMLAudioElement | null>
	handlePlay: VoidFunction
	handleEnd: VoidFunction
	audioSrc: string
}

const TaskAnswer = ({
	isPlaying,
	audioRef,
	handlePlay,
	handleEnd,
	audioSrc,
}: IProps) => {
	return (
		<Row className='task_a__answer'>
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
						<Volume2 className='volume_icon' color='#fff' />
					</div>
				</div>
			</AudioPlayer>
		</Row>
	)
}

export default TaskAnswer
