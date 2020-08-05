import React from 'react'
import { Row, Col, Button, Input } from 'antd'
import { useModel } from 'umi'

interface Props {
  onCreate: (value: string, resetValue: Function) => void;
}

const NewTodo = (props: Props) => {
  const { newTodoName, onNewTodoNameChange } = useModel('todo')

  const resetValue = () => {
    onNewTodoNameChange('')
  }

  return (
    <Row>
      <Col span={22}>
        <Input
          value={newTodoName}
          width="100%"
          placeholder="Create new todo"
          onChange={(e) => {
            onNewTodoNameChange(e.target.value)
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              props.onCreate(newTodoName, resetValue)
            }
          }}
        />
      </Col>
      <Col span={2}>
        <Button onClick={() => {
          props.onCreate(newTodoName, resetValue)
        }}>Create</Button>
      </Col>
    </Row>
  )
}

export default NewTodo;