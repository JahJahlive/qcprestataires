import React, { useEffect } from 'react';
import { Navigate, Outlet, NavLink, useLocation } from 'react-router-dom';
import { useStateContext } from '../../context/ContextProvider';
import HeaderAuth from '../HeaderAuth';
import axiosClient from '../../axios-client';

export default function AuthLayout() {
  const { token, setToken, setUser } = useStateContext();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    axiosClient
      .get('/user')
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        setUser({});
        setToken(null);
      });
  }, []);

  // List of routes for sidebar links
  const navItems = [
 //   { path: 'dashboard', icon: 'fa fa-dashboard', text: 'Accueil', exact: true },
    { path: 'profil', icon: 'fa fa-user-circle-o', text: 'Profil' },
//    { path: 'services', icon: 'fa fa-cogs', text: 'Mes services' },
    { path: 'reservations', icon: 'fa fa-calendar', text: 'Mes réservations' },
//    { path: 'equipes', icon: 'fa fa-users', text: "Membres de l'équipe" },
//    { path: 'heures_ouvertures', icon: 'fa fa-clock-o', text: "Heures d'ouverture" },
//    { path: 'abonnements', icon: 'fa fa-cloud-upload', text: 'Mettre à niveau le compte' },
  ];

  return (
    <>
      <div className="page-wraper">
        <HeaderAuth />

        {/* Sidebar Holder */}
        <nav id="sidebar-admin-wraper">
          <div className="pro-my-account-wrap"></div>
          <div className="admin-nav admin-nav-scroll" style={{ overflowY: 'auto' }}>
            <ul className="">
              {navItems.map((item) => (
                <li
                  key={item.path}
                  className={
                    item.exact
                      ? location.pathname === `/${item.path}`
                        ? 'active'
                        : ''
                      : location.pathname.includes(`/${item.path}`)
                      ? 'active'
                      : ''
                  }
                >
                  <NavLink to={item.path} end={item.exact}>
                    <i className={item.icon}></i>
                    <span className="admin-nav-text">{item.text}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Page Content Holder */}
        <div id="content">
          <div className="content-admin-main">
            <div className="admin-top-area d-flex flex-wrap justify-content-between m-b30 align-items-center">
              <div className="admin-left-area">
                <a
                  className="nav-btn-admin d-flex justify-content-between align-items-center"
                  id="sidebarCollapse"
                >
                  <span className="fa fa-reorder"></span>
                </a>
              </div>
            </div>
            <Outlet />
             {/* BUTTON TOP START */}
        <button className="scroltop">
          <span className="fa fa-angle-up relative" id="btn-vibrate"></span>
        </button>
          </div>
        </div>
      </div>
    </>
  );
}