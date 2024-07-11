import { FC } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"


const Navbar: FC = () =>
{
  // Displays a header with the app name and the user's avatar
  return (
    <header className="flex h-16 w-full items-center justify-between px-4 md:px-6">
      <Link to="/" className="text-lg font-bold">
        /quest-app
      </Link>
      {localStorage.getItem("currentUserId") ? <ProfileButton /> : <AuthButtons />}
    </header>
  )
};

function ProfileButton() {
  const navigate = useNavigate();

  function onLogout() {
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("currentUsername");
    localStorage.removeItem("tokenKey");
    navigate('/');
    window.location.reload();
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{localStorage.getItem("currentUsername")?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link to="/404" className="flex items-center gap-2">
              <div className="h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/404" className="flex items-center gap-2">
              <div className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center justify-center">
            <Button onClick={onLogout}>
              <span>Log out</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function AuthButtons() {
  return (
  <div>
      <NavLink to="/auth/login">
        <Button className="h-8 text-sm font-medium mr-2">
          Login
        </Button>
      </NavLink>
      <NavLink to="/auth/signup">
        <Button variant="outline" className="h-8 text-sm font-medium ml-2">
          Sign up
        </Button>
      </NavLink>
  </div>
  )

}


export default Navbar;
