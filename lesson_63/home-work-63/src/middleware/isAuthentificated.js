export default function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).render('error', {path: '', content: 'Not Authenticated, please Log in.'});
}

app.use((req, res, next) => {
    res.locals.theme = req.cookies.theme || 'light';
    next();
});