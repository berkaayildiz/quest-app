import { useParams } from "react-router-dom";

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useEffect, useState } from "react";

import { UserType } from "@/types/UserType";


type UserParams = { userId: string; };

function User()
{
  // Extract the user ID from the URL
  const { userId } = useParams<UserParams>();
  // Holds the state of the user information
  const [user, setUser] = useState<UserType | null>(null);

  // Save like to database with the current user's credentials
  const getUser = async () => {
    try {
      const response = await fetch(`/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          },
      });
      return await response.json();
    } catch (error) { console.error('Error:', error); }
  };
  
  // Fetch user information when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();
      setUser(user);
    };
  
    fetchData();
  }, []);


  // A card component that displays user information
  return (
    <div className="flex items-center justify-center min-h-[86vh]">
      <Card className="w-full max-w-sm bg-gradient-to-r from-[#a8edea] to-[#fed6e3] rounded-2xl overflow-hidden">
        <CardHeader className="flex flex-col items-center p-6 bg-white">
          <Avatar className="w-20 h-20 mb-4">
            <AvatarFallback>{user?.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 text-center">
            <div className="text-lg font-medium">{user?.username}</div>
          </div>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">User ID:</div>
            <div className="text-sm font-medium">{user?.id}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default User;
