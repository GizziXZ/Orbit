import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faBookmark, faFlag } from "@fortawesome/free-solid-svg-icons"
import Heart from '@react-sandbox/heart'
import '../styles/Post.css';

function Post({ post }) {
    const navigate = useNavigate();
    const [heartState, setHeartState] = useState(post.isLiked || false);
    const [bookmarked, setBookmarked] = useState(post.isBookmarked || false);

    // TODO - add timestamp for post createdAt
    // TODO - add comments

    const handleLike = async (id) => {
        setHeartState(!heartState);
        post.likes = heartState ? post.likes.filter(like => like !== post.user._id) : [...post.likes, post.user._id];

        const response = await fetch(`/api/posts/${id}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ liked: !heartState })
        });

        if (!response.ok) {
            console.error(`Couldn't handle like for post ${id}: ${(await response.json()).message}`);
            setHeartState(heartState); // revert the like state if the request fails
            post.likes = heartState ? [...post.likes, post.user._id] : post.likes.filter(like => like !== post.user._id);
        }
    }

    const handleBookmark = async (id) => {
        const response = await fetch(`/api/posts/${id}/bookmark`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bookmark: !bookmarked })
        });

        if (!response.ok) {
            console.error(`Couldn't handle bookmark for post ${id}: ${(await response.json()).message}`);
            return; // do not change the UI state if the request fails
        }

        setBookmarked(!bookmarked)
    }

    const [postOptionsVisible, setPostOptionsVisible] = useState(false);
    
    useEffect(() => {
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

    return (
        <div key={post._id} className="post">
            <div className="post-header">
                <img className="post-avatar" onClick={() => navigate(`/profile/${post.user._id}`)} src={post.user.profilePicture || null}></img> {/* TODO - Fallback to a default avatar if profilePicture is null */}
                <h2 className="post-username" onClick={() => navigate(`/profile/${post.user._id}`)}>{post.user.username}</h2>
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
                            <li onClick={() => handleBookmark(post._id)}>
                                <FontAwesomeIcon icon={faBookmark} title="Bookmark" style={{ color: bookmarked ? 'gold' : "white" }} /> {bookmarked ? "Bookmarked" : "Bookmark"}
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faFlag} className="report" title="Report" /> Report
                            </li>
                        </ul>
                    </div>}
                </div>
            </div>

            <img src={post.image} alt="Post" className="post-image" onDoubleClick={() => handleLike(post._id)} />

            <p className="post-caption">
                <strong>{post.user.username}</strong> <a>{post.caption}</a>
                <div className="post-likes">
                    <a>{post.likes.length}</a>
                    <Heart
                        width={28}
                        height={28}
                        active={heartState}
                        onClick={() => handleLike(post._id)}
                        inactiveColor="#7d7d7d"
                        className="post-heart"
                    />
                </div>
            </p>
        </div>
    );
}

export default Post;