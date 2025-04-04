import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4  shadow-md sticky top-0 z-10">
     <Link to="/">  <img src="https://github.com/shadcn.png"  alt="Home/Logo" className="text-2xl font-bold h-10 w-10 rounded-full"></img></Link>
      <div className="flex items-center space-x-4">
        <ModeToggle />
        <Link to ="/profile" >
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
          <AvatarFallback>PP</AvatarFallback>
        </Avatar>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
