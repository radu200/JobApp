const db = require('./../../config/database.js');

module.exports.getChat = (req,res,next) => {
    res.render('pages/chat');
}