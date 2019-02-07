const {
    db
} = require('../../../././config/database.js');
const {
    dbPromise
} = require('../../../././config/database.js');
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

module.exports.postChangePassword =  async (req, res, next) => {

    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let confirmPassword = req.body.confirmPassword;



    req.checkBody('oldPassword', 'Password must be between 6-100 characters long.').len(6, 100);
    req.checkBody('newPassword', 'Password must be between 6-100 characters long.').len(6, 100);
    req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.newPassword);




    const errors = req.validationErrors();

    if (errors) {
        req.flash('error_msg', errors);
        return res.redirect('back')
    }




    try {
        const db = await dbPromise;
         
        const [userDetails] = await db.execute("SELECT users.id, users.email, users.password  FROM users WHERE id = ?", [req.user.id]);
        
        const match = await bcrypt.compare(oldPassword, userDetails[0].password);
          
        
        if (!match) {
            req.flash('error_msg', {
                msg: "Parola veche este greșită. Încearcă din nou."
            })
            return res.redirect('back')

         } else {
        
            const hashPassword =  await bcrypt.hash(newPassword, saltRounds);

            
            await Promise.all ([

                db.execute('UPDATE users SET password = ? WHERE id = ? ', [hashPassword, req.user.id]),
                
                send_emails.changePasswordProfile(req, res, next, nodemailer, userDetails[0].email)
            ])

            req.flash('success_msg', {
                msg: 'Parola dvs. a fost schimbată.'
            });
            res.redirect('back')
        }

     } catch (err){
        console.log(err)
    }



}



//forgot password
module.exports.getForgotPassword = (req, res, next) => {
    res.render('./users/settings/forgot_password', {

    });


}

//forgot password
module.exports.postForgotPassword = (req, res, next) => {
    req.checkBody('forgotPswEmail', ' Te rog introdu o adresa de email valida.').isEmail();


    const errors = req.validationErrors();

    if (errors) {
        req.flash('error_msg', errors);
        return res.redirect('/forgot/password');
    } else {
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


                    send_emails.forgotPassword(req, res, next, nodemailer, email, token)

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
    req.checkBody('password', 'Password must be between 6-100 characters long.').len(6, 100);
    req.checkBody('confirm', 'Passwords do not match').equals(req.body.password);


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

                send_emails.forgotPasswordSucess(req, res, next, nodemailer, email)

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

        if (rows.length) {
            // let verified = 'verified';
            db.query('UPDATE users SET email_status = ? WHERE email_confirmation_token = ? AND email_token_expire > NOW()', ['verified', token], function (err, rows) {
                if (err) throw err
            })
            db.query("UPDATE users SET email_confirmation_token = ? WHERE id = ? ", [null, rows[0].id])
            req.login(rows[0], function (err) {
                req.flash('success_msg', {
                    msg: "Emailul dvs. a fost verificat cu succes.Va multumim!"
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

module.exports.getResendEmailCheck =  async (req, res, nexr) => {


    try {
        const db = await dbPromise;
       
        const [results] = await db.execute('select id,email,email_status from users where id = ?', [req.user.id]);
      
        if (results[0].email_status === 'unverified' || results[0].email_status === null) {
           
            res.render('./users/settings/resend_email_check_form', {
                'results': results[0]
            })

        } else {

            res.redirect('/profile')
        }

        } catch (err) {
          console.log(err)
      }


}
module.exports.postResendEmailCheck = async (req, res, next) => {

    const CryptoToken = new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buffer) => {
            if (err) {
                reject(err)
            }
            resolve(buffer.toString('hex'));
        })
    })


    try {
        const db = await dbPromise;
       
        const [userDetails] = await db.execute('select id,email from users where id = ?', [req.user.id]);
       
        const token = await CryptoToken;

        await Promise.all([

            db.execute('UPDATE users SET email_token_expire = TIMESTAMPADD(HOUR, 1, NOW()),email_confirmation_token = ? WHERE  id = ? ', [token, req.user.id]),


            send_emails.checkEmailAfterSignUp(req, res, nodemailer, userDetails[0].email, token),

            req.logout()

        ])

        req.flash('info_msg', {
            msg: `A fost trimis un e-mail la ${userDetails[0].email} cu instrucțiuni suplimentare.`
        });

        res.redirect('/login');

    } catch (err) {
        console.log(err)
    }



}


module.exports.getChangeEmail = (req, res, next) => {
    res.render('./users/settings/change_email')
}

module.exports.postChangeEmail = async (req, res, next) => {





    const email = req.body.newEmail;
    const password = req.body.password;
    // // console.log(email)
    // // console.log(password)
    req.checkBody('password', 'Parola este necesara.').len(1, 100)
    req.checkBody('newEmail', 'Email nu este valid.').isEmail();

    const errors = req.validationErrors();

    if (errors) {
        req.flash('error_msg', errors);
        return res.redirect('/change/email')

    }

    const CryptoToken = new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buffer) => {
            if (err) {
                reject(err)
            }
            resolve(buffer.toString('hex'));
        })
    })



    try {

        const conn = await dbPromise;


        const [userDetails] = await conn.execute("SELECT users.id,users.email, users.password  FROM users WHERE id  = ? ", [req.user.id]);


        if (userDetails[0].email === email) {
            req.flash('error_msg', {
                msg: 'E-mailul este deja în uz.Utilizați un alt e-mail'
            });
            return res.redirect('/change/email')


        }

        const match = await bcrypt.compare(password, userDetails[0].password);

        if (!match) {
            req.flash('error_msg', {
                msg: 'Parola e gresita.Incerca-ti din nou.'
            });

            return res.redirect('/change/email')

        } else {

            const token = await CryptoToken;

            await Promise.all([

                conn.execute('UPDATE users SET email = ?, email_status = ?,email_confirmation_token = ? , email_token_expire = TIMESTAMPADD(HOUR, 2, NOW()) WHERE id = ? ', [email, 'unverified', token, req.user.id]),

                send_emails.checkEmailAfterSignUp(req, res, nodemailer, email, token),

                req.logout()
            ])


            req.flash('info_msg', {
                msg: `A fost trimis un e-mail la ${email} cu instrucțiuni suplimentare.`
            });

            res.redirect('/login')

        }

    } catch (err) {
        console.log(err)
    }

}

module.exports.getSettings = (req, res, next) => {
    res.render('./users/settings/settings')
}