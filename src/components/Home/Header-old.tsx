import { ReactElement, useState } from 'react'
import { type AnyAction } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/reducers'
import { deleteItemFromCart, cartCheckout, updateLocalCart } from '../../store/actions/product'
import { getItem, removeItem } from '../../helpers/storage'
import { Dimmer, Loader } from 'semantic-ui-react'
import HeaderMenu from '../Common/HeaderMenu'
import Config from '../../config'

export default (): ReactElement => {
  const dispatch = useDispatch()
  // const carts = useSelector((state) => state.cart.carts);
  const carts = useSelector((state: RootState) => state.cart.carts)
  // const carts = useSelector((state: RootState) => state.cart.carts);

  const [loader, setloader] = useState(false)
  const [isError, setError] = useState(false)

  const token = getItem('token')
  // const localCartData = getItem('localCartData');
  const localCartData = useSelector((state: RootState) => state.cart.localCart)

  const userData = getItem('authdata')
  const user = userData && JSON.parse(userData)

  const onDeleteCart = (id: string) => {
    if (token) {
      dispatch(deleteItemFromCart(id) as unknown as AnyAction)
    } else {
      const newArray: {
        listing: {
          id: string
        }
      }[] = localCartData && localCartData.length > 0 ? JSON.parse(localCartData) : []
      if (newArray && newArray !== null) {
        const deleteLocalCart: unknown[] = []
        newArray.map((items) => {
          if (items.listing.id !== id) {
            deleteLocalCart.push(items)
          }
          // setItem('localCartData', JSON.stringify(deleteLocalCart));
          dispatch(updateLocalCart(deleteLocalCart))
        })
      }
    }
  }

  const logOut = () => {
    removeItem('token')
    removeItem('authdata')
    removeItem('localCartData')
  }

  const Checkout = () => {
    if (carts && carts.length > 0) {
      setloader(true)
      const req = {
        onSuccess: (res: { stripe_session_id: string }) => {
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
      dispatch(cartCheckout(req) as unknown as AnyAction)
    }
  }

  const cart = useSelector((state: RootState) => state.cart.carts)
  const localCart = localCartData && localCartData.length > 0 ? JSON.parse(localCartData) : []
  // const cartData =  token ? cart: localCart;
  let cartData = []
  if (token && cart) {
    cartData = cart
  } else if (localCartData) {
    cartData = localCart
  }

  // const totalPrice = cartData.reduce(
  //   (total: number, listing: { listing: { buyer_price: string } }) =>
  //     total + parseFloat(listing.listing.buyer_price),
  //   0,
  // )

  return (
    <header className="header_wrap">
      <div className="top-header d-none d-md-block">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-8">
              <div className="header_topbar_info">
                <div className="header_offer">
                  <span>Start Selling</span>
                </div>
                <div className="download_wrap">
                  <span className="mr-3">Download on iOS and Android</span>
                  <ul className="icon_list text-center text-lg-left">
                    <li>
                      <a href="https://apps.apple.com/us/app/bundleup-baby-clothing/id1535296301">
                        <i className="fab fa-apple" />
                      </a>
                    </li>
                    <li>
                      <a href="https://play.google.com/store/apps/details?id=com.bundleup.android">
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
                  {user ? (
                    <li>
                      <a>
                        <i className="ti-user" />
                        <span>
                          {`Hi, ${
                            user &&
                            user.first_name &&
                            user.first_name.slice(0, 1).toUpperCase() +
                              user.first_name.slice(1, user.first_name.length)
                          }`}
                        </span>
                      </a>
                    </li>
                  ) : (
                    <li>
                      <a href="login">
                        <i className="ti-user" />
                        <span>{`Login`}</span>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="middle-header dark_skin">
        <div className="container">
          <div className="nav_block">
            <a className="navbar-brand" href="">
              <img className="logo_light" src="assets/images/logo_light.png" alt="logo" />
              <img className="logo_dark" src="assets/images/logo_dark.png" alt="logo" />
            </a>
            <div className="product_search_form">
              <form>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="custom_select">
                      <select className="first_null">
                        <option value="">All Category</option>
                        <option value="Dresses">Dresses</option>
                        <option value="Shirt-Tops">Shirt & Tops</option>
                        <option value="T-Shirt">T-Shirt</option>
                        <option value="Pents">Pents</option>
                        <option value="Jeans">Jeans</option>
                      </select>
                    </div>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Search Product..."
                    required={false}
                    type="text"
                  />
                  <button type="submit" className="search_btn">
                    <i className="linearicons-magnifier" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom_header light_skin main_menu_uppercase bg_dark mb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6 col-3">
              <div className="categories_wrap">
                <button
                  type="button"
                  data-toggle="collapse"
                  data-target="#navCatContent"
                  aria-expanded="false"
                  className="categories_btn"
                >
                  <i className="linearicons-menu" />
                  <span>All Categories </span>
                </button>
                <div id="navCatContent" className="nav_cat navbar collapse">
                  <ul>
                    <li className="dropdown dropdown-mega-menu">
                      <a
                        className="dropdown-item nav-link dropdown-toggler"
                        href="/"
                        data-toggle="dropdown"
                      >
                        <i className="flaticon-woman" /> <span>Woman&apos;s</span>
                      </a>
                      <div className="dropdown-menu">
                        <ul className="mega-menu d-lg-flex">
                          <li className="mega-menu-col col-lg-7">
                            <ul className="d-lg-flex">
                              <li className="mega-menu-col col-lg-6">
                                <ul>
                                  <li className="dropdown-header">Featured Item</li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Vestibulum sed
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Donec porttitor
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Donec vitae facilisis
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Curabitur tempus
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Vivamus in tortor
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Donec vitae ante ante
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Etiam ac rutrum
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Quisque condimentum
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li className="mega-menu-col col-lg-6">
                                <ul>
                                  <li className="dropdown-header">Popular Item</li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Curabitur laoreet
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Vivamus in tortor
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Donec vitae facilisis
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Quisque condimentum
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Etiam ac rutrum
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Donec vitae ante ante
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Donec porttitor
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Curabitur tempus
                                    </a>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-menu-col col-lg-5">
                            <div className="header-banner2">
                              <img src="assets/images/menu_banner1.jpg" alt="menu_banner1" />
                              <div className="banne_info">
                                <h6>10% Off</h6>
                                <h4>New Arrival</h4>
                                <a href="/">Shop now</a>
                              </div>
                            </div>
                            <div className="header-banner2">
                              <img src="assets/images/menu_banner2.jpg" alt="menu_banner2" />
                              <div className="banne_info">
                                <h6>15% Off</h6>
                                <h4>Men&apos;s Fashion</h4>
                                <a href="/">Shop now</a>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="dropdown dropdown-mega-menu">
                      <a
                        className="dropdown-item nav-link dropdown-toggler"
                        href="/"
                        data-toggle="dropdown"
                      >
                        <i className="flaticon-boss" /> <span>Men&apos;s</span>
                      </a>
                      <div className="dropdown-menu">
                        <ul className="mega-menu d-lg-flex">
                          <li className="mega-menu-col col-lg-7">
                            <ul className="d-lg-flex">
                              <li className="mega-menu-col col-lg-6">
                                <ul>
                                  <li className="dropdown-header">Featured Item</li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Vestibulum sed
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Donec porttitor
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Donec vitae facilisis
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Curabitur tempus
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Vivamus in tortor
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Donec vitae ante ante
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Etiam ac rutrum
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li className="mega-menu-col col-lg-6">
                                <ul>
                                  <li className="dropdown-header">Popular Item</li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Curabitur laoreet
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Vivamus in tortor
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Donec vitae facilisis
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Quisque condimentum
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Etiam ac rutrum
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Donec vitae ante ante
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Donec porttitor
                                    </a>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-menu-col col-lg-5">
                            <div className="header-banner2">
                              <a href="/">
                                <img src="assets/images/menu_banner4.jpg" alt="menu_banner4" />
                              </a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="dropdown dropdown-mega-menu">
                      <a
                        className="dropdown-item nav-link dropdown-toggler"
                        href="/"
                        data-toggle="dropdown"
                      >
                        <i className="flaticon-friendship" /> <span>Kid&apos;s</span>
                      </a>
                      <div className="dropdown-menu">
                        <ul className="mega-menu d-lg-flex">
                          <li className="mega-menu-col col-lg-7">
                            <ul className="d-lg-flex">
                              <li className="mega-menu-col col-lg-6">
                                <ul>
                                  <li className="dropdown-header">Featured Item</li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Vestibulum sed
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Donec porttitor
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Donec vitae facilisis
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Curabitur tempus
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Vivamus in tortor
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Donec vitae ante ante
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Etiam ac rutrum
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li className="mega-menu-col col-lg-6">
                                <ul>
                                  <li className="dropdown-header">Popular Item</li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Curabitur laoreet
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Vivamus in tortor
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Donec vitae facilisis
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Quisque condimentum
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Etiam ac rutrum
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Donec vitae ante ante
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item nav-link nav_item" href="/">
                                      Donec porttitor
                                    </a>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-menu-col col-lg-5">
                            <div className="header-banner2">
                              <a href="/">
                                <img src="assets/images/menu_banner5.jpg" alt="menu_banner5" />
                              </a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="dropdown dropdown-mega-menu">
                      <a
                        className="dropdown-item nav-link dropdown-toggler"
                        href="/"
                        data-toggle="dropdown"
                      >
                        <i className="flaticon-sunglasses" /> <span>Accessories</span>
                      </a>
                      <div className="dropdown-menu">
                        <ul className="mega-menu d-lg-flex">
                          <li className="mega-menu-col col-lg-4">
                            <ul>
                              <li className="dropdown-header">Woman&apos;s</li>
                              <li>
                                <a
                                  className="dropdown-item nav-link nav_item"
                                  href="shop-list-left-sidebar.html"
                                >
                                  Vestibulum sed
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item nav-link nav_item"
                                  href="shop-left-sidebar.html"
                                >
                                  Donec porttitor
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item nav-link nav_item"
                                  href="shop-right-sidebar.html"
                                >
                                  Donec vitae facilisis
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item nav-link nav_item"
                                  href="shop-list.html"
                                >
                                  Curabitur tempus
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item nav-link nav_item"
                                  href="shop-load-more.html"
                                >
                                  Vivamus in tortor
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-menu-col col-lg-4">
                            <ul>
                              <li className="dropdown-header">Men&apos;s</li>
                              <li>
                                <a className="dropdown-item nav-link nav_item" href="cart">
                                  Donec vitae ante ante
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item nav-link nav_item" href="checkout.html">
                                  Etiam ac rutrum
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item nav-link nav_item" href="wishlist.html">
                                  Quisque condimentum
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item nav-link nav_item" href="compare.html">
                                  Curabitur laoreet
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item nav-link nav_item"
                                  href="order-complete"
                                >
                                  Vivamus in tortor
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-menu-col col-lg-4">
                            <ul>
                              <li className="dropdown-header">Kid&apos;s</li>
                              <li>
                                <a
                                  className="dropdown-item nav-link nav_item"
                                  href="shop-product-detail.html"
                                >
                                  Donec vitae facilisis
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item nav-link nav_item"
                                  href="shop-product-detail-left-sidebar.html"
                                >
                                  Quisque condimentum
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item nav-link nav_item"
                                  href="shop-product-detail-right-sidebar.html"
                                >
                                  Etiam ac rutrum
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item nav-link nav_item"
                                  href="shop-product-detail-thumbnails-left.html"
                                >
                                  Donec vitae ante ante
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item nav-link nav_item"
                                  href="shop-product-detail-thumbnails-left.html"
                                >
                                  Donec porttitor
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a className="dropdown-item nav-link nav_item" href="coming-soon.html">
                        <i className="flaticon-jacket" /> <span>Clothing</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item nav-link nav_item" href="404.html">
                        <i className="flaticon-sneakers" /> <span>Shoes</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item nav-link nav_item" href="login">
                        <i className="flaticon-watch" /> <span>Watches</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item nav-link nav_item" href="register.html">
                        <i className="flaticon-necklace" /> <span>Jewellery</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item nav-link nav_item" href="coming-soon.html">
                        <i className="flaticon-herbal" /> <span>Health & Beauty</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item nav-link nav_item" href="404.html">
                        <i className="flaticon-ball" /> <span>Sports</span>
                      </a>
                    </li>
                    <li>
                      <ul className="more_slide_open">
                        <li>
                          <a className="dropdown-item nav-link nav_item" href="login">
                            <i className="flaticon-pijamas" /> <span>Sleepwear</span>
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item nav-link nav_item" href="register.html">
                            <i className="flaticon-scarf" /> <span>Seasonal Wear</span>
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item nav-link nav_item" href="404.html">
                            <i className="flaticon-vintage" /> <span>Ethinic Wear</span>
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item nav-link nav_item" href="coming-soon.html">
                            <i className="flaticon-pregnant" /> <span>Baby Clothing</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <div className="more_categories">More Categories</div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-8 col-sm-6 col-9">
              <nav className="navbar navbar-expand-lg">
                <button
                  className="navbar-toggler side_navbar_toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSidetoggle"
                  aria-expanded="false"
                >
                  <span className="ion-android-menu" />
                </button>
                <div className="collapse navbar-collapse mobile_side_menu" id="navbarSidetoggle">
                  <HeaderMenu />
                </div>
                <ul className="navbar-nav attr-nav align-items-center">
                  {user && (
                    <li className="dropdown cart_dropdown">
                      <a className="nav-link cart_trigger" data-toggle="dropdown">
                        <i className="linearicons-user" />
                      </a>
                      <div className="cart_box dropdown-menu dropdown-menu-right">
                        <ul className="cart_list">
                          <li className="cart_buttons">
                            <a>My Profile</a>
                          </li>
                          <li>
                            <a className="item_remove">
                              <span className="price_symbole" style={{ color: 'white' }}>
                                {user &&
                                  user.first_name &&
                                  user.first_name.slice(0, 1).toUpperCase() +
                                    user.first_name.slice(1, user.first_name.length)}
                              </span>
                            </a>
                            <a href="">First Name:</a>
                          </li>
                          <li>
                            <a className="item_remove">
                              <span className="price_symbole" style={{ color: 'white' }}>
                                {user &&
                                  user.last_name &&
                                  user.last_name.slice(0, 1).toUpperCase() +
                                    user.last_name.slice(1, user.last_name.length)}
                              </span>
                            </a>
                            <a href="">Last Name:</a>
                          </li>
                          <li>
                            <a className="item_remove">
                              <span className="price_symbole" style={{ color: 'white' }}>
                                {user && user.email && user.email}
                              </span>
                            </a>
                            <a href="">Email Address :</a>
                          </li>
                        </ul>
                        <div className="cart_footer">
                          <p className="cart_buttons">
                            <a href="/account" className="btn btn-fill-line rounded-0 view-cart">
                              My Account
                            </a>
                            <a
                              href=""
                              onClick={() => logOut()}
                              className="btn btn-fill-out rounded-0 checkout"
                            >
                              Logout
                            </a>
                          </p>
                        </div>
                      </div>
                    </li>
                  )}

                  <li className="dropdown cart_dropdown">
                    <a className="nav-link cart_trigger" href="cart" data-toggle="dropdown">
                      <i className="linearicons-cart" />
                      <span className="cart_count">{cartData.length}</span>
                    </a>
                    <div className="cart_box dropdown-menu dropdown-menu-right">
                      <ul className="cart_list">
                        {cartData &&
                          cartData.length > 0 &&
                          cartData.map((item: any) => (
                            <li>
                              <a className="item_remove" href="">
                                <i
                                  className="ion-close"
                                  onClick={() => onDeleteCart(item.listing.id)}
                                />
                              </a>
                              <a href="">
                                {item.listing &&
                                  item.listing.items &&
                                  item.listing.items.map(
                                    (item: any, index: any) =>
                                      index == 0 && (
                                        <img src={item.front_image_large} alt="cart_thumb1" />
                                      ),
                                  )}
                                {/* {item.listing.title} */}
                              </a>
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
                          <p className="cart_buttons">
                            <span className="cart_buttons">
                              {' '}
                              <span className="price_symbole" style={{ color: 'white' }}>
                                Your Cart is empty.
                              </span>
                            </span>
                          </p>
                        )}
                        {cartData && cartData.length > 0 && (
                          <p className="cart_buttons">
                            <a href="/cart" className="btn btn-fill-line rounded-0 view-cart">
                              View Cart
                            </a>

                            {loader ? (
                              <Dimmer active>
                                <Loader size="tiny">Loading</Loader>
                              </Dimmer>
                            ) : token ? (
                              <a
                                onClick={() => Checkout()}
                                className="btn btn-fill-out rounded-0 checkout"
                              >
                                Checkout
                              </a>
                            ) : (
                              <a href={'/login'} className="btn btn-fill-out rounded-0 checkout">
                                Checkout
                              </a>
                            )}
                          </p>
                        )}
                      </div>
                      {isError && (
                        <div className="cart_buttons" style={{ marginTop: 12 }}>
                          <span style={{ color: 'red', fontSize: 12 }}>
                            {'Something went wrong. Please try again later.'}
                          </span>
                        </div>
                      )}
                    </div>
                  </li>
                </ul>
                <div className="pr_search_icon">
                  <a href="/" className="nav-link pr_search_trigger">
                    <i className="linearicons-magnifier" />
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
