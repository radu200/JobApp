const { dbPromise } = require("../.././config/database.js");
const msg = require(".././utils/messages");

module.exports.searchJobs = async (req, res, next) => {
  const searchVal = req.query.search_query;
  const offset = req.body.offset;
  const city = req.query.location;
  const limit = 12;
  try {
    //validation
    if (searchVal === "" || searchVal.length > 70 || city === "" || city.length > 70) {
      return false;
    }
      const db = await dbPromise;
      const sql = `SELECT jobs.*, users.id, users.blacklist FROM jobs LEFT JOIN users ON jobs.employer_id = users.id WHERE users.blacklist = ? AND  jobs.category LIKE '%${searchVal}%' AND jobs.city  LIKE '%${city}%'  LIMIT ${limit} OFFSET ${offset}`;
      const [results] = await db.query(sql, ["no"]);
      res.json({
        jobs: results,
      });
    
  } catch (err) {
    res.json(msg.error);
  }
};

module.exports.searchCandidates = async (req, res) => {
  const location = req.query.location;
  const category = req.query.category;
  const experienceMin = 0;
  const experienceMax = req.query.experience_max;
  const offset = req.body.offset;
  const limit = 12;

  try {
    ///validation
    if (location === "" || location.length > 70 || category === "" || category.length > 70 || experienceMax > 50 ) {
      return false;
    }
  
      const db = await dbPromise;
      const jobseeker_experience = `jobseeker_experience.category AS category, jobseeker_experience.jobseeker_id AS userID, sum(jobseeker_experience.years) AS total_ex_years `;
      const user_details = `users.first_name, users.blacklist, users.last_name,users.type, users.avatar,users.job_seeker_location,users.job_seeker_about_me,users.job_seeker_location `;
      const sql = `SELECT ${jobseeker_experience}, ${user_details}  FROM users LEFT JOIN jobseeker_experience ON jobseeker_experience.jobseeker_id = users.id WHERE users.blacklist = ? AND lower(category ) LIKE '%${category}%'  AND lower(users.job_seeker_location) LIKE '%${location}%' AND jobseeker_experience.years BETWEEN ${experienceMin} AND ${experienceMax} GROUP BY category,userID  LIMIT ${limit} OFFSET ${offset}`;
      const [results] = await db.query(sql, ["no"]);

      res.json({
        candidates: results,
        auth: "employer"
      });
    
  } catch (err) {
    console.log(err);
  }
};

module.exports.getCandidateDetails = async (req, res) => {
  const id = req.params.id;

  try {
    const db = await dbPromise;

    const [
      candidate
    ] = await db.execute(
      "select first_name,last_name,avatar,id,job_seeker_employment_type, job_seeker_about_me,job_seeker_education,job_seeker_location,job_seeker_languages, job_seeker_availability from users where id = ? ",
      [id]
    );

    const [
      experience
    ] = await db.execute(
      "select * from jobseeker_experience where jobseeker_id = ? ",
      [id]
    );
    res.json({
      details: candidate,
      experience: experience,
    });

  } catch (err) {
    res.json(msg.err);
  }
};
