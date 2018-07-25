module.exports.getProfile =  (req, res, next) => {
    console.log(req.user.type)
    if(req.user.type === 'employer'){
       
        res.render('profile/employer/employer_profile')
   
    } else if( req.user.type === "jobseeker") {
        res.render('profile/jobseeker/jobseeker_profile')
   
    } else{
        res.redirect('/login')
    }
};
//profile edit
module.exports.getProfileEdit =  (req, res, next) => {
    console.log(req.user.type)
    if(req.user.type === 'employer'){
        res.render('profile/employer/employer_profile_edit')
   
    } else if( req.user.type === "jobseeker") {
        res.render('profile/jobseeker/jobseeker_profile_edit')
   
    } else{
        res.redirect('/login')
    }
};


module.exports.getCompanyInfoEdit =  (req, res, next) => {
    res.render('profile/employer/company_info_edit')

};



module.exports.getChangePassword =  (req, res, next) => {
    res.render('profile/common/change_password')

};

