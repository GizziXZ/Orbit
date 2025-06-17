import "../styles/Topbar.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHome, faMessage, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";

function Topbar() {
    const navigate = useNavigate();
    const username = useSelector((state) => state.user.username);
    const userId = useSelector((state) => state.user.id);
    const profilePicture = useSelector((state) => state.user.profilePicture);
    const handleLogout = async () => {
        const response = await fetch(`/api/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (response.ok) {
            navigate("/login");
        } else {
            const errorData = await response.json();
            alert(errorData.message || "An error occurred during logout. Please try again.");
        }
    };

    return (
        <div className="topbar">
            <h1 className="topbar-logo">Orbit</h1>
            <div className="topbar-search">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="topbar-search-icon" />
                <input type="text" placeholder="Search Orbit" />
            </div>
            <div className="topbar-actions">
                <FontAwesomeIcon icon={faHome} className="topbar-action-icon" title="Home" onClick={() => navigate("/home")} />
                <FontAwesomeIcon icon={faMessage} className="topbar-action-icon" title="Chats" />
                {profilePicture ? (
                    <img src={profilePicture} className="topbar-action-icon profile-icon" title={username} onClick={() => navigate(`/profile/${userId}`)} />
                ) : (
                    <FontAwesomeIcon icon={faUser} className="topbar-action-icon" title={username} onClick={() => navigate(`/profile/${userId}`)} />
                )}
                <FontAwesomeIcon icon={faRightFromBracket} className="topbar-action-icon" id="logout" title="Logout" onClick={handleLogout} />
            </div>
        </div>
    );
}

export default Topbar;