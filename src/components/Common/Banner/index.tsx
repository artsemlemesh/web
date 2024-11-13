import { ReactElement, useEffect, useState } from 'react'
import { type AnyAction } from 'redux'
import { Header, Grid, Container, Icon } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'

import { GoogleLogin, GoogleLoginResponse } from 'react-google-login'
import ReactFacebookLogin, {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from 'react-facebook-login'
import { socialLogin } from '../../../store/actions/login'
import { createButton, GoogleLoginButton } from 'react-social-login-buttons'
import { FaFacebookSquare } from '@react-icons/all-files/fa/FaFacebookSquare'
import AppleLogin from 'react-apple-login'
import { Link, Redirect } from 'react-router-dom'
import { getItem } from '../../../helpers/storage'
import consoleHelper from '../../../helpers/ConsoleHelper'
import { RootState } from '../../../store/reducers'
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || ''

export default (): ReactElement => {
  const dispatch = useDispatch()
  const [, setErrmsg] = useState<string>()
  const [token, setToken] = useState<string>('')
  const tokenLoaded = useSelector((state: RootState) => state.user.tokenLoaded)
  useEffect(() => {
    const tokenGet = getItem('token') as string
    setToken(tokenGet?.toString())
  }, [tokenLoaded])
  const config = {
    text: 'Sign Up with Email',
    icon: () => <Icon name="mail" />,
    // iconFormat: name => `fa fa-${name}`,
    style: { background: '#846BE2', align: 'center' },
    activeStyle: { background: '#957CF3' },
  }
  /** My Facebook login button. */
  const EmailSignUp = createButton(config)

  const responseFacebook = (response: ReactFacebookLoginInfo) => {
    const data = {
      provider: 'facebook',
      token: response.accessToken,
    }
    dispatch(
      socialLogin({
        items: data,
      }) as unknown as AnyAction,
    )
  }
  const failureFacebook = (res: ReactFacebookFailureResponse) => {
    consoleHelper('fail', res)
  }

  if (token) {
    return <Redirect to="/shop" />
  }

  return (
    <Grid textAlign="center" className={'landing-image landing-container'} verticalAlign="middle">
      <Grid.Column mobile={16} tablet={8} computer={6}>
        <Container>
          <Grid textAlign="center" style={{ height: '80%' }} verticalAlign="middle">
            <Grid.Column className={'home-buttons'}>
              <Container>
                <Header as="h1" inverted color="grey">
                  Buy & Sell Baby Clothing Bundles
                </Header>
              </Container>
              <Container style={{ marginBottom: '15px' }}>
                <Header as="h3" inverted color="grey">
                  Sign up to join the #1 marketplace for baby, toddler, and kids' clothing by the
                  bundle.
                </Header>
              </Container>
              <Container>
                {/* <FacebookLoginButton
									style={{ borderRadius: '6px' }}
									align='center'
									onClick={() => alert('Hello')}>
									<span>Continue with Facebook</span>
								</FacebookLoginButton> */}

                <ReactFacebookLogin
                  buttonStyle={{
                    padding: 13,
                    fontSize: 15,
                    textAlign: 'center',
                    borderRadius: 5,
                    display: 'block',
                    width: '99%',
                  }}
                  appId="174051176589391"
                  autoLoad={false}
                  fields="name,email,picture"
                  icon={
                    <FaFacebookSquare
                      style={{
                        alignSelf: 'center',
                        marginRight: 25,
                        fontSize: 25,
                        marginTop: -5,
                      }}
                    />
                  }
                  callback={responseFacebook}
                  onFailure={failureFacebook}
                  textButton={'Continue with Facebook'}
                />
              </Container>
              <Container>
                {/* <GoogleLoginButton
									style={{ borderRadius: '6px' }}
									align='center'
									onClick={() => alert('Hello')}>
									<span>Continue with Google</span>
								</GoogleLoginButton> */}

                <GoogleLogin
                  clientId={GOOGLE_CLIENT_ID}
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
                  icon={false}
                  render={(renderProps) => (
                    <GoogleLoginButton
                      style={{ borderRadius: '6px' }}
                      align="center"
                      onClick={renderProps.onClick}
                    >
                      <span>Continue with Google</span>
                    </GoogleLoginButton>
                  )}
                ></GoogleLogin>
              </Container>
              <Container>
                <Link to="/signup">
                  <EmailSignUp
                    style={{ borderRadius: '6px' }}
                    align="center"
                    onClick={() => 'signup'}
                  />
                </Link>
              </Container>
              <Container>
                <button
                  style={{
                    backgroundColor: 'black',
                    width: '99%',
                    borderRadius: '6px',
                    borderColor: 'black',
                  }}
                >
                  <AppleLogin
                    clientId="com.bundleup.apple"
                    redirectURI="https://api-uat.bundleup.co/auth/social/apple"
                    scope={'name%20email'}
                    responseType={'code'}
                    responseMode={'form_post'}
                    designProp={{
                      height: 50,
                      width: 375,
                    }}
                  />
                </button>
              </Container>
            </Grid.Column>
          </Grid>
        </Container>
      </Grid.Column>
      <Grid.Column tablet={8} computer={8}></Grid.Column>
    </Grid>
  )
}
