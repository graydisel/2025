import bcrypt from 'bcrypt';
import {type IUser, User} from "../models/User.js";
import { Strategy as LocalStrategy, type IVerifyOptions } from "passport-local";
import type {PassportStatic} from 'passport';

export type DoneCallback = (err: any, user?: Express.User | false, info?: IVerifyOptions) => void;

type SerializeDoneCallback = (err: any, id?: string) => void;

type DeserializeDoneCallback = (err: any, user?: IUser | false | null) => void;

export function configurePassport (passportInstance: PassportStatic) {
    passportInstance.use(new LocalStrategy({ usernameField: 'email' },
        async function (email: string, password: string, done: DoneCallback) {
            try {
                const user: IUser | null = await User.findOne({email: email});
                if (!user) {
                    return done(null, false, {message: 'Incorrect email or password'});
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return done(null, false, {message: 'Incorrect email or password.'});
                }
                return done(null, user);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    return done(error);
                }
                return done(new Error(`An unknown error occurred: ${error}`));
            }
        }
    ));

    passportInstance.serializeUser(function(user, done: SerializeDoneCallback) {
        done(null, user.id);
    });

    passportInstance.deserializeUser(async function(id: string, done: DeserializeDoneCallback) {
        try {
            const user = await User.findById(id);
            if (!user) {
                console.warn('User not found during deserialization for ID:', id);
                return done(null, false);
            }
            done(null, user);
        } catch (err: unknown) {
            if (err instanceof Error) {
                done(err);
            } else {
                done(new Error(`An unknown error occurred during deserialization: ${err}`));
            }
        }
    });
}