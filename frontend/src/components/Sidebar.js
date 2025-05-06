import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass, faEnvelope, faBell, faPlus, faUser, faCog } from "@fortawesome/free-solid-svg-icons";
import "../styles/Sidebar.css";

function Sidebar() {
    const menuItems = [
        { name: "Home", icon: faHouse },
        { name: "Search", icon: faMagnifyingGlass },
        { name: "Messages", icon: faEnvelope },
        { name: "Notifications", icon: faBell },
        { name: "Create", icon: faPlus },
        { name: "Profile", icon: faUser },
        { name: "Settings", icon: faCog },
    ];

    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                {menuItems.map((item, index) => (
                <li key={index} className="sidebar-item" id={index === menuItems.length - 1 ? "last-item" : undefined} >
                    <FontAwesomeIcon icon={item.icon} className="sidebar-icon" />
                    {/* <span className="sidebar-icon">{item.icon}</span> */}
                    {/* <span className="sidebar-text">{item.name}</span> */}
                </li>
            ))}
            </ul>
        </div>
    );
}

export default Sidebar;