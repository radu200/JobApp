import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';

const styles = makeStyles({
  root: {
    maxHeight: "91vh",
    overflowY: "auto",
  },
  rooms: {
    maxWidth: "100%",
    padding:'10px',
    minHeight: "50px",
    borderBottom: "1px solid #D3D3D3",
    backgroundColor: "#fff",
    display:'flex',
    alignItems:'center',
    "&:hover": {
      backgroundColor: "#DCDCDC",
    },
  },
  userName:{
      marginLeft:'10px', 
  }
});

const ChatRoomsList = ({ chatRoomList, handleRoom }) => {
    console.log(chatRoomList)
  const classes = styles();
  return (
    <div className={classes.root}>
      {chatRoomList.rooms &&
        chatRoomList.rooms.map(r => {
          return (
            <div
              onClick={() => handleRoom(r.room_id)}
              className={classes.rooms}
              key={r.room_id}
            >
              <Avatar alt="Travis Howard" src={r.avatar} />
              <span className={classes.userName}>{r.first_name} {r.last_name}</span>
            </div>
          );
        })}
    </div>
  );
};

export default ChatRoomsList;
