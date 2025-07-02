import express from "express";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import {users} from './data/users.js';


dotenv.config();

const app = express();


const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// -----Middleware----

function isAuthenticated(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Authentication token missing');
    }

    try {
        const payload = jwt.verify(token, SECRET_KEY);
        const user = users.find(u => u.email === payload.email);
        if (!user) {
            res.clearCookie('token');
            return res.status(401).send('User not found');
        }
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie('token');
        return res.status(401).send('Invalid or expired token');
    }
}

// -----HTML views--------

app.get("/", (req, res) => {
    res.render("index",
        { title: 'Home',
            content: `<h1>Welcome to home page</h1>
                      <p><a href="/signin">Sign In</a></p>
                      <p><a href="/signup">Sign Up</a></p>
                      <p><a href="/profile">Profile</a></p>
                      ` } );
});

app.get("/signin", (req, res) => {
    res.render("index",
        { title: 'Sign In',
            content: `<h1>Sign in</h1>
                    <form action="/signin" method="post">
                      <label for="email">Email</label>
                      <input type="email" name="email" id="email">
                      <label for="password">Password</label>
                      <input type="password" name="password" id="password">
                      <button>Sing In</button>
                    </form>
                    <div><a href="/">Back</a></div>
`});
});

app.get("/signup", (req, res) => {
    res.render("index", {title: 'Sign Up',
    content: `<h1>Sign Up</h1>
                <form method="post" action="/signup">
                  <label for="name">Write your name</label>
                  <input type="text" id="name" name="name">
                  <label for="email">Enter your email</label>
                  <input type="email" id="email" name="email">
                  <label for="username">Write your username</label>
                  <input type="text" name="username" id="username">
                  <label for="password">Write your password</label>
                  <input type="password" name="password" id="password">
                  <button>Register</button>
                </form>
                <div><a href="/">Back</a></div>`});
});

app.get('/profile', isAuthenticated, (req, res) => {
    const user = req.user.username;
    res.render('index', {title: 'Profile',
    content: `<h1>Welcome on your profile, ${user}</h1>
              <p><a href="/logout">Logout</a></p>  
`});
})

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.send('Logged out');
});

//------Endpoint--------

app.post("/signup", async (req, res) => {
    const { name, username, password, email } = req.body;
    if (!name || !username || !password || !email) {
        return res.status(400).send('All fields are required to be filled in');
    }

    if (users.find(u => u.username === username)) {
        return res.status(400).send('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    users.push({name, username, password, email, hash});
    res.send('Sign up successfully');
});

app.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('All fields are required to be filled in');
    }

    const user = await users.find(u => u.email === email);
    if (!user) {
        return res.status(400).send('Invalid email or password');
    }

    const validation = await bcrypt.compare(password, user.hash);
    if (!validation) {
        return res.status(400).send('Invalid email or password');
    }

    const token = jwt.sign({email: user.email}, SECRET_KEY, {expiresIn: '1h'});

    res.cookie('token', token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    res.json({
        message: 'Login successful',
    });
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`Open: http://localhost:${PORT}`);
});

