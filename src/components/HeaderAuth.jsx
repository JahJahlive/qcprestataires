import React from 'react'
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';
import { Link, useNavigate } from 'react-router-dom'

function HeaderAuth() {
 const {setToken, setUser, user} = useStateContext();
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
                    <Link to="/">
                        <h3 className={`site-logo-has}`}>WARAPS</h3>
                        <h3 className='site-logo-sticky'>WARAPS</h3>
                    </Link>
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
                    
                    
                    <div className="pro-pic-info-wrap d-flex">
                        <div className="pro-pic-box">
                            <img src={user.photo_avatar} alt=""/>
                        </div>
                        <div className="pro-pic-info">
                            <strong>{user.name}</strong>
                            <span>Designer</span>
                        </div>
                        <span className="feather-icon has-toltip" onClick={onLogout}>
                            <i className="feather-power"></i>
                            <span className="header-toltip">Deconnexion</span>
                        </span>
                    </div>
                        
                </div>
                {/* Right Side Content End */}

            </div>
        </div>
    {/* Header End */}
    </header>      
  )
}

export default HeaderAuth