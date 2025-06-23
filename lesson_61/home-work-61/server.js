import express from "express";
import {getArticleById, getArticles} from "./services/articlesService.js";
const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello on my page')
})

app.get('/articles', (req, res) => {
    const articles = getArticles();

})

app.get('/articles/:id', (req, res) => {
    const articleId = req.params.id;
    const article = getArticleById(articleId);

    if (!article) {
        res.status(404).send('No article.ejs found.');
        return;
    }

    res.json(article);
})

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
})