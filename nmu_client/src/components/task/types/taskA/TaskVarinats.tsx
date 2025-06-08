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
}

const TaskVarinats = ({ variants, selected, setSelected }: IProps) => {
	const isLong = variants.some(v => v.arabicLetter.length > 2)

	return (
		<Row
			className={`task_a__variants ${isLong ? 'long-variant' : ''}`}
			gutter={[12, 12]}
			justify='center'
		>
			{variants?.map((v, i) => (
				<div
					key={i}
					className={`task_a__variant ${
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
