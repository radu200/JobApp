import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MainNav from "../../NavBars/MainNav/MainNav";
import ChatRoomList from "./ChatRoomList";
import ChatRoomD from "./ChatRoomD";
import ChatRoomM from "./ChatRoomM";
import ChatForm from "../../Forms/ChatForm";

const ChatPage = ({
  chatRoomList,
  room,
  user_id,
  handleRoom,
  onSubmit,
  handleChange,
  value,
  receiverName,
}) => {
  const [open, setOpen] = useState(true);
  //open and close for candidate details
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const matchespx = useMediaQuery("(max-width:960px)");
  return (
    <>
      <MainNav />
      <Grid container>
        <Grid item xs={12} sm={12} md={2}>
          <ChatRoomList chatRoomList={chatRoomList} handleRoom={handleRoom}  handleRoomM={handleOpen} />
        </Grid>
        {matchespx ? (
          <ChatRoomM  
              handleClose={handleClose} 
              open={open}
              room={room}
              handleChange={handleChange}
              onSubmit={onSubmit}
              value={value}
              user_id={user_id}
              handleChange={handleChange}
              onSubmit={onSubmit}
              value={value}
              receiverName={receiverName}
            />
        ) : (
          <Grid item xs={12} sm={12} md={10}>
            <ChatRoomD
              room={room}
              handleChange={handleChange}
              onSubmit={onSubmit}
              value={value}
              user_id={user_id}
              receiverName={receiverName}
            />
            <ChatForm
              handleChange={handleChange}
              onSubmit={onSubmit}
              value={value}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default ChatPage;
