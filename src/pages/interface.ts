import { ConnectProps, Dispatch, Effect, Reducer, Subscription } from 'umi';

export interface TodoRecord {
  _id: string;
  content: string;
  isComplete: boolean;
}

// Page props
export interface PageProps extends ConnectProps {
  todo: TodoState;
  dispatch: Dispatch;
  loading: boolean;
}

// Interface
export interface TodoItem {
  _id: string;
  content: string;
  isComplete: boolean;
}

export interface TodoState {
  list: TodoItem[];
  selectedItem: TodoItem | null;
}

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