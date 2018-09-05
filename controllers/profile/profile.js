const db = require('../.././config/database.js');

module.exports.getProfile =  (req, res, next) => {
    console.log(req.user.type)
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


module.exports.getCompanyInfoEdit =  (req, res, next) => {
   db.query('select id, company_description,company_name, company_location from users where id = ?', [req.user.id], (err, results) => {
       if (err) throw err
      console.log(results)
       res.render('profile/employer/company_info_edit',{
            'result':results[0]
       })
   })

};

module.exports.getEmployerProfileInfoEdit =  (req, res, next) => {
    db.query('select id, first_name, last_name from users where id = ?', [req.user.id], (err, results) => {
        if (err) throw err
        console.log(results)
        res.render('profile/employer/employer_profile_edit',{
                'result':results[0]
            })
    })
 
 };


 module.exports.postEmployerProfileInfoEdit =  (req, res, next) => {
    let  first_name = req.body.first_name_edit;
    let last_name = req.body.last_name_edit;

    // req.checkBody('first_name', 'Prenumele trebuie să aibă o lungime între 1 și 250 de caractere').len(0, 250);
    // req.checkBody('last_name ', 'Numele trebuie să aibă o lungime între 1 și 250 de caractere').len(0, 250);
    // req.checkBody('last_name ', 'Numele trebuie să aibă o lungime între 1 și 250 de caractere').notEmpty();

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
 
module.exports.postCompanyInfoEdit =  (req, res, next) => {

    const name = req.body.company_name;
    const description = req.body.company_description
    const location = req.body.company_location;



    req.checkBody('company_name ', 'Pozitia trebuie să aibă o lungime pina la 250 de caractere').len(0, 250);
    req.checkBody("company_description",   'Descriere este necesara').notEmpty().isString() ;
    req.checkBody('company_description', 'Descrierea trebuie să aibă o lungime pina la 250 de caractere').len(0, 250);

   


 

    const errors = req.validationErrors();

    if (errors) {
        req.flash('error_msg', errors);
         return  res.redirect('back')
    }

    let company = {
         company_name:name,
         company_description:description,
         company_location:location
    }
    db.query('update   users set ?  where id = ?', [company,req.user.id], (err, results) => {
        if (err) throw err
       console.log(results)
        res.redirect('/profile')
    })
 
 };

module.exports.getChangePassword =  (req, res, next) => {
    res.render('profile/common/change_password')

};

