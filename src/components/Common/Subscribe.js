function Subscribe() {
  return (
    <div className="section bg_default small_pt small_pb">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="heading_s1 mb-md-0 heading_light">
              <h3>Subscribe Our Newsletter</h3>
            </div>
          </div>
          <div className="col-md-6">
            <div className="newsletter_form">
              <form>
                <input
                  type="text"
                  required=""
                  className="form-control rounded-0"
                  placeholder="Enter Email Address"
                />
                <button
                  type="submit"
                  className="btn btn-dark rounded-0"
                  name="submit"
                  value="Submit"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscribe
