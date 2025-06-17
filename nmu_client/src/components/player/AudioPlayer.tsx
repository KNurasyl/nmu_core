'use client'

import {
	ReactNode,
	forwardRef,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'

interface IProps {
	audioSrc: string
	onPlayCallback?: () => void
	onEndCallback?: () => void
	children: ReactNode
}

const AudioPlayer = forwardRef<HTMLAudioElement, IProps>(
	({ audioSrc, onPlayCallback, onEndCallback, children }, ref) => {
		const audioRef = useRef<HTMLAudioElement>(null)
		const [canPlay, setCanPlay] = useState(false)
		const [loading, setLoading] = useState(true)

		useImperativeHandle(ref, () => audioRef.current as HTMLAudioElement)

		const handleClick = () => {
			const audio = audioRef.current
			if (!audio || !canPlay) return

			// Сброс, если вдруг уже что-то играло
			if (!audio.paused) {
				audio.pause()
				audio.currentTime = 0
			}

			audio
				.play()
				.then(() => {
					onPlayCallback?.()
				})
				.catch(e => {
					console.error('Audio play error:', e)
				})
		}

		return (
			<>
				<audio
					ref={audioRef}
					src={`/audio/${audioSrc}`}
					style={{ display: 'none' }}
					onEnded={onEndCallback}
					onError={e => {
						console.error('Audio file error:', e)
						setCanPlay(false)
						setLoading(false)
					}}
					preload='auto'
					onLoadedData={() => {
						setCanPlay(true)
						setLoading(false)
					}}
					onCanPlayThrough={() => {
						setCanPlay(true)
						setLoading(false)
					}}
					onLoadStart={() => setLoading(true)}
				/>
				<div
					onClick={canPlay ? handleClick : undefined}
					style={{
						cursor: canPlay ? 'pointer' : 'not-allowed',
						opacity: canPlay ? 1 : 0.6,
						position: 'relative',
					}}
				>
					{children}
					{loading && (
						<div
							style={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								zIndex: 2,
							}}
						>
							<svg width='50' height='50' viewBox='0 0 50 50'>
								<circle
									cx='25'
									cy='25'
									r='20'
									fill='none'
									stroke='#444ce7'
									strokeWidth='4'
									strokeDasharray='31.415, 31.415'
									transform='rotate(360 25 25)'
								>
									<animateTransform
										attributeName='transform'
										type='rotate'
										from='0 25 25'
										to='360 25 25'
										dur='1s'
										repeatCount='indefinite'
									/>
								</circle>
							</svg>
						</div>
					)}
				</div>
			</>
		)
	}
)

AudioPlayer.displayName = 'AudioPlayer'

export default AudioPlayer
