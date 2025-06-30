'use client'

import AudioPlayer, { AudioPlayerHandle } from '@/components/player/AudioPlayer'
import { Row } from 'antd'
import { Volume2 } from 'lucide-react'
import { RefObject, SetStateAction } from 'react'

interface IVariant {
	item: string
	audioFileName?: string
}

interface IProps {
	variants: IVariant[]
	setSelected: (value: SetStateAction<string | null>) => void
	selected: string | null
	lessonCode: string
	handleEnd: VoidFunction
	handlePlay: (refKey: string) => void
	playingIndex: string | null
	audioRefs: RefObject<Record<string, AudioPlayerHandle | null>>
	isAudioFileName: boolean
	correctItem: string
	devMode: boolean
}

const TajvidVarinats = ({
	variants,
	selected,
	setSelected,
	handleEnd,
	handlePlay,
	playingIndex,
	audioRefs,
	lessonCode,
	isAudioFileName,
	correctItem,
	devMode,
}: IProps) => {
	const isThree = variants.length === 3

	return (
		<Row
			className={`tajvid_a__variants${isThree ? ' three' : ''}`}
			gutter={[12, 12]}
			justify='center'
		>
			{variants?.map(v => {
				const refKey = v.item

				return (
					<AudioPlayer
						key={refKey}
						ref={el => {
							if (audioRefs.current) audioRefs.current[refKey] = el
						}}
						audioSrc={`${lessonCode}/${v.audioFileName}`}
						onPlayCallback={() => handlePlay(refKey)}
						onEndCallback={handleEnd}
					>
						<div
							className={`tajvid_a__variant arab_letter ${
								selected === v.item ? 'selected' : ''
							} ${playingIndex === refKey ? 'playing' : ''} ${
								devMode && correctItem === v?.item ? 'devMode' : ''
							}`}
							onClick={() => setSelected(v.item)}
						>
							{v.item}

							{isAudioFileName && (
								<Volume2
									className='volume_icon'
									color={selected === v.item ? '#c27a4b' : '#5f3215'}
									size={20}
								/>
							)}
						</div>
					</AudioPlayer>
				)
			})}
		</Row>
	)
}

export default TajvidVarinats
