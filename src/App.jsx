import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Landing from "./components/Landing";

// Protected route component that redirects to landing page if not authenticated
const ProtectedRoute = ({ children }) => {
  const { tokenData, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!tokenData) {
    return <Navigate to="/" />;
  }
  
  return children;
};

// Main layout wrapper
const Layout = () => {
  const { tokenData, loading } = useAuth();
  
  return (
    <div className="w-full h-screen flex items-center justify-center noisebg">
      <div className="relative w-[85vw] h-[85vh] border-6 rounded-[64px] overflow-hidden border-white">
        <div className="bg-neutral-950 w-full h-full">          <Routes>
            <Route path="/" element={
              loading ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-white">Loading...</p>
                </div>
              ) : (
                <Landing />
              )
            } />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </Router>
  );
};

export default App;
