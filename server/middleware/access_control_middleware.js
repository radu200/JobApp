const { dbPromise } = require(".././config/database.js");

//Login required middleware
module.exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/api/login");
  }
};

/// middleware for user access controll
module.exports.employer = function(req, res, next) {
  if (req.user.type === "employer") {
    return next();
  } else {
    res.redirect("/api/login");
  }
};

module.exports.jobSeeker = function(req, res, next) {
  if (req.user.type === "jobseeker") {
    return next();
  } else {
    res.redirect("/api/login");
  }
};

module.exports.admin = function(req, res, next) {
  if (req.user.type === "admin") {
    return next();
  } else {
    res.redirect("/api/login");
  }
};

module.exports.ensureEmailChecked = async (req, res, next) => {
  const db = await dbPromise;
  const [
    results,
  ] = await db.execute(
    "select id, email,email_status from users where id = ? ",
    [req.user.id],
  );

  if (
    results[0].email_status === "unverified" ||
    results[0].email_status === null
  ) {
    res.redirect("/api/resend/email/check");
  } else {
    return next();
  }
};

module.exports.authRole = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      role: req.user.type,
      user_id: req.user.id,
      auth: true,
    });
  } else {
    res.json({
      role: null,
      user_id: null,
      auth: false,
    });
  }
};

// job post membership check middleware for server-side rendering
module.exports.membershipJob = async (req, res, next) => {
  try {
    const db = await dbPromise;
    const userId = req.user.id;
    const presentDate = Date.now();
    const [
      member,
    ] = await db.execute(
      "SELECT membership_approved_date, jobs_limit , jobs.id as jobId, jobs.job_posted_date,  jobs.status FROM users LEFT JOIN jobs ON users.id = jobs.employer_id WHERE users.id = ?",
      [userId],
    );

    const mDate = member[0].membership_approved_date;
    const mJobLimit = member[0].jobs_limit;
    const job_status = member[0].status;
    const jobsId = member.filter(job => job.jobId && job.jobId);
    const job_posted_date = member[0].job_posted_date;
    const jobLen = jobsId.length;
    const jobLimit = 30;
    console.log(typeof mJobLimit);

    if ((mDate > presentDate && mJobLimit < jobLimit) || jobLen < 1) {
      return next();
    } else if (jobLen === 1) {
      const daysDif = timeDifference(presentDate, job_posted_date);

      if (job_status === "removed" && daysDif < jobLimit) {
        req.flash("warning_msg", {
          msg:
            "Pentru a posta mai multe locuri de muncă luna acesta, trebuie să fii detinatorul la profil Premium",
        });

        return res.redirect("back");
      }
    } else if (mJobLimit > jobLimit) {
      req.flash("warning_msg", {
        msg:
          "Limita locuri de muncă postate de dvs. a fost depasita va rog sa ne contacta-ti pentru a va mari limita sau pute-ti sa sterge din unele posturi",
      });
      return res.redirect("back");
    }
    req.flash("warning_msg", {
      msg:
        "Pentru a posta mai multe locuri de muncă, trebuie să fii detinatorul la profil Premium",
    });
    return res.redirect("back");
  } catch (e) {}
};

//d1 takes date.now as params
// d2 takes past date
// function computing difference between dates
function timeDifference(d1, d2) {
  const Difference_In_Time = d1 - d2.getTime();

  // To calculate the no. of days between two dates
  const Days = Difference_In_Time / (1000 * 3600 * 24);

  return Days;
}

//  membership check middleware for client side SPA Pages
module.exports.membership = async (req, res, next) => {
  try {
    const db = await dbPromise;
    const userId = req.user.id;
    const presentDate = Date.now();
    const [
      member,
    ] = await db.execute(
      "SELECT membership_approved_date FROM users WHERE users.id = ?",
      [userId],
    );

    const mDate = member[0].membership_approved_date;
    if (mDate > presentDate) {
      return res.json({ member: true });
    }
    res.json({ member: false });
  } catch (e) {
    res.status(500).json("Membership is not valid");
  }
};

module.exports.checkMembership = async (req, res, next) => {
  try {
    const db = await dbPromise;
    const userId = req.user.id;
    const presentDate = Date.now();
    const [
      member,
    ] = await db.execute(
      "SELECT membership_approved_date FROM users WHERE users.id = ?",
      [userId],
    );

    const mDate = member[0].membership_approved_date;

    if (mDate > presentDate) {
      return next();
    }
    return res.status(404).json("Membership is not valid");
  } catch (e) {
    res.status(500).json("Server err");
  }
};

///auth json res
module.exports.ensureAuthenticatedJ = function(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(404).json("Te rog logheaza-te");
    }
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

/// middleware for user access controll
module.exports.employerJ = function(req, res, next) {
  try {
    if (req.user.type === "employer") {
      return next();
    } else {
      res.status(404).json("Te rog logheaza-te");
    }
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

module.exports.jobSeekerJ = function(req, res, next) {
  try {
    if (req.user.type === "jobseeker") {
      return next();
    } else {
      res.status(404).json("Te rog logheaza-te");
    }
  } catch (err) {
    res.status(500).json("Server Error");
  }
};
