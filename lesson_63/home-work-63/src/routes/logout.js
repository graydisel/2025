import express from 'express';

export const logoutRouter = express.Router();

logoutRouter.get('/logout', (req, res) => {
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