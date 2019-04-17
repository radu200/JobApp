const {
    dbPromise
} = require('../.././config/database.js');


module.exports.searchJobs = async (req, res, next) => {

    let searchVal = req.query.search_query
    let offset = req.body.offset
    let city = req.query.location
 

    
    try {
      
        
        const db = await dbPromise
        const sql = `SELECT * FROM jobs  WHERE category LIKE '%${searchVal}%' AND city  LIKE '%${city}%' LIMIT 2 OFFSET ${offset}`
        const [results] = await db.query(sql)
        res.json(results)
            
    } catch (err) {
        res.json('O errore a avut loc')
    }
        
};