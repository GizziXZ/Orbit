import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import Topbar from "../components/Topbar";
import Post from "../components/Post";
import '../styles/Profile.css';

function Profile() {
    let { id } = useParams();
    const currentUserId = useSelector((state) => state.user.id);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [following, setFollowing] = useState(false);

    if (!id) {
        id = currentUserId; // If no ID is provided, default back to current user ID
    }

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`/api/users/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user profile");
                }

                const data = await response.json();
                setUser(data.user);
                setFollowing(data.user.isFollowed);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        }
        fetchUserProfile();
    }, [id]);

    const handleFollow = async () => {
        const response = await fetch(`/api/users/${id}/follow`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            console.error(`Error following user ${user.username}: ${(await response.json()).message}`);
            return;
        }
        const data = await response.json();
        setFollowing(data.isFollowed);
    }

    return (
        <div className="profile-container">
            <Topbar />
            {loading ? (
                <div className="profile-loading">Loading...</div>
            ) : user ? (
            <>
                <div className="profile-content">
                    <div className="profile-card">
                        <div className="profile-header">
                            <img
                                src={user.profilePicture}
                                className="profile-picture"
                                alt={`${user.username}'s profile picture`}
                            />
                            <div className="profile-info">
                                <h1 className="profile-username">{user.username}</h1>
                                <p className="profile-joined">
                                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            {id === currentUserId && (
                                <FontAwesomeIcon icon={faPencil} className="edit-icon" />
                            )}
                        </div>
                        {id !== currentUserId && (
                            <button
                                className="follow-button"
                                style={{
                                    backgroundColor: following ? "#27ad60" : "",
                                    color: following ? "#fff" : "",
                                }}
                                onClick={handleFollow}
                            >
                                {following ? "Followed" : "Follow"}
                            </button>
                        )}
                        <p className="profile-bio">{user.bio || "No bio available"}</p>
                        <div className="profile-stats">
                            <div className="profile-stat">
                                <span className="profile-stat-number">{user.followers}</span>
                                <span className="profile-stat-label">Followers</span>
                            </div>
                            <hr className="profile-stat-divider" />
                            <div className="profile-stat">
                                <span className="profile-stat-number">{user.following}</span>
                                <span className="profile-stat-label">Following</span>
                            </div>
                            <hr className="profile-stat-divider" />
                            <div className="profile-stat">
                                <span className="profile-stat-number">{user.posts.length}</span>
                                <span className="profile-stat-label">Posts</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-posts-container">
                    {user.posts.length > 0 ? (
                        user.posts.map((post) => (
                            <Post key={post._id} post={post} />
                        ))
                    ) : (
                        <div className="profile-no-posts">No posts available</div>
                    )}
                </div>
            </>
            ) : (
                <div className="profile-notfound">User not found</div>
            )}
        </div>
    );
}

export default Profile;