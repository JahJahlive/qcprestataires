import React, { useEffect } from 'react'
import { useStateContext } from '../context/ContextProvider'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';

function Header() {
    const {user, setUser, setToken} = useStateContext();
    const location = useLocation();
    const navigate = useNavigate();

    if (location.pathname === '/recherche' && location.state?.reset) {
        console.log('Header: Clearing URL parameters for reset');
        // Clear URL parameters if needed
    }

    const onLogout = (ev) => {
      ev.preventDefault()
  
      axiosClient.post('/logout')
        .then(() => {
          setUser({})
          setToken(null)
          navigate('/');
        })
    }

  return (
    <header className="site-header header-style-1 mobile-sider-drawer-menu header-full-width">
        <div className={`sticky-header main-bar-wraper navbar-expand-lg`}>
        <div className="main-bar">
            <div className="container clearfix">
            {/* Logo section start */}
            <div className="logo-header">
                <div className="logo-header-inner logo-header-one">
                <Link to="/">
                    <h3 className={`site-logo-has ${(location.pathname !== '/recherche') && 'text-white'}`}>WARAPS</h3>
                    <h3 className='site-logo-sticky'>WARAPS</h3>
                </Link>
                </div>
            </div>
            {/* Logo section End */}

            {/* NAV Toggle Button */}
            <button
                id="mobile-side-drawer"
                data-target=".header-nav"
                data-toggle="collapse"
                type="button"
                className="navbar-toggler collapsed"
            >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar icon-bar-first"></span>
                <span className="icon-bar icon-bar-two"></span> 
                <span className="icon-bar icon-bar-three"></span>
            </button>

            {/* MAIN Nav */}
            <div className="nav-animation header-nav navbar-collapse collapse d-flex justify-content-start">
                <ul className="nav navbar-nav">
                  <li><a href="#specialistes">Contracteurs</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
            </div>

            {/* Header Right Section */}
            <div className="extra-nav header-2-nav">
                <div className="extra-cell">
                {/* Login */}
              
              {
                (Object.keys(user).length === 0) ?

                (
                  <button
                    type="button"
                    className="site-button aon-btn-login text-white"
                    data-toggle="modal"
                    data-target="#login-signup-model"
                  >
                    <i className="fa fa-user"></i> Connexion
                  </button>
                )
                :
                (
                  <div className="d-flex align-items-center justify-content-center gap-2">
                   
                    <div className="mx-2" style={{color: 'darkblue', fontSize: '25px', cursor: 'pointer'}} onClick={() => navigate('/dashboard')}>
                      <i className="fa fa-user "></i> 
                    </div>
                    <div className="mx-2" style={{color: 'darkblue', fontSize: '25px', cursor: 'pointer'}} onClick={onLogout}>
                      <i className="feather-log-out "></i> 
                    </div>
                  </div>
                )
              }  
                
                {
                    (location.pathname !== '/') && (
                        <Link to='/' className="site-button aon-btn-signup  text-white">
                    <i className="fa fa-home"></i> Retour a l'accueil
                </Link>
                    )
                }
                
                </div>
            </div>
            </div>
        </div>
        </div>
    </header>
  )
}

export default Header