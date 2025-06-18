import { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faPlus, faCog, faGlobe, faBookmark } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
    const navigate = useNavigate();
    const menuItems = [
        { name: "Create Post", icon: faPlus },
        { name: "Communities", icon: faGlobe },
        { name: "Bookmarks", icon: faBookmark },
        { name: "Notifications", icon: faBell },
        { name: "Settings", icon: faCog }
    ];

    const [createPostModal, setCreatePostModal] = useState(false);

    const handleItemClick = (item) => {
        switch (item.name) {
            case "Create Post":
                setCreatePostModal(true);
                break;
            case "Bookmarks":
                navigate("/bookmarks");
                break;
            case "Settings":
                navigate("/settings");
                break;
        }
    }

    const handlePostSubmit = (e) => {
        e.preventDefault();
        const caption = e.target.form.querySelector("textarea").value;
        const image = e.target.form.querySelector("#file").files[0];
        if (!caption || !image) {
            const errorMessage = document.getElementById("error-message");
            errorMessage.textContent = "Caption and image are required";
            errorMessage.style.display = "block";
            setTimeout(() => {
                errorMessage.style.display = "none";
            }, 3000);
            return;
        }

        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("image", image);
        fetch("/api/posts/create", {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json",
                // "Content-Type": "multipart/form-data"
            },
            credentials: "include"
        })
        .then(response => {
            if (!response.status === 201) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            setCreatePostModal(false);
            window.location.reload(); // probably temporary way of updating the UI
        })
        .catch(error => {
            console.error("Error creating post:", error);
            const errorMessage = document.getElementById("error-message");
            errorMessage.textContent = "Failed to create post. Please try again.";
            errorMessage.style.display = "block";
            setTimeout(() => {
                errorMessage.style.display = "none";
            }, 3000);
        });
    }

    return (
        <>
            <div className="sidebar">
                <ul className="sidebar-menu">
                    {menuItems.map((item, index) => (
                        <li key={index} className="sidebar-item" id={index === menuItems.length - 1 ? "last-item" : undefined}>
                            <FontAwesomeIcon icon={item.icon} className="sidebar-icon" title={item.name} onClick={() => handleItemClick(item)} />
                            {/* <span className="sidebar-text">{item.name}</span> */}
                        </li>
                    ))}
                </ul>
            </div>

            {createPostModal && (
                <div className="create-post-modal" onClick={(e) => {
                    if (e.target.classList.contains("create-post-modal")) {
                        setCreatePostModal(false);
                    }
                }}>
                    <div className="modal-content">
                        <button className="close-modal" onClick={() => setCreatePostModal(false)}>&times;</button>
                        <h2>Create Post</h2>
                        <p id="error-message" style={{ display: "none", color: "red", marginBottom: "2px" }} />
                        <form>
                            <textarea placeholder="Caption" rows="2" />
                            <div className="file-input">
                                <input
                                    id="file"
                                    class="file"
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = (event) => {
                                                const previewImage = document.getElementById("image-preview");
                                                if (previewImage) {
                                                    previewImage.src = event.target.result;
                                                    previewImage.style.display = "block";
                                                }
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                                <label for="file">Select file</label>
                            </div><br/>
                            <img id="image-preview"/>
                            <button type="submit" onClick={handlePostSubmit}>Post</button>
                        </form>
                        {/* <button className="close-modal" onClick={() => setCreatePostModal(false)}>Close</button> */}
                    </div>
                </div>
            )}
        </>
    );
}

export default Sidebar;