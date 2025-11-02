import React, { useState, useEffect } from "react";
import "./App.css";

const mockDataGet = {
  pagename: "page8000987",
  schedule: {
    Description: "on Monday every week",
    createdDate: "{createddatetime}",
    // Uncomment one of the following lines based on the data structure
    // daysofweek: "1,3,5", // Uncomment for testing "Day of Week"
    daysofmonth: "10,20,21", // Uncomment for testing "Day of Month"
  },
};

const daysOfWeekMap = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1); // [1, 2, 3, ..., 31]

const SubscribeModal = ({ onClose, mockData }) => {
  const [time, setTime] = useState("");
  const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([]);
  const [selectedDaysOfMonth, setSelectedDaysOfMonth] = useState([]);
  const [activeFrequency, setActiveFrequency] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (mockData?.schedule) {
      const { daysofweek, daysofmonth } = mockData.schedule;

      if (daysofweek) {
        const parsedDaysOfWeek = daysofweek
          .split(",")
          .map((num) => daysOfWeekMap[parseInt(num, 10) - 1]); // Convert to day names
        setSelectedDaysOfWeek(parsedDaysOfWeek);
        setActiveFrequency("Day of Week");
      }

      if (daysofmonth) {
        const parsedDaysOfMonth = daysofmonth
          .split(",")
          .map((num) => parseInt(num, 10));
        setSelectedDaysOfMonth(parsedDaysOfMonth);
        setActiveFrequency("Day of Month");
      }
    }
  }, [mockData]);

  const handleSubscribe = () => {
    alert(
      `Subscribed at ${
        time || "default"
      } UTC. Frequency: ${activeFrequency}, Days: ${
        activeFrequency === "Day of Week"
          ? selectedDaysOfWeek.join(", ")
          : selectedDaysOfMonth.join(", ")
      }`
    );
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header ribbon">
          <h2>Subscribe to Report - {mockData?.pagename || "Loading..."}</h2>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          {mockData?.schedule && (
            <>
              <p>
                <strong>Description:</strong> {mockData.schedule.Description}
              </p>
              <p>
                <strong>Created Date:</strong> {mockData.schedule.createdDate}
              </p>
            </>
          )}

          <label>
            <strong>Time (UTC)</strong>
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            disabled={!time}
          />

          <label>
            <strong>Frequency</strong>
          </label>
          <div className="frequency-options">
            <button
              className={activeFrequency === "Daily" ? "active" : ""}
              disabled
            >
              Daily
            </button>
            <button
              className={activeFrequency === "Day of Week" ? "active" : ""}
              disabled={activeFrequency !== "Day of Week"}
            >
              Day of Week
            </button>
            <button
              className={activeFrequency === "Day of Month" ? "active" : ""}
              disabled={activeFrequency !== "Day of Month"}
            >
              Day of Month
            </button>
          </div>

          {activeFrequency === "Day of Week" && (
            <div className="day-checkbox-grid">
              {daysOfWeekMap.map((day) => (
                <label key={day} className="checkbox-item">
                  <input
                    type="checkbox"
                    value={day}
                    checked={selectedDaysOfWeek.includes(day)}
                    disabled
                  />
                  {day}
                </label>
              ))}
            </div>
          )}

          {activeFrequency === "Day of Month" && (
            <div className="dropdown-container">
              <button
                className="dropdown-button"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                {selectedDaysOfMonth.length > 0
                  ? `Selected Days: ${selectedDaysOfMonth.join(", ")}`
                  : "Select Days"}
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  {daysOfMonth.map((day) => (
                    <label key={day} className="checkbox-item">
                      <input
                        type="checkbox"
                        value={day}
                        checked={selectedDaysOfMonth.includes(day)}
                        disabled
                      />
                      {day}
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>Cancel</button>
          <button className="subscribe-button" onClick={handleSubscribe}>
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

const Subscribe = () => {
  const [showModal, setShowModal] = useState(false);
  const [mockData, setMockData] = useState(null);

  const handleShow = () => {
    setMockData(mockDataGet); // Simulate API response
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setMockData(null); // Reset mock data on close
  };

  return (
    <div className="text-end">
      <button className="btn btn-primary" onClick={handleShow}>
        Subscribe
      </button>
      {showModal && (
        <SubscribeModal onClose={handleClose} mockData={mockData} />
      )}
    </div>
  );
};

export default Subscribe;
