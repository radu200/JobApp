// const nodemailer = require('nodemailer');


// const transporter = nodemailer.createTransport({
  //   service: 'GMAIL',
  //   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASSWORD
//   }
// });

// /**
//  * GET /contact
//  * Contact form page.
//  */

module.exports.getContactUs = (req, res) => {
  res.render('./helpPages/contactUs');
};
// /**
//  * POST /contact
//  * Send a contact form via Nodemailer.
//  */
// module.exports.postContactUs = (req, res) => {

//   const {contactUsEmail,name,subject,message} = req.body


//   req.checkBody('name', 'Numele nu poate fi gol').notEmpty();
//   req.checkBody('name', 'Numele nu poate fi mai mult de 70 de caractere').notEmpty(1,70);
//   req.checkBody('contactUsEmail', 'Emailul nu este Valid').isEmail();
//   req.checkBody('subject', 'Subiectul nu poate fi gol').notEmpty();
//   req.checkBody('subject', 'Subiectul nu poate fi mai mult de 100 caractere').len(1,70);
//   req.checkBody('message', 'Mesajul nu poate fi gol').notEmpty();
//   req.checkBody('message', 'Mesajul nu poate fi mai mult de 500 caractere').len(1,500);

//   const errors = req.validationErrors();

//   if (errors) {
//     req.flash('error_msg',  errors);
//     return res.redirect('/contact-us');
//   }
 
//   const mailOptions = {
//     to:process.env.MAIL_COMPANY,
//     from: `${req.body.name} <${req.body.contactUsEmail}>`,
//     subject:req.body.subject,
//     text: req.body.message
//   };

//   transporter.sendMail(mailOptions, (err) => {
//     if (err) {
//     req.flash('error_msg', errors);
//       return res.redirect('/contact-us');
//     }
//   });
//   req.flash('success_msg', {msg:'Emailul a fost trimis cu succes!'} );
//   res.redirect('/contact-us');
// };