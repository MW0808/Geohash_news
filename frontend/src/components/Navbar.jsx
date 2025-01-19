import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast"

const Navbar = () => {
  const {authenticatedUser, logout} = useAuthStore();
  const [timeLeft, setTimeLeft] = useState({ hours: 10, minutes: 24, seconds: 59 }); 
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer); 
  }, []);

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start flex items-center space-x-4">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
            <a onClick={() => navigate("/")}>HomePage</a>
            </li>
            <li>
              <a onClick={() => navigate("/newsletter")}>Newsletter</a>
            </li>
          </ul>
        </div>

        <span className="countdown font-mono text-2xl">
          <span style={{ "--value": timeLeft.hours }}></span>:
          <span style={{ "--value": timeLeft.minutes }}></span>:
          <span style={{ "--value": timeLeft.seconds }}></span>
        </span>
      </div>

      <div className="navbar-center">
         <a 
      className="btn btn-ghost text-xl"
      onClick={() => navigate("/")} 
      role="button" 
    >
      What's New
    </a>
        
      </div>

      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Profile"
                src="userprofile.jpg" 
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
            <a
              onClick={() => navigate("/profile")}
              className="justify-between flex items-center"
            >
              Profile
              <span className="badge">Me</span>
            </a>
          </li>

            <li>
            <a onClick={() => {
              if (authenticatedUser) {
                logout();
                toast.success("Logged out!");
              } else {
                navigate("/login")
              }}
              }>{authenticatedUser ? "Logout" : "Login"}</a> 
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
