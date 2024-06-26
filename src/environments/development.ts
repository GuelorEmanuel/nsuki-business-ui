import environment, { Environment } from './base';

// const baseApi = 'https://api.tvmaze.com';
const baseApi = 'http://localhost:4000/api/v1';
const env = environment(baseApi);

const developmentEnv: Environment = {
  ...env,
  // override anything that gets added from base.
  api: {
    ...env.api,
    // error200: `${baseApi}/api/v1/error-200`,
    // error500: `${baseApi}/api/v1/error-500`,
  },
  isProduction: false,
  isDevelopment: true,
};

export default developmentEnv;
