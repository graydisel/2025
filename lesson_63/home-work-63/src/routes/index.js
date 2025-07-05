import express from 'express';
export const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
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