import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import API from '../services/api';

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await API.post('/signup', form);

      setMessage(response.data.message || 'Signup successful');
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Signup failed');
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-card">
        <h2>Create Account</h2>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        

        <button type="submit">Signup</button>

        <p>{message}</p>
        <p>Already registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}

export default Signup;