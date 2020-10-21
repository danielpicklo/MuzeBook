const express   = require('express'),
      router	= express.Router(),
      {check, validationResult} = require('express-validator/check'),
      gravatar  = require('gravatar'),
      bcrypt    = require('bcryptjs'),
      jwt       = require('jsonwebtoken'),
      config    = require('config');

const User = require('../../models/User');

router.post('/', [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Please enter a password with more than 8 characters').isLength({min:8})
    ], async function(req,res) {

    const errors = validationResult(req);
    const {name, email, password} = req.body;

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try{
        let user = await User.findOne({email});
        if(user){
            res.status(400).json({errors:[{msg: 'user already exists'}]});
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({name, email, avatar, password});

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const pload = {
            user:{
                id: user.id
            }
        };

        jwt.sign(pload, config.get('tokensecret'), function(err, token) {
            if(err) throw err;
            res.json({token});
        });
    }catch(err){
        res.status(500).send('There is an issue with the server. Error Code 500');
    }
});

module.exports = router;