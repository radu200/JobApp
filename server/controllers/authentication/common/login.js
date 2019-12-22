const passport = require("passport");
const urlPaths = require("../../utils/url-paths");
  
module.exports.getLogin = (req, res, next) => {

  if (req.isAuthenticated()) {
    res.redirect(urlPaths.profile);
  } else {
     
    res.render("authentication/common/login");
  }
};

module.exports.postLogin = (req, res, next) => {
  req.checkBody("username", "Email is not valid").isEmail();
  req.checkBody("password", "Password cannot be blank").notEmpty();
  req
    .checkBody("password", "Password must be between 6-100 characters long.")
    .len(6, 100);

  const errors = req.validationErrors();

  if (errors) {
    req.flash("error_msg", errors);
    return res.redirect(urlPaths.login);
  } else {
    passport.authenticate("local-login", {
      successRedirect: urlPaths.profile, // redirect to the secure profile section
      failureRedirect: urlPaths.login, // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })(req, res);
  }
};

module.exports.getLogout = function(req, res, next) {
  req.logout();
  let io = req.app.get('socketio');
  io.emit('removeLocalStorage')
  req.session.destroy(function(err) {
    if (err) {
      return next(err);
    } else {
      // destroy session data
      req.session = null;
 
      res.redirect(urlPaths.login);
    }
  });
};
