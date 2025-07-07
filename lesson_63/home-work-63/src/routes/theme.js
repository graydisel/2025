import express from "express";

export const themeRouter  = express.Router();

themeRouter.get('/lighttheme', (req, res) => {
    res.cookie('theme', 'light', {maxAge: 900000, httpOnly: true});
    res.redirect('/profile');
});

themeRouter.get('/darktheme', (req, res) => {
    res.cookie('theme', 'dark', {maxAge: 900000, httpOnly: true});
    res.redirect('/profile');
});