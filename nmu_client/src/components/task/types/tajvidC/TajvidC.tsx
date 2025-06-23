'use client'

import { AudioPlayerHandle } from '@/components/player/AudioPlayer'
import { getRandomItems } from '@/lib/utils/getRandomItems'
import { useTaskStore } from '@/stores/task.store'
import { ITajvidC } from '@/types/tasks'
import { Row } from 'antd'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TaskCheck from '../../TaskCheck'
import TaskResult from '../../TaskResult'
import TaskStatusAlert from '../../TaskStatusAlert'
import TaskAnswer from './TajvidAnswer'
import TajvidVarinats, { IVariant } from './TajvidVarinats'

interface IProps {
	onFinished: VoidFunction
}

const TajvidC = ({ onFinished }: IProps) => {
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

	const task = currentTask as ITajvidC

	const audioRef = useRef<AudioPlayerHandle>(null) // для вопроса
	const statusAudioRef = useRef<AudioPlayerHandle>(null) // для алерта
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
		// Автостарт алерта
		if (status !== 'inProgress' && task?.question?.audioFileName) {
			statusAudioRef.current?.play()
			audioRef.current?.stop()
		}
		// Стоп алерта когда ушли с алерта
		if (status === 'inProgress') {
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
		<Row className='tajvid_c'>
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
			/>

			<TaskCheck onClick={checkHandle} btnText={t('check')} />

			<TaskStatusAlert
				status={status}
				message={status === 'success' ? t('successMsg') : t('errorMsg')}
				btnText={t('nextBtnText')}
				onClick={nextHandler}
				correctVariant={task?.question}
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

export default TajvidC
