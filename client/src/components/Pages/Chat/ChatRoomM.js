import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import { formatDate } from "../../../Utils/formatDate";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Slide from "@material-ui/core/Slide";
import ChatForm from "../../Forms/ChatForm";

const useStyles = makeStyles(theme => ({

  content:{
    backgroundColor:"#F4F4F4"
  },
  footer:{
    backgroundColor:"#F4F4F4"

  },
  messages:{
    overflowY: 'auto',
  },
  appBar: {
    position: "relative",
    backgroundColor: "#2552C7",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },

  msgReceiver: {
    maxWidth: 300,
    margin: "8px",
    float: "left",
  },
  msgSender: {
    maxWidth: 400,
    margin: "8px",
    float: "right",
  },

  msgTextSender: {
    maxWidth: "100%",
    backgroundColor: "#2552c7",
    margin: "8px",
    padding: "10px",
    borderRadius: 10,
    color: "#fff",
  },

  msgTextReceiver: {
    maxWidth: "100%",
    backgroundColor: "white",
    color: "black",
    margin: "8px",
    padding: "10px",
    borderRadius: 10,
  },
  time: {
    opacity: 0.6,
  },
  messageInput:{
    position:'fixed'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChatRoomM({ handleClose, open, room, user_id, onSubmit, value, handleChange, receiverName }) {
  
  const classes = useStyles();

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <ArrowBackIcon />
            </IconButton>
            {receiverName}
          </Toolbar>
        </AppBar>
        <DialogContent className={classes.content} >
        {room &&
          room.map(m => {
            return (  
             <div className={classes.messages} key={m.message_id}>
                {user_id === m.message_user_id ? (
                  <div className={classes.msgSender}>
                    <p className={classes.msgTextSender}>
                      {m.message_text}
                    </p>
                    <span className={classes.time}>{formatDate(m.time)}</span>
                  </div>
                ) : (
                  <div className={classes.msgReceiver}>
                    <p className={classes.msgTextReceiver}>
                      {m.message_text}
                    </p>
                    <span className={classes.time}>{formatDate(m.time)}</span>
                  </div>
                )}
             </div>
            );
          })}
         </DialogContent>
        <DialogActions className={classes.footer}>
          <ChatForm onSubmit={onSubmit} value={value} handleChange={handleChange}  />
        </DialogActions>
      </Dialog>
    </>
  );
}
