import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import NewsletterPage from "./pages/NewsletterPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import { Routes, Route } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api"; // Import LoadScript

const App = () => {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GMAPS_API_KEY}>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </LoadScript>
  );
};

export default App;
