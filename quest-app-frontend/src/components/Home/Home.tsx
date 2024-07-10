import { useState, useEffect } from "react";

import Post from "../Post/Post";
import PostForm from "../Post/PostForm";

import { PostType } from "@/types/PostType";


function Home()
{
  // Holds the state of whether the fetch has completed
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  // Holds the posts fetched from the server
  const [posts, setPosts] = useState<PostType[]>([]);

  // TODO: After implementing authentication change these values with the logged in user's information
  let userId = 1;
  let username = "berkaayildiz";

  // Fetches posts from the server
  const refreshPosts = () => { 
    fetch("/posts")
      .then((response) => response.json())
      .then(
        (result: PostType[]) => {
          setIsLoaded(true);
          setPosts(result);
        },
        (error: Error) => {
          setIsLoaded(true);
          console.error('Error:', error);
        }
      );
  };

  // Fetch posts when the component mounts
  useEffect(() => {refreshPosts();}, []);

  // Displays loading message if the fetch is not complete
  if (!isLoaded) { return <div>Loading...</div>; }
  // Displays the home page if the fetch is complete
  else {
    return (
      <div className="flex flex-col items-center">
        <PostForm
          userId={userId}
          username={username}
          refreshPosts={refreshPosts}
        />
        <div className="flex flex-wrap justify-center">
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              userId={post.userId}
              username={post.username}
              title={post.title}
              text={post.text}
              likes={post.likes}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
