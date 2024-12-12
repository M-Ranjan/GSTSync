import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/Signup";
import PageTitle from "./Components/PageTitle";
import "./index.css";
import Home from "./pages/Home/Home";
import HomeDashboard from "./pages/Dashboard/HomeDashboard";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for a valid token
  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="GSTsync - GST Management" />
              <Home />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            isAuthenticated ? (
              // Redirect to dashboard if authenticated
              <Navigate to="/dashboard" />
            ) : (
              <>
                <PageTitle title="Signin | GSTsync - GST Management" />
                <SignIn />
              </>
            )
          }
        />
        <Route
          path="/auth/signup"
          element={
            isAuthenticated ? (
              // Redirect to dashboard if authenticated
              <Navigate to="/dashboard" />
            ) : (
              <>
                <PageTitle title="Signup | GSTsync - GST Management" />
                <SignUp />
              </>
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Dashboard | GSTsync - GST Management" />
              <HomeDashboard />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
