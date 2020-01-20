const { validationResult } = require('express-validator/check');

 function validationError(req, res, next){
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    
        if (!errors.isEmpty()) {
          res.status(422).json({ errors: errors.array() });
          return;
        }
    } catch(err){
        return next(err)
    }

}

module.exports = {
    validationError
}