const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');


// beforeEach is straightforward. beforeEach item in the databse, do something
// in this case, Todo.remove empties all todos for a fresh start
// todo.insertmany(todos) inserts todos array, keeps list updated
beforeEach(populateUsers);
beforeEach(populateTodos);

// test case for POST request
// makes sure test cases works
describe('POST /todos', () => {

  // test case for creating a new todo
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app) // requests app using express.js
      .post('/todos') // posts todos
      .send({text}) // sends texts of todos
      .expect(200) // 200 OK
      .expect((res) => {
        expect(res.body.text).toBe(text); // make sure the text of result is the text that is sent
      })
      // error handler
      .end((err, res) => {
        if (err) {
          return done(err);
        }

      	// makes sure todo[0].text == this.text
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  // another test case that makes something
  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

// test GET request to return all todos in todos list
describe('GET /todos', () => {
	it('should get all todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2);
			})
			.end(done);
	})
});

// test GET request to return one todo by id in todos list
describe('GET /todos/:id', () => {

	// success case
	it('should return todo doc', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});

	// fail case 1: valid id, id not in database
	it('should return 404 if todo not found', (done) => {
		var hexID = new ObjectID().toHexString();

		request(app)
			.get(`/todos/${hexID}`)
			.expect(404)
			.end(done);
	});

	// fail case 2: non object ids
	it('should return 404 for non-object ids', (done) => {
		// /todos/123
		request(app)
			.get(`/todos/123abc`)
			.expect(404)
			.end(done);
	});
});

// test DELETE request removes a todo
describe('DELETE /todos/:id', () => {

	// success case
	it('should remove a todo', (done) => {
		var hexID = todos[1]._id.toHexString();

		request(app)
			.delete(`/todos/${hexID}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(hexID);
			})
			.end((err, res) => {
				if(err) {
					return done(err);
				}

				// Query database using findById toNotExist
				// expect(null).toNotExist();
				Todo.findById(hexID).then((todo) => {
					expect(todo).toNotExist();
					done();
				}).catch((e) => done(e));
			});
	});

	// fail case 1: valid ID, but not in database
	it('should return 404 if todo not found', (done) => {
		var hexID = new ObjectID().toHexString();

		request(app)
			.delete(`/todos/${hexID}`)
			.expect(404)
			.end(done);
	});

	// fail case 2: invalid ID
	it('should return 404 if objectID is invalid', (done) => {
		request(app)
			.delete(`/todos/123abc`)
			.expect(404)
			.end(done);
	});
});

// tests PATCH request, updates todo
describe('PATCH /todos/:id', () => {

	// success case
	it('should update todo', (done) => {

		// grab id of first item
		// update text, set completed = true
		// 200
		// text is changed, completed is true, completedAt is a number .toBeA()
		var text = 'This is the new text';
		var hexID = todos[0]._id.toHexString();


		request(app)
			.patch(`/todos/${hexID}`)
			.send({
				completed: true,
				text
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completed).toBe(true);
				expect(res.body.todo.completedAt).toBeA('number');
			})
			.end(done);

	});

	// fail case: clears completedAt if todo is not completed
	it('should clear completedAt when todo is not completed', (done) => {
		// grab id of second todo item
		// update text, set completed = false
		// 200
		// text is chagned, completed is false, completedAt is a null .toNotExist()
		var text = 'This is the new text';
		var hexID = todos[1]._id.toHexString();


		request(app)
			.patch(`/todos/${hexID}`)
			.send({
				completed: false,
				text // same thing as text = text
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completed).toBe(false);
				expect(res.body.todo.completedAt).toNotExist();
			})
			.end(done);
	});
});
