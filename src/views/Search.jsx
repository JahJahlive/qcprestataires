import React, {useState, useEffect} from 'react'
import LoginModal from '../components/LoginModal'
import axiosClient from '../axios-client'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { CATEGORIES_IMAGES } from '../utils/data'
import Footer from '../components/Footer'

export default function Search() {
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
    {/* Content */}
    <div className="page-content">
        
        {/* Search Panel Area */}
        <div className="sf-seach-vertical sf-search-bar-panel">
            <div className="search-form ">
              <form className="clearfix search-providers" method="get">

                  <div className="sf-searchbar-box">
                    <ul className="sf-searchbar-area">
                      <li>
                        <div className="sf-search-title">  
                            <label>Mots Cles</label>
                            <span className="sf-search-icon"><img src="images/search-bar/keyword.png" alt=""/></span>
                        </div>
                        <div className="sf-search-feild">
                            <input type="text" value="" placeholder="" id="keyword" name="keyword" className="form-control sf-form-control"/>
                        </div>
                      </li>
                      <li>
                        <div className="sf-search-title">
                            <label>Categorie</label>
                            <span className="sf-search-icon"><img src="images/search-bar/maintenance.png" alt=""/></span>
                        </div>
                        <div className="sf-search-feild">
                            <select id="categorysrh" name="catid" className="form-control sf-form-control aon-categories-select sf-select-box" title="">
                                <option className="bs-title-option" value=""></option>
                                <option value="17" data-content="<img class='childcat-img' width='50' height='auto' src=images\cat-thum\cat-1.jpg>
                                  <span class='childcat'>Cab Service</span>">Cab Service
                                </option>
                                <option value="30" data-content="<img class='childcat-img' width='50' height='auto' src=images\cat-thum\cat-2.jpg>
                                  <span class='childcat'>Car Dealers</span>">Car Dealers
                                </option>
                                <option value="19" data-content="<img class='childcat-img' width='50' height='auto' src=images\cat-thum\cat-3.jpg>
                                  <span class='childcat'>Food & Drink</span>">Food & Drink
                                </option>
                                <option value="19" data-content="<img class='childcat-img' width='50' height='auto' src=images\cat-thum\cat-4.jpg>
                                  <span class='childcat'>Plumber</span>">Plumber
                                </option>
                                <option value="19" data-content="<img class='childcat-img' width='50' height='auto' src=images\cat-thum\cat-5.jpg>
                                  <span class='childcat'>Electrician</span>">Electrician 
                                </option>                                                    
                              </select>
                        </div>

                      </li>
                      <li>
                        <div className="sf-search-title">
                            <label>Ville</label>
                            <span className="sf-search-icon"><img src="images/search-bar/city.png" alt=""/></span>
                        </div>
                        <div className="sf-search-feild">
                            <select className="sf-select-box form-control sf-form-control bs-select-hidden" data-live-search="true" name="city" id="city" title="" >
                              <option className="bs-title-option" value=""></option>
                              <option value="">Select City</option>
                            </select>
                        </div>

                      </li>


                      <li>
                        <div className="sf-search-title">
                            <label>Filtrer par prix:</label>
                            <span className="sf-search-icon"><img src="images/search-bar/city.png" alt=""/></span>
                        </div>
                        <div className="sf-search-feild">
                            <input id="ex2" type="text" className="span2" value="" data-slider-min="10" data-slider-max="1000" data-slider-step="5" data-slider-value="[250,450]"/>
                            <b className="sf-left-value">FCFA 10</b>
                            <b className="sf-right-value">FCFA 1000</b>
                        </div>

                      </li>


                    </ul>
                    <button type="button" className="site-button sf-search-btn text-white"><i className="fa fa-search"></i>Filtrer</button>
                  </div>
            
              </form>
            </div>
        </div>
        {/* Search Panel Area End */}
        
        {/* Search Result Area */}
        <div className="aon-search-result-area">
            
            {/* Search Filter */}
            <div className="sf-search-result-top flex-wrap d-flex justify-content-between align-items-center">
                <div className="sf-search-result-title"> <h5>Showing 1 – 10 of 16 results</h5></div>
                <div className="sf-search-result-option">
                    <ul className="sf-search-sortby">
                      <li className="sf-select-sort-by">
                        <select className="sf-select-box form-control sf-form-control bs-select-hidden" title="SORT BY" name="setorderby" id="setorderby">
                          <option className="bs-title-option" value="">SORT BY</option>
                          <option value="rating">Rating</option>
                          <option value="title">Title</option>
                          <option value="distance">Distance</option>
                        </select>
                      </li>
                      <li>
                        <select className="sf-select-box form-control sf-form-control bs-select-hidden" title="DESC" name="setorder" id="setorder">
                          <option className="bs-title-option" value="">DESC</option>
                          <option value="asc">ASC</option>
                          <option value="desc">DESC</option>
                        </select>
                      </li>
                      <li>
                        <select className="sf-select-box form-control sf-form-control bs-select-hidden" title="9" name="numberofpages" id="numberofpages">
                          <option className="bs-title-option" value="">9</option>
                          <option value="9">9</option>
                          <option value="12">12</option>
                          <option value="15">15</option>
                          <option value="20">20</option>
                          <option value="25">25</option>
                          <option value="30">30</option>
                        </select>
                      </li>
                    </ul>
                    <ul className="sf-search-grid-option" id="viewTypes">
                      <li data-view="grid-3">
                        <button type="button" className="btn btn-border btn-icon"><i className="fa fa-th"></i></button>
                      </li>
                      <li data-view="listview" className="active">
                        <button type="button" className="btn btn-border btn-icon"><i className="fa fa-th-list"></i></button>
                      </li>
                    </ul>
                </div>
            </div>
            {/* Search Filter End */}
            
            
            <div className="sf-map-filter">
                <button className="search-filter-btn btn site-button" type="button"><i className="fa fa-sliders"></i> Search Filter</button>
            </div>            
            
            
            {/* Search Result Show */}
            <div className="row">
                {/*block 1*/}
                <div className="col-md-6">
                    <div className="aon-vender-list-wrap3">
                        <div className="aon-vender-list-box3 d-flex">
                            <div className="aon-vender-list-pic" style={{ backgroundImage: `url(images/vender-list/1.jpg)` }}>
                                <a className="aon-vender-pic-link" href="profile-full.html"></a>
                            </div>
                            <div className="aon-vender-list-info">
                                <h4 className="aon-venders-title"><a href="profile-full.html">Mila Kunis</a></h4>
                                <span className="aon-venders-address"><i className="fa fa-map-marker"></i>Queens, United States</span>
                                <div className="aon-ow-pro-rating">
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star text-gray"></span>
                                </div>
                                <p>Through our expertise, technological knowledge, global presence and bespoke.</p>
                                <div className="aon-pro-check"><span><i className="fa fa-check"></i></span></div>
                                <div className="aon-pro-favorite"><a href="#"><i className="fa fa-heart-o"></i></a></div>

                                <div className="aon-req-btn">
                                    <a className="aon-req-btn-posi" href="profile-full.html">Request A Quote</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/*block 2*/}
                <div className="col-md-6">
                    <div className="aon-vender-list-wrap3">
                        <div className="aon-vender-list-box3 d-flex">
                            <div className="aon-vender-list-pic" style={{ backgroundImage: `url(images/vender-list/2.jpg)` }}>
                                <a className="aon-vender-pic-link" href="profile-full.html"></a>
                            </div>
                            <div className="aon-vender-list-info">
                                <h4 className="aon-venders-title"><a href="profile-full.html">Javier Bardem</a></h4>
                                <span className="aon-venders-address"><i className="fa fa-map-marker"></i>Queens, United States</span>
                                <div className="aon-ow-pro-rating">
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star text-gray"></span>
                                </div>
                                <p>Through our expertise, technological knowledge, global presence and bespoke.</p>
                                <div className="aon-pro-check"><span><i className="fa fa-check"></i></span></div>
                                <div className="aon-pro-favorite"><a href="#"><i className="fa fa-heart-o"></i></a></div>

                                <div className="aon-req-btn">
                                    <a className="aon-req-btn-posi" href="profile-full.html">Request A Quote</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/*block 3*/}
                <div className="col-md-6">
                    <div className="aon-vender-list-wrap3">
                        <div className="aon-vender-list-box3 d-flex">
                            <div className="aon-vender-list-pic" style={{ backgroundImage: `url(images/vender-list/3.jpg)` }}>
                                <a className="aon-vender-pic-link" href="profile-full.html"></a>
                            </div>
                            <div className="aon-vender-list-info">
                                <h4 className="aon-venders-title"><a href="profile-full.html">Edward Luise</a></h4>
                                <span className="aon-venders-address"><i className="fa fa-map-marker"></i>Queens, United States</span>
                                <div className="aon-ow-pro-rating">
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star text-gray"></span>
                                </div>
                                <p>Through our expertise, technological knowledge, global presence and bespoke.</p>
                                <div className="aon-pro-check"><span><i className="fa fa-check"></i></span></div>
                                <div className="aon-pro-favorite"><a href="#"><i className="fa fa-heart-o"></i></a></div>

                                <div className="aon-req-btn">
                                    <a className="aon-req-btn-posi" href="profile-full.html">Request A Quote</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/*block 4*/}
                <div className="col-md-6">
                    <div className="aon-vender-list-wrap3">
                        <div className="aon-vender-list-box3 d-flex">
                            <div className="aon-vender-list-pic" style={{ backgroundImage: `url(images/vender-list/3.jpg)` }}>
                                <a className="aon-vender-pic-link" href="profile-full.html"></a>
                            </div>
                            <div className="aon-vender-list-info">
                                <h4 className="aon-venders-title"><a href="profile-full.html">James McAvoy</a></h4>
                                <span className="aon-venders-address"><i className="fa fa-map-marker"></i>Queens, United States</span>
                                <div className="aon-ow-pro-rating">
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star text-gray"></span>
                                </div>
                                <p>Through our expertise, technological knowledge, global presence and bespoke.</p>
                                <div className="aon-pro-check"><span><i className="fa fa-check"></i></span></div>
                                <div className="aon-pro-favorite"><a href="#"><i className="fa fa-heart-o"></i></a></div>

                                <div className="aon-req-btn">
                                    <a className="aon-req-btn-posi" href="profile-full.html">Request A Quote</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/*block 5*/}
                <div className="col-md-6">
                    <div className="aon-vender-list-wrap3">
                        <div className="aon-vender-list-box3 d-flex">
                            <div className="aon-vender-list-pic" style={{ backgroundImage: `url(images/vender-list/4.jpg)` }}>
                                <a className="aon-vender-pic-link" href="profile-full.html"></a>
                            </div>
                            <div className="aon-vender-list-info">
                                <h4 className="aon-venders-title"><a href="profile-full.html">Jackie Chan</a></h4>
                                <span className="aon-venders-address"><i className="fa fa-map-marker"></i>Queens, United States</span>
                                <div className="aon-ow-pro-rating">
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star text-gray"></span>
                                </div>
                                <p>Through our expertise, technological knowledge, global presence and bespoke.</p>
                                <div className="aon-pro-check"><span><i className="fa fa-check"></i></span></div>
                                <div className="aon-pro-favorite"><a href="#"><i className="fa fa-heart-o"></i></a></div>

                                <div className="aon-req-btn">
                                    <a className="aon-req-btn-posi" href="profile-full.html">Request A Quote</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/*block 6*/}
                <div className="col-md-6">
                    <div className="aon-vender-list-wrap3">
                        <div className="aon-vender-list-box3 d-flex">
                            <div className="aon-vender-list-pic" style={{ backgroundImage: `url(images/vender-list/5.jpg)` }}>
                                <a className="aon-vender-pic-link" href="profile-full.html"></a>
                            </div>
                            <div className="aon-vender-list-info">
                                <h4 className="aon-venders-title"><a href="profile-full.html">Colin Farrell</a></h4>
                                <span className="aon-venders-address"><i className="fa fa-map-marker"></i>Queens, United States</span>
                                <div className="aon-ow-pro-rating">
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star text-gray"></span>
                                </div>
                                <p>Through our expertise, technological knowledge, global presence and bespoke.</p>
                                <div className="aon-pro-check"><span><i className="fa fa-check"></i></span></div>
                                <div className="aon-pro-favorite"><a href="#"><i className="fa fa-heart-o"></i></a></div>

                                <div className="aon-req-btn">
                                    <a className="aon-req-btn-posi" href="profile-full.html">Request A Quote</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                


                <div className="site-pagination s-p-center">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabindex="-1"><i className="fa fa-chevron-left"></i></a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item active">
                      <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#"><i className="fa fa-ellipsis-h"></i></a></li>
                    <li className="page-item"><a className="page-link" href="#">11</a></li>
                    <li className="page-item">
                      <a className="page-link" href="#"><i className="fa fa-chevron-right"></i></a>
                    </li>
                  </ul>
                </div>  

            </div>
            {/* Search Result Show End */}

        </div>
        {/* Search Result Area End*/}


    </div>
    {/* Content END*/}
    </>
  )
}
