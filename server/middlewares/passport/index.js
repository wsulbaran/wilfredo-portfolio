



const GraphqlStrategy = require('./strategies');
const passport = require('passport');

exports.init = (passport) => {
	passport.use('graphql', new GraphqlStrategy((options, done) => {
		console.log('calling verify function of strategy');
		//1. find user in db and if user exists verify user password
		//if user is verified call done

		if (true){
			// first params of done is reserved for "error", second one for "user"
			done();
		}
	}));
}