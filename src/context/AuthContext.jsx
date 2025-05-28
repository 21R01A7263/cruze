import { createContext, useState, useEffect, useContext } from "react";

const AUTH_SERVER = import.meta.env.VITE_AUTH_SERVER;
const PROFILE_ENDPOINT = "https://api.spotify.com/v1/me";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [tokenData, setTokenData] = useState(() => {
    // Check if token data exists in localStorage
    const savedToken = localStorage.getItem('spotifyTokenData');
    return savedToken ? JSON.parse(savedToken) : null;
  });
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  // Parse tokens from URL fragment on mount
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const access_token = hash.get("access_token");
    const refresh_token = hash.get("refresh_token");
    const expires_in = hash.get("expires_in");

    if (access_token) {      const newTokenData = { 
        access_token, 
        refresh_token, 
        expires_in,
        timestamp: Date.now() 
      };
      setTokenData(newTokenData);
      localStorage.setItem('spotifyTokenData', JSON.stringify(newTokenData));
      // Clean up the URL but don't redirect
      window.history.replaceState({}, "", window.location.pathname);
    }
    setLoading(false);
  }, []);

  // Fetch profile once we have an access token
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
  const logout = () => {
    localStorage.removeItem('spotifyTokenData');
    setTokenData(null);
    setProfile(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider
      value={{ tokenData, profile, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
