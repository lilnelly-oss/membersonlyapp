require('dotenv').config()
var express = require('express');
var app = express()
var flash = require('express-flash')
var Joi = require('joi')
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
/*
var mongo = require('mongodb'); 
const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/users'
mongoose.connect(url, { useNewUrlParser: true })
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})
db.on('error', err => {
  console.error('connection error:', err)
})
*/
app.use(cookieParser('secretString'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
var allusers = {
    username: process.env.USERNELLY, password: process.env.USERNELLYPASSWORD,
    username: process.env.USERTWO, password: process.env.USERTWOPASSWORD,
    username: process.env.USERTHREE, password: process.env.USERTHREEPASSWORD
}

const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(16).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(3).required()
}).with('username', 'password');


app.get('/', (req, res) => {
    res.render(__dirname + "/views/preloader.ejs")
})

app.get('/last-redirect', (req, res) => {
    res.redirect('/')
})

app.get('/validate-data', (req, res) => {
    res.redirect('/')
})

app.get('/realhome', (req, res) => {
    res.render(__dirname + "/views/index.ejs", {word: req.flash("Error")})
})


app.post('/validate-data', (req, res) => {
    let userinfo= {
        username: req.body.name,
        password: req.body.password
     };
     if(userinfo.username == allusers.username && userinfo.password == allusers.password){
         res.redirect(307, "/last-redirect")
         
     }else{
         res.redirect("/")
     }
})

app.post('/last-redirect', (req, res) => {
    res.sendFile(__dirname + "/views/userspage.html")
})

app.listen(3000, () => {
    console.log(`Server Started on Port 3000`)
})