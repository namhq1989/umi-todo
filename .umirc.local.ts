import { IConfig } from 'umi-types';

// Doc: https://umijs.org/docs/config#local-configuration
const config: IConfig = {
  define: {
    'process.env.API_URL': 'http://micasvn.ddns.net:9999',
  },
};

export default config;
