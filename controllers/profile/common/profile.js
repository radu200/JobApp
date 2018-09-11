const db = require('../../../config/database.js');
const fs = require('fs')
const sharp = require('sharp')
const { check, validationResult } = require('express-validator/check');

module.exports.getProfile =  (req, res, next) => {
    if(req.user.type === 'employer'){
        db.query('select * from users where id = ? ', [req.user.id], (err, results) => {
            res.render('profile/employer/employer_profile',{
                'result':results[0]
            })
        })
   
    } else if( req.user.type === "jobseeker") {
        res.render('profile/jobseeker/jobseeker_profile')
   
    } else{
        res.redirect('/login')
    }
};

module.exports.getProfileAvatarEdit = (req,res,next) => {
        db.query('select id, avatar from users where id = ? ', [req.user.id], (err, results) => {
            res.render('profile/common/profile_avatar_edit',{
                'result':results[0]
            })
        })
   
    
}

module.exports.postProfileAvatarEdit = (req,res,next) => {
    db.query(`select id, avatar from users where id=${req.user.id}`, (err, results) => {
 
        fs.unlink('./public/' + results[0].avatar, function (err) {
            if (err) {
                console.log("failed to delete file:" + err);
            } else {
                console.log('successfully deleted ');
            }
        })


            const errors = req.validationErrors();

            if (errors) {
                req.flash('error_msg', errors);
                return res.redirect('back')
            }


                if (req.file) {
                    var avatar = './uploads/' + req.file.filename;
                    // resize image
                    sharp(req.file.path)
                        .resize(200, 157)
                        .toFile('./public/uploads/' + req.file.filename, (err, info) => {
                            if (err) {
                                console.log('sharp err', err)
                            } else {

                                //delete old image that was just resized
                                fs.unlink('./public/tmp_folder/' + req.file.filename, function (err) {
                                    if (err) {
                                        console.log("failed to delete file:" + err);
                                    } else {
                                        console.log('successfully deleted ');
                                    }
                                })

                                console.log('resized success')




                              
                            }
                        });


                } else {

                    let images = ['/no_job_image_a.png', '/no_job_image_b.png', '/no_job_image_c.png']; 

                    let  random = images[Math.floor(Math.random() * images.length)];

                    avatar = random;
                  
}

                    let image = {
                        avatar: avatar
                    }



                //creat employer
                db.query(`update users set ? where id =${req.user.id}`, image, (error, results) => {

                    if (err) {
                        // console.log('[mysql error]', error)
                        res.status(500).json({
                            error: err
                        });
                    } else {
                        res.status(200).json({
                            message: "image succefully edited"
                        })
                        // console.log(req.file.path)
                      

                        //res.redirect('/my_jobs')
                    }

                })
           


        
         
    }) //db select query ends

}

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

module.exports.getEmployerProfileInfoEdit =  (req, res, next) => {
    db.query('select id, first_name, last_name from users where id = ?', [req.user.id], (err, results) => {
        if (err) throw err
        console.log(results)
        res.render('profile/employer/employer_profile_edit',{
                'result':results[0]
            })
    })
 
 };


 //employer
 module.exports.postEmployerProfileInfoEdit =  (req, res, next) => {
    let  first_name = req.body.first_name_edit;
    let last_name = req.body.last_name_edit;
    // req.checkBody('first_name', 'Prenumele trebuie să aibă o lungime între 1 și 250 de caractere').len(0, 250);
    // req.checkBody('last_name ', 'Numele trebuie să aibă o lungime între 1 și 250 de caractere').len(0, 250);

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
 
 //employer
module.exports.postCompanyInfoEdit =  (req, res, next) => {

    const name = req.body.company_name;
    const description = req.body.company_description
    const location = req.body.company_location;
    const type = req.body.company_type;
    
    
    // req.checkBody('company_name ', 'Numele trebuie să aibă o lungime pina la 70 de caractere').len(70);
    // req.checkBody('company_location ', 'Locatia companiei trebuie să fie din litere numai').isString();
    // req.checkBody('company_type ', 'Tipul companiei trebuie să aibă o lungime pina la 70 de caractere').len(70);
    // req.checkBody('company_description', 'Descrierea trebuie să aibă o lungime pina la 250 de caractere').isLength({ min: 1, max:250 });
    
    

 

    const errors = req.validationErrors();

    if (errors) {
       req.flash('error_msg', errors);
        return  res.redirect('back')
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
module.exports.getCompanyProfile = (req,res, next) => {
    
 getCompany (req, res,next);
}
async function getCompany (req, res,next){
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

module.exports.getChangePassword =  (req, res, next) => {
    res.render('profile/common/change_password')

};

