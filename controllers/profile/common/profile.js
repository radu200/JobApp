const db = require('../../../config/database.js');
const fs = require('fs')
const sharp = require('sharp')
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require("nodemailer");

module.exports.getProfile =  (req, res, next) => {
    if(req.user.type === 'employer'){
        db.query('select * from users where id = ? ', [req.user.id], (err, results) => {
            res.render('profile/employer/employer_profile',{
                'result':results[0]
            })
        })
   
    } else if( req.user.type === "jobseeker") {
        res.render('profile/jobseeker/jobseeker_profile')
   
    } else{
        res.redirect('/login')
    }
};

module.exports.getProfileAvatarEdit = (req,res,next) => {
        db.query('select id, avatar from users where id = ? ', [req.user.id], (err, results) => {
            res.render('profile/common/profile_avatar_edit',{
                'result':results[0]
            })
        })
   
    
}

module.exports.postProfileAvatarEdit = (req,res,next) => {
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

                    let images = ['/no_job_image_a.png', '/no_job_image_b.png', '/no_job_image_c.png']; 

                    let  random = images[Math.floor(Math.random() * images.length)];

                    avatar = random;
                  
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

///employer
module.exports.getCompanyInfoEdit =  (req, res, next) => {
   db.query('select id, company_description,company_name, company_location, company_type from users where id = ?', [req.user.id], (err, results) => {
       if (err) throw err
      console.log(results)
       res.render('profile/employer/company_info_edit',{
            'result':results[0]
       })
       console.log(results)
   })

};


//employer

module.exports.getEmployerProfileInfoEdit =  (req, res, next) => {
    db.query('select id, first_name, last_name from users where id = ?', [req.user.id], (err, results) => {
        if (err) throw err
        console.log(results)
        res.render('profile/employer/employer_profile_edit',{
                'result':results[0]
            })
    })
 
 };


 //employer
 module.exports.postEmployerProfileInfoEdit =  (req, res, next) => {
    let  first_name = req.body.first_name_edit;
    let last_name = req.body.last_name_edit;
    // req.checkBody('first_name', 'Prenumele trebuie să aibă o lungime între 1 și 250 de caractere').len(0, 250);
    // req.checkBody('last_name ', 'Numele trebuie să aibă o lungime între 1 și 250 de caractere').len(0, 250);

    const errors = req.validationErrors();

    if (errors) {
        req.flash('error_msg', errors);
         return  res.redirect('back')
    }


    let user = {
        first_name:first_name,
         last_name:last_name
    }
    db.query('update users  set ? where id = ?', [user,req.user.id], (err, results) => {
        if (err) throw err
        console.log(results)
        res.redirect('/profile')
    })
 
 };
 
 //employer
module.exports.postCompanyInfoEdit =  (req, res, next) => {

    const name = req.body.company_name;
    const description = req.body.company_description
    const location = req.body.company_location;
    const type = req.body.company_type;
    
    
    // req.checkBody('company_name ', 'Numele trebuie să aibă o lungime pina la 70 de caractere').len(70);
    // req.checkBody('company_location ', 'Locatia companiei trebuie să fie din litere numai').isString();
    // req.checkBody('company_type ', 'Tipul companiei trebuie să aibă o lungime pina la 70 de caractere').len(70);
    // req.checkBody('company_description', 'Descrierea trebuie să aibă o lungime pina la 250 de caractere').isLength({ min: 1, max:250 });
    
    

 

    const errors = req.validationErrors();

    if (errors) {
       req.flash('error_msg', errors);
        return  res.redirect('back')
    }

    let company = {
         company_name:name,
         company_description:description,
         company_location:location,
         company_type:type
    }
    db.query('update   users set ?  where id = ?', [company,req.user.id], (err, results) => {
        if (err) throw err
       console.log(results)
        res.redirect('/profile')
    })
 
 };
//employer company profile
module.exports.getCompanyProfile = (req,res, next) => {
    
 getCompany (req, res,next);
}
async function getCompany (req, res,next){
    let userId = req.user.id;
    function awaitGetCompany(userId){
        return new Promise(function(resolve, reject){
            db.query("SELECT  avatar,first_name, users.last_name, users.company_name,users.company_description,users.company_location, company_type  FROM  users WHERE users.id = ?" ,[userId] ,function(err, result_employer, fields) {
                if (err) {
                    console.log(err);
                    resolve([]);
                }
                resolve(result_employer); 
                 console.log(result_employer)              

            });
        });
    }
function awaitGetjobs(userId) {
        return new Promise(function(resolve, reject){
            db.query("SELECT * FROM  jobs WHERE jobs.employer_id = ?  ", [userId], function(err, results, fields){
                if(err){
                    console.log(err);
                    resolve([]);
                }
         
                resolve(!err && results ? results : []); 
                console.log('jobs', results)
            });
        });
    }
    let users_result = await awaitGetCompany(userId); 
    let  jobs = await awaitGetjobs(userId);
 
    res.render('profile/employer/company_profile', {
        "job": jobs,
        "employer": users_result[0]
    });

}

module.exports.getChangePassword =  (req, res, next) => {
    res.render('profile/common/password_reset')

};

module.exports.postChangePassword =  (req, res, next) => {
  
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

    db.query("SELECT users.password,users.email FROM users WHERE id = ?", [req.user.id], function (err, rows) {
        if (err) {
            console.log("[mysql error]", err)
        } else {

            let hash = rows[0].password;
           
            bcrypt.compare(oldPassword, hash, function (error, result) {

                if (result === false) {
                    req.flash('error_msg', {
                        msg: "Your old password  is wrong.Please try again."
                    })
                    return res.redirect('/password/reset')
                } else if (result === true) {
                    bcrypt.hash(newPassword, saltRounds, function (err, hash) {
                        db.query('UPDATE users SET password = ? WHERE id = ? ', [hash, req.user.id], function (err, result) {
                            if (err) throw err
                            console.log('success')
                        })

                    })

                    const transwerporter = nodemailer.createTransport({
                        service: 'GMAIL',
                        auth: {
                            user: process.env.MAIL_USER,
                            pass: process.env.MAIL_PASSWORD
                        }


                    });


                    //send email that password was updated

                    const mailOptions = {
                        to: rows[0].email,
                        from: 'JOB APP',
                        subject: 'Your password has been changed',
                        text: `Hello,\n\nThis is a confirmation that the password for your account  has just been changed.\n`

                    };

                    transwerporter.sendMail(mailOptions, (err) => {
                        if (err) {
                            req.flash('error_msg', errors);

                        } else {
                            req.flash('success_msg', {
                                msg: 'Success! Your password has been changed.'
                            });
                            res.redirect('/password/reset')
                        }
                    });

                    req.flash('success_msg', {
                        msg: 'Success! Your password has been changed.'
                    });
                    res.redirect('/password/reset')
                }
            })

        }
    })
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
