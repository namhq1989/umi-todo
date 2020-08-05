const methods = {
  get: 'get',
  post: 'post',
  put: 'put',
  patch: 'patch',
};

export default {
  apiHost: process.env.API_URL,
  methods,

  // Todo
  todo: {
    list: () => ({
      url: '/todos',
      method: methods.get,
    }),
    create: () => ({
      url: '/todos',
      method: methods.post,
    }),
    changeStatus: (_id: string) => ({
      url: `/todos/select/${_id}`,
      method: methods.patch,
    }),
    changeStatusAll: () => ({
      url: '/todos',
      method: methods.put,
    }),
  },
};
