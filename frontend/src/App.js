import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function ProtectedRoute({ element: Element }) {
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);

    React.useEffect(() => {
        // check token validity with a fetch request
        fetch(`/api/protected`, {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
        }).then(async (response) => {
            if (response.ok) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        }).catch((error) => {
            console.error("Error checking authentication:", error);
            setIsAuthenticated(false);
        });
    });

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
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;