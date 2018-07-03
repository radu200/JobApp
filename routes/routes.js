

module.exports = function (app){
    
const jobsController = require('../controllers/jobs');
const signupController = require('../controllers/authentication/signup');
const loginController = require('../controllers/authentication/login');


  app.get('/jobs',  jobsController.getJobsPage)

  
  //authetication routes
  app.get('/signup',  signupController.getSignUp)
  app.get('/login',  loginController.getLogin)


}