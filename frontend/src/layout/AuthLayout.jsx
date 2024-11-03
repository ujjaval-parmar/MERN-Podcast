import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthLayout = () => {

  const { isLoggedIn }   = useSelector(state=> state.auth);
  
  

  const navigate = useNavigate();

  useEffect(()=>{


    if(isLoggedIn){
      navigate('/');
    }

  });


  return (
    <div>

        <Outlet />
        
    </div>
  )
}

export default AuthLayout