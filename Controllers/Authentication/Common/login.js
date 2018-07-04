
const passport = require('passport');

module.exports.getLogin = (req, res, next) => {
    res.render('Authentication/Common/login')
 };


 module.exports.postLogin =  (req, res, next) => {
    req.checkBody('username', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password cannot be blank').notEmpty();
    req.checkBody('password', 'Password must be between 6-100 characters long.').len(6, 100);

    const errors = req.validationErrors();

    if (errors) {
        req.flash('error_msg', errors);
        return res.redirect('/login')
    } else {

        passport.authenticate('local-login', {
            successRedirect: '/', // redirect to the secure profile section
            failureRedirect: '/login', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        })(req, res);
        // if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null)
        // {
        //     req.flash("error_msg", {msg:"Please select captcha "})
        //     return res.redirect('/login')

        // }
        // const secretKey = process.env.RECAPTCHA_SKEY

        // const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

        // request(verificationURL,function(error,response,body) {
        //   body = JSON.parse(body);

        //   if(body.success !== undefined && !body.success) {
        //       req.flash("error_msg", {msg:"Failed captcha verification"})
        //     return res.redirect('/login')
        //   }else{

        //   console.log('recapcha success')

        // }
        // });

    }

};