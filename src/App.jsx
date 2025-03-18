import "./App.css"
import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import { bookSlot, clearSlot } from "./appointmentSlice";
import 'bootstrap/dist/css/bootstrap.min.css';

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

// Details Screen
const DetailsScreen = () => {
  const { time } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appointment = useSelector((state) => state.appointments[time]) || {};

  const [form, setForm] = React.useState({
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

// App Component
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<TimeSlots />} />
          <Route path="/details/:time" element={<DetailsScreen />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
