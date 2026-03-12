

import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App(){

  return(
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element = {<Login />}></Route>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >

          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );

};

export default App;

