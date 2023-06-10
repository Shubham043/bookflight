import React, { useState } from 'react';
import './flightbooking.css';

function FlightBooking() {
  const [source, setSource] = useState('delhi'); // Fixed source
  const [destination, setDestination] = useState(''); // Selected destination
  const [price1, setPrice1] = useState(null);
  const [price2, setPrice2] = useState(null); // Price
  const [price3, setPrice3] = useState(null);
  const [age, setAge] = useState('');
  console.log(destination);
  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };
  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleGetPrice = async () => {
    try {
        const formattedDestination = encodeURIComponent(destination);
        const url = `https://booking-w7g0.onrender.com/api/price?source=${source}&destination=${formattedDestination}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        const data = await response.json();
    
        const adjustedPrice1 = age < 18 ? data.indigo / 2 : data.indigo;
        const adjustedPrice2 = age < 18 ? data.airasia / 2 : data.airasia;
        const adjustedPrice3 = age < 18 ? data.vistara / 2 : data.vistara;
  
        setPrice1(adjustedPrice1);
        setPrice2(adjustedPrice2);
        setPrice3(adjustedPrice3);
      console.log(data);
    } catch (error) {
      console.error(error);
      setPrice1(null);
      setPrice2(null);
      setPrice3(null);
    }
  };

  return (
    <div>
      <h2>Flight Booking</h2>
      <div className="booking-form">
        <div>
          <label htmlFor="source">Source:</label>
          <input type="text" id="source" value={source} readOnly />
        </div>

        <div>
          <label htmlFor="destination">Destination:</label>
          <select
            id="destination"
            value={destination}
            onChange={handleDestinationChange}
          >
            <option value="">Select Destination</option>
            <option value="jaipur">Jaipur</option>
            <option value="Mumbai">Mumbai</option>
            <option value="panipat">panipat</option>
            <option value="kolkata">Kolkata</option>
            <option value="Surat">Surat</option>
          </select>
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <select id="age" value={age} onChange={handleAgeChange}>
            <option value="">Select Age</option>
            <option value="11">0-18</option>
            <option value="19">19-100</option>
            
            {/* Add more age options as needed */}
          </select>
        </div>

        <button
          type="button"
          onClick={handleGetPrice}
          disabled={!destination}
        >
          Get Price
        </button>

        {price1 !== null && price2 !== null && price3 !== null  && (
          <div className="price">
            <h3>Indigo: ${price1}</h3>
            <h3>airasia: ${price2}</h3>
            <h3>vistara: ${price3}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlightBooking;
