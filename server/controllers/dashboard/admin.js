///check users and
const { dbPromise } = require("./../../config/database.js");


module.exports.getAllUsers = async  (req,res) => {
    const db = await dbPromise
     const [users] = await db.execute('SELECT * FROM users WHERE checked   = ? OR checked = ? ',['no', null])
     res.json(users)
}

module.exports.getAllReportedUsers = async  (req,res) => {
    const db = await dbPromise
     const [users] = await db.execute('SELECT * FROM users WHERE reported = ? ',['yes'])
     res.json(users)
}

module.exports.getAllBlackListedUsers = async  (req,res) => {
    const db = await dbPromise
     const [users] = await db.execute('SELECT * FROM users WHERE blacklist = ? ',['yes'])
     res.json(users)
}

module.exports.postBlackListeddUsers = async  (req,res) => {

     const db = await dbPromise
     const userId  = 2
     const [users] = await db.query('UPDATE users SET blacklist = ? WHERE id = ? ',['yes', userId])
}

