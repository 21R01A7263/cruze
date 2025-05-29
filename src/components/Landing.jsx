import { FaSpotify } from "react-icons/fa";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Landing = () => {
  const { login, tokenData } = useAuth();
  

  return (
    <div className="relative w-full h-[75%] noisebg-front rounded-b-[64px]">
      <Navbar />
      <div className="pt-4 pl-10">
        <p className="font-bold text-7xl">Know your music,</p>
        <p className="font-bold text-6xl">grow your music.</p>

        <div className="flex flex-row mt-16 gap-8 items-center">
          {tokenData ? (
            <Link
              to="/dashboard"
              className="rounded-full w-48 h-12 border-2 cursor-pointer border-[#3fc062] bg-[#3fc062] flex items-center justify-center"
            >
              <span>Go to Dashboard</span>
            </Link>
          ) : (
            <div
              onClick={login}
              className="rounded-full w-40 h-12 border-2 cursor-pointer border-[#3fc062] bg-[#3fc062] flex items-center justify-center gap-2"
            >
              <span>Login with</span>
              <FaSpotify size={20} />
            </div>
          )}
          <div>
            <p className="font-semibold">About us</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
