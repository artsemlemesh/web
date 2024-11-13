import { ReactElement, SyntheticEvent, useState } from 'react'
import { type AnyAction } from 'redux'
import { useDispatch } from 'react-redux'
import { validateOTP } from '../../store/actions/validate'
export interface SingupData {
  email: string
  code: string
}

export default (): ReactElement => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState<SingupData>({
    email: '',
    code: '',
  })
  const [errorMsg, setErrorMsg] = useState<string>()

  const handleChange = (event: SyntheticEvent<EventTarget>) => {
    setFormData({
      ...formData,
      [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
    })
  }

  const onSubmit = () => {
    const data = {
      email: formData.email,
      code: formData.code,
    }

    if (!formData.email) {
      setErrorMsg('Email is required!')
    } else if (!formData.code) {
      setErrorMsg('Code is required!')
    } else {
      setErrorMsg('')
      dispatch(
        validateOTP({
          item: data,
          onSuccess: (res: unknown) => {
            if (res) {
              setErrorMsg('Successfully registered!')
              window.location.href = '/login'
            }
          },
          onFail: (err: { email: string[]; code: string[]; non_field_errors: string[] }) => {
            if (err.email) {
              setErrorMsg(err.email[0] + '!')
            } else if (err.code) {
              setErrorMsg(err.code[0] + '!')
            } else if (err.non_field_errors) {
              setErrorMsg(err.non_field_errors[0])
            } else {
              setErrorMsg('Something went wrong! Please try after some time.')
            }
          },
        }) as unknown as AnyAction,
      )
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
                    <h3>Validate Your Account</h3>
                  </div>

                  <p className="text-sm">
                    To complete your account setup, kindly enter the code sent to your email.
                  </p>
                  {/* <form method="post"> */}
                  <div className="form-group">
                    <div className="btn-login list_none text-center">
                      <li style={{ width: '47.79%' }}>
                        <input
                          type="text"
                          required
                          className="form-control text-center"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </li>
                    </div>
                    <div className="btn-login list_none text-center">
                      <li style={{ width: '47.79%' }}>
                        <input
                          maxLength={4}
                          required
                          className="form-control text-center text-monospace ls-xl"
                          name="code"
                          placeholder="Code"
                          value={formData.code}
                          onChange={handleChange}
                        />
                      </li>
                    </div>
                  </div>
                  {errorMsg && (
                    <div className="form-note text-center" style={{ padding: 15 }}>
                      <span style={{ color: 'red', paddingBottom: 15 }}>{errorMsg}</span>
                    </div>
                  )}
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-fill-out btn-block"
                      name="validate"
                      onClick={onSubmit}
                    >
                      Validate
                    </button>
                  </div>
                  {/* </form> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
