import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Post from "../components/Post";
import "../styles/Home.css";

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`/api/post`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    const suggestedUsers = [ // placeholder data
        {
            username: "user3",
            image: "https://media1.tenor.com/m/X0d_-kG72C4AAAAd/orange-cat-looking-at-camera.gif",
        },
        {
            username: "user4",
            image: "https://media1.tenor.com/m/X0d_-kG72C4AAAAd/orange-cat-looking-at-camera.gif",
        }
    ];

    return (
        <div className="home-container">
        <Topbar />
        <div className="home">
            <Sidebar />
            {/* <h1 className="home-title">Orbit</h1> */}
            <div className="feed">
                {posts.map((post) => (
                    <Post post={post} />
                ))}
            </div>
            <div className="suggestions">
                <h2 className="suggestions-title">Suggestions for you</h2>
                {suggestedUsers.map((user) => (
                    <div key={user.id} className="suggestion">
                        <img src={user.image} alt="User" className="suggestion-image" />
                        <h3 className="suggestion-username">{user.username}</h3>
                    </div>
                ))}
                <button className="suggestions-button">See all</button>
            </div>
        </div>
        </div>
    );
}

export default Home;