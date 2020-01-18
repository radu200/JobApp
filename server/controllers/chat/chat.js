const { dbPromise } = require("./../../config/database.js");
const shortId = require('short-id');



module.exports.createRoom = async (req, res) => {
  try {
    const receiver_id = req.query.id
    const sender_id = req.user.id
    const user_role = req.user.type
    const db = await dbPromise;

    if (user_role === 'employer') {
      const [check] = await db.execute('SELECT * FROM chat_room WHERE jobseeker_id = ? AND  employer_id = ?', [receiver_id, sender_id])
      if (check.length > 0) {
        return res.status(409).json('Room already exist')
      }
      const room_id = shortId.generate(); 
      await db.query('INSERT INTO chat_room (jobseeker_id, employer_id, room_id) VALUES(?,?,?)', [receiver_id, sender_id, room_id])
      res.status(200).json('Success')

    } else if (user_role === 'jobseeker') {
      const [check] = await db.execute('SELECT * FROM chat_room WHERE jobseeker_id = ? AND  employer_id = ?', [sender_id, receiver_id])
      if (check.length > 0) {
       return  res.status(409).json('Room already exist')
      }
      const room_id = shortId.generate(); 
      await db.query('INSERT INTO chat_room (employer_id,jobseeker_id, room_id) VALUES(?,?,?)', [receiver_id, sender_id, room_id])
      res.status(200).json('Success')

    }
  } catch (err) {
    res.status(500).json('Server Error')
  }
}



module.exports.getRooms = async (req, res) => {

  try {
    const user_id = req.user.id;
    const user_role = req.user.type
    const db = await dbPromise
    if (user_role === 'employer') {
      const [rooms] = await db.execute('SELECT chat_room.*, users.first_name, users.last_name, users.avatar  FROM chat_room LEFT JOIN users ON  users.id = chat_room.jobseeker_id WHERE employer_id = ?', [user_id])
      const results = {}
      results.sender_id =  user_id
      results.rooms = rooms
      res.status(200).json(results)
    } else if (user_role === 'jobseeker') {
      const [rooms] = await db.execute('SELECT chat_room.*, users.first_name, users.last_name, users.avatar, users.company_name FROM chat_room LEFT JOIN users ON  users.id = chat_room.employer_id WHERE jobseeker_id = ?', [user_id])
      const results = {}
      results.sender_id =  user_id
      results.rooms = rooms
      res.status(200).json(results)
    }
  } catch (err) {
    res.status(500).json('Server Err')
  }
}

module.exports.getRoomDetails = async (req, res) => {

  try {
    const room_id = req.query.r_id
    const user_id = req.user.id
    const limit = 100
    const db = await dbPromise
    const [room] = await db.execute(`SELECT * FROM chat_message WHERE  room_id = ? LIMIT ${limit}`, [room_id])
    res.status(200).json(room)
  } catch (err) {
    res.status(500).json('Server Err')
  }
}



