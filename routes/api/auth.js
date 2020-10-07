const express   = require('express'),
      router	= express.Router();

router.get('/', function(req,res){
    res.send('auth route');
});

module.exports = router;