const { dbPromise } = require("../../../.././config/database.js");
const moment = require("moment");
const msg = require("../../../utils/messages");
const urlPaths = require("../../../utils/url-paths");

module.exports.getApplication = (req, res, next) => {
  res.render("profile/jobseeker/application");
};

module.exports.getJobSeekerProfileInfoEdit = async (req, res, next) => {
  try {
    const db = await dbPromise;

    const [user] = await db.execute("select * from users where id = ?", [
      req.user.id
    ]);

    res.render("profile/jobseeker/jobseeker_profile_edit", {
      result: user[0]
    });
  } catch (err) {
    req.flash("error_msg", {
      msg: msg.error
    });
    console.log(err);
  }
};

module.exports.postJobSeekerProfileInfoEdit = async (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const availabilityJobseeker = req.body.availabilityJobseeker;
  const employmentType = req.body.employmentType;
  const location = req.body.jobseekerLocation;
  const jobseekerDescription = req.body.jobseekerDescription;
  const language = req.body.language;
  const education = req.body.education;

  req.checkBody("firstName", "Prenumele este necesar ").notEmpty();
  req
    .checkBody(
      "firstName",
      "Prenumele trebuie să aibă între 1 și 50 de caractere."
    )
    .len(1, 50);
  req.checkBody("lastName", "Numele de familie este necesar").notEmpty();
  req
    .checkBody(
      "lastName",
      "Numele de familie trebuie să aibă între 1 și 50 de caractere."
    )
    .len(1, 50);
  req
    .checkBody(
      "availabilityJobseeker",
      "Disponibilitatea nu trebuie sa fie mai mult de 50 de caractere."
    )
    .len(0, 50);
  req
    .checkBody(
      "employmentType",
      "Tipul de angajare nu trebuie sa fie mai mult de 50 de caractere."
    )
    .len(0, 50);
  req
    .checkBody(
      "jobseekerDescription",
      "Descrierea nu trebuie sa fie mai mult de 250 de caractere."
    )
    .len(0, 250);
  req
    .checkBody("language", "Te rog alege mai putine limbi vorbite .")
    .len(0, 100);
  req
    .checkBody(
      "education",
      "Descrierea  educatiei nu trebuie sa fie mai mult de 250 de caractere."
    )
    .len(0, 250);

  const errors = req.validationErrors();

  if (errors) {
    req.flash("error_msg", errors);
    return res.redirect(urlPaths.back);
  }

  try {
    const db = await dbPromise;
    let lang;

    if (language) {
      lang = language.toString();
    }
    const jobSeeker = {
      first_name: firstName,
      last_name: lastName,
      job_seeker_employment_type: employmentType,
      job_seeker_about_me: jobseekerDescription,
      job_seeker_languages: lang,
      job_seeker_education: education,
      job_seeker_location: location,
      job_seeker_availability: availabilityJobseeker
    };

    await db.query("UPDATE users SET ? WHERE id = ? ", [
      jobSeeker,
      req.user.id
    ]);

    res.redirect(urlPaths.profile);
  } catch (err) {
    console.log(err);
    req.flash("error_msg", {
      msg: msg.error
    });
    res.redirect(urlPaths.back);
  }
};

module.exports.getJobSeekerExperienceAdd = async (req, res, next) => {
  res.render("profile/jobseeker/add_experience");
};

module.exports.postJobSeekerExperience = async (req, res, next) => {
  const categoryExperience = req.body.categoryExperience;
  const position = req.body.position;
  const companyName = req.body.companyName;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const responsibilities = req.body.responsibilities;

  req.checkBody("categoryExperience", "Alege categoria").notEmpty();
  req
    .checkBody(
      "categoryExperience",
      "Categoria trebuie să aibă între 1 și 100 de caractere."
    )
    .len(1, 100);
  req.checkBody("position", "Pozitie  este necesara").notEmpty();
  req
    .checkBody(
      "position",
      "Pozitia trebuie să aibă între 1 și 70 de caractere."
    )
    .len(0, 70);
  req.checkBody("companyName", "Numele companiei  este necesara").notEmpty();
  req
    .checkBody(
      "companyName",
      "Numele companiei trebuie să aibă între 1 și 70 de caractere."
    )
    .len(1, 70);
  req
    .checkBody(
      "startDate",
      "Data cind ai inceput trebuie să aibă între 1 și 50 de caractere."
    )
    .len(1, 50);
  req
    .checkBody(
      "endDate",
      "Data cind ai finisat trebuie să aibă între 1 și 50 de caractere."
    )
    .len(1, 50);
  req
    .checkBody(
      "responsibilities",
      "Descrierea  responsabilitatilor nu trebuie sa fie mai mult de 250 de caractere."
    )
    .len(0, 250);

  const errors = req.validationErrors();

  if (errors) {
    req.flash("error_msg", errors);
    return res.redirect(urlPaths.back);
  }

  let start = moment(new Date(startDate));
  let end = moment(new Date(endDate));

  let duration = moment.duration(end.diff(start));
  experienceYears = duration.years();
  experienceMonths = duration.months();
  experienceDays = duration.days();

  let jobEndDate = moment(end).format("MM/DD/YYYY");
  let jobStartDate = moment(start).format("MM/DD/YYYY");
  try {
    const db = await dbPromise;

    let jobSeekerExperience = {
      jobseeker_id: req.user.id,
      category: categoryExperience,
      position: position,
      company_name: companyName,
      responsibilities: responsibilities,
      start_date: jobStartDate,
      end_date: jobEndDate,
      years: experienceYears,
      months: experienceMonths,
      days: experienceDays
    };
    await db.query(
      "insert into jobseeker_experience set ? ",
      jobSeekerExperience
    );
    req.flash("success_msg", {
      msg: "Experienta a fost adaugata cu success"
    });
    res.redirect(urlPaths.profile);
  } catch (err) {
    console.log(err);
    req.flash("error_msg", {
      msg: msg.error
    });
    res.redirect(urlPaths.back);
  }
};

module.exports.getJobSeekerEditExperience = async (req, res, next) => {
  try {
    const db = await dbPromise;

    const [user] = await db.execute(
      "select * from jobseeker_experience where id = ?",
      [req.params.id]
    );

    res.render("profile/jobseeker/edit_experience", {
      result: user[0]
    });
  } catch (err) {
    req.flash("error_msg", {
      msg: msg.error
    });
    console.log(err);
  }
};

module.exports.postJobSeekerEditExperience = async (req, res, next) => {
  const categoryExperience = req.body.categoryExperience;
  const position = req.body.position;
  const companyName = req.body.companyName;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const responsibilities = req.body.responsibilities;

  req.checkBody("categoryExperience", "Alege categoria").notEmpty();
  req
    .checkBody(
      "categoryExperience",
      "Categoria trebuie să aibă între 1 și 100 de caractere."
    )
    .len(1, 100);
  req.checkBody("position", "Pozitie  este necesara").notEmpty();
  req
    .checkBody(
      "position",
      "Pozitia trebuie să aibă între 1 și 70 de caractere."
    )
    .len(0, 70);
  req.checkBody("companyName", "Numele companiei  este necesara").notEmpty();
  req
    .checkBody(
      "companyName",
      "Numele companiei trebuie să aibă între 1 și 70 de caractere."
    )
    .len(1, 70);
  req
    .checkBody(
      "startDate",
      "Data cind ai inceput trebuie să aibă între 1 și 50 de caractere."
    )
    .len(1, 50);
  req
    .checkBody(
      "endDate",
      "Data cind ai finisat trebuie să aibă între 1 și 50 de caractere."
    )
    .len(1, 50);
  req
    .checkBody(
      "responsibilities",
      "Descrierea  responsabilitatilor nu trebuie sa fie mai mult de 250 de caractere."
    )
    .len(0, 250);

  const errors = req.validationErrors();

  if (errors) {
    req.flash("error_msg", errors);
    return res.redirect(urlPaths.back);
  }

  try {
    let start = moment(new Date(startDate));
    let end = moment(new Date(endDate));

    let duration = moment.duration(end.diff(start));
    experienceYears = duration.years();
    experienceMonths = duration.months();
    experienceDays = duration.days();

    let jobEndDate = moment(end).format("MM/DD/YYYY");
    let jobStartDate = moment(start).format("MM/DD/YYYY");

    const db = await dbPromise;
    const sql =
      "UPDATE jobseeker_experience SET  category = ?, position = ?, company_name = ?,responsibilities = ?, start_date = ?, end_date = ?, years = ? , months = ?, days = ? WHERE id = ?";
    const values = [
      categoryExperience,
      position,
      companyName,
      responsibilities,
      jobStartDate,
      jobEndDate,
      experienceYears,
      experienceMonths,
      experienceDays,
      req.params.id
    ];
    await db.execute(sql, values);

    req.flash("success_msg", {
      msg: "Detaliile au fost schimbate cu success."
    });
    res.redirect(urlPaths.profile);
  } catch (err) {
    console.log(err);

    req.flash("error_msg", {
      msg: msg.error
    });
    res.redirect(urlPaths.back);
  }
};

module.exports.deleteJobSeekerExperience = async (req, res) => {
  let id = req.params.id;
  try {
    const db = await dbPromise;
    console.log("id", id);

    await db.execute(`DELETE FROM jobseeker_experience WHERE id =${id}`);

    req.flash("success_msg", {
      msg: "Experienta a fost sters cu success"
    });
    res.redirect(urlPaths.profile);
  } catch (err) {
    console.log(err);

    req.flash("error_msg", {
      msg: msg.error
    });
    res.redirect(urlPaths.back);
  }
};
