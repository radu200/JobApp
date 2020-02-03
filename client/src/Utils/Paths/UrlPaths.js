
if(process.env.NODE_ENV === 'development') {
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
    const Chats = `/chats`

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
} else if(process.env.NODE_ENV === 'production'){
    const LoginUrl = `/api/login`;
    const LogOut = `/api/logout`
    const JobDetailsUrl = `/api/job/details/`;
    const SignUpUrlJobSeeker =`/api/signup/jobseeker`;
    const SignUpUrlEmployer =`/api/signup/employer`;
    const Profile = `/api/profile`;
    const SearchCandidate = `/search-candidate`;
    const MyJobs  = `/api/my-jobs`;
    const Help = `/api/contact-us`;
    const Settings = `/api/settings`
    const Chats = `/chats`

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
}
