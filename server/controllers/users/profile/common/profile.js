const {db} = require('../../../.././config/database.js');
const {
dbPromise
} = require('../../../.././config/database.js');
const fs = require('fs')
const fsPromises = fs.promises;
const sharp = require('sharp')


module.exports.getProfile = (req, res, next) => {
    if (req.user.type === 'employer') {
        db.query('select * from users where id = ? ', [req.user.id], (err, results) => {
            res.render('profile/employer/employer_profile', {
                'result': results[0]
            })
        })

    } else if (req.user.type === "jobseeker") {
    db.query('select * from users where id = ? ', [req.user.id], (err, results) => {
        res.render('profile/jobseeker/jobseeker_profile',{
            'result': results[0]
        })

    })

    } else {
        res.redirect('/login')
    }
};

module.exports.getProfileAvatarEdit = (req, res, next) => {
    db.query('select id, avatar from users where id = ? ', [req.user.id], (err, results) => {
        res.render('profile/common/profile_avatar_edit', {
            'result': results[0]
        })
    })


}

module.exports.postProfileAvatarEdit = async (req, res, next) => {


    try {
        const db =  await dbPromise;
        const [userDetails] = await db.execute(`select id, avatar from users where id=${req.user.id}`);
      
       
           
        if (req.file){
            var avatar = './uploads/' + req.file.filename;
            var filename = req.file.filename;
           await  sharp(req.file.path)
                        .resize(200, 157)
                        .toFile('./public/uploads/' + req.file.filename);
    

         } else {
             avatar = null;
         }


         await Promise.all([

             db.execute(`update users set  avatar = ? where id=${req.user.id}`, [avatar]),
   
           ///remove image from temp folder
            fsPromises.unlink('./public/tmp_folder/' + req.file.filename),
        ])
            
           if(userDetails[0].avatar !== null){
                //remove old image if exists
               await  fsPromises.unlink('./public/' + userDetails[0].avatar)
                
            }
    
        
          res.json({
              msg:'Image uploaded succefully'
          })

    } catch(err){
        console.log(err)
        res.json({
            msg:'An error occurred'
        })
       
    }

  

}















