/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { getItem } from '../../helpers/storage'
import BuyerOrders from '../Orders/index'
import logout from '../Common/LogOut'
import DeleteAccountModal from './DeleteAccountModal'

function Content() {
  const dispatch = useDispatch()
  const [token, setToken] = useState('')
  const tokenLoaded = useSelector((state) => state.user.tokenLoaded)

  useEffect(() => {
    const tokenGet = getItem('token')
    setToken(tokenGet?.toString())
  }, [tokenLoaded])

  if (token === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="my_account">
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <div className="dashboard_menu">
                <ul className="nav nav-tabs flex-column" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="dashboard-tab"
                      data-toggle="tab"
                      href="#dashboard"
                      role="tab"
                      aria-controls="dashboard"
                      aria-selected="false"
                    >
                      <i className="ti-layout-grid2"></i>Dashboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="orders-tab"
                      data-toggle="tab"
                      href="#orders"
                      role="tab"
                      aria-controls="orders"
                      aria-selected="false"
                    >
                      <i className="ti-shopping-cart-full"></i>Orders
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="address-tab"
                      data-toggle="tab"
                      href="#address"
                      role="tab"
                      aria-controls="address"
                      aria-selected="true"
                    >
                      <i className="ti-location-pin"></i>My Address
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="account-detail-tab"
                      data-toggle="tab"
                      href="#account-detail"
                      role="tab"
                      aria-controls="account-detail"
                      aria-selected="true"
                    >
                      <i className="ti-id-badge"></i>Account details
                    </a>
                  </li>

                  <li className="nav-item" onClick={() => logout(dispatch)}>
                    <Link className="nav-link" to="/login">
                      <i className="ti-lock"></i>Logout
                    </Link>
                  </li>
                  <li className="nav-item">
                    <DeleteAccountModal />
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-9 col-md-8">
              <div className="tab-content dashboard_content">
                <div
                  className="tab-pane fade active show"
                  id="dashboard"
                  role="tabpanel"
                  aria-labelledby="dashboard-tab"
                >
                  <div className="card">
                    <div className="card-header">
                      <h3>Dashboard</h3>
                    </div>
                    <div className="card-body">
                      <p>
                        From your account dashboard. you can easily check &amp; view your{' '}
                        <a href="javascript:void(0);" onclick="$('#orders-tab').trigger('click')">
                          recent orders
                        </a>
                        , manage your{' '}
                        <a href="javascript:void(0);" onclick="$('#address-tab').trigger('click')">
                          shipping and billing addresses
                        </a>{' '}
                        and{' '}
                        <a
                          href="javascript:void(0);"
                          onclick="$('#account-detail-tab').trigger('click')"
                        >
                          edit your password and account details.
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="orders"
                  role="tabpanel"
                  aria-labelledby="orders-tab"
                >
                  <div className="card">
                    <div className="card-header">
                      <h3>Orders</h3>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <BuyerOrders />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="address"
                  role="tabpanel"
                  aria-labelledby="address-tab"
                >
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="card mb-3 mb-lg-0">
                        <div className="card-header">
                          <h3>Billing Address</h3>
                        </div>
                        <div className="card-body">
                          <address>
                            House #15
                            <br />
                            Road #1
                            <br />
                            Block #C <br />
                            Angali <br /> Vedora <br />
                            1212
                          </address>
                          <p>New York</p>
                          <a href="#" className="btn btn-fill-out">
                            Edit
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="card">
                        <div className="card-header">
                          <h3>Shipping Address</h3>
                        </div>
                        <div className="card-body">
                          <address>
                            House #15
                            <br />
                            Road #1
                            <br />
                            Block #C <br />
                            Angali <br /> Vedora <br />
                            1212
                          </address>
                          <p>New York</p>
                          <a href="#" className="btn btn-fill-out">
                            Edit
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="account-detail"
                  role="tabpanel"
                  aria-labelledby="account-detail-tab"
                >
                  <div className="card">
                    <div className="card-header">
                      <h3>Account Details</h3>
                    </div>
                    <div className="card-body">
                      <p>
                        Already have an account? <a href="#">Log in instead!</a>
                      </p>
                      <form method="post" name="enq">
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label>
                              First Name <span className="required">*</span>
                            </label>
                            <input required="" className="form-control" name="name" type="text" />
                          </div>
                          <div className="form-group col-md-6">
                            <label>
                              Last Name <span className="required">*</span>
                            </label>
                            <input required="" className="form-control" name="phone" />
                          </div>
                          <div className="form-group col-md-12">
                            <label>
                              Display Name <span className="required">*</span>
                            </label>
                            <input required="" className="form-control" name="dname" type="text" />
                          </div>
                          <div className="form-group col-md-12">
                            <label>
                              Email Address <span className="required">*</span>
                            </label>
                            <input required="" className="form-control" name="email" type="email" />
                          </div>
                          <div className="form-group col-md-12">
                            <label>
                              Current Password <span className="required">*</span>
                            </label>
                            <input
                              required=""
                              className="form-control"
                              name="password"
                              type="password"
                            />
                          </div>
                          <div className="form-group col-md-12">
                            <label>
                              New Password <span className="required">*</span>
                            </label>
                            <input
                              required=""
                              className="form-control"
                              name="npassword"
                              type="password"
                            />
                          </div>
                          <div className="form-group col-md-12">
                            <label>
                              Confirm Password <span className="required">*</span>
                            </label>
                            <input
                              required=""
                              className="form-control"
                              name="cpassword"
                              type="password"
                            />
                          </div>
                          <div className="col-md-12">
                            <button
                              type="submit"
                              className="btn btn-fill-out"
                              name="submit"
                              value="Submit"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
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
export default Content
