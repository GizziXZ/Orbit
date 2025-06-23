import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import Topbar from "../components/Topbar";
import Post from "../components/Post";
import '../styles/FullPost.css';
import moment from "moment";

function FullPost() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [height, setHeight] = useState(0);

    // TODO - handle errors
    // TODO - add delete comment functionality

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/post/${id}`);
                if (!response.ok) {
                    throw new Error(`Error fetching post: ${response.statusText}`);
                }
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    useEffect(() => {
        const postContainer = document.getElementById("post-container");
        if (postContainer) {
            setHeight(postContainer.offsetHeight);
        }
    }, [loading]);

    const commentsEndRef = useRef(null);

    useEffect(() => {
        if (commentsEndRef.current) {
            commentsEndRef.current.scrollIntoView({ behavior: "auto" });
        }
    }, [post?.comments?.length]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const commentInput = e.target.querySelector('.comment-input');
        const commentText = commentInput.value.trim();

        if (!commentText) {
            return;
        }

        try {
            const response = await fetch(`/api/post/${id}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: commentText }),
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const newComment = await response.json();
            // update the post state to include the new comment
            setPost((prevPost) => ({
                ...prevPost,
                comments: [...prevPost.comments, newComment],
            }));
            
            // if (post && post.comments) {
            //     const commentsSection = document.querySelector('.comments-section');
            //     const newCommentDiv = document.createElement('div');
            //     newCommentDiv.className = 'comment';
            //     newCommentDiv.innerHTML = `
            //         <img class="comment-profilepicture" src="${newComment.user?.profilePicture || ''}" />
            //         <strong>${newComment.user?.username || 'Unknown'}</strong> <p>${newComment.text}</p>
            //     `;
            //     const commentBox = commentsSection.querySelector('.comment-box');
            //     commentsSection.insertBefore(newCommentDiv, commentBox);
            // }

            commentInput.value = ''; // Clear the input field            
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div className="full-post">
            <Topbar />
            <div className="full-post-container">
                <div style={{ width: "500px" }} id="post-container">
                    <Post post={post} />
                </div>
                <div className="comments-section" style={{ minHeight: `${height}px` }}>
                    <div className="comments-list">
                        {post.comments && post.comments.length === 0 && (
                            <div style={{ color: '#888', textAlign: 'center', marginTop: '2rem' }}>No comments yet.</div>
                        )}
                        {post.comments && post.comments.map((comment, idx) => (
                            <div className="comment" key={idx}>
                                <img
                                    className="comment-profilepicture"
                                    src={comment.user?.profilePicture || ""}
                                    alt={comment.user?.username || "User"}
                                    onClick={() => {
                                        if (comment.user?._id) {
                                            navigate(`/profile/${comment.user._id}`);
                                        }
                                    }}
                                />
                                <div>
                                    <strong onClick={() => {
                                        if (comment.user?._id) {
                                            navigate(`/profile/${comment.user._id}`);
                                        }
                                    }}>
                                        {comment.user?.username || "Unknown"}
                                    </strong>
                                    <span className="comment-timestamp">
                                        {comment.createdAt ? moment(comment.createdAt).calendar({ sameElse: `L, h:mm A` }) : ''}
                                    </span>
                                    <p>{comment.text}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={commentsEndRef} />
                    </div>
                    <div className="comment-box">
                        <form
                            onSubmit={handleSubmit}
                        >
                            <textarea
                                className="comment-input"
                                placeholder="Write a comment..."
                                rows={3}
                            />
                            <button type="submit" className="comment-submit-btn">Post Comment</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FullPost;