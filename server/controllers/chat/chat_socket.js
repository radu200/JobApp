const uuidv4 = require("uuid/v4");
const  throttle = require ('lodash/throttle');

const {
  getNotifications,
  addMessage,
  addNotifications,
  removeNotification,
} = require("./user.js");

module.exports = io => {
  io.on("connection", socket => {
    const user = socket.request.session.passport;
    if (user !== undefined) {
      const user_id = socket.request.session.passport.user.id;
      const role = socket.request.session.passport.user.type;

      socket.on("join", ({ room_id }) => {
        console.log('joined')
        socket.user_id = user_id;
        socket.room = room_id;
        socket.join(room_id);
      });

      socket.on("chatMessage", async ({ chatMessage, room_id }) => {
        if (
          chatMessage !== "" ||
          chatMessage.lenght < 300 ||
          room_id !== null
        ) {

          const d = new Date();
          const date = d.toUTCString();
          const msg = {
            message_id: uuidv4(),
            time: date,
            message_text: chatMessage,
            message_user_id: user_id,
          };

          io.to(room_id).emit("chatMessage", msg);
 
          
            await addMessage(room_id, user_id, chatMessage);
    

          if (role === "employer") {
            const jb_msg = "jobseeker_new_msg";
            await addNotifications(jb_msg, room_id);
          } else if (role === "jobseeker") {
            const em_msg = "employer_new_msg";
            await addNotifications(em_msg, room_id);
          }
        }
      });

      socket.on("removeNotification", async ({ room_id }) => {
        if (role === "employer") {
          const em_msg = "employer_new_msg";
          await removeNotification(em_msg, room_id);
        } else if (role === "jobseeker") {
          const jb_msg = "jobseeker_new_msg";
          await removeNotification(jb_msg, room_id);
        }
      });

      setInterval(async () => {
        if (role === "employer") {
          const em_msg = "employer_new_msg";
          const em_id = "employer_id";
          const result = await getNotifications(em_msg, em_id, user_id);
          const no = result.map(n => n.new_msg).reduce((ac,cu) => ac + cu, 0)
           socket.no = no
          socket.emit("notification", result);
        } else if (role === "jobseeker") {
          const jb_msg = "jobseeker_new_msg";
          const jb_id = "jobseeker_id";
          const result = await getNotifications(jb_msg, jb_id, user_id);
          socket.emit("notification", result);
        }
      }, 1000);

      socket.on("switchRoom", ({ newRoom, oldRoom }) => {
        // leave the current room  and join new room
        if (oldRoom !== null  ) {
          socket.leave(oldRoom);
          socket.join(newRoom);
          socket.room = newRoom;
        }
      });
      socket.on("disconnect", () => {
        console.log("disconnect");
        socket.leave(socket.room);
      });
    }
  });
};
