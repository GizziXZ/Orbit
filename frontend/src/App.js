import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router'
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlice";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function ProtectedRoute({ element: Element }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        // check token validity with a fetch request
        fetch(`/api/protected`, {
            method: 'GET',
            credentials: 'include',
        }).then(async (response) => {
            if (response.ok) {
                setIsAuthenticated(true);
                
                const meResponse = await fetch(`/api/auth/me`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (meResponse.ok) {
                    const data = await meResponse.json();
                    dispatch(setUser(data.userData));
                } else {
                    console.error("Failed to fetch user data");
                }
            } else {
                setIsAuthenticated(false);
            }
        }).catch((error) => {
            console.error("Error checking authentication:", error);
            setIsAuthenticated(false);
        });
    }, [dispatch]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // temporary
    }

    return isAuthenticated ? <Element /> : <Navigate to="/login" />;
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProtectedRoute element={Home} />} />
                <Route path="/home" element={<ProtectedRoute element={Home} />} />
                <Route path="/bookmarks" element={<ProtectedRoute element={Bookmarks} />} />
                <Route path="/profile/:id" element={<ProtectedRoute element={Profile} />} />
                <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
                <Route path="/settings" element={<ProtectedRoute element={Settings} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;