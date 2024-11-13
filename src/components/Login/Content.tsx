import { ReactElement, SyntheticEvent, useEffect, useState } from 'react'
import { type AnyAction } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, resendEmailVerifcation, socialLogin } from '../../store/actions/login'
import { GoogleLogin, type GoogleLoginResponse } from 'react-google-login'
import ReactFacebookLogin, { type ReactFacebookLoginInfo } from 'react-facebook-login'
import { Link, Redirect } from 'react-router-dom'
import { getItem } from '../../helpers/storage'
import AppleLogin from 'react-apple-login'
import { FaFacebookSquare } from '@react-icons/all-files/fa/FaFacebookSquare'
import { RootState } from '../../store/reducers'
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || ''

export interface LoginData {
  email: string
  password: string
}

export default (): ReactElement => {
  const dispatch = useDispatch()
  const [errMsg, setErrmsg] = useState<string>('')
  const [token, setToken] = useState<string>('')
  const tokenLoaded = useSelector((state: RootState) => state.user.tokenLoaded)
  useEffect(() => {
    const tokenGet = getItem('token') as string
    setToken(tokenGet?.toString())
  }, [tokenLoaded])

  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  })

  const handleChange = (event: SyntheticEvent<EventTarget>) =>
    setFormData({
      ...formData,
      [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
    })

  const loginReq = () => {
    if (!formData.email) {
      setErrmsg('Please enter your email address!')
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/.test(formData.email)) {
      setErrmsg('Please enter correct email address!')
    } else if (!formData.password) {
      setErrmsg('Password is required!')
    } else {
      const req = {
        data: formData,
        onSuccess: () => {},
        onFail: (err: string) => {
          if (err.toLowerCase() === 'User account is disabled.'.toLowerCase()) {
            const req1 = {
              onSuccess: (res: { message: string }) => {
                setErrmsg(res.message)
              },

              email: formData.email,
              onFail: (innerErr: string) => {
                setErrmsg(innerErr)
              },
            }
            dispatch(resendEmailVerifcation(req1) as unknown as AnyAction)
          }
          setErrmsg(err)
        },
      }
      dispatch(loginUser(req) as unknown as AnyAction)
    }
  }

  if (token) {
    return <Redirect to="/shop" />
  }

  return (
    <div className="login">
      <div className="login_register_wrap section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-md-10">
              <div className="login_wrap">
                <div className="padding_eight_all bg-white">
                  <div className="heading_s1">
                    <h3>Login</h3>
                  </div>
                  {/* <form method="post"> */}
                  <div className="form-group">
                    <input
                      type="text"
                      required
                      className="form-control"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      required
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="login_footer form-group">
                    <div className="chek-form">
                      <div className="custome-checkbox">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="checkbox"
                          id="exampleCheckbox1"
                          value=""
                        />
                        <label className="form-check-label" htmlFor="exampleCheckbox1">
                          <span>Remember me</span>
                        </label>
                      </div>
                    </div>
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </div>
                  {errMsg && (
                    <div className="form-group">
                      <div className="form-note text-center">
                        <span style={{ color: 'red' }}>{errMsg + '!'}</span>
                      </div>
                    </div>
                  )}

                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-fill-out btn-block"
                      name="login"
                      onClick={loginReq}
                    >
                      Log in
                    </button>
                  </div>
                  {/* </form> */}
                  <div className="different_login">
                    <span> or</span>
                  </div>
                  <ul className="btn-login list_none text-center">
                    <li>
                      <ReactFacebookLogin
                        buttonStyle={{
                          padding: 12,
                          fontSize: 12,
                          textAlign: 'center',
                          borderRadius: 5,
                        }}
                        appId="174051176589391"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={(response: ReactFacebookLoginInfo) => {
                          const data = {
                            provider: 'facebook',
                            token: response.accessToken,
                          }

                          const req = {
                            items: data,
                            onSuccess: (res: unknown) => {
                              if (res) {
                                window.location.href = window.location.origin
                              }
                            },
                          }

                          dispatch(socialLogin(req) as unknown as AnyAction)
                        }}
                        textButton={'Sign In with Facebook'}
                        icon={
                          <FaFacebookSquare
                            style={{
                              alignSelf: 'center',
                              marginRight: 10,
                              fontSize: 12,
                              marginTop: -5,
                            }}
                          />
                        }
                      />
                      {/* <a href='/' className='btn btn-facebook'>
												<i className='ion-social-facebook' />
												Facebook
											</a> */}
                    </li>
                    <li style={{ marginTop: '5px' }}>
                      <AppleLogin
                        clientId="com.bundleup.apple"
                        redirectURI="https://api-uat.bundleup.co/auth/social/apple"
                        scope={'name%20email'}
                        responseType={'code'}
                        responseMode={'form_post'}
                        designProp={{
                          height: 40,
                          width: 200,
                        }}
                      />
                    </li>
                  </ul>
                  <ul className="btn-login list_none text-center" style={{ marginTop: '10px' }}>
                    <li>
                      <GoogleLogin
                        clientId={GOOGLE_CLIENT_ID}
                        buttonText="Sign In with Google"
                        onSuccess={(response) => {
                          const data = {
                            provider: 'google-oauth2',
                            token: (response as GoogleLoginResponse).accessToken,
                          }

                          const req = {
                            items: data,
                          }
                          dispatch(socialLogin(req) as unknown as AnyAction)
                        }}
                        onFailure={(error) => {
                          setErrmsg(error)
                        }}
                        cookiePolicy={'single_host_origin'}
                      />
                    </li>
                  </ul>
                  <div className="form-note text-center">
                    Don't Have an Account? <Link to="/signup">Sign up now</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
