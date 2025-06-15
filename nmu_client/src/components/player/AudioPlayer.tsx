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

		/**
		 * Запускает воспроизведение аудио.
		 * Перед этим гарантированно сбрасывает предыдущее проигрывание (pause + currentTime = 0),
		 * чтобы избежать проблем с повторным кликом или "залипшим" состоянием.
		 */
		const handleClick = () => {
			const audio = audioRef.current
			if (!audio) return

			// Сброс, если вдруг уже что-то играло
			audio.pause()
			audio.currentTime = 0

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
					onError={e => console.error('Audio file error:', e)}
					preload='auto' // это ускоряет первый запуск на Safari/iOS
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
