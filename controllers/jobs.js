const db = require ('../config/database')

module.exports.getJobsPage = function(req, res, next) {
   res.render('pages/jobs')
};