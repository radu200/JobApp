const { dbPromise } = require("./../../config/database.js");
const uuidv4 = require('uuid/v4');
const {
  getNotifications,
  addMessage,
  addNotifications } = require('./chat.js')


module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('join', ({ room_id, sender_id }) => {
      socket.userId = sender_id
      socket.room = room_id
      socket.join(room_id)
      socket.to(room_id).broadcast.emit('updateChat', `${sender_id} has joined`)
    })

    socket.on('chatMessage', async ({ chatMessage, room_id, s_id }) => {
      const d = new Date();
      const date = d.toUTCString();
      const msg = {
        message_id: uuidv4(),
        time: date,
        message_text: chatMessage,
        message_user_id: s_id,
      }

      io.to(room_id).emit('chatMessage', msg)
      await addMessage(room_id, s_id, chatMessage)

      const role = socket.request.session.passport.user.type

      if (role === 'employer') {
        const jb_msg = 'jobseeker_new_msg'
        await addNotifications(jb_msg, room_id)

      } else if (role === 'jobseeker') {
        const em_msg = 'employer_new_msg'
        await addNotifications(em_msg, room_id)

      }
    })


    setInterval(async () => {
      const { type, id } = socket.request.session.passport.user;
      if (type === "employer") {
        const em_msg = 'employer_new_msg'
        const em_id = 'employer_id'
        const result = await getNotifications(em_msg, em_id, id)
        socket.emit("notification", result);
      } else if (type === 'jobseeker') {
        const jb_msg = 'jobseeker_new_msg'
        const jb_id = 'jobseeker_id'
        const result = await getNotifications(jb_msg, jb_id, id)
        socket.emit("notification", result);
      }
    }, 1000)


    socket.on('switchRoom', ({ newRoom, oldRoom }) => {
      // leave the current room  and join new room
      if (oldRoom !== null) {
        socket.leave(oldRoom)
        socket.join(newRoom)
        socket.room = newRoom
      }

    });
    socket.on('disconnect', () => {
      socket.leave(socket.room);
    })
  })


}

