const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// {
// 	email: 'j.kevnloi@gmail.com',
// 	password: 'flaoiwejfliajwef',
// 	tokens: [{
// 		access: 'auth',
// 		token: 'poijasdpfoimasdpfjiweproijwer'
// 	}]
// }

var UserSchema = new mongoose.Schema({
	email: {
		required: true,
		trim: true,
		type: String,
		minlength: 1,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

UserSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

	user.tokens = user.tokens.concat({access, token});

	return user.save().then(() => {
		return token;
	});
};

UserSchema.pre('save', function(next) {
	var user = this;

	if(user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			})
		})
	} else {
		next();
	}
});

UserSchema.statics.findByToken = function (token) {
	var User = this;
	var decoded;

	try {
		decoded = jwt.verify(token, 'abc123');
	} catch(e) {
		// return new Promise((resolve, reject) => {
		// 	reject();
		// })
		return Promise.reject();
	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
};

// Model for users

// Users
// email - require it - trim it - set type=string - set minlength to 1
var User = mongoose.model('User', UserSchema);


// this is required in order to be able to use the User model
module.exports = {User};
