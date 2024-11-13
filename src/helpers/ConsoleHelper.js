const consoleHelper = (message, data) => {
  if (process.env.REACT_APP_ENV_NAME === 'production') return
  console.log(message, data)
}

export default consoleHelper
