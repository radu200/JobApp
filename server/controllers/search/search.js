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


module.exports.searchCandidates = async(req,res) => {
    const location = 'balti';
    const  category = 'Bucatar'
    try{
        const db = await dbPromise
        // const sql = `SELECT * FROM jobs  WHERE category LIKE '%${searchVal}%' AND city  LIKE '%${city}%' LIMIT 2 OFFSET ${offset}`
         const sql1 =  `SELECT jobseeker_experience.*, users.*  from jobseeker_experience LEFT JOIN users ON jobseeker_experience.jobseeker_id = users.id WHERE jobseeker_experience.category LIKE '%${category}%'  AND users.job_seeker_location LIKE '%${location}%' LIMIT 5 OFFSET 0`
        const [results] = await db.query(sql1)
        res.json(results)
        console.log(results)
      
  }catch(err){
      res.json('O errore a avut loc')
      console.log(err)
  }

}
