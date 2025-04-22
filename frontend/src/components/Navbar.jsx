import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-3 shadow-md top-0 z-10">
      {isLoggedIn ? (
        <Link to="/student-dashboard">
          <img
            src="avatar.png"
            alt="Home/Logo"
            className="text-2xl font-bold h-10 w-10 rounded-full"
          />
        </Link>
      ) : (
        <div /> // empty placeholder to keep spacing consistent
      )}

      <div className="flex items-center space-x-4">
        <ModeToggle />
        {isLoggedIn && (
          <Link to="/profile">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
              <AvatarFallback>PP</AvatarFallback>
            </Avatar>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
