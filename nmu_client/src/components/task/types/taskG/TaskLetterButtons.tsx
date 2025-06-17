import { Col, Row, Typography } from 'antd'
import { Dispatch, SetStateAction } from 'react'

interface IProps {
	variants: string[]
	setSelected: Dispatch<SetStateAction<string[]>>
	selected: string[]
}

const TaskLetterButtons = ({ variants, setSelected, selected }: IProps) => {
	return (
		<Row
			gutter={[16, 16]}
			className='task-letter-buttons'
			justify='center'
			align='middle'
			style={{ maxWidth: 400, margin: '0 auto' }}
		>
			{variants?.map(v => (
				<Col
					key={v}
					xs={8}
					sm={8}
					md={8}
					lg={8}
					xl={8}
					style={{ display: 'flex', justifyContent: 'center' }}
				>
					<Typography.Text
						className='letter-btn'
						onClick={() =>
							selected.length < 9 &&
							setSelected(prev => (prev.length < 9 ? [...prev, v] : prev))
						}
						style={{
							pointerEvents: selected.length >= 9 ? 'none' : 'auto',
							opacity: selected.length >= 9 ? 0.5 : 1,
							transition: 'opacity 0.2s',
						}}
					>
						{v}
					</Typography.Text>
				</Col>
			))}
		</Row>
	)
}

export default TaskLetterButtons
