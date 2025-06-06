import React, { useState } from "react";
import Heart from '@react-sandbox/heart'

function Post({ post }) {
    const [active, setActive] = useState(false);

    const handleLike = async (id) => {
        setActive(!active);

        const response = await fetch(`${window.location.host}:5000/api/posts/${id}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ liked: !active })
        });

        if (!response.ok) {
            console.error(`Couldn't handle like for post ${id}: ${(await response.json()).message}`);
            setActive(active); // revert the like state if the request fails
        }
    }
    
    return (
        <div key={post.id} className="post">
            <div className="post-header">
                <img className="post-avatar"></img>
                <h2 className="post-username">{post.userId}</h2>
            </div>

            <img src={post.image} alt="Post" className="post-image" onDoubleClick={() => handleLike(true)} />

            <p className="post-caption">
                <Heart
                    width={28}
                    height={28}
                    active={active}
                    onClick={() => handleLike(post.id)}
                    inactiveColor="#7d7d7d"
                    className="post-heart"
                />
                <strong>{post.username}</strong> <a>{post.caption}</a>
            </p>
        </div>
    );
}

export default Post;