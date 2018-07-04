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

//view engine setup
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: [
        'views/partials/',
    ]
});




// Load environment variables from .env file
require('dotenv').config({ path: '.env' })

//Passport configuration.
require('./Config/passport')(passport);


app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator({}));
app.use(cookieParser());


app.use(helmet());
app.use( helmet.hidePoweredBy() ) ;
app.use(methodOverride('_method'))

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




app.use(express.static(path.join(__dirname, 'Public')));

require('./Routes/routes.js')(app);


module.exports = app;