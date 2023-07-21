import "./App.css";
import Navber from "./components/navbar/Navber";
import Card from "./components/card/Card";
import { posts } from "./data";
import { useEffect, useState } from "react";
import Login from "./components/login/Login";
import { useRecoilState } from "recoil";
import userAtom from "./atoms/userAtom";
import { io } from "socket.io-client";
function App() {
  const [user, setUser] = useRecoilState(userAtom);
  console.log(user);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = io("http://localhost:5000");
    setSocket(socket);
    socket.on("connect", () => {
      console.log("socket connected");
      console.log(socket);
    });
  }, []);
  console.log(socket);
  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);

  return (
    <div className='container'>
      {!user ? (
        <Login />
      ) : (
        <>
          <Navber socket={socket} />
          {posts.map((post) => (
            <Card key={post.id} post={post} socket={socket} user={user} />
          ))}
        </>
      )}
      <span className='username'>{user}</span>
    </div>
  );
}

export default App;
