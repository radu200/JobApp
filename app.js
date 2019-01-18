const express = require('express');
const http2 = require('http2');
const exphbs = require('express-handlebars');
const path = require('path');
const expressValidator = require('express-validator');
const logger = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const helmet = require('helmet')
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
// Load environment variables from .env file
require('dotenv').config({ path: '.env' })

//Passport configuration.
require('./config/passport')(passport);
//view engine setup
const hbs = exphbs.create({
    viewPath:__dirname+'/views/emails/',
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: [
        'views/partials/',
        'views/partials/NavBars',
    ]
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(compression());
app.use(logger('dev'));
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator({}));
app.use(methodOverride('_method'))
app.use(cookieParser());
//app.use( '/uploads',express.static( 'uploads'));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'public')));


// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//             "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     if (req.method === "OPTIONS") {
//             res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//             return res.status(200).json({});
//         }
//         next();
//     });
    
    
   // app.use(helmet());
   // app.use( helmet.hidePoweredBy() ) ;

    const options = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        //checkExpirationInterval: 9000,
        // expiration: 864
    };
const sessionStore = new MySQLStore(options);
const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour


app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    store: sessionStore,
    resave:false, //session will be saved each time no matter if exist or not
    saveUninitialized: false,  //if it's true session will be stored on server no matter if is something there
    expires: expiryDate //1 hour
    // cookie: {   secure: true, // httpOnly: true, // domain: 'example.com',  //path: 'foo/bar', 
    //},
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.locals.moment = require('moment');
app.use(require('connect-flash')());
app.use(function(req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.session = req.session;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.info_msg = req.flash('info_msg');
    res.locals.warning_msg = req.flash('warning_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    
    next();
});  


///middleware to restrict access in ui in dependece of user
app.use(function(req, res, next) {
    if(req.isAuthenticated() === true){
        res.locals.Employer = function(){
            if(req.user.type === 'employer'){
                return true;
                nex()
            }else{
                return false;
                res.redirect('/login');
            }
        }
        
        res.locals.JobSeeker = function(){
            if(req.user.type === 'jobseeker'){
                return true;
            } else{
                return false;
                res.redirect('/login');
                
            }
            
        }
        
    }
    next();
});







require('./routes/routes.js')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});


