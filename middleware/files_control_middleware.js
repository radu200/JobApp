const multer = require('multer');
const path = require('path')
  
  // multer configuration for product image upload
  module.exports.uploadJobImage = multer({
    dest: 'public/tmp_folder/',
    limits: {
        fileSize: 5e+6 // 5 mb
    },
  
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
  
            cb(" We only support PNG, GIF, or JPG pictures.")
        }
    }
  }).single('job_image')

  
  module.exports.editJobImage = multer({
    dest: 'public/tmp_folder/',
    limits: {
        fileSize: 5e+6
    },

    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {

            cb(" We only support PNG, GIF, or JPG pictures.")
        }
    }
}).single('job_image_edit')
