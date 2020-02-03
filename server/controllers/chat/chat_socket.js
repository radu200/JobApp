const uuidv4 = require("uuid/v4");

const {
  addMessage,
  removeNotification,
  addRoom,
  checkRooms,
  lastCreatedRoom,
  lastInsertedId,
} = require("./user.js");
const { checkMembershipChat } = require('../../middleware/access_control_middleware')

module.exports = io => {
  io.on("connection", async socket => {
    const user = socket.request.session.passport;

    if (user && user !== undefined) {
      const user_id = socket.request.session.passport.user.id;
      const user_role = socket.request.session.passport.user.type;

      socket.on("join", ({ room_id }) => {
        socket.user_id = user_id;
        socket.room = room_id;
        socket.join(room_id);
      });

      socket.on(
        "chatMessage",
        async ({ chatMessage, room_id, receiver_id }) => {

          const new_date = new Date();
          const date = new_date.toUTCString();

          const msg = {
            message_id: uuidv4(),
            time: date,
            message_text: chatMessage,
            message_user_id: user_id,
          };

          const notification = {
            id: uuidv4(),
            room_id,
            msg_notification: 1,
            receiver_id: user_id,
          };

          io.to(room_id).emit("chatMessage", msg);
          socket.broadcast.emit("notification", notification);

          await addMessage(room_id, user_id, chatMessage, receiver_id);
        },
      );

      socket.on("removeNotification", async ({ room_id}) => {
        await removeNotification(room_id, user_id);
      });

      socket.on("switchRoom", ({ newRoom, oldRoom }) => {
        // leave the current room  and join new room
        if (oldRoom !== null) {
          socket.leave(oldRoom);
          socket.join(newRoom);
          socket.room = newRoom;
        }
      });

      socket.on("addRoom", async receiver_id => {
         const member = await checkMembershipChat(user_id)
         if(member){
            const room = await handleChatRooms(receiver_id, user_id, user_role)
            socket.emit("addRoomRes", room);
         }
        
      });
      socket.on("disconnect", () => {
        socket.leave(socket.room);
      });
    }
  });
};

//handle chat rooms create  or return current
async function handleChatRooms (receiver_id, user_id, user_role){

    const sender_id = user_id;

    const queryVars = {
      employer_msg: "employer_new_msg",
      jobseeker_msg: "jobseeker_new_msg",
      employer_id_status: "employer_id",
      jobseeker_id_status: "jobseeker_id",
    };

    try {
      if (user_role === "employer") {
        //check if  roomm exist
        const check = await checkRooms(sender_id, receiver_id);
        if (check.status) {
          const room_id = check.room_id;
          const [room] = await lastCreatedRoom(
            queryVars.jobseeker_id_status,
            room_id,
          );
          return  room
        }

        await addRoom(receiver_id, sender_id);
        const new_room_id = await lastInsertedId();
        const [room] = await lastCreatedRoom(
          queryVars.jobseeker_id_status,
          new_room_id,
        );
        return room  
      }
    } catch (err) {
        return err
    }

}