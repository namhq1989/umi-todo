import { request } from 'umi'

const API_HOST = 'http://micasvn.ddns.net:9999'

const call = async (url: string, options: any): Promise<{ data: any; err: any; }> => {
  // Skip auto error handler
  options.skipErrorHandler = true;

  if (!options.method) {
    options.method = 'get';
  }

  try {
    const data = await request(API_HOST + url, options);
    return ({ data, err: null });
  }
  catch (err) {
    return ({ err: err.data?.message || err.message, data: null });
  }
}

export default {
  call,
}