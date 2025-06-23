import express from "express";

const app = express();

async function main() {
    const port = process.env.PORT || 3000;

    app.use(express.json())

    app.use('api/posts', postRouter)
}