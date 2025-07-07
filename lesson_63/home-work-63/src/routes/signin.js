import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";

export const signInRouter = express.Router();

signInRouter.get("/signin", (req, res) => {
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

signInRouter.post("/signin", async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).render('error', {path: 'signin', content: 'All fields are required to be filled in'});
    }

    passport.authenticate("local", (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).render('error', {path: 'signin', content: 'Wrong email or password'});
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