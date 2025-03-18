import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { bookSlot, clearSlot } from "../appointmentSlice";

// Details Screen
const DetailsScreen = () => {
  const { time } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appointment = useSelector((state) => state.appointments[time]) || {};

  const [form, setForm] = useState({
    firstName: appointment.firstName || "",
    lastName: appointment.lastName || "",
    phone: appointment.phone || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(bookSlot({ time, ...form }));
    navigate("/");
  };

  const handleClear = () => {
    dispatch(clearSlot(time));
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary">Appointment for {time}</h2>
      <div className="mb-3">
        <input className="form-control" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <input className="form-control" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <input className="form-control" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      </div>
      <div>
        <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
        <button className="btn btn-danger me-2" onClick={handleClear}>Clear</button>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>Cancel</button>
      </div>
    </div>
  );
};

export default DetailsScreen;