class User {
	constructor (model){
		this.Model = model
	}

	getAuthUser(ctx) {
    if (ctx.isAuthenticated()) {
      return ctx.getUser();
    }

    return null;
	}

	signUp(signUpData) {
		if (signUpData.password !== signUpData.passwordConfirmation) {
			throw new Error('Password must be the same as confirmation password!');
		}
		try {
			return this.Model.create(signUpData);
		} catch (error) {
			if (error.code && error.code === 11000) {
				throw new Error('User with provided email already exists!');
			}
			console.log('error ', error);
			throw error;
		}
	}
	async signIn(signInData, ctx) {
		try {
			const user = await ctx.authenticate(signInData);
			return user;
		} catch (error) {
			return error;
		}
	}  
	signOut(ctx) {
		try {
			// console.log('BEFORE LOGOUT-------------');
			// console.log('is authenticated', ctx.isAuthenticated());
			// console.log('user', ctx.getUser());
			ctx.logout();
			// console.log('AFTER LOGOUT-------------');
			// console.log('is authenticated', ctx.isAuthenticated());
			// console.log('user', ctx.getUser());
			return true;
		} catch(e) {
			return false;
		}
	}

}

module.exports = User;