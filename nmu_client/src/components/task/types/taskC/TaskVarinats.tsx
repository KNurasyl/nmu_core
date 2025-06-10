'use client'

import { Row } from 'antd'
import { SetStateAction, useEffect, useRef, useState } from 'react'

interface IVariant {
	arabicLetter: string
	audioFileName: string
	lessonCode: string
}

interface IProps {
	variants: IVariant[]
	setSelected: (value: SetStateAction<string | null>) => void
	selected: string | null
}

const TaskVarinats = ({ variants, selected, setSelected }: IProps) => {
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
			className={`task_c__variants ${hasOverflow ? 'long-variant' : ''}`}
			gutter={[12, 12]}
			justify='center'
		>
			{variants?.map((v, i) => (
				<div
					key={i}
					ref={el => {
						variantRefs.current[i] = el
					}}
					className={`task_c__variant ${
						selected === v.arabicLetter ? 'selected' : ''
					}`}
					onClick={() => setSelected(v.arabicLetter)}
				>
					{v.arabicLetter}
				</div>
			))}
		</Row>
	)
}

export default TaskVarinats
