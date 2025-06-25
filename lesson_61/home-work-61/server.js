import express from "express";
import {getArticleById, getArticles} from "./services/articlesService.js";
const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/articles', (req, res) => {
    const articlesData = getArticles();
    res.render('articles', {articles: articlesData, title: 'Articles list'});

})

app.get('/articles/:id', (req, res) => {
    const articleId = req.params.id;
    const article = getArticleById(articleId);


    if (article) {
        res.render('article', {article: article, title: `${article.title} - ${article.author}`});
    } else {
        res.status(404).send('No article found.');
    }
})

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
    console.log(`Open: http://localhost:${PORT}`);
})