import request from '@/utils/request'

/**
 * Get all todos
 */
const getAll = async () => {
  const data = await request.call('/todos', { method: 'get' })
  return data
}

/**
 * Change status
 */
const changeStatus = async ({ _id }: { _id: string }) => {
  const data = await request.call(`/todos/select/${_id}`, { method: 'patch' })
  return data
}

/**
 * Change status all
 */
const changeStatusAll = async () => {
  const data = await request.call(`/todos`, { method: 'put' })
  return data
}

/**
 * Change status all
 */
const create = async (payload: any) => {
  const data = await request.call(`/todos`, { method: 'post', data: payload })
  return data
}

export default {
  getAll,
  changeStatus,
  changeStatusAll,
  create,
}
