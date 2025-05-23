import React  , { useEffect } from 'react'
import { useNavigate , Outlet } from 'react-router-dom'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../context/ContextProvider'

export default function DefaultLayout() {

const {setUser, setToken, token} = useStateContext();

  useEffect(() => {
    if (token) {
       axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data)
      })
      .catch((error) => {
        setUser({});
        setToken(null); // Redirect to login on 
      });
    }
  }, [])

  return (
    <>

      <div className="page-wraper">
        <Header />

        <Outlet />

        

        {/* BUTTON TOP START */}
        <button className="scroltop">
          <span className="fa fa-angle-up relative" id="btn-vibrate"></span>
        </button>
      </div>
    </>
  )
}
