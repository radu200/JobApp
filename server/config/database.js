


const mysql = require('mysql2')

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

})


// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });




module.exports = connection;
