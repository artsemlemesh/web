import amplitude from 'amplitude-js'
import Config from '../config'

export const initAmplitude = () => {
  amplitude.getInstance().init(Config.amplitude_api_key)
}

export const setAmplitudeUserDevice = (installationToken) => {
  amplitude.getInstance().setDeviceId(installationToken)
}

export const setAmplitudeUserId = (userId) => {
  amplitude.getInstance().setUserId(userId)
}

export const setAmplitudeUserProperties = (properties) => {
  amplitude.getInstance().setUserProperties(properties)
}

export const sendAmplitudeData = (eventType, eventProperties) => {
  amplitude.getInstance().logEvent(eventType, eventProperties)
}
