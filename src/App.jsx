import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AddJob from "./pages/AddJob";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Unauthorized from "./pages/Unauthorized";
import Dashboard from "./pages/EmployerDashboard";
import JobSeekerDashboard from "./pages/JobSeekerDashBoard";
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-200">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* ✅ Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute requiredRole="employer">
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/add"
          element={
            <PrivateRoute requiredRole="employer">
              <AddJob />
            </PrivateRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <PrivateRoute requiredRole="jobseeker">
              <JobSeekerDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
