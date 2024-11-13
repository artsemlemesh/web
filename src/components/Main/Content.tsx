import { ReactElement } from 'react'

export default (): ReactElement => {
  return (
    <>
      <div id="section-preloader">
        <div className="boxes">
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <p>LOADING . . .</p>
      </div>

      <nav className="navbar-1 navbar navbar-expand-lg">
        <div className="container navbar-container">
          <a className="navbar-brand" href="index.html">
            <img src="assets/images/logo.png" alt="BundleUp" />
          </a>
        </div>
      </nav>

      <div id="section-slider1" style={{ height: window.innerHeight }}>
        <div className="swiper-container">
          <div className="swiper-wrapper d-none">
            <div className="swiper-slide">
              <div className="slider-content">
                <div className="container">
                  <div className="row">
                    <div className="left col-10 col-sm-12 col-md-7">
                      <h1 className="ez-animate" data-animation="fadeInLeft">
                        <span style={{ color: 'white', fontWeight: 200 }}>
                          BundleUp 👶🏼 Buy & Sell Baby Clothing Bundles 👚🩳👕👖
                        </span>
                      </h1>
                      <p className="ez-animate" data-animation="fadeInLeft">
                        Download the free app today.
                      </p>
                      <ul>
                        <li>
                          <a
                            href="https://apps.apple.com/us/app/bundleup-baby-clothing/id1535296301"
                            target="_blank"
                          >
                            <img
                              className="img-fluid ez-animate"
                              src="assets/images/appstore2.png"
                              alt="Apple App Store Icon"
                              data-animation="fadeInUp"
                              height={84}
                              width={282}
                            />
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://play.google.com/store/apps/details?id=com.bundleup.android"
                            target="_blank"
                          >
                            <img
                              className="img-fluid ez-animate"
                              src="assets/images/googleplay2.png"
                              alt="Google Play Store Icon"
                              data-animation="fadeInUp"
                              height={84}
                              width={282}
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div
                      className="right ez-animate col-12 col-sm-12 col-md-4"
                      data-animation="fadeInRight"
                    >
                      <img
                        className="img-fluid"
                        src="assets/images/img-1.1.png"
                        alt="BundleUp App Image Iphone"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="section-features1">
        <div className="container">
          <div className="row">
            <div className="left">
              <h6 className="clscheme">Selling Made Simple</h6>
              <h2>Sell your baby clothing as easy as 1-2-3</h2>
              <ul>
                <li>
                  <i className="fa fa-long-arrow-left clscheme"></i>
                </li>
                <li>
                  <i className="fa fa-long-arrow-right clscheme"></i>
                </li>
              </ul>
            </div>
            <div className="right">
              <div className="swiper-container features1">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="item">
                      <img src="assets/images/take_photo.png" alt="List It" />
                      <h3>List It</h3>
                      <p>
                        Photograph and list your kids’ clothing bundles – right from your phone!
                      </p>
                    </div>
                  </div>

                  <div className="swiper-slide">
                    <div className="item">
                      <img src="assets/images/ship_it.png" alt="Ship It" />
                      <h3>Ship It</h3>
                      <p>Free USPS shipping supplies. Schedule free pickups from home.</p>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="item">
                      <img src="assets/images/get_paid.png" alt="Get Paid" />
                      <h3>Get Paid</h3>
                      <p>You’ll get paid when your bundle is delivered and approved!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="section-download1">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Download Now</h1>
              <p>Start listing your baby bundles today!</p>
              <ul>
                <li>
                  <a href="https://apps.apple.com/us/app/bundleup-baby-clothing/id1535296301">
                    <img
                      className="img-fluid ez-animate"
                      src="assets/images/appstore2.png"
                      alt="Apple App Store Icon"
                      data-animation="fadeInUp"
                      height={84}
                      width={282}
                    />
                  </a>
                </li>
                <li>
                  <a href="https://play.google.com/store/apps/details?id=com.bundleup.android">
                    <img
                      className="img-fluid ez-animate"
                      src="assets/images/googleplay2.png"
                      alt="Google Play Store Icon"
                      data-animation="fadeInUp"
                      height={84}
                      width={282}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div id="section-footer">
        <div className="container">
          <div className="footer-widget">
            <div className="row">
              <div className="left col-md-6">
                <a href="index.html">
                  <img src="assets/images/logo.png" alt="BundleUp" />
                </a>
              </div>
              <div className="right col-md-6">
                <div className="social-links"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright container-fluid">
          <div className="col-12">
            <p>
              © 2021 &nbsp;
              <a href="#">Bynde Inc.</a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
