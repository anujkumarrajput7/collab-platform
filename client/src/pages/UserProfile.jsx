import React, { useState } from "react";
import "./UserProfile.css"; // styling ke liye

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "Anuj Singh",
    coverPhoto: "https://via.placeholder.com/800x200",
    profilePhoto: "https://via.placeholder.com/150",
    followers: 12000,
    following: 300,
    skills: ["Tech", "AI", "Gaming"],
    bio: "I am a tech creator passionate about AI and coding."
  });

  return (
    <div className="profile-container">
      {/* Cover Photo */}
      <div className="cover-photo">
        <img src={user.coverPhoto} alt="cover" />
        <img src={user.profilePhoto} alt="profile" className="profile-pic" />
      </div>

      <div className="profile-card">
        <h1>{user.name}</h1>
        <p className="bio">{user.bio}</p>

        {/* Followers Section */}
        <div className="follow-stats">
          <p>👥 Followers: {user.followers}</p>
          <p>👉 Following: {user.following}</p>
        </div>

        {/* Skills / Interests */}
        <div className="skills">
          <h3>Skills / Interests:</h3>
          <div className="skills-tags">
            {user.skills.map((skill, i) => (
              <span key={i} className="tag">{skill}</span>
            ))}
          </div>
        </div>

        {/* Edit Profile */}
        <button className="edit-btn">Edit Profile</button>
      </div>
    </div>
  );
}
