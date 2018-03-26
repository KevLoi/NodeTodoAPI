const {ObjectID} = require('mongodb');

// kind of the same thing as doing #INCLUDE <filename> in Java or C++ or something like that
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/ToDo');
const {User} = require('./../server/models/User');

// removes all todos from the list

// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

// Todo.findOneAndRemove()
// Todo.findByIdAndRemove()

Todo.findByIdAndRemove('5a603a11d6123f3e7d719014').then((todo) => {
	console.log(todo);
});