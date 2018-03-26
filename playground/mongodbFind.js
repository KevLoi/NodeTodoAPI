// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (error, db) => {
	if(error){
		return console.log('Unable to connect to mongoDB server.');
	}
	console.log('Connected to mongoDB server.');

	// refer to mongodbDelete.js for information about the collection JSON.stringify, and .then() functions 
	// different ways to find docs/items in the database

	// db.collection('ToDos').find({
	// 	_id: new ObjectID('5a5b0cfed6123f3e7d7134d6')
	// }).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (error) => {
	// 	console.log('Unable to fetch Todos', error);
	// });

	// db.collection('ToDos').find().count().then((count) => {
	// 	console.log(`Todos count: ${count}`);
	// 	// console.log(JSON.stringify(docs, undefined, 2));
	// }, (error) => {
	// 	console.log('Unable to fetch Todos', error);
	// });

	db.collection('Users').find({name: 'Kevin'}).toArray().then((docs) => {
		console.log(`Users`);
		console.log(JSON.stringify(docs, undefined, 2));
	}, (error) => {
		console.log('Unable to fetch ToDos', error);
	});

	// db.close();
});