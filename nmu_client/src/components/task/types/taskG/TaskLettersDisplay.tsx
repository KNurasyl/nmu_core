'use client'

import { ClearOutlined } from '@ant-design/icons'
import { Button, Row, Typography } from 'antd'
import { Dispatch, SetStateAction } from 'react'

interface IProps {
	letters: string[]
  setSelected: Dispatch<SetStateAction<string[]>>
}

const TaskLettersDisplay = ({ letters, setSelected }: IProps) => {
	return (
		<Row
			gutter={[12, 12]}
			className='task-letters-display'
			justify='center'
			align='middle'
		>
			{letters.length > 0 ? (
				<Typography.Text className='display-letter' title='Удалить букву'>
					{letters?.join('')}
				</Typography.Text>
			) : null}

			<Button className='clear_btn' icon={<ClearOutlined />} onClick={() => setSelected([])}/>
		</Row>
	)
}

export default TaskLettersDisplay
