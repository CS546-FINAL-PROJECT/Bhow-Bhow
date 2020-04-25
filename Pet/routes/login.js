var express    = require("express");
var login = require('./routes/loginroutes');
var bodyParser = require('body-parser');
var app = express();

var router = express.Router();
// test route
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the login' });
});
//route to handle user registration
router.post('/register',login.register);
router.post('/login',login.login)
app.use('/api', router);
app.listen(3000);
