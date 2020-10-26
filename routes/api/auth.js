const express   = require('express'),
      router	= express.Router(),
      config    = require('config'),
      jwt       = require('jsonwebtoken'),
      bcrypt    = require('bcryptjs'),
      {check, validationResult} = require('express-validator/check');

const User = require('../../models/User');

router.get('/', VerifyToken, async(req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({user});
    } catch (err) {
        console.error(err.message);
        res.status(401).json({msg: 'Token cannot be verified.'})
    }
});

router.post('/', [
    //check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password required').exists()
], async(req,res) => {

const errors = validationResult(req);
const {email, password} = req.body;

if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
}

try{
    let user = await User.findOne({email});
    if(!user){
        res.status(400).json({errors:[{msg: 'Invalid Login Credentials'}]});
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        res.status(400).json({errors:[{msg: 'Invalid Login Credentials'}]});
    }

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

function VerifyToken(req,res,next){
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({msg: 'Token missing. Login authorization denied.'});
    }

    try {
       const decoded = jwt.verify(token, config.get('tokensecret'));

       req.user = decoded.user;
       next();
    } catch (error) {
        res.status(401).json({msg: 'Invalid token'});
    }
}

module.exports = router;