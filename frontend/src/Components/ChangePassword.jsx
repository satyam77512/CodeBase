import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from "react";
import "./ChangePassword.css";
import axios from 'axios';
import { BaseUrl } from '../BaseUrl.js';

const ChangePassword = ()=>{
  const {token,time} = useParams();
  var [endTime,setEndtime] = useState(time);
  var [currTime,setCurrtime] = useState(Date.now());
  var [flag,setFlag] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
      if(currTime < endTime)
        {
          setFlag(true);
        }
        else
        {
          setFlag(false);
        }
    const interval = setInterval(() => {
      // Your function logic here
      setCurrtime(Date.now());
      if(currTime < endTime)
      {
        setFlag(true);
      }
      else
      {
        setFlag(false);
      }
    }, 3000);

    return () => clearInterval(interval); // Cleanup function to clear the interval on unmount
  }, []);
    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("New Password:", newPassword);

      const headers = {
        "Content-Type": "application/json", // multer problem due to this
      };
      axios
        .post(`${BaseUrl()}/user/auth/changePassword`,{token,newPassword}, {
          headers: headers,
        })
        .then((response)=>{
          console.log(response.status)
          alert("password changed go back to login page");
          navigate("/login");
        })
    };
  
    return (
      <>
        {flag ? (
          <div className="change-password-container">
            <form onSubmit={handleSubmit} className="change-password-form">
              <label htmlFor="new-password">New Password</label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button type="submit">Change Password</button>
            </form>
          </div>
        ) : (
          <h1>Link expired</h1> // Fixed closing tag
        )}
      </>
    )}
export default ChangePassword;