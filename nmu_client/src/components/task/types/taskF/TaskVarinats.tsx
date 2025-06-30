'use client'

import { Row } from 'antd'
import { SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

interface IProps {
	setSelected: (value: SetStateAction<string[]>) => void
	selected: string[]
}

const variants = ['wordStart', 'wordMiddle', 'wordEnd']

const TaskVarinats = ({ selected, setSelected }: IProps) => {
	const { t } = useTranslation('common')

	const handleSelect = (t: string) => {
		setSelected(prev =>
			prev.includes(t) ? prev.filter(item => item !== t) : [...prev, t]
		)
	}

	return (
		<Row className={`task_f__variants`} gutter={[12, 12]} justify='center'>
			{variants?.map((v, i) => (
				<div
					key={i}
					className={`task_f__variant arab_letter ${
						selected.includes(v) ? ' selected' : ''
					}`}
					onClick={() => handleSelect(v)}
				>
					{t(v)}
				</div>
			))}
		</Row>
	)
}

export default TaskVarinats
