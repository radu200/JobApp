const { dbPromise } = require("../.././config/database.js");
const fs = require("fs");
const fsPromises = fs.promises;
const sharp = require("sharp");
const urlPaths = require(".././utils/url-paths");
const msg = require(".././utils/messages");

module.exports.checkAppliedJobs = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      if (req.user.type === "jobseeker") {
        const db = await dbPromise;
        const jobseeker_id = 16;
        const [
          result,
        ] = await db.execute(
          "SELECT * FROM job_application WHERE jobseeker_id = ?",
          [jobseeker_id],
        );
        res.status(200).json(result);
      }
    } else {
      res.status(404).json("Not Found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
///apply jobs
module.exports.postApplyJobs = async (req, res, next) => {
  const jobseeker_id = req.user.id;
  const job_id = req.query.job_id;
  let job = {
    jobseeker_id: jobseeker_id,
    job_id: job_id,
    status: "active",
  };

  try {
    const db = await dbPromise;
    await db.query(`insert into job_application set ?`, job);
    res.status(200).json("success");
  } catch (err) {
    res.status(500).json(err);
  }
};

///employers see who applied for job
module.exports.jobApplicants = async (req, res) => {
  const { job_id, offset, status } = req.query
  const limit = 6;

  try {
    const db = await dbPromise;
    const user_details = `users.id  as userID, users.first_name, users.last_name,users.type,users.avatar,users.job_seeker_location,users.job_seeker_about_me,users.job_seeker_location `;
    const sql = `SELECT ${user_details}, job_application.jobseeker_id , job_application.job_id, job_application.status
                FROM users LEFT JOIN job_application ON job_application.jobseeker_id = users.id  
                WHERE  job_application.job_id = ? AND job_application.status = ?
                GROUP BY users.id, job_application.status LIMIT ${limit} OFFSET ${offset} `;

    const [results] = await db.query(sql, [job_id, status]);
    res.status(200).json(results);
    
  } catch (err) {
    res.status(500).json('Server Error')
    console.log(err);
  }
};

//change appllicants status
module.exports.jobApplicantsStatus = async (req,res) => {
  const { status, id} = req.query
  try {
    const db = await dbPromise;
    await db.query(`UPDATE job_application SET status = ?  WHERE jobseeker_id = ?`, [status, id])
    res.json('success')
  }catch(err){
    console.log(err)
    res.status(500).json('Server Error')
  }
}
//list of jobs that jobseeker applied, appear on jobseeker profile
module.exports.JobApplicationJobSeeker = async (req, res) => {
  const offset = req.body.offset;
  const limit = 12;
  const userId = req.user.id;
  try {
    const db = await dbPromise;

    const [
      results,
    ] = await db.execute(
      `select job_application.id as appliedJobsId, job_application.job_id, job_application.date, job_application.jobseeker_id ,jobs.id, jobs.category,jobs.position,jobs.image,jobs.employment_type,jobs.city from  job_application LEFT JOIN jobs on job_application.job_id = jobs.id where job_application.jobseeker_id = ? LIMIT ${limit} OFFSET ${offset} `,
      [userId],
    );
    res.status(200).json({ jobs: results });
  } catch (err) {
    res.status(500).json("Server Err");
  }
};

module.exports.getAddJobs = (req, res, next) => {
  res.render("jobs/add_job");
};

module.exports.postAddJobs = async (req, res, next) => {
  const category = req.body.category;
  const position = req.body.position;
  const description = req.body.job_description;
  const city = req.body.city;
  const employment_type = req.body.employment_type;
  const start_time = req.body.immediate_start;
  const salary_from = req.body.salary_from;
  const salary_to = req.body.salary_to;
  const salary_currency = req.body.salary_currency;
  const experience = req.body.experience;
  const language = req.body.language;
  const status = 'active';
  const user_id = req.user.id;

  req.checkBody("category", "Alege Categoria").notEmpty();
  req.checkBody("position", "Poziția  este necesară").notEmpty();
  req
    .checkBody(
      "position",
      " Pozitia trebuie să aibă o lungime între 1 și 70 de caractere",
    )
    .len(1, 70);
  req
    .checkBody(
      "job_description",
      " Descrierea trebuie să aibă o lungime între 1 și 300 de caractere",
    )
    .len(1, 301);
  req.checkBody("city", "Locatia este necesara").notEmpty();
  req.checkBody("employment_type", "Alege tipul de angajare").notEmpty();
  req
    .checkBody(
      "salary",
      "Salariu trebuie să aibă o lungime între 0 și 8 de cifre.",
    )
    .len(0, 9);
  req.checkBody({
    salary: {
      optional: {
        options: {
          checkFalsy: true,
        },
      },
      isDecimal: {
        errorMessage: "Salariu trebuie sa fie decimal",
      },
    },
  });
  req
    .checkBody("salary", "Formatul salariului este incorect")
    .matches(/^\d{0,8}(?:\.\d{0,2})?$/);
  req.checkBody("experience", "Alege experienta").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash("error_msg", errors);
    return res.redirect(urlPaths.addJob);
  }

  try {
    const db = await dbPromise;
    let lang;
    let job_image;

    if (req.file) {
      job_image = "/uploads/jobs/" + req.file.filename;
      //resize image
      await sharp(req.file.path).resize(200, 157);
    } else {
      job_image = null;
    }

    if (language) {
      lang = language.toString();
    }


    let jobs = {
      employer_id: user_id,
      category: category,
      position: position,
      description: description,
      city: city,
      employment_type: employment_type,
      start_time: start_time,
      salary_from: salary_from,
      salary_to: salary_to,
      salary_currency: salary_currency,
      experience: experience,
      language: lang,
      image: job_image,
      status:status
      
    };
     
    //     //creat employer
    await db.query("INSERT INTO jobs SET ?", jobs);
    req.flash("success_msg", {
      msg: "A fost adaugat cu success. Va multumim!",
    });
    const [limit] = await db.execute('SELECT jobs_limit FROM  users where id = ?', [user_id])
    
    const job_limit = limit[0].jobs_limit;
    const new_job_Limit = job_limit + 1
    await db.query('UPDATE users SET jobs_limit = ? where id = ?', [new_job_Limit, user_id])

    res.redirect(urlPaths.MyJobs);
  } catch (err) {
    res.redirect("back");
  }
};

module.exports.getJobImageEdit = async (req, res, next) => {
  try {
    const db = await dbPromise;

    const [
      userDetails,
    ] = await db.execute("select id, image from jobs  where id = ?", [
      req.params.id,
    ]);
    res.render("./jobs/job_edit_image", {
      result: userDetails,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.postJobImageEdit = async (req, res, next) => {
  try {
    let image;
    let id = req.params.id;
    JO;

    const db = await dbPromise;
    const [
      userDetails,
    ] = await db.execute(`select id, image from jobs where id = ?`, [id]);

    if (req.file) {
      image = "/uploads/jobs/" + req.file.filename;
      await sharp(req.file.path).resize(820, 461);
    } else {
      image = null;
    }

    await db.execute(`update jobs set image = ? where id = ?`, [image, id]);

    if (userDetails[0].image !== null && userDetails[0].image !== image) {
      const path = `../files/${userDetails[0].image}`;
      //remove old image if exists
      await fsPromises.unlink(path);
    }

    res.redirect("/api/my-jobs");
  } catch (err) {
    console.log("jobimageEdit", err);

    res.redirect("/api/my-jobs");
  }
};

//employer jobs
module.exports.getEmployerJobs = async (req, res, next) => {
  try {
    const user_id = req.user.id
    const status = 'active'
    const db = await dbPromise;

    const [jobs] = await db.execute(
      "select * from jobs where employer_id = ? AND status = ?  ",
      [user_id, status],
    );

    res.render("profile/employer/employer_jobs", {
      results: jobs,
    });
  } catch (err) {
    console.log(err);

    res.redirect(urlPaths.back);
  }
};

//employer jobs
module.exports.getEmployerJobEdit = async (req, res, next) => {
  try {
    const db = await dbPromise;

    const [jobs] = await db.execute("select * from jobs where id = ? ", [
      req.params.id,
    ]);

    res.render("jobs/jobs_edit_info", {
      result: jobs[0],
    });
  } catch (err) {
    res.redirect(urlPaths.back);
  }
};

//employer jobs
module.exports.postEmployerJobEdit = async (req, res, next) => {
  const category = req.body.category;
  const position = req.body.position;
  const description = req.body.job_description;
  const city = req.body.city;
  const employment_type = req.body.employment_type;
  const start_time = req.body.immediate_start;
  const salary_from = req.body.salary_from;
  const salary_to = req.body.salary_to;
  const experience = req.body.experience;
  const language = req.body.language;
  const salary_currency = req.body.salary_currency;

  req.checkBody("category", "Alege Categoria").notEmpty();
  req.checkBody("position", "Poziția  este necesară").notEmpty();
  req
    .checkBody(
      "position",
      " Pozitia trebuie să aibă o lungime între 1 și 70 de caractere",
    )
    .len(1, 70);
  req
    .checkBody(
      "job_description",
      " Descrierea trebuie să aibă o lungime între 1 și 300 de caractere",
    )
    .len(1, 301);
  req.checkBody("city", "Locatia este necesara").notEmpty();
  req.checkBody("employment_type", "Alege tipul de angajare").notEmpty();
  req
    .checkBody(
      "salary",
      "Salariu trebuie să aibă o lungime între 0 și 8 de cifre.",
    )
    .len(0, 9);
  req.checkBody({
    salary: {
      optional: {
        options: {
          checkFalsy: true,
        },
      },
      isDecimal: {
        errorMessage: "Salariu trebuie sa fie decimal",
      },
    },
  });

  const errors = req.validationErrors();

  if (errors) {
    req.flash("error_msg", errors);
    return res.redirect("back");
  }

  if (language) {
    var lang = language.toString();
  }

  let job = {
    category: category,
    position: position,
    description: description,
    city: city,
    employment_type: employment_type,
    start_time: start_time,
    salary_to: salary_to,
    salary_from: salary_from,
    salary_currency: salary_currency,
    experience: experience,
    language: lang,
  };

  try {
    const db = await dbPromise;

    await db.query(`UPDATE jobs SET  ?  WHERE id = ?`, [job, req.params.id]);

    res.redirect(urlPaths.MyJobs);
    req.flash("success_msg", {
      msg: "Post de munca a fost editata cu success",
    });
  } catch (err) {
    res.redirect(urlPaths.back);
  }
};

//delete product
module.exports.deleteJob = async (req, res, next) => {
  let job_id = req.params.id;
  const status = 'removed'
  try {
    const db = await dbPromise;
     await db.query(
      `UPDATE jobs SET status = ?  WHERE id = ?`,[status, job_id]
    );

    req.flash("success_msg", {
      msg: "Jobul a fost sters cu success",
    });
    res.redirect(urlPaths.MyJobs);
  } catch (err) {

    req.flash("error_msg", {
      msg: msg.error,
    });
    res.redirect(urlPaths.back);
  }
};

