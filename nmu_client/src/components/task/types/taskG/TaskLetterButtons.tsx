import AudioPlayer from '@/components/player/AudioPlayer'
import { Col, Row, Typography } from 'antd'
import { Volume2 } from 'lucide-react'
import { Dispatch, RefObject, SetStateAction } from 'react'

interface IProps {
	variants: string[]
	setSelected: Dispatch<SetStateAction<string[]>>
	selected: string[]
	isPlaying: boolean
	audioRef: RefObject<HTMLAudioElement | null>
	handlePlay: VoidFunction
	handleEnd: VoidFunction
	audioSrc: string
}

const TaskLetterButtons = ({
	variants,
	setSelected,
	selected,
	isPlaying,
	audioRef,
	handlePlay,
	handleEnd,
	audioSrc,
}: IProps) => {
	return (
		<Row
			gutter={[16, 16]}
			className='task-letter-buttons'
			justify='center'
			align='middle'
			style={{ maxWidth: 400, margin: '0 auto' }}
		>
			{variants?.map(v => (
				<Col
					key={v}
					xs={8}
					sm={8}
					md={8}
					lg={8}
					xl={8}
					style={{ display: 'flex', justifyContent: 'center' }}
				>
					<Typography.Text
						className='letter-btn'
						onClick={() =>
							selected.length < 9 &&
							setSelected(prev => (prev.length < 9 ? [...prev, v] : prev))
						}
						style={{
							pointerEvents: selected.length >= 9 ? 'none' : 'auto',
							opacity: selected.length >= 9 ? 0.5 : 1,
							transition: 'opacity 0.2s',
						}}
					>
						{v}
					</Typography.Text>
				</Col>
			))}

			<Row className='audio_blog'>
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
		</Row>
	)
}

export default TaskLetterButtons
