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
    const location = req.query.location;
    const  category = req.query.category;
    const experienceMin = req.query.experience_min;
    const experienceMax = req.query.experience_max;
 

    try{
        const db = await dbPromise
        const jobseeker_experience = `jobseeker_experience.category AS category, jobseeker_experience.jobseeker_id AS userID, sum(jobseeker_experience.years) AS total_ex_years `;
        const user_details = ` users.email,users.first_name,users.last_name,users.type, users.avatar,users.email_status,users.job_seeker_location,users.job_seeker_about_me,users.job_seeker_languages,users.job_seeker_education,users.job_seeker_location ,users.job_seeker_availability`
        const sql =  `SELECT ${jobseeker_experience}, ${user_details}  from users LEFT JOIN jobseeker_experience ON jobseeker_experience.jobseeker_id = users.id WHERE category LIKE '%${category}%'  AND users.job_seeker_location LIKE '%${location}%' AND jobseeker_experience.years BETWEEN ${experienceMin} AND ${experienceMax} GROUP BY category,userID  LIMIT 5 OFFSET 0`
        const [results] = await db.query(sql)
        res.json(results)
        console.log(results)
      
  }catch(err){
      res.json('O errore a avut loc')
      console.log(err)
  }

}
