import React from "react";
import "../styles/Topbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHome, faMessage, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";

function Topbar() {
    return (
        <div className="topbar">
            <h1 className="topbar-logo">Orbit</h1>
            <div className="topbar-search">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="topbar-search-icon" />
                <input type="text" placeholder="Search Orbit" />
            </div>
            <div className="topbar-actions">
                <FontAwesomeIcon icon={faHome} className="topbar-action-icon" title="Home" />
                <FontAwesomeIcon icon={faMessage} className="topbar-action-icon" title="Chats" />
                <FontAwesomeIcon icon={faUser} className="topbar-action-icon" title="Profile" /> {/*Replacing with user pfp later*/}
                <FontAwesomeIcon icon={faRightFromBracket} className="topbar-action-icon" id="logout" title="Logout" />
            </div>
        </div>
    );
}

export default Topbar;