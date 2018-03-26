// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (error, db) => {
	if(error){
		return console.log('Unable to connect to mongoDB server.');
	}
	console.log('Connected to mongoDB server.');

	// refer to mongodbDelete.js for collection, or .then() 
	// find and update items in database

	// db.collection('ToDos').findOneAndUpdate({
	// 	_id: new ObjectID('5a5bcfb6d6123f3e7d713782')
	// }, {
	// 	$set: {
	// 		completed: true
	// 	}
	// }, {
	// 	returnOriginal: false
	// }).then((result) => {
	// 	console.log(result);
	// });

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('5a6432cab57b4ceafb7f8374')
	}, {
		// sets name to new name 
		$set: {
			name: 'Kevin'
		},
		// increments whatever number value by however many numbers written below
		$inc: {
			age: -1
		}
	}, {
		// automatically returns original document.
		// set to false so does not return original document. it should return updated document
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});

	// db.close();
});