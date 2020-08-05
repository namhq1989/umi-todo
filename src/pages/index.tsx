import React from 'react';
import { Row, Col, Spin } from 'antd';
import { connect, Loading, ConnectProps, Dispatch } from 'umi';
import ListTodos from './components/list-todo';
import CreateTodo from './components/new-todo';
import { TodoRecord, TodoState } from './interface';
import styles from './style.less';
import notification from '@/utils/notification';

// Page props
export interface PageProps extends ConnectProps {
  todo: TodoState;
  dispatch: Dispatch;
  loading: boolean;
}

class TodoPage extends React.Component<PageProps, any> {
  // Sau khi load components xong, gọi hàm "fetch" ở todo để lấy data từ server
  componentDidMount() {
    this.props.dispatch({
      type: 'todo/fetch',
    });
  }

  onSelectItem = (record: TodoRecord) => {
    this.props.dispatch({
      type: 'todo/changeStatus',
      payload: record,
    });
  };

  onSelectAll = () => {
    this.props.dispatch({
      type: 'todo/changeStatusAll',
    });
  };

  onCreateTodo = (value: string, resetValue: Function) => {
    if (!value) return notification.error('Vui lòng nhập nội dung todo');
    this.props.dispatch({
      type: 'todo/create',
      payload: {
        content: value,
        resetValue: resetValue,
      },
    });
  };

  render() {
    const { todo, loading } = this.props;

    return (
      <Row justify="center">
        <Col span={12}>
          <Spin spinning={loading}>
            <h1 className={styles.header}>List TODOs</h1>
            <CreateTodo onCreate={this.onCreateTodo} />
            <ListTodos
              data={todo.list}
              onSelectItem={this.onSelectItem}
              onSelectAll={this.onSelectAll}
            />
          </Spin>
        </Col>
      </Row>
    );
  }
}

// "connect" dùng để connect view tới model
// "todo" là tên của namespace khai báo trên model
// "loading" là biến boolean mà model sẽ tự sinh ra khi có 1 hàm dispatch được gọi
export default connect(
  ({ todo, loading }: { todo: TodoState; loading: Loading }) => ({
    todo,
    loading: loading.models.todo,
  }),
)(TodoPage);
