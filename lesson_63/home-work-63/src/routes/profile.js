import express from "express";
import isAuthenticated from "../middleware/isAuthentificated.js";

export const profileRouter = express.Router();

profileRouter.get('/profile', isAuthenticated, (req, res) => {
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
});