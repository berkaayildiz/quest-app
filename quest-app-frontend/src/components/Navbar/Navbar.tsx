import React from "react";

import { Link } from "react-router-dom";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"


const Navbar: React.FC = () => {

  // Mock user data, update with real data later
  const userId = 1;

  return (
    <header className="flex w-full bg-background border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <span>/quest-app</span>
        </Link>
        <Link to={'/users/' + userId} className="flex items-center gap-2">
          <Avatar className="w-8 h-8 border">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>YO</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  )
};

export default Navbar;
