'use client'

import AudioPlayer, { AudioPlayerHandle } from '@/components/player/AudioPlayer'
import { getRandomItems } from '@/lib/utils/getRandomItems'
import { useAuthStore } from '@/stores/auth.store'
import { useTaskStore } from '@/stores/task.store'
import { ITajvidB } from '@/types/tasks'
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

interface IVariant {
	item: string
	audioFileName?: string
	isCorrect?: boolean
}

const TajvidB = ({ onFinished }: IProps) => {
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

	const task = currentTask as ITajvidB

	const audioRef = useRef<AudioPlayerHandle>(null)
	const statusAudioRef = useRef<AudioPlayerHandle>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [selected, setSelected] = useState<IVariant | null>(null)

	const variants = useMemo(() => {
		if (!task) return []
		const randoms = getRandomItems(task?.variants, 4)
		return getRandomItems(randoms, 4)
	}, [task])

	console.log(task)

	useEffect(() => {
		if (task && status === 'inProgress' && task?.question?.audioFileName) {
			audioRef.current?.play()
			setIsPlaying(true)
			statusAudioRef.current?.stop()
		}

		if (status !== 'inProgress' && task?.question?.audioFileName) {
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
		setSelected(null)
		nextTask()
	}

	const isWithAudio =
		task?.subType === 'tajvid-2l-2t' ||
		'tajvid-10l-1t' ||
		task?.subType === 'tajvid-12l-1t'
	const isSpecResult = task?.subType === 'tajvid-12l-1t'

	return (
		<Row className='tajvid_b'>
			<TaskAnswer
				task={task}
				isPlaying={isPlaying}
				audioRef={audioRef}
				handlePlay={() => setIsPlaying(true)}
				handleEnd={() => setIsPlaying(false)}
				audioSrc={`${task?.lessonCode}/${task?.question?.audioFileName}`}
			/>

			<TajvidVarinats
				variants={variants}
				setSelected={setSelected}
				selected={selected}
				task={task}
				devMode={devMode}
				correctItem={task?.variants.find(v => v.isCorrect === true)?.item || ''}
			/>

			<Row className={`pagination ${!isWithAudio ? 'without-audio' : ''}`}>
				<TaskCheck onClick={checkHandle} btnText={t('check')} />
				{isWithAudio && (
					<Row className='audio_blog'>
						<AudioPlayer
							ref={audioRef}
							audioSrc={`${task?.lessonCode}/${task?.question?.audioFileName}`}
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
					...task?.question,
					audioFileName:
						selected?.audioFileName || task?.question?.audioFileName,
					item: isSpecResult
						? task?.question?.item
						: selected?.item || task?.question?.item,
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

export default TajvidB
