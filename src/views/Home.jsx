import React, {useState, useEffect} from 'react'
import LoginModal from '../components/LoginModal'
import axiosClient from '../axios-client'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { CATEGORIES_IMAGES } from '../utils/data'
import Footer from '../components/Footer'

export default function Home() {
  const [categories, setCategories] = useState([])

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const getCategories = () => {
    axiosClient.get('/categories')
    .then(({ data }) => {
      console.log(data)
      setCategories(data)
    })
    .catch((error) => {
    });
  }

  useEffect(() => {
    getCategories()
  }, [])
  
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
            <img src="images/banner.jpg" width="1919" height="976" alt="" />
            </div>
            <div className="aon-banner-text">
            <div className="container">
                <div className="aon-bnr-write">
                <h2 className="text-top-line underline">
                    Trouvez de <span className="text-secondry">des contracteurs</span> à proximite.
                </h2>
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
                        <label>Recherche</label>
                        <input
                            type="text"
                            value=""
                            placeholder=""
                            id="keyword"
                            name="keyword"
                            className="form-control sf-form-control"
                        />
                        <span className="sf-search-icon">
                            <img src="images/search-bar/keyword.png" alt="" />
                        </span>
                        </li>
                        <li>
                        <label>Categories</label>
                        <select
                            id="categorysrh"
                            name="catid"
                            className="form-control sf-form-control aon-categories-select sf-select-box"
                            title="Select Category"
                        >
                            <option className="bs-title-option" value="">
                            Selectionner Une Categorie
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
                            Plomber
                            </option>
                            <option
                            value="19"
                            data-content="<img class='childcat-img' width='50' height='auto' src=images\cat-thum\cat-5.jpg><span class='childcat'>Electrician</span>"
                            >
                            Electricien
                            </option>
                        </select>
                        <span className="sf-search-icon">
                            <img src="images/search-bar/maintenance.png" alt="" />
                        </span>
                        </li>
                        <li>
                        <label>Ville</label>
                        <select
                            className="sf-select-box form-control sf-form-control"
                            data-live-search="true"
                            required
                            name="city"
                            id="city"
                            title="Ville"
                           // data-header="Select a City"
                        >
                            <option value="">Select Ville</option>
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
                        <i className="fa fa-search"></i> Recherchez
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
                <h2 className="aon-title">Améliorez votre qualité de vie avec les services à domicile</h2>
                </div>
                <div className="col-lg-6 col-md-12">
                </div>
            </div>
            </div>
            {/* Title Section End */}

            <div className="section-content">
              <div className="owl-carousels categories-carousel-owls aon-owl-arrow">
              <Carousel 
                infinite={true}
                autoPlay={true}
                responsive={responsive}>
                    {
                      categories.map((categorie, index) => (
                        <div key={index} className="item m-1">
                            <div className="aon-cat-item">
                              <div className="aon-cat-pic media-bg-animate shine-hover">
                                <a className="shine-box" href="categories-detail.html">
                                    <img width='477' height='600' src={`images/categories/${CATEGORIES_IMAGES[categorie.js_key]}.png`} alt="" />
                                </a>
                              </div>
                              <h4 className="aon-cat-title">{categorie.name}</h4>
                            </div>
                          </div>
                      ))
                    } 
                   </Carousel>
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
                <span className="aon-sub-title">Étapes</span>
                <h2 className="sf-title">Comment WARAPS fonctionne</h2>
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
                            <h4 className="aon-title">Choisissez la tâche</h4>
                            <p>Parmi les categories ou formuler une demande speciale.</p>
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
                            <h4 className="aon-title">Choisissez le spécialiste</h4>
                            <p>Parmi la liste des specialistes.</p>
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
                            <h4 className="aon-title">Faites une Reservation</h4>
                            <p>Vous recevrez une confirmation.</p>
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
        <section className="site-bg-gray aon-feature-provider-area sf-curve-pos" id='specialistes'>
        <div className="container">
            {/* Title Section Start */}
            <div className="section-head">
            <div className="row">
                <div className="col-lg-6 col-md-12">
                <span className="aon-sub-title">Specialistes</span>
                <h2 className="sf-title">Des experts qualifiés et notés</h2>
                </div>
                <div className="col-lg-6 col-md-12">
         
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
                    <span className="aon-sub-title"></span>
                    <h2 className="sf-title">Leader camerounais reliant pros qualifiés et ménages</h2>
                    <p>
                    Leader camerounais connectant plus de 1000 professionnels qualifiés et évalués aux ménages pour des services à domicile fiables et efficaces.
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
                            <div className="aon-company-static-name">Spécialistes</div>
                        </div>
                        </div>
                        <div className="media-bg-animate media-statics aon-icon-effect">
                        <div className="aon-static-section aon-t-yellow">
                            <div className="aon-company-static-num counter aon-icon">108</div>
                            <div className="aon-company-static-name">Tâches</div>
                        </div>
                        </div>
                    </div>

                    {/* Block 2 */}
                    <div className="col-lg-6 m-b30 aon-static-position-2">
                        <div className="media-bg-animate media-statics aon-icon-effect">
                        <div className="aon-static-section aon-t-green">
                            <div className="aon-company-static-num counter aon-icon">89</div>
                            <div className="aon-company-static-name">Clients</div>
                        </div>
                        </div>
                        <div className="media-bg-animate media-statics aon-icon-effect">
                        <div className="aon-static-section aon-t-skyblue">
                            <div className="aon-company-static-num counter aon-icon">80</div>
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
                        <span className="aon-sub-title">Choisissez nous</span>
                        <h2 className="sf-title">Pourquoi nous choisir?</h2>
                      
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
                        <h4 className="sf-title">Large réseau de professionnels</h4>
                        <p>Accédez à 308 000 prestataires de services à domicile qualifiés et évalués</p>
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
                        <h4 className="sf-title">Mise en relation rapide</h4>
                        <p>Leader camerounais, nous connectons efficacement ménages et experts pour des services fiables</p>
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
                        <h4 className="sf-title">Confiance et simplicité</h4>
                        <p>Une plateforme intuitive pour trouver le bon professionnel en toute sérénité</p>
                    </div>
                    </div>
                </div>
                </div>
                {/* Right Section */}
                <div className="col-md-5 sf-w-choose-bg-wrap sf-w-choose-right-cell">
                <div
                    className="sf-w-choose-bg"
                    style={{ backgroundImage: 'url(images/whychoose/whychoose.jpg)' }}
                ></div>
                </div>
            </div>
            </div>
        </div>
        </div>
        {/* Why Choose us END */}
      </div>
      <LoginModal />
      <Footer categories={categories} />
    </>
  )
}
