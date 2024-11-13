import { ReactElement, SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { type AnyAction } from 'redux'
import { useDispatch } from 'react-redux'
import { signupUser } from '../../store/actions/signup'
export interface SingupData {
  firstname: string
  lastname: string
  email: string
  password: string
  confirmpassword: string
  condition: string
}

export default (): ReactElement => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState<SingupData>({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    confirmpassword: '',
    condition: '',
  })
  const [condition, setCondition] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>()

  const handleChange = (event: SyntheticEvent<EventTarget>) => {
    setFormData({
      ...formData,
      [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
    })
  }

  const handleChangeCondition = () => {
    setCondition(true)
  }

  const onSubmit = () => {
    const data = {
      address_line_2: 'address2_tester',
      country: 'US',
      expo_push_token: 'token',
      is_google_calendar_synced: false,
      is_stripe_connected: false,
      email: formData.email,
      first_name: formData.firstname,
      last_name: formData.lastname,
      password: formData.password,
    }

    if (!formData.firstname) {
      setErrorMsg('First Name is required!')
    } else if (!formData.lastname) {
      setErrorMsg('Last Name is required!')
    } else if (!formData.email) {
      setErrorMsg('Email is required!')
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/.test(formData.email)) {
      setErrorMsg('Please enter correct email adress!')
    } else if (!formData.password) {
      setErrorMsg('Password is required!')
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(formData.password)
    ) {
      setErrorMsg(
        'Password is week. please enter one Capital letter, one number and one special character!',
      )
    } else if (!formData.confirmpassword) {
      setErrorMsg('Confrim password is required!')
    } else if (formData.password !== formData.confirmpassword) {
      setErrorMsg('Password & Confrim password is not matched!')
    } else if (!condition) {
      setErrorMsg('Please accept the term and policy!')
    } else {
      setErrorMsg('')
      dispatch(
        signupUser({
          item: data,
          onSuccess: (res: unknown) => {
            if (res) {
              setErrorMsg('Email verification code has been sent.')
              window.location.href = '/validate-otp'
            }
          },
          onFail: (err: { email: string[] }) => {
            if (err.email) {
              setErrorMsg(err.email[0] + '!')
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
                    <h3>Create an Account</h3>
                  </div>
                  {/* <form method="post"> */}
                  <div className="form-group">
                    <div className="btn-login list_none text-center">
                      <li style={{ width: '47.79%' }}>
                        <input
                          type="text"
                          required
                          className="form-control"
                          name="firstname"
                          placeholder="First Name"
                          value={formData.firstname}
                          onChange={handleChange}
                        />
                      </li>
                      <li style={{ width: '47.79%' }}>
                        <input
                          type="text"
                          required
                          className="form-control"
                          name="lastname"
                          placeholder="Last Name"
                          value={formData.lastname}
                          onChange={handleChange}
                        />
                      </li>
                    </div>
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
                  <div className="form-group">
                    <input
                      className="form-control"
                      required
                      type="password"
                      name="confirmpassword"
                      placeholder="Confirm Password"
                      value={formData.confirmpassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="login_footer form-group">
                    <div className="chek-form">
                      <div className="custome-checkbox">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="condition"
                          id="exampleCheckbox1"
                          value={formData.condition}
                          onChange={handleChangeCondition}
                        />
                        <label className="form-check-label" htmlFor="exampleCheckbox1">
                          <span>I agree to terms &amp; policy.</span>
                        </label>
                      </div>
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
                      name="login"
                      onClick={onSubmit}
                    >
                      Register
                    </button>
                  </div>
                  {/* </form> */}
                  <div className="different_login">
                    <span> or</span>
                  </div>
                  <ul className="btn-login list_none text-center">
                    <li>
                      <Link to="/" className="btn btn-facebook">
                        <i className="ion-social-facebook" />
                        Facebook
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="btn btn-google">
                        <i className="ion-social-googleplus" />
                        Google
                      </Link>
                    </li>
                  </ul>
                  <div className="form-note text-center">
                    Already have an account? <Link to="/login">Log in</Link>
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
