const { dbPromise } = require("../../../config/database.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const crypto = require("crypto");
const recaptcha = require("../../../middleware/recaptcha");
const send_emails = require("../../send_emails/send_emails");
const urlPaths = require("../../utils/url-paths");
const msg = require("../../utils/messages");

module.exports.getSignUpJobSeeker = function(req, res, next) {
  if (req.isAuthenticated()) {
    req.flash("info_msg", {
      msg: "Pentru a va inregistra trebuie sa iesiti din cont."
    });
    res.redirect(urlPaths.profile);
  } else {
    res.render("authentication/job_seeker/signup", {
      RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY
    });
  }
};

module.exports.postSignUpJobSeeker = async (req, res, next) => {
  //get input values
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const siteRules = req.body.terms_conditions;
  const city = req.body.city;

  //validation
  req.checkBody("email", "E-mailul nu este valid").isEmail();
  req.checkBody("first_name", "Prenumele este necesar ").notEmpty();
  req
    .checkBody(
      "first_name",
      "Prenumele trebuie să aibă între 1 și 50 de caractere."
    )
    .len(1, 50);
  req.checkBody("last_name", "Numele de familie este necesar").notEmpty();
  req
    .checkBody(
      "last_name",
      "Numele de familie trebuie să aibă între 1 și 50 de caractere."
    )
    .len(1, 50);
  req
    .checkBody("password", "Parola trebuie să aibă între 6-100 de caractere")
    .len(6, 100);
  req
    .checkBody("confirm_password", "Parolele nu se potrivesc")
    .equals(req.body.password);
  req
    .checkBody("terms_conditions", "Termenii și condițiile sunt necesare")
    .notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    req.flash("error_msg", errors);
    return res.redirect(urlPaths.signUpJobseeker);
  }

  try {
    const db = await dbPromise;

    const [userDetails] = await db.execute(
      "SELECT email FROM users WHERE email = ?",
      [email]
    );

    const GoogleCAPTCHA = await recaptcha.GoogleCAPTCHA(req, res);

    if (userDetails.length) {
      req.flash("error_msg", {
        msg: "Această adresă de e-mail este deja luată."
      });

      res.redirect(urlPaths.signUpJobseeker);
    } else if (GoogleCAPTCHA === false) {
      return res.redirect(urlPaths.back);
    } else {
      const hash = await bcrypt.hash(password, saltRounds);

      const token = await new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buffer) => {
          if (err) {
            reject(err);
          }
          resolve(buffer.toString("hex"));
        });
      });

      let user = {
        password: hash,
        email: email,
        first_name: first_name,
        last_name: last_name,
        type: "jobseeker",
        avatar: null,
        email_confirmation_token: token,
        terms_conditions: siteRules,
        email_status: "verified",
        ip_adress: req.ip,
        software: req.headers["user-agent"],
        preferred_lang: req.acceptsLanguages().toString(),
        job_seeker_location: city,
        blacklist:'no',
        checked:'no'
      };

      await db.query("insert into users set ?", user);

      await db.execute(
        "UPDATE users SET email_token_expire = TIMESTAMPADD(HOUR, 1, NOW())  WHERE  email_confirmation_token = ? ",
        [token]
      );

      // await send_emails.checkEmailAfterSignUp(
      //   req,
      //   res,
      //   nodemailer,
      //   email,
      //   token
      // );

      req.flash("warning_msg", {
        msg:
          "Vă mulțumim pentru înregistrarea pe site-ul nostru."
      });

      res.redirect(urlPaths.login);
    }
  } catch (err) {
    req.flash("error_msg", {
      msg: msg.error
    });
    res.redirect(urlPaths.signUpJobseeker);
  }
};
