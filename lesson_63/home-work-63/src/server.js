import express from "express";
import { ObjectId } from 'mongodb'
import {db, dbConnect} from './data/db.js';
import {User} from './models/User.js'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import passportConfig from './config/passport';
import helmet from 'helmet'
import {indexRouter} from "./routes/index.js";
import {signInRouter} from "./routes/signin.js";
import {signUpRouter} from "./routes/signup.js";
import {profileRouter} from "./routes/profile.js";
import {themeRouter} from "./routes/theme.js";
import {logoutRouter} from "./routes/logout.js";
import setThemeFromCookie from "./middleware/themeMiddle.js";


dotenv.config();

const app = express();


const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;

const usersData = db.collection('usersData');


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://trustedscripts.example.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: null,
    }
}));

//---------Passport---------

app.use(passport.initialize());
app.use(passport.session());
app.use(passportConfig(passport))


// -----Middleware----

app.use(setThemeFromCookie);

//-------Routes--------

app.use(indexRouter)
app.use(signInRouter);
app.use(signUpRouter);
app.use(profileRouter);
app.use(themeRouter);
app.use(logoutRouter);




app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`Open: http://localhost:${PORT}`);
});

