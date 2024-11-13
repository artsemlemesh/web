import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  getUserCart,
  deleteItemFromCart,
  cartCheckout,
  updateLocalCart,
} from '../../store/actions/product'
import { getItem } from '../../helpers/storage'
import { Dimmer, Loader } from 'semantic-ui-react'
import HeaderMenu from './HeaderMenu'
import Config from '../../config'
import logout from '../Common/LogOut'
import Toast from '../Common/Toast'
import CountDisplayAnimation from '../Common/CountDisplayAnimation'

function Header() {
  const dispatch = useDispatch()
  const carts = useSelector((state) => state.cart.carts)
  const { message, type } = useSelector((state) => state.toast)

  const [loader, setloader] = useState(false)
  const [isError, setError] = useState(false)

  const token = getItem('token')
  // const localCartData = getItem("localCartData");
  const localCartData = useSelector((state) => state.cart.localCart)

  const userData = getItem('authdata')
  const user = userData && JSON.parse(userData)

  const onDeleteCart = (id) => {
    if (token) {
      dispatch(deleteItemFromCart(id))
    } else {
      let newArray = JSON.parse(localCartData)
      if (newArray && newArray !== null) {
        let deleteLocalCart = []
        newArray.map((items) => {
          if (items.listing.id !== id) {
            deleteLocalCart.push(items)
          }
          // setItem("localCartData", JSON.stringify(deleteLocalCart));
          dispatch(updateLocalCart(deleteLocalCart))
        })
      }
    }
  }
  const Checkout = () => {
    let cartsData = localCartData
    if (cartsData) {
      cartsData = JSON.parse(cartsData)
      if (cartsData.length > 0) {
        let newArray = []
        cartsData.map((item) => {
          let obj = {
            listing_pk: item.listing.id,
          }
          newArray.push(obj)
        })
        let finalObj = {
          items: newArray,
        }

        let req = {
          cartData: finalObj,
          onSuccess: (res) => {
            window.location = `${Config.api_base_url}/checkout/?sessionId=${res.stripe_session_id}`
            // window.open(
            // `${Config.api_base_url}/checkout/?sessionId=${res.stripe_session_id}`
            // );
            setloader(false)
            setError(false)
          },
          onFail: () => {
            setError(true)
            setloader(false)
          },
        }
        dispatch(cartCheckout(req))
      }
    } else {
      if (carts && carts.length > 0) {
        setloader(true)
        let newArray = []
        carts.map((item) => {
          let obj = {
            listing_pk: item.listing.id,
          }
          newArray.push(obj)
        })
        let finalObj = {
          items: newArray,
        }

        let req = {
          cartData: finalObj,
          onSuccess: (res) => {
            // window.location = `${settings.API_BASE_URL}/checkout/?sessionId=${res.stripe_session_id}`;
            window.open(`${Config.api_base_url}/checkout/?sessionId=${res.stripe_session_id}`)
            setloader(false)
            setError(false)
          },
          onFail: () => {
            setError(true)
            setloader(false)
          },
        }
        dispatch(cartCheckout(req))
      }
    }
  }

  useEffect(() => {
    if (token) {
      dispatch(getUserCart())
    }
  }, [])

  const cart = useSelector((state) => state.cart.carts)
  let cartData = []
  if (token && cart) {
    cartData = cart
  } else {
    cartData = localCartData ? JSON.parse(localCartData) : []
  }

  // const totalPrice = cartData.reduce(
  //   (total, listing) => parseFloat(total) + parseFloat(listing.listing.buyer_price),
  //   0,
  // )

  return (
    <header className="header_wrap fixed-top header_with_topbar">
      <div className="top-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                <div className="download_wrap">
                  <span className="mr-3">Have clothes to sell? Get the app!</span>
                  <ul className="icon_list text-center text-lg-left">
                    <li>
                      <a
                        href="https://apps.apple.com/us/app/bundleup-baby-clothing/id1535296301"
                        target="_blank"
                      >
                        <i className="fab fa-apple" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://play.google.com/store/apps/details?id=com.bundleup.android"
                        target="_blank"
                      >
                        <i className="fab fa-android" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="text-center text-md-right">
                <ul className="header_list">
                  <li className="dropdown cart_dropdown">
                    <a className="nav-link cart_trigger" href="cart" data-toggle="dropdown">
                      <i className="linearicons-cart" style={{ fontSize: 'large' }}></i>
                      <CountDisplayAnimation cartLength={cartData.length} />
                    </a>
                    <div className="cart_box dropdown-menu dropdown-menu-right">
                      <ul className="cart_list">
                        {cartData &&
                          cartData.length > 0 &&
                          cartData.map((item) => (
                            <li>
                              <Link className="item_remove" to={window.location}>
                                <i
                                  className="ion-close"
                                  onClick={() => onDeleteCart(item.listing.id)}
                                ></i>
                              </Link>
                              <Link to="/cart">
                                {/* {item.listing.title} */}
                                {item.listing &&
                                  item.listing.items &&
                                  item.listing.items.map(
                                    (listingItem, index) =>
                                      index == 0 && (
                                        <img
                                          src={listingItem.images[0].image_large}
                                          alt="cart_thumb1"
                                        />
                                      ),
                                  )}
                              </Link>
                              <span className="cart_quantity">
                                {' '}
                                1 x{' '}
                                <span className="cart_amount">
                                  {' '}
                                  <span className="price_symbole">$</span>
                                </span>
                                {/* {item.listing.buyer_price} */}
                              </span>
                            </li>
                          ))}
                      </ul>
                      <div className="cart_footer">
                        {cartData && cartData.length > 0 ? (
                          <p className="cart_total">
                            <strong>Subtotal:</strong>{' '}
                            <span className="cart_price">
                              {' '}
                              <span className="price_symbole">$</span>
                            </span>
                            {/* {totalPrice.toFixed(2)} */}
                          </p>
                        ) : (
                          <p className="cart_total">
                            <span className="cart_price">Your Cart is empty.</span>
                          </p>
                        )}
                        {cartData && cartData.length > 0 && (
                          <p className="cart_buttons">
                            <Link to="/cart" className="btn btn-fill-line rounded-0 view-cart">
                              View Cart
                            </Link>
                            {loader ? (
                              <Dimmer active>
                                <Loader size="tiny">Loading</Loader>
                              </Dimmer>
                            ) : (
                              <a
                                className="btn btn-fill-out rounded-0 checkout"
                                onClick={() => Checkout()}
                              >
                                Checkout
                              </a>
                            )}
                          </p>
                        )}
                      </div>
                      {isError && (
                        <div style={{ margin: 12, alignItems: 'center' }}>
                          <p>
                            <span
                              style={{
                                color: 'red',
                                fontSize: 12,
                                alignSelf: 'center',
                              }}
                            >
                              {'Something went wrong. Please try again later.'}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </li>

                  {user ? (
                    <li className="dropdown cart_dropdown">
                      <Link className="nav-link cart_trigger" to="/account">
                        <i className="ti-user" />
                        <span>
                          {`Hi, ${
                            user &&
                            user.first_name &&
                            user.first_name.slice(0, 1).toUpperCase() +
                              user.first_name.slice(1, user.first_name.length)
                          }`}
                        </span>
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link to="login">
                        <span>{`Login`}</span>
                      </Link>
                      &nbsp;&nbsp;|&nbsp;&nbsp;
                      <Link to="signup">
                        <span>{`Sign Up`}</span>
                      </Link>
                    </li>
                  )}

                  {user ? (
                    <li
                      onClick={() => {
                        logout(dispatch)
                      }}
                    >
                      <Link to="/login">
                        <i
                          className="icon-logout "
                          style={{ fontWeight: 'bold', fontSize: '14px' }}
                        />
                      </Link>
                    </li>
                  ) : (
                    <li></li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom_header dark_skin main_menu_uppercase">
        <div className="container">
          <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/">
              <img className="logo_light" src="assets/images/logo_light.png" alt="logo" />
              <img className="logo_dark" src="assets/images/logo_dark.png" alt="logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-expanded="false"
            >
              <span className="ion-android-menu"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarSupportedContent"
            >
              {/* {hiddenLinks ? <HeaderMenu /> : null} */}
              <HeaderMenu />
            </div>
          </nav>
        </div>
        <div className="container">{message && <Toast message={message} type={type} />}</div>
      </div>
    </header>
  )
}
export default Header
