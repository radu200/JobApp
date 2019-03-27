const {
    dbPromise
} = require('../.././config/database.js');


module.exports.searchJobs = async (req, res, next) => {
    // res.send(req.query.searchJob)
    let searchVal = req.query.searchJob
    let limit = req.body.limit
    try {
            const db = await dbPromise
            const [results] = await db.query(`SELECT * FROM jobs  WHERE position LIKE '%${searchVal}%' LIMIT ${limit}`)
            res.json(results)
   
    } catch (err) {
        res.json('O errore a avut loc')
    }


};