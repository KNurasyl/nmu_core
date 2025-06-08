'use client'

import { ReactNode, forwardRef, useImperativeHandle, useRef } from 'react'

interface IProps {
	audioSrc: string
	onPlayCallback?: () => void
	onEndCallback?: () => void
	children: ReactNode
}

const AudioPlayer = forwardRef<HTMLAudioElement, IProps>(
	({ audioSrc, onPlayCallback, onEndCallback, children }, ref) => {
		const audioRef = useRef<HTMLAudioElement>(null)

		useImperativeHandle(ref, () => audioRef.current as HTMLAudioElement)

		const handleClick = () => {
			if (!audioRef.current) return

			audioRef.current
				.play()
				.then(() => onPlayCallback?.())
				.catch(e => console.error('Audio play error:', e))
		}

		return (
			<>
				<audio
					ref={audioRef}
					src={`/audio/${audioSrc}`}
					style={{ display: 'none' }}
					onEnded={onEndCallback}
				/>
				<div onClick={handleClick} style={{ cursor: 'pointer' }}>
					{children}
				</div>
			</>
		)
	}
)

AudioPlayer.displayName = 'AudioPlayer'

export default AudioPlayer
