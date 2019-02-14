const request = require('request');

module.exports.GoogleCAPTCHA = (req,res) => {
   
    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
       
        req.flash("error_msg", {
            msg: "Te rog selecteaza captcha "
        })
         return false;

    } else {

        const secretKey = process.env.RECAPTCHA_SKEY;
    
        const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    
        request(verificationURL, function (error, response, body) {
            body = JSON.parse(body);
    
            if (body.success !== undefined && !body.success) {
                req.flash("error_msg", {
                    msg: "Verificarea captcha  a eșuat"
                })
                res.redirect('back')
            } else {
                //  return next()
                console.log('recapcha success')
            }
        })
    }

}