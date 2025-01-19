import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import NewsletterPage from "./pages/NewsletterPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api"; 
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

const App = () => {

  const {authenticatedUser, checkAuthentication, connectSocket} = useAuthStore();
  useEffect(() => {
    checkAuthentication();
    connectSocket();
  }, [checkAuthentication, connectSocket]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GMAPS_API_KEY}>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={!authenticatedUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
         
          <Route path="/signup" element={!authenticatedUser ? <SignupPage /> : <Navigate to="/" />} />
          <Route path="/profile" element={authenticatedUser ? <ProfilePage /> : <Navigate to="/" />} />
        </Routes>
      </div>
      
      <Toaster />
    </LoadScript>
  );
};

export default App;
