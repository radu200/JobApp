import React from "react";
import Grid from "@material-ui/core/Grid";
import MainNav from "../../NavBars/MainNav/MainNav";
import ChatRoomList from "./ChatRoomList";
import ChatRoom from "./ChatRoom";
import ChatFrom from "../../Forms/ChatForm";

const ChatPage = ({ chatRoomList,room, user_id, handleRoom, onSubmit, handleChange, value}) => {
  return (
     <>
      <MainNav />
      <Grid container >
          <Grid item xs={12} sm={12} md={2}>
            <ChatRoomList chatRoomList={chatRoomList} handleRoom={handleRoom}  />
         </Grid>
         <Grid item xs={12} sm={12} md={10}>
              <ChatRoom room={room}  handleChange={handleChange} onSubmit={onSubmit} value={value} user_id={user_id}  />
         <ChatFrom
              handleChange={handleChange} onSubmit={onSubmit} value={value}
            />
         </Grid>
       </Grid>
    </>
  );
};

export default ChatPage;
