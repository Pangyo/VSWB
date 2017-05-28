var User = require('../app/models/user');
var passport = require('passport');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app) {

    // passport init
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    passport.serializeUser(function (user, done) {
        console.log('serializeUser', user);
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        console.log('deserializeUser', id);
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('login', new LocalStrategy({
        usernameField: 'username',
        passReqToCallback: true
    },
        function (req, username, password, done) {
            process.nextTick(function () {
                User.findOne({ 'user.username': username }, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        console.log('username is not exist');
                        return done(null, false, req.flash('username is not exist'));
                    }

                    if (!user.confirmPwd(password)) {
                        console.log('password not correct');
                        return done(null, false, req.flash('password not correct'));
                    }

                    return done(null, user);
                });
            });
        }
    ));

    passport.use('register', new LocalStrategy({
        usernameField: 'username',
        passReqToCallback: true
    },
        function (req, username, password, done) {
            process.nextTick(function () {
                if (!req.user) {
                    User.findOne({ 'user.username': username }, function (err, user) {
                        if (err) {
                            return done(err);
                        }

                        if (user) {
                            return done(null, false, req.flash('username already exists'));

                        } else {
                            var newUser = new User();
                            newUser.user.username = username;
                            newUser.user.password = newUser.generatorPwd(password);
                            newUser.user.email = '';
                            newUser.user.phone = '';

                            newUser.save(function (err) {
                                if (err) {
                                    throw err;
                                }
                                return done(null, newUser);
                            });
                        }
                    });
                } else {
                    var user = req.user;
                    user.user.username = user.username;
                    user.user.password = user.generatorPwd(password);
                    user.user.email = '';
                    user.user.phone = '';

                    user.save(function (err) {
                        if (err) {
                            throw err;
                        }

                        return done(null, user);
                    });
                }
            });
        }));

    return passport;
}