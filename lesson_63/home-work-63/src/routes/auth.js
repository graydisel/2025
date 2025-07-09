import express from "express";
import bcrypt from "bcrypt";
import {User} from "../models/User.js";
import passport from "passport";
import {logoutRouter} from "./logout.js";

export const authRouter = express.Router();

authRouter.get("/signup", (req, res) => {
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

authRouter.post("/signup", async (req, res) => {
    const {name, username, password, email} = req.body;

    try {
        if (!name || !username || !password || !email) {
            return res.status(400).render('error', {
                path: 'signup',
                content: 'All fields are required to be filled in'
            });
        }

        const existingUserByName = await User.findOne({username: username});
        if (existingUserByName) {
            return res.status(400).render('error', {path: 'signup', content: 'This user already exists'});
        }
        const existingUserByEmail = await User.findOne({email: email});
        if (existingUserByEmail) {
            return res.status(400).render('error', {
                path: 'signup',
                content: 'This email is already registered.'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        await User.create({name, username, email, password: hash});

        res.status(201).render('index', {
            title: 'Sign Up',
            content: `<h2>Signed up successfully, ${name}</h2>
                      <p><a href="/">Back</a></p>
        `,
            form: `<h3>Signed up successfully</h3>`
        });
    } catch (error) {
        console.log(error);
        res.status(500).render('error', { path: 'signup', content: 'Server error during registration.' });
    }
});


authRouter.get("/signin", (req, res) => {
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

authRouter.post("/signin", (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).render('error', {path: 'signin', content: 'All fields are required to be filled in'});
    }

    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).render('error', {path: 'signin', content: info.message || 'Wrong email or password'});
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            res.render('index', {
                title: 'Sign In Successful',
                content: `<h1>Welcome, ${user.username}</h1>
                          <p>You have successfully logged in.</p>
                          <p><a href="/">Go to Home Page</a></p>
                `,
                form: `<h3>Signed in successfully</h3>`
            });
        });
    })(req, res, next);
})

authRouter.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
    });
    res.clearCookie('theme');
    res.render('index', {
        title: 'Logout',
        content: `<h1>See you soon</h1>
                  <p><a href="/">Back</a></p>`,
        form: `<h3>Successfully logged out</h3>`
    });
});