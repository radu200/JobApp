const { dbPromise} = require('../.././config/database.js');
const msg = require('.././utils/messages')
const urlPaths = require('.././utils/url-paths')


module.exports.searchJobs = async (req, res, next) => {

    const searchVal = req.query.search_query
    const offset = req.body.offset
    const city = req.query.location
    const limit = 12
    

 
    try {  


       
         //validation
         if( searchVal === '' || searchVal.length > 70){
            
             return false
         } else if( city === '' || city.length > 70 ){
            
             return false
         } else {
             
             const db = await dbPromise
             const sql = `SELECT * FROM jobs  WHERE category LIKE '%${searchVal}%' AND city  LIKE '%${city}%' LIMIT ${limit} OFFSET ${offset}`
             const [results] = await db.query(sql)
            
             if(req.user.type === 'employer'){
                res.json({
                      'jobs':[],
                       'auth':'employer'
             })
            
            } else if(req.user.type === 'jobseeker'){
                res.json({
                      'jobs':results,
                       'auth':'jobseeker'
             })}
            
             else {
                 res.json({'jobs':results})
             }
                 
         }

         
    } catch (err) {
        res.json(msg.error)
    }
        
};


module.exports.searchCandidates = async(req,res) => {
    const location = req.query.location;
    const category = req.query.category;
    const experienceMin = 0;
    const experienceMax = 50;
    const offset = req.body.offset;
    const limit = 6;
  
  
    try{
        ///validation
        if( location === '' || location.length > 70){
            return false
        } else if( category === '' || category.length > 70 ){
            return false
        } else if( experienceMax > 50) { 
            return false
        } else {

        const db = await dbPromise
        const jobseeker_experience = `jobseeker_experience.category AS category, jobseeker_experience.jobseeker_id AS userID, sum(jobseeker_experience.years) AS total_ex_years `;
        const user_details = `users.first_name,users.last_name,users.type, users.avatar,users.job_seeker_location,users.job_seeker_about_me,users.job_seeker_location `
        const sql =  `SELECT ${jobseeker_experience}, ${user_details}  FROM users LEFT JOIN jobseeker_experience ON jobseeker_experience.jobseeker_id = users.id WHERE lower(category ) LIKE '%${category}%'  AND lower(users.job_seeker_location) LIKE '%${location}%' AND jobseeker_experience.years BETWEEN ${experienceMin} AND ${experienceMax} GROUP BY category,userID  LIMIT ${limit} OFFSET ${offset}`
        const [results] = await db.query(sql)
       
        if( req.user.type === 'employer' ){
            res.json({'candidates':results, 'auth':'employer' })
           }  
        }
       
      
     
      
  } catch(err){
      res.json('O errore a avut loc')
      console.log(err)
  }

}


module.exports.getCandidateDetails = async (req,res) => {
 
    const id = req.params.id
    
    try {
        const db = await dbPromise;
        
       const [candidate] = await db.execute('select first_name,last_name,avatar,id,job_seeker_employment_type, job_seeker_about_me,job_seeker_education,job_seeker_location,job_seeker_languages, job_seeker_availability from users where id = ? ', [id]);
 
       const [experience] = await db.execute('select * from jobseeker_experience where jobseeker_id = ? ', [id]);
         


       if( req.user.type === 'employer' ){
        res.json({
            'details':candidate,
            'experience':experience,
            'auth':'employer'
         })
       }  
    
       
       } catch (err) {
          
             res.json(msg.err) 
             console.log('getCandidateDetails ',err)
       }
 
 }