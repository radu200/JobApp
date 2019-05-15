const {
    dbPromise
} = require('../.././config/database.js');


module.exports.searchJobs = async (req, res, next) => {

    const searchVal = req.query.search_query
    const offset = req.body.offset
    const city = req.query.location
    const limit = 12
    
    try {  
        const db = await dbPromise
        const sql = `SELECT * FROM jobs  WHERE category LIKE '%${searchVal}%' AND city  LIKE '%${city}%' LIMIT ${limit} OFFSET ${offset}`
        const [results] = await db.query(sql)
        if(!results){
           res.json({
               'msg':'Nu am gasit nici un lucru',
               'code':88
           })
        }else {
            res.json(results)
        }
            
    } catch (err) {
        res.json('O errore a avut loc')
    }
        
};


module.exports.searchCandidates = async(req,res) => {
    const location = req.query.location;
    const  category = req.query.category;
    const experienceMin = 0;
    const experienceMax = req.query.experience_max;
    const offset = req.body.offset;
    const limit = 2;
    try{
        const db = await dbPromise
        const jobseeker_experience = `jobseeker_experience.category AS category, jobseeker_experience.jobseeker_id AS userID, sum(jobseeker_experience.years) AS total_ex_years `;
        const user_details = ` users.email,users.first_name,users.last_name,users.type, users.avatar,users.email_status,users.job_seeker_location,users.job_seeker_about_me,users.job_seeker_languages,users.job_seeker_education,users.job_seeker_location ,users.job_seeker_availability`
        const sql =  `SELECT ${jobseeker_experience}, ${user_details}  from users LEFT JOIN jobseeker_experience ON jobseeker_experience.jobseeker_id = users.id WHERE lower(category ) LIKE '%${category}%'  AND lower(users.job_seeker_location) LIKE '%${location}%' AND jobseeker_experience.years BETWEEN ${experienceMin} AND ${experienceMax} GROUP BY category,userID  LIMIT ${limit} OFFSET ${offset}`
        const [results] = await db.query(sql)
       
        if(!results){
            res.json({
                'msg':'Nu am gasit nici un candidat',
                'code':88
            })
         }else {
             res.json(results)
         }
            
        
      
  }catch(err){
      res.json('O errore a avut loc')
      console.log(err)
  }

}
