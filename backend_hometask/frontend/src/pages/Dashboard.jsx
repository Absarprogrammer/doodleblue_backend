
import { Link, useNavigate } from 'react-router';
import '../styles/Dashboard.css'

function Dashboard() {
    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem('user') || 'null'
    );

    const isFaculty = user?.role === 'faculty';

    function logout() {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <div className="dashboard-page">

        
            <header className="navbar">
                <h2>CampusPortal</h2>
                <button onClick={logout}>Logout</button>
            </header>

            <main className="dashboard-content">

                <section className="dashboard-welcome">
                    <div>
                        <span className="dashboard-eyebrow">
                            CAMPUSPORTAL / DASHBOARD
                        </span>

                        <h1>
                            Welcome back, {user?.name || 'User'}!
                        </h1>

                        <p>
                            Manage your campus activities from one place.
                        </p>
                    </div>

                    <div className="dashboard-avatar">
                        {(user?.name || 'U').charAt(0).toUpperCase()}
                    </div>
                </section>
                <section className="dashboard-cards">

                    <div className="dashboard-card">
                        <div className="dashboard-card-icon blue">
                            ♙
                        </div>

                        <p className="dashboard-card-label">
                            Account Type
                        </p>

                        <h2>
                            {user?.role || 'Unknown'}
                        </h2>

                        <span className="dashboard-card-note">
                            Your portal role
                        </span>
                    </div>

                    <div className="dashboard-card">
                        <div className="dashboard-card-icon purple">
                            ✉
                        </div>

                        <p className="dashboard-card-label">
                            Email Address
                        </p>

                        <h2 className="dashboard-email">
                            {user?.email || 'Not available'}
                        </h2>

                        <span className="dashboard-card-note">
                            Registered email
                        </span>
                    </div>

                    <div className="dashboard-card">
                        <div className="dashboard-card-icon green">
                            ✓
                        </div>

                        <p className="dashboard-card-label">
                            Account Status
                        </p>

                        <h2>
                            {user?.isActive === false
                                ? 'Inactive'
                                : 'Active'}
                        </h2>

                        <span className="dashboard-card-note">
                            Account information
                        </span>
                    </div>

                </section>
                <section className="dashboard-section">

                    <div className="dashboard-section-heading">
                        <div >
                            <h2>Quick Actions</h2>
                            <p>Access your frequently used pages.</p>
                        </div>
                    </div>

                    <div className="dashboard-actions">

                        {/* Profile */}
                        <Link
                            to="/profile"
                            className="dashboard-action"
                        >
                            <div className="action-icon blue">
                                ◎
                            </div>

                            <div>
                                <h3>My Profile</h3>
                                <p>View your personal information.</p>
                            </div>

                            <span className="action-arrow">→</span>
                        </Link>

                        <Link
                            to={`/edit/${user?._id}`}
                            className="dashboard-action"
                        >
                            <div className="action-icon green">
                                ✎
                            </div>

                            <div>
                                <h3>Update Profile</h3>
                                <p>Edit your name and email.</p>
                            </div>

                            <span className="action-arrow">→</span>
                        </Link>

                        <Link
                            to={`/update-password/${user?._id}`}
                            className="dashboard-action"
                        >
                            <div className="action-icon purple">
                                🔒
                            </div>

                            <div>
                                <h3>Update Password</h3>
                                <p>Change your account password.</p>
                            </div>

                            <span className="action-arrow">→</span>
                        </Link>

                        {/* Add Details */}
                        <Link
                            to="/add-details"
                            className="dashboard-action"
                        >
                            <div className="action-icon blue">
                                +
                            </div>

                            <div>
                                <h3>Add Profile Details</h3>
                                <p>Add additional profile information.</p>
                            </div>

                            <span className="action-arrow">→</span>
                        </Link>

                        {/* Faculty only */}
                        {isFaculty && (
                            <Link
                                to="/users"
                                className="dashboard-action"
                            >
                                <div className="action-icon purple">
                                    ♙
                                </div>

                                <div>
                                    <h3>Manage Users</h3>
                                    <p>
                                        View, edit and deactivate student accounts.
                                    </p>
                                </div>

                                <span className="action-arrow">→</span>
                            </Link>
                        )}

                    </div>
                </section>

                {/* Role information */}
                <section className="dashboard-info">

                    <div className="dashboard-info-icon">
                        i
                    </div>

                    <div>
                        <h3>
                            {isFaculty
                                ? 'Faculty Workspace'
                                : 'Student Workspace'}
                        </h3>

                        <p>
                            {isFaculty
                                ? 'Welcome to your faculty workspace. You can manage student accounts and view other faculty accounts.'
                                : 'Welcome to your student workspace. You can view and update your personal information.'}
                        </p>
                    </div>

                </section>

            </main>
        </div>
    );
}

export default Dashboard;
