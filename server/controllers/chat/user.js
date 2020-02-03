const { dbPromise } = require("./../../config/database.js");
const shortId = require("short-id");

 const getNotifications = async (user_id) => {
   try{
     const db = await dbPromise;
     const [result ] = await db.execute( `SELECT room_id, message_id, message_user_id  FROM chat_message WHERE receiver_id = ? AND status = ?`,[user_id, 'unread'] );
     return result
   } catch(err) {
     return err
   }
  }
  
  const addMessage = async (room_id, s_id, chatMessage, receiver_id) => {
    try{
      const db = await dbPromise;
      await db.query('INSERT  INTO chat_message (room_id, message_user_id, message_text, receiver_id) VALUES(?,?,?,?)', [room_id, s_id, chatMessage, receiver_id])
    } catch(err){
      return err
    }
   
  }
  const addNotifications = async (user_role_msg, room_id) => {
    try {
      const db = await dbPromise
      const [n] = await db.execute(`SELECT ${user_role_msg} FROM chat_room where room_id = ?`, [room_id])
  
      const notification = Object.values(n[0])[0]
      const notificationNum = 1
  
      let counter = 0
  
      if (notification !== null || notification !== undefined) {
        counter = notification + notificationNum
      } else {
        counter = notificationNum
      }
      await db.query(`UPDATE  chat_room SET ${user_role_msg}  = ? WHERE room_id = ?`, [counter, room_id])
  
    } catch (err) {
      return err
    }
  }
  
  const removeNotification = async (room_id, receiver_id) => {
      try {
        const counter = 0
        const db = await dbPromise;
        await db.query('UPDATE chat_message SET status =  ? WHERE room_id = ? AND receiver_id = ?',['read', room_id, receiver_id])
        // await db.query(`UPDATE chat_room SET ${user_role_msg}  = ? WHERE room_id = ?`, [counter, room_id ])
      } catch(err) {
         return err
      }
  }

const checkRooms = async (sender_id, receiver_id) => {
  try {
    const db = await dbPromise;
    const [
      check,
    ] = await db.execute(
      "SELECT * FROM chat_room WHERE jobseeker_id = ? AND  employer_id = ?",
      [receiver_id, sender_id],
    );
    let exist = false;
    if (check.length > 0) {
      exist = true;
    }
    return {status:exist, room_id:check[0].id};
  } catch (err) {
    return err;
  }
};

const addRoom = async (receiver_id, sender_id, receiver_name) => {
  try {
    const room_id = shortId.generate();
    const db = await dbPromise;
    await db.query(
      "INSERT INTO chat_room (jobseeker_id, employer_id, room_id) VALUES(?,?,?)",
      [receiver_id, sender_id, room_id],
    );
  } catch (err) {
    return err;
  }
};

const retrieveRooms = async (
  user_id,
  user_notification_status,
  receiver_id_status,
  sender_id_status
) => {

  try {
    const db = await dbPromise;
    const [rooms] = await db.execute(
      `SELECT chat_room.room_id, chat_room.time, 
     users.id as receiver_id, users.first_name  as receiver_fn, users.last_name  as receiver_ln, users.avatar as receiver_avatar 
     FROM chat_room LEFT JOIN users ON  users.id = chat_room.${receiver_id_status} WHERE ${sender_id_status} = ?`,
      [user_id],
    );
    return rooms;
  } catch (err) {
    return err;
  }
};

const lastInsertedId = async () => {
  try {
    const db = await dbPromise;
    const [id] = await db.execute( 
       `SELECT LAST_INSERT_ID() AS  last_id`
    );
    const last_id = id[0].last_id;
    return last_id;
  } catch(err){
    return err
  }
}
const lastCreatedRoom = async (receiver_id_status, room_id) => {
  try {
    const db = await dbPromise;
 
     const [room] = await db.execute(`SELECT chat_room.room_id, chat_room.time,   
      users.id as receiver_id, users.first_name  as receiver_fn, users.last_name  as receiver_ln, users.avatar as receiver_avatar  FROM chat_room LEFT JOIN users ON  users.id = chat_room.${receiver_id_status}  WHERE chat_room.id =  ? `, [room_id])
      return room
  } catch (err) {
    return err;
  }
}
  module.exports = {
      checkRooms,
      retrieveRooms,
      addRoom,
      addMessage,
      addNotifications,
      getNotifications,
      removeNotification,
      lastCreatedRoom,
      lastInsertedId
  }