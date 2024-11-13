import * as rudderAnalytics from 'rudder-sdk-js'
import Config from '../config'

const rudderInitialize = async () => {
  try {
    rudderAnalytics.load(Config.rudderstack_write_key, Config.rudderstack_data_plane_url)
  } catch (error) {
    console.log(error)
  }
}

const initialize = () => {
  rudderInitialize()
}

const defaultProperties = {
  env: process.env.REACT_APP_ENV_NAME,
}

const track = (event, properties = {}, options = {}) => {
  properties = { ...properties, ...defaultProperties }
  try {
    rudderAnalytics.track(event, properties, options)
  } catch (error) {
    console.log(error)
  }
}

const screen = (name, properties = {}, options = {}) => {
  properties = { ...properties, ...defaultProperties }
  try {
    rudderAnalytics.page(name, properties, options)
  } catch (error) {
    console.log(error)
  }
}

const identify = (id, properties = {}, options = {}) => {
  properties = { ...properties, ...defaultProperties }
  const envUserId = process.env.REACT_APP_ENV + '_' + id
  try {
    rudderAnalytics.identify(envUserId, properties, options)
  } catch (error) {
    console.log(error)
  }
}

const reset = () => {
  try {
    rudderAnalytics.reset(false)
  } catch (error) {
    console.log(error)
  }
}

const ready = (onReady) => {
  try {
    rudderAnalytics.ready(onReady)
  } catch (error) {
    console.log(error)
  }
}

export default {
  initialize,
  track,
  screen,
  identify,
  reset,
  ready,
}
