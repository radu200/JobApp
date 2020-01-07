const { dbPromise } = require("./../../config/database.js");

module.exports = (io) => {
    io.on('connection', (socket) => {

        socket.on('join', ({room_id, sender_id}) => {
            socket.userId = sender_id
            socket.room = room_id
            socket.join(room_id)
            socket.broadcast.to(room_id).emit('updateChat', `${sender_id} has joined` )
        })
        socket.on('chatMessage', async ({room_id, s_id, newMsg}) => {
            //    const db = await dbPromise;
            //    await db.query('INSERT  INTO chat_message (room_id, message_user_id, message_text) VALUES(?,?,?)',[room_id,s_id, newMsg])
            // io.in(room_id).emit('msg', 'message')
            // console.log(io.sockets)
            // socket.broadcast.to(room_id).emit('msg', newMsg)
            io.sockets.in(room_id).emit('msg', newMsg);
            
        })   
        
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    }) 
} 