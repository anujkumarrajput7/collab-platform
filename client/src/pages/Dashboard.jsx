import { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [message, setMessage] = useState("");

  const companies = [
    { name: "Nike", industry: "Sportswear" },
    { name: "Adidas", industry: "Shoes" },
    { name: "Zara", industry: "Fashion" },
  ];

  const handleRequest = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const sendRequest = () => {
    alert(`Collaboration request sent to ${selectedCompany.name}: ${message}`);
    setShowModal(false);
    setMessage("");
  };

  return (
    <div className="dashboard">
      {/* Companies Section */}
      <div className="section">
        <h2>Suggested Companies</h2>
        {companies.map((c, idx) => (
          <div key={idx} className="card">
            <h3>{c.name}</h3>
            <p>{c.industry}</p>
            <button className="btn" onClick={() => handleRequest(c)}>
              Request Collaboration
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Request Collaboration with {selectedCompany.name}</h2>
            <textarea
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="modal-actions">
              <button className="btn accept" onClick={sendRequest}>
                Send
              </button>
              <button className="btn reject" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
