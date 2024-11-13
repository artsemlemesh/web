/* global google */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import consoleHelper from '../../helpers/ConsoleHelper'
import { socialGoogleTap } from '../../store/actions/login'

function GoogleTap() {
  const dispatch = useDispatch()

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: '1011628648286-ue9pf98ju9lln7h51oaoo7u1ouj274gc.apps.googleusercontent.com',
      callback: (res) => {
        let data = {
          credential: res.credential,
        }

        const obj = {
          items: data,
          onSuccess: (result) => {
            if (result) {
              window.location.href = window.location.origin + '/shop'
            }
          },
        }

        dispatch(socialGoogleTap(obj))
      },
    })
    google.accounts.id.prompt((notification) => consoleHelper('notification', notification))
  }, [])

  return <div />
}

export default GoogleTap
