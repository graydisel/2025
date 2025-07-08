import bcrypt from 'bcrypt';
import {User} from "../models/User.js";
import { Strategy as LocalStrategy } from "passport-local";


export function configurePassport (passportInstance) {
    passportInstance.use(new LocalStrategy({ usernameField: 'email' },
        async function (email, password, done) {
            try {
                const user = await User.findOne({email: email});
                if (!user) {
                    return done(null, false, {message: 'Incorrect email or password'});
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return done(null, false, {message: 'Incorrect email or password.'});
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passportInstance.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passportInstance.deserializeUser(async function(id, done) {
        try {
        const user = await User.findById(id);
        if (!user) {
           return done(null, false, { message: 'User not found.' });
        }
        done(null, user);
        } catch (err) {
            done(err);
        }
    });
}