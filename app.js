const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var db_connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'winter',
    database: 'join_us_app'
});

app.get('/', (req, res) => {
    //Find count of users in DB
    const q = "SELECT COUNT(*) AS total FROM users";
    db_connect.query(q, (err, results) => {
        if (err) { throw err; }
        const count = results[0].total;
        res.render('home', {count: count});
    });
});

app.post('/register', (req, res) => {
    // Find count of users in DB
    var person = {email: req.body.email};
    var q = "INSERT INTO users SET ?";
    db_connect.query(q, person, (err, results) => {
        if (!err) {
            res.redirect('/');
        } else {
            res.send('error inserting data.')
        }
    })
});

app.get('/random_num', (req, res) => {
    var num = Math.floor(Math.random() * 10 + 1);
    console.log(num)
    res.send('your lucky number is ' + num);
});

app.get('*', (req, res) => {
    res.send('Not found');
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
})
