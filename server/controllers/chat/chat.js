const { dbPromise } = require("./../../config/database.js");

 module.exports.getRooms = async (req, res) => {
    
  try {
    const user_id = req.user.id;
    const user_role = req.user.type
    const db = await dbPromise
    if(user_role === 'employer'){
      const [ rooms ] = await db.execute('SELECT chat_room.*, users.first_name, users.last_name  FROM chat_room LEFT JOIN users ON  users.id = chat_room.jobseeker_id WHERE employer_id = ?',[user_id])
     res.status(200).json(rooms)
    } else if(user_role === 'jobseeker'){
      const [ rooms ] = await db.execute('SELECT chat_room.*, users.first_name, users.last_name, users.company_name FROM chat_room LEFT JOIN users ON  users.id = chat_room.employer_id WHERE jobseeker_id = ?',[user_id])
      res.status(200).json(rooms)
    }
  } catch(err){
     res.status(500).json('Server Err')
  }
 } 

module.exports.getRoomDetails = async (req, res) => {
  
  try{
    const room_id = req.query.r_id;
    const jobseeker_id = req.query.j_id;
    const employer_id = req.query.e_id;
    const user_role = req.user.type

    const db = await dbPromise
    const [ jobseeker ] = await db.execute('SELECT * FROM chat_message WHERE message_user_id = ? AND room_id = ?',[jobseeker_id, room_id])
    const [ employer] = await db.execute('SELECT * FROM chat_message WHERE message_user_id = ? AND room_id = ?',[employer_id, room_id])
    
    if(user_role === 'employer'){
       const results = {
           sender:employer,
           receiver:jobseeker
        }

     res.status(200).json(results)
    } else if(user_role === 'jobseeker'){
      const results = {
        receiver:employer,
        sender:jobseeker
     }
     res.status(200).json(results)
    }
 
  } catch(err){
    res.status(500).json('Server Err')
  }
}
// creare 2 table 1 for employer  1 for jobseeker

module.exports.createRoom = async (req,res) => {
   


}

module.exports.postMessage = async (req, res) => {

}
