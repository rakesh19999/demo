import React, { useState } from "react";
import "./App.css"; // Import CSS for styling

function SubscribeModal({ onClose }) {
  const [time, setTime] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("Daily");

  const handleFrequencyChange = (frequency) => {
    setSelectedFrequency(frequency);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>Test</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <label>
            <strong>Time (UTC)</strong>
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <label>
            <strong>Frequency</strong>
          </label>
          <div className="frequency-options">
            <button
              className={selectedFrequency === "Daily" ? "active" : ""}
              onClick={() => handleFrequencyChange("Daily")}
            >
              Daily
            </button>
            <button
              className={selectedFrequency === "Day of Week" ? "active" : ""}
              onClick={() => handleFrequencyChange("Day of Week")}
            >
              Day of Week
            </button>
            <button
              className={selectedFrequency === "Day of Month" ? "active" : ""}
              onClick={() => handleFrequencyChange("Day of Month")}
            >
              Day of Month
            </button>
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

export default SubscribeModal;
