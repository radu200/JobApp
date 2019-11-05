const { dbPromise } = require("./../../config/database.js");




module.exports.postRoom = async (req,res) => {
   
   try {
       const io = req.app.get('socketio')
    
      const receiverId = req.body.userId
      const senderId = req.user.id
      const db = await dbPromise  
      const textSqlUser =`SELECT sender, receiver FROM chatRooms WHERE sender AND receiver IN (?,?)`
      const textSqlReceiverName = 'SELECT first_name FROM users WHERE id = ?'
      const textSqlRooms = 'SELECT id FROM chatRooms WHERE sender AND receiver IN (?,?)'
      const textSqlInsert = 'INSERT INTO chatRooms(receiver,sender, receiverName) VALUES(?,?, ?) '
     
      const [users] = await db.execute(textSqlUser,[senderId, receiverId])
      const [receiverName] = await db.execute(textSqlReceiverName, [receiverId])
    
      if(users.length === 0){
         const [room] = await db.query(textSqlInsert,[receiverId, senderId, receiverName[0].first_name])
         const roomName = room.insertId
         res.redirect(`/api/room/${roomName}`)
        } else {
          const [room]  = await db.execute(textSqlRooms,[senderId, receiverId] )
          const roomName = room[0].id
       
          res.redirect(`/api/room/${roomName}`)

        }          

    } catch(e){
        console.log(e)
    }

}


module.exports.getChat = async (req, res, next) => {
  const userId = req.user.id
  try {
     const db = await dbPromise;
     const textSqlRoom = 'SELECT id, receiverName FROM chatRooms WHERE sender = ? OR receiver = ?'
     const [room] = await db.execute(textSqlRoom, [userId, userId])
  
     res.render("pages/chat", {
        room:room
     });
    } catch (err) {
      console.log(err);
    }
};
module.exports.getRoom = (req, res) => {
 
  const io = req.app.get('socketio')
  
  io.emit('join-room', 'my-room')
  res.render("./pages/roomChat", {roomName:req.params.name})

}