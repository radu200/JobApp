
const {
    dbPromise
} = require('../.././config/database.js');
const fs = require('fs')
const fsPromises = fs.promises;
const sharp = require('sharp')



module.exports.getJobsPage = async (req, res, next) => {
    const offset = req.body.offset;
    try {

        const db = await dbPromise
        const [jobs] = await db.execute(`select * from jobs LIMIT 2 OFFSET ${offset} `);
       
       res.json(jobs)

    } catch (err) {
        console.log(err)
    }





    // })
    //    if(req.headers['jobs-list'] !== 'true'){
    //        res.redirect('/jobs.html')
    //     } else{
    //         db.query(`select * from jobs `, function (err, results) {
    //             if (err) {
    //                 console.log("[mysql error],", err)
    //             } else {
    //                 res.json(results)
    //             }

    //         })
    //    }



};

module.exports.JobsPage = async (req, res, next) => {
    try {

        const db = await dbPromise
        const [jobs] = await db.execute(`select * from jobs  `);
       
        res.render('./jobs/jobs',{
            'results':jobs
        })

    } catch (err) {
        console.log(err)
    }

};




module.exports.getAddJobs = (req, res, next) => {
    res.render('jobs/add_job', )
};


module.exports.postAddJobs = async (req, res, next) => {



    const category = req.body.category;
    const position = req.body.position;
    const description = req.body.job_description;
    const city = req.body.city;
    const employment_type = req.body.employment_type;
    const start_time = req.body.immediate_start
    const salary = req.body.salary;
    const experience = req.body.experience;
    const language = req.body.language;






    req.checkBody('category', 'Alege Categoria').notEmpty();
    req.checkBody("position", 'Poziția  este necesară').notEmpty()
    req.checkBody('position', ' Pozitia trebuie să aibă o lungime între 1 și 70 de caractere').len(1, 70);
    req.checkBody('job_description', ' Descrierea trebuie să aibă o lungime între 1 și 300 de caractere').len(1, 301);
    req.checkBody('city', "Locatia este necesara").notEmpty();
    req.checkBody('employment_type', 'Alege tipul de angajare').notEmpty();
    req.checkBody('salary', 'Salariu trebuie să aibă o lungime între 0 și 8 de cifre.').len(0, 9);
    req.checkBody({
        'salary': {
            optional: {
                options: {
                    checkFalsy: true
                }
            },
            isDecimal: {
                errorMessage: 'Salariu trebuie sa fie decimal'
            }
        }
    });
    req.checkBody('salary', 'Formatul salariului este incorect').matches(/^\d{0,8}(?:\.\d{0,2})?$/);
    req.checkBody('experience', 'Alege experienta').notEmpty();






    const errors = req.validationErrors();

    if (errors) {
        req.flash('error_msg', errors);
        return res.redirect('/jobs/add')
    }



    try {
        const db = await dbPromise;
        if (req.file) {
            var job_image = '/uploads/jobs/' + req.file.filename;
            //resize image
            await sharp(req.file.path)
                .resize(200, 157)
                .toFile('../files/uploads/jobs/' + req.file.filename);

            await fsPromises.unlink('../files/tmp_folder/' + req.file.filename);

        } else {
            job_image = null;

        }




        if (language) {
            var lang = language.toString();
        }

        let jobs = {
            employer_id: req.user.id,
            category: category,
            position: position,
            description: description,
            city: city,
            employment_type: employment_type,
            start_time: start_time,
            salary: salary,
            experience: experience,
            language: lang,
            image: job_image
        }



        //     //creat employer
        await db.query("INSERT INTO jobs SET ?", jobs);

        res.redirect('/my_jobs')



    } catch (err) {
        console.log(err)
        
        req.flash('error_msg', {
            msg: "O eroare a avut loc, incercati din nou."
        });
        res.redirect('back');
    }




};

module.exports.getJobImageEdit = async (req, res, next) => {

    try {
        const db = await dbPromise;

        const [userDetails] = await db.execute('select id, image from jobs  where id= ?', [req.params.id]);

        res.render('./jobs/job_edit_image', {
            'results': userDetails
        })

    } catch (err) {
        console.log(err)
    }

}



module.exports.postJobImageEdit = async (req, res, next) => {

    try {
        const db = await dbPromise;

        const [userDetails] = await db.execute(`select id, image from jobs where id = ?`, [req.params.id]);

        if (req.file) {
            var image = '/uploads/jobs/' + req.file.filename;
            var filename = req.file.filename;
            await sharp(req.file.path)
                .resize(820, 461)
                .toFile(`../files/uploads/jobs/${req.file.filename}`);


        } else {
            image = null;
        }


        await Promise.all([

            db.execute(`update jobs set image = ? where id = ?`, [image, req.params.id]),

            ///remove image from temp folder
            fsPromises.unlink(`../files/tmp_folder/${filename}`),
        ])


        if (userDetails[0].image !== null) {
            //remove old image if exists
            await fsPromises.unlink(`../files/${userDetails[0].image}`)

        }

        res.json({
            msg: 'Image uploaded succefully'
        })

    } catch (err) {
        console.log('jobimageEdit', err)
        req.flash('error_msg', {
            msg: "O eroare a avut loc, incercati din nou."
        });
        res.redirect('back');
    }
};



//employer jobs
module.exports.getEmployerJobs = async (req, res, next) => {


    try {
        const db = await dbPromise;

        const [jobs] = await db.execute("select * from jobs where employer_id = ? ", [req.user.id])

        res.render('profile/employer/employer_jobs', {
            'results': jobs
        })

    } catch (err) {
        console.log(err)
    }

}

//employer jobs
module.exports.getEmployerJobEdit = async (req, res, next) => {

    try {
        const db = await dbPromise;

        const [jobs] = await db.execute("select * from jobs where id = ? ", [req.params.id])

        res.render('jobs/jobs_edit_info', {
            'result': jobs[0]
        })

    } catch (err) {
        req.flash('error_msg', {
            msg: "O eroare a avut loc, incercati din nou."
        });
        res.redirect('back');
        console.log(err)
    }



}


//employer jobs
module.exports.postEmployerJobEdit = async (req, res, next) => {

    const category = req.body.category;
    const position = req.body.position;
    const description = req.body.job_description;
    const city = req.body.city;
    const employment_type = req.body.employment_type;
    const start_time = req.body.immediate_start
    const salary = req.body.salary;
    const experience = req.body.experience;
    const language = req.body.language;
    const currency = req.body.currency





    req.checkBody('category', 'Alege Categoria').notEmpty();
    req.checkBody("position", 'Poziția  este necesară').notEmpty()
    req.checkBody('position', ' Pozitia trebuie să aibă o lungime între 1 și 70 de caractere').len(1, 70);
    req.checkBody('job_description', ' Descrierea trebuie să aibă o lungime între 1 și 300 de caractere').len(1, 301);
    req.checkBody('city', "Locatia este necesara").notEmpty();
    req.checkBody('employment_type', 'Alege tipul de angajare').notEmpty();
    req.checkBody('salary', 'Salariu trebuie să aibă o lungime între 0 și 8 de cifre.').len(0, 9);
    req.checkBody({
        'salary': {
            optional: {
                options: {
                    checkFalsy: true
                }
            },
            isDecimal: {
                errorMessage: 'Salariu trebuie sa fie decimal'
            }
        }
    });


    const errors = req.validationErrors();

    if (errors) {
        req.flash('error_msg', errors);
        return res.redirect('back')
    }


    if (language) {
        var lang = language.toString();

    }

    let job = {
        category: category,
        position: position,
        description: description,
        city: city,
        employment_type: employment_type,
        start_time: start_time,
        salary: salary,
        experience: experience,
        language: lang,
        currency: currency,

    }


    try {
        const db = await dbPromise;

        await db.query(`UPDATE jobs SET  ?  WHERE id = ?`, [job, req.params.id])

        res.redirect('/my_jobs')

    } catch (err) {
        console.log(err)

        req.flash('error_msg', {
            msg: "O eroare a avut loc, incercati din nou."
        });
        res.redirect('back');
    }

}


//delete product
module.exports.deleteJob = async (req, res, next) => {
    let id = req.params.id;

    try {
        const db = await dbPromise;
        const [userDetails] = await db.query(`SELECT id,image FROM jobs  WHERE id =${id}`);
        console.log(userDetails[0].image)
       

        await db.execute(`DELETE FROM jobs  WHERE id =${id}`);

        if (userDetails[0].image && userDetails[0].image !== null) {
            await fsPromises.unlink(`./public/${userDetails[0].image}`)
        }

        req.flash('success_msg', {
            msg: "Jobul a fost sters cu success"
        });
        res.redirect('back');
    
    } catch (err) {
        console.log(err)
        
        req.flash('error_msg', {
            msg: "O eroare a avut loc, incercati din nou."
        });
        res.redirect('back');
    }


};


//job detail page
module.exports.getJobDetail = async (req, res, next) => {

    try{
        const db = await dbPromise;
        const [userDetails] = await db.execute('select jobs.*, users.id as userId,users.first_name, users.last_name, users.company_name,users.company_description,users.company_location, company_type, users.avatar from jobs LEFT JOIN users ON  jobs.employer_id = users.id where jobs.id = ?', [req.params.id])
        console.log(userDetails)
        res.render('jobs/job_details', {
            "result": userDetails[0],

        })



     
    }catch(err){
        console.log(err)

        req.flash('error_msg', {
            msg: "O eroare a avut loc, incercati din nou."
        });
        res.redirect('back');

    }
   
}