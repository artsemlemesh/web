import React from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material'
import 'semantic-ui-css/semantic.min.css'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import App from './App'
import * as serviceWorker from './serviceWorker'
import store from './store'
import Config from './config'
import { initAmplitude } from './utils/amplitude'
import './index.css'

Sentry.init({
  environment: Config.env,
  dsn: Config.sentry_dsn,
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
})

initAmplitude()

function render() {
  const theme = createTheme()
  const root = createRoot(document.getElementById('root')!)
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </React.StrictMode>,
  )
}

render()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
