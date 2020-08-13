


const mongoose = require('mongoose');
const config = require('../config/dev')
require('./models/portfolio');
require('./models/user');


exports.connect = () => {
	mongoose.connect(config.DB_URI,{
		useNewUrlParser:true,
		useUnifiedTopology:true,
		useCreateIndex:true,
		useFindAndModify: false
	},()=>{
		console.log('Connected to DB');
	})
}