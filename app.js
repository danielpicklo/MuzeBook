//Packages
const express   = require('express'),
      catMe	    = require('cat-me');

//Database
const connectDB = require('./config/db');
connectDB();

const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(express.json({extended:false}));

//Defining Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

app.get("/", function(req,res){
	res.send("index");
});

app.listen(port, function(){
	console.log(catMe());
});