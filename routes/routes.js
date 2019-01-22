
module.exports = function (app){

  const jobsController = require('../controllers/jobs/jobs');
  const signupEmployerController = require('../controllers/authentication/employer/signup');
  const signupJobSeekerController = require('../controllers/authentication/job_seeker/signup');
  const profileController = require('../controllers/users/profile/common/profile');
  const employerProfileController = require ('../controllers/users/profile/employer/profile')
  const JobSeekerProfileController = require('../controllers/users/profile/job_seeker/profile');
  const EmployerProfileController = require('../controllers/users/profile/employer/profile');
  const chatController = require('../controllers/chat/chat');
  const loginController = require('../controllers/authentication/common/login');
  const homeController = require('../controllers/home');

  const accessController = require('../middleware/access_control_middleware');
  const filesController = require('../middleware/files_control_middleware');
  

  app.get('/',  homeController.getHomePage)


  //authetication routes
  app.get('/signup/employer',  signupEmployerController.getSignUpEmployer)
  app.post('/signup/employer',  signupEmployerController.postSignUpEmployer)
  
  app.get('/signup/jobseeker', signupJobSeekerController.getSignUpJobSeeker)
  app.post('/signup/jobseeker', signupJobSeekerController.postSignUpJobSeeker)
  

  //verify email after signup
  app.get('/email/verify/:token',profileController.getCheckEmail);



  //profile common
  app.get('/profile', accessController.ensureAuthenticated, profileController.getProfile)
  app.get('/profile/avatar', accessController.ensureAuthenticated, profileController.getProfileAvatarEdit)
  app.post('/profile/avatar/:id', accessController.ensureAuthenticated,filesController.avatar, profileController.postProfileAvatarEdit)  
  app.get('/password/reset', accessController.ensureAuthenticated, profileController.getChangePassword)
  app.post('/password/reset', accessController.ensureAuthenticated, profileController.postChangePassword)

  //forgot password
  app.get('/forgot/password',profileController.getForgotPassword);
  app.post('/forgot/password',profileController.postForgotPassword);
  app.get('/forgot/password/reset/:token', profileController.getForgotPasswordReset)
  app.post('/forgot/password/reset/:token', profileController.postForgotPasswordReset)
  //employer profile
  app.get('/profile/info/edit', accessController.ensureAuthenticated,accessController.employer, employerProfileController.getEmployerProfileInfoEdit)
  app.post('/profile/info/edit', accessController.ensureAuthenticated,accessController.employer, employerProfileController.postEmployerProfileInfoEdit)
  app.get('/company/info/edit', accessController.ensureAuthenticated, accessController.employer, employerProfileController.getCompanyInfoEdit)
  app.post('/company/info/edit', accessController.ensureAuthenticated, accessController.employer,employerProfileController.postCompanyInfoEdit)
  app.get('/company/:id', profileController.getCompanyProfile)
  //employer jobs
  app.get('/my_jobs', accessController.ensureAuthenticated,accessController.employer,jobsController.getEmployerJobs)
  app.get('/candidate_search', accessController.ensureAuthenticated, accessController.employer,EmployerProfileController.getCandidate )
  app.get('/candidate_details', accessController.ensureAuthenticated, accessController.employer,EmployerProfileController.getCandidateDetails)
  app.get('/employer/job/detail', accessController.ensureAuthenticated, accessController.employer,EmployerProfileController.getEmployerJobDetail)
  
  //jobseeker
  app.get('/application', accessController.ensureAuthenticated,accessController.jobSeeker,JobSeekerProfileController.getApplication)

  //chat 
  app.get('/chats', accessController.ensureAuthenticated,chatController.getChat )
  //login
  app.get('/login', loginController.getLogin)
  app.post('/login', loginController.postLogin)
  app.get('/logout',  loginController.getLogout)
  
  //jobs controller 
  app.get('/jobs', accessController.ensureAuthenticatedJsonRes, jobsController.getJobsPage)
  app.get('/jobs/add', accessController.ensureAuthenticated, accessController.employer, jobsController.getAddJobs)
  app.post('/jobs/add', accessController.ensureAuthenticated, accessController.employer ,filesController.uploadJobImage,jobsController.postAddJobs)
  app.get('/job_image/edit/:id', accessController.ensureAuthenticated ,accessController.employer, jobsController.getJobImageEdit)
  app.post('/job_image/edit/:id', accessController.ensureAuthenticated ,accessController.employer, filesController.editJobImage, jobsController.postJobImageEdit)
  app.get('/job/edit/:id', accessController.ensureAuthenticated, accessController.employer, jobsController.getEmployerJobEdit)
  app.post('/job/edit/:id', accessController.ensureAuthenticated, accessController.employer, jobsController.postEmployerJobEdit)
  app.delete('/job/delete/:id', accessController.ensureAuthenticated, accessController.employer, jobsController.deleteJob)
  app.get('/job/details/:id', jobsController.getJobDetail)
  
  
}


  