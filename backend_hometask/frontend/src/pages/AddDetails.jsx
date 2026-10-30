import { useState } from 'react';
import { useNavigate } from 'react-router';
import API from '../services/api';
import '../styles/EUAuser.css'

function AddDetails() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    department: '',
    phone: '',
    age:'',dob:'',address:''
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
      await API.post('/adddetails', form);

      alert('Profile details added successfully');
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to add details');
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Add Profile Details</h2>

        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange}/>
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange}/>
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange}/>
        <input name="dob" placeholder="DOB" value={form.dob} onChange={handleChange}/>

        <button type="submit">Save Details</button>
        <button type="button" className="dashboard-btn" onClick={() => navigate('/dashboard')}>
  Back to Dashboard</button>
        <p>{message}</p>
      </form>
    </div>
  );
}

export default AddDetails;