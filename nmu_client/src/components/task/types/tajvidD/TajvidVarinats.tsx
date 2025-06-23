'use client'

import AudioPlayer, { AudioPlayerHandle } from '@/components/player/AudioPlayer'
import { Row } from 'antd'
import { Volume2 } from 'lucide-react'
import { RefObject, SetStateAction } from 'react'

export interface IVariant {
	item: string
	audioFileName?: string
	isCorrect?: boolean
}

interface IProps {
	variants: IVariant[]
	setSelected: (value: SetStateAction<IVariant | null>) => void
	selected: IVariant | null
	lessonCode: string
	handleEnd: VoidFunction
	handlePlay: (refKey: string) => void
	playingIndex: string | null
	audioRefs: RefObject<Record<string, AudioPlayerHandle | null>>
	isAudioFileName: boolean
	devMode: boolean
	correctItem: string
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
	const isTwo = variants.length === 2

	return (
		<Row
			className={`tajvid_d__variants${isTwo ? ' two' : ''}`}
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
							className={`tajvid_d__variant ${
								selected?.audioFileName === v.audioFileName ? 'selected' : ''
							} ${playingIndex === refKey ? 'playing' : ''} ${
								devMode && correctItem === v?.item ? 'devMode' : ''
							}`}
							onClick={() => setSelected(v)}
						>
							{v.item}

							{isAudioFileName && (
								<Volume2
									className='volume_icon'
									color={
										selected?.audioFileName === v.audioFileName
											? '#c27a4b'
											: '#5f3215'
									}
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
