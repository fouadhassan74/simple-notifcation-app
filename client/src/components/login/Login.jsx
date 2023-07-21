import React, { useEffect, useState } from "react";
import "./login.css";
import { useRecoilState } from "recoil";
import userAtom from "../../atoms/userAtom";
import { io } from "socket.io-client";
function Login() {
  const [userName, setUserName] = useState();
  const [user, setUser] = useRecoilState(userAtom);
  const [socket, setSocket] = useState(null);

  return (
    <div className='loginContainer'>
      <h1>Notification App</h1>
      <input
        type='text'
        placeholder='User Name'
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={() => setUser(userName)}>Login</button>
      <span className='username'>{user}</span>
    </div>
  );
}

export default Login;
