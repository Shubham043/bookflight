import React from 'react';
import SignUp from './pages/signUp';
import Login from './pages/login';
import FlightBooking from './pages/flightbooking';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/booking" element={<FlightBooking />} />
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
