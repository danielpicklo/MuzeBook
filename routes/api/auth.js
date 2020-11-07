const express   = require('express'),
      router	= express.Router(),
      config    = require('config'),
      jwt       = require('jsonwebtoken'),
      bcrypt    = require('bcryptjs'),
      {check, validationResult} = require('express-validator/check');

const User = require('../../models/User');

router.get('/', VerifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { email, password } = req.body;
  
  try {
    let user = await User.findOne({ email });
  
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
  
    const payload = {
        user: {
        id: user.id
      }
    };
  
    jwt.sign(payload, config.get('tokensecret'), function(err, token) {
        if(err) throw err;
        res.json({token});
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

function VerifyToken(req,res,next){
  const token = req.header('x-auth-token');
    
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
    
  try {
    jwt.verify(token, config.get('tokensecret'), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
}

module.exports = router;