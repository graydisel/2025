import express from "express";
export const indexRouter = express.Router();

indexRouter.get("/", (_req, res) => {
    res.send('Connected to base')
})