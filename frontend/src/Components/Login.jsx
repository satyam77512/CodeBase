import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { BaseUrl } from '../BaseUrl.js';
import { useNavigate } from "react-router-dom";
import Header from './Header.jsx';
import { setUserData,setUserID } from '../Redux/actions.js';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const Dispatch = useDispatch();

    const [Loginid, setLognid] = useState('');
    const [Password, setPassword] = useState('');
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        const headers = {
            "Content-Type": "application/json", // multer problem due to this
          };
          const loginPromise = axios.post(`${BaseUrl()}/user/auth/login`, {Loginid,Password}, {
              headers: headers,
            });

            toast.promise(loginPromise,{
                pending: 'Getting you logged-IN',
                error: 'Wrong Credentials'
            });

            try {
                const response = await loginPromise;
                navigate('/display',{})
                Dispatch(
                    setUserData({
                        FirstName : response.data.FirstName,
                        MiddleName: response.data.MiddleName,
                        LastName: response.data.LastName,
                        Email: response.data.Email,
                        Gender: response.data.Gender,
                        Department: response.data.Department,
                        Year: response.data.Year,
                        RollNumber: response.data.RollNumber,
                        Phone: response.data.Phone,
                        Skills: response.data.Skills,
                        ProfilePic: response.data.ProfilePic,
                        Resume: response.data.Resume,
                        Status: response.data.Status
                    })
                )
                setLognid('')
                setPassword('')
            } catch (error) {
                console.log(err);
                alert("WRONG CREDENTIALS");
            }
    };

    const handleClick = ()=>{
        if(Loginid ==='')
        {
            alert("please fill the Login Id")
        }
        else
        {
            const headers = {
                "Content-Type": "application/json", // multer problem due to this
              };
              const mailPromise = axios.post(`${BaseUrl()}/user/auth/email`,{Loginid}, {
                  headers: headers,
                });
                toast.promise(mailPromise,{
                    pending: 'finding your email',
                    success: 'Password reset link is sent to your email',
                    error: 'Please try again.'
                })
        }
    }

    return (
    <>
        <Header/>
        <ToastContainer/>
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="Loginid">Loginid</label>
                    <input
                        type="text"
                        id="Loginid"
                        placeholder="Enter your Loginid"
                        value={Loginid}
                        onChange={(e) => setLognid(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="Password"
                        placeholder="Enter your password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">
                    Login
                </button>
            </form>
            <button className='Forgot_password_button' onClick={handleClick}>Forgot Password</button>
        </div>
    </>
    );
};

export default Login;
