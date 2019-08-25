const { dbPromise } = require('../../config/database.js');
const errMsg = 'O erroare a avut loc'

module.exports.getCandidateDetails = async (req,res) => {
 
   const id = 6
   try {
      const db = await dbPromise;
         
      const [candidate] = await db.execute('select first_name,last_name,avatar,id,job_seeker_employment_type, job_seeker_about_me,job_seeker_education,job_seeker_location,job_seeker_languages job_seeker_availability from users where id = ? ', [id]);

      const [experience] = await db.execute('select * from jobseeker_experience where jobseeker_id = ? ', [id]);
           
      res.json({
         candidateDetails:candidate,
         CandidateExperience:experience
      })   
      


      } catch (err) {
            req.flash('error_msg',{msg:errMsg})
         
            res.redirect('back')

            console.log(err)
      }

}