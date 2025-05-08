import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Heart from '@react-sandbox/heart'
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
            caption: "this is romero, he knows how to use the litter box, but he also knows what I did to him, what I did to his brother, and what I will do to him if he doesn't stop looking at me like that",
        }
    ];

    const suggestedUsers = [ // placeholder data
        {
            username: "user3",
            image: "https://media1.tenor.com/m/X0d_-kG72C4AAAAd/orange-cat-looking-at-camera.gif",
        },
        {
            username: "user4",
            image: "https://media1.tenor.com/m/X0d_-kG72C4AAAAd/orange-cat-looking-at-camera.gif",
        }
    ]

    // all the posts get liked cause of the heart component, this is because we don't have a backend yet
    // and we don't have a way to store the state of the heart
    const [active, setActive] = useState(false);

    return (
        <div className="home-container">
        <Topbar />
        <div className="home">
            <Sidebar />
            {/* <h1 className="home-title">Orbit</h1> */}
            <div className="feed">
                {posts.map((post) => (
                    <div key={post.id} className="post">
                        <div className="post-header">
                            <img className="post-avatar"></img>
                            <h2 className="post-username">{post.username}</h2>
                        </div>

                        <img src={post.image} alt="Post" className="post-image" onDoubleClick={() => setActive(true)} />

                        <p className="post-caption">
                            <Heart
                                width={28}
                                height={28}
                                active={active}
                                onClick={() => setActive(!active)}
                                inactiveColor="#7d7d7d"
                                className="post-heart"
                            />
                            <strong>{post.username}</strong> <a>{post.caption}</a>
                        </p>
                    </div>
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