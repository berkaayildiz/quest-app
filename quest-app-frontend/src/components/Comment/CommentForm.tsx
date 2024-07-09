import { FC, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { CommentFormProps } from "@/types/props/CommentFormProps";


const CommentForm: FC<CommentFormProps> = ({ userId, postId, username, refreshComments }) =>
{
  // Holds the state of the comment text input field
  const [commentText, setCommentText] = useState('');

  // Handles the submit button press
  const handleSubmit = () => {
    // Save post to database and refresh posts to display the new post
    saveComment().then(() => refreshComments(postId));
    // Clear input field
    setCommentText('');
  };

  // Save comment to database
  const saveComment = async () => {
    try {
      const response = await fetch('/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            postId: postId,
            text: commentText,
          }),
      });
      await response.json();
    } catch (error) { console.error('Error:', error); }
  };

  // Displays a form with an avatar, input field, and submit button to add a comment
  return (
    <div className="flex items-start gap-2">
      <Avatar>
        <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <Input className="bg-muted"
          placeholder="Add a comment..."
          maxLength={250}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </div>
      <Button variant="ghost" size="icon" onClick={handleSubmit}>
        <SendIcon className="w-4 h-4" />
          <span className="sr-only">Send</span>
      </Button>
    </div>
  );
};

// SendIcon component
function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}

export default CommentForm;
