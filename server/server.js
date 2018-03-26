
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

// referencing other files
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
// process.env.PORT grabs desired port
// if not it goes to port 3000, local port
const port = process.env.PORT || 3000;

// express middleware
app.use(bodyParser.json());

// posts item or todo
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// gets item or todo
app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e);
	});
});

// GET /todos/id
// gets todo by id
app.get('/todos/:id', (req, res) => {
	// res.send(req.params);
	var id = req.params.id;

	// validate id using isValid
	// 404
	if(!ObjectID.isValid(id)) {
		return res.status(404).send();
	}


	//findById
	// success
	// if todo - send back
	// if no todo - send back 404 with empty body
	// error
	// 400 - and send empty body back
	Todo.findById(id).then((todo) => {
		if(!todo) {
			return res.status(404).send();
		}

		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});



});

// deltes todo
app.delete('/todos/:id', (req, res) => {
	// get the ID
	var id = req.params.id;

	// validate the ID
		// if not valid, send 404
	if(!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	// Remove todo by id
		// success
			// if no doc, send 404
			// if doc, send doc back with 200
		// error
			// 404 with empty body
	Todo.findByIdAndRemove(id).then((todo) => {
		if(!todo) {
			return res.status(404).send();
		}

		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	})
});

// updates/patches todo
app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

	if(!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	if(_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if(!todo) {
			return res.status(404).send();
		}

		res.send({todo});
	}, (e) => {
		res.status(400).send();
	})
});

// POST /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
        // res.send(user);
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

// require authentication find associted user send user back
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
})

// 'listens' to the code, puts stuff on the port
app.listen(port, () => {
  console.log(`Started at PORT ${port}`);
});

module.exports = {app};


// var ToDo3 = new ToDo({
// 	text: true
// });

// ToDo3.save().then((doc) => {
// 	console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
// 	console.log('Unable to save todo');
// });

// var user1 = new User({
// 	email: 'findkevinsphone@gmail.com'
// });

// user1.save().then((doc) => {
// 	console.log('User saved', doc);
// }, (error) => {
// 	console.log('Unable to save user', error);
// });
