const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('./model/User');//model/user

const localStrategy = new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, pswd, done) => {
	try {
		const user = await User.findOne({ email }).select('+password');
		if (!user) return done(null, false, { message: 'No Account with this email' });
    //console.log(user);
		const isCorrect = user.isValidPassword(pswd);
		return done(null, isCorrect && user, { message: isCorrect ? 'Logged in Successfully' : 'Incorrect Password' });
	}
	catch (e) {
		console.log("PASSPORT LOCAL: ", e);
		return done(e, false);
	}
});
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET
}
const jwtStrategy = new JWTStrategy(jwtOptions, (jwtPayload, done) => {
	User.findById(jwtPayload._id, (err, user) => done(err, user ?? false));
});

module.exports = function (passport) {
	passport.use(localStrategy);
	passport.use(jwtStrategy);
	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));
}