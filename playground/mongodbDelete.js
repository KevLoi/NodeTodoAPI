// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (error, db) => {
	if(error){
		return console.log('Unable to connect to mongoDB server.');
	}
	console.log('Connected to mongoDB server.');

	// a lot of different functions to be able to find and delete docs 
	// You can read more about it on the mongodb website, it's just little functions
	// db.collection looks into the collection database, which contains all the database folders, then grabs the folder 
	// .then() is the callback function, just returns or logs whatever you want it to into the console/terminal
	// JSON.stringify(result, undefined, 2): JSON.stringify converts the JavaScript value to JSON string, 2 is to indent by 2 spaces 

	// deleteMany - ToDo
	// db.collection('ToDos').deleteMany({text: 'Eat lunch'}).then((result) => {
	// 	console.log(result);
	// });

	// deleteOne - ToDo
	// db.collection('ToDos').deleteOne({text: 'Eat dinner'}).then((result) => {
	// 	console.log(result);
	// });

	// findOneAndDelete - ToDo
	// db.collection('ToDos').findOneAndDelete({completed: false}).then((result) => {
	// 	console.log(result);
	// });

	// deleteMany - Users
	// db.collection('Users').deleteMany({name: 'Kevin'}).then((result) => {
	// 	console.log(result);
	// });

	// findOneAndDelete - Users
	db.collection('Users').findOneAndDelete({age: 20}).then((result) => {
		console.log(JSON.stringify(result, undefined, 2));
	});

	// db.close();
});