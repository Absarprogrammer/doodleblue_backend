import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import API from '../services/api';

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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
      const response = await API.post('/login', form);

      // Adjust these paths to match your actual login response.
      const token = response.data.token 
      const user = response.data.user 

      localStorage.setItem('token', token);

        localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-card">
        <h2>Login</h2>

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

        <button type="submit">Login</button>

        <p>{message}</p>
        <p>New user? <Link to="/signup">Signup</Link></p>
      </form>
    </div>
  );
}

export default Login;