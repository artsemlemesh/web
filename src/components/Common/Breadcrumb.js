function Breadcrumb() {
  return (
    <div className="breadcrumb_section bg_gray page-title-mini">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="page-title">
              <h1>Page Not Found</h1>
            </div>
          </div>
          <div className="col-md-6">
            <ol className="breadcrumb justify-content-md-end">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Pages</a>
              </li>
              <li className="breadcrumb-item active">404</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Breadcrumb
