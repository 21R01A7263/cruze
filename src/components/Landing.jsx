import { FaSpotify } from "react-icons/fa";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
const AUTH_SERVER = import.meta.env.VITE_AUTH_SERVER;
const PROFILE_ENDPOINT = "https://api.spotify.com/v1/me";

const Landing = () => {
  const [tokenData, setTokenData] = useState(null);
  const [profile, setProfile] = useState(null);

  // 1) On mount, parse tokens from URL fragment
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const access_token = hash.get("access_token");
    const refresh_token = hash.get("refresh_token");
    const expires_in = hash.get("expires_in");

    if (access_token) {
      setTokenData({ access_token, refresh_token, expires_in });
      window.history.replaceState({}, "", "/");
    }
  }, []);

  // 2) Fetch profile once we have an access token
  useEffect(() => {
    if (!tokenData) return;

    fetch(PROFILE_ENDPOINT, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        console.log("Profile data:", data);
      })
      .catch((err) => console.error("Profile fetch error:", err));
  }, [tokenData]);

  const login = () => {
    window.location.href = `${AUTH_SERVER}/auth/login`;
  };

  return (
    <div className="w-full h-[75%] noisebg-front rounded-b-[64px]">
      <Navbar />
      <div className="pt-4 pl-10">
        <p className="font-bold text-7xl">Know your music,</p>
        <p className="font-bold text-6xl">grow your music.</p>

        <div className="flex flex-row mt-16 gap-8 items-center">
          <div onClick={login} className="rounded-full w-40 h-12 border-2 cursor-pointer border-[#3fc062] bg-[#3fc062] flex items-center justify-center gap-2">
            <span>Login with</span>
            <FaSpotify size={20} />
          </div>
          <div>
            <p className="font-semibold">About us</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
