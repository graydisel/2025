import express from "express";
import {db, dbConnect} from './data/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import {configurePassport} from './config/passport.js';
import helmet from 'helmet'
import {indexRouter} from "./routes/index.js";
import {profileRouter} from "./routes/profile.js";
import {themeRouter} from "./routes/theme.js";
import {logoutRouter} from "./routes/logout.js";
import {authRouter} from "./routes/auth.js";
import setThemeFromCookie from "./middleware/themeMiddle.js";



dotenv.config();

const app = express();


const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;



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

app.use((req, res, next) => {
    res.locals.theme = req.cookies.theme || 'light';
    next();
});

//---------Passport---------

app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);


// -----Middleware----

app.use(setThemeFromCookie);

//-------Routes--------

app.use(indexRouter)
app.use(authRouter)
app.use(profileRouter);
app.use(themeRouter);
app.use(logoutRouter);

//--------Start Server-----------

const startServer = async () => {
    try {
        await dbConnect();

        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
            console.log(`Open: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();

