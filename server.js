const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/gameofthrones'
mongoose.connect(url, { useNewUrlParser: true })
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})
db.on('error', err => {
  console.error('connection error:', err)
})
var Schema = mongoose.Schema;



var userschema = new Schema({
    name: String
})

var User = mongoose.model('User', userschema)

var dumbuser = new User({
    name: "Bob Floyd"
})

console.log(silence.name)