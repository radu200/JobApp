const db = require('../.././Config/database.js');
module.exports.getJobsPage = (req, res, next) => { 
   res.render('Jobs/jobs')
};


module.exports.getAddJobs =  (req, res, next) => {
    res.render('Jobs/add_job')
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
     const commission = req.body.commission

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
  

     req.checkBody('category', 'Alege Categoria').notEmpty();
     req.checkBody("position",   'Poziția  este necesară').notEmpty();
     req.checkBody('position', ' Pozitia trebuie să aibă o lungime între 1 și 150 de caractere').len(1, 150);
     req.checkBody("description",   'Descriere este necesara').notEmpty();
     req.checkBody('description', ' Descrierea trebuie să aibă o lungime între 1 și 300 de caractere').len(1, 300);
     req.checkBody('city', "Locatia este necesara").notEmpty();
     req.checkBody('employment_type', 'Alege tipul de angajare').notEmpty();
     req.checkBody('schedule_details', ' Descrierea trebuie să aibă o lungime între 0 și 70 de caractere').len(0, 70);
     req.checkBody('salary', 'Salariu trebuie să aibă o lungime între 0 și 70 de caractere.').len(0,70);
     req.checkBody({'salary':{ optional: {  options: { checkFalsy: true }},isDecimal: {  errorMessage: 'Salariu trebuie sa fie decimal'} } });
     req.checkBody('commission', 'Comisioanele trebuie să aibă o lungime între 0 și 70 de caractere').len(0, 70);
     req.checkBody('experience', 'Alege experienta').notEmpty();

     //  req.checkBody('first_name', 'first name is required').notEmpty();
    //  req.checkBody('first_name', 'first name must be between 3 and  50 characters long.').len(3, 50);
    //  req.checkBody('last_name', 'last name is required').notEmpty();
    //  req.checkBody('last_name', 'last name must be between 3 and  50 characters long.').len(3, 50);
    //  req.checkBody('password', 'Password must be between 6-100 characters long.').len(6,100);
    //  req.checkBody('confirm_password', 'Passwords do not match').equals(req.body.password);
    
     const errors = req.validationErrors();

     if (errors) {
         req.flash('error_msg', errors);
         return res.redirect('back')
     }
    let jobs = {
         employer_id:req.user.id,
         category:category,
         position:position,
         description:description,
         city:city,
         employment_type:employment_type,
         schedule_details:schedule_details,
         immediate_start:immediate_start,
         salary:salary,
         experience:experience,
         language:language,
         language_level:language_level,
        //  image:'lalla'
    }

    //creat employer
    db.query('INSERT INTO jobs SET ?', jobs, (error, results) => {
        if (error) throw error
       console.log('[mysql error]', error)
    })

    res.redirect('/');
};
