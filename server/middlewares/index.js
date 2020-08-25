const configure = require('../config/dev')
const session = require('express-session')




exports.init = (server,db) => {
	const sess = {
		name:"portfolio-session",
		secret: configure.SECRET,
		cookie: {maxAge: 2 * 60 * 60 * 1000},
		resave: false,
		saveUninitialized:false,
		store: db.initSessionStore()
	}
	server.use(session(sess))
}