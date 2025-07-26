'use client'

import AudioPlayer, { AudioPlayerHandle } from '@/components/player/AudioPlayer'
import { getRandomItems } from '@/lib/utils/getRandomItems'
import { useAuthStore } from '@/stores/auth.store'
import { useTaskStore } from '@/stores/task.store'
import { ITajvidA } from '@/types/tasks'
import { Row } from 'antd'
import { Volume2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TaskCheck from '../../TaskCheck'
import TaskResult from '../../TaskResult'
import TaskStatusAlert from '../../TaskStatusAlert'
import TaskAnswer from './TajvidAnswer'
import TajvidVarinats from './TajvidVarinats'

interface IProps {
	onFinished: VoidFunction
}

const TajvidA = ({ onFinished }: IProps) => {
	const { t } = useTranslation('common')

	const {
		currentTask,
		nextTask,
		addErrorTask,
		markCorrect,
		markWrong,
		status,
		setStatus,
		score,
		correctCount,
		wrongCount,
		elapsedTime,
	} = useTaskStore(state => state)

	const devMode = useAuthStore(state => state.devMode)

	const task = currentTask as ITajvidA

	const audioRef = useRef<AudioPlayerHandle>(null)
	const statusAudioRef = useRef<AudioPlayerHandle>(null)
	const audioRefs = useRef<Record<string, AudioPlayerHandle | null>>({})
	const [playingIndex, setPlayingIndex] = useState<string | null>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [selected, setSelected] = useState<string | null>(null)

	const variants = useMemo(() => {
		if (!task) return []
		const randoms = getRandomItems(task?.variants, 4)
		return getRandomItems(randoms, 4)
	}, [task])

	useEffect(() => {
		if (task && status === 'inProgress' && task?.question?.audioFileName) {
			audioRef.current?.play()
			setIsPlaying(true)
			statusAudioRef.current?.stop()
		}

		if (
			status !== 'inProgress' &&
			(task?.correctVariant?.audioFileName || task?.question?.audioFileName)
		) {
			statusAudioRef.current?.play()
			audioRef.current?.stop()
		}

		if (status === 'inProgress') statusAudioRef.current?.stop()
	}, [task, status])

	const checkHandle = () => {
		if (!selected) return
		if (selected === task?.correctVariant?.item) {
			setStatus('success')
			markCorrect(task)
		} else {
			setStatus('error')
			markWrong(task)
			addErrorTask(task)
		}
	}

	const nextHandler = () => {
		setStatus('inProgress')
		setPlayingIndex(null)
		setSelected(null)
		Object.values(audioRefs.current).forEach(ref => ref?.stop())
		audioRefs.current = {}
		nextTask()
	}

	const handlePlay = (refKey: string) => {
		Object.entries(audioRefs.current).forEach(([key, audio]) => {
			if (audio && key !== refKey) audio.stop()
		})
		setPlayingIndex(refKey)
		audioRefs.current[refKey]?.play()
	}

	const handleEnd = () => {
		setPlayingIndex(null)
	}

	const isAudioFileName =
		task.subType === 'tajvid-3l-2t' ? false : !task?.question?.audioFileName
	const isWithoutAudio =
		task.subType === 'tajvid-3l-2t' ? false : !task?.question?.audioFileName
	const audioFileName =
		task.subType === 'tajvid-3l-2t'
			? task?.correctVariant?.audioFileName
			: task?.question?.audioFileName

	return (
		<Row className='tajvid_a'>
			<TaskAnswer arabicLetter={task?.question?.item} />

			<TajvidVarinats
				variants={variants}
				setSelected={setSelected}
				selected={selected}
				lessonCode={task?.lessonCode}
				handleEnd={handleEnd}
				handlePlay={handlePlay}
				playingIndex={playingIndex}
				audioRefs={audioRefs}
				isAudioFileName={isAudioFileName}
				correctItem={task?.correctVariant?.item}
				devMode={devMode}
			/>

			<Row className={`pagination ${isWithoutAudio ? 'without-audio' : ''}`}>
				<TaskCheck onClick={checkHandle} btnText={t('check')} />
				{audioFileName && (
					<Row className='audio_blog'>
						<AudioPlayer
							ref={audioRef}
							audioSrc={`${task?.lessonCode}/${audioFileName}`}
							onPlayCallback={() => setIsPlaying(true)}
							onEndCallback={() => setIsPlaying(false)}
						>
							<div className={`audio_container ${isPlaying ? 'playing' : ''}`}>
								<div className='wave wave1' />
								<div className='wave wave2' />
								<div className='wave wave3' />
								<div className='audio_button'>
									<Volume2 className='volume_icon' color='#5f3215' />
								</div>
							</div>
						</AudioPlayer>
					</Row>
				)}
			</Row>

			<TaskStatusAlert
				status={status}
				message={status === 'success' ? t('successMsg') : t('errorMsg')}
				btnText={t('nextBtnText')}
				onClick={nextHandler}
				correctVariant={{
					...task?.correctVariant,
					audioFileName:
						task?.correctVariant?.audioFileName ||
						task?.question?.audioFileName,
				}}
				lessonCode={task?.lessonCode}
				audioRef={statusAudioRef}
				isPlaying={isPlaying}
			/>

			<TaskResult
				show={status === 'finished'}
				bravoTxt={t('bravoTxt')}
				score={score}
				correctAttempt={correctCount}
				correctAttemptTxt={t('correctAttemptTxt')}
				inCorrectAttempt={wrongCount}
				inCorrectAttemptTxt={t('inCorrectAttemptTxt')}
				totalAttempt={correctCount + wrongCount}
				totalAttemptTxt={t('totalAttemptTxt')}
				finishBtnTxt={t('finishBtnTxt')}
				timeTxt={t('timeTxt')}
				timeout={elapsedTime}
				onClick={onFinished}
			/>
		</Row>
	)
}

export default TajvidA
