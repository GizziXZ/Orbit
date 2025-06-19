import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Topbar from "../components/Topbar";
import '../styles/Settings.css';

function Settings() {
    const settings = useSelector(state => state.user.settings);
    const [localSettings, setLocalSettings] = useState(() => settings);
    const dispatch = useDispatch();

    const handleToggle = (key) => {
        setLocalSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleSelect = (e) => {
        setLocalSettings(prev => ({
            ...prev,
            allowMessagesFrom: e.target.value
        }));
    };

    const handleSave = async () => {
        try {
            const response = await fetch('/api/users/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(localSettings),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: 'user/setUserSettings', payload: data.settings });
                alert('Settings saved successfully!');
            } else {
                const errorData = await response.json();
                alert(`Error saving settings: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('An error occurred while saving settings.');
        }
    }

    return (
        <div className="settings-page">
            <Topbar />
            <div className="settings-container">
                <h1>Settings</h1>
                <div className="settings-group">
                    <label className="settings-label">
                        <span>Private Profile</span>
                        <input
                            type="checkbox"
                            checked={localSettings.privateProfile}
                            onChange={() => handleToggle('privateProfile')}
                        />
                        <span className="slider"></span>
                    </label>
                    <label className="settings-label">
                        <span>Email Notifications</span>
                        <input
                            type="checkbox"
                            checked={localSettings.emailNotifications}
                            onChange={() => handleToggle('emailNotifications')}
                        />
                        <span className="slider"></span>
                    </label>
                    <label className="settings-label">
                        <span>Push Notifications</span>
                        <input
                            type="checkbox"
                            checked={localSettings.pushNotifications}
                            onChange={() => handleToggle('pushNotifications')}
                        />
                        <span className="slider"></span>
                    </label>
                    <label className="settings-label">
                        <span>Show Online Status</span>
                        <input
                            type="checkbox"
                            checked={localSettings.showOnlineStatus}
                            onChange={() => handleToggle('showOnlineStatus')}
                        />
                        <span className="slider"></span>
                    </label>
                    <label className="settings-label">
                        <span>Allow Messages From</span>
                        <select
                            value={localSettings.allowMessagesFrom}
                            onChange={handleSelect}
                        >
                            <option value="everyone">Everyone</option>
                            <option value="followers">Followers</option>
                            <option value="no one">No one</option>
                        </select>
                    </label>
                </div>
                <button className="settings-save" onClick={handleSave}>Save Changes</button>
            </div>
        </div>
    );
}

export default Settings;