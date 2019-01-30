const db = require('../../../.././config/database.js');

module.exports.getApplication = (req,res,next) => {
   res.render('profile/jobseeker/application')
}


module.exports.getJobSeekerProfileInfoEdit = (req,res,next) => {
   res.render('/home')

}


module.exports.postJobSeekerProfileInfoEdit = (req,res,next) => {
   console.log('lalal')
}