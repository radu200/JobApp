const {
   dbPromise
} = require('../../../.././config/database.js');

module.exports.getApplication = (req, res, next) => {
   res.render('profile/jobseeker/application')
}



module.exports.getJobSeekerProfileInfoEdit = async (req, res, next) => {


   try {
      const db = await dbPromise;

      const [user] = await db.execute('select * from users where id = ?', [req.user.id]);

      res.render('profile/jobseeker/jobseeker_profile_edit', {
         'result': user[0]
      })
   } catch (err) {
      req.flash('error_msg', {
         msg: 'O eroare a avut loc.Incercati din nou.'
      })
      console.log(err)
   }
}


module.exports.postJobSeekerProfileInfoEdit = async (req, res, next) => {

   const firstName = req.body.firstName;
   const lastName = req.body.lastName;
   const availabilityJobseeker = req.body.availabilityJobseeker;
   const employmentType = req.body.employmentType;
   const location = req.body.jobseekerLocation;
   const jobseekerDescription = req.body.jobseekerDescription;
   const language = req.body.language;
   const education = req.body.education;

   console.log(firstName)
   console.log(lastName);
   console.log(availabilityJobseeker);
   console.log(employmentType);
   console.log(location)
   console.log(jobseekerDescription);
   console.log(language);
   console.log(education)



   // req.checkBody('firstName', 'Prenumele este necesar ').notEmpty();
   // req.checkBody('firstName', 'Prenumele trebuie să aibă între 1 și 50 de caractere.').len(1, 50);
   // req.checkBody('lastName', 'Numele de familie este necesar').notEmpty();
   // req.checkBody('lastName', 'Numele de familie trebuie să aibă între 1 și 50 de caractere.').len(1, 50);


   // req.checkBody('category', 'Alege Categoria').notEmpty();
   //  req.checkBody("position", 'Poziția  este necesară').notEmpty()
   //  req.checkBody('position', ' Pozitia trebuie să aibă o lungime între 1 și 70 de caractere').len(1, 70);
   //  // req.checkBody("job_description", 'Descriere este necesara').notEmpty().isString();
   //  req.checkBody('job_description', ' Descrierea trebuie să aibă o lungime între 1 și 300 de caractere').len(1, 301);
   //  req.checkBody('city', "Locatia este necesara").notEmpty();
   //req.checkBody('employmentType', 'Alege tipul de angajare').notEmpty();
   //  req.checkBody('salary', 'Salariu trebuie să aibă o lungime între 0 și 8 de cifre.').len(0, 9);

   //  req.checkBody('salary', 'Formatul salariului este incorect').matches(/^\d{0,8}(?:\.\d{0,2})?$/);
   //  req.checkBody('experience', 'Alege experienta').notEmpty();






   //  const errors = req.validationErrors();

   //  if (errors) {
   //      req.flash('error_msg', errors);
   //      return res.redirect('back')
   //  }

   if (language) {
      var lang = language.toString();
   }

   let jobSeeker = {
      first_name: firstName,
      last_name: lastName,
      job_seeker_employment_type: employmentType,
      job_seeker_about_me: jobseekerDescription,
      job_seeker_languages: lang,
      job_seeker_education: education,
      job_seeker_location: location,
      job_seeker_availability: availabilityJobseeker
   }

   try {
      const db = await dbPromise;

      await db.query('UPDATE users SET   first_name = ?,last_name = ?, job_seeker_employment_type = ?,   job_seeker_about_me = ?, job_seeker_languages = ?,job_seeker_education = ?,  job_seeker_location = ?, job_seeker_availability = ?  WHERE id = ?', [firstName,
         lastName,
         employmentType,
         jobseekerDescription,
         lang,
         education,
         location,
         availabilityJobseeker, req.user.id
      ])
      res.redirect('/profile')

   } catch (err) {
      console.log(err);
      req.flash('error_msg', {
         msg: 'O eroare a avut loc.Incercati din nou.'
      })
      res.redirect('back')
   }

}


module.exports.getJobSeekerExperienceAdd = async (req, res, next) => {
   res.render('profile/jobseeker/add_experience')
}

module.exports.postJobSeekerExperience = async (req, res, next) => {
   const categoryExperience = req.body.categoryExperience;
   const position = req.body.position;
   const companyName = req.body.companyName
   const startDate = req.body.startDate;
   const endDate = req.body.endDate;
   const responsibilities = req.body.responsibilities;

   console.log(categoryExperience);
   console.log(position)
   console.log(companyName)
   console.log('start', startDate)
   console.log('end', endDate)
   console.log(responsibilities)


   try {
      const db = await dbPromise;


      let jobSeekerExperience = {
         jobseeker_id: req.user.id,
         category: categoryExperience,
         position: position,
         company_name: companyName,
         responsibilities: responsibilities,
         start_date: startDate,
         end_date: endDate
      }
      await db.query('insert into jobseeker_experience set ? ', jobSeekerExperience)
      req.flash('success_msg', {
         msg: 'Jobul a fost adaugat cu success'
      })
      res.redirect('/profile')

   } catch (err) {
      console.log(err);
      req.flash('error_msg', {
         msg: 'O eroare a avut loc.Incercati din nou.'
      })
      res.redirect('back')
   }
}


module.exports.getJobSeekerEditExperience = async (req, res, next) => {

   try {
      const db = await dbPromise;

      const [user] = await db.execute('select * from jobseeker_experience where jobseeker_id = ?', [req.user.id]);

      res.render('profile/jobseeker/edit_experience', {
         'result': user[0]
      })

   } catch (err) {
      req.flash('error_msg', {
         msg: 'O eroare a avut loc.Incercati din nou.'
      })
      console.log(err)
   }
}


module.exports.postJobSeekerEditExperience = async (req, res, next) => {
   const categoryExperience = req.body.categoryExperience;
   const position = req.body.position;
   const companyName = req.body.companyName
   const startDate = req.body.startDate;
   const endDate = req.body.endDate;
   const responsibilities = req.body.responsibilities;
   
   // console.log(categoryExperience);
   // console.log(position)
   // console.log(companyName)
   // console.log('start', startDate)
   // console.log('end', endDate)
   // console.log(responsibilities)


   try {
      const db = await dbPromise;

      await db.execute('UPDATE jobseeker_experience SET  category = ?, position = ?, company_name = ?,responsibilities = ?, start_date = ?, end_date = ? WHERE id = ? AND jobseeker_id = ? ', [categoryExperience,position,companyName,responsibilities,startDate,endDate, req.params.id,req.user.id])
      
      req.flash('success_msg', {
         msg: 'Detaliile au fost schimbate cu success.'
      })
      res.redirect('/profile')

   } catch (err) {
      console.log(err);
 
      req.flash('error_msg', {
         msg: 'O eroare a avut loc.Incercati din nou.'
      })
      res.redirect('back')
   }

}