import React, { useState } from "react";
import "./Card.css";
import { BaseUrl } from "../BaseUrl";
import ViewProfile from "./ViewProfile.jsx";

const Cards = ({ index, user }) => {
  const [selectedUser, setSelectedUser] = useState(null); // State to hold the selected user

  const viewProfileHandler = (RollNumber) => {
    console.log(RollNumber);
    setSelectedUser(RollNumber); // Set the RollNumber of the selected user
  };

  // If a user is selected, render the <ViewProfile /> component
  if (selectedUser) {
    return <ViewProfile RollNumber={selectedUser} />;
  }

  return (
    <div className="cards-container">
      <div className="card" key={index}>
        <div className="card-content">
          <div className="card-info">
            <h3 className="user-name">{`${user.FirstName} ${user.MiddleName} ${user.LastName}`}</h3>

            {/* Dot Status Indicator */}
            <div className="status-dot-container">
              <span
                className={`status-dot ${user.Status ? "dot-active" : "dot-busy"}`}
              ></span>
              <span className="status-text">
                {user.Status ? "Active" : "Busy"}
              </span>
            </div>

            <button
              className="view-profile-button"
              onClick={() => {
                viewProfileHandler(user.RollNumber);
              }}
            >
              View Profile
            </button>

            <div className="skills">
              <strong>Skills:</strong>{" "}
              {user.Skills && user.Skills.length > 0
                ? user.Skills.join(", ")
                : "No skills listed"}
            </div>
          </div>
          <div className="card-image-container">
            <img
              src={`${user.ProfilePic}`}
              alt="User"
              className="card-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
