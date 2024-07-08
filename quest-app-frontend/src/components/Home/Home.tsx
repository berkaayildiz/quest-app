import { useState, useEffect } from "react";

import Post from "../Post/Post";
import PostForm from "../Post/PostForm";

import "./Home.css";


type PostType = {
  id: number;
  userId: number;
  username: string;
  title: string;
  text: string;
};

function Home() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostType[]>([]);

  const refreshPosts = () => { 
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result: PostType[]) => {
          setIsLoaded(true);
          setPosts(result);
        },
        (error: Error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
   
  useEffect(() => {
    refreshPosts();
  }, [posts]);

  if (error) {
    console.error(error);
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="homeContainer">
        <PostForm refreshPosts={refreshPosts}></PostForm>
        <div className="postsContainer">
          {posts.map((post) => (
            <Post key={post.id} userId={post.userId} username={post.username} title={post.title} text={post.text} />
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
