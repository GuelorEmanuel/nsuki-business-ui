/*
 * Base is the default environment for production.
 * Add everything here and override value in other files if needed.
 * https://blog.usejournal.com/my-awesome-custom-react-environment-variables-setup-8ebb0797d8ac
 */
export default function baseEnv(baseApi: string) {
  return {
    route: {
      baseRoute: '/react-redux-architecture', // Fixes issue with Github Pages
    },
    api: {
      cast: `${baseApi}/shows/:showId/cast`,
      episodes: `${baseApi}/shows/:showId/episodes`,
      shows: `${baseApi}/shows/:showId`,
      auth: `${baseApi}/auth/google?scope=email%20profile`,
      auth_get_credential: `${baseApi}/auth/get_credential/:token`,
      callBack: `${baseApi}/auth/google?scope=email profile&redirectTo=https://localhost:3000/auth/google/callback`,
      errorExample: 'https://httpstat.us/520',
    },
    isProduction: true,
    isDevelopment: false,
    isTesting: false,
  };
}

export type Environment = ReturnType<typeof baseEnv>;
