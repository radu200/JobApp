const { db } = require(".././config/database.js");


//Login required middleware
module.exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/api/login");
  }
};

/// middleware for user access controll
module.exports.employer = function(req, res, next) {
  if (req.user.type === "employer") {
    return next();
  } else {
    res.redirect("/api/login");
  }
};

module.exports.jobSeeker = function(req, res, next) {
  if (req.user.type === "jobseeker") {
    return next();
  } else {
    res.redirect("/api/login");
  }
};

module.exports.admin = function(req, res, next) {
  if (req.user.type === "admin") {
    return next();
  } else {
    res.redirect("/api/login");
  }
};


module.exports.ensureEmailChecked = (req, res, next) => {
  db.query(
    "select id, email,email_status from users where id = ? ",
    [req.user.id],
    (err, results) => {
      if (err) throw err;

      if (
        results[0].email_status === "unverified" ||
        results[0].email_status === null
      ) {
        res.redirect("/api/resend/email/check");
      } else {
        return next();
      }
    }
  );
};



module.exports.authRole = (req,res) => {
  
  if(req.isAuthenticated()){
      res.json({
        'role':req.user.type,
        'auth':true    
      })
   } else {
      res.json({
        'role':'Unauthenticated',
        'auth':false
      })  
  }
}