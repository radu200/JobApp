const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {db} = require('./database');


module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        // console.log('seriliaze', user)
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        // console.log('deseriliza', user)
        done(null, user);

    });


    passport.use('local-login', new LocalStrategy({
        passReqToCallback: true
    }, function (req, username, password, done) {
        //validation login

        db.query('SELECT id, password,type, email,first_name, last_name FROM users WHERE email = ?', [username], function (error, results, fileds) {
            if (error) {
                done(error)
            }
            //check if email is correct
            else if (!results.length) {
                return done(null, false, req.flash('error_msg', {
                    msg: 'E-mailul sau parola dvs. sunt incorecte. Vă rugăm să încercați din nou '
                }));

            } else {
                const hash = results[0].password
                //check if password is correct 
                bcrypt.compare(password, hash, function (error, response) {
                    if (response === true) {
                        //all went fine, user is found
                        return done(null, results[0]);
                    } else {
                        return done(null, false, req.flash('error_msg', {
                            msg: 'E-mailul sau parola dvs. sunt incorecte. Vă rugăm să încercați din nou '
                        }));

                    }
                })
            }
        });
    }));

}