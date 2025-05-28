

import { useAuth } from "../context/AuthContext";
import HomeCard from "./HomeCard";

const Dashboard = () => {
  const { profile, logout } = useAuth();
  
  const cover1 = "Harleys In Hawaii_track_cover";
  const cover2 = "I Remember Everything (feat. Kacey Musgraves)_track_cover";
  const genre1 = "Pop";
  const genre2 = "Indie";
  
  return (
    <div className="w-full h-full">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {profile && (
          <div className="mt-4">
            <p className="text-white">Welcome, {profile.display_name}!</p>
            <button 
              onClick={logout}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-4 p-4">
        <HomeCard cover={cover1} genre={genre1} />
        <HomeCard cover={cover2} genre={genre2} />
      </div>
    </div>
  )
}

export default Dashboard