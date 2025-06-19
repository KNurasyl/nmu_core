'use client'

import AudioPlayer, { AudioPlayerHandle } from '@/components/player/AudioPlayer'
import { Row } from 'antd'
import { Volume2 } from 'lucide-react'
import { RefObject, SetStateAction, useEffect, useRef, useState } from 'react'

interface IVariant {
	arabicLetter: string
	audioFileName: string
	lessonCode: string
}

interface IProps {
	variants: IVariant[]
	setSelected: (value: SetStateAction<string | null>) => void
	selected: string | null
	handleEnd: VoidFunction
	handlePlay: (refKey: string) => void
	playingIndex: string | null
	audioRefs: RefObject<Record<string, AudioPlayerHandle | null>>
}

const TaskVariants = ({
	variants,
	selected,
	setSelected,
	handleEnd,
	handlePlay,
	playingIndex,
	audioRefs,
}: IProps) => {
	const [hasOverflow, setHasOverflow] = useState(false)
	const variantRefs = useRef<(HTMLDivElement | null)[]>([])

	useEffect(() => {
		const overflow = variantRefs.current.some(el => {
			if (!el) return false
			return (
				el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight
			)
		})
		setHasOverflow(overflow)
	}, [variants])

	return (
		<Row
			className={`task_b__variants ${hasOverflow ? 'long-variant' : ''}`}
			gutter={[12, 12]}
			justify='center'
		>
			{variants?.map((v, i) => {
				const refKey = `${v.lessonCode}_${v.audioFileName}`
				return (
					<AudioPlayer
						key={refKey}
						ref={el => {
							audioRefs.current[refKey] = el
						}}
						audioSrc={`${v.lessonCode}/${v.audioFileName}`}
						onPlayCallback={() => handlePlay(refKey)}
						onEndCallback={handleEnd}
					>
						<div
							className={`task_b__variant ${
								selected === v.arabicLetter ? 'selected' : ''
							} ${playingIndex === refKey ? 'playing' : ''}`}
							onClick={() => setSelected(v.arabicLetter)}
						>
							<div className='audio_button'>
								<Volume2
									className='volume_icon'
									color={selected === v.arabicLetter ? '#c27a4b' : '#5f3215'}
								/>
							</div>
						</div>
					</AudioPlayer>
				)
			})}
		</Row>
	)
}

export default TaskVariants
