import {articles} from "../data/articles.js";

export const getArticles = () => {
    return articles;
}

export const getArticleById = (id) => {
    return articles.find(article => article.id === id);
}