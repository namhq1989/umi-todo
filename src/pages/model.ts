import { Effect, Reducer, Subscription } from 'umi';
import service from './service';
import { TodoRecord, TodoState } from './interface';
import notification from '@/utils/notification';

export interface TodoModelType {
  namespace: string;
  state: TodoState;
  effects: {
    fetch: Effect;
    changeStatus: Effect;
    changeStatusAll: Effect;
    create: Effect;
  };
  reducers: {
    save: Reducer<TodoState>;
  };
  subscriptions: { setup: Subscription };
}

// Khai báo model cho target mình đang làm
const TodoModel: TodoModelType = {
  // Tên của model sẽ được dùng ở view
  // Phải là unique, không trùng với namespace khác
  namespace: 'todo',

  // Init state của view
  state: {
    list: [],
    selectedItem: null,
  },

  // Hàm đầu tiên chạy khi load view
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        console.log('pathname', pathname);
      });
    },
  },

  // Dùng để gọi api, hoặc update state
  // Được gọi thông qua "dispatch" ở view
  effects: {
    // Tên hàm phải được khai báo ở interface // TodoModelType
    // Payload được truyền trong hàm dispatch
    // call: gọi api
    // put: call xuống reducer
    *fetch({ payload }, { call, put }) {
      const { data } = yield call(service.getAll);
      yield put({
        type: 'save',
        payload: {
          list: data,
        },
      });
    },

    *changeStatus({ payload }, { call, put, select }) {
      const { err } = yield call(service.changeStatus, payload);

      // Return if error
      if (err) {
        return notification.error(err);
      }

      // Success
      notification.success('Cập nhật thành công!');

      // Change item success
      const { list } = yield select((_: any) => _.todo);
      const index = list.findIndex(
        (item: TodoRecord) => item._id === payload._id,
      );

      // If found, change status then update
      if (index !== -1) {
        list[index].isComplete = !list[index].isComplete;
        yield put({
          type: 'save',
          payload: { list },
        });
      } else {
        // Else reload table data
        yield put({
          type: 'fetch',
        });
      }
    },

    *changeStatusAll({}, { call, put }) {
      const { err } = yield call(service.changeStatusAll);

      // Return if error
      if (err) {
        return notification.error(err);
      }

      // Success
      notification.success('Cập nhật thành công!');

      // Due to change status for all items, and server not return new status of items,
      // just reload to make sure view will display latest data
      yield put({
        type: 'fetch',
      });
    },

    *create({ payload }, { call, put }) {
      // payload
      // {
      //   content: string
      // }
      const { err } = yield call(service.create, { content: payload.content });

      // Return if error
      if (err) {
        return notification.error(err);
      }

      // Success
      notification.success('Tạo thành công!');

      // Reset value
      payload.resetValue();

      // Refresh data
      yield put({
        type: 'fetch',
      });
    },
  },

  // Update state mới
  // Được gọi thông qua "dispatch" ở view
  // Hoặc từ effects thông qua "put"
  reducers: {
    // state: state hiện tại của model
    // action: chứa thông tin của object trong hàm put() ở trên effect, hoặc dispatch ở view
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default TodoModel;
