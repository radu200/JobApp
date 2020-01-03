const { dbPromise, db } = require(".././config/database.js");


//Login required middleware
module.exports.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/api/login");
  }
};

/// middleware for user access controll
module.exports.employer = function (req, res, next) {
  if (req.user.type === "employer") {
    return next();
  } else {
    res.redirect("/api/login");
  }
};

module.exports.jobSeeker = function (req, res, next) {
  if (req.user.type === "jobseeker") {
    return next();
  } else {
    res.redirect("/api/login");
  }
};

module.exports.admin = function (req, res, next) {
  if (req.user.type === "admin") {
    return next();
  } else {
    res.redirect("/api/login");
  }
};


module.exports.ensureEmailChecked = (req, res, next) => {
  db.query(
    "select id, email,email_status from users where id = ? ",
    [req.user.id],
    (err, results) => {
      if (err) throw err;

      if (
        results[0].email_status === "unverified" ||
        results[0].email_status === null
      ) {
        res.redirect("/api/resend/email/check");
      } else {
        return next();
      }
    }
  );
};



module.exports.authRole = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      'role': req.user.type,
      'auth': true
    })
  }
}


// job post membership check middleware for server-side rendering
module.exports.membershipJob = async (req, res, next) => {

  try {
    const db = await dbPromise;
    const userId = req.user.id
    const presentDate = Date.now()
    const [member] = await db.execute('SELECT membership_approved_date, jobs.id as jobId FROM users LEFT JOIN jobs ON users.id = jobs.employer_id WHERE users.id = ?', [userId])

    const mDate = member[0].membership_approved_date
    const jobsId = member.map(job => job.jobId)
    const jobLen = jobsId && jobsId.length

    if (mDate < presentDate && jobLen > 1) {
      req.flash("warning_msg", {
        msg:
          "Pentru a posta mai multe locuri de muncă, trebuie să fii membru"
      })
      res.redirect('back')
    } else if (mDate > presentDate) {
      return next()
    } else {
      return next()
    }
  } catch (e) {
    console.log(e)
  }
}

//  membership check middleware for client side SPA Pages
module.exports.membership = async (req, res, next) => {

  try {
    const db = await dbPromise;
    const userId = req.user.id
    const presentDate = Date.now()
    const [member] = await db.execute('SELECT membership_approved_date FROM users WHERE users.id = ?', [userId])

    const mDate = member[0].membership_approved_date

    if (mDate < presentDate) {
      res.json({ member: false })

    } else if (mDate > presentDate) {
      res.json({ member: true })
    }
  } catch (e) {
    res.status(500)
  }
}



///auth json res
module.exports.ensureAuthenticatedJ = function (req, res, next) {
  try {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(404).json('Te rog logheaza-te');
    }

  } catch (err) {
    res.status(500).json("Server Error")
  }
};

/// middleware for user access controll
module.exports.employerJ = function (req, res, next) {
  try {
    if (req.user.type === "employer") {
      return next();
    } else {
      res.status(404).json('Te rog logheaza-te');
    }

  } catch (err) {
    res.status(500).json("Server Error")

  };
}

module.exports.jobSeekerJ = function (req, res, next) {
  try {
    if (req.user.type === "jobseeker") {
      return next();
    } else {
      res.status(404).json('Te rog logheaza-te');
    }

  } catch (err) {
    res.status(500).json("Server Error")

  }
}