import { FC } from "react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { CommentProps } from "@/types/props/CommentProps";


const Comment: FC<CommentProps> = ({ userId, username, text, createDate }) =>
{
  // Displays a comment with the user's avatar, username, text, and creation date
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link to={`/users/${userId}`}>
          <Avatar>
            <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Link>
        <div className='ml-2'>
          <div className="flex font-medium">{username}</div>
          <div className="flex">{text}</div>
        </div>
      </div>
      <div className="text-sm text-gray-500 mr-2">
        {new Date(createDate).toLocaleDateString()}
      </div>
    </div>
  );
};

export default Comment;
