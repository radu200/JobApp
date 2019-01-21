const db = require('../../../config/database.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const request = require('request');

module.exports.getSignUpEmployer = function (req, res, next) {
    res.render('authentication/employer/signup',{
        RECAPTCHA_DSKEY:process.env.RECAPTCHA_DSKEY
    })
};

module.exports.postSignUpEmployer = function (req, res, next) {

    //get input values
    const email = req.body.email;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name

    // console.log('email',email)
    // console.log('username',username)
    // console.log('password',password)
    // console.log('confirmpass',confirm_password)
    // console.log('lastmame',last_name)
    // console.log('firstname',first_name)

     //validation
     req.checkBody('email', 'Email is not valid').isEmail();
     req.checkBody('first_name', 'first name is required').notEmpty();
     req.checkBody('first_name', 'first name must be between 3 and  50 characters long.').len(3, 50);
     req.checkBody('last_name', 'last name is required').notEmpty();
     req.checkBody('last_name', 'last name must be between 3 and  50 characters long.').len(3, 50);
     req.checkBody('password', 'Password must be between 6-100 characters long.').len(6,100);
     req.checkBody('confirm_password', 'Passwords do not match').equals(req.body.password);
     
     
     
    let errors = req.validationErrors();
     
     if(errors){
     req.flash('error_msg', errors);
     return res.redirect('/signup/employer')
 } 
 

//check if email exist
db.query("SELECT email FROM users WHERE email = ?",[email], (err, results)  =>{
    if (err) throw err
        if (results.length ){
             console.log('results',results)
            req.flash('error_msg', {msg:'This email is already taken.'});
            res.redirect('/signup/employer')

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
            type: 'employer',
            avatar:'/images/no_user_image.png',
            email_confirmation_token:token,
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
                subject: 'Verificarea email-ului',
                text: `You are receiving this email because you (or someone else) registed on our webite.\n\n
                 Please click on the following link, or copy and  paste this into your browser to complete the process:\n\n 
                 http://${req.headers.host}/account/verify/${token}\n\n
                 This link will be valid for only 1 hour.\n\n
                 If you did not request this, please ignore this email or report this action.\n`,

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
              
            res.redirect('/login')
          
        })

    })
  }
};