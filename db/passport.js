const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');



// Load User model
const db = require('./models');
User = db.User;


module.exports = (passport) => {
  //console.log(passport)



  //console.log(passport)

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        console.log(user)
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        if (password == user.password)

          return done(null, user);

        else {
          return done(null, false, { message: 'Password incorrect' });

        }

        // Match password

      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

};




