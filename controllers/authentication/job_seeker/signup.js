const db = require('../../../config/database.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const request = require('request');



module.exports.getSignUpJobSeeker = function(req, res, next) {
    res.render('authentication/job_seeker/signup',{
        RECAPTCHA_DSKEY:process.env.RECAPTCHA_DSKEY
    })
 };   
 



module.exports.postSignUpJobSeeker = function (req, res, next) {

    //get input values
    const email = req.body.email;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name
    const siteRules = req.body.terms_conditions


     //validation
     req.checkBody('email', 'E-mailul nu este valid').isEmail();
     req.checkBody('first_name', 'Prenumele este necesar ').notEmpty();
     req.checkBody('first_name', 'Prenumele trebuie să aibă între 1 și 50 de caractere.').len(1, 50);
     req.checkBody('last_name', 'Numele de familie este necesar').notEmpty();
     req.checkBody('last_name', 'Numele de familie trebuie să aibă între 1 și 50 de caractere.').len(1, 50);
     req.checkBody('password', 'Parola trebuie să aibă între 6-100 de caractere').len(6,100);
     req.checkBody('confirm_password', 'Parolele nu se potrivesc').equals(req.body.password);
     req.checkBody('terms_conditions', 'Termenii și condițiile sunt necesare').notEmpty();
     
     
     
    let errors = req.validationErrors();
     
     if(errors){
     req.flash('error_msg', errors);
     return res.redirect('/signup/jobseeker')
 } 
 

//check if email exist
db.query("SELECT email FROM users WHERE email = ?",[email], (err, results)  =>{
    if (err) throw err
        if (results.length ){
             console.log('results',results)
            req.flash('error_msg', {msg:'This email is already taken.'});
            res.redirect('/signup/jobseeker')

        } else{
            CreatEmployer (res,req,next)  
      }
  })


function CreatEmployer (res,req,next){

       //   ///recapcha
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


    //hashing
    bcrypt.hash(password, saltRounds, function (err, hash) {
        crypto.randomBytes(16, function (err, buffer) {
            let token = buffer.toString('hex');
        let user = {
            password: hash,
            email: email,
            first_name: first_name,
            last_name: last_name,
            type: 'jobseeker',
            avatar:'/images/no_user_image.png',
            email_confirmation_token:token,
            terms_conditions:siteRules
        }

        //creat employer
        db.query('insert into users set ?', user, (error, results) => {
            if (error) throw error
            db.query('UPDATE users SET email_token_expire = TIMESTAMPADD(HOUR, 1, NOW())  WHERE  email_confirmation_token = ? ', [token], function (error, result) {
                if (error) throw error


                db.query('SELECT id ,type FROM users WHERE email = ? ', [email], function (err, results, fileds) {
                    if (error) throw error

                });

            })
              ///send email with token
              const transporter = nodemailer.createTransport({
                service: 'GMAIL',
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD
                }
            });

            const mailOptions = {
                to: email,
                from: 'JOB APP',
                subject: 'Verificare Email',
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
                          <p class="h1 center" style="Margin:0;text-align:center;font-family:'flama-condensed','Arial Narrow',Arial;font-weight:100;font-size:30px;Margin-bottom:26px;">Verificarea Email</p>
                          <!--[if (gte mso 9)|(IE)]><![endif]-->
  
                          <p class="description center" style="font-family:'Muli','Arial Narrow',Arial;Margin:0;text-align:center;max-width:320px;color:#a1a8ad;line-height:24px;font-size:15px;Margin-bottom:10px;margin-left: auto; margin-right: auto;"><span style="color: rgb(161, 168, 173); font-family: Muli, &quot;Arial Narrow&quot;, Arial; font-size: 15px; text-align: center; background-color: rgb(255, 255, 255);">
                            Va multumim pentru că  va-ați înregistrat pe saitul nostru.</br>
                            Faceți clic pe buttonul  de mai jos  pentru a finaliza procesul:
                          </span></p>
                          <a  href="http://${req.headers.host}/email/verify/${token}" style="border: none; color:white; background-color:#2196F3 ;padding:14px 60px;cursor: pointer; display: inline-block; text-decoration:none;">Confirma Email</a> 
                          <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;font-size:15px;color:#a1a8ad;line-height:23px;">Dacă nu ați solicitat acest lucru, ignorați acest e-mail si raportați. 
                           </p>
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

            transporter.sendMail(mailOptions, (err) => {
                if (err) {
                    req.flash('error_msg', errors);

                    return res.redirect('/back');
                }
            });
        }); //crypto ends
            req.flash('warning_msg', {
                msg: "Vă mulțumim pentru înregistrarea pe site-ul nostru. V-am trimis un e-mail cu detalii suplimentare pentru a vă confirma e-mailul"
            });
              
            res.redirect('back')
          
        })

    })
  }
};