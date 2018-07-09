
module.exports.getJobsPage = function(req, res, next) {
   res.render('Pages/jobs')
};


module.exports.getAddJobs = function (req, res, next) {
    res.render('Jobs/add_jobs')
};
