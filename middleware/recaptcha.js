

module.exports.GoogleCAPTCHA = (req,res,next,request) => {
    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        req.flash("error_msg", {
            msg: "Please select captcha "
        })
        return res.redirect('back')

    }
    const secretKey = process.env.RECAPTCHA_SKEY;

    const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

    request(verificationURL, function (error, response, body) {
        body = JSON.parse(body);

        if (body.success !== undefined && !body.success) {
            req.flash("error_msg", {
                msg: "Failed captcha verification"
            })
            return res.redirect('back')
        } else {

            console.log('recapcha success')
        }
    })

}