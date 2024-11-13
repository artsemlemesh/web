import consoleHelper from '../helpers/ConsoleHelper'

const REACT_APP_STRIPE_PK =
  'pk_test_51Mw5SEL57dGnBnScUFqGMHdOgUaFVUUCDTDMTcjFZ9fSGhJVx80ao3xOD5zJ5Az6yCfzZeOFfFjiUS0CyQUJjvha00TQ474QWO'
const REACT_APP_STRIPE_PK_PROD =
  'pk_live_51Mw5SEL57dGnBnScBtGE4XBe2KfHsDOiqHtW1D5VUmOWj7NC4KmF6xCR7rmX4mSbvang4qIYdctarVQU7A9n9RzH004kJlhNzV'
const REACT_APP_GOOGLE_PLACE_API_KEY = 'AIzaSyCw7O8ydcHBvr2psYkmYhavwCkxZ-wUiuY'
const REACT_APP_AMPLITUDE_API_KEY = '148f693b4f2b695801a34e9288f12b29'
const REACT_APP_SENTRY_DSN =
  'https://28a85ec49e75486fb48f5b125fcaa615@o399095.ingest.sentry.io/5584160'

function getEnvironment() {
  const ENV_NAME = process.env.REACT_APP_ENV_NAME
  switch (ENV_NAME) {
    case 'development':
      return {
        ENV_NAME: 'DEVELOPMENT',
        API_BASE_URL: 'http://localhost:8000',
        BASE_SCHEME: 'exp://localhost:19000',
        STRIPE_PK: REACT_APP_STRIPE_PK,
      }
    case 'staging':
      return {
        ENV_NAME: 'STAGING',
        API_BASE_URL: 'https://api-uat.bundleup.co',
        BASE_SCHEME: 'bundleup://',
        STRIPE_PK: REACT_APP_STRIPE_PK,
      }
    case 'production':
      return {
        ENV_NAME: 'PRODUCTION',
        API_BASE_URL: 'https://api-prod.bundleup.co',
        BASE_SCHEME: 'bundleup://',
        STRIPE_PK: REACT_APP_STRIPE_PK_PROD,
      }
    default:
      return {
        ENV_NAME: 'DEFAULT',
        API_BASE_URL: 'https://api-uat.bundleup.co',
        BASE_SCHEME: 'exp://localhost:19000',
        STRIPE_PK: REACT_APP_STRIPE_PK,
      }
  }
}

const env = getEnvironment()
consoleHelper('ENV', env.ENV_NAME)

const Config = {
  url: {
    https: 'https://',
    wss: 'wss://',
  },
  env: env.ENV_NAME,
  api_base_url: env.API_BASE_URL,
  base_scheme: env.BASE_SCHEME,
  stripe_pk: env.STRIPE_PK,

  google_place_api_key: REACT_APP_GOOGLE_PLACE_API_KEY,
  amplitude_api_key: REACT_APP_AMPLITUDE_API_KEY,
  rudderstack_data_plane_url: 'https://bundleupigrwiv.dataplane.rudderstack.com',
  rudderstack_write_key: '2YS24X7z323JrsFnNBshyOl5jJV',
  sentry_dsn: REACT_APP_SENTRY_DSN,
}
export default Config
