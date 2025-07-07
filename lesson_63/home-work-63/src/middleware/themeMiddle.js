export default function setThemeFromCookie(req, res, next) {
    res.locals.theme = req.cookies.theme || 'light';
    next();
}