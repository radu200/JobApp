const express = require('express');
const http2 = require('http2');
const exphbs = require('express-handlebars');
const path = require('path');
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


app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');


app.use(express.static(path.join(__dirname, 'public')));

require('./routes/routes.js')(app);


module.exports = app;