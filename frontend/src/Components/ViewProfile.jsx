import React, { useEffect } from 'react';
import './ViewProfile.css';
import { BaseUrl } from '../BaseUrl.js';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewProfile = (RollNumber) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchUsers = async () => {
            const headers = {
            "Content-Type": "application/json", // multer problem due to this
            };
            const viewPromise = axios.post(`${BaseUrl()}/user/search/viewProfile`,RollNumber, {
                headers: headers,
            });
            toast.promise(viewPromise,{
                pending:"fetching..",
                error:"fail to fetch! try again.."
            })
            try {
                const response = await viewPromise;
                setData(response.data);
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchUsers();
    },[]);

  return (
    <>
    { data &&(
    <div className="container">
        <div className="header">
            <img
            src={`${data.ProfilePic}`}
            alt="Profile Pic"
            className="profile-pic"
            />
            <div className={`status-indicator ${data.Status ? "active" : "busy"}`}>
                {data.Status ? "Active" : "Busy"}
            </div>
            <div className="greeting">
            Hello, {data.FirstName || 'Guest'}! 😊
            </div>
        </div>
        <div className="content">
            <div className="info-item">
            <strong>First Name:</strong> {data.FirstName || 'N/A'}
            </div>
            <div className="info-item">
            <strong>Middle Name:</strong> {data.MiddleName || ''}
            </div>
            <div className="info-item">
            <strong>Last Name:</strong> {data.LastName || 'N/A'}
            </div>
            <div className="info-item">
            <strong>Email:</strong> {data.Email || 'N/A'}
            </div>
            <div className="info-item">
            <strong>Gender:</strong> {data.Gender || 'N/A'}
            </div>
            <div className="info-item">
            <strong>Department:</strong> {data.Department || 'N/A'}
            </div>
            <div className="info-item">
            <strong>Year:</strong> {data.Year || 'N/A'}
            </div>
            <div className="info-item">
            <strong>Roll Number:</strong> {data.RollNumber || 'N/A'}
            </div>
            <div className="info-item">
            <strong>Phone:</strong> {data.Phone || 'N/A'}
            </div>
            <div className="info-item">
            <strong>Skills:</strong>{' '}
            {data.Skills && data.Skills.length > 0
                ? data.Skills.join(', ')
                : 'N/A'}
            </div>
            <div className="info-item">
            <strong>Resume:</strong>{' '}
            {data.Resume ? (
                <a href={`${data.Resume}`} target="_blank" rel="noopener noreferrer">
                View Resume
                </a>
            ) : (
                'N/A'
            )}
            </div>
        </div>
    </div>
    )}</>
  );
};

export default ViewProfile;
