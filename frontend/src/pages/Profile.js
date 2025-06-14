import { useEffect, useState } from "react";
import { useParams } from "react-router";

function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        }
        fetchUserProfile();
    }, [id]);

    return (
        <div className="profile-container">
            {loading ? (
                <div>Loading...</div>
            ) : user ? (
                <div className="profile-details">
                    <h1>{user.username}</h1>
                    <img src={user.profilePicture} className="profile-picture" />
                    <p>Bio: {user.bio || "No bio available"}</p>
                    <p>Followers: {user.followers}</p>
                    <p>Following: {user.following}</p>
                    <p>Posts: {user.posts.length}</p>
                    <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                    {/* Add more user details later */}
                </div>
            ) : (
                <div>User not found</div>
            )}
        </div>
    );
}

export default Profile;