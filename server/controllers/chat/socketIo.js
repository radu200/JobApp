module.exports = (io) => {
    io.on('connection', function(socket){
       socket.on('join-room', (room) => {
          socket.join(room)
          socket.broadcast.emit('user-connected', 'lall')

      })

        socket.on('front', msg => {
            console.log(msg)
        })

        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    }) 


} 