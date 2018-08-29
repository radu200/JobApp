
module.exports = function (app){

  const jobsController = require('../controllers/jobs/jobs');
  const signupEmployerController = require('../controllers/authentication/employer/signup');
  const signupJobSeekerController = require('../controllers/authentication/job_seeker/signup');
  const profileController = require('../controllers/profile/profile');

  const loginController = require('../controllers/authentication/common/login');
  const homeController = require('../controllers/home');

  const accessController = require('../middleware/access_control_middleware');
  const filesController = require('../middleware/files_control_middleware');
  

  app.get('/',  homeController.getHomePage)


  //authetication routes
  app.get('/employer/signup',  signupEmployerController.getSignUpEmployer)
  app.post('/employer/signup',  signupEmployerController.postSignUpEmployer)
  
  app.get('/job_seeker/signup', signupJobSeekerController.getSignUpJobSeeker)
  app.post('/job_seeker/signup', signupJobSeekerController.postSignUpJobSeeker)
  
  //profile
  app.get('/profile', accessController.ensureAuthenticated, profileController.getProfile)
  app.get('/profile/edit', accessController.ensureAuthenticated, profileController.getProfileEdit)
  app.get('/company/info/edit', accessController.ensureAuthenticated, profileController.getCompanyInfoEdit)
  app.get('/change/password', accessController.ensureAuthenticated, profileController.getChangePassword)

  //login
  app.get('/login',  loginController.getLogin)
  app.post('/login',  loginController.postLogin)
  app.get('/logout',  loginController.getLogout)

  //jobs controller 
  app.get('/jobs',jobsController.getJobsPage)
  app.get('/jobs/add', accessController.ensureAuthenticated, accessController.employer, jobsController.getAddJobs)
  app.post('/jobs/add', accessController.ensureAuthenticated, accessController.employer ,filesController.uploadJobImage,jobsController.postAddJobs)
  app.get('/job_image/edit/:id', accessController.ensureAuthenticated ,accessController.employer, jobsController.getJobImageEdit)
  app.post('/job_image/edit/:id', accessController.ensureAuthenticated ,accessController.employer, jobsController.postJobImageEdit)



}


  