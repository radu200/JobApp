const db = require('../../../.././config/database.js');

module.exports.getApplication = (req,res,next) => {
   res.render('profile/jobseeker/application')
}