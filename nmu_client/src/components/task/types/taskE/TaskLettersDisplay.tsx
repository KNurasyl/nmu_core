import { Row, Col, Typography } from 'antd'
import { Dispatch, SetStateAction } from 'react'

interface IProps {
  letters: string[]
  setSelected: Dispatch<SetStateAction<string[]>>
}

const TaskLettersDisplay = ({ letters, setSelected }: IProps) => {
  const handleRemove = (idx: number) => {
    setSelected(prev => prev.filter((_, i) => i !== idx))
  }

  return (
    <Row
      gutter={[12, 12]}
      className="task-letters-display"
      justify="center"
      align="middle"
    >
      {letters.map((letter, idx) => (
        <Col key={idx}>
          <Typography.Text
            className="display-letter"
            onClick={() => handleRemove(idx)}
            title="Удалить букву"
          >
            {letter}
          </Typography.Text>
        </Col>
      ))}
    </Row>
  )
}

export default TaskLettersDisplay
