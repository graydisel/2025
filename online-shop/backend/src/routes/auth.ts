import express, {type Request, type Response, type NextFunction } from "express";
import bcrypt from "bcrypt";
import {User, type IUser} from "../models/User.js";
import passport from "passport";
import type { IVerifyOptions } from "passport-local";

export const authRouter = express.Router();

authRouter.post("/auth/signup", async (req, res) => {
    const {name, username, password, email} = req.body;

    try {
        if (!name || !username || !password || !email) {
            console.log("All fields are required to be filled in")
            return res.status(400).json({ message: "All fields are required to be filled in." })
        }

        const existingUserByName = await User.findOne({username: username});
        if (existingUserByName) {
            console.log("This user already exists")
            return res.status(400).json({ message: "This username already exists." });
        }
        const existingUserByEmail = await User.findOne({email: email});
        if (existingUserByEmail) {
            console.log("This email already exists")
            return res.status(400).json({ message: "This email already exists." });
        }

        const salt: string = await bcrypt.genSalt(10);
        const hash: string = await bcrypt.hash(password, salt);

        await User.create({name, username, email, password: hash});
        console.log("Successfully created user");
        res.status(201).json({ message: "User created successfully!" });
    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error during signup." });
    }
});

authRouter.post("/auth/signin", (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    if (!email || !password) {
        console.log("Email and password are required.");
        return res.status(400).json({ message: "Email and password are required." });
    }

    passport.authenticate("local", (err: unknown, user: IUser | false, info: IVerifyOptions) => {
        if (err) {
            console.error("Passport authentication error:", err);
            return next(err);
        }
        if (!user) {
            console.log(info.message || 'Wrong email or password');
            return res.status(401).json({ message: info.message || 'Wrong email or password.' });
        }

        req.logIn(user, (err: Error | null | undefined) => {
            if (err) {
                console.error("req.logIn error:", err);
                return next(err);
            }
            console.log("Signed in successfully");
            return res.status(200).json({
                message: 'Successfully logged in',
                user: {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                }
            });
        });
    })(req, res, next);
});

authRouter.get('/auth/logout', (req: Request, res: Response, next: NextFunction) => {
    req.logout((err: Error | null | undefined) => {
        if (err) {
            console.error("Logout error:", err);
            return next(err);
        }
        return res.status(200).json({ message: 'Logged out successfully.' });
    });
});