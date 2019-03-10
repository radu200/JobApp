const {
    db
} = require('../../../.././config/database.js');
const {
    dbPromise
} = require('../../../.././config/database.js');
const fs = require('fs')
const fsPromises = fs.promises;
const sharp = require('sharp')


module.exports.getProfile = async (req, res, next) => {


    try {
        const db = await dbPromise;

        if (req.user.type === 'employer') {
            const [employer] = await db.execute('select * from users where id = ? ', [req.user.id]);

            res.render('profile/employer/employer_profile', {
                'result': employer[0]
            })

        } else if (req.user.type === "jobseeker") {

            const [jobseeker] = await db.execute('select * from users where id = ? ', [req.user.id]);

            const [experience] = await db.execute('select * from jobseeker_experience where jobseeker_id = ? ', [req.user.id]);


            res.render('profile/jobseeker/jobseeker_profile', {
                'result': jobseeker[0],
                "experience":experience
                 
            })
          

        } else {
            res.redirect('/login')
        }


    } catch (err) {
        req.flash('error_msg',{msg:'O eroare a avut loc.Incercati din nou.'})
       
        res.redirect('back')

        console.log(err)
    }


};

module.exports.getProfileAvatarEdit = async (req, res, next) => {

    try {
        const db = await dbPromise;

        const [userDetails] = await db.execute('select id, avatar from users where id = ? ', [req.user.id]);

        res.render('profile/common/profile_avatar_edit', {
            'result': userDetails[0]
        })

    } catch (err) {
        console.log(err)
    }



}

module.exports.postProfileAvatarEdit = async (req, res, next) => {


    try {
        const db = await dbPromise;
        const [userDetails] = await db.execute(`select id, avatar from users where id=${req.user.id}`);

        if (req.file) {
            var avatar = `./uploads/users/${req.file.filename}`;
            var filename = req.file.filename;

            await sharp(req.file.path)
                .resize(200, 157)
                .toFile(`./public/uploads/users/${req.file.filename}`);


        } else {
            avatar = null;
        }


        await Promise.all([

            db.execute(`update users set  avatar = ? where id=${req.user.id}`, [avatar]),

            ///remove image from temp folder
            fsPromises.unlink(`./public/tmp_folder/${filename}`),
        ])

        if (userDetails[0].avatar !== null) {
            //remove old image if exists
            await fsPromises.unlink(`./public/${userDetails[0].avatar}`)

        }


        res.json({
            msg: 'Image uploaded succefully'
        })

    } catch (err) {
        console.log(err)

        req.flash('error_msg',{msg:'O eroare a avut loc.Incercati din nou.'})
       
        res.redirect('back')

    }
}