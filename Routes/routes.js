

module.exports = function (app){
    
const jobsController = require('../Controllers/jobs');
const signupEmployerController = require('../Controllers/Authentication/Employer/signup');
const signupJobSeekerController = require('../Controllers/Authentication/JobSeeker/signup');

const loginController = require('../Controllers/Authentication/Common/login');
const homeController = require('../Controllers/home');


  app.get('/jobs',  jobsController.getJobsPage)
  app.get('/',  homeController.getHomePage)

  
  //authetication routes
  app.get('/employer/signup',  signupEmployerController.getSignUpEmployer)
  app.post('/employer/signup',  signupEmployerController.postSignUpEmployer)

  app.get('/job_seeker/signup',  signupJobSeekerController.getSignUpJobSeeker)

  app.get('/login',  loginController.getLogin)
  app.post('/login',  loginController.postLogin)


}