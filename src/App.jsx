import "./App.css"
import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import { bookSlot, clearSlot } from "./appointmentSlice";
import 'bootstrap/dist/css/bootstrap.min.css';
import TimeSlots from "./Pages/TimeSlots";
import DetailsScreen from "./Pages/DetailsScreen";




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
