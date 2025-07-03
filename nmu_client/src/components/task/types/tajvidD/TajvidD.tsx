'use client'

import { AudioPlayerHandle } from '@/components/player/AudioPlayer'
import { getRandomItems } from '@/lib/utils/getRandomItems'
import { useAuthStore } from '@/stores/auth.store'
import { useTaskStore } from '@/stores/task.store'
import { ITajvidD } from '@/types/tasks'
import { Row } from 'antd'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TaskCheck from '../../TaskCheck'
import TaskResult from '../../TaskResult'
import TaskStatusAlert from '../../TaskStatusAlert'
import TajvidVarinats from './TajvidVarinats'

interface IProps {
	onFinished: VoidFunction
}

interface IVariant {
	item: string
	audioFileName?: string
	isCorrect?: boolean
}

const TajvidD = ({ onFinished }: IProps) => {
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

	const task = currentTask as ITajvidD

	const statusAudioRef = useRef<AudioPlayerHandle>(null)
	const audioRefs = useRef<Record<string, AudioPlayerHandle | null>>({})
	const [playingIndex, setPlayingIndex] = useState<string | null>(null)

	const [isPlaying, setIsPlaying] = useState(false)
	const [selected, setSelected] = useState<IVariant | null>(null)

	const variants = useMemo(() => {
		if (!task) return []
		const randoms = getRandomItems(task?.variants, 4)
		return getRandomItems(randoms, 4)
	}, [task])

	useEffect(() => {
		if (status !== 'inProgress' && selected?.audioFileName) {
			setIsPlaying(true)
			statusAudioRef.current?.play()
		}

		if (status === 'inProgress') {
			setIsPlaying(false)
			statusAudioRef.current?.stop()
		}
	}, [task, status])

	const checkHandle = () => {
		if (selected === null) return
		if (selected?.isCorrect) {
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

	return (
		<Row className='tajvid_d'>
			<TajvidVarinats
				variants={variants}
				setSelected={setSelected}
				selected={selected}
				lessonCode={task?.lessonCode}
				handleEnd={handleEnd}
				handlePlay={handlePlay}
				playingIndex={playingIndex}
				audioRefs={audioRefs}
				isAudioFileName={true}
				devMode={devMode}
				correctItem={
					task?.variants?.find(v => v.isCorrect === true)?.item || ''
				}
			/>

			<TaskCheck onClick={checkHandle} btnText={t('check')} />
			<TaskStatusAlert
				status={status}
				message={status === 'success' ? t('successMsg') : t('errorMsg')}
				btnText={t('nextBtnText')}
				onClick={nextHandler}
				correctVariant={{
					item: selected?.item || '',
					audioFileName: selected?.audioFileName,
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

export default TajvidD
