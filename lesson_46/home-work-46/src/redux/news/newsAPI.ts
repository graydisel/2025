import axios from 'axios';
import type {Article} from "../../types/Article.interface.ts";

export const fetchArticles = async (): Promise<Article[]> => {
    const response = await axios.get('https://newsapi.org/v2/everything?domains=wsj.com&apiKey=ce7e6c04e3f74453858b6a39158eae50');
    return response.data.articles;
}