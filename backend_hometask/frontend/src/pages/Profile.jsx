
import { useState } from "react";
import { useNavigate } from "react-router";
import { updateUser } from "../services/api";
import "../styles/Profile.css";

function Profile() {
    const storedUser = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const navigate = useNavigate();

    const [name, setName] = useState(storedUser?.name || "");
    const [email, setEmail] = useState(storedUser?.email || "");
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleEdit = () => {
        setEditing(true);
        setError("");
        setSuccess("");
    };

    const handleCancel = () => {
        const currentUser = JSON.parse(
            localStorage.getItem("user") || "null"
        );

        setName(currentUser?.name || "");
        setEmail(currentUser?.email || "");
        setEditing(false);
        setError("");
        setSuccess("");
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!name.trim() || !email.trim()) {
            setError("All fields are required.");
            return;
        }

        if (!storedUser?._id) {
            setError("User information is missing. Please login again.");
            return;
        }

        setLoading(true);

        try {
            const response = await updateUser(storedUser._id, {
                name: name.trim(),
                email: email.trim()
            });

            const returnedUser =
                response.data?.result ||
                response.data?.user ||
                response.data?.data;

            const updatedUser = {
                ...storedUser,
                ...(returnedUser || {}),
                name: name.trim(),
                email: email.trim()
            };

            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );

            setName(updatedUser.name);
            setEmail(updatedUser.email);
            setEditing(false);
            setSuccess("Profile updated successfully!");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to update profile."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-page-header">
                <div><span className="profile-eyebrow">
                    CAMPUSPORTAL / ACCOUNT
                </span>

                <h1>My Profile</h1>

                <p>
                    View and manage your personal account information.
                </p></div>
                <div>
                <button className="profile-dashboard-btn" onClick={() => navigate("/dashboard")}>
                    Dashboard
                </button></div>
            </div>

            <div className="profile-card">
                <div className="profile-card-header">
                    <div className="profile-avatar">
                        {(name || "U").trim().charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h2>{name || "User"}</h2>

                        <span className="profile-role">
                            {storedUser?.role || "Account"}
                        </span>
                    </div>
                </div>

                <div className="profile-divider"></div>

                {error && (
                    <div className="profile-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="profile-success">
                        {success}
                    </div>
                )}

                <form onSubmit={handleUpdate}>
                    <div className="profile-section-title">
                        <h3>Personal Information</h3>

                        <p>
                            Update your name and email address below.
                        </p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="profile-name">
                            Full Name
                        </label>

                        <input
                            id="profile-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={!editing || loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="profile-email">
                            Email Address
                        </label>

                        <input
                            id="profile-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={!editing || loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="profile-role">
                            Account Type
                        </label>

                        <input
                            id="profile-role"
                            type="text"
                            value={storedUser?.role || "Unknown"}
                            readOnly
                        />
                    </div>

                    <div className="profile-actions">
                        {!editing ? (
                            <button
                                type="button"
                                className="profile-save-btn"
                                onClick={handleEdit}
                            >
                                Edit Profile
                            </button>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className="profile-save-btn"
                                    onClick={handleCancel}
                                    disabled={loading}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="profile-save-btn"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>

            <div className="profile-note">
                <div className="profile-note-icon">i</div>

                <div>
                    <h3>Account Information</h3>

                    <p>
                        Your account type is managed by the portal.
                        Contact an authorized administrator if your
                        account permissions need to change.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
