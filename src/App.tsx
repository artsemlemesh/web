import { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import ValidateOTP from './components/ValidateOTP'

import Contact from './components/Contact'
import Shop from './components/Shop'
import ShopDetails from './components/ShopDetails'
import OrderComplete from './components/OrderComplete'
import MyAccount from './components/MyAccount'
import Faq from './components/Faq'
import Cart from './components/Cart'
import About from './components/About'
import Terms from './components/Terms'
import Sell from './components/Sell'
import Auth from './components/Auth'
import Apple from './components/Apple'
import Error from './components/Error'
import ForgotPassword from './components/Forgot'
import ResetPassword from './components/Reset'
import Analytics from './utils/Analytics'
import OrderDetails from './components/OrderDetails'

export default () => {
  useEffect(() => {
    try {
      Analytics.initialize()
      Analytics.ready(() => Analytics.track('App Opened'))
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* <Route path="/" component={MainPage} /> */}

          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/validate-otp" exact component={ValidateOTP} />
          <Route path="/forgot-password" exact component={ForgotPassword} />
          <Route path="/reset-password/:uid/:token" exact component={ResetPassword} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/category/:slug" component={Shop} />
          <Route path="/gender/:slug" component={Shop} />
          <Route path="/brand/:slug" component={Shop} />
          <Route path="/size/:slug" component={Shop} />

          <Route path="/listing/:id/:slug" component={ShopDetails} />

          <Route path="/order-complete" exact component={OrderComplete} />

          <Route path="/account" exact component={MyAccount} />
          <Route path="/faq" exact component={Faq} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/about" exact component={About} />
          <Route path="/terms" exact component={Terms} />
          <Route path="/sell" exact component={Sell} />
          <Route path="/orderDetails" exact component={OrderDetails} />

          <Route path="/auth/verify/:uid/:token" exact component={Auth} />

          <Route path="/social/apple" exact component={Apple} />
          <Route path="/error" exact component={Error} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
