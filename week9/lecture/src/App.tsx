import { useContext, useState } from "react";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { MyValueContext, MyValueProvider } from "./MyValueProvider";

function App(props) {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const myValue = useContext(MyValueContext);
  console.log(myValue);

  const {
    error: loadUsersError,
    data: users,
    isFetching: isFetchingUsers,
  } = useQuery<any[]>({
    queryKey: [""],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      return await response.json();
    },
  });

  const {
    error: loadPostsError,
    data: posts,
    isFetching: isFetchingPosts,
  } = useQuery<any[]>({
    queryKey: ["userId", selectedUser],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${selectedUser}`
      );
      return await response.json();
    },
    enabled: !!selectedUser,
  });

  return (
    <>
      <ul>
        {isFetchingUsers && <div>Loading users...</div>}
        {users?.map((user) => (
          <li key={user.id} onClick={() => setSelectedUser(user.id)}>
            {user.username}
          </li>
        ))}
      </ul>
      <ul>
        {isFetchingPosts && <div>Loading posts...</div>}
        {posts?.map((posts) => (
          <li key={posts.id}>{posts.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
