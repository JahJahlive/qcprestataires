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
      {/* LOADING AREA START */}
      <div className="loading-area">
        <div className="loading-box"></div>
        <div className="loading-pic">
          <div className="windows8">
            <div className="wBall" id="wBall_1">
              <div className="wInnerBall"></div>
            </div>
            <div className="wBall" id="wBall_2">
              <div className="wInnerBall"></div>
            </div>
            <div className="wBall" id="wBall_3">
              <div className="wInnerBall"></div>
            </div>
            <div className="wBall" id="wBall_4">
              <div className="wInnerBall"></div>
            </div>
            <div className="wBall" id="wBall_5">
              <div className="wInnerBall"></div>
            </div>
          </div>
        </div>
      </div>
      {/* LOADING AREA END ====== */}

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
