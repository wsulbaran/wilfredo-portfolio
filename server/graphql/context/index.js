const passport = require('passport')


// options ==> {email, password}
const authenticateUser = (req, options) => {
	console.log('Calling authenticateUser');

	return new Promise((resolve, reject)=>{
		const done = (error , user) => {
			// Here we will get user if user is authenticated
			if (error){
				return reject(new Error(error))
			}
			// if we will get user we can save session to DB
			if (user){
				req.login(user, (error)=>{
					if (error) { reject(new Error(error))}
					return resolve(user)
				})
				
			} else {
				return reject(new Error(' Invalid password or email'))
			}
		}
		const authFn = passport.authenticate('graphql', options, done)
		authFn();
	})	
}
  
  
  
exports.buildAuthContext = (req) => {
	const auth = {
		authenticate: (options) => authenticateUser(req, options),
		logout: () => req.logout()
	}
	return auth;
}  