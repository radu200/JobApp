const db = require('../.././Config/database.js');
module.exports.getJobsPage = (req, res, next) => { 
   res.render('Jobs/jobs')
};


module.exports.getAddJobs =  (req, res, next) => {
    res.render('Jobs/add_jobs')
};


module.exports.postAddJobs =  (req, res, next) => {
     const category = req.body.category;
     const position = req.body.position;
     const description = req.body.job_description;
     const city = req.body.city; 
     const employment_type = req.body.employment_type;
     const schedule_details = req.body.schedule_details;
     const immediate_start  = req.body.immediate_start
     const salary = req.body.salary;
     const experience = req.body.experience;
     const language = req.body.language;
     const language_level = req.body.language_level;
     

     console.log('category',category)
     console.log(position)
     console.log(description)
     console.log(city)
     console.log('employement',employment_type)
     console.log(schedule_details)
     console.log(immediate_start)
     console.log(salary)
     console.log('experience',experience)
     console.log(language)
     console.log(language_level)
     console.log('user',req.user)
  




    let jobs = {
         employer_id:req.user.id,
         category:category,
         position:position,
         description:description,
         city:city,
         employment_type:employment_type,
         schedule_details:schedule_details,
         immediate_start:immediate_start,
         //salary:salary,
         experience:experience,
         language:language,
         language_level:language_level,
        //  image:'lalla'
    }

    //creat employer
    db.query('INSERT INTO jobs SET ?', jobs, (error, results) => {
        if (error) throw error
       
    })

    res.redirect('/');
};
