import React, { useState , useEffect} from 'react';
import './Register.css';
import axios from 'axios';
import { BaseUrl } from '../BaseUrl.js';
import { useNavigate } from "react-router-dom";
import Header from './Header.jsx';
import { useDispatch } from "react-redux";
import { setUserData } from '../Redux/actions.js';
import { useSelector } from 'react-redux';


const Register = () => {
    const navigate = useNavigate();
    const Dispatch = useDispatch();

    const userData = useSelector((state)=> state.userData)
    
        useEffect(() => {
          if (userData==null) {
            navigate("/login");
          }
          else
          {
            console.log(userData);
            setFormData(userData);
          }
        }, [navigate,userData]);

    const [userStatus,setStatus] = useState(userData.Status);
    const [formData, setFormData] = useState({
        FirstName: '',
        MiddleName: '',
        LastName: '',
        Email: '',
        Gender:'',
        Department: '',
        Year: '',
        Phone: '',
        Skills: [],
        Resume: '',
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (name === 'Skills') {
            // Handle multiple selections
            const options = Array.from(e.target.selectedOptions, (option) => option.value);
            setFormData({
                ...formData,
                Skills: options,
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === 'file' ? files[0] : value,
            });
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log('Form Data:', formData);
        const headers = {
            "Content-Type": "application/json",
          };
          axios
            .put(`${BaseUrl()}/user/details/update`, {formData,RollNumber:userData.RollNumber}, {
              headers: headers,
            })
            .then((response) => {
                console.log(response.data);
               Dispatch(
                setUserData({
                    FirstName : response.data.FirstName,
                    MiddleName: response.data.MiddleName,
                    LastName: response.data.LastName,
                    Email: response.data.Email,
                    Gender: response.data.Gender,
                    Department: response.data.Department,
                    Year: response.data.Year,
                    Phone: response.data.Phone,
                    Skills: response.data.Skills,
                    ProfilePic: response.data.ProfilePic,
                    Resume: response.data.Resume,
                    RollNumber:response.data.RollNumber,
                    Status:userStatus
                }))
                navigate("/display");
              })
              
              .catch((error) => {
                console.error(error);
              });
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
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}> {/* multer problem */}
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
                        // required
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
                        // required
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
                        // required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Gender">Gender</label>
                    <select
                        id="Gender"
                        name="Gender"
                        value={formData.Gender}
                        onChange={handleChange}
                        // required
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Department">Department</label>
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
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="year">Year</label>
                    <select
                        id="Year"
                        name="Year"
                        value={formData.Year}
                        onChange={handleChange}
                        // required
                    >
                        <option value="" disabled>Select Year</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="tel"
                        id="Phone"
                        name="Phone"
                        value={formData.Phone}
                        onChange={handleChange}
                        // required
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
                        // required
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
                    <label htmlFor="Resume">Resume</label>
                    <input
                        type="text"
                        id="Resume"
                        name="Resume"
                        value={formData.Resume}
                        onChange={handleChange}
                        // required
                    />
                </div>
                <button type="submit" className="register-button">
                    Update
                </button>
            </form>
        </div>
    </>
    );
};

export default Register;
