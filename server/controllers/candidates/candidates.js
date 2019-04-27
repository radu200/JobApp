const { dbPromise } = require('../../config/database.js');
const errMsg = 'O erroare a avut loc'

module.exports.getCandidates = async (req,res) => {
   const offset = req.body.offset;
  try{
     const db = await dbPromise
     const jobseeker_experience =`sum(jobseeker_experience.years) total_years`;

     const user_details = `users.id AS userID, users.email AS email, users.first_name,users.last_name,users.type, users.avatar,users.email_status,users.job_seeker_location,users.job_seeker_about_me,users.job_seeker_languages,users.job_seeker_education,users.job_seeker_location ,users.job_seeker_availability`
     const sql =  `SELECT ${jobseeker_experience}, ${user_details}  from users INNER  JOIN jobseeker_experience ON jobseeker_experience.jobseeker_id = users.id  WHERE  jobseeker_experience.years BETWEEN 0 AND 50 GROUP BY userID LIMIT 5 OFFSET ${offset}`
     
     const [results] = await db.query(sql)
     res.json(results)
   
    
  } catch(err){
      console.log(err)
      res.json(errMsg)
  }
}