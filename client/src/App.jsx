import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile/EditProfile";
import Settings from "./pages/Settings/Settings";
import Bookmarks from "./pages/Bookmarks/Bookmarks";
import Favorites from "./pages/Favorites/Favorites";
import AIAssistant from "./pages/AI/AIAssistant";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>

      {/* Redirect Root */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Login */}
      <Route
        path="/login"
        element={
          isAuthenticated
            ? <Navigate to="/dashboard" replace />
            : <Login />
        }
      />

      {/* Register */}
      <Route
        path="/register"
        element={
          isAuthenticated
            ? <Navigate to="/dashboard" replace />
            : <Register />
        }
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated
            ? <Dashboard />
            : <Navigate to="/login" replace />
        }
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={
          isAuthenticated
            ? <Profile />
            : <Navigate to="/login" replace />
        }
      />

      {/* Edit Profile */}
      <Route
        path="/profile/edit"
        element={
          isAuthenticated
            ? <EditProfile />
            : <Navigate to="/login" replace />
        }
      />

      {/* Settings */}
      <Route
        path="/settings"
        element={
          isAuthenticated
            ? <Settings />
            : <Navigate to="/login" replace />
        }
      />
       <Route
  path="/bookmarks"
  element={
    isAuthenticated
      ? <Bookmarks />
      : <Navigate to="/login" replace />
  }
/> 
<Route
  path="/favorites"
  element={
    isAuthenticated
      ? <Favorites />
      : <Navigate to="/login" replace />
  }
/>

<Route
  path="/ai"
  element={
    isAuthenticated
      ? <AIAssistant />
      : <Navigate to="/login" replace />
  }
/>
      {/* 404 */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default App;