const db = require('../../../.././config/database.js');

module.exports.getApplication = (req,res,next) => {
   res.render('profile/jobseeker/application')
}


module.exports.getJobSeekerProfileInfoEdit = (req,res,next) => {
   res.render('profile/jobseeker/jobseeker_profile_edit')

}


module.exports.postJobSeekerProfileInfoEdit = (req,res,next) => {
   const firstName = req.body.firstName;
   const lastName = req.body.lastName;
   const availabilityJobseeker = req.body.availabilityJobseeker;
   const employementType = req.body.employementType;
   const jobseekerLocation = req.body.jobseekerLocation;
   const jobseekerEmail = req.body.jobseekerEmail;
   const phoneNumber = req.body.phoneNumber;
   const jobseekerDescription = req.body.jobseekerDescription;
   const language = req.body.language;
   const education = req.body.education;

   console.log(firstName)
   console.log(lastName);
   console.log(availabilityJobseeker);
   console.log(employementType);
   console.log(jobseekerLocation)
   console.log(jobseekerEmail);
   console.log(phoneNumber);
   console.log(jobseekerDescription);
   console.log(language);
   console.log(education)
}


module.exports.getJobSeekerProfileEditExperience = (req,res,next) => {
   res.render('profile/jobseeker/jobseeker_experience_edit')

}

module.exports.postJobSeekerProfileEditExperience = (req,res,next) => {
  
   const categoryExperience = req.body.categoryExperience;
   const position = req.body.position;
   const companyName = req.body.companyName
   const startDate = req.body.startDate;
   const endDate = req.body.endDate;
   const mainResposibilities =  req.body.mainResposibilities;

   console.log(categoryExperience);
   console.log(position)
   console.log(companyName)
   console.log('start',startDate)
   console.log('end',endDate)
   console.log(mainResposibilities)
    
}