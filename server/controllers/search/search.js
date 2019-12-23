const { dbPromise } = require("../.././config/database.js");
const msg = require(".././utils/messages");

module.exports.searchJobs = async (req, res, next) => {
  const searchVal = req.query.search_query || null;
  const page = parseInt(req.query.page) || 1;
  const city = req.query.location || null;
  const limit = 6;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};

  try {
    const db = await dbPromise;

    const sqlCity = `AND city  LIKE '%${city}%'`;
    const sqlCategory = `AND  category LIKE '%${searchVal}%'`;
    const sqlLimit = `LIMIT ${limit} OFFSET ${startIndex}`;
    let sqlCount = `SELECT count(*) total FROM jobs WHERE blacklist = ?`;
    let sqlJobs = `SELECT * from  jobs  WHERE blacklist = ?`;
   
    if (searchVal !== null && city !== null) {
      sqlCount = `${sqlCount} ${sqlCity} ${sqlCategory}`;
      sqlJobs = `${sqlJobs} ${sqlCity} ${sqlCategory} ${sqlLimit}`;
    } else if (searchVal !== null) {
      sqlCount = `${sqlCount} ${sqlCategory}`;
      sqlJobs = `${sqlJobs} ${sqlCategory} ${sqlLimit}`;
    } else if (city !== null) {
      sqlCount = `${sqlCount} ${sqlCity} `;
      sqlJobs = `${sqlJobs} ${sqlCity} ${sqlLimit}`;
    } else {
      sqlJobs = `${sqlJobs} ${sqlLimit}`;
    }

    const [rows] = await await db.query(sqlCount, ["no"]);
    const [jobs] = await db.query(sqlJobs, ["no"]);

    const totalJobs = rows[0].total;

    results.total = {
      jobs: totalJobs,
      limit: limit
    };
    results.current = {
      page: page,
      limit: limit
    };
    if (endIndex < totalJobs) {
      results.next = {
        page: page + 1,
        limit: limit
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      };
    }

    results.jobs = jobs;
    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.searchCandidates = async (req, res) => {
  const { location, category, experienceMax, page} = req.query
  const experienceMin = 0;
  const limit = 12;

  try {
    ///validation
    if (
      location === "" ||
      location.length > 70 ||
      category === "" ||
      category.length > 70 ||
      experienceMax > 50
    ) {
      return false;
    }

    const db = await dbPromise;
    const jobseeker_experience = `jobseeker_experience.category AS category, jobseeker_experience.jobseeker_id AS userID, sum(jobseeker_experience.years) AS total_ex_years `;
    const user_details = `users.first_name, users.blacklist, users.last_name,users.type, users.avatar,users.job_seeker_location,users.job_seeker_about_me,users.job_seeker_location `;
    const sql = `SELECT ${jobseeker_experience}, ${user_details}  FROM users LEFT JOIN jobseeker_experience ON jobseeker_experience.jobseeker_id = users.id WHERE users.blacklist = ? AND lower(category ) LIKE '%${category}%'  AND lower(users.job_seeker_location) LIKE '%${location}%' AND jobseeker_experience.years BETWEEN ${experienceMin} AND ${experienceMax} GROUP BY category,userID  LIMIT ${limit} OFFSET ${page}`;
    const [results] = await db.query(sql, ["no"]);
    res.status(200).json({ candidates: results});
  } catch (err) {
     res.status(500).json(err)
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
      experience: experience
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
