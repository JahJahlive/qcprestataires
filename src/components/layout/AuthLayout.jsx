import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../../context/ContextProvider'
import HeaderAuth from '../HeaderAuth'
import axiosClient from '../../axios-client'
import { NavLink } from 'react-router-dom';

export default function AuthLayout() {
  const { token, setToken, setUser } = useStateContext()

  if (!token) {
    window.location.replace('/')
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data)
      })
      .catch((error) => {
        setUser({})
        setToken(null)
      })
  }, [])

  return (
    <>
      <div className="page-wraper">
          
          <HeaderAuth />       
        
          {/* Sidebar Holder */}
          <nav id="sidebar-admin-wraper">
              <div className="pro-my-account-wrap">
                
              </div>
              <div className="admin-nav admin-nav-scroll" style={{overflowY: 'auto'}}>

                <div className="admin-nav admin-nav-scroll" style={{ overflowY: 'auto' }}>
                  <ul className="">
                    <li className="active">
                      <NavLink to="dashboard">
                        <i className="fa fa-dashboard"></i>
                        <span className="admin-nav-text">Accueil</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="profil">
                        <i className="fa fa-user-circle-o"></i>
                        <span className="admin-nav-text">Profil</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="services">
                        <i className="fa fa-cogs"></i>
                        <span className="admin-nav-text">Mes services</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="reservations">
                        <i className="fa fa-calendar"></i>
                        <span className="admin-nav-text">Mes réservations</span>
                      </NavLink>
                    </li>     
                    <li>
                      <NavLink to="equipes">
                        <i className="fa fa-users"></i>
                        <span className="admin-nav-text">Membres de l'équipe</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="heures_ouvertures">
                        <i className="fa fa-clock-o"></i>
                        <span className="admin-nav-text">Heures d'ouverture</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="carte_identite">
                        <i className="fa fa-id-card-o"></i>
                        <span className="admin-nav-text">Télécharger une pièce d'identité</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="abonnements">
                        <i className="fa fa-cloud-upload"></i>
                        <span className="admin-nav-text">Mettre à niveau le compte</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>   
          </nav>

          {/* Page Content Holder */}
          <div id="content">

              <div className="content-admin-main">
                  
                  <div className="admin-top-area d-flex flex-wrap justify-content-between m-b30 align-items-center">
                    <div className="admin-left-area">
                      <a className="nav-btn-admin d-flex justify-content-between align-items-center" id="sidebarCollapse">
                          <span className="fa fa-reorder"></span>
                      </a>
                    </div>
                  </div>
                  <Outlet />
              </div>
        </div>
      </div>    
    </>
  )
}