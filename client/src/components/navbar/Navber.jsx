import React, { useEffect, useState } from "react";
import "./navbar.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import SettingsIcon from "@mui/icons-material/Settings";
function Navber({ socket }) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotification] = useState([]);
  useEffect(() => {
    socket?.on("getNotification", (data) => {
      setNotification((prev) => [...prev, data]);
    });
  }, [socket]);
  const handleRead = () => {
    setNotification([]);
    setOpen(false);
  };
  const displayNotification = ({ senderName, type }) => {
    let action;
    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "comment";
    } else if (type === 3) {
      action = "shared";
    }
    return (
      <span className='notification'>{`${senderName} ${action} your post.`}</span>
    );
  };
  return (
    <div className='navbarContainer'>
      <h1>Fouad</h1>
      <div className='icons'>
        <div className='icon'>
          <NotificationsIcon onClick={() => setOpen(!open)} />
          {notifications.length > 0 && (
            <div className='count'>{notifications.length}</div>
          )}
        </div>
        <div className='icon'>
          <EmailIcon onClick={() => setOpen(!open)} />
          <div className='count'>2</div>
        </div>
        <div className='icon'>
          <SettingsIcon onClick={() => setOpen(!open)} />
          <div className='count'>2</div>
        </div>
      </div>
      {open && (
        <div className='notifications'>
          {notifications.map((n) => displayNotification(n))}
          <button className='nButton' onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
}

export default Navber;
