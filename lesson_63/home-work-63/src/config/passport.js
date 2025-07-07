import bcrypt from 'bcrypt';
import {User} from "../models/User.js";
import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";


export default function (passportInstance) {
    passportInstance.use(new LocalStrategy(
        function(userEmail, password, done) {
            const user = User.findOne({email: userEmail});
            if (!user) {
                return done(null, false, { message: 'Incorrect email or password.' });
            }
            bcrypt.compare(password, user.hash, function(err, result) {
                if (err) {
                    return done(err);
                }
                if (!result) {
                    return done(null, false, { message: 'Incorrect email password' });
                }
                return done(null, user);
            });
        }
    ));

    passportInstance.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passportInstance.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            if (err) { return done(err); }
            done(null, user);
        });
    });
}