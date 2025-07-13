import express from "express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import helmet from 'helmet'
import {dbConnect} from "./data/db.js";
import {getFilteredBooks} from "./services/books.js";


dotenv.config();

const app = express();


const PORT = process.env.PORT || 4004;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
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
        connectSrc: ["'self'", "http://localhost:3000", "http://localhost:4004"],
    }
}));

//----------Routes-----------

app.get("/", (_req, res) => {
    console.log("GET /");
})

app.get("/products", async (req, res) => {
    console.log('Received filters:', req.query);
    try {
        const filteredBooks = await getFilteredBooks(req.query);
        res.json(filteredBooks);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
})

//------------Server--------------

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