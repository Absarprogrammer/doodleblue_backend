import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import API from '../services/api';
import '../styles/EUAuser.css'


function UpdatePassword() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const[message,setMessage]=useState('')
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await API.patch(`/updatepwd/${id}`, {
        password,
      });

      alert('Password updated successfully');
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Password update failed');
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Update Password</h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Update Password</button>
        <button type="button" className="dashboard-btn" onClick={() => navigate('/dashboard')}>
  Back to Dashboard</button>
  <p>{message}</p>
      </form>
    </div>
  );
}

export default UpdatePassword;