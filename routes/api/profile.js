const express   = require('express'),
      router	= express.Router();

router.get('/', function(req,res){
    res.send('profile route');
});

module.exports = router;