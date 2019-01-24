const db = require('.././config/database.js');
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

module.exports.ensureEmailChecked = (req,res,next) => {
    db.query('select id, email,email_status from users where id = ? ',[req.user.id], (err,results) => {
         
        if (err) throw err;
    
        if(results[0].email_status === "unverified" || results[0].email_status === null ){
            res.redirect('/resend/email/check')
        } else {
            return next();
            
       }
     })
}


module.exports.userAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) {
        res.redirect('/profile');
     }else{
         
      res.redirect('/login')
     }
}