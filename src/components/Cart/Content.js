import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  deleteItemFromCart,
  getUserCart,
  updateLocalCart,
  cartCheckout,
} from '../../store/actions/product'
import { getItem } from '../../helpers/storage'
import { Dimmer, Loader } from 'semantic-ui-react'
import Config from '../../config'
import { Link } from 'react-router-dom'

function Content() {
  const dispatch = useDispatch()

  const carts = useSelector((state) => state.cart.carts)
  const [loader, setloader] = useState(false)
  const [isError, setError] = useState(false)

  const token = getItem('token')
  // const localCartData = getItem('localCartData');
  const localCartData = useSelector((state) => state.cart.localCart)
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
          // setItem('localCartData', JSON.stringify(deleteLocalCart));
          dispatch(updateLocalCart(deleteLocalCart))
        })
      }
    }
  }

  const Checkout = () => {
    // let cartsData = getItem("localCartData");
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
            // 	`${Config.api_base_url}/checkout/?sessionId=${res.stripe_session_id}`
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
    } else if (carts && carts.length > 0) {
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

  const formatPricing = (price) => {
    try {
      if (typeof price == 'string') {
        price = Number.parseFloat(price)
      }
      return price.toFixed(2)
    } catch (e) {
      return 'NA'
    }
  }

  useEffect(() => {
    if (token) {
      dispatch(getUserCart())
    }
  }, [])

  // const token = getItem("token");
  // const localCartData = getItem("localCartData");

  const cart = useSelector((state) => state.cart.carts)
  const cartData = token ? cart : JSON.parse(localCartData)

  // const totalPrice = cartData.reduce(
  //   (total, listing) => parseFloat(total) + parseFloat(listing.listing.buyer_price),
  //   0,
  // )

  return (
    <div className="order_complete">
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="table-responsive shop_cart_table">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="product-thumbnail">Product Image</th>
                      <th className="product-name">Product</th>
                      <th className="product-price">Price</th>
                      {/* <th className="product-quantity">Quantity</th> */}
                      <th className="product-subtotal">Total</th>
                      <th className="product-remove">Remove</th>
                    </tr>
                  </thead>
                  {cartData && cartData.length > 0 ? (
                    <tbody>
                      {cartData.map((item) => (
                        <tr>
                          <td className="product-thumbnail">
                            <Link to="#">
                              {item.listing.items.map(
                                (listingItem, index) =>
                                  index == 0 && (
                                    <img src={listingItem.images[0].image_large} alt="product1" />
                                  ),
                              )}
                            </Link>
                          </td>
                          <td className="product-name" data-title="Product">
                            {/* <a href="#">{item.listing.title}</a> */}
                          </td>
                          <td className="product-price" data-title="Price">
                            {/* {formatPricing(item.listing.buyer_price)} */}
                          </td>
                          {/* <td className="product-quantity" data-title="Quantity">
                        <div className="quantity">
                          <input type="button" value="-" className="minus" />
                          <input
                            type="text"
                            name="quantity"
                            value="2"
                            title="Qty"
                            className="qty"
                            size="4"
                          />
                          <input type="button" value="+" className="plus" />
                        </div>
                      </td> */}
                          <td className="product-subtotal" data-title="Total">
                            {/* {formatPricing(item.listing.buyer_price)} */}
                          </td>
                          <td className="product-remove" data-title="Remove">
                            <Link to="/cart">
                              <i
                                className="ti-close"
                                onClick={() => onDeleteCart(item.listing.id)}
                              ></i>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <tbody>
                      <p>Your cart is empty.</p>
                    </tbody>
                  )}
                  <tfoot>
                    <tr>
                      <td colspan="6" className="px-0">
                        <div className="row no-gutters align-items-center">
                          <div className="col-lg-4 col-md-6 mb-3 mb-md-0">
                            <div className="coupon field_form input-group">
                              <input
                                type="text"
                                value=""
                                className="form-control form-control-sm"
                                placeholder="Enter Coupon Code.."
                              />
                              <div className="input-group-append">
                                <button className="btn btn-fill-out btn-sm" type="submit">
                                  Apply Coupon
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-6 text-left text-md-right">
                            <button className="btn btn-line-fill btn-sm" type="submit">
                              Update Cart
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="medium_divider"></div>
              <div className="divider center_icon">
                <i className="ti-shopping-cart-full"></i>
              </div>
              <div className="medium_divider"></div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="heading_s1 mb-3">
                <h6>Calculate Shipping</h6>
              </div>
              <form className="field_form shipping_calculator">
                <div className="form-row">
                  <div className="form-group col-lg-12">
                    <div className="custom_select">
                      <select className="form-control">
                        <option value="">Choose a option...</option>
                        <option value="AX">Aland Islands</option>
                        <option value="AF">Afghanistan</option>
                        <option value="AL">Albania</option>
                        <option value="DZ">Algeria</option>
                        <option value="AD">Andorra</option>
                        <option value="AO">Angola</option>
                        <option value="AI">Anguilla</option>
                        <option value="AQ">Antarctica</option>
                        <option value="AG">Antigua and Barbuda</option>
                        <option value="AR">Argentina</option>
                        <option value="AM">Armenia</option>
                        <option value="AW">Aruba</option>
                        <option value="AU">Australia</option>
                        <option value="AT">Austria</option>
                        <option value="AZ">Azerbaijan</option>
                        <option value="BS">Bahamas</option>
                        <option value="BH">Bahrain</option>
                        <option value="BD">Bangladesh</option>
                        <option value="BB">Barbados</option>
                        <option value="BY">Belarus</option>
                        <option value="PW">Belau</option>
                        <option value="BE">Belgium</option>
                        <option value="BZ">Belize</option>
                        <option value="BJ">Benin</option>
                        <option value="BM">Bermuda</option>
                        <option value="BT">Bhutan</option>
                        <option value="BO">Bolivia</option>
                        <option value="BQ">Bonaire, Saint Eustatius and Saba</option>
                        <option value="BA">Bosnia and Herzegovina</option>
                        <option value="BW">Botswana</option>
                        <option value="BV">Bouvet Island</option>
                        <option value="BR">Brazil</option>
                        <option value="IO">British Indian Ocean Territory</option>
                        <option value="VG">British Virgin Islands</option>
                        <option value="BN">Brunei</option>
                        <option value="BG">Bulgaria</option>
                        <option value="BF">Burkina Faso</option>
                        <option value="BI">Burundi</option>
                        <option value="KH">Cambodia</option>
                        <option value="CM">Cameroon</option>
                        <option value="CA">Canada</option>
                        <option value="CV">Cape Verde</option>
                        <option value="KY">Cayman Islands</option>
                        <option value="CF">Central African Republic</option>
                        <option value="TD">Chad</option>
                        <option value="CL">Chile</option>
                        <option value="CN">China</option>
                        <option value="CX">Christmas Island</option>
                        <option value="CC">Cocos (Keeling) Islands</option>
                        <option value="CO">Colombia</option>
                        <option value="KM">Comoros</option>
                        <option value="CG">Congo (Brazzaville)</option>
                        <option value="CD">Congo (Kinshasa)</option>
                        <option value="CK">Cook Islands</option>
                        <option value="CR">Costa Rica</option>
                        <option value="HR">Croatia</option>
                        <option value="CU">Cuba</option>
                        <option value="CW">CuraÇao</option>
                        <option value="CY">Cyprus</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="DK">Denmark</option>
                        <option value="DJ">Djibouti</option>
                        <option value="DM">Dominica</option>
                        <option value="DO">Dominican Republic</option>
                        <option value="EC">Ecuador</option>
                        <option value="EG">Egypt</option>
                        <option value="SV">El Salvador</option>
                        <option value="GQ">Equatorial Guinea</option>
                        <option value="ER">Eritrea</option>
                        <option value="EE">Estonia</option>
                        <option value="ET">Ethiopia</option>
                        <option value="FK">Falkland Islands</option>
                        <option value="FO">Faroe Islands</option>
                        <option value="FJ">Fiji</option>
                        <option value="FI">Finland</option>
                        <option value="FR">France</option>
                        <option value="GF">French Guiana</option>
                        <option value="PF">French Polynesia</option>
                        <option value="TF">French Southern Territories</option>
                        <option value="GA">Gabon</option>
                        <option value="GM">Gambia</option>
                        <option value="GE">Georgia</option>
                        <option value="DE">Germany</option>
                        <option value="GH">Ghana</option>
                        <option value="GI">Gibraltar</option>
                        <option value="GR">Greece</option>
                        <option value="GL">Greenland</option>
                        <option value="GD">Grenada</option>
                        <option value="GP">Guadeloupe</option>
                        <option value="GT">Guatemala</option>
                        <option value="GG">Guernsey</option>
                        <option value="GN">Guinea</option>
                        <option value="GW">Guinea-Bissau</option>
                        <option value="GY">Guyana</option>
                        <option value="HT">Haiti</option>
                        <option value="HM">Heard Island and McDonald Islands</option>
                        <option value="HN">Honduras</option>
                        <option value="HK">Hong Kong</option>
                        <option value="HU">Hungary</option>
                        <option value="IS">Iceland</option>
                        <option value="IN">India</option>
                        <option value="ID">Indonesia</option>
                        <option value="IR">Iran</option>
                        <option value="IQ">Iraq</option>
                        <option value="IM">Isle of Man</option>
                        <option value="IL">Israel</option>
                        <option value="IT">Italy</option>
                        <option value="CI">Ivory Coast</option>
                        <option value="JM">Jamaica</option>
                        <option value="JP">Japan</option>
                        <option value="JE">Jersey</option>
                        <option value="JO">Jordan</option>
                        <option value="KZ">Kazakhstan</option>
                        <option value="KE">Kenya</option>
                        <option value="KI">Kiribati</option>
                        <option value="KW">Kuwait</option>
                        <option value="KG">Kyrgyzstan</option>
                        <option value="LA">Laos</option>
                        <option value="LV">Latvia</option>
                        <option value="LB">Lebanon</option>
                        <option value="LS">Lesotho</option>
                        <option value="LR">Liberia</option>
                        <option value="LY">Libya</option>
                        <option value="LI">Liechtenstein</option>
                        <option value="LT">Lithuania</option>
                        <option value="LU">Luxembourg</option>
                        <option value="MO">Macao S.A.R., China</option>
                        <option value="MK">Macedonia</option>
                        <option value="MG">Madagascar</option>
                        <option value="MW">Malawi</option>
                        <option value="MY">Malaysia</option>
                        <option value="MV">Maldives</option>
                        <option value="ML">Mali</option>
                        <option value="MT">Malta</option>
                        <option value="MH">Marshall Islands</option>
                        <option value="MQ">Martinique</option>
                        <option value="MR">Mauritania</option>
                        <option value="MU">Mauritius</option>
                        <option value="YT">Mayotte</option>
                        <option value="MX">Mexico</option>
                        <option value="FM">Micronesia</option>
                        <option value="MD">Moldova</option>
                        <option value="MC">Monaco</option>
                        <option value="MN">Mongolia</option>
                        <option value="ME">Montenegro</option>
                        <option value="MS">Montserrat</option>
                        <option value="MA">Morocco</option>
                        <option value="MZ">Mozambique</option>
                        <option value="MM">Myanmar</option>
                        <option value="NA">Namibia</option>
                        <option value="NR">Nauru</option>
                        <option value="NP">Nepal</option>
                        <option value="NL">Netherlands</option>
                        <option value="AN">Netherlands Antilles</option>
                        <option value="NC">New Caledonia</option>
                        <option value="NZ">New Zealand</option>
                        <option value="NI">Nicaragua</option>
                        <option value="NE">Niger</option>
                        <option value="NG">Nigeria</option>
                        <option value="NU">Niue</option>
                        <option value="NF">Norfolk Island</option>
                        <option value="KP">North Korea</option>
                        <option value="NO">Norway</option>
                        <option value="OM">Oman</option>
                        <option value="PK">Pakistan</option>
                        <option value="PS">Palestinian Territory</option>
                        <option value="PA">Panama</option>
                        <option value="PG">Papua New Guinea</option>
                        <option value="PY">Paraguay</option>
                        <option value="PE">Peru</option>
                        <option value="PH">Philippines</option>
                        <option value="PN">Pitcairn</option>
                        <option value="PL">Poland</option>
                        <option value="PT">Portugal</option>
                        <option value="QA">Qatar</option>
                        <option value="IE">Republic of Ireland</option>
                        <option value="RE">Reunion</option>
                        <option value="RO">Romania</option>
                        <option value="RU">Russia</option>
                        <option value="RW">Rwanda</option>
                        <option value="ST">São Tomé and Príncipe</option>
                        <option value="BL">Saint Barthélemy</option>
                        <option value="SH">Saint Helena</option>
                        <option value="KN">Saint Kitts and Nevis</option>
                        <option value="LC">Saint Lucia</option>
                        <option value="SX">Saint Martin (Dutch part)</option>
                        <option value="MF">Saint Martin (French part)</option>
                        <option value="PM">Saint Pierre and Miquelon</option>
                        <option value="VC">Saint Vincent and the Grenadines</option>
                        <option value="SM">San Marino</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="SN">Senegal</option>
                        <option value="RS">Serbia</option>
                        <option value="SC">Seychelles</option>
                        <option value="SL">Sierra Leone</option>
                        <option value="SG">Singapore</option>
                        <option value="SK">Slovakia</option>
                        <option value="SI">Slovenia</option>
                        <option value="SB">Solomon Islands</option>
                        <option value="SO">Somalia</option>
                        <option value="ZA">South Africa</option>
                        <option value="GS">South Georgia/Sandwich Islands</option>
                        <option value="KR">South Korea</option>
                        <option value="SS">South Sudan</option>
                        <option value="ES">Spain</option>
                        <option value="LK">Sri Lanka</option>
                        <option value="SD">Sudan</option>
                        <option value="SR">Suriname</option>
                        <option value="SJ">Svalbard and Jan Mayen</option>
                        <option value="SZ">Swaziland</option>
                        <option value="SE">Sweden</option>
                        <option value="CH">Switzerland</option>
                        <option value="SY">Syria</option>
                        <option value="TW">Taiwan</option>
                        <option value="TJ">Tajikistan</option>
                        <option value="TZ">Tanzania</option>
                        <option value="TH">Thailand</option>
                        <option value="TL">Timor-Leste</option>
                        <option value="TG">Togo</option>
                        <option value="TK">Tokelau</option>
                        <option value="TO">Tonga</option>
                        <option value="TT">Trinidad and Tobago</option>
                        <option value="TN">Tunisia</option>
                        <option value="TR">Turkey</option>
                        <option value="TM">Turkmenistan</option>
                        <option value="TC">Turks and Caicos Islands</option>
                        <option value="TV">Tuvalu</option>
                        <option value="UG">Uganda</option>
                        <option value="UA">Ukraine</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="GB">United Kingdom (UK)</option>
                        <option value="US">USA (US)</option>
                        <option value="UY">Uruguay</option>
                        <option value="UZ">Uzbekistan</option>
                        <option value="VU">Vanuatu</option>
                        <option value="VA">Vatican</option>
                        <option value="VE">Venezuela</option>
                        <option value="VN">Vietnam</option>
                        <option value="WF">Wallis and Futuna</option>
                        <option value="EH">Western Sahara</option>
                        <option value="WS">Western Samoa</option>
                        <option value="YE">Yemen</option>
                        <option value="ZM">Zambia</option>
                        <option value="ZW">Zimbabwe</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-lg-6">
                    <input
                      required="required"
                      placeholder="State / Country"
                      className="form-control"
                      name="name"
                      type="text"
                    />
                  </div>
                  <div className="form-group col-lg-6">
                    <input
                      required="required"
                      placeholder="PostCode / ZIP"
                      className="form-control"
                      name="name"
                      type="text"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-lg-12">
                    <button className="btn btn-fill-line" type="submit">
                      Update Totals
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <div className="border p-3 p-md-4">
                <div className="heading_s1 mb-3">
                  <h6>Cart Totals</h6>
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td className="cart_total_label">Cart Subtotal</td>
                        <td className="cart_total_amount">${totalPrice.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="cart_total_label">Shipping</td>
                        <td className="cart_total_amount">Free Shipping</td>
                      </tr>
                      <tr>
                        <td className="cart_total_label">Total</td>
                        <td className="cart_total_amount">
                          <strong>${totalPrice.toFixed(2)}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* {token ? ( */}
                <div onClick={() => Checkout()}>
                  {loader ? (
                    <Dimmer active>
                      <Loader size="tiny">Loading</Loader>
                    </Dimmer>
                  ) : (
                    <a className="btn btn-fill-out">Proceed To CheckOut</a>
                  )}
                </div>
                {/* ) : (
										<div>
											{loader ? (
												<Dimmer active>
													<Loader size='tiny'>Loading</Loader>
												</Dimmer>
											) : (
													<a className='btn btn-fill-out' href={'/login'}>
														Proceed To CheckOut
													</a>
												)}
										</div>
									)} */}
                {isError && (
                  <div style={{ marginTop: 12 }}>
                    <p>
                      <span style={{ color: 'red', fontSize: 12 }}>
                        {'Something went wrong. Please try again later.'}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Content
