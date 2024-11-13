import { ReactElement, SyntheticEvent, useState } from 'react'
import { type AnyAction } from 'redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { resetPassword } from '../../store/actions/reset'

export interface ResetPasswordData {
  new_password: string
  confirm_password: string
}

export default (): ReactElement => {
  const dispatch = useDispatch()
  const [errorMsg, setErrorMsg] = useState<string>()
  const [formData, setFormData] = useState<ResetPasswordData>({
    new_password: '',
    confirm_password: '',
  })
  const { uid, token } = useParams<{ uid: string; token: string }>()

  const handleChange = (event: SyntheticEvent<EventTarget>) =>
    setFormData({
      ...formData,
      [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
    })

  const resetReq = () => {
    if (!formData.new_password) {
      setErrorMsg('Password is required!')
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(formData.new_password)
    ) {
      setErrorMsg(
        'Password is weak. please enter one Capital letter, one number and one special character!',
      )
    } else if (!formData.confirm_password) {
      setErrorMsg('Confrim password is required!')
    } else if (formData.confirm_password !== formData.new_password) {
      setErrorMsg('Password & Confrim password is not matched!')
    } else {
      const req = {
        data: formData,
        onSuccess: (res: string) => {
          setErrorMsg(res)
          window.location.href = '/login'
        },
        onFail: (err: string) => {
          setErrorMsg(err)
        },
      }
      dispatch(resetPassword(req, uid, token) as unknown as AnyAction)
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
                    <h3>Reset Password</h3>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      required
                      className="form-control"
                      name="new_password"
                      placeholder="New Password"
                      value={formData.new_password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      required
                      className="form-control"
                      name="confirm_password"
                      placeholder="Confirm Password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                    />
                  </div>

                  {errorMsg && (
                    <div className="form-group">
                      <div className="form-note text-center">
                        <span style={{ color: 'red' }}>{errorMsg}</span>
                      </div>
                    </div>
                  )}

                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-fill-out btn-block"
                      name="login"
                      onClick={resetReq}
                    >
                      Reset
                    </button>
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
