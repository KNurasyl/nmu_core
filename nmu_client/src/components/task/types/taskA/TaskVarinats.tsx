'use client'

import { Row } from 'antd'
import { SetStateAction } from 'react'

interface IVariant {
	arabicLetter: string
	audioFileName: string
	lessonCode: string
}

interface IProps {
	variants: IVariant[]
	setSelected: (value: SetStateAction<string | null>) => void
	selected: string | null
	devMode: boolean
	correctItem: string
}

const TaskVarinats = ({
	variants,
	selected,
	correctItem,
	devMode,
	setSelected,
}: IProps) => {
	return (
		<Row className={`task_a__variants`} gutter={[12, 12]} justify='center'>
			{variants?.map((v, i) => (
				<div
					key={i}
					className={`task_a__variant arab_letter ${
						selected === v.arabicLetter ? 'selected' : ''
					} ${devMode && correctItem === v?.arabicLetter ? 'devMode' : ''}`}
					onClick={() => setSelected(v.arabicLetter)}
				>
					{v.arabicLetter}
				</div>
			))}
		</Row>
	)
}

export default TaskVarinats
