import express from "express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import helmet from 'helmet'

dotenv.config();

const app = express();


const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.use(session({
    secret: "BookThief",
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

//----------Routes-----------

app.get("/", (req, res) => {
    res.send("Hello World!");
})

//------------Server--------------

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`Open: http://localhost:${PORT}`);
});