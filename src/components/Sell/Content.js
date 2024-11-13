import React from 'react'
import ReactPlayer from 'react-player'
import { List, Button, Image, Grid } from 'semantic-ui-react'

function Content() {
  return (
    <div className="about">
      <div className="section bg_light_blue2 pb_70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="heading_s1 text-center">
                <h2>Selling made simple</h2>
              </div>
              <p className="text-center leads">
                Selling your baby and toddler clothing on BundleUp is as easy as 1-2-3
              </p>
              <p className="text-center leads"></p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-sm-6">
              <div className="icon_box icon_box_style4 box_shadow1">
                <div className="icon">
                  <i className="fa fa-camera-retro"></i>
                </div>
                <div className="icon_box_content">
                  <h5>LIST IT</h5>
                  <p>Photograph and list your kids’ clothing bundles – right from your phone!</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="icon_box icon_box_style4 box_shadow1">
                <div className="icon">
                  <i className="fa fa-paper-plane"></i>
                </div>
                <div className="icon_box_content">
                  <h5>SHIP IT</h5>
                  <p>
                    Free shipping supplies. Always tracked & insured. Schedule free pickups from
                    home.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="icon_box icon_box_style4 box_shadow1">
                <div className="icon">
                  <i className="fa fa-dollar-sign"></i>
                </div>
                <div className="icon_box_content">
                  <h5>GET PAID</h5>
                  <p>You’ll get paid when your bundle is delivered and approved!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section bg_redon">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about_img scene mb-4 mb-lg-0">
                <ReactPlayer
                  className="react-player"
                  url="https://bynde-staging.s3.amazonaws.com/frontend/assets/video/BundleUp_Shipping_Video.mp4"
                  width="100%"
                  height="100%"
                  controls={true}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="heading_s1">
                <h2>📦 How to Sell & Get Paid</h2>
              </div>
              <p>
                <List bulleted>
                  <List.Item>Download the free BundleUp app on iPhone, iPad, or Android.</List.Item>
                  <List.Item>
                    Start by ordering your FREE flat rate shipping boxes from USPS (links below)
                  </List.Item>
                  <List.Item>Arrange your clothing into one of the flat rate choices</List.Item>
                  <List.Item>Snap a pic front and back of each item with details</List.Item>
                  <List.Item>
                    Once your listing sells, we send a FREE printable shipping label to attach to
                    your shipment
                  </List.Item>
                  <List.Item>
                    Schedule a free pickup from your home (or drop at your post office)
                  </List.Item>
                  <List.Item>
                    Once your buyer receives your bundle, you get paid directly in the app
                  </List.Item>
                </List>
              </p>
              <br />
              <p>
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
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="heading_s1">
                <h2>📦 Free Shipping Supplies. Delivered to your Door.</h2>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-4 col-sm-6">
                  <div className="icon_box icon_box_style4 box_shadow1">
                    <div className="icon">
                      <a
                        target="_blank"
                        href="https://store.usps.com/store/product/shipping-supplies/priority-mail-padded-flat-rate-envelope-P_EP14PE"
                      >
                        <Image src="https://www.usps.com/ecp/asset/images/EP14PE-L0.jpg" />
                      </a>
                    </div>
                    <div className="icon_box_content">
                      <h5>Priority Mail Padded Flat Rate Envelope</h5>
                      <p>
                        <List bulleted>
                          <List.Item>9-1/2"(L) x 12-1/2"(W)</List.Item>
                          <List.Item>Free Tracking</List.Item>
                          <List.Item>Insurance included</List.Item>
                          <List.Item>Fits about 10-15 Newborn Onesies</List.Item>
                          <List.Item>Fits about five 5T Tops</List.Item>
                        </List>
                        <a
                          target="_blank"
                          href="https://store.usps.com/store/product/shipping-supplies/priority-mail-padded-flat-rate-envelope-P_EP14PE"
                        >
                          <Button icon size="large" color="red">
                            Order It
                          </Button>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="icon_box icon_box_style4 box_shadow1">
                    <div className="icon">
                      <a
                        target="_blank"
                        href="https://store.usps.com/store/product/shipping-supplies/priority-mail-medium-flat-rate-box-2-P_O_FRB2"
                      >
                        <Image src="https://www.usps.com/ecp/asset/images/O_FRB2-L0.jpg" />
                      </a>
                    </div>
                    <div className="icon_box_content">
                      <h5>Priority Mail Medium Flat Rate Box</h5>
                      <p>
                        <List bulleted>
                          <List.Item>12"(L) x 3-1/2"(W) x 14-1/8"(H)</List.Item>
                          <List.Item>Free Tracking</List.Item>
                          <List.Item>Insurance included</List.Item>
                          <List.Item>Fits about 20-30 Newborn Onesies</List.Item>
                          <List.Item>Fits about 10 5T Tops</List.Item>
                        </List>
                        <a
                          target="_blank"
                          href="https://store.usps.com/store/product/shipping-supplies/priority-mail-medium-flat-rate-box-2-P_O_FRB2"
                        >
                          <Button icon size="large" color="red">
                            Order It
                          </Button>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="icon_box icon_box_style4 box_shadow1">
                    <div className="icon">
                      <a
                        target="_blank"
                        href="https://store.usps.com/store/product/shipping-supplies/priority-mail-large-flat-rate-box-largefrb-P_LARGE_FRB"
                      >
                        <Image src="https://www.usps.com/ecp/asset/images/LARGE_FRB-L0.jpg" />
                      </a>
                    </div>
                    <div className="icon_box_content">
                      <h5>Priority Mail Large Flat Rate Box</h5>
                      <p>
                        <List bulleted>
                          <List.Item>12-1/4"(L) x 12-1/4"(W) x 6"(H)</List.Item>
                          <List.Item>Free Tracking</List.Item>
                          <List.Item>Insurance included</List.Item>
                          <List.Item>Fits about 40-50 Newborn Onesies</List.Item>
                          <List.Item>Fits about 20 5T Tops</List.Item>
                        </List>
                        <Button icon size="large" color="red">
                          Order It
                        </Button>
                      </p>
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
