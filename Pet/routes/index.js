const advertisersRoutes = require('./advertisers');
const commentsRoutes = require('./comments');
const dogsRoutes = require('./dogs');
const loginRoutes = require('./login');
const usersRoutes = require('./users');
const path = require('path');

const constructorMethod = (app) => {
	app.use('/advertisers', advertisersRoutes);
	app.use('/comments', commentsRoutes);
        app.use('/dogs', dogsRoutes);
	app.use('/login', loginRoutes);
        app.use('/users', userRoutes);
  
	app.get('/about', (req, res) => {
		res.sendFile(path.resolve('static/about.html'));
	});

	app.use('*', (req, res) => {
		res.redirect('/posts');
	});
};

module.exports = constructorMethod;
