const { dbPromise } = require("./../../config/database.js");
const uuidv4 = require('uuid/v4');

module.exports = (io, req) => {
    io.on('connection', (socket) => {
        socket.on('join', ({room_id, sender_id}) => {
            socket.userId = sender_id
            socket.room = room_id
            socket.join(room_id)
            socket.to(room_id).broadcast.emit('updateChat', `${sender_id} has joined` )
        })
        socket.on('chatMessage', async ({ chatMessage, room_id, s_id }) => {
              const d = new Date();
              const  date = d.toUTCString();
              const msg = {
                  message_id:uuidv4(),
                  time:date,
                  message_text:chatMessage,
                  message_user_id:s_id
              }
              io.to(room_id).emit('chatMessage', msg)
               const db = await dbPromise;
               await db.query('INSERT  INTO chat_message (room_id, message_user_id, message_text) VALUES(?,?,?)',[room_id,s_id, chatMessage])
        })   
        
        socket.on('switchRoom', ({newRoom, oldRoom}) => {
            // leave the current room  and join new room
            if(oldRoom !== null){
                socket.leave(oldRoom)
                socket.join(newRoom)
                socket.room = newRoom
                socket.broadcast.to(socket.room).emit('updatechat', 'SERVER  has left this room');
            }
         
        });
        
        socket.on('disconnect', () => {
            console.log('user disconnected')
             socket.leave(socket.room);
        })
    }) 
} 