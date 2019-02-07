const {db} = require('../../../.././config/database.js');
const fs = require('fs')
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

module.exports.postProfileAvatarEdit = (req, res, next) => {
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

            avatar = null;

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















