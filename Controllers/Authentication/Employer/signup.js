const db = require('../../../Config/database.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports.getSignUpEmployer = function (req, res, next) {
    res.render('Authentication/Employer/signup')
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
     return res.redirect('/employer/signup')
 } 
 

//check if email exist
db.query("SELECT email FROM users WHERE email = ?",[email], (err, results)  =>{
    if (err) throw err
        if (results.length ){
             console.log('results',results)
            req.flash('error_msg', {msg:'This email is already taken.'});
            res.redirect('/employer/signup')

        } else{
            CreatEmployer (res)  
      }
  })


function CreatEmployer (res){
    //hashing
    bcrypt.hash(password, saltRounds, function (err, hash) {

        let user = {
            password: hash,
            email: email,
            first_name: first_name,
            last_name: last_name,
            type: 'employer',

        }

        //creat employer
        db.query('insert into users set ?', user, (error, results) => {
            if (error) throw error
            res.redirect('/')
        })

    })
  }
};