module.exports = (io) => {
    io.on('connection', function(socket){
      socket.on('join-room', (room) => {
          socket.join(room)
         socket.broadcast.emit('user-connected', 'radu')
          //   socket.to(room).emit('user-connected', 'radu')

      })
        console.log('user connected')     

        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    }) 


}