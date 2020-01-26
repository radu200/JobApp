// const { dbPromise } = require(".././config/database.js");
const mysql = require('mysql2/promise');
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jobApp',
  password:'root'
});

const fs = require("fs");
const fsPromises = fs.promises;
const limit = 1

const deleteJob = async () =>  {
    try {
        const status = 'removed'
        const db = await connection;
        const [userDetails] = await db.query(
          `SELECT id,image FROM jobs  WHERE status = ? LIMIT ${limit}`,[status]
        );
    
     return  await db.query(`DELETE FROM jobs  WHERE status  = ? LIMIT ${limit}` [status] );
    
        // if (
        //   userDetails[0].image &&
        //   userDetails[0].image !== null &&
        //   userDetails[0].image > 0
        // ) {
        //   await fsPromises.unlink(`./public/${userDetails[0].image}`);
        // }
     
      } catch (err) {
         console.log('script job err', err)
      }
}

module.exports = {
    deleteJob
}