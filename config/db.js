const   mongoose    = require('mongoose'),
        config      = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        });
        console.log("DB connected");
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;