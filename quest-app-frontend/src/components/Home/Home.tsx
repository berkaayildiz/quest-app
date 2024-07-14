import { useState, useEffect } from "react";

import Post from "../Post/Post";
import PostForm from "../Post/PostForm";
import { SkeletonPost } from "../Post/SkeletonPost";

import { PostType } from "@/types/PostType";
import { AuthUser } from "@/types/AuthUser";
import { API_URL } from "@/constants";


function Home()
{
  // Holds the state of whether the fetch has completed
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  // Holds the posts fetched from the server
  const [posts, setPosts] = useState<PostType[]>([]);
  // Holds the current user's credentials
  const authUser: AuthUser = JSON.parse(localStorage.getItem('authUser') || '{}');


  // Fetches posts from the server
  const refreshPosts = () => { 
    fetch(`${API_URL}/posts`)
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


  // Displays skeleton posts if the fetch is not complete
  if (!isLoaded) {
    return (
      <div className="flex flex-col m-6 items-center justify-center">
        <SkeletonPost />
        <SkeletonPost />
        <SkeletonPost />
      </div>
    )
  }
  // Displays the home page if the fetch is complete
  else {
    return (
      <div className="flex flex-col m-6 items-center justify-center">
        {/* Displays the  post form if the user is authenticated */}
        { authUser.id != null && (
          <PostForm
            refreshPosts={refreshPosts}
          />         
        )}
        {/* Displays all posts fetched from the server whether the user is authenticated or not */}
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
    );
  }
}

export default Home;
