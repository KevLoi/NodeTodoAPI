var mongoose = require('mongoose');

// uses mongoose framework
// .model lets you set up requirements for values in items for the database
var Todo = mongoose.model('todos', {
	text: {
		type: String,
		// text is required
		required: true,
		// requires minimum length
		minlength: 1,
		// removes all white spaces
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	}
});

// this is required to be able to use this file
module.exports = {Todo};
