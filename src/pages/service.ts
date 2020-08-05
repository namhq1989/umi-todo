import request from '@/utils/request';
import { APIConst } from '@/config';

/**
 * Get all todos
 */
const getAll = async () => {
  const api = APIConst.todo.list();
  const data = await request.call(api.url, { method: api.method });
  return data;
};

/**
 * Change status
 */
const changeStatus = async ({ _id }: { _id: string }) => {
  const api = APIConst.todo.changeStatus(_id);
  const data = await request.call(api.url, { method: api.method });
  return data;
};

/**
 * Change status all
 */
const changeStatusAll = async () => {
  const api = APIConst.todo.changeStatusAll();
  const data = await request.call(api.url, { method: api.method });
  return data;
};

/**
 * Create new todo
 */
const create = async (payload: any) => {
  const api = APIConst.todo.create();
  const data = await request.call(api.url, {
    method: api.method,
    data: payload,
  });
  return data;
};

export default {
  getAll,
  changeStatus,
  changeStatusAll,
  create,
};
