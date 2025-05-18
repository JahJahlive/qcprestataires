import React from 'react'
import LoginModal from '../components/LoginModal'

export default function Home() {

  return (
    <>
      <div className="page-content">
        {/* BANNER SECTION START */}
        <section className="aon-banner-wrap">
        {/* Left Section */}
        <div className="aon-banner-outer sf-overlay-wrapper">
            <div className="aon-banner-pic">
            <div className="aon-curve-area"></div>
            <div className="aon-overlay-main" style={{ opacity: 0.85, backgroundColor: '#022278' }}></div>
            <img src="images/banner/bnr-pic.jpg" width="1919" height="976" alt="" />
            </div>
            <div className="aon-banner-text">
            <div className="container">
                <div className="aon-bnr-write">
                <h2 className="text-top-line">
                    Hire <span className="text-secondry">Experts</span> &
                </h2>
                <h2 className="text-bot-line">Get Your Job Done</h2>
                </div>
            </div>
            </div>
        </div>
        {/* Right Section */}
        <div className="aon-find-bar aon-findBar-vertical">
            <div className="container">
            {/* Search Form start */}
            <div className="search-form">
                <form className="clearfix search-providers" method="get">
                <input type="hidden" name="s" value="" />
                <div className="aon-searchbar-table">
                    <div className="aon-searchbar-left">
                    <ul className="clearfix sf-searchfileds-count-5">
                        <li>
                        <label>Keyword</label>
                        <input
                            type="text"
                            value=""
                            placeholder="Enter Keyword"
                            id="keyword"
                            name="keyword"
                            className="form-control sf-form-control"
                        />
                        <span className="sf-search-icon">
                            <img src="images/search-bar/keyword.png" alt="" />
                        </span>
                        </li>
                        <li>
                        <label>Category</label>
                        <select
                            id="categorysrh"
                            name="catid"
                            className="form-control sf-form-control aon-categories-select sf-select-box"
                            title="Select Category"
                        >
                            <option className="bs-title-option" value="">
                            Select a Category
                            </option>
                            <option
                            value="17"
                            data-content="<img class='childcat-img' width='50' height='auto' src=images\cat-thum\cat-1.jpg><span class='childcat'>Cab Service</span>"
                            >
                            Cab Service
                            </option>
                            <option
                            value="30"
                            data-content="<img class='childcat-img' width='50' height='auto' src=images\cat-thum\cat-2.jpg><span class='childcat'>Car Dealers</span>"
                            >
                            Car Dealers
                            </option>
                            <option
                            value="19"
                            data-content="<img class='childcat-img' width='50' height='auto' src=images\cat-thum\cat-3.jpg><span class='childcat'>Food & Drink</span>"
                            >
                            Food & Drink
                            </option>
                            <option
                            value="19"
                            data-content="<img class='childcat-img' width='50' height='auto' src=images\cat-thum\cat-4.jpg><span class='childcat'>Plumber</span>"
                            >
                            Plumber
                            </option>
                            <option
                            value="19"
                            data-content="<img class='childcat-img' width='50' height='auto' src=images\cat-thum\cat-5.jpg><span class='childcat'>Electrician</span>"
                            >
                            Electrician
                            </option>
                        </select>
                        <span className="sf-search-icon">
                            <img src="images/search-bar/maintenance.png" alt="" />
                        </span>
                        </li>
                        <li>
                        <label>Country</label>
                        <select
                            className="sf-select-box form-control sf-form-control bs-select-hidden"
                            data-live-search="true"
                            name="country"
                            id="country"
                            title="Country"
                            data-header="Select a Country"
                        >
                            <option className="bs-title-option" value="">
                            Select Country
                            </option>
                            <option value="">Select Country</option>
                            <option value="Turkey">Turkey</option>
                            <option value="United States">United States</option>
                        </select>
                        <span className="sf-search-icon">
                            <img src="images/search-bar/globe.png" alt="" />
                        </span>
                        </li>
                        <li>
                        <label>City</label>
                        <select
                            className="sf-select-box form-control sf-form-control bs-select-hidden"
                            data-live-search="true"
                            name="city"
                            id="city"
                            title="City"
                            data-header="Select a City"
                        >
                            <option className="bs-title-option" value="">
                            Select City
                            </option>
                            <option value="">Select City</option>
                            <option value="">London</option>
                            <option value="">Japan</option>
                            <option value="">US</option>
                        </select>
                        <span className="sf-search-icon">
                            <img src="images/search-bar/city.png" alt="" />
                        </span>
                        </li>
                    </ul>
                    </div>
                    <div className="aon-searchbar-right">
                    <button type="button" className="site-button">
                        <i className="fa fa-search"></i> Find Provider
                    </button>
                    </div>
                </div>
                </form>
            </div>
            {/* Search Form End */}
            </div>
        </div>
        </section>
        {/* BANNER SECTION END */}

        {/* Services Finder categories */}
        <section className="bg-white aon-categories-area sf-curve-pos">
        <div className="container">
            {/* Title Section Start */}
            <div className="section-head">
            <div className="row">
                <div className="col-lg-6 col-md-12">
                <span className="aon-sub-title">categories</span>
                <h2 className="aon-title">Popular Categories</h2>
                </div>
                <div className="col-lg-6 col-md-12">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do usmod tempor
                    incididunt ut labore et dolore magna aliqua.
                </p>
                </div>
            </div>
            </div>
            {/* Title Section End */}

            <div className="section-content">
            <div className="owl-carousel categories-carousel-owl aon-owl-arrow">
                {/* COLUMNS 1 */}
                <div className="item">
                <div className="aon-cat-item">
                    <div className="aon-cat-pic media-bg-animate shine-hover">
                    <a className="shine-box" href="categories-detail.html">
                        <img src="images/popular-categories/1.jpg" alt="" />
                    </a>
                    </div>
                    <h4 className="aon-cat-title">Food & Drink</h4>
                </div>
                </div>
                {/* COLUMNS 2 */}
                <div className="item">
                <div className="aon-cat-item">
                    <div className="aon-cat-pic media-bg-animate shine-hover">
                    <a className="shine-box" href="categories-detail.html">
                        <img src="images/popular-categories/2.jpg" alt="" />
                    </a>
                    </div>
                    <h4 className="aon-cat-title">Plumber</h4>
                </div>
                </div>
                {/* COLUMNS 3 */}
                <div className="item">
                <div className="aon-cat-item">
                    <div className="aon-cat-pic media-bg-animate shine-hover">
                    <a className="shine-box" href="categories-detail.html">
                        <img src="images/popular-categories/3.jpg" alt="" />
                    </a>
                    </div>
                    <h4 className="aon-cat-title">Cleaning Services</h4>
                </div>
                </div>
                {/* COLUMNS 4 */}
                <div className="item">
                <div className="aon-cat-item">
                    <div className="aon-cat-pic media-bg-animate shine-hover">
                    <a className="figure" href="categories-detail.html">
                        <img src="images/popular-categories/4.jpg" alt="" />
                    </a>
                    </div>
                    <h4 className="aon-cat-title">Yoga Classes</h4>
                </div>
                </div>
                {/* COLUMNS 5 */}
                <div className="item">
                <div className="aon-cat-item">
                    <div className="aon-cat-pic media-bg-animate shine-hover">
                    <a className="shine-box" href="categories-detail.html">
                        <img src="images/popular-categories/5.jpg" alt="" />
                    </a>
                    </div>
                    <h4 className="aon-cat-title">Salon & Spa</h4>
                </div>
                </div>
                {/* COLUMNS 6 */}
                <div className="item">
                <div className="aon-cat-item">
                    <div className="aon-cat-pic media-bg-animate shine-hover">
                    <a className="shine-box" href="categories-detail.html">
                        <img src="images/popular-categories/6.jpg" alt="" />
                    </a>
                    </div>
                    <h4 className="aon-cat-title">Gym</h4>
                </div>
                </div>
                {/* COLUMNS 7 */}
                <div className="item">
                <div className="aon-cat-item">
                    <div className="aon-cat-pic media-bg-animate shine-hover">
                    <a className="shine-box" href="categories-detail.html">
                        <img src="images/popular-categories/7.jpg" alt="" />
                    </a>
                    </div>
                    <h4 className="aon-cat-title">Transport</h4>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        {/* Services Finder categories END */}

        {/* How it Work */}
        <section className="bg-white aon-how-service-area sf-curve-pos">
         <div className="container">
            <div className="section-content">
            <div className="row">
                {/* Title Section Start */}
                <div className="col-lg-4 col-md-12">
                <span className="aon-sub-title">Steps</span>
                <h2 className="sf-title">How Service Finder Works</h2>
                </div>
                {/* Title Section End */}

                <div className="col-lg-8 col-md-12">
                {/* Steps Block Start */}
                <div className="aon-step-blocks">
                    <div className="row">
                    {/* COLUMNS 1 */}
                    <div className="col-md-4 col-sm-4 m-b30">
                        <div className="aon-step-section step-position-1 aon-icon-effect">
                        <div className="aon-step-icon aon-icon-box">
                            <span>
                            <i className="aon-icon">
                                <img src="images/step-icon/1.png" alt="" />
                            </i>
                            </span>
                        </div>
                        <div className="aon-step-info">
                            <h4 className="aon-title">Describe Your Task</h4>
                            <p>This helps us determine which Taskers are best job.</p>
                        </div>
                        </div>
                    </div>

                    {/* COLUMNS 2 */}
                    <div className="col-md-4 col-sm-4 m-b30">
                        <div className="aon-step-section step-position-2 aon-icon-effect">
                        <div className="aon-step-icon">
                            <span>
                            <i className="aon-icon">
                                <img src="images/step-icon/2.png" alt="" />
                            </i>
                            </span>
                        </div>
                        <div className="aon-step-info">
                            <h4 className="aon-title">Choose a Tasker</h4>
                            <p>This helps us determine which Taskers are best job.</p>
                        </div>
                        </div>
                    </div>

                    {/* COLUMNS 3 */}
                    <div className="col-md-4 col-sm-4 m-b30">
                        <div className="aon-step-section step-position-3 aon-icon-effect">
                        <div className="aon-step-icon">
                            <span>
                            <i className="aon-icon">
                                <img src="images/step-icon/3.png" alt="" />
                            </i>
                            </span>
                        </div>
                        <div className="aon-step-info">
                            <h4 className="aon-title">Live Smarter</h4>
                            <p>This helps us determine which Taskers are best job.</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                {/* Steps Block End */}
                </div>
            </div>
            </div>
         </div>
        </section>
        {/* How it Work END */}

        {/* Featured Vendor */}
        <section className="site-bg-gray aon-feature-provider-area sf-curve-pos">
        <div className="container">
            {/* Title Section Start */}
            <div className="section-head">
            <div className="row">
                <div className="col-lg-6 col-md-12">
                <span className="aon-sub-title">Vendor</span>
                <h2 className="sf-title">Featured Providers</h2>
                </div>
                <div className="col-lg-6 col-md-12">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do usmod tempor
                    incididunt ut labore et dolore magna aliqua.
                </p>
                </div>
            </div>
            </div>
            {/* Title Section End */}

            <div className="section-content">
            <div className="row">
                <div className="owl-carousel aon-featurd-provider-carousel aon-owl-arrow">
                {/* COLUMNS 1 */}
                <div className="item">
                    <div className="aon-ow-provider-wrap">
                    <div className="aon-ow-provider shine-hover">
                        <div className="aon-ow-top">
                        <div className="aon-pro-check">
                            <span>
                            <i className="fa fa-check"></i>
                            </span>
                        </div>
                        <div className="aon-pro-favorite">
                            <a href="#">
                            <i className="fa fa-heart-o"></i>
                            </a>
                        </div>
                        <div className="aon-ow-info">
                            <h4 className="aon-title">
                            <a href="profile-full.html">Edward Luise</a>
                            </h4>
                            <span>Queens, United States</span>
                        </div>
                        </div>
                        <div className="aon-ow-mid">
                        <div className="aon-ow-media media-bg-animate">
                            <a href="profile-full.html" className="shine-box">
                            <img src="images/providers/1.jpg" alt="" />
                            </a>
                        </div>
                        <p>
                            Through our expertise, technological knowledge, global presence and
                            bespoke.
                        </p>
                        <div className="aon-ow-pro-rating">
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star text-gray"></span>
                        </div>
                        </div>
                    </div>
                    <div className="aon-ow-bottom">
                        <a href="profile-full.html">Request A Quote</a>
                    </div>
                    </div>
                </div>
                {/* COLUMNS 2 */}
                <div className="item">
                    <div className="aon-ow-provider-wrap">
                    <div className="aon-ow-provider shine-hover">
                        <div className="aon-ow-top">
                        <div className="aon-pro-check">
                            <span>
                            <i className="fa fa-check"></i>
                            </span>
                        </div>
                        <div className="aon-pro-favorite">
                            <a href="#">
                            <i className="fa fa-heart-o"></i>
                            </a>
                        </div>
                        <div className="aon-ow-info">
                            <h4 className="aon-title">
                            <a href="profile-full.html">Javier Bardem</a>
                            </h4>
                            <span>Queens, United States</span>
                        </div>
                        </div>
                        <div className="aon-ow-mid">
                        <div className="aon-ow-media media-bg-animate">
                            <a href="profile-full.html" className="shine-box">
                            <img src="images/providers/2.jpg" alt="" />
                            </a>
                        </div>
                        <p>
                            Through our expertise, technological knowledge, global presence and
                            bespoke.
                        </p>
                        <div className="aon-ow-pro-rating">
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star text-gray"></span>
                        </div>
                        </div>
                    </div>
                    <div className="aon-ow-bottom">
                        <a href="profile-full.html">Request A Quote</a>
                    </div>
                    </div>
                </div>
                {/* COLUMNS 3 */}
                <div className="item">
                    <div className="aon-ow-provider-wrap">
                    <div className="aon-ow-provider shine-hover">
                        <div className="aon-ow-top">
                        <div className="aon-pro-check">
                            <span>
                            <i className="fa fa-check"></i>
                            </span>
                        </div>
                        <div className="aon-pro-favorite">
                            <a href="#">
                            <i className="fa fa-heart-o"></i>
                            </a>
                        </div>
                        <div className="aon-ow-info">
                            <h4 className="aon-title">
                            <a href="profile-full.html">Mila Kunis</a>
                            </h4>
                            <span>Queens, United States</span>
                        </div>
                        </div>
                        <div className="aon-ow-mid">
                        <div className="aon-ow-media media-bg-animate">
                            <a className="shine-box" href="profile-full.html">
                            <img src="images/providers/3.jpg" alt="" />
                            </a>
                        </div>
                        <p>
                            Through our expertise, technological knowledge, global presence and
                            bespoke.
                        </p>
                        <div className="aon-ow-pro-rating">
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star text-gray"></span>
                        </div>
                        </div>
                    </div>
                    <div className="aon-ow-bottom">
                        <a href="profile-full.html">Request A Quote</a>
                    </div>
                    </div>
                </div>
                {/* COLUMNS 4 */}
                <div className="item">
                    <div className="aon-ow-provider-wrap">
                    <div className="aon-ow-provider shine-hover">
                        <div className="aon-ow-top">
                        <div className="aon-pro-check">
                            <span>
                            <i className="fa fa-check"></i>
                            </span>
                        </div>
                        <div className="aon-pro-favorite">
                            <a href="#">
                            <i className="fa fa-heart-o"></i>
                            </a>
                        </div>
                        <div className="aon-ow-info">
                            <h4 className="aon-title">
                            <a href="profile-full.html">Edward Luise</a>
                            </h4>
                            <span>Queens, United States</span>
                        </div>
                        </div>
                        <div className="aon-ow-mid">
                        <div className="aon-ow-media media-bg-animate">
                            <a href="profile-full.html" className="shine-box">
                            <img src="images/providers/4.jpg" alt="" />
                            </a>
                        </div>
                        <p>
                            Through our expertise, technological knowledge, global presence and
                            bespoke.
                        </p>
                        <div className="aon-ow-pro-rating">
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star text-gray"></span>
                        </div>
                        </div>
                    </div>
                    <div className="aon-ow-bottom">
                        <a href="profile-full.html">Request A Quote</a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        {/* Featured Vendor END */}

        {/* Statics */}
        <div className="site-bg-primary aon-statics-area sf-curve-pos">
        <div className="container">
            <div className="section-content">
            <div className="row d-flex flex-wrap align-items-center a-b-none">
                <div className="col-lg-6 col-md-12">
                {/* Title Section Start */}
                <div className="section-head">
                    <span className="aon-sub-title">Statics</span>
                    <h2 className="sf-title">Trusted by thousands of people all over the world</h2>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
                    gravida.
                    </p>
                </div>
                {/* Title Section End */}
                </div>
                <div className="col-lg-6 col-md-12">
                {/* Statics-blocks Section Start */}
                <div className="aon-statics-blocks">
                    <div className="row">
                    {/* Block 1 */}
                    <div className="col-lg-6 m-b30 aon-static-position-1">
                        <div className="media-bg-animate media-statics aon-icon-effect">
                        <div className="aon-static-section aon-t-blue">
                            <div className="aon-company-static-num counter aon-icon">36</div>
                            <div className="aon-company-static-name">Providers</div>
                        </div>
                        </div>
                        <div className="media-bg-animate media-statics aon-icon-effect">
                        <div className="aon-static-section aon-t-yellow">
                            <div className="aon-company-static-num counter aon-icon">108</div>
                            <div className="aon-company-static-name">Jobs</div>
                        </div>
                        </div>
                    </div>

                    {/* Block 2 */}
                    <div className="col-lg-6 m-b30 aon-static-position-2">
                        <div className="media-bg-animate media-statics aon-icon-effect">
                        <div className="aon-static-section aon-t-green">
                            <div className="aon-company-static-num counter aon-icon">89</div>
                            <div className="aon-company-static-name">Customer</div>
                        </div>
                        </div>
                        <div className="media-bg-animate media-statics aon-icon-effect">
                        <div className="aon-static-section aon-t-skyblue">
                            <div className="aon-company-static-num counter aon-icon">59</div>
                            <div className="aon-company-static-name">Categories</div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                {/* Statics-blocks Section End */}
                </div>
            </div>
            </div>
        </div>
        </div>
        {/* Provider END */}

        {/* Latest Blog */}
        <div className="aon-news-section-wrap sf-curve-pos">
        <div className="container">
            {/* Title Section Start */}
            <div className="section-head">
            <div className="row">
                <div className="col-lg-6 col-md-12">
                <span className="aon-sub-title">News</span>
                <h2 className="sf-title">Recent News Articles</h2>
                </div>
                <div className="col-lg-6 col-md-12">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do usmod tempor
                    incididunt ut labore et dolore magna aliqua.
                </p>
                </div>
            </div>
            </div>
            {/* Title Section End */}

            <div className="section-content">
            <div className="row">
                {/* COLUMNS 1 */}
                <div className="col-md-4">
                <div className="media-bg-animate">
                    <div className="aon-blog-section-1 shine-hover">
                    <div className="aon-post-media shine-box">
                        <a href="blog-detail.html">
                        <img src="images/blog/latest-blog1/1.jpg" alt="" />
                        </a>
                    </div>
                    <div className="aon-post-meta">
                        <ul>
                        <li className="aon-post-category">Latest</li>
                        <li className="aon-post-author">
                            <a href="blog-detail.html">
                            By |<span>Admin</span>
                            </a>
                        </li>
                        </ul>
                    </div>
                    <div className="aon-post-info">
                        <h4 className="aon-post-title">
                        <a href="blog-detail.html">Helping Companies in their Green.</a>
                        </h4>
                        <div className="aon-post-text">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                {/* COLUMNS 2 */}
                <div className="col-md-4">
                <div className="media-bg-animate">
                    <div className="aon-blog-section-1 shine-hover">
                    <div className="aon-post-media shine-box">
                        <a href="blog-detail.html">
                        <img src="images/blog/latest-blog1/2.jpg" alt="" />
                        </a>
                    </div>
                    <div className="aon-post-meta">
                        <ul>
                        <li className="aon-post-category">Latest</li>
                        <li className="aon-post-author">
                            <a href="blog-detail.html">
                            By |<span>Admin</span>
                            </a>
                        </li>
                        </ul>
                    </div>
                    <div className="aon-post-info">
                        <h4 className="aon-post-title">
                        <a href="blog-detail.html">There are two thing is very important.</a>
                        </h4>
                        <div className="aon-post-text">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                {/* COLUMNS 3 */}
                <div className="col-md-4">
                <div className="media-bg-animate">
                    <div className="aon-blog-section-1 shine-hover">
                    <div className="aon-post-media shine-box">
                        <a href="blog-detail.html">
                        <img src="images/blog/latest-blog1/3.jpg" alt="" />
                        </a>
                    </div>
                    <div className="aon-post-meta">
                        <ul>
                        <li className="aon-post-category">Latest</li>
                        <li className="aon-post-author">
                            <a href="blog-detail.html">
                            By |<span>Admin</span>
                            </a>
                        </li>
                        </ul>
                    </div>
                    <div className="aon-post-info">
                        <h4 className="aon-post-title">
                        <a href="blog-detail.html">Officia deserunt mollit anim id labrum.</a>
                        </h4>
                        <div className="aon-post-text">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
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
        {/* Latest Blog END */}

        {/* Why Choose us */}
        <div className="aon-whycoose-area sf-curve-pos">
        <div className="container-fluid">
            <div className="sf-whycoose-section">
            <div className="row sf-w-choose-bg-outer d-flex flex-wrap a-b-none">
                {/* Left Section */}
                <div className="col-md-7 margin-b-50 sf-w-choose-left-cell">
                <div className="sf-w-choose-info-left">
                    {/* Title Section Start */}
                    <div className="section-head">
                    <div className="row">
                        <div className="col-md-12 margin-b-50">
                        <span className="aon-sub-title">Choose</span>
                        <h2 className="sf-title">Why Choose us</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        </div>
                    </div>
                    </div>
                    {/* Title Section End */}

                    {/* COLUMNS 1 */}
                    <div className="sf-w-choose margin-b-20">
                    <div className="sf-w-choose-icon">
                        <span>
                        <img src="images/whychoose/1.png" alt="" />
                        </span>
                    </div>
                    <div className="sf-w-choose-info">
                        <h4 className="sf-title">Meet new customers</h4>
                        <p>
                        Suspendisse tincidunt rutrum ante. Vestibulum elementum ipsum sit amet
                        turpis elementum lobortis.
                        </p>
                    </div>
                    </div>
                    {/* COLUMNS 2 */}
                    <div className="sf-w-choose margin-b-20">
                    <div className="sf-w-choose-icon">
                        <span>
                        <img src="images/whychoose/2.png" alt="" />
                        </span>
                    </div>
                    <div className="sf-w-choose-info">
                        <h4 className="sf-title">Grow your revenue</h4>
                        <p>
                        Suspendisse tincidunt rutrum ante. Vestibulum elementum ipsum sit amet
                        turpis elementum lobortis.
                        </p>
                    </div>
                    </div>
                    {/* COLUMNS 3 */}
                    <div className="sf-w-choose">
                    <div className="sf-w-choose-icon">
                        <span>
                        <img src="images/whychoose/3.png" alt="" />
                        </span>
                    </div>
                    <div className="sf-w-choose-info">
                        <h4 className="sf-title">Build your online reputation</h4>
                        <p>
                        Suspendisse tincidunt rutrum ante. Vestibulum elementum ipsum sit amet
                        turpis elementum lobortis.
                        </p>
                    </div>
                    </div>
                </div>
                </div>
                {/* Right Section */}
                <div className="col-md-5 sf-w-choose-bg-wrap sf-w-choose-right-cell">
                <div
                    className="sf-w-choose-bg"
                    style={{ backgroundImage: 'url(images/background/bg1.jpg)' }}
                ></div>
                </div>
            </div>
            </div>
        </div>
        </div>
        {/* Why Choose us END */}

        {/* Jobs Section */}
        <div className="aon-recent-post-area sf-curve-pos">
          <div className="container">
            {/* Title Section Start */}
            <div className="section-head">
            <div className="row">
                <div className="col-lg-6 col-md-12">
                <span className="aon-sub-title">Jobs</span>
                <h2 className="sf-title">Recently Posted Jobs</h2>
                </div>
                <div className="col-lg-6 col-md-12">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do usmod tempor
                    incididunt ut labore et dolore magna aliqua.
                </p>
                </div>
            </div>
            </div>
            {/* Title Section End */}

            <div className="section-content">
            <div className="sf-blog-section-1-wrap">
                <div className="row">
                {/* COLUMNS 1 */}
                <div className="col-lg-4 col-md-6">
                    <div className="media-bg-animate">
                    <div className="sf-jobs-section">
                        <div className="sf-jobs-head">
                        <a href="job-detail.html" className="sf-jobs-media">
                            <img src="images/jobs/1.jpg" alt="" />
                        </a>
                        <span className="sf-jobs-position">Freelance</span>
                        </div>
                        <div className="sf-jobs-info">
                        <div className="sf-job-company">Blue Hills Pvt.LTD</div>
                        <h4 className="sf-title">
                            <a href="job-detail.html">Account Executive Required</a>
                        </h4>
                        <p>
                            Lorem ipsum dolor sit amet, sectetur adipiscing elit, sed do eiusmod temp
                            incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
                        </p>
                        </div>
                        <div className="sf-jobs-footer">
                        <div className="sf-job-location">
                            <i className="fa fa-map-marker"></i>London
                        </div>
                        <div className="sf-jobs-cost">
                            <span>$25</span>/hour
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                {/* COLUMNS 2 */}
                <div className="col-lg-4 col-md-6">
                    <div className="media-bg-animate">
                    <div className="sf-jobs-section">
                        <div className="sf-jobs-head">
                        <a href="job-detail.html" className="sf-jobs-media">
                            <img src="images/jobs/2.jpg" alt="" />
                        </a>
                        <span className="sf-jobs-position">Freelance</span>
                        </div>
                        <div className="sf-jobs-info">
                        <div className="sf-job-company">Blue Hills Pvt.LTD</div>
                        <h4 className="sf-title">
                            <a href="job-detail.html">Project Manager Required</a>
                        </h4>
                        <p>
                            Lorem ipsum dolor sit amet, sectetur adipiscing elit, sed do eiusmod temp
                            incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
                        </p>
                        </div>
                        <div className="sf-jobs-footer">
                        <div className="sf-job-location">
                            <i className="fa fa-map-marker"></i>London
                        </div>
                        <div className="sf-jobs-cost">
                            <span>$25</span>/hour
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                {/* COLUMNS 3 */}
                <div className="col-lg-4 col-md-6">
                    <div className="media-bg-animate">
                    <div className="sf-jobs-section">
                        <div className="sf-jobs-head">
                        <a href="job-detail.html" className="sf-jobs-media">
                            <img src="images/jobs/3.jpg" alt="" />
                        </a>
                        <span className="sf-jobs-position">Freelance</span>
                        </div>
                        <div className="sf-jobs-info">
                        <div className="sf-job-company">Blue Hills Pvt.LTD</div>
                        <h4 className="sf-title">
                            <a href="job-detail.html">Electrician Required in Brooklyn</a>
                        </h4>
                        <p>
                            Lorem ipsum dolor sit amet, sectetur adipiscing elit, sed do eiusmod temp
                            incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
                        </p>
                        </div>
                        <div className="sf-jobs-footer">
                        <div className="sf-job-location">
                            <i className="fa fa-map-marker"></i>London
                        </div>
                        <div className="sf-jobs-cost">
                            <span>$25</span>/hour
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                {/* COLUMNS 4 */}
                <div className="col-lg-4 col-md-6">
                    <div className="media-bg-animate">
                    <div className="sf-jobs-section">
                        <div className="sf-jobs-head">
                        <a href="job-detail.html" className="sf-jobs-media">
                            <img src="images/jobs/4.jpg" alt="" />
                        </a>
                        <span className="sf-jobs-position">Freelance</span>
                        </div>
                        <div className="sf-jobs-info">
                        <div className="sf-job-company">Blue Hills Pvt.LTD</div>
                        <h4 className="sf-title">
                            <a href="job-detail.html">Librarian Required in Brooklyn</a>
                        </h4>
                        <p>
                            Lorem ipsum dolor sit amet, sectetur adipiscing elit, sed do eiusmod temp
                            incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
                        </p>
                        </div>
                        <div className="sf-jobs-footer">
                        <div className="sf-job-location">
                            <i className="fa fa-map-marker"></i>London
                        </div>
                        <div className="sf-jobs-cost">
                            <span>$25</span>/hour
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                {/* COLUMNS 5 */}
                <div className="col-lg-4 col-md-6">
                    <div className="media-bg-animate">
                    <div className="sf-jobs-section">
                        <div className="sf-jobs-head">
                        <a href="javascript:void(0);" className="sf-jobs-media">
                            <img src="images/jobs/5.jpg" alt="" />
                        </a>
                        <span className="sf-jobs-position">Freelance</span>
                        </div>
                        <div className="sf-jobs-info">
                        <div className="sf-job-company">Blue Hills Pvt.LTD</div>
                        <h4 className="sf-title">
                            <a href="javascript:void(0);">Nursing Assistant Required</a>
                        </h4>
                        <p>
                            Lorem ipsum dolor sit amet, sectetur adipiscing elit, sed do eiusmod temp
                            incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
                        </p>
                        </div>
                        <div className="sf-jobs-footer">
                        <div className="sf-job-location">
                            <i className="fa fa-map-marker"></i>London
                        </div>
                        <div className="sf-jobs-cost">
                            <span>$25</span>/hour
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                {/* COLUMNS 6 */}
                <div className="col-lg-4 col-md-6">
                    <div className="media-bg-animate">
                    <div className="sf-jobs-section">
                        <div className="sf-jobs-head">
                        <a href="javascript:void(0);" className="sf-jobs-media">
                            <img src="images/jobs/6.jpg" alt="" />
                        </a>
                        <span className="sf-jobs-position">Freelance</span>
                        </div>
                        <div className="sf-jobs-info">
                        <div className="sf-job-company">Blue Hills Pvt.LTD</div>
                        <h4 className="sf-title">
                            <a href="javascript:void(0);">President of Sales Required</a>
                        </h4>
                        <p>
                            Lorem ipsum dolor sit amet, sectetur adipiscing elit, sed do eiusmod temp
                            incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
                        </p>
                        </div>
                        <div className="sf-jobs-footer">
                        <div className="sf-job-location">
                            <i className="fa fa-map-marker"></i>London
                        </div>
                        <div className="sf-jobs-cost">
                            <span>$25</span>/hour
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
          </div>
        </div>
        {/* Jobs Section END */}

        {/* Pricing Plan Section */}
        <div className="aon-pricing-area sf-curve-pos">
        <div className="container">
            {/* Title Section Start */}
            <div className="section-head">
            <div className="row">
                <div className="col-lg-6 col-md-12">
                <span className="aon-sub-title">Pricing</span>
                <h2 className="aon-title">Our Pricing Plans</h2>
                </div>
                <div className="col-lg-6 col-md-12">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do usmod tempor
                    incididunt ut labore et dolore magna aliqua.
                </p>
                </div>
            </div>
            </div>
            {/* Title Section End */}

            <div className="section-content">
            {/* Pricing Table Button */}
            <div className="sf-priceing-tb-control">
                <span>Bill Monthly</span>
                <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
                </label>
                <span>Bill Yearly</span>
            </div>
            {/* Pricing Table Button */}

            <div className="sf-pricing-section-outer">
                <div className="row no-gutter">
                {/* COLUMNS 1 */}
                <div className="col-md-3">
                    <div className="sf-pricing-section">
                    <div className="sf-price-tb-info">
                        <div className="sf-price-plan-name">Intro</div>
                        <div className="sf-price-plan-discount">Save 20%</div>
                    </div>
                    <div className="sf-price-tb-list">
                        <ul>
                        <li>
                            <i className="fa fa-check"></i> Booking
                        </li>
                        <li>
                            <i className="fa fa-check"></i> Own Cover Image
                        </li>
                        <li className="disable">
                            <i className="fa fa-check"></i> Multiple Categories
                        </li>
                        <li className="disable">
                            <i className="fa fa-check"></i> Apply for Job
                        </li>
                        <li className="disable">
                            <i className="fa fa-check"></i> Job Alerts
                        </li>
                        <li className="disable">
                            <i className="fa fa-check"></i> Google Calendar
                        </li>
                        <li className="disable">
                            <i className="fa fa-check"></i> Crop Profile Image
                        </li>
                        </ul>
                    </div>
                    <div className="sf-price-tb-plan">
                        <div className="sf-price-plan-cost">
                        $<span>29</span>/month
                        </div>
                    </div>
                    <a href="contact-us.html" className="sf-choose-plan-btn">
                        Choose Plan
                    </a>
                    </div>
                </div>
                {/* COLUMNS 2 */}
                <div className="col-md-3">
                    <div className="sf-pricing-section">
                    <div className="sf-price-tb-info">
                        <div className="sf-price-plan-name">Base</div>
                        <div className="sf-price-plan-discount">Save 20%</div>
                    </div>
                    <div className="sf-price-tb-list">
                        <ul>
                        <li>
                            <i className="fa fa-check"></i> Booking
                        </li>
                        <li>
                            <i className="fa fa-check"></i> Own Cover Image
                        </li>
                        <li>
                            <i className="fa fa-check"></i> Multiple Categories
                        </li>
                        <li>
                            <i className="fa fa-check"></i> Apply for Job
                        </li>
                        <li>
                            <i className="fa fa-check"></i> Job Alerts
                        </li>
                        <li className="disable">
                            <i className="fa fa-check"></i> Google Calendar
                        </li>
                        <li className="disable">
                            <i className="fa fa-check"></i> Crop Profile Image
                        </li>
                        </ul>
                    </div>
                    <div className="sf-price-tb-plan">
                        <div className="sf-price-plan-cost">
                        $<span>39</span>/month
                        </div>
                    </div>
                    <a href="contact-us.html" className="sf-choose-plan-one-btn">
                        Choose Plan
                    </a>
                    </div>
                </div>
                {/* COLUMNS 3 */}
                <div className="col-md-3">
                    <div className="sf-pricing-section sf-pricing-active">
                    <div className="sf-price-tb-info">
                        <div className="sf-price-plan-name">Pro</div>
                        <div className="sf-price-plan-discount">Save 20%</div>
                    </div>
                    <div className="sf-price-tb-list">
                        <ul>
                        <li>
                            <i className="fa fa-check"></i> Booking
                        </li>
                        <li>
                            <i className="fa fa-check"></i> Own Cover Image
                        </li>
                        <li>
                            <i className="fa fa-check"></i> Multiple Categories
                        </li>
                        <li>
                            <i className="fa fa-check"></i> Apply for Job
                        </li>
                        <li>
                            <i className="fa fa-check"></i> Job Alerts
                        </li>
                        <li>
                            <i className="fa fa-check"></i> Google Calendar
                        </li>
                        <li>
                            <i className="fa fa-check"></i> Crop Profile Image
                        </li>
                        </ul>
                    </div>
                    <div className="sf-price-tb-plan">
                        <div className="sf-price-plan-cost">
                        $<span>49</span>/month
                        </div>
                    </div>
                    <a href="contact-us.html" className="sf-choose-plan-btn">
                        Try 1 Month
                    </a>
                    </div>
                </div>
                {/* COLUMNS 4 */}
                <div className="col-md-3">
                    <div className="sf-pricing-section">
                    <div className="sf-price-tb-info">
                        <div className="sf-price-plan-name">Enterprise</div>
                        <div className="sf-price-plan-discount">Save 20%</div>
                    </div>
                    <div className="sf-price-tb-list">
                        <ul>
                        <li>
                            <i className="fa fa-check"></i> Booking
                        </li>
                        <li>
                            <i className="fa fa-check"></i> Own Cover Image
                        </li>
                        <li>
                            <i className="fa fa-check"></i> Multiple Categories
                        </li>
                        <li>
                            <i className="fa fa-check"></i> Apply for Job
                        </li>
                        <li>
                            <i className="fa fa-check"></i> Job Alerts
                        </li>
                        <li>
                            <i className="fa fa-check"></i> Google Calendar
                        </li>
                        <li>
                            <i className="fa fa-check"></i> Crop Profile Image
                        </li>
                        </ul>
                    </div>
                    <div className="sf-price-tb-plan">
                        <div className="sf-price-plan-cost">
                        $<span>89</span>/month
                        </div>
                    </div>
                    <a href="contact-us.html" className="sf-choose-plan-btn">
                        Choose Plan
                    </a>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        {/* Pricing Plan Section END */}

        {/* Testimonial Section */}
        <div className="aon-testmonials-area sf-curve-pos">
        <div className="container">
            {/* Title Section Start */}
            RPMI
            <div className="section-head">
            <div className="row">
                <div className="col-lg-6 col-md-12">
                <span className="sf-sub-title">Testimonial</span>
                <h2 className="sf-title">What People Say</h2>
                </div>
                <div className="col-lg-6 col-md-12">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do usmod tempor
                    incididunt ut labore et dolore magna aliqua.
                </p>
                </div>
            </div>
            </div>
            {/* Title Section End */}

            <div className="section-content">
            {/* Testimonial top */}
            <div className="slider-vertical-wrap">
                {/* THUMBNAILS */}
                <div className="slick-testimonials-thumbnails">
                {/* COLUMNS 1 */}
                <div className="slick-item">
                    <div className="sf-testimonial-user">
                    <div className="sf-testimonial-media">
                        <img src="images/testimonials/pic1.jpg" alt="" />
                    </div>
                    <div className="sf-testimonial-user-detail">
                        <div className="sf-testi-user-name">Mark, Homestay</div>
                        <div className="sf-testi-user-position">Sales Manager</div>
                    </div>
                    </div>
                </div>
                {/* COLUMNS 2 */}
                <div className="slick-item">
                    <div className="sf-testimonial-user">
                    <div className="sf-testimonial-media">
                        <img src="images/testimonials/pic1.jpg" alt="" />
                    </div>
                    <div className="sf-testimonial-user-detail">
                        <div className="sf-testi-user-name">Mark, Homestay</div>
                        <div className="sf-testi-user-position"> Sales Manager</div>
                    </div>
                    </div>
                </div>
                {/* COLUMNS 3 */}
                <div className="slick-item">
                    <div className="sf-testimonial-user">
                    <div className="sf-testimonial-media">
                        <img src="images/testimonials/pic2.jpg" alt="" />
                    </div>
                    <div className="sf-testimonial-user-detail">
                        <div className="sf-testi-user-name">Mark, Homestay</div>
                        <div className="sf-testi-user-position">Sales Manager</div>
                    </div>
                    </div>
                </div>
                {/* COLUMNS 4 */}
                <div className="slick-item">
                    <div className="sf-testimonial-user">
                    <div className="sf-testimonial-media">
                        <img src="images/testimonials/pic3.jpg" alt="" />
                    </div>
                    <div className="sf-testimonial-user-detail">
                        <div className="sf-testi-user-name">Mark, Homestay</div>
                        <div className="sf-testi-user-position">Sales Manager</div>
                    </div>
                    </div>
                </div>
                </div>
                {/* MAIN SLIDES */}
                <div className="slick-testimonials-carousel">
                {/* COLUMNS 1 */}
                <div className="slick-item">
                    <div className="sf-testimonial-info text-center">
                    <div className="sf-testimonial-title">It was a great experience</div>
                    <div className="sf-ow-pro-rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star text-gray"></span>
                    </div>
                    <div className="sf-testimonial-text">
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and scrambled it to
                        make a type specimen book. It has survived not only five centuries, but
                        also the leap into electronic typesetting
                        </p>
                    </div>
                    <div className="sf-testimonial-quote">
                        <i className="fa fa-quote-left"></i>
                    </div>
                    </div>
                </div>
                {/* COLUMNS 2 */}
                <div className="slick-item">
                    <div className="sf-testimonial-info text-center">
                    <div className="sf-testimonial-title">It was a great experience</div>
                    <div className="sf-ow-pro-rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star text-gray"></span>
                    </div>
                    <div className="sf-testimonial-text">
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and scrambled it to
                        make a type specimen book. It has survived not only five centuries, but
                        also the leap into electronic typesetting
                        </p>
                    </div>
                    <div className="sf-testimonial-quote">
                        <i className="fa fa-quote-left"></i>
                    </div>
                    </div>
                </div>
                {/* COLUMNS 3 */}
                <div className="slick-item">
                    <div className="sf-testimonial-info text-center">
                    <div className="sf-testimonial-title">It was a great experience</div>
                    <div className="sf-ow-pro-rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star text-gray"></span>
                    </div>
                    <div className="sf-testimonial-text">
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and scrambled it to
                        make a type specimen book. It has survived not only five centuries, but
                        also the leap into electronic typesetting
                        </p>
                    </div>
                    <div className="sf-testimonial-quote">
                        <i className="fa fa-quote-left"></i>
                    </div>
                    </div>
                </div>
                {/* COLUMNS 4 */}
                <div className="slick-item">
                    <div className="sf-testimonial-info text-center">
                    <div className="sf-testimonial-title">It was a great experience</div>
                    <div className="sf-ow-pro-rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star text-gray"></span>
                    </div>
                    <div className="sf-testimonial-text">
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and scrambled it to
                        make a type specimen book. It has survived not only five centuries, but
                        also the leap into electronic typesetting
                        </p>
                    </div>
                    <div className="sf-testimonial-quote">
                        <i className="fa fa-quote-left"></i>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        {/* Testimonial Section END */}
      </div>
      <LoginModal />
    </>
  )
}
