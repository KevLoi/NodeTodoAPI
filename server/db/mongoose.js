var mongoose = require('mongoose');

// cofigures built in mongodb or mongoose promise 
mongoose.Promise = global.Promise;

// connects to either local host or app host
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ToDoApp');


module.exports = {mongoose};