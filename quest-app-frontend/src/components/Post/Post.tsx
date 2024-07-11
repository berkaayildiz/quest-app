import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleTrigger, CollapsibleContent} from "@/components/ui/collapsible";
import LikeButton from '../ui/LikeButton';

import Comment from '../Comment/Comment';

import { CommentType } from '@/types/CommentType';
import { PostProps } from '@/types/props/PostProps';
import CommentForm from '../Comment/CommentForm';
import { LikeType } from '@/types/LikeType';
import { AuthUser } from '@/types/AuthUser';


const Post: FC<PostProps> = ({ id, userId, username, title, text, likes}) =>
{
  // Holds the comments fetched from the server
  const [comments, setComments] = useState<CommentType[]>([]);
  // Holds the state of whether the post is liked by the user
  const [isLiked, setIsLiked] = useState<boolean>(false);
  // Holds the state of the current number of likes on the post
  const [likeCount, setLikeCount] = useState<number>(likes.length);
  // Holds the current user's credentials
  const authUser: AuthUser = JSON.parse(localStorage.getItem('authUser') || '{}');


  // Fetches comments from the server by postId
  const refreshComments = (postId: number) => {
    fetch("/comments?postId=" + postId)
      .then(response => response.json())
      .then(
        (result: CommentType[]) => {
          setComments(result);
        },
        (error: Error) => {
          console.error('Error:', error);
        }
      );
  }

  // Fetches likes from the server by postId
  const refreshLikes = async (postId: number) => {
    try {
      const response = await fetch("/likes?postId=" + postId);
      const result: LikeType[] = await response.json();
      likes = result;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Save like to database with the current user's credentials
  const saveLike = async () => {
    try {
      const response = await fetch('/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authUser.token,
          },
          body: JSON.stringify({
            userId: authUser.id,
            postId: id,
          }),
      });
      await response.json();
    } catch (error) { console.error('Error:', error); }
  };

  // Delete like from database with the current user's credentials
  const deleteLike = async (likeId: number) => {
    try {
      await fetch('/likes/' + likeId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authUser.token,
        },
      });
    } catch (error) { console.error('Error:', error); }
  };

  // Handles the like button click event
  const onLikeClicked = async () => {
    // Calculate the next like status
    const nextLikeStatus = !isLiked;
    // Change the like status
    setIsLiked(nextLikeStatus);
    // Update the number of likes and database
    if (nextLikeStatus) {
      setLikeCount(likeCount + 1);
      saveLike();
    }
    else {
      setLikeCount(likeCount - 1);
      await refreshLikes(id); // Need to refresh likes to get the likeId since the likes array is not updated
      deleteLike(likes.find((like) => like.userId === authUser.id)!.id);
    }
  }

  // Fetch comments and like status when the component mounts
  useEffect(() => {
    refreshComments(id); 
    likes.find((like) => like.userId === authUser.id) ? setIsLiked(true) : setIsLiked(false);
  }, []);

  
  // Displays a post with collapsible comments and add comment form
  return (
    <Card className="w-full max-w-4xl rounded-lg m-2 mt-6">
      {/* Displays the user's avatar, username, title, and text */}
      <CardHeader className="flex items-center gap-4 p-4">
        <Link to={`/users/${userId}`}>
          <Avatar>
            <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="grid gap-1">
          <CardTitle className="text-lg font-semibold text-center">{title}</CardTitle>
          <div className="text-sm text-muted-foreground text-center">{username}</div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-muted-foreground text-center">{text}</p>
      </CardContent>
      {/* Displays the collapsible part of the post */}
      <Collapsible>
        {/* Displays the number of likes and comments */}
        <div className='flex items-center justify-between p-4'>
          <div className='flex items-center gap-2'>
            <LikeButton disabled={authUser.id == null} onClick={onLikeClicked} isLiked={isLiked}></LikeButton>
            <div className="text-sm text-muted-foreground">{likeCount} likes</div>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageCircleIcon className="w-5 h-5"/> <span>{comments.length} comments</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        {/* Displays the comments and add comment form */}
        <CollapsibleContent>
          <div className="border-t px-4 py-4 space-y-4 text-sm text-muted-foreground">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                userId={comment.userId}
                username={comment.username} 
                text={comment.text}
                createDate={comment.createDate}
                />
            ))}
            {authUser.id != null && (
              <CommentForm 
                postId={id}
                refreshComments={refreshComments}
              />
            )}
          </div>
          </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

function MessageCircleIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}

export default Post;
