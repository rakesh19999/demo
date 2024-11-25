import React, { useState } from "react";
import "./App.css"; // Optional: For adding styles

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubscribeClick = () => {
    setIsModalOpen(true); // Show the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Hide the modal
  };

  return (
    <div className="App">
      <button onClick={handleSubscribeClick}>Subscribe</button>
      {isModalOpen && <SubscribeModal onClose={handleCloseModal} />}
    </div>
  );
}

function SubscribeModal({ onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>Subscribe to Report - Image QC Monitor</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <label>
            <strong>Time (UTC)</strong>
          </label>
          <input type="time" />

          <label>
            <strong>Frequency</strong>
          </label>
          <div className="frequency-options">
            <button>Daily</button>
            <button>Day of Week</button>
            <button>Day of Month</button>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>Cancel</button>
          <button className="subscribe-button">Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default App;
