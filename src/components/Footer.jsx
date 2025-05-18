import React from 'react'

function Footer() {
  return (
    <footer className="site-footer footer-light">
      <div className="footer-top-newsletter">
        <div className="container">
            <div className="sf-news-letter">
            <span>Subscribe Our Newsletter</span>
            <form>
                <div className="form-group sf-news-l-form">
                <input type="text" className="form-control" placeholder="Enter Your Email" />
                <button type="submit" className="sf-sb-btn">
                    Submit
                </button>
                </div>
            </form>
            </div>
        </div>
      </div>
      <div className="footer-top">
        <div className="container">
            <div className="row">
            {/* Footer col 1 */}
            <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
                <div className="sf-site-link sf-widget-link">
                <h4 className="sf-f-title">Site Links</h4>
                <ul>
                    <li>
                    <a href="blog-grid.html">Blog</a>
                    </li>
                    <li>
                    <a href="contact-us.html">Contact Us</a>
                    </li>
                    <li>
                    <a href="job-grid.html">Jobs</a>
                    </li>
                    <li>
                    <a href="all-categories.html">Categories</a>
                    </li>
                </ul>
                </div>
            </div>
            {/* Footer col 2 */}
            <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
                <div className="sf-site-link sf-widget-cities">
                <h4 className="sf-f-title">Popular Cities</h4>
                <ul>
                    <li>
                    <a href="all-categories.html">Ballston Lake</a>
                    </li>
                    <li>
                    <a href="all-categories.html">Batumi</a>
                    </li>
                    <li>
                    <a href="all-categories.html">Brooklyn</a>
                    </li>
                    <li>
                    <a href="all-categories.html">Cambridge</a>
                    </li>
                </ul>
                </div>
            </div>
            {/* Footer col 3 */}
            <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
                <div className="sf-site-link sf-widget-categories">
                <h4 className="sf-f-title">Categories</h4>
                <ul>
                    <li>
                    <a href="categories-detail.html">Car Service</a>
                    </li>
                    <li>
                    <a href="categories-detail.html">House Cleaning</a>
                    </li>
                    <li>
                    <a href="categories-detail.html">Transport</a>
                    </li>
                    <li>
                    <a href="categories-detail.html">Yoga Classes</a>
                    </li>
                </ul>
                </div>
            </div>
            {/* Footer col 4 */}
            <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
                <div className="sf-site-link sf-widget-contact">
                <h4 className="sf-f-title">Contact Info</h4>
                <ul>
                    <li>Indiaas</li>
                    <li>+41 232 525 5257</li>
                    <li>+41 856 525 5369</li>
                    <li>hello@Servicefinder.com</li>
                </ul>
                </div>
            </div>
            </div>
        </div>
      </div>
      {/* FOOTER COPYRIGHT */}
      <div className="footer-bottom">
        <div className="container">
            <div className="sf-footer-bottom-section">
            <div className="sf-f-logo">
                <a href="javascript:void(0);">
                <img src="images/logo-dark.png" alt="" />
                </a>
            </div>
            <div className="sf-f-copyright">
                <span>Copyright 2022 | Aone Theme. All Rights Reserved</span>
            </div>
            <div className="sf-f-social">
                <ul className="socila-box">
                <li>
                    <a href="javascript:void(0);">
                    <i className="fa fa-twitter"></i>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);">
                    <i className="fa fa-facebook"></i>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);">
                    <i className="fa fa-linkedin"></i>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);">
                    <i className="fa fa-instagram"></i>
                    </a>
                </li>
                </ul>
            </div>
            </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer