var express = require('express');
var app = express();
var mongoose    = require('mongoose');
var db = mongoose.connection;
var schema = mongoose.Schema;

//To support html
bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));

//To connect MongoDB via mongoose
db.on('error', console.error);
db.once('open', function(){
    console.log("Connected to mongod server");
});
mongoose.connect('mongodb://localhost/mongodb_tutorial');

var dbSchema = new schema({
	email_address: String,
	register_date: { type: Date, default: Date.now  }
});
var user_list = mongoose.model('user_list', dbSchema);

app.get('/register', function (req, res) {
	res.sendFile(__dirname + "/register.html");
});

app.post('/register', function (req, res) {
	var new_user = new user_list({
		email_address: req.body.email_address,
	});

	new_user.save(function(err, new_user){
		if(err) return console.error(err);
	});    

	var now = user_list.find(function(err, users){
			if(err) return res.status(500).send({error: 'database failure'});
			res.send(users);
	})
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
