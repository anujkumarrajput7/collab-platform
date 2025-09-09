import React, { useState } from "react";
import "./CompanyProfile.css";

export default function CompanyProfile() {
  const [company] = useState({
    name: "OpenCollab Pvt Ltd",
    logo: "https://via.placeholder.com/120",
    about: "We are a startup connecting brands with influencers.",
    industry: "Marketing",
    website: "https://opencollab.com",
    collaborations: [
      { id: 1, influencer: "Anuj Singh", project: "Tech Campaign 2024" },
      { id: 2, influencer: "Priya Sharma", project: "Fashion Launch" }
    ]
  });

  return (
    <div className="company-container">
      <div className="company-header">
        <img src={company.logo} alt="logo" />
        <div>
          <h1>{company.name}</h1>
          <p>{company.industry}</p>
          <a href={company.website} target="_blank" rel="noreferrer">
            {company.website}
          </a>
        </div>
      </div>

      {/* About Section */}
      <div className="company-card">
        <h2>About Company</h2>
        <p>{company.about}</p>
      </div>

      {/* Past Collaborations */}
      <div className="company-card">
        <h2>Past Collaborations</h2>
        {company.collaborations.length === 0 ? (
          <p>No collaborations yet.</p>
        ) : (
          <ul>
            {company.collaborations.map((collab) => (
              <li key={collab.id}>
                {collab.influencer} → <b>{collab.project}</b>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
