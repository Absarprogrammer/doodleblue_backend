import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import API from '../services/api';
import '../styles/EUAuser.css'

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
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
      const updateData = {};

      if (form.name.trim()) updateData.name = form.name;
      if (form.email.trim()) updateData.email = form.email;

      await API.patch(`/updateDetails/${id}`, updateData);

      alert('User updated successfully');
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Update failed');
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Edit User</h2>


        <input
          name="name"
          placeholder="New Name"
          value={form.name}
          onChange={handleChange}
        />

        <input name="email"
          type="email"
          placeholder="New Email"
          value={form.email}
          onChange={handleChange}
        />
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange}/>
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange}/>
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange}/>
        <input name="dob" placeholder="DOB" value={form.dob} onChange={handleChange}/>


        <button type="submit">Update</button>
        <button type="button" className="dashboard-btn" onClick={() => navigate('/dashboard')}>
  Back to Dashboard</button>
        <p>{message}</p>
      </form>
    </div>
  );
}

export default EditUser;