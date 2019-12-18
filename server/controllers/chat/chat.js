const { dbPromise } = require("./../../config/database.js");

// get user list
//get rooms with messages where user id 


module.exports.postRoom = async (req,res) => {
   


}


module.exports.getChat = async (req, res, next) => {
  const userId = req.user.id
  try {
     const db = await dbPromise;
     const textSqlRoom = 'SELECT id, receiverName FROM chatRooms WHERE sender = ? OR receiver = ?'
     const [room] = await db.execute(textSqlRoom, [userId, userId])
     res.json(room)
    //  res.render("pages/chat", {
    //     room:room
    //  });
    } catch (err) {
      console.log(err);
    }
};
module.exports.getRoom = (req, res) => {
  const roomName = req.params.name
 const io = req.app.get('socketio')


  res.render("./pages/roomChat", {roomName:roomName})

}