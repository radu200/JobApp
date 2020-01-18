import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import MailIcon from '@material-ui/icons/Mail';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';

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

const ChatRoomsList = ({ chatRoomList, handleRoom, new_msg}) => {
  const classes = styles();
  return (
    <div className={classes.root}>
      {chatRoomList &&
        chatRoomList.map(r => {
          
          return (
            <div
              onClick={() => handleRoom(r.room_id)}
              className={classes.rooms}
              key={r.room_id}
            > 
              
              <Avatar alt="Travis Howard" src={r.avatar} />
              <span className={classes.userName}>{r.first_name} {r.last_name}</span>
              <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={r.notification[0]} color="secondary"></Badge></IconButton>
            </div>
          );
        })}
    </div>
  );
};

export default ChatRoomsList;
