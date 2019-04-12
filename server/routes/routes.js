
module.exports = function (app){

  const jobsController = require('../controllers/jobs/jobs');
  const signupEmployerController = require('../controllers/authentication/employer/signup');
  const signupJobSeekerController = require('../controllers/authentication/job_seeker/signup');
  const settingsController = require('../controllers/users/settings/settings');
  const profileController = require('../controllers/users/profile/common/profile');
  const employerProfileController = require ('../controllers/users/profile/employer/profile')
  const JobSeekerProfileController = require('../controllers/users/profile/job_seeker/profile');
  const EmployerProfileController = require('../controllers/users/profile/employer/profile');
  const chatController = require('../controllers/chat/chat');
  const loginController = require('../controllers/authentication/common/login');
  const homeController = require('../controllers/home');
  const contactUs = require('../controllers/helpPages/contactUs')
  const accessController = require('../middleware/access_control_middleware');
  const filesController = require('../middleware/files_control_middleware');
  const searchJob =  require('../controllers/search/search');
  
  app.get('/',  homeController.getHomePage)
  
  
  //authetication routes
  app.get('/signup/employer',  signupEmployerController.getSignUpEmployer)
  app.post('/signup/employer',  signupEmployerController.postSignUpEmployer)
  
  app.get('/signup/jobseeker', signupJobSeekerController.getSignUpJobSeeker)
  app.post('/signup/jobseeker', signupJobSeekerController.postSignUpJobSeeker)
  
  //login
  app.get('/login', loginController.getLogin)
  app.post('/login', loginController.postLogin)
  app.get('/logout',  loginController.getLogout)


  //user settings 
   app.get('/settings', accessController.ensureAuthenticated, settingsController.getSettings);
  //change email
  app.get('/change/email', accessController.ensureAuthenticated,settingsController.getChangeEmail)
  app.post('/change/email', accessController.ensureAuthenticated,settingsController.postChangeEmail)
   //verify email after signup
   app.get('/email/verify/:token',settingsController.getCheckEmail);
   app.get('/resend/email/check',accessController.ensureAuthenticated, settingsController.getResendEmailCheck )
   app.post('/resend/email/check',accessController.ensureAuthenticated, settingsController.postResendEmailCheck)
   //forgot password
   app.get('/forgot/password',settingsController.getForgotPassword);
   app.post('/forgot/password',settingsController.postForgotPassword);
   app.get('/forgot/password/reset/:token', settingsController.getForgotPasswordReset)
   app.post('/forgot/password/reset/:token', settingsController.postForgotPasswordReset)
   //change pasword within profile
   app.get('/change/password', accessController.ensureAuthenticated, accessController.ensureEmailChecked, settingsController.getChangePassword)
   app.post('/change/password', accessController.ensureAuthenticated, settingsController.postChangePassword)

  //profile common
  app.get('/profile', accessController.ensureAuthenticated, profileController.getProfile)
  app.get('/profile/avatar', accessController.ensureAuthenticated, profileController.getProfileAvatarEdit)
  app.post('/profile/avatar/:id', accessController.ensureAuthenticated,filesController.avatar, profileController.postProfileAvatarEdit)  
  //employer profile
  app.get('/profile/edit/employer', accessController.ensureAuthenticated,accessController.ensureEmailChecked,accessController.employer, employerProfileController.getEmployerProfileInfoEdit)
  app.post('/profile/edit/employer', accessController.ensureAuthenticated,accessController.employer, employerProfileController.postEmployerProfileInfoEdit)
  app.get('/company/info/edit', accessController.ensureAuthenticated, accessController.employer, employerProfileController.getCompanyInfoEdit)
  app.post('/company/info/edit', accessController.ensureAuthenticated, accessController.employer,employerProfileController.postCompanyInfoEdit)
  app.get('/company/:id', accessController.ensureAuthenticated, employerProfileController.getCompanyProfile,)
  //employer jobs
  app.get('/my_jobs', accessController.ensureAuthenticated,accessController.employer,jobsController.getEmployerJobs)
  app.get('/candidate_search', accessController.ensureAuthenticated, accessController.employer,EmployerProfileController.getCandidate )
  app.get('/candidate_details', accessController.ensureAuthenticated, accessController.employer,EmployerProfileController.getCandidateDetails)
  app.get('/employer/job/detail', accessController.ensureAuthenticated, accessController.employer,EmployerProfileController.getEmployerJobDetail)
  
  //jobseeker
  app.get('/application', accessController.ensureAuthenticated,accessController.jobSeeker,JobSeekerProfileController.getApplication)
  app.get('/profile-edit/jobseeker', accessController.ensureAuthenticated, accessController.jobSeeker, JobSeekerProfileController.getJobSeekerProfileInfoEdit)
  app.post('/profile-edit/jobseeker', accessController.ensureAuthenticated,accessController.jobSeeker, JobSeekerProfileController.postJobSeekerProfileInfoEdit)
  app.get('/jobseeker/experience', accessController.ensureAuthenticated,accessController.jobSeeker, JobSeekerProfileController.getJobSeekerExperienceAdd)
  app.post('/jobseeker/add/experience', accessController.ensureAuthenticated,accessController.jobSeeker, JobSeekerProfileController.postJobSeekerExperience)
  app.get('/jobseeker/experience/edit/:id', accessController.ensureAuthenticated,accessController.jobSeeker, JobSeekerProfileController.getJobSeekerEditExperience)
  app.post('/jobseeker/experience/edit/:id', accessController.ensureAuthenticated,accessController.jobSeeker, JobSeekerProfileController.postJobSeekerEditExperience)
  app.delete('/jobseeker/experience/delete/:id', accessController.ensureAuthenticated,accessController.jobSeeker, JobSeekerProfileController.deleteJobSeekerExperience)

  //chat 
  app.get('/chats', accessController.ensureAuthenticated,chatController.getChat )
  
  //jobs controller 
  app.post('/jobs', jobsController.getJobsPage)
  app.get('/jobs/add', accessController.ensureAuthenticated, accessController.employer,accessController.ensureEmailChecked, jobsController.getAddJobs)
  app.post('/jobs/add', accessController.ensureAuthenticated, accessController.employer ,filesController.uploadJobImage,jobsController.postAddJobs)
  app.get('/job_image/edit/:id', accessController.ensureAuthenticated ,accessController.employer, jobsController.getJobImageEdit)
  app.post('/job_image/edit/:id', accessController.ensureAuthenticated ,accessController.employer, filesController.editJobImage, jobsController.postJobImageEdit)
  app.get('/job/edit/:id', accessController.ensureAuthenticated, accessController.employer, jobsController.getEmployerJobEdit)
  app.post('/job/edit/:id', accessController.ensureAuthenticated, accessController.employer, jobsController.postEmployerJobEdit)
  app.delete('/job/delete/:id', accessController.ensureAuthenticated, accessController.employer, jobsController.deleteJob)
  app.get('/job/details/:id', jobsController.getJobDetail)

 //search
 app.post('/search/job', searchJob.searchJobs)
  ///contact us
  app.get('/contact-us',accessController.ensureAuthenticated,contactUs.getContactUs);
}


  