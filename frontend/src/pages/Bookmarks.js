import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Post from "../components/Post";
import "../styles/Bookmarks.css";

function Bookmarks() {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const response = await fetch('/api/posts/bookmarks', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch bookmarks');
                }

                const data = await response.json();
                setBookmarks(data.bookmarks);
            } catch (error) {
                console.error('Error fetching bookmarks:', error);
            }
        };
        fetchBookmarks();
    }, []);

    return (
        <div className="bookmarks-container">
            <Topbar />
            <div className="bookmarks">
                <div className="feed">
                    <h1 className="bookmarks-title">Your Bookmarks</h1>
                    {bookmarks.length > 0 ? (
                        bookmarks.map((post) => <Post post={post} />)
                    ) : (
                        <div className="bookmarks-placeholder">
                            <p>No bookmarks yet. Start saving posts to see them here!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Bookmarks;