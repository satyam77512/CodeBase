import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { BaseUrl } from '../BaseUrl.js';
import { useNavigate } from "react-router-dom";
import Header from './Header.jsx';
import { useDispatch } from "react-redux";
import { setUserData, setUserID } from '../Redux/actions.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const navigate = useNavigate();
    const Dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        FirstName: '',
        MiddleName: '',
        LastName: '',
        Email: '',
        Gender:'',
        Department: '',
        Year: '',
        RollNumber: '',
        Phone: '',
        ProfilePic: null,
        Resume: null,
        Skills: [],
        Password: '',
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (name === 'Skills') {
            // Handle multiple selections
            const Arr = Array.from(e.target.selectedOptions, (option) => option.value);
            setFormData({
                ...formData,
                Skills: Arr,
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === 'file' ? files[0] : value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const headers = {
          "Content-Type": "multipart/form-data",
        };
      
        const registrationPromise = axios.post(
          `${BaseUrl()}/user/auth/register`,
          formData,
          { headers }
        );
      
        toast.promise(
          registrationPromise,
          {
            pending: 'Registration in progress, please wait...',
            success: 'Registration successful!',
            error: 'Registration failed. Please try again.'
          }
        );
      
        try {
          const response = await registrationPromise;
      
          navigate('/display', {});
          Dispatch(
            setUserData({
              FirstName: response.data.FirstName,
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
              Password: response.data.Password,
              Status: response.data.Status
            })
          );
      
          setFormData({
            FirstName: '',
            MiddleName: '',
            LastName: '',
            Email: '',
            Gender: '',
            Department: '',
            Year: '',
            RollNumber: '',
            Phone: '',
            Skills: [],
            ProfilePic: null,
            Resume: null,
            Password: '',
          });
      
        } catch (error) {
          console.error(error);
          // Optional: show more detailed error if needed
        }
      };

    const skillOptions = [
        'C','C++','Java','Python',
        'Data Structures and Algorithms',
        'Machine Learning',
        'Artificial Intelligence',
        'Full Stack Web Development', 'HTML', 'CSS', 'JavaScript',
        'React.js',
        'Node.js',
        'Django',
        'Spring Boot',
        'Database Management (SQL, MongoDB)',
        'Cloud Computing',
        'Cybersecurity',
        'Blockchain',
        'DevOps',
        'Mobile App Development',
        'Game Development',
        'Data Science',
        'Big Data',
        'Computer Vision',
        'Internet of Things (IoT)',
        'Software Testing',
        'UI/UX Design',
    ];

    return (
    <>
        <Header/>
        <ToastContainer />
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit} encType="multipart/form-data"> {/* multer problem */}
                <h2>Register</h2>

                {/* Other form fields */}
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="FirstName"
                        name="FirstName"
                        value={formData.FirstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="middleName">Middle Name</label>
                    <input
                        type="text"
                        id="MiddleName"
                        name="MiddleName"
                        value={formData.MiddleName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="LastName"
                        name="LastName"
                        value={formData.LastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="Email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Gender">Gender</label>
                    <select
                        id="Gender"
                        name="Gender"
                        value={formData.Gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                    {/* <div className="form-group">
                        <label htmlFor="department">Department</label>
                        <input
                            type="text"
                            id="Department"
                            name="Department"
                            value={formData.Department}
                            onChange={handleChange}
                            required
                        />
                    </div> */}
                    
                <div className="form-group">
                <label htmlFor="department">Department</label>
                    <select
                    id="Department"
                    name="Department"
                    value={formData.Department}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Department</option>
                    <option value="CST">CST</option>
                    <option value="ECE">ECE</option>
                    <option value="ME">ME</option>
                    <option value="CE">CE</option>
                    <option value="EE">EE</option>
                    <option value="All">All department</option>
                </select>
                </div>
                <div className="form-group">
                    <label htmlFor="year">Year</label>
                    <select
                        id="Year"
                        name="Year"
                        value={formData.Year}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select Year</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="rollNumber">Roll Number</label>
                    <input
                        type="text"
                        id="RollNumber"
                        name="RollNumber"
                        value={formData.RollNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="tel"
                        id="Phone"
                        name="Phone"
                        value={formData.Phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="profileImage">Profile Image</label>
                    <input
                        type="file"
                        id="ProfilePic"
                        name="ProfilePic"
                        accept="image/*"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="resume">Resume / CV</label>
                    <input
                        type="text"
                        id="Resume"
                        name="Resume"
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Skills Section */}
                <div className="form-group">
                    <label htmlFor="skills">Skills</label>
                    <select
                        id="Skills"
                        name="Skills"
                        multiple
                        value={formData.Skills}
                        onChange={handleChange}
                        required
                    >
                        {skillOptions.map((skill, index) => (
                            <option key={index} value={skill}>
                                {skill}
                            </option>
                        ))}
                    </select> {/* selectedOptiions */}
                    <small className="hint">Hold Ctrl (Windows) or Cmd (Mac) to select multiple skills.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="Password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="register-button">
                    Register
                </button>
            </form>
        </div>
    </>
    );
};

export default Register;
