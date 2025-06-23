'use client'

import { ITajvidB } from '@/types/tasks'
import { Row } from 'antd'
import { SetStateAction } from 'react'

export interface IVariant {
	item: string
	audioFileName?: string
	isCorrect?: boolean
}

interface IProps {
	variants: IVariant[]
	setSelected: (value: SetStateAction<IVariant | null>) => void
	selected: IVariant | null
	task: ITajvidB
}

const getCode = (item: string) => {
	switch (item) {
		case 'касра':
			return 'ـٍ'
		case 'домма':
			return 'ـٌ'
		case 'фатха':
			return 'ـً'
		default:
			return item
	}
}

const TajvidVarinats = ({ variants, selected, setSelected, task }: IProps) => {
	const isThree = variants.length === 3
	const isSpecLetters =
		task?.subType === 'tajvid-10l-1t' || task?.subType === 'tajvid-11l-1t'

	return (
		<Row
			className={`tajvid_b__variants${isThree ? ' three' : ''} ${
				isSpecLetters ? 'specVariants' : ''
			}`}
			gutter={[12, 12]}
			justify='center'
		>
			{variants?.map(v => (
				<div
					className={`tajvid_b__variant ${
						selected?.item === v.item ? 'selected' : ''
					} ${isSpecLetters ? 'specLetter' : ''}`}
					onClick={() => setSelected(v || null)}
				>
					{getCode(v.item)}
				</div>
			))}
		</Row>
	)
}

export default TajvidVarinats
