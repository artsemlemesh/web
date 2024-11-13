import { ReactElement, SyntheticEvent, useState } from 'react'
import { type AnyAction } from 'redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { forgotUser } from '../../store/actions/forgot'

export interface ForgotData {
  email: string
}

export default (): ReactElement => {
  const dispatch = useDispatch()
  const [errMsg, setErrmsg] = useState<string>(' ')
  const [formData, setFormData] = useState<ForgotData>({
    email: '',
  })

  const handleChange = (event: SyntheticEvent<EventTarget>) =>
    setFormData({
      ...formData,
      [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
    })

  const forgotReq = () => {
    if (!formData.email) {
      setErrmsg('Please enter your email address!')
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/.test(formData.email)) {
      setErrmsg('Please enter correct email address!')
    } else {
      const req = {
        data: formData,
        onSuccess: (res: string) => {
          setErrmsg(res)
        },
        onFail: (err: string) => {
          setErrmsg(err)
        },
      }
      dispatch(forgotUser(req) as unknown as AnyAction)
    }
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
                    <h3>Forgot Password</h3>
                  </div>
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

                  {errMsg && (
                    <div className="form-group">
                      <div className="form-note text-center">
                        <span style={{ color: 'red' }}>{errMsg}</span>
                      </div>
                    </div>
                  )}

                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-fill-out btn-block"
                      name="login"
                      onClick={forgotReq}
                    >
                      Confirm
                    </button>
                  </div>

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
