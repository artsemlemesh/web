function Popup() {
  return (
    <div
      className="modal fade subscribe_popup"
      id="onload-popup"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">
                <i className="ion-ios-close-empty"></i>
              </span>
            </button>
            <div className="row no-gutters">
              <div className="col-sm-5">
                <div
                  className="background_bg h-100"
                  data-img-src="assets/images/popup_img.jpg"
                ></div>
              </div>
              <div className="col-sm-7">
                <div className="popup_content">
                  <div className="popup-text">
                    <div className="heading_s4">
                      <h4>Subscribe and Get 25% Discount!</h4>
                    </div>
                    <p>Subscribe to the newsletter to receive updates about new products.</p>
                  </div>
                  <form method="post">
                    <div className="form-group">
                      <input
                        name="email"
                        required
                        type="email"
                        className="form-control rounded-0"
                        placeholder="Enter Your Email"
                      />
                    </div>
                    <div className="form-group">
                      <button
                        className="btn btn-fill-line btn-block text-uppercase rounded-0"
                        title="Subscribe"
                        type="submit"
                      >
                        Subscribe
                      </button>
                    </div>
                  </form>
                  <div className="chek-form">
                    <div className="custome-checkbox">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="checkbox"
                        id="exampleCheckbox3"
                        value=""
                      />
                      <label className="form-check-label" htmlFor="exampleCheckbox3">
                        <span>Don't show this popup again!</span>
                      </label>
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
export default Popup
