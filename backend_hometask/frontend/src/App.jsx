import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EditUser from './pages/Edituser';
import UpdatePassword from './pages/Updatepwdd';
import AddDetails from './pages/AddDetails';
import Users from './pages/Users'
import Profile from './pages/Profile';

function ProtectedRoute({ children }) {
  return localStorage.getItem('token')? children: <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/edit/:id" element={
            <ProtectedRoute>
              <EditUser />
            </ProtectedRoute>
          }
        />

        <Route path="/update-password/:id" element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />

        <Route path="/add-details" element={
            <ProtectedRoute>
              <AddDetails />
            </ProtectedRoute>
          }
        />
        <Route path="/users" element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>}
          />
          <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>}
          />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;