import React from 'react'

function Footer({ categories }) {
  return (
    <footer className="site-footer footer-light" id='contact'>
      <div className="footer-top">
        <div className="container">
            <div className="row">
            {/* Footer col 1 */}
            <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
                <div className="sf-site-link sf-widget-link">
                <h4 className="sf-f-title">Liens</h4>
                <ul>
                    <li>
                    <a href="all-categories.html">Categories</a>
                    </li>
                </ul>
                </div>
            </div>
            {/* Footer col 2 */}
            <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
                <div className="sf-site-link sf-widget-cities">
                <h4 className="sf-f-title">Villes</h4>
                <ul>
                    <li>
                    <a href="all-categories.html">Douala</a>
                    </li>
                    <li>
                    <a href="all-categories.html">Yaounde</a>
                    </li>
                </ul>
                </div>
            </div>
            {/* Footer col 3 */}
            <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
                <div className="sf-site-link sf-widget-categories">
                <h4 className="sf-f-title">Categories</h4>
                <ul>
                    {
                        categories.slice(0, 5).map((categorie) => (
                            <li>
                            <a href={categorie.slug}>{categorie.name}</a>
                            </li>
                        ))
                    }
                </ul>
                </div>
            </div>
            {/* Footer col 4 */}
            <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
                <div className="sf-site-link sf-widget-contact">
                <h4 className="sf-f-title">Contact Info</h4>
                <ul>
                    <li>Douala, Cite Sic</li>
                    <li>+237 693 92 2252</li>
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
                {/* <h3 className='site-logo-has text-white'>WARAPS</h3> */}
                <h2 className='site-logo-has'>WARAPS</h2>
                </a>
            </div>
            <div className="sf-f-copyright">
                <span>Copyright 2025 | YK Solutions. All Rights Reserved</span>
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