const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/myself';
mongoose.connect(DB_URL,{useNewUrlParser:true})

const userSchema = require("./SchemaList");

const User = mongoose.model('User', userSchema);

module.exports = User;