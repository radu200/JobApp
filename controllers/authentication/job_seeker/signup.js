const db = require('../../../config/database.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const request = require('request');
const recaptcha = require('../../../middleware/recaptcha')
const send_emails = require('../../send_emails/send_emails')

module.exports.getSignUpJobSeeker = function (req, res, next) {
    if (req.isAuthenticated()) {
        req.flash('info_msg', {
            msg:"Pentru a va inregistra trebuie sa iesiti din cont."
        })
        res.redirect('/profile')
    } else {
        res.render('authentication/job_seeker/signup', {
            RECAPTCHA_DSKEY: process.env.RECAPTCHA_DSKEY
        })
    }
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
    req.checkBody('password', 'Parola trebuie să aibă între 6-100 de caractere').len(6, 100);
    req.checkBody('confirm_password', 'Parolele nu se potrivesc').equals(req.body.password);
    req.checkBody('terms_conditions', 'Termenii și condițiile sunt necesare').notEmpty();



    let errors = req.validationErrors();

    if (errors) {
        req.flash('error_msg', errors);
        return res.redirect('/signup/jobseeker')
    }


    //check if email exist
    db.query("SELECT email FROM users WHERE email = ?", [email], (err, results) => {
        if (err) throw err
        if (results.length) {

            req.flash('error_msg', {
                msg: 'Această adresă de e-mail este deja luată.'
            });
            res.redirect('/signup/jobseeker')

        } else {
            CreatEmployer(res, req, next)
        }
    })


    function CreatEmployer(res, req, next) {

        recaptcha.GoogleCAPTCHA(req, res);


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
                    avatar: '/images/no_user_image.png',
                    email_confirmation_token: token,
                    terms_conditions: siteRules,
                    email_status: 'unverified'
                }

                //creat employer
                db.query('insert into users set ?', user, (error, results) => {
                    if (error) throw error
                    db.query('UPDATE users SET email_token_expire = TIMESTAMPADD(HOUR, 1, NOW())  WHERE  email_confirmation_token = ? ', [token], function (error, result) {
                        if (error) throw error
                        send_emails.checkEmailAfterSignUp(req, res, nodemailer, email, token)

                    })

                });

                req.flash('warning_msg', {
                    msg: "Vă mulțumim pentru înregistrarea pe site-ul nostru. V-am trimis un e-mail cu detalii suplimentare pentru a vă confirma e-mailul"
                });

                res.redirect('back')

            })

        })
    }
};