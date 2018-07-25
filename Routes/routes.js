

module.exports = function (app){
    
const jobsController = require('../Controllers/Jobs/jobs');
const signupEmployerController = require('../Controllers/Authentication/Employer/signup');
const signupJobSeekerController = require('../Controllers/Authentication/JobSeeker/signup');
const profileController = require('../Controllers/profile/profile');

const loginController = require('../Controllers/Authentication/Common/login');
const homeController = require('../Controllers/home');

const accessController = require('../Middleware/access_control_middleware');

  app.get('/jobs', accessController.ensureAuthenticated, jobsController.getJobsPage)
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
  app.get('/jobs/add', accessController.ensureAuthenticated ,accessController.employer, jobsController.getAddJobs)
  app.post('/jobs/add', accessController.ensureAuthenticated, accessController.employer, jobsController.postAddJobs)
}