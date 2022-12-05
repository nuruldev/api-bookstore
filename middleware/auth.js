const db = require('../models');
const passport = require("passport")

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = db.users
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({where: {email: jwt_payload.email}}).then((res) => {
        if(res) {
            return done(null, res)
        }
        return done(null, false)
    }).catch((err) => {
        return done(null, false)
    })
}));