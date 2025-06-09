import React from 'react';
import './DisplayPage.css';
import { redirect, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserdata } from '../Redux/actions';
import { BaseUrl } from '../BaseUrl.js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DisplayPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData) navigate("/login");
    else setData(userData);
  }, [navigate, userData]);

  const StatusToggle = () => {
    axios
      .put(`${BaseUrl()}/user/details/status`, { RollNumber: data.RollNumber })
      .then((response) => {
        dispatch(updateUserdata("Status", response.data));
      });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const HandleChange = (e) => setImageFile(e.target.files[0]);

  const handleFileUpload = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imageFile', imageFile);
    formData.append('RollNumber', data.RollNumber);

    const UpdatePicPromise = axios.put(`${BaseUrl()}/user/details/changeProfile`, formData);

    toast.promise(UpdatePicPromise, {
      pending: 'Updating..',
      success: 'Done!',
      error: 'Please try again.',
    });
      try {
        const response = await UpdatePicPromise;
        dispatch(updateUserdata("ProfilePic", response.data));
        setIsModalOpen(false);
      } catch (error) {
        console.log(error);
        alert("Server Error");
      }
  };

  const handleClick = async () => {
    if (data) {
      const mailPromise = axios.post(`${BaseUrl()}/user/auth/email`, {
        Loginid: data.RollNumber,
      });

      toast.promise(mailPromise, {
        pending: 'Please wait...',
        success: 'Password reset link sent to your email!',
        error: 'Failed to send mail. Please try again.',
      });
    }
  };
  const [ans,setAns] = useState(false);

  const handleDelete = async() =>{

    setAns(prompt("Do you want to delete account (YES/NO)"));
    e.preventDefault();

    const formData = new FormData();
    formData.append('RollNumber', data.RollNumber);
    const DeletePromise = axios.put(`${BaseUrl()}/user/details/deleteProfile`, formData);

    toast.promise(DeletePromise, {
      pending: 'Deleting..',
      success: 'Done!',
      error: 'Please try again.',
    });   

    try {
      const response = await DeletePromise;
      if(response.data)
      {
        redirect("/logout");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <ToastContainer />
      {data && (
        <div className="container">
          <div className="header">
            <img src={`${data.ProfilePic}`} alt="Profile Pic" className="profile-pic" />
            <div className="app">
              <button className="open-modal-btn" onClick={handleOpenModal}>Change Photo</button>
              {isModalOpen && (
                <div className="modal" onClick={handleCloseModal}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h3>Upload File</h3>
                    <form onSubmit={handleFileUpload} encType="multipart/form-data">
                      <input type="file" name="imageFile" onChange={HandleChange} required />
                      <button type="submit">Submit</button>
                    </form>
                  </div>
                </div>
              )}
            </div>
            <div>
              <button className={`status-button ${data.Status ? "active" : "busy"}`} onClick={StatusToggle}>
                {data.Status ? "Active" : "Busy"}
              </button>
            </div>
            <div className="greeting">Hello, {data.FirstName || 'Guest'}! 😊</div>
          </div>

          <div className="content">
            <div className="info-item"><strong>First Name:</strong> {data.FirstName || 'N/A'}</div>
            <div className="info-item"><strong>Middle Name:</strong> {data.MiddleName || ''}</div>
            <div className="info-item"><strong>Last Name:</strong> {data.LastName || 'N/A'}</div>
            <div className="info-item"><strong>Email:</strong> {data.Email || 'N/A'}</div>
            <div className="info-item"><strong>Gender:</strong> {data.Gender || 'N/A'}</div>
            <div className="info-item"><strong>Department:</strong> {data.Department || 'N/A'}</div>
            <div className="info-item"><strong>Year:</strong> {data.Year || 'N/A'}</div>
            <div className="info-item"><strong>Roll Number:</strong> {data.RollNumber || 'N/A'}</div>
            <div className="info-item"><strong>Phone:</strong> {data.Phone || 'N/A'}</div>

            <div className="info-item">
              <strong>Skills:</strong>
              <div className="skills-container">
                {data.Skills && data.Skills.length > 0 ? (
                  data.Skills.map((skill, idx) => (
                    <span className="skill-tag" key={idx}>{skill}</span>
                  ))
                ) : (
                  ' N/A'
                )}
              </div>
            </div>

            <div className="info-item">
              <strong>Resume:</strong>{' '}
              {data.Resume ? (
                <a href={data.Resume} target="_blank" rel="noopener noreferrer">View Resume</a>
              ) : (
                'N/A'
              )}
            </div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
                <button className="Forgot_password_button" onClick={handleClick}>
                  Change Password
                </button>
                <button className="Forgot_password_button" onClick={handleDelete}>
                  Delete Profile
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayPage;
