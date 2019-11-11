module.exports = function (app) {

  const jobsController = require('../controllers/jobs/jobs');
  const signupEmployerController = require('../controllers/authentication/employer/signup');
  const signupJobSeekerController = require('../controllers/authentication/job_seeker/signup');
  const settingsController = require('../controllers/users/settings/settings');
  const profileController = require('../controllers/users/profile/common/profile');
  const employerProfileController = require('../controllers/users/profile/employer/profile')
  const JobSeekerProfileController = require('../controllers/users/profile/job_seeker/profile');
  const EmployerProfileController = require('../controllers/users/profile/employer/profile');
  const chatController = require('../controllers/chat/chat');
  const loginController = require('../controllers/authentication/common/login');
  const homeController = require('../controllers/home');
  const contactUs = require('../controllers/helpPages/contactUs')
  const accessController = require('../middleware/access_control_middleware');
  const filesController = require('../middleware/files_control_middleware');
  const searchController = require('../controllers/search/search');
  const adminController = require('../controllers/dashboard/admin')
  app.get('/api/home', homeController.getHomePage)
  app.get('/api/success', homeController.getSuccessPage)
  //authetication routes
  app.get('/api/signup/employer', signupEmployerController.getSignUpEmployer)
  app.post('/api/signup/employer', signupEmployerController.postSignUpEmployer)

  app.get('/api/signup/jobseeker', signupJobSeekerController.getSignUpJobSeeker)
  app.post('/api/signup/jobseeker', signupJobSeekerController.postSignUpJobSeeker)

  //login
  app.get('/api/login', loginController.getLogin)
  app.post('/api/login', loginController.postLogin)
  app.get('/api/logout', loginController.getLogout)


  //user settings 
  app.get('/api/settings', accessController.ensureAuthenticated, settingsController.getSettings);
  //change email
  app.get('/api/change/email', accessController.ensureAuthenticated, settingsController.getChangeEmail)
  app.post('/api/change/email', accessController.ensureAuthenticated, settingsController.postChangeEmail)
  //verify email after signup
  app.get('/api/email/verify/:token', settingsController.getCheckEmail);
  app.get('/api/resend/email/check', settingsController.getResendEmailCheck)
  app.post('/api/resend/email/check', settingsController.postResendEmailCheck)
  //forgot password
  app.get('/api/forgot/password', settingsController.getForgotPassword);
  app.post('/api/forgot/password', settingsController.postForgotPassword);
  app.get('/api/forgot/password/reset/:token', settingsController.getForgotPasswordReset)
  app.post('/api/forgot/password/reset/:token', settingsController.postForgotPasswordReset)
  //change pasword within profile
  app.get('/api/change/password', accessController.ensureAuthenticated, accessController.ensureEmailChecked, settingsController.getChangePassword)
  app.post('/api/change/password', accessController.ensureAuthenticated, settingsController.postChangePassword)

  //profile common
  app.get('/api/profile', accessController.ensureAuthenticated, accessController.ensureEmailChecked, profileController.getProfile)
  app.get('/api/profile/avatar', accessController.ensureAuthenticated, profileController.getProfileAvatarEdit)
  app.post('/api/profile/avatar', accessController.ensureAuthenticated, filesController.avatar, profileController.postProfileAvatarEdit)
  //employer profile
  app.get('/api/profile/edit/employer', accessController.ensureAuthenticated, accessController.ensureEmailChecked, accessController.employer, employerProfileController.getEmployerProfileInfoEdit)
  app.post('/api/profile/edit/employer', accessController.ensureAuthenticated, accessController.employer, employerProfileController.postEmployerProfileInfoEdit)
  app.get('/api/company/info/edit', accessController.ensureAuthenticated, accessController.employer, employerProfileController.getCompanyInfoEdit)
  app.post('/api/company/info/edit', accessController.ensureAuthenticated, accessController.employer, employerProfileController.postCompanyInfoEdit)
  app.get('/api/company/:id', accessController.ensureAuthenticated, employerProfileController.getCompanyProfile)
  //employer jobs
  app.get('/api/my-jobs', accessController.ensureAuthenticated, accessController.employer, jobsController.getEmployerJobs)
  app.get('/api/candidate_details', accessController.ensureAuthenticated, accessController.employer, EmployerProfileController.getCandidateDetails)
  app.get('/api/employer/job/detail', accessController.ensureAuthenticated, accessController.employer, EmployerProfileController.getEmployerJobDetail)

  //jobseeker
  app.get('/api/application', accessController.ensureAuthenticated, accessController.jobSeeker, JobSeekerProfileController.getApplication)
  app.get('/api/profile-edit/jobseeker', accessController.ensureAuthenticated, accessController.jobSeeker, JobSeekerProfileController.getJobSeekerProfileInfoEdit)
  app.post('/api/profile-edit/jobseeker', accessController.ensureAuthenticated, accessController.jobSeeker, JobSeekerProfileController.postJobSeekerProfileInfoEdit)
  app.get('/api/jobseeker/experience', accessController.ensureAuthenticated, accessController.jobSeeker, JobSeekerProfileController.getJobSeekerExperienceAdd)
  app.post('/api/jobseeker/add/experience', accessController.ensureAuthenticated, accessController.jobSeeker, JobSeekerProfileController.postJobSeekerExperience)
  app.get('/api/jobseeker/experience/edit/:id', accessController.ensureAuthenticated, accessController.jobSeeker, JobSeekerProfileController.getJobSeekerEditExperience)
  app.post('/api/jobseeker/experience/edit/:id', accessController.ensureAuthenticated, accessController.jobSeeker, JobSeekerProfileController.postJobSeekerEditExperience)
  app.delete('/api/jobseeker/experience/delete/:id', accessController.ensureAuthenticated, accessController.jobSeeker, JobSeekerProfileController.deleteJobSeekerExperience)

  //chat 
  app.get('/api/chat', accessController.ensureAuthenticated, chatController.getChat)
  app.get('/api/room/:name', accessController.ensureAuthenticated, chatController.getRoom)
  app.post('/api/room', accessController.ensureAuthenticated, chatController.postRoom)

  //jobs controller 
  app.get('/api/jobs', jobsController.getJobsPage)
  app.post('/api/job-application/applicants/active/:id', accessController.ensureAuthenticatedJsonRes, accessController.employer, jobsController.JobApplicationApplicantsActive)
  app.post('/api/job-application/applicants/rejected/:id', accessController.ensureAuthenticatedJsonRes, accessController.employer, jobsController.JobApplicationApplicantsRejected)
  app.post('/api/job-application/applicants/shortlist/:id', accessController.ensureAuthenticatedJsonRes, accessController.employer, jobsController.JobApplicationApplicantsShortList)
  app.post('/api/job-application/jobseeker', accessController.ensureAuthenticated, accessController.jobSeeker, jobsController.JobApplicationJobSeeker)
  app.post('/api/apply/job/:id', accessController.ensureAuthenticated, accessController.jobSeeker, jobsController.postApplyJobs)
  app.get('/api/jobs/add', accessController.ensureAuthenticated, accessController.employer, accessController.ensureEmailChecked, jobsController.getAddJobs)
  app.post('/api/jobs/add', accessController.ensureAuthenticated, accessController.employer, filesController.uploadJobImage, jobsController.postAddJobs)
  app.get('/api/job_image/edit/:id', accessController.ensureAuthenticated, accessController.employer, jobsController.getJobImageEdit)
  app.post('/api/job_image/edit/:id', accessController.ensureAuthenticated, accessController.employer, filesController.editJobImage, jobsController.postJobImageEdit)
  app.get('/api/job/edit/:id', accessController.ensureAuthenticated, accessController.employer, jobsController.getEmployerJobEdit)
  app.post('/api/job/edit/:id', accessController.ensureAuthenticated, accessController.employer, jobsController.postEmployerJobEdit)
  app.delete('/api/job/delete/:id', accessController.ensureAuthenticated, accessController.employer, jobsController.deleteJob)
  app.get('/api/job/details/:id', jobsController.getJobDetail)

  //search
  app.get('/api/candidate-details/:id', accessController.ensureAuthenticatedJsonRes, searchController.getCandidateDetails)
  app.post('/api/search/job', searchController.searchJobs)
  app.post('/api/candidate-search', accessController.ensureAuthenticated, searchController.searchCandidates)
  ///contact us
  app.get('/api/contact-us', accessController.ensureAuthenticated, contactUs.getContactUs);

   //dashboard
  app.get('/api/admin/users', accessController.ensureAuthenticated,  adminController.getAllUsers )
  app.get('/api/admin/check',accessController.ensureAuthenticated, adminController.getCheckUsers )
  app.get('/api/admin/black-list',accessController.ensureAuthenticated,  adminController.getAllBlackListedUsers)
  app.post('/api/admin/black-list', accessController.ensureAuthenticated, adminController.postBlackListeddUsers )
  app.get('/api/admin/reported', accessController.ensureAuthenticated, adminController.getAllUsers )
  
  //reports
  app.get('/api/report/:id', accessController.ensureAuthenticated, settingsController.getReportUser)
  app.post('/api/report', accessController.ensureAuthenticated, settingsController.postReportUser)

}

