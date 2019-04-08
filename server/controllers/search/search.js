const {
    dbPromise
} = require('../.././config/database.js');


module.exports.searchJobs = async (req, res, next) => {

    let searchVal = req.query.search_query
    let offset = req.body.offset
    let city = req.query.location
    
     console.log(offset)
     console.log(city)
    try {
            const db = await dbPromise
            const [results] = await db.query(`SELECT * FROM jobs  WHERE category LIKE '%${searchVal}%' AND city  LIKE '%${city}%' LIMIT 2 OFFSET ${offset}`)
            res.json(results)
   
    } catch (err) {
        res.json('O errore a avut loc')
    }


};