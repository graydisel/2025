import { IUser } from '../models/User.js';

declare global {
    namespace Express {
        interface Request {
            isAuthenticated(): boolean;
            user?: IUser;
        }

        interface User extends IUser {
            email: string;
        }
    }
}