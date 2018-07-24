

module.exports = function (app){
    
const jobsController = require('../Controllers/Jobs/jobs');
const signupEmployerController = require('../Controllers/Authentication/Employer/signup');
const signupJobSeekerController = require('../Controllers/Authentication/JobSeeker/signup');
const pagesController = require('../Controllers/pages/profile');

const loginController = require('../Controllers/Authentication/Common/login');
const homeController = require('../Controllers/home');

const accessController = require('../Middleware/access_control_middleware');

  app.get('/jobs', accessController.EnsureAuthenticated, jobsController.getJobsPage)
  app.get('/',  homeController.getHomePage)

  
  //authetication routes
  app.get('/employer/signup',  signupEmployerController.getSignUpEmployer)
  app.post('/employer/signup',  signupEmployerController.postSignUpEmployer)

  app.get('/job_seeker/signup', signupJobSeekerController.getSignUpJobSeeker)
  app.post('/job_seeker/signup', signupJobSeekerController.postSignUpJobSeeker)

  //profile
  app.get('/profile', accessController.EnsureAuthenticated, pagesController.getProfile)

  //login
  app.get('/login',  loginController.getLogin)
  app.post('/login',  loginController.postLogin)
  app.get('/logout',  loginController.getLogout)

  //jobs controller 
  app.get('/jobs/add', accessController.EnsureAuthenticated, jobsController.getAddJobs)
  app.post('/jobs/add', accessController.EnsureAuthenticated,jobsController.postAddJobs)
}