import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password
    };

    try {
      const response = await fetch('https://booking-w7g0.onrender.com/user/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        // Reset form fields
        setEmail('');
        setPassword('');
        navigate('/booking');


        // Handle successful login, e.g., store token and navigate to protected route
      } else {
        // Handle error response
        const errorData = await response.json();
        console.log('Login error:', errorData);
      }
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        <a href="/">Don't have account? SignUp here</a>
      </form>
    </div>
  );
}

export default Login;
