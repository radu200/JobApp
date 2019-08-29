
const {dbPromise} = require('../../../././config/database.js');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10;
const send_emails = require('../../send_emails/send_emails');
const msg = require('../../utils/messages')
const urlPaths = require('../../utils/url-paths')

///change password within profile
module.exports.getChangePassword = (req, res, next) => {
    res.render('users/settings/change_password')

};

module.exports.postChangePassword = async (req, res, next) => {

    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let confirmPassword = req.body.confirmPassword;



    req.checkBody('oldPassword', 'Password must be between 6-100 characters long.').len(6, 100);
    req.checkBody('newPassword', 'Password must be between 6-100 characters long.').len(6, 100);
    req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.newPassword);




    const errors = req.validationErrors();

    if (errors) {
        req.flash('error_msg', errors);
        return res.redirect(urlPaths.back)
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

            const hashPassword = await bcrypt.hash(newPassword, saltRounds);


            await Promise.all([

                db.execute('UPDATE users SET password = ? WHERE id = ? ', [hashPassword, req.user.id]),

                send_emails.changePasswordProfile(req, res, next, nodemailer, userDetails[0].email)
            ])

            req.flash('success_msg', {
                msg: 'Parola dvs. a fost schimbată.'
            });
            res.redirect(urlPaths.back)
        }

    } catch (err) {
        console.log(err)
    }



}



//forgot password
module.exports.getForgotPassword = (req, res, next) => {
    res.render('./users/settings/forgot_password', {

    });


}

//forgot password
module.exports.postForgotPassword = async (req, res, next) => {

    req.checkBody('forgotPswEmail', ' Te rog introdu o adresa de email valida.').isEmail();

    const email = req.body.forgotPswEmail;


    const errors = req.validationErrors();

    if (errors) {
        req.flash('error_msg', errors);
        return res.redirect(urlPaths.forgotPassword);
    }

  


    try {
        const db = await dbPromise;

        const [userDetails] = await db.execute('SELECT email FROM users WHERE email = ?', [email]);

        if (userDetails.length === 0) {
            req.flash('error_msg', {
                msg: 'Contul cu adresa de e-mail respectivă nu există.'
            });
            return res.redirect(urlPaths.forgotPassword)

        } else {

            let token = await new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, buffer) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(buffer.toString('hex'));
                })
            })


            await Promise.all([

                db.execute('UPDATE users SET forgotPasswordToken = ? , forgotPasswordTokenExpires = TIMESTAMPADD(HOUR, 1, NOW())  WHERE email = ?', [token, email]),

                send_emails.forgotPassword(req, res, next, nodemailer, email, token)
            ])

            req.flash('success_msg', {
                msg: `A fost trimis un e-mail la
                ${email} cu instrucțiuni suplimentare.`
            });
            res.redirect(urlPaths.forgotPassword);

        }



    } catch (err) {
        console.log(err)

    }


}






//forgot password reset 
module.exports.getForgotPasswordReset = async (req, res, next) => {

    try {
        const db = await dbPromise;
        const [userDetails] = await db.execute('SELECT users.forgotPasswordtoken , users.forgotPasswordTokenExpires FROM  users WHERE forgotPasswordtoken = ? AND forgotPasswordTokenExpires > NOW()', [req.params.token]);

        if (userDetails.length === 0) {
            req.flash('error_msg', {
                msg: 'Resetarea parolei nu este validă sau a expirat.'
            })
            res.render('./users/settings/forgot_password_reset');
        } else {

            res.render('./users/settings/forgot_password_reset', {
                'result': userDetails[0]

            })
        }


    } catch (err) {
        console.log(err)
    }


}

module.exports.postForgotPasswordReset = async (req, res, next) => {

    let password = req.body.newPassword;
    let confirm = req.body.confirmNewPassword
    req.checkBody('newPassword', 'Password must be between 6-100 characters long.').len(6, 100);
    req.checkBody('confirmNewPassword', 'Passwords do not match').equals(req.body.newPassword);


    const errors = req.validationErrors();

    if (errors) {
        req.flash('error_msg', errors);
        return res.redirect(urlPaths.back);
    }



    try {

        const db = await dbPromise;

        const [userDetails] = await db.execute('SELECT users.id, users.email,users.first_name,users.password, users.forgotPasswordtoken,users.forgotPasswordTokenExpires,users.type  FROM  users WHERE forgotPasswordToken = ? AND forgotPasswordTokenExpires > NOW()', [req.params.token]);

        if (userDetails.length === 0) {
            req.flash('error_msg', {
                msg: 'Resetarea parolei nu este validă sau a expirat.'
            })
            res.redirect(urlPaths.forgotPassword)

        }

        const hashPassword = await bcrypt.hash(password, saltRounds);



        await Promise.all([
            db.query('UPDATE  users SET password = ? WHERE forgotPasswordToken = ? AND forgotPasswordTokenExpires > NOW()', [hashPassword, req.params.token]),

            send_emails.forgotPasswordSucess(req, res, next, nodemailer, userDetails[0].email)

        ])

        await new Promise(function (resolve, reject) {
            req.login(userDetails[0], function (err, data) {
                if (err) reject(err);
                else resolve(data);
            });
        })



        req.flash('success_msg', {
            msg: 'Parola dvs. a fost schimbată.'
        });
        res.redirect(urlPaths.profile)



    } catch (err) {
        console.log(err)
    }



}




///verify email after signup
module.exports.getCheckEmail = async (req, res, next) => {

    const token = req.params.token



    try {
        const db = await dbPromise;

        const [userDetails] = await db.execute('SELECT id, password,type, email,first_name, last_name FROM users where email_confirmation_token = ? AND email_token_expire > NOW()', [token]);

        if (userDetails.length > 0) {
            await db.execute('UPDATE users SET email_status = ? WHERE email_confirmation_token = ? AND email_token_expire > NOW()', ['verified', token]);

            await db.execute('UPDATE users SET email_confirmation_token = ? WHERE id = ? ', [null, userDetails[0].id])

            await new Promise(function (resolve, reject) {
                req.login(userDetails[0], function (err, data) {
                    if (err) reject(err);
                    else resolve(data);
                });
            })

            req.flash('success_msg', {
                msg: "Emailul dvs. a fost verificat cu succes.Va multumim!"
            });
            res.redirect(urlPaths.profile)

        } else {
            req.flash('error_msg', {
                msg: "Ne pare rau din pacate nu am putut sa va verificam emailul sau tokenul a expirat"
            });
            res.redirect(urlPaths.login)
        }

    } catch (err) {
        console.log(err)
    }


}

module.exports.getResendEmailCheck = async (req, res, nexr) => {


    try {
        const db = await dbPromise;

        const [results] = await db.execute('select id,email,email_status from users where id = ?', [req.user.id]);

        if (results[0].email_status === 'unverified' || results[0].email_status === null) {

            res.render('./users/settings/resend_email_check_form', {
                'results': results[0]
            })

        } else {

            res.redirect(urlPaths.profile)
        }

    } catch (err) {
        console.log(err)
    }


}
module.exports.postResendEmailCheck = async (req, res, next) => {




    try {
        const db = await dbPromise;

        const [userDetails] = await db.execute('select id,email from users where id = ?', [req.user.id]);

        const token = await new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buffer) => {
                if (err) {
                    reject(err)
                }
                resolve(buffer.toString('hex'));
            })
        })

        await Promise.all([

            db.execute('UPDATE users SET email_token_expire = TIMESTAMPADD(HOUR, 1, NOW()),email_confirmation_token = ? WHERE  id = ? ', [token, req.user.id]),


            send_emails.checkEmailAfterSignUp(req, res, nodemailer, userDetails[0].email, token),

            req.logout()

        ])

        req.flash('info_msg', {
            msg: `A fost trimis un e-mail la ${userDetails[0].email} cu instrucțiuni suplimentare.`
        });

        res.redirect(urlPaths.profile);

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

    req.checkBody('password', 'Parola este necesara.').len(1, 100)
    req.checkBody('newEmail', 'Email nu este valid.').isEmail();

    const errors = req.validationErrors();

    if (errors) {
        req.flash('error_msg', errors);
        return res.redirect(urlPaths.changeEmail)

    }




    try {

        const conn = await dbPromise;


        const [userDetails] = await conn.execute("SELECT users.id,users.email, users.password  FROM users WHERE id  = ? ", [req.user.id]);


        if (userDetails[0].email === email) {
            req.flash('error_msg', {
                msg: 'E-mailul este deja în uz.Utilizați un alt e-mail'
            });
            return res.redirect(urlPaths.changeEmail)


        }

        const match = await bcrypt.compare(password, userDetails[0].password);

        if (!match) {
            req.flash('error_msg', {
                msg: 'Parola e gresita.Incerca-ti din nou.'
            });

            return res.redirect(urlPaths.changeEmail)

        } else {

            const token = await new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, buffer) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(buffer.toString('hex'));
                })
            })


            await Promise.all([

                conn.execute('UPDATE users SET email = ?, email_status = ?,email_confirmation_token = ? , email_token_expire = TIMESTAMPADD(HOUR, 2, NOW()) WHERE id = ? ', [email, 'unverified', token, req.user.id]),

                send_emails.checkEmailAfterSignUp(req, res, nodemailer, email, token),

                req.logout()
            ])


            req.flash('info_msg', {
                msg: `A fost trimis un e-mail la ${email} cu instrucțiuni suplimentare.`
            });

            res.redirect(urlPaths.login)

        }

    } catch (err) {
        console.log(err)
    }

}

module.exports.getSettings = (req, res, next) => {
    res.render('./users/settings/settings')
}