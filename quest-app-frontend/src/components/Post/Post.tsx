import React from 'react';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


type PostProps = {
  title: string;
  text: string;
};

const Post: React.FC<PostProps> = ({ title, text }) => {

  // Mock post data, update with real data later
  let username = "{username}";
  let numberOfLikes = 13;
  let numberOfComments = 1;

  return (
    <Card className="w-full max-w-4xl rounded-lg m-6">

      <CardHeader className="flex items-center gap-4 p-4">
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="text-sm text-muted-foreground">{username}</div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <p className="text-muted-foreground">{text}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <HeartIcon className="w-5 h-5" /> <span className="sr-only">Like</span>
          </Button>
          <div className="text-sm text-muted-foreground">{numberOfLikes} likes</div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MessageCircleIcon className="w-5 h-5"/> <span>{numberOfComments} comments</span>
        </div>
      </CardFooter>

      <div className="border-t px-4 py-4 space-y-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <div className='ml-2'>
            <div className="font-medium flex">Jared Palmer</div>
            <div>Looks great, can't wait to try it out!</div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Input placeholder="Add a comment..." className="bg-muted" />
          </div>
          <Button variant="ghost" size="icon">
            <SendIcon className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>

      </div>
    </Card>
  )
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}


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

export default Post;
