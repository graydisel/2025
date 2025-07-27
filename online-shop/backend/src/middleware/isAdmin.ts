import type {IUser} from "../models/User.js";
import {type Request, type Response, type NextFunction} from 'express';

interface AuthenticatedRequest extends Request {
    user?: IUser;
}

export default function isAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    res.status(403).json({ message: 'Access denied: Insufficient permissions.' });
}