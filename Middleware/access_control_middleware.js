//Login required middleware
module.exports.ensureAuthenticated = function  (req, res, next) {  
    if (req.isAuthenticated()) {
       return next();
    }else{
        
        res.redirect('/login')
    }
    
};



/// middleware for user access controll
module.exports.employer = function (req,res,next){
    if(req.user.type === 'employer'){
        return next();
    }else{
        res.redirect('/login')
    }
}

module.exports.jobSeeker = function (req,res,next){
    if(req.user.type === 'jobseeker'){
        return next();
    }else{
        res.redirect('/login')
    }
}