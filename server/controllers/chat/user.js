const { dbPromise } = require("./../../config/database.js");

 const getNotifications = async (user_role_msg, user_role_id, user_id) => {
    const db = await dbPromise;
    const [
      msg,
    ] = await db.execute(
      `SELECT ${user_role_msg} as new_msg, room_id from chat_room where ${user_role_id} = ?`,
      [user_id],
    );  
    return msg
  }
  
  const addMessage = async (room_id, s_id, chatMessage) => {
    const db = await dbPromise;
    await db.query('INSERT  INTO chat_message (room_id, message_user_id, message_text) VALUES(?,?,?)', [room_id, s_id, chatMessage])
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
  
  const removeNotification = async (user_role_msg, room_id) => {
      try{
        const counter = 0
        const db = await dbPromise;
        await db.query(`UPDATE chat_room SET ${user_role_msg}  = ? WHERE room_id = ?`, [counter, room_id ])
      } catch(err) {
         return err
      }
  }
  module.exports = {
      addMessage,
      addNotifications,
      getNotifications,
      removeNotification
  }