const express   = require('express'),
      router	= express.Router(),
      config    = require('config'),
      jwt       = require('jsonwebtoken'),
      bcrypt    = require('bcryptjs'),
      {check, validationResult} = require('express-validator/check');

//Models
const   Profile = require('../../models/Profile'),
        User    = require('../../models/User') ;

router.get('/user', VerifyToken, async function(req,res){
    try{
        const profile = await Profile.findOne({user:req.user.id}).populate('user', ['name','avatar']);

        if(!profile){
            return res.status(400).json({msg: 'No profile'});
        }

        res.json(profile);
    }catch(err){
        console.error(err.message);
    }
});

router.post('/', [VerifyToken, [
    check('bio', 'A bio is required!').not().isEmpty(),
    check('favoriteBands', 'Please include bands!').not().isEmpty()
]], async function(req,res){
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({errors: err.array});
    }

    const {
        bio,
        favoriteBands,
        youtube,
        instagram,
        bandcamp,
        soundcloud,
        spotify,
        appleMusic,
        facebook
    } = req.body;

    const fields ={};
    fields.user = req.user.id;

    if(favoriteBands){
        fields.favoriteBands = favoriteBands.split(',').map(favoriteBands => favoriteBands.trim());
    } 
    if(bio) fields.bio = bio;

    fields.socials = {}

    if(youtube) fields.socials.youtube = youtube;
    if(instagram) fields.socials.instagram = instagram;
    if(bandcamp) fields.socials.bandcamp = bandcamp;
    if(soundcloud) fields.socials.soundcloud = soundcloud;
    if(spotify) fields.socials.spotify = spotify;
    if(appleMusic) fields.socials.appleMusic = appleMusic;
    if(facebook) fields.socials.facebook = facebook;

    try{
        let profile = await Profile.findOne({user: req.user.id});

        if(profile){
            profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: fields}, {new: true});

            return res.json(profile);
        }

        profile = new Profile(fields);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Errorss');
    }

    res.send('hello');
});


router.get('/', async function(req,res){
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
    }
});

router.get('/user/:user_id', async function(req,res){
    try {
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user', ['name', 'avatar']);
        if(!profile){
            return res.status(404).json({msg:"No profile"});
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
    }
});

router.get('/me', VerifyToken, async function(req,res){
    try {
      const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
  
      if (!profile) {
        return res.status(400).json({ msg: 'There is no profile for this user' });
      }
  
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

router.delete('/', async function(req,res){
    try {
        await Profile.findByIdAndRemove({user:req.user.id});
        await User.findByIdAndRemove({_id:req.user.id});
        res.json({msg:'Removed'});
    } catch (err) {
        console.error(err.message);
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