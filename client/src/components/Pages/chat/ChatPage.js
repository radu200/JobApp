import React, { useState, } from "react";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MainNav from "../../NavBars/MainNav/MainNav";
import ChatRoomList from "./ChatRoomList";
import ChatRoomD from "./ChatRoomD";
import ChatRoomM from "./ChatRoomM";
import ChatForm from "../../Forms/ChatForm";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  roomStatusText:{
    textAlign:'center'
  }
})
const ChatPage = ({
  chatRoomList,
  room,
  user_id,
  handleRoom,
  onSubmit,
  handleChange,
  value,
  receiverName,
  roomStatus,
  loadingRoom,
  handleReports, 
  handleRemoveRoom
}) => {
  const [open, setOpen] = useState(false);
  //open and close for candidate details
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  
  const classes = useStyle()
  const matchespx = useMediaQuery("(max-width:960px)");
   console.log(chatRoomList.length)
  return (
    <>
      <MainNav />
      <Grid container>
        <Grid item xs={12} sm={12} md={2}>
          <ChatRoomList
            chatRoomList={chatRoomList}
            handleRoom={handleRoom}
            handleRoomM={handleOpen}
          />
          {matchespx && chatRoomList.length <= 0 ? <h2 className={classes.roomStatusText} >Aici vor aparea camerele chatului </h2> : null}
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
            roomStatus={roomStatus}
            loadingRoom={loadingRoom}
            handleReports={handleReports} 
            handleRemoveRoom={handleRemoveRoom}
          />
        ) : (
          <Grid item xs={12} sm={12} md={10}>
            {roomStatus ? (
              <>
                <ChatRoomD
                  room={room}
                  handleChange={handleChange}
                  onSubmit={onSubmit}
                  value={value}
                  user_id={user_id}
                  receiverName={receiverName}
                  loadingRoom={loadingRoom}
                  handleReports={handleReports} 
                  handleRemoveRoom={handleRemoveRoom}
                />
                <ChatForm
                  handleChange={handleChange}
                  onSubmit={onSubmit}
                  value={value}
                />
              </>
            ) : (
             <h2 className={classes.roomStatusText} >Aici vor aparea mesajele</h2>
            )}
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default ChatPage;
