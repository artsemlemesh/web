import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearToast } from '../../store/actions/toast'
import { Alert } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import ErrorIcon from '@mui/icons-material/Error'

const Toast = ({ message, type }) => {
  const dispatch = useDispatch()

  const severity = type === 'success' ? 'success' : 'error'
  const icon =
    type === 'success' ? <CheckIcon fontSize="inherit" /> : <ErrorIcon fontSize="inherit" />

  useEffect(() => {
    const timer = setTimeout(() => {
      // Dispatch the clearToast action after 3 seconds
      dispatch(clearToast())
    }, 3000)

    // Clear the timeout to prevent memory leaks
    return () => clearTimeout(timer)
  }, [])

  return (
    <Alert icon={icon} severity={severity}>
      {message}
    </Alert>
  )
}

export default Toast
