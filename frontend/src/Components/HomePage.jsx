import React from 'react';
import Header from './Header.jsx';
import "./HomePage.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../BaseUrl.js';
import Cards from './Card.jsx';
import { useSelector } from 'react-redux';
import { useLocation , useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = ()=>{
    const userData = useSelector((state)=> state.userData)
    const navigate = useNavigate();
    const [searched, setSearched] = useState(false);
    const [activeUsers , setActiveUsers] = useState([]);

    useEffect(() => {
        if (userData==null) {
          navigate("/");
        }
      }, [navigate,userData]);

      useEffect(()=>{
        const headers = {
            "Content-Type": "application/json", // multer problem due to this
          };
          axios
            .post(`${BaseUrl()}/user/search/activeUsers`,{}, {
              headers: headers,
            })
            .then((response)=>{
                // console.log(response.data);
               setActiveUsers(response.data);
            })
            .catch((err)=>{
                console.log(err);
            })
      },[searched == false]);
      
    // State to store filter values
    const [filters, setFilters] = useState({
        department: "",
        year: "", 
        skills: [],
        gender: "",
    });
    const [users, setUsers] = useState([]);

    // Handle input changes for filters
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'skills') {
            // Handle multiple selections
            const options = Array.from(e.target.selectedOptions, (option) => option.value);
            setFilters({
                ...filters,
                skills: options,
            });
        } else {
            setFilters({
                ...filters,
                [name]: value,
            });
        }
    };

    // Handle search action
    const handleSearch = async(e) => {
        console.log("Searching with filters:", filters);
        setSearched(true);

        e.preventDefault();
        const headers = {
            "Content-Type": "application/json", // multer problem due to this
          };
          const searchPromise = axios.post(`${BaseUrl()}/user/search/filter`,filters, {
              headers: headers,
            })

            toast.promise(searchPromise,{
                    pending: 'please wait...',
                    success: 'done!',
                    error: 'fail to search please try again'
            })
            try {
                const response = await searchPromise;
                setUsers(response.data);
            } catch (error) {
                console.log(error);
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
        <ToastContainer/>
        <div className="main-page-container">
        <h1 className="main-page-title">Filter Users</h1>
        <div className="filter-container">
            <div className="filter-item">
            <label htmlFor="department">Department</label>
            <select
                id="department"
                name="department"
                value={filters.department}
                onChange={handleInputChange}
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

            <div className="filter-item">
            <label htmlFor="year">Year</label>
            <select
                id="year"
                name="year"
                value={filters.year}
                onChange={handleInputChange}
            >
                <option value="">Select Year</option>
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="All">All years</option>
            </select>
            </div>

            <div className="filter-item">
            <label htmlFor="gender">Gender</label>
            <select
                id="gender"
                name="gender"
                value={filters.gender}
                onChange={handleInputChange}
            >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="All">Any Gender</option>
            </select>
            </div>
            <div className="filter-item">
            <label htmlFor="skills">Skills</label>
            <select
                type="text"
                id="skills"
                name="skills"
                multiple
                placeholder="e.g., Python, React"
                // value={filters.skills}
                onChange={handleInputChange}
            >
            <option value="">Select Skills</option>
              {skillOptions.map((skill, index) => (
                            <option key={index} value={skill}>
                                {skill}
                            </option>
                 ))}
            </select>   
            </div>
        </div>
        <button className="search-button" onClick={handleSearch}>
            Search
            </button>
        </div>
        <div>
            {users.map((user, index) => (
            <Cards key={index} user={user} />
            ))}
        </div>
        {!searched? 
            <>
                <div>
                {activeUsers.map((user, index) => (
                <Cards key={index} user={user} />
                ))}
                </div>
            </>
        : ''}
    </>
    )
}

export default HomePage;



