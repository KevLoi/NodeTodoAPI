// commented and uncommmented code basically does the same thing. Pulls mongodb framework 
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

// connects to localhost:27017 which is only the local server on your computer. 
// creates a collection called "ToDoApp" in database
// if there's an error, log it to terminal.
// otherwise, log success to terminal, and connect
MongoClient.connect('mongodb://localhost:27017/ToDoApp', (error, db) => {
	if(error){
		return console.log('Unable to connect to mongoDB server.');
	}
	console.log('Connected to mongoDB server.');

	// All this code is for testing purposes

	// Creates like a sub database 'ToDos' under ToDoApp and puts stuff in there.
	// Uses mongodb 
	// db.collection('ToDos').insertOne({
	// 	text: 'Something to do',
	// 	completed: false
	// }, (error, result) => {
	// 	if(error) {
	// 		return console.log('Unable to insert ToDo', error);
	// 	}

	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// });

	// Creates sub database 'Users' under ToDoApp and puts stuff in there
	// Uses mongodb
	// Insert new doc into Users (name, age, location)
	db.collection('Users').insertOne({
		name: 'Kevin',
		age: 20,
		location: 'Santa Cruz'
	}, (error, result) => {
		if(error) {
			return console.log('Unable to insert user');
		}

		console.log(result.ops[0]._id.getTimestamp());
	});

	db.close();
});