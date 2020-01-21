import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {formatDate} from '../../../Utils/formatDate'
import ChatHeader from './ChatHeader'
import Loading from '../../../Utils/Loading'

const styles = makeStyles({
  root: {
    height: "84vh",
    overflowY: "auto",
    display:'flex',
    flexDirection:'column',
    borderLeft:'1px solid 	#D3D3D3'
},

msgContainer:{
  marginTop:'30px',
},
msgReceiver: {
    maxWidth:300,
    margin: "8px",
    float:'left'
    
},
msgSender: { 
    maxWidth:400,
     margin: "8px",
     float:'right'
},
 
msgTextSender:{
  maxWidth:'100%',
  backgroundColor: "#2552c7",
  margin: "8px",
  padding: "10px",
  borderRadius:10,
  color:"#fff"

},
 
msgTextReceiver:{
    maxWidth:'100%',
    backgroundColor: "white",
    color: "black",
    margin: "8px",
    padding: "10px",
    borderRadius:10,
  
  },
time:{
    opacity:0.6,
}
});
const ChatRoom = ({ room, user_id, receiverName, loadingRoom }) => {
  const classes = styles();  
  return (
    <>
      {loadingRoom ?  <Loading /> : 
      <div className={classes.root } id="chatRoom" >
        <ChatHeader name={receiverName}/>
        {room &&
          room.map((m)=> {
            return (
              <div key={m.message_id} className={classes.msgContainer}>
                {user_id === m.message_user_id ? (
                  <div className={classes.msgSender}>
                      <div className={classes.msgTextSender}>{m.message_text}</div>
                     <div className={classes.time}>{formatDate(m.time)}</div>
                  </div>
                ) : (
                  <div className={classes.msgReceiver}>
                    <div className={classes.msgTextReceiver}>{m.message_text}</div>
                    <div className={classes.time}>{formatDate(m.time)}</div>
                 </div>
                )}
              </div>
            );
          })}
         </div> }
    </>
  );
};

export default ChatRoom;
