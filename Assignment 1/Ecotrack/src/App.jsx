import Dashboard from "./pages/dashboard";
import Log from "./pages/log";
import Login from "./pages/login";
import WaterTracker from "./pages/WaterTracker";
import Header from "./components/Header";
import ProtectedRoute from "./Routes/ProtectedRoutes";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header title="Dashboard" />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/log"
            element={
              <ProtectedRoute>
                <Log />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/water"
            element={
              <ProtectedRoute>
                <WaterTracker />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;