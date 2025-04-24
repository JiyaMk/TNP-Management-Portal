import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./mode-toggle";
import { Link, useLocation} from "react-router-dom";
import {getStudentProfile} from "@/utils/apiRequest" 

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    setIsLoggedIn(!!token);

    if (token) {
      getStudentProfile( {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setProfilePic(res.data.student?.profilePic || null);
      })
      .catch(() => {
        console.error("Failed to fetch profile image.");
      });
    }
  }, [location]);

  return (
    <header className="flex items-center justify-between px-6 py-3 shadow-md top-0 z-10">
      <Link to="/student-dashboard">
          <img
            src="avatar.png" 
            alt="Home/Logo"
            className="text-2xl font-bold h-10 w-10 rounded-full"
          />
        </Link>


      <div className="flex items-center space-x-4">
        <ModeToggle />
        <Link to="/profile">
        <Avatar>
          <AvatarImage
            src={
              isLoggedIn
                ? profilePic
                : "https://github.com/shadcn.png"
            }
            alt="Profile"
          />
    <AvatarFallback>PP</AvatarFallback>
  </Avatar>
</Link>

      </div>
    </header>
  );
};

export default Navbar;
