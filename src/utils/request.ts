import { request } from 'umi';
import { APIConst } from '@/config';

const API_HOST = process.env.API_URL;

const call = async (
  url: string,
  options: any,
): Promise<{ data: any; err: any }> => {
  // Skip auto error handler
  options.skipErrorHandler = true;

  if (!options.method) {
    options.method = APIConst.methods.get;
  }

  try {
    const data = await request(API_HOST + url, options);
    return { data, err: null };
  } catch (err) {
    return { err: err.data?.message || err.message, data: null };
  }
};

export default {
  call,
};
