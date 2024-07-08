import { useState, useEffect } from "react";

import Post from "../Post/Post";

import "./Home.css";


type PostType = {
  id: number;
  title: string;
  text: string;
};

function Home() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
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
  }, []);

  if (error) {
    console.error(error);
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="postsContainer">
        {posts.map((post) => (
          <Post key={post.id} title={post.title} text={post.text} />
        ))}
      </div>
    );
  }
}

export default Home;