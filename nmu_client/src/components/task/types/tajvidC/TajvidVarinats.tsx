'use client'

import AudioPlayer, { AudioPlayerHandle } from '@/components/player/AudioPlayer'
import { Row } from 'antd'
import { Volume2 } from 'lucide-react'
import { RefObject, SetStateAction, useEffect, useRef, useState } from 'react'

export interface IVariant {
	item: string
	audioFileName?: string
	isCorrect?: boolean
}

interface IProps {
	variants: IVariant[]
	setSelected: (value: SetStateAction<IVariant | null>) => void
	selected: IVariant | null
	handleEnd: VoidFunction
	handlePlay: (refKey: string) => void
	playingIndex: string | null
	audioRefs: RefObject<Record<string, AudioPlayerHandle | null>>
	lessonCode: string
	devMode: boolean
	correctItem: string
}

const TaskVariants = ({
	variants,
	selected,
	setSelected,
	handleEnd,
	handlePlay,
	playingIndex,
	audioRefs,
	lessonCode,
	devMode,
	correctItem,
}: IProps) => {
	const variantsCount = variants.length
	let variantsClass = ''
	if (variantsCount === 2) variantsClass = 'two'
	else if (variantsCount === 3) variantsClass = 'three'

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
			className={`tajvid_c__variants ${
				hasOverflow ? 'long-variant' : ''
			} ${variantsClass}`}
			gutter={[12, 12]}
			justify='center'
		>
			{variants?.map(v => {
				const refKey = `${lessonCode}_${v.audioFileName}`
				return (
					<AudioPlayer
						key={refKey}
						ref={el => {
							audioRefs.current[refKey] = el
						}}
						audioSrc={`${lessonCode}/${v.audioFileName}`}
						onPlayCallback={() => handlePlay(refKey)}
						onEndCallback={handleEnd}
					>
						<div
							className={`tajvid_c__variant ${
								selected?.audioFileName === v?.audioFileName ? 'selected' : ''
							} ${playingIndex === refKey ? 'playing' : ''} ${
								devMode && correctItem === v?.item ? 'devMode' : ''
							}}`}
							onClick={() => setSelected(v)}
						>
							<div className='audio_button'>
								<Volume2
									className='volume_icon'
									color={selected?.item === v.item ? '#c27a4b' : '#5f3215'}
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
