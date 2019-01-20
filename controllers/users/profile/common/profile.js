const db = require('../../../.././config/database.js');
const fs = require('fs')
const sharp = require('sharp')
const { check, validationResult } = require('express-validator/check');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10;

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



///change password within profile
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
                    return res.redirect('/password/reset')
                } else if (result === true) {
                    bcrypt.hash(newPassword, saltRounds, function (err, hash) {
                        db.query('UPDATE users SET password = ? WHERE id = ? ', [hash, req.user.id], function (err, result) {
                            if (err) throw err
                            console.log('success')
                        })

                    })

                    const transwerporter = nodemailer.createTransport({
                        service: 'gmail',
                        host: 'smtp.gmail.com',
                        auth: {
                            user: process.env.MAIL_USER,
                            pass: process.env.MAIL_PASSWORD
                        }


                    });


                    //send email that password was updated
               
                    const mailOptions = {
                        to: rows[0].email,
                        from: 'JOB APP',
                        subject: 'Parola dvs. a fost schimbată',
                        html: ` <body bgcolor="#e1e5e8" style="margin-top:0 ;margin-bottom:0 ;margin-right:0 ;margin-left:0 ;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;background-color:#e1e5e8;">
                          <center style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#e1e5e8;">
                            <div style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;">
                              <table align="center" cellpadding="0" style="border-spacing:0;font-family:'Muli',Arial,sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;">
                                <tbody>
                                  <tr>
                                    <td align="center"><h1 style="color:white;background: red; padding: 20px 0; margin: 50px; width:100px">JOB APP</h1></td>
                                  </tr>
                                  <!-- Start of Email Body-->
                                  <tr>
                                    <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;background-color:#ffffff;">
                                   
                                      <table style="border-spacing:0;" width="100%">
                                        <tbody>
                                        
                                          <tr>
                                            <td class="inner contents center" style="padding-top:15px;padding-bottom:15px;padding-right:30px;padding-left:30px;text-align:left;">
                                              <center>
                                                <p class="h1 center" style="Margin:0;text-align:center;font-family:'flama-condensed','Arial Narrow',Arial;font-weight:100;font-size:30px;Margin-bottom:26px;">Parola dvs. a fost schimbată</p>
                                                <!--[if (gte mso 9)|(IE)]><![endif]-->
                        
                                                <p class="description center" style="font-family:'Muli','Arial Narrow',Arial;Margin:0;text-align:center;max-width:320px;color:#a1a8ad;line-height:24px;font-size:15px;Margin-bottom:10px;margin-left: auto; margin-right: auto;"><span style="color: rgb(161, 168, 173); font-family: Muli, &quot;Arial Narrow&quot;, Arial; font-size: 15px; text-align: center; background-color: rgb(255, 255, 255);">Aceasta este o confirmare că parola pentru contul dvs. tocmai a fost modificată</span></p>
                                                <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;font-size:15px;color:#a1a8ad;line-height:23px;">Daca nu a fost dvs. va rog sa ne contactati la:
                                                    <nobr><a class="tel" href="tel:2128102899" style="color:#a1a8ad;text-decoration:none;" target="_blank"><span style="white-space: nowrap">212.810.2899</span></a></nobr>
                                                  </p>
                                  
                                                  <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;font-size:15px;color:#a1a8ad;line-height:23px;">or email <a href="mailto:hello@vervewine.com" style="color:#a1a8ad;text-decoration:underline;" target="_blank">hello@mail.com</a></p>
                                              
                                                <!-- <button style="border: none; color:white; background-color:#2196F3 ;padding:14px 60px;cursor: pointer; display: inline-block;">Reset password</button> -->
                                              </center>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                   
                                    </td>
                                  </tr>
                                  <!-- End of Email Body-->
                                  <!-- whitespace -->
                                  <tr>
                                    <td height="40">
                                      <p style="line-height: 40px; padding: 0 0 0 0; margin: 0 0 0 0;">&nbsp;</p>
                        
                                      <p>&nbsp;</p>
                                    </td>
                                  </tr>
                                  <!-- Social Media -->
                                  <tr>
                                    <td align="center" style="padding-bottom:0;padding-right:0;padding-left:0;padding-top:0px;" valign="middle"><span class="sg-image" data-imagelibrary="%7B%22width%22%3A%228%22%2C%22height%22%3A18%2C%22alt_text%22%3A%22Facebook%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/0a1d076f825eb13bd17a878618a1f749835853a3a3cce49111ac7f18255f10173ecf06d2b5bd711d6207fbade2a3779328e63e26a3bfea5fe07bf7355823567d.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"><a href="https://www.facebook.com/vervewine/" target="_blank"><img alt="Facebook" height="18" src="https://marketing-image-production.s3.amazonaws.com/uploads/0a1d076f825eb13bd17a878618a1f749835853a3a3cce49111ac7f18255f10173ecf06d2b5bd711d6207fbade2a3779328e63e26a3bfea5fe07bf7355823567d.png" style="border-width: 0px; margin-right: 21px; margin-left: 21px; width: 8px; height: 18px;" width="8"></a></span>
                                      <!--[if gte mso 9]>&nbsp;&nbsp;&nbsp;<![endif]--><span class="sg-image" data-imagelibrary="%7B%22width%22%3A%2223%22%2C%22height%22%3A18%2C%22alt_text%22%3A%22Twitter%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/6234335b200b187dda8644356bbf58d946eefadae92852cca49fea227cf169f44902dbf1698326466ef192bf122aa943d61bc5b092d06e6a940add1368d7fb71.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"><a href="https://twitter.com/vervewine" target="_blank"><img alt="Twitter" height="18" src="https://marketing-image-production.s3.amazonaws.com/uploads/6234335b200b187dda8644356bbf58d946eefadae92852cca49fea227cf169f44902dbf1698326466ef192bf122aa943d61bc5b092d06e6a940add1368d7fb71.png" style="border-width: 0px; margin-right: 16px; margin-left: 16px; width: 23px; height: 18px;" width="23"></a></span>
                                      <!--[if gte mso 9]>&nbsp;&nbsp;&nbsp;&nbsp;<![endif]--><span class="sg-image" data-imagelibrary="%7B%22width%22%3A%2218%22%2C%22height%22%3A18%2C%22alt_text%22%3A%22Instagram%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/650ae3aa9987d91a188878413209c1d8d9b15d7d78854f0c65af44cab64e6c847fd576f673ebef2b04e5a321dc4fed51160661f72724f1b8df8d20baff80c46a.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"><a href="https://www.instagram.com/vervewine/" target="_blank"><img alt="Instagram" height="18" src="https://marketing-image-production.s3.amazonaws.com/uploads/650ae3aa9987d91a188878413209c1d8d9b15d7d78854f0c65af44cab64e6c847fd576f673ebef2b04e5a321dc4fed51160661f72724f1b8df8d20baff80c46a.png" style="border-width: 0px; margin-right: 16px; margin-left: 16px; width: 18px; height: 18px;" width="18"></a></span></td>
                                  </tr>
                                  <!-- whitespace -->
                                  <tr>
                                    <td height="25">
                                      <p style="line-height: 25px; padding: 0 0 0 0; margin: 0 0 0 0;">&nbsp;</p>
                        
                                      <p>&nbsp;</p>
                                    </td>
                                  </tr>
                                  <!-- Footer -->
                                  <tr>
                                    <td style="padding-top:0;padding-bottom:0;padding-right:30px;padding-left:30px;text-align:center;Margin-right:auto;Margin-left:auto;">
                                      <center>
                                        <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;font-size:15px;color:#a1a8ad;line-height:23px;">Probleme sau intrebari contacteaza-ne la
                                          <nobr><a class="tel" href="tel:2128102899" style="color:#a1a8ad;text-decoration:none;" target="_blank"><span style="white-space: nowrap">212.810.2899</span></a></nobr>
                                        </p>
                        
                                        <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;font-size:15px;color:#a1a8ad;line-height:23px;">or email <a href="mailto:hello@vervewine.com" style="color:#a1a8ad;text-decoration:underline;" target="_blank">hello@mail.com</a></p>
                        
                                      </center>
                                    </td>
                                  </tr>
                                  <!-- whitespace -->
                                  <tr>
                                    <td height="40">
                                      <p style="line-height: 40px; padding: 0 0 0 0; margin: 0 0 0 0;">&nbsp;</p>
                        
                                      <p>&nbsp;</p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </center>
                        </body>`

                    };

                    transwerporter.sendMail(mailOptions, (err) => {
                        if (err) {
                            req.flash('error_msg', errors);

                        } else {
                            req.flash('success_msg', {
                                msg: 'Parola dvs. a fost schimbată.'
                            });
                            res.redirect('/password/reset')
                        }
                        transwerporter.close();
                    });

                    req.flash('success_msg', {
                        msg: 'Parola dvs. a fost schimbată.'
                    });
                    res.redirect('/password/reset')
                }
            })

        }
    })
}



//forgot password

module.exports.getForgotPassword = (req,res,next) => {
    res.render('./profile/common/forgot_password');
   
    
}

//forgot password
module.exports.postForgotPassword = (req, res, next) => {
    req.checkBody('forgotPswEmail', ' Te rog introdu o adresa de email valida.').isEmail();
    
    const errors = req.validationErrors();

    if (errors) {
        req.flash('error_msg', errors);
        return res.redirect('/forgot/password');
    }
    sendTokenResetPassword(req, res, next);
}


function sendTokenResetPassword(req, res, next) {
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
                    forgotPasswordToken:token
                }
                db.query('UPDATE users SET ?, forgotPasswordTokenExpires = TIMESTAMPADD(HOUR, 1, NOW())  WHERE email = ? ', [updateToken, email], function (error, result) {
                    if (error) throw error

                })


                ///send email with token
                const transwerporter = nodemailer.createTransport({
                    service: 'GMAIL',
                    auth: {
                        user: process.env.MAIL_USER,
                        pass: process.env.MAIL_PASSWORD
                    }


                });

                const mailOptions = {
                    to: email,
                    from: 'JOB APP',
                    subject: 'Reseteaza parola',
                    html: `
<body bgcolor="#e1e5e8" style="margin-top:0 ;margin-bottom:0 ;margin-right:0 ;margin-left:0 ;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;background-color:#e1e5e8;">
 
  <center style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#e1e5e8;">
    <div style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;">
      <table align="center" cellpadding="0" style="border-spacing:0;font-family:'Muli',Arial,sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;">
        <tbody>
          <tr>
            <td align="center"><h1 style="color:white;background: red; padding: 20px 0; margin: 50px; width:100px">JOB APP</h1></td>
          </tr>
          <!-- Start of Email Body-->
          <tr>
            <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;background-color:#ffffff;">
           
              <table style="border-spacing:0;" width="100%">
                <tbody>
                
                  <tr>
                    <td class="inner contents center" style="padding-top:15px;padding-bottom:15px;padding-right:30px;padding-left:30px;text-align:left;">
                      <center>
                        <p class="h1 center" style="Margin:0;text-align:center;font-family:'flama-condensed','Arial Narrow',Arial;font-weight:100;font-size:30px;Margin-bottom:26px;">Reseteaza Parola Job App</p>
                        <!--[if (gte mso 9)|(IE)]><![endif]-->

                        <p class="description center" style="font-family:'Muli','Arial Narrow',Arial;Margin:0;text-align:center;max-width:320px;color:#a1a8ad;line-height:24px;font-size:15px;Margin-bottom:10px;margin-left: auto; margin-right: auto;"><span style="color: rgb(161, 168, 173); font-family: Muli, &quot;Arial Narrow&quot;, Arial; font-size: 15px; text-align:center; background-color:rgb(255, 255, 255);">
                          Primiți acest e-mail pentru că dvs. (sau altcineva) ați solicitat resetarea parolei pentru contul dvs.</span></p>
                        <p class="description center" style="font-family:'Muli','Arial Narrow',Arial;Margin:0;text-align:center;max-width:320px;color:#a1a8ad;line-height:24px;font-size:15px;Margin-bottom:10px;margin-left: auto; margin-right: auto;"><span style="color: rgb(161, 168, 173); font-family: Muli, &quot;Arial Narrow&quot;, Arial; font-size: 15px; text-align:center; background-color:rgb(255, 255, 255);">
                            Faceți clic pe butonul de mai jos pentru a finaliza procesul</span></p>
                        <a href="http://${req.headers.host}/forgot/password/reset/${token}"  target="_blank" style="border:none;  margin-bottom: 5px;text-decoration:none; color:white; background-color:#2196F3 ;padding:14px 60px;cursor: pointer; display: inline-block; font-size:20px;">Reseteaza Parola Aici</a> 
                         <p class="description center" style="font-family:'Muli','Arial Narrow',Arial;Margin:0;text-align:center;max-width:320px;color:#a1a8ad;line-height:24px;font-size:15px;Margin-bottom:10px;margin-left: auto; margin-right: auto;"><span style="color: rgb(161, 168, 173); font-family: Muli, &quot;Arial Narrow&quot;, Arial; font-size: 15px; text-align:center; background-color:rgb(255, 255, 255);">
                              Acest link va fi valabil doar pentru o oră. Dacă nu ați solicitat acest lucru, ignorați acest e-mail și parola dvs. va rămâne neschimbată.</span></p>
                      </center>
                    </td>
                  </tr>
                </tbody>
              </table>
         
            </td>
          </tr>
          <!-- End of Email Body-->
          <!-- whitespace -->
          <tr>
            <td height="40">
              <p style="line-height: 40px; padding: 0 0 0 0; margin: 0 0 0 0;">&nbsp;</p>

              <p>&nbsp;</p>
            </td>
          </tr>
          <!-- Social Media -->
          <tr>
            <td align="center" style="padding-bottom:0;padding-right:0;padding-left:0;padding-top:0px;" valign="middle"><span class="sg-image" data-imagelibrary="%7B%22width%22%3A%228%22%2C%22height%22%3A18%2C%22alt_text%22%3A%22Facebook%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/0a1d076f825eb13bd17a878618a1f749835853a3a3cce49111ac7f18255f10173ecf06d2b5bd711d6207fbade2a3779328e63e26a3bfea5fe07bf7355823567d.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"><a href="https://www.facebook.com/vervewine/" target="_blank"><img alt="Facebook" height="18" src="https://marketing-image-production.s3.amazonaws.com/uploads/0a1d076f825eb13bd17a878618a1f749835853a3a3cce49111ac7f18255f10173ecf06d2b5bd711d6207fbade2a3779328e63e26a3bfea5fe07bf7355823567d.png" style="border-width: 0px; margin-right: 21px; margin-left: 21px; width: 8px; height: 18px;" width="8"></a></span>
              <!--[if gte mso 9]>&nbsp;&nbsp;&nbsp;<![endif]--><span class="sg-image" data-imagelibrary="%7B%22width%22%3A%2223%22%2C%22height%22%3A18%2C%22alt_text%22%3A%22Twitter%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/6234335b200b187dda8644356bbf58d946eefadae92852cca49fea227cf169f44902dbf1698326466ef192bf122aa943d61bc5b092d06e6a940add1368d7fb71.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"><a href="https://twitter.com/vervewine" target="_blank"><img alt="Twitter" height="18" src="https://marketing-image-production.s3.amazonaws.com/uploads/6234335b200b187dda8644356bbf58d946eefadae92852cca49fea227cf169f44902dbf1698326466ef192bf122aa943d61bc5b092d06e6a940add1368d7fb71.png" style="border-width: 0px; margin-right: 16px; margin-left: 16px; width: 23px; height: 18px;" width="23"></a></span>
              <!--[if gte mso 9]>&nbsp;&nbsp;&nbsp;&nbsp;<![endif]--><span class="sg-image" data-imagelibrary="%7B%22width%22%3A%2218%22%2C%22height%22%3A18%2C%22alt_text%22%3A%22Instagram%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/650ae3aa9987d91a188878413209c1d8d9b15d7d78854f0c65af44cab64e6c847fd576f673ebef2b04e5a321dc4fed51160661f72724f1b8df8d20baff80c46a.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"><a href="https://www.instagram.com/vervewine/" target="_blank"><img alt="Instagram" height="18" src="https://marketing-image-production.s3.amazonaws.com/uploads/650ae3aa9987d91a188878413209c1d8d9b15d7d78854f0c65af44cab64e6c847fd576f673ebef2b04e5a321dc4fed51160661f72724f1b8df8d20baff80c46a.png" style="border-width: 0px; margin-right: 16px; margin-left: 16px; width: 18px; height: 18px;" width="18"></a></span></td>
          </tr>
          <!-- whitespace -->
          <tr>
            <td height="25">
              <p style="line-height: 25px; padding: 0 0 0 0; margin: 0 0 0 0;">&nbsp;</p>

              <p>&nbsp;</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding-top:0;padding-bottom:0;padding-right:30px;padding-left:30px;text-align:center;Margin-right:auto;Margin-left:auto;">
              <center>
                <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;font-size:15px;color:#a1a8ad;line-height:23px;">
                  Probleme sau întrebări ? Contacteaza-ne la
                  <nobr><a class="tel" href="tel:2128102899" style="color:#a1a8ad;text-decoration:none;" target="_blank"><span style="white-space: nowrap">212.810.2899</span></a></nobr>
                </p>

                <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;font-size:15px;color:#a1a8ad;line-height:23px;">or email <a href="mailto:hello@vervewine.com" style="color:#a1a8ad;text-decoration:underline;" target="_blank">hello@mail.com</a></p>

              </center>
            </td>
          </tr>
          <!-- whitespace -->
          <tr>
            <td height="40">
              <p style="line-height: 40px; padding: 0 0 0 0; margin: 0 0 0 0;">&nbsp;</p>

              <p>&nbsp;</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </center>
                    
                    
                    
                    
                    `,

                };

                transwerporter.sendMail(mailOptions, (err) => {
                    if (err) {
                        req.flash('error_msg', errors);

                        return res.redirect('/forgot/password');
                    }
                });

            });
            req.flash('success_msg', {
                msg: `A fost trimis un e-mail la
                 ${email} cu instrucțiuni suplimentare.`
            });
            res.redirect('/forgot/password');


        }
    });
}



//forgot password reset 
 module.exports.getForgotPasswordReset = (req, res,next ) => {
        db.query('SELECT users.password, users.forgotPasswordtoken , users.forgotPasswordTokenExpires FROM  users WHERE forgotPasswordtoken = ? AND forgotPasswordTokenExpires > NOW()', [req.params.token], function (err, rows, fields) {
        if (err) throw err;

        if (!rows.length) {
            req.flash('error_msg', {
                msg: 'Password reset token is invalid or has expired.'
            })
             res.render('./profile/common/forgot_password_reset');
        } else {

            res.render('./profile/common/forgot_password_reset', {
                'result': rows[0],

            })
        }
    })
 }

 module.exports.postForgotPasswordReset = (req, res,next ) => {
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

                //send email that password was updated
                const transwerporter = nodemailer.createTransport({
                    service: 'GMAIL',
                    auth: {
                        user: process.env.MAIL_USER,
                       pass: process.env.MAIL_PASSWORD
                    }
                });

                const mailOptions = {
                    to: email,
                    from: 'JOB APP',
                    subject: 'Parola dvs. a fost resetata cu success',
                     html: `<body bgcolor="#e1e5e8" style="margin-top:0 ;margin-bottom:0 ;margin-right:0 ;margin-left:0 ;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;background-color:#e1e5e8;">                         
                    <center style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#e1e5e8;">
                      <div style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;">
                        <table align="center" cellpadding="0" style="border-spacing:0;font-family:'Muli',Arial,sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;">
                          <tbody>
                            <tr>
                              <td align="center"><h1 style="color:white;background: red; padding: 20px 0; margin: 50px; width:100px">JOB APP</h1></td>
                            </tr>
                            <!-- Start of Email Body-->
                            <tr>
                              <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;background-color:#ffffff;">
                             
                                <table style="border-spacing:0;" width="100%">
                                  <tbody>
                                  
                                    <tr>
                                      <td class="inner contents center" style="padding-top:15px;padding-bottom:15px;padding-right:30px;padding-left:30px;text-align:left;">
                                        <center>
                                          <p class="h1 center" style="Margin:0;text-align:center;font-family:'flama-condensed','Arial Narrow',Arial;font-weight:100;font-size:30px;Margin-bottom:26px;">Parola dvs. a fost schimbată</p>
                                          <!--[if (gte mso 9)|(IE)]><![endif]-->
                  
                                          <p class="description center" style="font-family:'Muli','Arial Narrow',Arial;Margin:0;text-align:center;max-width:320px;color:#a1a8ad;line-height:24px;font-size:15px;Margin-bottom:10px;margin-left: auto; margin-right: auto;"><span style="color: rgb(161, 168, 173); font-family: Muli, &quot;Arial Narrow&quot;, Arial; font-size: 15px; text-align: center; background-color: rgb(255, 255, 255);">Aceasta este o confirmare că parola pentru contul dvs. tocmai a fost modificată</span></p>
                                          <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;font-size:15px;color:#a1a8ad;line-height:23px;">Daca nu a fost dvs. va rog sa ne contactati la:
                                              <nobr><a class="tel" href="tel:2128102899" style="color:#a1a8ad;text-decoration:none;" target="_blank"><span style="white-space: nowrap">212.810.2899</span></a></nobr>
                                            </p>
                            
                                            <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;font-size:15px;color:#a1a8ad;line-height:23px;">or email <a href="mailto:hello@vervewine.com" style="color:#a1a8ad;text-decoration:underline;" target="_blank">hello@mail.com</a></p>
                                        
                                          <!-- <button style="border: none; color:white; background-color:#2196F3 ;padding:14px 60px;cursor: pointer; display: inline-block;">Reset password</button> -->
                                        </center>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                             
                              </td>
                            </tr>
                            <!-- End of Email Body-->
                            <!-- whitespace -->
                            <tr>
                              <td height="40">
                                <p style="line-height: 40px; padding: 0 0 0 0; margin: 0 0 0 0;">&nbsp;</p>
                  
                                <p>&nbsp;</p>
                              </td>
                            </tr>
                            <!-- Social Media -->
                            <tr>
                              <td align="center" style="padding-bottom:0;padding-right:0;padding-left:0;padding-top:0px;" valign="middle"><span class="sg-image" data-imagelibrary="%7B%22width%22%3A%228%22%2C%22height%22%3A18%2C%22alt_text%22%3A%22Facebook%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/0a1d076f825eb13bd17a878618a1f749835853a3a3cce49111ac7f18255f10173ecf06d2b5bd711d6207fbade2a3779328e63e26a3bfea5fe07bf7355823567d.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"><a href="https://www.facebook.com/vervewine/" target="_blank"><img alt="Facebook" height="18" src="https://marketing-image-production.s3.amazonaws.com/uploads/0a1d076f825eb13bd17a878618a1f749835853a3a3cce49111ac7f18255f10173ecf06d2b5bd711d6207fbade2a3779328e63e26a3bfea5fe07bf7355823567d.png" style="border-width: 0px; margin-right: 21px; margin-left: 21px; width: 8px; height: 18px;" width="8"></a></span>
                                <!--[if gte mso 9]>&nbsp;&nbsp;&nbsp;<![endif]--><span class="sg-image" data-imagelibrary="%7B%22width%22%3A%2223%22%2C%22height%22%3A18%2C%22alt_text%22%3A%22Twitter%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/6234335b200b187dda8644356bbf58d946eefadae92852cca49fea227cf169f44902dbf1698326466ef192bf122aa943d61bc5b092d06e6a940add1368d7fb71.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"><a href="https://twitter.com/vervewine" target="_blank"><img alt="Twitter" height="18" src="https://marketing-image-production.s3.amazonaws.com/uploads/6234335b200b187dda8644356bbf58d946eefadae92852cca49fea227cf169f44902dbf1698326466ef192bf122aa943d61bc5b092d06e6a940add1368d7fb71.png" style="border-width: 0px; margin-right: 16px; margin-left: 16px; width: 23px; height: 18px;" width="23"></a></span>
                                <!--[if gte mso 9]>&nbsp;&nbsp;&nbsp;&nbsp;<![endif]--><span class="sg-image" data-imagelibrary="%7B%22width%22%3A%2218%22%2C%22height%22%3A18%2C%22alt_text%22%3A%22Instagram%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/650ae3aa9987d91a188878413209c1d8d9b15d7d78854f0c65af44cab64e6c847fd576f673ebef2b04e5a321dc4fed51160661f72724f1b8df8d20baff80c46a.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"><a href="https://www.instagram.com/vervewine/" target="_blank"><img alt="Instagram" height="18" src="https://marketing-image-production.s3.amazonaws.com/uploads/650ae3aa9987d91a188878413209c1d8d9b15d7d78854f0c65af44cab64e6c847fd576f673ebef2b04e5a321dc4fed51160661f72724f1b8df8d20baff80c46a.png" style="border-width: 0px; margin-right: 16px; margin-left: 16px; width: 18px; height: 18px;" width="18"></a></span></td>
                            </tr>
                            <!-- whitespace -->
                            <tr>
                              <td height="25">
                                <p style="line-height: 25px; padding: 0 0 0 0; margin: 0 0 0 0;">&nbsp;</p>
                  
                                <p>&nbsp;</p>
                              </td>
                            </tr>
                            <!-- Footer -->
                            <tr>
                              <td style="padding-top:0;padding-bottom:0;padding-right:30px;padding-left:30px;text-align:center;Margin-right:auto;Margin-left:auto;">
                                <center>
                                  <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;font-size:15px;color:#a1a8ad;line-height:23px;">Probleme sau intrebari contacteaza-ne la
                                    <nobr><a class="tel" href="tel:2128102899" style="color:#a1a8ad;text-decoration:none;" target="_blank"><span style="white-space: nowrap">212.810.2899</span></a></nobr>
                                  </p>
                  
                                  <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;font-size:15px;color:#a1a8ad;line-height:23px;">or email <a href="mailto:hello@vervewine.com" style="color:#a1a8ad;text-decoration:underline;" target="_blank">hello@mail.com</a></p>
                  
                                </center>
                              </td>
                            </tr>
                            <!-- whitespace -->
                            <tr>
                              <td height="40">
                                <p style="line-height: 40px; padding: 0 0 0 0; margin: 0 0 0 0;">&nbsp;</p>
                  
                                <p>&nbsp;</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </center>
                  </body>`

                    
                    
                  


                };

                transwerporter.sendMail(mailOptions, (err) => {
                    if (err) {
                        req.flash('error_msg', errors)
                        return res.redirect('/forgot/password');
                    }
                });

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
