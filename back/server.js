const express = require('express');
const randomId = require('random-id');
const app = express();
const db = require("./db/db");
const Users = db.Users;
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("sequelize");
const PORT = 3070;


app.use(bodyParser.json());
app.use(cors());
app.use(express.static(process.cwd() + '/my-app/dist'));

app.get('/api/users', (req, res) => {
	//console.log('api/users called!!!!!!!')
	//res.json(users);
	sendTable().then((items) => {
		res.send(items);
	});
});



app.post('/api/register', (req, res) => {
	//console.log(req.body)
	// const user = req.body.user;
	// user.id = randomId(10);
	// console.log('Adding user:::::', user);
	// users.push(user);
	// res.json("user addedd");
	
	if(writeToDB([req.body.data])) {
		res.sendStatus(500);
	} else {
		res.sendStatus(201);
	}
});

app.get('/api/userdata', (req, res) => {
	console.log(req.query)
	//res.json(req.query);
	Users.findOne({
		where: {
			username: { [sequelize.Op.eq]: req.query.username, },
			password: { [sequelize.Op.eq]: req.query.password, },
		}
	}).then(function(item){
		console.log(item)
		if(item != null) {
			res.json(item);
		} else {
			res.sendStatus(400);
			//res.json({});
		}
	});
});
app.post('/api/login', (req, res) => {
	res.sendStatus(500);
});


app.get("/", (req, res) => {
	console.log("get");
	res.json({});
	// sendTable().then((items) => {
	// 	res.send(items);
	// });
});

/*app.post("/upload", (req, res) => {
	console.log("post");
	//   console.log(req.body);
	writeToDB(req.body);
	res.sendStatus(201);
});*/

/*app.get('/', (req,res) => {
	res.sendFile(process.cwd() + '/my-app/dist/index.html');
});*/

app.listen(PORT, () => {
		console.log(`server has been started on PORT ${PORT}...`);
});
//////////////



function writeToDB(req) {
	console.log(req);
	/*await Users.destroy({
		where: {},
		truncate: true,
	});*/
	var was_error = false;
	req.forEach((item) => {
		Users.create({
			//id: item["id"],
			username: item.username,
			birthdate: item.birthdate,
			sex: item.sex,
			email: item.email,
			password: item.password,
		}).then(function(item){
			/*res.json({
				"Message" : "Created user.",
				"User" : item
			});*/
		}).catch(function (err) {
			//console.log(err)
			was_error = true;
			// handle error;
		});
	});
	return was_error;
}

function sendTable() {
	return Users.findAll()
		.then((res) => {
			let responce = { users: [] };
			res.forEach((item) => {
				responce.users.push(item.dataValues);
			});
			return responce;
		})
		.catch((err) => {
			console.log(err);
		});
}

