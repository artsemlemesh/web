import { Grid } from 'semantic-ui-react'
import CookieConsent from 'react-cookie-consent'
import { Link } from 'react-router-dom'

function FooterDark() {
  return (
    <footer className="footer_dark">
      <div className="footer_top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="widget">
                <div className="footer_logo">
                  <Link to="#">
                    <img src="assets/images/logo_light.png" alt="logo" />
                  </Link>
                </div>
                <p>Baby & Toddler Clothing Bundles</p>
              </div>
              <Grid>
                <Grid.Column width={8}>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.bundleup.android"
                    target="_blank"
                  >
                    <img src="assets/images/playstore.png" alt="Download on the Play Store" />
                  </a>
                </Grid.Column>
                <Grid.Column width={8}>
                  <a
                    href="https://apps.apple.com/us/app/bundleup-baby-clothing/id1535296301"
                    target="_blank"
                  >
                    <img src="assets/images/appstore.png" alt="Download on the App Store" />
                  </a>
                </Grid.Column>
              </Grid>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6">
              <div className="widget">
                <h6 className="widget_title">Company</h6>
                <ul className="widget_links">
                  <li>
                    <Link to="/about">Our Story</Link>
                  </li>
                  <li>
                    <a href="https://blog.bundleup.co" target="_blank">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="https://jobs.bundleup.co" target="_blank">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6">
              <div className="widget">
                <h6 className="widget_title">Help</h6>
                <ul className="widget_links">
                  <li>
                    <a href="https://bynde.freshdesk.com/support/home" target="_blank">
                      Getting Started
                    </a>
                  </li>
                  <li>
                    <Link to="/account">My Account</Link>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://bynde.freshdesk.com/support/solutions/articles/65000169399-for-buyers"
                    >
                      Buyers
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://bynde.freshdesk.com/support/solutions/articles/65000169398-for-sellers"
                    >
                      Sellers
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="widget">
                <h6 className="widget_title">Account</h6>
                <ul className="widget_links">
                  <li>
                    <Link to="/signup">Register</Link>
                  </li>
                  <li>
                    <Link to="/account">Earnings</Link>
                  </li>
                  <li>
                    <Link to="/account">Orders History</Link>
                  </li>
                  <li>
                    <Link to="/account">Order Tracking</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="widget">
                <h6 className="widget_title">Get In Touch</h6>
                <ul className="contact_info contact_info_light">
                  {/* <li>
                    <i className="ti-location-pin"></i>
                    <p>123 Street, Old Trafford, New South London , UK</p>
                  </li> */}
                  <li>
                    <i className="ti-headphone-alt"></i>
                    <a target="_blank" href="https://bynde.freshdesk.com/">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <i className="ti-email"></i>
                    <a target="_blank" href="mailto:support@bundleup.co">
                      support@bundleup.co
                    </a>
                  </li>
                  <li>
                    <ul className="social_icons social_white">
                      <li>
                        <a target="_blank" href="https://www.facebook.com/BundleUpApp/">
                          <i className="ion-social-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://twitter.com/BundleUpCo">
                          <i className="ion-social-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://www.pinterest.com/BundleUpApp">
                          <i className="ion-social-pinterest"></i>
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://www.instagram.com/bundleupapp/">
                          <i className="ion-social-instagram-outline"></i>
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://www.linkedin.com/showcase/bundleupapp">
                          <i className="ion-social-linkedin-outline"></i>
                        </a>
                      </li>
                    </ul>
                  </li>
                  {/* <li>
                    <i className="ti-mobile"></i>
                    <p>+ 457 789 789 65</p>
                  </li> */}
                </ul>
              </div>
              <div className="widget"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom_footer border-top-tran">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="mb-md-0 text-center text-md-left">© Bynde, Inc. All rights reserved.</p>
            </div>
            <div className="col-md-6">
              <ul className="footer_payment text-center text-lg-right">
                <li>
                  <a target="_blank" href="/privacy.html">
                    Privacy
                  </a>
                </li>
                <li>&nbsp;&nbsp;|&nbsp;&nbsp;</li>
                <li>
                  <a target="_blank" href="/terms.html">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <CookieConsent
        location="bottom"
        buttonText="I understand"
        cookieName="cookieConsent"
        style={{ background: '#2B373B' }}
        buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
        expires={150}
      >
        This website uses cookies to help the users have the best experience.{' '}
        {/* <span style={{ fontSize: "10px" }}>This bit of text is smaller :O</span> */}
      </CookieConsent>
    </footer>
  )
}
export default FooterDark
