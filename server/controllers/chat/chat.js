const { dbPromise } = require("./../../config/database.js");
const { addRoom, retrieveRooms, checkRooms, getNotifications } = require('./user')



module.exports.getRooms = async (req, res) => {
  try {
    const queryVars = {
      employer_msg:'employer_new_msg',
      jobseeker_msg:'jobseeker_new_msg',
      employer_id_status:'employer_id',
      jobseeker_id_status:'jobseeker_id'
    }
    const user_id = req.user.id;
    const user_role = req.user.type;
  
    const {
      employer_id_status,
      jobseeker_id_status,
      employer_msg,
      jobseeker_msg
    } = queryVars;

    if (user_role === "employer") {

      const rooms = await retrieveRooms(
        user_id,
        employer_msg,
        jobseeker_id_status,
        employer_id_status,
      );
      
      res.status(200).json(rooms);
    } else if (user_role === "jobseeker") {
  
      const rooms = await retrieveRooms(
        user_id,
        jobseeker_msg,
        employer_id_status,
        jobseeker_id_status
      );
      res.status(200).json(rooms);
    }
  } catch (err) {
    res.status(500).json("Server Err");
  }
};

module.exports.getRoomDetails = async (req, res) => {
  try {
    const room_id = req.query.r_id;
    const limit = 100;
    const db = await dbPromise;
    const [
      room,
    ] = await db.execute(
      `SELECT * FROM chat_message WHERE  room_id = ? LIMIT ${limit}`,
      [room_id],
    );
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json("Server Err");
  }
};

module.exports.removeRoom = async (req, res) => {
  try {
    const room_id = req.body.room_id;
    const db = await dbPromise;
    await db.query("DELETE FROM chat_room WHERE room_id = ?", [room_id]);
    res.json("Success");
  } catch (err) {
    res.json(err);
  }
};

module.exports.getNotifications = async (req, res) => {

    try{
      const user_id = req.user.id;

      const result = await getNotifications(user_id);
       
      const notification = result.map(({ message_user_id, room_id }) => ({
        room_id,
        receiver_id:message_user_id,
        msg_notification:1,            
      }))
      res.json(notification)
  
    } catch(err) {
      res.json(err)
    }
      
}