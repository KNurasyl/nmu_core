'use client'

import { Howl } from 'howler'
import {
	ReactNode,
	forwardRef,
	useCallback,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'
import ReactHowler from 'react-howler'

/* ---------- public API компонента ---------- */
export interface AudioPlayerHandle {
	/** текущий Howl (может быть null до первой отрисовки) */
	howl: Howl | null
	/** программный запуск воспроизведения */
	play: () => void
	/** пауза, без сброса позиции */
	pause: () => void
	/** полная остановка и сброс таймлайна */
	stop: () => void
}

interface AudioPlayerProps {
	/** имя/путь файла внутри /public/audio  или абсолютный URL */
	audioSrc: string
	/** вызывается, когда звук реально начал играть */
	onPlayCallback?: () => void
	/** вызывается после полного окончания трека */
	onEndCallback?: () => void
	/** любой React-элемент — обычно иконка/текст кнопки */
	children: ReactNode
}
/* ------------------------------------------- */

const AudioPlayer = forwardRef<AudioPlayerHandle, AudioPlayerProps>(
	({ audioSrc, onPlayCallback, onEndCallback, children }, ref) => {
		/* Ссылка на ReactHowler-компонент,
       у него есть публичное свойство .howler (instance Howl)  */
		const reactHowlerRef = useRef<ReactHowler | null>(null)
		const [playing, setPlaying] = useState(false)

		/* ---------- imperativе API наружу ---------- */
		useImperativeHandle<AudioPlayerHandle, AudioPlayerHandle>(
			ref,
			() => ({
				howl: reactHowlerRef.current?.howler ?? null,
				play: () => {
					setPlaying(true)
				},
				pause: () => {
					setPlaying(false)
				},
				stop: () => {
					const howl = reactHowlerRef.current?.howler
					if (howl) {
						howl.seek(0)
						howl.pause()
						setPlaying(false)
					}
				},
			}),
			[]
		)
		/* ------------------------------------------ */

		/** внутренняя логика клика (начать заново с нуля) */
		const handleClick = useCallback(() => {
			const howl = reactHowlerRef.current?.howler
			if (!howl) return

			if (playing) {
				// уже играет → перезапуск
				howl.seek(0)
			} else {
				// старт с первого клика
				setPlaying(true)
			}
		}, [playing])

		return (
			<>
				<div style={{ display: 'none' }}>
					<ReactHowler
						ref={reactHowlerRef}
						src={`/audio/${audioSrc}`}
						playing={playing}
						preload={true} /* Howler сам выставит 'auto' */
						html5 /* iOS Safari large-file fix   */
						format={['mp3']} /* ускоряет детекцию формата   */
						/* -------- события Howler -------- */
						onPlay={() => {
							onPlayCallback?.()
						}}
						onEnd={() => {
							setPlaying(false)
							onEndCallback?.()
						}}
						onLoadError={(_, err) => console.error('Audio load error:', err)}
						onPlayError={(_, err) => console.error('Audio play error:', err)}
					/>
				</div>

				<button
					type='button'
					onClick={handleClick}
					style={{
						cursor: 'pointer',
						background: 'none',
						border: 'none',
						padding: 0,
						height: 'fit-content',
					}}
				>
					{children}
				</button>
			</>
		)
	}
)

AudioPlayer.displayName = 'AudioPlayer'
export default AudioPlayer
