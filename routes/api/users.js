const express   = require('express'),
      router	= express.Router(),
      {check, validationResult} = require('express-validator/check');

router.post('/', [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Please enter a password with more than 8 characters').isLength({min:8})
    ], function(req,res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    res.send('user route');
});

module.exports = router;