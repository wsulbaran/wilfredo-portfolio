const passport = require('passport')


// options ==> {email, password}
const authenticateUser = (options) => {
	console.log('Calling authenticateUser');

	return new Promise((resolve, reject)=>{
		const done = (err, user) => {
			// Here we will get user if user is authenticated
			// if we will get user we can save session to DB

			if (err){
				return reject(new Error('something went wrong'))
			}
			if (user){
				return resolve(user)
			}
		}
		const authFn = passport.authenticate('graphql', options, done)
		authFn();
	})	
}
  
  
  
exports.buildAuthContext = () => {
	const auth = {
		authenticate: (options) => authenticateUser(options)
	}
	
	return auth;
}  