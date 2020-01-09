import React , { useState }from 'react';
import { makeStyles} from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const styles = makeStyles({
    root:{
      maxHeight:'91vh',
      overflowY:'auto'
    },
    rooms: {
      marginTop: "5px",
      maxWidth: "100%",
      height: "100px",
      border:'1px solid grey',
      textAlign: "center",
      '&::before':{
         borderColor:'red'
      },
      '&::after':{
        borderColor:'green'
     },
     
    },
    
  });
  
  


const ChatRoomsList = ({ chatRoomList, handleRoom }) => {   
    const classes = styles()
    return (
        <div className={classes.root}>
         {chatRoomList.rooms &&
           chatRoomList.rooms.map(r => {
            return (
              <div
                onClick={() =>
                   handleRoom(
                    r.room_id
                  )
                }
                className={classes.rooms}
                key={r.room_id}
              >
                {r.first_name} {r.last_name}
              </div>
            );
          })}
        </div>
    )
}

export default ChatRoomsList;