
module.exports.loggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

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



//json format
//Login required middleware
module.exports.ensureAuthenticatedJsonRes = function  (req, res, next) {  
    if (req.isAuthenticated()) {
       return next();
    }else{    
     res.json(
         {
          'message':'Te rog logheazate',
           'code':99
         }
         )
    }
    
};

module.exports.employerJsonRes = function (req,res,next){

    if (req.user.type === 'employer') {
        return next();

    }else{      
        res.json('Te rog logheazate cu alt statut')
    }
}
