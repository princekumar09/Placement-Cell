// const mongoose = require("mongoose");
// require("dotenv").config();

// exports.connect = () => {
//   mongoose
//     .connect(process.env.MONGODB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(console.log("DB CONNECTED SUCCESSFULLY"))
//     .catch((err) => {
//       console.log("DB CONNECTION FAILED");
//       console.log(err);
//       process.exit(1);
//     });
// };



const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/placement');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;



