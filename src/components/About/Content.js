export default function Content() {
  return (
    <div className="about">
      <div className="section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about_img scene mb-4 mb-lg-0">
                <img
                  src="assets/images/family.jpg"
                  alt="about_img"
                  style={{ borderRadius: '65px' }}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="heading_s1">
                <h2>👋 Hello Bundlers</h2>
              </div>
              <p>
                I'm Kristen. A few years ago, our daughter was growing into toddler size clothes
                while our newborn son was growing into his next set of baby clothes right as the
                season was changing too!
              </p>
              <p>
                We noticed that kids grow up super fast and wondered why there wasn’t an easier way
                to buy and sell bundles of clothes. After chatting with other parents in our
                community we soon realized that moms love bundles.
              </p>
              <p>In March of 2020, BundleUp was born.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section bg_light_blue2 pb_70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="heading_s1 text-center">
                <h2>👶🏼 Community Values</h2>
              </div>
              <p className="text-center leads">
                Our mission is to create a community of families and caregivers who share our values
                of frugality, convenience, and sustainability.
              </p>
              <p className="text-center leads"></p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-sm-6">
              <div className="icon_box icon_box_style4 box_shadow1">
                <div className="icon">
                  <i className="fa fa-hand-holding-usd"></i>
                </div>
                <div className="icon_box_content">
                  <h5>Frugality</h5>
                  <p>Buying new clothing can be expensive.</p>
                  <p>We believe mindful consumption and quality can be affordable.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="icon_box icon_box_style4 box_shadow1">
                <div className="icon">
                  <i className="fa fa-calendar-check"></i>
                </div>
                <div className="icon_box_content">
                  <h5>Convenience</h5>
                  <p>Avoid long lines, crowded stores, no-show buyers, and price hagglers.</p>
                  <p>We believe buying and selling kids’ clothes should be easy and enjoyable.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="icon_box icon_box_style4 box_shadow1">
                <div className="icon">
                  <i className="fa fa-leaf"></i>
                </div>
                <div className="icon_box_content">
                  <h5>Sustainability</h5>
                  <p>
                    Consumers produce 20+ billion pounds of textile waste each year — 95% could be
                    reused or recycled.
                  </p>
                  <p>We believe pre-loved clothing deserves a new home again and again.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section bg_redon">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="heading_s1 text-center">
                <h2>💕 Buyers Love Bundles</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div
                className="testimonial_wrap testimonial_style1 carousel_slider owl-carousel owl-theme nav_style2"
                data-nav="true"
                data-dots="false"
                data-center="true"
                data-loop="true"
                data-autoplay="true"
                data-items="1"
              >
                <div className="testimonial_box">
                  <div className="testimonial_desc">
                    <p>This app makes buying and selling fun and so simple!</p>
                  </div>
                  <div className="author_wrap">
                    <div className="author_img">
                      <img src="https://randomuser.me/api/portraits/women/36.jpg" />
                    </div>
                    <div className="author_name">
                      <h6>Lisa C</h6>
                      <span>Harrisburg, PA</span>
                    </div>
                  </div>
                </div>
                <div className="testimonial_box">
                  <div className="testimonial_desc">
                    <p>
                      My daughter had a an tired closet until we started buying and selling on
                      BundleUp
                    </p>
                  </div>
                  <div className="author_wrap">
                    <div className="author_img">
                      <img src="https://randomuser.me/api/portraits/women/49.jpg" />
                    </div>
                    <div className="author_name">
                      <h6>Alexa S</h6>
                      <span>Duluth, GA</span>
                    </div>
                  </div>
                </div>
                <div className="testimonial_box">
                  <div className="testimonial_desc">
                    <p>Getting the perfect bundle made me smile!</p>
                  </div>
                  <div className="author_wrap">
                    <div className="author_img">
                      <img src="https://randomuser.me/api/portraits/women/61.jpg" />
                    </div>
                    <div className="author_name">
                      <h6>Daisy L</h6>
                      <span>Austin, TX</span>
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
