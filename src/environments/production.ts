import environment, { Environment } from './base';

/*
 * base.ts is the default environment for production.
 * You shouldn't have override anything.
 */

const baseApi = 'https://nsuki-business-service.gigalixirapp.com/api/v1';
const env = environment(baseApi);

const productionEnv: Environment = {
  ...env,
  // override anything that gets added from base.
};

export default productionEnv;
