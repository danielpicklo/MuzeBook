const express   = require('express'),
      router	= express.Router(),
      config    = require('config'),
      jwt       = require('jsonwebtoken'),
      bcrypt    = require('bcryptjs'),
      {check, validationResult} = require('express-validator/check');

//Models
const   User = require('../../models/User'),
        Post = require('../../models/Post'),
        Profile = require('../../models/Profile');

router.post('/', [ VerifyToken, [
    check('text', 'Text is required to post.').not().isEmpty()
]], async function(req,res) {
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({error: err.array()});
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