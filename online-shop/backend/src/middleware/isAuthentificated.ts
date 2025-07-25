import type {Request, Response, NextFunction} from 'express';

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).render('error', {path: '', content: 'Not Authenticated, please Log in.'});
}

