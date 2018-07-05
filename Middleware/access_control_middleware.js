//Login required middleware
module.exports.EnsureAuthenticated = function  (req, res, next) {  
    if (req.isAuthenticated()) {
       return next();
    }else{
        
        res.redirect('/login')
    }
    
};



/// middleware for user access controll
module.exports.Employer = function (req,res,next){
    if(req.user.type === 'basic'){
        return next();
    }else{
        res.redirect('/login')
    }
}

module.exports.JobSeeker = function (req,res,next){
    if(req.user.type === 'jobseeker'){
        return next();
    }else{
        res.redirect('/login')
    }
}