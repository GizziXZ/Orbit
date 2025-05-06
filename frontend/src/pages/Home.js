import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Home.css";

function Home() {
    const posts = [ // placeholder data
        {
            id: 1,
            username: "user1",
            image: "https://media1.tenor.com/m/Bg3ShfbkKJwAAAAd/rigby-cat-rigby.gif",
            caption: "please pray for my cat, he ate my week's worth of cannabis",
        },
        {
            id: 2,
            username: "user2",
            image: "https://media1.tenor.com/m/X0d_-kG72C4AAAAd/orange-cat-looking-at-camera.gif",
            caption: "meet my dear romero, he tends to stare a little"
        }
    ];

    return (
        <div className="home">
            <Sidebar />
            <h1 className="home-title">Orbit</h1>
            <div className="feed">
                {posts.map((post) => (
                    <div key={post.id} className="post">
                        <div className="post-header">
                            {/* <div className="post-avatar">{post.username[0].toUpperCase()}</div> */}
                            <h2 className="post-username">{post.username}</h2>
                        </div>

                        <img src={post.image} alt="Post" className="post-image" />

                        <p className="post-caption">
                            <strong>{post.username}</strong> {post.caption}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;