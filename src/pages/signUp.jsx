import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signUp.css';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      age
    };

    try {
      const response = await fetch('https://booking-w7g0.onrender.com/user/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        // Reset form fields
        setName('');
        setEmail('');
        setPassword('');
        setAge('');

        // Navigate to the login page
        navigate('/login');
      } else {
        // Handle error response
        const errorData = await response.json();
        console.log('Signup error:', errorData);
      }
    } catch (error) {
      console.log('Signup error:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        /><br />

        <button type="submit" onClick={handleSignup}>Signup</button>
      <a href="/login">already have account login here</a>
      </form>
    </div>
  );
}

export default SignUp;
