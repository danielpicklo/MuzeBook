const express   = require('express'),
      router	= express.Router();

router.get('/', function(req,res){
    res.send('posts route');
});

module.exports = router;