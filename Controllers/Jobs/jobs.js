const db = require('../.././Config/database.js');
const multer = require('multer');
const path = require('path')
const fs = require('fs')
const sharp = require('sharp')
// multer configuration for product image upload
const uploadJobImage = multer({
    dest: 'public/tmp_folder/',
    limits: {
        fileSize: 2e+7
    },

    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {

            cb(" We only support PNG, GIF, or JPG pictures.")
        }
    }
}).single('job_image')








module.exports.getJobsPage = (req, res, next) => { 
   db.query("select * from jobs", function(err,results){
      if( err){
        console.log("[mysql error],", err)
      }else{
          res.render('Jobs/jobs',{
              'results':results
          })
      }
      console.log('results', results)
      console.log('user', req.user)
   })
};


module.exports.getAddJobs =  (req, res, next) => {
    res.render('Jobs/add_job')
};


module.exports.postAddJobs =  (req, res, next) => {
    //  const category = req.body.category;
    //  const position = req.body.position;
    //  const description = req.body.job_description;
    //  const city = req.body.city; 
    //  const employment_type = req.body.employment_type;
    //  const schedule_details = req.body.schedule_details;
    //  const immediate_start  = req.body.immediate_start
    //  const salary = req.body.salary;
    //  const experience = req.body.experience;
    //  const language = req.body.language;
    //  const language_level = req.body.language_level;
    //  const commission = req.body.commission
    //  const currency = req.body.currency

    //  console.log('category',category)
    //  console.log(position)
    //  console.log('des',description)
    //  console.log(city)
    //  console.log('employement',employment_type)
    //  console.log(schedule_details)
    //  console.log(immediate_start)
    //  console.log(salary)
    //  console.log('experience',experience)
    //  console.log(language.toString())
  
    //  console.log('user',req.user)
  

    //  req.checkBody('category', 'Alege Categoria').notEmpty();
    //  req.checkBody("position",   'Poziția  este necesară').notEmpty();
    //  req.checkBody('position', ' Pozitia trebuie să aibă o lungime între 1 și 70 de caractere').len(1, 70);
    //  req.checkBody("job_description",   'Descriere este necesara').notEmpty();
    //  req.checkBody('job_description', ' Descrierea trebuie să aibă o lungime între 1 și 300 de caractere').len(1, 301);
    //  req.checkBody('city', "Locatia este necesara").notEmpty();
    //  req.checkBody('employment_type', 'Alege tipul de angajare').notEmpty();
    //  req.checkBody('schedule_details', ' Descrierea trebuie să aibă o lungime între 0 și 70 de caractere').len(0, 70);
    //  req.checkBody('salary', 'Salariu trebuie să aibă o lungime între 0 și 8 de cifre.').len(0,8);
    //  req.checkBody({'salary':{ optional: {  options: { checkFalsy: true }},isDecimal: {  errorMessage: 'Salariu trebuie sa fie decimal'} } });
    //  req.checkBody('commission', 'Comisioanele trebuie să aibă o lungime între 0 și 70 de caractere').len(0, 70);
    //  req.checkBody('experience', 'Alege experienta').notEmpty();

   
    
     const errors = req.validationErrors();

     if (errors) {
         req.flash('error_msg', errors);
         return res.redirect('back')
     }
     
     uploadJobImage(req,res, (err) => {

          if(req.file){
          var job_image = req.file.filename;
        
          sharp(req.file.path)
          .resize(500,281)
          .toFile( './public/uploads/' + req.file.filename, (err, info) => {
              console.log(info)
            });
            
            
        } else{
            job_image = 'no_job_image.png' 
        }
        // let lang = language.toString();
        
        let jobs = {
            
            //  employer_id:req.user.id,
        //  category:category,
        //  position:position,
        //  city:city,
        //  employment_type:employment_type,
        //  schedule_details:schedule_details,
        //  immediate_start:immediate_start,
        //  salary:salary,
        //  experience:experience,
        //  language:lang,
        //  currency:currency
        image:job_image
    }
    
    
    
    //creat employer
    db.query('INSERT INTO jobs SET ?', jobs, (error, results) => {
        
        
        //delete original image
        
          if(!undefined){

              fs.unlink('./public/tmp_folder/' + req.filename, function(err){
                if (err) {
                console.log("failed to delete file:" + err);
              } else {
                  console.log('successfully deleted ');
              }
              })
          }else{
              return next();
          }
       
        
        //  description:description,
        
        if (err) {
            console.log('[mysql error]', error)
            res.status(500).json({
                error: err
            });
        } else {
            res.status(200).json({
                message: "Job Added",
                //   posts: {
                    //     image: filename,
                    //     name: req.body.name,
        //     size:5e+6
        //   }
    })
    
}
})
 })
};
