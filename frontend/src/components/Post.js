import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faBookmark } from "@fortawesome/free-solid-svg-icons"
import Heart from '@react-sandbox/heart'

function Post({ post }) {
    const [active, setActive] = useState(false);

    const handleLike = async (id) => {
        setActive(!active);

        const response = await fetch(`/api/posts/${id}/like`, {
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

    const handleBookmark = async (id) => {
        const response = await fetch(`/api/posts/${id}/bookmark`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({ bookmarked: !post.bookmarked })
        });
    }

    const [postOptionsVisible, setPostOptionsVisible] = useState(false);
    
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.post-options') && postOptionsVisible) {
                setPostOptionsVisible(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [postOptionsVisible]);

    React.useEffect(() => {
        setActive(post.isLiked || false); // Initialize active state based on post data
    }, [post.isLiked]);

    return (
        <div key={post._id} className="post">
            <div className="post-header">
                <img className="post-avatar"></img>
                <h2 className="post-username">{post.username}</h2>
                <div className="post-options">
                    <FontAwesomeIcon
                        icon={faEllipsis} 
                        className="post-options-icon" 
                        title="More" 
                        onClick={(e) => {
                            e.stopPropagation();
                            setPostOptionsVisible((prev) => !prev);
                            document.querySelectorAll('.post-options-dropdown').forEach((dropdown) => {
                                if (dropdown !== e.target.closest('.post').querySelector('.post-options-dropdown')) {
                                    dropdown.style.display = 'none';
                                }
                            });
                        }}
                    />
                    {postOptionsVisible && <div className="post-options-dropdown">
                        <ul>
                            <li>
                                <FontAwesomeIcon icon={faBookmark} className="post-bookmark-icon" title="Bookmark" onClick={() => handleBookmark(post._id)} /> Bookmark
                            </li>
                        </ul>
                    </div>}
                </div>
            </div>

            <img src={post.image} alt="Post" className="post-image" onDoubleClick={() => handleLike(post._id)} />

            <p className="post-caption">
                <Heart
                    width={28}
                    height={28}
                    active={active}
                    onClick={() => handleLike(post._id)}
                    inactiveColor="#7d7d7d"
                    className="post-heart"
                />
                <strong>{post.username}</strong> <a>{post.caption}</a>
            </p>
        </div>
    );
}

export default Post;