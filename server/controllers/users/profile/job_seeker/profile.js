const db = require('../../../.././config/database.js');

module.exports.getApplication = (req,res,next) => {
   res.render('profile/jobseeker/application')
}


module.exports.getJobSeekerProfileInfoEdit = (req,res,next) => {
   res.render('profile/jobseeker/jobseeker_profile_edit')

}


module.exports.postJobSeekerProfileInfoEdit = (req,res,next) => {
   console.log('lalal')
}


module.exports.getJobSeekerProfileEditExperience = (req,res,next) => {
   res.render('profile/jobseeker/jobseeker_experience_edit')

}

module.exports.postJobSeekerProfileEditExperience = (req,res,next) => {
   console.log('working experi')
}