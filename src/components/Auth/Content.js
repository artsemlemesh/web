import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { verifyUser } from '../../store/actions/login'
import { isMobile } from 'react-device-detect'
import Config from '../../config'

function Content() {
  let { uid, token } = useParams()
  const [isVisible, setIsVisible] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    let verifyObj = {
      uid: uid,
      token: token,
      onSuccess: (res) => {
        if (res) {
          setIsVisible(true)
          if (isMobile) {
            window.location = `${Config.base_scheme}?token=${res.token}`
          } else {
            window.location = window.location.origin + `/shop`
          }
        }
      },
      onFail: () => {
        setIsVisible(false)
      },
    }
    dispatch(verifyUser(verifyObj))
  }, [])

  const redirectOnLogin = () => {
    window.location = window.location.origin + '/login'
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
              <div className="heading_s1">
                {isVisible === false ? (
                  <h2>Your account is unverified please try again later.</h2>
                ) : isVisible == true ? (
                  <h2>Your account is successfully verified.</h2>
                ) : null}
              </div>
              {isVisible && (
                <div style={{ alignContent: 'center' }}>
                  <Button
                    inverted
                    color="violet"
                    onClick={() => {
                      redirectOnLogin()
                    }}
                    style={{ width: '50%' }}
                  >
                    Login
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
