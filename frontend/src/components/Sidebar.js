import React from "react";
import "../styles/Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass, faEnvelope, faBell, faPlus, faUser, faCog, faGlobe, faBookmark } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
    const menuItems = [
        // { name: "Home", icon: faHouse },
        // { name: "Search", icon: faMagnifyingGlass },
        // { name: "Messages", icon: faEnvelope },
        { name: "Create Post", icon: faPlus },
        { name: "Communities", icon: faGlobe },
        { name: "Saved", icon: faBookmark },
        { name: "Notifications", icon: faBell },
        // { name: "Profile", icon: faUser },
        { name: "Settings", icon: faCog }
    ];

    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                {menuItems.map((item, index) => (
                <li key={index} className="sidebar-item" id={index === menuItems.length - 1 ? "last-item" : undefined} >
                    <FontAwesomeIcon icon={item.icon} className="sidebar-icon" title={item.name} />
                    {/* <span className="sidebar-icon">{item.icon}</span> */}
                    {/* <span className="sidebar-text">{item.name}</span> */}
                </li>
            ))}
            </ul>
        </div>
    );
}

export default Sidebar;