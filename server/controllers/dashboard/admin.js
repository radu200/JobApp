///check users and
const { dbPromise } = require("./../../config/database.js");


module.exports.getAllUsers = async  (req,res) => {
     const limit = 12
     const offset = req.query.offset

     try {
          const db = await dbPromise
          const [users] = await db.execute(`SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`)
          res.json(users)

     } catch(err){
       res.json({msg:err})
     }
}

module.exports.getCheckUsers = async (req,res) => {
     const limit = 12
     const offset = req.query.offset
     try{
          const db = await dbPromise
          const [users] = await db.execute(`SELECT * FROM users WHERE checked   = ? AND blacklist = ?  LIMIT ${limit} OFFSET ${offset} `,['no', 'no'])
          res.json(users)
     } catch(err){
          res.json({msg:err})
      }
}

module.exports.postCheckUsers = async (req,res) => {
     const userId  = req.body.data.id
     try{
          const db = await dbPromise
           await db.query(`UPDATE users SET checked = ? WHERE id = ?`,['yes', userId])
          res.json({msg:{success:'Success'}})
     } catch(err){
          res.json({msg:err})
      }
}
module.exports.getAllReportedUsers = async  (req,res) => {
     const limit = 12
     const offset = req.query.offset
     try{
          const db = await dbPromise
          const [users] = await db.execute(`SELECT reports.*, users.email, users.type, users.first_name, users.last_name FROM reports LEFT JOIN users ON reports.reported_user_id = users.id where reports.blacklist = ?  LIMIT ${limit} OFFSET ${offset} `,['no'])
          res.json(users)

     }catch(err){
       res.json({msg:err})
     }
}

module.exports.getAllBlackListedUsers = async  (req,res) => {
     const limit = 12
     const offset = req.query.offset
     try{
          const db = await dbPromise
          const [users] = await db.execute(` SELECT * FROM users WHERE blacklist = ?  LIMIT ${limit} OFFSET ${offset}`,['yes'])
          res.json(users)

     } catch(err){
          res.json({msg:err})
     }
}

module.exports.postBlackListedUsers = async  (req,res) => {
     const userId  = req.body.data.id
     const statusType =  req.body.data.statusType
     console.log(userId)
     console.log(statusType)
     try{
          const db = await dbPromise
          const [users] = await db.query('UPDATE users SET blacklist = ? WHERE id = ? ',['yes', userId])
         
          if(statusType === 'reported'){
                await db.query('UPDATE reports SET blacklist = ? WHERE reported_user_id = ? ',['yes', userId])
           } 

           res.json({msg:{success:'Success'}})

     } catch(err){
        res.json({msg:err})
     }
}



module.exports.unblockBlackListedUsers = async  (req,res) => {
     const userId  = req.body.data.id
     try{
          const db = await dbPromise
          await db.query('UPDATE users SET blacklist = ? WHERE id = ? ',['no', userId])
          res.json({msg:{success:'Success'}})

     } catch(err){
        res.json({msg:err})
     }
}


