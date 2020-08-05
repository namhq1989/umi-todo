import React from 'react';
import { Table, Typography } from 'antd';
import { TodoRecord } from '@/pages/interface';

const { Text } = Typography

interface Props {
  data: TodoRecord[];
  onSelectItem: (record: TodoRecord) => void;
  onSelectAll: () => void;
}

const columns = [{
  title: 'Content',
  dataIndex: 'content',
  render: (value: any, row: TodoRecord) => {
    if (row.isComplete) {
      return <Text delete>{value}</Text>
    }
    return <Text>{value}</Text>
  }
}];

const ListTodos = (props: Props) => {
  const selectedKeys = props.data.map((item) => {
    if (item.isComplete) return item._id
    return undefined
  })

  return (
    <Table
      rowKey='_id'
      rowSelection={{
        selectedRowKeys: selectedKeys as React.Key[],
        onSelect: (record) => {
          props.onSelectItem(record)
        },
        onSelectAll: (selected: boolean) => {
          props.onSelectAll()
        }
      }}
      columns={columns}
      dataSource={props.data}
      pagination={false}
    />
  );
};

export default ListTodos;