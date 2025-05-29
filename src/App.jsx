import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Landing from "./components/Landing";
import HomeCard from "./components/HomeCard";

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
const cover1 = "Harleys In Hawaii_track_cover";
const cover2 = "I Remember Everything (feat. Kacey Musgraves)_track_cover";
const genre1 = "Pop";
const genre2 = "Indie";

// Main layout wrapper
const Layout = () => {
  const { tokenData, loading } = useAuth();

  return (
    <div className="w-full h-screen flex items-center justify-center noisebg">
      {/* Absolute positioned HomeCard container outside the overflow context */}
      <div className="absolute z-10 w-full h-full pointer-events-none">
        <HomeCard
          className="left-208 bottom-80 pointer-events-none -rotate-12 z-21 scale-110 shadow-[5px_4px_0px_rgba(0,0,0,0.8)]"
          cover={cover1}
          genre={genre1}
        />
        <HomeCard 
          className="left-224 bottom-25 pointer-events-none rotate-12 z-20 scale-110 shadow-[5px_4px_0px_rgba(0,0,0,0.8)]"
          cover={cover2} 
          genre={genre2} 
        />
      </div>
      
      <div className="relative w-[75vw] h-[85vh] border-6 rounded-[64px] overflow-hidden border-white">
        <div className="bg-neutral-950 w-full h-full">
          {" "}
          <Routes>
            <Route
              path="/"
              element={
                loading ? (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-white">Loading...</p>
                  </div>
                ) : (
                  <>
                    <Landing />
                  </>
                )
              }
            />
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
