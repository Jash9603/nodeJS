const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const person = require('./models/person');


passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    console.log(`Authenticating user: ${username}`);
    const user = await person.findOne({ username: username });
    if (!user) {
      console.log('User not found');
      return done(null, false, { message: 'Incorrect username' });
    }
    const isPasswordMatch = await user.comparePassowrd(password);
    if (isPasswordMatch) {
      console.log('Password match');
      return done(null, user);
    } else {
      console.log('Password mismatch');
      return done(null, false, { message: 'Incorrect password' });
    }
  } catch (err) {
    console.log('Error during authentication', err);
    return done(err);
  }
}));

module.exports = passport