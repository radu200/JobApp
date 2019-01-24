const db = require('../../../././config/database.js');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10;
const request = require('request');
const send_emails = require('../../send_emails/send_emails');
const recaptcha = require('../../../middleware/recaptcha')


///change password within profile
module.exports.getChangePassword = (req, res, next) => {
    res.render('users/settings/change_password')

};

module.exports.postChangePassword = (req, res, next) => {

    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let confirmPassword = req.body.confirmPassword;



    req.checkBody('oldPassword', 'Password must be between 6-100 characters long.').len(6, 100);
    req.checkBody('newPassword', 'Password must be between 6-100 characters long.').len(6, 100);
    req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.newPassword);




    const errors = req.validationErrors();

    if (errors) {
        req.flash('error_msg', errors);
        return res.redirect('/password/reset')
    }

    db.query("SELECT users.password,users.email, users.first_name FROM users WHERE id = ?", [req.user.id], function (err, rows) {
        if (err) {
            console.log("[mysql error]", err)
        } else {

            let hash = rows[0].password;

            bcrypt.compare(oldPassword, hash, function (error, result) {

                if (result === false) {
                    req.flash('error_msg', {
                        msg: "Parola veche este greșită. Încearcă din nou."
                    })
                    return res.redirect('back')
                } else if (result === true) {
                    
                    bcrypt.hash(newPassword, saltRounds, function (err, hash) {
                        db.query('UPDATE users SET password = ? WHERE id = ? ', [hash, req.user.id], function (err, result) {
                            if (err) throw err
                            console.log('success')
                        })

                    })
                         send_emails.changePasswordProfile(req,res,next,nodemailer,rows[0].email);
                     
                    req.flash('success_msg', {
                        msg: 'Parola dvs. a fost schimbată.'
                    });
                    res.redirect('back')
                }
            })

        }
    })
}



//forgot password

module.exports.getForgotPassword = (req, res, next) => {
    res.render('./users/settings/forgot_password',{
        
    });


}

//forgot password
module.exports.postForgotPassword = (req, res, next) => {
    req.checkBody('forgotPswEmail', ' Te rog introdu o adresa de email valida.').isEmail();
    
    
    const errors = req.validationErrors();

    if (errors) {
        req.flash('error_msg', errors);
        return res.redirect('/forgot/password');
    }else {
        let email = req.body.forgotPswEmail;
        db.query('SELECT email FROM users WHERE email = ?', [email], function (err, results) {
            if (err) throw err;
            
            if (!results.length) {
                req.flash('error_msg', {
                    msg: 'Contul cu adresa de e-mail respectivă nu există.'
                });
                res.redirect('/forgot/password')
    
    
            } else {
                
                //create random token
                crypto.randomBytes(16, function (err, buffer) {
                    let token = buffer.toString('hex');
                    // console.log('token',token)
                    let updateToken = {
                        forgotPasswordToken: token
                    }
                    db.query('UPDATE users SET ?, forgotPasswordTokenExpires = TIMESTAMPADD(HOUR, 1, NOW())  WHERE email = ? ', [updateToken, email], function (error, result) {
                        if (error) throw error
    
                    })
    
    
                      send_emails.forgotPassword(req,res,next,nodemailer,email,token)
            
                });
                req.flash('success_msg', {
                    msg: `A fost trimis un e-mail la
                     ${email} cu instrucțiuni suplimentare.`
                });
                res.redirect('/forgot/password');
    
    
            }
        });
    }
}






//forgot password reset 
module.exports.getForgotPasswordReset = (req, res, next) => {
    db.query('SELECT users.password, users.forgotPasswordtoken , users.forgotPasswordTokenExpires FROM  users WHERE forgotPasswordtoken = ? AND forgotPasswordTokenExpires > NOW()', [req.params.token], function (err, rows, fields) {
        if (err) throw err;

        if (!rows.length) {
            req.flash('error_msg', {
                msg: 'Password reset token is invalid or has expired.'
            })
            res.render('./users/settins/forgot_password_reset');
        } else {

            res.render('./users/settings/forgot_password_reset', {
                'result': rows[0],

            })
        }
    })
}

module.exports.postForgotPasswordReset = (req, res, next) => {
    let password = req.body.newPassword;
    let confirm = req.body.confirmNewPassword
    // req.checkBody('password', 'Password must be between 6-100 characters long.').len(6, 100);
    // req.checkBody('confirm', 'Passwords do not match').equals(req.body.password);


    const errors = req.validationErrors();

    if (errors) {
        req.flash('error_msg', errors);
        return res.redirect('back');
    }
    /// check for valid token

    db.query('SELECT users.id, users.email,users.first_name,users.password, users.forgotPasswordtoken,users.forgotPasswordTokenExpires,users.type  FROM  users WHERE forgotPasswordToken = ? AND forgotPasswordTokenExpires > NOW()', [req.params.token], function (err, rows, fields) {
        if (err) {
            console.log('[mysql error]', err)
        }

        let email = rows[0].email
        let user = rows[0]

        console.log('user', user)

        if (!rows.length) {
            req.flash('error_msg', {
                msg: 'Resetarea parolei nu este validă sau a expirat.'
            })
            res.redirect('/forgot/password')

        }

        //hash and update password
        bcrypt.hash(password, saltRounds, function (err, hash) {
            db.query('UPDATE  users SET password = ? WHERE forgotPasswordToken = ? AND forgotPasswordTokenExpires > NOW()', [hash, req.params.token], function (error, result) {
                if (error) throw error
                console.log('updated')

                send_emails.forgotPasswordSucess(req,res,next,nodemailer,email)

                req.login(user, function (err) {
                    req.flash('success_msg', {
                        msg: 'Parola dvs. a fost schimbată.'
                    });
                    res.redirect('/profile')
                });

            })

        })

    })
}




///verify email after signup
module.exports.getCheckEmail = function (req, res, next) {
    let token = req.params.token
    db.query('SELECT * FROM users where email_confirmation_token = ? AND email_token_expire > NOW()', [token], function (err, rows) {
        if (err) {
            console.log(err)
        } 
        
        if (rows.length ) {
            // let verified = 'verified';
            db.query('UPDATE users SET email_status = ? WHERE email_confirmation_token = ? AND email_token_expire > NOW()', ['verified', token], function (err, rows) {
                if (err) throw err
            })
            db.query("UPDATE users SET email_confirmation_token = ? WHERE id = ? ", [null, rows[0].id])
            req.login(rows[0], function (err) {
                req.flash('success_msg', {
                    msg: "Emailul dvs. a fost verificat cu succes"
                });
                res.redirect('/profile')
            });
        } else {
            req.flash('error_msg', {
                msg: "Ne pare rau din pacate nu am putut sa va verificam emailul sau tokenul a expirat"
            });
            res.redirect('/login')
        }

    })
}

module.exports.getResendEmailCheck = (req,res,nexr) => {
    res.render('./users/settings/resend_email_check_form')
}
module.exports.postResendEmailCheck = (req,res,next) => {
    req.checkBody('resendEmailCheck', ' Te rog introdu o adresa de email valida.').isEmail();
    
    
    const errors = req.validationErrors();

    if (errors) {
        req.flash('error_msg', errors);
        return res.redirect('/resend/email/check');
    }else {
        let email = req.body.resendEmailCheck;
        db.query('SELECT email FROM users WHERE email = ?', [email], function (err, results) {
            if (err) throw err;
            
            if (!results.length) {
                req.flash('error_msg', {
                    msg: 'Contul cu adresa de e-mail respectivă nu există.'
                });
                res.redirect('back')
    
    
            } else {
                
                //create random token
                crypto.randomBytes(16, function (err, buffer) {
                    let token = buffer.toString('hex');
                   
                  
                    db.query('UPDATE users SET email_token_expire = TIMESTAMPADD(HOUR, 1, NOW()),email_confirmation_token = ? WHERE  email = ? ', [token,email], function (error, result) {
                        if (error) throw error
                   
                            send_emails.checkEmailAfterSignUp(req,res,nodemailer,email,token)
                       
                    })

                });
                req.flash('success_msg', {
                    msg: `A fost trimis un e-mail la
                     ${email} cu instrucțiuni suplimentare.`
                });
                res.redirect('back');
    
    
            }
        });
    }
  
}