import React from 'react'
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom'

function HeaderAuth() {
 const {setToken, setUser} = useStateContext();
  const toggleActiveWidget = () => {
    const container = document.querySelector('.header-widget-wrap');
    container.addEventListener('click', (e) => {
      const widget = e.target.closest('.header-widget');
      if (!widget) return;
      if (widget.classList.contains('active')) {
        widget.classList.remove('active');
      } else {
        document.querySelectorAll('.header-widget').forEach(w => w.classList.remove('active'));
        widget.classList.add('active');
      }
    });
  }

  const onLogout = (ev) => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  return (
    <header id="header-admin-wrap" className="header-admin-fixed">
    {/* Header Start */}
    <div id="header-admin">
        <div className="container">
            
            {/* Left Side Content */}
            <div className="header-left">
                
                <div className="my-account-logo">
                    <a href="index.html"><img src="images/logo-dark.png" alt=""/></a>
                </div>
                
                <div className="header-widget aon-admin-search-box">
                    <div className="aon-admin-search ">
                        <input className="form-control sf-form-control" name="company_name" type="text" placeholder="Search"/>
                        <button className="admin-search-btn"><i className="fs-input-icon feather-search"></i></button>
                    </div>
                </div>
                
            </div>
            {/* Left Side Content End */}
            
            {/* Right Side Content */}
            <div className="header-right">
                
                <div className="header-menu">
                    {/* NAV Toggle Button */}
                    <button id="mobile-side-drawer" data-target=".header-nav" data-toggle="collapse" type="button" className="navbar-toggler collapsed">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar icon-bar-first"></span>
                        <span className="icon-bar icon-bar-two"></span>
                        <span className="icon-bar icon-bar-three"></span>
                    </button> 

                    {/* MAIN Vav */}
               
                </div>
                
                <ul className="header-widget-wrap">
                    <li className="header-widget has-toltip"  onClick={toggleActiveWidget}>
                        <div className="aon-admin-notification sf-toogle-btn">
                            <i className="feather-bell"></i>
                            <span className="notification-animate">8</span>
                            <span className="header-toltip">Notification</span>
                        </div>

                        <div className="ws-toggle-popup popup-tabs-wrap-section popup-notifica-msg">
                            <div className="popup-tabs-wrap">

                                <div className="popup-tabs">

                                    <ul className="nav nav-tabs nav-justified">                                        
                                        {/*1*/}
                                        <li className="nav-item">
                                            <a className="nav-link active" data-toggle="tab" href="#accepted1">
                                                Accepted
                                            </a>
                                        </li>
                                        {/*2*/}
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#rejected1">
                                                Rejected
                                            </a>
                                        </li>
                                    </ul>                                       
                                    <div className="tab-content">
                                        <div id="accepted1" className="tab-pane active">
                                            <div className="ws-poptab-list-wrap">
                                                {/*list One*/}
                                                <div className="ws-poptab-list">
                                                    <div className="ws-poptab-media">
                                                        <img src="images/testimonials2/pic1.jpg" alt=""/>
                                                    </div>
                                                    <div className="ws-poptab-info">
                                                        <strong>David Chua</strong>
                                                        <p>David wood requested to change.</p>
                                                        <span className="ws-time-duration">8 mins ago</span>
                                                    </div>
                                                </div>

                                                {/*list Two*/}
                                                <div className="ws-poptab-list">
                                                    <div className="ws-poptab-media">
                                                        <img src="images/testimonials2/pic2.jpg" alt=""/>
                                                    </div>
                                                    <div className="ws-poptab-info">
                                                        <strong>Lussa Smith</strong>
                                                        <p>David wood requested to change.</p>
                                                        <span className="ws-time-duration">4 mins ago</span>
                                                    </div>
                                                </div>

                                                {/*list three*/}
                                                <div className="ws-poptab-list">
                                                    <div className="ws-poptab-media">
                                                        <img src="images/testimonials2/pic3.jpg" alt=""/>
                                                    </div>
                                                    <div className="ws-poptab-info">
                                                        <strong>Zilia Wood</strong>
                                                        <p>David wood requested to change.</p>
                                                        <span className="ws-time-duration">2 mins ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="ws-poptab-all text-center">
                                                <a href="#" className="btn-link-type">View All</a>
                                            </div>                                                    
                                            
                                        </div>

                                        <div id="rejected1" className="tab-pane">
                                            <div className="ws-poptab-list-wrap">
                                                {/*list One*/}
                                                <div className="ws-poptab-list">
                                                    <div className="ws-poptab-media">
                                                        <img src="images/testimonials2/pic1.jpg" alt=""/>
                                                    </div>
                                                    <div className="ws-poptab-info">
                                                        <strong>Maria Smith</strong>
                                                        <p>David wood requested to change.</p>
                                                        <span className="ws-time-duration">8 mins ago</span>
                                                    </div>
                                                </div>

                                                {/*list Two*/}
                                                <div className="ws-poptab-list">
                                                    <div className="ws-poptab-media">
                                                        <img src="images/testimonials2/pic2.jpg" alt=""/>
                                                    </div>
                                                    <div className="ws-poptab-info">
                                                        <strong>Zonsan Wood</strong>
                                                        <p>David wood requested to change.</p>
                                                        <span className="ws-time-duration">4 mins ago</span>
                                                    </div>
                                                </div>

                                                {/*list three*/}
                                                <div className="ws-poptab-list">
                                                    <div className="ws-poptab-media">
                                                        <img src="images/testimonials2/pic3.jpg" alt=""/>
                                                    </div>
                                                    <div className="ws-poptab-info">
                                                        <strong>Denisa Wood</strong>
                                                        <p>David wood requested to change.</p>
                                                        <span className="ws-time-duration">2 mins ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ws-poptab-all text-center">
                                                <a href="#" className="btn-link-type">View All</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="header-widget has-toltip" onClick={toggleActiveWidget}>
                        <div className="aon-admin-messange sf-toogle-btn">
                            <i className="feather-globe"></i>
                            <span className="header-toltip">Language</span>
                        </div>
                        <div className="ws-toggle-popup popup-tabs-wrap-section popup-curra-lang">
                            <ul className="popup-curra-lang-list">
                                <li>English</li>
                                <li>Franais</li>
                                <li>Espaol</li>
                                <li>Deutsch</li>
                            </ul>
                        </div>
                    </li>
                    <li className="header-widget active" onClick={toggleActiveWidget}>
                        <div className="aon-admin-messange sf-toogle-btn">
                            <span className="feather-user-pic"><img src="images/user.jpg" alt=""/></span>
                        </div>
                        <div className="ws-toggle-popup popup-tabs-wrap-section user-welcome-area">
                            <ul className="user-welcome-list">
                                <li><strong>Welcome , <span className="site-text-primary">Alica Noory</span></strong></li>
                                <li><a href="#"><i className="feather-sliders"></i> Dashboard</a></li>
                                <li><a href="#"><i className="feather-file"></i> Add Listing</a></li>
                                <li><a href="#"><i className="feather-settings"></i> Setting</a></li>
                                <li><a href="#" onClick={onLogout}><i className="feather-log-out"></i> Log Out</a></li>
                            </ul>
                        </div>
                    </li>
                    

                </ul>
            </div>
            {/* Right Side Content End */}

        </div>
    </div>
    {/* Header End */}
    </header>      
  )
}

export default HeaderAuth