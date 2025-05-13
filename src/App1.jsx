import { useEffect, useState } from "react";

const AUTH_SERVER = import.meta.env.VITE_AUTH_SERVER;
const PROFILE_ENDPOINT = "https://api.spotify.com/v1/me";

export default function App() {
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
      // Clear the fragment
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {!profile ? (
        <button
          onClick={login}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Log in with Spotify
        </button>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
          {profile.images?.[0] && (
            <img
              src={profile.images[0].url}
              alt="Avatar"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
          )}
          <h1 className="text-xl font-semibold mb-2">{profile.display_name}</h1>
          <p className="text-gray-600 mb-1">Email: {profile.email}</p>
          <p className="text-gray-600">ID: {profile.id}</p>
        </div>
      )}
    </div>
  );
}
