import { useParams } from "react-router-dom";


type UserParams = {
  userId: string;
};

function User() {
  const { userId } = useParams<UserParams>();

  return (
    <div>
      <h1>User {userId}</h1>
    </div>
  );
}

export default User;
