



const GraphqlStrategy = require('./strategies');
//const passport = require('passport');
const User = require('../../database/models/user')

exports.init = (passport) => {

	passport.serializeUser((user, done) => {
		done(null, user.id)
	})

	passport.deserializeUser((id, done) => {
		User.findById(id, (error, user) => {
		  done(error, user);
		})
	  })
	  
	passport.use('graphql', new GraphqlStrategy(({email, password}, done) => {
		console.log('email', email);
		User.findOne({email}, (error, user) => {
			if(error){ return done(error);}
			if(!user){ return done(null, false)}
			user.validatePassword(password,(error, isMatching) => {
				if (error) { return done(error);}
				if (!isMatching){ return done(null, false);}

				return done(null, user);
			})
		})
	}));
}