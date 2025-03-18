import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Time slots component
const TimeSlots = () => {
    const navigate = useNavigate();
    const appointments = useSelector((state) => state.appointments);
    const timeSlots = Array.from({ length: 9 }, (_, i) => `${9 + i}:00AM`);
  
    return (
      <div className="container mt-4">
        <h2 className="mb-3 text-primary">Select a Time Slot</h2>
        <ul className="list-group">
          {timeSlots.map((slot) => (
            <li
              key={slot}
              className={`list-group-item text-center fw-bold cursor-pointer ${appointments[slot] ? "bg-danger text-white" : "bg-light"}`}
              onClick={() => navigate(`/details/${slot}`)}
            >
              {slot}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default TimeSlots;