import React from 'react';
import { useDispatch } from "react-redux";
import { setUserData, setUserID } from '../Redux/actions.js';
import { useSelector } from 'react-redux';
import { useState , useEffect} from 'react';
import { useNavigate } from "react-router-dom";

const Logout = ()=>{
    const Navigate = useNavigate();
     const userData = useSelector((state)=> state.userData)
    const dispatch = useDispatch();
      useEffect(() => {
        if(userData)
        {
            dispatch(
                setUserData(null),
                setUserID(null)
            )
            Navigate("/login");
        }
        }, [userData]);
    return(
        <>
            <div>
                logging out
            </div>
        </>
    )
}

export default Logout;