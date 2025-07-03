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


app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// -----Middleware----

function isAuthenticated(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).render('error', {path: '', content: 'Authentication token missing'});
    }

    try {
        const payload = jwt.verify(token, SECRET_KEY);
        const user = users.find(u => u.email === payload.email);
        if (!user) {
            res.clearCookie('token');
            return res.status(401).render('error', {path: '', content: 'User not found'});
        }
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie('token');
        return res.status(401).render('error', {path: '', content: 'Invalid or expired token'});
    }
}

app.use((req, res, next) => {
    res.locals.theme = req.cookies.theme || 'light';
    next();
});

// -----HTML views--------

app.get("/", (req, res) => {
    res.render("index",
        {
            title: 'Home',
            content: `<h1>Welcome to home page</h1>
                      <div class="menu">
                          <p><a href="/signin">Sign In</a></p>
                          <p><a href="/signup">Sign Up</a></p>
                          <p><a href="/profile">Profile</a></p>
                      </div>
                      `,
            form: ''
        });
});

app.get("/signin", (req, res) => {
    res.render("index",
        {
            title: 'Sign In',
            content: `<h1>Sign in</h1>
                      <div><a href="/">Back</a></div>`,
            form: `<form action="/signin" method="post" class="form">
                              <label for="email">Email</label>
                              <input type="email" name="email" id="email">
                              <label for="password">Password</label>
                              <input type="password" name="password" id="password">
                              <button>Sign In</button>
                          </form>
        `
        }
    );
});

app.get("/signup", (req, res) => {
    res.render("index", {
        title: 'Sign Up',
        content: `<h1>Sign Up</h1>
              <div><a href="/">Back</a></div>`,
        form: `
                <form method="post" action="/signup" class="form">
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
                `
    });
});

app.get('/profile', isAuthenticated, (req, res) => {
    const user = req.user.username;
    res.render('index', {
        title: 'Profile',
        content: `<h1>Welcome on your profile, ${user}</h1>
            <div class="menu">
              <p><a href="/logout">Logout</a></p>  
              <p><a href="/">Back</a></p>
            </div>`,
        form: `<div class="form">
                <h3>Choose the theme.</h3>
                <p><a href="/lighttheme">Light Theme</a></p>
                <p><a href="/darktheme">Dark Theme</a></p>
           </div>`
    });
})

app.get('/lighttheme', (req, res) => {
    res.cookie('theme', 'light', {maxAge: 900000, httpOnly: true});
    res.redirect('/profile');
});

app.get('/darktheme', (req, res) => {
    res.cookie('theme', 'dark', {maxAge: 900000, httpOnly: true});
    res.redirect('/profile');
});


app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.clearCookie('theme');
    res.render('index', {
        title: 'Logout',
        content: `<h1>See you soon</h1>
                  <p><a href="/">Back</a></p>`,
        form: `<h3>Successfully logged out</h3>`
    });
});

//------Endpoint--------

app.post("/signup", async (req, res) => {
    const {name, username, password, email} = req.body;
    if (!name || !username || !password || !email) {
        return res.status(400).render('error', {path: 'signup', content: 'All fields are required to be filled in'});
    }

    if (users.find(u => u.username === username)) {
        return res.status(400).render('error', {path: 'signup', content: 'User already exists'});
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    users.push({name, username, password, email, hash});
    res.render('index', {
        title: 'Sign Up',
        content: `<h2>Signed up successfully, ${name}</h2>
                  <p><a href="/">Back</a></p>
    `,
        form: `<h3>Signed up successfully</h3>`
    });
});

app.post("/signin", async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).render('error', {path: 'signin', content: 'All fields are required to be filled in'});
    }

    const user = await users.find(u => u.email === email);
    if (!user) {
        return res.status(400).render('error', {path: 'signin', content: 'Invalid email or password'});
    }

    const validation = await bcrypt.compare(password, user.hash);
    if (!validation) {
        return res.status(400).render('error', {path: 'signin', content: 'Invalid email or password'});
    }

    const token = jwt.sign({email: user.email}, SECRET_KEY, {expiresIn: '1h'});

    res.cookie('token', token, {httpOnly: true, maxAge: 60 * 60 * 1000});
    res.render('index', {
        title: 'Sign Up',
        content: `<h1>Welcome, ${user.name}</h1>
                  <p><a href="/">Back</a></p>
    `,
        form: `<h3>Signed in successfully</h3>`
    });
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`Open: http://localhost:${PORT}`);
});

