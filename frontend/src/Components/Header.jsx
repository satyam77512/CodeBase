import React, { useEffect, useState } from "react";
import "./Header.css";
import {useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {

  const navigate = useNavigate();
  const userData = useSelector((state)=> state.userData);
  const [loggedIn,setLoggedIn] = useState(false);

  useEffect(()=>{
    if(userData)
    {
      setLoggedIn(true);
    }

  },[userData])

  const homeClick = ()=>{
    navigate("/")
  }
  const loginClick = ()=>{
    navigate("/login")
  }
  const logoutClick = ()=>{
    navigate("/logout")
  }
  const updateClick = ()=>{
    navigate("/update")
  }
  const registerClick = ()=>{
    navigate("/register")
  }
  const profileClick = ()=>{
    navigate("/display")
  }
  
  return (
    <header className="header1">
      <div className="header1-container">
        {/* Title */}
        <h1 className="header1-title">CodeBase</h1>

        {/* Buttons */}
        <nav className="header1-nav">
          <button className="header1-button" onClick={homeClick}>Home</button>
          {loggedIn? <button className="header1-button" onClick={profileClick}>Profile</button>:null}
          {loggedIn? <button className="header1-button" onClick={updateClick}>Update</button>:null}
          {!loggedIn? <button className="header1-button" onClick={loginClick}>Login</button>:null}
          {loggedIn? <button className="header1-button" onClick={logoutClick}>Logout</button>:null}
          {!loggedIn?<button className="header1-button" onClick={registerClick}>Register</button>:null}
        </nav>
      </div>
    </header>
  );
};

export default Header;
