 const db = require('../../../.././config/database.js');
 const { check, validationResult } = require('express-validator/check');
module.exports.getCandidate = (req,res,next) => {
   res.render('profile/employer/candidate_search')
}

module.exports.getCandidateDetails = (req,res,next) => {
    res.render('profile/employer/candidate_details')
 }
 

 module.exports.getEmployerJobDetail = (req,res,next) => {
    res.render('profile/employer/employer_job_detail')
 }





//employer
module.exports.getEmployerProfileInfoEdit =  (req, res, next) => {
    db.query('select id, first_name, last_name from users where id = ?', [req.user.id], (err, results) => {
        if (err) throw err
       
        res.render('profile/employer/employer_profile_edit',{
                'result':results[0]
            })
    })
 
 };


 //employer
 module.exports.postEmployerProfileInfoEdit =  (req, res, next) => {
    let  first_name = req.body.firstName
    let last_name = req.body.lastName;
    req.checkBody('firstName', 'Prenumele trebuie să aibă o lungime între 1 și 250 de caractere').len(1, 250);
    req.checkBody('lastName', 'Numele de familie trebuie să aibă o lungime între 1 și 250 de caractere').len(1, 250);

    const errors = req.validationErrors();

    if (errors) {
        req.flash('error_msg', errors);
         return  res.redirect('back')
    }


    let user = {
        first_name:first_name,
         last_name:last_name
    }
    db.query('update users  set ? where id = ?', [user,req.user.id], (err, results) => {
        if (err) throw err
        console.log(results)
        res.redirect('/profile')
    })
 
 };
  ///employer
module.exports.getCompanyInfoEdit =  (req, res, next) => {
    db.query('select id, company_description,company_name, company_location, company_type from users where id = ?', [req.user.id], (err, results) => {
        if (err) throw err
       console.log(results)
        res.render('profile/employer/company_info_edit',{
             'result':results[0]
        })
        console.log(results)
    })
 
 };

 
 //employer
module.exports.postCompanyInfoEdit =  (req, res, next) => {

    const name = req.body.companyName;
    const description = req.body.companyDescription
    const location = req.body.company_location;
    const type = req.body.companyType;
    console.log(name)
    console.log(type)
    //asta e solutia validarii
    req.checkBody('companyName', 'Numele trebuie să aibă o lungime intre 1 si 70 de caractere.').len(1, 70);
    req.checkBody('companyType', 'Tipul companiei trebuie să aibă o lungime intre 1 si 70 de caractere').len(1, 70);
    req.checkBody('companyDescription', 'Descrierea trebuie să aibă o lungime intre 1 si 250 de caractere').len(1, 250);
 
    

    const errors = req.validationErrors();

    if (errors) {
       req.flash('error_msg', errors);
        return  res.redirect('/company/info/edit')
    }

    let company = {
         company_name:name,
         company_description:description,
         company_location:location,
         company_type:type
    }
    db.query('update   users set ?  where id = ?', [company,req.user.id], (err, results) => {
        if (err) throw err
       console.log(results)
        res.redirect('/profile')
    })
 
 };
//employer company profile
module.exports.getCompanyProfile =  async (req,res, next) => {
    let userId = req.user.id;
    function awaitGetCompany(userId){
        return new Promise(function(resolve, reject){
    
            db.query("SELECT  avatar,first_name, users.last_name, users.company_name,users.company_description,users.company_location, company_type  FROM  users WHERE users.id = ?" ,[userId] ,function(err, result_employer, fields) {
                if (err) {
                    console.log(err);
                    resolve([]);
                }
                resolve(result_employer); 
                 console.log(result_employer)              

            });
        });
    }
function awaitGetjobs(userId) {
        return new Promise(function(resolve, reject){
            db.query("SELECT * FROM  jobs WHERE jobs.employer_id = ?  ", [userId], function(err, results, fields){
                if(err){
                    console.log(err);
                    resolve([]);
                }
         
                resolve(!err && results ? results : []); 
                console.log('jobs', results)
            });
        });
    }
    let users_result = await awaitGetCompany(userId); 
    let  jobs = await awaitGetjobs(userId);
 
    res.render('profile/employer/company_profile', {
        "job": jobs,
        "employer": users_result[0]
    });

}