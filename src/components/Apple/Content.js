import { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import queryString from 'query-string'

import history from '../../history'
import { getItem, removeItem, setItem } from '../../helpers/storage'
import { addItemToCart } from '../../store/actions/product'
import { getUserProfile } from '../../store/actions/login'
import consoleHelper from '../../helpers/ConsoleHelper'

export default function Content() {
  const [loggedin, setloggedIn] = useState(false)
  const dispatch = useDispatch()
  const params = queryString.parse(window.location.search)
  let code = params.code

  useEffect(() => {
    setItem('token', code)
    const localCartData = JSON.parse(getItem('localCartData'))
    if (code && localCartData && localCartData.length > 0) {
      localCartData.map((item, index) => {
        let req = {
          data: item,
          onSuccess: (res) => {
            if (res && res.listing && localCartData.length - 1 === index) {
              removeItem('localCartData')
              history.back()
            }
          },
          onFail: () => {},
        }
        dispatch(addItemToCart(req))
      })
    } else {
      let profileObj = {
        onSuccess: (resData) => {
          if (resData) {
            setItem('authdata', JSON.stringify(resData))
            setloggedIn(true)
          }
        },
        onFail: (resData) => {
          if (resData) {
            consoleHelper(resData)
          }
        },
      }
      dispatch(getUserProfile(profileObj))
    }
  }, [])

  if (loggedin) {
    return <Redirect to="/shop" />
  }
  return (
    <div className="about">
      <div className="section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about_img scene mb-4 mb-lg-0">
                {/* <img src="assets/images/about_img.jpg" alt="about_img" /> */}
              </div>
            </div>

            <div className="col-lg-8">
              <div className="heading_s1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
