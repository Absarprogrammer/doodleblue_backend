
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/Users.css';
import API from '../services/api';

function Users() {
    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem('user') || 'null'
    );

    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(user?.role === 'faculty');

    const fetchUsers = useCallback(async () => {
        setMessage('');

        try {
            const response = await API.get('/get');

            console.log(response.data);

            const result = response.data.result;

            setUsers(
                Array.isArray(result)
                    ? result
                    : result
                        ? [result]
                        : []
            );
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                'Unable to fetch users'
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user?.role !== 'faculty') {
            navigate('/dashboard', { replace: true });
            return;
        }

        fetchUsers();
    }, [user?.role, navigate, fetchUsers]);

    async function handleDelete(id) {
        const confirmDelete = window.confirm(
            'Are you sure you want to deactivate this user?'
        );

        if (!confirmDelete) return;

        try {
            await API.delete(`/delete/${id}`);

            setMessage('User deactivated successfully');

            await fetchUsers();
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                'Unable to deactivate user'
            );
        }
    }

    if (user?.role !== 'faculty') {
        return null;
    }

    return (
        <div className="users-page">
            <header className="navbar">
                <h2>CampusPortal</h2>

                <button onClick={() => navigate('/dashboard')}>
                    Dashboard
                </button>
            </header>

            <main className="users-content">
                <div className="users-heading">
                    <div>
                        <span className="dashboard-eyebrow">
                            CAMPUSPORTAL / USERS
                        </span>

                        <h1>User Management</h1>

                        <p>
                            View and manage campus accounts.
                        </p>
                    </div>

                    <div className="users-count">
                        <span>Total Users</span>
                        <h2>{users.length}</h2>
                    </div>
                </div>

                {message && (
                    <p className="users-message">
                        {message}
                    </p>
                )}

                {loading ? (
                    <h3>Loading users...</h3>
                ) : users.length === 0 ? (
                    <div className="users-empty">
                        <h2>No users found</h2>
                        <p>There are no users to display.</p>
                    </div>
                ) : (
                    <div className="users-grid">
                        {users.map((item) => {
                            const isOwnAccount =
                                String(item._id) === String(user?._id);

                            const isStudent =
                                item.role === 'student';

                            return (
                                <div
                                    className="user-management-card"
                                    key={item._id}
                                >
                                    <div className="user-card-top">
                                        <div className="user-avatar">
                                            {item.name
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <span className={
                                            isStudent
                                                ? 'role-badge student'
                                                : 'role-badge faculty'
                                        }>
                                            {item.role}
                                        </span>
                                    </div>

                                    <h3>{item.name}</h3>

                                    <p className="user-email">
                                        {item.email}
                                    </p>

                                    <div className="user-card-details">
                                        <p>
                                            <strong>Account:</strong>
                                            <span className="active-status">
                                                {item.isActive
                                                    ? 'Active'
                                                    : 'Inactive'}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="user-card-actions">
                                        {(isOwnAccount || isStudent) && (
                                            <button
                                                className="user-edit-btn"
                                                onClick={() =>
                                                    navigate(`/edit/${item._id}`)
                                                }
                                            >
                                                Edit
                                            </button>
                                        )}

                                        {(isOwnAccount || isStudent) && (
                                            <button
                                                className="user-delete-btn"
                                                onClick={() =>
                                                    handleDelete(item._id)
                                                }
                                                disabled={!item.isActive}
                                            >
                                                Deactivate
                                            </button>
                                        )}

                                        {!isOwnAccount && !isStudent && (
                                            <span className="view-only">
                                                View only
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Users;
