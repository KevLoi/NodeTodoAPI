const {ObjectID} = require('mongodb');

// kind of the same thing as doing #INCLUDE <filename> in Java or C++ or something like that
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/ToDo');
const {User} = require('./../server/models/User');

// var id = '5a5f9e9d46975a311f11a22d11';

// different ways to query database with mongoose

var id = '5a5d3de28611215214ff24cc';

// if statement checks if the ObjectID is valid
// if(!ObjectID.isValid(id)) {
// 	console.log('ID not valid');
// }

// function finds all items by id 
// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos', todos);
// });

// function finds first item by id
// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	console.log('Todo', todo);
// });

// another way to find all items by id 
// Todo.findById(id).then((todo) => {
// 	if(!todo) {
// 		return console.log('Id not found');
// 	}
// 	console.log('Todo by Id', todo);
// }).catch((e) => console.log(e));

// User findById
User.findById(id).then((user) => {
	if(!user){
		return console.log('User not found');
	}
	console.log('User by Id', JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));
