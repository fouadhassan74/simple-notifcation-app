import React, { useState } from "react";
import "./card.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
function Card({ post, socket, user }) {
  const [liked, setLiked] = useState(false);
  const handelNotification = (like, type) => {
    if (like === true) {
      setLiked(true);
      console.log("liked");
    } else if (like === false) {
      setLiked(false);
      console.log("unliked");
    }
    socket?.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type: type,
    });
  };
  return (
    <div className='cardContainer'>
      <div className='info'>
        <img src={post.userImg} alt='' className='userImg' />
        <span>{post.username}</span>
      </div>
      <img className='postImg' src={post.postImg} alt='' />
      <div className='icons'>
        {liked ? (
          <FavoriteIcon
            onClick={() => {
              handelNotification(false, 1);
            }}
            style={{ color: "red" }}
          />
        ) : (
          <FavoriteIcon
            onClick={() => {
              handelNotification(true, 1);
            }}
            style={{ color: "#cdd9c9" }}
          />
        )}
        <CommentIcon onClick={handelNotification("no", 2)} />
        <ShareIcon onClick={handelNotification("no", 3)} />
      </div>
    </div>
  );
}

export default Card;
