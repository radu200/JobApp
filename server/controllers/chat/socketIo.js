const {addUser, removeUser,getUser, getUserInRoom} = require('./user')

module.exports = (io) => {
    io.on('connection', (socket) => {
        //create room
        //join room
        //broadcast messages in room
        socket.on('join', (room) => {
            ///create uniqueq room
            //save sender receiver id and messages

        })
        console.log('new websocket', socket.id)

        socket.on('sendMessage',(msg, callback) => {
            const messages = []
             messages.push(msg)
             io.emit('message', messages)
             callback()
         })         
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    }) 
} 