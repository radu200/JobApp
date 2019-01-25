const db = require('../../../.././config/database.js');
const fs = require('fs')
const sharp = require('sharp')


module.exports.getProfile = (req, res, next) => {
    if (req.user.type === 'employer') {
        db.query('select * from users where id = ? ', [req.user.id], (err, results) => {
            res.render('profile/employer/employer_profile', {
                'result': results[0]
            })
        })

    } else if (req.user.type === "jobseeker") {
        res.render('profile/jobseeker/jobseeker_profile')

    } else {
        res.redirect('/login')
    }
};

module.exports.getProfileAvatarEdit = (req, res, next) => {
    db.query('select id, avatar from users where id = ? ', [req.user.id], (err, results) => {
        res.render('profile/common/profile_avatar_edit', {
            'result': results[0]
        })
    })


}

module.exports.postProfileAvatarEdit = (req, res, next) => {
    db.query(`select id, avatar from users where id=${req.user.id}`, (err, results) => {

        fs.unlink('./public/' + results[0].avatar, function (err) {
            if (err) {
                console.log("failed to delete file:" + err);
            } else {
                console.log('successfully deleted ');
            }
        })


        const errors = req.validationErrors();

        if (errors) {
            req.flash('error_msg', errors);
            return res.redirect('back')
        }


        if (req.file) {
            var avatar = './uploads/' + req.file.filename;
            // resize image
            sharp(req.file.path)
                .resize(200, 157)
                .toFile('./public/uploads/' + req.file.filename, (err, info) => {
                    if (err) {
                        console.log('sharp err', err)
                    } else {

                        //delete old image that was just resized
                        fs.unlink('./public/tmp_folder/' + req.file.filename, function (err) {
                            if (err) {
                                console.log("failed to delete file:" + err);
                            } else {
                                console.log('successfully deleted ');
                            }
                        })

                        console.log('resized success')

                    }
                });


        } else {

            avatar = null;

        }

        let image = {
            avatar: avatar
        }



        //creat employer
        db.query(`update users set ? where id =${req.user.id}`, image, (error, results) => {

            if (err) {
                // console.log('[mysql error]', error)
                res.status(500).json({
                    error: err
                });
            } else {
                res.status(200).json({
                    message: "image succefully edited"
                })
                // console.log(req.file.path)


                //res.redirect('/my_jobs')
            }

        })

    }) //db select query ends

}















// //change email
// module.exports.getChangeEmail = function (req, res, next) {
//     if (req.user.type === 'basic' || req.user.type === 'pro') {
//         db.query('SELECT users.email FROM users WHERE id = ?', [req.user.id], function (err, result) {

//             res.render('./account/all-users/change-email', {
//                 'result': result[0],
//             })
//         })

//     } else if (req.user.type === 'customer') {
//         db.query('SELECT users.email FROM users WHERE id = ?', [req.user.id], function (err, result) {
//             res.render('./account/customer/change-email', {
//                 'result': result[0],
//             })
//         })
//     } else {
//         res.redirect('/login');
//     }
// }



// module.exports.postChangeEmail = function (req, res, next) {
//     let email = req.body.newEmail;
//     let password = req.body.password;



//     req.checkBody('email').optional().isEmail({
//         errorMessage: "email is not valid"
//     })
//     req.checkBody('password', 'Password must be between 6-100 characters long').len(1, 100)

//     const errors = req.validationErrors();

//     if (errors) {
//         req.flash('error_msg', errors);
//         res.redirect('/email/change')
//     }


//     db.query("SELECT users.email FROM users WHERE email  = ? ", [email], function (err, rows) {

//         if (err) {
//             console.log("[mysql error]", err)
//         }

//         if (rows.length) {
//             req.flash('error_msg', {
//                 msg: "Email is already in use.PLease provide another email."
//             })
//             return res.redirect('/email/change')

//         } else {
//             db.query("SELECT users.password ,users.id FROM users WHERE id  = ? ", [req.user.id], function (err, rows) {
//                 let hash = rows[0].password;
//                 if (err) {
//                     throw (err)
//                 }

//                 bcrypt.compare(password, hash, function (error, result) {
//                     if (result === false) {
//                         req.flash('error_msg', {
//                             msg: "Wrong Password"
//                         });
//                         return res.redirect('/email/change')
//                     } else if (result === true) {
//                         crypto.randomBytes(16, function (err, buffer) {
//                             let token = buffer.toString('hex');
//                             db.query('UPDATE users SET email = ?, user_status = ?, 	email_confirmation_token = ? , email_token_expire = TIMESTAMPADD(HOUR, 2, NOW()) WHERE id = ? ', [email, 'unverified', token, rows[0].id], function (err, result) {
//                                 if (err) throw err
//                                 console.log('success')
//                                 ///send email with token
//                                 const transporter = nodemailer.createTransport({
//                                     service: 'MAILGUN',
//                                     auth: {
//                                         user: process.env.MAILGUN_USER,
//                                         pass: process.env.MAILGUN_PASSWORD
//                                     }
//                                 });

//                                 const mailOptions = {
//                                     to: req.body.newEmail,
//                                     from: 'Company ecomerce',
//                                     subject: 'Email Change ',
//                                     text: `You are receiving this email because you (or someone else) request to change email on acount.\n\n
//                          Please click on the following link, or copy and  paste this into your browser to complete the process:\n\n 
//                          http://${req.headers.host}/email/change/${token}\n\n
//                          This link will be valid for only 2 hours.\n\n
//                          If you did not request this, please ignore this email or report this action.\n`,

//                                 };

//                                 transporter.sendMail(mailOptions, (err) => {
//                                     if (err) {
//                                         req.flash('error_msg', errors);

//                                         return res.redirect('/');
//                                     }
//                                 });

//                             })
//                         })

//                     }
//                     req.flash('warning_msg', {
//                         msg: "We sent you an email with futher details to confirm your email.Until confirmation you are not gonna be able to log in."
//                     });
//                     req.logout();
//                     res.redirect('/login')
//                 })

//             })

//         }

//     })

// };