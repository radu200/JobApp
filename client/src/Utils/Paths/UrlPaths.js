
const webSiteUrl = 'http://localhost:8000';
const LoginUrl = `${webSiteUrl}/api/login`;
const LogOut = `${webSiteUrl}/api/logout`
const JobDetailsUrl = `${webSiteUrl}/api/job/details/`;
const SignUpUrlJobSeeker =`${webSiteUrl}/api/signup/jobseeker`;
const SignUpUrlEmployer =`${webSiteUrl}/api/signup/employer`;
const Profile = `${webSiteUrl}/api/profile`;
const SearchCandidate = `/search-candidate`;
const MyJobs  = `${webSiteUrl}/api/my-jobs`;
const Help = `${webSiteUrl}/api/contact-us`;
const Settings = `${webSiteUrl}/api/settings`
const Chats = `${webSiteUrl}/chats`

module.exports = {
    LoginUrl,
    JobDetailsUrl,
    SignUpUrlJobSeeker,
    SignUpUrlEmployer,
    LogOut,
    Profile,
    SearchCandidate,
    MyJobs,
    Help,
    Settings,
    Chats
};