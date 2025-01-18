import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import NewsletterPage from "./pages/NewsletterPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>

  )
}

export default App